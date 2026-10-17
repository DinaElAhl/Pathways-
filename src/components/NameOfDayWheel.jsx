import { useEffect, useRef, useState } from 'react'
import { quranicNames } from '../data/quranicNames.js'
import { nameReferences } from './NameStudyCard.jsx'
import './nameOfDayWheel.css'

const colours = ['#edcd62', '#b6d6b8', '#f0b3a3', '#fff0b3', '#d8ebcf', '#fbe1d7']
const point = angle => [160 + 150 * Math.cos(angle), 160 + 150 * Math.sin(angle)]

export default function NameOfDayWheel({ onExplore }) {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [selected, setSelected] = useState(null)
  const [tried, setTried] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  const timer = useRef(null)
  const busy = useRef(false)
  const result = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  function spin() {
    if (busy.current) return
    busy.current = true
    setSpinning(true); setCopyStatus(''); setTried(false)
    const random = window.crypto?.getRandomValues ? window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296 : Math.random()
    const index = Math.floor(random * quranicNames.length)
    const angle = 360 - (index + .5) * 360 / quranicNames.length
    setRotation(previous => previous + (360 - previous % 360) + 4 * 360 + angle)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timer.current = setTimeout(() => {
      setSelected(quranicNames[index]); setSpinning(false); busy.current = false
      requestAnimationFrame(() => result.current?.focus({ preventScroll: true }))
    }, reduced ? 150 : 3700)
  }

  async function copyPlan() {
    try {
      await navigator.clipboard.writeText(`Roots · A Name to study today\n${selected.arabic} — ${selected.transliteration}\n${selected.meaning}\nQur’anic references: ${selected.ayah}\n\nNotice: ${selected.manifestation}\nReflect: ${selected.tafakkur}\nToday’s action: ${selected.akhlaq}\n\nA randomly selected learning prompt, not a personal message or prediction.\nhttps://www.pathwayslearn.com/roots/names#name-of-day`)
      setCopyStatus('Your reflection and action were copied.')
    } catch { setCopyStatus('Copy is unavailable here. You can select the reflection text instead.') }
  }

  return <section id="name-of-day" className="container-page py-12 scroll-mt-24" aria-labelledby="name-wheel-title">
    <div className="roots-wheel-panel">
      <div className="roots-wheel-intro"><span className="roots-story-kicker">Pause · Reflect · Put it into practice</span><h2 id="name-wheel-title" className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-brand-900">A Name to study today</h2><p lang="ar" dir="rtl" className="mt-3 font-arabic text-2xl text-brand-800">اسمٌ نتعلّمه، وأثرٌ نحمله في يومنا.</p><p className="mt-3 text-sm leading-relaxed text-slate-700">Spin for a learning card, take a moment to reflect, and choose a helpful action for today. No account needed.</p></div>
      <div className="roots-wheel-grid">
        <div className="roots-wheel-play">
          <div className="roots-wheel-stage" aria-hidden="true">
            <span className="roots-wheel-pointer" />
            <svg viewBox="0 0 320 320" className="roots-name-wheel" style={{ transform: `rotate(${rotation}deg)` }}>
              {quranicNames.map((name, i) => {
                const a = -Math.PI / 2 + i * 2 * Math.PI / quranicNames.length
                const b = a + 2 * Math.PI / quranicNames.length
                const start = point(a); const end = point(b)
                return <path key={name.transliteration} d={`M160 160L${start[0]} ${start[1]}A150 150 0 0 1 ${end[0]} ${end[1]}Z`} fill={colours[i % colours.length]} stroke="#fffbee" strokeWidth="1.5" />
              })}
              <circle cx="160" cy="160" r="150" fill="none" stroke="#365f3d" strokeWidth="4" />
            </svg>
            <div className="roots-wheel-hub"><img src={`${import.meta.env.BASE_URL}brand/roots-sprout.svg`} alt="" /><span className="font-display">Roots</span></div>
          </div>
          <button type="button" className="btn-primary mt-5 min-h-12" onClick={spin} disabled={spinning} aria-busy={spinning}>{spinning ? 'Choosing a learning card…' : selected ? 'Spin for another reflection ↻' : 'Spin the Roots wheel ↻'}</button>
          <p className="mt-3 text-xs text-slate-600">{quranicNames.length} selected learning cards · some pair related Names.</p>
        </div>
        <div className="roots-wheel-result" aria-live="polite" aria-busy={spinning}>
          {!selected ? <div className="roots-wheel-invitation"><span aria-hidden="true" className="font-display text-5xl text-brand-600">❧</span><h3 className="mt-4 font-display text-2xl font-semibold text-brand-900">From a moment of curiosity<br />to a small act of goodness.</h3><ol className="mt-5 space-y-4 text-sm text-slate-700"><li><strong>1 · Notice</strong><br />Read the Name, meaning and reference.</li><li><strong>2 · Reflect</strong><br />Let one thoughtful question stay with you.</li><li><strong>3 · Act</strong><br />Try one realistic action, then reflect on what changed.</li></ol></div> : <div className={spinning ? 'opacity-50' : ''}>
            <h3 ref={result} tabIndex={-1} className="roots-wheel-result-heading font-display"><span lang="ar" dir="rtl" className="block font-arabic text-4xl leading-loose">{selected.arabic}</span><span className="block text-xl font-semibold">{selected.transliteration}</span></h3>
            <p className="mt-2 text-brand-800">{selected.meaning}</p><p lang="ar" dir="rtl" className="mt-1 font-arabic text-lg text-brand-800">{selected.meaningArabic}</p>
            <div className="mt-3 flex flex-wrap gap-3">{nameReferences(selected.ayah).map(ref => <a key={ref} className="text-sm font-semibold text-brand-800 underline" href={`https://quran.com/${ref.replace(':', '/')}`} target="_blank" rel="noopener noreferrer">Read {ref} ↗</a>)}</div>
            <div className="roots-wheel-tip roots-wheel-notice"><h4>Notice · آثار الاسم في الخلق</h4><p>{selected.manifestation}</p></div>
            <div className="roots-wheel-tip roots-wheel-reflect"><h4>Today’s reflection · التفكّر</h4><p>{selected.tafakkur}</p></div>
            <div className="roots-wheel-tip roots-wheel-action"><h4>One action for today · عمل اليوم</h4><p>{selected.akhlaq}</p><label className="mt-4 flex items-start gap-3 text-sm"><input type="checkbox" checked={tried} disabled={spinning} onChange={e => setTried(e.target.checked)} className="mt-1" />I tried this action today.</label>{tried && <p className="mt-3 text-sm font-semibold">What changed for someone else? What could you improve next time?</p>}</div>
            <div className="mt-4 flex flex-wrap gap-3"><button type="button" className="btn-secondary text-sm" disabled={spinning} onClick={copyPlan}>Copy today’s plan</button><button type="button" className="btn-secondary text-sm" disabled={spinning} onClick={() => onExplore(selected.transliteration)}>Explore the full learning card ↓</button></div><p role="status" className="mt-2 text-xs text-slate-600">{copyStatus}</p>
          </div>}
        </div>
      </div>
      <p className="roots-wheel-caption">The wheel selects a card randomly for study. It does not assign a personal Name, predict events, or convey a message from Allah. Reflections are teaching prompts; read the verses in context. Your selection and action tick are not saved or submitted.</p>
    </div>
  </section>
}
