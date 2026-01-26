/**
 * Complex Function Definitions for Domain Coloring Visualizations
 * 
 * Professional color modes available:
 * - monochrome: Elegant single-color (cyan) variations
 * - duotone: Blend between primary and secondary brand colors
 * - subtle: Near-grayscale with hints of brand color
 * - brand: Sophisticated use of full brand palette
 * - rainbow: Full spectrum (use sparingly)
 */

import { ComplexFunctionType } from "@/components/visuals/domain-coloring-canvas";

export type ColorMode = 'monochrome' | 'duotone' | 'subtle' | 'brand' | 'rainbow';

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
    colorMode: ColorMode;
  };
}

/**
 * Professional configurations for each complex function type
 * Designed for a sophisticated ML agency aesthetic
 */
export const complexFunctions: Record<ComplexFunctionType, ComplexFunctionConfig> = {
  transfer: {
    type: "transfer",
    name: "Transfer Function",
    description: "A rational function with poles creating smooth flowing patterns",
    formula: "F(z) = (z+1)/(z²+0.4z+1)",
    visualCharacter: "Smooth flowing gradients, professional and elegant",
    recommendedSettings: {
      speed: 0.4,
      zoom: 1.0,
      colorShift: 0,
      opacity: 0.35,
      mouseInfluence: 0.25,
      colorMode: 'monochrome',
    },
  },
  sinc: {
    type: "sinc",
    name: "Sinc Function",
    description: "Cardinal sine creating subtle wave patterns",
    formula: "F(z) = sin(z)/z",
    visualCharacter: "Gentle ripples, subtle and refined",
    recommendedSettings: {
      speed: 0.35,
      zoom: 0.9,
      colorShift: 0.1,
      opacity: 0.4,
      mouseInfluence: 0.2,
      colorMode: 'duotone',
    },
  },
  essential: {
    type: "essential",
    name: "Essential Singularity",
    description: "Exponential creating elegant spiral detail",
    formula: "F(z) = e^(1/z)",
    visualCharacter: "Sophisticated spiraling patterns",
    recommendedSettings: {
      speed: 0.3,
      zoom: 1.2,
      colorShift: 0.2,
      opacity: 0.35,
      mouseInfluence: 0.15,
      colorMode: 'subtle',
    },
  },
  mobius: {
    type: "mobius",
    name: "Möbius-like Transform",
    description: "Smooth flowing gradients with calming effect",
    formula: "F(z) = (z²-1)/(z²+1)",
    visualCharacter: "Calming, gentle wave patterns",
    recommendedSettings: {
      speed: 0.35,
      zoom: 1.0,
      colorShift: 0.15,
      opacity: 0.38,
      mouseInfluence: 0.2,
      colorMode: 'monochrome',
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
 * Get recommended settings for a section with professional defaults
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

function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export const allFunctionTypes: ComplexFunctionType[] = ['transfer', 'sinc', 'essential', 'mobius'];
