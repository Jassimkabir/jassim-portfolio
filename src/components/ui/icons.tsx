import type { SVGProps } from 'react';

/* Every icon renders at 1em and inherits `currentColor`, so size and
   colour are controlled entirely by the parent's font-size / color. */

type IconProps = SVGProps<SVGSVGElement>;

const shared = {
  width: '1em',
  height: '1em',
  focusable: 'false',
  'aria-hidden': true,
} as const;

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export function LogoMark(props: IconProps) {
  return (
    <svg {...shared} viewBox="0 0 48 48" fill="currentColor" {...props}>
      <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...shared} viewBox="0 0 24 24" {...stroke} strokeWidth={2} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...shared} viewBox="0 0 24 24" {...stroke} strokeWidth={2} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg {...shared} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
    </svg>
  );
}

export function Globe(props: IconProps) {
  return (
    <svg {...shared} viewBox="0 0 24 24" {...stroke} strokeWidth={1.4} {...props}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 2.75c2.6 2.3 4 5.8 4 9.25s-1.4 6.95-4 9.25c-2.6-2.3-4-5.8-4-9.25s1.4-6.95 4-9.25zM2.75 12h18.5" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...shared} viewBox="0 0 24 24" {...stroke} strokeWidth={2} {...props}>
      <path d="M4 4l16 16M20 4 4 20" />
    </svg>
  );
}

export function CircleDot(props: IconProps) {
  return (
    <svg {...shared} viewBox="0 0 24 24" {...stroke} strokeWidth={1.6} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...shared} viewBox="0 0 24 24" {...stroke} strokeWidth={2} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function Terminal(props: IconProps) {
  return (
    <svg {...shared} viewBox="0 0 24 24" {...stroke} strokeWidth={2} {...props}>
      <path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1ZM8 9l3 3-3 3M13 15h4" />
    </svg>
  );
}

export function GitHub(props: IconProps) {
  return (
    <svg {...shared} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function LinkedIn(props: IconProps) {
  return (
    <svg {...shared} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.9h3.1V21H3.4V8.9Zm5.53 0h2.97v1.65h.04c.42-.79 1.44-1.62 2.96-1.62 3.17 0 3.75 2.08 3.75 4.79V21h-3.1v-5.66c0-1.35-.02-3.08-1.88-3.08-1.88 0-2.17 1.47-2.17 2.98V21h-3.1V8.9Z" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg {...shared} viewBox="0 0 24 24" {...stroke} strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Braces(props: IconProps) {
  return (
    <svg {...shared} viewBox="0 0 24 24" {...stroke} strokeWidth={1.8} {...props}>
      <path d="M9 4H8a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h1M15 4h1a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-1" />
    </svg>
  );
}
