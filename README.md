# Jassim M Kabir — Portfolio

A funky, premium, motion-driven developer portfolio built with **Next.js 16 (App Router)**,
**TypeScript**, **Tailwind CSS v4**, **Lenis** smooth scroll and **GSAP** scroll animations.

## ✏️ Edit everything in one place

All text, links, projects, stats, SEO and labels live in a single file:

```
src/content/site.ts
```

Change a value there and the whole site updates. Inline accent tags you can use inside
titles and statements:

| Tag | Effect |
| --- | --- |
| `<em>word</em>` | serif italic accent |
| `<i>word</i>` | lime colour |
| `<strong>word</strong>` | emphasised cream (about paragraphs) |

To recolour the whole theme, edit the palette variables at the top of `src/app/globals.css`
(`--lime`, `--coral`, `--lilac`, `--ink`, etc.).

## Develop

```bash
npm run dev      # start dev server  → http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## SEO

- Full metadata, Open Graph + Twitter cards in `src/app/layout.tsx` (driven by `site.ts`).
- `Person` JSON-LD structured data injected in the layout.
- Dynamically generated social share image at `src/app/opengraph-image.tsx`.
- `robots.txt` and `sitemap.xml` generated from `src/app/robots.ts` / `sitemap.ts`.

> Before deploying, set your real domain and social handle in `seo` inside
> `src/content/site.ts` (`url`, `twitterHandle`).

## Structure

```
src/
  app/
    layout.tsx          fonts + SEO metadata + JSON-LD
    page.tsx            page assembly
    globals.css         design system (ported 1:1, theme variables on top)
    opengraph-image.tsx dynamic OG image
    robots.ts / sitemap.ts
  components/
    Chrome.tsx          grain, custom cursor, preloader, nav
    Sections.tsx        hero, marquee, about, services, work, stats, contact, footer
    Effects.tsx         "use client" — Lenis + GSAP + cursor + magnetic + counters
  content/
    site.ts             ← EDIT EVERYTHING HERE
  lib/
    text.tsx            inline-accent + word-wrap helpers
```

Animations and the custom cursor respect `prefers-reduced-motion` and touch devices.
