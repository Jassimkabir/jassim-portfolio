import type { ElementType, ReactNode } from 'react';

/**
 * Geist Mono, uppercase, tracked out.
 *
 * Reserved for real data: stack tags, dates, metrics, link handles. Mono used
 * as decoration is slop, so if the content is prose it does not belong here.
 * Section eyebrows are not a use case; numbered eyebrows are banned outright.
 */
export default function MonoLabel({
  children,
  as: Tag = 'span',
  className = '',
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return <Tag className={['label', className].filter(Boolean).join(' ')}>{children}</Tag>;
}
