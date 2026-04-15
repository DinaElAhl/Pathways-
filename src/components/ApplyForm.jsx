import { useState } from 'react'
import Icon from './Icon.jsx'

/**
 * Generic multi-field application form.
 * `fields` shape:
 *   { id, label, type: 'text'|'email'|'url'|'textarea'|'select'|'number',
 *     required?, placeholder?, options?: string[], rows?, autoComplete? }
 */
export default function ApplyForm({ fields, submitLabel = 'Submit application', disclaimer }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((f) => [f.id, f.type === 'select' ? (f.options?.[0] ?? '') : ''])),
  )
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (id) => (e) =>
    setValues((v) => ({ ...v, [id]: e.target.value }))

  const validate = () => {
    const next = {}
    for (const f of fields) {
      if (!f.required) continue
      const v = (values[f.id] ?? '').toString().trim()
      if (!v) {
        next[f.id] = `Please fill in ${f.label.toLowerCase()}.`
        continue
      }
      if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        next[f.id] = 'Hmm, that email doesn\u2019t look right.'
      }
      if (f.type === 'url' && !/^https?:\/\/.+\..+/i.test(v)) {
        next[f.id] = 'Please include a full URL (https://\u2026).'
      }
      if (f.type === 'textarea' && v.length < 20) {
        next[f.id] = 'A little more detail helps (20+ characters).'
      }
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-white">
          <Icon name="check" className="h-6 w-6" strokeWidth={3} />
        </span>
        <h2 className="mt-4 text-xl font-semibold text-emerald-900">
          Application received.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-emerald-800">
          Thanks for applying. A human will reply within a few business days with
          next steps.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false)
            setValues(Object.fromEntries(fields.map((f) => [f.id, f.type === 'select' ? (f.options?.[0] ?? '') : ''])))
          }}
          className="btn-secondary mt-6"
        >
          Submit another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => {
          const span = f.type === 'textarea' ? 'sm:col-span-2' : ''
          return (
            <div key={f.id} className={span}>
              <label htmlFor={f.id} className="block text-sm font-medium text-slate-800">
                {f.label}
                {!f.required && (
                  <span className="ml-1 text-xs font-normal text-slate-400">(optional)</span>
                )}
              </label>
              {f.type === 'textarea' ? (
                <textarea
                  id={f.id}
                  rows={f.rows ?? 4}
                  value={values[f.id]}
                  onChange={update(f.id)}
                  placeholder={f.placeholder}
                  className={`mt-1.5 w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-slate-900 ring-1 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 ${
                    errors[f.id] ? 'ring-rose-300' : 'ring-slate-200'
                  }`}
                />
              ) : f.type === 'select' ? (
                <select
                  id={f.id}
                  value={values[f.id]}
                  onChange={update(f.id)}
                  className="mt-1.5 w-full rounded-xl border-0 bg-white px-4 py-2.5 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-brand-500"
                >
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={f.id}
                  type={f.type}
                  value={values[f.id]}
                  onChange={update(f.id)}
                  placeholder={f.placeholder}
                  autoComplete={f.autoComplete}
                  className={`mt-1.5 w-full rounded-xl border-0 bg-white px-4 py-2.5 text-sm text-slate-900 ring-1 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 ${
                    errors[f.id] ? 'ring-rose-300' : 'ring-slate-200'
                  }`}
                />
              )}
              {errors[f.id] && (
                <p className="mt-1.5 text-xs text-rose-600">{errors[f.id]}</p>
              )}
            </div>
          )
        })}
      </div>
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        {disclaimer && (
          <p className="text-xs text-slate-500">{disclaimer}</p>
        )}
        <button type="submit" className="btn-primary px-6 py-3 sm:ml-auto">
          {submitLabel}
          <Icon name="arrowRight" className="ml-2 h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </form>
  )
}
