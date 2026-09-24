"use client";

import { useState, useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-performance";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

export function TypewriterText(props: TypewriterTextProps) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className={cn("font-mono", props.className)} data-typewriter="">
      {reduced || props.texts.length === 0
        ? <span>{props.texts[0] ?? ""}</span>
        : <AnimatedText {...props} />}
    </div>
  );
}

function AnimatedText({
  texts, typingSpeed = 100, deletingSpeed = 50, delayBetweenTexts = 2000,
}: TypewriterTextProps) {
  const [state, setState] = useState({ index: 0, length: texts[0]?.length ?? 0, deleting: false });
  const [showCursor, setShowCursor] = useState(true);
  const current = texts[state.index % texts.length] ?? "";
  useEffect(() => {
    const complete = !state.deleting && state.length >= current.length;
    const timeout = setTimeout(() => {
      if (complete) {
        setState((old) => ({ ...old, deleting: true }));
      } else if (state.deleting && state.length === 0) {
        setState({ index: (state.index + 1) % texts.length, length: 0, deleting: false });
      } else {
        setState((old) => ({ ...old, length: old.length + (old.deleting ? -1 : 1) }));
      }
    }, complete ? delayBetweenTexts : state.deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [state, current, texts.length, typingSpeed, deletingSpeed, delayBetweenTexts]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((old) => !old), 500);
    return () => clearInterval(interval);
  }, []);

  return <>
    <span>{current.slice(0, state.length)}</span>
    <span aria-hidden="true" data-typewriter-cursor="" className="text-accent" style={{ opacity: showCursor ? 1 : 0 }}>|</span>
  </>;
}
