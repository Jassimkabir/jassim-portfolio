import { CONTENT } from '@/content/site';
import { Html, wrapWords } from '@/lib/text';

export function Hero() {
  const { hero } = CONTENT;
  return (
    <section className='hero' id='home'>
      <div className='blobs'>
        <div className='blob b1' data-speed='0.3' />
        <div className='blob b2' data-speed='0.5' />
        <div className='blob b3' data-speed='0.2' />
      </div>
      <div className='wrap hero-inner'>
        <div className='standfirst reveal'>
          <span className='avail'>
            <span className='dot' />
            <span>{hero.available}</span>
          </span>
          <p>{hero.intro}</p>
        </div>
        <h1>
          {hero.titleLines.map((line, i) => (
            <span className='ln' key={i}>
              <Html className='lnInner' as='span' html={line} />
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}

export function Marquee() {
  // doubled for a seamless loop
  const items = [...CONTENT.marquee, ...CONTENT.marquee];
  return (
    <div className='marquee' id='marquee'>
      <div className='marq-skew'>
        <div className='track'>
          {items.map((m, i) => (
            <span
              key={i}
              style={{ display: 'inline-flex', gap: 46, alignItems: 'center' }}
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

export function About() {
  const { about } = CONTENT;
  return (
    <section className='pad about' id='about'>
      <div className='wrap'>
        <span className='eyebrow reveal'>
          <b>01</b> <span>{about.label}</span>
        </span>
        <Html
          as='p'
          className='big'
          html={wrapWords(about.big)}
          id='aboutBig'
          style={{ marginTop: 28 }}
        />
        <div className='about-grid'>
          <div className='col reveal'>
            {about.colA.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className='col reveal'>
            <div>
              {about.colB.map((p, i) => (
                <Html as='p' key={i} html={p} />
              ))}
            </div>
            <div className='about-tags'>
              {about.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Terminal() {
  const { terminal: t } = CONTENT;
  const prompt = (
    <>
      <span className='term-user'>
        {t.user}@{t.host}
      </span>
      <span className='term-path'>:{t.dir}</span>
      <span className='term-dollar'>$</span>
    </>
  );
  return (
    <section className='pad' id='terminal'>
      <div className='wrap'>
        <div className='sec-head'>
          <Html as='h2' className='reveal' html={t.heading} />
          <span className='eyebrow reveal'>
            <b>02</b> <span>{t.label}</span>
          </span>
        </div>
        <div className='term reveal' id='term'>
          <div className='term-bar'>
            <span className='term-dots' aria-hidden='true'>
              <i />
              <i />
              <i />
            </span>
            <span className='term-title'>
              {t.user}@{t.host}: {t.dir}
            </span>
          </div>
          <div className='term-body'>
            {t.lines.map((l, i) => (
              <div className='term-line' key={i}>
                <p className='term-prompt'>
                  {prompt}
                  <span className='term-cmd' data-text={l.cmd}>
                    {l.cmd}
                  </span>
                </p>
                <p className='term-out'>{l.out}</p>
              </div>
            ))}
            <p className='term-prompt term-tail'>
              {prompt}
              <span className='term-blink' aria-hidden='true'>
                ▮
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const { services } = CONTENT;
  return (
    <section className='pad' id='services'>
      <div className='wrap'>
        <div className='sec-head'>
          <Html as='h2' className='reveal' html={services.heading} />
          <span className='eyebrow reveal'>
            <b>03</b> <span>{services.label}</span>
          </span>
        </div>
        <div className='svc-list'>
          {services.items.map((s, i) => (
            <div className='svc-item reveal' data-cursor key={s.title}>
              <span className='num'>{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <span className='desc'>{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work() {
  const { work } = CONTENT;
  return (
    <section className='pad' id='work'>
      <div className='wrap'>
        <div className='sec-head'>
          <Html as='h2' className='reveal' html={work.heading} />
          <span className='eyebrow reveal'>
            <b>04</b> <span>{work.label}</span>
          </span>
        </div>
        <div className='work-grid'>
          {work.projects.map((p) => (
            <a href={p.href} className='proj reveal' data-view key={p.name}>
              <div className='frame'>
                <div
                  className='glow'
                  style={{ '--c1': p.c1, '--c2': p.c2 } as React.CSSProperties}
                />
                <div className='ph'>{p.placeholder}</div>
              </div>
              <div className='meta'>
                <h3>{p.name}</h3>
                <span className='yr'>{p.year}</span>
              </div>
              <div className='tags'>
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const { experience: xp } = CONTENT;
  return (
    <section className='pad' id='experience'>
      <div className='wrap'>
        <div className='sec-head'>
          <Html as='h2' className='reveal' html={xp.heading} />
          <span className='eyebrow reveal'>
            <b>05</b> <span>{xp.label}</span>
          </span>
        </div>
        <div className='xp-list'>
          {xp.items.map((item) => (
            <article className='xp-row reveal' key={`${item.company}-${item.period}`}>
              <div className='xp-date'>
                <span className='xp-period'>{item.period}</span>
                {item.current ? <span className='xp-now'>● current</span> : null}
                {item.location ? <span className='xp-loc'>{item.location}</span> : null}
              </div>
              <div className='xp-body'>
                <h3 className='xp-role'>
                  {item.role}
                  <span className='xp-at'> @ </span>
                  <span className='xp-company'>{item.company}</span>
                </h3>
                <p className='xp-blurb'>{item.blurb}</p>
                <div className='xp-tags'>
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

export function Stats() {
  const { stats } = CONTENT;
  return (
    <section className='pad' id='stats'>
      <div className='wrap'>
        <span
          className='eyebrow reveal'
          style={{ marginBottom: 50, display: 'inline-flex' }}
        >
          <b>06</b> <span>{stats.label}</span>
        </span>
        <div className='stats'>
          {stats.items.map((s) => (
            <div className='stat reveal' key={s.label}>
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

export function Contact() {
  const { contact } = CONTENT;
  return (
    <section className='pad contact' id='contact'>
      <div className='wrap'>
        <span className='eyebrow reveal'>
          <b>07</b> <span>{contact.label}</span>
        </span>
        <p className='pre reveal' style={{ marginTop: 24 }}>
          {contact.pre}
        </p>
        <a
          href={`mailto:${contact.email}`}
          className='mail'
          id='contactMail'
          data-cursor
        >
          {[...contact.email].map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </a>
        <div className='socials reveal' id='socials'>
          {contact.socials.map((s) => (
            <a key={s.label} href={s.href} data-cursor>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { footer } = CONTENT;
  return (
    <footer>
      <div className='wrap row'>
        <Html as='p' html={footer.left} />
        <Html as='p' html={footer.center} />
        <a href='#top' className='totop'>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
