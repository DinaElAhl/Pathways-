import { useState } from 'react'
import { rootsPodcast } from '../data/podcasts.js'
import { socialLinks } from '../data/socialLinks.js'

export default function RootsPodcast() {
  const [notice,setNotice] = useState('')
  const telegram = socialLinks.find(s=>s.name==='Telegram')
  async function copyInvitation() {
    try {
      await navigator.clipboard.writeText(`Learning Arabic or exploring the Qur’an? Discover Roots games, reading samples and reflections, and join the Arabic Roots community. Beginners are welcome. Website: https://www.pathwayslearn.com/ — Telegram: ${telegram.url}`)
      setNotice('English invitation copied. Share it with someone who would find it useful.')
    } catch { setNotice(`Join Arabic Roots: ${telegram.url}`) }
  }
  return <section className="container-page py-12" aria-labelledby="roots-podcast-title">
    <div className="grid gap-5 md:grid-cols-2">
      <div className="rounded-3xl bg-amber-100 border-2 border-amber-200 p-6 sm:p-8">
        <span aria-hidden="true" className="text-4xl">🎧</span><p className="mt-3 text-sm font-bold text-brand-700">Listen & reflect · استمع وتأمّل</p>
        <h2 id="roots-podcast-title" className="mt-3 text-3xl font-bold">{rootsPodcast.title} podcast</h2>
        <p className="mt-4 leading-relaxed text-slate-700">{rootsPodcast.introduction}</p>
        <div className="mt-5 rounded-2xl bg-white p-5"><p className="text-xs font-semibold text-brand-700">Featured episode · {rootsPodcast.episode.language} · {rootsPodcast.episode.duration}</p><h3 className="mt-3 text-xl font-bold">{rootsPodcast.episode.title}</h3><p lang="ar" dir="rtl" className="mt-3 text-xl">{rootsPodcast.episode.arabic}</p><p className="mt-3 text-sm leading-relaxed">{rootsPodcast.episode.summary}</p></div>
        <div className="mt-5 flex flex-wrap gap-3">{rootsPodcast.platforms.map(p=><a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">Listen on {p.name} ↗</a>)}</div>
      </div>
      <div className="rounded-3xl bg-sky-100 border-2 border-sky-200 p-6 sm:p-8">
        <span aria-hidden="true" className="text-4xl">🌱</span><p className="mt-3 text-sm font-bold text-brand-700">Learning Arabic? Start here.</p>
        <h2 className="mt-3 text-3xl font-bold">Grow with Arabic Roots</h2>
        <p className="mt-4 leading-relaxed text-slate-700">New to Arabic or looking for help understanding the Qur’an? Explore Roots at your own pace and connect through our Telegram channel. Beginners are welcome.</p>
        <p className="mt-4 text-sm text-slate-700">The featured podcast is in Arabic. Start with the English learning prompts on this website if you need support.</p>
        <div className="mt-6 flex flex-wrap gap-3"><a href={telegram.url} target="_blank" rel="noopener noreferrer" className="btn-primary">Join Arabic Roots on Telegram ↗</a><button type="button" onClick={copyInvitation} className="btn-secondary">Copy an English invitation</button></div>
        <p role="status" className="mt-4 text-sm text-brand-800">{notice}</p>
      </div>
    </div>
  </section>
}
