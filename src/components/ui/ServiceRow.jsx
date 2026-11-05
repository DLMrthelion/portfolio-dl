/** One service on a blue band: number, title, description and a large → that nudges on hover. */
export default function ServiceRow({ number, title, description, href = '#' }) {
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
