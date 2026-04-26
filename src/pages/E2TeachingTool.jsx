import { useState } from 'react'
import { Link } from 'react-router-dom'
import { e2ToolMeta, e2Sections } from '../data/e2TeachingHelpers.js'

function SlotDropdown({ label, phrases }) {
  const [value, setValue] = useState('')
  const [copied, setCopied] = useState(false)

  function onChange(e) {
    const v = e.target.value
    setValue(v)
    if (!v) return
    if (navigator.clipboard) {
      navigator.clipboard.writeText(v).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      })
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <label className="font-semibold text-slate-900 text-sm">{label}</label>
        <span className="text-xs text-slate-500">{phrases.length} options</span>
      </div>
      <select
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      >
        <option value="">Choose a phrase…</option>
        {phrases.map((p) => (
          <option key={p} value={p}>{p.length > 90 ? p.slice(0, 87) + '…' : p}</option>
        ))}
      </select>
      {value && (
        <div className="mt-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-700 leading-relaxed border border-slate-200">
          <div className="flex items-start justify-between gap-2">
            <p className="flex-1 whitespace-pre-wrap">{value}</p>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(value).then(() => {
                    setCopied(true)
                    setTimeout(() => setCopied(false), 1500)
                  })
                }
              }}
              className={
                'flex-none rounded-md px-2 py-1 text-xs font-semibold transition ' +
                (copied
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-brand-50 text-brand-700 hover:bg-brand-100')
              }
              title="Copy to clipboard"
            >
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
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
              Tip: pick a phrase from a dropdown → it auto-copies → paste into the matching slot in the tool.
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
          Pick a phrase from the dropdown — it copies automatically. Then paste into the matching field in the tool above. Edit freely; these are starters, not scripts.
        </p>
        <div className="mt-6 space-y-10">
          {e2Sections.map((sec) => (
            <div key={sec.name}>
              <h3 className="text-lg font-bold text-slate-900">{sec.name}</h3>
              <div className="mt-3 grid gap-3 lg:grid-cols-2">
                {sec.slots.map((s) => (
                  <SlotDropdown key={s.label} label={s.label} phrases={s.phrases} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
