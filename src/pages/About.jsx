import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

// Pathways is a solo project by Dina Mohamed Sayed El-Ahl. Everything on this
// page is a real credential — no fictional team, no fabricated milestones.

const credentials = [
  {
    icon: 'target',
    title: 'Arabic & Qur’an educator',
    body: 'Taught Arabic and Qur’anic Studies at Bayaan Academy, a US-based online Islamic school, leading the elementary and high-school Advanced tracks and building the scope-and-sequence framework used across grade bands.',
  },
  {
    icon: 'bolt',
    title: 'Master’s thesis in Arabic NLP',
    body: 'MA research in Arabic natural language processing (text summarization) — background that shapes how Roots teaches Arabic reading, phonology, and structure.',
  },
  {
    icon: 'heart',
    title: 'Wayground / Quizizz Game Changer',
    body: 'Certified Game Changer trainer for Wayground / Quizizz — one of a small international group recognized for using formative assessment technology in the classroom.',
  },
  {
    icon: 'users',
    title: 'Author, Roots Tajweed Reading Series',
    body: 'A five-lesson published curriculum that walks learners from the Arabic alphabet to reading with short vowels and tanwin. Sold on Payhip and Gumroad.',
  },
]

const audienceMap = [
  {
    who: 'Islamic schools & homeschools',
    what: 'The full Roots curriculum — a three-track (Beginner / Intermediate / Advanced), bilingual Qur’an and Arabic system your teachers can pick up on Monday morning.',
    to: '/for-schools',
    cta: 'Licensing for schools →',
  },
  {
    who: 'Individual teachers, tutors, homeschoolers',
    what: 'The Roots Tajweed Reading Series and Roots Elementary Kits — self-serve materials that make Qur’anic Arabic teachable without a curriculum degree.',
    to: '/shop',
    cta: 'Visit the shop →',
  },
  {
    who: 'Students preparing for a proficiency exam',
    what: 'The Roots Quranic Arabic Proficiency Examination (RQAP) — a formal exam with a placement audit, section-level diagnostic, and certificate on completion.',
    to: '/rqap.html',
    cta: 'Try the exam →',
  },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="container-page pt-14 pb-10 sm:pt-20">
        <div className="max-w-3xl">
          <span className="chip">About</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Pathways is a solo project by{' '}
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
              Dina Mohamed Sayed El-Ahl
            </span>
            .
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            An Arabic and Qur’anic Studies educator building the curriculum, tools, and exam she
            wished her own students and teaching colleagues had. Everything on Pathways is written,
            designed, and maintained by Dina — no fictional team, no borrowed credentials.
          </p>
        </div>
      </section>

      {/* Bio card */}
      <section className="container-page pb-16">
        <div className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-8 text-white sm:p-12">
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            About Dina
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            An educator making Qur’anic Arabic readable — for anyone who wants to learn.
          </h2>
          <p className="mt-4 max-w-2xl text-brand-100">
            Dina taught Arabic and Qur’anic Studies at Bayaan Academy, a US-based online Islamic
            school, where she led the elementary and high-school Advanced tracks and built the
            scope-and-sequence framework used across grade bands. Her master’s thesis was in Arabic
            natural language processing (text summarization). She is a Wayground / Quizizz Game
            Changer certified trainer and the author of the Roots Tajweed Reading Series.
          </p>
          <p className="mt-4 max-w-2xl text-brand-100">
            Pathways is where that work lives publicly — the curriculum for schools, the
            self-serve materials for individual teachers, and the proficiency exam for students who
            want their learning measured against a real bar.
          </p>
        </div>
      </section>

      {/* Credentials */}
      <section className="container-page pb-16">
        <div className="max-w-2xl">
          <span className="chip">Credentials</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            The background behind Roots.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {credentials.map((v) => (
            <div key={v.title} className="card">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={v.icon} className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who I help / What I make */}
      <section className="bg-slate-50">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="chip">Who I help · what I make</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Three ways to work with what I’ve built.
            </h2>
            <p className="mt-2 text-slate-600">
              Roots is designed to meet you where you are — whether you’re a school licensing a
              full curriculum, a teacher who needs a lesson tomorrow, or a student who wants their
              proficiency measured.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {audienceMap.map((a) => (
              <div key={a.who} className="card flex flex-col">
                <h3 className="font-display text-lg font-semibold text-slate-900">{a.who}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 flex-1">{a.what}</p>
                {a.to.startsWith('/') && !a.to.endsWith('.html') ? (
                  <Link to={a.to} className="link mt-5 inline-flex items-center gap-1">
                    {a.cta}
                  </Link>
                ) : (
                  <a href={a.to} className="link mt-5 inline-flex items-center gap-1">
                    {a.cta}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Say hello.</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Interested in bringing Roots to your school, or curious about the curriculum? Every
            note reaches Dina directly.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/for-schools" className="btn-primary px-6 py-3">
              Book a discovery call
            </Link>
            <Link to="/contact" className="btn-ghost px-6 py-3">
              Send a message
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
