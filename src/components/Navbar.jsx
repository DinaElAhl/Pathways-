import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/pathways', label: 'Pathways' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
          onClick={() => setOpen(false)}
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
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/pathways" className="btn-ghost">
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
                onClick={() => setOpen(false)}
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
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
