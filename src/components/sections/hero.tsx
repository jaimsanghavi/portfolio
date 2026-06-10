import { ScatterText } from "@/components/motion/scatter-text";
import { CountUp } from "@/components/motion/count-up";
import { heroStats } from "@/data/site";

function Hairline() {
  return <div aria-hidden className="h-px w-full max-w-6xl bg-grid" />;
}

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-5 pt-20 text-center">
      <p className="mb-10 font-mono text-xs tracking-[0.25em] text-graphite md:text-sm" data-reveal="rise">
        PRODUCT MANAGER — EST. 2019
      </p>

      <Hairline />

      <h1 className="my-8 max-w-5xl text-5xl font-medium leading-[1.08] tracking-tight md:my-10 md:text-7xl lg:text-8xl">
        I turn <ScatterText text="chaos" className="text-graphite" />
        <br />
        into{" "}
        <span className="relative inline-block">
          clarity
          <span className="absolute -bottom-2 left-0 h-1.5 w-full bg-accent md:-bottom-3" />
        </span>
        <span className="text-accent">.</span>
      </h1>

      <p className="font-mono text-sm text-graphite md:text-base" data-reveal="rise" data-reveal-delay="0.5">
        Enterprise AI &amp; healthcare software — shipped, audited, adopted.
      </p>

      <div className="mt-8 w-full max-w-6xl md:mt-10">
        <Hairline />
      </div>

      <div className="mt-10 flex flex-wrap items-end justify-center gap-10 md:mt-12 md:gap-20" data-reveal="rise" data-reveal-delay="0.7">
        {heroStats.map((s) => (
          <div key={s.label} className="text-left">
            <p className="text-4xl font-medium tracking-tight md:text-6xl">
              <CountUp end={s.end} prefix={s.prefix ?? ""} />
              {s.unit}
              <span className="text-accent">+</span>
            </p>
            <p className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-graphite md:text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 w-full max-w-6xl md:mt-12">
        <Hairline />
      </div>

      <a href="#story" className="group mt-12 flex flex-col items-center gap-3" data-reveal="rise" data-reveal-delay="0.9">
        <svg width="2" height="40" aria-hidden data-reveal="draw" data-reveal-delay="1.1" className="text-accent">
          <line x1="1" y1="0" x2="1" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" />
        </svg>
        <span className="font-mono text-[10px] tracking-[0.25em] text-accent">SEC.01 — THE ORIGIN</span>
      </a>
    </section>
  );
}
