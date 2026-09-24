import { test, expect } from "./mobile-test";
import { isolate, landing, runtimeMode } from "./mobile-helpers";
import { getDictionary } from "../src/lib/i18n";

for (const locale of ["es", "en"] as const) {
  test.describe(`${locale} live decoration policy`, () => {
    test.use({ contextOptions: { viewport: { width: 1280, height: 844 }, isMobile: false,
      hasTouch: false, reducedMotion: "no-preference", serviceWorkers: "block" } });
    test("resize and live reduced motion stop parallax, pulses, magnetism and text cycling", async ({ page, context, baseURL }) => {
      const guard = await isolate(context, new URL(baseURL!).origin);
      await page.goto(`/${locale}`);
      await runtimeMode(page, context, { width: 1280, mobile: false, touch: false, reduced: false });
      await expect(page.locator('#home canvas[data-domain-ready="true"]')).toHaveCount(1);
      await expect(page.locator("#home .will-change-transform")).toHaveCount(2);
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(page.locator("canvas")).toHaveCount(0);
      await expect(page.locator(".will-change-transform")).toHaveCount(0);
      await page.setViewportSize({ width: 1280, height: 844 });
      await expect(page.locator('#home canvas[data-domain-ready="true"]')).toHaveCount(1);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await runtimeMode(page, context, { width: 1280, mobile: false, touch: false, reduced: true });
      await expect(page.locator("canvas")).toHaveCount(0);
      await expect(page.locator(".will-change-transform")).toHaveCount(0);
      await expect(page.locator("[data-typewriter-cursor]")).toHaveCount(0);
      await expect(page.locator("[data-typewriter]")).toHaveText(getDictionary(locale).home.hero.typewriter[0]);
      await landing(page, locale);
      const samples = await page.evaluate(async () => {
        const snapshot = () => Array.from(document.querySelectorAll("#home *, #services *, #about *, #contact *, footer *")).map((element) => {
          const style = getComputedStyle(element);
          return { transform: style.transform, animation: style.animationName, transition: style.transitionDuration };
        });
        const before = snapshot();
        window.dispatchEvent(new MouseEvent("mousemove", { clientX: 600, clientY: 400 }));
        window.scrollTo({ top: document.querySelector("#services")!.getBoundingClientRect().top + scrollY, behavior: "auto" });
        await new Promise((resolve) => setTimeout(resolve, 600));
        const after = snapshot();
        const moving = document.getAnimations().filter((animation) => {
          if (animation.playState !== "running") return false;
          const effect = animation.effect as KeyframeEffect;
          return effect.getTiming().iterations === Infinity || new Set(effect.getKeyframes().map((frame) => JSON.stringify(Object.entries(frame).filter(([key]) => !["offset", "computedOffset", "easing", "composite"].includes(key))))).size > 1;
        }).map((animation) => (animation.effect as KeyframeEffect).target?.outerHTML.slice(0, 200));
        return { before, after, moving, smooth: getComputedStyle(document.documentElement).scrollBehavior };
      });
      expect(samples.after).toEqual(samples.before);
      expect(samples.after.every((style) => style.transform === "none" && style.animation === "none" && style.transition === "0s")).toBe(true);
      expect(samples.moving).toEqual([]);
      expect(samples.smooth).toBe("auto");
      await expect(page.locator("[data-typewriter]")).toHaveText(getDictionary(locale).home.hero.typewriter[0]);
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await expect(page.locator('#home canvas[data-domain-ready="true"]')).toHaveCount(1);
      await expect(page.locator("[data-typewriter-cursor]")).toHaveCount(1);
      expect(guard.unexpected).toEqual([]);
    });
  });
}

test.describe("desktop page visibility and lifecycle", () => {
  test.use({ contextOptions: { viewport: { width: 1280, height: 844 }, isMobile: false,
    hasTouch: false, reducedMotion: "no-preference", serviceWorkers: "block" } });
  test("hidden-tab policy cleans up and reports lifecycle capability", async ({ page, context, baseURL }, testInfo) => {
    const guard = await isolate(context, new URL(baseURL!).origin);
    await page.goto("/en");
    await expect(page.locator('#home canvas[data-domain-ready="true"]')).toHaveCount(1);
    const cdp = await context.newCDPSession(page);
    const lifecycle: string[] = [];
    await cdp.send("Page.enable");
    await cdp.send("Page.setLifecycleEventsEnabled", { enabled: true });
    cdp.on("Page.lifecycleEvent", (event) => lifecycle.push(event.name));
    // Headless Chromium often keeps both pages visible. Record the actual result;
    // do not label a new foreground page as proof of visibilitychange.
    const other = await context.newPage(); await other.bringToFront();
    const backgroundVisibility = await page.evaluate(() => document.visibilityState);
    if (backgroundVisibility === "hidden") await expect(page.locator("canvas")).toHaveCount(0);
    await other.close(); await page.bringToFront();
    await expect(page.locator('#home canvas[data-domain-ready="true"]')).toHaveCount(1);
    // Explicit visibility-event simulation exercises the browser component policy
    // even when the headless window manager cannot hide a physical tab.
    await page.evaluate(() => {
      Object.defineProperty(document, "visibilityState", { configurable: true, get: () => "hidden" });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page.locator(".will-change-transform")).toHaveCount(0);
    await page.evaluate(() => {
      Reflect.deleteProperty(document, "visibilityState");
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await expect(page.locator('#home canvas[data-domain-ready="true"]')).toHaveCount(1);
    await page.evaluate(() => {
      const events: string[] = [];
      document.documentElement.dataset.lifecycleProbe = "[]";
      for (const name of ["freeze", "resume"]) document.addEventListener(name, () => {
        events.push(name);
        document.documentElement.dataset.lifecycleProbe = JSON.stringify(events);
      });
    });
    await cdp.send("Page.setWebLifecycleState", { state: "frozen" });
    await cdp.send("Page.setWebLifecycleState", { state: "active" });
    // Some drivers resume as hidden until activated again.
    await page.bringToFront();
    await expect(page.locator("h1")).toContainText(getDictionary("en").home.hero.title);
    await landing(page, "en");
    const documentLifecycleEvents = await page.evaluate(() => JSON.parse(document.documentElement.dataset.lifecycleProbe ?? "[]") as string[]);
    if (documentLifecycleEvents.length) expect(documentLifecycleEvents).toEqual(["freeze", "resume"]);
    else testInfo.annotations.push({ type: "capability", description: "CDP commands accepted without DOM freeze/resume events; actual page freezing is not verified in this headless session." });
    await testInfo.attach("page-lifecycle", { body: JSON.stringify({ backgroundVisibility, hiddenPolicy: "explicit DOM visibility simulation", freezeResumeCommand: "CDP Page.setWebLifecycleState", documentLifecycleEvents, actualFreezeResumeVerified: documentLifecycleEvents.length === 2, lifecycle }), contentType: "application/json" });
    await cdp.detach();
    expect(guard.unexpected).toEqual([]);
  });
});
