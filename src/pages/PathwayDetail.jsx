import { Link, useParams } from 'react-router-dom'
import { getPathway, getRelatedPathways } from '../data/pathways.js'
import Icon from '../components/Icon.jsx'
import NotFound from './NotFound.jsx'

function Stat({ label, value }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm opacity-75">{label}</div>
    </div>
  )
}

function ResourceBadge({ type }) {
  const colors = {
    'Free Course': 'bg-green-100 text-green-800',
    'Free Certification': 'bg-green-100 text-green-800',
    'Free Book': 'bg-green-100 text-green-800',
    'Free Video': 'bg-blue-100 text-blue-800',
    'Free Tutorial': 'bg-blue-100 text-blue-800',
    'Free Audit': 'bg-green-100 text-green-800',
    'Free App': 'bg-green-100 text-green-800',
    'Free Tool': 'bg-green-100 text-green-800',
    'Free Lab': 'bg-green-100 text-green-800',
    'Free Guide': 'bg-green-100 text-green-800',
    'Free Flashcards': 'bg-green-100 text-green-800',
    'Free Resource': 'bg-green-100 text-green-800',
    'Free Practice': 'bg-green-100 text-green-800',
    'Free Media': 'bg-green-100 text-green-800',
    'Documentation': 'bg-gray-100 text-gray-700',
    'Reference': 'bg-gray-100 text-gray-700',
    'Interactive': 'bg-purple-100 text-purple-800',
    'Paid Course': 'bg-orange-100 text-orange-800',
    'Paid Book': 'bg-orange-100 text-orange-800',
    'Paid/Audit Free': 'bg-yellow-100 text-yellow-800',
    'Article': 'bg-sky-100 text-sky-800',
    'Articles': 'bg-sky-100 text-sky-800',
    'Practice': 'bg-indigo-100 text-indigo-800',
    'Dataset': 'bg-teal-100 text-teal-800',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[type] || 'bg-gray-100 text-gray-700'}`}>
      {type}
    </span>
  )
}

export default function PathwayDetail() {
  const { slug } = useParams()
  const pathway = getPathway(slug)
  if (!pathway) return <NotFound />

  const related = getRelatedPathways(slug)
  const totalLessons = pathway.stages
    ? pathway.stages.reduce((n, s) => n + s.lessons, 0)
    : 0
  const totalResources = pathway.stages
    ? pathway.stages.reduce((n, s) => n + (s.resources?.length || 0), 0)
    : 0

  return (
    <>
      {/* Hero Header */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${pathway.color} text-white`}>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]"
        />
        <div className="container-page relative py-16 sm:py-20">
          <nav className="text-sm text-white/80">
            <Link to="/pathways" className="hover:text-white">
              &larr; All pathways
            </Link>
          </nav>
          <div className="mt-6 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              {pathway.category}
            </span>
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              {pathway.level}
            </span>
          </div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {pathway.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/90">{pathway.tagline}</p>
          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Duration" value={pathway.duration} />
            <Stat label="Commitment" value={pathway.hours} />
            <Stat label="Stages" value={pathway.stages?.length || 0} />
            <Stat label="Resources" value={totalResources + '+'} />
          </dl>
        </div>
      </section>

      {/* Summary */}
      <section className="container-page py-10">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">About this pathway</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{pathway.summary}</p>
        </div>
      </section>

      {/* Learning Outcomes */}
      {pathway.outcomes && (
        <section className="bg-gray-50 py-10">
          <div className="container-page max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What you will achieve</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {pathway.outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">✓</span>
                  <span className="text-gray-700">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Stages with Resources */}
      {pathway.stages && (
        <section className="container-page py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Curriculum & Trusted Resources</h2>
          <p className="text-gray-500 mb-8 text-base">Every stage includes the best free and paid resources from across the internet — curated and reviewed.</p>
          <div className="space-y-8">
            {pathway.stages.map((stage, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                {/* Stage Header */}
                <div className={`px-6 py-5 bg-gradient-to-r ${pathway.color} text-white`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white font-bold text-sm">{i + 1}</span>
                        <h3 className="text-xl font-bold">{stage.title}</h3>
                      </div>
                      <p className="text-white/80 text-sm ml-11">{stage.weeks}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-sm text-white/80 flex-shrink-0">
                      <span>{stage.lessons} lessons</span>
                      <span>{stage.resources?.length || 0} resources</span>
                    </div>
                  </div>
                  <p className="mt-3 text-white/90 text-sm leading-relaxed ml-11">{stage.description}</p>
                </div>

                {/* Resources */}
                {stage.resources && (
                  <div className="divide-y divide-gray-100 bg-white">
                    {stage.resources.map((res, j) => (
                      <a
                        key={j}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 px-6 py-4 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                              {res.title}
                            </span>
                            {res.recommended && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-yellow-100 text-yellow-800">
                                ★ Recommended
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <ResourceBadge type={res.type} />
                            <span className="text-sm text-gray-500">{res.source}</span>
                          </div>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Pathways */}
      {related.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="container-page">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue your journey</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => (
                <Link
                  key={p.slug}
                  to={`/pathways/${p.slug}`}
                  className="block rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className={`h-2 bg-gradient-to-r ${p.color}`} />
                  <div className="p-5">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{p.category}</span>
                    <h3 className="mt-1 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{p.tagline}</p>
                    <div className="mt-3 flex gap-3 text-xs text-gray-400">
                      <span>{p.duration}</span>
                      <span>·</span>
                      <span>{p.level}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <div className="container-page py-10 flex items-center justify-between border-t border-gray-200">
        {pathway.prevPath ? (
          <Link
            to={`/pathways/${pathway.prevPath}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            &larr; {getPathway(pathway.prevPath)?.title}
          </Link>
        ) : <span />}
        {pathway.nextPath ? (
          <Link
            to={`/pathways/${pathway.nextPath}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            {getPathway(pathway.nextPath)?.title} &rarr;
          </Link>
        ) : <span />}
      </div>
    </>
  )
}
