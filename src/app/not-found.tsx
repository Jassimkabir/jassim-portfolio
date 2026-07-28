import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, TERMINAL } from '@/content/site';

export const metadata: Metadata = {
  title: '404 — command not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-5 py-20 sm:px-8">
      <div className="shell w-full">
        <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-card bg-ink text-white ring-1 ring-white/5">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3.5">
            <span className="size-2.5 rounded-pill bg-accent-from" />
            <span className="size-2.5 rounded-pill bg-white/25" />
            <span className="size-2.5 rounded-pill bg-white/15" />
            <span className="font-mono text-xs text-white/40">
              {TERMINAL.title.replace('zsh', '~/404')}
            </span>
          </div>

          <div className="p-6 font-mono text-sm leading-7 sm:p-8">
            <p>
              <span className="text-accent-from">➜</span>{' '}
              <span className="text-white/45">~</span>{' '}
              <span>cd ./the-page-you-wanted</span>
            </p>
            <p className="mb-4 text-accent-from">
              cd: no such file or directory — error 404
            </p>

            <p>
              <span className="text-accent-from">➜</span>{' '}
              <span className="text-white/45">~</span> <span>whereis it</span>
            </p>
            <p className="mb-4 text-white/60">
              honestly, no idea — but home is still standing.
            </p>

            <p>
              <span className="text-accent-from">➜</span>{' '}
              <span className="text-white/45">~</span>{' '}
              <Link href="/" className="text-accent-from underline-offset-4 hover:underline">
                ./go-home
              </Link>
              <span className="caret ml-1 align-middle" aria-hidden="true" />
            </p>
          </div>

          <div className="border-t border-white/10 px-5 py-4 text-xs tracking-wide text-white/40 uppercase">
            {SITE.name}
          </div>
        </div>
      </div>
    </main>
  );
}
