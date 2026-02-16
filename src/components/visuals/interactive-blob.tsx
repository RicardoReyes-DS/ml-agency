"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-performance";
import { cn } from "@/lib/utils";

interface InteractiveBlobProps {
  className?: string;
  parallaxStrength?: number; // How much it moves with scroll (negative for reverse direction)
  mouseStrength?: number; // How much it moves with mouse
}

export function InteractiveBlob({
  className,
  parallaxStrength = 0.2,
  mouseStrength = 0.4,
}: InteractiveBlobProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  
  // Scroll Parallax
  const { scrollY } = useScroll();
  // Map scrollY to a parallax offset. 
  // We use a large range to ensure it covers most page lengths, but the effect is relative.
  const yParallax = useTransform(scrollY, [0, 5000], [0, 5000 * parallaxStrength]);
  
  // Mouse Interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for mouse movement
  const springConfig = { damping: 50, stiffness: 400, mass: 1 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Always track mouse, but conditionally apply based on preference in render
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      // Apply strength and range (e.g. move up to 300px)
      mouseX.set(x * 300 * mouseStrength);
      mouseY.set(y * 300 * mouseStrength);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, mouseStrength]);

  // Combine scroll and mouse effects
  const y = useTransform(
    [yParallax, ySpring],
    (latest: number[]) => {
      if (prefersReducedMotion) return 0;
      const [parallax = 0, spring = 0] = latest;
      return parallax + spring;
    }
  );

  const x = useTransform(
    xSpring,
    (latest) => (prefersReducedMotion ? 0 : latest)
  );

  return (
    <motion.div
      ref={ref}
      className={cn("absolute pointer-events-none will-change-transform", className)}
      style={{ x, y }}
      animate={prefersReducedMotion ? undefined : {
        scale: [1, 1.1, 1],
        opacity: [0.6, 0.8, 0.6],
        rotate: [0, 10, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
