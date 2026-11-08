import { useState } from 'react';
import { Button, ImageSlot } from '../components/GlobalComponents.jsx';
import { Services } from './Home.jsx';
import { resumeUrl } from '../data/site.js';
import { asset } from '../lib/asset.js';

/* ==========================================================================
   ABOUT PAGE  —  address: /about
   Sections: Intro + portrait → "What does he like?" → Iconic Lines → Services
   All About-only content is at the top of this file. Images go in public/images/about/.
   ========================================================================== */

// ✏️ EDIT: your portrait (4:5). Leave '' for the grey placeholder.
const PORTRAIT = { image: '', alt: 'Portrait of David Leon' };

// ✏️ EDIT: "What does he like?" cards. `cover` is optional, e.g. '/images/about/movie-1.jpg'.
const LIKES = [
  {
    k: 'Movies',
    n: '01',
    blurb: <>Here are some of the top movies from what I’ve watched so far.</>,
    note: <><a href="#" target="_blank" rel="noreferrer">Check my Letterboxd</a><br /><span className="meet-sm">(Hidden gems? Message me.)</span></>,
    items: [
      { title: 'Cinema Paradiso', cover: '/images/about/Poster1.webp' },
      { title: 'Inglorious Basterds', cover: '/images/about/Poster2.webp' },
      { title: 'La vita è bella', cover: '/images/about/Poster3.webp' },
      { title: 'La La Land', cover: '/images/about/Poster4.webp' },
      { title: 'Cyberpunk', cover: '/images/about/Poster5.webp' },
    ],
  },
  {
    k: 'Music',
    n: '02',
    blurb: <>From Spanish trap, rap, and cumbia, to Sinatra and Andrea Bocelli. From Biggie, 2pac, & Ice Cube to Mademoiselle Edith Piaf and Joe Dassin to Stan Getz.</>,
    note: <><a href="#" target="_blank" rel="noreferrer">Check my Spotify</a><br /><span className="meet-sm">(Taking song suggestions! Message me.)</span></>,
    items: [
      { title: 'Getz/Gilberto', cover: '/images/about/album1.webp' },
      { title: '2Pac Greatest hits', cover: '/images/about/album2.webp' },
      { title: 'Biggie Ready to die', cover: '/images/about/album3.webp' },
      { title: 'La ley del todo', cover: '/images/about/album4.webp' },
      { title: 'Pazciencia', cover: '/images/about/album5.webp' },
    ],
  },
];

// ✏️ EDIT: "Iconic Lines!!"
//   reply → two-line back-and-forth under the quote · sq → square reply bubble · l → reply left-aligned in blue, no bubble
const LINES = [
  { q: '“Logan, let me give you the ABCs of me. I don’t take meetings. I set them. And my respect isn’t demanded. It’s earned.”', who: 'Harvey Specter', where: 'SUITS | Season 01, Episode 04', reply: ['That’s only two things. What is ‘C’?', '“‘C’ is for people who show me they know A and B”'] },
  { q: '“Au revoir! Shosanna, [laughs maniacally]”', who: 'SS Colonel Hans Landa', where: 'Inglourious Basterds, 2009' },
  { q: '“The Turks pay me a golden treasure, yet I am poor! Because I am a river to my people!”', who: 'Auda abu Tayi', where: 'Lawrence of Arabia, 1962' },
  { q: '“Play it Sam, play [As time goes by]”', who: 'Ilsa Lund & Sam', where: 'Casablanca, 1942', reply: ['Well, I can’t remember the song. I’m a little rusty on it.', '“I’ll hum it for you”'] },
  { q: '“In a month from now this Hollywood big shot is going to give you what you want.”', who: 'Don Vito Corleone', where: 'The Godfather, 1972', reply: ['Too late, they start shooting it this week.', '“I’m going to make him an offer he can’t refuse.”'] },
  { q: '“Falco, turn back!”', who: 'Lucy, Falco & David', where: 'Cyberpunk Edgrunners | Season 1, Episode 10', sq: true, reply:  ['“No can’t do. It was David’s last request. He also told me to tell you' , '“Sorry, we can’t go to the moon together.”'] },
  { q: '“Ah, I forgot to tell you.”', who: 'Guido', where: 'La Vita è Bella, 1997', reply: ['“Go ahead.”', '“You can’t imagine how much I love you, but I’ll never tell anyone, especially not you. They’d have to torture me to make me say it.”'] },
  { q: '“I knew it was a great mistake for a man like me to fall in love”. A great mistake.”', who: 'Jay Gatsby', where: 'The Great Gatsby, 2013', l: true, reply: ['“I still be a great man if I could only forget that I once lost Daisy.”', '“But my life, old sport, my life has got to be like this...”'] },
];

/* ------------------------- "What does he like?" card ------------------------ */

function MeetCard({ k, n, blurb, note, items }) {
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
                {it.cover ? <img src={asset(it.cover)} alt="" loading="lazy" /> : <span className="pdl-mono pdl-t-index">Cover</span>}
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

/* ------------------------- Iconic Lines carousel -------------------------- */

/** Likes are only remembered until the page reloads. */
function IconicLines() {
  const [i, setI] = useState(0);
  const [votes, setVotes] = useState({});
  const m = LINES.length;
  const go = (d) => setI((x) => (x + d + m) % m);
  const L = LINES[i];
  const v = votes[i];
  return (
    <section className="pdl-wrap abx">
      <div className="abx-copy">
        {/* ✏️ EDIT: heading + intro */}
        <p className="eyebrow pdl-mono pdl-t-eyebrow">[only the real ones know]</p>
        <h2 className="pdl-t-section abx-title">Iconic <span className="pdl-serif" style={{ color: 'var(--blue)' }}>Lines!!</span></h2>
        <p className="pdl-t-lead">A compilation of my favourite lines, from songs and movies. Have any other great lines? Let me know, <a href="/contact" className="abx-link">Contact me here</a>.</p>
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

/* ---------------------------------- PAGE ----------------------------------- */

export default function About() {
  return (
    <>
      {/* ---------- Intro + portrait ---------- */}
      <section className="pdl-wrap about">
        <ImageSlot className="slot about-img" label="Portrait · 4:5" image={PORTRAIT.image} alt={PORTRAIT.alt} />
        <div className="about-copy">
          <p className="eyebrow pdl-mono pdl-t-eyebrow">[about me]</p>
          {/* ✏️ EDIT: heading + bio */}
          <h1 className="pdl-t-display">Meet your new designer,<br /><span className="pdl-serif" style={{ color: 'var(--blue)', letterSpacing: '-0.68px' }}>David Leon A.</span></h1>
          <p className="pdl-t-lead">Originally from Colombia. (He doesn’t like coffee.) Designer by profession and storyteller by heart. He enjoys meeting new folks, working out, or enjoying a great film. Fluent in Spanish, English, and Portuguese, dabbling in French.</p>
          <div className="about-cta" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button href={asset(resumeUrl) || '#'} target="_blank" rel="noopener">Resume</Button>
            <a href="/work" className="pdl-t-meta link-meta" style={{ alignSelf: 'center' }}>See Projects</a>
          </div>
        </div>
      </section>

      {/* ---------- What does he like? ---------- */}
      <section className="pdl-wrap meet">
        <div className="meet-copy">
          {/* ✏️ EDIT: heading + intro */}
          <p className="eyebrow pdl-mono pdl-t-eyebrow">[get to know me]</p>
          <h2 className="pdl-t-section meet-title">What does<br /><span className="pdl-serif" style={{ color: 'var(--blue)', whiteSpace: 'nowrap' }}>he like?</span></h2>
          <p className="pdl-t-lead meet-lead">Just a look at what I like to do whenever I’m not working out.</p>
        </div>
        <div className="meet-grid">{LIKES.map((d) => <MeetCard key={d.k} {...d} />)}</div>
      </section>

      <IconicLines />

      {/* ---------- Services (same block as Home) ---------- */}
      <Services />
    </>
  );
}
