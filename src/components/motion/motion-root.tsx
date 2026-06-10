"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function MotionRoot({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      try {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        const letters = gsap.utils.toArray<HTMLElement>("[data-scatter-letter]");

        if (reduce) {
          gsap.set(reveals, { opacity: 1 });
          return;
        }

        gsap.to(letters, {
          rotate: 0,
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.25,
          stagger: 0.045,
          ease: "back.out(1.6)",
          clearProps: "transform",
        });

        for (const el of reveals) {
          const variant = el.dataset.reveal;
          const delay = Number(el.dataset.revealDelay ?? 0);
          const trigger = { trigger: el, start: "top 85%", once: true };

          if (variant === "draw") {
            const geoms = el.querySelectorAll<SVGGeometryElement>("path, line, circle, rect, ellipse, polyline");
            gsap.set(el, { opacity: 1 });
            geoms.forEach((g) => {
              const len = g.getTotalLength();
              gsap.set(g, { strokeDasharray: len, strokeDashoffset: len });
            });
            gsap.to(geoms, {
              strokeDashoffset: 0,
              duration: 1.1,
              stagger: 0.12,
              ease: "power2.inOut",
              delay,
              scrollTrigger: trigger,
            });
          } else if (variant === "snap") {
            gsap.fromTo(
              el,
              { opacity: 0, y: 10, rotate: 1.2 },
              { opacity: 1, y: 0, rotate: 0, duration: 0.55, ease: "power3.out", delay, scrollTrigger: trigger }
            );
          } else {
            gsap.fromTo(
              el,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay, scrollTrigger: trigger }
            );
          }
        }
      } catch {
        document.documentElement.classList.remove("js");
      }
    },
    { scope }
  );

  return <div ref={scope}>{children}</div>;
}
