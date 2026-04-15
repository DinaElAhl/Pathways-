import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { formatEventDate } from '../data/events.js'

const typeTint = {
  Webinar: 'bg-brand-50 text-brand-700',
  Workshop: 'bg-emerald-50 text-emerald-700',
  Meetup: 'bg-accent-500/10 text-accent-600',
  'Office hours': 'bg-purple-50 text-purple-700',
}

export default function EventCard({ event }) {
  const seatsLeft = event.capacity - event.seatsTaken
  const nearlyFull = seatsLeft / event.capacity < 0.15
  const date = new Date(event.start)
  const month = date.toLocaleString(undefined, { month: 'short' })
  const day = date.getDate()

  return (
    <Link
      to={`/events/${event.slug}`}
      className="card group flex h-full gap-5"
    >
      <div className="flex-none">
        <div className="grid h-20 w-16 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-soft">
          <div className="text-center">
            <div className="text-[10px] font-semibold uppercase tracking-wide">
              {month}
            </div>
            <div className="font-display text-2xl font-bold leading-none">{day}</div>
          </div>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
              typeTint[event.type] || 'bg-slate-50 text-slate-700'
            }`}
          >
            {event.type}
          </span>
          {nearlyFull && (
            <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">
              Nearly full
            </span>
          )}
        </div>
        <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-slate-900 group-hover:text-brand-700">
          {event.title}
        </h3>
        <p className="mt-1 text-xs text-slate-500">{formatEventDate(event.start)}</p>
        <p className="mt-1 text-xs text-slate-500">{event.location}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-700 transition group-hover:gap-2">
          View details <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
    </Link>
  )
}
