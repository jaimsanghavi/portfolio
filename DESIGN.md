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
