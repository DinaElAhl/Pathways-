import { useState } from 'react'
import { Link } from 'react-router-dom'
import './worksheetShopPreview.css'
import { worksheetOffers } from '../data/worksheetOffers.js'

const ages = [{ id: 'ES', label: 'Elementary' }, { id: 'MS', label: 'Middle school' }, { id: 'HS', label: 'High school' }]
const levels = {
  C: { title: 'Letters to first words', copy: 'Explore letter families, shapes, short vowels and first whole words.', colour: 'bg-[#fff0b3]', arabic: 'حروف وكلمات', example: 'Letter-family detectives' },
  B: { title: 'Build your reading', copy: 'Practise long vowels, reading patterns, useful words and short phrases.', colour: 'bg-[#dcebd7]', arabic: 'نقرأ ونتدرّب', example: 'Short or long? Notice the vowel' },
  A: { title: 'Read for meaning', copy: 'Connect sentences, find evidence and understand everyday Arabic.', colour: 'bg-[#fbe1d7]', arabic: 'نقرأ ونفهم', example: 'From words to a meaningful sentence' },
}

export default function WorksheetShopPreview() {
  const [age, setAge] = useState('ES')
  const [level, setLevel] = useState('C')
  const selected = worksheetOffers.find(offer => offer.age === age && offer.level === level)
  const detail = levels[level]
  const base = import.meta.env.BASE_URL
  return <main className={`container-page worksheet-roots-shop category-${level.toLowerCase()}`} data-worksheet-shop-preview>
    <header className="worksheet-roots-hero">
      <div className="worksheet-roots-brand"><span className="worksheet-roots-logo"><img src={base + 'brand/roots-sprout.svg'} alt="" /></span><span>Roots <span aria-hidden="true">|</span> <bdi lang="ar" dir="rtl">جذور</bdi></span></div>
      <p className="worksheet-roots-kicker">SMALL STEPS. STRONG ROOTS.</p>
      <h1>Strong roots.<br /><span>One page at a time.</span></h1>
      <p className="worksheet-roots-lead">Arabic worksheets to explore, practise and grow—with a teacher, at home, at your own pace.</p>
      <div className="worksheet-roots-note"><strong>A peek inside the Roots library</strong><p>Choose an age and level to explore a real sample. These draft packs are being reviewed; full packs and prices are not available yet.</p></div>
      <span className="worksheet-roots-hero-letter" aria-hidden="true">{level}</span>
    </header>
    <section className="mt-9" aria-labelledby="worksheet-age-title"><h2 id="worksheet-age-title" className="font-display text-xl font-semibold text-brand-900">Who are you teaching?</h2><div className="mt-4 flex flex-wrap gap-3" role="group" aria-label="Learner age group">{ages.map(item => <button type="button" key={item.id} aria-pressed={age === item.id} onClick={() => setAge(item.id)} className={`min-h-12 rounded-full border-2 px-5 py-3 font-semibold text-brand-900 ${age === item.id ? 'border-brand-700 bg-[#fff0b3]' : 'border-brand-200 bg-white'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4`}>{item.label}</button>)}</div><p className="mt-3 text-sm text-slate-600">Age changes the tasks and presentation. C, B and A are Roots learning stages, not CEFR ratings.</p></section>
    <section className="mt-7 grid gap-4 md:grid-cols-3" aria-label="Worksheet levels">{Object.entries(levels).map(([id, item]) => { const offer = worksheetOffers.find(product => product.age === age && product.level === id); return <button type="button" key={id} aria-pressed={level === id} onClick={() => setLevel(id)} className={`worksheet-roots-category category-${id.toLowerCase()} ${level === id ? 'is-selected' : ''}`}><span className="worksheet-roots-level">{age}-{id}</span><span className="worksheet-roots-category-letter" aria-hidden="true">{id}</span><h2 className="mt-3 font-display text-xl font-semibold text-brand-900">{item.title}</h2><p className="mt-3 text-sm leading-relaxed text-slate-700">{item.copy}</p><p className="mt-4 text-sm font-semibold text-brand-800">{offer.worksheets} lesson worksheets · PDF</p><span className="mt-4 inline-block text-sm font-semibold text-brand-900 underline">{level === id ? 'Viewing this level' : 'See a sample →'}</span></button> })}</section>
    <section className="worksheet-roots-selected mt-9 grid gap-7 p-5 sm:p-8 lg:grid-cols-2" aria-label="Selected worksheet pack">
      <div className="worksheet-roots-sheet p-3 sm:p-5"><img key={selected.track} src={base + selected.image} alt={`${selected.track} sample worksheet: ${detail.example}. One full page from the draft pack.`} className="mx-auto h-auto w-full max-w-md" width="707" height="1000" /></div>
      <div aria-live="polite"><span className="text-sm font-semibold text-brand-700">{selected.track} · {ages.find(item => item.id === age).label}</span><h2 className="mt-3 font-display text-3xl font-semibold text-brand-900">{detail.title}</h2><p className="mt-3 font-arabic text-2xl text-brand-800" lang="ar" dir="rtl">{detail.arabic}</p><p className="mt-4 leading-relaxed text-slate-700">{detail.copy} The {selected.pages}-page draft edition includes {selected.worksheets} lesson worksheets plus supporting pages.</p><ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-slate-700"><li>Colour and low-ink A4 editions</li><li>Teacher and homeschool guidance</li><li>Selected cut-out practice cards</li><li>Answer key and next-step prompts</li></ul><p className="mt-4 text-sm text-slate-600">General Arabic for non-native learners. Video lessons and audio are not included in these PDF packs.</p><a href={base + selected.sample} target="_blank" rel="noopener noreferrer" className="worksheet-roots-sample btn-primary mt-6 min-h-12">Open the free sample PDF →</a><p className="mt-3 text-xs leading-relaxed text-slate-600">One sample page only. The image beside it lets you preview the page even if your phone does not display PDFs inline.</p><div className="mt-6 rounded-2xl bg-white p-5"><h3 className="font-display text-lg font-semibold text-brand-900">Full pack · Coming after review</h3><p className="mt-2 text-sm text-slate-700">Pricing and household / classroom license options will be confirmed before launch. No payment is being collected for these packs.</p><button type="button" disabled className="mt-4 min-h-12 rounded-full border border-brand-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600">Purchases not open yet</button></div></div>
    </section>
    <section className="worksheet-roots-footer mt-10 p-6 sm:p-8"><h2 className="font-display text-2xl font-semibold text-brand-900">Planned: a simple route from purchase to practice</h2><ol className="mt-5 grid gap-5 text-sm text-slate-700 sm:grid-cols-3"><li><strong className="block text-brand-900">1 · Choose your pack</strong>Preview the pages and check the age, stage and license.</li><li><strong className="block text-brand-900">2 · Pay when sales open</strong>Review the confirmed price before checkout.</li><li><strong className="block text-brand-900">3 · Open your PDF</strong>The intended delivery is an email with a download link.</li></ol><p className="mt-4 text-xs text-slate-600">This describes the proposed offer. Checkout and delivery for the new worksheet packs are not active.</p></section>
    <p className="mt-8 flex flex-wrap gap-5 text-sm font-semibold"><Link to="/shop" className="min-h-12 underline">View the existing shop →</Link><Link to="/free-sample" className="min-h-12 underline">Try the free lessons →</Link></p>
  </main>
}
