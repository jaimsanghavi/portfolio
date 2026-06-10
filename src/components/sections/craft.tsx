import { craftAreas } from "@/data/site";
import { SectionLabel } from "@/components/sections/origin";

const icons: Record<string, React.ReactNode> = {
  spec: (
    <>
      <rect x="5" y="3" width="22" height="26" rx="2" />
      <path d="M10 10h12M10 15h12M10 20h7" />
    </>
  ),
  people: (
    <>
      <circle cx="11" cy="11" r="4" />
      <circle cx="22" cy="13" r="3" />
      <path d="M4 27c0-5 3-8 7-8s7 3 7 8M18 27c0-4 2-6 4-6s5 2 5 6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 28h24" />
      <path d="M8 28V16M15 28V9M22 28V13" />
      <path d="M6 12l7-5 6 3 7-6" />
    </>
  ),
  chip: (
    <>
      <rect x="8" y="8" width="16" height="16" rx="2" />
      <rect x="13" y="13" width="6" height="6" />
      <path d="M12 8V3M20 8V3M12 29v-5M20 29v-5M8 12H3M8 20H3M29 12h-5M29 20h-5" />
    </>
  ),
};

export function Craft() {
  return (
    <section id="craft" className="relative mx-auto max-w-6xl px-5 py-24 md:py-36">
      <SectionLabel no="02" title="THE CRAFT" />
      <h2 className="text-3xl font-medium tracking-tight md:text-5xl" data-reveal="rise">
        How I create impact
      </h2>

      <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-grid bg-grid sm:grid-cols-2">
        {craftAreas.map((area) => (
          <article key={area.index} className="bg-plate p-7 md:p-9" data-reveal="snap">
            <div className="flex items-start justify-between">
              <svg viewBox="0 0 32 32" className="h-9 w-9 text-draft" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden data-reveal="draw">
                {icons[area.icon]}
              </svg>
              <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{area.index}</span>
            </div>
            <h3 className="mt-5 text-xl font-medium md:text-2xl">{area.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-graphite md:text-base">{area.description}</p>
            <p className="mt-5 font-mono text-[11px] leading-loose tracking-wide text-graphite">
              {area.skills.map((s) => `[${s}]`).join(" ")}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
