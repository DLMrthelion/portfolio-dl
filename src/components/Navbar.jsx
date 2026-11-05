import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './GlobalComponents.jsx';
import { navIntro, navLinks } from '../data/site.js';

/** Top bar: greeting (left) · logo (centre) · menu button (right). Text: src/data/site.js. Logo: public/images/logo.svg */
function Bar({ button }) {
  return (
    <div className="pdl-nav-bar">
      <p className="pdl-nav-intro">{navIntro[0]}<br />{navIntro[1]}</p>
      <a href="/" aria-label="Home" className="pdl-logo"></a>
      {button}
    </div>
  );
}

/** Sticky header + full-screen menu (with the light/dark theme toggle at the bottom). */
export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const openRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!open) return;
    closeRef.current && closeRef.current.focus();
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      openRef.current && openRef.current.focus();
    };
  }, [open]);

  const isCurrent = (href) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));

  return (
    <>
      <header className="pdl-wrap site-header">
        <Bar
          button={
            <button ref={openRef} type="button" className="pdl-iconbtn" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
              <span className="pdl-menuicon" aria-hidden="true"><span></span><span></span><span></span></span>
            </button>
          }
        />
      </header>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Site menu" className="pdl-overlay">
          <div className="pdl-wrap">
            <Bar
              button={
                <button ref={closeRef} type="button" className="pdl-iconbtn pdl-close" aria-label="Close menu" onClick={() => setOpen(false)}>
                  <span></span><span></span>
                </button>
              }
            />
            <nav aria-label="Main" className="pdl-menu">
              <p className="pdl-menu-label">Lost?</p>
              <ul>
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="pdl-serif pdl-t-display" style={{ letterSpacing: '-0.01em' }} aria-current={isCurrent(l.href) ? 'page' : undefined} onClick={() => setOpen(false)}>
                      <span className="pdl-menu-text">{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="theme-toggle">
              <Button variant="outline" onClick={onToggleTheme}>{theme === 'light' ? 'Dark theme' : 'Light theme'}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
