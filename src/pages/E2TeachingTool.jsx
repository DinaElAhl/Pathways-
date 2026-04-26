import { useState } from 'react'
import { Link } from 'react-router-dom'
import { e2ToolMeta, e2Sections } from '../data/e2TeachingHelpers.js'

function PhraseChip({ text }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      })
    }
  }
  return (
    <button
      onClick={copy}
      className={
        'text-left text-sm rounded-xl border px-3 py-2 transition ' +
        (copied
          ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
          : 'border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50 text-slate-700')
      }
      title="Click to copy"
    >
      {copied ? 'Copied ✓' : text}
    </button>
  )
}

function Slot({ label, phrases }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-semibold text-slate-900">{label}</span>
        <span className="text-xs text-slate-500">{phrases.length} phrases {open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 grid gap-2">
          {phrases.map((p) => (
            <PhraseChip key={p} text={p} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function E2TeachingTool() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-10 pb-6 sm:pt-14">
          <Link to="/tools" className="text-sm font-semibold text-brand-600 hover:text-brand-700">← Tools</Link>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{e2ToolMeta.title}</h1>
          <p className="mt-2 text-lg text-brand-700 font-medium">{e2ToolMeta.tagline}</p>
          <p className="mt-4 max-w-3xl text-slate-700 leading-relaxed">{e2ToolMeta.intro}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <a
              href={e2ToolMeta.toolUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-brand-600 text-white px-4 py-2 font-semibold hover:bg-brand-700"
            >
              Open in full screen ↗
            </a>
            <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-3 py-2">
              Tip: open phrases below → click to copy → paste into the matching slot in the tool.
            </span>
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <iframe
            title="E2 Teaching Framework"
            src={e2ToolMeta.toolUrl}
            className="w-full"
            style={{ height: '900px', border: 0 }}
          />
        </div>
      </section>

      <section className="container-page py-8">
        <h2 className="text-2xl font-bold text-slate-900">Helping phrases for every slot</h2>
        <p className="mt-2 text-slate-600 max-w-3xl">
          Click any phrase to copy it. Then paste it into the matching slot in the tool above. Edit freely — these are starters, not scripts.
        </p>
        <div className="mt-6 space-y-8">
          {e2Sections.map((sec) => (
            <div key={sec.name}>
              <h3 className="text-lg font-bold text-slate-900">{sec.name}</h3>
              <div className="mt-3 grid gap-3 lg:grid-cols-2">
                {sec.slots.map((s) => (
                  <Slot key={s.label} label={s.label} phrases={s.phrases} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
