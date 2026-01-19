"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial, Vector2, Color, Mesh } from "three";
import { ProphetBackgroundProps, ShaderUniforms } from "@/lib/types";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform float uSpeed;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vNoise;

  // Simple noise functions that are guaranteed to compile
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for(int i = 0; i < 4; i++) {
      value += amplitude * noise(st * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vUv = uv;
    vPosition = position;

    // Create organic displacement using layered noise
    vec2 st1 = vec2(position.x * 0.01, position.y * 0.01) + uTime * uSpeed * 0.1;
    vec2 st2 = vec2(position.x * 0.02, position.y * 0.02) + uTime * uSpeed * 0.05;
    vec2 st3 = vec2(position.x * 0.005, position.y * 0.005) + uTime * uSpeed * 0.025;

    float noise1 = fbm(st1);
    float noise2 = fbm(st2);
    float noise3 = fbm(st3);

    // Combine noise layers
    vNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;

    // Mouse influence for interactive parallax
    vec2 mouseOffset = (uMouse - 0.5) * 0.1;
    vec3 displacedPosition = position + normal * vNoise * uIntensity;

    // Add subtle mouse-driven displacement
    displacedPosition.x += mouseOffset.x * 0.05;
    displacedPosition.y += mouseOffset.y * 0.05;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  uniform float uIntensity;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vNoise;

  // Simple noise functions that are guaranteed to compile
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for(int i = 0; i < 4; i++) {
      value += amplitude * noise(st * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 st = vUv * 8.0; // Scale UV coordinates for detail

    // Create flowing gradients using layered noise
    float noise1 = fbm(st * 0.5 + uTime * 0.05);
    float noise2 = fbm(st * 1.0 + uTime * 0.025);
    float noise3 = fbm(st * 0.25 + uTime * 0.01);

    // Combine with vertex noise for richer variation
    float combinedNoise = vNoise * 0.4 + noise1 * 0.3 + noise2 * 0.2 + noise3 * 0.1;

    // Create mesh gradient effect
    float gradientX = smoothstep(0.0, 1.0, vUv.x + combinedNoise * 0.15);
    float gradientY = smoothstep(0.0, 1.0, vUv.y + combinedNoise * 0.1);

    // Mix colors with organic variation
    vec3 color = mix(uColorPrimary, uColorSecondary, gradientX * gradientY + combinedNoise * 0.08);

    // Add subtle mouse influence
    vec2 mouseInfluence = (uMouse - 0.5) * 0.08;
    color += vec3(mouseInfluence.x * 0.03, mouseInfluence.y * 0.02, 0.0);

    // Organic transparency based on noise
    float alpha = 0.12 + combinedNoise * 0.08;

    // Clamp values to ensure stability
    color = clamp(color, 0.0, 1.0);
    alpha = clamp(alpha, 0.03, 0.25);

    gl_FragColor = vec4(color, alpha);
  }
`;

function ProphetMesh({
  intensity = 1.0,
  speed = 1.0,
  colorPrimary = "#040812",
  colorSecondary = "#1a1a2e",
}: Omit<ProphetBackgroundProps, "className">) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const { viewport, mouse } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: [viewport.width, viewport.height] },
    uMouse: { value: [0.5, 0.5] },
    uIntensity: { value: intensity },
    uSpeed: { value: speed },
    uColorPrimary: { value: new Color(colorPrimary).toArray() as [number, number, number] },
    uColorSecondary: { value: new Color(colorSecondary).toArray() as [number, number, number] },
  }), [viewport.width, viewport.height, intensity, speed, colorPrimary, colorSecondary]);

  // Smooth mouse tracking with spring physics
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Smooth mouse interpolation
      const currentMouse = materialRef.current.uniforms.uMouse.value;
      const targetMouse: [number, number] = [
        mouse.x * 0.5 + 0.5,
        mouse.y * 0.5 + 0.5
      ];

      currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.02;
      currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[2, 2, 128, 128]} />
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

export function ProphetBackground({
  className = "",
  intensity = 1.0,
  speed = 1.0,
  mouseInfluence = 1.0,
  colorPrimary = "#040812",
  colorSecondary = "#1a1a2e",
}: ProphetBackgroundProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        style={{
          background: "transparent",
        }}
      >
        <ProphetMesh
          intensity={intensity}
          speed={speed}
          colorPrimary={colorPrimary}
          colorSecondary={colorSecondary}
        />
      </Canvas>
    </div>
  );
}