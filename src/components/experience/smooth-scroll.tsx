"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Momentum smooth-scroll wired into the GSAP ticker so ScrollTrigger stays in
// sync. Disabled entirely for reduced-motion users (native scroll).
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Fallback: keep ScrollTrigger in sync for any scroll Lenis doesn't drive
    // (anchor jumps, programmatic scrollTo, assistive tech).
    const onNativeScroll = () => ScrollTrigger.update();
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onNativeScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
