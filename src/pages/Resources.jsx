import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { resources, resourceTypes } from '../data/resources.js'
import { audiences } from '../data/audiences.js'
import ResourceCard from '../components/ResourceCard.jsx'
import Icon from '../components/Icon.jsx'

const audienceOptions = [
  { slug: 'all', name: 'Everyone' },
  ...audiences.map((a) => ({ slug: a.slug, name: a.name })),
]

export default function Resources() {
  const [params, setParams] = useSearchParams()
  const initialAudience = params.get('audience') || 'all'

  const [audience, setAudience] = useState(initialAudience)
  const [type, setType] = useState('All')
  const [query, setQuery] = useState('')

  // Keep URL ?audience=... in sync so audience links from /for/* pages land here.
  useEffect(() => {
    const next = new URLSearchParams(params)
    if (audience === 'all') next.delete('audience')
    else next.set('audience', audience)
    if (next.toString() !== params.toString()) {
      setParams(next, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audience])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return resources.filter((r) => {
      if (audience !== 'all' && !r.audiences.includes(audience)) return false
      if (type !== 'All' && r.type !== type) return false
      if (!q) return true
      return (
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.subjects.some((s) => s.toLowerCase().includes(q))
      )
    })
  }, [audience, type, query])

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-14 pb-10 sm:pt-20">
          <span className="chip">Resources</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            A library for everyone who learns and teaches.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Lesson plans, courses, guides, tools, workshops, mentors, and communities
            — organized by who they're for and what they help you do.
          </p>
        </div>
      </section>

      {/* Audience tabs */}
      <section className="container-page pt-6">
        <div className="flex flex-wrap gap-2">
          {audienceOptions.map((a) => (
            <button
              key={a.slug}
              type="button"
              onClick={() => setAudience(a.slug)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ring-1 ring-inset ${
                audience === a.slug
                  ? 'bg-brand-600 text-white ring-brand-600 shadow-soft'
                  : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50'
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>
      </section>

      {/* Type + search */}
      <section className="container-page pt-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {['All', ...resourceTypes].map((t) => (
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
          <div className="relative w-full md:max-w-xs">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Icon name="search" className="h-4 w-4" strokeWidth={2} />
            </span>
            <label htmlFor="resource-search" className="sr-only">
              Search resources
            </label>
            <input
              id="resource-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full rounded-full border-0 bg-white pl-9 pr-4 py-2.5 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          {filtered.length} {filtered.length === 1 ? 'resource' : 'resources'}
        </p>
      </section>

      {/* Grid */}
      <section className="container-page py-8 pb-20">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              Nothing here yet.
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Try a different audience, type, or search term.
            </p>
            <button
              type="button"
              onClick={() => {
                setAudience('all')
                setType('All')
                setQuery('')
              }}
              className="btn-secondary mt-5"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
