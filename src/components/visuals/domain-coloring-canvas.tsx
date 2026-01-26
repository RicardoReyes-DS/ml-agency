"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial, Vector2, Mesh } from "three";

export type ComplexFunctionType = 'transfer' | 'sinc' | 'essential' | 'mobius';
export type ColorMode = 'monochrome' | 'duotone' | 'subtle' | 'brand' | 'rainbow';

export interface DomainColoringProps {
  functionType?: ComplexFunctionType;
  colorMode?: ColorMode;
  speed?: number;
  opacity?: number;
  mouseInfluence?: number;
  colorShift?: number;
  zoom?: number;
  className?: string;
}

// Vertex shader - simple pass-through with UV coordinates
const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader with professional color modes
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uOpacity;
  uniform float uSpeed;
  uniform float uMouseInfluence;
  uniform float uColorShift;
  uniform float uZoom;
  uniform int uFunctionType;
  uniform int uColorMode;
  
  varying vec2 vUv;
  
  #define PI 3.14159265359
  #define TAU 6.28318530718
  
  // Brand colors (converted to linear RGB)
  // Primary: #00d4ff (cyan)
  // Accent: #ff6b6b (coral) 
  // Secondary: #6366f1 (indigo)
  const vec3 brandPrimary = vec3(0.0, 0.831, 1.0);
  const vec3 brandAccent = vec3(1.0, 0.42, 0.42);
  const vec3 brandSecondary = vec3(0.388, 0.4, 0.945);
  
  // Complex number operations
  vec2 cmul(vec2 a, vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  
  vec2 cdiv(vec2 a, vec2 b) {
    float d = dot(b, b);
    if (d < 0.0001) return vec2(1e10, 0.0);
    return vec2(dot(a, b), a.y * b.x - a.x * b.y) / d;
  }
  
  vec2 cexp(vec2 z) {
    return exp(z.x) * vec2(cos(z.y), sin(z.y));
  }
  
  float cosh_custom(float x) {
    return (exp(x) + exp(-x)) * 0.5;
  }
  
  float sinh_custom(float x) {
    return (exp(x) - exp(-x)) * 0.5;
  }
  
  vec2 csin(vec2 z) {
    return vec2(sin(z.x) * cosh_custom(z.y), cos(z.x) * sinh_custom(z.y));
  }
  
  // HSV to RGB conversion
  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }
  
  // Transfer function: F(z) = (z+1)/(z²+0.4z+1)
  vec2 transferFunction(vec2 z, float t) {
    vec2 numerator = z + vec2(1.0 + sin(t) * 0.2, cos(t * 0.5) * 0.15);
    vec2 z2 = cmul(z, z);
    vec2 denom = z2 + z * (0.4 + cos(t) * 0.15) + vec2(1.0, sin(t * 0.3) * 0.08);
    return cdiv(numerator, denom);
  }
  
  // Sinc function: F(z) = sin(z)/z
  vec2 sincFunction(vec2 z, float t) {
    float scale = 2.0 + sin(t * 0.2) * 0.3;
    vec2 zs = z * scale;
    vec2 sinZ = csin(zs);
    float mag = length(zs);
    if (mag < 0.001) return vec2(1.0, 0.0);
    return cdiv(sinZ, zs);
  }
  
  // Essential singularity: F(z) = e^(1/z)
  vec2 essentialFunction(vec2 z, float t) {
    float mag = length(z);
    if (mag < 0.01) return vec2(0.0, 0.0);
    vec2 invZ = cdiv(vec2(1.0, 0.0), z);
    float angle = t * 0.15;
    vec2 rotated = vec2(
      invZ.x * cos(angle) - invZ.y * sin(angle),
      invZ.x * sin(angle) + invZ.y * cos(angle)
    );
    return cexp(rotated);
  }
  
  // Mobius-like: F(z) = (z²-1)/(z²+1)
  vec2 mobiusFunction(vec2 z, float t) {
    vec2 z2 = cmul(z, z);
    vec2 a = vec2(1.0 + sin(t * 0.25) * 0.15, cos(t * 0.2) * 0.1);
    vec2 numerator = z2 - a;
    vec2 denom = z2 + a;
    return cdiv(numerator, denom);
  }
  
  vec2 evaluateFunction(vec2 z, float t, int funcType) {
    if (funcType == 0) return transferFunction(z, t);
    if (funcType == 1) return sincFunction(z, t);
    if (funcType == 2) return essentialFunction(z, t);
    if (funcType == 3) return mobiusFunction(z, t);
    return transferFunction(z, t);
  }
  
  // Apply color mode to the visualization
  vec3 applyColorMode(float phase, float magnitude, int colorMode) {
    // Normalize phase to 0-1
    float normalizedPhase = (phase + PI) / TAU;
    
    // Tone mapping for magnitude
    float magNorm = tanh(0.5 * magnitude);
    
    if (colorMode == 0) {
      // MONOCHROME - Elegant cyan variations
      // Use phase to modulate brightness, not hue
      float brightness = 0.08 + magNorm * 0.25 + normalizedPhase * 0.1;
      float saturation = 0.4 + magNorm * 0.3;
      return brandPrimary * brightness * (1.0 + saturation * 0.5);
    }
    else if (colorMode == 1) {
      // DUOTONE - Blend between primary (cyan) and secondary (indigo)
      float blend = normalizedPhase;
      vec3 baseColor = mix(brandPrimary, brandSecondary, blend);
      float brightness = 0.1 + magNorm * 0.3;
      return baseColor * brightness;
    }
    else if (colorMode == 2) {
      // SUBTLE - Very low saturation, almost grayscale with hint of brand
      float brightness = 0.06 + magNorm * 0.2;
      float hueShift = normalizedPhase * 0.1; // Very subtle hue variation
      vec3 tint = mix(brandPrimary, brandSecondary, hueShift);
      vec3 gray = vec3(brightness);
      return mix(gray, tint * brightness * 1.5, 0.3); // 30% color tint
    }
    else if (colorMode == 3) {
      // BRAND - Uses all brand colors in a sophisticated way
      // Map phase to brand color palette
      float t = normalizedPhase * 3.0;
      vec3 color;
      if (t < 1.0) {
        color = mix(brandPrimary, brandSecondary, t);
      } else if (t < 2.0) {
        color = mix(brandSecondary, brandAccent, t - 1.0);
      } else {
        color = mix(brandAccent, brandPrimary, t - 2.0);
      }
      float brightness = 0.08 + magNorm * 0.25;
      float saturation = 0.5;
      return mix(vec3(brightness), color * brightness * 1.5, saturation);
    }
    else {
      // RAINBOW - Original full spectrum (for reference)
      float H = fract(normalizedPhase + 0.0);
      float S = 0.6 + magNorm * 0.2;
      float V = 0.15 + magNorm * 0.5;
      return hsv2rgb(vec3(H, S, V));
    }
  }
  
  void main() {
    // Map UV to complex plane with zoom
    vec2 z = (vUv - 0.5) * 6.0 / uZoom;
    
    // Apply mouse influence (more subtle)
    vec2 mouseOffset = (uMouse - 0.5) * uMouseInfluence * 1.5;
    z += mouseOffset;
    
    // Evaluate the complex function
    float t = uTime * uSpeed;
    vec2 F = evaluateFunction(z, t, uFunctionType);
    
    // Get phase and magnitude
    float phase = atan(F.y, F.x);
    float mag = length(F);
    
    // Apply color mode
    vec3 color = applyColorMode(phase + uColorShift * TAU, mag, uColorMode);
    
    // Add subtle flow lines based on magnitude
    float flowLines = sin(log(mag + 1.0) * 4.0 + t * 0.5) * 0.5 + 0.5;
    color *= 0.85 + flowLines * 0.15;
    
    // Soft vignette
    float vignette = 1.0 - length(vUv - 0.5) * 0.4;
    color *= vignette;
    
    // Subtle edge glow for depth
    float edgeGlow = smoothstep(0.5, 0.0, tanh(mag * 0.3)) * 0.15;
    color += brandPrimary * edgeGlow;
    
    gl_FragColor = vec4(color, uOpacity);
  }
`;

// Map types to integers for shader
const functionTypeMap: Record<ComplexFunctionType, number> = {
  transfer: 0,
  sinc: 1,
  essential: 2,
  mobius: 3,
};

const colorModeMap: Record<ColorMode, number> = {
  monochrome: 0,
  duotone: 1,
  subtle: 2,
  brand: 3,
  rainbow: 4,
};

interface DomainColoringMeshProps {
  functionType: ComplexFunctionType;
  colorMode: ColorMode;
  speed: number;
  opacity: number;
  mouseInfluence: number;
  colorShift: number;
  zoom: number;
}

function DomainColoringMesh({
  functionType,
  colorMode,
  speed,
  opacity,
  mouseInfluence,
  colorShift,
  zoom,
}: DomainColoringMeshProps) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const smoothMouseRef = useRef<[number, number]>([0.5, 0.5]);
  const { viewport, pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uOpacity: { value: opacity },
      uSpeed: { value: speed },
      uMouseInfluence: { value: mouseInfluence },
      uColorShift: { value: colorShift },
      uZoom: { value: zoom },
      uFunctionType: { value: functionTypeMap[functionType] },
      uColorMode: { value: colorModeMap[colorMode] },
    }),
    [opacity, speed, mouseInfluence, colorShift, zoom, functionType, colorMode]
  );

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uOpacity.value = opacity;
      materialRef.current.uniforms.uSpeed.value = speed;
      materialRef.current.uniforms.uMouseInfluence.value = mouseInfluence;
      materialRef.current.uniforms.uColorShift.value = colorShift;
      materialRef.current.uniforms.uZoom.value = zoom;
      materialRef.current.uniforms.uFunctionType.value = functionTypeMap[functionType];
      materialRef.current.uniforms.uColorMode.value = colorModeMap[colorMode];
    }
  }, [opacity, speed, mouseInfluence, colorShift, zoom, functionType, colorMode]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      const targetMouse: [number, number] = [
        pointer.x * 0.5 + 0.5,
        pointer.y * 0.5 + 0.5,
      ];
      
      // Smoother mouse interpolation
      smoothMouseRef.current = [
        smoothMouseRef.current[0] + (targetMouse[0] - smoothMouseRef.current[0]) * 0.03,
        smoothMouseRef.current[1] + (targetMouse[1] - smoothMouseRef.current[1]) * 0.03,
      ];
      
      materialRef.current.uniforms.uMouse.value.set(
        smoothMouseRef.current[0],
        smoothMouseRef.current[1]
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function DomainColoringCanvas({
  functionType = "transfer",
  colorMode = "monochrome",
  speed = 0.5,
  opacity = 0.4,
  mouseInfluence = 0.3,
  colorShift = 0,
  zoom = 1.0,
  className = "",
}: DomainColoringProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <DomainColoringMesh
          functionType={functionType}
          colorMode={colorMode}
          speed={speed}
          opacity={opacity}
          mouseInfluence={mouseInfluence}
          colorShift={colorShift}
          zoom={zoom}
        />
      </Canvas>
    </div>
  );
}
