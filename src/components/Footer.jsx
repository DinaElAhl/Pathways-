import { Link } from 'react-router-dom'
import { audiences } from '../data/audiences.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="container-page py-14 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800 text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 18c3-1 4-4 6-7s4-6 8-7" />
                <circle cx="4" cy="18" r="1.5" fill="currentColor" />
                <circle cx="18" cy="4" r="1.5" fill="currentColor" />
              </svg>
            </span>
            <span className="font-display text-lg font-semibold text-slate-900">
              Pathways
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-slate-600">
            One hub for everyone who learns and teaches — learners, teachers, parents,
            schools, and educators. Find whatever you need to grow.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/resources" className="text-slate-600 hover:text-brand-700">Resources</Link></li>
            <li><Link to="/pathways" className="text-slate-600 hover:text-brand-700">Pathways</Link></li>
            <li><Link to="/about" className="text-slate-600 hover:text-brand-700">About</Link></li>
            <li><Link to="/contact" className="text-slate-600 hover:text-brand-700">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">For</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {audiences.map((a) => (
              <li key={a.slug}>
                <Link
                  to={`/for/${a.slug}`}
                  className="text-slate-600 hover:text-brand-700"
                >
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">Stay in the loop</h4>
          <p className="mt-3 text-sm text-slate-600">
            Monthly roundups of new resources and pathways. No spam, ever.
          </p>
          <form
            className="mt-3 flex flex-wrap gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget
              const input = form.querySelector('input[type="email"]')
              if (input?.value) {
                form.reset()
                form.querySelector('[data-feedback]')?.classList.remove('hidden')
              }
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded-full border-0 bg-white px-4 py-2 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500"
            />
            <button type="submit" className="btn-primary px-4">
              Join
            </button>
            <span
              data-feedback
              className="hidden w-full text-xs text-emerald-600"
            >
              Thanks — you're on the list!
            </span>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {year} Pathways. Built for curious learners and the people who teach them.</p>
          <p>Made with care &middot; All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
