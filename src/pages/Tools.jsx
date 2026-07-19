import { Link } from 'react-router-dom'

// /tools — single-product feature page for Pathways for Teachers.
//
// Replaces the earlier placeholder listing. Content pulled directly from the
// app's own landing page (https://dinaelahl.github.io/Path-ways/) — the
// desktop app is real and built by Dina; only the Lemon Squeezy purchase URL
// is not yet wired, so this page's primary CTA opens a mailto to
// roots@pathwayslearn.com with subject "notify me at launch" until she has
// the store URL.
//
// The E² Teaching Framework tool (real, at /tools/e2-teaching) gets a small
// "Also from Dina" callout at the bottom so it stays reachable.

const NOTIFY_MAILTO =
  'mailto:roots@pathwayslearn.com?subject=' +
  encodeURIComponent('Pathways for Teachers — notify me at launch') +
  '&body=' +
  encodeURIComponent(
    "Assalamu alaikum,\n\nI'd like to be notified when the Pathways for Teachers desktop app is available for purchase.\n\nThank you."
  )

const SOURCE_URL = 'https://dinaelahl.github.io/Path-ways/'
const GITHUB_URL = 'https://github.com/DinaElAhl/Path-ways'

const features = [
  {
    icon: '📝',
    title: 'Lesson Plans',
    body: 'Pick subject, grade, duration, pedagogy, standards, and differentiation from dropdowns. Get a classroom-ready Markdown plan with timed procedure, assessment, and reflection prompts.',
  },
  {
    icon: '🎬',
    title: 'Flipped Videos',
    body: 'Paste any captioned YouTube URL. Pathways pulls the transcript, generates timestamped questions, and embeds them in a player that pauses for student answers.',
  },
  {
    icon: '🤖',
    title: 'AI Tutor',
    body: 'Ask anything teaching-related. Lesson ideas, parent emails, classroom management, grading rubrics, last-minute filler activities. Built-in starter prompts.',
  },
  {
    icon: '📚',
    title: 'Library & Export',
    body: 'Everything saves to a local Library on your computer. Export lesson plans and quizzes to Markdown or PDF anytime. Nothing is uploaded, nothing is scraped for AI training.',
  },
]

const specs = [
  { label: 'Platform', value: 'Windows 10 / 11' },
  { label: 'Install', value: 'Portable · no installer' },
  { label: 'Size', value: '74 MB' },
  { label: 'Price', value: '$19 · one-time' },
  { label: 'Refund', value: '7-day, no questions' },
  { label: 'Storage', value: 'Local · your computer' },
]

export default function Tools() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/80 via-white to-white"
        />
        <div className="container-page pt-14 pb-12 sm:pt-20 sm:pb-16">
          <div className="max-w-3xl">
            <span className="chip">Desktop app for teachers</span>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Pathways{' '}
              <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
                for Teachers
              </span>
            </h1>
            <p className="mt-5 text-xl text-slate-800 font-display">
              Lesson plans in seconds. Flipped videos with questions.
            </p>
            <p className="mt-4 text-lg text-slate-700 leading-relaxed">
              A desktop app I built for classroom teachers who are drowning in tabs. Generate
              ready-to-teach lesson plans from a few dropdowns. Paste any captioned YouTube link
              and get a flipped-classroom lesson with timestamped questions. Everything saves
              locally — your work, your computer.
            </p>
            <div className="mt-8 flex flex-col items-start justify-start gap-3 sm:flex-row sm:items-center">
              <a href={NOTIFY_MAILTO} className="btn-primary px-7 py-3.5 text-base">
                Get notified when it launches
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-7 py-3.5 text-base"
              >
                View on GitHub
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Windows 10 / 11 · No installation · 74 MB · One-time $19 when the store opens
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="chip">What it does</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything a teacher needs in one window.
            </h2>
            <p className="mt-3 text-slate-600">
              Replaces lesson-plan templates, quiz builders, video editors, and the dozen tabs
              you keep open for &ldquo;quick questions.&rdquo;
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="card flex gap-4">
                <div className="text-3xl leading-none">{f.icon}</div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-700 leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local & private callout */}
      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-8 sm:p-12 text-white shadow-soft">
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            Local &amp; private
          </span>
          <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Everything you make stays on your computer.
          </h2>
          <p className="mt-4 text-brand-100 leading-relaxed">
            No cloud sync. No teacher account. No third-party analytics. No one scraping your
            lesson plans to train a language model. Export what you make to Markdown or PDF
            anytime; the source of truth is a folder on your machine.
          </p>
        </div>
      </section>

      {/* Specs */}
      <section className="container-page pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">The specs</h2>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {specs.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white ring-1 ring-slate-200 p-4">
                <dt className="text-xs uppercase tracking-wide text-slate-500">{s.label}</dt>
                <dd className="mt-1 font-display text-base font-semibold text-slate-900">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA + status */}
      <section className="container-page pb-16 sm:pb-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center">
          <span className="chip">Status</span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
            Coming soon on Lemon Squeezy.
          </h2>
          <p className="mt-3 text-slate-700">
            The app is built and running. I&rsquo;m finalising the store setup — drop me a note
            and I&rsquo;ll email you the moment it&rsquo;s live.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={NOTIFY_MAILTO} className="btn-primary px-6 py-3">
              Notify me at launch
            </a>
            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-6 py-3"
            >
              See the app&rsquo;s own landing page &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="container-page pb-12">
        <div className="mx-auto max-w-3xl grid gap-4 sm:grid-cols-2">
          <Link to="/shop" className="card group flex flex-col hover:shadow-soft transition">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
              Also on the site
            </span>
            <h3 className="mt-2 font-display text-lg font-semibold text-slate-900 group-hover:text-brand-700">
              The Roots Tajweed Reading Series
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Five lessons from the alphabet to reading Qur&rsquo;anic Arabic. Live on Payhip and Gumroad.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:gap-2">
              Browse the Shop &rarr;
            </span>
          </Link>
          <Link to="/for-schools" className="card group flex flex-col hover:shadow-soft transition">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
              For schools
            </span>
            <h3 className="mt-2 font-display text-lg font-semibold text-slate-900 group-hover:text-brand-700">
              Roots for Schools
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Bilingual K&ndash;12 Qur&rsquo;an and Arabic curriculum, licensed per grade band.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:gap-2">
              See licensing &rarr;
            </span>
          </Link>
        </div>
      </section>

      {/* Also from Dina — E² Teaching Framework preserved as a smaller callout */}
      <section className="container-page pb-24">
        <div className="mx-auto max-w-3xl rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Also from Dina
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900">
            The E² Teaching Framework
          </h3>
          <p className="mt-2 text-sm text-slate-700 leading-relaxed">
            &ldquo;Every Student Has the Right to Understand.&rdquo; A teaching framework with
            ready phrases and prompts for every slot &mdash; so the blank page never wins.
          </p>
          <Link
            to="/tools/e2-teaching"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2 transition"
          >
            Open the framework &rarr;
          </Link>
        </div>
      </section>
    </>
  )
}
