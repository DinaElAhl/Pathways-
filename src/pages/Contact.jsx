import { useState } from 'react'
import Icon from '../components/Icon.jsx'

// Contact form composes a mailto so the visitor's message opens in their own
// email client, addressed to Dina, with subject and body prefilled. Nothing
// is submitted server-side; the previous "form vanishes into the void"
// behavior has been removed.

const topics = [
  'General question',
  'Roots curriculum for my school',
  'Partner with us',
  'Mentor with us',
  'Press / media',
]

const DINA_EMAIL = 'hello@pathwayslearn.com'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: topics[0],
    message: '',
  })
  const [errors, setErrors] = useState({})

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please tell us your name.'
    if (!form.email.trim()) next.email = 'We need an email to reply.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Hmm, that email doesn’t look right.'
    if (!form.message.trim() || form.message.trim().length < 10)
      next.message = 'A little more context helps (10+ chars).'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const subject = `Pathways — ${form.topic}`
    const body =
      `Hi Dina,\n\n${form.message.trim()}\n\n— ${form.name.trim()}\nReply to: ${form.email.trim()}`
    const href = `mailto:${DINA_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = href
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-14 pb-10 sm:pt-20">
          <span className="chip">Contact</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Say hello.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Questions about the Roots curriculum, licensing for your school, or the RQAP exam?
            Every note reaches Dina directly.
          </p>
        </div>
      </section>

      <section className="container-page pb-20 grid gap-10 lg:grid-cols-3">
        {/* Info column */}
        <div className="space-y-4">
          <ContactInfo
            icon="mail"
            label="Email"
            value={DINA_EMAIL}
            href={`mailto:${DINA_EMAIL}`}
          />
          <ContactInfo
            icon="pin"
            label="Based in"
            value="Remote-first — replies from Cairo hours"
          />

          <div className="card">
            <h3 className="text-base font-semibold">Reply time</h3>
            <p className="mt-3 text-sm text-slate-600">
              Most messages get a reply within 1–2 business days. If you’re a school on a tight
              timeline, say so in the subject and we’ll prioritize.
            </p>
          </div>
        </div>

        {/* Form column */}
        <div className="lg:col-span-2">
          <form onSubmit={onSubmit} noValidate className="card space-y-5">
            <p className="text-sm text-slate-500">
              This form opens your email client with your message ready to send — nothing goes to
              a server here.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label="Your name"
                value={form.name}
                onChange={update('name')}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                id="email"
                label="Your email"
                type="email"
                value={form.email}
                onChange={update('email')}
                error={errors.email}
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-slate-800">
                What's this about?
              </label>
              <select
                id="topic"
                value={form.topic}
                onChange={update('topic')}
                className="mt-1.5 w-full rounded-xl border-0 bg-white px-4 py-2.5 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-brand-500"
              >
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-800">
                Your message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder="Tell Dina what you're working on or wondering about..."
                className={`mt-1.5 w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-slate-900 ring-1 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 ${
                  errors.message ? 'ring-rose-300' : 'ring-slate-200'
                }`}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-rose-600">{errors.message}</p>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                Prefer to write directly?{' '}
                <a href={`mailto:${DINA_EMAIL}`} className="link">{DINA_EMAIL}</a>
              </p>
              <button type="submit" className="btn-primary px-6 py-3">
                Compose email
                <Icon name="arrowRight" className="ml-2 h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

function Field({ id, label, error, type = 'text', ...rest }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...rest}
        className={`mt-1.5 w-full rounded-xl border-0 bg-white px-4 py-2.5 text-sm text-slate-900 ring-1 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 ${
          error ? 'ring-rose-300' : 'ring-slate-200'
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  )
}

function ContactInfo({ icon, label, value, href }) {
  const inner = (
    <>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
        <Icon name={icon} className="h-5 w-5" strokeWidth={2} />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-900">{value}</p>
      </div>
    </>
  )
  const classes =
    'card flex items-center gap-4 transition hover:ring-brand-200'
  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    )
  }
  return <div className={classes}>{inner}</div>
}
