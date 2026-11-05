import { useRef } from 'react';
import SectionHeader from '../ui/SectionHeader.jsx';
import { projects, projectLink } from '../../data/projects.js';

/** One project row. Hovering opens a preview with the project's video + preview text (from its meta). */
function HoverProjectRow({ p, last }) {
  const vid = useRef(null);
  const play = () => { const v = vid.current; if (v) { v.currentTime = 0; v.play().catch(() => {}); } };
  const stop = () => { const v = vid.current; if (v) v.pause(); };
  return (
    <li className={'hrow' + (last ? ' hrow-last' : '')} onMouseEnter={play} onMouseLeave={stop} onFocus={play} onBlur={stop}>
      <a href={projectLink(p)} className="pdl-prow">
        <span className="pdl-prow-num pdl-mono pdl-t-index">{p.number}</span>
        <span className="pdl-prow-main">
          <span className="pdl-prow-title pdl-t-row">{p.title}</span>
          <span className="pdl-prow-desc pdl-t-body">{p.description}</span>
        </span>
        <span className="pdl-prow-side">
          <span className="pdl-prow-role pdl-mono pdl-t-meta">{p.role}</span>
          <span className="pdl-prow-year">{p.year} →</span>
        </span>
      </a>
      <div className="hrow-panel" aria-hidden="true">
        <div className="hrow-inner">
          <div className="hrow-video">
            {p.video ? <video ref={vid} src={p.video} muted loop playsInline preload="metadata"></video> : <span className="pdl-mono pdl-t-index">{p.title} video</span>}
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

/** Blue band listing every project in src/data/projects.js. */
export default function FeaturedWork({ eyebrow, title, range }) {
  return (
    <section className="pdl-band">
      <div className="pdl-wrap fw">
        <SectionHeader eyebrow={eyebrow} title={title} tone="blue" />
        <div className="fw-range pdl-mono pdl-t-index">{range}</div>
        <ul className="pdl-rows">
          {projects.map((p, i) => <HoverProjectRow key={p.slug} p={p} last={i === projects.length - 1} />)}
        </ul>
      </div>
    </section>
  );
}
