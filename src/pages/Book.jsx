import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { bookingEvents, formatPrice, liveUrl, isLive, requestHref, getBookingEvent } from '../data/booking.js'

// /book — sessions Roots offers. Events live in src/data/booking.js; the
// Calendly account lives in src/config/booking.js.

const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css'
const CALENDLY_JS = 'https://assets.calendly.com/assets/external/widget.js'

// Calendly's official embed. Script tags inside JSX never execute, so the
// stylesheet and script are added to <head> once, then the widget is drawn
// into our div with Calendly.initInlineWidget (which also works on a second
// visit in the same session, when the script is already loaded).
function loadCalendly() {
  if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
    const l = document.createElement('link')
    l.rel = 'stylesheet'
    l.href = CALENDLY_CSS
    document.head.appendChild(l)
  }
  if (window.Calendly) return Promise.resolve(window.Calendly)
  return new Promise((resolve, reject) => {
    let s = document.querySelector(`script[src="${CALENDLY_JS}"]`)
    if (!s) {
      s = document.createElement('script')
      s.src = CALENDLY_JS
      s.async = true
      document.head.appendChild(s)
    }
    s.addEventListener('load', () => resolve(window.Calendly))
    s.addEventListener('error', reject)
  })
}

function CalendlyInline({ url }) {
  const ref = useRef(null)
  useEffect(() => {
    let cancelled = false
    loadCalendly()
      .then((Calendly) => {
        if (cancelled || !ref.current || !Calendly) return
        ref.current.innerHTML = ''
        Calendly.initInlineWidget({ url, parentElement: ref.current })
      })
      .catch(() => {}) // the fallback link below the widget still works
    return () => { cancelled = true }
  }, [url])
  return <div ref={ref} className="w-full" style={{ minWidth: 320, height: 700 }} />
}

export default function Book() {
  const { hash } = useLocation()
  const live = bookingEvents.filter(isLive)
  const soon = bookingEvents.filter((e) => !isLive(e))

  // Deep links like /book#parent-consult. Layout scrolls to the top on every
  // route change, so wait a tick, then bring the card in.
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => document.getElementById(getBookingEvent(hash.slice(1))?.key || hash.slice(1))?.scrollIntoView({ block: 'center' }), 50)
    return () => clearTimeout(t)
  }, [hash])

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/80 via-white to-white" />
        <div className="container-page pt-16 pb-10 sm:pt-24 sm:pb-14">
          <div className="mx-auto max-w-3xl text-center">
            <span className="chip">Book a class</span>
            <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-slate-900">
              Book time with Roots
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
              Book a live Arabic and Qur&rsquo;an class at your level, right here on this page. Calls for
              parents, teachers and schools are on their way &mdash; they are listed below so you can see
              what is coming.
            </p>
          </div>
        </div>
      </section>

      {live.map((e) => (
        <section key={e.key} id={e.key} className="container-page pb-16 sm:pb-20 scroll-mt-24">
          <div className="mx-auto max-w-5xl rounded-3xl border border-brand-200 bg-white p-4 shadow-soft sm:p-8">
            <div className="px-2 sm:px-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-200">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Booking open
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-slate-900">{e.title}</h2>
              <p className="mt-2 max-w-2xl text-slate-700 leading-relaxed">{e.description}</p>
            </div>
            <div className="mt-6">
              <CalendlyInline url={liveUrl(e)} />
            </div>
            <p className="mt-3 px-2 text-sm text-slate-500 sm:px-0">
              Calendar not loading?{' '}
              <a href={liveUrl(e)} target="_blank" rel="noopener noreferrer" className="link">
                Book on Calendly instead &rarr;
              </a>
            </p>
          </div>
        </section>
      ))}

      <section className="container-page pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Coming soon</h2>
          <p className="mt-2 text-slate-600">
            These calls are not bookable online yet. Ask to hear when one opens and we will write back.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {soon.map((e) => (
            <div key={e.key} id={e.key} className={`card flex flex-col scroll-mt-24 ${hash === '#' + e.key ? 'ring-2 ring-brand-500' : ''}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">{e.audience}</span>
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-200">
                  Coming soon
                </span>
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold text-slate-900">{e.title}</h3>
              <div className="mt-2 flex items-baseline gap-3 text-sm text-slate-600">
                <span>{e.minutes} min</span>
                <span aria-hidden="true">&middot;</span>
                <span className={`font-semibold ${e.price === 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                  {formatPrice(e.price)}
                </span>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{e.description}</p>
              <a href={requestHref(e)} className="btn-secondary mt-5 w-full">
                Tell me when it opens
              </a>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-slate-600">
          Paid sessions can be cancelled free of charge up to 24 hours ahead &mdash; see our{' '}
          <Link to="/refund" className="link">refund policy</Link>.
        </p>
      </section>
    </>
  )
}
