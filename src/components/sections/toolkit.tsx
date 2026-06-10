import { toolkit, contact } from "@/data/site";
import { SectionLabel } from "@/components/ui/section-label";

export function Toolkit() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 md:py-36">
      <SectionLabel no="03" title="THE TOOLKIT" />
      <h2 className="text-3xl font-medium tracking-tight md:text-5xl" data-reveal="rise">
        Tools of the trade
      </h2>

      <div className="mt-12 overflow-hidden rounded-md border border-grid" data-reveal="rise">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Tools grouped by category</caption>
          <tbody>
            {toolkit.map((row) => (
              <tr key={row.category} className="border-b border-grid last:border-0">
                <th scope="row" className="w-1/3 bg-plate px-5 py-4 align-top font-mono text-[11px] font-normal tracking-[0.15em] uppercase text-graphite">
                  {row.category}
                </th>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {row.tools.map((tool) => (
                      <span key={tool} className="rounded-sm border border-grid bg-plate px-2.5 py-1 text-xs text-ink">
                        {tool}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4 font-mono text-[11px] tracking-[0.15em] text-graphite" data-reveal="rise">
        <span className="rounded-sm border border-grid px-3 py-1.5">CSPO® CERTIFIED</span>
        <span className="rounded-sm border border-grid px-3 py-1.5">B.TECH — REVA UNIVERSITY</span>
      </div>

      <a
        href={contact.patentPdf}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-10 flex max-w-2xl items-start gap-6 rounded-md border border-grid bg-plate p-6 transition-colors hover:border-accent"
        data-reveal="rise"
      >
        <svg viewBox="0 0 80 80" className="h-16 w-16 shrink-0 text-accent" fill="none" stroke="currentColor" aria-hidden data-reveal="draw">
          <circle cx="40" cy="40" r="34" strokeWidth="2" transform="rotate(-8 40 40)" />
          <circle cx="40" cy="40" r="27" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M28 40l8 8 16-18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-accent">INDIAN PATENT — GRANTED 2024</p>
          <h3 className="mt-1 text-lg font-medium group-hover:text-accent transition-colors">
            Sewage Blockage Detecting &amp; Removing System
          </h3>
          <p className="mt-1 text-sm text-graphite">
            Automated IoT solution for municipal infrastructure — detecting blockages before they cause overflow.
          </p>
          <p className="mt-3 font-mono text-[11px] tracking-[0.15em] text-graphite group-hover:text-accent transition-colors">
            VIEW CERTIFICATE ↗
          </p>
        </div>
      </a>
    </section>
  );
}
