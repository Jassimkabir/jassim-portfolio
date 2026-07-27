import { CONTENT } from '@/content/site';
import { Html, wrapWords } from '@/lib/text';
import { RetroComputer, ServerRack, Wireframe } from './Illustrations';
import CodeClip from './CodeClip';
import ResumeActions from './ResumeActions';

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
      <p className='plate-descriptor reveal'>{paper.descriptor}</p>
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
            <span className='role'>{lead.role}</span>
          </div>
          <div className='lead-body col-reveal'>
            <p className='dropcap'>
              <span className='dateline'>{lead.dateline} </span>
              {lead.lead}
            </p>
            {lead.body.map((p, i) => (
              <Html as='p' key={i} html={p} />
            ))}
            <p className='continued'>{lead.continued}</p>
          </div>
        </div>

        <aside className='front-aside'>
          <figure className='ill-box reveal ht-reveal'>
            <RetroComputer />
            <figcaption className='cap'>
              Fig. 1 — The newsroom rig, mid-compile, cursor still blinking.
            </figcaption>
          </figure>
          <div className='notice reveal'>
            <div className='n-top'>✶ Situations Vacant ✶</div>
            <div className='n-main'>{lead.stamp}</div>
            <div className='n-sub'>{lead.role} · commissions open.</div>
            <span className='stamp'>Approved</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ───────── BREAKING NEWS ticker (latest commits / status) ───────── */
export function Breaking() {
  const { breaking } = CONTENT;
  const items = [...breaking.items, ...breaking.items];
  return (
    <div className='ticker breaking' id='marquee'>
      <span className='ticker-tag'>{breaking.label}</span>
      <div className='marq-skew'>
        <div className='track'>
          {items.map((m, i) => (
            <span
              key={i}
              style={{ display: 'inline-flex', gap: 26, alignItems: 'center' }}
            >
              <span className='item'>{m}</span>
              <span className='star'>◆</span>
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
  heading,
}: {
  kicker: string;
  page: string;
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
        <SectionFront kicker={ed.kicker} page={ed.page} heading={ed.heading} />
        <Html as='p' className='ed-lede' html={wrapWords(ed.lede)} id='edLede' />
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

/* ───────── FEATURE ARTICLES / technical editorials (work) ───────── */
export function Features() {
  const { features: f } = CONTENT;
  const lead = f.lead;
  return (
    <section className='pad' id='features'>
      <div className='wrap'>
        <SectionFront kicker={f.kicker} page={f.page} heading={f.heading} />

        {/* the lead feature — a full case study */}
        <article className='feature'>
          <div className='feature-head reveal'>
            <span className='d-beat'>{lead.beat}</span>
            <h3 className='feature-headline'>{lead.headline}</h3>
            <p className='feature-deck'>{lead.deck}</p>
            <div className='feature-byline'>
              <span>{lead.byline}</span>
              <span>{lead.year}</span>
            </div>
          </div>

          <div className='feature-grid'>
            <div className='feature-body col-reveal'>
              <p className='dropcap'>{lead.dropcap}</p>
              {lead.sections.map((s) => (
                <div className='feature-sec' key={s.h}>
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                </div>
              ))}
              <div className='feature-tags'>
                {lead.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            <aside className='feature-aside'>
              <figure className='ill-box reveal ht-reveal'>
                <Wireframe />
                <figcaption className='cap'>
                  Fig. 2 — Wireframe, before the pixels moved in.
                </figcaption>
              </figure>
              <div className='reveal'>
                <CodeClip
                  source={lead.code.source}
                  lang={lead.code.lang}
                  caption={lead.code.caption}
                />
              </div>
            </aside>
          </div>
        </article>

        {/* secondary stories */}
        <div className='story-grid'>
          {f.stories.map((p) => (
            <a href={p.href} className='story reveal' data-view key={p.name}>
              <span className='d-beat'>{p.beat}</span>
              <h3 className='story-headline'>{p.headline}</h3>
              <div className='d-photo ht-reveal'>
                <span className='ph'>{p.placeholder}</span>
              </div>
              <p className='story-deck'>{p.deck}</p>
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
        <p className='dispatch-foot reveal'>{f.continued}</p>
      </div>
    </section>
  );
}

/* ───────── THE TECH DESK — stack "listings" ───────── */
export function TechStack() {
  const { stack } = CONTENT;
  const trendGlyph = (t: string) => (t === 'up' ? '▲' : t === 'watch' ? '◆' : '▬');
  return (
    <section className='pad' id='stack'>
      <div className='wrap'>
        <SectionFront kicker={stack.kicker} page={stack.page} heading={stack.heading} />
        <p className='cl-note reveal' style={{ fontFamily: 'var(--mono)' }}>
          {stack.note}
        </p>

        <div className='tech-grid'>
          <div className='listings reveal'>
            <div className='listings-head'>
              <span>Sym</span>
              <span>Technology</span>
              <span>Sector</span>
              <span className='ta-r'>Trend</span>
            </div>
            {stack.listings.map((l) => (
              <div className='listing-row' key={l.sym}>
                <span className='l-sym'>{l.sym}</span>
                <span className='l-name'>{l.name}</span>
                <span className='l-sector'>{l.sector}</span>
                <span className={`l-trend ta-r t-${l.trend}`}>
                  {trendGlyph(l.trend)}
                </span>
              </div>
            ))}
          </div>

          <aside className='tech-aside'>
            <figure className='ill-box reveal ht-reveal'>
              <ServerRack />
              <figcaption className='cap'>Fig. 3 — Racks humming, LEDs blinking.</figcaption>
            </figure>
            <div className='desk-box reveal'>
              <h4 className='desk-h'>{stack.desk.h}</h4>
              <ul className='desk-list'>
                {stack.desk.items.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
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
        <SectionFront kicker={c.kicker} page={c.page} heading={c.heading} />
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
        <SectionFront kicker={numbers.kicker} page={numbers.page} heading={numbers.heading} />
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

/* ───────── THE CLASSIFIEDS (availability, résumé & a hidden link) ───────── */
export function Classifieds() {
  const { classifieds: cl } = CONTENT;
  const a = cl.availability;
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
        <SectionFront kicker={cl.kicker} page={cl.page} heading={cl.heading} />

        {/* headline availability advert */}
        <div className='avail reveal'>
          <div className='avail-badge'>{a.status}</div>
          <div className='avail-main'>
            <h3 className='avail-title'>{a.title}</h3>
            <p className='avail-body'>{a.body}</p>
          </div>
          <ResumeActions />
        </div>

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
        <SectionFront kicker={c.kicker} page={c.page} heading={c.heading} />
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
