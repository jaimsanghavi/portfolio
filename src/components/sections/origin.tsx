import Image from "next/image";
import { originParagraphs, timeline } from "@/data/site";
import { SectionLabel } from "@/components/ui/section-label";

export function Origin() {
  return (
    <section id="story" className="relative mx-auto max-w-6xl px-5 py-24 md:py-36">
      <SectionLabel no="01" title="THE ORIGIN" />
      <h2 className="max-w-3xl text-3xl font-medium leading-tight tracking-tight md:text-5xl" data-reveal="rise">
        From automating tasks to <span className="text-graphite">orchestrating outcomes</span>
      </h2>

      <div className="mt-12 flex flex-col-reverse items-start gap-10 md:flex-row md:gap-16">
        <div className="max-w-2xl space-y-6">
          {originParagraphs.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-graphite md:text-xl" data-reveal="rise" data-reveal-delay={`${i * 0.12}`}>
              {p}
            </p>
          ))}
        </div>

        <div className="relative shrink-0" data-reveal="rise">
          <div className="relative h-32 w-32 overflow-hidden rounded-full md:h-40 md:w-40">
            <Image src="/Jai_Profile.jpeg" alt="Jai M Sanghavi" fill priority className="object-cover object-top" sizes="160px" />
          </div>
          <svg
            viewBox="0 0 140 140"
            className="absolute -inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)] text-accent"
            aria-hidden
            data-reveal="draw"
          >
            <ellipse cx="70" cy="70" rx="64" ry="58" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(-7 70 70)" />
          </svg>
          <p className="mt-4 text-center font-mono text-[10px] tracking-[0.2em] text-draft">fig. 1.0 — the author</p>
        </div>
      </div>

      <div className="relative mt-20 md:mt-28">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-grid md:left-1/2" aria-hidden />
        <ol className="space-y-16">
          {timeline.map((t, i) => (
            <li key={t.company} className="relative grid gap-4 pl-10 md:grid-cols-2 md:gap-12 md:pl-0">
              <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-paper md:left-1/2 md:-translate-x-1/2" aria-hidden />
              <div className={i % 2 === 0 ? "md:col-start-1 md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}>
                <p className="font-mono text-[11px] tracking-[0.18em] text-accent">{t.period}</p>
                <h3 className="mt-1 text-xl font-medium md:text-2xl">{t.company}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite md:text-base">{t.summary}</p>
                <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-draft">fig. 1.{i + 1}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
