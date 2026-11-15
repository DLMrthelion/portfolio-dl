/* ==========================================================================
   GLOBAL COMPONENTS — small pieces used on more than one page.
     <Button>         pill button / link
     <SectionHeader>  [eyebrow] + italic serif title
     <ImageSlot>      grey placeholder that becomes an image or video
     <Services>       "My Services" band (Home + About)
   Styles: src/styles/design-system.css §6 + §7
   ========================================================================== */
import { services } from '../data/site.js';
import { asset } from '../lib/asset.js';

/**
 * Pill button.  variant: "solid" (blue fill) | "outline"   size: "sm" | "md"
 * With `href` it renders a link (<a>), otherwise a <button>.
 *   <Button href="/contact">Chat with Me</Button>
 *   <Button variant="outline" onClick={...}>Send Another</Button>
 */
export function Button({ size = 'sm', variant = 'solid', className, href, children, ...rest }) {
  const cls = ['pdl-btn', 'pdl-btn-' + (variant === 'outline' ? 'outline' : 'solid'), 'pdl-btn-' + (size === 'md' ? 'md' : 'sm'), className]
    .filter(Boolean)
    .join(' ');
  if (href != null) return <a href={href} {...rest} className={cls}>{children}</a>;
  return <button type="button" {...rest} className={cls}>{children}</button>;
}

/**
 * Bracketed eyebrow + italic serif title that opens a section.
 * tone="blue" when it sits on a blue band.
 *   <SectionHeader eyebrow="[cool projects here]" title="Featured Work" tone="blue" />
 */
export function SectionHeader({ eyebrow, title, tone = 'cream' }) {
  return (
    <header className={'pdl-sh' + (tone === 'blue' ? ' pdl-sh-blue' : '')}>
      <p className="pdl-mono pdl-t-eyebrow">{eyebrow}</p>
      <h2 className="pdl-serif pdl-t-section">{title}</h2>
    </header>
  );
}

/**
 * An image area. Empty = grey placeholder with a label (like the design).
 * Give it `image` or `video` and the file fills the box instead.
 *
 *   <ImageSlot className="slot cs-cover" label="Cover image · 16:7" />
 *   <ImageSlot className="slot cs-cover" image="/images/instructo/cover.jpg" alt="Instructo app on a phone" />
 *   <ImageSlot className="slot cs-cover" video="/videos/instructo-reel.mp4" />
 *
 * Files go in /public — a file at public/images/x.jpg is written as "/images/x.jpg".
 */
export function ImageSlot({ className, label, labelClassName = 'pdl-mono pdl-t-index', image, video, alt = '' }) {
  return (
    <div className={className}>
      {video ? (
        <video src={asset(video)} autoPlay muted loop playsInline />
      ) : image ? (
        <img src={asset(image)} alt={alt} loading="lazy" />
      ) : (
        <span className={labelClassName}>{label}</span>
      )}
    </div>
  );
}

/** One service row: number, title, description and a large → that nudges on hover. */
function ServiceRow({ number, title, description, href = '#' }) {
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

/** "My Services" band, shown on Home and About. Each row opens Contact with that service pre-selected. */
export function Services() {
  return (
    <section className="pdl-band">
      <div className="pdl-wrap svc">
        {/* ✏️ EDIT: heading + note (list lives in src/data/site.js → services) */}
        <SectionHeader eyebrow="[MY SERVICES]" title="Design Solutions, Tailored for you." tone="blue" />
        <p className="pdl-t-lead svc-note">
          All services are offered in Spanish, English, and Portuguese. Not finding what you are looking for?<br />
          I’m sure we can work something out. <a href="/contact">Contact me</a>
        </p>
        <div className="svc-list">
          {services.map((s) => <ServiceRow key={s.number} {...s} href={'/contact?s=' + encodeURIComponent(s.title)} />)}
        </div>
      </div>
    </section>
  );
}
