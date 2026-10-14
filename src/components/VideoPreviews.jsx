import { videoPreviews } from '../data/videoPreviews.js'

export default function VideoPreviews() {
  return <section id="watch" className="container-page py-12 scroll-mt-20" aria-labelledby="free-video-title">
    <span className="chip">Watch now · No email needed</span>
    <h2 id="free-video-title" className="mt-3 text-3xl sm:text-4xl font-bold">Your first Roots cartoon lessons</h2>
    <p className="mt-4 max-w-2xl text-slate-700">For children new to Arabic, with English guidance and Arabic sounds. Watch together, pause for a turn, and replay whenever you need.</p>
    <div className="mt-7 grid gap-6 lg:grid-cols-2">{videoPreviews.map((v,i)=><article key={v.id} className={`rounded-3xl overflow-hidden border-2 ${i ? 'bg-amber-50 border-amber-200':'bg-brand-50 border-brand-200'}`}>
      <video className="block w-full aspect-video bg-slate-900" controls playsInline preload="none" poster={import.meta.env.BASE_URL+v.poster} aria-label={v.title} onPlay={e=>document.querySelectorAll('#watch video').forEach(other=>{if(other!==e.currentTarget)other.pause()})}>
        <source src={import.meta.env.BASE_URL+v.video} type="video/mp4" />
        Your browser cannot play this video. <a href={import.meta.env.BASE_URL+v.video}>Open the lesson</a>.
      </video>
      <div className="p-6"><p className="text-sm font-semibold text-brand-700">Full HD · Free preview · {v.duration}</p><h3 className="mt-2 text-2xl font-bold">{v.title}</h3><p className="mt-3 text-slate-700 leading-relaxed">{v.description}</p><a className="mt-4 inline-block link text-sm" href={import.meta.env.BASE_URL+v.video}>Open video in a new page ↗</a></div>
    </article>)}</div>
    <p className="mt-6 text-sm text-slate-600">These two videos are free. Further recorded Level C lessons will be offered separately; course purchase is not available yet.</p>
  </section>
}
