import { Link } from 'react-router-dom'

const ARTIFACTS = [
  {
    title: 'E² EduHub',
    tagline: 'The all-in-one educator platform',
    description: 'Free tools for teachers, parents, homeschoolers, schools and universities — lesson generator, resource library, planner, assessment tools and the E² Teaching Framework, all in one place.',
    href: '/edu-hub.html',
    cta: 'Open EduHub',
    color: 'amber',
    rootsNote: 'Use it inside Pathways: every lesson, plan, or assessment can be desecularized by anchoring its topic to one of Allāh’s Names and a tafakkur prompt.'
  },
  {
    title: 'Pathways Hub',
    tagline: 'One holistic place that unites all the projects',
    description: 'A landing that brings together Pathways Learn, E² EduHub and the Frameworks Navigator for learners, teachers and parents in one navigation.',
    href: '/pathways-hub.html',
    cta: 'Open Pathways Hub',
    color: 'emerald',
    rootsNote: 'Useful when you want to introduce someone to the whole vision in a single page.'
  },
  {
    title: 'Visual Learning Path Builder',
    tagline: 'Drag-and-drop your own learning path',
    description: 'Build your own pathway from blocks (concepts, resources, exercises, reflections) and share it. Already wired into Pathways at /builder.',
    href: '/builder.html',
    cta: 'Open Builder',
    color: 'sky',
    rootsNote: 'When you build a path for any subject, end with an Evaluate block that ties the topic back to a Name and an akhlāq goal.'
  },
  {
    title: 'E² Teaching Framework',
    tagline: 'Engage · Explore · Explain · Elaborate · Evaluate',
    description: 'Native in-app workspace with guiding prompts inside every stage. Use it on any topic from your school curriculum.',
    href: '/tools/e2-teaching',
    cta: 'Open E² Tool',
    color: 'violet',
    rootsNote: 'Each E² cycle ends by asking which of Allāh’s Names is manifest in what you studied and what akhlāq it asks of you.'
  },
  {
    title: 'AI Studio',
    tagline: 'Curated AI tools for learners and teachers',
    description: 'A workspace of AI helpers for lesson design, summarization and study — used with a tawḥīd-centred lens.',
    href: '/ai-studio',
    cta: 'Open AI Studio',
    color: 'rose',
    rootsNote: 'AI is a means; the Bestower of knowledge is Allāh. Use AI to free time for tafakkur, not to replace it.'
  },
  {
    title: 'Roots of Knowledge',
    tagline: 'Allāh’s Names manifest in every discipline',
    description: '58 Names mentioned in the Qurʼan, mapped to disciplines (math, physics, biology, history, …) with tafakkur prompts and akhlāq for real success.',
    href: '/roots',
    cta: 'Open Roots',
    color: 'teal',
    rootsNote: 'This is the backbone of the desecularizing approach — start here, then bring any curriculum back to Tawḥīd.'
  }
]

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
          <a href={a.href} className={`inline-block rounded-lg px-4 py-2 text-sm font-semibold text-white ${cta}`}>{a.cta} →</a>
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
          One place that gathers every Pathways tool and artifact — the E² EduHub educator platform,
          the Pathways Hub landing, the Visual Learning Path Builder, the E² Teaching Framework,
          the AI Studio, and the Roots of Knowledge. Use them together to <strong>desecularize any
          curriculum you follow</strong> by anchoring it to Allāh’s Names, His signs in the universe,
          and the akhlāq of real success.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ARTIFACTS.map((a) => (
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
