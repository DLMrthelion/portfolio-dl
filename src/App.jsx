import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import { findProject } from './data/projects.js';

/* ==========================================================================
   ROUTES — which page shows at which address.
   To add a page: create src/pages/MyPage.jsx, import it above, add a <Route>
   below, and (optionally) add it to navLinks in src/data/site.js.
   Case studies don't need a route: add them to src/data/projects.js.
   ========================================================================== */

// ✏️ EDIT: browser-tab titles. Case studies use "<project title> — David Leon".
const TITLES = {
  '/': 'David Leon — Product Designer',
  '/work': 'Projects — David Leon',
  '/about': 'About — David Leon',
  '/contact': 'Contact — David Leon',
};

function CaseStudyRoute() {
  const { slug } = useParams();
  const project = findProject(slug);
  if (!project) return <Navigate to="/work" replace />;
  const Page = project.Page;
  return <Page />;
}

export default function App() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  // Light / dark theme (button inside the menu). Remembered between visits.
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('pdl-theme') || 'light'; } catch { return 'light'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('pdl-theme', theme); } catch { /* private mode */ }
  }, [theme]);

  const currentPage = useRef('');
  currentPage.current = pathname + search;

  // Addresses use "#" (yoursite.com/#/work/famigo) so they work on any host with no setup.
  // In the pages you still write normal links — <a href="/about"> — and this turns them into "#/about".
  useEffect(() => {
    const pageLink = (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return null;
      const href = a.getAttribute('href');
      if (href.startsWith('#') && !href.startsWith('#/')) { e.preventDefault(); return null; } // '#' = link not set yet: do nothing
      if (!href.startsWith('/') || a.target === '_blank' || a.hasAttribute('download')) return null;
      if (/\.[a-z0-9]+$/i.test(href.split('?')[0])) return null; // files in /public (PDFs, images…) open normally
      return href;
    };
    const newTab = (href) => window.open(window.location.pathname + '#' + href, '_blank', 'noopener');
    const onClick = (e) => {
      const href = pageLink(e);
      if (!href || e.button !== 0) return;
      e.preventDefault();
      if (e.metaKey || e.ctrlKey || e.shiftKey) newTab(href);
      else if (href === currentPage.current) window.scrollTo(0, 0);
      else navigate(href);
    };
    const onMiddleClick = (e) => {
      if (e.button !== 1) return;
      const href = pageLink(e);
      if (href) { e.preventDefault(); newTab(href); }
    };
    document.addEventListener('click', onClick, true);
    document.addEventListener('auxclick', onMiddleClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('auxclick', onMiddleClick, true);
    };
  }, [navigate]);

  // New page → start at the top.
  useEffect(() => { window.scrollTo(0, 0); }, [pathname, search]);

  // Browser-tab title.
  useEffect(() => {
    const project = pathname.startsWith('/work/') ? findProject(pathname.slice(6)) : null;
    document.title = project ? project.title + ' — David Leon' : TITLES[pathname] || TITLES['/'];
  }, [pathname]);

  return (
    <>
      <Navbar theme={theme} onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Projects />} />
          <Route path="/work/:slug" element={<CaseStudyRoute />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact key={search} />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
