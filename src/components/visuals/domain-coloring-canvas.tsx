"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial, Vector2, Mesh } from "three";

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

// Vertex shader - simple pass-through with UV coordinates
const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader with domain coloring implementation
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uOpacity;
  uniform float uSpeed;
  uniform float uMouseInfluence;
  uniform float uColorShift;
  uniform float uZoom;
  uniform int uFunctionType;
  
  varying vec2 vUv;
  
  #define PI 3.14159265359
  #define TAU 6.28318530718
  
  // Complex number operations
  vec2 cmul(vec2 a, vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  
  vec2 cdiv(vec2 a, vec2 b) {
    float d = dot(b, b);
    if (d < 0.0001) return vec2(1e10, 0.0); // Avoid division by zero
    return vec2(dot(a, b), a.y * b.x - a.x * b.y) / d;
  }
  
  vec2 cexp(vec2 z) {
    return exp(z.x) * vec2(cos(z.y), sin(z.y));
  }
  
  // Custom hyperbolic functions for GLSL ES 2.0 compatibility
  float cosh_custom(float x) {
    return (exp(x) + exp(-x)) * 0.5;
  }
  
  float sinh_custom(float x) {
    return (exp(x) - exp(-x)) * 0.5;
  }
  
  vec2 csin(vec2 z) {
    return vec2(sin(z.x) * cosh_custom(z.y), cos(z.x) * sinh_custom(z.y));
  }
  
  vec2 ccos(vec2 z) {
    return vec2(cos(z.x) * cosh_custom(z.y), -sin(z.x) * sinh_custom(z.y));
  }
  
  // HSV to RGB conversion
  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }
  
  // Transfer function: F(z) = (z+1)/(z²+0.4z+1)
  vec2 transferFunction(vec2 z, float t) {
    vec2 numerator = z + vec2(1.0 + sin(t) * 0.3, cos(t * 0.7) * 0.2);
    vec2 z2 = cmul(z, z);
    vec2 denom = z2 + z * (0.4 + cos(t) * 0.2) + vec2(1.0, sin(t * 0.5) * 0.1);
    return cdiv(numerator, denom);
  }
  
  // Sinc function: F(z) = sin(z)/z
  vec2 sincFunction(vec2 z, float t) {
    float scale = 2.0 + sin(t * 0.3) * 0.5;
    vec2 zs = z * scale;
    vec2 sinZ = csin(zs);
    float mag = length(zs);
    if (mag < 0.001) return vec2(1.0, 0.0); // sinc(0) = 1
    return cdiv(sinZ, zs);
  }
  
  // Essential singularity: F(z) = e^(1/z)
  vec2 essentialFunction(vec2 z, float t) {
    float mag = length(z);
    if (mag < 0.01) return vec2(0.0, 0.0);
    vec2 invZ = cdiv(vec2(1.0, 0.0), z);
    // Add time-based rotation
    float angle = t * 0.2;
    vec2 rotated = vec2(
      invZ.x * cos(angle) - invZ.y * sin(angle),
      invZ.x * sin(angle) + invZ.y * cos(angle)
    );
    return cexp(rotated);
  }
  
  // Mobius-like: F(z) = (z²-1)/(z²+1)
  vec2 mobiusFunction(vec2 z, float t) {
    vec2 z2 = cmul(z, z);
    vec2 a = vec2(1.0 + sin(t * 0.4) * 0.2, cos(t * 0.3) * 0.15);
    vec2 numerator = z2 - a;
    vec2 denom = z2 + a;
    return cdiv(numerator, denom);
  }
  
  // Evaluate the selected function
  vec2 evaluateFunction(vec2 z, float t, int funcType) {
    if (funcType == 0) return transferFunction(z, t);
    if (funcType == 1) return sincFunction(z, t);
    if (funcType == 2) return essentialFunction(z, t);
    if (funcType == 3) return mobiusFunction(z, t);
    return transferFunction(z, t);
  }
  
  void main() {
    // Map UV to complex plane with zoom
    vec2 z = (vUv - 0.5) * 6.0 / uZoom;
    
    // Apply mouse influence to offset the domain
    vec2 mouseOffset = (uMouse - 0.5) * uMouseInfluence * 2.0;
    z += mouseOffset;
    
    // Evaluate the complex function
    float t = uTime * uSpeed;
    vec2 F = evaluateFunction(z, t, uFunctionType);
    
    // Domain coloring: phase -> hue, magnitude -> value
    float arg = atan(F.y, F.x);           // Phase angle [-PI, PI]
    float mag = length(F);
    
    // Tone mapping with tanh for dynamic range compression
    float magNorm = tanh(0.4 * mag);
    
    // Create HSV color
    float H = fract((arg + PI) / TAU + uColorShift); // Hue from phase
    float S = 0.75 + magNorm * 0.2;                   // Saturation
    float V = 0.3 + magNorm * 0.7;                   // Value from magnitude (Increased base brightness)
    
    // Add subtle contour lines based on magnitude
    float contour = fract(log(mag + 1.0) * 2.0);
    V *= 0.9 + contour * 0.1;
    
    // Convert to RGB
    vec3 color = hsv2rgb(vec3(H, S, V));
    
    // Add subtle glow near singularities
    float glow = smoothstep(0.5, 0.0, magNorm) * 0.3;
    color += vec3(glow * 0.5, glow * 0.8, glow);
    
    // Vignette effect
    float vignette = 1.0 - length(vUv - 0.5) * 0.5;
    color *= vignette;
    
    gl_FragColor = vec4(color, uOpacity);
  }
`;

// Map function type to integer for shader
const functionTypeMap: Record<ComplexFunctionType, number> = {
  transfer: 0,
  sinc: 1,
  essential: 2,
  mobius: 3,
};

interface DomainColoringMeshProps {
  functionType: ComplexFunctionType;
  speed: number;
  opacity: number;
  mouseInfluence: number;
  colorShift: number;
  zoom: number;
}

function DomainColoringMesh({
  functionType,
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
    }),
    []
  );

  // Update uniforms when props change
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uOpacity.value = opacity;
      materialRef.current.uniforms.uSpeed.value = speed;
      materialRef.current.uniforms.uMouseInfluence.value = mouseInfluence;
      materialRef.current.uniforms.uColorShift.value = colorShift;
      materialRef.current.uniforms.uZoom.value = zoom;
      materialRef.current.uniforms.uFunctionType.value = functionTypeMap[functionType];
    }
  }, [opacity, speed, mouseInfluence, colorShift, zoom, functionType]);

  useFrame((state) => {
    if (materialRef.current) {
      // Update time
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Smooth mouse interpolation using ref (no state updates)
      const targetMouse: [number, number] = [
        pointer.x * 0.5 + 0.5,
        pointer.y * 0.5 + 0.5,
      ];
      
      smoothMouseRef.current = [
        smoothMouseRef.current[0] + (targetMouse[0] - smoothMouseRef.current[0]) * 0.05,
        smoothMouseRef.current[1] + (targetMouse[1] - smoothMouseRef.current[1]) * 0.05,
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
  speed = 1.0,
  opacity = 0.15,
  mouseInfluence = 0.5,
  colorShift = 0,
  zoom = 1.0,
  className = "",
}: DomainColoringProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{
          antialias: false, // Disable for performance
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for mobile performance
        style={{ background: "transparent" }}
      >
        <DomainColoringMesh
          functionType={functionType}
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
