// Roots — B2B pricing (K–12, async-only). Prices in USD.
// Every URL is a pre-encoded mailto — no scheduled calls, no calendar,
// no phone. Delivery + support are async (email + document + video walkthrough).

export const rootsSystem = {
  gradeBands: ['Elementary (K–5)', 'Middle School (6–8)', 'High School (9–12)'],
  tracksPerBand: ['Beginner', 'Intermediate', 'Advanced'],
  weeksPerTrack: 37,
  languages: 'English + Arabic (bilingual delivery)',
  summary:
    'Roots is a full K–12, three-band, three-track bilingual Qur’an and Arabic curriculum system. Each of the nine tracks (Elementary / Middle School / High School × Beginner / Intermediate / Advanced) carries 37 weeks of lessons with teacher guides, formative and summative assessments, and a placement audit — so a teacher can pick it up on Monday morning and know exactly what to teach and how to measure it.',
};

export const licenseIncludes = [
  'Full weekly scope & sequence across all 37 weeks',
  'Every lesson deck, ready to project or hand out',
  'Teacher guides with pacing, differentiation, and reflection prompts',
  'Assessment bank — formative checks, summative tests, and rubrics',
  'Resource packs — phonics cards, word-shape toolkit, target surah manuals',
  'Placement audit tools to sort new students into the right track',
  'Evaluation portfolio + certificate templates for graduating students',
  'Async onboarding: getting-started document + pre-recorded walkthroughs',
];

// ---------------------------------------------------------------------
// Per-level licenses, grouped by grade band.
// Every mailto is pre-encoded per Dina's spec so subject/body render exactly.
// Elementary is fully available. Middle School and High School are being
// extended from Bayaan Academy source material — available Fall 2026.
// ---------------------------------------------------------------------

const encodedDash = '%20%E2%80%94%20';
const encodedDollar = '%24';
const mailto = 'mailto:roots@pathwayslearn.com?subject=';

function buyUrl(name, price) {
  return `${mailto}${encodeURIComponent(`Roots ${name} License Purchase — $${price}`)}&body=${encodeURIComponent(
    `Hello,\n\nWe'd like to purchase the Roots ${name} license for our school.\n\nSchool name:\nCity / Country:\nGrade band:\nApprox. student count:\nTarget start date:\n\nThank you,\n`
  )}`;
}
function customizeUrl(name) {
  return `${mailto}${encodeURIComponent(`Roots ${name} — Customization Request`)}`;
}
function askUrl(name) {
  return `${mailto}${encodeURIComponent(`Roots ${name} — Question`)}`;
}

// -------- Elementary (ES) — available now --------
export const elementaryLicenses = [
  {
    id: 'es-c',
    name: 'ES-C Beginner',
    level: 'Elementary · Beginner',
    price: '$10,000',
    period: '/ year',
    description:
      'The full ES-C track: 37 weeks of lessons, teacher guide, assessments, resource packs, placement audit.',
    buyUrl: buyUrl('ES-C Beginner', '10,000'),
    customizeUrl: customizeUrl('ES-C'),
    available: true,
  },
  {
    id: 'es-b',
    name: 'ES-B Intermediate',
    level: 'Elementary · Intermediate',
    price: '$10,000',
    period: '/ year',
    description:
      'The full ES-B track: 37 weeks of Tajweed foundations, teacher guide, assessments, resource packs.',
    buyUrl: buyUrl('ES-B Intermediate', '10,000'),
    customizeUrl: customizeUrl('ES-B'),
    available: true,
  },
  {
    id: 'es-a',
    name: 'ES-A Advanced',
    level: 'Elementary · Advanced',
    price: '$10,000',
    period: '/ year',
    description:
      'The full ES-A track: 37 weeks of advanced tajweed + adaab + capstone portfolios, teacher guide, assessments, resource packs.',
    buyUrl: buyUrl('ES-A Advanced', '10,000'),
    customizeUrl: customizeUrl('ES-A'),
    available: true,
  },
  {
    id: 'es-bundle',
    name: 'ES — All 3 Tracks',
    level: 'Elementary · All 3 tracks',
    price: '$30,000',
    period: '/ year',
    description:
      'License all three Elementary tracks for the same school year — the complete K–5 Roots system.',
    buyUrl: buyUrl('Elementary Bundle', '30,000'),
    customizeUrl: customizeUrl('ES Bundle'),
    available: true,
    highlight: true,
  },
];

// -------- Middle School (MS) — available Fall 2026 --------
export const middleSchoolLicenses = [
  {
    id: 'ms-c',
    name: 'MS-C Beginner',
    level: 'Middle School · Beginner',
    price: '$10,000',
    period: '/ year',
    description:
      'Full MS-C track: 37 weeks bridging elementary reading into intermediate Qur’an comprehension and Arabic grammar for grades 6–8. Being extended from Bayaan Academy source material.',
    buyUrl: buyUrl('MS-C Beginner', '10,000'),
    customizeUrl: customizeUrl('MS-C'),
    available: 'Fall 2026',
  },
  {
    id: 'ms-b',
    name: 'MS-B Intermediate',
    level: 'Middle School · Intermediate',
    price: '$10,000',
    period: '/ year',
    description:
      'Full MS-B track: 37 weeks of Qur’an comprehension, tajweed refinement, and expressive Arabic writing for grades 6–8. Being extended from Bayaan Academy source material.',
    buyUrl: buyUrl('MS-B Intermediate', '10,000'),
    customizeUrl: customizeUrl('MS-B'),
    available: 'Fall 2026',
  },
  {
    id: 'ms-a',
    name: 'MS-A Advanced',
    level: 'Middle School · Advanced',
    price: '$10,000',
    period: '/ year',
    description:
      'Full MS-A track: 37 weeks of thematic Qur’an study, classical Arabic morphology, and structured composition. Being extended from Bayaan Academy source material.',
    buyUrl: buyUrl('MS-A Advanced', '10,000'),
    customizeUrl: customizeUrl('MS-A'),
    available: 'Fall 2026',
  },
  {
    id: 'ms-bundle',
    name: 'MS — All 3 Tracks',
    level: 'Middle School · All 3 tracks',
    price: '$30,000',
    period: '/ year',
    description:
      'License all three Middle School tracks — the full 6–8 Roots system. Being extended from Bayaan Academy source material.',
    buyUrl: buyUrl('Middle School Bundle', '30,000'),
    customizeUrl: customizeUrl('MS Bundle'),
    available: 'Fall 2026',
    highlight: true,
  },
];

// -------- High School (HS) — available Fall 2026 --------
export const highSchoolLicenses = [
  {
    id: 'hs-c',
    name: 'HS-C Beginner',
    level: 'High School · Beginner',
    price: '$10,000',
    period: '/ year',
    description:
      'Full HS-C track: 37 weeks introducing older students to Qur’an-anchored Arabic reading, tajweed foundations, and thematic surah study. Being extended from Bayaan Academy source material.',
    buyUrl: buyUrl('HS-C Beginner', '10,000'),
    customizeUrl: customizeUrl('HS-C'),
    available: 'Fall 2026',
  },
  {
    id: 'hs-b',
    name: 'HS-B Intermediate',
    level: 'High School · Intermediate',
    price: '$10,000',
    period: '/ year',
    description:
      'Full HS-B track: 37 weeks of classical Arabic grammar, exegetical basics, and structured writing across surahs. Being extended from Bayaan Academy source material.',
    buyUrl: buyUrl('HS-B Intermediate', '10,000'),
    customizeUrl: customizeUrl('HS-B'),
    available: 'Fall 2026',
  },
  {
    id: 'hs-a',
    name: 'HS-A Advanced',
    level: 'High School · Advanced',
    price: '$10,000',
    period: '/ year',
    description:
      'Full HS-A track: 37 weeks of rhetorical Arabic, comparative tafsir, and capstone portfolios. Directly extended from the HS Advanced track Dina led at Bayaan Academy.',
    buyUrl: buyUrl('HS-A Advanced', '10,000'),
    customizeUrl: customizeUrl('HS-A'),
    available: 'Fall 2026',
  },
  {
    id: 'hs-bundle',
    name: 'HS — All 3 Tracks',
    level: 'High School · All 3 tracks',
    price: '$30,000',
    period: '/ year',
    description:
      'License all three High School tracks — the full 9–12 Roots system. Being extended from Bayaan Academy source material.',
    buyUrl: buyUrl('High School Bundle', '30,000'),
    customizeUrl: customizeUrl('HS Bundle'),
    available: 'Fall 2026',
    highlight: true,
  },
];

// -------- Full K–12 bundle — the most complete license --------
export const fullK12License = {
  id: 'k12-full',
  name: 'Roots K–12 — All 9 Tracks',
  level: 'Full K–12 · Elementary + Middle School + High School',
  price: '$90,000',
  period: '/ year',
  description:
    'License every Roots track — all three grade bands, all three levels — for the same school year. The complete K–12 Roots system: 9 curricula, 333 weeks of scope-and-sequence, one price. Elementary is live now; Middle School and High School available Fall 2026.',
  buyUrl: buyUrl('K–12 Full License', '90,000'),
  customizeUrl: customizeUrl('K–12 Full License'),
  available: 'Elementary now · MS/HS Fall 2026',
};

// -------- Larger deployments (unchanged) — email inquiry only --------
export const schoolTiers = [
  {
    id: 'institution',
    name: 'Institution / Multi-Campus',
    tagline: 'Unlimited classrooms across a single institution',
    price: '$45k–$65k',
    period: '/ year',
    forWhom: 'Larger K–12 schools and small networks running Roots across multiple grade bands.',
    includes: [
      'Unlimited classroom access across grade bands',
      'Async PD — pre-recorded video walkthroughs',
      'Customization support delivered by email + shared docs',
      'Branded materials for your school',
      'Priority email support',
    ],
    inquireUrl: askUrl('Institution / Multi-Campus License'),
  },
  {
    id: 'network',
    name: 'Network License',
    tagline: 'Networks & multi-campus systems',
    price: '$75k–$150k',
    period: '/ year',
    forWhom: 'School networks, homeschool co-ops, and multi-campus systems.',
    includes: [
      'Everything in Institution',
      'Async train-the-trainer video series',
      'Monthly async curriculum-coordinator retainer',
      'LMS integration (Canvas, Google Classroom, others)',
    ],
    inquireUrl: askUrl('Network License'),
  },
];

// -------- Customised Curriculum (was: Consulting) --------
// All async: email + document + pre-recorded video walkthrough. No scheduled
// calls. Each card has one CTA: "Email to start".
export const customisedCurriculum = [
  {
    id: 'audit',
    name: 'Curriculum Audit',
    price: '$1,500',
    description:
      'A written report on your current Qur’an/Arabic scope, delivered as a PDF by email. Includes findings, gaps, and recommended next steps.',
    inquireUrl: `${mailto}${encodeURIComponent('Roots Customised Curriculum — Curriculum Audit Inquiry')}`,
  },
  {
    id: 'bespoke-framework',
    name: 'Bespoke Curriculum Framework',
    price: '$5,000–$15,000',
    description:
      'A custom curriculum framework built for your school — scope, sequence, and assessments. Delivered as documents; iteratively refined by email exchange.',
    inquireUrl: `${mailto}${encodeURIComponent('Roots Customised Curriculum — Bespoke Curriculum Framework Inquiry')}`,
  },
  {
    id: 'teacher-enablement-pack',
    name: 'Teacher Enablement Pack',
    price: '$500',
    description:
      'A single grade-band pack: pre-recorded video walkthrough + written facilitation guide. Everything a teacher needs to run the track — delivered digitally.',
    inquireUrl: `${mailto}${encodeURIComponent('Roots Customised Curriculum — Teacher Enablement Pack Inquiry')}`,
  },
  {
    id: 'teacher-enablement-suite',
    name: 'Full Teacher Enablement Suite',
    price: '$2,000',
    description:
      'Comprehensive pre-recorded video series + written guides for a full year, plus Q&A email support throughout the academic year.',
    inquireUrl: `${mailto}${encodeURIComponent('Roots Customised Curriculum — Full Teacher Enablement Suite Inquiry')}`,
  },
  {
    id: 'implementation-retainer',
    name: 'Implementation Support (async retainer)',
    price: '$1,000',
    period: '/ month',
    description:
      'Monthly review of your teachers’ implementation via shared documents, plus email responses to their questions. No calls; everything in writing.',
    inquireUrl: `${mailto}${encodeURIComponent('Roots Customised Curriculum — Implementation Support Retainer Inquiry')}`,
  },
  {
    id: 'bespoke-development',
    name: 'Bespoke Curriculum Development',
    price: '$15,000–$40,000',
    description:
      'Net-new grade band or subject built from scratch. Full package: scope, decks, guides, assessments, resource packs — delivered as a complete package.',
    inquireUrl: `${mailto}${encodeURIComponent('Roots Customised Curriculum — Bespoke Curriculum Development Inquiry')}`,
  },
];

export const howItWorks = [
  {
    n: '01',
    title: 'Tell us about your students.',
    body: 'Email us with your grade bands, student count, and target academic year. We reply within 2 business days.',
  },
  {
    n: '02',
    title: 'We send a placement pack so you can see where your students stand.',
    body: 'A self-serve placement audit your teachers can administer in class. Results come back to us; we recommend the right track for each cohort.',
  },
  {
    n: '03',
    title: 'You receive the full license pack — scope, decks, guides, assessments — with async onboarding.',
    body: 'Everything a teacher needs to walk into Monday morning knowing what to teach and how to measure it. Delivered as documents plus a pre-recorded walkthrough.',
  },
  {
    n: '04',
    title: 'We stay in touch. Monthly check-ins, refinements based on what your students actually do.',
    body: 'Every interaction is email or shared document. No calls unless you want one — and if you do, we make time.',
  },
];

export const meetDina = {
  name: 'Dina Mohamed Sayed El-Ahl',
  role: 'Curriculum Designer · Arabic & Qur’anic Studies Educator',
  bio: 'Dina taught Arabic and Qur’anic Studies at Bayaan Academy, a US-based online Islamic school, where she led both the Elementary Advanced and High School Advanced tracks and built the scope-and-sequence framework used across grade bands. Her master’s thesis was in Arabic natural language processing (text summarization). She is a Wayground / Quizizz Game Changer certified trainer and the author of the Roots Tajweed Reading Series.',
  credentials: [
    'Arabic & Qur’an educator (US online Islamic school)',
    'Led ES-Advanced and HS-Advanced tracks at Bayaan Academy',
    'MA in Arabic NLP (text summarization)',
    'Wayground / Quizizz Game Changer certified trainer',
    'Author of the Roots Tajweed Reading Series',
  ],
};

export const ctaEmail = 'roots@pathwayslearn.com';
