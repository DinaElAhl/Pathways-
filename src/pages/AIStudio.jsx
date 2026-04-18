import { useState } from 'react'
import { Link } from 'react-router-dom'

/* =============================================================
   Pathways AI Studio — on-device generators for teachers.
   Uses structured templates + keyword expansion (no API calls).
   ============================================================= */

const BLOOMS = ['Remember','Understand','Apply','Analyze','Evaluate','Create']

function capitalize(s) { return s ? s[0].toUpperCase() + s.slice(1) : s }

/* ---------- Lesson plan generator ---------- */
function generateLessonPlan({ topic, grade, duration, objective }) {
  const t = topic.trim() || 'the topic'
  const g = grade.trim() || 'your students'
  const mins = parseInt(duration) || 45
  const warm = Math.max(5, Math.round(mins * 0.15))
  const core = Math.max(15, Math.round(mins * 0.55))
  const guided = Math.max(10, Math.round(mins * 0.20))
  const wrap = Math.max(5, mins - warm - core - guided)

  return {
    title: `${capitalize(t)} — ${g}`,
    duration: mins,
    objective: objective.trim() || `By the end of the lesson, students will be able to explain ${t} and apply it to a new example.`,
    standards: [
      'Next Generation Science Standards — depending on discipline',
      'Common Core — Reading & Writing: CCSS.ELA-LITERACY.RST.6-8',
      'CSTA K-12 CS Standards — 2-AP-10 (if CS)',
    ],
    materials: [
      'Student devices or printed worksheet',
      'Projector / whiteboard',
      'Exit ticket (one per student)',
      `Vocabulary reference card for "${t}"`,
    ],
    structure: [
      { phase: 'Warm-up / Hook', minutes: warm,
        body: `Show a short image or 60-second video related to ${t}. Ask students to write one thing they notice and one question they have. Collect 2-3 verbal responses.` },
      { phase: 'Direct instruction', minutes: core,
        body: `Introduce ${t} using the Frayer model (definition, characteristics, example, non-example). Walk through 2 worked examples. Check for understanding with cold-call questions at ${Math.round(core/3)} and ${Math.round(2*core/3)} minutes.` },
      { phase: 'Guided practice', minutes: guided,
        body: `Students work in pairs on 3 scaffolded problems about ${t}. Circulate and use the "3 before me" rule — students consult each other before asking the teacher.` },
      { phase: 'Closure & exit ticket', minutes: wrap,
        body: `Students write a 1-2 sentence summary of ${t} and one lingering question on their exit ticket. Teacher uses these to plan the next lesson.` },
    ],
    differentiation: {
      support:   `Provide a partially-completed worked example. Pre-teach key vocabulary. Allow audio recording for written responses.`,
      extension: `Ask advanced students to create a counter-example and justify why it is a counter-example. Have them design a quick problem for a peer.`,
      language:  `Sentence stems ("One example of ${t} is ___ because ___"). Bilingual glossary. Visuals for every new term.`,
    },
    assessment: {
      formative: 'Cold-call questions, exit ticket, teacher observation of pair work.',
      summative: `Quiz at the end of the unit covering ${t} at Remember, Understand, and Apply levels.`,
    },
    homework: `15-20 minutes — find one real-world example of ${t} and write 3 sentences: what it is, where you saw it, and why it matters.`,
  }
}

function LessonPlanTool() {
  const [form, setForm] = useState({ topic: '', grade: 'Grade 8', duration: '45', objective: '' })
  const [plan, setPlan] = useState(null)
  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const printPlan = () => window.print()

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => { e.preventDefault(); setPlan(generateLessonPlan(form)) }}
        className="bg-white border border-gray-200 rounded-2xl p-6 grid md:grid-cols-2 gap-4"
      >
        <label className="md:col-span-2">
          <div className="text-sm font-medium mb-1">Topic</div>
          <input required value={form.topic} onChange={onChange('topic')}
            placeholder="e.g. photosynthesis, the water cycle, for-loops"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
        </label>
        <label>
          <div className="text-sm font-medium mb-1">Grade / Level</div>
          <select value={form.grade} onChange={onChange('grade')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2">
            {['K','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12','University / Intro','Adult learners'].map(g =>
              <option key={g}>{g}</option>
            )}
          </select>
        </label>
        <label>
          <div className="text-sm font-medium mb-1">Duration (minutes)</div>
          <input type="number" min="15" max="120" value={form.duration} onChange={onChange('duration')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </label>
        <label className="md:col-span-2">
          <div className="text-sm font-medium mb-1">Learning objective (optional)</div>
          <textarea rows={2} value={form.objective} onChange={onChange('objective')}
            placeholder="Leave blank to auto-generate from topic"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"></textarea>
        </label>
        <button type="submit" className="md:col-span-2 bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 rounded-xl">
          ✨ Generate lesson plan
        </button>
      </form>

      {plan && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5" id="lesson-plan-output">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
            <div>
              <h2 className="text-2xl font-bold">{plan.title}</h2>
              <div className="text-sm text-gray-500">{plan.duration} minute lesson · Generated on device</div>
            </div>
            <div className="flex gap-2 no-print">
              <button onClick={printPlan} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Print / PDF</button>
              <button onClick={() => navigator.clipboard && navigator.clipboard.writeText(JSON.stringify(plan, null, 2))} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Copy JSON</button>
            </div>
          </div>

          <section><h3 className="font-semibold mb-1">🎯 Learning objective</h3><p className="text-gray-700">{plan.objective}</p></section>
          <section>
            <h3 className="font-semibold mb-1">📚 Standards</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm">{plan.standards.map(s => <li key={s}>{s}</li>)}</ul>
          </section>
          <section>
            <h3 className="font-semibold mb-1">🧰 Materials</h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm">{plan.materials.map(s => <li key={s}>{s}</li>)}</ul>
          </section>
          <section>
            <h3 className="font-semibold mb-2">🗂 Lesson structure</h3>
            <div className="space-y-2">
              {plan.structure.map(s => (
                <div key={s.phase} className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                  <div className="flex justify-between font-semibold text-indigo-800">
                    <span>{s.phase}</span>
                    <span className="text-sm">{s.minutes} min</span>
                  </div>
                  <p className="text-gray-700 text-sm mt-1">{s.body}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 className="font-semibold mb-1">🌱 Differentiation</h3>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div className="bg-gray-50 rounded-lg p-3"><div className="font-semibold mb-1">Support</div>{plan.differentiation.support}</div>
              <div className="bg-gray-50 rounded-lg p-3"><div className="font-semibold mb-1">Extension</div>{plan.differentiation.extension}</div>
              <div className="bg-gray-50 rounded-lg p-3"><div className="font-semibold mb-1">Language learners</div>{plan.differentiation.language}</div>
            </div>
          </section>
          <section>
            <h3 className="font-semibold mb-1">✅ Assessment</h3>
            <p className="text-sm text-gray-700"><strong>Formative:</strong> {plan.assessment.formative}</p>
            <p className="text-sm text-gray-700"><strong>Summative:</strong> {plan.assessment.summative}</p>
          </section>
          <section>
            <h3 className="font-semibold mb-1">🏠 Homework</h3>
            <p className="text-sm text-gray-700">{plan.homework}</p>
          </section>
        </div>
      )}
    </div>
  )
}

/* ---------- Quiz generator ---------- */
function generateQuiz({ topic, count, level }) {
  const t = topic.trim() || 'the topic'
  const templates = [
    (n) => ({ q: `What is ${t}?`, correct: `A concept that describes ${t} in its simplest form`, distractors: [`An unrelated idea`, `The opposite of ${t}`, `A type of measurement tool`] }),
    (n) => ({ q: `Which of the following is the BEST example of ${t}?`, correct: `A real-world case where ${t} directly applies`, distractors: [`A case involving a different concept`, `A historical event unrelated to ${t}`, `A mathematical operation`] }),
    (n) => ({ q: `Which statement about ${t} is TRUE?`, correct: `${capitalize(t)} can be observed and described`, distractors: [`${capitalize(t)} never changes over time`, `Only scientists can study ${t}`, `${capitalize(t)} was only discovered recently`] }),
    (n) => ({ q: `Why is ${t} important to understand?`, correct: `It helps us make sense of related phenomena`, distractors: [`It is only important in one country`, `It has no practical application`, `It is required for a driver's license`] }),
    (n) => ({ q: `A classmate claims ${t} is the same as a common misconception. How should you respond?`, correct: `Explain the difference using a clear example`, distractors: [`Agree to avoid an argument`, `Ignore the claim`, `Ask the teacher to punish them`] }),
    (n) => ({ q: `Which tool or method would help you study ${t}?`, correct: `Observation and note-taking with a clear protocol`, distractors: [`Guessing`, `Random surveys`, `Unsupported opinion`] }),
    (n) => ({ q: `How does ${t} relate to everyday life?`, correct: `It appears in situations we encounter regularly`, distractors: [`It only appears in textbooks`, `It is not relevant outside the classroom`, `It is purely theoretical`] }),
    (n) => ({ q: `What is a common misconception about ${t}?`, correct: `That it is always simple and never involves exceptions`, distractors: [`That it is measurable`, `That it can be taught`, `That it has a definition`] }),
  ]
  const questions = []
  for (let i = 0; i < count; i++) {
    const qSpec = templates[i % templates.length](i + 1)
    const options = [qSpec.correct, ...qSpec.distractors].sort(() => Math.random() - 0.5)
    questions.push({
      number: i + 1,
      stem: qSpec.q,
      options,
      answer: qSpec.correct,
      bloom: BLOOMS[Math.min(i, BLOOMS.length - 1)],
    })
  }
  return { topic: t, level, questions }
}

function QuizTool() {
  const [form, setForm] = useState({ topic: '', count: 5, level: 'Understand' })
  const [quiz, setQuiz] = useState(null)
  const [showAnswers, setShowAnswers] = useState(false)
  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => { e.preventDefault(); setQuiz(generateQuiz({ ...form, count: parseInt(form.count) || 5 })); setShowAnswers(false) }}
        className="bg-white border border-gray-200 rounded-2xl p-6 grid md:grid-cols-3 gap-4"
      >
        <label className="md:col-span-3">
          <div className="text-sm font-medium mb-1">Topic</div>
          <input required value={form.topic} onChange={onChange('topic')}
            placeholder="e.g. cell division, the French Revolution, supply and demand"
            className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </label>
        <label>
          <div className="text-sm font-medium mb-1">Number of questions</div>
          <input type="number" min="3" max="20" value={form.count} onChange={onChange('count')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </label>
        <label>
          <div className="text-sm font-medium mb-1">Target Bloom level</div>
          <select value={form.level} onChange={onChange('level')} className="w-full border border-gray-300 rounded-lg px-3 py-2">
            {BLOOMS.map(b => <option key={b}>{b}</option>)}
          </select>
        </label>
        <button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl px-4 self-end h-[42px]">
          ✨ Generate quiz
        </button>
      </form>

      {quiz && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Quiz: {capitalize(quiz.topic)}</h2>
            <div className="flex gap-2">
              <button onClick={() => setShowAnswers(v => !v)} className="text-sm border border-gray-300 rounded-lg px-3 py-1 hover:bg-gray-50">
                {showAnswers ? 'Hide' : 'Show'} answer key
              </button>
              <button onClick={() => window.print()} className="text-sm border border-gray-300 rounded-lg px-3 py-1 hover:bg-gray-50">Print</button>
            </div>
          </div>
          <ol className="space-y-4">
            {quiz.questions.map(q => (
              <li key={q.number} className="border border-gray-100 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold">{q.number}. {q.stem}</div>
                  <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">{q.bloom}</span>
                </div>
                <ul className="space-y-1 ml-4 text-sm">
                  {q.options.map((o, i) => (
                    <li key={i} className={showAnswers && o === q.answer ? 'font-semibold text-green-700' : ''}>
                      <span className="mr-2">{String.fromCharCode(65 + i)}.</span>{o}
                    </li>
                  ))}
                </ul>
                {showAnswers && <div className="text-xs text-green-700 mt-2">✓ Correct answer: {q.answer}</div>}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

/* ---------- Rubric generator ---------- */
function generateRubric({ assignment, criteria }) {
  const crits = criteria.split(',').map(s => s.trim()).filter(Boolean)
  const defaultCrits = crits.length ? crits : ['Content', 'Organization', 'Evidence', 'Mechanics']
  const levels = [
    { label: 'Exemplary (4)', body: (c) => `Demonstrates sophisticated understanding of ${c.toLowerCase()}. Goes beyond expectations with original insight.` },
    { label: 'Proficient (3)', body: (c) => `Meets expectations for ${c.toLowerCase()} with minor errors that do not affect overall quality.` },
    { label: 'Developing (2)', body: (c) => `Partial understanding of ${c.toLowerCase()}. Some evidence present but inconsistent.` },
    { label: 'Beginning (1)', body: (c) => `Limited evidence of ${c.toLowerCase()}. Requires significant revision.` },
  ]
  return { assignment: assignment || 'Assignment', criteria: defaultCrits, levels }
}

function RubricTool() {
  const [form, setForm] = useState({ assignment: '', criteria: '' })
  const [rubric, setRubric] = useState(null)
  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <div className="space-y-6">
      <form onSubmit={(e) => { e.preventDefault(); setRubric(generateRubric(form)) }}
        className="bg-white border border-gray-200 rounded-2xl p-6 grid md:grid-cols-2 gap-4">
        <label className="md:col-span-2">
          <div className="text-sm font-medium mb-1">Assignment name</div>
          <input required value={form.assignment} onChange={onChange('assignment')}
            placeholder="e.g. Persuasive essay on climate change"
            className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </label>
        <label className="md:col-span-2">
          <div className="text-sm font-medium mb-1">Criteria (comma-separated, optional)</div>
          <input value={form.criteria} onChange={onChange('criteria')}
            placeholder="e.g. Thesis, Evidence, Organization, Conventions"
            className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </label>
        <button type="submit" className="md:col-span-2 bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 rounded-xl">
          ✨ Generate rubric
        </button>
      </form>

      {rubric && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Rubric: {rubric.assignment}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 border border-gray-200">Criterion</th>
                  {rubric.levels.map(l => <th key={l.label} className="text-left p-3 border border-gray-200">{l.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {rubric.criteria.map(c => (
                  <tr key={c}>
                    <td className="p-3 border border-gray-200 font-semibold">{c}</td>
                    {rubric.levels.map(l => <td key={l.label} className="p-3 border border-gray-200 text-gray-700">{l.body(c)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- Studio shell ---------- */
export default function AIStudio() {
  const [tab, setTab] = useState('lesson')
  const tabs = [
    { id: 'lesson', label: '📘 Lesson plan' },
    { id: 'quiz',   label: '❓ Quiz generator' },
    { id: 'rubric', label: '📋 Rubric builder' },
  ]
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-violet-700 bg-violet-100 px-3 py-1 rounded-full">AI Studio for Teachers</span>
        <h1 className="text-4xl font-bold mt-3 mb-2">Draft lessons, quizzes, and rubrics in seconds.</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Everything runs on your device. Student names and topics stay private — we never send your drafts to a third-party model.
        </p>
        <div className="mt-4"><Link to="/dashboard" className="text-sm text-indigo-600 hover:underline">← Back to dashboard</Link></div>
      </div>

      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${tab === t.id ? 'bg-violet-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:border-violet-400'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'lesson' && <LessonPlanTool />}
      {tab === 'quiz'   && <QuizTool />}
      {tab === 'rubric' && <RubricTool />}
    </div>
  )
}
