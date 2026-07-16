import { Link } from 'react-router-dom'

const suggestions = [
  { to: '/', label: 'Home', desc: 'Start at the top' },
  { to: '/shop', label: '🛒 Shop', desc: 'Roots Tajweed Reading Series + book' },
  { to: '/for-schools', label: '🏫 For Schools', desc: 'K–12 licensing (ES, MS, HS)' },
  { to: '/free-sample', label: '🎁 Free Sample', desc: 'The Week 1 sample pack' },
  { to: '/pathways-exam', label: '🎯 RAQP Exam', desc: 'CEFR-aligned proficiency exam' },
  { to: '/contact', label: '✉️ Contact', desc: 'Say hello to Dina' },
]

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand-700">
        404
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
        This path goes nowhere.
      </h1>
      <p className="mx-auto mt-3 max-w-lg text-slate-600">
        The page you're looking for doesn't exist — or it took a different pathway.
        Let's get you back on track.
      </p>

      <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
        {suggestions.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="rounded-2xl bg-white ring-1 ring-slate-200 p-4 text-left hover:ring-brand-200 hover:shadow-soft transition"
          >
            <div className="font-display text-lg font-semibold text-slate-900">{s.label}</div>
            <div className="mt-1 text-sm text-slate-600">{s.desc}</div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-sm">
        <Link to="/" className="link">← Back to home</Link>
      </div>
    </section>
  )
}
