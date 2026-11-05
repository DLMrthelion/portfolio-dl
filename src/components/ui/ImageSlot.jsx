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
export default function ImageSlot({ className, label, labelClassName = 'pdl-mono pdl-t-index', image, video, alt = '' }) {
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
