'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { hoverSpring, SPRING } from '@/lib/motion';
import { ArrowRight, ArrowUpRight } from './icons';

type Variant = 'dark' | 'light' | 'outline';
type Arrow = 'right' | 'up-right';

const VARIANTS: Record<Variant, { pill: string; badge: string }> = {
  dark: { pill: 'bg-ink text-white', badge: 'bg-white text-ink' },
  light: { pill: 'bg-surface text-foreground', badge: 'bg-ink text-white' },
  outline: {
    pill: 'border border-line bg-transparent text-foreground',
    badge: 'bg-ink text-white',
  },
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  arrow?: Arrow;
  href?: string;
  external?: boolean;
  download?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  busy?: boolean;
  className?: string;
};

export function PillButton({
  children,
  variant = 'dark',
  arrow,
  href,
  external,
  download,
  onClick,
  type = 'button',
  disabled,
  busy,
  className = '',
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const cleanups = [
      hoverSpring(root, pillRef.current, { scale: 1 }, { scale: 1.04 }, SPRING.snappy),
      hoverSpring(
        root,
        iconRef.current,
        { x: 0, y: 0 },
        arrow === 'up-right' ? { x: 2, y: -2 } : { x: 3, y: 0 },
        SPRING.snappy
      ),
    ];
    return () => cleanups.forEach((fn) => fn());
  }, [arrow]);

  const { pill, badge } = VARIANTS[variant];
  const padding = arrow ? 'py-1.5 pr-1.5 pl-6' : 'px-7 py-3.5';
  const Icon = arrow === 'up-right' ? ArrowUpRight : ArrowRight;

  const inner = (
    <span
      ref={pillRef}
      className={`inline-flex items-center gap-3 rounded-pill text-sm font-medium ${pill} ${padding}`}
    >
      {children}
      {arrow ? (
        <span
          className={`grid size-9 place-items-center rounded-pill text-base ${badge}`}
          aria-hidden="true"
        >
          <span ref={iconRef} className="grid place-items-center">
            <Icon />
          </span>
        </span>
      ) : null}
    </span>
  );

  if (href) {
    return (
      <a
        ref={rootRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        className={`inline-block ${className}`}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={rootRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-busy={busy || undefined}
      className={`inline-block disabled:opacity-60 ${className}`}
    >
      {inner}
    </button>
  );
}
