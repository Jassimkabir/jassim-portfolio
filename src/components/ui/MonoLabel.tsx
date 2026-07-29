import type { ElementType, ReactNode } from 'react';

/**
 * Geist Mono, uppercase, tracked out.
 *
 * Reserved for real data: stack tags, dates, metrics, link handles. Mono used
 * as decoration is slop, so if the content is prose it does not belong here.
 * Section eyebrows ARE a use case, via tone="accent": every section carries
 * one, and they all come from EYEBROWS in content/site.ts. Numbered eyebrows
 * ("01 / ABOUT") stay banned outright.
 */
export default function MonoLabel({
  children,
  as: Tag = 'span',
  tone = 'dim',
  className = '',
}: {
  children: ReactNode;
  as?: ElementType;
  /** `accent` is for section eyebrows. Data labels stay `dim` so the accent
   *  keeps meaning something. */
  tone?: 'dim' | 'accent';
  className?: string;
}) {
  return (
    <Tag className={[tone === 'accent' ? 'label-accent' : 'label', className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
}
