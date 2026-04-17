import { Link } from 'react-router-dom'
import { lmsFeatures, lmsAudiences, packages } from '../data/lms.js'

export default function LMS() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <span className="inline-block text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/15 border border-white/30 mb-4">
            Pathways LMS — now in public beta
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            The learning platform built for<br/> the AI-native classroom.
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Pathways LMS gives teachers, schools, and universities a modern, privacy-first
            platform with AI tutoring, AI-assisted grading, analytics, SSO, and LTI — all
            in one place.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/pricing" className="bg-white text-indigo-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-100 transition">
              See packages & pricing
            </Link>
            <Link to="/lms/schools" className="border border-white/60 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition">
              For schools →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-left">
            {[
              ['12k+', 'Active classrooms'],
              ['380k+', 'Learners reached'],
              ['99.95%', 'Uptime SLA'],
              ['COPPA · FERPA · GDPR', 'Compliant by design'],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl font-bold">{v}</div>
                <div className="text-sm text-white/80">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience cards */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Built for every kind of educator</h2>
          <p className="text-gray-600">Pick the experience that fits your institution.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {lmsAudiences.map(a => (
            <Link
              key={a.slug}
              to={`/lms/${a.slug}`}
              className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-indigo-300 transition"
            >
              <div className="text-sm text-indigo-600 font-semibold uppercase tracking-wide mb-2">
                {a.title}
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-700">
                {a.hero}
              </h3>
              <p className="text-gray-600 mb-4">{a.description}</p>
              <span className="text-indigo-600 font-medium group-hover:underline">
                Explore {a.title.toLowerCase()} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-sm text-indigo-600 font-semibold uppercase tracking-wide">Platform</span>
            <h2 className="text-3xl font-bold mt-2 mb-2">Everything an LMS should be — and more.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A complete learning management system, with AI woven through every workflow.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {lmsFeatures.map(f => (
              <div key={f.id} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages preview */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Packages that scale with you</h2>
          <p className="text-gray-600">From a single teacher to a whole district.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {packages.map(p => (
            <Link
              key={p.slug}
              to="/pricing"
              className={`rounded-2xl p-6 border transition hover:shadow-md ${p.highlight ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white'}`}
            >
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{p.audience}</div>
              <div className="font-bold text-lg mb-1">{p.name}</div>
              <div className="text-sm text-indigo-600 mb-3">{p.badge}</div>
              <div className="text-gray-600 text-sm line-clamp-3">{p.description}</div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/pricing" className="inline-block bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-indigo-700 transition">
            Compare all packages →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-700 to-violet-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to bring Pathways to your classroom?</h2>
          <p className="text-white/90 mb-6">Start free today, or talk to us about a school- or university-wide rollout.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/pricing" className="bg-white text-indigo-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-100">
              Start free
            </Link>
            <Link to="/contact" className="border border-white text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10">
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
