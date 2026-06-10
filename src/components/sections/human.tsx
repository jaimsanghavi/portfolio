import Image from "next/image";
import Link from "next/link";
import { photos } from "@/data/photos";
import { contact } from "@/data/site";

export function Human() {
  const strip = photos.slice(0, 5);
  return (
    <section className="relative z-10 bg-darkroom px-5 py-24 text-darkroom-ink md:py-36">
      <div className="mx-auto max-w-6xl">
        <p className="mb-10 font-mono text-[11px] tracking-[0.25em] text-accent" data-reveal="rise">
          SEC.05 — THE HUMAN
        </p>
        <h2 className="text-3xl font-medium tracking-tight md:text-5xl" data-reveal="rise">
          After hours, I trade grids for grain
        </h2>
        <p className="mt-4 max-w-xl text-lg text-darkroom-ink/70" data-reveal="rise">
          When I&apos;m not thinking about user flows, I&apos;m out with a camera. Photography taught me to notice
          things I&apos;d otherwise walk past.
        </p>

        <div className="mt-14 flex gap-3 overflow-x-auto pb-4 md:gap-4" data-reveal="rise">
          {strip.map((p, i) => (
            <Link key={p.src} href="/photography" className="group relative shrink-0">
              <Image
                src={p.src}
                alt="Photography by Jai M Sanghavi"
                width={Math.round((p.width / p.height) * 280)}
                height={280}
                placeholder="blur"
                blurDataURL={p.blurDataURL}
                className="h-56 w-auto rounded-sm object-cover opacity-90 transition-opacity group-hover:opacity-100 md:h-72"
              />
              <span className="absolute bottom-2 left-2 font-mono text-[10px] tracking-[0.2em] text-darkroom-ink/80 opacity-0 transition-opacity group-hover:opacity-100">
                FRM {String(i + 1).padStart(3, "0")}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6" data-reveal="rise">
          <Link
            href="/photography"
            className="rounded-sm bg-accent px-6 py-3 font-mono text-xs tracking-[0.2em] text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            ENTER THE DARKROOM →
          </Link>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] tracking-[0.2em] text-darkroom-ink/60 hover:text-accent transition-colors">
            {contact.instagramHandle.toUpperCase()} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
