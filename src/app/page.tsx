"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useCapability } from "@/components/webgl/use-capability";
import { STAGE } from "@/components/webgl/particle-field";
import { SmoothScroll } from "@/components/experience/smooth-scroll";
import {
  navLinks,
  originParagraphs,
  timeline,
  craftAreas,
  toolkit,
  stories,
  contact,
} from "@/data/site";

const ParticleField = dynamic(() => import("@/components/webgl/particle-field"), { ssr: false });

const FINALE_PHOTO = "/photography/photo-11.webp";

export default function Home() {
  const mode = useCapability();
  const [stage, setStage] = useState<number>(STAGE.CLARITY);
  const [menuOpen, setMenuOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLElement>(null);
  const usersRef = useRef<HTMLElement>(null);
  const arrRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLElement>(null);

  const canvasActive = mode === "full" || mode === "lite";

  useGSAP(
    () => {
      if (!canvasActive) return;
      const link = (el: Element | null, s: number) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 65%",
          end: "bottom 35%",
          onToggle: (self) => self.isActive && setStage(s),
        });
      };
      link(heroRef.current, STAGE.CLARITY);
      link(usersRef.current, STAGE.USERS);
      link(arrRef.current, STAGE.ARR);
      link(bodyRef.current, STAGE.CHAOS);
      link(finaleRef.current, STAGE.CHAOS);

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
          },
        );
      });

      // "Develop" the finale photograph: blurred + dark + scaled -> sharp.
      const photo = root.current?.querySelector<HTMLElement>("[data-develop]");
      if (photo) {
        gsap.fromTo(
          photo,
          { opacity: 0, scale: 1.06, filter: "blur(24px) brightness(0.3) contrast(1.4)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px) brightness(1) contrast(1)",
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: photo, start: "top 80%", toggleActions: "play none none none" },
          },
        );
      }

      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [canvasActive] },
  );

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -40 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={root} className="relative min-h-screen bg-[#08080A] text-[#ECE6DA] [--accent:#E0894F]">
      <SmoothScroll />

      {canvasActive && <ParticleField stage={stage} mode={mode === "lite" ? "lite" : "full"} />}

      {/* atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(6,6,8,0.9) 100%)" }}
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] opacity-[0.04] mix-blend-screen">
        <svg className="h-full w-full">
          <filter id="pg">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#pg)" />
        </svg>
      </div>

      {/* nav */}
      <header className="fixed top-0 z-50 w-full">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5" aria-label="Main">
          <Link href="/" className="font-mono text-xs tracking-[0.25em] text-[#ECE6DA] transition-colors hover:text-[var(--accent)]">
            JAI SANGHAVI
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9A8E7C] transition-colors hover:text-[var(--accent)]"
              >
                {l.label}
              </a>
            ))}
            <a href={contact.resume} download className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9A8E7C] transition-colors hover:text-[var(--accent)]">
              Resume ↓
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="font-mono text-[11px] tracking-[0.2em] text-[#ECE6DA] md:hidden"
          >
            MENU
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[#08080A] px-6 py-5 md:hidden">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs tracking-[0.25em] text-[#ECE6DA]">JAI SANGHAVI</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent)]"
            >
              CLOSE ✕
            </button>
          </div>
          <nav className="mt-14 flex flex-col gap-7" aria-label="Mobile">
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  handleNav(e, l.href);
                  setMenuOpen(false);
                }}
                className="flex items-baseline gap-4 border-b border-[#221F1A] pb-5 text-3xl font-semibold text-[#ECE6DA]"
              >
                <span className="font-mono text-xs text-[var(--accent)]">0{i + 1}</span>
                {l.label}
              </a>
            ))}
            <a
              href={contact.resume}
              download
              onClick={() => setMenuOpen(false)}
              className="mt-2 font-mono text-xs tracking-[0.2em] text-[#9A8E7C]"
            >
              DOWNLOAD RESUME ↓
            </a>
          </nav>
        </div>
      )}

      <main className="relative z-10">
        {/* HERO */}
        <section ref={heroRef} className="relative flex min-h-dvh flex-col justify-end px-6 pb-20 pt-28">
          <div className="mx-auto w-full max-w-7xl">
            <p className="font-mono text-[11px] tracking-[0.3em] text-[var(--accent)]">
              PRODUCT × PHOTOGRAPHY — EST. 2019
            </p>
            <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
              I turn chaos
              <br />
              into <span className="text-[var(--accent)]">clarity</span>.
            </h1>
            <p className="mt-7 max-w-xl font-mono text-xs leading-relaxed tracking-[0.12em] text-[#9A8E7C] md:text-sm">
              Product manager building enterprise AI &amp; healthcare software — shipped, audited, adopted by millions.
            </p>
            <div className="mt-10 flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-[#8E8474]">
              <span className="h-px w-10 bg-[var(--accent)]" />
              SCROLL — THE SIGNAL RESOLVES
            </div>
          </div>
        </section>

        {/* BEAT — USERS */}
        <section ref={usersRef} className="relative flex min-h-dvh items-end justify-center px-6 pb-24 text-center">
          <div>
            <p className={`font-semibold tracking-tight ${canvasActive ? "sr-only" : "text-6xl md:text-8xl"}`}>4,000,000</p>
            <p className="mx-auto mt-4 max-w-md font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]" data-reveal>
              users reached — roughly a city the size of Los Angeles
            </p>
          </div>
        </section>

        {/* BEAT — ARR */}
        <section ref={arrRef} className="relative flex min-h-dvh items-end justify-center px-6 pb-24 text-center">
          <div>
            <p className={`font-semibold tracking-tight ${canvasActive ? "sr-only" : "text-6xl md:text-8xl"}`}>$20M+</p>
            <p className="mx-auto mt-4 max-w-md font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]" data-reveal>
              ARR influenced across 50+ enterprises
            </p>
          </div>
        </section>

        {/* BODY (opaque, readable) */}
        <div ref={bodyRef} className="relative bg-[#08080A]">
          {/* ORIGIN */}
          <section id="story" className="mx-auto max-w-5xl px-6 py-28 md:py-40">
            <p className="font-mono text-[11px] tracking-[0.3em] text-[var(--accent)]" data-reveal>SEC.01 — THE ORIGIN</p>
            <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl" data-reveal>
              From automating tasks to <span className="text-[#9A8E7C]">orchestrating outcomes</span>
            </h2>
            <div className="mt-10 max-w-2xl space-y-6">
              {originParagraphs.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-[#C6BBA9] md:text-xl" data-reveal>{p}</p>
              ))}
            </div>
            <ol className="mt-16 space-y-10 border-l border-[#221F1A] pl-8">
              {timeline.map((t) => (
                <li key={t.company} className="relative" data-reveal>
                  <span className="absolute -left-[33px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[#08080A]" />
                  <p className="font-mono text-[11px] tracking-[0.18em] text-[var(--accent)]">{t.period}</p>
                  <h3 className="mt-1 text-xl font-medium md:text-2xl">{t.company}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#9A8E7C] md:text-base">{t.summary}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* CRAFT */}
          <section id="craft" className="mx-auto max-w-6xl px-6 py-28 md:py-40">
            <p className="font-mono text-[11px] tracking-[0.3em] text-[var(--accent)]" data-reveal>SEC.02 — THE CRAFT</p>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl" data-reveal>How I create impact</h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-[#221F1A] bg-[#221F1A] sm:grid-cols-2">
              {craftAreas.map((area) => (
                <article key={area.index} className="bg-[#0C0B0A] p-8 md:p-10" data-reveal>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent)]">{area.index}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-medium md:text-2xl">{area.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#9A8E7C] md:text-base">{area.description}</p>
                  <p className="mt-5 font-mono text-[11px] leading-loose tracking-wide text-[#8E8474]">
                    {area.skills.map((s) => `[${s}]`).join(" ")}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* TOOLKIT */}
          <section className="mx-auto max-w-5xl px-6 py-28 md:py-40">
            <p className="font-mono text-[11px] tracking-[0.3em] text-[var(--accent)]" data-reveal>SEC.03 — THE TOOLKIT</p>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl" data-reveal>Tools of the trade</h2>
            <div className="mt-10 divide-y divide-[#221F1A] overflow-hidden rounded-lg border border-[#221F1A]" data-reveal>
              {toolkit.map((row) => (
                <div key={row.category} className="grid gap-3 px-6 py-5 sm:grid-cols-[1fr_2fr] sm:items-center">
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#9A8E7C]">{row.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {row.tools.map((tool) => (
                      <span key={tool} className="rounded border border-[#2A2620] px-2.5 py-1 text-xs text-[#C6BBA9]">{tool}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <a
              href={contact.patentPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 flex max-w-2xl items-center gap-5 rounded-lg border border-[#221F1A] bg-[#0C0B0A] p-6 transition-colors hover:border-[var(--accent)]"
              data-reveal
            >
              <span className="font-mono text-3xl text-[var(--accent)]">®</span>
              <span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent)]">INDIAN PATENT — GRANTED 2024</span>
                <span className="mt-1 block text-base font-medium group-hover:text-[var(--accent)]">Sewage Blockage Detecting &amp; Removing System →</span>
              </span>
            </a>
          </section>

          {/* IMPACT */}
          <section id="impact" className="mx-auto max-w-5xl px-6 py-28 md:py-40">
            <p className="font-mono text-[11px] tracking-[0.3em] text-[var(--accent)]" data-reveal>SEC.04 — THE IMPACT</p>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl" data-reveal>Three transformations</h2>
            <div className="mt-14 space-y-px overflow-hidden rounded-lg border border-[#221F1A] bg-[#221F1A]">
              {stories.map((s) => (
                <article key={s.chapter} className="grid gap-8 bg-[#0C0B0A] p-8 md:grid-cols-[1fr_1.3fr] md:p-12" data-reveal>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.25em] text-[var(--accent)]">CH.{s.chapter} — {s.year}</p>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-4xl">{s.title}</h3>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[#9A8E7C]">{s.subtitle}</p>
                    <p className="mt-6 text-lg font-light italic leading-relaxed text-[#ECE6DA]">{s.hook}</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-6xl font-semibold tracking-tight md:text-7xl">{s.metric}</p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">{s.metricLabel}</p>
                    <p className="mt-6 leading-relaxed text-[#9A8E7C]">{s.narrative}</p>
                    <p className="mt-6 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.15em] text-[var(--accent)]">
                      BEFORE <span aria-hidden>→</span> AFTER : {s.transformation.toUpperCase()}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* FINALE — the field clears and a photograph develops */}
        <section ref={finaleRef} className="relative bg-[#08080A] px-6 py-28 md:py-40">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-[var(--accent)]" data-reveal>SEC.05 — THE HUMAN</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl" data-reveal>
                And when the noise clears, I pick up a camera.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-[#C6BBA9]" data-reveal>
                The same instinct that finds the product in the chaos finds the photograph in the frame.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-6" data-reveal>
                <Link href="/photography" className="rounded-sm bg-[var(--accent)] px-7 py-3.5 font-mono text-xs tracking-[0.2em] text-[#0A0908] transition-transform hover:scale-[1.03]">
                  ENTER THE DARKROOM →
                </Link>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] tracking-[0.2em] text-[#9A8E7C] transition-colors hover:text-[var(--accent)]">
                  {contact.instagramHandle.toUpperCase()} ↗
                </a>
              </div>
            </div>

            <figure className="relative">
              <div data-develop className="relative aspect-square overflow-hidden rounded-sm will-change-transform">
                <Image
                  src={FINALE_PHOTO}
                  alt="Photograph by Jai M Sanghavi — a tree by still water, mirrored in the reflection"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#8E8474]">
                <span>FRM 011 — {contact.instagramHandle}</span>
                <span>f/2.8 · 1/250 · ISO 100</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* CONNECT */}
        <section id="connect" className="relative bg-[#08080A] px-6 py-32 text-center md:py-44">
          <p className="font-mono text-[11px] tracking-[0.3em] text-[var(--accent)]" data-reveal>SEC.06 — CONNECT</p>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-7xl" data-reveal>
            Let&apos;s build <span className="text-[var(--accent)]">clarity</span>.
          </h2>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row" data-reveal>
            <a href={`mailto:${contact.email}`} className="rounded-sm bg-[var(--accent)] px-8 py-4 font-mono text-xs tracking-[0.2em] text-[#0A0908] transition-transform hover:scale-[1.03]">
              START A CONVERSATION →
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-[#2A2620] px-8 py-4 font-mono text-xs tracking-[0.2em] text-[#ECE6DA] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
              LINKEDIN ↗
            </a>
          </div>
        </section>

        <footer className="relative border-t border-[#1A1714] bg-[#08080A] px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 font-mono text-[11px] tracking-[0.15em] text-[#8E8474] md:flex-row md:justify-between">
            <span>© {new Date().getFullYear()} JAI M SANGHAVI — CSPO® PRODUCT MANAGER</span>
            <span>CHAOS → CLARITY · BUILT WITH NEXT.JS + WEBGL</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
