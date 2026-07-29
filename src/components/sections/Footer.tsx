'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUp01Icon } from '@hugeicons/core-free-icons';

import { scrollToTop } from '@/lib/scroll';
import { FOOTER, IDENTITY } from '@/content/site';
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
export default function Footer({ year }: { year: number }) {
  return (
    <footer id="socials" className="border-t border-pane-edge py-[clamp(2rem,5vh,3rem)]">
      {/*
        A grid, not flex-wrap. With three items and justify-between, the moment
        a phone forces a wrap each item lands alone on its own line and
        justify-between stops doing anything, which is how this ended up as a
        ragged left-aligned stack.

        Explicit placement instead. On a phone the two controls share the top
        row, pushed to opposite edges, and the credit spans the row beneath
        them. From md everything sits on one line with the credit centred.

        DOM order is control, control, credit so the two tab stops are adjacent
        and come before the static text at every width.
      */}
      <div className="container-page grid grid-cols-2 items-center gap-x-6 gap-y-5 md:grid-cols-[auto_1fr_auto]">
        <button
          type="button"
          className="tap-44 inline-flex cursor-pointer items-center gap-2 justify-self-start text-fg-dim transition-colors duration-200 ease-snap hover:text-fg md:col-start-1 md:row-start-1"
          onClick={scrollToTop}
          data-magnetic
        >
          <HugeiconsIcon icon={ArrowUp01Icon} size={18} color="currentColor" strokeWidth={2} />
          {FOOTER.backToTop}
        </button>

        <div className="justify-self-end md:col-start-3 md:row-start-1">
          <ThemeToggle />
        </div>

        <MonoLabel className="col-span-2 normal-case tracking-[0.08em] md:col-span-1 md:col-start-2 md:row-start-1 md:text-center">
          &copy; {year} {FOOTER.creditPrefix}{' '}
          {/* The name never breaks. If the line has to wrap it wraps before
              the name rather than inside it. */}
          <span className="whitespace-nowrap">{IDENTITY.fullName}</span>
        </MonoLabel>
      </div>
    </footer>
  );
}
