import { test, expect } from "./mobile-test";
import { isolate, painted, runtimeMode } from "./mobile-helpers";

for (const locale of ["es", "en"] as const) {
  test.describe(`${locale} native touch navigation`, () => {
    test.use({ contextOptions: {
      viewport: { width: 320, height: 844 }, isMobile: true, hasTouch: true,
      javaScriptEnabled: false, reducedMotion: "reduce", serviceWorkers: "block",
    } });
    test("opens, follows a section and closes with touch while scripts are disabled", async ({ page, context, baseURL }) => {
      const guard = await isolate(context, new URL(baseURL!).origin);
      await page.goto(`/${locale}`);
      await runtimeMode(page, context, { width: 320, mobile: true, touch: true, reduced: true, js: false });
      expect(await page.evaluate(() => "__next_f" in window)).toBe(false);
      const menu = page.locator("nav details");
      const summary = menu.locator("summary");
      await summary.tap();
      await expect(menu).toHaveAttribute("open", "");
      await painted(menu.locator('a[href="#services"]'), false);
      await menu.locator('a[href="#services"]').tap();
      await expect(page).toHaveURL(/#services$/);
      await summary.tap();
      await expect(menu).not.toHaveAttribute("open", "");
      await painted(page.locator("#services h2"), false);
      expect(guard.unexpected).toEqual([]);
    });
  });
}
