import type { ElementType, ReactNode } from 'react';

/**
 * Blur tiers. Three values exist on this page and these are they.
 *
 * `none` is not a fallback, it is the correct choice whenever nothing sits
 * behind the pane. Blur over flat colour is cost with no payoff, so those
 * panes take a solid --bg-raised fill instead.
 */
type BlurTier = 'none' | 'veil' | 'pane' | 'deep';

const TIER_CLASS: Record<BlurTier, string> = {
  none: '',
  veil: 'is-veil',
  pane: 'is-pane-blur',
  deep: 'is-deep',
};

type GlassPaneProps = {
  children?: ReactNode;
  /** Defaults to `none` so every blurred surface is a deliberate, greppable
   *  decision and the six-per-viewport ceiling stays countable. */
  blur?: BlurTier;
  /** Panes that magnetise toward the cursor on hover. */
  magnetic?: boolean;
  as?: ElementType;
  className?: string;
};

export default function GlassPane({
  children,
  blur = 'none',
  magnetic = false,
  as: Tag = 'div',
  className = '',
}: GlassPaneProps) {
  return (
    <Tag
      className={['pane', TIER_CLASS[blur], className].filter(Boolean).join(' ')}
      {...(magnetic ? { 'data-magnetic': '' } : {})}
      {...(blur === 'none' ? {} : { 'data-blur-tier': blur })}
    >
      {children}
    </Tag>
  );
}
