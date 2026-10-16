import { Link } from 'react-router-dom'
import RootsStoryArt from '../components/RootsStoryArt.jsx'
import { aboutRoots } from '../data/aboutRoots.js'
import '../components/rootsStory.css'

export default function About() {
  return <>
    <section className="roots-story-hero">
      <div className="container-page roots-story-grid">
        <div>
          <span className="roots-story-kicker">Our story · حكاية جذور</span>
          <h1 className="roots-story-title font-display">Small beginnings.<br /><em>Deep roots.</em></h1>
          <p className="roots-story-arabic font-arabic" lang="ar" dir="rtl">نتعلّم خطوةً خطوة، وننمو بالمعنى.</p>
          <p className="roots-story-copy">Roots brings Arabic learning, Qur’an reflection and practical teaching resources into one welcoming place. Each pathway has its own purpose, with room to listen, ask questions and try again.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link to="/free-sample#watch" className="btn-primary">Find your first lesson →</Link><a href="#our-pathways" className="btn-secondary">Get to know Roots ↓</a></div>
        </div>
        <div><RootsStoryArt /><p className="roots-story-note font-display">A little curiosity.<br />Something meaningful to grow.</p></div>
      </div>
    </section>
    <section className="roots-story-section">
      <div className="container-page">
        <div className="max-w-2xl"><span className="roots-story-kicker">Why Roots exists</span><h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-brand-900">Learning should feel like an invitation.</h2><p className="mt-5 text-lg leading-relaxed text-slate-700">A new letter. A question about a verse. A parent wondering where to begin. Roots starts with these small moments and gives them a path forward.</p></div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">{aboutRoots.beliefs.map(([title, body], i) => <article key={title} className="rounded-3xl border border-brand-100 bg-white p-6"><span className="font-display text-3xl text-brand-600">0{i + 1}</span><h3 className="mt-4 font-display text-xl font-semibold text-brand-900">{title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-700">{body}</p></article>)}</div>
      </div>
    </section>
    <section id="our-pathways" className="container-page py-14 scroll-mt-24">
      <span className="roots-story-kicker">Choose your starting point</span><h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-brand-900">Different paths. The same care.</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">{aboutRoots.paths.map(item => <article key={item.title} className="flex flex-col rounded-3xl p-7" style={{ background: item.colour }}><h3 className="font-display text-2xl font-semibold text-brand-900">{item.title}</h3><p className="mt-3 font-arabic text-xl text-brand-800" lang="ar" dir="rtl">{item.arabic}</p><p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">{item.body}</p><Link to={item.link} className="mt-6 font-semibold text-brand-800 underline underline-offset-4">{item.cta} →</Link></article>)}</div>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600">School tracks combine an age band—ES, MS or HS—with a Roots learning level: C, B or A. These are Roots curriculum codes. The separate RQAP Arabic assessment is a pilot with published methodology and intended CEFR mappings; it is not externally accredited.</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/for-schools" className="link">School curriculum information →</Link><Link to="/exam/methodology" className="link">Read the exam methodology →</Link><Link to="/shop" className="link">Explore the reading workbooks →</Link></div>
    </section>
    <section className="container-page pb-16">
      <div className="roots-story-paper grid gap-8 md:grid-cols-2">
        <div><span className="roots-story-kicker">Behind the learning</span><h2 className="mt-4 font-display text-3xl font-semibold text-brand-900">Built from the classroom outward.</h2><p className="mt-5 leading-relaxed text-slate-700">Roots is designed and written by an Arabic Language and Qur’anic Studies educator with K–12 curriculum experience at a US-based online Islamic school. It grew from the wish to create the curriculum she wanted for her own students.</p></div>
        <div className="flex flex-col justify-center rounded-2xl bg-white/75 p-6"><h3 className="font-display text-2xl font-semibold text-brand-900">Bring your questions.</h3><p className="mt-3 text-sm leading-relaxed text-slate-700">Start with a free lesson, explore a class, or tell Roots what your learners need.</p><div className="mt-5 flex flex-wrap gap-3"><Link to="/book" className="btn-primary">Book a class →</Link><Link to="/contact" className="btn-secondary">Talk to Roots →</Link></div><a href="mailto:roots@pathwayslearn.com" className="mt-5 break-all text-sm font-semibold text-brand-800 underline">roots@pathwayslearn.com</a></div>
      </div>
    </section>
  </>
}
