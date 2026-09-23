import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { bookingEvents, bookingHref, formatPrice, isCalConfigured, BOOKING_EMAIL } from '../data/booking.js'

// /book — the conversations Roots offers. Content lives in src/data/booking.js.
// TODO: replace with Cal.com URL — Dina will provide roots.cal.com or similar
// once account is created (set CAL_BASE_URL in src/data/booking.js; an embedded
// Cal.com widget can replace the cards' links at that point).
export default function Book() {
  const calReady = isCalConfigured()
  const { hash } = useLocation()

  // Deep links like /book#parent-consult come from the audience pages. Layout
  // scrolls to the top on every route change, so wait a tick, then bring the card in.
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'center' }), 50)
    return () => clearTimeout(t)
  }, [hash])

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/80 via-white to-white" />
        <div className="container-page pt-16 pb-10 sm:pt-24 sm:pb-14">
          <div className="mx-auto max-w-3xl text-center">
            <span className="chip">Book a call</span>
            <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-slate-900">
              Book time with Roots
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
              Sometimes a conversation is faster than a page. We talk with parents planning a child&rsquo;s
              Qur&rsquo;an and Arabic at home, teachers and tutors working with Roots, and schools weighing
              whether Roots fits their program. Start with the free call if you are not sure which you need.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bookingEvents.map((e) => (
            <div key={e.key} id={e.key} className={`card flex flex-col scroll-mt-24 ${hash === '#' + e.key ? 'ring-2 ring-brand-500' : ''}`}>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">{e.audience}</span>
              <h2 className="mt-2 font-display text-lg font-semibold text-slate-900">{e.title}</h2>
              <div className="mt-2 flex items-baseline gap-3 text-sm text-slate-600">
                <span>{e.minutes} min</span>
                <span aria-hidden="true">&middot;</span>
                <span className={`font-semibold ${e.price === 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                  {formatPrice(e.price)}
                </span>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{e.description}</p>
              <a href={bookingHref(e)} className="btn-primary mt-5 w-full">
                Book &rarr;
              </a>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-slate-600">
          {calReady
            ? 'Pick a time on the next screen. '
            : <>Online scheduling is coming soon. For now, the button opens an email to {BOOKING_EMAIL} &mdash; send a few times that suit you and we will confirm one. </>}
          Paid calls can be cancelled free of charge up to 24 hours ahead &mdash; see our{' '}
          <Link to="/refund" className="link">refund policy</Link>.
        </p>
      </section>
    </>
  )
}
