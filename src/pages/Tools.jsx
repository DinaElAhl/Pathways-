import { Link } from 'react-router-dom'

const tools = [
  {
    slug: 'e2-teaching',
    title: 'E² Teaching Framework',
    tagline: 'Every Student Has the Right to Understand.',
    summary:
      'A complete teaching companion: lesson planner, blueprint/LMS, framework reference, and self-checklist — with helper phrases for every slot so you never face a blank box.',
    icon: '🎓',
  },
]

export default function Tools() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-12 pb-8 sm:pt-16">
          <span className="chip">Tools</span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Teaching tools</h1>
          <p className="mt-3 text-slate-700 max-w-3xl text-lg leading-relaxed">
            Working tools for teachers — each one paired with ready phrases and prompts so the blank page never wins.
          </p>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.slug}
              to={'/tools/' + t.slug}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-brand-300 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{t.icon}</span>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-700">{t.title}</h2>
              </div>
              <p className="mt-2 text-sm font-medium text-brand-700">{t.tagline}</p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{t.summary}</p>
              <div className="mt-4 text-sm font-semibold text-brand-600">Open the tool →</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
