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

// Roots brand palette (matches the RQAP exam page).
// Deep teal + gold + cream on a dark background.
const bookCall =
  `mailto:${ctaEmail}?subject=` +
  encodeURIComponent('Roots for [School Name] — Discovery Call') +
  '&body=' +
  encodeURIComponent(
    'Assalamu alaikum Dina,\n\nWe are interested in the Roots curriculum for our school. Could we book a discovery call?\n\nSchool name:\nCity / Country:\nGrade band(s):\nApprox. student count:\nCurrent Qur’an/Arabic curriculum (if any):\nBest times to talk:\n\nThank you,\n'
  );

// Small ornament used between sections for visual rhythm.
function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 my-8 text-[#c9a961]/60">
      <span className="h-px w-16 bg-[#c9a961]/30" aria-hidden="true"></span>
      <span className="text-lg" aria-hidden="true">✦</span>
      <span className="h-px w-16 bg-[#c9a961]/30" aria-hidden="true"></span>
    </div>
  );
}

export default function ForSchools() {
  return (
    <div
      className="min-h-screen text-[#f0e8d2]"
      style={{
        background:
          'radial-gradient(ellipse at top, rgba(45,116,120,0.35), transparent 60%), radial-gradient(ellipse at bottom right, rgba(184,145,74,0.12), transparent 55%), #0d3b3e',
      }}
    >
      {/* ============================================================
          Hero
          ============================================================ */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs uppercase tracking-[0.22em] font-semibold text-[#c9a961] mb-5">
            Curriculum licensing for schools
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#f8f3e7] mb-6"
            style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
          >
            Roots <span className="text-[#c9a961]">·</span>{' '}
            <span style={{ fontFamily: 'Amiri, "Traditional Arabic", serif' }}>جذور</span>
          </h1>
          <p className="text-xl sm:text-2xl text-[#e8dab5] mb-4 font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            Bilingual Qur’an &amp; Arabic curriculum for schools.
          </p>
          <p className="text-lg text-[#f0e8d2]/80 max-w-2xl mx-auto">
            A ready-to-teach, three-track curriculum system your teachers can pick up on Monday morning.
          </p>
          <div className="mt-10">
            <a
              href={bookCall}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#c9a961] hover:bg-[#e8dab5] text-[#0d3b3e] font-semibold text-base transition-colors shadow-lg"
            >
              Book a discovery call →
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 1 — The Roots system
          ============================================================ */}
      <Ornament />
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-semibold text-[#f8f3e7] mb-4"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            The Roots system
          </h2>
          <p className="text-lg text-[#f0e8d2]/85 leading-relaxed mb-8">{rootsSystem.summary}</p>
          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto text-left">
            {rootsSystem.tracks.map((t) => (
              <div
                key={t}
                className="bg-[#1a5559]/60 border border-[#c9a961]/20 rounded-lg p-5 text-center"
              >
                <div className="text-xs uppercase tracking-[0.14em] text-[#c9a961] mb-2">Track</div>
                <div className="text-lg font-medium text-[#f8f3e7]">{t}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-[#e8dab5]/80">
            <span>📚 {rootsSystem.weeks} weeks of scope &amp; sequence</span>
            <span>🌍 {rootsSystem.languages}</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 2 — What you get with a license
          ============================================================ */}
      <Ornament />
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-semibold text-[#f8f3e7] mb-8 text-center"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            What you get with a license
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
            {licenseIncludes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#f0e8d2]/90">
                <span className="text-[#c9a961] text-xl leading-none mt-0.5" aria-hidden="true">
                  ✦
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================
          Section 3a — License a single level (or the whole track)
          ============================================================ */}
      <Ornament />
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <h2
              className="text-3xl sm:text-4xl font-semibold text-[#f8f3e7] mb-3"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              License a single level (or the whole track)
            </h2>
            <p className="text-[#e8dab5]/80 max-w-2xl mx-auto">
              License at the school level — pick the tracks that fit your students. Every license
              covers unlimited classrooms and students within your school for one academic year.
            </p>
          </div>

          <div className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-4">
            {perLevelLicenses.map((lic) => {
              const isBundle = lic.id === 'bundle';
              return (
                <div
                  key={lic.id}
                  className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
                    isBundle
                      ? 'border-[#c9a961] bg-[#1a5559] shadow-2xl shadow-[#c9a961]/10 lg:scale-105'
                      : 'border-[#c9a961]/20 bg-[#1a5559]/50 hover:border-[#c9a961]/60'
                  }`}
                >
                  <div className="text-xs uppercase tracking-[0.14em] text-[#c9a961] mb-2">
                    {lic.level}
                  </div>
                  <h3
                    className="text-xl font-semibold text-[#f8f3e7] mb-3 leading-tight"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    {lic.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-[#c9a961]">{lic.price}</span>
                    <span className="text-sm text-[#e8dab5]/60">{lic.period}</span>
                  </div>
                  <p className="text-sm text-[#f0e8d2]/85 flex-1 mb-5">{lic.description}</p>
                  <div className="flex flex-col gap-2">
                    <a
                      href={lic.buyUrl}
                      className={`text-center px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                        isBundle
                          ? 'bg-[#c9a961] hover:bg-[#e8dab5] text-[#0d3b3e]'
                          : 'bg-[#c9a961] hover:bg-[#e8dab5] text-[#0d3b3e]'
                      }`}
                    >
                      Buy license →
                    </a>
                    <a
                      href={lic.customizeUrl}
                      className="text-center px-4 py-2.5 rounded-lg border border-[#c9a961]/50 hover:border-[#c9a961] hover:bg-[#c9a961]/10 text-[#f0e8d2] font-semibold text-sm transition-colors"
                    >
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
      <Ornament />
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-3xl sm:text-4xl font-semibold text-[#f8f3e7] mb-3"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              For larger deployments
            </h2>
            <p className="text-[#e8dab5]/75">
              Multi-classroom, multi-campus, and network-wide licenses — annual, in USD.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {schoolTiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
                  tier.highlight
                    ? 'border-[#c9a961] bg-[#1a5559] shadow-2xl shadow-[#c9a961]/10 lg:scale-105'
                    : 'border-[#c9a961]/20 bg-[#1a5559]/50 hover:border-[#c9a961]/60'
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#c9a961] text-[#0d3b3e] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}
                <h3
                  className="text-xl font-semibold text-[#f8f3e7] mb-1"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  {tier.name}
                </h3>
                <div className="text-sm text-[#e8dab5]/70 mb-4">{tier.tagline}</div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-[#c9a961]">{tier.price}</span>
                  <span className="text-sm text-[#e8dab5]/60">{tier.period}</span>
                </div>
                <p className="text-sm text-[#f0e8d2]/80 mb-4">{tier.forWhom}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.includes.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-sm text-[#f0e8d2]/85">
                      <span className="text-[#c9a961] mt-0.5" aria-hidden="true">
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
                  className={`text-center px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                    tier.highlight
                      ? 'bg-[#c9a961] hover:bg-[#e8dab5] text-[#0d3b3e]'
                      : 'border border-[#c9a961]/50 hover:border-[#c9a961] hover:bg-[#c9a961]/10 text-[#f0e8d2]'
                  }`}
                >
                  Talk to Dina
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 4 — Consulting & custom
          ============================================================ */}
      <Ornament />
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-3xl sm:text-4xl font-semibold text-[#f8f3e7] mb-3"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Consulting &amp; custom work
            </h2>
            <p className="text-[#e8dab5]/75">
              For schools that need something the licenses don’t cover — audits, custom frameworks,
              teacher training, and net-new curriculum.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {consultingServices.map((s) => (
              <div
                key={s.id}
                className="flex flex-col bg-[#1a5559]/40 border border-[#c9a961]/15 rounded-xl p-5 hover:border-[#c9a961]/50 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3
                    className="text-lg font-semibold text-[#f8f3e7]"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    {s.name}
                  </h3>
                  <div className="whitespace-nowrap">
                    <span className="text-[#c9a961] font-bold">{s.price}</span>
                    {s.period && (
                      <span className="text-xs text-[#e8dab5]/60"> {s.period}</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-[#f0e8d2]/80">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 5 — How it works
          ============================================================ */}
      <Ornament />
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-3xl sm:text-4xl font-semibold text-[#f8f3e7] mb-3"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              How it works
            </h2>
            <p className="text-[#e8dab5]/75">Four steps from your first call to a running Roots classroom.</p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step) => (
              <li
                key={step.n}
                className="bg-[#1a5559]/40 border border-[#c9a961]/15 rounded-xl p-5"
              >
                <div className="text-xs font-bold tracking-[0.14em] text-[#c9a961] mb-2">
                  STEP {step.n}
                </div>
                <h3
                  className="text-lg font-semibold text-[#f8f3e7] mb-2"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-[#f0e8d2]/80">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================
          Section 6 — Meet Dina
          ============================================================ */}
      <Ornament />
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-[#1a5559]/50 border border-[#c9a961]/20 rounded-2xl p-6 sm:p-10">
          <div className="text-center mb-6">
            <div
              className="mx-auto w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4 border-2 border-[#c9a961]/40"
              style={{
                background:
                  'linear-gradient(135deg, #0d3b3e 0%, #2d7478 100%)',
                fontFamily: 'Amiri, serif',
                color: '#e8dab5',
              }}
              aria-hidden="true"
            >
              د
            </div>
            <h2
              className="text-2xl sm:text-3xl font-semibold text-[#f8f3e7] mb-1"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Meet {meetDina.name}
            </h2>
            <div className="text-sm text-[#c9a961]">{meetDina.role}</div>
          </div>
          <p className="text-[#f0e8d2]/90 leading-relaxed mb-6 text-center">{meetDina.bio}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {meetDina.credentials.map((c) => (
              <span
                key={c}
                className="text-xs px-3 py-1.5 rounded-full bg-[#0d3b3e]/70 border border-[#c9a961]/25 text-[#e8dab5]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 7 — CTA
          ============================================================ */}
      <Ornament />
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-semibold text-[#f8f3e7] mb-4"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Ready to bring Roots to your school?
          </h2>
          <p className="text-lg text-[#f0e8d2]/80 mb-8">
            Book a short discovery call. We’ll talk through your students, your teachers, and the shape of a
            pilot — no obligation, no pricing pressure.
          </p>
          <a
            href={bookCall}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-[#c9a961] hover:bg-[#e8dab5] text-[#0d3b3e] font-bold text-lg transition-colors shadow-xl"
          >
            Book a discovery call →
          </a>
          {/* When she has a Calendly, swap the mailto above for the Calendly link.
              e.g. href="https://calendly.com/dinabudu/roots-discovery" */}
          <div className="text-sm text-[#e8dab5]/70 mt-4">
            Or write directly:{' '}
            <a href={`mailto:${ctaEmail}`} className="text-[#c9a961] hover:text-[#e8dab5] underline">
              {ctaEmail}
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 8 — Freemium hook
          ============================================================ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#0d3b3e] to-[#1a5559] border border-[#c9a961]/30 rounded-xl p-6 sm:p-8 text-center">
          <div className="text-xs uppercase tracking-[0.16em] font-bold text-[#c9a961] mb-3">
            Free sample
          </div>
          <h3
            className="text-xl sm:text-2xl font-semibold text-[#f8f3e7] mb-3"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Try Week 1 free
          </h3>
          <p className="text-[#f0e8d2]/85 mb-5">
            The Roots Tajweed Reading Series bundle on the Shop page is the fastest way to see how Dina writes
            a lesson. Grab it, then bring the full curriculum to your school.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#c9a961]/50 hover:border-[#c9a961] hover:bg-[#c9a961]/10 text-[#f0e8d2] font-semibold text-sm transition-colors"
          >
            Visit the Shop →
          </a>
        </div>
      </section>
    </div>
  );
}
