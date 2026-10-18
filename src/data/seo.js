// Per-route SEO: <title>, meta description, canonical, Open Graph, Twitter.
//
// One source of truth, read in two places:
//   - src/components/Seo.jsx updates the live document on every client-side
//     navigation (what Google renders).
//   - scripts/prerender-seo.mjs runs after `vite build` and writes a copy of
//     dist/index.html per route with these tags baked into <head> (what
//     WhatsApp, LinkedIn, Facebook and X read — they do not run JavaScript).
//
// Descriptions are written for 140–160 characters; scripts/prerender-seo.mjs
// warns at build time when a hand-written one drifts outside that range.

import { rootDisciplines } from './rootsOfKnowledge.js'
import { audiences } from './audiences.js'
import { pathways } from './pathways.js'
import { resources } from './resources.js'

export const SITE_URL = 'https://www.pathwayslearn.com'
export const TITLE_SUFFIX = ' · Roots | جذور'
// Existing Pathways social image; intro-film artwork remains a local draft.
export const OG_IMAGE = `${SITE_URL}/og-image.png`

const DEFAULT_DESCRIPTION =
  'Roots brings Qur’an, Arabic and character together through bilingual lessons, the three-step Roots Method, teacher tools and school curriculum support.'

// Hand-written entries for every fixed route.
export const staticSeo = {
 '/e2-mini': { title: 'E² Mini LMS: classes, lessons and feedback pilot', description: 'Try the E² Mini LMS pilot: organise classes, lessons and assignments, exchange learner files and record feedback. Saved on this browser, with backup exports.' },
 '/spelling-bee': { title: 'Roots Spelling Bee: Arabic spelling challenges', description: 'Hear Arabic and build or type words in Roots spelling challenges. Choose an age group and stage, practise with corrections, or play a timed classroom round.' },
 '/membership': { title: 'Roots memberships for teachers, teams and schools', description: 'Explore proposed Roots memberships for teachers, small teaching businesses and schools. Compare plans and try free tools while paid access is being prepared.' },
 '/roots/quran-encyclopedia': { title: 'The Quran Encyclopedia: free sample', description: 'Explore an Al-Fatiha sample from The Quran Encyclopedia: Arabic verses, transliteration, English meanings and reflection. Discover the full 114-surah EPUB.' },
 '/connect/collaborators':{title:'Collaborate with Roots',description:'Share your skills and ideas with Roots through a short collaboration enquiry. Review your answers and email Roots about teaching, design, research or tools.'},
 '/connect/partners':{title:'Partner with Roots',description:'Explore a Roots partnership for your school, organisation or community. Share your goals and audience, then review and email your enquiry directly to Roots.'},
 '/connect/schools':{title:'School enquiry survey',description:'Tell Roots about your school, teaching priorities and support needs. Explore the free E² framework, curriculum licensing or tailored teacher support options.'},
 '/play': {title:'Roots Play: free Arabic learning games',description:'Play free Arabic letter and word games with instant feedback. Practise with your child or class, then explore Roots lessons for your next learning step.'},
  '/rqap-exams': { title: 'RQAP Exams: Arabic and Tajweed assessments', description: 'Choose your Roots assessment: written Arabic placement or foundational Qur’anic Arabic and Tajweed. Explore both pilots, their scope and scoring methods.' },
  '/': {
    title: 'A bilingual Qur’an and Arabic curriculum',
    description: DEFAULT_DESCRIPTION,
  },
  '/resources': {
    title: 'Resources',
    description:
      'Find Pathways teaching tools and Roots lessons, guides and Qur’anic reflections. Filter available resources by audience, age, subject and learning setting.',
  },
  '/roots': {
    title: 'Roots of Knowledge',
    description:
      'Roots of Knowledge traces every science back to its Source: mathematics, physics, biology and more, taught through the Roots Method and grounded in tawḥīd.',
  },
  '/roots/names': {
    title: 'Allah’s Names in the Qur’an',
    description:
      'Allah’s Names in the Universe: each Name, how it shows in creation, a question to ponder, and the character it calls us to. Every āyah of creation is a window.',
  },
  '/shop': {
    title: 'Roots Tajweed Series',
    description:
      'The Roots Tajweed reading series: five lessons from the alphabet to reading with tajweed. $4 a lesson or $15 for all five, on Payhip or Gumroad.',
  },
  '/for-schools': {
    title: 'For schools',
    description:
      'License Roots for your school: a bilingual Qur’an and Arabic curriculum at Level C, B and A, tailored to each school, with a pilot pack to review first.',
  },
  '/about': {
    title: 'About Roots',
    description:
      'Why Roots exists: a bilingual Qur’an and Arabic curriculum built by an Arabic and Qur’anic Studies educator in Egypt, with every rule traced to a named source.',
  },
  '/tools': {
    title: 'Pathways for Teachers',
    description:
      'Pathways for Teachers: a Windows desktop app for lesson plans, quizzes and teaching help, $19 once the store opens. Your work stays on your own computer.',
  },
  '/tools/e2-teaching': {
    title: 'E² Teaching Framework',
    description:
      'The E² Teaching Framework workspace: plan any lesson through Engage, Explore, Explain, Elaborate and Evaluate, with guiding prompts built into every field.',
  },
  '/pathways-exam': {
    title: 'RAQP Arabic & Quran Proficiency Exam',
    description:
      'Sit the RAQP Arabic and Quran proficiency exam: CEFR-aligned from A1 to B2, level by level, with a warm-up before each level and a clear report at the end.',
  },
  '/exam/methodology': {
    title: 'How the Roots exams are built',
    description:
      'How the Roots exams are built: item design, how a level is decided, pass marks and the CEFR mapping, published in full so schools can judge the exams properly.',
  },
  '/exam/cefr-alignment': {
    title: 'RAQP CEFR alignment',
    description:
      'The RAQP CEFR alignment document: how each level of the Roots Arabic and Quran proficiency exam maps to CEFR A1–B2, with the descriptors and evidence behind it.',
  },
  '/curriculum/sources': {
    title: 'Curriculum sources',
    description:
      'The sources behind the Roots curriculum: Ibn al-Jazari, Al-Marsafi and Ayman Suwayd for tajweed; Ibn Ajurrum and Ibn Malik for grammar; Bukhari and Muslim.',
  },
  '/free-sample': {
    title: 'Free Qur’anic Arabic sample',
    description:
      'Get the free Roots Week 1 sample pack: one Qur’anic Arabic reading lesson, a teacher guide and the student worksheets, in English and Arabic. No card needed.',
  },
  '/verify': {
    title: 'Verify a certificate',
    description:
      'Check that a Roots certificate is genuine. Scan the QR code on the certificate or enter its ID to see the holder, the level awarded and the date it was issued.',
  },
  '/book': {
    title: 'Book a class',
    description:
      'Book a live Roots Arabic and Qur’an class. Explore free discovery, affordable learning consultations and focused school reviews with a clear, agreed scope.',
  },
  '/privacy': {
    title: 'Privacy Policy',
    description:
      'What personal information Roots collects, why, how long we keep it, which providers handle it, how children’s data is treated, and how to have yours deleted.',
  },
  '/terms': {
    title: 'Terms of Service',
    description:
      'The terms for using pathwayslearn.com and Roots materials: your licence to our content, exams and certificates, payments, school licences and governing law.',
  },
  '/refund': {
    title: 'Refund Policy',
    description:
      'When Roots refunds: 14 days on unused digital products, 30 days on school licences before implementation begins, and 24 hours’ notice to cancel a paid call.',
  },
  '/faq': {
    title: 'FAQ',
    description:
      'Answers to common questions about Roots: who it is for, what it costs, how the exams and certificates work, school licensing, and how to get in touch with us.',
  },
  '/contact': {
    title: 'Contact',
    description:
      'Get in touch with Roots about the curriculum, the exams, a school licence or anything else. Write to roots@pathwayslearn.com and we will reply personally.',
  },
  '/pathways': {
    title: 'Pathways',
    description:
      'Browse learning pathways by goal and level: full journeys with modules, projects and a portfolio-ready result, from first steps through to advanced practice.',
  },
  '/recommend': {
    title: 'Find your pathway',
    description:
      'Tell us your interests and goals and get a suggested next pathway. The recommender runs entirely in your browser, so your answers never leave your device.',
  },
  '/partners': {
    title: 'Partner picks',
    description:
      'Trusted resources, handpicked: lesser-known but genuinely excellent tools, tutors and textbooks we have vetted, across languages, coding, design, data and more.',
  },
  '/edu-hub': {
    title: 'EduHub & Tools',
    description:
      'Explore Pathways EduHub: lesson planning, rubrics, term blueprints and teacher tools, with editable suggestions and portable exports for your school’s LMS.',
  },
  '/apply/educator': {
    title: 'Teach with us',
    description:
      'Apply to teach with us. Tell us what you teach, who you teach and how, and we will be in touch about bringing your expertise to learners through the platform.',
  },
  '/apply/partner': {
    title: 'Partner with us',
    description:
      'Bring Roots to your school, district or team. Tell us about your learners and goals, and we will come back with a partnership shaped around what you need.',
  },
  '/accredited-exams': {
    title: 'Accredited exams worldwide',
    description:
      'Discover and compare language proficiency tests, university entrance exams and professional certifications that are recognised by institutions around the world.',
  },
  '/quran-exams': {
    title: 'Qur’an exams',
    description:
      'Qur’an exams and certifications from around the world, side by side: what each one assesses, who awards it, and who it suits, so you can choose the right one.',
  },
  '/exam-dashboard': {
    title: 'Exam dashboard',
    description: 'Exam results saved on this device.',
    noindex: true,
  },
}

const AUDIENCE_DESCRIPTIONS = {
  learners:
    'Roots for learners: read the Qur’an with tajweed from the alphabet up, sit a CEFR-aligned Arabic proficiency exam, and trace every rule back to a named source.',
  teachers:
    'Roots for teachers: ready-to-teach Qur’an and Arabic lessons at Level C, B and A over the same content, with published sources, exams and live classes.',
  parents:
    'Roots for parents: teach your child Qur’anic Arabic at home with a free sample, a five-lesson Tajweed series, and live classes at Level C, B or A.',
  schools:
    'Roots for schools: a bilingual Qur’an and Arabic curriculum with CEFR-aligned exams, a published method and sources, and licences shaped to your grade bands.',
  educators:
    'Roots for educators: a documented method, full bibliography, published exam methodology and CEFR alignment, so you can evaluate Roots before licensing it.',
}

// Clip to the 160-character budget on a word boundary.
function clip(text, max = 160) {
  const t = String(text || '').replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  return t.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'
}

function dynamicEntries() {
  const out = {}
  for (const d of rootDisciplines) {
    out[`/roots/${d.slug}`] = {
      title: `${d.title} — Roots of Knowledge`,
      description: clip(`${d.title} through the Roots Method: ${d.summary} Units, practices and sources.`),
    }
  }
  for (const a of audiences) {
    out[`/for/${a.slug}`] = {
      title: `For ${a.name.toLowerCase()}`,
      description: AUDIENCE_DESCRIPTIONS[a.slug] || clip(`${a.headline || a.name}. ${a.sub || ''}`),
    }
  }
  for (const p of pathways) {
    out[`/pathways/${p.slug}`] = {
      title: p.title,
      description: clip(`${p.title}: ${p.summary || p.tagline}`),
    }
  }
  for (const r of resources) {
    out[`/resources/${r.slug}`] = {
      title: r.title,
      description: clip(`${r.title}. ${r.description}`),
    }
  }
  return out
}

let _entries
function entries() {
  if (!_entries) _entries = { ...staticSeo, ...dynamicEntries() }
  return _entries
}

// Routes the prerender step writes an HTML file for.
export function seoRoutes() {
  return Object.keys(entries())
}

export function getSeo(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const hit = entries()[path]
  // Per-holder certificate pages: shareable, but not for search indexes.
  if (!hit && path.startsWith('/verify/')) {
    return {
      ...build('/verify', staticSeo['/verify']),
      title: 'Certificate verification' + TITLE_SUFFIX,
      noindex: true,
    }
  }
  if (!hit) {
    return { ...build('/', { title: 'Page not found', description: DEFAULT_DESCRIPTION }), noindex: true }
  }
  return build(path, hit)
}

function build(path, e) {
  return {
    title: e.title + TITLE_SUFFIX,
    description: e.description,
    canonical: SITE_URL + (path === '/' ? '/' : path),
    image: OG_IMAGE,
    type: path === '/' ? 'website' : 'article',
    noindex: !!e.noindex,
  }
}
