import { useParams, Link, Navigate } from 'react-router-dom'
import { getAudience, getPackage, lmsFeatures } from '../data/lms.js'

const audienceExtras = {
  teachers: {
    color: 'from-blue-600 to-cyan-600',
    stats: [['5k+','Teachers using Pathways'],['60%','Less time grading'],['4.9★','Average rating']],
    workflow: [
      { step: '1. Build your classroom', body: 'Create a classroom in 30 seconds, share a join code with your students, and drop in any pathway from the Pathways library.' },
      { step: '2. Assign with one click', body: 'Pick a pathway, a stage, or a single lesson; set a due date; add a rubric; done. Students get notified instantly.' },
      { step: '3. Grade 3× faster', body: 'AI drafts rubric-based feedback on every submission. You review, tweak, and approve — nothing goes to students without your OK.' },
      { step: '4. Spot struggling students early', body: 'The dashboard highlights who is falling behind, what concept they\'re stuck on, and suggests a remediation pathway.' },
    ],
  },
  schools: {
    color: 'from-emerald-600 to-teal-600',
    stats: [['320+','Schools deployed'],['90%','Teacher adoption in 60 days'],['FERPA / COPPA','Compliant'],['Clever / ClassLink','Rostered']],
    workflow: [
      { step: '1. Single sign-on', body: 'Roll out in a day with Google Workspace, Microsoft 365, Clever, or ClassLink. SAML 2.0 for enterprise directories.' },
      { step: '2. Roster sync', body: 'Nightly roster sync keeps classrooms, teachers, and students up to date automatically. No more CSV imports.' },
      { step: '3. Standards-aligned curriculum', body: 'Every pathway maps to CSTA, NGSS, Common Core, or your national curriculum. Drop units into any grade level.' },
      { step: '4. Dashboards for every role', body: 'Teachers see their classroom. Coaches see the department. Principals see the school. District admins see everything.' },
    ],
  },
  universities: {
    color: 'from-fuchsia-600 to-rose-600',
    stats: [['48','University partners'],['LTI 1.3','Certified'],['99.95%','Uptime SLA'],['SAML 2.0','+ SCIM']],
    workflow: [
      { step: '1. Embed inside Canvas, Moodle, Blackboard', body: 'LTI 1.3 Advantage with deep linking, grade passback, and names-and-roles service. Your students never leave your LMS.' },
      { step: '2. Proctored assessments', body: 'Lockdown browser, AI integrity signals, and optional webcam proctoring for high-stakes exams — all FERPA compliant.' },
      { step: '3. Research-grade analytics', body: 'Open learning analytics APIs, xAPI / Caliper export, and a data warehouse connector for institutional research teams.' },
      { step: '4. White-label & self-host', body: 'Custom domain, your branding, 99.95% uptime SLA. On-prem or private-cloud deployment on request.' },
    ],
  },
}

export default function LMSAudience() {
  const { slug } = useParams()
  const audience = getAudience(slug)
  const extras = audienceExtras[slug]

  if (!audience) return <Navigate to="/lms" replace />

  return (
    <div>
      {/* Hero */}
      <section className={`bg-gradient-to-br ${extras.color} text-white`}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Link to="/lms" className="text-white/80 hover:text-white text-sm mb-4 inline-block">
            ← All audiences
          </Link>
          <div className="text-sm uppercase tracking-widest text-white/80 mb-2">{audience.title}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{audience.hero}</h1>
          <p className="text-xl text-white/90 mb-2 italic">{audience.tagline}</p>
          <p className="text-white/90 max-w-3xl">{audience.description}</p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {extras.stats.map(([v, l]) => (
              <div key={l} className="bg-white/10 border border-white/20 rounded-xl p-4">
                <div className="text-2xl font-bold">{v}</div>
                <div className="text-sm text-white/85">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Why {audience.title.replace('For ', '').toLowerCase()} pick Pathways</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {audience.benefits.map((b, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-indigo-600 font-bold mb-2">0{i + 1}</div>
              <p className="text-gray-700">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">How it works</h2>
          <div className="space-y-4">
            {extras.workflow.map(w => (
              <div key={w.step} className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="text-indigo-600 font-semibold mb-1">{w.step}</div>
                <p className="text-gray-700">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended packages */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Recommended packages</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {audience.recommendedPackages.map(pkgSlug => {
            const pkg = getPackage(pkgSlug)
            if (!pkg) return null
            return (
              <div key={pkg.slug} className={`rounded-2xl p-6 border ${pkg.highlight ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white'}`}>
                <div className="text-xs uppercase tracking-wide text-gray-500">{pkg.audience}</div>
                <h3 className="text-xl font-bold mt-1 mb-2">{pkg.name}</h3>
                <div className="text-sm text-indigo-600 font-medium mb-3">{pkg.badge}</div>
                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                <ul className="space-y-1 mb-4 text-sm">
                  {pkg.highlights.slice(0, 4).map(h => (
                    <li key={h} className="flex gap-2"><span className="text-indigo-600">✓</span><span>{h}</span></li>
                  ))}
                </ul>
                <Link to="/pricing" className="inline-block bg-gray-900 text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800">
                  {pkg.cta} →
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-700 to-violet-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold mb-3">Let's build something great together.</h2>
          <p className="text-white/90 mb-6">Book a 30-minute walkthrough tailored to {audience.title.replace('For ', '').toLowerCase()}.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="bg-white text-indigo-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-100">Book a demo</Link>
            <Link to="/pricing" className="border border-white text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10">See pricing</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
