import { iqraLearning } from '../data/iqraLearning.js'

function WindowIcon({ kind }) {
  return <svg viewBox="0 0 80 64" width="80" height="64" fill="none" stroke="#365f3d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'words' ? <><path d="M7 14Q24 7 40 18Q56 7 73 14V54Q55 47 40 58Q24 47 7 54ZM40 18V58" fill="#fffbee"/><path d="M14 25Q25 21 33 27M14 36Q25 32 33 38M47 27Q59 21 66 25M47 38Q59 32 66 36"/></> : kind === 'world' ? <><circle cx="64" cy="13" r="9" fill="#edcd62" stroke="none"/><path d="M40 59V25M40 44Q12 48 13 23Q39 20 40 44ZM40 31Q66 33 69 9Q43 6 40 31Z" fill="#b6d6b8"/><path d="M16 59H64"/></> : <><path d="M40 54C7 34 15 8 31 12Q38 13 40 22Q44 13 51 12C68 8 76 34 40 54Z" fill="#fffbee"/><path d="M22 32H30L35 23L42 42L48 31H59"/></>}
  </svg>
}

export default function IqraLearning() {
  return <section id="iqra" className="container-page py-12 scroll-mt-24" aria-labelledby="iqra-title">
    <div className="max-w-3xl"><span className="roots-story-kicker">Three ways to read His signs</span><h2 id="iqra-title" className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-brand-900">{iqraLearning.title}</h2><p lang="ar" dir="rtl" className="mt-3 font-arabic text-2xl text-brand-800">{iqraLearning.arabic}</p><p className="mt-5 leading-relaxed text-slate-700">{iqraLearning.introduction}</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">{iqraLearning.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-brand-700 underline">{source.title} ↗</a>)}</div></div>
    <div className="mt-8 grid gap-5 md:grid-cols-3">{iqraLearning.windows.map((item, i) => <article key={item.key} data-iqra-window={item.key} className="flex flex-col rounded-3xl p-6" style={{ background: item.colour }}><div className="flex items-center justify-between"><WindowIcon kind={item.key} /><span className="font-display text-2xl text-brand-700">0{i + 1}</span></div><h3 className="mt-5 font-display text-xl font-semibold text-brand-900">{item.title}</h3><p lang="ar" dir="rtl" className="mt-2 font-arabic text-xl text-brand-800">{item.arabic}</p><p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">{item.text}</p><p className="mt-5 rounded-xl bg-white/70 p-4 text-sm font-semibold text-brand-900">{item.prompt}</p><a href={item.url} className="mt-4 text-sm font-semibold text-brand-800 underline" target="_blank" rel="noopener noreferrer">{item.source} ↗</a></article>)}</div>
    <p className="mt-5 max-w-4xl text-xs leading-relaxed text-slate-600">{iqraLearning.distinction}</p>
    <a href="#name-of-day" className="btn-secondary mt-6">Carry this into today’s reflection ↓</a>
  </section>
}
