import {
  rootsSystem,
  licenseIncludes,
  elementaryLicenses,
  middleSchoolLicenses,
  highSchoolLicenses,
  fullK12License,
  schoolTiers,
  customisedCurriculum,
  howItWorks,
  ctaEmail,
} from '../data/schoolPricing.js';

const SCHOOL_INFO_BLOCK =
  '\n\nSchool name:\nCity / Country:\nGrade band(s) — Elementary / Middle / High:\nApprox. student count:\nTarget academic year:\n\nThank you,\n';

const pilotPackEmail =
  `mailto:${ctaEmail}?subject=` +
  encodeURIComponent('Roots — pilot pack request') +
  '&body=' +
  encodeURIComponent(
    "Hello,\n\nWe'd like to see a pilot pack (Q1 scope + Week 1 sample + teacher guide) for Roots." +
      SCHOOL_INFO_BLOCK,
  );

const licensingConversationEmail =
  `mailto:${ctaEmail}?subject=` +
  encodeURIComponent('Roots — licensing conversation') +
  '&body=' +
  encodeURIComponent(
    "Hello,\n\nWe're evaluating Roots for our school and would like to open a licensing conversation." +
      SCHOOL_INFO_BLOCK,
  );

const closingEmail =
  `mailto:${ctaEmail}?subject=` +
  encodeURIComponent('Roots for [School Name] — Inquiry') +
  '&body=' +
  encodeURIComponent(
    "Hello,\n\nWe'd like to bring Roots to our school." + SCHOOL_INFO_BLOCK,
  );

// Card renderer for per-level licenses. `future` badge shown when the level
// isn't shipping yet (MS + HS).
function LicenseCard({ lic }) {
  const isBundle = !!lic.highlight;
  const isFuture = lic.available !== true;
  return (
    <div
      className={`relative flex flex-col rounded-2xl bg-white p-6 transition ${
        isBundle
          ? 'ring-2 ring-brand-600 shadow-soft lg:scale-[1.02]'
          : 'ring-1 ring-slate-200 hover:ring-brand-200 hover:shadow-soft'
      }`}
    >
      {isFuture && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-accent-500 text-slate-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          {typeof lic.available === 'string' ? `Available ${lic.available}` : 'Coming soon'}
        </span>
      )}
      <div className="text-xs uppercase tracking-wide text-brand-700 font-semibold mb-2">
        {lic.level}
      </div>
      <h3 className="font-display text-lg font-semibold text-slate-900 leading-tight mb-3">
        {lic.name}
      </h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-bold text-slate-900">{lic.price}</span>
        <span className="text-sm text-slate-500">{lic.period}</span>
      </div>
      <p className="text-sm text-slate-600 flex-1 mb-5">{lic.description}</p>
      <div className="flex flex-col gap-2">
        <a href={lic.buyUrl} className="btn-primary w-full">
          Buy license
        </a>
        <a href={lic.customizeUrl} className="btn-secondary w-full">
          Email for questions
        </a>
      </div>
    </div>
  );
}

export default function ForSchools() {
  return (
    <div className="bg-white">
      {/* Hero — brand-first, warm, direct to school decision-makers */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/80 via-white to-white"
        />
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        />
        <div className="container-page pt-16 pb-16 sm:pt-24 sm:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="chip">Curriculum licensing for schools</span>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              A bilingual Qur&rsquo;an and Arabic curriculum,{' '}
              <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
                tailored to your school
              </span>
              .
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-700 leading-relaxed text-left sm:text-center">
              <strong className="text-slate-900">Roots | جذور</strong> is a three-track K&ndash;12
              system (Beginner, Intermediate, Advanced), currently anchored in a rigorous{' '}
              <em>Juz&rsquo; 30</em> foundation. It&rsquo;s designed to serve native Arabic
              speakers and English-speaking learners in the same framework. We don&rsquo;t sell an
              off-the-shelf textbook &mdash; we tailor Roots to each school we license to.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={pilotPackEmail} className="btn-primary px-7 py-3.5 text-base">
                See a pilot pack &rarr;
              </a>
              <a href={licensingConversationEmail} className="btn-secondary px-7 py-3.5 text-base">
                Book a licensing conversation &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How this works — warm intro paragraph before pricing */}
      <section className="container-page pt-6 pb-6 sm:pt-8 sm:pb-8">
        <div className="mx-auto max-w-3xl rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wide text-brand-700 mb-2">
            How this works
          </div>
          <p className="text-slate-700 leading-relaxed">
            Every school runs Arabic and Islamic Studies differently. So does every license. When
            your school evaluates Roots, we send a pilot pack (Q1 scope + Week 1 sample + teacher
            guide). If it&rsquo;s a fit, we tailor the curriculum to your school &mdash; pacing,
            presentation, integration with your existing programs. Then you license per level or per
            grade band. That&rsquo;s it. No calls required unless you want one.
          </p>
        </div>
      </section>

      {/* Section 1 — The Roots system */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <span className="chip">The Roots system</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              Three grade bands. Three levels each. 37 weeks per track.
            </h2>
            <p className="mt-4 text-lg text-slate-600">{rootsSystem.summary}</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {rootsSystem.gradeBands.map((band) => (
              <div
                key={band}
                className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 text-center"
              >
                <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">Grade band</div>
                <div className="font-display text-lg font-semibold text-slate-900">{band}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            <span>📚 {rootsSystem.weeksPerTrack} weeks per track (9 tracks total)</span>
            <span>🌍 {rootsSystem.languages}</span>
          </div>
        </div>
      </section>

      {/* Section 2 — What you get with a license */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="chip">Every license includes</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            What you get with a license
          </h2>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          {licenseIncludes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-slate-700">
              <span
                className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 text-xs font-bold"
                aria-hidden="true"
              >
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 3 — Standard licenses (Bucket A) */}
      <section id="pricing" className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <span className="chip">Standard licenses</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              License at the school level
            </h2>
            <p className="mt-4 text-slate-600">
              Pick the grade band and track that fit your students. Every license covers unlimited
              classrooms and students within your school for one academic year. Purchase is
              self-serve by email — no calls required.
            </p>
          </div>

          {/* Full K–12 bundle — top card, highlighted */}
          <div className="mt-12 mb-10 max-w-4xl mx-auto">
            <div className="relative rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white p-8 shadow-soft">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-accent-500 text-slate-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Most complete
              </span>
              <div className="text-xs uppercase tracking-wide text-brand-100 font-semibold mb-2">
                {fullK12License.level}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                {fullK12License.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{fullK12License.price}</span>
                <span className="text-sm text-brand-100">{fullK12License.period}</span>
              </div>
              <p className="text-brand-100 mb-6 max-w-2xl">{fullK12License.description}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={fullK12License.buyUrl}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-brand-700 font-semibold text-sm hover:bg-brand-50 transition-colors"
                >
                  Buy K–12 license
                </a>
                <a
                  href={fullK12License.customizeUrl}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                >
                  Email for questions
                </a>
              </div>
            </div>
          </div>

          {/* Elementary — available now */}
          <div className="mt-12">
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
              <h3 className="font-display text-2xl font-bold text-slate-900">
                Roots Elementary (K–5)
              </h3>
              <span className="text-sm text-brand-700 font-semibold">Available now</span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {elementaryLicenses.map((lic) => (
                <LicenseCard key={lic.id} lic={lic} />
              ))}
            </div>
          </div>

          {/* Middle School — coming */}
          <div className="mt-14">
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
              <h3 className="font-display text-2xl font-bold text-slate-900">
                Roots Middle School (6–8)
              </h3>
              <span className="text-sm text-accent-600 font-semibold">Available Fall 2026</span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {middleSchoolLicenses.map((lic) => (
                <LicenseCard key={lic.id} lic={lic} />
              ))}
            </div>
          </div>

          {/* High School — coming */}
          <div className="mt-14">
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
              <h3 className="font-display text-2xl font-bold text-slate-900">
                Roots High School (9–12)
              </h3>
              <span className="text-sm text-accent-600 font-semibold">Available Fall 2026</span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {highSchoolLicenses.map((lic) => (
                <LicenseCard key={lic.id} lic={lic} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Larger deployments (Bucket B) */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="chip">Enterprise</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            For larger deployments
          </h2>
          <p className="mt-4 text-slate-600">
            Multi-classroom, multi-campus, and network-wide licenses — annual, in USD. All inquiries
            handled by email.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
          {schoolTiers.map((tier) => (
            <div
              key={tier.id}
              className="relative flex flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:ring-brand-200 hover:shadow-soft transition"
            >
              <h3 className="font-display text-xl font-semibold text-slate-900 mb-1">{tier.name}</h3>
              <div className="text-sm text-slate-500 mb-4">{tier.tagline}</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-slate-900">{tier.price}</span>
                <span className="text-sm text-slate-500">{tier.period}</span>
              </div>
              <p className="text-sm text-slate-600 mb-4">{tier.forWhom}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {tier.includes.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-sm text-slate-700">
                    <span
                      className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 text-[10px] font-bold"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <a href={tier.inquireUrl} className="btn-primary w-full">
                Email to inquire
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5 — Customised Curriculum (Bucket C) */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <span className="chip">Customised Curriculum</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              Beyond the standard licenses
            </h2>
            <p className="mt-4 text-slate-600">
              Bespoke frameworks, teacher enablement, and end-to-end curriculum development — all
              delivered async by email, document, and video walkthrough. No scheduled calls required.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {customisedCurriculum.map((s) => (
              <div key={s.id} className="card flex flex-col">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="font-display text-lg font-semibold text-slate-900">{s.name}</h3>
                  <div className="whitespace-nowrap">
                    <span className="text-brand-700 font-bold">{s.price}</span>
                    {s.period && <span className="text-xs text-slate-500"> {s.period}</span>}
                  </div>
                </div>
                <p className="text-sm text-slate-600 flex-1 mb-4">{s.description}</p>
                <a href={s.inquireUrl} className="btn-primary w-full">
                  Email to start
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — How it works (four steps, humanized) */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="chip">How it works</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Four steps, from first email to running classroom.
          </h2>
          <p className="mt-4 text-slate-600">
            Every step is email, shared document, or short pre-recorded video. If you&rsquo;d rather
            hop on a call, we&rsquo;ll make time.
          </p>
        </div>
        <ol className="mt-12 mx-auto max-w-3xl space-y-8">
          {howItWorks.map((step) => (
            <li key={step.n} className="flex gap-5">
              <span
                aria-hidden="true"
                className="font-display text-2xl font-semibold text-brand-600 tabular-nums leading-none pt-0.5"
              >
                {step.n}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-900 leading-snug">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-slate-700 leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Section 7 — Behind Roots (quiet, credible) */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white ring-1 ring-slate-200 p-6 sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
              Behind Roots
            </div>
            <p className="text-slate-700 leading-relaxed">
              Roots is designed by <strong>Dina Mohamed Sayed El-Ahl</strong>, an Arabic Language
              and Qur&rsquo;anic Studies educator with years of K&ndash;12 curriculum experience at
              a US-based online Islamic school. She built Roots because she couldn&rsquo;t find the
              curriculum she wanted for her own students.
            </p>
          </div>
        </div>
      </section>

      {/* Section 8 — Closing / signature */}
      <section className="container-page pb-20 pt-8 sm:pt-12">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-8 sm:p-12 text-center text-white shadow-soft">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold">
            Ready to bring Roots to your school?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">
            Email us with your students, your grade bands, and your target start date. We reply
            within 2 business days.
          </p>
          <p className="mt-4">
            <a
              href={closingEmail}
              className="underline font-semibold hover:text-white text-brand-50"
            >
              roots@pathwayslearn.com
            </a>{' '}
            <span className="text-brand-100">&mdash; every message is read.</span>
          </p>
        </div>
      </section>
    </div>
  );
}
