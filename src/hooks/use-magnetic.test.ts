// @vitest-environment jsdom
import { act, createElement, createRef } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, test, vi } from "vitest";
import { useMagneticField } from "./use-magnetic";
import { installMotionMedia } from "@/test/mobile-dom";

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

test("one field RAF survives pointer/rerenders and is cancelled on policy change and unmount", async () => {
  const media = installMotionMedia();
  const pending = new Map<number, FrameRequestCallback>();
  let nextId = 0;
  const request = vi.fn((callback: FrameRequestCallback) => { pending.set(++nextId, callback); return nextId; });
  vi.stubGlobal("requestAnimationFrame", request);
  vi.stubGlobal("cancelAnimationFrame", (id: number) => pending.delete(id));
  const ref = createRef<HTMLDivElement>();
  const refs = [ref];
  function Field({ empty = false, enabled = true }) {
    const states = useMagneticField(empty ? [] : refs, { enabled });
    return createElement("div", { ref, "data-x": states[0]?.x ?? 0 });
  }
  const host = document.createElement("div"); document.body.append(host);
  const root = createRoot(host);
  try {
    await act(async () => root.render(createElement(Field)));
    expect(pending.size).toBe(1);
    for (let i = 0; i < 5; i++) {
      await act(async () => { window.dispatchEvent(new MouseEvent("mousemove", { clientX: i + 1 })); });
      await act(async () => root.render(createElement(Field)));
    }
    expect(request).toHaveBeenCalledTimes(1);
    const [id, tick] = [...pending][0]; pending.delete(id);
    await act(async () => tick(16));
    expect(pending.size).toBe(1);
    await act(async () => media({ reduced: true }));
    expect(pending.size).toBe(0);
    expect(host.firstElementChild?.getAttribute("data-x")).toBe("0");
    await act(async () => media({ reduced: false, coarse: true }));
    expect(pending.size).toBe(0);
    await act(async () => media({ coarse: false, desktop: false }));
    expect(pending.size).toBe(0);
    await act(async () => media({ desktop: true }));
    expect(pending.size).toBe(1);
    await act(async () => root.render(createElement(Field, { empty: true })));
    expect(pending.size).toBe(0);
    await act(async () => root.render(createElement(Field, { enabled: false })));
    expect(pending.size).toBe(0);
    await act(async () => root.render(createElement(Field)));
    expect(pending.size).toBe(1);
  } finally {
    await act(async () => root.unmount()); host.remove();
  }
  expect(pending.size).toBe(0);
});

test.each([{ empty: true }, { enabled: false }, { coarse: true }, { reduced: true }, { desktop: false }])(
  "disabled field never starts a RAF: %j", async (policy) => {
    installMotionMedia({
      reduced: "reduced" in policy && policy.reduced === true,
      coarse: "coarse" in policy && policy.coarse === true,
      desktop: !("desktop" in policy) || policy.desktop !== false,
    });
    const request = vi.fn(); vi.stubGlobal("requestAnimationFrame", request);
    const refs = [createRef<HTMLDivElement>()];
    function Field() { useMagneticField("empty" in policy ? [] : refs, { enabled: !("enabled" in policy) || policy.enabled !== false }); return null; }
    const root = createRoot(document.createElement("div"));
    try { await act(async () => root.render(createElement(Field))); expect(request).not.toHaveBeenCalled(); }
    finally { await act(async () => root.unmount()); }
  }
);
