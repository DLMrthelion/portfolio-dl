import { footerCta, navLinks, socials } from '../data/site.js';

/** Footer: call-to-action (left) + Pages and Follow columns (right). Text: src/data/site.js */
export default function Footer() {
  return (
    <footer className="pdl-footer">
      <div className="pdl-wrap pdl-footer-in">
        <p className="pdl-footer-cta pdl-t-cta">
          {footerCta.plain}
          <span className="pdl-serif">{footerCta.accent}</span>
        </p>
        <div className="pdl-footer-cols">
          <nav aria-label="Footer" className="pdl-footer-col">
            <p className="pdl-footer-label">{footerCta.navLabel}</p>
            <ul>
              {navLinks.map((l) => <li key={l.href}><a href={l.href} className="pdl-t-lead">{l.label}</a></li>)}
            </ul>
          </nav>
          <div className="pdl-footer-col">
            <p className="pdl-footer-label">{footerCta.socialsLabel}</p>
            <ul style={{ marginTop: 'var(--space-4)' }}>
              {socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="pdl-t-lead">{s.label}</a></li>)}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
