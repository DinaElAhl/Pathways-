import RootsStoryArt from '../components/RootsStoryArt.jsx'
import NameOfDayWheel from '../components/NameOfDayWheel.jsx'
import '../components/rootsStory.css'
import RootsPodcast from '../components/RootsPodcast.jsx'
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
      <section className="roots-story-hero">
        <div className="container-page roots-story-grid">
          <div>
            <span className="roots-story-kicker">Allah’s Names in the Qur’an · Roots reflections</span>
            <h1 className="roots-story-title font-display">Begin with a Name.<br /><em>Let wonder grow.</em></h1>
            <p className="roots-story-arabic font-arabic" lang="ar" dir="rtl">اقرأ، وتفكّر، واعمل بما تعلّمت.</p>
            <p className="roots-story-copy">Read a Qur’anic reference. Notice something you usually pass by. Ask a deeper question—and carry one small act of goodness into your day.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={() => { setFocus(quranicNames[Math.floor(Math.random() * quranicNames.length)].transliteration); setQ(''); requestAnimationFrame(() => document.getElementById('name-focus')?.scrollIntoView({ behavior: 'smooth', block: 'center' })) }}>Explore one Name with me ✦</button>
              <a href="#names-library" className="btn-secondary">Choose a learning card ↓</a>
              <a href="#name-of-day" className="btn-secondary">Spin for today’s reflection ↻</a>
            </div>
            <div className="roots-story-path"><div><strong className="font-display">01 · Notice</strong><span>Manifestation · آثار الاسم</span></div><div><strong className="font-display">02 · Wonder</strong><span>Tafakkur · التفكّر</span></div><div><strong className="font-display">03 · Act</strong><span>Akhlāq · الأخلاق</span></div></div>
          </div>
          <div><RootsStoryArt reflection /><p className="roots-story-note font-display">One Name. One thoughtful question.<br />One action to carry with you.</p></div>
        </div>
      </section>

      <NameOfDayWheel onExplore={name => { setFocus(name); setQ(''); requestAnimationFrame(() => document.getElementById('name-focus')?.scrollIntoView({ behavior: 'smooth', block: 'center' })) }} />
      <section className="container-page py-10">
        <div className="roots-story-paper">
          <h2 className="text-xl font-bold text-slate-900">A moment to notice. A reason to change.</h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            Every science is a window onto the Names of Allah. When you study a discipline, do not
            stop at the mechanism — ask which Name of Allah this phenomenon points to. Real success
            in this life is to know Him through what He created, and real purpose is to let that
            knowledge shape your akhlāq, your gratitude, and your obedience.
          </p>
          <RootsMethodCards />
          <details className="mt-6 rounded-xl bg-white/70 p-4 text-sm text-slate-700"><summary className="cursor-pointer font-semibold">About these reflections · عن هذه التأمّلات</summary><p className="mt-3 leading-relaxed">{namesIntro.intro}</p><p className="mt-2">{namesIntro.call}</p><Link to="/curriculum/sources" className="mt-3 inline-block underline">Explore curriculum sources →</Link></details>
        </div>

        <div id="names-library" className="mt-8 flex items-center justify-between gap-3 flex-wrap scroll-mt-24">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{quranicNames.length} Qur’anic learning cards</h2>
            <p className="text-sm text-slate-500">Selected Qur’anic Names and descriptions; some cards pair related Names. Open a card to notice, wonder and act, then try a meaning match.</p>
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
      <RootsPodcast />
    </>
  )
}
