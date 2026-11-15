/**
 * Turns a /public path into a URL that works on GitHub Pages.
 * The site is built with `base: "/portfolio-dl/"` (GitHub Pages), so "/images/x.jpg"
 * must become "/portfolio-dl/images/x.jpg" there. It follows `base` in vite.config.js.
 *   asset('/images/about/Poster1.webp')  ·  asset('/files/resume.pdf')
 * Full URLs (https://…) and empty strings pass through unchanged.
 */
export const asset = (p) => (!p || /^(https?:|data:|blob:|mailto:)/.test(p) ? p : import.meta.env.BASE_URL + p.replace(/^\//, ''));
