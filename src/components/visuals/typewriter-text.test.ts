// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, expect, test, vi } from "vitest";
import { TypewriterText } from "./typewriter-text";
import { installMotionMedia } from "@/test/mobile-dom";

afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

test("SSR exposes complete text, without an invisible entrance or cursor", () => {
  const html = renderToString(createElement(TypewriterText, { texts: ["Complete message"] }));
  expect(html).toContain("Complete message");
  expect(html).not.toContain("opacity:0");
  expect(html).not.toContain("data-typewriter-cursor");
});

test("reduce from load and live changes leave complete text with zero timers", async () => {
  const media = installMotionMedia({ reduced: true }); vi.useFakeTimers();
  const host = document.createElement("div"); const root = createRoot(host);
  try {
    await act(async () => root.render(createElement(TypewriterText, {
      texts: ["Complete message", "Another message"], delayBetweenTexts: 100, deletingSpeed: 10,
    })));
    expect(host.textContent).toBe("Complete message");
    expect(vi.getTimerCount()).toBe(0);
    await act(async () => media({ reduced: false }));
    expect(vi.getTimerCount()).toBe(2);
    await act(async () => { vi.advanceTimersByTime(100); });
    await act(async () => { vi.advanceTimersByTime(10); });
    expect(host.textContent).not.toBe("Complete message|");
    await act(async () => media({ reduced: true }));
    expect(host.textContent).toBe("Complete message");
    expect(host.querySelector("[data-typewriter-cursor]")).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
    await act(async () => media({ reduced: false }));
  } finally { await act(async () => root.unmount()); }
  expect(vi.getTimerCount()).toBe(0);
});
