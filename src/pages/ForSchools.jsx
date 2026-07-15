import {
  rootsSystem,
  licenseIncludes,
  perLevelLicenses,
  schoolTiers,
  consultingServices,
  howItWorks,
  meetDina,
  ctaEmail,
} from '../data/schoolPricing.js';

const bookCall =
  `mailto:${ctaEmail}?subject=` +
  encodeURIComponent('Roots for [School Name] — Discovery Call') +
  '&body=' +
  encodeURIComponent(
    'Assalamu alaikum Dina,\n\nWe are interested in the Roots curriculum for our school. Could we book a discovery call?\n\nSchool name:\nCity / Country:\nGrade band(s):\nApprox. student count:\nCurrent Qur’an/Arabic curriculum (if any):\nBest times to talk:\n\nThank you,\n'
  );

export default function ForSchools() {
  return (
    <div className="bg-white">
      {/* ============================================================
          Hero
          ============================================================ */}
      <section className="container-page pt-16 pb-16 sm:pt-24 sm:pb-20 text-center">
        <span className="chip">Curriculum licensing for schools</span>
        <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Roots{' '}
          <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
            جذور
          </span>
        </h1>
        <p
          className="mx-auto mt-4 max-w-2xl text-xl text-slate-700 font-display"
        >
          Bilingual Qur’an &amp; Arabic curriculum for schools.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
          A ready-to-teach, three-track curriculum system your teachers can pick up on
          Monday morning.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={bookCall} className="btn-primary px-6 py-3 text-base">
            Book a discovery call →
          </a>
          <a href="#pricing" className="btn-secondary px-6 py-3 text-base">
            See pricing
          </a>
        </div>
      </section>

      {/* ============================================================
          Section 1 — The Roots system
          ============================================================ */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <span className="chip">The Roots system</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              Three tracks. Bilingual. 37 weeks each.
            </h2>
            <p className="mt-4 text-lg text-slate-600">{rootsSystem.summary}</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {rootsSystem.tracks.map((t) => (
              <div
                key={t}
                className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 text-center"
              >
                <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">Track</div>
                <div className="font-display text-lg font-semibold text-slate-900">{t}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            <span>📚 {rootsSystem.weeks} weeks of scope &amp; sequence</span>
            <span>🌍 {rootsSystem.languages}</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 2 — What you get with a license
          ============================================================ */}
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

      {/* ============================================================
          Section 3a — License a single level (or the whole track)
          ============================================================ */}
      <section id="pricing" className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <span className="chip">Pricing</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              License a single level (or the whole track)
            </h2>
            <p className="mt-4 text-slate-600">
              License at the school level — pick the tracks that fit your students. Every license
              covers unlimited classrooms and students within your school for one academic year.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {perLevelLicenses.map((lic) => {
              const isBundle = lic.id === 'bundle';
              return (
                <div
                  key={lic.id}
                  className={`relative flex flex-col rounded-2xl bg-white p-6 transition ${
                    isBundle
                      ? 'ring-2 ring-brand-600 shadow-soft lg:scale-105'
                      : 'ring-1 ring-slate-200 hover:ring-brand-200 hover:shadow-soft'
                  }`}
                >
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
                      Buy license →
                    </a>
                    <a href={lic.customizeUrl} className="btn-secondary w-full">
                      Email for customization
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 3b — For larger deployments
          ============================================================ */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="chip">Enterprise</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            For larger deployments
          </h2>
          <p className="mt-4 text-slate-600">
            Multi-classroom, multi-campus, and network-wide licenses — annual, in USD.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
          {schoolTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-2xl bg-white p-6 transition ${
                tier.highlight
                  ? 'ring-2 ring-brand-600 shadow-soft'
                  : 'ring-1 ring-slate-200 hover:ring-brand-200 hover:shadow-soft'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-accent-500 text-slate-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}
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
              <a
                href={
                  `mailto:${ctaEmail}?subject=` +
                  encodeURIComponent(`Roots ${tier.name} License — enquiry`)
                }
                className="btn-primary w-full"
              >
                Talk to Dina
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          Section 4 — Consulting & custom
          ============================================================ */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <span className="chip">Consulting</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              Consulting &amp; custom work
            </h2>
            <p className="mt-4 text-slate-600">
              For schools that need something the licenses don’t cover — audits, custom frameworks,
              teacher training, and net-new curriculum.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {consultingServices.map((s) => (
              <div
                key={s.id}
                className="card flex flex-col"
              >
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="font-display text-lg font-semibold text-slate-900">{s.name}</h3>
                  <div className="whitespace-nowrap">
                    <span className="text-brand-700 font-bold">{s.price}</span>
                    {s.period && <span className="text-xs text-slate-500"> {s.period}</span>}
                  </div>
                </div>
                <p className="text-sm text-slate-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 5 — How it works
          ============================================================ */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="chip">How it works</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            From first call to running classroom
          </h2>
          <p className="mt-4 text-slate-600">Four steps from your first call to a running Roots classroom.</p>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step) => (
            <li key={step.n} className="card">
              <div className="text-xs font-semibold text-brand-700 mb-2">STEP {step.n}</div>
              <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ============================================================
          Section 6 — Meet Dina
          ============================================================ */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl mx-auto rounded-2xl bg-white p-6 sm:p-10 ring-1 ring-slate-200">
            <div className="text-center">
              <div
                className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white mb-4 shadow-soft"
                style={{ fontFamily: 'Amiri, serif', fontSize: '2.5rem' }}
                aria-hidden="true"
              >
                د
              </div>
              <span className="chip">About Dina</span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
                Meet {meetDina.name}
              </h2>
              <div className="mt-2 text-sm text-brand-700 font-medium">{meetDina.role}</div>
            </div>
            <p className="mt-6 text-slate-700 leading-relaxed text-center">{meetDina.bio}</p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {meetDina.credentials.map((c) => (
                <span
                  key={c}
                  className="text-xs px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 7 — CTA
          ============================================================ */}
      <section className="container-page py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to bring Roots to your school?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Book a short discovery call. We’ll talk through your students, your teachers, and the
            shape of a pilot — no obligation, no pricing pressure.
          </p>
          <a
            href={bookCall}
            className="btn-primary mt-8 px-8 py-3.5 text-base"
          >
            Book a discovery call →
          </a>
          {/* When she has a Calendly, swap the mailto above for the Calendly link.
              e.g. href="https://calendly.com/dinabudu/roots-discovery" */}
          <div className="mt-4 text-sm text-slate-500">
            Or write directly:{' '}
            <a href={`mailto:${ctaEmail}`} className="link">
              {ctaEmail}
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 8 — Freemium hook
          ============================================================ */}
      <section className="container-page pb-20">
        <div className="max-w-2xl mx-auto rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 sm:p-8 text-center text-white shadow-soft">
          <div className="text-xs uppercase tracking-wide font-semibold text-brand-100 mb-3">
            Free sample
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-3">Try Week 1 free</h3>
          <p className="text-brand-100 mb-5">
            The Roots Tajweed Reading Series bundle on the Shop page is the fastest way to see how
            Dina writes a lesson. Grab it, then bring the full curriculum to your school.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-brand-700 font-semibold text-sm hover:bg-brand-50 transition-colors"
          >
            Visit the Shop →
          </a>
        </div>
      </section>
    </div>
  );
}
