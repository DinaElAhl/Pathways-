import { Link } from 'react-router-dom'
import { pathways } from '../data/pathways.js'
import PathwayCard from '../components/PathwayCard.jsx'
import Icon from '../components/Icon.jsx'

const features = [
  {
    icon: 'target',
    title: 'Outcome-focused',
    body: 'Every pathway ends with real skills and portfolio-ready work — not just a certificate.',
  },
  {
    icon: 'clock',
    title: 'Learn at your pace',
    body: 'Bite-sized lessons, weekly check-ins, and flexible deadlines that fit your life.',
  },
  {
    icon: 'users',
    title: 'Community & mentors',
    body: 'Weekly Q&A, a private learner community, and 1:1 mentor office hours.',
  },
  {
    icon: 'heart',
    title: 'Crafted with care',
    body: 'Hand-picked, up-to-date content from instructors who build in the industry today.',
  },
]

const stats = [
  { value: '50+', label: 'Guided pathways' },
  { value: '12k', label: 'Active learners' },
  { value: '94%', label: 'Completion rate' },
  { value: '4.9★', label: 'Average rating' },
]

const steps = [
  {
    n: '01',
    title: 'Pick your pathway',
    body: 'Browse curated journeys across engineering, data, design, product, and AI.',
  },
  {
    n: '02',
    title: 'Learn by building',
    body: 'Each module ends in a hands-on project reviewed by mentors and peers.',
  },
  {
    n: '03',
    title: 'Show your work',
    body: 'Graduate with a polished portfolio and the confidence to land your next role.',
  },
]

export default function Home() {
  const featured = pathways.slice(0, 3)

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
        <div className="container-page pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
          <span className="chip">New cohort starting soon</span>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Learn with{' '}
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
              purpose
            </span>
            .<br className="hidden sm:block" /> Grow on a clear path.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Pathways turns scattered tutorials into structured journeys. Pick a goal,
            follow a mentor-designed path, and build something real — week by week.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/pathways" className="btn-primary px-6 py-3 text-base">
              Explore pathways
              <Icon name="arrowRight" className="ml-2 h-4 w-4" strokeWidth={2} />
            </Link>
            <Link to="/about" className="btn-secondary px-6 py-3 text-base">
              How it works
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

      {/* Featured pathways */}
      <section className="container-page py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="chip">Featured</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Start with a popular pathway
            </h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Each one is a full journey — not a single course. Designed to build real,
              usable skills you'll show off in your portfolio.
            </p>
          </div>
          <Link to="/pathways" className="link inline-flex items-center gap-1">
            View all <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PathwayCard key={p.slug} pathway={p} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="chip">Why Pathways</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for learners who actually want to finish.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="card">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name={f.icon} className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="chip">How it works</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From curious to confident in three steps.
          </h2>
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="relative rounded-2xl border border-slate-200 p-6">
              <span className="font-display text-5xl font-bold text-brand-100">
                {s.n}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Testimonial */}
      <section className="container-page pb-16 sm:pb-20">
        <figure className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 px-6 py-12 text-white sm:px-12 sm:py-16 shadow-soft">
          <svg aria-hidden="true" className="h-8 w-8 text-brand-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83v-6.83H5.17A2 2 0 0 1 7.17 9zM18.83 6A5.17 5.17 0 0 0 13.66 11.17V18h6.83v-6.83h-3.66a2 2 0 0 1 2-2z" />
          </svg>
          <blockquote className="mt-4 font-display text-2xl leading-snug sm:text-3xl">
            "I spent two years collecting half-finished tutorials. In one pathway I
            shipped three real projects and landed my first dev role."
          </blockquote>
          <figcaption className="mt-6 text-sm text-brand-100">
            <strong className="font-semibold text-white">Mira K.</strong> &middot; Web
            Development graduate
          </figcaption>
        </figure>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your next skill is a pathway away.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Pick a journey, set a pace, and let us handle the structure. Start free —
            upgrade whenever you're ready.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/pathways" className="btn-primary px-6 py-3">
              Browse pathways
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
