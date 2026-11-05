/* ==========================================================================
   GLOBAL COMPONENTS — small pieces used on more than one page.
     <Button>         pill button / link
     <SectionHeader>  [eyebrow] + italic serif title
     <ImageSlot>      grey placeholder that becomes an image or video
   Styles: src/styles/design-system.css §6 + §7
   ========================================================================== */

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
export function SectionHeader({ eyebrow, title, tone = 'cream', id }) {
  return (
    <header className={'pdl-sh' + (tone === 'blue' ? ' pdl-sh-blue' : '')}>
      <p className="pdl-mono pdl-t-eyebrow">{eyebrow}</p>
      <h2 id={id} className="pdl-serif pdl-t-section">{title}</h2>
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
        <video src={video} autoPlay muted loop playsInline />
      ) : image ? (
        <img src={image} alt={alt} loading="lazy" />
      ) : (
        <span className={labelClassName}>{label}</span>
      )}
    </div>
  );
}
