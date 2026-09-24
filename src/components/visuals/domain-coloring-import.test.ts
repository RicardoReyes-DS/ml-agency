// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, test, vi } from "vitest";
import { DomainColoringCanvas } from "./domain-coloring-canvas";
import { installMotionMedia } from "@/test/mobile-dom";

vi.mock("./domain-coloring-scene", () => { throw new Error("chunk unavailable"); });
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

test("a rejected dynamic import stays local and retains the static decoration", async () => {
  installMotionMedia();
  vi.spyOn(console, "error").mockImplementation(() => {});
  let intersect: IntersectionObserverCallback | undefined;
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { intersect = callback; }
    observe() {} disconnect() {}
  });
  const host = document.createElement("div"); const root = createRoot(host);
  try {
    await act(async () => root.render(createElement("section", null,
      createElement("h1", null, "Visible content"), createElement(DomainColoringCanvas))));
    await act(async () => intersect?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
    await act(async () => { await vi.dynamicImportSettled(); });
    expect(host.querySelector("h1")?.textContent).toBe("Visible content");
    expect(host.querySelector('[data-domain-decoration="fallback"]')).not.toBeNull();
    expect(host.querySelector("[data-domain-fallback]")).not.toBeNull();
  } finally { await act(async () => root.unmount()); }
});
