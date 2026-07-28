import type { Metadata } from 'next';
import Link from 'next/link';

import MonoLabel from '@/components/ui/MonoLabel';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="container section" style={{ minHeight: '70vh', display: 'grid', alignContent: 'center', gap: '1.5rem' }}>
      <MonoLabel>404</MonoLabel>
      <h1 className="display-lg">This page does not exist</h1>
      <p className="body-lg" style={{ color: 'var(--fg-dim)', maxWidth: '40ch' }}>
        The link may be out of date, or the page may have moved.
      </p>
      <Link href="/" className="btn-primary" style={{ justifySelf: 'start' }}>
        Back to the start
      </Link>
    </main>
  );
}
