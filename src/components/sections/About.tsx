'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import { gsap, ScrollTrigger, DUR, EASE } from '@/lib/gsap';
import { ABOUT } from '@/content/site';
import SplitHeading from '@/components/ui/SplitHeading';
import MonoLabel from '@/components/ui/MonoLabel';

/**
 * Asymmetric: text column pinned at 40%, artifacts drifting past it on the
 * right at three unsynchronised speeds.
 *
 * PIN 1 OF 2 ON THE PAGE. The other is Work. ui-ux-pro-max's scroll-reveal
 * guidance caps a page at 1-2 pins before pinning starts fighting native
 * scroll feel, and those two are now spent. Nothing else may pin.
 */
export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* Pinning needs deterministic height, so it is desktop only. Below that
         the column simply flows and the artifacts stack. */
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const pin = ScrollTrigger.create({
          trigger: root.current,
          start: 'top top+=120',
          end: 'bottom bottom-=120',
          pin: '[data-about-column]',
          pinSpacing: false,
          anticipatePin: 1,
        });

        /*
         * Three curves, deliberately not multiples of each other, so the
         * artifacts never line up into a readable grid as they pass.
         *
         * MotionPath rather than a straight yPercent: curved drift is what
         * makes floating read as floating. This is also now the only consumer
         * of MotionPathPlugin, since the hero panes it was assigned to were
         * removed. If this section ever goes, drop the plugin too.
         */
        const curves = [
          [
            { x: 0, y: 0 },
            { x: -10, y: -40 },
            { x: 6, y: -88 },
          ],
          [
            { x: 0, y: 0 },
            { x: 14, y: -70 },
            { x: -8, y: -150 },
          ],
          [
            { x: 0, y: 0 },
            { x: -6, y: -22 },
            { x: 9, y: -52 },
          ],
        ];

        const drifts = gsap.utils.toArray<HTMLElement>('[data-about-artifact]').map((el, i) =>
          gsap.to(el, {
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
            motionPath: { path: curves[i % curves.length], curviness: 1.4 },
          }),
        );

        return () => {
          pin.kill();
          for (const d of drifts) d.scrollTrigger?.kill();
        };
      });

      /* Paragraph reveal runs in every tier that allows motion, pinned or not. */
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tween = gsap.from('[data-about-para]', {
          y: 24,
          opacity: 0,
          duration: DUR.base,
          stagger: 0.12,
          ease: EASE.glass,
          scrollTrigger: { trigger: '[data-about-column]', start: 'top 75%', once: true },
        });
        return () => tween.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="section about">
      <div className="container about__grid">
        <div data-about-column className="about__column">
          <SplitHeading as="h2" variant="display-lg" widthAxis={{ from: 92, to: 100 }}>
            Three companies, one direction
          </SplitHeading>

          {ABOUT.paragraphs.map((p) => (
            <p key={p} data-about-para className="body-lg about__para">
              {p}
            </p>
          ))}
        </div>

        <div className="about__artifacts">
          {ABOUT.artifacts.map((a) => (
            <article
              key={a.label}
              data-about-artifact
              className="pane about__artifact"
            >
              <MonoLabel>{a.meta}</MonoLabel>
              <h3 className="heading">{a.label}</h3>
              <p className="about__artifact-detail">{a.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
