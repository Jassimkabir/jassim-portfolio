'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';

import { gsap, ScrollTrigger, DUR, EASE } from '@/lib/gsap';
import { EYEBROWS, WORK } from '@/content/site';
import SplitHeading from '@/components/ui/SplitHeading';
import MonoLabel from '@/components/ui/MonoLabel';

/**
 * Four cards, two up. Everything interesting here is motion.
 *
 * EARLIER VERSIONS THAT ARE NOT COMING BACK: a pinned horizontal pan, which
 * hijacked the scrollbar to move sideways for four items; a cursor-tracked
 * screenshot preview; and a full-width screenshot beside a counter-scrolling
 * pane. The last two leaned on captured images of the live sites, and those
 * are gone from /public along with them.
 *
 * With no imagery the cards have to earn attention some other way, and the two
 * things doing that are both real uses of the stack rather than decoration:
 *
 *  - A glow that tracks the pointer inside the hovered card. Driven by
 *    gsap.quickTo into two CSS custom properties, so the gradient moves on the
 *    compositor and React never re-renders.
 *  - A per-card vertical drift, scrubbed as the grid crosses the viewport, at
 *    alternating rates so the four never sit as one static block.
 *
 * WHERE LENIS IS. Not bolted on. Lenis owns the scroll position and
 * ScrollTrigger reads from it, so that drift is scrubbed against smoothed
 * scroll rather than raw wheel deltas. On a static grid that is the whole
 * difference between cards that glide and cards that step. See lib/lenis for
 * the single instance driving the GSAP ticker.
 *
 * NOT PINNED. The page has had no pinned section since the pan went.
 */

/*
 * NO data-magnetic ON THESE CARDS, and do not add it back.
 *
 * The cursor writes x and y to every [data-magnetic] element, and the drift
 * below writes y to the card. Two writers on one transform fight frame by
 * frame, which showed up as the cards shaking whenever the pointer was over
 * one after a scroll.
 *
 * Magnetism is also simply the wrong tool at this size. It measures from the
 * element's centre with a 100px radius and 8px of travel, which is tuned for
 * icon buttons and links; on a 632px card the pointer sits outside that radius
 * nearly everywhere, so the magnet spent its time snapping y back to zero
 * while the scrub kept restoring it. Small controls keep it. Panels do not.
 */

/** Vertical drift across the viewport. Alternates by index, small on purpose.
 *  Two columns and up only; see the matchMedia block for why. */
const DRIFT = 18;

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!WORK.projects.length) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const kills: Array<() => void> = [];

        /* Cards rise on arrival. One batched trigger, not one per card. */
        const batch = ScrollTrigger.batch('[data-work-card]', {
          start: 'top 88%',
          once: true,
          onEnter: (targets) =>
            gsap.from(targets, {
              y: 36,
              opacity: 0,
              duration: DUR.base,
              stagger: 0.08,
              ease: EASE.glass,
              /* clearProps is load bearing. A `from` tween finishes by leaving
                 its end value inline, and an inline opacity or transform would
                 outrank both the hover state and the drift below. */
              clearProps: 'opacity,transform',
            }),
        });
        kills.push(() => {
          for (const st of batch) st.kill();
        });

        return () => {
          for (const k of kills) k();
        };
      });

      /*
       * The drift, TWO COLUMNS AND UP ONLY.
       *
       * It alternates direction by index, which is what stops the grid moving
       * as one slab. In two columns that reads as depth, because the cards it
       * separates sit side by side. In the single column below 768 the same
       * alternation puts every card in opposition to the one above it, so the
       * gaps between them visibly pump open and shut while you scroll. That is
       * what looked wrong on a phone.
       */
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const drifts = gsap.utils.toArray<HTMLElement>('[data-work-card]').map((card, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          return gsap.fromTo(
            card,
            { y: DRIFT * dir },
            {
              y: -DRIFT * dir,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 },
            },
          );
        });

        return () => {
          for (const d of drifts) {
            d.scrollTrigger?.kill();
            d.kill();
          }
        };
      });

      /*
       * The pointer glow. Hover-capable, fine-pointer devices only, since a
       * touch device has no pointer to follow and would just pay the cost.
       */
      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-work-card]');
        const offs = cards.map((card) => {
          const glow = card.querySelector<HTMLElement>('[data-work-glow]');
          if (!glow) return () => {};

          /*
           * THE GLOW MOVES, THE GRADIENT DOES NOT. This used to animate the
           * gradient's position through two CSS custom properties, which is a
           * paint operation: custom properties are not compositor animatable,
           * so every frame repainted a 288px radial gradient across the card
           * and the text sitting on it. That was half the jitter.
           *
           * Now the gradient is fixed inside a element that is translated
           * instead. Same picture, but it rides the compositor and paints once.
           *
           * quickTo, not a tween per pointermove: one tween per axis is reused
           * and retargeted rather than allocating on every mouse event.
           */
          gsap.set(glow, {
            xPercent: -50,
            yPercent: -50,
            x: card.offsetWidth / 2,
            y: card.offsetHeight / 2,
          });

          const xTo = gsap.quickTo(glow, 'x', { duration: 0.5, ease: 'power3' });
          const yTo = gsap.quickTo(glow, 'y', { duration: 0.5, ease: 'power3' });

          const move = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            xTo(e.clientX - r.left);
            yTo(e.clientY - r.top);
          };
          /* Seeded at the entry point so the glow does not sweep in from
             wherever the last hover left it. */
          const enter = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            gsap.set(glow, { x: e.clientX - r.left, y: e.clientY - r.top });
          };

          card.addEventListener('pointerenter', enter);
          card.addEventListener('pointermove', move);
          return () => {
            card.removeEventListener('pointerenter', enter);
            card.removeEventListener('pointermove', move);
          };
        });

        return () => {
          for (const off of offs) off();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" className="section-y work">
      <div className="container-page mb-[clamp(2.5rem,7vh,4.5rem)]">
        <MonoLabel tone="accent" className="mb-5 block">
          {EYEBROWS.work}
        </MonoLabel>

        <SplitHeading as="h2" variant="display-lg" widthAxis={{ from: 92, to: 100 }}>
          Selected work
        </SplitHeading>
      </div>

      {WORK.projects.length === 0 ? (
        /* Honest empty state. A placeholder project would be a lie, and this
           is the section a hiring manager reads most carefully. */
        <div className="container-page">
          <div className="pane grid max-w-[60ch] gap-4 p-[clamp(1.75rem,4vw,3rem)]">
            <MonoLabel>Needs input</MonoLabel>
            <p className="body-lg">
              Three to five projects, each with a name, a one-line problem, its stack, one
              outcome, a live URL and a repo URL. If the work is under NDA it becomes
              anonymised case notes, stated as such on the page.
            </p>
          </div>
        </div>
      ) : (
        <div className="container-page grid gap-[clamp(1.25rem,2.5vw,2rem)] md:grid-cols-2">
          {WORK.projects.map((project) => (
            <a
              key={project.name}
              data-work-card
              href={project.liveUrl ?? undefined}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name}, opens the live site in a new tab`}
              className={[
                'pane group relative isolate flex flex-col gap-4 overflow-hidden',
                'p-[clamp(1.5rem,3vw,2.5rem)]',
                /* The other half of the jitter. The drift translates the card
                   by fractional pixels every frame, and without its own layer
                   the browser re-rasterises all of this card's text at each
                   sub-pixel offset, which shimmers. Promoted, it rasterises
                   once and the compositor moves it.

                   md and up only, matching the drift. Below that nothing
                   translates the card, and a permanent layer per card would be
                   memory spent on a phone for no motion at all. */
                'md:will-change-transform',
                'transition-[border-color] duration-300 ease-snap hover:border-accent-lift',
              ].join(' ')}
            >
              {/* The glow. Under the content so it never tints the type, and
                  clipped by the card's overflow-hidden. Accent as a fill, its
                  only AA-passing use against the dark base.

                  Fixed size and fixed gradient: it is positioned by transform
                  alone, which is what keeps it off the paint path. */}
              <span
                aria-hidden="true"
                data-work-glow
                className={[
                  'pointer-events-none absolute top-0 left-0 -z-10 h-[32rem] w-[32rem] rounded-full',
                  'opacity-0 transition-opacity duration-500 ease-snap will-change-transform',
                  'group-hover:opacity-100 group-focus-visible:opacity-100',
                  'bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_70%)]',
                ].join(' ')}
              />

              <div className="flex items-start justify-between gap-4">
                <h3 className="heading transition-colors duration-300 ease-snap group-hover:text-accent-lift">
                  {project.name}
                </h3>

                <span
                  aria-hidden="true"
                  className="icon-round shrink-0 transition-[color,border-color,translate] duration-300 ease-snap group-hover:-translate-y-1 group-hover:border-accent-lift group-hover:text-accent-lift"
                >
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={20}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                </span>
              </div>

              <p className="max-w-[46ch] text-fg-dim">{project.problem}</p>

              <ul className="mt-auto flex list-none flex-wrap gap-2 pt-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center rounded-chip border border-pane-edge px-2.5 py-1"
                  >
                    <MonoLabel>{tech}</MonoLabel>
                  </li>
                ))}
              </ul>

              {project.metric ? <MonoLabel>{project.metric}</MonoLabel> : null}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
