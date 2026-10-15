import { useState } from 'react'
import './nameFlashcards.css'
import NameQuranText from './NameQuranText.jsx'
import NameLearningJourney from './NameLearningJourney.jsx'

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
  return <article className="roots-name-flashcard rounded-2xl border border-brand-100 bg-white shadow-sm">
    <button type="button" onClick={() => setOpen(v => !v)} aria-expanded={open} className="roots-name-front w-full px-5 py-6 text-center">
      <span className="min-w-0 block"><span className="roots-name-leaf" aria-hidden="true"><svg viewBox="0 0 64 40" width="64" height="40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M32 36V18M32 25C13 28 8 16 10 7C26 6 33 13 32 25ZM32 19C47 22 57 12 54 3C39 1 31 9 32 19Z" fill="#fffdf5"/><path d="M17 13L31 25M47 9L32 19"/></svg></span>
        <span className="flex flex-col items-center gap-3">
          <span className="text-xl font-bold text-brand-700">{n.transliteration}</span>
          <span className="roots-name-arabic text-4xl font-arabic text-brand-900" lang="ar" dir="rtl">{n.arabic}</span>
        </span>
        <span className="block text-sm text-slate-700 mt-1">{n.meaning}</span>
        <span className="block font-arabic text-sm text-slate-600 mt-1" lang="ar" dir="rtl">{n.meaningArabic}</span>
      </span>
      <span className="roots-name-method-tags"><span>1 · Manifestation</span><span>2 · Tafakkur</span><span>3 · Akhlāq</span></span><span className="roots-name-turn">{open?'Close reflection ↑':'Open the three Roots steps ↓'}</span>
    </button>
    {open && <div className="roots-name-back px-4 pb-5 space-y-5 border-t border-brand-100 pt-4">
      <NameQuranText name={n.transliteration} />
      <div>
        <h3 className="text-sm font-semibold text-brand-800">Begin with the Qur’an · ابدأ بالقرآن</h3>
        <div className="flex flex-wrap gap-2 mt-2">{nameReferences(n.ayah).map(ref => <a key={ref} href={`https://quran.com/${ref.replace(':','/')}`} target="_blank" rel="noopener noreferrer" className="link text-sm">Read {ref} ↗</a>)}</div>
        <p className="text-xs text-slate-500 mt-2">Read the surrounding verses and consult tafsir. The prompts below are teaching reflections.</p>
      </div>
      <NameLearningJourney name={n} />
      <button type="button" onClick={copyLesson} className="btn-secondary text-sm">Copy this mini-lesson</button>
      <p role="status" className="text-xs text-slate-600">{copyStatus}</p>
    </div>}
  </article>
}
