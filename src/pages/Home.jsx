import { Link } from 'react-router-dom'
import RootsMethodCards from '../components/RootsMethodCards.jsx'

// Homepage — brand-first hero. Roots is the speaker ("we/us"), not Dina.
// Founder attribution is quiet, below the fold, in "Behind Roots".

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
    eyebrow: 'Arabic placement pilot · published methodology',
    title: 'Roots Arabic & Qur’an Proficiency Exam (RAQP)',
    body: 'A written Arabic placement pilot with four intended A1–B2 levels and ten scored questions per level. Read the methodology to understand the results and the evidence still needed for external validation.',
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
    <div className="roots-home">
      <section className="roots-hero">
        <div className="container-page roots-hero-grid">
          <div className="roots-hero-copy">
            <div className="roots-signature"><img src={import.meta.env.BASE_URL + 'brand/roots-sprout.svg'} alt="" width="70" height="70" /><span>ROOTS <span lang="ar">| جذور</span></span></div>
            <h1>The Qur’an as a <em>companion.</em><br />Arabic with <em>roots.</em></h1>
            <p className="roots-hero-arabic" lang="ar" dir="rtl">القرآن رفيق... لا مجرّد مادة.</p>
            <p className="roots-hero-description">A bilingual Qur’an and Arabic curriculum that grows with your child. For curious learners, caring parents, and the teachers beside them.</p>
            <div className="roots-hero-actions">
              <Link to="/free-sample" className="btn-primary">Try a free lesson &rarr;</Link>
              <Link to="/book" className="btn-secondary">Book a class &rarr;</Link>
            </div>
            <span className="roots-hero-note">Small beginnings. Deep roots. Room to grow.</span>
          </div>
          <div className="roots-growth-panel">
            <img src={import.meta.env.BASE_URL + 'brand/roots-sprout.svg'} alt="Roots smiling sprout" width="210" height="210" />
            <span className="roots-growth-word" lang="ar" dir="rtl">جذور</span>
            <p>Rooted in meaning.<br />Growing into character.</p>
            <p className="font-arabic" lang="ar" dir="rtl">معرفةٌ تتجذّر، وأخلاقٌ تنمو.</p>
          </div>
        </div>
      </section>

      {/* The three steps of the Roots Method */}
      <section className="roots-method container-page pb-16 sm:pb-20" aria-labelledby="roots-method-title">
        <div className="max-w-2xl">
          <span className="chip">The Roots Method</span>
          <h2 id="roots-method-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Three steps in every lesson.</h2>
          <p className="mt-3 text-slate-600">Manifestation → Tafakkur → Akhlāq.</p>
        </div>
        <RootsMethodCards />
      </section>

      {/* Who it's for */}
      <section className="roots-audiences bg-slate-50">
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
      <section className="roots-recent container-page py-16 sm:py-20">
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
            Roots is designed by an Arabic Language
            and Qur&rsquo;anic Studies educator with years of K&ndash;12 curriculum experience.
            She built Roots because she couldn&rsquo;t find the curriculum she wanted for her
            own students.
          </p>
          <p className="mt-3 text-sm text-slate-700">
            Contact:{' '}
            <a href="mailto:roots@pathwayslearn.com" className="link">
              roots@pathwayslearn.com
            </a>{' '}
            &mdash; every message is read. Rather learn live?{' '}
            <Link to="/book" className="link font-semibold">
              Book a class &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Closing / signature */}
      <section className="container-page pb-20">
        <div className="mx-auto max-w-3xl rounded-3xl roots-light-panel p-8 sm:p-12 text-center text-white shadow-soft">
          <p className="font-display text-2xl sm:text-3xl font-semibold">
            With love. <span aria-hidden="true">🌱</span>
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
    </div>
  )
}
