import type { ReactNode } from 'react';

/* Static primitives — no motion, so they stay out of the client bundle
   unless a client component pulls them in. */

export function Eyebrow({
  children,
  tone = 'dark',
  className = '',
}: {
  children: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const text = tone === 'light' ? 'text-white/70' : 'text-foreground/70';
  const dot = tone === 'light' ? 'bg-white/60' : 'bg-foreground/50';

  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium ${text} ${className}`}>
      <span className={`size-1.5 rounded-pill ${dot}`} aria-hidden="true" />
      {children}
    </span>
  );
}

export function TagChip({
  children,
  tone = 'dark',
}: {
  children: ReactNode;
  tone?: 'dark' | 'light';
}) {
  const styles =
    tone === 'light'
      ? 'border-white/25 text-white'
      : 'border-foreground/15 text-foreground/70';

  return (
    <span className={`inline-flex rounded-pill border px-4 py-2 text-sm ${styles}`}>
      {children}
    </span>
  );
}
