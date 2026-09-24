"use client";

import { useEffect, useState, useRef, RefObject } from "react";
import { useDecorativeMotionAllowed, usePrefersReducedMotion } from "./use-performance";

export interface MagneticOptions {
  strength?: number;
  range?: number;
  ease?: number;
}

export interface MagneticPosition {
  x: number;
  y: number;
  distance: number;
  angle: number;
}

export function useMagneticInteraction(
  elementRef: RefObject<HTMLElement>,
  options: MagneticOptions = {}
) {
  const { strength = 0.3, range = 150, ease = 0.15 } = options;
  const prefersReducedMotion = usePrefersReducedMotion();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Track mouse position
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  // Calculate magnetic attraction
  useEffect(() => {
    if (prefersReducedMotion || !elementRef.current) return;

    const updateMagneticPosition = () => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const distance = Math.sqrt(
        Math.pow(mousePosition.x - elementCenter.x, 2) +
        Math.pow(mousePosition.y - elementCenter.y, 2)
      );

      // Only apply magnetic effect when mouse is within range
      if (distance < range) {
        const angle = Math.atan2(
          mousePosition.y - elementCenter.y,
          mousePosition.x - elementCenter.x
        );

        const force = (range - distance) / range;
        const targetOffset = {
          x: Math.cos(angle) * force * strength * 20,
          y: Math.sin(angle) * force * strength * 20,
        };

        // Smooth interpolation
        setMagneticOffset(prev => ({
          x: prev.x + (targetOffset.x - prev.x) * ease,
          y: prev.y + (targetOffset.y - prev.y) * ease,
        }));
      } else {
        // Gradually return to center
        setMagneticOffset(prev => ({
          x: prev.x * (1 - ease * 0.5),
          y: prev.y * (1 - ease * 0.5),
        }));
      }

      animationFrameRef.current = requestAnimationFrame(updateMagneticPosition);
    };

    updateMagneticPosition();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, elementRef, strength, range, ease, prefersReducedMotion]);

  // Handle hover state
  useEffect(() => {
    const element = elementRef.current;
    if (!element || prefersReducedMotion) return;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [elementRef, prefersReducedMotion]);

  return {
    magneticOffset,
    isHovering,
    prefersReducedMotion,
  };
}

// One RAF chain per mounted field. Pointer movement updates a ref, not the effect.
export function useMagneticField(
  elements: RefObject<HTMLDivElement | null>[],
  options: MagneticOptions & { enabled?: boolean } = {}
) {
  const motionAllowed = useDecorativeMotionAllowed();
  const { strength = 0.25, range = 120, ease = 0.12, enabled = true } = options;
  const active = enabled && motionAllowed && elements.length > 0;
  const mouse = useRef<{ x: number; y: number } | null>(null);
  const [states, setStates] = useState(() => elements.map(zeroMagneticState));

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    let disposed = false;
    const onMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY };
    };
    const update = () => {
      if (disposed) return;
      setStates((previous) => {
        const next = elements.map((ref, index) => {
          const previousState = previous[index] ?? zeroMagneticState();
          if (!ref.current || !mouse.current) return zeroMagneticState();
          const rect = ref.current.getBoundingClientRect();
          const dx = mouse.current.x - (rect.left + rect.width / 2);
          const dy = mouse.current.y - (rect.top + rect.height / 2);
          const distance = Math.hypot(dx, dy);
          const angle = Math.atan2(dy, dx);
          const isActive = distance < range;
          const force = isActive ? (range - distance) / range * strength * 15 : 0;
          const smooth = (from: number, to: number) => {
            const value = from + (to - from) * ease;
            return Math.abs(value - to) < 0.01 ? to : value;
          };
          return {
            x: smooth(previousState.x, Math.cos(angle) * force),
            y: smooth(previousState.y, Math.sin(angle) * force),
            distance, angle, isActive,
          };
        });
        return next.length === previous.length && next.every((value, index) => {
          const old = previous[index];
          return value.x === old.x && value.y === old.y && value.distance === old.distance
            && value.angle === old.angle && value.isActive === old.isActive;
        }) ? previous : next;
      });
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(update);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      mouse.current = null;
      window.removeEventListener("mousemove", onMove);
    };
  }, [active, elements, strength, range, ease]);

  return active ? states : elements.map(zeroMagneticState);
}

function zeroMagneticState() {
  return { x: 0, y: 0, distance: 0, angle: 0, isActive: false };
}
