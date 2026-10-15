import { recordedLevels, levelCLessons } from '../data/lessonRoadmap.js'
import { levelThemeStyle } from '../data/levelThemes.js'
import './LevelTheme.css'
import { recordedAgeBands } from '../data/recordedAgeBands.js'

export default function LessonRoadmap() {
  return (
    <section id="lesson-plan" aria-labelledby="lesson-plan-title" className="container-page py-14 sm:py-20 scroll-mt-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="chip">Your learning journey · رحلة التعلّم</span>
        <h2 id="lesson-plan-title" className="mt-4 font-display text-3xl sm:text-4xl font-bold">Little steps. Growing confidence.</h2>
        <p className="mt-4 text-slate-600">An Arabic learning path for non-native children of every background, with pictures, listening and time to try. Start at C, then grow towards B and A. Qur’an and Tajweed study is a separate pathway.</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3" aria-label="Roots age bands and track codes">
        {recordedAgeBands.map(band => <article key={band.code} className="rounded-3xl border border-brand-200 bg-white p-6" data-age-band={band.code}>
          <h3 className="font-display text-xl font-semibold">{band.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{band.code} · Grades {band.grades}</p>
          <div className="mt-4 flex flex-wrap gap-2">{['C', 'B', 'A'].map(level => <span key={level} style={levelThemeStyle(level)} className="roots-level-theme rounded-xl border px-3 py-2 font-display font-semibold">{band.code}-{level}</span>)}</div>
          <p className="mt-4 text-sm text-slate-700">{band.approach}</p>
          <p className="mt-3 text-xs font-semibold text-brand-700">{band.status}</p>
        </article>)}
      </div>
      <p className="mt-4 text-center text-sm text-slate-600">ES, MS and HS identify the school age band; C, B and A identify the Roots learning level. Older beginners can start at MS-C or HS-C. These are Roots track codes, not CEFR ratings. Grade ranges are a guide; placement depends on the learner.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {recordedLevels.map(item => (
          <article key={item.level} data-roadmap-level={item.level} style={levelThemeStyle(item.level)} className="roots-level-theme rounded-3xl border-2 p-6">
            <span className="roots-level-badge font-display" aria-label={`Level ${item.level}`}>{item.level}</span>
            <p className="mt-3 font-display text-lg font-semibold">ES-{item.level} · Elementary</p>
            <p className="mt-4 text-xs font-semibold">{item.status}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">{item.title}</h3>
            <p lang="ar" dir="rtl" className="mt-2 text-lg">{item.arabic}</p>
            <p className="mt-3 text-sm leading-relaxed">{item.description}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">{item.goals.map(goal => <li key={goal}>{goal}</li>)}</ul>
          </article>
        ))}
      </div>
      <details className="mt-7 rounded-3xl border border-brand-200 bg-brand-50 p-5 sm:p-7" open>
        <summary className="cursor-pointer font-display text-xl font-semibold">Explore the ES-C series plan</summary>
        <p className="mt-3 text-sm text-slate-600">Letter families share visual features; they do not necessarily share an articulation point. Planned topics may span more than one short episode, with practice breaks.</p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {levelCLessons.map((lesson, index) => (
            <li key={lesson.title} className="flex gap-3 rounded-2xl bg-white p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 font-bold" aria-hidden="true">{index + 1}</span>
              <div className="min-w-0">
                <h4 className="font-display text-lg font-semibold">{lesson.title}</h4>
                <p className="mt-1 text-sm text-slate-600">{lesson.example}</p>
                {lesson.available ? <a href="#watch" className="mt-2 inline-block text-sm font-semibold text-brand-700 underline">Free now · Watch ↑</a> : <p className="mt-2 text-xs font-semibold text-slate-600">{lesson.status}</p>}
              </div>
            </li>
          ))}
        </ol>
      </details>
      <p className="mx-auto mt-5 max-w-3xl text-center text-sm text-slate-600">This is the recorded-series roadmap, separate from school curriculum licenses. The Level C introduction, Lesson 1 and Level B introduction are public today. Level C Lesson 2 is a private draft; further videos and purchase details are not yet available. Progress depends on practice, not a fixed age or deadline.</p>
    </section>
  )
}
