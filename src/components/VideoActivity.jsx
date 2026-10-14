import { useState } from 'react'
import { videoActivities } from '../data/videoActivities.js'

export default function VideoActivity({ lessonId }) {
  const activity = videoActivities[lessonId]
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  if (!activity) return null
  const finished = index === activity.questions.length
  const question = activity.questions[index]
  const answered = selected !== null
  const reset = () => { setStarted(true); setIndex(0); setSelected(null); setScore(0) }
  return <section aria-label={`Activity: ${activity.title}`} data-lesson-activity={lessonId} className="m-4 mt-0 rounded-2xl border-2 border-white bg-white/80 p-5 text-slate-800">
    <p className="text-xs font-semibold text-brand-700">Your turn · دورك الآن</p>
    <h4 className="mt-2 font-display text-2xl font-semibold">{activity.title}</h4>
    <p className="mt-2 text-sm text-slate-600">{activity.description}</p>
    {!started ? <button type="button" onClick={reset} className="btn-primary mt-4">Play the activity →</button> : finished ? <div role="status" className="mt-4 rounded-xl bg-amber-100 p-4">
      <h5 className="font-display text-xl font-semibold">You practised every question! 🌱</h5>
      <p className="mt-2">{score} of {activity.questions.length} correct on this round.</p>
      <p className="mt-2 text-sm">{score === activity.questions.length ? 'Great noticing! Try the listening practice below.' : 'Keep growing. Replay the examples and try another round.'}</p>
      <p className="mt-3 text-sm">{activity.practice}</p>
      <button type="button" className="btn-secondary mt-4" onClick={reset}>Try again ↻</button>
    </div> : <div className="mt-4">
      <p className="text-xs text-slate-600">Question {index + 1} of {activity.questions.length}</p>
      <h5 className="mt-2 text-lg font-semibold" tabIndex={-1} id={`question-${lessonId}`}>{question.prompt}</h5>
      <div className="mt-3 grid gap-2" role="group" aria-labelledby={`question-${lessonId}`}>
        {question.choices.map((choice, i) => <button key={`${index}-${i}`} type="button" disabled={answered} onClick={() => { setSelected(i); if (i === question.answer) setScore(value => value + 1) }} className={`min-h-14 rounded-xl border-2 p-3 text-left font-semibold disabled:cursor-default ${answered && i === question.answer ? 'border-brand-500 bg-brand-100' : answered && i === selected ? 'border-rose-400 bg-rose-100' : 'border-sky-200 bg-sky-50 hover:bg-sky-100'} ${lessonId === 'lesson-1' ? 'text-center text-4xl' : 'text-base'}`} lang={lessonId === 'lesson-1' ? 'ar' : 'en'}>{choice}</button>)}
      </div>
      {answered && <div role="status" aria-live="polite" className="mt-3 rounded-xl bg-amber-100 p-4">
        <p className="font-semibold">{selected === question.answer ? 'Yes! Well spotted.' : 'Let’s learn it together.'}</p>
        <p className="mt-1 text-sm">{question.explanation}</p>
        <button type="button" className="btn-primary mt-3" onClick={() => { setIndex(value => value + 1); setSelected(null); requestAnimationFrame(() => document.getElementById(`question-${lessonId}`)?.focus()) }}>{index + 1 === activity.questions.length ? 'See my progress →' : 'Next question →'}</button>
      </div>}
    </div>}
    <p className="mt-4 text-xs text-slate-500">Practice only · No certificate or recording · Results stay on this page and reset when you leave.</p>
  </section>
}
