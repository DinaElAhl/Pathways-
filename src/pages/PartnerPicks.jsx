import { useMemo, useState } from 'react'
import { partners, partnerCategories, partnerUrl, affiliateDisclosure } from '../data/partners.js'
import Icon from '../components/Icon.jsx'

export default function PartnerPicks() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return partners.filter((p) => {
      const okCategory = category === 'All' || p.category === category
      if (!okCategory) return false
      if (!q) return true
      const blob = [p.name, p.tagline, p.subject, p.description, p.category]
        .join(' ')
        .toLowerCase()
      return blob.includes(q)
    })
  }, [category, query])

  return (
    <>
      <section className="container-page pt-14 pb-8 sm:pt-20">
        <span className="chip">Partner picks</span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Trusted resources, handpicked.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Lesser-known but genuinely excellent tools, tutors, and textbooks our
          team has vetted — across languages, coding, design, data, and more.
          Many are free. Some are paid — and where we have a referral link, we
          say so clearly below.
        </p>

        <div className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-inset ring-amber-200">
          <strong>Affiliate disclosure · </strong>
          {affiliateDisclosure}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="flex flex-wrap items-center gap-2">
          {['All', ...partnerCategories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`chip cursor-pointer transition ${
                category === c
                  ? 'bg-brand-600 text-white ring-brand-600'
                  : 'hover:bg-slate-100'
              }`}
            >
              {c}
            </button>
          ))}
          <div className="ml-auto">
            <label className="sr-only" htmlFor="partner-search">
              Search partners
            </label>
            <input
              id="partner-search"
              type="search"
              placeholder="Search partners…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.slug}
              className="card flex h-full flex-col"
            >
              <div className="flex items-center justify-between">
                <span className="chip">{p.category}</span>
                {p.commission ? (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                    {p.commission} link
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                    Free · no commission
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-900">
                {p.name}
              </h3>
              <p className="mt-1 text-xs text-slate-500">{p.subject}</p>
              <p className="mt-3 text-sm font-medium text-slate-800">
                {p.tagline}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {p.description}
              </p>

              <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-500">
                  {p.price}
                </span>
                <a
                  href={partnerUrl(p)}
                  target="_blank"
                  rel="noopener sponsored"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  Visit <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2.25} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            No partners match that filter yet.
          </div>
        )}

        <div className="mt-14 rounded-3xl bg-slate-900 p-8 text-slate-100 sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Know a resource we should recommend?
          </h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            We accept partner applications from free and paid resources alike.
            The bar is simple: would we send our own family there?
          </p>
          <a
            href="/apply/partner"
            className="mt-6 inline-flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Apply to be a partner
            <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2.25} />
          </a>
        </div>
      </section>
    </>
  )
}
