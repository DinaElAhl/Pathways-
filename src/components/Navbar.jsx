import { NavLink, Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { audiences } from '../data/audiences.js';

// Primary links shown in the top bar
const primaryLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/pathways', label: 'Pathways' },
  { to: '/roots', label: 'Roots' },
  { to: '/tools', label: 'Tools' },
  { to: '/accredited-exams', label: 'Exams' },
  { to: '/pathways-exam', label: '🎯 RAQP Exam' },
  { to: '/resources', label: 'Resources' },
  { to: '/recommend', label: 'AI Match' },
];

// Secondary links grouped under "More"
const moreLinks = [
  { to: '/lms', label: 'For Schools' },
  { to: '/quran-exams', label: '📖 Quran Exams' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/ai-studio', label: 'AI Studio' },
  { to: '/edu-hub', label: 'EduHub & Tools' },
  { to: '/events', label: 'Events' },
  { to: '/partners', label: 'Partners' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

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

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="Pathways" className="h-8 w-8 object-contain" onError={e => { e.target.style.display='none'; }} />
            <span className="font-bold text-lg text-brand-700 tracking-tight">Pathways</span>
            <span className="text-xs text-slate-400 leading-tight hidden sm:block">EduHub<br />& Tools</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 flex-1">
            {primaryLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
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
                className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1"
              >
                More
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {moreOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-slate-100 py-2 min-w-[160px] z-50">
                  {moreLinks.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm ${
                          isActive ? 'text-brand-700 bg-brand-50' : 'text-slate-700 hover:bg-slate-50'
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
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
                className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center gap-1"
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
          <div className="hidden lg:flex items-center gap-2 ml-2">
            <Link
              to="/builder.html"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-pink-600 hover:bg-pink-50 transition-colors"
            >
              🚀 Builder
            </Link>
            <Link
              to="/browse"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/join"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-colors"
            >
              Get started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden ml-auto p-2 rounded-lg text-slate-500 hover:bg-slate-100"
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
        <div className="lg:hidden bg-white border-t border-slate-100 py-3 px-4 space-y-1">
          {[...primaryLinks, ...moreLinks].map((l) => (
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
          ))}
          <div className="pt-2 border-t border-slate-100 space-y-1">
            <Link to="/join" className="block px-3 py-2 rounded-lg text-sm font-semibold bg-brand-600 text-white text-center">
              Get started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
