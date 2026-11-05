import { ImageSlot, SectionHeader } from '../components/GlobalComponents.jsx';
import { projects, projectLink } from '../data/projects.js';

/* ==========================================================================
   PROJECTS PAGE  —  address: /work
   One card per project in src/data/projects.js. Each card's cover image,
   title, description, role and year come from that case study's `meta`
   (meta.cover = the image on this card AND at the top of the case study).
   ========================================================================== */

export default function Projects() {
  return (
    <>
      <section className="pdl-wrap page-head">
        {/* ✏️ EDIT: heading + intro */}
        <SectionHeader eyebrow="[all the cool projects]" title="Projects" />
        <p className="pdl-t-lead lead">Selected product, brand and interactive work from 2025 to 2026.</p>
      </section>
      <section className="pdl-wrap pgrid">
        {projects.map((p) => (
          <a key={p.slug} href={projectLink(p)} className="pcard">
            <ImageSlot className="slot pcard-cover" label="Cover · 16:7" image={p.cover} alt={p.coverAlt} />
            <div className="pcard-row">
              <span className="pdl-mono pdl-t-index" style={{ paddingTop: 6 }}>{p.number}</span>
              <span className="pcard-main">
                <span className="pcard-title pdl-t-row">{p.title}</span>
                <span className="pdl-t-body" style={{ maxWidth: 440 }}>{p.description}</span>
              </span>
              <span className="pcard-side">
                <span className="pcard-role pdl-mono pdl-t-meta">{p.role}</span>
                <span className="pcard-arrow">{p.year} →</span>
              </span>
            </div>
          </a>
        ))}
      </section>
    </>
  );
}
