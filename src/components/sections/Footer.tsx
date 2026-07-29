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
    <footer id="socials" className="border-t border-pane-edge py-[clamp(2rem,5vh,3rem)]">
      <div className="container-page flex flex-wrap items-center justify-between gap-6">
        <button type="button" className="tap-44 cursor-pointer text-fg-dim transition-colors duration-200 ease-snap hover:text-fg" onClick={scrollToTop} data-magnetic>
          {FOOTER.backToTop}
        </button>

        <MonoLabel>Built with {FOOTER.builtWith.join(', ')}</MonoLabel>

        <ThemeToggle />
      </div>
    </footer>
  );
}
