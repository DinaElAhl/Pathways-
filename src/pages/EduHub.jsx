import { Link } from 'react-router-dom'

import { eduHubTools } from '../data/eduHubTools.js'
import ToolsMembershipCallout from '../components/ToolsMembershipCallout.jsx'

const COLORS = {
  amber: 'ring-amber-200 bg-amber-50 text-amber-900',
  emerald: 'ring-emerald-200 bg-emerald-50 text-emerald-900',
  sky: 'ring-sky-200 bg-sky-50 text-sky-900',
  violet: 'ring-violet-200 bg-violet-50 text-violet-900',
  rose: 'ring-rose-200 bg-rose-50 text-rose-900',
  teal: 'ring-teal-200 bg-teal-50 text-teal-900'
}
const CTA_COLORS = {
  amber: 'bg-amber-600 hover:bg-amber-700',
  emerald: 'bg-emerald-600 hover:bg-emerald-700',
  sky: 'bg-sky-600 hover:bg-sky-700',
  violet: 'bg-violet-600 hover:bg-violet-700',
  rose: 'bg-rose-600 hover:bg-rose-700',
  teal: 'bg-teal-600 hover:bg-teal-700'
}

function ArtifactCard({ a }) {
  const ring = COLORS[a.color] || COLORS.emerald
  const cta = CTA_COLORS[a.color] || CTA_COLORS.emerald
  const isExternalStatic = a.href.endsWith('.html')
  return (
    <div className={`rounded-2xl ring-1 ${ring} p-5 shadow-sm flex flex-col`}>
      <div className="text-xs font-semibold uppercase tracking-wide opacity-80">{a.tagline}</div>
      <h3 className="text-xl font-bold mt-1">{a.title}</h3>
      <p className="text-sm mt-2 text-slate-700">{a.description}</p>
      <p className="text-xs italic mt-3 text-slate-600">{a.rootsNote}</p>
      <div className="mt-4">
        {isExternalStatic ? (
          <a href={import.meta.env.BASE_URL + a.href.replace(/^\//, '')} className={`inline-block rounded-lg px-4 py-2 text-sm font-semibold text-white ${cta}`}>{a.cta} →</a>
        ) : (
          <Link to={a.href} className={`inline-block rounded-lg px-4 py-2 text-sm font-semibold text-white ${cta}`}>{a.cta} →</Link>
        )}
      </div>
    </div>
  )
}



export default function EduHub() {
  return (
    <section className="container-page py-10">
      <header className="mb-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Hub</p>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-1">EduHub & Tools</h1>
        <p className="text-slate-700 mt-3">
          Focused tools for learning and teaching, all available here on Pathways.
          Play, plan a lesson, build a learning path, or explore the Roots Method.
        </p>
      </header>
      <aside className="mb-6 rounded-2xl bg-amber-100 p-6"><h2 className="font-display text-2xl">What does your class need today?</h2><p className="my-3">Find free classroom activities by age, subject, purpose and time. Run them here, with corrections and teacher guidance.</p><Link className="btn-primary" to="/activities">Explore the Pathways activity library →</Link></aside>
      <ToolsMembershipCallout />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {eduHubTools.filter(a => !a.hidden).map((a) => (
          <ArtifactCard key={a.title} a={a} />
        ))}
      </div>

      <aside className="mt-10 rounded-2xl ring-1 ring-emerald-200 bg-emerald-50/60 p-5">
        <h2 className="text-lg font-semibold text-emerald-900">A note on the desecularizing approach</h2>
        <p className="text-sm text-emerald-900/90 mt-2">
          Pathways does not ask you to abandon your school curriculum. Whether you study the
          Egyptian Thanaweya, the American Diploma, IGCSE, IB, the French Baccalauréat, or any
          other system, bring the topic you are studying here and use these tools to restore its
          tawḥīd: which of Allāh’s Names is manifest in this topic? What tafakkur does it call you to?
          What akhlāq does it ask of you for success in this life and the next?
        </p>
      </aside>
    </section>
  )
}

