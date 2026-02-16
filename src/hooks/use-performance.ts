"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function usePrefersReducedMotion() {
  const matches = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return emptySubscribe();
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
    () => false // server snapshot
  );

  return matches;
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element | null>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      options
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, options, hasIntersected]);

  return { isIntersecting, hasIntersected };
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fcp: null as number | null,
    lcp: null as number | null,
    fid: null as number | null,
    cls: null as number | null,
  });

  useEffect(() => {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry;
      setMetrics(prev => ({ ...prev, fcp: lastEntry.startTime }));
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry;
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay - PerformanceEventTiming has processingStart
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const timing = entry as PerformanceEventTiming;
        if ("processingStart" in timing) {
          setMetrics((prev) => ({ ...prev, fid: timing.processingStart - entry.startTime }));
        }
      });
    });
    fidObserver.observe({ entryTypes: ["first-input"] });

    // Cumulative Layout Shift - LayoutShift has hadRecentInput and value
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const shift = entry as { hadRecentInput?: boolean; value?: number };
        if (shift && "hadRecentInput" in shift && !shift.hadRecentInput && "value" in shift && typeof shift.value === "number") {
          clsValue += shift.value;
        }
      });
      setMetrics((prev) => ({ ...prev, cls: clsValue }));
    });
    clsObserver.observe({ entryTypes: ["layout-shift"] });

    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  return metrics;
}