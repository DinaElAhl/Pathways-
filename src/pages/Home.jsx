import { Link } from 'react-router-dom'

// Homepage — mission-first hero. Roots leads; the founder is a quiet,
// trustworthy paragraph near the bottom, not the marketing angle.

const AUDIENCES = [
  {
    slug: 'learners',
    name: 'Learners',
    body: "If you're studying Arabic or Qur'an on your own — welcome. Roots starts at the alphabet and takes you to reading Qur'anic verses with tajweed.",
  },
  {
    slug: 'teachers',
    name: 'Teachers',
    body: 'If you teach Arabic or Islamic Studies — the weekly lesson decks, teacher guides, and assessment banks built for a working classroom are here. Take what serves you.',
  },
  {
    slug: 'schools',
    name: 'Schools',
    body: "If your school is looking for a bilingual Qur'an and Arabic curriculum that adapts to your students — Roots licenses per grade band, and each licensee gets it tailored to fit their program.",
  },
  {
    slug: 'parents',
    name: 'Parents',
    body: "If you're homeschooling and Arabic isn't your first language — Roots is written so you can teach it to your child without knowing Arabic yourself.",
  },
  {
    slug: 'educators',
    name: 'Educators',
    body: 'If you tutor Arabic or run a small program — the Roots resource packs, exams, and workbooks are yours to license or bundle.',
  },
]

const RECENT = [
  {
    href: '/shop',
    eyebrow: 'On Payhip & Gumroad',
    title: 'Roots Tajweed Reading Series',
    body: 'Five lessons — from the alphabet to reading with tajweed. $15 for the bundle, $4 for a single lesson.',
    cta: 'Browse the Shop',
  },
  {
    href: '/pathways-exam',
    eyebrow: 'Free to take',
    title: 'Roots Arabic & Qur’an Proficiency Exam (RAQP)',
    body: 'CEFR-aligned (A1–B2), 15 questions, 5 minutes. Take it, get a level determination, get a certificate you can verify publicly.',
    cta: 'Take the RAQP',
  },
  {
    href: '/for-schools',
    eyebrow: 'Licensed per grade band',
    title: 'Roots for Schools',
    body: 'Bilingual K–12 Qur’an & Arabic curriculum tailored per school. Elementary is live; Middle and High School available Fall 2026.',
    cta: 'See licensing',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero — mission first */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/80 via-white to-white"
        />
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        />
        <div className="container-page pt-16 pb-16 sm:pt-24 sm:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-lg font-semibold text-brand-700">
              Assalamu alaikum.
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              Every Muslim child deserves to know{' '}
              <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
                what they&rsquo;re reciting
              </span>
              .
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-700 leading-relaxed text-left sm:text-center">
              <strong className="text-slate-900">Roots | جذور</strong> is a bilingual
              (English/Arabic) Qur&rsquo;an and Arabic curriculum that starts at the alphabet and
              takes you to reading Qur&rsquo;anic verses with meaning. Currently focused on{' '}
              <em>Juz&rsquo; 30</em> as a solid foundation; three tracks (Beginner, Intermediate,
              Advanced) across Elementary, Middle, and High School.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700 leading-relaxed text-left sm:text-center">
              Built for homeschool families and Islamic schools. Designed to serve native
              Arabic speakers and English-speaking learners in the same framework.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/roots" className="btn-primary px-7 py-3.5 text-base">
                Meet Roots &rarr;
              </Link>
              <Link to="/shop" className="btn-secondary px-7 py-3.5 text-base">
                Browse the Shop &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-slate-50">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="chip">Who Roots is for</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Whoever you are, come in.
            </h2>
            <p className="mt-3 text-slate-600">
              Roots is one curriculum shaped for very different readers. Here&rsquo;s a note for
              each of you.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.map((a) => (
              <Link
                key={a.slug}
                to={`/for/${a.slug}`}
                className="card group flex flex-col hover:shadow-soft transition"
              >
                <h3 className="font-display text-lg font-semibold text-slate-900 group-hover:text-brand-700">
                  {a.name}
                </h3>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed flex-1">
                  {a.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:gap-2">
                  Open &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent from Roots */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="chip">Recent from Roots</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            What&rsquo;s live right now.
          </h2>
          <p className="mt-3 text-slate-600">
            Three things you can use today &mdash; a starter series, a proficiency exam,
            and full curriculum licensing for schools.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RECENT.map((r) => (
            <Link
              key={r.href}
              to={r.href}
              className="card group flex flex-col hover:shadow-soft transition"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                {r.eyebrow}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold text-slate-900 group-hover:text-brand-700">
                {r.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                {r.body}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:gap-2">
                {r.cta} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Behind Roots — quiet founder attribution */}
      <section className="container-page pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Behind Roots
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Roots is designed and written by <strong>Dina Mohamed Sayed El-Ahl</strong>, an
            Arabic Language and Qur&rsquo;anic Studies educator with years of K&ndash;12
            curriculum experience at a US-based online Islamic school. She built Roots
            because she couldn&rsquo;t find the curriculum she wanted for her own students.
          </p>
          <p className="mt-3 text-sm text-slate-700">
            Contact:{' '}
            <a href="mailto:roots@pathwayslearn.com" className="link">
              roots@pathwayslearn.com
            </a>{' '}
            &mdash; every message is read.
          </p>
        </div>
      </section>

      {/* Closing / signature */}
      <section className="container-page pb-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-8 sm:p-12 text-center text-white shadow-soft">
          <p className="font-display text-2xl sm:text-3xl font-semibold">
            Assalamu alaikum from Egypt.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">
            Reach me at{' '}
            <a
              href="mailto:roots@pathwayslearn.com"
              className="underline hover:text-white"
            >
              roots@pathwayslearn.com
            </a>{' '}
            &mdash; I read every message.
          </p>
        </div>
      </section>
    </>
  )
}
