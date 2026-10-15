import { useState } from 'react'
import { quranicNames } from '../data/quranicNames.js'

const steps = [
  { title: 'Notice', method: 'Manifestation · آثار الاسم في الخلق', icon: '◉', field: 'manifestation', question: 'What do you notice? Describe a real example carefully.', arabic: 'ماذا تلاحظ؟', colour: 'bg-amber-100' },
  { title: 'Wonder', method: 'Tafakkur · التفكّر', icon: '?', field: 'tafakkur', question: 'What question does this raise for you? Discuss it with someone.', arabic: 'بماذا تتفكّر؟', colour: 'bg-brand-100' },
  { title: 'Act', method: 'Akhlāq · الأخلاق', icon: '❧', field: 'akhlaq', question: 'Choose one realistic action. Who could benefit, and when will you try it?', arabic: 'كيف تعمل بما تعلّمت؟', colour: 'bg-rose-100' },
]

export default function NameLearningJourney({ name }) {
  const [step, setStep] = useState(0)
  const [notes, setNotes] = useState(['', '', ''])
  const [practised, setPractised] = useState(false)
  const [choice, setChoice] = useState(null)
  const current = steps[step]
  const others = [...new Set(quranicNames.filter(n => n.meaning !== name.meaning).map(n => n.meaning))].slice(0, 2)
  const position = [...name.transliteration].reduce((sum, c) => sum + c.codePointAt(0), 0) % 3
  const choices = [...others]; choices.splice(position, 0, name.meaning)
  return <div className="space-y-4" data-name-journey={name.transliteration}>
    <div className="rounded-2xl border border-brand-200 bg-white p-4">
      <p className="text-xs font-semibold tracking-wide text-brand-700">A LITTLE LEARNING JOURNEY · رحلة تعلّم</p>
      <div className="mt-3 grid grid-cols-3 gap-2" aria-label="Choose a Roots learning step">{steps.map((item, i) => <button key={item.title} type="button" aria-pressed={step === i} onClick={() => setStep(i)} className={`min-h-20 rounded-xl border-2 p-2 text-brand-900 ${step === i ? 'border-brand-600 '+item.colour : 'border-transparent bg-slate-50 hover:bg-brand-50'}`}><span aria-hidden="true" className="block font-display text-2xl">{item.icon}</span><span className="text-sm font-semibold">{i + 1}. {item.title}</span></button>)}</div>
      <div className={`mt-4 rounded-2xl p-5 ${current.colour}`} aria-live="polite">
        <h3 className="font-display text-xl font-semibold text-brand-900">{current.method}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-800">{name[current.field]}</p>
        <p className="mt-4 text-sm font-semibold text-brand-900">{current.question}</p>
        <p lang="ar" dir="rtl" className="mt-1 font-arabic text-lg text-brand-900">{current.arabic}</p>
        <label className="mt-3 block text-sm text-slate-700">{step === 2 ? 'My small action (optional)' : 'My thought or drawing idea (optional)'}<textarea value={notes[step]} onChange={e => setNotes(previous => previous.map((note, i) => i === step ? e.target.value : note))} rows={3} maxLength={1200} className="mt-2 block w-full rounded-xl border border-brand-200 bg-white p-3 text-base text-slate-900" placeholder="Write, talk together, or draw on paper…" /></label>
        {step < 2 ? <button type="button" className="btn-secondary mt-4 text-sm" onClick={() => setStep(value => value + 1)}>Next: {steps[step + 1].title} →</button> : <><button type="button" aria-pressed={practised} className="btn-secondary mt-4 text-sm" onClick={() => setPractised(value => !value)}>{practised ? 'Practice reflected on ✓' : 'I tried my action — reflect on it'}</button>{practised && <p role="status" className="mt-3 text-sm">What changed? What would you do differently next time? You can discuss this privately.</p>}</>}
      </div>
      <p className="mt-3 text-xs text-slate-500">Optional notes stay in this open card only and disappear when it closes or you leave. Nothing is submitted. These are learning prompts, not tafsir or a measure of faith.</p>
    </div>
    <details className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <summary className="cursor-pointer font-display text-lg font-semibold text-brand-900">Try a meaning match · تذكّر المعنى</summary>
      <p className="mt-3 text-sm text-slate-700">Which short meaning matches {name.transliteration}? These are learning glosses, not complete definitions.</p>
      <div className="mt-3 grid gap-2">{choices.map(text => <button key={text} type="button" disabled={choice !== null} onClick={() => setChoice(text)} className={`min-h-12 rounded-xl border-2 bg-white p-3 text-left text-sm ${choice !== null && text === name.meaning ? 'border-brand-500' : choice === text ? 'border-rose-400' : 'border-amber-200'}`}>{text}</button>)}</div>
      {choice !== null && <div role="status" className="mt-3 text-sm text-slate-800"><p>{choice === name.meaning ? 'Well remembered!' : 'Let’s revisit it together.'} {name.transliteration}: {name.meaning}.</p><p className="mt-1">Return to the Qur’anic references for context.</p><button type="button" className="mt-3 font-semibold text-brand-800 underline" onClick={() => setChoice(null)}>Try again</button></div>}
    </details>
  </div>
}
