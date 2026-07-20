import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

// Lead-magnet landing page — copy from Outreach_Pack_v1.md Section C.
// Email capture is a mailto placeholder until Dina picks a newsletter tool
// (ConvertKit / MailerLite / Beehiiv etc.). When she wires a real capture,
// replace the <form> action with the tool's embed and drop the mailto.
const DINA_EMAIL = 'roots@pathwayslearn.com'
const MAILTO_SUBJECT = 'Free Roots Week 1 Sample Request'

export default function FreeSample() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    const trimmed = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }
    const subject = encodeURIComponent(MAILTO_SUBJECT)
    const body = encodeURIComponent(
      `Assalamu alaikum Dina,\n\nPlease send me the free Roots Week 1 sample pack.\n\nMy email: ${trimmed}\n\nJazakum Allahu khairan,\n`
    )
    window.location.href = `mailto:${DINA_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <div className="bg-white">
      {/* Hero + email capture */}
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-16 pb-14 sm:pt-24 text-center">
          <span className="chip">Free for homeschool parents &amp; teachers</span>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Teach your child their first{' '}
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
              Qur’anic Arabic
            </span>{' '}
            reading lesson — free.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            The Roots Week 1 sample pack: one full lesson, a teacher guide, and the student
            worksheets. No credit card. Just tell me where to send it.
          </p>

          {/* Email capture form */}
          <form
            onSubmit={onSubmit}
            noValidate
            className="mx-auto mt-8 flex flex-col gap-3 max-w-xl sm:flex-row"
          >
            <label htmlFor="sample-email" className="sr-only">Email address</label>
            <input
              id="sample-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`min-w-0 flex-1 rounded-full border-0 bg-white px-5 py-3 text-sm text-slate-900 shadow-sm ring-1 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 ${
                error ? 'ring-rose-300' : 'ring-slate-200'
              }`}
            />
            <button type="submit" className="btn-primary px-6 py-3 text-base whitespace-nowrap">
              Send me the free lesson
              <Icon name="arrowRight" className="ml-2 h-4 w-4" strokeWidth={2} />
            </button>
          </form>
          {error && (
            <p className="mt-2 text-xs text-rose-600" role="alert">{error}</p>
          )}
          <p className="mt-3 text-xs text-slate-500">
            Composes an email to Dina — she sends the pack back the same day.
          </p>
        </div>
      </section>

      {/* What's inside */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="chip">What’s inside</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            The free Week 1 pack
          </h2>
          <p className="mt-3 text-slate-600">
            Everything you need to run the first day of Roots — no Arabic background required.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          {[
            {
              icon: 'sparkles',
              title: 'The lesson deck',
              body: 'The exact slides used in a Roots Level C classroom on the first day. Bilingual, print-ready.',
            },
            {
              icon: 'target',
              title: 'The teacher / parent guide',
              body: 'How to actually teach it, minute by minute. Written for parents who don’t speak Arabic.',
            },
            {
              icon: 'server',
              title: 'The student worksheets',
              body: 'The classwork + homework, ready to print.',
            },
            {
              icon: 'bolt',
              title: 'A short intro video',
              body: '5 minutes walking you through how Roots works, from someone who’s taught it.',
              coming: true,
            },
          ].map((item) => (
            <div key={item.title} className="card">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name={item.icon} className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    {item.title}
                    {item.coming && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-accent-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-600 align-middle">
                        Coming soon
                      </span>
                    )}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why parents and teachers use Roots */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <span className="chip">Why Roots</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Why parents and teachers use Roots
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {[
              {
                title: 'Bilingual, from day one.',
                body: 'Every lesson is in English and Arabic. Your child sees both languages side by side, so nothing feels foreign.',
              },
              {
                title: 'Qur’an-anchored throughout.',
                body: 'Every letter, every sound, every word is connected back to a Qur’anic example. Reading becomes something meaningful, not memorization.',
              },
              {
                title: 'No Arabic background needed.',
                body: 'The teacher guide is written for a parent who’s never spoken Arabic. If you can follow a recipe, you can teach Roots.',
              },
              {
                title: 'A real 37-week curriculum, not just lessons.',
                body: 'Roots is a full year’s scope-and-sequence. When you’re ready for more than the Week 1 sample, the full path is waiting.',
              },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <h3 className="font-display text-lg font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Roots */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-8 sm:p-12 text-white shadow-soft">
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            About Roots
          </span>
          <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Roots <span style={{ fontFamily: 'Amiri, "Traditional Arabic", serif' }}>| جذور</span>{' '}
            is a bilingual Qur’an and Arabic curriculum system
          </h2>
          <p className="mt-4 text-brand-100 leading-relaxed">
            built by Dina Mohamed Sayed El-Ahl, an Arabic Language and Qur’anic Studies educator
            who taught at a US online Islamic school. Roots is used by homeschool families,
            microschools, and Islamic schools — one three-level program (Level C, Level B,
            Level A) that grows with your child from the alphabet all the way to Qur’anic reading
            with tajweed.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link
              to="/shop"
              className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-brand-700 font-semibold hover:bg-brand-50 transition-colors"
            >
              Visit the shop →
            </Link>
            <Link
              to="/for-schools"
              className="inline-flex items-center gap-1 rounded-full border border-white/40 px-4 py-2 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Licensing for schools →
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA — email capture again */}
      <section className="container-page pb-24">
        <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 text-center">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
            Ready to start?
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            One click, then check your inbox. No spam.
          </p>
          <a
            href={`mailto:${DINA_EMAIL}?subject=${encodeURIComponent(MAILTO_SUBJECT)}`}
            className="btn-primary mt-6 px-6 py-3 text-base"
          >
            Send me the free lesson
          </a>
        </div>
      </section>
    </div>
  )
}
