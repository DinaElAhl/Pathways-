import { useState } from 'react'
import Icon from '../components/Icon.jsx'

const topics = [
  'General question',
  'Pick a pathway for me',
  'Partner with us',
  'Mentor with us',
  'Press / media',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
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
      next.email = 'Hmm, that email doesn\u2019t look right.'
    if (!form.message.trim() || form.message.trim().length < 10)
      next.message = 'A little more context helps (10+ chars).'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
    setForm({ name: '', email: '', topic: topics[0], message: '' })
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-14 pb-10 sm:pt-20">
          <span className="chip">Contact</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Let's find your pathway together.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Questions about a pathway, partnerships, or mentorship? Drop us a note —
            a human replies within two business days.
          </p>
        </div>
      </section>

      <section className="container-page pb-20 grid gap-10 lg:grid-cols-3">
        {/* Info column */}
        <div className="space-y-4">
          <ContactInfo
            icon="mail"
            label="Email"
            value="hello@pathways.test"
            href="mailto:hello@pathways.test"
          />
          <ContactInfo
            icon="phone"
            label="Phone"
            value="+1 (555) 010-0134"
            href="tel:+15550100134"
          />
          <ContactInfo
            icon="pin"
            label="Studio"
            value="Remote-first · HQ in Lisbon, PT"
          />

          <div className="card">
            <h3 className="text-base font-semibold">Office hours</h3>
            <dl className="mt-3 space-y-1.5 text-sm text-slate-600">
              <div className="flex justify-between"><dt>Mon – Thu</dt><dd>9:00 – 18:00</dd></div>
              <div className="flex justify-between"><dt>Friday</dt><dd>9:00 – 14:00</dd></div>
              <div className="flex justify-between"><dt>Weekends</dt><dd>Closed</dd></div>
            </dl>
          </div>
        </div>

        {/* Form column */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-600 text-white">
                <Icon name="check" className="h-6 w-6" strokeWidth={3} />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-emerald-900">
                Thanks — your message is on its way.
              </h2>
              <p className="mt-2 text-sm text-emerald-800">
                A human from the team will reply within two business days.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-secondary mt-6"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="card space-y-5">
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
                  label="Email"
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
                  placeholder="Tell us what you're working on or wondering about..."
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
                  By sending, you agree we can reply to you by email.
                </p>
                <button type="submit" className="btn-primary px-6 py-3">
                  Send message
                  <Icon name="arrowRight" className="ml-2 h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </form>
          )}
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
