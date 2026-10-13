import { useState } from 'react'

export function nameReferences(ayah) {
  const refs = []
  for (const match of ayah.matchAll(/(\d+):(\d+)(?:,\s*(\d+))?/g)) {
    refs.push(`${match[1]}:${match[2]}`)
    if (match[3]) refs.push(`${match[1]}:${match[3]}`)
  }
  return [...new Set(refs)]
}

export default function NameStudyCard({ n, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const [copyStatus, setCopyStatus] = useState('')
  async function copyLesson() {
    const text = `${n.transliteration} — ${n.arabic}\n${n.meaning}\n${n.meaningArabic}\nReferences: ${n.ayah}\n\n1. Manifestation / آثار الاسم في الخلق\n${n.manifestation}\n\n2. Tafakkur / التفكّر\n${n.tafakkur}\n\n3. Akhlāq / الأخلاق\n${n.akhlaq}\n\nTeaching reflection, not a verse translation. Read the references in context.`
    try { await navigator.clipboard.writeText(text); setCopyStatus('Lesson copied — ready to paste into your planner or LMS.') }
    catch { setCopyStatus('Clipboard unavailable. Select and copy the card text instead.') }
  }
  return <article className="rounded-2xl border border-brand-100 bg-white shadow-sm">
    <button type="button" onClick={() => setOpen(v => !v)} aria-expanded={open} className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left">
      <span className="min-w-0">
        <span className="flex flex-wrap items-baseline gap-3">
          <span className="text-xl font-bold text-brand-700">{n.transliteration}</span>
          <span className="text-2xl font-arabic text-slate-900" lang="ar" dir="rtl">{n.arabic}</span>
        </span>
        <span className="block text-sm text-slate-700 mt-1">{n.meaning}</span>
        <span className="block font-arabic text-sm text-slate-600 mt-1" lang="ar" dir="rtl">{n.meaningArabic}</span>
      </span>
      <span aria-hidden="true" className="text-lg text-brand-700">{open ? '−' : '+'}</span>
    </button>
    {open && <div className="px-4 pb-5 space-y-5 border-t border-brand-100 pt-4">
      <div>
        <h3 className="text-sm font-semibold text-brand-800">Begin with the Qur’an · ابدأ بالقرآن</h3>
        <div className="flex flex-wrap gap-2 mt-2">{nameReferences(n.ayah).map(ref => <a key={ref} href={`https://quran.com/${ref.replace(':','/')}`} target="_blank" rel="noopener noreferrer" className="link text-sm">Read {ref} ↗</a>)}</div>
        <p className="text-xs text-slate-500 mt-2">Read the surrounding verses and consult tafsir. The prompts below are teaching reflections.</p>
      </div>
      {[
        ['1. Manifestation', 'آثار الاسم في الخلق', n.manifestation],
        ['2. Tafakkur', 'التفكّر', n.tafakkur],
        ['3. Akhlāq — practise it', 'الأخلاق — طبّق ما تعلّمت', n.akhlaq],
      ].map(([title, arabic, body]) => <div key={title}>
        <h3 className="text-sm font-semibold text-brand-800">{title} <span lang="ar" dir="rtl" className="font-arabic">· {arabic}</span></h3>
        <p className="text-sm text-slate-800 mt-2 leading-relaxed">{body}</p>
      </div>)}
      <button type="button" onClick={copyLesson} className="btn-secondary text-sm">Copy this mini-lesson</button>
      <p role="status" className="text-xs text-slate-600">{copyStatus}</p>
    </div>}
  </article>
}
