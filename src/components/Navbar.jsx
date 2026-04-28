import { NavLink, Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { audiences } from '../data/audiences.js'

// Primary links shown in the top bar
const primaryLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/pathways', label: 'Pathways' },
  { to: '/roots', label: 'Roots' },
  { to: '/tools', label: 'Tools' },
  { to: '/accredited-exams', label: 'Exams' },
  { to: '/resources', label: 'Resources' },
  { to: '/recommend', label: 'AI Match' },
  ]

// Secondary links grouped under "More"
const moreLinks = [
  { to: '/lms', label: 'For Schools' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/ai-studio', label: 'AI Studio' },
  { to: '/edu-hub', label: 'EduHub & Tools' },
  { to: '/events', label: 'Events' },
  { to: '/partners', label: 'Partners' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  ]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [forOpen, setForOpen] = useState(false)
    const [moreOpen, setMoreOpen] = useState(false)
    const forRef = useRef(null)
    const moreRef = useRef(null)
    const location = useLocation()

  useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
  }, [open])

  // Close menus on route change
  useEffect(() => {
        setOpen(false)
        setForOpen(false)
        setMoreOpen(false)
  }, [location.pathname, location.search])

  // Close dropdowns on outside click / Escape
  useEffect(() => {
        if (!forOpen && !moreOpen) return
        const onClick = (e) => {
                if (!forRef.current?.contains(e.target)) setForOpen(false)
                if (!moreRef.current?.contains(e.target)) setMoreOpen(false)
        }
        const onKey = (e) => e.key === 'Escape' && (setForOpen(false), setMoreOpen(false))
        document.addEventListener('mousedown', onClick)
        document.addEventListener('keydown', onKey)
        return () => {
                document.removeEventListener('mousedown', onClick)
                document.removeEventListener('keydown', onKey)
        }
  }, [forOpen, moreOpen])

  const forActive = location.pathname.startsWith('/for/')
    const moreActive = moreLinks.some(l => location.pathname.startsWith(l.to))

  return (
        <header className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
                scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm ring-1 ring-slate-200/70' : 'bg-white/80 backdrop-blur-sm'
        }`}>
                <div className="container-page flex h-14 items-center gap-2">
                
                  {/* Logo */}
                        <Link to="/" className="group flex items-center gap-2 flex-shrink-0 mr-2" aria-label="Pathways — home">
                                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-soft transition group-hover:scale-105">
                                              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                            <path d="M4 18c3-1 4-4 6-7s4-6 8-7" />
                                                            <circle cx="4" cy="18" r="1.5" fill="currentColor" />
                                                            <circle cx="18" cy="4" r="1.5" fill="currentColor" />
                                              </svg>svg>
                                  </span>span>
                                  <span className="font-display text-base font-semibold tracking-tight text-slate-900">Pathways</span>span>
                        </Link>Link>
                
                  {/* Primary nav */}
                        <nav className="hidden lg:flex items-center gap-0.5 flex-1">
                          {primaryLinks.map((l) => (
                      <NavLink
                                      key={l.to}
                                      to={l.to}
                                      end={l.end}
                                      className={({ isActive }) =>
                                                        `rounded-full px-3 py-1.5 text-sm font-medium transition whitespace-nowrap ${
                                                                            isActive
                                                                              ? 'bg-brand-50 text-brand-700'
                                                                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                        }`
                                      }
                                    >
                        {l.label}
                      </NavLink>NavLink>
                    ))}
                        
                          {/* More dropdown */}
                                  <div className="relative" ref={moreRef}>
                                              <button
                                                              type="button"
                                                              onClick={() => setMoreOpen((v) => !v)}
                                                              aria-expanded={moreOpen}
                                                              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition ${
                                                                                moreActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                              }`}
                                                            >
                                                            More
                                                            <Icon name="chevronDown" className={`h-3.5 w-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} strokeWidth={2} />
                                              </button>button>
                                    {moreOpen && (
                        <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-slate-200 z-50">
                          {moreLinks.map((l) => (
                                            <NavLink
                                                                  key={l.to}
                                                                  to={l.to}
                                                                  className={({ isActive }) =>
                                                                                          `block rounded-xl px-3 py-2 text-sm font-medium transition ${
                                                                                                                    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                                                                                            }`
                                                                  }
                                                                >
                                              {l.label}
                                            </NavLink>NavLink>
                                          ))}
                        </div>div>
                                              )}
                                  </div>div>
                        </nav>nav>
                
                  {/* Right side actions */}
                        <div className="hidden lg:flex items-center gap-2 ml-auto flex-shrink-0">
                          {/* For you dropdown */}
                                  <div className="relative" ref={forRef}>
                                              <button
                                                              type="button"
                                                              onClick={() => setForOpen((v) => !v)}
                                                              aria-expanded={forOpen}
                                                              aria-haspopup="menu"
                                                              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition ${
                                                                                forActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                              }`}
                                                            >
                                                            For you
                                                            <Icon name="chevronDown" className={`h-3.5 w-3.5 transition-transform ${forOpen ? 'rotate-180' : ''}`} strokeWidth={2} />
                                              </button>button>
                                    {forOpen && (
                        <div role="menu" className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl bg-white p-2 shadow-lg ring-1 ring-slate-200 z-50">
                          {audiences.map((a) => (
                                            <Link key={a.slug} to={`/for/${a.slug}`} role="menuitem"
                                                                  className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50">
                                                                <span className={`grid h-8 w-8 flex-none place-items-center rounded-lg bg-gradient-to-br ${a.color} text-white`}>
                                                                                      <Icon name={a.icon} className="h-4 w-4" strokeWidth={2} />
                                                                </span>span>
                                                                <span>
                                                                                      <span className="block text-sm font-medium text-slate-900">{a.name}</span>span>
                                                                                      <span className="block text-xs text-slate-500">{a.sub}</span>span>
                                                                </span>span>
                                            </Link>Link>
                                          ))}
                        </div>div>
                                              )}
                                  </div>div>
                        
                                  <a href="/builder.html" target="_blank" rel="noopener noreferrer"
                                                className="rounded-full px-3 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-50 transition flex items-center gap-1">
                                              &#x1F680; Builder
                                  </a>a>
                                  <Link to="/contact" className="btn-primary text-sm py-1.5 px-4">Get started</Link>Link>
                        </div>div>
                
                  {/* Mobile hamburger */}
                        <button
                                    type="button"
                                    className="lg:hidden ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
                                    aria-label={open ? 'Close menu' : 'Open menu'}
                                    aria-expanded={open}
                                    onClick={() => setOpen((v) => !v)}
                                  >
                                  <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" strokeWidth={2} />
                        </button>button>
                </div>div>
        
          {/* Mobile menu */}
          {open && (
                  <div className="lg:hidden border-t border-slate-200 bg-white max-h-[80vh] overflow-y-auto">
                            <div className="container-page py-4 flex flex-col gap-1">
                              {[...primaryLinks, ...moreLinks].map((l) => (
                                  <NavLink key={l.to} to={l.to} end={l.end}
                                                    className={({ isActive }) =>
                                                                        `rounded-xl px-4 py-2.5 text-sm font-medium ${
                                                                                              isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-100'
                                                                        }`
                                                    }
                                                  >
                                    {l.label}
                                  </NavLink>NavLink>
                                ))}
                                        <a href="/builder.html" target="_blank" rel="noopener noreferrer"
                                                        className="rounded-xl px-4 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50 flex items-center gap-2">
                                                      &#x1F680; Pathway Builder
                                        </a>a>
                                        <p className="mt-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">For</p>p>
                              {audiences.map((a) => (
                                  <Link key={a.slug} to={`/for/${a.slug}`}
                                                    className="flex items-center gap-3 rounded-xl px-4 py-2 hover:bg-slate-100">
                                                  <span className={`grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br ${a.color} text-white`}>
                                                                    <Icon name={a.icon} className="h-3.5 w-3.5" strokeWidth={2} />
                                                  </span>span>
                                                  <span className="text-sm font-medium text-slate-800">{a.name}</span>span>
                                  </Link>Link>
                                ))}
                                        <Link to="/contact" className="btn-primary mt-3 w-full text-center">Get started</Link>Link>
                            </div>div>
                  </div>div>
              )}
        </header>header>
      )
}</div>
