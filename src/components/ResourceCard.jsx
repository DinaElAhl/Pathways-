import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { statusMeta } from '../data/resources.js'

const typeIcon = {
  Curriculum: 'compass',
  Course: 'book',
  'Lesson plan': 'file',
  Worksheet: 'file',
  Guide: 'book',
  Tool: 'puzzle',
  Sample: 'sparkles',
  Exam: 'check',
  Video: 'target',
  Community: 'heart',
}

const typeTint = {
  Curriculum: 'bg-brand-50 text-brand-700',
  Course: 'bg-emerald-50 text-emerald-700',
  'Lesson plan': 'bg-sky-50 text-sky-700',
  Worksheet: 'bg-purple-50 text-purple-700',
  Guide: 'bg-amber-50 text-amber-700',
  Tool: 'bg-fuchsia-50 text-fuchsia-700',
  Sample: 'bg-teal-50 text-teal-700',
  Exam: 'bg-rose-50 text-rose-700',
  Video: 'bg-orange-50 text-orange-700',
  Community: 'bg-indigo-50 text-indigo-700',
}

// External (full URL) or a non-SPA static file like /rqap.html → plain anchor.
// Everything else is an in-app react-router path.
function isExternal(url) {
  return /^https?:/i.test(url) || /\.html?($|[?#])/i.test(url)
}

// First tag from each dimension, up to three pills.
function tagPills(resource) {
  return [
    resource.subjects?.[0],
    resource.ageBands?.[0],
    resource.contexts?.[0],
  ].filter(Boolean)
}

export default function ResourceCard({ resource }) {
  const isRoadmap = resource.status === 'roadmap'
  const status = statusMeta[resource.status] || statusMeta.live
  const pills = tagPills(resource)

  const Body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            typeTint[resource.type] || 'bg-slate-50 text-slate-700'
          }`}
        >
          <span aria-hidden="true">{status.dot}</span>
          <Icon
            name={typeIcon[resource.type] || 'tag'}
            className="h-3.5 w-3.5"
            strokeWidth={2}
          />
          {resource.type}
        </span>
        {resource.price && (
          <span className="text-xs font-semibold text-slate-500">{resource.price}</span>
        )}
      </div>

      <h3
        className={`mt-4 text-lg font-semibold tracking-tight ${
          isRoadmap ? 'text-slate-500' : 'text-slate-900 group-hover:text-brand-700'
        }`}
      >
        {resource.title}
      </h3>
      <p
        className={`mt-2 text-sm leading-relaxed line-clamp-3 ${
          isRoadmap ? 'text-slate-400' : 'text-slate-600'
        }`}
      >
        {resource.description}
      </p>

      {pills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {pills.map((p) => (
            <span
              key={p}
              className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-100"
            >
              {p}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
        <span className="text-xs text-slate-500">{resource.meta || ''}</span>
        {isRoadmap ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
            To build
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:gap-2">
            {isExternal(resource.url) ? 'Open' : 'View'}{' '}
            <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
          </span>
        )}
      </div>
    </>
  )

  const cardClass = `card flex h-full flex-col ${
    isRoadmap ? 'opacity-70' : 'group'
  }`

  // Roadmap items have no destination.
  if (isRoadmap || !resource.url) {
    return <div className={cardClass}>{Body}</div>
  }

  if (isExternal(resource.url)) {
    return (
      <a
        href={resource.url}
        target={/^https?:/i.test(resource.url) ? '_blank' : undefined}
        rel={/^https?:/i.test(resource.url) ? 'noopener noreferrer' : undefined}
        className={cardClass}
      >
        {Body}
      </a>
    )
  }

  return (
    <Link to={resource.url} className={cardClass}>
      {Body}
    </Link>
  )
}
