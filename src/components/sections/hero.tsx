import Image from "next/image";
import { ScatterText } from "@/components/motion/scatter-text";
import { CountUp } from "@/components/motion/count-up";
import { heroStats } from "@/data/site";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-5 pt-20 text-center">
      <div className="relative mb-10" data-reveal="rise">
        <div className="relative h-28 w-28 overflow-hidden rounded-full md:h-32 md:w-32">
          <Image src="/Jai_Profile.jpeg" alt="Jai M Sanghavi" fill priority className="object-cover object-top" sizes="128px" />
        </div>
        <svg
          viewBox="0 0 140 140"
          className="absolute -inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)] text-accent"
          aria-hidden
          data-reveal="draw"
        >
          <ellipse cx="70" cy="70" rx="64" ry="58" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(-7 70 70)" />
        </svg>
      </div>

      <h1 className="max-w-5xl text-5xl font-medium leading-[1.04] tracking-tight md:text-7xl lg:text-8xl">
        I turn <ScatterText text="chaos" className="text-graphite" />
        <br />
        into{" "}
        <span className="relative inline-block">
          clarity
          <span className="absolute -bottom-1 left-0 h-[5px] w-full bg-accent md:-bottom-2" />
        </span>
        <span className="text-accent">.</span>
      </h1>

      <p className="mt-8 font-mono text-xs tracking-[0.18em] uppercase text-graphite md:text-sm" data-reveal="rise" data-reveal-delay="0.5">
        Product Manager — enterprise AI &amp; healthcare software, shipped, audited, adopted.
      </p>

      <div className="mt-14 flex flex-wrap items-end justify-center gap-10 md:gap-16" data-reveal="rise" data-reveal-delay="0.7">
        {heroStats.map((s) => (
          <div key={s.label} className="text-left">
            <p className="text-4xl font-medium tracking-tight md:text-5xl">
              <CountUp end={s.end} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.2em] uppercase text-graphite">{s.label}</p>
          </div>
        ))}
      </div>

      <a href="#story" className="group mt-16 flex flex-col items-center gap-3" data-reveal="rise" data-reveal-delay="0.9">
        <svg width="2" height="40" aria-hidden data-reveal="draw" data-reveal-delay="1.1" className="text-accent">
          <line x1="1" y1="0" x2="1" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" />
        </svg>
        <span className="font-mono text-[10px] tracking-[0.25em] text-accent">SEC.01 — THE ORIGIN</span>
      </a>
    </section>
  );
}
