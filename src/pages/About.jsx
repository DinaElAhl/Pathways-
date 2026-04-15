import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

const values = [
  {
    icon: 'target',
    title: 'Outcomes over hours',
    body: 'We measure success by what learners can build and ship, not by how long they sat through a video.',
  },
  {
    icon: 'users',
    title: 'Learning in community',
    body: 'Every pathway is a cohort. Peers, mentors, and review loops make the work stick.',
  },
  {
    icon: 'heart',
    title: 'Craft and care',
    body: 'We write, illustrate, and rework every lesson until it feels clear, human, and honest.',
  },
  {
    icon: 'bolt',
    title: 'Momentum first',
    body: 'Short modules, weekly wins, and gentle deadlines keep you moving without burning out.',
  },
]

const team = [
  {
    name: 'Noor A.',
    role: 'Founder & Curriculum Lead',
    bio: 'Ex-engineer and teacher. Obsessed with how people actually learn.',
    initials: 'NA',
    tint: 'from-brand-500 to-brand-700',
  },
  {
    name: 'Jamal R.',
    role: 'Head of Design',
    bio: 'Designer for a decade. Believes good UX starts with good questions.',
    initials: 'JR',
    tint: 'from-accent-500 to-accent-600',
  },
  {
    name: 'Sara M.',
    role: 'Community & Mentors',
    bio: 'Builds warm, high-trust learning communities people actually show up to.',
    initials: 'SM',
    tint: 'from-emerald-500 to-emerald-700',
  },
  {
    name: 'Dev P.',
    role: 'Engineering',
    bio: 'Keeps the platform fast, accessible, and boringly reliable.',
    initials: 'DP',
    tint: 'from-purple-500 to-purple-700',
  },
]

const milestones = [
  { year: '2022', title: 'Pathways begins', body: 'A small pilot cohort of 24 learners, one curriculum, and a lot of feedback forms.' },
  { year: '2023', title: 'Mentor network', body: 'We added live mentor office hours and a peer review system across every pathway.' },
  { year: '2024', title: 'Open to everyone', body: 'Scaled to 6 core pathways and 12,000+ learners — still graded by real humans.' },
  { year: '2025', title: 'Into the future', body: 'New pathways in AI, DevOps, and research skills — built with working practitioners.' },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="container-page pt-14 pb-10 sm:pt-20">
        <div className="max-w-3xl">
          <span className="chip">About Pathways</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            A hub for everyone who learns and teaches.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Pathways brings learners, teachers, parents, schools, and educators into
            one place — so the person with the question, the person with the lesson
            plan, and the person who can mentor them can actually find each other.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container-page pb-16">
        <div className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-8 text-white sm:p-12">
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            Our mission
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Make ambitious learning feel possible, human, and actually finishable — for everyone in the ecosystem.
          </h2>
          <p className="mt-4 max-w-2xl text-brand-100">
            We're a small team of builders, teachers, and designers. We craft
            pathways, resources, and tools we'd want to use ourselves — with real
            projects, real educators, and zero fluff. If you care about growing, or
            helping someone else grow, we want to walk the path with you.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="container-page pb-16">
        <div className="max-w-2xl">
          <span className="chip">What we value</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Four principles that shape everything we make.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
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

      {/* Team */}
      <section className="bg-slate-50">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="chip">Meet the team</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Small team, big obsession with your learning.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="card text-center">
                <div
                  className={`mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br ${m.tint} font-display text-xl font-bold text-white shadow-soft`}
                  aria-hidden="true"
                >
                  {m.initials}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{m.name}</h3>
                <p className="text-sm text-brand-700">{m.role}</p>
                <p className="mt-2 text-sm text-slate-600">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="chip">Our story</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            A short history so far.
          </h2>
        </div>
        <ol className="mt-10 relative border-l-2 border-brand-100 pl-6 space-y-8">
          {milestones.map((m) => (
            <li key={m.year} className="relative">
              <span className="absolute -left-[33px] grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-white text-xs font-bold">
                •
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                {m.year}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{m.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{m.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Want to learn with us?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Join a pathway, join a cohort, or just say hi. We'd love to meet you.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/pathways" className="btn-primary px-6 py-3">
              Explore pathways
            </Link>
            <Link to="/contact" className="btn-ghost px-6 py-3">
              Say hello
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
