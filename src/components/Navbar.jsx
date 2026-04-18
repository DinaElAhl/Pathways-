import { NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { audiences } from '../data/audiences.js'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/pathways', label: 'Pathways' },
  { to: '/recommend', label: 'AI Match' },
  { to: '/lms', label: 'For Schools' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/resources', label: 'Resources' },
  { to: '/events', label: 'Events' },
  { to: '/partners', label: 'Partners' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [forOpen, setForOpen] = useState(false)
  const forRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close menus on route change
  useEffect(() => {
    setOpen(false)
    setForOpen(false)
  }, [location.pathname, location.search])

  // Close "For you" dropdown on outside click / Escape
  useEffect(() => {
    if (!forOpen) return
    const onClick = (e) => {
      if (!forRef.current?.contains(e.target)) setForOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setForOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [forOpen])

  const forActive = location.pathname.startsWith('/for/')

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md ring-1 ring-slate-200/70'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          aria-label="Pathways — home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-soft transition group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 18c3-1 4-4 6-7s4-6 8-7" />
              <circle cx="4" cy="18" r="1.5" fill="currentColor" />
              <circle cx="18" cy="4" r="1.5" fill="currentColor" />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-slate-900">
            Pathways
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

          <a
            href="https://pathways-builder.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50 transition"
          >
            🚀 Builder
          </a>

          {/* For you dropdown */}
          <div className="relative" ref={forRef}>
            <button
              type="button"
              onClick={() => setForOpen((v) => !v)}
              aria-expanded={forOpen}
              aria-haspopup="menu"
              className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                forActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              For you
              <Icon
                name="chevronDown"
                className={`h-4 w-4 transition-transform ${forOpen ? 'rotate-180' : ''}`}
                strokeWidth={2}
              />
            </button>
            {forOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl bg-white p-2 shadow-soft ring-1 ring-slate-200"
              >
                {audiences.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/for/${a.slug}`}
                    role="menuitem"
                    className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50"
                  >
                    <span
                      className={`grid h-9 w-9 flex-none place-items-center rounded-lg bg-gradient-to-br ${a.color} text-white`}
                    >
                      <Icon name={a.icon} className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-slate-900">
                        {a.name}
                      </span>
                      <span className="block text-xs text-slate-500">{a.sub}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/resources" className="btn-ghost">
            Browse
          </Link>
          <Link to="/contact" className="btn-primary">
            Get started
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" strokeWidth={2} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container-page py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-medium ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}

            <a
              href="https://pathways-builder.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-4 py-3 text-base font-medium text-brand-700 hover:bg-brand-50 flex items-center gap-2"
            >
              🚀 Pathway Builder
            </a>

            <p className="mt-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              For
            </p>
            {audiences.map((a) => (
              <Link
                key={a.slug}
                to={`/for/${a.slug}`}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 hover:bg-slate-100"
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${a.color} text-white`}
                >
                  <Icon name={a.icon} className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="text-sm font-medium text-slate-800">{a.name}</span>
              </Link>
            ))}

            <Link to="/contact" className="btn-primary mt-4 w-full">
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
