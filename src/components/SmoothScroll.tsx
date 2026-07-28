'use client';

import { useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useGSAP } from '@gsap/react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { scrollState, setLenis } from '@/lib/scroll';

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

    /* Pin positions are computed from element heights, which move when the
       fonts swap in and when the portrait decodes. Both need a refresh. */
    const onFonts = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(onFonts);

    return () => {
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
