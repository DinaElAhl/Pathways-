import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { namesIntro, quranicNames } from '../data/quranicNames.js'

function NameCard({ n, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            <div className="text-xl font-bold text-brand-700">{n.transliteration}</div>
            <div className="text-2xl font-arabic text-slate-900">{n.arabic}</div>
          </div>
          <div className="text-sm text-slate-600 mt-0.5">{n.meaning}</div>
        </div>
        <div className="text-xs text-slate-500 flex-none">{n.ayah}</div>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3">
          <div>
            <div className="text-xs uppercase tracking-wide font-semibold text-emerald-700">Manifestation in the universe</div>
            <div className="text-sm text-slate-800 mt-1 leading-relaxed">{n.manifestation}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide font-semibold text-amber-700">Tafakkur — what to ponder</div>
            <div className="text-sm text-slate-800 mt-1 leading-relaxed">{n.tafakkur}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide font-semibold text-brand-700">Akhlāq — how it shapes you</div>
            <div className="text-sm text-slate-800 mt-1 leading-relaxed">{n.akhlaq}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function RootsNames() {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return quranicNames
    return quranicNames.filter((n) =>
      [n.transliteration, n.arabic, n.meaning, n.manifestation, n.tafakkur, n.akhlaq]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(s))
    )
  }, [q])

  return (
    <>
      <section className="bg-gradient-to-b from-amber-50/70 to-white">
        <div className="container-page py-12 md:py-16">
          <div className="text-xs uppercase tracking-wide text-amber-700 font-semibold">{namesIntro.eyebrow}</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-slate-900">{namesIntro.title}</h1>
          <p className="mt-2 text-lg text-amber-700">{namesIntro.tagline}</p>
          <p className="mt-5 max-w-3xl text-slate-700 leading-relaxed">{namesIntro.intro}</p>
          <p className="mt-3 max-w-3xl text-slate-700 leading-relaxed italic">{namesIntro.call}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/roots" className="btn-ghost">← Back to Roots</Link>
            <Link to="/tools/e2-teaching" className="btn-primary">Use in E² Teaching Tool</Link>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <h2 className="text-xl font-bold text-slate-900">How to use this list</h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            Every science is a window onto the Names of Allah. When you study a discipline, do not
            stop at the mechanism — ask which Name of Allah this phenomenon points to. Real success
            in this life is to know Him through what He created, and real purpose is to let that
            knowledge shape your akhlāq, your gratitude, and your obedience.
          </p>
          <ul className="mt-4 grid md:grid-cols-3 gap-3 text-sm text-slate-700">
            <li className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
              <div className="font-semibold text-emerald-800">1. Manifestation</div>
              <div>Where do you see this Name in creation, in your body, in history?</div>
            </li>
            <li className="rounded-xl border border-amber-100 bg-amber-50/50 p-3">
              <div className="font-semibold text-amber-800">2. Tafakkur</div>
              <div>Ponder until you feel awe. Knowledge without reflection is incomplete.</div>
            </li>
            <li className="rounded-xl border border-brand-100 bg-brand-50/50 p-3">
              <div className="font-semibold text-brand-800">3. Akhlāq</div>
              <div>Let the Name reshape your character — that is the purpose of knowing Him.</div>
            </li>
          </ul>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">The {quranicNames.length} Qur'anic Names</h2>
            <p className="text-sm text-slate-500">Only Names mentioned in the Qur'an. Click any to expand.</p>
          </div>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, meaning, manifestation…"
            className="w-full md:w-80 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="mt-5 grid md:grid-cols-2 gap-3">
          {filtered.map((n) => (
            <NameCard key={n.transliteration} n={n} />
          ))}
          {filtered.length === 0 && (
            <div className="md:col-span-2 text-center text-slate-500 py-10">No Names match "{q}".</div>
          )}
        </div>
      </section>
    </>
  )
}
