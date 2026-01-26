"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { ScrollSectionProgress, ComplexFunctionType } from "@/lib/types";
import { getSectionSettings, interpolateSettings } from "@/lib/complex-functions";

interface ScrollContextValue {
  // Current scroll position (0-1 of total page)
  scrollProgress: number;
  // Progress for each registered section
  sectionProgress: Map<string, ScrollSectionProgress>;
  // Register a section for tracking
  registerSection: (id: string, element: HTMLElement) => void;
  // Unregister a section
  unregisterSection: (id: string) => void;
  // Get interpolated settings based on scroll position
  getInterpolatedSettings: (currentSection: string, nextSection: string) => {
    speed: number;
    zoom: number;
    colorShift: number;
    opacity: number;
    mouseInfluence: number;
    functionType: ComplexFunctionType;
  };
  // Current active section
  activeSection: string | null;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

interface ScrollProviderProps {
  children: ReactNode;
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState<Map<string, ScrollSectionProgress>>(
    new Map()
  );
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());
  const rafRef = useRef<number | null>(null);

  // Register a section element for tracking
  const registerSection = useCallback((id: string, element: HTMLElement) => {
    sectionsRef.current.set(id, element);
  }, []);

  // Unregister a section
  const unregisterSection = useCallback((id: string) => {
    sectionsRef.current.delete(id);
  }, []);

  // Calculate section progress based on viewport position
  const calculateSectionProgress = useCallback(() => {
    const sections = sectionsRef.current;
    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - viewportHeight;
    
    // Overall scroll progress
    const overallProgress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
    setScrollProgress(overallProgress);

    // Calculate progress for each section
    const newProgress = new Map<string, ScrollSectionProgress>();
    let currentActiveSection: string | null = null;
    let maxVisibility = 0;

    sections.forEach((element, id) => {
      const rect = element.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Calculate how much of the section is visible
      const visibleTop = Math.max(0, -sectionTop);
      const visibleBottom = Math.min(sectionHeight, viewportHeight - sectionTop);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibility = visibleHeight / viewportHeight;

      // Progress through the section (0 = just entering, 1 = just leaving)
      const progress = Math.min(Math.max(-sectionTop / sectionHeight, 0), 1);
      
      const isInView = visibility > 0;

      newProgress.set(id, {
        sectionId: id,
        progress,
        isInView,
      });

      // Track the most visible section
      if (visibility > maxVisibility) {
        maxVisibility = visibility;
        currentActiveSection = id;
      }
    });

    setSectionProgress(newProgress);
    setActiveSection(currentActiveSection);
  }, []);

  // Scroll event handler with RAF throttling
  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(calculateSectionProgress);
  }, [calculateSectionProgress]);

  // Set up scroll listener
  useEffect(() => {
    // Initial calculation
    requestAnimationFrame(() => {
      calculateSectionProgress();
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, calculateSectionProgress]);

  // Get interpolated settings between two sections
  const getInterpolatedSettings = useCallback(
    (currentSection: string, nextSection: string) => {
      const currentConfig = getSectionSettings(
        currentSection as 'hero' | 'services' | 'about' | 'contact'
      );
      const nextConfig = getSectionSettings(
        nextSection as 'hero' | 'services' | 'about' | 'contact'
      );
      
      const currentProgress = sectionProgress.get(currentSection);
      const progress = currentProgress?.progress ?? 0;

      // If progress is low, use current function type
      // If progress is high, transition to next function type
      const transitionThreshold = 0.7;
      const functionType = progress > transitionThreshold 
        ? nextConfig.type 
        : currentConfig.type;

      const interpolated = interpolateSettings(currentConfig, nextConfig, progress);

      return {
        ...interpolated,
        functionType,
      };
    },
    [sectionProgress]
  );

  const value: ScrollContextValue = {
    scrollProgress,
    sectionProgress,
    registerSection,
    unregisterSection,
    getInterpolatedSettings,
    activeSection,
  };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
}

/**
 * Hook to access scroll context
 */
export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
}

/**
 * Hook to register a section and get its scroll progress
 */
export function useSectionProgress(sectionId: string) {
  const { registerSection, unregisterSection, sectionProgress } = useScrollContext();
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      registerSection(sectionId, ref.current);
    }
    return () => unregisterSection(sectionId);
  }, [sectionId, registerSection, unregisterSection]);

  const progress = sectionProgress.get(sectionId);

  return {
    ref,
    progress: progress?.progress ?? 0,
    isInView: progress?.isInView ?? false,
  };
}
