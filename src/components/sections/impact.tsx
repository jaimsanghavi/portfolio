"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { stories } from "@/data/site";
import { Scramble } from "@/components/motion/scramble";

export function Impact() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".impact-panel");
        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return; // last panel scrolls naturally
          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            end: "bottom 40%",
            pin: true,
            pinSpacing: false,
          });
        });
      });
    },
    { scope }
  );

  return (
    <section id="impact" ref={scope} className="relative">
      <div className="mx-auto max-w-6xl px-5 pt-24 md:pt-36">
        <p className="mb-10 font-mono text-[11px] tracking-[0.25em] text-accent" data-reveal="rise">
          SEC.04 — THE IMPACT
        </p>
        <h2 className="text-3xl font-medium tracking-tight md:text-5xl" data-reveal="rise">
          Three transformations
        </h2>
        <p className="mt-4 max-w-xl text-lg text-graphite" data-reveal="rise">
          Every project is a story of before and after. Here are three that shaped how I think about product.
        </p>
      </div>

      {stories.map((story) => (
        <article key={story.chapter} className="impact-panel relative flex min-h-screen items-center border-t border-grid bg-paper">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] text-accent">
                CH.{story.chapter} — {story.year}
              </p>
              <h3 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">{story.title}</h3>
              <p className="mt-2 font-mono text-xs tracking-[0.15em] uppercase text-graphite">{story.subtitle}</p>
              <p className="mt-8 text-xl font-light italic leading-relaxed text-ink md:text-2xl">{story.hook}</p>
              <p className="mt-6 leading-relaxed text-graphite">{story.narrative}</p>
              <p className="mt-8 inline-flex items-center gap-3 font-mono text-xs tracking-[0.15em] text-accent">
                BEFORE <span aria-hidden>→</span> AFTER : {story.transformation.toUpperCase()}
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[clamp(4rem,10vw,8rem)] font-medium leading-none tracking-tight">
                <Scramble text={story.metric} />
              </p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.25em] uppercase text-graphite">{story.metricLabel}</p>
              <table className="mt-10 w-full max-w-sm border-collapse">
                <caption className="sr-only">Key results</caption>
                <tbody>
                  {story.stats.map((s) => (
                    <tr key={s.label} className="border-t border-grid last:border-b">
                      <th scope="row" className="py-3 pr-4 text-left font-mono text-[10px] font-normal tracking-[0.2em] uppercase text-graphite">
                        {s.label}
                      </th>
                      <td className="py-3 text-right font-mono text-sm text-ink">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
