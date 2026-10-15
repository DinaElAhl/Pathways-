import { freeLessonMaterials } from '../data/freeLessonMaterials.js'

export default function FreeLessonMaterials({ lessonId }) {
  if (!freeLessonMaterials[lessonId]) return null
  return <section className="mx-4 mb-5 rounded-2xl bg-white/80 p-5" aria-label="Free lesson materials" data-free-materials={lessonId}>
    <h4 className="font-display text-xl font-semibold">Your free lesson pack</h4>
    <p className="mt-2 text-sm text-slate-600">Open, teach or print. Each resource has a Print / Save as PDF button. No email needed.</p>
    <div className="mt-4 grid gap-3">{[
      ['deck', 'The lesson deck', 'Three bilingual teaching slides to review together.'],
      ['guide', 'The teacher / parent guide', 'Suggested pacing, support and progress checks.'],
      ['worksheet', 'The student worksheet', 'Classwork, home practice and a grown-up answer guide.'],
    ].map(([type, title, description]) => <a key={type} className="rounded-xl border border-brand-200 bg-white p-4 hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600" href={`${import.meta.env.BASE_URL}lesson-packs/${lessonId}-${type}.html`} target="_blank" rel="noopener noreferrer"><span className="font-display font-semibold">{title} ↗</span><span className="mt-1 block text-sm text-slate-600">{description}</span></a>)}</div>
  </section>
}
