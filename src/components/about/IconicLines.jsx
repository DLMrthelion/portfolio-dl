import { useState } from 'react';

/**
 * "Iconic Lines!!" quote carousel with a like (♥) button.
 * lines: [{ q, who, where, reply?: [question, answer], sq?, l? }]  — content lives in src/pages/About.jsx.
 *   reply → shows a two-line back-and-forth under the quote
 *   sq    → square (not rounded) reply bubble
 *   l     → reply aligned left in blue, no bubble
 * Likes are only remembered until the page reloads.
 */
export default function IconicLines({ eyebrow, title, intro, lines }) {
  const [i, setI] = useState(0);
  const [votes, setVotes] = useState({});
  const m = lines.length;
  const go = (d) => setI((x) => (x + d + m) % m);
  const L = lines[i];
  const v = votes[i];
  return (
    <section className="pdl-wrap abx">
      <div className="abx-copy">
        <p className="eyebrow pdl-mono pdl-t-eyebrow">{eyebrow}</p>
        <h2 className="pdl-t-section abx-title">{title}</h2>
        <p className="pdl-t-lead">{intro}</p>
      </div>
      <div className="abx-body" key={i}>
        <blockquote className={'cs-pull pdl-serif' + (L.reply ? ' has-reply' : '')}>
          {L.q}
          {L.reply && (
            <>
              <span className={'abx-ask' + (L.sq ? ' sq' : '') + (L.l ? ' l' : '')}>{L.reply[0]}</span>
              <span className={'abx-ans' + (L.ansRight ? ' r' : '')}>{L.reply[1]}</span>
            </>
          )}
        </blockquote>
        <dl className="abx-notes">
          <div><dt className="pdl-mono pdl-t-eyebrow">Who:</dt><dd>{L.who}</dd></div>
          <div><dt className="pdl-mono pdl-t-eyebrow">Where:</dt><dd>{L.where}</dd></div>
        </dl>
        <div className="abx-ctrl">
          <button type="button" className="meet-arrow" onClick={() => go(-1)} aria-label="Previous line">←</button>
          <div className="abx-votes">
            <button type="button" className={'abx-vote abx-heart' + (v ? ' on' : '')} aria-pressed={!!v} aria-label="Like this line" onClick={() => setVotes({ ...votes, [i]: !v })}>
              <span className="abx-heart-ic" aria-hidden="true">{v ? '♥' : '♡'}</span>
              <span className="abx-heart-n">{v ? 1 : 0}</span>
            </button>
          </div>
          <span className="pdl-mono pdl-t-eyebrow abx-count">{i + 1} / {m}</span>
          <button type="button" className="meet-arrow" onClick={() => go(1)} aria-label="Next line">→</button>
        </div>
      </div>
    </section>
  );
}
