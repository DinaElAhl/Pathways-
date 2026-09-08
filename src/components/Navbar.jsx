import { NavLink, Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { audiences } from '../data/audiences.js';

// Nav labels are text-only. Color emoji were removed: they rendered at an
// inconsistent size against the rest of the site's chrome, and the extra
// glyph width pushed every label past its pill so items wrapped onto 2-4
// lines inside a 56px (h-14) bar. Items also carry whitespace-nowrap +
// shrink-0 below so a long label can never wrap again.

// Primary links shown in the top bar. Kept to what fits on one row at 1280px:
// "For Schools" was dropped from here because the brand CTA button on the
// right already goes to /for-schools, and AI Match, Builder and the RQAP exam
// moved into "More". Every route is still reachable — only placement changed.
const primaryLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/pathways', label: 'Pathways' },
  { to: '/roots', label: 'Roots' },
  { to: '/tools', label: 'Tools' },
  { to: '/accredited-exams', label: 'Exams' },
  { to: '/pathways-exam', label: 'RAQP Exam' },
  { to: '/shop', label: 'Shop' },
  { to: '/free-sample', label: 'Free Sample' },
  { to: '/resources', label: 'Resources' },
];

// Secondary links under "More", grouped with headings.
//
// The RQAP exams get their own group so they read as one family and can't be
// misread as the RAQP exam (CEFR-aligned, /pathways-exam), which keeps its own
// top-bar slot — the two acronyms differ only by a transposed letter.
// Only RQAP Level 2 Asasi ships today; a Level 1 entry drops into this group
// when that page exists. Links use `href` when they open a static HTML file
// rather than a React route.
const moreGroups = [
  {
    title: 'RQAP exams',
    links: [{ href: '/rqap.html', label: 'RQAP 2 — Level 2 Asasi' }],
  },
  {
    title: 'Exams & assessment',
    links: [
      { to: '/quran-exams', label: 'Quran Exams' },
      { to: '/exam-dashboard', label: 'Exam Dashboard' },
      { to: '/exam/methodology', label: 'Exam Methodology' },
      { to: '/exam/cefr-alignment', label: 'CEFR Alignment' },
    ],
  },
  {
    title: 'Curriculum & tools',
    links: [
      { to: '/curriculum/sources', label: 'Curriculum Sources' },
      { to: '/edu-hub', label: 'EduHub & Tools' },
      { to: '/recommend', label: 'AI Match' },
      // href, not `to`: builder.html is a static file that vercel.json excludes
      // from the SPA rewrites. As a router <Link> it was intercepted by the
      // catch-all route and landed on NotFound instead of the page.
      { href: '/builder.html', label: 'Builder' },
      { to: '/partners', label: 'Partners' },
    ],
  },
  {
    title: 'Roots',
    links: [
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
    ],
  },
];

// Flattened for the mobile menu, which lists everything in one column.
const moreLinks = moreGroups.flatMap((g) => g.links);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [forOpen, setForOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const forRef = useRef(null);
  const moreRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setForOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (forRef.current && !forRef.current.contains(e.target)) setForOpen(false);
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 gap-4">

          {/* Logo — wordmark only; no image asset yet */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-lg text-brand-700 tracking-tight">Pathways</span>
            <span className="text-xs text-slate-400 leading-tight hidden sm:block">EduHub<br />& Tools</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-1 flex-1">
            {primaryLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `shrink-0 whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}

            {/* More dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                className="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1"
              >
                More
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {moreOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-slate-100 py-2 min-w-[220px] z-50">
                  {moreGroups.map((g, gi) => (
                    <div
                      key={g.title}
                      className={gi > 0 ? 'mt-1 border-t border-slate-100 pt-1' : undefined}
                    >
                      <div className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {g.title}
                      </div>
                      {g.links.map((l) =>
                        l.href ? (
                          <a
                            key={l.href}
                            href={l.href}
                            className="block whitespace-nowrap px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          >
                            {l.label}
                          </a>
                        ) : (
                          <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) =>
                              `block whitespace-nowrap px-4 py-2 text-sm ${
                                isActive
                                  ? 'text-brand-700 bg-brand-50'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`
                            }
                          >
                            {l.label}
                          </NavLink>
                        ),
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* For Schools / For You dropdown */}
            <div className="relative ml-auto" ref={forRef}>
              <button
                type="button"
                onClick={() => setForOpen((v) => !v)}
                aria-expanded={forOpen}
                className="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1"
              >
                For you
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {forOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-lg border border-slate-100 py-2 min-w-[180px] z-50">
                  {audiences && audiences.map((a) => (
                    <Link
                      key={a.id || a.slug}
                      to={`/for/${a.slug || a.id}`}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      {a.label || a.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden xl:flex shrink-0 items-center gap-2 ml-2">
            <Link
              to="/for-schools"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-colors"
            >
              For schools
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="xl:hidden ml-auto p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-white border-t border-slate-100 py-3 px-4 space-y-1">
          {[...primaryLinks, ...moreLinks].map((l) =>
            l.href ? (
              <a
                key={l.href}
                href={l.href}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {l.label}
              </a>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ),
          )}
          <div className="pt-2 border-t border-slate-100 space-y-1">
            <Link to="/for-schools" className="block px-3 py-2 rounded-lg text-sm font-semibold bg-brand-600 text-white text-center">
              For schools
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
