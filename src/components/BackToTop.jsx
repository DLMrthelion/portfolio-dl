import { useEffect, useState } from 'react';

/** Round "↑" button that appears after scrolling 600px down. */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button type="button" className={'to-top' + (show ? ' on' : '')} aria-label="Back to top" tabIndex={show ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <span className="tt-ar" aria-hidden="true">↑</span>
      <span className="tt-lb">Back to top</span>
    </button>
  );
}
