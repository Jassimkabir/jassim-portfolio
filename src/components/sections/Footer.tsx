'use client';

import { onFontsReady, revealLines, useGsapContext } from '@/lib/motion';
import { scrollToId } from '@/lib/scroll';
import { useSite } from '@/components/SiteProvider';
import { FOOTER, SITE } from '@/content/site';
import { PillButton } from '@/components/ui/PillButton';
import { AnimatedLink } from '@/components/ui/AnimatedLink';
import { LogoMark } from '@/components/ui/icons';

const COLUMN_TITLE = 'text-xs tracking-[.025em] text-white/40 uppercase';

export function Footer() {
  const { openModal } = useSite();

  const scopeRef = useGsapContext<HTMLElement>((scope) => {
    return onFontsReady(() =>
      revealLines(scope.querySelector<HTMLElement>('[data-footer-title]'), { stagger: 0.1 })
    );
  }, []);

  return (
    <footer
      ref={scopeRef}
      className="relative overflow-hidden rounded-t-card bg-ink text-white"
    >
      <div className="shell relative z-10 px-5 pt-20 pb-10 sm:px-8 lg:pt-24">
        {/* CTA */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <h2
            data-footer-title
            className="lines max-w-[16ch] text-4xl font-semibold tracking-[-.02em] sm:text-5xl md:text-6xl"
          >
            {FOOTER.heading.map((line) => (
              <span data-line key={line}>
                {line}
              </span>
            ))}
          </h2>
          <PillButton variant="light" arrow="up-right" onClick={openModal}>
            {FOOTER.cta}
          </PillButton>
        </div>

        {/* columns */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="flex items-center gap-2 text-lg font-semibold">
              <LogoMark className="text-xl" />
              {SITE.name}
            </span>
            <p className="mt-3 max-w-80 text-sm text-white/55">{FOOTER.blurb}</p>
          </div>

          {FOOTER.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className={COLUMN_TITLE}>{column.title}</p>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <AnimatedLink onClick={() => scrollToId(link.target)}>
                      {link.label}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Elsewhere">
            <p className={COLUMN_TITLE}>Elsewhere</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {FOOTER.elsewhere.map((link) => (
                <li key={link.label}>
                  <AnimatedLink href={link.href} external={link.href.startsWith('http')}>
                    {link.label}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* legal */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row">
          <p>{FOOTER.copyright}</p>
          <div className="flex gap-6">
            {FOOTER.legal.map((link) => (
              <AnimatedLink key={link.label} href={link.href} external distance={3} rest={0.7}>
                {link.label}
              </AnimatedLink>
            ))}
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-6 z-0 text-center text-watermark leading-none font-bold text-white/5 select-none"
      >
        {SITE.watermark}
      </span>
    </footer>
  );
}
