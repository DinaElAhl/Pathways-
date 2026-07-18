import { Link } from 'react-router-dom'

// Homepage — humanization pass. First-person voice from Dina; warmer
// per-audience copy; a small "recent from Roots" strip near the bottom.
// The generic Featured Pathways / Featured Resources / "One hub, three
// steps" / Netlify builder CTA blocks were removed because they clashed
// with the new first-person tone (they were holdover SaaS chrome).

// Audience cards use warmer, second-person copy hand-written for each
// segment. Links still point at the existing /for/:slug pages so the
// deeper audience content the site already has stays reachable.
const AUDIENCES = [
  {
    slug: 'learners',
    name: 'Learners',
    body: "If you're studying Arabic or Qur'an on your own — welcome. Roots starts at the alphabet and takes you to reading Qur'anic verses with tajweed.",
  },
  {
    slug: 'teachers',
    name: 'Teachers',
    body: 'If you teach Arabic or Islamic Studies — the weekly lesson decks, teacher guides, and assessment banks I built for my classroom are here. Take what serves you.',
  },
  {
    slug: 'schools',
    name: 'Schools',
    body: "If your school is looking for a bilingual Qur'an and Arabic curriculum that adapts to your students — Roots licenses per grade band, and I tailor it to fit your program.",
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
    external: false,
    eyebrow: 'On Payhip & Gumroad',
    title: 'Roots Tajweed Reading Series',
    body: 'Five lessons — from the alphabet to reading with tajweed. $15 for the bundle, $4 for a single lesson.',
    cta: 'Browse the Shop',
  },
  {
    href: '/pathways-exam',
    external: false,
    eyebrow: 'Free to take',
    title: 'Roots Arabic & Qur’an Proficiency Exam (RAQP)',
    body: "CEFR-aligned (A1–B2), 15 questions, 5 minutes. Take it, get a level determination, get a certificate you can verify publicly.",
    cta: 'Take the RAQP',
  },
  {
    href: '/for-schools',
    external: false,
    eyebrow: 'Licensed per grade band',
    title: 'Roots for Schools',
    body: 'Bilingual K–12 Qur’an & Arabic curriculum tailored per school. Elementary is live; Middle and High School available Fall 2026.',
    cta: 'See licensing',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero — first-person, warm */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/80 via-white to-white"
        />
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        />
        <div className="container-page pt-16 pb-14 sm:pt-24 sm:pb-16 text-center">
          <p className="font-display text-lg font-semibold text-brand-700">
            Assalamu alaikum.
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            I&rsquo;m{' '}
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
              Dina
            </span>
            .
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-700 leading-relaxed text-left sm:text-center">
            I built Pathways because I couldn&rsquo;t find the curriculum I wanted for my own
            students &mdash; one that treats Arabic as sacred, teaches the Qur&rsquo;an as a
            companion, and doesn&rsquo;t leave a parent behind because they don&rsquo;t speak
            Arabic. Pathways is a small home for the curriculum I built to fix that, and for the
            tools, exams, and resources I keep building around it.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/roots" className="btn-primary px-7 py-3.5 text-base">
              Meet Roots
            </Link>
            <Link to="/shop" className="btn-secondary px-7 py-3.5 text-base">
              Browse the Shop
            </Link>
          </div>
        </div>
      </section>

      {/* Founder note */}
      <section className="container-page pb-16 sm:pb-20">
        <figure className="mx-auto max-w-3xl rounded-3xl bg-slate-50 ring-1 ring-slate-200 p-6 sm:p-10">
          <div className="flex items-start gap-5 flex-col sm:flex-row">
            <div className="flex-none">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center overflow-hidden ring-2 ring-white shadow-soft">
                {/* Real photo can be dropped into /public/dina-headshot.jpg
                    later. Until then, onError hides the img and the
                    gradient placeholder shows through. */}
                <img
                  src="/dina-headshot.jpg"
                  alt="Dina"
                  className="h-20 w-20 rounded-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
            </div>
            <div>
              <blockquote className="font-display text-lg sm:text-xl text-slate-800 italic leading-relaxed">
                &ldquo;Roots started as one lesson. The one I wish I&rsquo;d had when I first
                walked into a classroom of Muslim children who wanted to read the Qur&rsquo;an but
                had never been shown how. Everything on this site grew from that first lesson.&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-slate-600">
                &mdash; Dina Mohamed Sayed El-Ahl &middot; founder
              </figcaption>
            </div>
          </div>
        </figure>
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
              Roots is one curriculum I&rsquo;ve shaped for very different people. Here&rsquo;s
              what I&rsquo;d say to each of you.
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

      {/* Closing / signature */}
      <section className="container-page pb-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-8 sm:p-12 text-center text-white shadow-soft">
          <p className="font-display text-2xl sm:text-3xl font-semibold">
            Assalamu alaikum from Egypt.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">
            If you want to reach me directly, email{' '}
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
