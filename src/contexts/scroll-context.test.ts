// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, test, vi } from "vitest";
import { ScrollProvider } from "./scroll-context";
import { installMotionMedia } from "@/test/mobile-dom";

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

test("scroll RAF is cancelled on reduced, touch, hidden tab and unmount without duplicate chains", async () => {
  const media = installMotionMedia();
  const pending = new Map<number, FrameRequestCallback>(); let next = 0;
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { pending.set(++next, callback); return next; });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => pending.delete(id));
  const root = createRoot(document.createElement("div"));
  try {
    await act(async () => root.render(createElement(ScrollProvider, null, null)));
    expect(pending.size).toBe(1);
    for (let index = 0; index < 10; index++) {
      window.dispatchEvent(new Event("scroll")); window.dispatchEvent(new Event("resize"));
      expect(pending.size).toBe(1);
    }
    await act(async () => media({ reduced: true }));
    expect(pending.size).toBe(0);
    window.dispatchEvent(new Event("scroll")); expect(pending.size).toBe(0);
    await act(async () => media({ reduced: false, coarse: true }));
    expect(pending.size).toBe(0);
    await act(async () => media({ coarse: false })); expect(pending.size).toBe(1);
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    await act(async () => { document.dispatchEvent(new Event("visibilitychange")); });
    expect(pending.size).toBe(0);
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    await act(async () => { document.dispatchEvent(new Event("visibilitychange")); });
    expect(pending.size).toBe(1);
  } finally { await act(async () => root.unmount()); }
  expect(pending.size).toBe(0);
  window.dispatchEvent(new Event("scroll")); expect(pending.size).toBe(0);
});
