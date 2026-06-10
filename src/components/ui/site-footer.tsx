import Link from "next/link";
import { contact } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-grid bg-paper px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <p className="font-mono text-[11px] tracking-[0.15em] text-graphite">
          © {new Date().getFullYear()} JAI M SANGHAVI — CSPO® PRODUCT MANAGER
        </p>
        <div className="flex items-center gap-5 font-mono text-[11px] tracking-[0.15em]">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-graphite hover:text-accent transition-colors">
            LINKEDIN
          </a>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="text-graphite hover:text-accent transition-colors">
            INSTAGRAM
          </a>
          <a href={`mailto:${contact.email}`} className="text-graphite hover:text-accent transition-colors">
            EMAIL
          </a>
          <Link href="/photography" className="text-graphite hover:text-accent transition-colors">
            PHOTOGRAPHY
          </Link>
        </div>
        <p className="font-mono text-[11px] tracking-[0.15em] text-graphite">
          SET IN SPACE GROTESK &amp; PLEX MONO — BUILT WITH NEXT.JS
        </p>
      </div>
    </footer>
  );
}
