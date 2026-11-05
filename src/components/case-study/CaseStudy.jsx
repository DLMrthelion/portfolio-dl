import { useEffect, useState } from 'react';
import ImageSlot from '../ui/ImageSlot.jsx';
import { nextProject } from '../../data/projects.js';

/* ==========================================================================
   CASE STUDY BUILDING BLOCKS
   Used by every file in src/pages/case-studies/. You normally only edit those
   files — this one defines how the blocks look and behave.

   Page skeleton:
     <CaseStudyLayout meta={meta}>          title, cover, Role/Timeline/Team/Tools, "next project"
       <CsBlock n="01" label="THE CHALLENGE" title="…">…</CsBlock>
       <SolutionScreens wide="…" left="…" right="…" />
       <CaseSteps labels={['RESEARCH', …]}>   sticky progress bar + numbered steps
         <CsStep num={1} label="RESEARCH" title="…" head={<p>intro</p>}>
           <Figure n={1} image="…" caption="…" />
           <Pair> <p/> <p/> <StepImage size="half"/> <StepImage size="half"/> </Pair>
         </CsStep>
       </CaseSteps>
     </CaseStudyLayout>

   Text classes: "pdl-t-lead" = large intro text · "pdl-t-body" = normal text.
   Images: put files in public/images/<project>/ and write "/images/<project>/file.jpg".
   ========================================================================== */

/** Normalises "path" or { image, video, alt } into props for <ImageSlot>. */
const media = (x) => (typeof x === 'string' ? { image: x } : x || {});

/** Title area, cover image, Role/Timeline/Team/Tools table, then your sections, then the "next project" band. */
export function CaseStudyLayout({ meta, children }) {
  const next = nextProject(meta.slug);
  return (
    <>
      <article className="pdl-wrap" style={{ paddingBottom: 'calc(clamp(96px,8vw,160px) * var(--pace,1))' }}>
        <header className="page-head">
          <a href="/work" className="cs-back pdl-mono pdl-t-index">← All Projects</a>
          <p className="eyebrow pdl-mono pdl-t-eyebrow">[case study {meta.number}]</p>
          <h2 className="cs-title">{meta.title}</h2>
          <p className="pdl-t-lead lead">{meta.description}</p>
        </header>
        <ImageSlot className="slot cs-cover" label="Cover image · 16:7" image={meta.cover} video={meta.coverVideo} alt={meta.coverAlt} />
        <dl className="cs-meta">
          {meta.details.map((d) => (
            <div key={d.label} className={d.wide ? 'cs-meta-wide' : undefined}>
              <dt className="pdl-mono pdl-t-index">{d.label}</dt>
              <dd className="pdl-t-lead">{d.value}</dd>
            </div>
          ))}
        </dl>
        {children}
      </article>
      <section className="pdl-band">
        <a href={'/work/' + next.slug} className="pdl-wrap cs-next">
          <span style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="pdl-mono pdl-t-eyebrow">[next project]</span>
            <span className="cs-next-title">
              <span className="pdl-serif pdl-t-section">{next.title}</span>
              <span className="pdl-srow-arrow pdl-t-arrow" aria-hidden="true">→</span>
            </span>
          </span>
          <span className="pdl-t-body" style={{ maxWidth: 420 }}>{next.description}</span>
        </a>
      </section>
    </>
  );
}

/** Big two-column section: label + title on the left, content on the right.
 *  cls: "cs-solution" | "cs-reflection" | "cs-indepth" (blue band) for those variants. */
export function CsBlock({ n, label, eyebrow, title, cls, children }) {
  return (
    <section className={'cs-block' + (cls ? ' ' + cls : '')}>
      <div className="cs-block-head" style={{ gap: 10 }}>
        <p className="pdl-mono pdl-t-eyebrow" style={{ margin: 0 }}>{eyebrow || <>[{n} — {label}]</>}</p>
        <h2 className="pdl-serif pdl-t-section">{title}</h2>
      </div>
      <div className="cs-body">{children}</div>
    </section>
  );
}

/** Three solution screens under the Solution block: one wide, two half. Each: "/images/…" or { image | video, alt }. */
export function SolutionScreens({ wide, left, right }) {
  return (
    <div className="cs-screens">
      <ImageSlot className="slot wide" label="Solution screen · wide" {...media(wide)} />
      <ImageSlot className="slot half" label="Solution screen" {...media(left)} />
      <ImageSlot className="slot half" label="Solution screen" {...media(right)} />
    </div>
  );
}

/** Row of big numbers. items: [{ value, head?, text, source?, sourceUrl? }] */
export function Metrics({ items }) {
  return (
    <dl className="cs-metrics">
      {items.map((m) => (
        <div key={m.value}>
          <dt className="cs-metric-val">{m.value}</dt>
          {m.head && <dd className="cs-metric-head">{m.head}</dd>}
          <dd className="pdl-mono pdl-t-eyebrow">{m.text}</dd>
          {m.source && (
            <dd className="cs-metric-cite">{m.sourceUrl ? <a href={m.sourceUrl} target="_blank" rel="noreferrer">{m.source}</a> : m.source}</dd>
          )}
        </div>
      ))}
    </dl>
  );
}

/** Large blue italic pull quote. */
export function Pull({ style, children }) {
  return <blockquote className="cs-pull pdl-serif" style={style}>{children}</blockquote>;
}

/** Centred blue italic question/quote spanning both columns (use inside <Pair>). */
export function Quote({ children }) {
  return <blockquote className="cs-quote cs-step-full pdl-serif">{children}</blockquote>;
}

/* ---------------------------------- Steps ---------------------------------- */

/** Wraps the numbered steps and adds the progress bar (side rail on desktop, top bar on tablet).
 *  labels: one per step, in order. "\n" breaks a label onto two lines. */
export function CaseSteps({ labels, children }) {
  return (
    <div className="cs-body cs-steps-wrap">
      <CsProgress labels={labels} />
      {children}
    </div>
  );
}

function CsProgress({ labels }) {
  const n = labels ? labels.length : 5;
  const [pos, setPos] = useState(0);
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.5;
      const els = Array.from({ length: n }, (_, i) => document.getElementById('cs-step-' + (i + 1)));
      if (els.some((el) => !el)) return;
      let a = -1;
      els.forEach((el, i) => { if (el.getBoundingClientRect().top < mid) a = i; });
      let f = 0;
      if (a >= 0) { const r = els[a].getBoundingClientRect(); f = Math.min(1, Math.max(0, (mid - r.top) / r.height)); }
      setActive(a);
      setPos(a < 0 ? 0 : Math.min(n - 0.5, a + 0.5 + (a === n - 1 ? f * 0.5 : f)));
    };
    // Keeps --hdr = header height so the bar sticks just under the header.
    const header = document.querySelector('.site-header');
    const hdr = () => { if (header) document.documentElement.style.setProperty('--hdr', header.getBoundingClientRect().height + 'px'); };
    hdr();
    const ro = window.ResizeObserver && header ? new ResizeObserver(hdr) : null;
    if (ro) ro.observe(header);
    window.addEventListener('resize', hdr);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', hdr);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [n]);

  const go = (i) => {
    const el = document.getElementById('cs-step-' + (i + 1));
    if (!el) return;
    const bar = document.querySelector('.cs-prog');
    const side = window.matchMedia('(min-width:1101px)').matches;
    const hdrH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) || 66;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - (side ? 88 : hdrH) - (bar && !side ? bar.offsetHeight : 0) - 24, behavior: 'smooth' });
  };

  return (
    <nav className="cs-prog" aria-label="Case study steps">
      <div className="cs-prog-track"><div className="cs-prog-fill" style={{ '--p': pos / n }}></div></div>
      <ol>
        {Array.from({ length: n }, (_, i) => (
          <li key={i}>
            <button type="button" className={'cs-prog-dot' + (i <= active ? ' on' : '')} aria-current={i === active ? 'step' : undefined} onClick={() => go(i)}>
              <span className="cs-prog-num">{i + 1}</span>
              <span className="cs-prog-label">{labels ? labels[i] : <>Title #{i + 1}</>}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * One numbered step.  num = its position (1, 2, 3…) — must match the progress bar order.
 * head = what goes under the title (intro text, buttons…). children = everything below.
 */
export function CsStep({ num, label, title = 'Section title', accent, head, children }) {
  return (
    <section className="cs-step" id={'cs-step-' + num}>
      <header className="cs-step-head">
        <p className="pdl-mono pdl-t-eyebrow" style={accent ? { color: accent } : undefined}>{label ? '[' + label + ']' : '[Step ' + num + ']'}</p>
        <h2 className="pdl-t-row">{title}</h2>
        {head}
      </header>
      {children}
    </section>
  );
}

const SLOT_LABELS = {
  wide: (n) => `key screen 0${n} — full bleed, 2400×920`,
  half: (n) => `key screen 0${n} — detail, 1200×920`,
  portrait: () => 'portrait 3:4',
};

/** Image inside a step. size: "wide" (2400×920) | "half" (1200×920) | "portrait" (3:4). n only feeds the placeholder label. */
export function StepImage({ size = 'wide', n, image, video, alt }) {
  return <ImageSlot className={'cs-step-slot ' + size} labelClassName="pdl-mono" label={SLOT_LABELS[size](n)} image={image} video={video} alt={alt} />;
}

export const DEFAULT_CAPTION = 'Caption: the one decision this screen is evidence of.';

/** Full-width image + caption. Pass `ratio` (e.g. "4 / 3") to show a photo at its own shape instead of the wide slot. */
export function Figure({ n, image, video, alt = '', ratio, caption = DEFAULT_CAPTION }) {
  return (
    <figure className="cs-step-fig">
      {ratio && image ? (
        <img src={image} alt={alt} style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: ratio, objectFit: 'cover' }} />
      ) : (
        <StepImage size="wide" n={n} image={image} video={video} alt={alt} />
      )}
      <figcaption className="pdl-mono">{caption}</figcaption>
    </figure>
  );
}

/** Two-column grid inside a step (stacks on phones). Add className "cs-step-full" to a child to span both columns. */
export function Pair({ style, children }) {
  return <div className="cs-step-pair" style={style}>{children}</div>;
}
