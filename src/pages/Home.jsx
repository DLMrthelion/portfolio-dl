import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, SectionHeader } from '../components/GlobalComponents.jsx';
import HeroGradient from '../components/HeroGradient.jsx';
import { approach, resumeUrl, services, testimonials } from '../data/site.js';
import { projects, projectLink } from '../data/projects.js';
import { asset } from '../lib/asset.js';

/* ==========================================================================
   HOME PAGE  —  address: /
   Sections, top to bottom (search the name to jump):
     HERO → FEATURED WORK → TESTIMONIALS → WORK APPROACH → SERVICES
   • Project rows: src/data/projects.js + each case study's `meta`
   • Testimonials, approach columns and services list: src/data/site.js
   • SERVICES is also shown on About (it's exported at the bottom).
   • Background: <HeroGradient /> (live WebGL gradient behind the whole page).
     On this page the blue bands turn cream (.home .pdl-band in design-system.css).
   ========================================================================== */

/* ---------------------------------- HERO ---------------------------------- */

// ✏️ EDIT: the two blue italic phrases in the headline. They type out one after the other.
const TYPE_A = 'products and stories';
const TYPE_B = 'make a\u00a0difference.'; // \u00a0 keeps "a difference." on one line
const TYPE_PAUSE = 10;   // ticks to wait between the two phrases
const TYPE_SPEED = 65;   // ms per letter

/** Typewriter: untyped letters stay in place (invisible) so the headline never reflows. */
function useTypewriter() {
  const offB = TYPE_A.length + TYPE_PAUSE;
  const total = offB + TYPE_B.length;
  const still = useMemo(() => window.matchMedia('(prefers-reduced-motion:reduce)').matches, []);
  const [n, setN] = useState(still ? total : 0);
  useEffect(() => {
    if (still) return undefined;
    let id = 0;
    const start = setTimeout(() => {
      id = setInterval(() => setN((v) => { if (v + 1 >= total) clearInterval(id); return Math.min(total, v + 1); }), TYPE_SPEED);
    }, 500);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [still, total]);
  const type = (text, offset, last) => {
    const typed = Math.max(0, Math.min(text.length, n - offset));
    const caret = !still && (last ? n >= offB : n < offB);
    return <>{text.slice(0, typed)}{caret && <span className="tw-caret" aria-hidden="true" />}<span className="tw-rest" aria-hidden="true">{text.slice(typed)}</span></>;
  };
  return { a: type(TYPE_A, 0), b: type(TYPE_B, offB, true) };
}

function Hero() {
  const tw = useTypewriter();
  return (
    <section className="pdl-wrap hero">
      <div className="hero-copy">
        {/* ✏️ EDIT: headline. The blue italic phrases are TYPE_A / TYPE_B above; keep aria-label in sync. */}
        <h1 className="pdl-t-display" aria-label={`I create ${TYPE_A} that connect people and ${TYPE_B.replace('\u00a0', ' ')}`}>
          I create <span className="pdl-serif" style={{ color: 'var(--blue)', letterSpacing: '-0.68px' }}>{tw.a}</span>{' '}
          <span>that connect people and <span className="pdl-serif" style={{ color: 'var(--blue)', letterSpacing: '-0.68px' }}>{tw.b}</span></span>
        </h1>
        {/* ✏️ EDIT: intro line */}
        <p className="pdl-t-lead">Product designer &amp; storyteller.<br />A curious mind exploring the intersection of people, technology, and creativity</p>
        <div className="hero-cta" style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button href="/contact">Chat with Me</Button>
          <a href={asset(resumeUrl) || '#resume'} target="_blank" rel="noopener" className="pdl-t-meta link-meta">Resume</a>
        </div>
      </div>
      <p className="pdl-t-meta hero-scroll">Scroll down to see more<span className="hero-scroll-ar" aria-hidden="true">↓</span></p>
    </section>
  );
}

/* ------------------------------ FEATURED WORK ------------------------------ */

const HOVER_MQ = '(hover:hover) and (min-width:641px)';

/**
 * One project row. Click/tap opens the project.
 * Desktop & tablet (hover-capable, wider than a phone): hovering opens a preview with the
 * project's video + preview text (from its meta). Phones get no preview.
 */
function HoverProjectRow({ p, last }) {
  const vid = useRef(null);
  const play = () => { const v = vid.current; if (v && window.matchMedia(HOVER_MQ).matches) { v.currentTime = 0; v.play().catch(() => {}); } };
  const stop = () => { const v = vid.current; if (v) v.pause(); };
  return (
    <li className={'hrow' + (last ? ' hrow-last' : '')} onMouseEnter={play} onMouseLeave={stop} onFocus={play} onBlur={stop}>
      <a href={projectLink(p)} className="pdl-prow">
        <span className="pdl-prow-num pdl-mono pdl-t-index">{p.number}</span>
        <span className="pdl-prow-main">
          <span className="pdl-prow-title pdl-t-row">{p.title}</span>
          <span className="pdl-prow-desc pdl-t-body">
            {p.short ? <><span className="d-long">{p.description}</span><span className="d-short">{p.short}</span></> : p.description}
          </span>
        </span>
        <span className="pdl-prow-side">
          <span className="pdl-prow-role pdl-mono pdl-t-meta">{p.role}</span>
          <span className="pdl-prow-year">{p.year} →</span>
        </span>
      </a>
      <div className="hrow-panel" aria-hidden="true">
        <div className="hrow-inner">
          <div className="hrow-video">
            {p.video ? <video ref={vid} src={asset(p.video)} muted loop playsInline preload="metadata"></video> : <span className="pdl-mono pdl-t-index">{p.title} video</span>}
          </div>
          <div className="hrow-copy">
            {(p.preview || []).map((t, i) => (
              <p key={i} className="pdl-t-body">{p.href ? <a href={p.href} tabIndex={-1} className="hrow-egg">{t}</a> : t}</p>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

function FeaturedWork() {
  return (
    <section className="pdl-band">
      <div className="pdl-wrap fw">
        {/* ✏️ EDIT: heading */}
        <SectionHeader eyebrow="[cool projects here]" title="Featured Work" tone="blue" />
        <ul className="pdl-rows">
          {projects.map((p, i) => <HoverProjectRow key={p.slug} p={p} last={i === projects.length - 1} />)}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ TESTIMONIALS ------------------------------- */

/** One testimonial: big serif quote mark, quote, avatar + name + position. */
function TestimonialCard({ quote, name, position, avatarSrc }) {
  return (
    <figure className="pdl-card pdl-card-blue">
      <div className="pdl-card-body">
        <span className="pdl-card-mark" aria-hidden="true">“</span>
        <blockquote className="pdl-t-quote">{quote}</blockquote>
      </div>
      <figcaption>
        {avatarSrc ? <img src={asset(avatarSrc)} alt={name} width={50} height={50} className="pdl-avatar" /> : <span className="pdl-avatar" aria-hidden="true" />}
        <span>
          <span className="pdl-card-name">{name}</span>
          <span className="pdl-card-pos">{position}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** "position" text: first line plain, the rest becomes a link to the company (if url is set). */
function Position({ t }) {
  if (!t.url) return t.position;
  const [first, ...rest] = t.position.split('\n');
  return <>{first}{'\n'}<a href={t.url} target="_blank" rel="noopener" className="tq-co">{rest.join(' ')}</a></>;
}

/** Draggable / arrow-controlled carousel of testimonial cards. */
function Testimonials() {
  const track = useRef(null);
  const drag = useRef(null);
  const [pos, setPos] = useState({ idx: 0, atStart: true, atEnd: false });
  const step = () => { const el = track.current; const c = el.children[0]; return c ? c.getBoundingClientRect().width + 30 : el.clientWidth; };
  const update = () => {
    const el = track.current; if (!el) return;
    setPos({ idx: Math.round(el.scrollLeft / step()), atStart: el.scrollLeft < 4, atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };
  useEffect(() => { update(); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update); }, []);
  const by = (d) => track.current.scrollBy({ left: d * step(), behavior: 'smooth' });
  const onDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
    track.current.classList.add('dragging');
    track.current.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    const d = drag.current; if (!d) return;
    const dx = e.clientX - d.x; if (Math.abs(dx) > 4) d.moved = true;
    track.current.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    const d = drag.current; if (!d) return;
    drag.current = null;
    const el = track.current; const s = step();
    const target = Math.round(el.scrollLeft / s) * s;
    el.classList.remove('dragging');
    el.scrollTo({ left: target, behavior: 'smooth' });
  };
  const visible = Math.max(1, Math.round((track.current ? track.current.clientWidth + 30 : 1) / (track.current ? step() : 1)));
  const pages = Math.max(1, testimonials.length - visible + 1);

  return (
    <section className="pdl-wrap sec" aria-roledescription="carousel" aria-label="Testimonials">
      {/* ✏️ EDIT: heading */}
      <SectionHeader eyebrow="[Beautiful Words]" title="Testimonials" />
      <div className="tcar">
        <div ref={track} className="tcar-track" onScroll={update} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
          onKeyDown={(e) => { if (e.key === 'ArrowRight') by(1); if (e.key === 'ArrowLeft') by(-1); }} tabIndex={0}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} name={t.name} avatarSrc={t.avatar} position={<Position t={t} />}
              quote={Array.isArray(t.quote) ? t.quote.map((q, k) => <span key={k} className="tq-para">{q}</span>) : t.quote} />
          ))}
        </div>
        <div className="tcar-bar">
          <span className="pdl-mono pdl-t-index" aria-live="polite">{String(Math.min(pos.idx + 1, pages)).padStart(2, '0')} / {String(pages).padStart(2, '0')}</span>
          <div className="tcar-btns">
            <Button variant="outline" aria-label="Previous testimonials" disabled={pos.atStart} onClick={() => by(-1)}>←</Button>
            <Button variant="outline" aria-label="Next testimonials" disabled={pos.atEnd} onClick={() => by(1)}>→</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ WORK APPROACH ------------------------------ */

function Approach() {
  return (
    <section className="pdl-wrap sec" style={{ paddingTop: 0 }}>
      {/* ✏️ EDIT: heading (columns live in src/data/site.js → approach) */}
      <SectionHeader eyebrow="[WORK VALUES]" title="My Work Approach" />
      <div className="appr-grid">
        {approach.map((a, i) => (
          <div key={i} className="appr-item">
            <h3 className="pdl-t-approach" style={{ fontWeight: 500 }}><span>{a.title}</span></h3>
            <p className="pdl-t-lead">{a.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- SERVICES --------------------------------- */

/** One service row: number, title, description and a large → that nudges on hover. */
function ServiceRow({ number, title, description, href = '#' }) {
  return (
    <a href={href} className="pdl-srow">
      <span className="pdl-srow-num pdl-mono pdl-t-index">{number}</span>
      <span className="pdl-srow-main">
        <span className="pdl-srow-title pdl-t-row">{title}</span>
        <span className="pdl-srow-desc pdl-t-body">{description}</span>
      </span>
      <span className="pdl-srow-arrow pdl-t-arrow" aria-hidden="true">→</span>
    </a>
  );
}

/** "My Services" blue band — also used on About. Each row opens Contact with that service pre-selected. */
export function Services() {
  return (
    <section className="pdl-band">
      <div className="pdl-wrap svc">
        {/* ✏️ EDIT: heading + note (list lives in src/data/site.js → services) */}
        <SectionHeader eyebrow="[MY SERVICES]" title="Design Solutions, Tailored for you." tone="blue" />
        <p className="pdl-t-lead svc-note">
          All services are offered in Spanish, English, and Portuguese. Not finding what you are looking for?<br />
          I’m sure we can work something out. <a href="/contact">Contact me</a>
        </p>
        <div className="svc-list">
          {services.map((s) => <ServiceRow key={s.number} {...s} href={'/contact?s=' + encodeURIComponent(s.title)} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- PAGE ----------------------------------- */

export default function Home() {
  return (
    <div className="home">
      <HeroGradient />
      <Hero />
      <FeaturedWork />
      <Testimonials />
      <Approach />
      <Services />
    </div>
  );
}
