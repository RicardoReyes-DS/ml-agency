/**
 * Complex Function Definitions for Domain Coloring Visualizations
 * 
 * Each function creates unique visual patterns when rendered with domain coloring:
 * - Phase angle (argument) maps to hue
 * - Magnitude maps to brightness via tone mapping
 */

import { ComplexFunctionType } from "./types";

export interface ComplexFunctionConfig {
  type: ComplexFunctionType;
  name: string;
  description: string;
  formula: string;
  visualCharacter: string;
  recommendedSettings: {
    speed: number;
    zoom: number;
    colorShift: number;
    opacity: number;
    mouseInfluence: number;
  };
}

/**
 * Predefined configurations for each complex function type
 */
export const complexFunctions: Record<ComplexFunctionType, ComplexFunctionConfig> = {
  transfer: {
    type: "transfer",
    name: "Transfer Function",
    description: "A rational function with poles creating swirling vortex patterns",
    formula: "F(z) = (z+1)/(z²+0.4z+1)",
    visualCharacter: "Swirling vortices around poles, smooth gradient flows",
    recommendedSettings: {
      speed: 0.8,
      zoom: 1.0,
      colorShift: 0,
      opacity: 0.25,
      mouseInfluence: 0.5,
    },
  },
  sinc: {
    type: "sinc",
    name: "Sinc Function",
    description: "The cardinal sine function creating ripple patterns",
    formula: "F(z) = sin(z)/z",
    visualCharacter: "Concentric ripples radiating from center, wave interference",
    recommendedSettings: {
      speed: 0.6,
      zoom: 0.8,
      colorShift: 0.15,
      opacity: 0.28,
      mouseInfluence: 0.3,
    },
  },
  essential: {
    type: "essential",
    name: "Essential Singularity",
    description: "Exponential of inverse z creating infinite spiraling detail",
    formula: "F(z) = e^(1/z)",
    visualCharacter: "Infinite spiraling detail near origin, psychedelic patterns",
    recommendedSettings: {
      speed: 0.4,
      zoom: 1.2,
      colorShift: 0.3,
      opacity: 0.22,
      mouseInfluence: 0.2,
    },
  },
  mobius: {
    type: "mobius",
    name: "Möbius-like Transform",
    description: "A rational function with smooth flowing gradients",
    formula: "F(z) = (z²-1)/(z²+1)",
    visualCharacter: "Smooth flowing gradients, gentle wave patterns",
    recommendedSettings: {
      speed: 0.5,
      zoom: 1.0,
      colorShift: 0.5,
      opacity: 0.25,
      mouseInfluence: 0.4,
    },
  },
};

/**
 * Get function configuration by type
 */
export function getFunctionConfig(type: ComplexFunctionType): ComplexFunctionConfig {
  return complexFunctions[type];
}

/**
 * Get recommended settings for a section
 */
export function getSectionSettings(section: 'hero' | 'services' | 'about' | 'contact'): ComplexFunctionConfig {
  const sectionMap: Record<string, ComplexFunctionType> = {
    hero: 'transfer',
    services: 'sinc',
    about: 'essential',
    contact: 'mobius',
  };
  return complexFunctions[sectionMap[section]];
}

/**
 * Interpolate between two function configurations based on progress (0-1)
 * Useful for scroll-based transitions
 */
export function interpolateSettings(
  from: ComplexFunctionConfig,
  to: ComplexFunctionConfig,
  progress: number
): {
  speed: number;
  zoom: number;
  colorShift: number;
  opacity: number;
  mouseInfluence: number;
} {
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const eased = easeInOutCubic(progress);

  return {
    speed: lerp(from.recommendedSettings.speed, to.recommendedSettings.speed, eased),
    zoom: lerp(from.recommendedSettings.zoom, to.recommendedSettings.zoom, eased),
    colorShift: lerp(from.recommendedSettings.colorShift, to.recommendedSettings.colorShift, eased),
    opacity: lerp(from.recommendedSettings.opacity, to.recommendedSettings.opacity, eased),
    mouseInfluence: lerp(from.recommendedSettings.mouseInfluence, to.recommendedSettings.mouseInfluence, eased),
  };
}

/**
 * Easing function for smooth transitions
 */
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * All available function types for iteration
 */
export const allFunctionTypes: ComplexFunctionType[] = ['transfer', 'sinc', 'essential', 'mobius'];
