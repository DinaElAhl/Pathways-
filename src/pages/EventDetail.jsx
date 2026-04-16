import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { getEvent, events, formatEventDate } from '../data/events.js'
import Icon from '../components/Icon.jsx'
import EventCard from '../components/EventCard.jsx'
import NotFound from './NotFound.jsx'

export default function EventDetail() {
  const { slug } = useParams()
  const event = getEvent(slug)
  if (!event) return <NotFound />

  const related = events.filter((e) => e.slug !== slug).slice(0, 3)
  const past = new Date(event.start).getTime() < Date.now()
  const seatsLeft = event.capacity - event.seatsTaken

  const [rsvped, setRsvped] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const onRsvp = (e) => {
    e.preventDefault()
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.')
      return
    }
    setRsvped(true)
    setEmail('')
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-12 pb-10 sm:pt-16">
          <nav className="text-sm text-slate-500">
            <Link to="/events" className="hover:text-brand-700">
              ← All events
            </Link>
          </nav>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="chip">{event.type}</span>
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
              {formatEventDate(event.start)}
            </span>
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
              {event.durationMin} min
            </span>
          </div>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            {event.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">{event.summary}</p>
        </div>
      </section>

      <section className="container-page py-12 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Agenda</h2>
            <ol className="mt-4 space-y-3">
              {event.agenda.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 p-4"
                >
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-brand-50 font-display text-xs font-semibold text-brand-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-slate-800">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">Hosted by</h2>
            <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              {event.host}
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="card">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-wide text-slate-500">
                Price
              </span>
              <span className="font-display text-2xl font-semibold text-slate-900">
                {event.price}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <Row icon="clock" label={formatEventDate(event.start)} />
              <Row icon="pin" label={event.location} />
              <Row icon="users" label={`${seatsLeft} of ${event.capacity} seats left`} />
            </div>

            {past ? (
              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                This event has ended. Browse upcoming events below.
              </div>
            ) : rsvped ? (
              <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-center">
                <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-emerald-600 text-white">
                  <Icon name="check" className="h-4 w-4" strokeWidth={3} />
                </span>
                <p className="mt-2 text-sm font-medium text-emerald-900">
                  You're in — we'll email your join link.
                </p>
              </div>
            ) : (
              <form onSubmit={onRsvp} noValidate className="mt-5 space-y-2">
                <label htmlFor="rsvp-email" className="sr-only">Email</label>
                <input
                  id="rsvp-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full rounded-full border-0 bg-white px-4 py-2.5 text-sm text-slate-900 ring-1 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 ${
                    error ? 'ring-rose-300' : 'ring-slate-200'
                  }`}
                />
                {error && <p className="text-xs text-rose-600">{error}</p>}
                <button type="submit" className="btn-primary w-full">
                  Reserve a spot
                </button>
                <p className="text-center text-xs text-slate-500">
                  Can't make it live? RSVP anyway — we'll send the recording.
                </p>
              </form>
            )}
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="container-page pb-20">
          <h2 className="text-2xl font-bold tracking-tight">Other upcoming events</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

function Row({ icon, label }) {
  return (
    <div className="flex items-start gap-2">
      <Icon name={icon} className="mt-0.5 h-4 w-4 flex-none text-slate-500" strokeWidth={2} />
      <span>{label}</span>
    </div>
  )
}
