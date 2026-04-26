import { Link, useParams } from 'react-router-dom'
import { rootDisciplines } from '../data/rootsOfKnowledge.js'
import { quranicNames, disciplineNames } from '../data/quranicNames.js'

export default function RootDiscipline() {
  const { slug } = useParams()
  const d = rootDisciplines.find((x) => x.slug === slug)

  if (!d) {
    return (
      <section className="container-page py-16">
        <p className="text-slate-600">Discipline not found.</p>
        <Link to="/roots" className="mt-4 inline-block text-brand-600 font-semibold">← Back to Roots of Knowledge</Link>
      </section>
    )
  }

  const others = rootDisciplines.filter((x) => x.slug !== slug).slice(0, 3)
  const reflectedKeys = disciplineNames[slug] || []
  const reflectedNames = reflectedKeys
    .map((k) => quranicNames.find((n) => n.transliteration === k))
    .filter(Boolean)

  return (
    <>
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-10 pb-8 sm:pt-14">
          <Link to="/roots" className="text-sm font-semibold text-brand-600 hover:text-brand-700">← Roots of Knowledge</Link>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl">{d.icon}</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{d.title}</h1>
          </div>
          <p className="mt-3 text-lg text-slate-700 max-w-3xl leading-relaxed">{d.summary}</p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="rounded-2xl border border-brand-200 bg-brand-50/40 p-6">
          <div className="text-xs uppercase tracking-wide font-semibold text-brand-700">How we re-root it</div>
          <p className="mt-2 text-slate-800 leading-relaxed">{d.framing}</p>
        </div>
      </section>

      <section className="container-page py-6">
        <h2 className="text-2xl font-bold text-slate-900">Curriculum units</h2>
        <p className="mt-2 text-slate-600 max-w-3xl">Walked through using the Roots Method: Āyah → Tafakkur → Tamyīz → Tawḥīd → ʿAmal → Shukr.</p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {d.units.map((u, i) => (
            <li key={u.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-brand-600">Unit {i + 1}</div>
              <div className="mt-1 text-lg font-bold text-slate-900">{u.title}</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{u.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {reflectedNames.length > 0 && (
        <section className="bg-gradient-to-b from-amber-50/60 to-white">
          <div className="container-page py-12">
            <span className="chip">Asmāʾu Llāh</span>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">Allah's Names reflected in this science</h2>
            <p className="mt-2 text-slate-700 max-w-3xl leading-relaxed">
              Studying {d.title.toLowerCase()} is, at root, walking through these Names. Each unit above can be re-read by asking: which Name am I being shown here, and how must my life echo it for real success?
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {reflectedNames.map((n) => (
                <div key={n.transliteration} className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
                  <div className="flex items-baseline gap-3">
                    <span className="text-lg font-bold text-amber-800">{n.transliteration}</span>
                    <span className="text-xl font-arabic text-slate-900" dir="rtl" lang="ar">{n.arabic}</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-600">{n.meaning}</div>
                  <div className="mt-3 text-xs uppercase tracking-wide font-semibold text-emerald-700">Manifestation</div>
                  <p className="mt-1 text-sm text-slate-800 leading-relaxed">{n.manifestation}</p>
                  <div className="mt-3 text-xs uppercase tracking-wide font-semibold text-amber-700">Tafakkur</div>
                  <p className="mt-1 text-sm text-slate-800 leading-relaxed">{n.tafakkur}</p>
                  <div className="mt-3 text-xs uppercase tracking-wide font-semibold text-brand-700">Akhlāq — for real success</div>
                  <p className="mt-1 text-sm text-slate-800 leading-relaxed">{n.akhlaq}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/roots" className="text-sm font-semibold text-brand-600 hover:text-brand-700">See all of Allah's Names in the universe →</Link>
            </div>
          </div>
        </section>
      )}

      {d.practices && d.practices.length > 0 && (
        <section className="bg-slate-50">
          <div className="container-page py-10">
            <h2 className="text-2xl font-bold text-slate-900">Weekly practices</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {d.practices.map((p) => (
                <li key={p} className="rounded-xl bg-white p-4 border border-slate-200 text-slate-700">
                  <span className="text-brand-600 font-bold mr-2">•</span>{p}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {d.resources && d.resources.length > 0 && (
        <section className="container-page py-10">
          <h2 className="text-2xl font-bold text-slate-900">Reading list</h2>
          <ul className="mt-4 space-y-2">
            {d.resources.map((r) => (
              <li key={r.label} className="rounded-xl bg-white p-4 border border-slate-200">
                <div className="font-semibold text-slate-900">{r.label}</div>
                {r.note && <div className="text-sm text-slate-600 mt-1">{r.note}</div>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="container-page py-12">
        <h2 className="text-2xl font-bold text-slate-900">Continue exploring</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              to={'/roots/' + o.slug}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-brand-300 transition"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{o.icon}</span>
                <h3 className="font-bold text-slate-900 group-hover:text-brand-700">{o.title}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{o.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
