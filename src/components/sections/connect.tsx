import { contact } from "@/data/site";

export function Connect() {
  return (
    <section id="connect" className="relative mx-auto max-w-6xl px-5 py-28 text-center md:py-44">
      <p className="mb-10 font-mono text-[11px] tracking-[0.25em] text-accent" data-reveal="rise">
        SEC.06 — CONNECT
      </p>
      <h2 className="text-4xl font-medium leading-[1.05] tracking-tight md:text-7xl" data-reveal="rise">
        Let&apos;s build <span className="relative inline-block">clarity<span className="absolute -bottom-1 left-0 h-[4px] w-full bg-accent" /></span>
        <span className="text-accent">.</span>
      </h2>
      <p className="mx-auto mt-6 max-w-md text-lg text-graphite" data-reveal="rise">
        Whether you&apos;re building something new or reimagining something old, I&apos;d love to hear about it.
      </p>
      <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row" data-reveal="rise">
        <a
          href={`mailto:${contact.email}`}
          className="rounded-sm bg-accent px-8 py-4 font-mono text-xs tracking-[0.2em] text-white dark:text-darkroom transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          START A CONVERSATION →
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm border border-grid px-8 py-4 font-mono text-xs tracking-[0.2em] text-ink transition-colors hover:border-accent hover:text-accent"
        >
          LINKEDIN ↗
        </a>
      </div>
      <a href={contact.resume} download className="mt-8 inline-block font-mono text-[11px] tracking-[0.2em] text-graphite hover:text-accent transition-colors" data-reveal="rise">
        OR JUST GRAB MY RESUME ↓
      </a>
    </section>
  );
}
