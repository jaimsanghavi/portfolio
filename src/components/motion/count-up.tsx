"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ end, prefix = "", suffix = "", duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const state = { v: 0 };
    gsap.to(state, {
      v: end,
      duration,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(state.v)}${suffix}`;
      },
    });
  });

  return (
    <span ref={ref} className={`font-tabular ${className ?? ""}`}>
      {prefix}
      {end}
      {suffix}
    </span>
  );
}
