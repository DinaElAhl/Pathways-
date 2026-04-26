import { useEffect, useMemo, useState } from 'react'

const STAGES = [
  {
    key: 'engage',
    label: 'Engage',
    color: 'amber',
    intent: 'Spark curiosity and connect to the learner’s reality and to Allāh’s signs.',
    prompts: [
      'What did you notice about this topic in the world around you today?',
      'Which sign of Allāh does this topic point to (آية في الآفاق أو في الأنفس)?',
      'When did you first wonder about this idea?',
      'What question would you ask Allāh about this if you could?',
      'Why does this topic matter for your life and your ākhirah?'
    ]
  },
  {
    key: 'explore',
    label: 'Explore',
    color: 'sky',
    intent: 'Investigate the phenomenon directly: observe, measure, classify, compare.',
    prompts: [
      'What can you observe directly with your senses?',
      'What pattern, order, or balance (ميزان) do you find?',
      'What changes and what stays constant?',
      'What examples and counter-examples can you collect?',
      'How precise is the design here — which Name of Allāh is manifest?'
    ]
  },
  {
    key: 'explain',
    label: 'Explain',
    color: 'emerald',
    intent: 'Build understanding with concepts, models, and the language of the discipline.',
    prompts: [
      'In your own words, what is happening and why?',
      'Which secondary causes (asbāb) are at work — and Who created and sustains them?',
      'What model or definition captures this best?',
      'Where does the textbook/curriculum stop short of meaning?',
      'How does this concept point back to its Source?'
    ]
  },
  {
    key: 'elaborate',
    label: 'Elaborate',
    color: 'violet',
    intent: 'Apply, transfer, and deepen — connect to other disciplines and to akhlāq.',
    prompts: [
      'Where else in life or in another subject does this idea apply?',
      'What akhlāq (character) does this knowledge call you to?',
      'How would you teach this to a younger sibling?',
      'What real problem could this help solve, and for whose benefit?',
      'How does this strengthen tawakkul, shukr, or ḥusn al-ẓann bi-Llāh?'
    ]
  },
  {
    key: 'evaluate',
    label: 'Evaluate',
    color: 'rose',
    intent: 'Reflect on what was learned, judge it against tawhīd, and plan next steps.',
    prompts: [
      'What is the strongest evidence for what you concluded?',
      'Where might you be wrong — and how would you know?',
      'How does this knowledge increase your khashyah and humility?',
      'What will you do differently because of this?',
      'Which duʿā fits what you learned today?'
    ]
  }
]

const COLOR_CLASSES = {
  amber: { ring: 'ring-amber-200', bg: 'bg-amber-50', text: 'text-amber-900', chip: 'bg-amber-100 text-amber-800', btn: 'bg-amber-600 hover:bg-amber-700' },
  sky: { ring: 'ring-sky-200', bg: 'bg-sky-50', text: 'text-sky-900', chip: 'bg-sky-100 text-sky-800', btn: 'bg-sky-600 hover:bg-sky-700' },
  emerald: { ring: 'ring-emerald-200', bg: 'bg-emerald-50', text: 'text-emerald-900', chip: 'bg-emerald-100 text-emerald-800', btn: 'bg-emerald-600 hover:bg-emerald-700' },
  violet: { ring: 'ring-violet-200', bg: 'bg-violet-50', text: 'text-violet-900', chip: 'bg-violet-100 text-violet-800', btn: 'bg-violet-600 hover:bg-violet-700' },
  rose: { ring: 'ring-rose-200', bg: 'bg-rose-50', text: 'text-rose-900', chip: 'bg-rose-100 text-rose-800', btn: 'bg-rose-600 hover:bg-rose-700' }
}

const STORAGE_KEY = 'pathways.e2.session.v1'

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {}
  return { topic: '', discipline: '', notes: { engage: '', explore: '', explain: '', elaborate: '', evaluate: '' } }
}

function StageCard({ stage, value, onChange }) {
  const c = COLOR_CLASSES[stage.color]
  const [picker, setPicker] = useState('')

  function insertPrompt(p) {
    if (!p) return
    const sep = value && !value.endsWith('\n') ? '\n' : ''
    onChange((value || '') + sep + '• ' + p + '\n')
    setPicker('')
  }

  return (
    <div className={`rounded-2xl ring-1 ${c.ring} ${c.bg} p-5 shadow-sm`}>
      <div className="flex items-center justify-between gap-3 mb-2">
        <div>
          <div className={`text-xs font-semibold uppercase tracking-wide ${c.text}`}>{stage.label}</div>
          <p className="text-sm text-slate-700 mt-1">{stage.intent}</p>
        </div>
      </div>
      <div className="mt-3 mb-2 flex flex-wrap items-center gap-2">
        <select
          value={picker}
          onChange={(e) => insertPrompt(e.target.value)}
          className={`rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm ${c.text}`}
          aria-label={`Insert a ${stage.label} prompt`}
        >
          <option value="">+ Insert a guiding prompt…</option>
          {stage.prompts.map((p, i) => (
            <option key={i} value={p}>{p}</option>
          ))}
        </select>
        <span className={`text-[11px] px-2 py-0.5 rounded-full ${c.chip}`}>auto-saves</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder={`Write your ${stage.label.toLowerCase()} reflections here…`}
        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-300"
      />
    </div>
  )
}

export default function E2TeachingTool() {
  const [state, setState] = useState(loadInitial)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch (e) {}
  }, [state])

  function setNote(key, val) {
    setState((s) => ({ ...s, notes: { ...s.notes, [key]: val } }))
  }

  function clearAll() {
    if (!confirm('Clear all E² notes for this session?')) return
    setState({ topic: '', discipline: '', notes: { engage: '', explore: '', explain: '', elaborate: '', evaluate: '' } })
  }

  function exportText() {
    const lines = []
    lines.push('# E² Teaching — ' + (state.topic || 'Untitled topic'))
    if (state.discipline) lines.push('Discipline: ' + state.discipline)
    lines.push('')
    STAGES.forEach((s) => {
      lines.push('## ' + s.label)
      lines.push(state.notes[s.key] || '(empty)')
      lines.push('')
    })
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'e2-session.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const filledCount = useMemo(
    () => STAGES.filter((s) => (state.notes[s.key] || '').trim().length > 0).length,
    [state.notes]
  )

  return (
    <section className="container-page py-10">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Pathways tool</p>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-1">E² Teaching Framework</h1>
        <p className="text-slate-700 mt-2 max-w-3xl">
          A native, in-app workspace for the five E² stages — Engage, Explore, Explain, Elaborate, Evaluate —
          with guiding prompts built into each field. Use it on any topic from your school curriculum
          and let the Roots approach desecularize what you learn by anchoring it to Allāh’s Names and signs.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-3 mb-6 rounded-2xl ring-1 ring-slate-200 bg-white p-5">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">Topic / Lesson</span>
          <input
            type="text"
            value={state.topic}
            onChange={(e) => setState({ ...state, topic: e.target.value })}
            placeholder="e.g., Photosynthesis, Derivatives, Ottoman trade"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">Discipline</span>
          <input
            type="text"
            value={state.discipline}
            onChange={(e) => setState({ ...state, discipline: e.target.value })}
            placeholder="e.g., Biology, Mathematics, History"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </label>
        <div className="md:col-span-2 flex items-center justify-between text-sm text-slate-600 pt-1">
          <span>Progress: {filledCount}/5 stages with notes</span>
          <div className="flex gap-2">
            <button onClick={exportText} className="rounded-md bg-slate-900 text-white px-3 py-1.5 text-xs font-semibold hover:bg-slate-800">Export .txt</button>
            <button onClick={clearAll} className="rounded-md bg-rose-50 text-rose-700 px-3 py-1.5 text-xs font-semibold hover:bg-rose-100">Clear session</button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {STAGES.map((s) => (
          <StageCard
            key={s.key}
            stage={s}
            value={state.notes[s.key]}
            onChange={(v) => setNote(s.key, v)}
          />
        ))}
      </div>

      <aside className="mt-8 rounded-2xl ring-1 ring-emerald-200 bg-emerald-50/60 p-5">
        <h2 className="text-lg font-semibold text-emerald-900">Roots overlay — desecularize what you learn</h2>
        <p className="text-sm text-emerald-900/90 mt-2">
          Whatever curriculum you follow, end every E² cycle by asking: <em>Which of Allāh’s Names is
          manifest in what I just studied? What tafakkur does it call me to? What akhlāq does it ask of me
          for real success in this life and the next?</em>
        </p>
        <p className="text-sm text-emerald-900/90 mt-2">
          Visit the <a href="/roots/names" className="underline font-semibold">Roots of Knowledge — Names</a> page
          to find the Names that fit your topic, and the discipline page (e.g.&nbsp;
          <a href="/roots/biology" className="underline font-semibold">Biology</a>,&nbsp;
          <a href="/roots/physics" className="underline font-semibold">Physics</a>) for tafakkur prompts and akhlāq
          tied to that subject.
        </p>
      </aside>
    </section>
  )
}
