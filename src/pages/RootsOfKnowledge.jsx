import EncyclopediaCallout from '../components/EncyclopediaCallout.jsx'
import NameStudyCard from '../components/NameStudyCard.jsx'
import { Link } from 'react-router-dom'
import { rootsHero, rootDisciplines } from '../data/rootsOfKnowledge.js'
import { namesIntro, quranicNames } from '../data/quranicNames.js'
import RootsMethodCards from '../components/RootsMethodCards.jsx'

export default function RootsOfKnowledge() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-14 pb-10 sm:pt-20">
          <span className="chip">{rootsHero.eyebrow || 'New curriculum'}</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            {rootsHero.title}
          </h1>
          <p className="mt-3 text-xl text-brand-700 font-medium">{rootsHero.tagline}</p>
          <p className="mt-6 max-w-3xl text-slate-700 text-lg leading-relaxed">{rootsHero.intro}</p>
        </div>
      </section>

      <EncyclopediaCallout />
      <section className="container-page py-12">
        <h2 className="text-2xl font-bold text-slate-900">{rootsHero.frameworkLabel || 'The Roots Method'}</h2>
        <p className="mt-2 text-slate-600 max-w-3xl">{rootsHero.frameworkSubtitle || 'Three steps we walk through in every subject.'}</p>
        <RootsMethodCards />
      </section>

      <section className="bg-slate-50">
        <div className="container-page py-12">
          <h2 className="text-2xl font-bold text-slate-900">Guiding principles</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {rootsHero.principles.map((p) => (
              <li key={p} className="rounded-xl bg-white p-4 border border-slate-200 text-slate-700">
                <span className="text-brand-600 font-bold mr-2">•</span>{p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="names" className="bg-gradient-to-b from-amber-50/60 to-white scroll-mt-20">
        <div className="container-page py-14">
          <span className="chip">{namesIntro.eyebrow}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{namesIntro.title}</h2>
          <p className="mt-2 text-lg text-amber-800 font-medium">{namesIntro.tagline}</p>
          <p className="mt-4 max-w-3xl text-slate-700 leading-relaxed">{namesIntro.intro}</p>
          <div className="mt-4 max-w-3xl rounded-xl bg-amber-100/70 border border-amber-200 p-4 text-amber-900 text-sm leading-relaxed">
            {namesIntro.call}
          </div>
          <div className="mt-2 text-sm text-slate-500">{quranicNames.length} learning cards — click any to study. <Link to="/roots/names" className="ml-1 text-brand-700 font-semibold hover:underline">Open the full Names page →</Link></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quranicNames.map((n) => (
              <NameStudyCard key={n.transliteration} n={n} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">The disciplines</h2>
            <p className="mt-2 text-slate-600 max-w-3xl">Each science, re-rooted. Click in to read its framing, six curriculum units, weekly practices, the Names of Allah it reflects, and reading list.</p>
          </div>
          <span className="text-sm text-slate-500">{rootDisciplines.length} disciplines</span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rootDisciplines.map((d) => (
            <Link
              key={d.slug}
              to={'/roots/' + d.slug}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-brand-300 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{d.icon}</span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700">{d.title}</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{d.summary}</p>
              <div className="mt-4 text-sm font-semibold text-brand-600">Read the curriculum →</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
