"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks, contact } from "@/data/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors ${
        scrolled ? "bg-paper/90 backdrop-blur-sm border-b border-grid" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Main">
        <Link href="/" className="font-mono text-xs tracking-[0.25em] text-ink hover:text-accent transition-colors">
          JAI SANGHAVI
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="font-mono text-[11px] tracking-[0.18em] uppercase text-graphite hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
          <a href={contact.resume} download className="font-mono text-[11px] tracking-[0.18em] uppercase text-graphite hover:text-accent transition-colors">
            Resume ↓
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="font-mono text-[11px] tracking-[0.2em] text-ink"
          >
            {open ? "CLOSE ✕" : "MENU ☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 top-[57px] z-40 bg-paper md:hidden">
          <div className="flex flex-col gap-6 px-6 py-10">
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-grid pb-4 text-2xl font-medium text-ink"
              >
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                {l.label}
              </a>
            ))}
            <a href={contact.resume} download className="font-mono text-xs tracking-[0.2em] uppercase text-graphite">
              Download resume ↓
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
