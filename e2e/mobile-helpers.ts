import { expect, type BrowserContext, type Locator, type Page } from "@playwright/test";
import { getDictionary, type Locale } from "../src/lib/i18n";

export async function isolate(context: BrowserContext, origin: string, holdScripts = false) {
  const unexpected: string[] = [];
  let releaseScripts: () => void = () => {};
  let holding = holdScripts;
  let heldCount = 0;
  const released = new Promise<void>((resolve) => { releaseScripts = resolve; });
  await context.route("**/*", async (route) => {
    const request = route.request(); const url = new URL(request.url());
    if (url.origin !== origin || /^\/api(?:\/|$)/.test(url.pathname) || !["GET", "HEAD"].includes(request.method())) {
      unexpected.push(`${request.method()} ${url}`);
      await route.abort("blockedbyclient"); return;
    }
    // Local page prefetches are harmless; demos are never opened by these tests.
    if (holding && request.resourceType() === "script") { heldCount++; await released; }
    await route.continue();
  });
  await context.routeWebSocket(/.*/, (socket) => { unexpected.push(socket.url()); socket.close(); });
  return {
    unexpected,
    held: () => heldCount,
    release: () => { holding = false; releaseScripts(); },
  };
}

export async function painted(locator: Locator, scroll = true) {
  // Keep scrolling and the computed-state sample in one browser turn. This
  // avoids redundant protocol round trips without weakening visibility checks.
  const state = await locator.evaluate((element, shouldScroll) => {
    if (shouldScroll) element.scrollIntoView({ block: "center", behavior: "instant" });
    let opacity = 1; let visible = true;
    for (let node: Element | null = element; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      opacity *= Number(style.opacity);
      visible &&= style.visibility === "visible" && style.display !== "none" && style.contentVisibility !== "hidden";
    }
    const bounds = element.getBoundingClientRect();
    return {
      opacity, visible, text: element.textContent?.trim(), width: bounds.width, height: bounds.height,
      withinX: bounds.left >= -1 && bounds.right <= innerWidth + 1,
      inViewport: bounds.top < innerHeight && bounds.bottom > 64,
    };
  }, scroll);
  expect(state.text).toBeTruthy();
  expect(state.opacity, "opacity product of element and all ancestors").toBeGreaterThanOrEqual(0.99);
  expect(state.visible).toBe(true);
  expect(state.width).toBeGreaterThan(0); expect(state.height).toBeGreaterThan(0);
  expect(state.withinX, "content must fit horizontally").toBe(true);
  expect(state.inViewport, "content intersects viewport below fixed navigation").toBe(true);
}

export async function landing(page: Page, locale: Locale) {
  const copy = getDictionary(locale).home;
  await expect(page.locator("html")).toHaveAttribute("lang", locale);
  await expect(page.locator("h1")).toContainText(copy.hero.title);
  await expect(page.locator("h1")).toContainText(copy.hero.titleAccent);
  await painted(page.locator("h1"));
  await painted(page.locator("#home p").first());
  const contact = page.locator('#home a[href^="mailto:"]').first();
  await expect(contact).toHaveAttribute("href", /^mailto:ricardo@enkisys\.net/);
  await painted(contact);
  await painted(page.locator("#services h2"));
  await painted(page.locator("#services").getByRole("heading", { name: copy.services.cards[0].title, exact: true }));
  await painted(page.locator("#services").getByText(copy.services.cards[0].description, { exact: true }));
  await painted(page.locator('#services a[href*="/demos/"]').first());
  await painted(page.locator("#about h2"));
  await painted(page.locator("#about p").first());
  await painted(page.locator("#contact h2"));
  await painted(page.locator('#contact a[href^="mailto:"]').first());
  await painted(page.locator('footer a[href^="mailto:"]').first());
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
}

export async function nativeMenu(page: Page, locale: Locale, switchLanguage = false) {
  const menu = page.locator("nav details");
  const summary = menu.locator("summary");
  await summary.focus(); await summary.press("Enter");
  await expect(menu).toHaveAttribute("open", "");
  await painted(menu.locator('a[href="#services"]'), false);
  await menu.locator('a[href="#services"]').click();
  await expect(page).toHaveURL(/#services$/);
  // Without JS the native menu stays open; summary still closes it accessibly.
  if (await menu.getAttribute("open") !== null) await summary.click();
  await expect(menu).not.toHaveAttribute("open", "");
  await expect.poll(() => page.locator("#services h2").evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return rect.top >= 64 && rect.top < innerHeight;
  })).toBe(true);
  await painted(page.locator("#services h2"), false);
  await summary.click();
  const next = locale === "es" ? "en" : "es";
  const language = menu.locator(`a[href="/${next}"]`);
  await painted(language, false);
  await expect(menu.locator('a[href^="mailto:"]')).toHaveAttribute("href", /^mailto:ricardo@enkisys\.net/);
  if (switchLanguage) {
    const response = page.waitForResponse((response) => response.request().isNavigationRequest() && new URL(response.url()).pathname === `/${next}`);
    await language.click();
    const html = await (await response).text();
    expect(html).toMatch(new RegExp(`<html[^>]*lang="${next}"`));
    await expect(page.locator("html")).toHaveAttribute("lang", next);
    await expect(page.locator("h1")).toContainText(getDictionary(next).home.hero.title);
  } else { await summary.click(); }
}

export async function runtimeMode(page: Page, context: BrowserContext, mode: { width: number; mobile: boolean; touch: boolean; reduced: boolean; js?: boolean }) {
  const state = await page.evaluate(() => ({ touch: navigator.maxTouchPoints > 0, coarse: matchMedia("(pointer: coarse)").matches, reduced: matchMedia("(prefers-reduced-motion: reduce)").matches }));
  expect(state).toEqual({ touch: mode.touch, coarse: mode.touch, reduced: mode.reduced });
  expect(page.viewportSize()).toEqual({ width: mode.width, height: 844 });
  // Browser context options are checked as well as their observable runtime effects.
  const options = (context as unknown as { _options: { isMobile?: boolean; javaScriptEnabled?: boolean } })._options;
  expect(options.isMobile ?? false).toBe(mode.mobile);
  if (mode.js !== undefined) expect(options.javaScriptEnabled ?? true).toBe(mode.js);
}
