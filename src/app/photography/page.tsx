"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { photos } from "@/data/photos";
import { contact } from "@/data/site";
import { Lightbox } from "@/components/ui/lightbox";

export default function Photography() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-darkroom text-darkroom-ink">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-darkroom/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-mono text-[11px] tracking-[0.2em] text-darkroom-ink/70 hover:text-accent transition-colors">
            ← BACK TO PORTFOLIO
          </Link>
          <h1 className="font-mono text-xs tracking-[0.3em]">THE DARKROOM</h1>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] tracking-[0.2em] text-darkroom-ink/70 hover:text-accent transition-colors">
            {contact.instagramHandle.toUpperCase()} ↗
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12">
        <p className="mx-auto mb-12 max-w-xl text-center text-darkroom-ink/70">
          Beyond product management, I find joy in capturing moments that tell stories. Each photograph is a
          perspective on the world I&apos;d otherwise walk past.
        </p>

        <div className="columns-2 gap-3 md:columns-3 md:gap-4">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setSelected(i)}
              className="group relative mb-3 block w-full overflow-hidden rounded-sm md:mb-4"
              aria-label={`FRM ${String(i + 1).padStart(3, "0")} — open photo`}
            >
              <Image
                src={p.src}
                alt="Photography by Jai M Sanghavi"
                width={p.width}
                height={p.height}
                placeholder="blur"
                blurDataURL={p.blurDataURL}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full transition-transform duration-300 group-hover:scale-[1.02]"
                loading={i < 6 ? "eager" : "lazy"}
              />
              <span className="absolute bottom-2 left-2 font-mono text-[10px] tracking-[0.2em] text-white/0 transition-colors group-hover:text-white/90">
                FRM {String(i + 1).padStart(3, "0")}
              </span>
            </button>
          ))}
        </div>
      </main>

      {selected !== null && (
        <Lightbox photos={photos} index={selected} onClose={() => setSelected(null)} onNavigate={setSelected} />
      )}
    </div>
  );
}
