import { useEffect, useState } from 'react'
let indexPromise
function readIndex() {
  return indexPromise ||= fetch(`${import.meta.env.BASE_URL}quran/name-wording-index.json`).then(r => { if (!r.ok) throw Error('Unavailable'); return r.json() }).catch(e => { indexPromise = null; throw e })
}
export default function NameQuranText({ name }) {
  const [data, setData] = useState(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => { let active = true; readIndex().then(d => { if(active)setData(d.names[name]) }).catch(()=>{if(active)setFailed(true)}); return ()=>{active=false} }, [name])
  return <section className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
    <h3 className="font-bold text-brand-800">The wording in the Qur’an · اللفظ في القرآن</h3>
    <p className="mt-2 text-xs leading-relaxed text-slate-600">Exact Arabic verses, with matching wording and words appearing together. A wording match may describe someone other than Allah; read its context. This index is not a ruling that every occurrence is a divine Name.</p>
    {!data && <p role="status" className="mt-3 text-sm">{failed ? 'Verse index unavailable. Use the reference links below.' : 'Loading verses…'}</p>}
    {data && <details className="mt-3"><summary className="cursor-pointer font-semibold text-brand-700">Explore {data.length} wording matches ↓</summary>
      <div className="mt-3 max-h-96 overflow-y-auto space-y-4" tabIndex={0} aria-label="Quran wording matches">
        {data.map(v=><div key={v.ref} className="rounded-xl bg-white p-4">
          <a className="link text-sm" href={`https://quran.com/${v.ref.replace(':','/')}`} target="_blank" rel="noopener noreferrer">Read {v.ref} in context ↗</a>
          <p lang="ar" dir="rtl" className="mt-3 text-2xl leading-loose font-arabic">{v.text}</p>
          <p className="mt-3 text-xs text-slate-600">Matched wording: <span lang="ar" dir="rtl" className="text-lg">{v.words.join(' · ')}</span></p>
          {v.cooccurring.length>0 && <p className="mt-2 text-xs text-slate-600">Other indexed wording in this verse: <span lang="ar" dir="rtl" className="text-lg">{v.cooccurring.flatMap(c=>c.words).filter((w,i,a)=>a.indexOf(w)===i).join(' · ')}</span></p>}
        </div>)}
      </div>
    </details>}
    <a href="https://tanzil.net" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block link text-xs">Arabic text: Tanzil Project ↗</a>
  </section>
}
