// Roots — B2B pricing menu (v1, approved 2026-07-15).
// Prices in USD. School licenses are per-year. Consulting is per-project.

export const rootsSystem = {
  tracks: ['Beginner (ES-C)', 'Intermediate (ES-B)', 'Advanced (ES-A)'],
  weeks: 37,
  languages: 'English + Arabic (bilingual delivery)',
  summary:
    'Roots is a three-track, bilingual Qur’an and Arabic curriculum system built for K–5 classrooms. Each track carries 37 weeks of lessons with teacher guides, formative and summative assessments, and a placement audit — so a teacher can pick it up on Monday morning and know exactly what to teach and how to measure it.',
};

export const licenseIncludes = [
  'Full weekly scope & sequence across all 37 weeks',
  'Every lesson deck, ready to project or hand out',
  'Teacher guides with pacing, differentiation, and reflection prompts',
  'Assessment bank — formative checks, summative tests, and rubrics',
  'Resource packs — phonics cards, word-shape toolkit, target surah manuals',
  'Placement audit tools to sort new students into the right track',
  'Evaluation portfolio + certificate templates for graduating students',
  'Implementation support onboarding for the licensing teachers',
];

// Per-level licenses — buy a single track (ES-C / ES-B / ES-A) or the full
// three-track bundle. Sits ABOVE the multi-classroom tiers on /for-schools.
// Every mailto URL is pre-encoded per Dina's spec so subject/body render
// exactly as she wrote them.
export const perLevelLicenses = [
  {
    id: 'es-c',
    name: 'Roots ES-C — Beginner License',
    level: 'ES-C · Beginner',
    price: '$10,000',
    period: '/ year',
    description:
      'The full ES-C track: 37 weeks of lessons, teacher guide, assessments, resource packs, placement audit.',
    buyUrl:
      'mailto:dinabudu@gmail.com?subject=Roots%20ES-C%20Beginner%20License%20Purchase%20%E2%80%94%20%2410%2C000&body=Assalamu%20alaikum%2C%20I%27d%20like%20to%20purchase%20the%20Roots%20ES-C%20Beginner%20license.',
    customizeUrl:
      'mailto:dinabudu@gmail.com?subject=Roots%20ES-C%20%E2%80%94%20Customization%20Request',
  },
  {
    id: 'es-b',
    name: 'Roots ES-B — Intermediate License',
    level: 'ES-B · Intermediate',
    price: '$10,000',
    period: '/ year',
    description:
      'The full ES-B track: 37 weeks of Tajweed foundations, teacher guide, assessments, resource packs.',
    buyUrl:
      'mailto:dinabudu@gmail.com?subject=Roots%20ES-B%20Intermediate%20License%20Purchase%20%E2%80%94%20%2410%2C000&body=Assalamu%20alaikum%2C%20I%27d%20like%20to%20purchase%20the%20Roots%20ES-B%20Intermediate%20license.',
    customizeUrl:
      'mailto:dinabudu@gmail.com?subject=Roots%20ES-B%20%E2%80%94%20Customization%20Request',
  },
  {
    id: 'es-a',
    name: 'Roots ES-A — Advanced License',
    level: 'ES-A · Advanced',
    price: '$10,000',
    period: '/ year',
    description:
      'The full ES-A track: 37 weeks of advanced tajweed + adaab + capstone portfolios, teacher guide, assessments, resource packs.',
    buyUrl:
      'mailto:dinabudu@gmail.com?subject=Roots%20ES-A%20Advanced%20License%20Purchase%20%E2%80%94%20%2410%2C000&body=Assalamu%20alaikum%2C%20I%27d%20like%20to%20purchase%20the%20Roots%20ES-A%20Advanced%20license.',
    customizeUrl:
      'mailto:dinabudu@gmail.com?subject=Roots%20ES-A%20%E2%80%94%20Customization%20Request',
  },
  {
    // Straight 3 × $10k — no bundle discount. The card keeps a visual
    // highlight (via id === 'bundle') so it still reads as the "all-in"
    // option, but no misleading "Save $X" badge is shown.
    id: 'bundle',
    name: 'All Three Levels — Full Elementary Bundle',
    level: 'All 3 tracks · ES-C + ES-B + ES-A',
    price: '$30,000',
    period: '/ year',
    description:
      'License all three tracks for the same school year — the complete Roots Elementary system.',
    buyUrl:
      'mailto:dinabudu@gmail.com?subject=Roots%20Full%20Elementary%20Bundle%20Purchase%20%E2%80%94%20%2430%2C000&body=Assalamu%20alaikum%2C%20I%27d%20like%20to%20purchase%20the%20full%20Roots%20Elementary%20bundle%20%28all%20three%20levels%29.',
    customizeUrl:
      'mailto:dinabudu@gmail.com?subject=Roots%20Full%20Elementary%20Bundle%20%E2%80%94%20Customization%20Request',
  },
];

// Multi-campus / network tiers only. Per-level $10k licenses above are the
// school-level pricing; the former School ($6,500) and School Plus ($9,500)
// tiers were removed because they now sit below a single per-level license
// and no longer make sense as separate products.
export const schoolTiers = [
  {
    id: 'institution',
    name: 'Institution / Multi-Campus',
    tagline: 'Unlimited classrooms',
    price: '$45k–$65k',
    period: '/ year',
    highlight: false,
    forWhom: 'Larger schools and small networks who want Dina embedded in the rollout.',
    includes: [
      'Unlimited classroom access',
      'On-site or virtual PD (4 hours)',
      'Weekly Slack access to Dina',
      'Customization support + branded materials',
      'Priority support',
    ],
  },
  {
    id: 'network',
    name: 'Network License',
    tagline: 'Networks & multi-campus systems',
    price: '$75k–$150k',
    period: '/ year',
    highlight: false,
    forWhom: 'School networks, homeschool co-ops, and multi-campus systems that need train-the-trainer capacity.',
    includes: [
      'Everything in Institution',
      'Train-the-trainer program',
      'Monthly curriculum-coordinator retainer',
      'LMS integration (Canvas, Google Classroom, others)',
    ],
  },
];

export const consultingServices = [
  {
    id: 'audit',
    name: 'Curriculum Audit',
    price: '$1,500',
    description: 'A written report on your current Qur’an/Arabic scope + a 1-hour walkthrough call.',
  },
  {
    id: 'bespoke-framework',
    name: 'Bespoke Framework',
    price: '$5k–$15k',
    description: 'A custom curriculum framework built for your school — scope, sequence, and assessments per project.',
  },
  {
    id: 'training-virtual',
    name: 'Teacher Training — Virtual',
    price: '$500',
    description: 'A single 2-hour virtual training session for your teaching team.',
  },
  {
    id: 'training-full-day',
    name: 'Teacher Training — Full Day',
    price: '$2,000',
    description: 'A full-day in-person or virtual training, tailored to your track and grade band.',
  },
  {
    id: 'coaching',
    name: 'Implementation Coaching',
    price: '$1,000',
    period: '/ month',
    description: 'Monthly retainer supporting one school through their Roots rollout.',
  },
  {
    id: 'bespoke-curriculum',
    name: 'Bespoke Curriculum Development',
    price: '$15k–$40k',
    description: 'Net-new grade band or subject built from scratch, per project.',
  },
];

export const howItWorks = [
  {
    n: '01',
    title: 'Discovery call',
    body: 'A short call to understand your students, teachers, hours per week, and current curriculum — before we quote anything.',
  },
  {
    n: '02',
    title: 'Placement audit',
    body: 'Every student gets sorted into a Roots track (Beginner, Intermediate, Advanced) with a diagnostic — so nobody starts in the wrong place.',
  },
  {
    n: '03',
    title: 'Implementation + teacher onboarding',
    body: 'Your teachers receive their scope, decks, guides, and assessments — plus a live onboarding session so they know how to run Week 1.',
  },
  {
    n: '04',
    title: 'Ongoing support + refinement',
    body: 'Monthly Q&A, mid-year check-ins, and end-of-year evaluation portfolios. We refine the fit as your students grow.',
  },
];

export const meetDina = {
  name: 'Dina Mohamed Sayed El-Ahl',
  role: 'Curriculum Designer · Arabic & Qur’anic Studies Educator',
  bio: 'Dina taught Arabic and Qur’anic Studies at Bayaan Academy, a US-based online Islamic school, where she led the elementary and high-school Advanced tracks and built the scope-and-sequence framework used across grade bands. Her master’s thesis was in Arabic natural language processing (text summarization). She is a Wayground / Quizizz Game Changer certified trainer and the author of the Roots Tajweed Reading Series.',
  credentials: [
    'Arabic & Qur’an educator (US online Islamic school)',
    'MA in Arabic NLP (text summarization)',
    'Wayground / Quizizz Game Changer certified trainer',
    'Author of the Roots Tajweed Reading Series',
  ],
};

export const ctaEmail = 'dinabudu@gmail.com';
