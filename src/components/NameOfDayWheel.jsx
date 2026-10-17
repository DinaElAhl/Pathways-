import { useEffect, useRef, useState } from 'react'
import { quranicNames } from '../data/quranicNames.js'
import { nameReferences } from './NameStudyCard.jsx'
import './nameOfDayWheel.css'
import SimpleNameMission from './SimpleNameMission.jsx'
import { simpleNameMissions } from '../data/simpleNameMissions.js'

const colours = ['#edcd62', '#b6d6b8', '#f0b3a3', '#fff0b3', '#d8ebcf', '#fbe1d7']
const point = angle => [160 + 138 * Math.cos(angle), 160 + 138 * Math.sin(angle)]
function freshPetals() {
  const pool = [...quranicNames]
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]] }
  return pool.slice(0, 6)
}

export default function NameOfDayWheel({ onExplore }) {
  const [petals, setPetals] = useState(freshPetals)
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [selected, setSelected] = useState(null)
  const [copyStatus, setCopyStatus] = useState('')
  const timer = useRef(null)
  const busy = useRef(false)
  const result = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  function spin() {
    if (busy.current) return
    busy.current = true
    setSpinning(true); setCopyStatus('')
    const random = window.crypto?.getRandomValues ? window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296 : Math.random()
    const index = Math.floor(random * petals.length)
    const angle = 360 - (index + .5) * 360 / petals.length
    setRotation(previous => previous + (360 - previous % 360) + 4 * 360 + angle)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timer.current = setTimeout(() => {
      setSelected(petals[index]); setSpinning(false); busy.current = false
      requestAnimationFrame(() => result.current?.focus({ preventScroll: true }))
    }, reduced ? 150 : 3700)
  }

  async function copyPlan() {
    try {
      await navigator.clipboard.writeText(`Roots · A Name to study today\n${selected.arabic} — ${selected.transliteration}\n${selected.meaning}\nQur’anic references: ${selected.ayah}\n\nNotice: ${simpleNameMissions[selected.transliteration].notice}\nThink: ${simpleNameMissions[selected.transliteration].think}\nToday’s action: ${simpleNameMissions[selected.transliteration].action}\n\nA randomly selected learning prompt, not a personal message or prediction.\nhttps://www.pathwayslearn.com/roots/names#name-of-day`)
      setCopyStatus('Your reflection and action were copied.')
    } catch { setCopyStatus('Copy is unavailable here. You can select the reflection text instead.') }
  }

  return <section id="name-of-day" className="container-page py-12 scroll-mt-24" aria-labelledby="name-wheel-title">
    <div className="roots-wheel-panel">
      <div className="roots-wheel-intro"><span className="roots-story-kicker">Pause · Reflect · Put it into practice</span><h2 id="name-wheel-title" className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-brand-900">A Name to study today</h2><p lang="ar" dir="rtl" className="mt-3 font-arabic text-2xl text-brand-800">اسمٌ نتعلّمه، وأثرٌ نحمله في يومنا.</p><p className="mt-3 text-sm leading-relaxed text-slate-700">Spin, then try three little steps: Notice, Think, Do. One simple question or action at a time. No account needed.</p></div>
      <div className="roots-wheel-grid">
        <div className="roots-wheel-play">
          <p className="roots-wheel-garden-label font-display">The reflection garden</p>
          <div className="roots-wheel-stage">
            <svg className="roots-wheel-leaf-pointer" viewBox="0 0 44 60" aria-hidden="true"><path d="M22 52V19M22 31Q2 31 5 9Q23 8 22 31M22 22Q41 24 39 3Q21 2 22 22" fill="#abd19d" stroke="#365f3d" strokeWidth="3" strokeLinecap="round"/><path d="M15 49L22 58L29 49" fill="#365f3d" /></svg>
            <svg viewBox="0 0 320 320" aria-hidden="true" className={`roots-name-wheel ${spinning ? 'is-spinning' : ''}`} style={{ transform: `rotate(${rotation}deg)` }}>
              <circle cx="160" cy="160" r="153" fill="#fffbee" stroke="#b6d6b8" strokeWidth="2" />
              {Array.from({ length: 24 }, (_, i) => { const a = i * Math.PI / 12; return <circle key={i} cx={160 + 146 * Math.cos(a)} cy={160 + 146 * Math.sin(a)} r="2" fill="#365f3d" /> })}
              {petals.map((name, i) => {
                const a = -Math.PI / 2 + i * 2 * Math.PI / petals.length
                const b = a + 2 * Math.PI / petals.length
                const mid = (a + b) / 2
                const start = point(a); const end = point(b)
                const x = 160 + 96 * Math.cos(mid); const y = 160 + 96 * Math.sin(mid)
                const words = name.transliteration.split(' wa ')
                return <g key={name.transliteration} data-wheel-name={name.transliteration} data-petal-index={i}>
                  <path d={`M160 160L${start[0]} ${start[1]}A138 138 0 0 1 ${end[0]} ${end[1]}Z`} fill={colours[i]} stroke="#fffbee" strokeWidth="3" />
                  <text x={x} y={y - 6} textAnchor="middle" fill="#365f3d" className="roots-petal-arabic" lang="ar" direction="rtl" fontSize={name.arabic.length > 18 ? 10 : 15}>{name.arabic}</text>
                  <text textAnchor="middle" fill="#365f3d" className="roots-petal-english" fontSize={name.transliteration.length > 17 ? 8 : 10}>{words.map((word, line) => <tspan key={line} x={x} y={y + 12 + line * 11}>{word}</tspan>)}</text>
                </g>
              })}
              <circle cx="160" cy="160" r="138" fill="none" stroke="#365f3d" strokeWidth="2" />
            </svg>
            <button type="button" className="roots-wheel-hub roots-wheel-spin" onClick={spin} disabled={spinning} aria-label="Spin the reflection wheel" aria-busy={spinning}><img src={`${import.meta.env.BASE_URL}brand/roots-sprout.svg`} alt="" /><span className="font-display">{spinning ? 'Turning…' : 'Spin ↻'}</span></button>
          </div>
          <p className="roots-wheel-garden-hint">{spinning ? 'A little pause. A moment to reflect.' : 'Tap the sprout. Follow one small thought.'}</p>
          <button type="button" className="btn-secondary mt-4 min-h-12 text-sm" disabled={spinning} onClick={() => { setPetals(freshPetals()); setSelected(null); setRotation(0); setCopyStatus('') }}>Explore six other Names ↻</button>
          <p className="mt-3 text-xs text-slate-600">Six readable petals at a time, drawn from {quranicNames.length} learning cards.</p>
          <ul className="sr-only" aria-label="Names on this wheel">{petals.map(name => <li key={name.transliteration}>{name.transliteration}: {name.meaning}</li>)}</ul>
        </div>
        <div className="roots-wheel-result" aria-live="polite" aria-busy={spinning}>
          {!selected ? <div className="roots-wheel-invitation"><span aria-hidden="true" className="font-display text-5xl text-brand-600">❧</span><h3 className="mt-4 font-display text-2xl font-semibold text-brand-900">Plant a little kindness.<br />Let it grow through your day.</h3><ol className="mt-5 space-y-4 text-sm text-slate-700"><li><strong>1 · Notice</strong><br />Read the Name, meaning and reference.</li><li><strong>2 · Think</strong><br />Let one thoughtful question stay with you.</li><li><strong>3 · Do</strong><br />Try one realistic action, then reflect on what changed.</li></ol></div> : <div className={spinning ? 'opacity-50' : ''}>
            <h3 ref={result} tabIndex={-1} className="roots-wheel-result-heading font-display"><span lang="ar" dir="rtl" className="block font-arabic text-4xl leading-loose">{selected.arabic}</span><span className="block text-xl font-semibold">{selected.transliteration}</span></h3>
            <p className="mt-2 text-brand-800">{selected.meaning}</p><p lang="ar" dir="rtl" className="mt-1 font-arabic text-lg text-brand-800">{selected.meaningArabic}</p>
            <SimpleNameMission key={`${selected.transliteration}-${rotation}`} name={selected} disabled={spinning} />
            <details key={`more-${selected.transliteration}-${rotation}`} className="mt-5 rounded-xl border border-brand-100 bg-white p-4"><summary className="cursor-pointer font-semibold text-brand-800">Learn more · اقرأ المزيد</summary>
              <div className="mt-3 flex flex-wrap gap-3">{nameReferences(selected.ayah).map(ref => <a key={ref} className="text-sm font-semibold text-brand-800 underline" href={`https://quran.com/${ref.replace(':', '/')}`} target="_blank" rel="noopener noreferrer">Read {ref} ↗</a>)}</div>
              <div className="roots-wheel-tip roots-wheel-notice"><h4>Manifestation · آثار الاسم في الخلق</h4><p>{selected.manifestation}</p></div>
              <div className="roots-wheel-tip roots-wheel-reflect"><h4>Tafakkur · التفكّر</h4><p>{selected.tafakkur}</p></div>
              <div className="roots-wheel-tip roots-wheel-action"><h4>Akhlāq · الأخلاق</h4><p>{selected.akhlaq}</p></div>
            </details>
            <div className="mt-4 flex flex-wrap gap-3"><button type="button" className="btn-secondary text-sm" disabled={spinning} onClick={copyPlan}>Copy today’s plan</button><button type="button" className="btn-secondary text-sm" disabled={spinning} onClick={() => onExplore(selected.transliteration)}>Explore the full learning card ↓</button></div><p role="status" className="mt-2 text-xs text-slate-600">{copyStatus}</p>
          </div>}
        </div>
      </div>
      <p className="roots-wheel-caption">The wheel selects a card randomly for study. It does not assign a personal Name, predict events, or convey a message from Allah. Reflections are teaching prompts; read the verses in context. Your selection and action tick are not saved or submitted.</p>
    </div>
  </section>
}
