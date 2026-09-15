import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  resources,
  resourceTypes,
  ageBands,
  contexts,
  subjects,
  audienceFilters,
} from '../data/resources.js'
import { sections, sectionEyebrows } from '../data/sections.js'
import ResourceCard from '../components/ResourceCard.jsx'
import ProgressionStrip from '../components/ProgressionStrip.jsx'
import Icon from '../components/Icon.jsx'

// One labelled group of single-select filter pills.
function ToggleGroup({ label, options, value, onChange }) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ring-1 ring-inset ${
                active
                  ? 'bg-slate-900 text-white ring-slate-900'
                  : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const opts = (values, allLabel, allValue) => [
  { value: allValue, label: allLabel },
  ...values.map((v) => ({ value: v, label: v })),
]

export default function Resources() {
  const [params, setParams] = useSearchParams()

  const [audience, setAudience] = useState(params.get('audience') || 'all')
  const [age, setAge] = useState('All')
  const [context, setContext] = useState('All')
  const [subject, setSubject] = useState('All')
  const [type, setType] = useState('All')
  const [query, setQuery] = useState('')

  // Keep ?audience=... in sync so audience links from /for/* pages land here.
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
      if (age !== 'All' && !r.ageBands.includes(age)) return false
      if (context !== 'All' && !r.contexts.includes(context)) return false
      if (subject !== 'All' && !r.subjects.includes(subject)) return false
      if (type !== 'All' && r.type !== type) return false
      if (!q) return true
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.subjects.some((s) => s.toLowerCase().includes(q))
      )
    })
  }, [audience, age, context, subject, type, query])

  const reset = () => {
    setAudience('all')
    setAge('All')
    setContext('All')
    setSubject('All')
    setType('All')
    setQuery('')
  }

  const isFiltered =
    audience !== 'all' ||
    age !== 'All' ||
    context !== 'All' ||
    subject !== 'All' ||
    type !== 'All' ||
    query.trim() !== ''

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-14 pb-10 sm:pt-20">
          <span className="chip">Resources</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Everything Roots, in one library.
          </h1>
          <div className="mt-4 max-w-2xl space-y-3 text-lg text-slate-600">
            <p>
              Qur’an, Arabic, Tajweed, and the character work that holds them together —
              organized by who you are, what you teach, and where you’re starting from.
            </p>
            <p>
              Some of this is shipped. Some is on the way. We say which is which, because a
              curriculum built on truth shouldn’t fudge its own inventory.
            </p>
          </div>
        </div>
      </section>

      {/* Progression strip */}
      <ProgressionStrip />

      {/* Filter bar */}
      <section className="container-page pt-8">
        <p className="text-sm text-slate-600">
          Filter by who you are, the age you teach, the context you’re in, or the kind of
          resource you need. Or just scroll — every section names its audience.
        </p>

        <div className="relative mt-4 w-full sm:max-w-md">
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

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ToggleGroup
            label="For"
            options={audienceFilters.map((a) => ({ value: a.slug, label: a.label }))}
            value={audience}
            onChange={setAudience}
          />
          <ToggleGroup
            label="Age band"
            options={opts(ageBands, 'All', 'All')}
            value={age}
            onChange={setAge}
          />
          <ToggleGroup
            label="Context"
            options={opts(contexts, 'All', 'All')}
            value={context}
            onChange={setContext}
          />
          <ToggleGroup
            label="Subject"
            options={opts(subjects, 'All', 'All')}
            value={subject}
            onChange={setSubject}
          />
          <ToggleGroup
            label="Type"
            options={opts(resourceTypes, 'All', 'All')}
            value={type}
            onChange={setType}
          />
        </div>

        <div className="mt-5 flex items-center gap-4">
          <p className="text-xs text-slate-500">
            {filtered.length} {filtered.length === 1 ? 'resource' : 'resources'}
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={reset}
              className="text-xs font-medium text-brand-700 hover:text-brand-800"
            >
              Reset filters
            </button>
          )}
        </div>
      </section>

      {/* Sections */}
      <div className="container-page py-8 pb-16">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-900">Nothing matches.</h3>
            <p className="mt-1 text-sm text-slate-600">
              Try a different age, context, subject, or search term.
            </p>
            <button type="button" onClick={reset} className="btn-secondary mt-5">
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-14">
            {sections.map((section) => {
              const items = filtered.filter((r) => r.section === section.id)
              if (items.length === 0) return null
              return (
                <section key={section.id} aria-labelledby={`section-${section.id}`}>
                  <span className="chip">{sectionEyebrows[section.id]}</span>
                  <h2
                    id={`section-${section.id}`}
                    className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight"
                  >
                    {section.heading}
                  </h2>
                  {section.intro && (
                    <p className="mt-2 max-w-3xl text-slate-600">{section.intro}</p>
                  )}
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((r) => (
                      <ResourceCard key={r.slug} resource={r} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <section className="container-page pb-20">
        <div className="rounded-3xl border border-brand-100 bg-brand-50/50 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Not sure where to start?
          </h2>
          <p className="mt-2 text-slate-600">
            Email Dina at{' '}
            <a
              href="mailto:roots@pathwayslearn.com"
              className="font-semibold text-brand-700 hover:text-brand-800"
            >
              roots@pathwayslearn.com
            </a>
            . Every message is read.
          </p>
        </div>
      </section>
    </>
  )
}
