"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Metric {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
}

interface MetricsDisplayProps {
  metrics: Metric[];
  className?: string;
}

function AnimatedCounter({
  value,
  suffix,
  prefix = "",
  duration = 2000
}: {
  value: number;
  suffix: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return (
    <span className="font-mono text-3xl md:text-4xl font-bold text-accent">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function MetricsDisplay({ metrics, className }: MetricsDisplayProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 1.5 }}
          className="text-center"
        >
          <AnimatedCounter
            value={metric.value}
            suffix={metric.suffix}
            prefix={metric.prefix}
          />
          <div className="text-sm font-medium text-foreground/80 mt-1">
            {metric.label}
          </div>
          <div className="text-xs text-foreground/60 mt-1">
            {metric.description}
          </div>
        </motion.div>
      ))}
    </div>
  );
}