import { useState } from 'react'
import { simpleNameMissions } from '../data/simpleNameMissions.js'

const steps = [
  { title: 'Notice', arabic: 'لاحظ', field: 'notice', colour: 'roots-wheel-notice', symbol: '◉' },
  { title: 'Think', arabic: 'فكّر', field: 'think', colour: 'roots-wheel-reflect', symbol: '?' },
  { title: 'Do', arabic: 'اعمل', field: 'action', colour: 'roots-wheel-action', symbol: '❧' },
]

export default function SimpleNameMission({ name, disabled }) {
  const [step, setStep] = useState(0)
  const [tried, setTried] = useState(false)
  const mission = simpleNameMissions[name.transliteration]
  const current = steps[step]
  if (!mission) return null
  return <section className="mt-5" aria-label="Your simple daily mission" data-simple-mission={name.transliteration}>
    <div className="flex gap-2" aria-label="Mission steps">{steps.map((item, i) => <button key={item.field} type="button" disabled={disabled} aria-pressed={step === i} onClick={() => setStep(i)} className={`min-h-12 flex-1 rounded-xl border-2 px-2 py-3 text-sm font-semibold ${step === i ? 'border-brand-600 bg-brand-50' : 'border-brand-100 bg-white'}`}>{i + 1}. {item.title}</button>)}</div>
    <div className={`roots-wheel-tip ${current.colour}`} aria-live="polite">
      <span className="font-display text-4xl text-brand-700" aria-hidden="true">{current.symbol}</span>
      <h4 className="mt-3 !text-lg">{current.title} <span lang="ar" dir="rtl">· {current.arabic}</span></h4>
      <p className="!text-lg !leading-relaxed">{mission[current.field]}</p>
      {step === 2 && <><label className="mt-5 flex min-h-12 items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={tried} disabled={disabled} onChange={e => setTried(e.target.checked)} />I tried it today ✓</label>{tried && <p role="status" className="mt-3">What changed? Talk about it or draw a picture.</p>}</>}
      <div className="mt-5 flex flex-wrap gap-3">{step > 0 && <button type="button" className="btn-secondary text-sm" disabled={disabled} onClick={() => setStep(value => value - 1)}>← Back</button>}{step < 2 && <button type="button" className="btn-primary text-sm" disabled={disabled} onClick={() => setStep(value => value + 1)}>Next: {steps[step + 1].title} →</button>}</div>
    </div>
    <p className="mt-3 text-xs text-slate-600">You can answer aloud or draw. Nothing to type or submit.</p>
  </section>
}
