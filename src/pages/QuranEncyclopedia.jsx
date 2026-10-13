import { useState } from 'react'
import { Link } from 'react-router-dom'
import { encyclopedia, previewVerses } from '../data/quranEncyclopedia.js'

export default function QuranEncyclopedia() {
  const [showTransliteration, setShowTransliteration] = useState(true)
  const [showTranslation, setShowTranslation] = useState(true)
  return <>
    <section className="bg-gradient-to-b from-brand-100 to-amber-50">
      <div className="container-page py-12 sm:py-16">
        <Link to="/roots" className="text-brand-700 font-semibold">← Roots</Link>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-brand-700">Read · Understand · Reflect</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-brand-800">{encyclopedia.title}</h1>
        <p lang="ar" dir="rtl" className="mt-3 text-3xl text-brand-700 text-left">{encyclopedia.arabicTitle}</p>
        <p className="mt-5 max-w-2xl text-lg text-slate-700">Begin with Al-Fatiha. Read each verse slowly, explore its meaning, and carry one reflection into your day.</p>
        <div className="mt-6 flex flex-wrap gap-3"><a href="#sample" className="btn-primary">Explore the free sample ↓</a><a href="#full-book" className="btn-secondary">About the full book</a></div>
      </div>
    </section>
    <section id="sample" className="container-page py-12 scroll-mt-24">
      <div className="rounded-3xl bg-amber-100 p-6 sm:p-8">
        <span className="chip">Sample · Surah 1 · 7 verses</span>
        <h2 className="mt-3 text-3xl font-bold">Al-Fatiha — The Opening</h2>
        <p lang="ar" dir="rtl" className="mt-2 text-3xl text-brand-700 text-left">الفاتحة</p>
        <p className="mt-4 text-slate-700">An excerpt from the supplied book. Choose the reading aids that help you.</p>
        <div className="mt-5 flex flex-wrap gap-5">
          <label className="flex gap-2 items-center"><input type="checkbox" checked={showTransliteration} onChange={e=>setShowTransliteration(e.target.checked)} />Show transliteration</label>
          <label className="flex gap-2 items-center"><input type="checkbox" checked={showTranslation} onChange={e=>setShowTranslation(e.target.checked)} />Show English meaning</label>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {previewVerses.map(v=><article key={v.number} className="rounded-3xl border-2 border-brand-100 bg-white p-5 sm:p-8 shadow-sm">
          <p className="text-sm font-semibold text-brand-700">Al-Fatiha · Verse {v.number}</p>
          <p lang="ar" dir="rtl" className="mt-5 text-3xl sm:text-4xl leading-loose text-brand-800">{v.arabic}</p>
          {showTransliteration && <p className="mt-4 italic text-slate-600 break-words">{v.transliteration}</p>}
          {showTranslation && <p className="mt-3 text-lg leading-relaxed text-slate-800">{v.translation}</p>}
        </article>)}
      </div>
      <aside className="mt-6 rounded-3xl bg-rose-50 border-2 border-rose-200 p-6 sm:p-8"><h3 className="text-xl font-bold">Pause for reflection · تدبّر</h3><p className="mt-3 text-lg">{encyclopedia.reflection}</p></aside>
      <p className="mt-6 text-sm leading-relaxed text-slate-600">Source: The Quran Encyclopedia, supplied by its author. Arabic text is credited in the book to Tanzil; English translation to Abdullah Yusuf Ali. Transliteration is a reading aid. Editorial reflections are study aids, not tafsir or a substitute for qualified teachers.</p>
    </section>
    <section id="full-book" className="container-page pb-16 scroll-mt-24">
      <div className="rounded-3xl bg-brand-100 p-7 sm:p-10">
        <h2 className="text-3xl font-bold text-brand-800">Continue with the full encyclopedia</h2>
        <p className="mt-4 text-slate-700 max-w-2xl">The full EPUB includes all 114 surahs with Arabic text, transliteration, English translation, overviews, vocabulary, life applications and reflection questions. Read it in an EPUB-compatible reading app.</p>
        {encyclopedia.checkoutUrl ? <a href={encyclopedia.checkoutUrl} className="btn-primary mt-6" target="_blank" rel="noopener noreferrer">Buy the full book{encyclopedia.price ? ` — ${encyclopedia.price}` : ''} →</a> : <p role="status" className="mt-6 inline-block rounded-full bg-white px-5 py-3 font-semibold text-brand-800">Purchase coming soon</p>}
        <p className="mt-3 text-sm text-slate-600">The free sample is available now. The full book will be a paid digital edition.</p>
      </div>
    </section>
  </>
}
