"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const POOL = "0123456789$%+MK#";

export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let rafId = 0;
    gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } }).call(() => {
      const target = text;
      const start = performance.now();
      const total = 900;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / total);
        const settled = Math.floor(p * target.length);
        el.textContent =
          target.slice(0, settled) +
          [...target.slice(settled)]
            .map((c) => (c === " " ? " " : POOL[Math.floor(Math.random() * POOL.length)]))
            .join("");
        if (p < 1) rafId = requestAnimationFrame(tick);
        else el.textContent = target;
      };
      rafId = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(rafId);
  });

  return (
    <span ref={ref} className={`font-tabular ${className ?? ""}`}>
      {text}
    </span>
  );
}
