import { useState } from 'react'
import { Link } from 'react-router-dom'

// Simulated classrooms that accept join codes (case-insensitive).
const demoClasses = {
  'CSD-2P': { emoji: '💻', name: 'Period 2 — CS Discoveries', teacher: 'Ms. Rivera', pathway: 'K-12 Computer Science',
    assignments: [
      { title: 'Week 4 — Loops quiz', due: 'Apr 22', status: 'open' },
      { title: 'Project: Build a calculator', due: 'Apr 28', status: 'open' },
      { title: 'Week 3 — Variables worksheet', due: 'Apr 15', status: 'submitted' },
    ],
    announcement: 'Reminder: bring headphones for Wednesday\'s coding lab.',
  },
  'DL-4P': { emoji: '📊', name: 'Period 4 — Data Literacy', teacher: 'Mr. Chen', pathway: 'Data Literacy',
    assignments: [
      { title: 'Reading charts worksheet', due: 'Apr 20', status: 'submitted' },
      { title: 'Mini-project: Survey your class', due: 'Apr 26', status: 'open' },
    ],
    announcement: 'We start hypothesis testing next week — review chapter 5.',
  },
  'AI-CLUB': { emoji: '🤖', name: 'After-school — AI Club', teacher: 'Ms. Rivera', pathway: 'AI Fundamentals',
    assignments: [
      { title: 'Train an image classifier', due: 'Apr 30', status: 'open' },
      { title: 'Read: "What is a neural network?"', due: 'Apr 19', status: 'submitted' },
    ],
    announcement: 'Field trip to the university AI lab on May 10 — sign up by Monday!',
  },
}

function AITutor({ pathway }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hi! I'm your ${pathway} tutor. Ask me anything about today's lesson.` },
  ])
  const [input, setInput] = useState('')

  function reply(userMsg) {
    const lower = userMsg.toLowerCase()
    if (lower.includes('loop') || lower.includes('iteration')) return 'A loop repeats code. The most common is a for-loop: "for i in range(5): print(i)". Try changing the 5 to 10 and see what happens!'
    if (lower.includes('variable')) return 'A variable is a named container for a value. Like a labelled box — you can put something in, take it out, or replace what\'s inside.'
    if (lower.includes('neural') || lower.includes('network')) return 'A neural network is a stack of simple math functions ("neurons"). Each one learns a tiny rule; together they learn the overall pattern.'
    if (lower.includes('chart') || lower.includes('graph')) return 'When you look at a chart, always check: 1) what the axes measure, 2) the scale, and 3) whether the source is trustworthy.'
    if (lower.includes('help')) return 'Sure! Tell me what topic you\'re stuck on — a specific word or example from the lesson works best.'
    return `Great question about "${userMsg}". Try explaining it back in your own words — that usually helps you see if you really understand it. What part is confusing?`
  }

  const send = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const userMsg = input
    setInput('')
    setMessages(m => [...m, { role: 'me', text: userMsg }])
    setTimeout(() => {
      setMessages(m => [...m, { role: 'ai', text: reply(userMsg) }])
    }, 600)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col h-[420px]">
      <div className="font-semibold mb-2">🤖 AI Tutor (on-device)</div>
      <div className="flex-1 overflow-y-auto space-y-2 text-sm pr-1">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'me' ? 'text-right' : 'text-left'}>
            <span className={`inline-block px-3 py-2 rounded-2xl ${m.role === 'me' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="mt-2 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)}
          placeholder="Ask anything about today's lesson…"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:border-indigo-500 outline-none" />
        <button className="bg-indigo-600 text-white rounded-full px-4">Send</button>
      </form>
      <div className="text-xs text-gray-500 mt-1 text-center">Your messages stay on this device. They never train any model.</div>
    </div>
  )
}

export default function Join() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [klass, setKlass] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    const c = code.trim().toUpperCase()
    if (!demoClasses[c]) {
      setError('That join code does not match any classroom. Try CSD-2P, DL-4P, or AI-CLUB to see a demo.')
      setKlass(null)
      return
    }
    setError('')
    setKlass({ code: c, ...demoClasses[c] })
  }

  if (klass) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <button onClick={() => setKlass(null)} className="text-sm text-indigo-600 mb-4">← Leave classroom</button>
        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-2xl p-8 mb-6">
          <div className="text-5xl mb-2">{klass.emoji}</div>
          <h1 className="text-3xl font-bold">{klass.name}</h1>
          <div className="text-white/90 mt-1">Taught by {klass.teacher} · {klass.pathway}</div>
          <div className="mt-4 bg-white/10 border border-white/20 rounded-xl p-3 text-sm">
            📣 <span className="font-semibold">Class announcement:</span> {klass.announcement}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <h2 className="font-semibold mb-3">Your assignments</h2>
            <div className="space-y-2">
              {klass.assignments.map(a => (
                <div key={a.title} className="flex items-center justify-between border border-gray-100 rounded-xl p-3">
                  <div>
                    <div className="font-medium">{a.title}</div>
                    <div className="text-xs text-gray-500">Due {a.due}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${a.status === 'submitted' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {a.status === 'submitted' ? '✓ Submitted' : 'Open'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <AITutor pathway={klass.pathway} />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">🎒</div>
      <h1 className="text-3xl font-bold mb-2">Join your classroom</h1>
      <p className="text-gray-600 mb-6">Enter the join code your teacher gave you.</p>
      <form onSubmit={submit} className="space-y-3">
        <input value={code} onChange={e => setCode(e.target.value)}
          placeholder="e.g. CSD-2P"
          className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-center text-xl font-mono uppercase tracking-wider focus:border-indigo-500 outline-none" />
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl py-3">
          Join classroom →
        </button>
      </form>
      {error && <div className="text-red-600 text-sm mt-3">{error}</div>}
      <div className="mt-8 text-xs text-gray-500">
        Demo codes: <button onClick={() => setCode('CSD-2P')} className="text-indigo-600 underline">CSD-2P</button>,{' '}
        <button onClick={() => setCode('DL-4P')} className="text-indigo-600 underline">DL-4P</button>,{' '}
        <button onClick={() => setCode('AI-CLUB')} className="text-indigo-600 underline">AI-CLUB</button>
      </div>
      <div className="mt-4"><Link to="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to Pathways</Link></div>
    </div>
  )
}
