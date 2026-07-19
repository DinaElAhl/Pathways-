import { Link } from 'react-router-dom'

// About page — brand-voice ("we, at Roots"). Founder attribution stays
// quiet in a small "Behind Roots" section near the bottom, matching the
// homepage pattern.

const BELIEFS = [
  'Every Muslim child deserves to know what they’re reciting.',
  'A parent who doesn’t speak Arabic should still be able to teach their child Arabic.',
  'Native Arabic speakers and English-speaking learners belong in the same classroom.',
  'Rigor without intimidation. Warmth without dilution.',
  'Memorization + understanding + living. All three, or the work isn’t done.',
]

const DIFFERENTIATORS = [
  {
    title: 'Bilingual by design, not translated.',
    body: 'Every lesson is written in both English and Arabic — not English lessons run through a translator. The two languages are drafted side by side, from scratch.',
  },
  {
    title: 'Three tracks by proficiency.',
    body: 'Beginner, Intermediate, and Advanced tracks run in parallel across Elementary, Middle, and High School. Mixed populations learn the same content at the right stretch.',
  },
  {
    title: 'Every product is sourced.',
    body: 'Every hadith is cited. Every Qur’anic quote is verse-referenced. The bibliography is on the page, not hidden.',
  },
  {
    title: 'Customisation is included.',
    body: 'When a school licenses Roots, we tailor it to that school’s program — track weighting, calendar, denominational lens. That work is inside the license, not a separate line item.',
  },
  {
    title: 'An independent proficiency exam.',
    body: 'The Roots Arabic & Qur’an Proficiency Exam (RAQP) is CEFR-aligned, with public methodology and publicly verifiable certificates. Anyone can take it, including students who haven’t used the Roots curriculum.',
  },
]

const LIVE_NOW = [
  {
    href: '/shop',
    eyebrow: 'On Payhip & Gumroad',
    title: 'Roots Tajweed Reading Series',
    body: 'Five lessons from the alphabet to fluent Qur’anic reading. $4 per lesson, $15 for the bundle.',
    cta: 'Browse the Shop',
  },
  {
    href: '/pathways-exam',
    eyebrow: 'Free to take',
    title: 'Roots Arabic & Qur’an Proficiency Exam (RAQP)',
    body: 'CEFR A1–B2. Fifteen questions, five minutes, level determination and a verifiable certificate.',
    cta: 'Take the RAQP',
  },
  {
    href: '/for-schools',
    eyebrow: 'Licensed per grade band',
    title: 'Roots for Schools',
    body: 'Bilingual K–12 Qur’an and Arabic curriculum, tailored per school. Elementary is live; Middle and High School available Fall 2026.',
    cta: 'See licensing',
  },
]

export default function About() {
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
        <div className="container-page pt-16 pb-16 sm:pt-24 sm:pb-20">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-center">
              About{' '}
              <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
                Roots
              </span>
              .
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Roots | جذور</strong> is a bilingual
              (English/Arabic) Qur&rsquo;an and Arabic curriculum, currently focused on{' '}
              <em>Juz&rsquo; 30</em> as its solid foundation. We built it because we couldn&rsquo;t
              find one that treated Arabic as sacred, taught the Qur&rsquo;an as a companion, and
              didn&rsquo;t leave a parent behind because they don&rsquo;t speak Arabic.
            </p>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="bg-slate-50">
        <div className="container-page py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <span className="chip">What we believe</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Five convictions that shape everything.
            </h2>
            <ul className="mt-10 space-y-5">
              {BELIEFS.map((b, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-brand-500 to-accent-500"
                  />
                  <p className="text-lg text-slate-800 leading-relaxed">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How Roots is different */}
      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <span className="chip">How Roots is different</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Five things you won&rsquo;t find in the alternatives.
          </h2>
          <ol className="mt-10 space-y-8">
            {DIFFERENTIATORS.map((d, i) => (
              <li key={d.title} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="font-display text-2xl font-semibold text-brand-600 tabular-nums leading-none pt-0.5"
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    {d.title}
                  </h3>
                  <p className="mt-1.5 text-slate-700 leading-relaxed">{d.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What's currently live */}
      <section className="bg-slate-50">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="chip">What&rsquo;s currently live</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Three things you can use today.
            </h2>
            <p className="mt-3 text-slate-600">
              A starter reading series, a free proficiency exam, and full curriculum licensing
              for schools.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {LIVE_NOW.map((r) => (
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
        </div>
      </section>

      {/* Behind Roots — quiet founder attribution */}
      <section className="container-page pt-16 pb-8 sm:pt-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Behind Roots
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Roots is designed and written by{' '}
            <strong>Dina Mohamed Sayed El-Ahl</strong>, an Arabic Language and Qur&rsquo;anic
            Studies educator with years of K&ndash;12 curriculum experience at a US-based online
            Islamic school. She built Roots because she couldn&rsquo;t find the curriculum she
            wanted for her own students.
          </p>
        </div>
      </section>

      {/* Closing / signature */}
      <section className="container-page pb-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-8 sm:p-12 text-center text-white shadow-soft">
          <p className="font-display text-2xl sm:text-3xl font-semibold">
            From Egypt, with love. <span aria-hidden="true">🌱</span>
          </p>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">
            Reach us at{' '}
            <a
              href="mailto:roots@pathwayslearn.com"
              className="underline hover:text-white"
            >
              roots@pathwayslearn.com
            </a>{' '}
            &mdash; every message is read.
          </p>
        </div>
      </section>
    </>
  )
}
