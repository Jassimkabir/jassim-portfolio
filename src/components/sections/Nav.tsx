'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, SplitText, DUR, EASE } from '@/lib/gsap';
import { scrollState, scrollToSection, lockScroll, unlockScroll } from '@/lib/scroll';
import { NAV_LINKS } from '@/lib/nav';
import { IDENTITY, HERO } from '@/content/site';
import TravellingUnderline from '@/components/ui/TravellingUnderline';

const MOBILE_QUERY = '(max-width: 767px)';

/**
 * Full-bleed header. No container, no pill, no rounded box, no shadow.
 *
 * The floating rounded bar was deleted deliberately: it is the default shape,
 * and with the hero panes gone it was the only floating object left on the
 * page, which read as a leftover rather than a decision.
 *
 * The veil blur and the CTA are both permanent, per the client. That puts one
 * backdrop-filter element in the hero viewport, which is affordable now only
 * because the hero itself carries zero: 1 of 6, where it used to be 4 of 6.
 * Every section below the hero therefore has five remaining, not six.
 *
 * There is no active-section state. The underline is a hover affordance only,
 * so nothing here reads section position and no ScrollTriggers are needed.
 */
export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const burger = useRef<HTMLButtonElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  /* ── hide on scroll down, reveal on scroll up ───────────────────────────── */
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* Last beat of the load sequence. The nav owns this rather than the
           hero timeline, which could not reach it through useGSAP's scope. */
        const intro = gsap.from(el, {
          opacity: 0,
          duration: DUR.base,
          delay: 1.15,
          ease: EASE.glass,
        });

        const yTo = gsap.quickTo(el, 'yPercent', { duration: 0.3, ease: EASE.snap });
        let hidden = false;

        const tick = () => {
          /* Never hide while the overlay is open, and always reveal near the
             top regardless of direction. */
          const shouldHide =
            !el.dataset.menuOpen && scrollState.direction === 1 && scrollState.progress > 0.06;

          if (shouldHide !== hidden) {
            hidden = shouldHide;
            yTo(hidden ? -100 : 0);
          }
        };

        gsap.ticker.add(tick);
        return () => {
          intro.kill();
          gsap.ticker.remove(tick);
          gsap.set(el, { yPercent: 0, opacity: 1 });
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  /* ── wordmark width axis on hover ───────────────────────────────────────── */
  const wordmarkAxis = useCallback((el: HTMLElement | null, to: number) => {
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const axis = { wdth: Number(el.dataset.wdth ?? 75) };
    gsap.to(axis, {
      wdth: to,
      duration: 0.22,
      ease: EASE.snap,
      onUpdate: () => {
        el.dataset.wdth = String(axis.wdth);
        el.style.fontVariationSettings = `"wdth" ${axis.wdth.toFixed(1)}`;
      },
    });
  }, []);

  /* ── mobile overlay ─────────────────────────────────────────────────────── */
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      if (open) el.dataset.menuOpen = 'true';
      else delete el.dataset.menuOpen;
    }

    if (!open) {
      unlockScroll();
      return;
    }

    /* Lenis does not respect overflow: hidden, so the page is stopped
       explicitly rather than with a CSS lock that would do nothing. */
    lockScroll();

    const node = overlay.current;
    /* The close button lives in the header, outside the overlay, so it has to
       be part of the trap explicitly or Tab would escape to the page. */
    const focusables = [
      ...(burger.current ? [burger.current] : []),
      ...(node
        ? Array.from(node.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
        : []),
    ];
    focusables[1]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      if (e.key !== 'Tab' || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const mql = window.matchMedia(MOBILE_QUERY);
    const onBreakpoint = () => {
      if (!mql.matches) closeMenu();
    };

    document.addEventListener('keydown', onKey);
    mql.addEventListener('change', onBreakpoint);

    return () => {
      document.removeEventListener('keydown', onKey);
      mql.removeEventListener('change', onBreakpoint);
    };
  }, [open, closeMenu]);

  /* Focus returns to the trigger on close. */
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) burger.current?.focus();
    wasOpen.current = open;
  }, [open]);

  /* Overlay reveal: SplitText line masking, staggered. Opacity only under
     reduced motion. */
  useGSAP(
    () => {
      const node = overlay.current;
      if (!node || !open) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduced) {
        gsap.from(node, { opacity: 0, duration: DUR.fast });
        return;
      }

      const items = gsap.utils.toArray<HTMLElement>('[data-overlay-line]');
      const splits = items.map((el) => SplitText.create(el, { type: 'lines', mask: 'lines' }));

      const tl = gsap.timeline();
      tl.from(node, { opacity: 0, duration: 0.25, ease: EASE.snap })
        .from(
          splits.flatMap((s) => s.lines),
          { yPercent: 110, duration: DUR.base, stagger: 0.06, ease: EASE.glass },
          0.1,
        )
        .from('[data-overlay-cta]', { opacity: 0, y: 16, duration: DUR.fast, ease: EASE.glass }, 0.3);

      return () => {
        tl.kill();
        for (const s of splits) s.revert();
      };
    },
    { dependencies: [open], scope: overlay },
  );

  /*
   * Hamburger to close, and back.
   *
   * Two bars that translate to the centre and counter-rotate into an X, rather
   * than swapping one icon for another. The button stays mounted and above the
   * overlay throughout, so the same element is the open and the close control
   * and the transition reads as one continuous object.
   */
  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const duration = reduced ? 0 : 0.34;

      gsap.to('[data-burger-top]', {
        y: open ? 4 : 0,
        rotate: open ? 45 : 0,
        duration,
        ease: EASE.snap,
      });
      gsap.to('[data-burger-bottom]', {
        y: open ? -4 : 0,
        rotate: open ? -45 : 0,
        duration,
        ease: EASE.snap,
      });
    },
    { dependencies: [open], scope: ref },
  );

  const go = useCallback(
    (id: string) => {
      closeMenu();
      scrollToSection(`#${id}`);
    },
    [closeMenu],
  );

  return (
    <>
      <a
        href="#main"
        className="fixed top-2 left-2 z-[200] -translate-y-[200%] rounded-pane bg-accent px-5 py-3 text-accent-fg transition-transform duration-200 ease-snap focus-visible:translate-y-0"
      >
        Skip to content
      </a>

      <header
        ref={ref}
        /* z-160 puts it ABOVE the overlay (150): the burger is the close
           control too, so it must stay visible and clickable while the overlay
           is open, and the bars must animate into the X in place.
           backdrop-blur is deliberately absent from the transition: `none` and
           a blur function are not interpolable, and including it made the
           browser reject the whole declaration. */
        className="fixed top-0 right-0 left-0 z-[160] h-[var(--nav-h)] bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] backdrop-blur-veil transition-[background-color] duration-300 ease-snap"
      >
        <div className="mx-auto flex h-full max-w-[var(--container-page)] items-center gap-[clamp(1rem,3vw,2rem)] gutter-x">
          <a
            href="#home"
            /* The wordmark belongs to the display system, not the body system, so it
               reads as an identity rather than a label. */
            className="tap-44 flex-none font-display text-[1.15rem] leading-none font-semibold tracking-[-0.02em] [font-variation-settings:'wdth'_75]"
            data-wdth="75"
            onMouseEnter={(e) => wordmarkAxis(e.currentTarget, 88)}
            onMouseLeave={(e) => wordmarkAxis(e.currentTarget, 75)}
            onClick={(e) => {
              e.preventDefault();
              go('home');
            }}
          >
            {IDENTITY.shortName}
          </a>

          <nav aria-label="Main" className="relative ml-auto flex-none max-md:hidden">
            {/*
              LEAVE IS HANDLED HERE, NOT ON THE LINKS, and putting it back on
              them reintroduces a real bug. The links are separated by 32px of
              gap, so a pointer moving from one to the next passes through dead
              space. With onMouseLeave per link that cleared the hover every
              time, and the rule faded to 0 and snapped back on at the next
              link. Measured: opacity ran 1 to 0 and back to 1 on every
              crossing. Scoped to the list, crossing a gap changes nothing.

              onBlur is here for the same reason and checks relatedTarget,
              because React bubbles blur where the DOM does not: tabbing from
              one link to the next would otherwise clear it too.
            */}
            <ul
              className="flex list-none items-center gap-6 lg:gap-8"
              onMouseLeave={() => setHovered(null)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovered(null);
              }}
            >
              {NAV_LINKS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    data-nav-link={item.id}
                    className="label tap-44 inline-block py-[0.35rem] transition-colors duration-200 ease-snap hover:text-fg focus-visible:text-fg"
                    onMouseEnter={() => setHovered(item.id)}
                    onFocus={() => setHovered(item.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <TravellingUnderline hovered={hovered} attr="data-nav-link" />
          </nav>

          <a
            href="#contact"
            className="flex-none inline-flex items-center justify-center rounded-pane bg-accent px-[1.1rem] min-h-11 py-[0.6rem] text-[0.85rem] font-semibold text-accent-fg cursor-pointer max-md:hidden transition-[background-color,transform] duration-200 ease-snap hover:bg-accent-press active:translate-y-px"
            data-magnetic
            onClick={(e) => {
              e.preventDefault();
              go('contact');
            }}
          >
            {HERO.cta.label}
          </a>

          <button
            ref={burger}
            type="button"
            className="ml-auto hidden size-11 flex-none place-items-center content-center gap-[5px] max-md:grid"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span data-burger-top aria-hidden="true" className="block h-[1.5px] w-[22px] rounded-sm bg-fg" />
            <span data-burger-bottom aria-hidden="true" className="block h-[1.5px] w-[22px] rounded-sm bg-fg" />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={overlay}
        className="fixed inset-0 z-[150] hidden flex-col justify-center gap-[clamp(2rem,6vh,4rem)] overflow-y-auto bg-[color-mix(in_srgb,var(--bg)_96%,transparent)] pt-[calc(var(--nav-h)+2rem)] pb-8 backdrop-blur-deep gutter-x data-[open=true]:flex"
        data-open={open ? 'true' : 'false'}
        aria-hidden={open ? undefined : true}
        data-lenis-prevent
      >
        <ul className="grid list-none gap-[clamp(1rem,3vh,2rem)]">
          {NAV_LINKS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="display-lg inline-block min-h-11"
                data-overlay-line
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          data-overlay-cta
          className="mt-auto w-full inline-flex items-center justify-center px-7 py-3.5 bg-accent text-accent-fg rounded-pane font-semibold cursor-pointer transition-[background-color,transform] duration-200 ease-snap hover:bg-accent-press active:translate-y-px"
          onClick={(e) => {
            e.preventDefault();
            go('contact');
          }}
        >
          {HERO.cta.label}
        </a>
      </div>
    </>
  );
}
