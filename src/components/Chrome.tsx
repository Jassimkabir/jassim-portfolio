import { CONTENT } from '@/content/site';
import { Html } from '@/lib/text';
import ThemeToggle from './ThemeToggle';

/** CRT scanline + vignette overlay. */
export function Grain() {
  return <div className='grain' aria-hidden='true' />;
}

/** Broadcast "channel bug" HUD — updated by Effects as you scroll / press 1–9. */
export function ChannelBug() {
  return (
    <div className='channel-bug' id='channelBug' aria-hidden='true'>
      <span className='cb-ch'>CH</span>
      <span className='cb-num' id='channelNum'>
        01
      </span>
      <span className='cb-name' id='channelName'>
        ABOUT
      </span>
    </div>
  );
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

/** Preloader — a POST / BIOS boot; counter + bar driven by Effects. */
export function Loader() {
  return (
    <div id='loader'>
      <div className='boot-screen'>
        <div className='boot-post' aria-hidden='true'>
          <p>
            <b>SIGNAL BIOS</b> v1.6 — (C) 2026 J.KABIR SYSTEMS
          </p>
          <p>CPU: Creative Cortex @ 8-BIT · OK</p>
          <p>
            Memory Test: <span className='boot-mem' id='loaderMem'>0000</span> KB OK
          </p>
          <p>Detecting drives … React ✓ Next ✓ TypeScript ✓ GSAP ✓</p>
          <p>Initializing display adapter … CRT MODE 80×25</p>
        </div>
        <div className='boot-center'>
          <div className='boot-top'>
            <span className='live' aria-hidden='true' />
            <span>Booting portfolio</span>
          </div>
          <Html className='lname' html={CONTENT.loaderName} />
          <div className='boot-bar'>
            <span>Load</span>
            <span className='boot-track' aria-hidden='true'>
              <span className='boot-fill' id='loaderFill' />
            </span>
            <span className='lcount' id='loaderCount'>
              0
            </span>
            <span>%</span>
          </div>
        </div>
        <p className='boot-foot' aria-hidden='true'>
          Press DEL to enter setup · or just wait ▮
        </p>
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
