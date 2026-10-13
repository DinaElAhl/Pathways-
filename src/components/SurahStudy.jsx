import { fatihaStudy } from '../data/quranEncyclopedia.js'

function Source({ item }) {
  return item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-brand-700 underline underline-offset-4">Source: {item.source} ↗</a>
}

export default function SurahStudy({ factsOnly = false }) {
  if (factsOnly) return <section aria-labelledby="surah-facts" className="mt-8">
    <h3 id="surah-facts" className="text-2xl font-bold">Surah facts · معلومات عن السورة</h3>
    <div className="mt-5 grid gap-4 sm:grid-cols-3">{fatihaStudy.facts.map(item=><div key={item.title} className="rounded-3xl border border-amber-200 bg-amber-50 p-6"><h4 className="text-lg font-bold">{item.title}</h4><p lang="ar" dir="rtl" className="mt-2 text-xl text-brand-700">{item.arabic}</p><p className="mt-3 leading-relaxed">{item.text}</p><Source item={item}/></div>)}</div>
  </section>
  return <div className="mt-10 space-y-8">
    <section aria-labelledby="surah-reflection"><h3 id="surah-reflection" className="text-2xl font-bold">Reflect with Roots · تأمّل مع جذور</h3><p className="mt-2 text-slate-600">Editorial prompts for personal reflection on Al-Fatiha.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">{fatihaStudy.reflections.map((item,i)=><div key={item.title} className={`rounded-3xl p-6 ${['bg-brand-100','bg-amber-100','bg-rose-100'][i]}`}><span className="text-sm font-bold text-brand-700">0{i+1}</span><h4 className="mt-2 text-xl font-bold">{item.title}</h4><p lang="ar" dir="rtl" className="mt-2 text-xl text-brand-700">{item.arabic}</p><p className="mt-4 leading-relaxed">{item.text}</p></div>)}</div>
    </section>
    <section aria-labelledby="surah-application"><h3 id="surah-application" className="text-2xl font-bold">Live it today · تطبيق يومي</h3><p className="mt-2 text-slate-600">Choose one suggested practice. These are learning activities, not prescribed rituals.</p><ol className="mt-5 space-y-3">{fatihaStudy.applications.map((item,i)=><li key={item.title} className="rounded-2xl bg-white border border-brand-200 p-6"><h4 className="text-lg font-bold text-brand-700">{i+1}. {item.title}</h4><p className="mt-3 leading-relaxed">{item.text}</p></li>)}</ol></section>
    <section aria-labelledby="surah-story" className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-6 sm:p-8"><span className="chip">A real report from the Sunnah</span><h3 id="surah-story" className="mt-4 text-2xl font-bold">{fatihaStudy.story.title}</h3><p lang="ar" dir="rtl" className="mt-3 text-xl text-brand-700">{fatihaStudy.story.arabic}</p><p className="mt-4 leading-relaxed">{fatihaStudy.story.text}</p><Source item={fatihaStudy.story}/><p className="mt-5 rounded-2xl bg-white p-5 leading-relaxed">{fatihaStudy.story.takeaway}</p></section>
  </div>
}
