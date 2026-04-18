import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

const seedClassrooms = [
  {
    id: 'c1', name: 'Period 2 — CS Discoveries', code: 'CSD-2P', emoji: '💻',
    grade: 'Grade 8', students: 26, pathway: 'k12-computer-science',
    averageGrade: 87, attendance: 94,
    students_detail: [
      { name: 'Aiden K.', grade: 92, progress: 78, risk: 'low' },
      { name: 'Bisan H.', grade: 71, progress: 45, risk: 'high', note: 'Missed 3 assignments' },
      { name: 'Carla M.', grade: 88, progress: 82, risk: 'low' },
      { name: 'Diego R.', grade: 65, progress: 38, risk: 'high', note: 'Struggling with loops' },
      { name: 'Ella T.', grade: 95, progress: 91, risk: 'low' },
      { name: 'Fawaz S.', grade: 78, progress: 62, risk: 'medium' },
    ],
  },
  {
    id: 'c2', name: 'Period 4 — Data Literacy', code: 'DL-4P', emoji: '📊',
    grade: 'Grade 9', students: 22, pathway: 'data-literacy',
    averageGrade: 82, attendance: 89,
    students_detail: [
      { name: 'George L.', grade: 88, progress: 70, risk: 'low' },
      { name: 'Hana J.', grade: 74, progress: 55, risk: 'medium' },
      { name: 'Ismail O.', grade: 68, progress: 42, risk: 'high', note: 'Low quiz scores' },
      { name: 'Jana B.', grade: 91, progress: 85, risk: 'low' },
    ],
  },
  {
    id: 'c3', name: 'After-school — AI Club', code: 'AI-CLUB', emoji: '🤖',
    grade: 'Mixed', students: 14, pathway: 'ai-fundamentals',
    averageGrade: 91, attendance: 97,
    students_detail: [
      { name: 'Kareem P.', grade: 94, progress: 88, risk: 'low' },
      { name: 'Lina W.', grade: 89, progress: 80, risk: 'low' },
      { name: 'Mahmoud N.', grade: 96, progress: 95, risk: 'low' },
    ],
  },
]

const seedAssignments = [
  { id: 'a1', classroomId: 'c1', title: 'Week 4 — Loops quiz', due: '2026-04-22', submitted: 19, total: 26, graded: 12 },
  { id: 'a2', classroomId: 'c1', title: 'Project: Build a calculator', due: '2026-04-28', submitted: 8, total: 26, graded: 0 },
  { id: 'a3', classroomId: 'c2', title: 'Reading charts worksheet', due: '2026-04-20', submitted: 22, total: 22, graded: 22 },
  { id: 'a4', classroomId: 'c3', title: 'Train an image classifier', due: '2026-04-30', submitted: 6, total: 14, graded: 0 },
]

function useLocalState(key, initial) {
  const [v, setV] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch { return initial }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(v)) } catch {}
  }, [key, v])
  return [v, setV]
}

function StatCard({ label, value, trend, color }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
      <div className={`text-3xl font-bold mt-1 ${color || 'text-gray-900'}`}>{value}</div>
      {trend && <div className="text-xs text-green-600 mt-1">{trend}</div>}
    </div>
  )
}

function RiskBadge({ level }) {
  const map = {
    high:   'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low:    'bg-green-100 text-green-700',
  }
  return <span className={`px-2 py-0.5 text-xs rounded-full ${map[level] || map.low}`}>{level}</span>
}

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value), 100)
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map(d => (
        <div key={d.label} className="flex-1 flex flex-col items-center">
          <div
            className="w-full bg-gradient-to-t from-indigo-600 to-violet-500 rounded-t-md"
            style={{ height: `${(d.value / max) * 100}%` }}
            title={`${d.label}: ${d.value}`}
          />
          <div className="text-xs text-gray-500 mt-1 truncate w-full text-center">{d.label}</div>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [classrooms, setClassrooms] = useLocalState('pw-classrooms', seedClassrooms)
  const [assignments] = useLocalState('pw-assignments', seedAssignments)
  const [activeId, setActiveId] = useState(classrooms[0]?.id)
  const active = classrooms.find(c => c.id === activeId) || classrooms[0]

  const totals = useMemo(() => ({
    students: classrooms.reduce((s, c) => s + c.students, 0),
    classrooms: classrooms.length,
    avgGrade: Math.round(classrooms.reduce((s, c) => s + c.averageGrade, 0) / classrooms.length),
    atRisk: classrooms.flatMap(c => c.students_detail).filter(s => s.risk === 'high').length,
  }), [classrooms])

  const classroomAssignments = assignments.filter(a => a.classroomId === active?.id)

  function addClassroom() {
    const name = prompt('Classroom name?')
    if (!name) return
    const id = 'c' + Date.now()
    setClassrooms([
      ...classrooms,
      { id, name, code: 'CODE-' + Math.random().toString(36).slice(2, 6).toUpperCase(),
        emoji: '📘', grade: 'Grade -', students: 0, pathway: 'web-development',
        averageGrade: 0, attendance: 100, students_detail: [] }
    ])
    setActiveId(id)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="text-xs uppercase tracking-wide text-indigo-600 font-semibold">Teacher dashboard</div>
          <h1 className="text-3xl font-bold">Good afternoon, Ms. Rivera 👋</h1>
          <p className="text-gray-600">Here's what's happening across your classrooms.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/ai-studio" className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl text-sm font-medium">
            ✨ AI Studio
          </Link>
          <button onClick={addClassroom} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium">
            + New classroom
          </button>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Classrooms" value={totals.classrooms} trend="+1 this week" />
        <StatCard label="Students" value={totals.students} trend="92% active today" />
        <StatCard label="Average grade" value={`${totals.avgGrade}%`} color="text-indigo-600" />
        <StatCard label="Students at risk" value={totals.atRisk} color="text-red-600" trend="Review now →" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sidebar: classrooms */}
        <div className="lg:col-span-1 space-y-2">
          <h2 className="font-semibold text-gray-700 mb-2">Your classrooms</h2>
          {classrooms.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`w-full text-left p-4 rounded-xl border transition ${active?.id === c.id ? 'bg-indigo-50 border-indigo-300' : 'bg-white border-gray-200 hover:border-indigo-200'}`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{c.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.grade} · {c.students} students</div>
                </div>
                <div className="text-xs font-mono text-gray-400">{c.code}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Main panel */}
        {active && (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">{active.emoji} {active.name}</h2>
                  <div className="text-sm text-gray-500">Join code: <span className="font-mono font-semibold">{active.code}</span></div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Class average</div>
                  <div className="text-3xl font-bold text-indigo-600">{active.averageGrade}%</div>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-gray-700 mb-2">Weekly engagement</h3>
              <BarChart data={[
                { label: 'Mon', value: 78 }, { label: 'Tue', value: 92 },
                { label: 'Wed', value: 84 }, { label: 'Thu', value: 96 },
                { label: 'Fri', value: 71 },
              ]} />
            </div>

            {/* Assignments */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-semibold mb-3">Active assignments</h3>
              <div className="space-y-2">
                {classroomAssignments.length === 0 && <div className="text-sm text-gray-500">No assignments yet.</div>}
                {classroomAssignments.map(a => (
                  <div key={a.id} className="flex items-center justify-between border border-gray-100 rounded-xl p-3">
                    <div>
                      <div className="font-medium">{a.title}</div>
                      <div className="text-xs text-gray-500">Due {a.due}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{a.submitted}/{a.total} submitted</div>
                      <div className="text-xs text-gray-500">{a.graded} graded</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roster */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-semibold mb-3">Students</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 uppercase tracking-wide">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Grade</th>
                    <th className="text-left p-2">Progress</th>
                    <th className="text-left p-2">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {active.students_detail.map(s => (
                    <tr key={s.name} className="border-t border-gray-100">
                      <td className="p-2 font-medium">{s.name}</td>
                      <td className="p-2">{s.grade}%</td>
                      <td className="p-2">
                        <div className="bg-gray-100 rounded-full h-2 w-32 overflow-hidden">
                          <div className="bg-indigo-500 h-2" style={{ width: `${s.progress}%` }} />
                        </div>
                      </td>
                      <td className="p-2"><RiskBadge level={s.risk} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
