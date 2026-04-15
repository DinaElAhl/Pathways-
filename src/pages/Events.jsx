import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { events, eventTypes } from '../data/events.js'
import { audiences } from '../data/audiences.js'
import EventCard from '../components/EventCard.jsx'

const audienceOptions = [
  { slug: 'all', name: 'Everyone' },
  ...audiences.map((a) => ({ slug: a.slug, name: a.name })),
]

export default function Events() {
  const [type, setType] = useState('All')
  const [audience, setAudience] = useState('all')

  const now = Date.now()
  const upcoming = useMemo(
    () =>
      events
        .filter((e) => new Date(e.start).getTime() >= now)
        .sort((a, b) => new Date(a.start) - new Date(b.start)),
    [now],
  )

  const filtered = useMemo(() => {
    return upcoming.filter((e) => {
      if (type !== 'All' && e.type !== type) return false
      if (audience !== 'all' && !e.audiences.includes(audience)) return false
      return true
    })
  }, [upcoming, type, audience])

  const next = filtered[0]

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-14 pb-10 sm:pt-20">
          <span className="chip">Events</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Learn together. In real time.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Live webinars, working-session workshops, and community meetups — for
            everyone in the Pathways ecosystem. All free unless noted.
          </p>
        </div>
      </section>

      {/* Spotlight next event */}
      {next && (
        <section className="container-page pt-8">
          <article className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-8 text-white sm:p-12 shadow-soft">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              Happening next
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">
              {next.title}
            </h2>
            <p className="mt-3 max-w-2xl text-brand-100">{next.summary}</p>
            <dl className="mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
              <Info label="When" value={new Date(next.start).toLocaleDateString(undefined, {
                weekday: 'short', month: 'short', day: 'numeric',
              })} />
              <Info label="Format" value={next.type} />
              <Info label="Where" value={next.location} />
            </dl>
            <Link
              to={`/events/${next.slug}`}
              className="btn-primary mt-8 bg-white text-brand-800 hover:bg-brand-50"
            >
              Reserve a spot
            </Link>
          </article>
        </section>
      )}

      {/* Filters */}
      <section className="container-page pt-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {['All', ...eventTypes].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ring-1 ring-inset ${
                  type === t
                    ? 'bg-slate-900 text-white ring-slate-900'
                    : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {audienceOptions.map((a) => (
              <button
                key={a.slug}
                type="button"
                onClick={() => setAudience(a.slug)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ring-1 ring-inset ${
                  audience === a.slug
                    ? 'bg-brand-600 text-white ring-brand-600'
                    : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container-page py-10 pb-20">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              No events match those filters.
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Try a different type or audience.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
      <dt className="text-xs uppercase tracking-wide text-white/70">{label}</dt>
      <dd className="mt-0.5 font-display text-sm font-semibold">{value}</dd>
    </div>
  )
}
