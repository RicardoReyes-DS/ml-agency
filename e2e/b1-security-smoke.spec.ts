import { test, expect, type Locator } from "@playwright/test";

// toBeVisible alone permits opacity: 0, including on an ancestor.
async function paintedState(locator: Locator) {
  return locator.evaluate((element) => {
    let opacity = 1;
    const ancestors: { tag: string; opacity: string; visibility: string; display: string }[] = [];
    for (let node: Element | null = element; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      ancestors.push({ tag: node.tagName, opacity: style.opacity, visibility: style.visibility, display: style.display });
      opacity *= Number(style.opacity);
    }
    const rect = element.getBoundingClientRect();
    return {
      opacity, ancestors,
      inViewport: rect.bottom > 0 && rect.right > 0 && rect.top < innerHeight && rect.left < innerWidth,
      painted: opacity >= 0.99 && ancestors.every((style) => style.visibility === "visible" && style.display !== "none"),
    };
  });
}

// Each route gets Playwright's fresh page/context; a failure cannot skip another route.
// Capture mode is opt-in and separate from the normal-motion functional gate.
for (const [path, locale] of [["/", "es"], ["/es", "es"], ["/en", "en"]]) {
  test(`B1 production ${path}`, async ({ page, context }, testInfo) => {
    const origin = "http://127.0.0.1:3301";
    const consoleMessages: { type: string; text: string }[] = [];
    const pageErrors: string[] = [];
    const failedAssets: string[] = [];
    const blockedRequests: string[] = [];
    const loadedAssets: { url: string; type: string; status: number }[] = [];
    const observations: Record<string, unknown>[] = [];
    const visibilitySamples: Record<string, unknown>[] = [];
    const blockedSockets: string[] = [];
    const assetTypes = new Set(["script", "stylesheet", "image", "font", "media"]);

    await context.route("**/*", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.origin !== origin || (url.pathname === "/api" || url.pathname.startsWith("/api/")) || !["GET", "HEAD"].includes(request.method())) {
        blockedRequests.push(`${request.method()} ${request.url()}`);
        await route.abort("blockedbyclient");
        return;
      }
      await route.continue();
    });
    await context.routeWebSocket(/.*/, (socket) => {
      blockedSockets.push(socket.url());
      socket.close();
    });
    page.on("console", (message) => {
      consoleMessages.push({ type: message.type(), text: message.text() });
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("requestfailed", (request) => {
      if (new URL(request.url()).origin === origin && assetTypes.has(request.resourceType())) {
        failedAssets.push(`${request.url()}: ${request.failure()?.errorText}`);
      }
    });
    page.on("response", (response) => {
      if (new URL(response.url()).origin === origin && assetTypes.has(response.request().resourceType())) {
        loadedAssets.push({ url: response.url(), type: response.request().resourceType(), status: response.status() });
      }
      if (new URL(response.url()).origin === origin && response.status() >= 400) {
        failedAssets.push(`${response.status()} ${response.url()}`);
      }
    });

    try {
      const expectedTitle = locale === "es"
        ? "Servicios de machine learning para empresas en México | Enkisys"
        : "Production-minded machine learning systems | Enkisys";
      const expectedHeading = locale === "es"
        ? "Servicios de machine learning para empresas que reducen trabajo manual,"
        : "Machine learning systems that cut manual work,";
      const response = await page.goto(`${origin}${path}`, { waitUntil: "networkidle" });
      expect(response, `response for ${path}`).not.toBeNull();
      expect(response!.status(), `HTTP status for ${path}`).toBe(200);
      await expect(page).toHaveURL(`${origin}/${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page).toHaveTitle(/Enkisys/i);
      await expect(page).toHaveTitle(expectedTitle);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toContainText(expectedHeading);
      await expect(page.locator('#home a[href^="mailto:ricardo@enkisys.net"]').first()).toBeVisible();

      const graphics = await page.locator("canvas").evaluateAll((canvases) => canvases.map((canvas) => {
        const rect = canvas.getBoundingClientRect();
        return { width: (canvas as HTMLCanvasElement).width, height: (canvas as HTMLCanvasElement).height, top: rect.top, bottom: rect.bottom, inViewport: rect.bottom > 0 && rect.top < innerHeight };
      }));
      const reducedMotion = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
      console.log(JSON.stringify({ path, graphics, reducedMotion }));
      expect(reducedMotion, "requested browser motion mode").toBe(process.env.B1_CAPTURE === "1");
      const visibility: Record<string, unknown> = {};
      for (const [name, locator] of [
        ["h1", page.getByRole("heading", { level: 1 })],
        ["cta", page.locator('#home a[href^="mailto:ricardo@enkisys.net"]').first()],
      ] as const) {
        await expect.poll(async () => {
          const state = await paintedState(locator);
          visibilitySamples.push({ name, at: Date.now(), ...state });
          return state.painted;
        }, {
          message: `${name} and ancestors must reach full opacity`, timeout: 15_000,
        }).toBe(true);
        // The longer Spanish hero puts the CTA below the fold at 720px height.
        // Scroll as a user would; preserve opacity and viewport checks.
        await locator.scrollIntoViewIfNeeded();
        visibility[name] = await paintedState(locator);
        expect((await paintedState(locator)).inViewport, `${name} intersects viewport`).toBe(true);
      }
      const rawHtml = await response!.text();
      const rawDocument = await page.evaluate((html) => {
        const document = new DOMParser().parseFromString(html, "text/html");
        return {
          title: document.title,
          h1: document.querySelector("h1")?.textContent,
          contact: document.querySelector('#home a[href^="mailto:ricardo@enkisys.net"]')?.getAttribute("href"),
        };
      }, rawHtml);
      expect(rawDocument.title).toBe(expectedTitle);
      expect(rawDocument.h1).toContain(expectedHeading);
      expect(rawDocument.contact).toMatch(/^mailto:ricardo@enkisys.net/);
      const resources = loadedAssets;
      for (const type of ["script", "stylesheet", "font"]) {
        expect(resources.some((resource) => resource.type === type && resource.status < 400), `loaded ${type} for ${path}`).toBe(true);
      }
      const redirectChain: { url: string; status: number | undefined }[] = [];
      let prior = response!.request().redirectedFrom();
      while (prior) {
        redirectChain.push({ url: prior.url(), status: (await prior.response())?.status() });
        prior = prior.redirectedFrom();
      }
      if (path === "/") {
        expect(redirectChain.some((entry) => entry.url === `${origin}/` && [301, 302, 303, 307, 308].includes(entry.status ?? 0))).toBe(true);
      }
      observations.push({
        path, status: response!.status(), finalUrl: page.url(), redirectChain,
        rawHtmlLang: rawHtml.match(/<html[^>]*\blang="([^"]+)"/)?.[1],
        runtimeLang: await page.locator("html").getAttribute("lang"),
        rawDocument, resources, visibility,
        reducedMotion: await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches),
        title: await page.title(),
        h1: await page.getByRole("heading", { level: 1 }).innerText(),
        cta: await page.locator('#home a[href^="mailto:ricardo@enkisys.net"]').first().getAttribute("href"),
      });
      const name = path === "/" ? "root" : locale;
      await testInfo.attach(`${name}-response.html`, { body: rawHtml, contentType: "text/html" });
      // Assertions finish before optional auxiliary evidence is attempted.
      expect.soft(pageErrors, "uncaught page errors").toEqual([]);
      expect.soft(failedAssets, "failed first-party resources").toEqual([]);
      expect.soft(consoleMessages.filter((message) => message.type === "error"), "console errors").toEqual([]);
      expect.soft(blockedRequests, "no external/API/mutation requests").toEqual([]);
      expect.soft(blockedSockets, "no websocket attempts").toEqual([]);
      if (process.env.B1_CAPTURE === "1") {
        await page.screenshot({ path: testInfo.outputPath(`${name}-desktop.png`), fullPage: false, timeout: 20_000 });
      }
    } finally {
      // Run error checks even if a route assertion or auxiliary capture fails.
      expect.soft(pageErrors, "final uncaught page errors").toEqual([]);
      expect.soft(failedAssets, "final failed first-party resources").toEqual([]);
      expect.soft(consoleMessages.filter((message) => message.type === "error"), "final console errors").toEqual([]);
      expect.soft(blockedRequests, "final external/API/mutation requests").toEqual([]);
      expect.soft(blockedSockets, "final websocket attempts").toEqual([]);
      await testInfo.attach("b1-observations.json", {
        body: JSON.stringify({ observations, visibilitySamples, consoleMessages, pageErrors, failedAssets, blockedRequests, blockedSockets, loadedAssets }, null, 2),
        contentType: "application/json",
      });
    }
  });
}
