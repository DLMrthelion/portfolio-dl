import SectionHeader from '../ui/SectionHeader.jsx';
import Button from '../ui/Button.jsx';
import { approach } from '../../data/site.js';

/** "My Work Approach" columns + call to action. Columns: src/data/site.js → approach */
export default function Approach({ eyebrow, title, ctaText, ctaButton }) {
  return (
    <section className="pdl-wrap sec" style={{ paddingTop: 0 }}>
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="appr-grid">
        {approach.map((a, i) => (
          <div key={i} className="appr-item">
            <h3 className="pdl-t-approach" style={{ fontWeight: 500 }}><span>{a.title}</span></h3>
            <p className="pdl-t-lead">{a.body}</p>
          </div>
        ))}
      </div>
      <div className="appr-cta">
        <p className="pdl-t-body">{ctaText}</p>
        <Button href="/contact">{ctaButton}</Button>
      </div>
    </section>
  );
}
