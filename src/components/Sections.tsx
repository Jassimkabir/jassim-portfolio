import { CONTENT } from '@/content/site';
import { Html, wrapWords } from '@/lib/text';
import Cartoon from './Cartoon';

/* ───────── the printed nameplate / masthead ───────── */
export function Nameplate() {
  const { paper } = CONTENT;
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <header className='wrap nameplate' id='top'>
      <div className='folio-top reveal'>
        <span>{paper.edition}</span>
        <span className='weather'>{paper.weather}</span>
        <span>{paper.price}</span>
      </div>
      <h1 className='plate-title reveal'>{paper.title}</h1>
      <div className='plate-sub reveal'>
        <span className='est'>{paper.established}</span>
        <span className='dash'>·</span>
        <span>{today}</span>
        <span className='dash'>·</span>
        <span className='est'>
          {paper.volume} — {paper.issue}
        </span>
      </div>
    </header>
  );
}

/* ───────── FRONT PAGE / lead story (hero) ───────── */
export function FrontPage() {
  const { lead } = CONTENT;
  return (
    <section className='wrap front-page' id='front-page'>
      <div className='front-grid'>
        <div className='front-main'>
          <span className='kicker lead-kicker reveal'>{lead.kicker}</span>
          <h2 className='lead-headline'>
            {lead.headlineLines.map((line, i) => (
              <span className='ln' key={i}>
                <Html className='lnInner' as='span' html={line} />
              </span>
            ))}
          </h2>
          <Html as='p' className='lead-deck reveal' html={lead.deck} />
          <div className='lead-byline reveal'>
            <span className='by'>{lead.byline}</span>
            <span>{new Date().getFullYear()} · The Jassim Times</span>
          </div>
          <div className='lead-body col-reveal'>
            <p className='dropcap'>
              <span className='dateline'>{lead.dateline} </span>
              {lead.lead}
            </p>
            {lead.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className='continued'>{lead.continued}</p>
          </div>
        </div>

        <aside className='front-aside'>
          <figure className='cartoon-box reveal'>
            <Cartoon />
            <figcaption className='cap'>
              Fig. 1 — Our man, in high spirits, shipping before deadline.
            </figcaption>
          </figure>
          <div className='notice reveal'>
            <div className='n-top'>✶ Public Notice ✶</div>
            <div className='n-main'>{lead.stamp}</div>
            <div className='n-sub'>Commissions open. Enquire at the desk.</div>
            <span className='stamp'>Approved</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ───────── STOP-PRESS ticker (marquee) ───────── */
export function Ticker() {
  const { ticker } = CONTENT;
  const items = [...ticker.items, ...ticker.items];
  return (
    <div className='ticker' id='marquee'>
      <span className='ticker-tag'>{ticker.label}</span>
      <div className='marq-skew'>
        <div className='track'>
          {items.map((m, i) => (
            <span
              key={i}
              style={{ display: 'inline-flex', gap: 30, alignItems: 'center' }}
            >
              <span className='item'>{m}</span>
              <span className='star'>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────── shared section front ───────── */
function SectionFront({
  kicker,
  page,
  label,
  heading,
}: {
  kicker: string;
  page: string;
  label: string;
  heading: string;
}) {
  return (
    <div className='section-front reveal'>
      <div className='folio'>
        <span className='kicker'>{kicker}</span>
        <span>The Jassim Times</span>
        <span className='folio-page'>Page {page}</span>
      </div>
      <Html as='h2' className='section-title' html={heading} />
      <div className='section-rule' />
    </div>
  );
}

/* ───────── THE EDITORIAL (about) ───────── */
export function Editorial() {
  const { editorial: ed } = CONTENT;
  return (
    <section className='pad editorial' id='editorial'>
      <div className='wrap'>
        <SectionFront kicker={ed.kicker} page={ed.page} label={ed.label} heading={ed.heading} />
        <Html
          as='p'
          className='ed-lede'
          html={wrapWords(ed.lede)}
          id='edLede'
        />
        <div className='ed-columns col-reveal'>
          {ed.columns.map((p, i) => (
            <p key={i} className={i === 0 ? 'dropcap' : undefined}>
              {p}
            </p>
          ))}
        </div>
        <span className='ed-sign reveal'>{ed.signature}</span>
        <div className='ed-tags reveal'>
          {ed.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── THE WIRE (teletype terminal) ───────── */
export function Wire() {
  const { wire } = CONTENT;
  return (
    <section className='pad' id='wire'>
      <div className='wrap'>
        <SectionFront kicker={wire.kicker} page={wire.page} label={wire.label} heading={wire.heading} />
        <div className='wire-machine reveal' id='wire-machine'>
          <div className='wire-bar'>
            <span className='holes' aria-hidden='true'>
              <i />
              <i />
              <i />
            </span>
            <span>{wire.machine}</span>
          </div>
          <div className='wire-body'>
            {wire.lines.map((l, i) => (
              <div className='wire-line' key={i}>
                <p className='wire-prompt'>
                  <span className='wire-star'>✶</span>
                  <span className='wire-cmd' data-text={l.cmd}>
                    {l.cmd}
                  </span>
                </p>
                <p className='wire-out'>{l.out}</p>
              </div>
            ))}
            <p className='wire-prompt'>
              <span className='wire-star'>✶</span>
              <span className='wire-tail' aria-hidden='true'>
                ▮
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── SERVICES OFFERED (display advert) ───────── */
export function Services() {
  const { services } = CONTENT;
  return (
    <section className='pad' id='services'>
      <div className='wrap'>
        <SectionFront
          kicker={services.kicker}
          page={services.page}
          label={services.label}
          heading={services.heading}
        />
        <div className='advert reveal'>
          <div className='svc-list'>
            {services.items.map((s, i) => (
              <div className='svc-item' data-cursor key={s.title}>
                <span className='num'>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{s.title}</h3>
                  <span className='desc'>{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div className='advert-terms'>{services.terms}</div>
        </div>
      </div>
    </section>
  );
}

/* ───────── FEATURED DISPATCHES (work) ───────── */
export function Dispatches() {
  const { dispatches: d } = CONTENT;
  return (
    <section className='pad' id='dispatches'>
      <div className='wrap'>
        <SectionFront kicker={d.kicker} page={d.page} label={d.label} heading={d.heading} />
        <div className='dispatch-grid'>
          {d.projects.map((p) => (
            <a href={p.href} className='dispatch reveal' data-view key={p.name}>
              <span className='d-beat'>{p.beat}</span>
              <h3 className='d-headline'>{p.headline}</h3>
              <div className='d-photo'>
                <span className='ph'>{p.placeholder}</span>
              </div>
              <p className='d-deck'>{p.deck}</p>
              <div className='d-meta'>
                <span className='d-name'>{p.name}</span>
                <span>{p.year}</span>
              </div>
              <div className='d-tags'>
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
        <p className='dispatch-foot reveal'>{d.continued}</p>
      </div>
    </section>
  );
}

/* ───────── ON THIS DAY (experience) ───────── */
export function Chronicle() {
  const { chronicle: c } = CONTENT;
  return (
    <section className='pad' id='chronicle'>
      <div className='wrap'>
        <SectionFront kicker={c.kicker} page={c.page} label={c.label} heading={c.heading} />
        <div className='chronicle-list'>
          {c.items.map((item) => (
            <article className='chron-row reveal' key={`${item.company}-${item.period}`}>
              <div className='chron-date'>
                <span className='chron-period'>{item.period}</span>
                {item.current ? <span className='chron-now'>● Current</span> : null}
                {item.location ? <span className='chron-loc'>{item.location}</span> : null}
              </div>
              <div className='chron-body'>
                <h3 className='chron-role'>
                  {item.role}
                  <span className='chron-at'> of </span>
                  <span className='chron-company'>{item.company}</span>
                </h3>
                <p className='chron-blurb'>{item.blurb}</p>
                <div className='chron-tags'>
                  {item.tags.map((tg) => (
                    <span key={tg}>{tg}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── BY THE NUMBERS (almanac) ───────── */
export function Numbers() {
  const { numbers } = CONTENT;
  return (
    <section className='pad' id='numbers'>
      <div className='wrap'>
        <SectionFront
          kicker={numbers.kicker}
          page={numbers.page}
          label={numbers.label}
          heading={numbers.heading}
        />
        <div className='almanac reveal'>
          {numbers.items.map((s) => (
            <div className='fig' key={s.label}>
              <div className='n'>
                <span className='count' data-to={s.value}>
                  0
                </span>
                <span className='suf'>{s.suffix}</span>
              </div>
              <div className='lbl'>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── THE CLASSIFIEDS (with a hidden secret link) ───────── */
export function Classifieds() {
  const { classifieds: cl } = CONTENT;
  /** Render an ad body, splicing a disguised secret link over one word. */
  const renderBody = (ad: (typeof cl.ads)[number]) => {
    if (!('secret' in ad) || !ad.secret) return ad.body;
    const { word, href } = ad.secret;
    const idx = ad.body.indexOf(word);
    if (idx === -1) return ad.body;
    return (
      <>
        {ad.body.slice(0, idx)}
        <a
          className='cl-secret'
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          data-cursor
          title='…?'
        >
          {word}
        </a>
        {ad.body.slice(idx + word.length)}
      </>
    );
  };

  return (
    <section className='pad classifieds' id='classifieds'>
      <div className='wrap'>
        <SectionFront kicker={cl.kicker} page={cl.page} label={cl.label} heading={cl.heading} />
        <p className='cl-note reveal'>{cl.note}</p>
        <div className='cl-grid reveal'>
          {cl.ads.map((ad, i) => (
            <div className='cl-ad' key={i}>
              <div className='cl-cat'>{ad.cat}</div>
              <div className='cl-title'>{ad.title}</div>
              <p className='cl-body'>{renderBody(ad)}</p>
            </div>
          ))}
        </div>
        <p className='cl-hint reveal'>
          {cl.hint.split('“X”')[0]}
          <kbd>X</kbd>
          {cl.hint.split('“X”')[1] ?? ''}
        </p>
      </div>
    </section>
  );
}

/* ───────── CORRESPONDENCE (contact) ───────── */
export function Correspondence() {
  const { correspondence: c } = CONTENT;
  return (
    <section className='pad correspondence' id='correspondence'>
      <div className='wrap'>
        <SectionFront kicker={c.kicker} page={c.page} label={c.label} heading={c.heading} />
        <p className='corr-pre reveal'>{c.pre}</p>
        <p className='corr-cta reveal'>{c.cta}</p>
        <a
          href={`mailto:${c.email}`}
          className='corr-mail'
          id='contactMail'
          data-cursor
        >
          {[...c.email].map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </a>
        <div className='corr-socials reveal' id='socials'>
          {c.socials.map((s) => (
            <a key={s.label} href={s.href} data-cursor>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── COLOPHON (footer) ───────── */
export function Colophon() {
  const { colophon } = CONTENT;
  return (
    <footer>
      <div className='wrap'>
        <div className='row'>
          <Html as='p' html={colophon.left} />
          <Html as='p' html={colophon.center} />
          <a href='#top' className='totop'>
            Back to the front page ↑
          </a>
        </div>
        <p className='colophon-note'>{colophon.note}</p>
      </div>
    </footer>
  );
}
