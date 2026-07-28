'use client';

import { scrollToTop } from '@/lib/scroll';
import { FOOTER } from '@/content/site';
import ThemeToggle from '@/components/ui/ThemeToggle';
import MonoLabel from '@/components/ui/MonoLabel';

/**
 * Minimal by design. The footer is the one place on this page where being
 * generic is correct.
 *
 * Deliberately absent: no local time strip, no city, no weather, no build
 * number, no last-sync timestamp. All banned, and all of them are filler that
 * reads as filler to this audience.
 *
 * Grain continues over this section, because it is a single document-level
 * layer rather than anything per-section.
 */
export default function Footer() {
  return (
    <footer id="socials" className="footer">
      <div className="container footer__inner">
        <button type="button" className="footer__top" onClick={scrollToTop} data-magnetic>
          {FOOTER.backToTop}
        </button>

        <MonoLabel>Built with {FOOTER.builtWith.join(', ')}</MonoLabel>

        <ThemeToggle />
      </div>
    </footer>
  );
}
