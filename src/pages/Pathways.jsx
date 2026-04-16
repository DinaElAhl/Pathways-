import { useMemo, useState } from 'react'
import { pathways } from '../data/pathways.js'
import PathwayCard from '../components/PathwayCard.jsx'

const categories = ['All', ...Array.from(new Set(pathways.map((p) => p.category)))]

export default function Pathways() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return pathways.filter((p) => {
      const inCat = category === 'All' || p.category === category
      if (!inCat) return false
      if (!q) return true
      return (
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
      )
    })
  }, [category, query])

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-14 pb-10 sm:pt-20">
          <span className="chip">All pathways</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Find the journey that fits your goal.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Browse every pathway across engineering, data, design, product, and AI —
            each with clear outcomes and mentor support.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container-page pt-6 pb-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ring-1 ring-inset ${
                  category === c
                    ? 'bg-brand-600 text-white ring-brand-600 shadow-soft'
                    : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full md:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search pathways
            </label>
            <input
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pathways..."
              className="w-full rounded-full border-0 bg-white px-4 py-2.5 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container-page py-10">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              No pathways match your filters yet.
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Try clearing your search or picking a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('All')
                setQuery('')
              }}
              className="btn-secondary mt-5"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PathwayCard key={p.slug} pathway={p} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
