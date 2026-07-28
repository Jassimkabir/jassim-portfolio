'use client';

import { useEffect, useState } from 'react';
import { CLOCK_FALLBACK, formatClock } from '@/lib/clock';

/**
 * Live clock in IST. Renders the SSR fallback until the first tick so
 * the server and client markup agree.
 */
export function useClock() {
  const [clock, setClock] = useState<{ time: string; date: string }>(CLOCK_FALLBACK);

  useEffect(() => {
    const tick = () => setClock(formatClock());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return clock;
}

export function ClockTime({ className = '' }: { className?: string }) {
  const { time } = useClock();
  return <span className={`tabular-nums ${className}`}>{time}</span>;
}
