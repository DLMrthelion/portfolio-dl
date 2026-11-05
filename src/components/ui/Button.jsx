/**
 * Pill button.  variant: "solid" (blue fill) | "outline"   size: "sm" | "md"
 * With `href` it renders a link (<a>), otherwise a <button>.
 *   <Button href="/contact">Chat with Me</Button>
 *   <Button variant="outline" onClick={...}>Send Another</Button>
 */
export default function Button({ size = 'sm', variant = 'solid', className, href, children, ...rest }) {
  const cls = ['pdl-btn', 'pdl-btn-' + (variant === 'outline' ? 'outline' : 'solid'), 'pdl-btn-' + (size === 'md' ? 'md' : 'sm'), className]
    .filter(Boolean)
    .join(' ');
  if (href != null) return <a href={href} {...rest} className={cls}>{children}</a>;
  return <button type="button" {...rest} className={cls}>{children}</button>;
}
