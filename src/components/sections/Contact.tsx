'use client';

import { onFontsReady, reveal, revealLines, useGsapContext } from '@/lib/motion';
import { useSite } from '@/components/SiteProvider';
import { CONTACT, SITE } from '@/content/site';
import { Eyebrow } from '@/components/ui/primitives';
import { PillButton } from '@/components/ui/PillButton';
import { useClock } from '@/components/chrome/Clock';

export function Contact() {
  const { openModal } = useSite();
  const { time } = useClock();

  const scopeRef = useGsapContext<HTMLElement>((scope) => {
    reveal(scope.querySelector('[data-contact-block]'), { y: 32 });

    return onFontsReady(() =>
      revealLines(scope.querySelector<HTMLElement>('[data-contact-title]'), { stagger: 0.1 })
    );
  }, []);

  return (
    <section ref={scopeRef} id="contact" className="bg-white">
      <div className="shell px-5 pb-20 sm:px-8 lg:pb-28">
        <div
          data-contact-block
          className="rounded-card border border-line bg-surface px-6 py-12 text-center sm:p-16"
        >
          <Eyebrow>{CONTACT.eyebrow}</Eyebrow>

          <h2
            data-contact-title
            className="lines mx-auto mt-4 max-w-[18ch] text-4xl font-semibold tracking-[-.02em] sm:text-5xl"
          >
            {CONTACT.heading.map((line) => (
              <span data-line key={line}>
                {line}
              </span>
            ))}
          </h2>

          <p className="mx-auto mt-4 max-w-[44ch] text-sm text-foreground/55">{CONTACT.body}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PillButton variant="dark" arrow="up-right" onClick={openModal}>
              {CONTACT.ctaPrimary}
            </PillButton>
            <PillButton variant="outline" href={`mailto:${SITE.email}`}>
              {CONTACT.ctaSecondary}
            </PillButton>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs tracking-[.05em] text-foreground/45 uppercase">
            <span>{SITE.locationShort}</span>
            <span className="tabular-nums">{time}</span>
            <span>{CONTACT.replies}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
