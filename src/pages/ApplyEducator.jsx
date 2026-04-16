import { Link } from 'react-router-dom'
import ApplyForm from '../components/ApplyForm.jsx'
import Icon from '../components/Icon.jsx'

const steps = [
  { n: '01', title: 'Tell us about yourself', body: 'Your background, what you teach or coach, and why Pathways.' },
  { n: '02', title: 'Intro call', body: 'A warm 30-minute chat with the Pathways team.' },
  { n: '03', title: 'Build your first unit', body: 'We pair you with an editor to shape your first pathway, tool, or workshop.' },
  { n: '04', title: 'Launch & share', body: 'Publish to the Pathways library. Earn when learners enroll.' },
]

const benefits = [
  { icon: 'users', label: 'Reach thousands of learners worldwide' },
  { icon: 'target', label: 'A supportive editorial and production team' },
  { icon: 'heart', label: 'Community of practice with other educators' },
  { icon: 'bolt', label: 'Revenue share on paid pathways' },
]

const fields = [
  { id: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name' },
  { id: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { id: 'role', label: 'Your role', type: 'select', required: true, options: ['Classroom teacher', 'Tutor / coach', 'Trainer', 'Curriculum designer', 'Academic / researcher', 'Other educator'] },
  { id: 'subject', label: 'What you teach or specialize in', type: 'text', required: true, placeholder: 'e.g. middle-school science, UX coaching' },
  { id: 'website', label: 'Website, LinkedIn, or portfolio', type: 'url', placeholder: 'https://' },
  { id: 'idea', label: 'What would you like to build with us?', type: 'textarea', required: true, rows: 5, placeholder: 'A pathway? A workshop? A tool? We love a half-formed idea.' },
  { id: 'availability', label: 'Your availability', type: 'select', required: true, options: ['A few hours a week', '~1 day a week', '2–3 days a week', 'Full time'] },
]

export default function ApplyEducator() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-14 pb-10 sm:pt-20">
          <nav className="text-sm text-slate-500">
            <Link to="/for/educators" className="hover:text-brand-700">
              ← Educators hub
            </Link>
          </nav>
          <span className="chip mt-5">Apply to teach</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Become a Pathways educator.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Teach a pathway, host a workshop, build a tool, or mentor learners — we'll
            help you shape it, polish it, and get it in front of the right people.
          </p>
        </div>
      </section>

      <section className="container-page py-12 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ApplyForm
            fields={fields}
            submitLabel="Send my application"
            disclaimer="We read every application. Replies within ~3 business days."
          />
        </div>
        <aside className="space-y-6">
          <div className="card">
            <h3 className="text-base font-semibold">Why teach with Pathways</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {benefits.map((b) => (
                <li key={b.label} className="flex items-start gap-2">
                  <Icon name={b.icon} className="mt-0.5 h-4 w-4 flex-none text-brand-600" strokeWidth={2} />
                  {b.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="text-base font-semibold">How the process works</h3>
            <ol className="mt-4 space-y-3 text-sm text-slate-700">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-3">
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-brand-50 font-display text-xs font-semibold text-brand-700">
                    {s.n}
                  </span>
                  <span>
                    <strong className="block text-slate-900">{s.title}</strong>
                    <span className="text-slate-600">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </section>
    </>
  )
}
