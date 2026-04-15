import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function PathwayCard({ pathway }) {
  return (
    <Link
      to={`/pathways/${pathway.slug}`}
      className="card group flex h-full flex-col"
    >
      <div className="flex items-center justify-between">
        <span
          className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${pathway.color} text-white shadow-soft`}
        >
          <Icon name={pathway.icon} className="h-5 w-5" strokeWidth={2} />
        </span>
        <span className="chip">{pathway.category}</span>
      </div>

      <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900 group-hover:text-brand-700">
        {pathway.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {pathway.tagline}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg bg-slate-50 p-3">
          <dt className="text-slate-500">Level</dt>
          <dd className="mt-0.5 font-medium text-slate-900">{pathway.level}</dd>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <dt className="text-slate-500">Duration</dt>
          <dd className="mt-0.5 font-medium text-slate-900">{pathway.duration}</dd>
        </div>
      </dl>

      <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-500">{pathway.hours}</span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:gap-2">
          Explore <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
    </Link>
  )
}
