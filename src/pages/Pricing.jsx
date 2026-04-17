import { useState } from 'react'
import { Link } from 'react-router-dom'
import { packages, lmsFeatures, getFeature } from '../data/lms.js'

function priceLabel(p, billing) {
  if (p.priceAnnual === 0) return 'Free'
  if (p.priceAnnual === null) return 'Custom'
  if (p.priceUnit) return `$${p.priceAnnual} ${p.priceUnit}`
  return billing === 'annual'
    ? `$${Math.round(p.priceAnnual / 12)} / mo`
    : `$${p.priceMonthly} / mo`
}

export default function Pricing() {
  const [billing, setBilling] = useState('annual')

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <span className="text-sm text-indigo-600 font-semibold uppercase tracking-wide">Pricing</span>
        <h1 className="text-4xl font-bold mt-2 mb-3">One platform. Packages for every educator.</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Start free as a single teacher, scale to a school, deploy across a district or university.
          All tiers include the AI tutor and are COPPA / FERPA / GDPR compliant by design.
        </p>
      </div>

      {/* Billing toggle */}
      <div className="flex justify-center mb-10">
        <div className="bg-gray-100 rounded-full p-1 inline-flex">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${billing === 'monthly' ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${billing === 'annual' ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
          >
            Annual <span className="text-xs text-green-600 ml-1">Save 17%</span>
          </button>
        </div>
      </div>

      {/* Package cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
        {packages.map(p => (
          <div
            key={p.slug}
            className={`rounded-2xl border p-6 flex flex-col ${p.highlight ? 'border-indigo-500 shadow-lg bg-white ring-2 ring-indigo-100' : 'border-gray-200 bg-white'}`}
          >
            {p.highlight && (
              <div className="text-xs uppercase tracking-wide font-bold text-indigo-600 mb-2">★ Most popular</div>
            )}
            <div className="text-xs text-gray-500 uppercase tracking-wide">{p.audience}</div>
            <h3 className="text-2xl font-bold mt-1 mb-2">{p.name}</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">{priceLabel(p, billing)}</div>
            <div className="text-sm text-gray-500 mb-4">{p.seats}</div>
            <p className="text-gray-600 text-sm mb-4 flex-1">{p.description}</p>
            <ul className="space-y-2 mb-6">
              {p.highlights.map(h => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <span className="text-indigo-600 mt-0.5">✓</span>
                  <span className="text-gray-700">{h}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className={`block text-center font-medium px-4 py-2.5 rounded-xl transition ${p.highlight ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Feature comparison matrix */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-2">Compare every feature</h2>
        <p className="text-gray-600 text-center mb-8">Everything included in each package.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Feature</th>
                {packages.map(p => (
                  <th key={p.slug} className="p-4 text-sm font-semibold text-gray-700 text-center min-w-[130px]">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lmsFeatures.map(f => (
                <tr key={f.id} className="border-t border-gray-100">
                  <td className="p-4 text-sm">
                    <div className="font-medium text-gray-900">{f.icon} {f.title}</div>
                    <div className="text-xs text-gray-500 mt-1 max-w-xs">{f.description}</div>
                  </td>
                  {packages.map(p => (
                    <td key={p.slug} className="p-4 text-center">
                      {p.features.includes(f.id) ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {/* Limits row */}
              <tr className="border-t-2 border-gray-200 bg-gray-50">
                <td className="p-4 text-sm font-semibold">Classrooms</td>
                {packages.map(p => (
                  <td key={p.slug} className="p-4 text-center text-sm">{p.limits.classrooms}</td>
                ))}
              </tr>
              <tr className="border-t border-gray-100 bg-gray-50">
                <td className="p-4 text-sm font-semibold">Students</td>
                {packages.map(p => (
                  <td key={p.slug} className="p-4 text-center text-sm">{p.limits.students}</td>
                ))}
              </tr>
              <tr className="border-t border-gray-100 bg-gray-50">
                <td className="p-4 text-sm font-semibold">Storage</td>
                {packages.map(p => (
                  <td key={p.slug} className="p-4 text-center text-sm">{p.limits.storage}</td>
                ))}
              </tr>
              <tr className="border-t border-gray-100 bg-gray-50">
                <td className="p-4 text-sm font-semibold">AI Tutor messages</td>
                {packages.map(p => (
                  <td key={p.slug} className="p-4 text-center text-sm">{p.limits.aiTutorMessages}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Pricing questions, answered</h2>
        <div className="space-y-4">
          {[
            ['Can I start free?', 'Yes — Teacher Starter is free forever, no credit card required. You can upgrade to Pro or invite your school at any time.'],
            ['Do you offer non-profit & public-school discounts?', 'Yes. Qualified K-12 public schools receive a 25% discount, and registered non-profits receive 40% off annual plans.'],
            ['Is my data safe?', 'Student data is never used to train third-party AI models. Pathways is COPPA, FERPA, and GDPR compliant, with optional EU / US / UAE data residency on Enterprise plans.'],
            ['What payment methods do you accept?', 'Credit card, ACH, SEPA, wire transfer, and purchase orders. Annual invoicing is available for school and university plans.'],
          ].map(([q, a]) => (
            <details key={q} className="bg-white border border-gray-200 rounded-xl p-5 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                {q}
                <span className="text-indigo-600 group-open:rotate-45 transition">+</span>
              </summary>
              <p className="text-gray-600 text-sm mt-3">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
