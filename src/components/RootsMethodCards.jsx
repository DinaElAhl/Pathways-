import { rootsMethodSteps } from '../data/rootsMethod.js'

export default function RootsMethodCards() {
  return <ol className="mt-8 grid gap-5 sm:grid-cols-3">
    {rootsMethodSteps.map((step, index) => <li key={step.key} className={`roots-step roots-step-${step.key} card flex h-full flex-col`}>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">{index + 1}</span>
      <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">{step.title}</h3>
      <p className="mt-1 font-arabic text-xl text-brand-800" dir="rtl" lang="ar">{step.titleArabic}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{step.description}</p>
      <p className="mt-3 font-arabic text-base leading-loose text-slate-700" dir="rtl" lang="ar">{step.descriptionArabic}</p>
    </li>)}
  </ol>
}
