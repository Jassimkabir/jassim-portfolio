'use client';

/** The three nav links. Contact is rendered separately as the CTA button. */
export const NAV_LINKS: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Capabilities' },
];

/**
 * Header height, read from the CSS variable so the scroll offset can never
 * drift from the rendered height. Hardcoding 72 would misalign every anchor
 * below 768px, where the header is 64.
 */
export function headerHeight(): number {
  if (typeof window === 'undefined') return 72;
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h');
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 72;
}
