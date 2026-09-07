// Audience groups — who Roots is for, and what we actually have for them.
//
// Each entry drives one /for/<slug> page (src/pages/AudiencePage.jsx). Navbar,
// Footer, Resources and ResourceDetail read `slug` + `name` from here too.
//
// `featured` is deliberately self-contained rather than filtered out of
// src/data/resources.js: these pages must only ever surface real Roots work.
// Every item is either shipping today (status: 'live') or named honestly as
// roadmap with its date attached (status: 'roadmap'). Nothing speculative is
// written as if it already exists.

export const audiences = [
  {
    slug: 'learners',
    name: 'Learners',
    eyebrow: 'For learners',
    icon: 'target',
    color: 'from-brand-500 to-brand-700',
    headline: 'You can recite it. You want to understand it.',
    sub: 'For students, self-study adults, and homeschooled kids learning Arabic and Qur’an.',
    intro: [
      'Roots starts at the Arabic alphabet and walks to reading Qur’anic verses with tajweed. No prior Arabic is assumed anywhere in it.',
      'Every lesson carries English and Arabic together — drafted side by side, not run through a translator — so you are never guessing what a rule actually means.',
      'Juz’ 30 is the ground we build on: a small enough field to know deeply, and enough Qur’an to carry you through a lifetime of prayer.',
    ],
    highlights: [
      'Five reading lessons that go alphabet → letter sounds → joining letters → vowel marks → reading with tajweed. $4 a lesson, $15 for all five.',
      'A proficiency exam you can sit without ever having used Roots — CEFR-aligned A1–B2, fifteen questions, and a certificate anyone can check.',
      'Every rule traced to a named source: Ibn al-Jazari, Al-Marsafi and Ayman Suwayd for tajweed; Ibn Ajurrum and Ibn Malik for grammar.',
      'Six stages inside every lesson — Āyah, Tafakkur, Tamyīz, Tawḥīd, ʿAmal, Shukr — so reciting, understanding, and living it aren’t three separate subjects.',
    ],
    featured: [
      {
        to: '/shop',
        status: 'live',
        eyebrow: 'On Payhip & Gumroad',
        title: 'Roots Tajweed Reading Series',
        body: 'Five PDF lessons from the alphabet to fluent Qur’anic reading. $4 per lesson, $15 for the bundle.',
        cta: 'Browse the Shop',
      },
      {
        to: '/pathways-exam',
        status: 'live',
        eyebrow: 'CEFR-aligned · published methodology',
        title: 'Roots Arabic & Qur’an Proficiency Exam (RAQP)',
        body: 'Fifteen questions, about five minutes, a CEFR level determination and a verifiable certificate. Currently in a diagnostic testing phase ahead of formal accreditation.',
        cta: 'Take the RAQP',
      },
      {
        to: '/roots',
        status: 'live',
        eyebrow: 'The method',
        title: 'The six stages of the Roots Method',
        body: 'Āyah → Tafakkur → Tamyīz → Tawḥīd → ʿAmal → Shukr. The spine every Roots lesson is built on, written out stage by stage.',
        cta: 'Read the method',
      },
    ],
    ctas: [
      { label: 'Browse the Shop', to: '/shop', primary: true },
      { label: 'Take the RAQP', to: '/pathways-exam' },
    ],
  },
  {
    slug: 'teachers',
    name: 'Teachers',
    eyebrow: 'For teachers',
    icon: 'sparkles',
    color: 'from-emerald-500 to-emerald-700',
    headline: 'You’re teaching Qur’an from a photocopy and your own notes.',
    sub: 'For Islamic school, weekend school, Qur’an and Arabic teachers, and online tutors.',
    intro: [
      'Roots is a full bilingual scope-and-sequence — weekly lesson content, teacher guides, and assessment banks — written for a room where some students hear Arabic at home and some have never seen the alphabet.',
      'Level C, Level B and Level A tracks run in parallel across the same content, so a mixed class stays one class instead of splitting into three.',
      'Start with the free Week 1 pack. It is a whole lesson, not a brochure, and it will tell you within an evening whether Roots fits the way you already teach.',
    ],
    highlights: [
      'A free Week 1 sample pack: one complete lesson, the teacher guide that goes with it, and the student pages.',
      'Three proficiency tracks over identical content — Level C, B and A — so you differentiate without preparing three lessons.',
      'Bilingual by design. English and Arabic are drafted together from scratch, so you can teach either side of the page.',
      'Assessment you don’t have to invent: the RAQP is CEFR-aligned, its methodology is published, and its certificates verify publicly.',
    ],
    featured: [
      {
        to: '/free-sample',
        status: 'live',
        eyebrow: 'Free',
        title: 'Roots Week 1 sample pack',
        body: 'One full lesson, the teacher guide, and the student pages — the real thing, not a preview.',
        cta: 'Get the Week 1 pack',
      },
      {
        to: '/shop',
        status: 'live',
        eyebrow: 'On Payhip & Gumroad',
        title: 'Roots Tajweed Reading Series',
        body: 'Five lessons from alphabet to tajweed. Useful as a reading strand alongside whatever you already run. $15 for the bundle.',
        cta: 'Browse the Shop',
      },
      {
        to: '/exam/methodology',
        status: 'live',
        eyebrow: 'Published in full',
        title: 'How the RAQP is built',
        body: 'Item design, level determination, and CEFR alignment — written out so you can judge the exam before you put a student in front of it.',
        cta: 'Read the methodology',
      },
      {
        to: '/curriculum/sources',
        status: 'live',
        eyebrow: 'Every source cited',
        title: 'Where the curriculum comes from',
        body: 'Ibn al-Jazari, Al-Marsafi, Ayman Suwayd, Ibn Ajurrum, Ibn Malik, Bukhari, Muslim. The bibliography is on the page, not hidden.',
        cta: 'See the sources',
      },
    ],
    ctas: [
      { label: 'Get the free Week 1 pack', to: '/free-sample', primary: true },
      { label: 'See how the exam is built', to: '/exam/methodology' },
    ],
  },
  {
    slug: 'parents',
    name: 'Parents',
    eyebrow: 'For parents',
    icon: 'heart',
    color: 'from-rose-500 to-rose-700',
    headline: 'You want to teach your child Qur’an. You don’t speak Arabic.',
    sub: 'For homeschooling parents, and for anyone teaching their own kids at home.',
    intro: [
      'Roots is written so that isn’t a disqualification. We built it partly because so much of what already exists quietly assumes the adult in the room reads Arabic.',
      'Every lesson carries the Arabic and the English together, with pronunciation spelled out rather than assumed, so you can open it and teach it the same week.',
      'Juz’ 30 is the whole field — the short surahs your child will pray with for the rest of their life. Depth first, and no rush to cover ground.',
    ],
    highlights: [
      'A free Week 1 pack — a full lesson plus the guide that walks you through teaching it, whether or not you read Arabic.',
      'A reading series that assumes nothing: alphabet, sounds, joining letters, vowel marks, tajweed. Five lessons, $15 for the bundle.',
      'Nothing you have to take on trust. Every tajweed rule and every hadith is cited to a named source.',
      'A way to check where your child actually is that isn’t you guessing — the RAQP gives a CEFR level and a certificate.',
    ],
    featured: [
      {
        to: '/free-sample',
        status: 'live',
        eyebrow: 'Free',
        title: 'Roots Week 1 sample pack',
        body: 'A complete first lesson with a guide written for the adult teaching it. Start here before you spend anything.',
        cta: 'Get the Week 1 pack',
      },
      {
        to: '/shop',
        status: 'live',
        eyebrow: 'On Payhip & Gumroad',
        title: 'Roots Tajweed Reading Series',
        body: 'Five PDF lessons taking a child from the Arabic alphabet to reading Qur’anic verses with tajweed. $15 for all five.',
        cta: 'Browse the Shop',
      },
      {
        to: '/pathways-exam',
        status: 'live',
        eyebrow: 'CEFR-aligned · published methodology',
        title: 'Roots Arabic & Qur’an Proficiency Exam (RAQP)',
        body: 'Five minutes, a CEFR level, and a certificate you can verify. Currently in a diagnostic testing phase ahead of formal accreditation.',
        cta: 'Take the RAQP',
      },
      {
        to: '/roots',
        status: 'roadmap',
        eyebrow: 'Character & adab',
        title: 'Roots of Mercy — character strand',
        body: 'A character and adab strand to run alongside the Qur’an and Arabic work. Designed, not yet built — we would rather say so than sell it early.',
        cta: 'See what Roots covers',
      },
    ],
    ctas: [
      { label: 'Get the free Week 1 pack', to: '/free-sample', primary: true },
      { label: 'Browse the Shop', to: '/shop' },
    ],
  },
  {
    slug: 'schools',
    name: 'Schools',
    eyebrow: 'For schools',
    icon: 'server',
    color: 'from-sky-500 to-sky-700',
    headline: 'You’re being asked to show that the Islamic Studies program works.',
    sub: 'For Islamic schools, weekend schools, and private schools evaluating a curriculum.',
    intro: [
      'Roots licenses per grade band as a bilingual Qur’an and Arabic curriculum, and each licensee gets it tailored to their program — track weighting, calendar, denominational lens — inside the license rather than as a separate line item.',
      'Elementary Level C is live now at $10,000 a year. Middle School and High School are available Fall 2026, and our first school pilots land in that same year.',
      'Everything a review board tends to ask for is already public: the bibliography, the exam methodology, and the CEFR alignment.',
    ],
    highlights: [
      'The Elementary Level C (ES-C) license is live now — $10,000 per year, with customisation to your program included.',
      'Middle School and High School bands available Fall 2026, alongside our first school pilots. Roadmap, stated as roadmap.',
      'An independent, CEFR-aligned proficiency exam (RAQP) with published methodology and publicly verifiable certificates — currently in diagnostic testing ahead of formal accreditation.',
      'A full public bibliography your board and your parents can read: every hadith cited, every Qur’anic quote verse-referenced.',
    ],
    featured: [
      {
        to: '/for-schools',
        status: 'live',
        eyebrow: 'Licensed per grade band',
        title: 'Roots for Schools — licensing',
        body: 'What each band includes, what customisation covers, and what it costs. Elementary is live; Middle and High School are Fall 2026.',
        cta: 'See licensing',
      },
      {
        to: '/free-sample',
        status: 'live',
        eyebrow: 'Free',
        title: 'Week 1 sample pack',
        body: 'Put a real Roots lesson in front of your teachers before any conversation about money happens.',
        cta: 'Get the Week 1 pack',
      },
      {
        to: '/exam/methodology',
        status: 'live',
        eyebrow: 'Published in full',
        title: 'RAQP exam methodology',
        body: 'How items are written, how levels are determined, and how the exam maps to CEFR — the document to hand a review board.',
        cta: 'Read the methodology',
      },
      {
        to: '/curriculum/sources',
        status: 'live',
        eyebrow: 'Every source cited',
        title: 'Curriculum sources',
        body: 'Ibn al-Jazari, Al-Marsafi, Ayman Suwayd, Ibn Ajurrum, Ibn Malik, Bukhari, Muslim — named, dated, and on the page.',
        cta: 'See the sources',
      },
    ],
    ctas: [
      { label: 'See school licensing', to: '/for-schools', primary: true },
      { label: 'Get the Week 1 pack', to: '/free-sample' },
    ],
  },
  {
    slug: 'educators',
    name: 'Educators',
    eyebrow: 'For educators',
    icon: 'bolt',
    color: 'from-accent-500 to-accent-600',
    headline: 'You’ve read enough curricula to know when one is hiding its sources.',
    sub: 'For curriculum designers, tutors, coaches, and Islamic Studies specialists.',
    intro: [
      'Roots publishes its bibliography, its exam methodology, and its CEFR alignment on the site, so you can evaluate it properly before you ever license or recommend it.',
      'The six-stage Roots Method — Āyah, Tafakkur, Tamyīz, Tawḥīd, ʿAmal, Shukr — is the spine under every lesson, and it is documented rather than implied.',
      'If you tutor or run a small program, the Roots packs, exams and workbooks are yours to license or bundle. Write to us and we will talk about what that looks like.',
    ],
    highlights: [
      'Published exam methodology: item design, level determination, and the CEFR mapping, in full.',
      'A complete bibliography — Ibn al-Jazari, Al-Marsafi, Ayman Suwayd, Ibn Ajurrum, Ibn Malik, Bukhari, Muslim.',
      'The six-stage Roots Method written out stage by stage, so you can see the pedagogy rather than infer it.',
      'A parallel Level C / B / A design over identical content — a workable answer to mixed-proficiency groups.',
    ],
    featured: [
      {
        to: '/roots',
        status: 'live',
        eyebrow: 'The method',
        title: 'The Roots Method, in six stages',
        body: 'Āyah → Tafakkur → Tamyīz → Tawḥīd → ʿAmal → Shukr, and what each stage is doing inside a lesson.',
        cta: 'Read the method',
      },
      {
        to: '/exam/cefr-alignment',
        status: 'live',
        eyebrow: 'A1–B2',
        title: 'RAQP CEFR alignment',
        body: 'How Arabic and Qur’anic proficiency is mapped onto CEFR descriptors, band by band.',
        cta: 'See the alignment',
      },
      {
        to: '/exam/methodology',
        status: 'live',
        eyebrow: 'Published in full',
        title: 'RAQP exam methodology',
        body: 'The full construction document. The exam is currently in a diagnostic testing phase ahead of formal accreditation, and we say so on the exam itself.',
        cta: 'Read the methodology',
      },
      {
        to: '/curriculum/sources',
        status: 'live',
        eyebrow: 'Every source cited',
        title: 'Curriculum sources',
        body: 'The classical and contemporary works Roots is built on, named and dated. Judge the foundations directly.',
        cta: 'See the sources',
      },
    ],
    ctas: [
      { label: 'Read the Roots Method', to: '/roots', primary: true },
      { label: 'Talk to us', to: '/contact' },
    ],
  },
]

export function getAudience(slug) {
  return audiences.find((a) => a.slug === slug)
}
