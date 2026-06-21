"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { chaosTarget, textTarget, type TargetData } from "@/lib/particle-targets";
import type { RenderMode } from "@/components/webgl/use-capability";

// Stage indices the page drives via scroll.
export const STAGE = {
  CHAOS: 0,
  CLARITY: 1,
  USERS: 2,
  ARR: 3,
} as const;

const VERT = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute vec3 aColFrom;
  attribute vec3 aColTo;
  attribute float aRand;
  uniform float uMix;
  uniform float uTime;
  uniform float uChaos;
  uniform float uSize;
  varying vec3 vCol;
  varying float vA;

  void main() {
    float m = smoothstep(0.0, 1.0, uMix);
    vec3 pos = mix(aFrom, aTo, m);

    float t = uTime * 0.3 + aRand * 6.2831;
    vec3 drift = vec3(sin(t + pos.y * 0.6), cos(t * 1.1 + pos.x * 0.6), sin(t * 0.8 + pos.z));
    pos += drift * (0.04 + uChaos * 1.5) * (0.35 + aRand);

    vCol = mix(aColFrom, aColTo, m);
    vA = 0.55 + 0.45 * aRand;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * (16.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  varying vec3 vCol;
  varying float vA;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.08, d) * vA;
    gl_FragColor = vec4(vCol, a);
  }
`;

function computeBaseSize() {
  if (typeof window === "undefined") return 2.2;
  return 2.2 * Math.min(window.devicePixelRatio || 1, 2) * (window.innerWidth < 768 ? 0.9 : 1);
}

function makeRandomSeeds(n: number): Float32Array {
  const a = new Float32Array(n);
  for (let i = 0; i < n; i++) a[i] = Math.random();
  return a;
}

function Particles({ count, stage }: { count: number; stage: number }) {
  const ref = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const { size } = useThree();

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.current.active = true;
    };
    const leave = () => {
      pointer.current.active = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", move);
    window.addEventListener("blur", leave);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      window.removeEventListener("blur", leave);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  const stages = useMemo<TargetData[]>(() => {
    // Fit the type to the viewport: at camera z=16 / fov=52 the visible width at
    // z=0 is ~15.6 * aspect, so a fixed world span clips on tall phone screens.
    const aspect = window.innerWidth / window.innerHeight;
    const visibleWidth = 15.6 * aspect;
    const textSpan = Math.min(10, visibleWidth * 0.82);
    return [
      chaosTarget(count),
      textTarget("CLARITY", count, textSpan),
      textTarget("4,000,000", count, textSpan),
      textTarget("$20M+", count, textSpan),
    ];
  }, [count]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uMix: { value: 1 },
        uTime: { value: 0 },
        uChaos: { value: 0.9 },
        uSize: { value: 2.2 * Math.min(window.devicePixelRatio || 1, 2) },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
  }, []);
  const uniforms = material.uniforms;

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const base = stages[0]!;
    const rand = makeRandomSeeds(count);
    g.setAttribute("position", new THREE.BufferAttribute(base.positions.slice(), 3));
    g.setAttribute("aFrom", new THREE.BufferAttribute(base.positions.slice(), 3));
    g.setAttribute("aTo", new THREE.BufferAttribute(base.positions.slice(), 3));
    g.setAttribute("aColFrom", new THREE.BufferAttribute(base.colors.slice(), 3));
    g.setAttribute("aColTo", new THREE.BufferAttribute(base.colors.slice(), 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    return g;
  }, [stages, count]);

  // Morph to the requested stage whenever it changes.
  const current = useRef<number>(0);
  useEffect(() => {
    const g = ref.current?.geometry;
    if (!g) return;
    const target = stages[stage] ?? stages[STAGE.CHAOS];

    const aFrom = g.getAttribute("aFrom") as THREE.BufferAttribute;
    const aTo = g.getAttribute("aTo") as THREE.BufferAttribute;
    const cFrom = g.getAttribute("aColFrom") as THREE.BufferAttribute;
    const cTo = g.getAttribute("aColTo") as THREE.BufferAttribute;

    (aFrom.array as Float32Array).set(aTo.array as Float32Array);
    (cFrom.array as Float32Array).set(cTo.array as Float32Array);
    (aTo.array as Float32Array).set(target.positions);
    (cTo.array as Float32Array).set(target.colors);
    aFrom.needsUpdate = aTo.needsUpdate = cFrom.needsUpdate = cTo.needsUpdate = true;

    uniforms.uMix.value = 0;
    const restChaos = stage === STAGE.CHAOS ? 0.45 : 0.018;
    gsap.killTweensOf(uniforms.uMix);
    gsap.killTweensOf(uniforms.uChaos);
    gsap.to(uniforms.uMix, { value: 1, duration: 1.5, ease: "power2.inOut" });
    gsap
      .timeline()
      .to(uniforms.uChaos, { value: 1.15, duration: 0.45, ease: "power2.out" })
      .to(uniforms.uChaos, { value: restChaos, duration: 1.25, ease: "power2.inOut" });

    // Sit the headline word higher in the hero; metrics slightly above centre.
    if (ref.current) {
      const yOff = stage === STAGE.CLARITY ? 1.8 : stage === STAGE.USERS || stage === STAGE.ARR ? 0.7 : 0;
      gsap.killTweensOf(ref.current.position);
      gsap.to(ref.current.position, { y: yOff, duration: 1.2, ease: "power2.inOut" });
    }

    current.current = stage;
  }, [stage, stages, uniforms]);

  useFrame((_, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.05);
    // Subtle parallax tilt toward the pointer — no displacement, so no "hole".
    const pt = pointer.current;
    if (ref.current) {
      const px = pt.active ? pt.x : 0;
      const py = pt.active ? pt.y : 0;
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, px * 0.08, 0.04);
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -py * 0.05, 0.04);
    }
  });

  // keep size ratio sane on resize
  useEffect(() => {
    uniforms.uSize.value = computeBaseSize();
  }, [size.width, uniforms]);

  return <points ref={ref} geometry={geometry} material={material} />;
}

export default function ParticleField({
  stage,
  mode,
}: {
  stage: number;
  mode: Exclude<RenderMode, "static">;
}) {
  const count = mode === "lite" ? 7000 : 18000;
  return (
    <Canvas
      camera={{ position: [0, 0, 16], fov: 52 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    >
      <Particles count={count} stage={stage} />
    </Canvas>
  );
}
