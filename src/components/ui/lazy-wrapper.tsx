"use client";

import { useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

export function LazyWrapper({
  children,
  fallback,
  rootMargin = "50px",
  threshold = 0.1,
  className
}: LazyWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, rootMargin, threshold]);

  return (
    <div
      ref={setElement}
      className={className}
    >
      {hasLoaded ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      ) : (
        fallback || <div className="min-h-[200px] bg-surface/20 animate-pulse rounded-lg" />
      )}
    </div>
  );
}