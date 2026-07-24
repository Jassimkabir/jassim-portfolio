import Image from 'next/image';
import { CONTENT } from '@/content/site';
import { Html, wrapWords } from '@/lib/text';

export function Hero() {
  const { hero, name } = CONTENT;
  return (
    <section className='hero' id='home'>
      <div className='blobs'>
        <div className='blob b1' data-speed='0.3' />
        <div className='blob b2' data-speed='0.5' />
        <div className='blob b3' data-speed='0.2' />
      </div>
      <div className='wrap hero-inner'>
        <div className='hero-copy'>
          <span className='avail reveal'>
            <span className='dot' />
            <span>{hero.available}</span>
          </span>
          <h1>
            {hero.titleLines.map((line, i) => (
              <span className='ln' key={i}>
                <Html className='lnInner' as='span' html={line} />
              </span>
            ))}
          </h1>
          <p className='hero-lead reveal'>{hero.intro}</p>
          <div className='hero-cta reveal'>
            <a href='#work' className='cta-btn' data-cursor>
              ▶ View work
            </a>
            <a href='#terminal' className='cta-btn ghost' data-cursor>
              ⌨ Open terminal
            </a>
          </div>
        </div>
      </div>

      {/* 8-bit portrait — rises from the bottom-left corner, feathered into
          the hero. Direct child of .hero so it anchors to the real corner. */}
      <div className='hero-portrait reveal'>
        <div className='portrait-wrap'>
          <Image
            src='/images/jassim-8bit.png'
            alt={`8-bit pixel-art portrait of ${name}`}
            fill
            priority
            sizes='(max-width: 940px) 78vw, 46vw'
            className='portrait-img'
          />
        </div>
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
          <b>CH.01</b> <span>{about.label}</span>
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

export function Services() {
  const { services } = CONTENT;
  return (
    <section className='pad' id='services'>
      <div className='wrap'>
        <div className='sec-head'>
          <Html as='h2' className='reveal' html={services.heading} />
          <span className='eyebrow reveal'>
            <b>CH.04</b> <span>{services.label}</span>
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
            <b>CH.05</b> <span>{work.label}</span>
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
            <b>CH.06</b> <span>{xp.label}</span>
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
          <b>CH.07</b> <span>{stats.label}</span>
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
          <b>CH.09</b> <span>{contact.label}</span>
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
