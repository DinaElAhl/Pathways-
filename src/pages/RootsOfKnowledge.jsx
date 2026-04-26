import { Link } from 'react-router-dom'
import { rootsHero, rootDisciplines } from '../data/rootsOfKnowledge.js'

export default function RootsOfKnowledge() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-14 pb-10 sm:pt-20">
          <span className="chip">{rootsHero.eyebrow || 'New curriculum'}</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            {rootsHero.title}
          </h1>
          <p className="mt-3 text-xl text-brand-700 font-medium">{rootsHero.tagline}</p>
          <p className="mt-6 max-w-3xl text-slate-700 text-lg leading-relaxed">{rootsHero.intro}</p>
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="text-2xl font-bold text-slate-900">{rootsHero.frameworkLabel || 'The Roots Method'}</h2>
        <p className="mt-2 text-slate-600 max-w-3xl">{rootsHero.frameworkSubtitle || 'Six stages we walk through in every subject.'}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rootsHero.steps.map((s) => (
            <div key={s.key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-lg font-bold text-slate-900">{s.title}</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="container-page py-12">
          <h2 className="text-2xl font-bold text-slate-900">Guiding principles</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {rootsHero.principles.map((p) => (
              <li key={p} className="rounded-xl bg-white p-4 border border-slate-200 text-slate-700">
                <span className="text-brand-600 font-bold mr-2">•</span>{p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">The disciplines</h2>
            <p className="mt-2 text-slate-600 max-w-3xl">Each science, re-rooted. Click in to read its framing, six curriculum units, weekly practices, and reading list.</p>
          </div>
          <span className="text-sm text-slate-500">{rootDisciplines.length} disciplines</span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rootDisciplines.map((d) => (
            <Link
              key={d.slug}
              to={'/roots/' + d.slug}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-brand-300 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{d.icon}</span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700">{d.title}</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{d.summary}</p>
              <div className="mt-4 text-sm font-semibold text-brand-600">Read the curriculum →</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
