"use client";

import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useDecorativeMotionAllowed } from "@/hooks/use-performance";

export type ComplexFunctionType = 'transfer' | 'sinc' | 'essential' | 'mobius';
export type ColorMode = 'monochrome' | 'duotone' | 'subtle' | 'brand' | 'rainbow';

export interface DomainColoringProps {
  functionType?: ComplexFunctionType;
  colorMode?: ColorMode;
  speed?: number;
  opacity?: number;
  mouseInfluence?: number;
  colorShift?: number;
  zoom?: number;
  className?: string;
}

const DomainScene = lazy(() => import("./domain-coloring-scene").then(
  (module) => ({ default: module.DomainColoringScene })
));

class DecorationBoundary extends Component<
  { children: ReactNode; onUnavailable: () => void }, { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function DomainColoringCanvas({ className = "", ...props }: DomainColoringProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const enabled = useDecorativeMotionAllowed();
  const onUnavailable = useCallback(() => setFailed(true), []);
  const active = enabled && isVisible && !failed;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;
    // Preserve A's viewport contract: offscreen sections own no GL context/loop.
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    observer.observe(container);
    return () => observer.disconnect();
  }, []);


  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-domain-decoration={failed ? "fallback" : active ? "active" : "static"}
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      <div className="absolute inset-0" data-domain-fallback="" style={{
        background: "radial-gradient(ellipse at 30% 30%, rgba(0,212,255,0.035), transparent 65%)",
      }} />
      {active && (
        <DecorationBoundary onUnavailable={onUnavailable}>
          <Suspense fallback={null}>
            <DomainScene {...props} onUnavailable={onUnavailable} />
          </Suspense>
        </DecorationBoundary>
      )}
    </div>
  );
}
