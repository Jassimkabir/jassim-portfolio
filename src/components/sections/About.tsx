'use client';

import { useEffect, useRef } from 'react';
import { hoverSpring, onFontsReady, reveal, revealWords, SPRING, useGsapContext } from '@/lib/motion';
import { ABOUT, SOCIALS } from '@/content/site';
import { Eyebrow } from '@/components/ui/primitives';
import { PillButton } from '@/components/ui/PillButton';
import { GitHub, Globe, Instagram, LinkedIn } from '@/components/ui/icons';

const LINKS = [
  { label: 'GitHub', href: SOCIALS.github, Icon: GitHub, accent: true },
  { label: 'LinkedIn', href: SOCIALS.linkedin, Icon: LinkedIn, accent: false },
  { label: 'Instagram', href: SOCIALS.instagram, Icon: Instagram, accent: false },
];

export function About() {
  const socialsRef = useRef<HTMLUListElement>(null);

  const scopeRef = useGsapContext<HTMLElement>((scope) => {
    reveal(scope.querySelector('[data-about-based]'), { y: 12 });
    reveal(scope.querySelector('[data-about-footer]'), { y: 12, delay: 0.2 });

    return onFontsReady(() =>
      revealWords(scope.querySelector<HTMLElement>('[data-about-statement]'), {
        stagger: 0.035,
      })
    );
  }, []);

  useEffect(() => {
    const list = socialsRef.current;
    if (!list) return;
    const cleanups = Array.from(list.querySelectorAll<HTMLElement>('[data-social]')).map((el) =>
      hoverSpring(el, el.querySelector<HTMLElement>('svg'), { scale: 1 }, { scale: 1.18 }, SPRING.snappy)
    );
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section ref={scopeRef} id="about" className="bg-white">
      <div className="shell grid grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
        {/* globe block */}
        <div className="relative flex min-h-56 flex-col justify-between lg:min-h-80">
          <Globe
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 -left-4 -translate-y-1/2 text-[12rem] text-foreground/10 sm:text-[16rem] lg:-left-6 lg:text-[20rem]"
          />
          <Eyebrow className="relative">{ABOUT.eyebrow}</Eyebrow>
          <div
            data-about-based
            className="relative flex items-center gap-3 text-sm text-foreground/70"
          >
            <Globe className="text-2xl text-foreground" />
            <span className="max-w-64">{ABOUT.based}</span>
          </div>
        </div>

        {/* statement */}
        <div className="flex flex-col gap-10">
          <h2
            data-about-statement
            className="text-2xl leading-[1.35] font-medium tracking-[-.01em] sm:text-3xl"
          >
            <span>{ABOUT.statementLead}</span>
            <span className="text-muted">{ABOUT.statementMuted}</span>
          </h2>

          <div
            data-about-footer
            className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6"
          >
            <div>
              <p className="mb-3 text-sm text-foreground/45">{ABOUT.socialsLabel}</p>
              <ul ref={socialsRef} className="flex gap-2">
                {LINKS.map(({ label, href, Icon, accent }) => (
                  <li key={label}>
                    <a
                      data-social
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className={`grid size-9 place-items-center rounded-pill text-sm ${
                        accent ? 'bg-accent text-white' : 'bg-surface text-foreground/70'
                      }`}
                    >
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <PillButton variant="outline" arrow="right" href="/jassim-m-kabir-resume.pdf" download>
              {ABOUT.cta}
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
