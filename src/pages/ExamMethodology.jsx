import { Link } from 'react-router-dom'

// Copy for /exam/methodology — verbatim from Credibility_Layer_Drafts.md §1.
// Kept as semantic HTML (h1/h2/h3/p/ul/table) for accessibility + SEO.
export default function ExamMethodology() {
  return (
    <div className="bg-white">
      <article className="container-page pt-14 pb-20 sm:pt-20 max-w-3xl mx-auto">
        <header className="mb-10">
          <span className="chip">Exam methodology</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            How the Roots exams are built
          </h1>
        </header>

        <section className="prose-section">
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">Our commitment</h2>
          <p className="text-slate-700 leading-relaxed">
            Every certificate Roots issues carries a real proficiency claim. We take that seriously.
            This page explains — publicly — how we build our exams, how we score them, and how we
            determine the level that appears on your certificate. If you’re a school, a homeschool
            parent, or an employer evaluating a Roots credential, everything you need to trust our
            exams is here.
          </p>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">The two exams</h2>
          <p className="text-slate-700 leading-relaxed">
            <strong>RAQP — Roots Arabic Qur’an Proficiency</strong> (<Link to="/pathways-exam" className="link">/pathways-exam</Link>)
          </p>
          <p className="text-slate-700 leading-relaxed">
            A general Arabic and Qur’an language proficiency exam aligned to the CEFR framework
            (A1–C1). Ideal for placement, exit assessment, and general credentialing.
          </p>
          <p className="text-slate-700 leading-relaxed mt-4">
            <strong>RQAP — Roots Qur’anic Arabic Proficiency, Level 2 Asasi</strong> (<a href="/rqap.html" className="link">/rqap.html</a>)
          </p>
          <p className="text-slate-700 leading-relaxed">
            A rigorous, seven-section certification exam covering Tajweed Theory + Arabic Language at
            the Asasi (foundation) level. Designed for graduating students of the Roots Elementary
            program or comparable curricula.
          </p>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">Item design</h2>
          <p className="text-slate-700 leading-relaxed">
            Every exam question is written by Dina Mohamed Sayed El-Ahl (curriculum architect + Arabic
            and Qur’anic Studies educator). Every question is:
          </p>
          <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-6">
            <li><strong>Anchored in a source.</strong> No manufactured content. Vocabulary comes from Qur’anic text; grammar comes from established Arabic grammar tradition (Nahw); Tajweed rules come from classical Tajweed sources.</li>
            <li><strong>Reviewed for level-appropriateness.</strong> Each item is tagged to a target level (CEFR for RAQP, Roots track for RQAP) before it goes into the bank.</li>
            <li><strong>Free of giveaways.</strong> No question stem contains the answer verbatim. No two answer choices are duplicates or near-duplicates.</li>
            <li><strong>Culturally and religiously appropriate.</strong> No content that would trouble a Muslim family.</li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">Scoring</h2>
          <ul className="space-y-2 text-slate-700 list-disc pl-6">
            <li><strong>Multiple-choice items:</strong> binary correct/incorrect, weighted equally within a section unless otherwise noted.</li>
            <li><strong>Section percentages:</strong> each section’s score is reported as a percentage of possible points.</li>
            <li>
              <strong>Overall verdict:</strong> for RQAP, the verdict is one of Pass, Merit, or
              Distinction based on published cutoffs (see below). For RAQP, the verdict is the CEFR
              level (A1 / A2 / B1 / B2 / C1) determined by the score distribution across sections.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">Level cutoffs</h2>

          <h3 className="mt-5 mb-2 text-lg font-semibold text-slate-900">RQAP Level 2 Asasi</h3>
          <ul className="space-y-1.5 text-slate-700 list-disc pl-6">
            <li><strong>Distinction:</strong> ≥ 90% overall AND ≥ 80% in every section</li>
            <li><strong>Merit:</strong> ≥ 75% overall AND ≥ 65% in every section</li>
            <li><strong>Pass:</strong> ≥ 60% overall AND ≥ 50% in every section</li>
            <li><strong>Below Pass:</strong> a retake is available at any time</li>
          </ul>

          <h3 className="mt-6 mb-2 text-lg font-semibold text-slate-900">RAQP (CEFR-aligned)</h3>
          <ul className="space-y-1.5 text-slate-700 list-disc pl-6">
            <li><strong>C1:</strong> ≥ 90% overall on advanced-tagged items</li>
            <li><strong>B2:</strong> ≥ 75% overall on advanced items OR ≥ 90% on intermediate items</li>
            <li><strong>B1:</strong> ≥ 60% overall on intermediate items</li>
            <li><strong>A2:</strong> ≥ 60% overall on beginner items</li>
            <li><strong>A1:</strong> ≥ 40% overall on beginner items</li>
          </ul>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Full alignment matrix at{' '}
            <Link to="/exam/cefr-alignment" className="link">
              pathwayslearn.com/exam/cefr-alignment
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">
            What our certificates say and don’t say
          </h2>
          <p className="text-slate-700 leading-relaxed">
            <strong>They say:</strong> you took a specific exam on a specific date and achieved a
            specific level per our published rubric.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            <strong>They don’t say:</strong> you are a certified teacher, mufti, qari, or scholar.
            Roots is a curriculum publisher, not an accreditation body.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Every certificate carries a <strong>verifiable Cert ID</strong> (QR code +{' '}
            <code className="text-sm bg-slate-100 px-1.5 py-0.5 rounded">/verify/[cert-id]</code>{' '}
            public URL) so anyone can confirm authenticity.
          </p>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">
            Challenges, appeals, and reissues
          </h2>
          <ul className="space-y-2 text-slate-700 list-disc pl-6">
            <li>
              <strong>Challenge an item:</strong> if you believe a question was scored incorrectly,
              email <a href="mailto:hello@pathwayslearn.com" className="link">hello@pathwayslearn.com</a> with
              your Cert ID and the item number within 30 days of your exam. We’ll review and reissue
              your certificate if the challenge succeeds.
            </li>
            <li>
              <strong>Appeals:</strong> if you disagree with a level determination, we offer one free
              retake within 90 days.
            </li>
            <li>
              <strong>Reissues (name change, correction):</strong> email us. Free within 12 months of
              original issue; nominal fee thereafter.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">Version history</h2>
          <ul className="space-y-1.5 text-slate-700 list-disc pl-6">
            <li><strong>v1</strong> (July 2026): initial launch — RAQP CEFR-aligned + RQAP Level 2 Asasi</li>
          </ul>
        </section>

        <footer className="mt-14 pt-8 border-t border-slate-200 text-sm text-slate-600 italic">
          Questions about methodology? Email{' '}
          <a href="mailto:hello@pathwayslearn.com" className="link">hello@pathwayslearn.com</a>.
        </footer>
      </article>
    </div>
  )
}
