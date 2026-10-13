import { Link } from 'react-router-dom'
import { socialLinks } from '../data/socialLinks.js'
export default function RootsCommunity() {
  return <section className="container-page pb-16 sm:pb-20" aria-labelledby="roots-community-title">
    <span className="chip">Keep growing with Roots</span><h2 id="roots-community-title" className="mt-3 text-3xl font-display font-extrabold">Explore Roots. Stay connected.</h2>
    <p className="mt-3 max-w-2xl text-slate-700">Discover Roots’ work in Qur’an, Arabic and meaningful learning—and connect with Roots beyond the classroom.</p>
    <div className="mt-7 grid gap-5 md:grid-cols-3"><article className="rounded-3xl bg-amber-100 p-7"><h3 className="text-xl font-display font-extrabold text-brand-900">Explore Roots resources</h3><p className="mt-3 text-slate-700">Start with a free lesson or explore the $15 Tajweed Reading Series.</p><div className="mt-5 flex flex-wrap gap-4"><Link to="/shop" className="font-bold underline text-brand-900">Explore the series →</Link><Link to="/free-sample" className="font-bold underline text-brand-900">Try a free lesson →</Link></div></article>
    {socialLinks.map(s => <article key={s.name} className={s.color + ' rounded-3xl p-7'}><h3 className="text-xl font-display font-extrabold text-brand-900">{s.name}</h3><p className="mt-2 font-bold text-brand-800">{s.handle}</p><p className="mt-3 text-slate-700">{s.description}</p><a href={s.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block font-bold underline text-brand-900">{s.cta}<span className="sr-only"> (opens in a new tab)</span></a></article>)}</div>
  </section>
}
