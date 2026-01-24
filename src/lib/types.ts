// Shared TypeScript interfaces for the ML Agency portfolio

export interface MLDemo {
  id: string;
  title: string;
  description: string;
  category: 'computer-vision' | 'nlp' | 'predictive' | 'deep-learning';
  technologies: string[];
  status: 'live' | 'beta' | 'coming-soon';
  demoUrl?: string;
  codeUrl?: string;
}

export interface DemoConfig {
  loading: boolean;
  error: string | null;
  data: Record<string, unknown> | null;
}

// Prophet Estate Background Types
export interface ProphetBackgroundProps {
  className?: string;
  intensity?: number;
  speed?: number;
  mouseInfluence?: number;
  colorPrimary?: string;
  colorSecondary?: string;
}

export interface ShaderUniforms {
  uTime: { value: number };
  uResolution: { value: [number, number] };
  uMouse: { value: [number, number] };
  uIntensity: { value: number };
  uSpeed: { value: number };
  uColorPrimary: { value: [number, number, number] };
  uColorSecondary: { value: [number, number, number] };
}

export interface MeshGradientConfig {
  width: number;
  height: number;
  segments: number;
  amplitude: number;
  frequency: number;
  speed: number;
}

// Domain Coloring Types
export type ComplexFunctionType = 'transfer' | 'sinc' | 'essential' | 'mobius';

export interface DomainColoringProps {
  functionType?: ComplexFunctionType;
  speed?: number;
  opacity?: number;
  mouseInfluence?: number;
  colorShift?: number;
  zoom?: number;
  className?: string;
}

export interface ScrollSectionProgress {
  sectionId: string;
  progress: number;
  isInView: boolean;
}
