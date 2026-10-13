import { Link } from 'react-router-dom'
import { encyclopedia } from '../data/quranEncyclopedia.js'

export default function EncyclopediaCallout() {
  return <section className="container-page py-10">
    <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-7 sm:p-10 flex flex-wrap items-center justify-between gap-6">
      <div className="max-w-2xl">
        <span className="chip">A Roots reading companion · Free sample</span>
        <h2 className="mt-4 text-3xl font-bold text-brand-700">{encyclopedia.title}</h2>
        <p lang="ar" dir="rtl" className="mt-2 text-2xl text-brand-700 text-left">{encyclopedia.arabicTitle}</p>
        <p className="mt-4 text-slate-700">Explore Al-Fatiha with Arabic verses, English meanings, surah facts, the three Roots reflections, daily applications and a sourced story from the Sunnah. The full EPUB covers all 114 surahs.</p>
      </div>
      <Link to="/roots/quran-encyclopedia" className="btn-primary">Read the free sample →</Link>
    </div>
  </section>
}
