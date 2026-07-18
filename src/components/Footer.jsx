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
            <li><Link to="/shop" className="text-slate-600 hover:text-brand-700">Shop</Link></li>
            <li><Link to="/for-schools" className="text-slate-600 hover:text-brand-700">For Schools</Link></li>
            <li><Link to="/about" className="text-slate-600 hover:text-brand-700">About</Link></li>
            <li><Link to="/faq" className="text-slate-600 hover:text-brand-700">FAQ</Link></li>
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
            Want to hear when new curriculum, lessons, or exam updates drop? Send Dina a note and
            she'll add you to the update list.
          </p>
          {/* Newsletter form intentionally goes through mailto until a real newsletter tool
              (ConvertKit / MailerLite / Beehiiv) is picked. Composing an email is honest —
              collecting the address into a fake "you're on the list" was not. */}
          <form
            className="mt-3 flex flex-wrap gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget
              const input = form.querySelector('input[type="email"]')
              const value = (input?.value || '').trim()
              if (!value) return
              const subject = encodeURIComponent('Please add me to Pathways updates')
              const body = encodeURIComponent(
                `Hi Dina,\n\nPlease add ${value} to your update list — I'd like to hear when new curriculum, lessons, or exam updates ship.\n\nThank you.`
              )
              window.location.href = `mailto:roots@pathwayslearn.com?subject=${subject}&body=${body}`
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
              Ask Dina
            </button>
            <p className="w-full text-xs text-slate-500 mt-1">
              Opens your email app with a note pre-filled — Dina replies personally.
            </p>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="container-page py-6 flex flex-wrap items-center justify-center gap-3 text-xs">
          <Link to="/apply/educator" className="rounded-full bg-white px-3 py-1.5 font-medium text-brand-700 ring-1 ring-inset ring-brand-100 hover:bg-brand-50">
            Teach with Pathways
          </Link>
          <Link to="/apply/partner" className="rounded-full bg-white px-3 py-1.5 font-medium text-brand-700 ring-1 ring-inset ring-brand-100 hover:bg-brand-50">
            Partner with us
          </Link>
          <Link to="/faq" className="rounded-full bg-white px-3 py-1.5 font-medium text-slate-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-50">
            Read the FAQ
          </Link>
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
