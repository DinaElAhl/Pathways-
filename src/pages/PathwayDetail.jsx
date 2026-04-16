import { Link, useParams } from 'react-router-dom'
import { getPathway, pathways } from '../data/pathways.js'
import Icon from '../components/Icon.jsx'
import PathwayCard from '../components/PathwayCard.jsx'
import NotFound from './NotFound.jsx'

export default function PathwayDetail() {
  const { slug } = useParams()
  const pathway = getPathway(slug)
  if (!pathway) return <NotFound />

  const related = pathways.filter((p) => p.slug !== slug).slice(0, 3)
  const totalLessons = pathway.modules.reduce((n, m) => n + m.lessons, 0)

  return (
    <>
      {/* Header */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${pathway.color} text-white`}>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]"
        />
        <div className="container-page relative py-16 sm:py-20">
          <nav className="text-sm text-white/80">
            <Link to="/pathways" className="hover:text-white">
              ← All pathways
            </Link>
          </nav>
          <div className="mt-6 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              {pathway.category}
            </span>
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              {pathway.level}
            </span>
          </div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {pathway.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/90">{pathway.tagline}</p>

          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Duration" value={pathway.duration} />
            <Stat label="Commitment" value={pathway.hours} />
            <Stat label="Modules" value={pathway.modules.length} />
            <Stat label="Lessons" value={totalLessons} />
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="btn-primary bg-white text-brand-800 hover:bg-brand-50">
              Enroll now
            </Link>
            <a href="#curriculum" className="btn-secondary bg-white/10 text-white ring-white/30 hover:bg-white/20">
              See curriculum
            </a>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-page py-14 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">About this pathway</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">{pathway.summary}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">What you'll learn</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {pathway.outcomes.map((o) => (
                <li key={o} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                  <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-brand-600 text-white">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-slate-800">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="curriculum" className="scroll-mt-20">
            <h2 className="text-2xl font-bold tracking-tight">Curriculum</h2>
            <ol className="mt-4 space-y-3">
              {pathway.modules.map((m, i) => (
                <li
                  key={m.title}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-brand-200 hover:bg-brand-50/30"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 font-display text-sm font-semibold text-brand-700">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-medium text-slate-900">{m.title}</h3>
                      <p className="text-xs text-slate-500">
                        {m.lessons} lessons
                      </p>
                    </div>
                  </div>
                  <Icon name="arrowRight" className="h-4 w-4 text-slate-400" strokeWidth={2} />
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          <div className="card">
            <h3 className="text-lg font-semibold">What's included</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {[
                'Mentor office hours every week',
                'Private learner community',
                'Hands-on projects and code reviews',
                'Certificate on completion',
                'Lifetime access to materials',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-brand-600" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-primary mt-6 w-full">
              Enroll now
            </Link>
            <p className="mt-3 text-center text-xs text-slate-500">
              7-day money-back guarantee
            </p>
          </div>
        </aside>
      </section>

      {/* Related */}
      <section className="container-page pb-20">
        <h2 className="text-2xl font-bold tracking-tight">Other pathways you'll like</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <PathwayCard key={p.slug} pathway={p} />
          ))}
        </div>
      </section>
    </>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
      <dt className="text-xs uppercase tracking-wide text-white/70">{label}</dt>
      <dd className="mt-0.5 font-display text-lg font-semibold">{value}</dd>
    </div>
  )
}
