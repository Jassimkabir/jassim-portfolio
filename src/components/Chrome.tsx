import { CONTENT } from '@/content/site';
import { Html } from '@/lib/text';
import ThemeToggle from './ThemeToggle';

/** Halftone / newsprint texture overlay. */
export function Grain() {
  return <div className='grain' aria-hidden='true' />;
}

/** Custom registration-mark cursor — animated by Effects. */
export function Cursor() {
  return (
    <>
      <div className='cursor-ring' aria-hidden='true'>
        <span className='label'>Read</span>
      </div>
      <div className='cursor-dot' aria-hidden='true' />
    </>
  );
}

/** Preloader — "running the presses". Counter driven by Effects. */
export function Loader() {
  return (
    <div id='loader'>
      <div className='lname'>{CONTENT.paper.title}</div>
      <div className='lnote'>{CONTENT.loaderNote}</div>
      <div className='lcount' id='loaderCount'>
        0%
      </div>
    </div>
  );
}

/** Fixed folio bar — the sections index. */
export function Nav() {
  return (
    <nav id='nav'>
      <a href='#top' className='logo' aria-label={CONTENT.paper.title}>
        {CONTENT.paper.title}
      </a>
      <div className='nav-right'>
        <div className='links'>
          {CONTENT.nav.map((n) => (
            <a key={n.href} href={n.href} data-cursor>
              {n.label}
            </a>
          ))}
        </div>
        <ThemeToggle />
        <button
          className='menu-btn'
          id='menuBtn'
          type='button'
          aria-label='Open sections'
          aria-controls='mobileMenu'
          aria-expanded='false'
        >
          Sections
        </button>
      </div>
    </nav>
  );
}

/** Full-screen "Sections" overlay — toggled by Effects. */
export function MobileMenu() {
  return (
    <div className='mobile-menu' id='mobileMenu' aria-hidden='true'>
      <div className='mm-top'>
        <span className='mm-logo'>{CONTENT.paper.title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ThemeToggle />
          <button
            className='mm-close'
            id='menuClose'
            type='button'
            aria-label='Close sections'
          >
            Close
          </button>
        </div>
      </div>
      {CONTENT.nav.map((n) => (
        <a key={n.href} href={n.href} className='mm-link'>
          <span className='mm-i'>{n.page}</span>
          {n.label}
        </a>
      ))}
      <div className='mm-foot'>
        <a href={`mailto:${CONTENT.correspondence.email}`}>
          {CONTENT.correspondence.email}
        </a>
      </div>
    </div>
  );
}
