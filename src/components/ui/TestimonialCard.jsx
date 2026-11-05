/** Testimonial: big serif quote mark, quote, avatar + name + position. Content: src/data/site.js */
export default function TestimonialCard({ quote, name, position, avatarSrc, tone = 'cream', className, style }) {
  return (
    <figure className={['pdl-card', tone === 'blue' && 'pdl-card-blue', className].filter(Boolean).join(' ')} style={style}>
      <div className="pdl-card-body">
        <span className="pdl-card-mark" aria-hidden="true">“</span>
        <blockquote className="pdl-t-quote">{quote}</blockquote>
      </div>
      <figcaption>
        {avatarSrc ? <img src={avatarSrc} alt={name} width={50} height={50} className="pdl-avatar" /> : <span className="pdl-avatar" aria-hidden="true" />}
        <span>
          <span className="pdl-card-name">{name}</span>
          <span className="pdl-card-pos">{position}</span>
        </span>
      </figcaption>
    </figure>
  );
}
