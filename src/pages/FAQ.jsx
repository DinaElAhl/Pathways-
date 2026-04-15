import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

const groups = [
  {
    topic: 'Getting started',
    items: [
      {
        q: 'Who is Pathways for?',
        a: (
          <>
            Everyone in the education ecosystem: learners, teachers, parents, schools,
            and educators. The <Link to="/" className="link">homepage</Link> and the
            audience hubs under <em>For you</em> in the nav are the fastest way to
            find what's made for you.
          </>
        ),
      },
      {
        q: 'Do I need an account to browse?',
        a: 'No — browsing resources, pathways, and events is open to everyone. You\u2019ll only create an account when you enroll, RSVP, or download something.',
      },
      {
        q: 'How much does it cost?',
        a: 'Most resources are free. Pathways and some specialized tools have a price listed on their detail pages. Schools and districts typically work with us through partnership plans.',
      },
    ],
  },
  {
    topic: 'Learners',
    items: [
      {
        q: 'How are pathways different from courses?',
        a: 'A pathway is a full journey — multiple modules, real projects, mentor support, and a portfolio-ready result. A course is usually a single subject taught in a few hours.',
      },
      {
        q: 'Can I go at my own pace?',
        a: 'Yes. Most pathways run as cohorts with gentle weekly goals, but deadlines are flexible and materials stay accessible after your cohort ends.',
      },
      {
        q: 'Do I get a certificate?',
        a: 'Yes — you receive a Pathways certificate on completion. More importantly, you graduate with real projects you can show.',
      },
    ],
  },
  {
    topic: 'Teachers & educators',
    items: [
      {
        q: 'Can I use Pathways resources in my classroom?',
        a: 'Yes — most resources are free to use with your students. Paid resources include a classroom-use license by default.',
      },
      {
        q: 'Can I contribute my own resources?',
        a: (
          <>
            Absolutely. Apply at{' '}
            <Link to="/apply/educator" className="link">
              Become a Pathways educator
            </Link>
            . We'll pair you with an editor and help you ship your first resource.
          </>
        ),
      },
      {
        q: 'Do you offer professional development?',
        a: 'Yes — live PD workshops for individuals, and multi-session PD pathways for whole schools or districts through partnerships.',
      },
    ],
  },
  {
    topic: 'Schools & institutions',
    items: [
      {
        q: 'How do partnerships work?',
        a: (
          <>
            Every partnership is co-designed with your team. Start by requesting a
            proposal via <Link to="/apply/partner" className="link">Partner with us</Link>.
          </>
        ),
      },
      {
        q: 'Can we customize pathways for our community?',
        a: 'Yes. We regularly build custom pathways with partner schools, districts, and companies — often combining our library with your internal content.',
      },
      {
        q: 'What data do we get?',
        a: 'Admins see cohort-level analytics (enrollment, progress, engagement) with privacy-respecting defaults. Learner-level data is shared only with informed consent.',
      },
    ],
  },
  {
    topic: 'Parents & families',
    items: [
      {
        q: 'Is Pathways safe for kids?',
        a: 'Family-focused resources are designed for parents and children together. We don\u2019t target ads at children and we mark age-appropriateness on every family resource.',
      },
      {
        q: 'Can I use Pathways for homeschooling?',
        a: 'Yes — many homeschool families use our weekly planners, guides, and unit plans. The Parents hub curates the best ones.',
      },
    ],
  },
  {
    topic: 'Privacy, access & support',
    items: [
      {
        q: 'How do you handle my data?',
        a: 'We collect the minimum needed to run the service. We don\u2019t sell personal data. You can request an export or deletion anytime.',
      },
      {
        q: 'Are events accessible?',
        a: 'Yes — live events include automatic captions, we honor screen readers throughout the site, and we publish transcripts for webinars after the fact.',
      },
      {
        q: 'I have a question not answered here.',
        a: (
          <>
            Please <Link to="/contact" className="link">reach out</Link> — a human
            replies within two business days.
          </>
        ),
      },
    ],
  },
]

export default function FAQ() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return groups
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (i) =>
            i.q.toLowerCase().includes(q) ||
            (typeof i.a === 'string' && i.a.toLowerCase().includes(q)),
        ),
      }))
      .filter((g) => g.items.length > 0)
  }, [query])

  return (
    <>
      <section className="bg-gradient-to-b from-brand-50/80 to-white">
        <div className="container-page pt-14 pb-10 sm:pt-20">
          <span className="chip">Help & FAQ</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Questions, answered.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            The honest answers to the things people ask us most. Can't find yours?
            <Link to="/contact" className="link ml-1">Get in touch</Link>.
          </p>

          <div className="relative mt-6 max-w-md">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Icon name="search" className="h-4 w-4" strokeWidth={2} />
            </span>
            <label htmlFor="faq-search" className="sr-only">
              Search the FAQ
            </label>
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full rounded-full border-0 bg-white pl-9 pr-4 py-2.5 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-12 pb-20 space-y-10">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              No questions match &ldquo;{query}&rdquo;.
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Try a different word — or reach out directly.
            </p>
            <Link to="/contact" className="btn-secondary mt-5">
              Ask us anything
            </Link>
          </div>
        )}
        {filtered.map((g) => (
          <div key={g.topic}>
            <h2 className="text-xl font-bold tracking-tight">{g.topic}</h2>
            <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {g.items.map((item, i) => (
                <details
                  key={item.q}
                  className="group px-5 py-4"
                  open={Boolean(query) && i === 0}
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-4 list-none">
                    <span className="text-sm font-medium text-slate-900">
                      {item.q}
                    </span>
                    <Icon
                      name="chevronDown"
                      className="mt-1 h-4 w-4 flex-none text-slate-500 transition-transform group-open:rotate-180"
                      strokeWidth={2}
                    />
                  </summary>
                  <div className="mt-3 pr-6 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
          <h2 className="text-xl font-bold">Still stuck?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            Send us a note and a real human (who knows the product) will reply.
          </p>
          <Link to="/contact" className="btn-primary mt-5 px-6 py-3">
            Contact us
          </Link>
        </div>
      </section>
    </>
  )
}
