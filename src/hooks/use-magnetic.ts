"use client";

import { useEffect, useState, useRef, RefObject } from "react";
import { usePrefersReducedMotion } from "./use-performance";

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

// Hook for multiple magnetic elements
export function useMagneticField(
  elements: RefObject<HTMLDivElement | null>[],
  options: MagneticOptions = {}
) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { strength = 0.25, range = 120, ease = 0.12 } = options;

  const [magneticStates, setMagneticStates] = useState(
    elements.map(() => ({ x: 0, y: 0, distance: 0, angle: 0, isActive: false }))
  );

  // Track mouse position
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  // Update magnetic states for all elements
  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateMagneticStates = () => {
      setMagneticStates(prevStates =>
        prevStates.map((_, index) => {
          const element = elements[index]?.current;
          if (!element) return { x: 0, y: 0, distance: 0, angle: 0, isActive: false };

          const rect = element.getBoundingClientRect();
          const elementCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };

          const distance = Math.sqrt(
            Math.pow(mousePosition.x - elementCenter.x, 2) +
            Math.pow(mousePosition.y - elementCenter.y, 2)
          );

          if (distance < range) {
            const angle = Math.atan2(
              mousePosition.y - elementCenter.y,
              mousePosition.x - elementCenter.x
            );

            const force = (range - distance) / range;
            const targetX = Math.cos(angle) * force * strength * 15;
            const targetY = Math.sin(angle) * force * strength * 15;

            return {
              x: targetX,
              y: targetY,
              distance,
              angle,
              isActive: true,
            };
          } else {
            // Return to center gradually
            return {
              x: prevStates[index].x * 0.9,
              y: prevStates[index].y * 0.9,
              distance,
              angle: prevStates[index].angle,
              isActive: false,
            };
          }
        })
      );

      requestAnimationFrame(updateMagneticStates);
    };

    updateMagneticStates();
  }, [mousePosition, elements, strength, range, ease, prefersReducedMotion]);

  return magneticStates;
}