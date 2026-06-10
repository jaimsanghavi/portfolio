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

New photos are converted to WebP, numbered after the existing set, and prepended
to the manifest (the script never touches already-processed `photo-NN.webp` files).
Requires macOS `sips` for HEIC input.

## Contact

**Jai M Sanghavi** — [LinkedIn](https://www.linkedin.com/in/jaimsanghavi) · [Email](mailto:jaimsanghavi@gmail.com)
