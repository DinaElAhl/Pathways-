import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { APPS_SCRIPT_URL, isAppsScriptConfigured } from '../config/apps-script.js'

// Fold a name to initials for privacy on the public verify page.
// "Aisha Ahmed" → "A.A." · "Muhammad ibn Abdullah" → "M.I.A."
function toInitials(name) {
  if (!name) return '—'
  return name.trim().split(/\s+/).map(w => w[0] || '').filter(Boolean).join('.') + '.'
}

function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Verify() {
  const { certId } = useParams()
  const [state, setState] = useState({ status: 'loading', data: null, error: null })

  useEffect(() => {
    if (!certId) { setState({ status: 'not_found', data: null, error: 'Missing certificate ID.' }); return }
    if (!isAppsScriptConfigured()) {
      setState({ status: 'unconfigured', data: null, error: null })
      return
    }
    const url = `${APPS_SCRIPT_URL}?certId=${encodeURIComponent(certId)}`
    let cancelled = false
    fetch(url, { method: 'GET', mode: 'cors', redirect: 'follow' })
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(body => {
        if (cancelled) return
        if (body && body.ok && body.certificate) {
          setState({ status: 'verified', data: body.certificate, error: null })
        } else {
          setState({ status: 'not_found', data: null, error: body?.error || 'Certificate not found.' })
        }
      })
      .catch(e => { if (!cancelled) setState({ status: 'error', data: null, error: String(e) }) })
    return () => { cancelled = true }
  }, [certId])

  return (
    <div className="bg-white">
      <section className="container-page pt-14 pb-20 sm:pt-20 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="chip">Certificate verification</span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Pathways Certificate Verification
          </h1>
          <p className="mt-3 text-slate-600">
            Certificate ID:{' '}
            <span className="font-mono font-semibold text-slate-900 break-all">{certId}</span>
          </p>
        </div>

        {state.status === 'loading' && (
          <div className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-8 text-center">
            <div className="animate-pulse text-slate-500 text-sm">Verifying…</div>
          </div>
        )}

        {state.status === 'verified' && state.data && (
          <div className="rounded-2xl ring-2 ring-emerald-500 bg-emerald-50 p-8">
            <div className="flex items-center gap-3 justify-center mb-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-600 text-white text-lg" aria-hidden="true">✓</span>
              <div className="text-lg font-semibold text-emerald-900">Verified authentic</div>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Holder" value={state.data.holderInitials || toInitials(state.data.holderName)} mono={false} />
              <Field label="Level" value={state.data.level} mono={false} />
              <Field label="Date issued" value={formatDate(state.data.dateIssued)} mono={false} />
              <Field label="Exam version" value={state.data.examVersion || '—'} mono={false} />
              {state.data.trackScores && (
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-wide text-emerald-800 font-semibold mb-1">Track scores</dt>
                  <dd className="text-sm text-emerald-900">
                    {Object.entries(state.data.trackScores).map(([k, v]) => (
                      <span key={k} className="inline-block mr-4">{k}: <strong>{v}</strong></span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
            <p className="mt-6 text-xs text-emerald-800 text-center">
              This certificate was issued by Pathways and is recorded in the Pathways submissions
              registry. Holder name is shown as initials for privacy.
            </p>
          </div>
        )}

        {state.status === 'not_found' && (
          <div className="rounded-2xl ring-2 ring-rose-400 bg-rose-50 p-8 text-center">
            <div className="flex items-center gap-3 justify-center mb-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-rose-600 text-white text-lg" aria-hidden="true">✕</span>
              <div className="text-lg font-semibold text-rose-900">Not found</div>
            </div>
            <p className="text-sm text-rose-800">
              No certificate matches this ID. If you believe this is an error, please contact{' '}
              <a href="mailto:dinabudu@gmail.com" className="link">dinabudu@gmail.com</a>.
            </p>
          </div>
        )}

        {state.status === 'error' && (
          <div className="rounded-2xl ring-2 ring-amber-400 bg-amber-50 p-8 text-center">
            <div className="text-lg font-semibold text-amber-900 mb-2">Verification temporarily unavailable</div>
            <p className="text-sm text-amber-800">
              We couldn’t reach the verification service. Try again in a moment, or contact{' '}
              <a href="mailto:dinabudu@gmail.com" className="link">dinabudu@gmail.com</a>.
            </p>
            <p className="mt-4 text-xs text-amber-700 font-mono break-all">{state.error}</p>
          </div>
        )}

        {state.status === 'unconfigured' && (
          <div className="rounded-2xl ring-1 ring-slate-300 bg-slate-50 p-8 text-center">
            <div className="text-lg font-semibold text-slate-900 mb-2">
              Verification not yet available
            </div>
            <p className="text-sm text-slate-600">
              The public verification service is being set up. For now, please contact{' '}
              <a href="mailto:dinabudu@gmail.com" className="link">dinabudu@gmail.com</a> with
              the certificate ID and Dina will confirm authenticity by email.
            </p>
          </div>
        )}

        <div className="mt-8 text-center text-sm">
          <Link to="/" className="link">← Back to Pathways</Link>
        </div>
      </section>
    </div>
  )
}

function Field({ label, value, mono }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-emerald-800 font-semibold mb-1">{label}</dt>
      <dd className={`text-sm text-emerald-900 ${mono ? 'font-mono' : 'font-semibold'}`}>{value ?? '—'}</dd>
    </div>
  )
}
