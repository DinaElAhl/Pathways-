import { Link, useParams } from 'react-router-dom'
import { getAudience, audiences } from '../data/audiences.js'
import { resources } from '../data/resources.js'
import Icon from '../components/Icon.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import NotFound from './NotFound.jsx'

export default function AudiencePage() {
  const { slug } = useParams()
  const audience = getAudience(slug)
  if (!audience) return <NotFound />

  const featured = resources
    .filter((r) => r.audiences.includes(slug))
    .slice(0, 3)

  const others = audiences.filter((a) => a.slug !== slug)

  return (
    <>
      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${audience.color} text-white`}>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]"
        />
        <div className="container-page relative py-16 sm:py-20">
          <nav className="text-sm text-white/80">
            <Link to="/" className="hover:text-white">
              ← Back home
            </Link>
          </nav>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Icon name={audience.icon} className="h-3.5 w-3.5" strokeWidth={2} />
            For {audience.name.toLowerCase()}
          </span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl">
            {audience.headline}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/90">{audience.sub}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {audience.ctas.map((c) => (
              <Link
                key={c.label}
                to={c.to}
                className={
                  c.primary
                    ? 'btn-primary bg-white text-slate-900 hover:bg-brand-50'
                    : 'btn-secondary bg-white/10 text-white ring-white/30 hover:bg-white/20'
                }
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container-page py-14">
        <div className="max-w-2xl">
          <span className="chip">What you'll find</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Made for {audience.name.toLowerCase()} — in the details that matter.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {audience.highlights.map((h) => (
            <div key={h} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-5">
              <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-brand-600 text-white">
                <Icon name="check" className="h-4 w-4" strokeWidth={3} />
              </span>
              <p className="text-sm text-slate-800">{h}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured resources */}
      {featured.length > 0 && (
        <section className="bg-slate-50">
          <div className="container-page py-14">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <span className="chip">Featured resources</span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  A few things to start with.
                </h2>
              </div>
              <Link
                to={`/resources?audience=${audience.slug}`}
                className="link inline-flex items-center gap-1"
              >
                See all {audience.name.toLowerCase()} resources{' '}
                <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((r) => (
                <ResourceCard key={r.slug} resource={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      <section className="container-page py-14">
        <figure className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12">
          <svg aria-hidden="true" className="h-8 w-8 text-brand-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83v-6.83H5.17A2 2 0 0 1 7.17 9zM18.83 6A5.17 5.17 0 0 0 13.66 11.17V18h6.83v-6.83h-3.66a2 2 0 0 1 2-2z" />
          </svg>
          <blockquote className="mt-4 font-display text-2xl leading-snug text-slate-900">
            &ldquo;{audience.testimonial.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-sm text-slate-600">
            <strong className="font-semibold text-slate-900">
              {audience.testimonial.name}
            </strong>{' '}
            &middot; {audience.testimonial.role}
          </figcaption>
        </figure>
      </section>

      {/* Other audiences */}
      <section className="container-page pb-20">
        <h2 className="text-2xl font-bold tracking-tight">Pathways is also for…</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((a) => (
            <Link
              key={a.slug}
              to={`/for/${a.slug}`}
              className="card group flex items-start gap-3"
            >
              <span
                className={`grid h-10 w-10 flex-none place-items-center rounded-xl bg-gradient-to-br ${a.color} text-white`}
              >
                <Icon name={a.icon} className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-brand-700">
                  {a.name}
                </h3>
                <p className="mt-0.5 text-xs text-slate-600 line-clamp-2">{a.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
