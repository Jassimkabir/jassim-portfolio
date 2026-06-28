import { CONTENT } from '@/content/site';
import { Html } from '@/lib/text';
import ThemeToggle from './ThemeToggle';

/** Film-grain overlay. */
export function Grain() {
  return <div className='grain' aria-hidden='true' />;
}

/** Custom cursor markup — animated by Effects. */
export function Cursor() {
  return (
    <>
      <div className='cursor-ring' aria-hidden='true'>
        <span className='label'>View</span>
      </div>
      <div className='cursor-dot' aria-hidden='true' />
    </>
  );
}

/** Preloader — counter driven by Effects. */
export function Loader() {
  return (
    <div id='loader'>
      <Html className='lname' html={CONTENT.loaderName} />
      <div className='lcount' id='loaderCount'>
        0
      </div>
    </div>
  );
}

/** Fixed navigation. */
export function Nav() {
  return (
    <nav id='nav'>
      <a href='#top' className='logo' aria-label={CONTENT.name}>
        <Html html={CONTENT.logo} />
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
          aria-label='Open menu'
          aria-controls='mobileMenu'
          aria-expanded='false'
        >
          Menu
        </button>
      </div>
    </nav>
  );
}

/** Full-screen mobile menu overlay — toggled by Effects. */
export function MobileMenu() {
  return (
    <div className='mobile-menu' id='mobileMenu' aria-hidden='true'>
      <div className='mm-top'>
        <span className='mm-logo'>
          <Html html={CONTENT.logo} />
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ThemeToggle />
          <button
            className='mm-close'
            id='menuClose'
            type='button'
            aria-label='Close menu'
          >
            Close
          </button>
        </div>
      </div>
      {CONTENT.nav.map((n, i) => (
        <a key={n.href} href={n.href} className='mm-link'>
          <span className='mm-i'>{String(i + 1).padStart(2, '0')}</span>
          {n.label}
        </a>
      ))}
      <div className='mm-foot'>
        <a href={`mailto:${CONTENT.contact.email}`}>{CONTENT.contact.email}</a>
      </div>
    </div>
  );
}
