import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './GlobalComponents.jsx';
import { navLinks } from '../data/site.js';
import { asset } from '../lib/asset.js';

/** Top bar: logo (left) · menu button (right). Logo: public/images/logo.svg */
function Bar({ button }) {
  return (
    <div className="pdl-nav-bar">
      <a href="/" aria-label="Home" className="pdl-logo"></a>
      {button}
    </div>
  );
}

/** Sticky header + full-screen menu (with the light/dark theme toggle at the bottom). */
export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  // After closing, the menu button sits under the pointer; keep its plain 3-line look until the pointer leaves it.
  const [justClosed, setJustClosed] = useState(false);
  const close = () => { setOpen(false); setJustClosed(true); };
  const closeRef = useRef(null);
  const openRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!open) return;
    closeRef.current && closeRef.current.focus();
    const onKey = (e) => { if (e.key === 'Escape') close(); };
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
            <button ref={openRef} type="button" className={'pdl-iconbtn' + (justClosed ? ' just-closed' : '')} aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)} onPointerLeave={() => setJustClosed(false)}>
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
                <button ref={closeRef} type="button" className="pdl-iconbtn pdl-close" aria-label="Close menu" onClick={close}>
                  <span></span><span></span>
                </button>
              }
            />
            <nav aria-label="Main" className="pdl-menu">
              <p className="pdl-menu-label">Lost?</p>
              <ul>
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.newTab ? asset(l.href) : l.href} target={l.newTab ? '_blank' : undefined} rel={l.newTab ? 'noopener' : undefined} className="pdl-serif pdl-t-display" style={{ letterSpacing: '-0.01em' }} aria-current={isCurrent(l.href) ? 'page' : undefined} onClick={close}>
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
