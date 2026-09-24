// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, test, vi } from "vitest";
import { DomainColoringCanvas } from "./domain-coloring-canvas";
import { installMotionMedia } from "@/test/mobile-dom";

const graphics = vi.hoisted(() => ({
  mode: "normal", dispose: vi.fn(), forceContextLoss: vi.fn(), unmount: vi.fn(), render: vi.fn(),
}));
vi.mock("three", async (importOriginal) => ({
  ...await importOriginal<typeof import("three")>(),
  WebGLRenderer: class {
    constructor() {
      if (graphics.mode === "throw" || graphics.mode === "unavailable") throw new Error("GL unavailable");
    }
    dispose = graphics.dispose;
    forceContextLoss = graphics.forceContextLoss;
  },
}));
vi.mock("@react-three/fiber", () => ({
  createRoot: () => ({
    configure: async () => { if (graphics.mode === "configure-rejects") throw new Error("configure failed"); },
    render: graphics.render, unmount: graphics.unmount,
  }),
  events: vi.fn(), extend: vi.fn(), useFrame: vi.fn(), useThree: vi.fn(),
}));
afterEach(() => { graphics.mode = "normal"; vi.restoreAllMocks(); vi.unstubAllGlobals(); });

async function mount(policy = {}) {
  const media = installMotionMedia(policy);
  vi.spyOn(HTMLCanvasElement.prototype, "getBoundingClientRect").mockReturnValue({
    width: 1280, height: 844, top: 0, left: 0, right: 1280, bottom: 844, x: 0, y: 0, toJSON: () => ({}),
  });
  vi.stubGlobal("ResizeObserver", class { observe() {} disconnect() {} });
  let onIntersection: IntersectionObserverCallback | undefined;
  const disconnect = vi.fn(); const observe = vi.fn();
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { onIntersection = callback; }
    observe = observe; disconnect = disconnect;
  });
  const host = document.createElement("div"); document.body.append(host);
  const root = createRoot(host);
  await act(async () => root.render(createElement(DomainColoringCanvas)));
  return {
    host, media, observe, disconnect,
    intersect: async (isIntersecting: boolean) => {
      await act(async () => {
        onIntersection?.([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver);
      });
      await act(async () => { await vi.dynamicImportSettled(); });
    },
    cleanup: async () => { await act(async () => root.unmount()); host.remove(); },
  };
}

test("mounts graphics only while its section intersects the viewport and disconnects on cleanup", async () => {
  const view = await mount();
  try {
    expect(view.host.querySelector("canvas")).toBeNull();
    expect(view.observe).toHaveBeenCalledWith(view.host.firstElementChild);
    await view.intersect(true);
    expect(view.host.querySelector("canvas")).not.toBeNull();
    await view.intersect(false);
    expect(view.host.querySelector("canvas")).toBeNull();
    expect(graphics.unmount).toHaveBeenCalled();
    expect(graphics.dispose).toHaveBeenCalled();
    expect(graphics.forceContextLoss).toHaveBeenCalled();
    await view.intersect(true);
    expect(view.host.querySelector("canvas")).not.toBeNull();
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    await act(async () => { document.dispatchEvent(new Event("visibilitychange")); });
    expect(view.host.querySelector("canvas")).toBeNull();
  } finally { await view.cleanup(); }
  expect(view.disconnect).toHaveBeenCalledOnce();
});

test.each([{ desktop: false }, { coarse: true }, { reduced: true }])("static policy %j never mounts graphics", async (policy) => {
  const view = await mount(policy);
  try {
    await view.intersect(true);
    expect(view.host.querySelector("canvas")).toBeNull();
    expect(view.host.querySelector("[data-domain-fallback]")).not.toBeNull();
  } finally { await view.cleanup(); }
});

test.each(["throw", "unavailable", "configure-rejects", "contextlost"])("desktop %s leaves a local static fallback", async (mode) => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  graphics.mode = mode;
  const view = await mount();
  try {
    await view.intersect(true);
    if (mode === "contextlost") {
      const canvas = view.host.querySelector("canvas"); expect(canvas).not.toBeNull();
      await act(async () => { canvas!.dispatchEvent(new Event("webglcontextlost", { cancelable: true })); });
    }
    expect(view.host.querySelector("canvas")).toBeNull();
    expect(view.host.firstElementChild?.getAttribute("data-domain-decoration")).toBe("fallback");
    expect(view.host.querySelector("[data-domain-fallback]")).not.toBeNull();
    await view.intersect(false); await view.intersect(true);
    expect(view.host.querySelector("canvas")).toBeNull();
  } finally { await view.cleanup(); }
});
