import RootsMethodCards from '../components/RootsMethodCards.jsx'
import NameStudyCard from '../components/NameStudyCard.jsx'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { namesIntro, quranicNames } from '../data/quranicNames.js'

export default function RootsNames() {
  const [q, setQ] = useState('')
  const [focus, setFocus] = useState('')
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    const pool = focus ? quranicNames.filter(n => n.transliteration === focus) : quranicNames
    if (!s) return pool
    return pool.filter((n) =>
      [n.transliteration, n.arabic, n.meaning, n.meaningArabic, n.ayah, n.manifestation, n.tafakkur, n.akhlaq]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(s))
    )
  }, [q, focus])

  return (
    <>
      <section className="bg-gradient-to-b from-amber-50/70 to-white">
        <div className="container-page py-12 md:py-16">
          <div className="text-xs uppercase tracking-wide text-amber-700 font-semibold">{namesIntro.eyebrow}</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-slate-900">{namesIntro.title}</h1>
          <p className="mt-2 text-lg text-amber-700">{namesIntro.tagline}</p>
          <p className="mt-5 max-w-3xl text-slate-700 leading-relaxed">{namesIntro.intro}</p>
          <p className="mt-3 max-w-3xl text-slate-700 leading-relaxed italic">{namesIntro.call}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/roots" className="btn-ghost">← Back to Roots</Link>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <h2 className="text-xl font-bold text-slate-900">How to use this list</h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            Every science is a window onto the Names of Allah. When you study a discipline, do not
            stop at the mechanism — ask which Name of Allah this phenomenon points to. Real success
            in this life is to know Him through what He created, and real purpose is to let that
            knowledge shape your akhlāq, your gratitude, and your obedience.
          </p>
          <RootsMethodCards />
        </div>

        <div className="mt-8 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{quranicNames.length} Qur’anic learning cards</h2>
            <p className="text-sm text-slate-500">Selected Qur’anic Names and descriptions; some cards pair related Names. Open each colorful flashcard to explore Manifestation, Tafakkur and Akhlāq.</p>
          </div>
          <input
            aria-label="Search Names in English or Arabic"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, meaning, manifestation…"
            className="w-full md:w-80 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="mt-5 max-w-xl">
          <label htmlFor="name-focus" className="block text-sm font-semibold text-brand-800">Choose one Name for a lesson · اختر اسمًا للتعلّم</label>
          <select id="name-focus" value={focus} onChange={e => { setFocus(e.target.value); setQ('') }} className="mt-2 w-full rounded-lg border border-brand-200 bg-white p-3">
            <option value="">Browse all cards</option>
            {quranicNames.map(n => <option key={n.transliteration} value={n.transliteration}>{n.transliteration} — {n.arabic} — {n.meaning}</option>)}
          </select>
          <p className="mt-2 text-sm text-slate-600">Read the reference, discuss the reflection, choose one action, and review what changed next lesson.</p>
        </div>

        <div className="mt-5 grid md:grid-cols-2 gap-6">
          {filtered.map((n) => (
            <NameStudyCard key={`${n.transliteration}-${focus}`} n={n} defaultOpen={!!focus} />
          ))}
          {filtered.length === 0 && (
            <div className="md:col-span-2 text-center text-slate-500 py-10">No Names match "{q}".</div>
          )}
        </div>
      </section>
    </>
  )
}
