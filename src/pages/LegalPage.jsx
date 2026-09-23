import { Link } from 'react-router-dom'
import { legalPages, LEGAL_EMAIL, LEGAL_UPDATED } from '../data/legal.js'

// One renderer for /privacy, /terms and /refund. Content lives in src/data/legal.js.
export default function LegalPage({ page }) {
  const p = legalPages[page]
  const others = Object.entries(legalPages).filter(([key]) => key !== page)

  return (
    <div className="bg-white">
      <section className="container-page pt-14 pb-16 sm:pt-20 max-w-3xl">
        <span className="chip">Legal</span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{p.title}</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated {LEGAL_UPDATED}</p>
        <p className="mt-6 text-slate-700 leading-relaxed">{p.intro}</p>

        {p.sections.map((s) => (
          <div key={s.heading} className="mt-10">
            <h2 className="text-xl font-bold text-slate-900">{s.heading}</h2>
            {s.body.map((para, i) => (
              <p key={i} className="mt-3 text-slate-700 leading-relaxed">{para}</p>
            ))}
            {s.list && (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700 leading-relaxed">
                {s.list.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            )}
          </div>
        ))}

        <div className="mt-12 rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
          <h2 className="text-base font-bold text-slate-900">Questions</h2>
          <p className="mt-2 text-sm text-slate-700">
            Write to <a href={`mailto:${LEGAL_EMAIL}`} className="link">{LEGAL_EMAIL}</a>. See also{' '}
            {others.map(([key, o], i) => (
              <span key={key}>
                {i > 0 && ' and '}
                <Link to={o.path} className="link">{o.title}</Link>
              </span>
            ))}
            .
          </p>
        </div>
      </section>
    </div>
  )
}
