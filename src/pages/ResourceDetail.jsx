import { Link, useParams } from 'react-router-dom'
import { getResource, resources } from '../data/resources.js'
import { audiences } from '../data/audiences.js'
import Icon from '../components/Icon.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import NotFound from './NotFound.jsx'

export default function ResourceDetail() {
  const { slug } = useParams()
  const resource = getResource(slug)
  if (!resource) return <NotFound />

  const related = resources
    .filter((r) => r.slug !== slug && r.type === resource.type)
    .slice(0, 3)

  const resourceAudiences = audiences.filter((a) =>
    resource.audiences.includes(a.slug),
  )

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-12 pb-10 sm:pt-16">
          <nav className="text-sm text-slate-500">
            <Link to="/resources" className="hover:text-brand-700">
              ← All resources
            </Link>
          </nav>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="chip">{resource.type}</span>
            {resource.subjects.map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200"
              >
                {s}
              </span>
            ))}
          </div>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            {resource.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">{resource.summary}</p>
        </div>
      </section>

      <section className="container-page py-12 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">What's inside</h2>
            <ul className="mt-4 space-y-3">
              {[
                `Delivered as: ${resource.format}`,
                `Author: ${resource.author}`,
                `Best for: ${resource.levels.join(', ')}`,
                `Estimated time: ${resource.duration}`,
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                  <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-brand-600 text-white">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-slate-800">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight">Who it's for</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {resourceAudiences.map((a) => (
                <Link
                  key={a.slug}
                  to={`/for/${a.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-brand-200 hover:bg-brand-50/30"
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${a.color} text-white`}
                  >
                    <Icon name={a.icon} className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-sm font-medium text-slate-900">
                    {a.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="card">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-wide text-slate-500">
                Access
              </span>
              <span className="font-display text-2xl font-semibold text-slate-900">
                {resource.price}
              </span>
            </div>
            <Link to="/contact" className="btn-primary mt-5 w-full">
              Get this resource
            </Link>
            <p className="mt-3 text-center text-xs text-slate-500">
              We'll email a download link or get you onboarded.
            </p>
            <hr className="my-5 border-slate-100" />
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-brand-600" strokeWidth={3} />
                Editable formats where relevant
              </li>
              <li className="flex items-start gap-2">
                <Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-brand-600" strokeWidth={3} />
                Reviewed by working educators
              </li>
              <li className="flex items-start gap-2">
                <Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-brand-600" strokeWidth={3} />
                Community support
              </li>
            </ul>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="container-page pb-20">
          <h2 className="text-2xl font-bold tracking-tight">
            More {resource.type.toLowerCase()} resources
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
