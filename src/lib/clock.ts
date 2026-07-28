import { SITE } from '@/content/site';

/* Live clock in the studio's timezone. SSR renders the fallbacks so the
   markup is stable; the first client tick replaces them. */

export const CLOCK_FALLBACK = { time: '9:41am', date: '12 March, 2025' } as const;

const parts = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: SITE.timeZone,
    hour: 'numeric',
    minute: '2-digit',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour12: false,
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, p) => {
      acc[p.type] = p.value;
      return acc;
    }, {});

export function formatClock(date = new Date()) {
  const p = parts(date);
  const hours24 = Number(p.hour);
  const hours = hours24 % 12 || 12;
  const meridiem = hours24 < 12 ? 'am' : 'pm';

  return {
    time: `${hours}:${p.minute}${meridiem}`,
    date: `${Number(p.day)} ${p.month}, ${p.year}`,
  };
}
