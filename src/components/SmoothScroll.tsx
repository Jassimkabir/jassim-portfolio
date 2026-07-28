'use client';

import { useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useGSAP } from '@gsap/react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { scrollState, setLenis, VELOCITY_CAP, VELOCITY_RANGE } from '@/lib/scroll';

/**
 * The one Lenis instance for the whole app. Mounted in the root layout and
 * nowhere else. Never instantiate Lenis inside a section component.
 *
 * Also owns the scroll progress hairline, because it is the only consumer that
 * needs `lenis.progress` every frame and giving it its own ticker would be a
 * second per-frame write for no reason.
 */
export default function SmoothScroll() {
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Reduced motion destroys Lenis entirely and restores native scroll,
       rather than leaving a "smooth but slower" instance running. */
    if (reduced) {
      setLenis(null);
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      anchors: true,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
      // autoRaf stays false; GSAP's ticker drives raf so the two never desync.
      autoRaf: false,
    });

    setLenis(lenis);

    const setProgress = gsap.quickSetter(progressRef.current, 'scaleX');

    lenis.on('scroll', () => {
      scrollState.velocity = lenis.velocity;
      scrollState.progress = lenis.progress;
      scrollState.direction = lenis.direction as 1 | -1 | 0;
      setProgress?.(lenis.progress);
      ScrollTrigger.update();
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /* Pane skew, driven from the same velocity read rather than a second
       subscription. One ticker for every pane on the page: per-section skew
       tickers would multiply the cost by the section count for no gain. */
    /* Veil panes are excluded. The nav is `.nav__inner.pane.is-veil` and is
       position: fixed, so skewing it shears the top bar on every scroll. A
       fixed blurred veil should never skew; only content panes should. */
    const skewTo = gsap.quickTo('.pane:not(.is-veil)', 'skewY', {
      duration: 0.5,
      ease: 'power3',
    });
    const skewTick = () => {
      const v = scrollState.velocity;
      const clamped = gsap.utils.clamp(-VELOCITY_RANGE, VELOCITY_RANGE, v);
      /* Capped at 4deg. Past that it stops reading as responsiveness and
         starts reading as the page tearing. */
      skewTo(
        gsap.utils.mapRange(
          -VELOCITY_RANGE,
          VELOCITY_RANGE,
          -VELOCITY_CAP.paneSkew,
          VELOCITY_CAP.paneSkew,
          clamped,
        ),
      );
    };
    gsap.ticker.add(skewTick);

    /* Pin positions are computed from element heights, which move when the
       fonts swap in and when the portrait decodes. Both need a refresh. */
    const onFonts = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(onFonts);

    return () => {
      gsap.ticker.remove(skewTick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
      scrollState.velocity = 0;
      scrollState.progress = 0;
      scrollState.direction = 0;
    };
  }, []);

  return <div ref={progressRef} className="progress" aria-hidden="true" />;
}
