import { test, expect } from "./mobile-test";
import { isolate, landing, painted, runtimeMode } from "./mobile-helpers";
import { getDictionary } from "../src/lib/i18n";

for (const locale of ["es", "en"] as const) {
  for (const policy of ["mobile", "mobile-320", "reduced-mobile", "reduced-mobile-320", "coarse-desktop", "reduced-desktop"] as const) {
    const mobile = policy.includes("mobile");
    const reduced = policy.startsWith("reduced");
    const width = mobile ? (policy.endsWith("320") ? 320 : 390) : 1280;
    test.describe(`${locale} ${policy}`, () => {
      test.use({
        contextOptions: { viewport: { width: width, height: 844 },
        isMobile: mobile, serviceWorkers: "block",
        hasTouch: policy !== "reduced-desktop",
        reducedMotion: reduced ? "reduce" : "no-preference" },
      });
      test("never requests the GL module or allocates a GL context", async ({ page, context, baseURL }) => {
        const guard = await isolate(context, new URL(baseURL!).origin);
        const scripts: Promise<string>[] = [];
        page.on("response", (response) => {
          if (response.request().resourceType() === "script") scripts.push(response.text());
        });
        await page.addInitScript(() => {
          const original = HTMLCanvasElement.prototype.getContext;
          HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
            if (/webgl/i.test(String(args[0]))) {
              document.documentElement.dataset.glAttempts = String(Number(document.documentElement.dataset.glAttempts ?? 0) + 1);
              return null;
            }
            return Reflect.apply(original, this, args);
          } as typeof original;
        });
        await page.goto(`/${locale}`);
        await runtimeMode(page, context, { width: width, mobile: mobile, touch: policy !== "reduced-desktop", reduced });
        await landing(page, locale);
        await expect(page.locator("canvas")).toHaveCount(0);
        expect(await page.locator("html").getAttribute("data-gl-attempts")).toBeNull();
        expect((await Promise.all(scripts)).some((source) => /uniform (?:int|float) uColorMode;|THREE\.WebGLRenderer:/.test(source))).toBe(false);
        if (reduced) {
          const animations = await page.evaluate(() => document.getAnimations().filter((animation) => animation.playState === "running").map((animation) => {
            const effect = animation.effect as KeyframeEffect;
            return { target: (effect.target as Element)?.outerHTML.slice(0, 250), timing: effect.getTiming(), frames: effect.getKeyframes() };
          }));
          // Framer may register delayed, zero-duration opacity 1 → 1 effects.
          // Reject visual changes and repeating motion, not those no-op records.
          const moving = animations.filter(({ timing, frames }) => timing.iterations === Infinity || new Set(frames.map((frame) => JSON.stringify(Object.entries(frame).filter(([property]) => !["offset", "computedOffset", "easing", "composite"].includes(property))))).size > 1);
          expect(moving, "reduced motion has no changing keyframes or infinite loops").toEqual([]);
          const typewriter = page.locator("[data-typewriter]");
          await expect(typewriter).toHaveText(getDictionary(locale).home.hero.typewriter[0]);
          await expect(page.locator("[data-typewriter-cursor]")).toHaveCount(0);
          expect(await page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe("auto");
        }
        expect(guard.unexpected).toEqual([]);
      });
    });
  }

  for (const failure of ["missing", "throws"] as const) {
    test.describe(`${locale} desktop GL ${failure}`, () => {
      test.use({ contextOptions: { viewport: { width: 1280, height: 844 }, isMobile: false, hasTouch: false, reducedMotion: "no-preference", serviceWorkers: "block" } });
      test("preserves the page with a static local fallback", async ({ page, context, baseURL }) => {
        const guard = await isolate(context, new URL(baseURL!).origin);
        const errors: string[] = []; page.on("pageerror", (error) => errors.push(error.message));
        await page.addInitScript((mode) => {
          const original = HTMLCanvasElement.prototype.getContext;
          HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
            if (/webgl/i.test(String(args[0]))) {
              document.documentElement.dataset.glAttempts = String(Number(document.documentElement.dataset.glAttempts ?? 0) + 1);
              if (mode === "throws") throw new Error("Simulated local GL initialization failure");
              return null;
            }
            return Reflect.apply(original, this, args);
          } as typeof original;
        }, failure);
        await page.goto(`/${locale}`);
        await runtimeMode(page, context, { width: 1280, mobile: false, touch: false, reduced: false });
        await expect.poll(async () => Number(await page.locator("html").getAttribute("data-gl-attempts"))).toBeGreaterThan(0);
        await expect(page.locator('#home [data-domain-decoration="fallback"]')).toHaveCount(1);
        await expect(page.locator("#home canvas")).toHaveCount(0);
        await painted(page.locator("h1"));
        await landing(page, locale);
        expect(errors).toEqual([]); expect(guard.unexpected).toEqual([]);
      });
    });
  }
}

test.describe("enabled desktop lifecycle", () => {
  test.use({ contextOptions: { viewport: { width: 1280, height: 844 }, isMobile: false, hasTouch: false, reducedMotion: "no-preference", serviceWorkers: "block" } });
  test("context loss removes only decoration and keeps it static", async ({ page, context, baseURL }) => {
    const guard = await isolate(context, new URL(baseURL!).origin);
    const errors: string[] = []; page.on("pageerror", (error) => errors.push(error.message));
    const usableGL = await page.evaluate(() => {
      try {
        const gl = document.createElement("canvas").getContext("webgl2");
        if (!gl) return false;
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        return true;
      } catch { return false; }
    });
    test.skip(!usableGL, "Browser capability probe has no WebGL2; null/throw fallbacks run separately.");
    await page.goto("/en");
    await runtimeMode(page, context, { width: 1280, mobile: false, touch: false, reduced: false });
    const decoration = page.locator("#home [data-domain-decoration]");
    await expect.poll(async () => {
      if (await decoration.getAttribute("data-domain-decoration") === "fallback") return "fallback";
      return await page.locator('#home canvas[data-domain-ready="true"]').count() ? "ready" : "pending";
    }).toMatch(/ready|fallback/);
    await expect(page.locator('#home canvas[data-domain-ready="true"]')).toHaveCount(1);
    const canvas = page.locator("#home canvas"); await expect(canvas).toBeVisible();
    await page.locator("#services").evaluate((element) => window.scrollTo({ top: element.getBoundingClientRect().top + scrollY + 200, behavior: "instant" }));
    await expect(canvas).toHaveCount(0);
    await expect(page.locator('#services canvas[data-domain-ready="true"]')).toHaveCount(1);
    expect(await page.locator("canvas").count()).toBeLessThanOrEqual(2);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(page.locator('#home canvas[data-domain-ready="true"]')).toHaveCount(1);
    // Exercise actual driver context loss where exposed; retain the event fallback.
    await canvas.evaluate((element) => {
      const gl = (element as HTMLCanvasElement).getContext("webgl2");
      const extension = gl?.getExtension("WEBGL_lose_context");
      if (extension) extension.loseContext();
      else element.dispatchEvent(new Event("webglcontextlost", { cancelable: true }));
    });
    await expect(decoration).toHaveAttribute("data-domain-decoration", "fallback");
    await expect(canvas).toHaveCount(0);
    await landing(page, "en");
    expect(errors).toEqual([]); expect(guard.unexpected).toEqual([]);
  });

  test("live reduced motion unmounts graphics and resets typewriter", async ({ page, context, baseURL }) => {
    const guard = await isolate(context, new URL(baseURL!).origin);
    await page.goto("/es");
    await expect(page.locator("[data-typewriter-cursor]")).toHaveCount(1);
    await runtimeMode(page, context, { width: 1280, mobile: false, touch: false, reduced: false });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await runtimeMode(page, context, { width: 1280, mobile: false, touch: false, reduced: true });
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page.locator("[data-typewriter-cursor]")).toHaveCount(0);
    await expect(page.locator("[data-typewriter]")).toHaveText(getDictionary("es").home.hero.typewriter[0]);
    await expect(page.locator('[data-domain-decoration="active"]')).toHaveCount(0);
    expect(await page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe("auto");
    await landing(page, "es");
    expect(guard.unexpected).toEqual([]);
  });
});
