import { Link, useParams } from 'react-router-dom'
import { getAudience, audiences } from '../data/audiences.js'
import Icon from '../components/Icon.jsx'
import NotFound from './NotFound.jsx'

// /for/<slug> — one page per audience, driven entirely by src/data/audiences.js.
//
// Voice matches the homepage / About / For-Schools pass: brand-first ("we, at
// Roots"), warm, spacious, and specific about what actually exists. The light
// brand-50 hero is the same treatment those pages use.
//
// This page deliberately does NOT read src/data/resources.js. Featured cards
// come from the audience's own `featured` list so that only real Roots work can
// ever appear here, each item labelled live or roadmap.

function FeaturedCard({ item }) {
  const isRoadmap = item.status === 'roadmap'
  return (
    <Link to={item.to} className="card group relative flex flex-col hover:shadow-soft transition">
      <span
        className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
          isRoadmap
            ? 'bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200'
            : 'bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200'
        }`}
      >
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${isRoadmap ? 'bg-amber-500' : 'bg-emerald-500'}`}
        />
        {isRoadmap ? 'In development' : 'Live now'}
      </span>
      <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-700">
        {item.eyebrow}
      </span>
      <h3 className="mt-2 font-display text-lg font-semibold text-slate-900 group-hover:text-brand-700">
        {item.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{item.body}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:gap-2">
        {item.cta} &rarr;
      </span>
    </Link>
  )
}

export default function AudiencePage() {
  const { slug } = useParams()
  const audience = getAudience(slug)
  if (!audience) return <NotFound />

  const others = audiences.filter((a) => a.slug !== slug)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/80 via-white to-white"
        />
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        />
        <div className="container-page pt-16 pb-16 sm:pt-24 sm:pb-20">
          <div className="mx-auto max-w-3xl">
            <span className="chip inline-flex items-center gap-2">
              <Icon name={audience.icon} className="h-3.5 w-3.5" strokeWidth={2} />
              {audience.eyebrow}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900">
              {audience.headline}
            </h1>
            {audience.intro.map((p, i) => (
              <p
                key={i}
                className={`max-w-2xl text-lg leading-relaxed text-slate-700 ${
                  i === 0 ? 'mt-8' : 'mt-4'
                }`}
              >
                {p}
              </p>
            ))}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {audience.ctas.map((c) => (
                <Link
                  key={c.label}
                  to={c.to}
                  className={`${c.primary ? 'btn-primary' : 'btn-secondary'} px-7 py-3.5 text-base`}
                >
                  {c.label} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What you'll find */}
      <section className="bg-slate-50">
        <div className="container-page py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <span className="chip">What you&rsquo;ll find</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Four things Roots gives you.
            </h2>
            <ul className="mt-10 space-y-5">
              {audience.highlights.map((h) => (
                <li key={h} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-brand-500 to-accent-500"
                  />
                  <p className="text-lg leading-relaxed text-slate-800">{h}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Roots resources — live items and clearly-marked roadmap only. */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="chip">Start here</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            A few things to open first.
          </h2>
          <p className="mt-3 text-slate-600">
            Everything below is from Roots. What is live is marked live, and what we are still
            building says so.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audience.featured.map((item) => (
            <FeaturedCard key={item.to + item.title} item={item} />
          ))}
        </div>
      </section>

      {/* Other audiences */}
      <section className="bg-slate-50">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="chip">Who else Roots is for</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Roots is also for&hellip;
            </h2>
            <p className="mt-3 text-slate-600">
              One curriculum, shaped for very different readers. Here is the note we wrote for
              each of them.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((a) => (
              <Link key={a.slug} to={`/for/${a.slug}`} className="card group flex items-start gap-3">
                <span
                  className={`grid h-10 w-10 flex-none place-items-center rounded-xl bg-gradient-to-br ${a.color} text-white`}
                >
                  <Icon name={a.icon} className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-brand-700">
                    {a.name}
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{a.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
