'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { hoverSpring, SPRING } from '@/lib/motion';

type Props = {
  children: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  /** Horizontal travel on hover — 4px by default, 3px for footer legal links. */
  distance?: number;
  /** Resting opacity — .65 by default, .7 for footer legal links. */
  rest?: number;
  className?: string;
};

export function AnimatedLink({
  children,
  href,
  external,
  onClick,
  distance = 4,
  rest = 0.65,
  className = '',
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(
    () =>
      hoverSpring(
        rootRef.current,
        innerRef.current,
        { x: 0, opacity: rest },
        { x: distance, opacity: 1 },
        SPRING.snappy
      ),
    [distance, rest]
  );

  const inner = (
    <span ref={innerRef} className="inline-block">
      {children}
    </span>
  );
  const classes = `inline-flex ${className}`;

  if (href) {
    return (
      <a
        ref={rootRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        className={classes}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={rootRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={`${classes} text-left`}
    >
      {inner}
    </button>
  );
}
