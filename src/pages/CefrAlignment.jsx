import { Link } from 'react-router-dom'

// Copy for /exam/cefr-alignment — verbatim from CEFR_Alignment.md.
// PDF version at /roots-cefr-alignment.pdf (also linked at top of page).
export default function CefrAlignment() {
  return (
    <div className="bg-white">
      <article className="container-page pt-14 pb-20 sm:pt-20 max-w-3xl mx-auto">
        <header className="mb-8">
          <span className="chip">Exam alignment</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            RAQP — CEFR Alignment Document
          </h1>
          <p className="mt-4 text-slate-700 italic">
            Roots Arabic Qur’an Proficiency Exam (<Link to="/pathways-exam" className="link">/pathways-exam</Link>)
            mapped to the Common European Framework of Reference for Languages (CEFR).
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Published by Roots | جذور. Prepared 2026-07-15.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/roots-cefr-alignment.pdf"
              className="btn-primary"
              download
            >
              📄 Download PDF
            </a>
            <Link to="/exam/methodology" className="btn-secondary">
              See exam methodology
            </Link>
          </div>
        </header>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">What this document is</h2>
          <p className="text-slate-700 leading-relaxed">
            The <strong>RAQP</strong> (Roots Arabic Qur’an Proficiency exam) is a general proficiency
            exam in Modern Standard Arabic and Qur’anic Arabic vocabulary. Every question is tagged
            to a <strong>CEFR level</strong> (A1, A2, B1, or B2) at the time it enters the item bank.
            This document is the public record of how that mapping is made, so any school, employer,
            or evaluator can verify that a Roots CEFR level claim is honest.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            The RAQP does <strong>not</strong> award C1 or C2 at present. C1/C2 claims require an
            oral/production component that a fully-multiple-choice exam cannot rigorously assess. A
            future oral extension of the RAQP will make C1/C2 possible; this document will be updated
            when that ships.
          </p>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">Structure of the exam bank</h2>
          <p className="text-slate-700 leading-relaxed">
            The current RAQP bank contains <strong>240 items</strong> across four CEFR levels and
            four school-type variants:
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="p-3 border border-slate-200 font-semibold">CEFR Level</th>
                  <th className="p-3 border border-slate-200 font-semibold">Roots Name (Arabic)</th>
                  <th className="p-3 border border-slate-200 font-semibold text-right">Warm-up items</th>
                  <th className="p-3 border border-slate-200 font-semibold text-right">Exam items</th>
                  <th className="p-3 border border-slate-200 font-semibold text-right">Total per level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-slate-200">A1</td>
                  <td className="p-3 border border-slate-200">مُبْتَدِئ <em>(Mubtadi — Beginner)</em></td>
                  <td className="p-3 border border-slate-200 text-right">20</td>
                  <td className="p-3 border border-slate-200 text-right">40</td>
                  <td className="p-3 border border-slate-200 text-right">60</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200">A2</td>
                  <td className="p-3 border border-slate-200">أَسَاسِي <em>(Asasi — Foundation)</em></td>
                  <td className="p-3 border border-slate-200 text-right">20</td>
                  <td className="p-3 border border-slate-200 text-right">40</td>
                  <td className="p-3 border border-slate-200 text-right">60</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200">B1</td>
                  <td className="p-3 border border-slate-200">مُتَوَسِّط <em>(Mutawassit — Intermediate)</em></td>
                  <td className="p-3 border border-slate-200 text-right">20</td>
                  <td className="p-3 border border-slate-200 text-right">40</td>
                  <td className="p-3 border border-slate-200 text-right">60</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200">B2</td>
                  <td className="p-3 border border-slate-200">مُتَقَدِّم <em>(Mutaqaddim — Advanced)</em></td>
                  <td className="p-3 border border-slate-200 text-right">20</td>
                  <td className="p-3 border border-slate-200 text-right">40</td>
                  <td className="p-3 border border-slate-200 text-right">60</td>
                </tr>
                <tr className="bg-slate-50 font-semibold">
                  <td className="p-3 border border-slate-200">Total</td>
                  <td className="p-3 border border-slate-200"></td>
                  <td className="p-3 border border-slate-200 text-right">80</td>
                  <td className="p-3 border border-slate-200 text-right">160</td>
                  <td className="p-3 border border-slate-200 text-right">240</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-slate-700 leading-relaxed">
            Every level is further stratified into four school-type variants —{' '}
            <strong>Primary (ages 5–11), Middle (ages 11–14), High School (ages 14–18), and Adult (18+)</strong>{' '}
            — so the same CEFR level asks age-appropriate questions of a 7-year-old, a 12-year-old, a
            16-year-old, and a 30-year-old. The CEFR claim (A1 through B2) is the{' '}
            <em>language proficiency</em> claim; the school-type variant only changes the
            presentation, not the level of difficulty.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Exam items also carry a <strong>topic tag</strong>: vocabulary, grammar, reading, or
            Qur’an. Warm-up items are un-tagged (they exist to acclimate the student to the interface).
          </p>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">
            CEFR “can-do” descriptors and RAQP mapping
          </h2>
          <p className="text-slate-700 leading-relaxed">
            CEFR level descriptors are the property of the Council of Europe (see{' '}
            <em>
              Common European Framework of Reference for Languages: Learning, teaching, assessment
            </em>
            , Companion Volume, 2020). Below is the standard descriptor for each level, alongside the
            specific RAQP evidence used to confirm placement.
          </p>

          <CefrLevelBlock
            heading="A1 — Beginner (Mubtadi | مُبْتَدِئ)"
            descriptor='"Can understand and use familiar everyday expressions and very basic phrases aimed at the satisfaction of needs of a concrete type. Can introduce him/herself and others and can ask and answer questions about personal details such as where he/she lives, people he/she knows and things he/she has. Can interact in a simple way provided the other person talks slowly and clearly and is prepared to help."'
            evidence={[
              'Recognizes and pronounces the 28 letters of the Arabic alphabet in their isolated and connected forms',
              'Reads short vowels (fatha, kasra, damma), sukoon, and shaddah in isolated words',
              'Recognizes ~150 high-frequency vocabulary items (family, home, food, common actions)',
              'Identifies simple sentence structure (subject + predicate; nominative case)',
              'Matches basic Qur’anic words to their meanings (بيت, يوم, نور, ماء)',
            ]}
            examplePrompt="ما معنى كلمة (بَيْت)؟"
            exampleOptions={['a) مدرسة', 'b) بيت', 'c) سيارة', 'd) كتاب']}
          />

          <CefrLevelBlock
            heading="A2 — Foundation (Asasi | أَسَاسِي)"
            descriptor='"Can understand sentences and frequently used expressions related to areas of most immediate relevance (e.g. very basic personal and family information, shopping, local geography, employment). Can communicate in simple and routine tasks requiring a simple and direct exchange of information on familiar and routine matters. Can describe in simple terms aspects of his/her background, immediate environment and matters in immediate need."'
            evidence={[
              'Reads short paragraphs on familiar topics and answers comprehension questions',
              'Recognizes ~400 vocabulary items including basic verb forms in the past and present',
              'Identifies gender (masculine/feminine) and number (singular/dual/plural)',
              'Understands definite article (ال) and its Qur’anic solar/lunar (Shamsiyah/Qamariyah) applications',
              'Recognizes basic Tajweed rules of Madd, Ghunnah, and simple stopping (waqf)',
              'Reads simple Qur’anic phrases and identifies meaning at the phrase level',
            ]}
            examplePrompt='Read the following: "الطَّالِبُ يَذْهَبُ إِلَى المَدْرَسَة". What is the student doing?'
            exampleOptions={['a) sleeping', 'b) going to school', 'c) eating', 'd) reading']}
          />

          <CefrLevelBlock
            heading="B1 — Intermediate (Mutawassit | مُتَوَسِّط)"
            descriptor='"Can understand the main points of clear standard input on familiar matters regularly encountered in work, school, leisure, etc. Can deal with most situations likely to arise whilst travelling in an area where the language is spoken. Can produce simple connected text on topics which are familiar or of personal interest. Can describe experiences and events, dreams, hopes and ambitions and briefly give reasons and explanations for opinions and plans."'
            evidence={[
              'Reads and comprehends multi-paragraph texts including narrative and expository styles',
              'Recognizes ~1,200 vocabulary items across a wider semantic range (education, work, environment, ethics)',
              'Identifies verb forms across all tenses (past, present, imperative) and derived forms (Form II, III, IV, V, VI, VII, VIII, X)',
              'Understands common Qur’anic themes and matches short surahs (from Juz ‘Amma) to their central themes',
              'Applies Tajweed rules of Idgham, Iqlab, Ikhfa, and the various types of Madd',
              'Reads Qur’anic verses with appropriate stopping (waqf) and identifies the meaning at the verse level',
            ]}
            examplePrompt='اقرأ السورة التالية: "إنَّا أَعْطَيْنَاكَ الْكَوْثَرَ". What is the primary theme of Surah Al-Kawthar?'
            exampleOptions={[
              'a) the story of Nuh',
              'b) charity to orphans',
              'c) the abundant gift granted to the Prophet ﷺ',
              'd) rules of fasting',
            ]}
          />

          <CefrLevelBlock
            heading="B2 — Advanced (Mutaqaddim | مُتَقَدِّم)"
            descriptor='"Can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in his/her field of specialisation. Can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible without strain for either party. Can produce clear, detailed text on a wide range of subjects and explain a viewpoint on a topical issue giving the advantages and disadvantages of various options."'
            evidence={[
              'Reads and comprehends extended classical and modern texts including tafsir excerpts, hadith, and modern MSA prose',
              'Recognizes ~2,500 vocabulary items including specialized Islamic terminology',
              'Identifies the full case system (nominative, accusative, genitive) in complex clauses',
              'Understands classical grammar concepts including ‘irab (case analysis) and sentence-level parsing (i’rab al-jumla)',
              'Applies advanced Tajweed rules including subtle articulation of tafkhim/tarqiq (heavy/light letters), the distinctions of Raa and Lam',
              'Reads longer Qur’anic passages (multi-verse) and identifies theme, structure, and rhetorical devices',
              'Recognizes common Qur’anic morphological patterns (masdar, ism al-fa’il, ism al-maf’ul) and traces them to verbal roots',
            ]}
            examplePrompt='اقرأ التالي: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ". Which of the following best describes the rhetorical structure of this verse?'
            exampleOptions={[
              'a) simple negation',
              'b) parallel imperative construction',
              'c) conditional statement',
              'd) rhetorical question',
            ]}
          />
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">
            Scoring and level determination
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Every candidate takes the RAQP at their <strong>chosen entry level</strong>. From there:
          </p>
          <ul className="mt-4 space-y-2 text-slate-700 list-disc pl-6">
            <li>
              <strong>A1 (Beginner) candidates</strong> must achieve ≥ 60% on A1 items to receive an
              A1-verified certificate. Below 60%, the certificate reads “Pre-A1 / In Progress” and a
              specific retake is scheduled.
            </li>
            <li>
              <strong>A2 candidates</strong> need ≥ 60% overall AND ≥ 50% on A2-specific
              vocabulary/grammar items.
            </li>
            <li>
              <strong>B1 candidates</strong> need ≥ 60% overall AND ≥ 50% on B1-specific items AND
              ≥ 65% on A2 items (proving the earlier level is solid).
            </li>
            <li>
              <strong>B2 candidates</strong> need ≥ 60% overall AND ≥ 50% on B2-specific items AND
              ≥ 65% on B1 items.
            </li>
          </ul>
          <p className="mt-4 text-slate-700 leading-relaxed">
            <strong>Certificate uses the highest level for which the candidate meets all cutoffs.</strong>{' '}
            So a candidate who signs up for B2 but only hits the A2 cutoff receives an A2 certificate
            — never a B2 certificate they didn’t earn. This is the CEFR discipline: a claim is only
            made when the evidence supports it.
          </p>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">
            What a Roots CEFR certificate does and does not entitle
          </h2>
          <p className="text-slate-700 leading-relaxed">
            <strong>
              A Roots CEFR-A1 through CEFR-B2 certificate confirms that on a specific date, the
              candidate demonstrated the specified level of Arabic and Qur’anic Arabic proficiency on
              the RAQP exam.
            </strong>
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            It <strong>does</strong> provide a portable, verifiable statement that any teacher,
            evaluator, or admissions officer can trust as a placement signal.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            It <strong>does not</strong> confer:
          </p>
          <ul className="mt-2 space-y-1.5 text-slate-700 list-disc pl-6">
            <li>Teaching qualification (that requires teacher training + pedagogy certification separately)</li>
            <li>Ijazah in recitation (that requires oral chain of transmission)</li>
            <li>Diploma from a formal higher-education institution</li>
            <li>Legal equivalence to state-issued language proficiency documents in any country</li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">How this alignment was built</h2>
          <p className="text-slate-700 leading-relaxed">
            Every item in the RAQP bank was independently reviewed against the CEFR descriptor for
            the target level using this methodology:
          </p>
          <ol className="mt-4 space-y-2 text-slate-700 list-decimal pl-6">
            <li><strong>Descriptor match</strong> — the item’s underlying language task was mapped to specific “can-do” verbs in the CEFR descriptor.</li>
            <li><strong>Vocabulary check</strong> — the vocabulary bank of the item was cross-checked against the recommended lexical range for that CEFR level in Arabic-language CEFR studies (see Al-Batal, 2018; Alosh &amp; Clark, 2013).</li>
            <li><strong>Grammar check</strong> — the grammatical structures involved were cross-checked against Arabic CEFR grammar progression tables published by the American Council on the Teaching of Foreign Languages (ACTFL) for Arabic.</li>
            <li><strong>Second reviewer</strong> — every item was reviewed by a second native-Arabic-speaking educator before entering the bank.</li>
            <li><strong>Field piloting</strong> — items were piloted with students of known proficiency levels before being flagged as final.</li>
          </ol>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Items that failed any of these checks were revised or removed. The current bank of 240
            items is the surviving set.
          </p>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">Version, review, and challenge</h2>
          <ul className="space-y-2 text-slate-700 list-disc pl-6">
            <li><strong>This document version:</strong> v1, published 2026-07-15</li>
            <li><strong>RAQP item bank version:</strong> v1 (240 items)</li>
            <li><strong>Independent review:</strong> <em>Pending</em> — Roots is inviting Arabic-language pedagogy experts to review this alignment publicly. Named reviewers will be added here as they contribute.</li>
          </ul>
          <p className="mt-4 text-slate-700 leading-relaxed">
            <strong>To challenge a specific CEFR tagging on an RAQP item:</strong> email{' '}
            <a href="mailto:roots@pathwayslearn.com" className="link">roots@pathwayslearn.com</a> with the
            item ID (visible in the exam interface) and your reasoning. All challenges are reviewed
            and either accepted (item retagged, next bank version published) or answered with a
            public rationale.
          </p>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">References</h2>
          <ul className="space-y-2 text-slate-700 list-disc pl-6">
            <li>Council of Europe. (2020). <em>Common European Framework of Reference for Languages: Learning, teaching, assessment — Companion Volume.</em> Strasbourg: Council of Europe Publishing.</li>
            <li>Al-Batal, M. (Ed.). (2018). <em>Arabic as one language: Integrating dialect in the Arabic language curriculum.</em> Georgetown University Press.</li>
            <li>Alosh, M., &amp; Clark, A. (2013). <em>Ahlan wa Sahlan: Functional modern standard Arabic for beginners.</em> Yale University Press.</li>
            <li>ACTFL. (2012). <em>Proficiency Guidelines.</em> Alexandria, VA: American Council on the Teaching of Foreign Languages.</li>
          </ul>
        </section>

        <footer className="mt-14 pt-8 border-t border-slate-200 text-sm text-slate-600 italic">
          Roots | جذور publishes this document freely and welcomes redistribution with attribution.
        </footer>
      </article>
    </div>
  )
}

function CefrLevelBlock({ heading, descriptor, evidence, examplePrompt, exampleOptions }) {
  return (
    <div className="mt-8 rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-6">
      <h3 className="text-xl font-semibold text-slate-900 mb-4">{heading}</h3>

      <div className="mb-4">
        <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">
          Standard CEFR descriptor
        </div>
        <blockquote className="text-sm text-slate-700 italic border-l-4 border-brand-200 pl-4">
          {descriptor}
        </blockquote>
      </div>

      <div className="mb-4">
        <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">
          RAQP evidence
        </div>
        <ul className="space-y-1.5 text-sm text-slate-700 list-disc pl-6">
          {evidence.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">
          Example item type
        </div>
        <div className="rounded-xl bg-white ring-1 ring-slate-200 p-4 text-sm">
          <p className="text-slate-800 mb-2">{examplePrompt}</p>
          <ul className="space-y-1 text-slate-700">
            {exampleOptions.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
