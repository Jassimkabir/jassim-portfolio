'use client';

/**
 * The nav links, in page order. Contact is rendered separately as the CTA.
 *
 * `services` is Capabilities: the slug is preserved from the previous site so
 * old deep links still land, and only the visible label changed. Do not rename
 * the id to match the label.
 */
export const NAV_LINKS: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Capabilities' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
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
