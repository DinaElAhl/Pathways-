// Copy for /curriculum/sources — verbatim from Credibility_Layer_Drafts.md §2.
export default function CurriculumSources() {
  return (
    <div className="bg-white">
      <article className="container-page pt-14 pb-20 sm:pt-20 max-w-3xl mx-auto">
        <header className="mb-10">
          <span className="chip">Curriculum sources</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Roots curriculum sources
          </h1>
        </header>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">Why this page exists</h2>
          <p className="text-slate-700 leading-relaxed">
            Every claim in a curriculum should be traceable. Every Tajweed rule, every grammar point,
            every reading progression in Roots is drawn from an established source. This page lists
            them — in English and Arabic where relevant — so parents, teachers, and evaluators can
            independently verify the tradition Roots stands on.
          </p>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">Qur’anic recitation</h2>
          <ul className="space-y-2 text-slate-700 list-disc pl-6">
            <li><strong>Hafs ‘an ‘Asim</strong> recension — the recitation Roots teaches (the most widely-taught worldwide today).</li>
            <li><strong>Mushaf al-Madinah</strong> — the printed Qur’an conventions Roots follows for text presentation.</li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">Tajweed rules</h2>
          <ul className="space-y-2 text-slate-700 list-disc pl-6">
            <li><strong>Ibn al-Jazari</strong> (d. 833 AH) — <em>Al-Muqaddima al-Jazariyya</em> and <em>An-Nashr fi’l-Qira’at al-‘Ashr</em>. The classical foundation.</li>
            <li><strong>Al-Marsafi</strong>, <em>Hidayat al-Qari</em> — modern reference commonly used in Egyptian Tajweed pedagogy.</li>
            <li><strong>Ayman Rushdi Suwayd</strong>, contemporary Tajweed lectures — used for pronunciation and articulation modeling.</li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">
            Arabic grammar (Nahw &amp; Sarf)
          </h2>
          <ul className="space-y-2 text-slate-700 list-disc pl-6">
            <li><strong>Ibn Ajurrum</strong> (d. 723 AH) — <em>Al-Ajurrumiyya</em>. Foundation grammar text.</li>
            <li><strong>Ibn Malik</strong> (d. 672 AH) — <em>Alfiyyat Ibn Malik</em>. For intermediate/advanced grammar.</li>
            <li><strong>Ibn Hisham al-Ansari</strong> (d. 761 AH) — <em>Sharh Qatr an-Nada</em>. For applied grammar.</li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">
            Arabic vocabulary + reading pedagogy
          </h2>
          <ul className="space-y-2 text-slate-700 list-disc pl-6">
            <li><strong>Al-Bukhari &amp; Muslim</strong> — for authentic hadith vocabulary appearing in Roots readers.</li>
            <li><strong>Ministry of Education, Arab Republic of Egypt</strong> — primary and preparatory Arabic language standards (2020 revision) used as a reference for age-appropriate scope.</li>
            <li><strong>Modern Standard Arabic (MSA)</strong> conventions per the Arab Academy in Cairo.</li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">
            Islamic Studies / character (for Roots of Mercy)
          </h2>
          <ul className="space-y-2 text-slate-700 list-disc pl-6">
            <li><strong>Sahih al-Bukhari</strong>, Sahih Muslim, Sunan Abi Dawud, Sunan an-Nasa’i, Jami‘ at-Tirmidhi, Sunan Ibn Majah, Musnad Ahmad.</li>
            <li><strong>Ibn Hisham</strong>, <em>Sirat an-Nabi ﷺ</em>.</li>
            <li><strong>Ibn Kathir</strong>, <em>Al-Bidaya wa’n-Nihaya</em> and <em>Tafsir al-Qur’an al-‘Azim</em>.</li>
            <li><strong>Ibn Sa‘d</strong>, <em>Tabaqat al-Kubra</em> — biographical data.</li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">Educational design</h2>
          <ul className="space-y-2 text-slate-700 list-disc pl-6">
            <li><strong>Common European Framework of Reference for Languages (CEFR)</strong> — for language proficiency alignment on the RAQP exam.</li>
            <li><strong>ACTFL Proficiency Guidelines</strong> — for cross-checking proficiency descriptors.</li>
            <li><strong>Understanding by Design</strong> (Wiggins &amp; McTighe) — instructional design methodology.</li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 mb-3 text-2xl sm:text-3xl font-bold tracking-tight">What Roots is not built on</h2>
          <ul className="space-y-2 text-slate-700 list-disc pl-6">
            <li>Any AI-generated content. Every lesson is authored by a working educator.</li>
            <li>Any weak or fabricated hadith. Sources cited by number so evaluators can verify authenticity.</li>
            <li>Any single teacher’s opinion presented as consensus.</li>
          </ul>
        </section>

        <footer className="mt-14 pt-8 border-t border-slate-200 text-sm text-slate-600 italic">
          If you believe we’ve missed a source or misattributed one, email{' '}
          <a href="mailto:roots@pathwayslearn.com" className="link">roots@pathwayslearn.com</a>.
          We’ll correct and republish within 7 days.
        </footer>
      </article>
    </div>
  )
}
