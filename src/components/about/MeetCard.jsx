import { useState } from 'react';

/**
 * "What does he like?" card: title, blurb, note, and a small carousel of covers.
 * items: [{ title: 'Movie title', cover: '/images/about/movie-1.jpg' }]  (cover optional → grey slot)
 * Content lives in src/pages/About.jsx.
 */
export default function MeetCard({ k, n, blurb, note, items }) {
  const [i, setI] = useState(0);
  const m = items.length;
  const go = (d) => setI((x) => (x + d + m) % m);
  return (
    <div className="meet-card">
      <div className="meet-head">
        <span className="pdl-mono pdl-t-eyebrow">{n}</span>
        <h3 className="meet-k">{k}</h3>
        <p className="meet-p">{blurb}</p>
        {note && <p className="meet-p meet-note">{note}</p>}
      </div>
      <div className="meet-inner">
        <div className="meet-track" style={{ '--i': i }}>
          {items.map((it, j) => (
            <button type="button" key={j} className={'meet-item' + (j === i ? ' on' : '')} onClick={() => setI(j)} aria-label={it.title}>
              <span className="slot meet-cover">
                {it.cover ? <img src={it.cover} alt="" loading="lazy" /> : <span className="pdl-mono pdl-t-index">Cover</span>}
              </span>
              <span className="meet-cap pdl-mono pdl-t-eyebrow">{it.title}</span>
            </button>
          ))}
        </div>
        <div className="meet-ctrl">
          <button type="button" className="meet-arrow" onClick={() => go(-1)} aria-label={'Previous ' + k}>←</button>
          <div className="meet-dots">
            {items.map((_, j) => <button type="button" key={j} className={j === i ? 'on' : ''} onClick={() => setI(j)} aria-label={'Go to ' + (j + 1)}></button>)}
          </div>
          <button type="button" className="meet-arrow" onClick={() => go(1)} aria-label={'Next ' + k}>→</button>
        </div>
      </div>
    </div>
  );
}
