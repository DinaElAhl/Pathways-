import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

// The Roots learning progression. Steps 1–4 link to live pages; the last is roadmap.
const steps = [
  { label: 'Alphabet', to: '/free-sample' },
  { label: 'Tajweed Series', to: '/shop' },
  { label: 'RAQP', to: '/pathways-exam' },
  { label: 'ES-C License', to: '/for-schools' },
  { label: 'ES-B/A + MS + HS', note: '🟡 Fall 2026' },
]

function Step({ step }) {
  const base =
    'flex-1 rounded-xl px-4 py-3 text-center text-sm font-semibold ring-1 ring-inset transition'
  if (step.to) {
    return (
      <Link
        to={step.to}
        className={`${base} bg-white text-slate-800 ring-slate-200 hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200`}
      >
        {step.label}
      </Link>
    )
  }
  return (
    <div className={`${base} bg-slate-50 text-slate-500 ring-slate-100`}>
      {step.label}
      {step.note && (
        <span className="mt-0.5 block text-xs font-medium text-slate-400">{step.note}</span>
      )}
    </div>
  )
}

export default function ProgressionStrip() {
  return (
    <section className="container-page pt-8">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Where are you starting?
      </h2>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        {steps.map((step, i) => (
          <div
            key={step.label}
            className="flex flex-col items-stretch gap-2 sm:flex-1 sm:flex-row sm:items-center"
          >
            <Step step={step} />
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="mx-auto rotate-90 text-slate-300 sm:mx-1 sm:rotate-0"
              >
                <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
