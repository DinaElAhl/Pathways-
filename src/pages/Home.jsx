import { Link } from 'react-router-dom'
import { pathways } from '../data/pathways.js'
import { audiences } from '../data/audiences.js'
import { resources } from '../data/resources.js'
import PathwayCard from '../components/PathwayCard.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import Icon from '../components/Icon.jsx'

const stats = [
  { value: '50+', label: 'Guided pathways' },
  { value: '500+', label: 'Resources' },
  { value: '12k', label: 'Active members' },
  { value: '4.9★', label: 'Average rating' },
]

const steps = [
  {
    n: '01',
    title: 'Tell us who you are',
    body: 'Learner, teacher, parent, school, educator — we meet you where you are.',
  },
  {
    n: '02',
    title: 'Find what you need',
    body: 'Browse pathways, lesson plans, courses, tools, mentors, and communities — all in one place.',
  },
  {
    n: '03',
    title: 'Make it happen',
    body: 'Use it, share it, build on it. Pathways grows with you, week after week.',
  },
]

export default function Home() {
  const featuredPathways = pathways.slice(0, 3)
  const featuredResources = resources.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/80 via-white to-white"
        />
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        />
        <div className="container-page pt-16 pb-16 sm:pt-24 sm:pb-20 text-center">
          <span className="chip">For everyone who learns and teaches</span>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            One place to find{' '}
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
              whatever you need
            </span>
            <br className="hidden sm:block" /> to learn, teach, and grow.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Pathways brings together learners, teachers, parents, schools, and
            educators. Find curated journeys, lesson plans, courses, tools, mentors,
            and community — all in one hub.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/resources" className="btn-primary px-6 py-3 text-base">
              Explore resources
              <Icon name="arrowRight" className="ml-2 h-4 w-4" strokeWidth={2} />
            </Link>
            <Link to="/pathways" className="btn-secondary px-6 py-3 text-base">
              Browse pathways
            </Link>
          </div>

          {/* Stats */}
          <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/60 p-4 ring-1 ring-slate-200 backdrop-blur">
                <dt className="text-xs uppercase tracking-wide text-slate-500">{s.label}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-slate-900">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Audiences */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="chip">Who it's for</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Pick your way in.
          </h2>
          <p className="mt-2 text-slate-600">
            We've curated everything around the people who actually show up for
            learning — every day.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <Link
              key={a.slug}
              to={`/for/${a.slug}`}
              className="card group flex flex-col"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${a.color} text-white shadow-soft`}
                >
                  <Icon name={a.icon} className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-brand-700">
                    {a.name}
                  </h3>
                  <p className="text-xs text-slate-500">{a.sub}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 line-clamp-3">
                {a.headline}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:gap-2">
                Open hub <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured resources */}
      <section className="bg-slate-50">
        <div className="container-page py-16 sm:py-20">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span className="chip">From the library</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                A few handpicked resources.
              </h2>
              <p className="mt-2 max-w-xl text-slate-600">
                Lesson plans, guides, tools and more — reviewed by working educators
                and ready to use.
              </p>
            </div>
            <Link to="/resources" className="link inline-flex items-center gap-1">
              Browse all <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredResources.map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured pathways */}
      <section className="container-page py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="chip">Featured pathways</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Go deep with a structured journey.
            </h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Full pathways — not single courses. Mentor-guided, project-based, and
              designed to be finished.
            </p>
          </div>
          <Link to="/pathways" className="link inline-flex items-center gap-1">
            View all <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPathways.map((p) => (
            <PathwayCard key={p.slug} pathway={p} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="chip">How it works</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              One hub, three steps.
            </h2>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="relative rounded-2xl border border-slate-200 bg-white p-6">
                <span className="font-display text-5xl font-bold text-brand-100">
                  {s.n}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonial */}
      <section className="container-page py-16">
        <figure className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 px-6 py-12 text-white sm:px-12 sm:py-16 shadow-soft">
          <svg aria-hidden="true" className="h-8 w-8 text-brand-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83v-6.83H5.17A2 2 0 0 1 7.17 9zM18.83 6A5.17 5.17 0 0 0 13.66 11.17V18h6.83v-6.83h-3.66a2 2 0 0 1 2-2z" />
          </svg>
          <blockquote className="mt-4 font-display text-2xl leading-snug sm:text-3xl">
            "Pathways is the first place that doesn't make me pick a lane. I plan
            lessons, swap tools with other teachers, and grow my own practice — all
            under one roof."
          </blockquote>
          <figcaption className="mt-6 text-sm text-brand-100">
            <strong className="font-semibold text-white">Ms. Chen</strong> &middot;
            6th grade ELA teacher
          </figcaption>
        </figure>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Whatever you need to grow — it's here.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Browse the library, pick a pathway, or talk to our team about partnering
            with your school or community.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/resources" className="btn-primary px-6 py-3">
              Start exploring
            </Link>
            <Link to="/contact" className="btn-ghost px-6 py-3">
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
