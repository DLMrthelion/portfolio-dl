import { useEffect, useRef, useState } from 'react';
import SectionHeader from '../ui/SectionHeader.jsx';
import TestimonialCard from '../ui/TestimonialCard.jsx';
import Button from '../ui/Button.jsx';
import { testimonials } from '../../data/site.js';

/** "position" text: first line plain, the rest becomes a link to the company (if url is set). */
function Position({ t }) {
  if (!t.url) return t.position;
  const [first, ...rest] = t.position.split('\n');
  return <>{first}{'\n'}<a href={t.url} target="_blank" rel="noopener" className="tq-co">{rest.join(' ')}</a></>;
}

/** Draggable / arrow-controlled carousel of testimonial cards. Content: src/data/site.js → testimonials */
export default function Testimonials({ eyebrow, title }) {
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
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="tcar">
        <div ref={track} className="tcar-track" onScroll={update} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
          onKeyDown={(e) => { if (e.key === 'ArrowRight') by(1); if (e.key === 'ArrowLeft') by(-1); }} tabIndex={0}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} tone="blue" name={t.name} avatarSrc={t.avatar} position={<Position t={t} />}
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
