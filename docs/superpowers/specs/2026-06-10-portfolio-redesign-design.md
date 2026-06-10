# Portfolio Redesign — "The Clarity Grid"

**Date:** 2026-06-10
**Status:** Approved by Jai (direction: Chaos→Clarity concept × Swiss kinetic execution × sketchbook accents)
**Scope:** Single-page portfolio + photography page. No case-study sub-pages in this phase.

## 1. Goals

1. Replace the current six-accent, gradient-heavy visual system with a distinctive, deliberate design that performs the tagline "I turn chaos into clarity."
2. Fix the image pipeline: no HEIC in the browser, Next.js image optimization enabled, fast gallery loads.
3. Fix code health: remove dead UI kit, re-enable type checking, remove committed archives, split the monolithic page, fix SEO/verification bugs, reach Lighthouse accessibility 100.

**Non-goals:** case-study pages, CMS/content management, blog, custom domain DNS setup (tracked separately — structured data will point at the live Vercel URL via env var), changes to resume PDF content.

## 2. Design concept

The site performs the tagline. Every section enters slightly disordered — tilted glyphs, drifting ticks, offset cards — and snaps into precise order as it scrolls into view. Three ingredients:

- **Swiss kinetic (base system):** exposed hairline grid, poster typography, giant numerals. Jai's metrics are the hero imagery.
- **Chaos→clarity (motion concept):** scatter-to-order is the signature move, used at the hero and echoed in section entrances.
- **Architect's sketchbook (craft accent):** self-drawing SVG lines (stroke-dashoffset), red-pencil underlines, blueprint boxes, mono marginalia ("fig. 1.2", "SEC.03").

## 3. Visual system

### 3.1 Color tokens (Tailwind v4 `@theme`)

Light theme — "Paper":

| Token | Value | Role |
|---|---|---|
| `--color-paper` | `#FAF8F2` | page background (warm off-white) |
| `--color-ink` | `#14120F` | primary text |
| `--color-graphite` | `#5C574D` | secondary text (≥7:1 on paper) |
| `--color-accent` | `#C0301E` | Swiss red — emphasis, CTAs, interactive states only |
| `--color-draft` | `#2B5BAD` | drafting blue — reserved for drawn/sketched SVG lines + annotations |
| `--color-grid` | `#E7E3D8` | exposed grid hairlines |
| `--color-plate` | `#FFFFFF` | card/plate surfaces |

Dark theme — "Blueprint" (toggle is thematic: paper by day, blueprint by night):

| Token | Value | Role |
|---|---|---|
| `--color-paper` | `#0F1B2D` | deep blueprint navy |
| `--color-ink` | `#EAF0F8` | chalk-white text |
| `--color-graphite` | `#9DB0C8` | secondary text |
| `--color-accent` | `#FF6A50` | warmer red (contrast-safe on navy) |
| `--color-draft` | `#7FA8E0` | chalk-blue drawn lines |
| `--color-grid` | `#1C2C44` | grid hairlines |
| `--color-plate` | `#15233A` | card/plate surfaces |

Exactly two accents, strict roles. No gradients anywhere. All text/background pairs must pass WCAG AA (4.5:1); body text targets AAA where practical.

The **Human section and photography page are dark (darkroom) in both themes** — near-black `#101010`, not the blueprint navy.

### 3.2 Typography

- **Space Grotesk** (Google Fonts, variable): display + body. Display sizes use weight 500–700, tight tracking (−0.02em). Hero headline `clamp(2.5rem, 8vw, 6rem)`.
- **IBM Plex Mono**: labels, dates, stats tables, marginalia, nav. Letter-spaced uppercase for section labels.
- These replace Outfit, Plus Jakarta Sans, and Inter (3 fonts → 2).
- Tabular numerals (`font-variant-numeric: tabular-nums`) for all count-up metrics.

### 3.3 Layout

- Exposed grid: faint vertical column rules + horizontal baseline rules rendered as a fixed-position SVG/CSS layer; content snaps to it.
- Section numbering in margins: `SEC.01 — THE ORIGIN` in mono.
- Max content width 1200px; 4-column feel on desktop, single column mobile (grid lines reduce to 2 on mobile).

## 4. Page structure (`/`)

Order and content preserved from the current site; presentation recomposed.

1. **Hero — "The Assembly."** Full viewport. Mono poster credits in corners (name / role / theme toggle). Headline "I turn chaos into clarity." — the word *chaos* renders with per-letter scatter (random rotate/offset) and snaps into place ~0.8s after load; *clarity* gets a red underline that draws in. Sub-line in mono. Three giant stats (6+ / 4M+ / $20M+) with count-up on load. Small circular portrait with a hand-drawn red ellipse annotation (SVG, draws on load). Red dashed plumb line draws downward as scroll cue, labeled `SEC.01`.
2. **SEC.01 The Origin.** Three existing paragraphs, key phrases get red-pencil underlines drawing on scroll. Career timeline: vertical drafting line draws itself; each company (Deloitte, Edgeverve, TCS) is a blueprint-stroked box that sketches in, with mono dates and a one-line summary. Marginalia: `fig. 1.1` etc.
3. **SEC.02 The Craft.** Four plates on the grid (existing four craft areas). Each: mono index (`C.01`), title, description, skills as mono bracket tags `[BRD] [UAT]`. Line-drawn SVG icons (custom, stroke-based) that draw on first viewport entry. Entrance: plates arrive 8px offset with 1° tilt, snap straight.
4. **SEC.03 The Toolkit.** One spec-sheet table (not six colored cards): category rows in mono, tools as ink chips. Credentials row (CSPO, B.Tech) and the patent as a sketched stamp/seal with red circle annotation linking to the PDF.
5. **SEC.04 The Impact.** Showpiece. Three pinned full-screen chapters (GSAP ScrollTrigger pin). Each: oversized chapter numeral, story title, hook line, the headline metric rendered huge with scramble→resolve count-up, narrative column, stats as a ruled mono table, "transformation" callout with red arrow `BEFORE → AFTER`. Pinning desktop-only; mobile gets standard stacked sections with entrance animations.
6. **SEC.05 The Human.** Background flips to darkroom black (both themes). Copy: photography as the off-hours craft. Filmstrip of 4–5 real photos with slow parallax drift; CTA to `/photography`. Instagram handle in mono.
7. **SEC.06 Connect.** Giant "Let's build clarity." headline, red primary CTA (mailto), secondary LinkedIn, tertiary resume download. Footer: poster credits in mono (fonts, stack, ©year), social icons, photography link.

## 5. Photography page (`/photography`)

- Darkroom theme (near-black) regardless of toggle; header consistent with main site (back link, title, Instagram link).
- Contact-sheet masonry grid using CSS columns, **true aspect ratios** (no square crops). Mono frame number `FRM 014` on hover.
- Lightbox: keyboard navigation (Esc / ← / →), image counter, focus-trapped, restores focus on close.
- All images WebP, lazy-loaded with blur placeholders, served through Next/Image.

## 6. Image pipeline

- One-off script `scripts/process-photos.mjs`: converts all 27 HEIC + oversized JPG/WebP in `public/photography/` to WebP (max edge 1600px, quality ~80), renames to `photo-NN.webp`, emits `src/data/photos.ts` manifest with `{src, width, height, blurDataURL}`.
- HEIC decoding via `sips` (macOS) or `heic-convert` npm package — script must run on this Mac.
- Delete original HEIC/oversized files from `public/photography/` after conversion (git history preserves them).
- Remove `images: { unoptimized: true }` from `next.config.ts` (site deploys to Vercel; optimization is free).
- Profile photo and any hero imagery also get explicit dimensions + priority loading.
- Expected result: stored gallery sources ≤ 6MB (AMENDED during execution — grainy sources don't compress smaller above quality 64; final: 1400px / q75 WebP), browser payload far below that via Next/Image optimizer variants, no format-support risk in any browser.

## 7. Animation plan

All GSAP (`gsap` + `ScrollTrigger` + `useGSAP`, already dependencies). Global rules:

- `prefers-reduced-motion: reduce` → all animations replaced by instant reveals (gsap.set), pinning disabled.
- **No content hidden by default CSS.** Animations are progressive enhancement: a `js`-gated class pattern (set on `<html>` by a tiny inline script) means content is fully visible when JS is absent/slow. No more `.gsap-hidden { opacity: 0 }` on server-rendered HTML.
- Durations 0.4–0.9s, `power2.out` / `expo.out`; nothing loops except the hero's idle particle drift (subtle, pausable).

Inventory:

| Animation | Where | Technique |
|---|---|---|
| Letter scatter → snap | hero "chaos" | per-letter spans, GSAP from random rotate/offset |
| Underline draw | hero "clarity", origin paragraphs | SVG path stroke-dashoffset |
| Count-up numerals | hero stats, impact metrics | GSAP textContent tween + tabular-nums |
| Scramble → resolve | impact headline metrics | custom rAF scramble (no plugin dependency) |
| Drafting line + box sketch | timeline, craft icons, patent stamp | stroke-dashoffset, staggered |
| Grid-snap entrance | plates, table rows | from y+8px / rotate 1° to identity, batch stagger |
| Pinned chapters | impact (desktop) | ScrollTrigger pin + timeline scrub |
| Darkroom flip | human section | background-color tween on scroll enter |
| Filmstrip parallax | human section | scrub tween on x |

## 8. Architecture & code health

### 8.1 New structure

```
src/
  app/
    layout.tsx            # fonts (Space Grotesk, Plex Mono), metadata, JSON-LD
    page.tsx              # server component composing sections
    photography/page.tsx  # gallery (client only for lightbox)
    globals.css           # tokens via @theme, grid layer, base styles
  components/
    sections/             # hero, origin, craft, toolkit, impact, human, connect (server where possible)
    motion/               # client: AnimationRoot (useGSAP scope), CountUp, ScrambleNumber, DrawPath helpers
    ui/                   # theme-toggle, nav, footer, lightbox
  data/
    site.ts               # nav, stories, craft, toolkit, stats (extracted from page.tsx)
    photos.ts             # generated manifest
  lib/gsap.ts             # (kept)
scripts/process-photos.mjs
```

### 8.2 Deletions

- `src/app/showcase/` (UI-kit demo page) and its sitemap entry.
- All unused Untitled UI component trees under `src/components/{application,base,foundations,marketing,shared-assets}` and `src/components/navigation` — the new design uses none of them. Keep `@untitledui/icons` only if the new UI actually uses any icon from it; otherwise drop the dependency. Audit `package.json` for now-unused deps (`@heroicons/react`, `@untitledui/*`, `react-aria*`, `tailwindcss-react-aria-components`, `react-hotkeys-hook`, `motion` if GSAP covers everything).
- `portfolio-build.tar.gz`, `portfolio-upload.zip` (22MB) — delete + `.gitignore` entries.
- Stale docs: replace `DESIGN.md` content with the Clarity Grid system; mark or remove outdated `PROJECT_SUMMARY.md` claims.

### 8.3 Config & metadata fixes

- `next.config.ts`: remove `typescript.ignoreBuildErrors` (errors live in deleted files) and `images.unoptimized`.
- `layout.tsx`: delete the malformed `google-site-verification` meta tag (file-based verification in `public/` stays); JSON-LD `url`/`image` derive from `NEXT_PUBLIC_SITE_URL`/`VERCEL_URL` instead of hardcoded dead domain; remove duplicate keywords meta.
- `sitemap.ts`: routes = `/` and `/photography` only.
- README: correct stack description, live URL, remove boilerplate.

### 8.4 Accessibility

- `<main>` landmark; skip link; semantic headings (single h1).
- All text/background pairs AA minimum (the current slate-500-on-stone failures are eliminated by the token palette).
- Lightbox focus management; visible focus styles in red accent.
- Target: Lighthouse accessibility 100 on both pages.

## 9. Verification

1. `npm run build` passes with type checking enabled; `npx tsc --noEmit` clean; ESLint clean.
2. No `.heic` references anywhere; gallery total payload < 3MB; all images render in a clean Chromium profile.
3. Screenshots at 390px / 768px / 1440px, light + dark, all sections — reviewed against this spec.
4. Lighthouse: accessibility 100, SEO 100, best practices 100.
5. Reduced-motion emulation: all content visible, no pinning.
6. JS disabled: all content visible (no opacity-0 holes).
7. `/showcase` returns 404; sitemap contains exactly 2 routes.

## 10. Open items (not blocking)

- Custom domain `jaimsanghavi.com` has no DNS records. When Jai connects it in Vercel, set `NEXT_PUBLIC_SITE_URL` accordingly; until then the Vercel URL is canonical.
