import { Link } from 'react-router-dom'
import ApplyForm from '../components/ApplyForm.jsx'
import Icon from '../components/Icon.jsx'

const includes = [
  'Whole-school or whole-district licenses',
  'Admin dashboard and cohort analytics',
  'Professional development pathways for staff',
  'Dedicated partner success manager',
  'Co-designed rollouts and check-ins',
  'Custom learning pathways for your community',
]

const fields = [
  { id: 'name', label: 'Your name', type: 'text', required: true, autoComplete: 'name' },
  { id: 'role', label: 'Your role', type: 'text', required: true, placeholder: 'e.g. Director of Teaching & Learning', autoComplete: 'organization-title' },
  { id: 'email', label: 'Work email', type: 'email', required: true, autoComplete: 'email' },
  { id: 'organization', label: 'Organization', type: 'text', required: true, autoComplete: 'organization' },
  { id: 'type', label: 'Organization type', type: 'select', required: true, options: ['School', 'District', 'Higher education', 'Nonprofit', 'Company / L&D', 'Other'] },
  { id: 'size', label: 'Approximate size', type: 'select', required: true, options: ['Under 100 learners', '100–500 learners', '500–2,000 learners', '2,000–10,000 learners', '10,000+ learners'] },
  { id: 'goals', label: 'What are you hoping to achieve?', type: 'textarea', required: true, rows: 5, placeholder: 'Share the goals, the people, and the timeline.' },
  { id: 'website', label: 'Website', type: 'url', placeholder: 'https://' },
]

export default function ApplyPartner() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-14 pb-10 sm:pt-20">
          <nav className="text-sm text-slate-500">
            <Link to="/for/schools" className="hover:text-brand-700">
              ← Schools & institutions hub
            </Link>
          </nav>
          <span className="chip mt-5">Partner with us</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Bring Pathways to your school, district, or team.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Tell us a bit about your community. We'll send a short proposal and book
            a call with our partnerships team — no commitment either way.
          </p>
        </div>
      </section>

      <section className="container-page py-12 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ApplyForm
            fields={fields}
            submitLabel="Request a proposal"
            disclaimer="We reply within ~2 business days."
          />
        </div>
        <aside className="space-y-6">
          <div className="card">
            <h3 className="text-base font-semibold">What partnerships include</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {includes.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-brand-600" strokeWidth={3} />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-6 text-white">
            <p className="font-display text-lg leading-snug">
              &ldquo;Pathways gave our district a shared language for PD across 14 schools. Engagement tripled.&rdquo;
            </p>
            <p className="mt-3 text-xs text-brand-100">
              <strong className="font-semibold text-white">Dr. Rivera</strong> &middot; Director of Teaching & Learning
            </p>
          </div>
        </aside>
      </section>
    </>
  )
}
