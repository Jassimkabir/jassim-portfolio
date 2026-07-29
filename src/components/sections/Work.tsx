'use client';

import { useCallback, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';

import {
  gsap,
  ScrollTrigger,
  Draggable,
  Flip,
  DUR,
  EASE,
} from '@/lib/gsap';
import { lockScroll, unlockScroll } from '@/lib/scroll';
import { EYEBROWS, WORK } from '@/content/site';
import SplitHeading from '@/components/ui/SplitHeading';
import MonoLabel from '@/components/ui/MonoLabel';

type Project = (typeof WORK.projects)[number];

/**
 * Pinned horizontal pan. PIN 2 OF 2 on the page; the other is About.
 *
 * CONTENT BLOCKED. No client names, product names, live URLs or repo links
 * have been supplied. The shell below is complete and starts working the
 * moment WORK.projects is populated. Nothing here is invented.
 *
 * THE BUG TO NOT REINTRODUCE: every ScrollTrigger attached to an element
 * INSIDE this track must pass `containerAnimation`. Without it they fire at
 * the wrong scroll position and it looks like the animations are simply
 * broken. It is the single most common failure in pinned horizontal sections.
 */
export default function Work() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Project | null>(null);

  useGSAP(
    () => {
      if (!WORK.projects.length) return;

      const mm = gsap.matchMedia();

      /* Desktop and tablet pin and pan. Mobile falls through to the native
         scroll-snap carousel defined in CSS, because pinning fights touch
         scroll and costs more than it returns on a small viewport. */
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const el = track.current;
        if (!el) return;

        const distance = () => el.scrollWidth - window.innerWidth;

        const pan = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        /* NO PER-CARD Y OFFSET HERE, and do not add it back.
           There was a depth parallax running the cards to yPercent -10 to +4,
           which on a 358px card is a 50px spread. Against a horizontal pan it
           did not read as depth, it read as four cards that had failed to line
           up. The About figures get away with the same idea because they sit
           in a grid with deliberate offsets and the eye has a column to
           measure against; a single row of cards has no such reference.

           If any trigger is ever attached to an element inside this track, it
           MUST pass containerAnimation: pan. Without it, triggers fire at the
           wrong scroll position, which is the single most common failure in
           pinned horizontal sections. */

        /* Trackpad and touch drag, with inertia handing back to ScrollTrigger
           rather than fighting it for control of the same scroll position. */
        const [draggable] = Draggable.create(el, {
          type: 'x',
          inertia: true,
          bounds: { minX: -distance(), maxX: 0 },
          onDrag: () => ScrollTrigger.update(),
          onThrowUpdate: () => ScrollTrigger.update(),
        });

        return () => {
          draggable?.kill();
          pan.scrollTrigger?.kill();
          pan.kill();
        };
      });

      /* Stack tags scramble on hover. Hover-only and hover-capable only, so it
         never runs unprompted. This is not a fake terminal, which stays banned;
         it is a hover state on real data. */
      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const tags = gsap.utils.toArray<HTMLElement>('[data-stack-tag]');
        const handlers = tags.map((tag) => {
          const text = tag.textContent ?? '';
          const enter = () =>
            gsap.to(tag, {
              duration: DUR.fast,
              scrambleText: { text, chars: 'upperCase', speed: 0.6 },
            });
          tag.addEventListener('pointerenter', enter);
          return () => tag.removeEventListener('pointerenter', enter);
        });

        return () => {
          for (const off of handlers) off();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  /* Lenis does not respect overflow: hidden, so the detail view stops it
     explicitly rather than relying on a CSS lock that would do nothing. */
  const openDetail = useCallback((project: Project) => {
    const cards = gsap.utils.toArray<HTMLElement>('[data-work-card]');
    const state = Flip.getState(cards);
    setOpen(project);
    lockScroll();
    requestAnimationFrame(() => {
      Flip.from(state, { duration: DUR.base, ease: EASE.glass, absolute: true, zIndex: 200 });
    });
  }, []);

  const closeDetail = useCallback(() => {
    setOpen(null);
    unlockScroll();
  }, []);

  return (
    <section ref={root} id="work" className="section-y work">
      <div className="container-page mb-[clamp(2.5rem,6vh,4rem)]">
        <MonoLabel tone="accent" className="mb-5 block">{EYEBROWS.work}</MonoLabel>

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
        <div
          ref={track}
          /* Mobile drops the pin entirely for a native snap carousel: pinning
             fights touch scroll and costs more than it returns there. */
          className={[
            'flex w-max gutter-x gap-[clamp(1.5rem,3vw,2.5rem)] will-change-transform',
            'max-md:w-auto max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:will-change-auto',
          ].join(' ')}
        >
          {WORK.projects.map((project) => (
            <article
              key={project.name}
              data-work-card
              /* Column, not grid: the action row uses mt-auto to sit on the
                 card's floor, so all four rows align across the track instead
                 of floating at whatever height their own copy ended at. */
              className="pane flex w-[min(80vw,30rem)] flex-none flex-col gap-4 p-[clamp(1.5rem,3vw,2.5rem)] backdrop-blur-pane max-md:snap-center"
            >
              <h3 className="heading">{project.name}</h3>
              <p className="text-fg-dim">{project.problem}</p>

              {/* Outlined chips, not bare text. Several tags are two words
                  ("Shopify Hydrogen", "Tailwind CSS"), and with only a gap
                  between them the row read as one run-on string. The border
                  is the same one the resume button and the icon buttons use,
                  so this joins an existing family rather than inventing a
                  treatment. */}
              <ul className="flex list-none flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center rounded-chip border border-pane-edge px-2.5 py-1"
                  >
                    <MonoLabel>
                      <span data-stack-tag>{tech}</span>
                    </MonoLabel>
                  </li>
                ))}
              </ul>

              {/* Omitted rather than stubbed while the outcome is unknown. */}
              {project.metric ? <MonoLabel>{project.metric}</MonoLabel> : null}

              <div className="mt-auto flex items-center gap-5 pt-2 [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center [&_a]:border-b [&_a]:border-transparent [&_a]:text-accent-lift [&_a]:transition-[border-color] [&_a]:duration-200 [&_a]:ease-snap hover:[&_a]:border-accent-lift [&_button]:min-h-11 [&_button]:cursor-pointer [&_button]:border-b [&_button]:border-transparent [&_button]:text-accent-lift [&_button]:transition-[border-color] [&_button]:duration-200 [&_button]:ease-snap hover:[&_button]:border-accent-lift">
                <button type="button" onClick={() => openDetail(project)}>
                  View details
                </button>
                {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">Live</a> : null}
                {project.repoUrl ? <a href={project.repoUrl} target="_blank" rel="noreferrer">Repo</a> : null}
              </div>
            </article>
          ))}
        </div>
      )}

      {open ? (
        <div
          /* Level 3 elevation. Now the only consumer of the deep blur tier,
             since the hero front pane it was shared with was removed. */
          className={[
            'fixed inset-0 z-[200] grid content-center overflow-y-auto',
            'py-[clamp(4rem,12vh,8rem)] backdrop-blur-deep',
            // Translucent, not solid: a deep blur over an opaque fill is cost
            // with no payoff, and the page behind should stay faintly legible.
            'bg-[color-mix(in_srgb,var(--bg)_82%,transparent)]',
          ].join(' ')}
          role="dialog"
          aria-modal="true"
          aria-label={open.name}
          data-lenis-prevent
        >
          <button type="button" className="absolute top-6 right-[clamp(1.25rem,5vw,5rem)] cursor-pointer" onClick={closeDetail}>
            Close
          </button>
          <div className="container-page grid max-w-[52rem] gap-6">
            <h3 className="display-lg">{open.name}</h3>
            <p className="body-lg max-w-[52ch] text-fg-dim">{open.problem}</p>

            <ul className="flex list-none flex-wrap gap-2">
              {open.stack.map((tech) => (
                <li key={tech}>
                  <MonoLabel>{tech}</MonoLabel>
                </li>
              ))}
            </ul>

            {open.metric ? <MonoLabel>{open.metric}</MonoLabel> : null}

            {/* Without this the dialog was a dead end: with metric null it held
                a name and one sentence, and the way out was the Close button. */}
            {open.liveUrl ? (
              <a
                href={open.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="tap-44 justify-self-start border-b border-accent-lift pb-0.5 text-accent-lift transition-[color,border-color] duration-200 ease-snap hover:border-fg hover:text-fg"
              >
                Visit the site
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
