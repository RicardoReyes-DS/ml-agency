// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, test, vi } from "vitest";
import { DomainColoringCanvas } from "./domain-coloring-canvas";
import { installMotionMedia } from "@/test/mobile-dom";

const loader = vi.hoisted(() => ({ imported: vi.fn(), crash: false }));
vi.mock("./domain-coloring-scene", () => {
  loader.imported();
  return { DomainColoringScene: () => {
    if (loader.crash) throw new Error("local scene render failure");
    return createElement("canvas");
  } };
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

test("the GL module stays unloaded until all policy and viewport gates pass", async () => {
  const media = installMotionMedia({ desktop: false });
  let intersect: IntersectionObserverCallback | undefined;
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { intersect = callback; }
    observe() {} disconnect() {}
  });
  const host = document.createElement("div"); const root = createRoot(host);
  try {
    await act(async () => root.render(createElement(DomainColoringCanvas)));
    const visibility = async (value: boolean) => {
      await act(async () => intersect?.([{ isIntersecting: value } as IntersectionObserverEntry], {} as IntersectionObserver));
      await act(async () => { await vi.dynamicImportSettled(); });
    };
    await visibility(true);
    expect(loader.imported).not.toHaveBeenCalled();
    await act(async () => media({ desktop: true, coarse: true }));
    expect(loader.imported).not.toHaveBeenCalled();
    await act(async () => media({ coarse: false, reduced: true }));
    expect(loader.imported).not.toHaveBeenCalled();
    await visibility(false);
    await act(async () => media({ reduced: false }));
    expect(loader.imported).not.toHaveBeenCalled();
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    await visibility(true);
    expect(loader.imported).not.toHaveBeenCalled();
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    await act(async () => { document.dispatchEvent(new Event("visibilitychange")); });
    await act(async () => { await vi.dynamicImportSettled(); });
    expect(loader.imported).toHaveBeenCalledOnce();
    expect(host.querySelector("canvas")).not.toBeNull();
    await act(async () => media({ reduced: true }));
    expect(host.querySelector("canvas")).toBeNull();
    vi.spyOn(console, "error").mockImplementation(() => {});
    loader.crash = true;
    await act(async () => media({ reduced: false }));
    expect(host.querySelector('[data-domain-decoration="fallback"]')).not.toBeNull();
  } finally { await act(async () => root.unmount()); }
});
