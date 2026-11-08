import { useEffect } from 'react';

/* ==========================================================================
   CUSTOM CURSOR — a blue ball that trails the mouse.
   • Grows into a soft bubble over links, buttons, project rows and the testimonial carousel.
   • Turns cream over blue bands (except on Home, where the bands are cream).
   • Normal text caret over inputs; never shown on touch screens.
   Styles: design-system.css → "LANDING PAGE UPDATES" (.cur-ball)
   ========================================================================== */

const HOT = 'a,button,[role="button"],label,select,summary,.tcar-track,.pdl-prow';
const TXT = 'input,textarea,[contenteditable="true"]';

export default function CustomCursor() {
  useEffect(() => {
    if (!matchMedia('(pointer:fine)').matches) return undefined;
    const html = document.documentElement;
    const ball = document.createElement('div');
    ball.className = 'cur-ball';
    ball.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ball);
    html.classList.add('has-ball');
    const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
    let tx = -100, ty = -100, x = tx, y = ty, raf = 0;

    const draw = () => {
      x += (tx - x) * (still ? 1 : 0.28);
      y += (ty - y) * (still ? 1 : 0.28);
      ball.style.transform = `translate3d(${x}px,${y}px,0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(draw) : 0;
    };
    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX; ty = e.clientY;
      if (!ball.classList.contains('on')) { x = tx; y = ty; }
      const t = e.target instanceof Element ? e.target : null;
      ball.classList.toggle('on', !(t && t.closest(TXT)));
      ball.classList.toggle('hot', !!(t && t.closest(HOT)));
      ball.classList.toggle('band', !!(t && t.closest('.pdl-band') && !t.closest('.home')));
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const down = () => ball.classList.add('down');
    const up = () => ball.classList.remove('down');
    const hide = () => ball.classList.remove('on');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    window.addEventListener('blur', hide);
    html.addEventListener('mouseleave', hide);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('blur', hide);
      html.removeEventListener('mouseleave', hide);
      html.classList.remove('has-ball');
      ball.remove();
    };
  }, []);
  return null;
}
