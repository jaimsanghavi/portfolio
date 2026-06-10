# Clarity Grid Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio UI as the "Clarity Grid" system (Swiss kinetic × chaos→clarity × sketchbook), fix the image pipeline (HEIC→WebP, Next optimization), and clean up code health per `docs/superpowers/specs/2026-06-10-portfolio-redesign-design.md`.

**Architecture:** New token-based design system in Tailwind v4 `@theme` with a light "paper" and dark "blueprint" theme. Server-rendered section components composed by `page.tsx`; one `MotionRoot` client wrapper drives GSAP scroll entrances via `data-reveal` attributes; content is never hidden without JS (`html.js` gate). Photos are pre-converted to WebP by a one-off script that emits a typed manifest.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS v4, GSAP + ScrollTrigger (`@gsap/react`), next-themes, next/font (Space Grotesk, IBM Plex Mono), sharp + macOS `sips` (build-time photo conversion only).

**Verification model:** This repo has no unit-test infrastructure and the work is visual; adding a test framework would violate YAGNI. The test analog per task is: `npm run build` (module resolution), scoped `tsc` checks, and browser verification against `npm run dev` (screenshots at 1440/768/390, light+dark, reduced-motion, JS-off). Final gate is spec §9.

**Branch:** work happens on `redesign/clarity-grid` (already created, spec committed).

**Known pre-existing TS errors (must not grow):** 4 errors in `src/components/application/table/table.tsx` and `src/components/foundations/payment-icons/index.tsx`. They disappear when the kit is deleted in Task 11; until then `next.config.ts` keeps `ignoreBuildErrors: true`. Interim type checks use:
`npx tsc --noEmit 2>&1 | grep -v -E 'src/components/(application|foundations)/' ; true` → expected: no output.

---

## File structure (end state)

```
src/
  app/
    layout.tsx              # fonts, providers, metadata, JSON-LD, js-class script
    page.tsx                # server: composes sections inside <main>
    globals.css             # tokens (@theme), dark overrides, base + reveal gating
    photography/page.tsx    # client gallery + lightbox
    photography/layout.tsx  # metadata only
    robots.ts, sitemap.ts   # / and /photography only
  components/
    motion/motion-root.tsx  # client: data-reveal / data-scatter / draw orchestration
    motion/count-up.tsx     # client: numeric count-up on scroll
    motion/scramble.tsx     # client: text scramble-resolve on scroll
    motion/scatter-text.tsx # server: deterministic scattered letters
    sections/hero.tsx       # server
    sections/origin.tsx     # server (timeline SVG)
    sections/craft.tsx      # server (draw-on icons)
    sections/toolkit.tsx    # server (spec table + patent stamp)
    sections/impact.tsx     # client (pinned chapters)
    sections/human.tsx      # server (darkroom filmstrip)
    sections/connect.tsx    # server
    ui/site-nav.tsx         # client (mobile menu state)
    ui/theme-toggle.tsx     # client
    ui/site-footer.tsx      # server
    ui/grid-layer.tsx       # server (exposed grid)
    ui/lightbox.tsx         # client (keyboard nav, focus mgmt)
  data/site.ts              # all copy/content extracted from old page.tsx
  data/photos.ts            # GENERATED manifest {src,width,height,blurDataURL}
  lib/gsap.ts               # existing, kept
  lib/site-url.ts           # canonical URL helper
  providers/theme.tsx       # simplified next-themes wrapper
  utils/cx.ts               # existing, kept
scripts/process-photos.mjs  # one-off converter (committed for reruns)
```

Deleted by the end: `src/app/showcase/`, `src/components/{application,base,foundations,marketing,shared-assets,navigation,animations}`, `src/components/{card.tsx,index.ts,theme-toggle.tsx}`, `src/providers/router-provider.tsx`, `src/utils/is-react-component.ts`, `src/hooks/`, `src/styles/`, root archives, root `google62dc9156b89ed173.html` (the copy in `public/` stays — it is the live Google verification).

---

### Task 1: Repo hygiene & safe config/meta fixes

**Files:**
- Delete: `portfolio-build.tar.gz`, `portfolio-upload.zip`, `google62dc9156b89ed173.html` (root copy only), `src/app/showcase/` (whole dir)
- Modify: `.gitignore`, `src/app/sitemap.ts`, `src/app/layout.tsx` (2 line removals)

- [ ] **Step 1: Delete junk files and the showcase page**

```bash
git rm portfolio-build.tar.gz portfolio-upload.zip google62dc9156b89ed173.html
git rm -r src/app/showcase
```

- [ ] **Step 2: Extend .gitignore**

Append to `.gitignore`:

```
# build artifacts / local exports
*.tar.gz
*.zip
.review-shots/
```

- [ ] **Step 3: Trim sitemap to live routes**

In `src/app/sitemap.ts` replace the routes line:

```ts
  const routes = ["/", "/photography"].map((path) => ({
```

- [ ] **Step 4: Remove broken meta tags from layout**

In `src/app/layout.tsx` delete these two lines (the file-based verification in `public/google62dc9156b89ed173.html` is the one that works; the keywords meta is redundant with `metadata.keywords`):

```tsx
<meta name="google-site-verification" content="google62dc9156b89ed173.html" />
<meta name="keywords" content="Jai M Sanghavi, Product Manager, ... Activation, Adoption" />
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: "Compiled successfully", routes listed: `/`, `/photography` (no `/showcase`).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove showcase demo page, committed archives, and broken meta tags"
```

---

### Task 2: Photo pipeline — convert HEIC/oversized images to WebP + manifest

**Files:**
- Create: `scripts/process-photos.mjs`, `src/data/photos.ts` (generated)
- Modify: `next.config.ts`, `package.json` (add `sharp` devDependency)
- Delete: all original `public/photography/*` after conversion

- [ ] **Step 1: Install sharp**

Run: `npm install -D sharp`
Expected: added to devDependencies without errors.

- [ ] **Step 2: Write the conversion script**

Create `scripts/process-photos.mjs`:

```js
import { execSync } from "node:child_process";
import { readdirSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "public/photography";
const TMP = ".photo-tmp";
const MAX_EDGE = 1600;

const files = readdirSync(SRC)
  .filter((f) => /\.(heic|jpg|jpeg|webp|png)$/i.test(f))
  .sort((a, b) => parseInt(b, 10) - parseInt(a, 10)); // numeric prefix desc = newest first

mkdirSync(TMP, { recursive: true });
const manifest = [];

for (let i = 0; i < files.length; i++) {
  const input = path.join(SRC, files[i]);
  const outName = `photo-${String(i + 1).padStart(2, "0")}.webp`;
  const outPath = path.join(SRC, outName);

  let readable = input;
  if (/\.heic$/i.test(input)) {
    readable = path.join(TMP, `${i}.png`);
    execSync(`sips -s format png "${input}" --out "${readable}"`, { stdio: "pipe" });
  }

  const img = sharp(readable).rotate();
  const meta = await img.metadata();
  const scale = Math.min(1, MAX_EDGE / Math.max(meta.width, meta.height));
  const width = Math.round(meta.width * scale);
  const height = Math.round(meta.height * scale);

  await sharp(readable).rotate().resize(width, height).webp({ quality: 80 }).toFile(outPath);

  const blur = await sharp(readable).rotate().resize(12).webp({ quality: 30 }).toBuffer();
  manifest.push({
    src: `/photography/${outName}`,
    width,
    height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  });
  console.log(`${files[i]} -> ${outName} (${width}x${height})`);
}

for (const f of files) rmSync(path.join(SRC, f));
rmSync(TMP, { recursive: true, force: true });

const ts = `// GENERATED by scripts/process-photos.mjs — do not edit by hand.
export interface Photo {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
}

export const photos: Photo[] = ${JSON.stringify(manifest, null, 2)};
`;
writeFileSync("src/data/photos.ts", ts);
console.log(`Wrote src/data/photos.ts with ${manifest.length} photos`);
```

- [ ] **Step 3: Run it**

Run: `node scripts/process-photos.mjs`
Expected: 54 conversion lines, final line `Wrote src/data/photos.ts with 54 photos`. Verify: `ls public/photography | grep -cv webp` → `0`; `du -sh public/photography` → ≤ 6M stored (AMENDED during execution: the grainy source photos don't compress below ~5MB above quality 64; final settings are MAX_EDGE 1400 / quality 75 / effort 6. Stored size is not user payload — Next/Image + the Vercel optimizer serve resized variants).

- [ ] **Step 4: Enable Next image optimization**

In `next.config.ts` remove the `images` block entirely (leave `typescript.ignoreBuildErrors` for now — removed in Task 11):

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@untitledui/icons"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
```

- [ ] **Step 5: Fix the now-broken old gallery references**

The old `src/app/photography/page.tsx` hardcodes the deleted filenames. Replace its `photographyImages` array with the manifest so the site still works until Task 10 rebuilds the page properly:

```tsx
import { photos } from "@/data/photos";

const photographyImages = photos.map((p, i) => ({
  id: i + 1,
  src: p.src,
  alt: "Photography by Jai M Sanghavi",
}));
```

(Delete the entire literal array it replaces; the `.heic` conditional branches in the JSX become dead but harmless — they go away in Task 10.)

- [ ] **Step 6: Verify build + gallery renders**

Run: `npm run build`
Expected: success. Then `npm run dev`, open `http://localhost:3000/photography`, confirm photos render.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: convert gallery to WebP with generated manifest, enable Next image optimization"
```

---

### Task 3: Design foundation — tokens, fonts CSS, site data

**Files:**
- Create: `src/app/globals.css` (overwrite existing content), `src/data/site.ts`, `src/lib/site-url.ts`

Nothing imports these yet; old pages keep working until the Task 9 swap.

- [ ] **Step 1: Write the new globals.css** (full replacement of `src/app/globals.css`)

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --font-sans: var(--font-grotesk), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-plex-mono), ui-monospace, "SF Mono", monospace;

  --color-paper: #faf8f2;
  --color-ink: #14120f;
  --color-graphite: #5c574d;
  --color-accent: #c0301e;
  --color-draft: #2b5bad;
  --color-grid: #e7e3d8;
  --color-plate: #ffffff;
  --color-darkroom: #101010;
  --color-darkroom-ink: #ece9e2;
}

.dark {
  --color-paper: #0f1b2d;
  --color-ink: #eaf0f8;
  --color-graphite: #9db0c8;
  --color-accent: #ff6a50;
  --color-draft: #7fa8e0;
  --color-grid: #1c2c44;
  --color-plate: #15233a;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
}

::selection {
  background: var(--color-accent);
  color: var(--color-paper);
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Reveal gating: content only hides when JS is confirmed present */
html.js [data-reveal] {
  opacity: 0;
}

html.js [data-scatter-letter] {
  transform: rotate(var(--scatter-r)) translateY(var(--scatter-y));
  opacity: 0.55;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  html.js [data-reveal] {
    opacity: 1;
  }
  html.js [data-scatter-letter] {
    transform: none;
    opacity: 1;
  }
}

.font-tabular {
  font-variant-numeric: tabular-nums;
}
```

- [ ] **Step 2: Write src/lib/site-url.ts**

```ts
export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  return url.replace(/\/$/, "");
}
```

- [ ] **Step 3: Write src/data/site.ts** (content lifted verbatim from old `page.tsx`)

```ts
export const navLinks = [
  { href: "#story", label: "Story" },
  { href: "#craft", label: "Craft" },
  { href: "#impact", label: "Impact" },
  { href: "/photography", label: "Photography" },
  { href: "#connect", label: "Connect" },
];

export const heroStats = [
  { end: 6, suffix: "+", label: "Years" },
  { end: 4, suffix: "M+", label: "Users served" },
  { end: 20, prefix: "$", suffix: "M+", label: "ARR influenced" },
];

export const originParagraphs = [
  "I started in medical manufacturing. FDA audits. Processes where one wrong click could trigger a recall worth more than my salary.",
  "Watching people fight with software that should have helped them, I started asking: why is this so hard? Most of the time, it didn't have to be.",
  "Now I'm at Deloitte Studios, working on SaMD apps for 4M+ users across 270+ centers. I built an AI agent that writes 60% of our design docs. Still asking the same question, though.",
];

export const timeline = [
  {
    period: "Mar 2025 — Present",
    company: "Deloitte Studios",
    summary: "BA/BXD Lead for SaMD transformation · 4M+ users · 270+ centers · GxP compliance · AI document agent",
  },
  {
    period: "Jan 2022 — Mar 2025",
    company: "Edgeverve (Infosys)",
    summary: "Product Manager · Gen AI NLP feature · $20M+ ARR · 50+ enterprises · Gartner & Forrester demos",
  },
  {
    period: "Jun 2019 — Jan 2022",
    company: "Tata Consultancy Services",
    summary: "Process Lead · $250K+ saved · Innovation Spark Award (top 5% of 450K) · FDA-compliant frameworks",
  },
];

export const craftAreas = [
  {
    index: "C.01",
    icon: "spec",
    title: "Requirements to Reality",
    description: "I write specs that engineers can actually build from and stakeholders can sign off on.",
    skills: ["BRD/FRD Documentation", "Epics & User Stories", "Acceptance Criteria", "Gap Analysis"],
  },
  {
    index: "C.02",
    icon: "people",
    title: "Stakeholder Orchestration",
    description: "I get 15+ people across architecture, dev, and validation to agree on what we're building. It's harder than it sounds.",
    skills: ["Cross-functional Leadership", "GxP Compliance", "UAT Coordination", "Change Control"],
  },
  {
    index: "C.03",
    icon: "chart",
    title: "Data-Driven Decisions",
    description: "50+ customer interviews. 400+ backlog items triaged. I don't guess when I can measure.",
    skills: ["A/B Testing", "Product Analytics", "RICE Prioritization", "Customer Interviews"],
  },
  {
    index: "C.04",
    icon: "chip",
    title: "AI-First Thinking",
    description: "I build AI tools that people actually use, not demos that collect dust.",
    skills: ["Gen AI Integration", "NLP Features", "Process Mining", "Automation Design"],
  },
] as const;

export const toolkit = [
  { category: "AI-powered development", tools: ["v0", "Lovable", "Claude Code", "Cursor", "VS Code", "GitHub Copilot"] },
  { category: "Design & prototyping", tools: ["Figma", "Figma Make", "Framer", "FigJam", "Canva"] },
  { category: "Product & project", tools: ["Jira", "Atlassian Intelligence / Rovo"] },
  { category: "Documentation & knowledge", tools: ["Notion", "Confluence", "GitHub", "Coda"] },
  { category: "Analytics & data", tools: ["Power BI", "SQL", "Tableau"] },
  { category: "Communication", tools: ["Microsoft Teams", "Zoom", "Google Meet"] },
];

export const stories = [
  {
    chapter: "01",
    year: "2025",
    title: "Designing for 4 Million",
    subtitle: "Cloud-Native SaMD Transformation",
    hook: "Medical-grade applications under FDA scrutiny. 270+ centers that can't afford downtime.",
    narrative:
      "At Deloitte Studios, I lead BA/BXD for 5 SaMD applications serving 4M+ users. My BRDs pass GxP review on the first try. I also built an AI agent that drafts 60% of our design documents, which my team actually uses.",
    metric: "4M+",
    metricLabel: "users impacted",
    transformation: "30% faster compliance cycles",
    stats: [
      { label: "Users impacted", value: "4M+" },
      { label: "Centers served", value: "270+" },
      { label: "Sprint completion", value: "90%+" },
    ],
  },
  {
    chapter: "02",
    year: "2024",
    title: "The Language of Data",
    subtitle: "Gen AI-Powered NLP Analytics",
    hook: "50+ enterprises sitting on process data they couldn't analyze fast enough to act on.",
    narrative:
      "I led 7 people to ship a Gen AI NLP feature that cut analysis time from weeks to hours. The real proof: enterprises started making decisions they'd been putting off for months.",
    metric: "$20M+",
    metricLabel: "ARR influenced",
    transformation: "60% faster time-to-insight",
    stats: [
      { label: "Enterprise clients", value: "50+" },
      { label: "ARR influenced", value: "$20M+" },
      { label: "On-time delivery", value: "98%" },
    ],
  },
  {
    chapter: "03",
    year: "2021",
    title: "The $250K Question",
    subtitle: "Intelligent Automation Suite",
    hook: "A medical manufacturing floor where one mistake could mean a recall. Too many processes were still manual.",
    narrative:
      "Fresh out of university, I deployed 7 RPA and Python automations that saved $250K a year. I also built a VBA tool that replaced 5 separate systems with one dashboard. Quality incidents dropped 80%. The prototype became a real product.",
    metric: "$250K+",
    metricLabel: "annual savings",
    transformation: "90% error reduction",
    stats: [
      { label: "Annual savings", value: "$250K+" },
      { label: "Error reduction", value: "90%" },
      { label: "Quality improvement", value: "80%" },
    ],
  },
];

export const contact = {
  email: "jaimsanghavi@gmail.com",
  linkedin: "https://www.linkedin.com/in/jaimsanghavi",
  instagram: "https://instagram.com/xposure_trifecta",
  instagramHandle: "@xposure_trifecta",
  resume: "/Jai_Sanghavi_Product_Manager_Resume.pdf",
  patentPdf: "/1717591849226.pdf",
};
```

- [ ] **Step 4: Type-check (scoped) and commit**

Run: `npx tsc --noEmit 2>&1 | grep -v -E 'src/components/(application|foundations)/' ; true`
Expected: no output.

```bash
git add src/app/globals.css src/data/site.ts src/lib/site-url.ts
git commit -m "feat: Clarity Grid design tokens, site data, and canonical URL helper"
```

---

### Task 4: Motion primitives

**Files:**
- Create: `src/components/motion/motion-root.tsx`, `src/components/motion/count-up.tsx`, `src/components/motion/scramble.tsx`, `src/components/motion/scatter-text.tsx`

- [ ] **Step 1: motion-root.tsx**

```tsx
"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function MotionRoot({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      try {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        const letters = gsap.utils.toArray<HTMLElement>("[data-scatter-letter]");

        if (reduce) {
          gsap.set(reveals, { opacity: 1 });
          return;
        }

        gsap.to(letters, {
          rotate: 0,
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.25,
          stagger: 0.045,
          ease: "back.out(1.6)",
          clearProps: "transform",
        });

        for (const el of reveals) {
          const variant = el.dataset.reveal;
          const delay = Number(el.dataset.revealDelay ?? 0);
          const trigger = { trigger: el, start: "top 85%", once: true };

          if (variant === "draw") {
            const geoms = el.querySelectorAll<SVGGeometryElement>("path, line, circle, rect, ellipse, polyline");
            gsap.set(el, { opacity: 1 });
            geoms.forEach((g) => {
              const len = g.getTotalLength();
              gsap.set(g, { strokeDasharray: len, strokeDashoffset: len });
            });
            gsap.to(geoms, {
              strokeDashoffset: 0,
              duration: 1.1,
              stagger: 0.12,
              ease: "power2.inOut",
              delay,
              scrollTrigger: trigger,
            });
          } else if (variant === "snap") {
            gsap.fromTo(
              el,
              { opacity: 0, y: 10, rotate: 1.2 },
              { opacity: 1, y: 0, rotate: 0, duration: 0.55, ease: "power3.out", delay, scrollTrigger: trigger }
            );
          } else {
            gsap.fromTo(
              el,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay, scrollTrigger: trigger }
            );
          }
        }
      } catch {
        document.documentElement.classList.remove("js");
      }
    },
    { scope }
  );

  return <div ref={scope}>{children}</div>;
}
```

- [ ] **Step 2: count-up.tsx**

```tsx
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ end, prefix = "", suffix = "", duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const state = { v: 0 };
    gsap.to(state, {
      v: end,
      duration,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(state.v)}${suffix}`;
      },
    });
  });

  return (
    <span ref={ref} className={`font-tabular ${className ?? ""}`}>
      {prefix}
      {end}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 3: scramble.tsx**

```tsx
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const POOL = "0123456789$%+MK#";

export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } }).call(() => {
      const target = text;
      const start = performance.now();
      const total = 900;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / total);
        const settled = Math.floor(p * target.length);
        el.textContent =
          target.slice(0, settled) +
          [...target.slice(settled)]
            .map((c) => (c === " " ? " " : POOL[Math.floor(Math.random() * POOL.length)]))
            .join("");
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
    });
  });

  return (
    <span ref={ref} className={`font-tabular ${className ?? ""}`}>
      {text}
    </span>
  );
}
```

- [ ] **Step 4: scatter-text.tsx** (server component — deterministic transforms, no hydration mismatch)

```tsx
import type { CSSProperties } from "react";

export function ScatterText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text} role="text">
      {[...text].map((ch, i) => {
        const r = ((i * 137) % 17) - 8;
        const y = ((i * 89) % 13) - 6;
        const style = { "--scatter-r": `${r}deg`, "--scatter-y": `${y}px` } as CSSProperties;
        return (
          <span key={i} aria-hidden data-scatter-letter className="inline-block" style={style}>
            {ch === " " ? " " : ch}
          </span>
        );
      })}
    </span>
  );
}
```

- [ ] **Step 5: Type-check and commit**

Run: `npx tsc --noEmit 2>&1 | grep -v -E 'src/components/(application|foundations)/' ; true`
Expected: no output.

```bash
git add src/components/motion
git commit -m "feat: motion primitives — reveal orchestration, count-up, scramble, scatter text"
```

---

### Task 5: UI chrome — nav, theme toggle, footer, grid layer, theme provider

**Files:**
- Create: `src/components/ui/theme-toggle.tsx`, `src/components/ui/site-nav.tsx`, `src/components/ui/site-footer.tsx`, `src/components/ui/grid-layer.tsx`
- Modify: `src/providers/theme.tsx` (full replacement)

- [ ] **Step 1: providers/theme.tsx** (replace file contents)

```tsx
"use client";

import { ThemeProvider } from "next-themes";

export function Theme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
```

- [ ] **Step 2: ui/theme-toggle.tsx**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="font-mono text-[11px] tracking-[0.2em] text-graphite hover:text-accent transition-colors"
      aria-label={dark ? "Switch to paper (light) theme" : "Switch to blueprint (dark) theme"}
    >
      {dark ? "● BLUEPRINT" : "○ PAPER"}
    </button>
  );
}
```

- [ ] **Step 3: ui/grid-layer.tsx**

```tsx
export function GridLayer() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="mx-auto grid h-full max-w-6xl grid-cols-2 md:grid-cols-4 border-x border-grid/70 px-0">
        <div className="border-r border-grid/50" />
        <div className="hidden md:block border-r border-grid/50" />
        <div className="hidden md:block border-r border-grid/50" />
        <div />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: ui/site-nav.tsx**

```tsx
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
```

- [ ] **Step 5: ui/site-footer.tsx**

```tsx
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
```

- [ ] **Step 6: Type-check and commit**

Run: `npx tsc --noEmit 2>&1 | grep -v -E 'src/components/(application|foundations)/' ; true`
Expected: no output.

```bash
git add src/components/ui src/providers/theme.tsx
git commit -m "feat: site chrome — nav, paper/blueprint toggle, footer, exposed grid layer"
```

Note: replacing `providers/theme.tsx` changes the theme classes from `light-mode`/`dark-mode` to `light`/`dark`, so the OLD page's `dark:` styles stop responding to the toggle until Task 9 swaps the page. Acceptable mid-branch state.

---

### Task 6: Sections — Hero and Origin

**Files:**
- Create: `src/components/sections/hero.tsx`, `src/components/sections/origin.tsx`

- [ ] **Step 1: sections/hero.tsx**

```tsx
import Image from "next/image";
import { ScatterText } from "@/components/motion/scatter-text";
import { CountUp } from "@/components/motion/count-up";
import { heroStats } from "@/data/site";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-5 pt-20 text-center">
      <div className="relative mb-10" data-reveal="rise">
        <div className="relative h-28 w-28 overflow-hidden rounded-full md:h-32 md:w-32">
          <Image src="/Jai_Profile.jpeg" alt="Jai M Sanghavi" fill priority className="object-cover object-top" sizes="128px" />
        </div>
        <svg
          viewBox="0 0 140 140"
          className="absolute -inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)] text-accent"
          aria-hidden
          data-reveal="draw"
        >
          <ellipse cx="70" cy="70" rx="64" ry="58" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(-7 70 70)" />
        </svg>
      </div>

      <h1 className="max-w-5xl text-5xl font-medium leading-[1.04] tracking-tight md:text-7xl lg:text-8xl">
        I turn <ScatterText text="chaos" className="text-graphite" />
        <br />
        into <span className="relative inline-block">clarity<span className="absolute -bottom-1 left-0 h-[5px] w-full bg-accent md:-bottom-2" /></span>
        <span className="text-accent">.</span>
      </h1>

      <p className="mt-8 font-mono text-xs tracking-[0.18em] uppercase text-graphite md:text-sm" data-reveal="rise" data-reveal-delay="0.5">
        Product Manager — enterprise AI &amp; healthcare software, shipped, audited, adopted.
      </p>

      <dl className="mt-14 flex flex-wrap items-end justify-center gap-10 md:gap-16" data-reveal="rise" data-reveal-delay="0.7">
        {heroStats.map((s) => (
          <div key={s.label} className="text-left">
            <dd className="text-4xl font-medium tracking-tight md:text-5xl">
              <CountUp end={s.end} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
              <span className="text-accent">&nbsp;</span>
            </dd>
            <dt className="mt-1 font-mono text-[10px] tracking-[0.2em] uppercase text-graphite">{s.label}</dt>
          </div>
        ))}
      </dl>

      <a href="#story" className="group mt-16 flex flex-col items-center gap-3" data-reveal="rise" data-reveal-delay="0.9">
        <svg width="2" height="40" aria-hidden data-reveal="draw" data-reveal-delay="1.1" className="text-accent">
          <line x1="1" y1="0" x2="1" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="3 4" />
        </svg>
        <span className="font-mono text-[10px] tracking-[0.25em] text-accent">SEC.01 — THE ORIGIN</span>
      </a>
    </section>
  );
}
```

(Note `heroStats` entries without `prefix` need the type to allow it: in `src/data/site.ts` the array literal infers `prefix` only on the third item — adjust the declaration to `export const heroStats: { end: number; prefix?: string; suffix: string; label: string }[] = [...]`.)

- [ ] **Step 2: sections/origin.tsx**

```tsx
import { originParagraphs, timeline } from "@/data/site";

function SectionLabel({ no, title }: { no: string; title: string }) {
  return (
    <p className="mb-10 font-mono text-[11px] tracking-[0.25em] text-accent" data-reveal="rise">
      SEC.{no} — {title}
    </p>
  );
}

export { SectionLabel };

export function Origin() {
  return (
    <section id="story" className="relative mx-auto max-w-6xl px-5 py-24 md:py-36">
      <SectionLabel no="01" title="THE ORIGIN" />
      <h2 className="max-w-3xl text-3xl font-medium leading-tight tracking-tight md:text-5xl" data-reveal="rise">
        From automating tasks to <span className="text-graphite">orchestrating outcomes</span>
      </h2>

      <div className="mt-12 max-w-2xl space-y-6">
        {originParagraphs.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed text-graphite md:text-xl" data-reveal="rise" data-reveal-delay={`${i * 0.12}`}>
            {p}
          </p>
        ))}
      </div>

      <div className="relative mt-20 md:mt-28">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-grid md:left-1/2" aria-hidden />
        <ol className="space-y-16">
          {timeline.map((t, i) => (
            <li key={t.company} className="relative grid gap-4 pl-10 md:grid-cols-2 md:gap-12 md:pl-0">
              <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-paper md:left-1/2 md:-translate-x-1/2" aria-hidden />
              <div className={i % 2 === 0 ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}>
                <svg viewBox="0 0 300 110" className="mb-3 hidden w-full max-w-xs text-draft md:block" aria-hidden data-reveal="draw">
                  <rect x="2" y="2" width="296" height="106" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" />
                </svg>
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
```

(Layout intent: the dashed blueprint rect is decorative behind each entry; keep it simple — if it crowds the text in browser verification, drop the `<svg>` block and keep the entry text. Decide visually, don't fight it.)

- [ ] **Step 3: Type-check and commit**

Run: `npx tsc --noEmit 2>&1 | grep -v -E 'src/components/(application|foundations)/' ; true`
Expected: no output.

```bash
git add src/components/sections src/data/site.ts
git commit -m "feat: hero and origin sections with scatter type, drawn annotations, timeline"
```

---

### Task 7: Sections — Craft and Toolkit

**Files:**
- Create: `src/components/sections/craft.tsx`, `src/components/sections/toolkit.tsx`

- [ ] **Step 1: sections/craft.tsx**

```tsx
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
```

- [ ] **Step 2: sections/toolkit.tsx**

```tsx
import { toolkit, contact } from "@/data/site";
import { SectionLabel } from "@/components/sections/origin";

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
```

- [ ] **Step 3: Type-check and commit**

Run: `npx tsc --noEmit 2>&1 | grep -v -E 'src/components/(application|foundations)/' ; true`
Expected: no output.

```bash
git add src/components/sections/craft.tsx src/components/sections/toolkit.tsx
git commit -m "feat: craft plates with drawn icons and toolkit spec-sheet with patent stamp"
```

---

### Task 8: Sections — Impact (pinned), Human, Connect

**Files:**
- Create: `src/components/sections/impact.tsx`, `src/components/sections/human.tsx`, `src/components/sections/connect.tsx`

- [ ] **Step 1: sections/impact.tsx** (client — pinning needs GSAP matchMedia)

```tsx
"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { stories } from "@/data/site";
import { Scramble } from "@/components/motion/scramble";

export function Impact() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".impact-panel");
        panels.forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            end: i === panels.length - 1 ? "bottom top" : "bottom 40%",
            pin: i !== panels.length - 1,
            pinSpacing: false,
          });
        });
      });
    },
    { scope }
  );

  return (
    <section id="impact" ref={scope} className="relative">
      <div className="mx-auto max-w-6xl px-5 pt-24 md:pt-36">
        <p className="mb-10 font-mono text-[11px] tracking-[0.25em] text-accent" data-reveal="rise">
          SEC.04 — THE IMPACT
        </p>
        <h2 className="text-3xl font-medium tracking-tight md:text-5xl" data-reveal="rise">
          Three transformations
        </h2>
        <p className="mt-4 max-w-xl text-lg text-graphite" data-reveal="rise">
          Every project is a story of before and after. Here are three that shaped how I think about product.
        </p>
      </div>

      {stories.map((story) => (
        <article key={story.chapter} className="impact-panel relative flex min-h-screen items-center border-t border-grid bg-paper">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] text-accent">
                CH.{story.chapter} — {story.year}
              </p>
              <h3 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">{story.title}</h3>
              <p className="mt-2 font-mono text-xs tracking-[0.15em] uppercase text-graphite">{story.subtitle}</p>
              <p className="mt-8 text-xl font-light italic leading-relaxed text-ink md:text-2xl">{story.hook}</p>
              <p className="mt-6 leading-relaxed text-graphite">{story.narrative}</p>
              <p className="mt-8 inline-flex items-center gap-3 font-mono text-xs tracking-[0.15em] text-accent">
                BEFORE <span aria-hidden>→</span> AFTER : {story.transformation.toUpperCase()}
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[clamp(4rem,10vw,8rem)] font-medium leading-none tracking-tight">
                <Scramble text={story.metric} />
              </p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.25em] uppercase text-graphite">{story.metricLabel}</p>
              <table className="mt-10 w-full max-w-sm border-collapse">
                <caption className="sr-only">Key results</caption>
                <tbody>
                  {story.stats.map((s) => (
                    <tr key={s.label} className="border-t border-grid last:border-b">
                      <th scope="row" className="py-3 pr-4 text-left font-mono text-[10px] font-normal tracking-[0.2em] uppercase text-graphite">
                        {s.label}
                      </th>
                      <td className="py-3 text-right font-mono text-sm text-ink">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
```

- [ ] **Step 2: sections/human.tsx**

```tsx
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
```

- [ ] **Step 3: sections/connect.tsx**

```tsx
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
          className="rounded-sm bg-accent px-8 py-4 font-mono text-xs tracking-[0.2em] text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
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
```

- [ ] **Step 4: Type-check and commit**

Run: `npx tsc --noEmit 2>&1 | grep -v -E 'src/components/(application|foundations)/' ; true`
Expected: no output.

```bash
git add src/components/sections
git commit -m "feat: impact pinned chapters, darkroom human section, connect CTA"
```

---

### Task 9: The swap — new page.tsx and layout.tsx

**Files:**
- Modify: `src/app/page.tsx` (full replacement), `src/app/layout.tsx` (full replacement)

- [ ] **Step 1: Replace src/app/page.tsx**

```tsx
import { MotionRoot } from "@/components/motion/motion-root";
import { GridLayer } from "@/components/ui/grid-layer";
import { SiteNav } from "@/components/ui/site-nav";
import { SiteFooter } from "@/components/ui/site-footer";
import { Hero } from "@/components/sections/hero";
import { Origin } from "@/components/sections/origin";
import { Craft } from "@/components/sections/craft";
import { Toolkit } from "@/components/sections/toolkit";
import { Impact } from "@/components/sections/impact";
import { Human } from "@/components/sections/human";
import { Connect } from "@/components/sections/connect";

export default function Home() {
  return (
    <MotionRoot>
      <GridLayer />
      <SiteNav />
      <main className="relative z-10">
        <Hero />
        <Origin />
        <Craft />
        <Toolkit />
        <Impact />
        <Human />
        <Connect />
      </main>
      <SiteFooter />
    </MotionRoot>
  );
}
```

- [ ] **Step 2: Replace src/app/layout.tsx**

```tsx
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { Theme } from "@/providers/theme";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getSiteUrl } from "@/lib/site-url";
import { cx } from "@/utils/cx";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

const siteUrl = getSiteUrl();
const description =
  "CSPO® Product Manager with 6+ years building enterprise AI/ML products. Led GenAI NLP features for 50+ enterprises, delivered $20M+ ARR, and improved time-to-insight by 60%.";

export const metadata: Metadata = {
  title: {
    default: "Jai M Sanghavi — Product Manager · AI/ML & Enterprise SaaS",
    template: "%s — Jai M Sanghavi",
  },
  description,
  applicationName: "Jai M Sanghavi Portfolio",
  authors: [{ name: "Jai M Sanghavi" }],
  creator: "Jai M Sanghavi",
  category: "technology",
  keywords: ["Jai M Sanghavi", "Product Manager", "CSPO", "AI", "GenAI", "Enterprise SaaS", "Portfolio"],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Jai M Sanghavi — Product Manager · AI/ML & Enterprise SaaS",
    description,
    siteName: "Jai M Sanghavi Portfolio",
    images: [{ url: "/Jai_Profile.jpeg", alt: "Jai M Sanghavi", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jai M Sanghavi — Product Manager · AI/ML & Enterprise SaaS",
    description,
    images: ["/Jai_Profile.jpeg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#C0301E",
  colorScheme: "light dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jai M Sanghavi",
  jobTitle: "Product Manager",
  url: `${siteUrl}/`,
  image: `${siteUrl}/Jai_Profile.jpeg`,
  sameAs: ["https://www.linkedin.com/in/jaimsanghavi"],
  worksFor: { "@type": "Organization", name: "Deloitte Studios (USI)" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Reva University" },
  description,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: `${siteUrl}/`,
  name: "Jai M Sanghavi Portfolio",
  description: "Product Manager portfolio for Jai M Sanghavi: AI/ML, SaaS, case studies, and outcomes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className={cx(grotesk.variable, plexMono.variable, "antialiased")}>
        <Theme>{children}</Theme>
        <SpeedInsights />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify in browser**

Run: `npm run build` → success. Then `npm run dev` and check `http://localhost:3000`:
- Hero: scattered "chaos" snaps straight; red ellipse draws around portrait; stats count up.
- Scroll: origin underlines/timeline draw; craft plates snap in; impact chapters pin and stack (desktop width); human section flips to darkroom; footer correct.
- Toggle: `○ PAPER` ↔ `● BLUEPRINT` flips the whole palette.
- Mobile width (390px): nav menu opens/closes; no pinning jank; no horizontal scroll.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: swap in Clarity Grid home page and new root layout"
```

---

### Task 10: Photography page rebuild

**Files:**
- Create: `src/components/ui/lightbox.tsx`
- Modify: `src/app/photography/page.tsx` (full replacement), `src/app/photography/layout.tsx`

- [ ] **Step 1: ui/lightbox.tsx**

```tsx
"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { Photo } from "@/data/photos";

interface LightboxProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];

  const prev = useCallback(() => onNavigate((index - 1 + photos.length) % photos.length), [index, photos.length, onNavigate]);
  const next = useCallback(() => onNavigate((index + 1) % photos.length), [index, photos.length, onNavigate]);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      <div className="relative max-h-[88vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <Image
          src={photo.src}
          alt="Photography by Jai M Sanghavi"
          width={photo.width}
          height={photo.height}
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          className="max-h-[82vh] w-auto rounded-sm object-contain"
          priority
        />
        <p className="mt-3 text-center font-mono text-[11px] tracking-[0.25em] text-white/70">
          FRM {String(index + 1).padStart(3, "0")} / {String(photos.length).padStart(3, "0")}
        </p>
      </div>

      <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="absolute right-5 top-5 p-2 font-mono text-sm tracking-[0.2em] text-white/80 hover:text-white">
        ESC ✕
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-2xl text-white/70 hover:text-white">
        ←
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-2xl text-white/70 hover:text-white">
        →
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Replace src/app/photography/page.tsx**

```tsx
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

        <div className="columns-2 gap-3 md:columns-3 md:gap-4 [column-fill:_balance]">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setSelected(i)}
              className="group relative mb-3 block w-full overflow-hidden rounded-sm md:mb-4"
              aria-label={`Open photo ${i + 1}`}
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
```

- [ ] **Step 3: Update src/app/photography/layout.tsx** (replace contents; metadata only)

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photography",
  description: "Photography by Jai M Sanghavi — moments captured beyond product management.",
};

export default function PhotographyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 4: Verify in browser**

`npm run dev` → `http://localhost:3000/photography`: masonry with true aspect ratios, blur-up placeholders, hover frame numbers; click opens lightbox; Esc/←/→ work; counter shows `FRM 001 / 054`; close restores scroll.

- [ ] **Step 5: Commit**

```bash
git add src/app/photography src/components/ui/lightbox.tsx
git commit -m "feat: darkroom photography page with masonry contact sheet and keyboard lightbox"
```

---

### Task 11: Delete the dead UI kit, prune dependencies, re-enable type checking

**Files:**
- Delete: `src/components/{application,base,foundations,marketing,shared-assets,navigation,animations}`, `src/components/{card.tsx,index.ts,theme-toggle.tsx}`, `src/providers/router-provider.tsx`, `src/utils/is-react-component.ts`, `src/hooks/`, `src/styles/`
- Modify: `package.json`, `next.config.ts`

- [ ] **Step 1: Confirm nothing live imports the kit**

Run: `grep -rE "from ['\"]@/(components/(application|base|foundations|marketing|shared-assets|navigation|animations)|components['\"]|providers/router-provider|hooks/|styles/)" src/app src/components/sections src/components/ui src/components/motion src/data src/lib src/providers`
Expected: no output. (If anything matches, fix that import first — do not delete blind.)

- [ ] **Step 2: Delete**

```bash
git rm -r src/components/application src/components/base src/components/foundations \
  src/components/marketing src/components/shared-assets src/components/navigation \
  src/components/animations src/components/card.tsx src/components/index.ts \
  src/components/theme-toggle.tsx src/providers/router-provider.tsx \
  src/utils/is-react-component.ts src/hooks src/styles
```

- [ ] **Step 3: Prune dependencies**

```bash
npm uninstall @heroicons/react @untitledui/icons @untitledui/file-icons react-aria \
  react-aria-components react-hotkeys-hook tailwindcss-react-aria-components \
  tailwindcss-animate motion @tailwindcss/typography
```

- [ ] **Step 4: Re-enable type checking + drop dead config**

Replace `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

(The `optimizePackageImports: ["@untitledui/icons"]` entry dies with the dependency.)

- [ ] **Step 5: Full type-check, lint, build**

Run: `npx tsc --noEmit`
Expected: **no output at all** — the 4 legacy errors are gone with the kit.
Run: `npm run lint` → no errors.
Run: `npm run build` → success WITH type checking enabled.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove unused UI kit and deps, re-enable TypeScript build errors"
```

---

### Task 12: Docs & SEO finalization

**Files:**
- Modify: `README.md`, `DESIGN.md`
- Delete: `PROJECT_SUMMARY.md` (stale; superseded by spec + README)

- [ ] **Step 1: Replace DESIGN.md** with the Clarity Grid system summary

```markdown
# Design System — The Clarity Grid

The site performs its own tagline: every section enters slightly disordered and
snaps into precise order. Full spec: `docs/superpowers/specs/2026-06-10-portfolio-redesign-design.md`.

## Themes
- **Paper (light, default):** warm off-white `#FAF8F2`, ink `#14120F`
- **Blueprint (dark):** navy `#0F1B2D`, chalk `#EAF0F8`
- Darkroom sections (Human, /photography) are near-black `#101010` in both themes.

## Accents (strict roles)
- Swiss red `#C0301E` (light) / `#FF6A50` (dark): emphasis, CTAs, interactive states
- Drafting blue `#2B5BAD` (light) / `#7FA8E0` (dark): drawn/sketched SVG lines and annotations only

## Type
- Space Grotesk — display + body (`--font-grotesk`)
- IBM Plex Mono — labels, dates, marginalia (`--font-plex-mono`)

## Motion rules
- GSAP via `MotionRoot` and `data-reveal` attributes (`rise`, `snap`, `draw`)
- `prefers-reduced-motion`: everything reveals instantly, no pinning
- Content is never hidden without JS (`html.js` gate in globals.css)

## Tokens
Defined in `src/app/globals.css` under `@theme`; dark overrides under `.dark`.
```

- [ ] **Step 2: Rewrite README.md**

```markdown
# Jai M Sanghavi — Portfolio

Personal portfolio: product management work, AI/ML impact stories, and photography.

**[Live site →](https://jaimsanghavi-portfolio.vercel.app/)**

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (custom "Clarity Grid" design system — see `DESIGN.md`)
- GSAP + ScrollTrigger for motion
- next-themes (paper / blueprint themes)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (type-checked)
npm run lint
```

## Photos

Gallery images live in `public/photography/` as WebP with a generated manifest
(`src/data/photos.ts`). To add photos, drop originals in the folder and run:

```bash
node scripts/process-photos.mjs
```

(Requires macOS `sips` for HEIC input.)

## Contact

**Jai M Sanghavi** — [LinkedIn](https://www.linkedin.com/in/jaimsanghavi) · [Email](mailto:jaimsanghavi@gmail.com)
```

- [ ] **Step 3: Remove stale summary**

```bash
git rm PROJECT_SUMMARY.md
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "docs: Clarity Grid design doc, refreshed README, drop stale project summary"
```

---

### Task 13: Full verification pass (spec §9)

**Files:** none (fix-ups only if checks fail)

- [ ] **Step 1: Clean build gates**

```bash
npm run build && npx tsc --noEmit && npm run lint
```
Expected: all pass, zero errors.

- [ ] **Step 2: Asset + route checks**

```bash
grep -ri "\.heic" src public --include="*" -l        # expected: no output
ls public/photography | wc -l                         # expected: 54
du -sh public/photography                             # expected: <= 6M (stored sources; served payload is optimizer-resized)
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/showcase   # expected: 404
curl -s http://localhost:3000/sitemap.xml | grep -c "<loc>"               # expected: 2
```

- [ ] **Step 3: Visual matrix** (dev server + browser MCP)

Screenshot and review: 1440 / 768 / 390 widths × paper / blueprint themes × home (all sections) + photography. Check: no horizontal overflow, contrast holds, pinning only ≥768px, darkroom sections consistent in both themes.

- [ ] **Step 4: Degradation checks**

- Emulate `prefers-reduced-motion: reduce` → all content visible immediately, no pin, no scatter.
- Disable JavaScript → all content visible (no opacity-0 holes), scattered letters render straight.

- [ ] **Step 5: Lighthouse**

Run Lighthouse (navigation, desktop) on `/` and `/photography`.
Expected: Accessibility 100, SEO 100, Best Practices 100. Fix and re-run if short.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: verification fixes from final QA pass"   # only if fixes were needed
```

---

## Self-review notes

- **Spec coverage:** §3 tokens→Task 3; §4 sections→Tasks 6–9; §5 gallery→Task 10; §6 pipeline→Task 2; §7 motion→Tasks 4, 8; §8 cleanup/config→Tasks 1, 11, 12; §9 verification→Task 13. Open item (custom domain) intentionally unplanned.
- **Type consistency:** `Photo` interface (Task 2) matches Lightbox/Human/Photography props; `heroStats` optional-`prefix` note in Task 6; `SectionLabel` exported from origin.tsx and imported by craft/toolkit.
- **Order-sensitive constraints:** Task 2 patches the old gallery so the site never breaks mid-branch; theme-class change (Task 5) degrades old page's dark mode until Task 9 — accepted; `ignoreBuildErrors` survives until the kit dies in Task 11.
