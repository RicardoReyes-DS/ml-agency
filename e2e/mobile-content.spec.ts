import { test, expect } from "./mobile-test";
import { isolate, landing, nativeMenu, runtimeMode } from "./mobile-helpers";

// Each entry registers an independent test with a fresh page/context. No route loop in a test.
for (const locale of ["es", "en"] as const) {
  for (const width of [390, 320]) {
    for (const mode of ["normal", "no-js", "held-scripts"] as const) {
      test.describe(`${locale} ${width}px ${mode}`, () => {
        test.use({ contextOptions: { viewport: { width, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "no-preference", javaScriptEnabled: mode !== "no-js", serviceWorkers: "block" } });
        test("SSR content and native section/language navigation", async ({ page, context, baseURL }, testInfo) => {
          const guard = await isolate(context, new URL(baseURL!).origin, mode === "held-scripts");
          const errors: string[] = []; page.on("pageerror", (error) => errors.push(error.message));
          const hydration: string[] = [];
          page.on("console", (message) => { if (/hydration|didn't match|did not match/i.test(message.text())) hydration.push(message.text()); });
          try {
            const response = await page.goto(`/${locale}`, { waitUntil: "commit" });
            expect(response?.status()).toBe(200);
            await runtimeMode(page, context, { width, mobile: true, touch: true, reduced: false, js: mode !== "no-js" });
            expect((await response!.text()).match(/<html[^>]*>/)?.[0]).toMatch(new RegExp(`<html[^>]*lang="${locale}"`));
            // Styles must be loaded before measuring layout; scripts can remain held.
            await expect.poll(() => page.locator("body").evaluate((body) => getComputedStyle(body).backgroundColor)).toBe("rgb(10, 10, 10)");
            // Check an actual inline document script; automation init scripts bypass
            // JavaScript-disabled document execution in this driver.
            expect(await page.evaluate(() => "__next_f" in window)).toBe(mode !== "no-js");
            if (mode === "held-scripts") {
              await expect.poll(guard.held).toBeGreaterThan(0);
              await expect(page.locator("[data-typewriter-cursor]")).toHaveCount(0);
            }
            await landing(page, locale);
            await nativeMenu(page, locale, mode === "no-js");
            if (mode === "held-scripts") {
              guard.release();
              await page.waitForLoadState("load");
              await landing(page, locale);
              await nativeMenu(page, locale);
            }
            if (mode !== "no-js") {
              await expect(page.locator("[data-typewriter-cursor]")).toHaveCount(1);
              const summary = page.locator("nav details summary");
              await summary.click(); await summary.press("Escape");
              await expect(page.locator("nav details")).not.toHaveAttribute("open", "");
              await expect(summary).toBeFocused();
              await nativeMenu(page, locale, true);
            }
            expect(errors).toEqual([]); expect(hydration).toEqual([]);
            expect(guard.unexpected).toEqual([]);
            if (process.env.MOBILE_CAPTURE === "1") {
              await page.locator("h1").evaluate((element) => element.scrollIntoView({ block: "center", behavior: "instant" }));
              await page.screenshot({ path: testInfo.outputPath(`${locale}-${width}-${mode}.png`), fullPage: false, timeout: 10_000 });
            }
          } finally { guard.release(); }
        });
      });
    }
  }
}

test.describe("root without JavaScript", () => {
  test.use({ contextOptions: { javaScriptEnabled: false, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "no-preference", serviceWorkers: "block" } });
  test("redirects to Spanish with correct SSR language", async ({ page, context, baseURL }) => {
    const guard = await isolate(context, new URL(baseURL!).origin);
    const response = await page.goto("/");
    await runtimeMode(page, context, { width: 390, mobile: true, touch: true, reduced: false, js: false });
    await expect(page).toHaveURL(/\/es$/);
    expect(response!.request().redirectedFrom()).not.toBeNull();
    expect((await response!.text()).match(/<html[^>]*>/)?.[0]).toMatch(/<html[^>]*lang="es"/);
    await landing(page, "es"); expect(guard.unexpected).toEqual([]);
  });
});

for (const locale of ["es", "en"] as const) {
  test.describe(`${locale} native menu without scripts`, () => {
    test.use({ contextOptions: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, javaScriptEnabled: false, reducedMotion: "no-preference", serviceWorkers: "block" } });
    test("section and language links work with native keyboard navigation", async ({ page, context, baseURL }) => {
      const guard = await isolate(context, new URL(baseURL!).origin);
      await page.goto(`/${locale}`);
      await runtimeMode(page, context, { width: 390, mobile: true, touch: true, reduced: false, js: false });
      await nativeMenu(page, locale, true);
      expect(guard.unexpected).toEqual([]);
    });
  });
}
