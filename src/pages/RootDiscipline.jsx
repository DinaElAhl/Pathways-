import { Link, useParams } from 'react-router-dom'
import { findRootDiscipline, rootDisciplines } from '../data/rootsOfKnowledge.js'

export default function RootDiscipline() {
  const { slug } = useParams()
  const d = findRootDiscipline(slug)

  if (!d) {
    return (
      <section className="container-page py-20">
        <h1 className="text-3xl font-bold text-slate-900">Discipline not found</h1>
        <p className="mt-2 text-slate-600">We couldn’t find that unit.</p>
        <Link to="/roots" className="btn-primary mt-6 inline-block">Back to Roots of Knowledge</Link>
      </section>
    )
  }

  const others = rootDisciplines.filter((x) => x.slug !== d.slug).slice(0, 3)

  return (
    <>
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-12 pb-8 sm:pt-16">
          <Link to="/roots" className="text-sm text-brand-600 font-semibold">← Roots of Knowledge</Link>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-4xl">{d.icon}</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{d.title}</h1>
          </div>
          <p className="mt-3 text-lg text-slate-700 max-w-3xl">{d.summary}</p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-6">
          <h2 className="text-lg font-bold text-brand-800">How we re-root it</h2>
          <p className="mt-2 text-slate-800 leading-relaxed">{d.framing}</p>
        </div>
      </section>

      <section className="container-page py-6">
        <h2 className="text-2xl font-bold text-slate-900">Curriculum units</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {d.units.map((u, i) => (
            <li key={u} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-semibold text-brand-600">Unit {i + 1}</div>
              <div className="mt-1 text-slate-800">{u}</div>
            </li>
          ))}
        </ul>
      </section>

      {d.resources?.length > 0 && (
        <section className="container-page py-6">
          <h2 className="text-2xl font-bold text-slate-900">Resources</h2>
          <ul className="mt-4 space-y-2">
            {d.resources.map((r) => (
              <li key={r.url}>
                <a className="text-brand-600 font-semibold hover:underline" href={r.url} target="_blank" rel="noreferrer">
                  {r.label} →
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-slate-50 mt-10">
        <div className="container-page py-12">
          <h2 className="text-xl font-bold text-slate-900">Continue exploring</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to={`/roots/${o.slug}`} className="rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-300 hover:shadow-sm transition">
                <div className="text-2xl">{o.icon}</div>
                <div className="mt-2 font-bold text-slate-900">{o.title}</div>
                <div className="text-sm text-slate-600 mt-1 line-clamp-2">{o.summary}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
