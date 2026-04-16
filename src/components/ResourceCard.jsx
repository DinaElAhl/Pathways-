import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

const typeIcon = {
  Pathway: 'compass',
  Course: 'book',
  'Lesson plan': 'file',
  Worksheet: 'file',
  Guide: 'book',
  Tool: 'puzzle',
  Workshop: 'users',
  Mentor: 'target',
  Community: 'heart',
}

const typeTint = {
  Pathway: 'bg-brand-50 text-brand-700',
  Course: 'bg-emerald-50 text-emerald-700',
  'Lesson plan': 'bg-sky-50 text-sky-700',
  Worksheet: 'bg-purple-50 text-purple-700',
  Guide: 'bg-amber-50 text-amber-700',
  Tool: 'bg-fuchsia-50 text-fuchsia-700',
  Workshop: 'bg-orange-50 text-orange-700',
  Mentor: 'bg-rose-50 text-rose-700',
  Community: 'bg-teal-50 text-teal-700',
}

export default function ResourceCard({ resource }) {
  const to = resource.link || `/resources/${resource.slug}`
  return (
    <Link to={to} className="card group flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            typeTint[resource.type] || 'bg-slate-50 text-slate-700'
          }`}
        >
          <Icon name={typeIcon[resource.type] || 'tag'} className="h-3.5 w-3.5" strokeWidth={2} />
          {resource.type}
        </span>
        <span className="text-xs font-medium text-slate-500">{resource.price}</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 group-hover:text-brand-700">
        {resource.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">
        {resource.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {resource.subjects.slice(0, 2).map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
        {resource.levels.slice(0, 1).map((l) => (
          <span
            key={l}
            className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-100"
          >
            {l}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
        <span className="text-xs text-slate-500">{resource.format}</span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:gap-2">
          View <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
    </Link>
  )
}
