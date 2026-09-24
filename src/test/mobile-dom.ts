import { vi } from "vitest";

export function installMotionMedia(initial: { reduced?: boolean; desktop?: boolean; coarse?: boolean } = {}) {
  const state = { reduced: false, desktop: true, coarse: false, ...initial };
  const listeners = new Set<() => void>();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("matchMedia", (query: string) => ({
    media: query,
    get matches() {
      if (query.includes("prefers-reduced-motion")) return state.reduced;
      if (query.includes("coarse")) return state.coarse;
      return state.desktop;
    },
    addEventListener: (_: string, callback: () => void) => listeners.add(callback),
    removeEventListener: (_: string, callback: () => void) => listeners.delete(callback),
  }));
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  return (next: Partial<typeof state>) => {
    Object.assign(state, next);
    listeners.forEach((callback) => callback());
  };
}
