# Design System Master File — DARKROOM

> **LOGIC:** When building a specific page, first check `design-system/jassim/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.
>
> **READ THIS BEFORE TOUCHING ANY COMPONENT, IN ANY SESSION.**

---

**Project:** Jassim — Waleed Jassim M K, Front-End Engineer portfolio
**Generated:** 2026-07-28 by `ui-ux-pro-max` v2.6.2, then corrected
**Design Dials:** Variance 9/10 (Bold / Asymmetric) | Motion 9/10 (Complex) | Density 4/10 (Standard)

## Provenance: what came from the generator and what replaced it

| Section | Source | Why |
|---|---|---|
| Color palette | **REPLACED** by client-supplied palette | Generator proposed `#2563EB` on `#FAFAFA` monochrome-plus-blue. Brief pins the palette and it is not negotiable. |
| Typography | **REPLACED** by brief's pairing | Generator proposed Archivo / Space Grotesk. Space Grotesk is what the site being replaced already used. |
| Style guidelines | **REPLACED** | Generator proposed Neo Brutalism (Mobile): 4px black borders, hard offset shadows with no blur, `12px` radius. Directly inverts a hairline-and-glass page and breaks the Shape Lock. It is also marked Dark ✗ while dark is our default. |
| Component specs | **REPLACED** | Generator specs used `8px`/`12px`/`16px` radii and its own accent. Breaks the Shape Lock and Color Lock. |
| Shadow depths | **REMOVED** | This page carries depth with blur and parallax, not drop shadows. |
| Page pattern | **PARTIAL** | Kept its conversion note. Dropped its masonry grid and its 4-section order. |
| Motion / Flip snippet | **KEPT** | Genuinely useful, reassigned to the Work card-to-detail morph. |
| Anti-patterns | **KEPT** and extended | Union rule: if either list bans it, it is banned. |
| Pre-delivery checklist | **KEPT** in full | Folded into §14. |

---

## Global Rules

### Color Palette — one accent hue, three values

Eleven hex literals exist in this codebase. `grep -rhoE '#[0-9a-fA-F]{3,8}' src/ | sort -u` must return exactly this set:

`#0a100d` `#141b17` `#59594e` `#7a231e` `#902923` `#a22c29` `#ac3532` `#b9baa3` `#d6d5c9` `#d9605b` `#e4e3da`

| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `--bg` | `#0A100D` | `#D6D5C9` | Page base |
| `--bg-raised` | `#141B17` | `#E4E3DA` | Section wash, one step up |
| `--pane` | `rgba(214,213,201,0.05)` | `rgba(10,16,13,0.04)` | Glass fill, bone-tinted |
| `--pane-edge` | `rgba(214,213,201,0.13)` | `rgba(10,16,13,0.12)` | 1px pane border |
| `--fg` | `#D6D5C9` | `#0A100D` | Primary text |
| `--fg-dim` | `#B9BAA3` | `#59594E` | Secondary text, mono labels |
| `--accent` | `#A22C29` | `#902923` | The only accent. Oxblood. |
| `--accent-press` | `#902923` | `#7A231E` | Pressed and active states |
| `--accent-lift` | `#D9605B` | `#A22C29` | Accent-as-text and hairlines |
| `--accent-deep` | `#AC3532` | `#902923` | **Large display text only.** 3.03:1 dark, 5.63:1 light. Sole consumer: the contact address. Never body copy. |
| `--accent-fg` | `#D6D5C9` | `#D6D5C9` | Text on accent fills |

**Measured contrast. Do not re-derive these by eye.**

| Pair | Ratio | Verdict |
|---|---|---|
| dark `--fg` on `--bg` | 13.01:1 | pass |
| dark `--fg-dim` on `--bg` | 9.71:1 | pass |
| dark `--accent` on `--bg` | **2.68:1** | **FAILS text and the 3:1 non-text floor** |
| dark `--accent-lift` on `--bg` | 5.28:1 | pass |
| dark `--accent-lift` on `--bg-raised` | 4.82:1 | pass |
| dark `--accent-fg` on `--accent` fill | 4.86:1 | pass |
| light `--fg` on `--bg` | 13.01:1 | pass |
| light `--fg-dim` on `--bg` | 4.80:1 | pass |
| light `--fg-dim` on `--bg-raised` | 5.50:1 | pass |
| light `--accent` on `--bg` | 5.63:1 | pass |
| light `--accent-press` on `--bg` | 6.81:1 | pass |

> **CORRECTION ON RECORD.** The brief proposed `#5F6154` for light `--fg-dim`. Measured, it is **4.28:1** on the bone base and fails AA for normal text. It was replaced with `#59594E` (4.80:1 base, 5.50:1 raised), the same supplied sage darkened further. Do not revert it.

**The dark-mode accent rule, non-negotiable.** `#A22C29` is a **fill** in dark mode, never text and never a lone hairline. Bone on oxblood passes at 4.86:1. Where the accent must be text or a hairline against the dark base, use `--accent-lift`. In light mode `#902923` works as text directly.

**Where the accent goes.** One rule, so placement is systematic rather than decided per component:

> **Accent marks chrome and action. It never marks content.**

| | |
|---|---|
| `--accent` as a **fill** | primary CTAs (hero, nav, resume), the marquee band, `::selection` |
| `--accent-lift` as **text or a 1px rule** | section eyebrows, scroll progress bar, focus rings, hover affordances (link underlines, pane edges, icon-button borders), disclosure open state, the Experience spine and its markers |
| `--accent-deep` as **large display text only** | the contact address, and nothing else |
| **never** | headings, body copy, figures, metrics, dates, stack tags, handles |

Data stays monochrome. The moment a number turns red the accent stops meaning "act here or look here" and becomes decoration.

**Section eyebrows.** Every section carries exactly one: a mono-caps line in `--accent-lift`, sitting **above** the heading, sourced from `EYEBROWS` in `src/content/site.ts`. They live in one object rather than beside each section's own copy, because the rule is "every section has one" and a single map is the only shape where a missing entry is visible at a glance.

Two constraints on the copy. An eyebrow never restates the heading beneath it: the eyebrow names the section, the heading makes the claim ("Capabilities" over "What I actually do"). And they are never numbered; `01 / ABOUT` stays on the ban list.

The hero is the one section without one, deliberately. An eyebrow tells you where you have arrived, which is only useful once you have scrolled. Above the `h1` it is a label on the top of the page.

**Light mode risk.** Warm bone plus clay red sits near the cream-and-terracotta generated-design default. Push contrast harder than instinct: heavier weights, tighter tracking, more `#0A100D` structure, accent sparingly and as fill. If light mode starts reading like a wellness brand, the sizing and weight are wrong, not the colors.

### Typography

`next/font/google`, all three variable, all verified present in Next 16.2.9's font data.

```ts
Bricolage_Grotesque({ subsets:['latin'], weight:'variable', axes:['opsz','wdth'], variable:'--font-display' })
Geist({ subsets:['latin'], weight:'variable', variable:'--font-body' })
Geist_Mono({ subsets:['latin'], weight:'variable', variable:'--font-mono' })
```

`wght` is included by default and must **not** be listed in `axes` or the build fails. Bricolage exposes `opsz 12-96`, `wdth 75-100`, `wght 200-800`.

| Token | Size | Face |
|---|---|---|
| `display-xl` | `clamp(3.25rem, 9vw, 8.5rem)` | Bricolage 700, `wdth` 78, tracking `-0.04em` |
| `display-lg` | `clamp(2.25rem, 5.5vw, 4.5rem)` | Bricolage 600, tracking `-0.03em` |
| `heading` | `clamp(1.4rem, 2.4vw, 2.25rem)` | Bricolage 500 |
| `body-lg` | `clamp(1.05rem, 1.25vw, 1.3rem)` | Geist 400, leading 1.55 |
| `body` | `1rem` | Geist 400, leading 1.6 |
| `label` | `0.72rem` | Geist Mono 500, tracking `0.14em`, uppercase |

**Mono is for real data only** — stack tags, dates, metrics. Mono as texture is slop.

**The width axis is an animation target,** not a static setting. Animate Bricolage `wdth` on the hero headline as it enters and on section headings at low amplitude. This is the cheapest source of funk on the page.

### Space

8px scale. Section rhythm `clamp(7rem, 13vh, 11rem)`. Container `1440px`. Gutters `clamp(1.25rem, 5vw, 5rem)`.

### Shape Consistency Lock

`border-radius: 20px` on every pane, card, image, input, and button. Nothing on this page is square-cornered.

**Two documented pill exceptions, and only two:** the availability chip, and the round icon buttons (`icon-round`: theme toggle, social links, and the Contact resume pill). The second was added at the client's request. Do not extend the pill radius to anything else.

### Blur — exactly three values

| Tier | Desktop | Mobile | Where |
|---|---|---|---|
| Veil | `12px` | `12px` | Nav bar, small UI |
| Pane | `22px` | `16px` | Standard content panes, rear hero layers |
| Deep | `36px` | `22px` | Front hero panes, detail view scrim |

No other blur value exists in the codebase. `grep 'blur('` to verify. **Every blurred surface must have something visible behind it** — blur over flat color is cost with no payoff, use a solid `--bg-raised` fill instead. Blur transitions are entrance-only (`20px` to `0`), never scrubbed on scroll, never more than three at once.

**Ceiling: six concurrent `backdrop-filter` elements per viewport.** Panes outside the viewport get the filter removed entirely, not reduced. Hero budget as built: nav veil, 2 rear panes, 2 front panes = 5, one unit of headroom. The availability chip is a solid fill, not a veil.

### Grain

One fixed document-level layer at `z-index: 9999`, above the panes so blurred surfaces carry texture instead of reading as plastic. Never per-section, never per-pane. `baseFrequency` 0.75-0.9. Opacity 0.04-0.06 dark, 0.03-0.045 light. Rasterize once, translate that element; never re-run `feTurbulence` per frame. Stepped between 6-8 offsets at ~8fps via `steps()` — smoothly moving grain reads as a dirty screen, stepped reads as film. Off entirely under reduced motion.

> **Known hazard, specific to this repo.** Commit `dde66e5` ("updated scroll lag issue") removed `mix-blend-mode` from the grain with the note that blending a fixed full-screen element forces a whole-screen re-composite every scroll frame. The blend is correct for the look; isolate the grain on its own compositor layer so it composites once. If jank returns, report it rather than silently reverting.

---

## Component Specs

All radii `20px`. All hover transitions 150-300ms. All interactive elements need `cursor: pointer` and a visible `:focus-visible` ring in `--accent-lift`.

```css
/* Primary CTA — accent as FILL, which is the only AA-passing use in dark */
.btn-primary {
  background: var(--accent);
  color: var(--accent-fg);
  padding: 14px 28px;
  border-radius: var(--radius);
  font-weight: 600;
  transition: background 200ms var(--ease-snap), transform 200ms var(--ease-snap);
  cursor: pointer;
}
.btn-primary:hover  { background: var(--accent-press); }
.btn-primary:active { transform: translateY(1px); }

/* Glass pane — the page's primary surface */
.pane {
  background: var(--pane);
  border: 1px solid var(--pane-edge);
  border-radius: var(--radius);
  backdrop-filter: blur(var(--blur-pane));
  transition: border-color 220ms var(--ease-snap);
}
.pane:hover { border-color: var(--accent-lift); }   /* the "edge sheen" */
/* suspend pane hover transitions during fast scroll */
:root.lenis-scrolling .pane { transition: none; }

/* Availability chip — the ONLY pill radius on the page, and the ONLY status dot */
.chip {
  background: var(--bg-raised);   /* solid, not blurred: nothing behind it */
  border: 1px solid var(--pane-edge);
  border-radius: var(--radius-pill);
}

:focus-visible { outline: 2px solid var(--accent-lift); outline-offset: 3px; }
```

---

## Style Guidelines

**Style: layered glass over a warm darkroom base.** Deep green-black, bone paper, oxblood. Photographic and material, not thematic — no safelight bulbs, no film-strip borders, no developing-tray metaphors.

**Technique taken from `Dimensional Layering`,** minus its shadow scale: varied per-layer z-index, deliberate overlap, `backdrop-filter` as the hierarchy signal rather than borders.

**The premium/funky split.** Structure is premium, behavior is funky. Premium lives in everything still: generous space, strict grid broken only on purpose, one accent hue, long slow easing, tight tracking, hairlines not borders. Funky lives in everything that moves: variable-width type breathing on scroll, panes skewing with velocity, a cursor that pulls, a marquee that reverses, counters that overshoot, layout reflowing under Flip.

**The test.** Pause mid-scroll and screenshot. Does the frame look expensive and calm? Now scroll. Does it feel alive and slightly mischievous? Both must be yes. Busy still frame means clutter, not funk. Uniformly smooth motion means corporate, not premium. Where they collide: premium wins on type and space, funky wins on timing and interaction.

### Page Pattern

- **Conversion Strategy:** Visuals first. Fast loading essential. *(kept from generator)*
- **CTA Placement:** Hero primary CTA + oversized mailto at Contact
- **Section Order:** Hero, Marquee, About, Proof, Capabilities, Work, Experience, Numbers, Contact, Footer

Ten sections, ten distinct spatial ideas. If two are "centered heading, then a grid", one is wrong. **Section numbers are never printed on the page.**

### Anchor slugs — preserved, do not rename

`#home` `#marquee` `#about` `#terminal` `#services` `#work` `#experience` `#stats` `#contact` `#socials`

Two are semantically stale and stay anyway: `#terminal` now holds **Proof**, `#services` now holds **Capabilities**. Anchors are bookmarkable, labels are not. The nav label for `#services` reads "Capabilities" — a deliberate, recorded override of the §11 label rule, because "Services" misdescribes an engineer's capability evidence as freelance work.

---

## Motion

Lenis owns scroll. ScrollTrigger reads from it. **Do not use ScrollSmoother** — it and Lenis both hijack scroll and will fight.

```js
CustomEase.create("glass", "0.16, 1, 0.3, 1");   // reveals and settles
CustomEase.create("snap",  "0.65, 0, 0.35, 1");  // UI state changes
const DUR = { fast: 0.4, base: 0.8, slow: 1.4, drift: 2.2 };
```

The 150-300ms band from the generator's checklist governs **hover and UI state changes** (`snap`, `DUR.fast`). It does **not** govern scroll-scrubbed reveals or ambient drift, which are a different class of motion. Keep hover in the band, keep reveals on `glass`.

### Plugin assignments — every one has a job, none unused

| Plugin | Job |
|---|---|
| ScrollTrigger | All scroll-driven moments: parallax, pins, batched reveals, velocity |
| SplitText | Every display heading. Lines with masking everywhere, chars in hero only |
| CustomEase | The two project eases. Only `sine.inOut` for idle drift escapes them |
| Flip | Work card to detail morph; layout settle on theme toggle |
| Observer | Cursor magnetism; unified wheel/touch/pointer on the Work track |
| Draggable + InertiaPlugin | Drag-to-pan the Work track, inertia hands back to ScrollTrigger |
| DrawSVGPlugin | The Experience connector line |
| MotionPathPlugin | Hero pane drift on shallow curves — curved drift is what makes floating read as floating |
| CustomWiggle | The single overshoot on Numbers counters. Nothing else wiggles |
| ScrambleTextPlugin | Stack tags on hover only. Not a fake terminal |
| GSDevTools | Dev only. Strip from the production bundle |

GSAP has been fully free since April 2025, every former Club plugin included, from the public `gsap` package. No `.npmrc`, no `npm.greensock.com`.

### Standing rules

- **`window.addEventListener('scroll')` is banned.** ScrollTrigger, Observer, IntersectionObserver, or CSS scroll-driven animations only. No hand-rolled rAF writing to React state.
- Every animation lives in `useGSAP()` from `@gsap/react`. No bare `useEffect` with manual `kill()`.
- One Lenis instance, root layout only. Never inside a section component.
- Animate `transform`, `opacity`, `filter`. Nothing else, ever.
- `will-change` only for an animation's duration, then removed.
- `containerAnimation` on **every** ScrollTrigger inside the pinned Work track. Omitting it is the single most common bug in pinned horizontal sections and looks like the animations are simply broken.
- **At most two pinned sections on the whole page**: About and Work. Both are spent. Nothing else may pin.
- `ScrollTrigger.refresh()` after fonts load and after the portrait loads.

### Lenis is a data source, not just a scroll hijacker

- `lenis.velocity` — clamped through `gsap.utils.mapRange`, drives four consumers: marquee speed/direction, pane `skewY` capped at 4deg, hero back-type scale capped at 1.02, grain opacity lift capped at 0.01. **Clamp hard.** Uncapped velocity mapping is how these turn into nausea.
- `lenis.progress` — 2px fixed hairline progress bar in `--accent-lift`.
- `lenis.direction` — flips the marquee, reveals the nav on scroll-up only.
- `lenis.stop()` / `start()` around the Work detail view. Lenis does not respect `overflow: hidden`.
- `lenis.scrollTo(target, { offset: -80, duration: 1.4, lock: true })` for nav jumps. Never `scrollIntoView`.
- `data-lenis-prevent` on the detail view body and the mobile menu.
- `lenis-scrolling` / `lenis-stopped` root classes are free hooks; use `lenis-scrolling` to suspend pane hover transitions during fast scroll.
- `virtualScroll` halves delta inside the Work track so the horizontal pan does not run at twice page speed.

### Shared-element morph (kept from generator, reassigned to Work)

```js
const state = Flip.getState('.work-card');
// open detail view
Flip.from(state, { duration: 0.6, ease: 'expo.inOut', absolute: true, zIndex: 100 });
```

- Verify the shared element exists in both DOM states before `Flip.from` or it silently no-ops.
- One element pair per transition. Compounding Flips are hard to time.
- Flip recalculates layout; test on low-end devices.

### Degradation, five tiers, all verified not assumed

1. **Desktop:** everything.
2. **Tablet:** idle float off, parallax amplitude halved, blur tiers unchanged.
3. **Mobile:** parallax off, float off, Work becomes native `scroll-snap` carousel instead of a pin, blur drops one step.
4. **Reduced motion:** all scrubs, floats, grain animation, velocity effects and the custom cursor off. Opacity fades only. Lenis destroyed, native scroll restored.
5. **Low-end** (`navigator.hardwareConcurrency <= 4`): treat as reduced motion for float and parallax, keep entrance animations.

60fps on a mid-range Android. **If the hero drops frames, cut pane count before cutting blur radius.**

---

## Anti-Patterns (Do NOT Use)

Union of both lists. If either bans it, it is banned.

From the generator:
- Light mode default
- Slow performance
- Emojis as icons — use SVG (Lucide/Heroicons)
- Missing `cursor: pointer` on clickables
- Layout-shifting hovers
- Low contrast text below 4.5:1
- Instant state changes — always 150-300ms
- Invisible focus states

From the brief:
- Scroll cues — no arrow, no "scroll to explore", no bouncing chevron
- Hero mono-caps decoration strips
- Numbered section eyebrows
- Pills or labels floating on images
- Locale, city, time, or weather strips
- Version footers, build numbers, last-sync timestamps
- Fake div-built product UI, including scripted terminals
- Three-equal-card rows
- `border-t` plus `border-b` on every list row
- AI-purple, mesh gradients, blobs
- More than one status dot, or any decorative dot

> **Known gap.** `taste-skill v2` is not installed on this machine. Only the ~12 §9 bans the brief explicitly quotes are enforceable here. Any §9 ban it did not quote has never been checked. Install `design-taste-frontend` and re-audit if that net is wanted.

### Copy rules

- **Zero em-dashes and zero en-dashes** anywhere: headlines, body, buttons, alt text, captions, metadata. Hyphen or restructure.
- Plain verbs, sentence case, active voice, no filler.
- Banned phrases: passionate, journey, crafting digital experiences, pixel-perfect, let's build something amazing together, turning ideas into reality, seamless, elevate.
- Every number on the page traces to verified source content. No new numbers, no invented projects, clients, or metrics.
- Percentages appear only welded to their mechanism (Capabilities, Experience). Numbers stands on countable claims only.
- The resume's "AI Tools" row (Claude, ChatGPT, Gemini, Codex) **stays off the site.** Listing chat assistants as skills reads as filler to this audience.

---

## Pre-Delivery Checklist

- [ ] No emojis used as icons (SVG only, one consistent set)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Text contrast 4.5:1 minimum in **both** themes
- [ ] Focus states visible for keyboard navigation on every interactive element
- [ ] `prefers-reduced-motion` respected, verified by actually toggling it
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
- [ ] One accent hue. Grep hex values, confirm nothing outside the token table
- [ ] `#A22C29` never text and never a lone hairline on `#0A100D`
- [ ] One radius system, chip pill the only documented exception
- [ ] Exactly three blur values. Grep `blur(` to confirm
- [ ] Every blurred surface has something visible behind it
- [ ] `backdrop-filter` count per viewport is 6 or fewer, verified in devtools
- [ ] Zero `window.addEventListener('scroll')`
- [ ] Every plugin in the table used for its job; unused ones removed from the bundle
- [ ] `containerAnimation` on every ScrollTrigger inside the Work track
- [ ] Velocity effects clamped, verified by flick-scrolling hard without nausea
- [ ] Grain is one fixed document-level layer, above panes, stepped not smooth
- [ ] Bricolage `wdth` animated on at least the hero headline
- [ ] `will-change` removed after each animation completes
- [ ] GSDevTools stripped from production
- [ ] All five degradation tiers verified, not assumed
- [ ] Light mode does not read as a wellness or spa brand
- [ ] Still-frame test passed: paused mid-scroll screenshot reads calm and expensive
