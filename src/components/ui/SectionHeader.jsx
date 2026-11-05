/**
 * Bracketed eyebrow + italic serif title that opens a section.
 * tone="blue" when it sits on a blue band.
 *   <SectionHeader eyebrow="[cool projects here]" title="Featured Work" tone="blue" />
 */
export default function SectionHeader({ eyebrow, title, tone = 'cream', id }) {
  return (
    <header className={'pdl-sh' + (tone === 'blue' ? ' pdl-sh-blue' : '')}>
      <p className="pdl-mono pdl-t-eyebrow">{eyebrow}</p>
      <h2 id={id} className="pdl-serif pdl-t-section">{title}</h2>
    </header>
  );
}
