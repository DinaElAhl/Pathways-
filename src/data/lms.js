// Pathways LMS — data model for packages, features, and audiences.
// Used by LMS landing, pricing, and audience pages.

export const lmsFeatures = [
  {
    id: 'classrooms',
    title: 'Classrooms & Cohorts',
    description: 'Create classrooms, invite students with a join code, and run live cohorts with start/end dates.',
    icon: '🏫',
  },
  {
    id: 'gradebook',
    title: 'Gradebook & Rubrics',
    description: 'Automatic grading for quizzes, rubric-based assessment for projects, and weighted grade categories.',
    icon: '📊',
  },
  {
    id: 'assignments',
    title: 'Assignments & Submissions',
    description: 'Create assignments with due dates, accept file uploads, code submissions, and peer reviews.',
    icon: '📝',
  },
  {
    id: 'ai-tutor',
    title: 'AI Tutor for every student',
    description: 'An on-device AI tutor that answers questions about the current lesson without leaking student data.',
    icon: '🤖',
  },
  {
    id: 'ai-grading',
    title: 'AI-assisted grading',
    description: 'Draft feedback for essays and code; teacher reviews and approves before sending to students.',
    icon: '✨',
  },
  {
    id: 'analytics',
    title: 'Analytics & Insights',
    description: 'Per-student progress, at-risk alerts, cohort comparison, and learning-outcome heatmaps.',
    icon: '📈',
  },
  {
    id: 'sso',
    title: 'SSO & Roster sync',
    description: 'Google Workspace, Microsoft 365, Clever, ClassLink, and SAML 2.0 for enterprise rollouts.',
    icon: '🔐',
  },
  {
    id: 'lti',
    title: 'LTI 1.3 integration',
    description: 'Embed Pathways courses inside Canvas, Moodle, Blackboard, and Brightspace with deep linking.',
    icon: '🔌',
  },
  {
    id: 'curriculum',
    title: 'Standards-aligned curriculum',
    description: 'Pre-built units mapped to CSTA, NGSS, Common Core, IB, and national curricula.',
    icon: '📚',
  },
  {
    id: 'plagiarism',
    title: 'AI detection & academic integrity',
    description: 'Flag AI-generated text and plagiarism, with originality reports for every submission.',
    icon: '🛡️',
  },
  {
    id: 'proctoring',
    title: 'Proctored assessments',
    description: 'Lockdown browser mode and optional webcam proctoring for high-stakes exams.',
    icon: '🎥',
  },
  {
    id: 'accessibility',
    title: 'Accessibility first',
    description: 'WCAG 2.2 AA, screen-reader optimised, captions on every video, dyslexia-friendly fonts.',
    icon: '♿',
  },
]

export const packages = [
  {
    slug: 'teacher-starter',
    name: 'Teacher Starter',
    audience: 'Individual teachers & tutors',
    badge: 'Free forever',
    priceMonthly: 0,
    priceAnnual: 0,
    seats: '1 teacher · up to 35 students',
    highlight: false,
    cta: 'Start free',
    description: 'Everything you need to run a single classroom — no credit card required.',
    features: [
      'classrooms', 'gradebook', 'assignments', 'ai-tutor', 'curriculum', 'accessibility',
    ],
    limits: {
      classrooms: 3,
      students: 35,
      storage: '2 GB',
      aiTutorMessages: '500 / month',
    },
    highlights: [
      'Up to 3 classrooms, 35 students each',
      'Full gradebook & assignment tools',
      'AI tutor (on-device, 500 msgs/mo)',
      'Community support',
    ],
  },
  {
    slug: 'teacher-pro',
    name: 'Teacher Pro',
    audience: 'Serious educators & private tutors',
    badge: 'Most popular',
    priceMonthly: 12,
    priceAnnual: 120,
    seats: '1 teacher · unlimited students',
    highlight: true,
    cta: 'Try Pro free for 30 days',
    description: 'Unlimited students, AI-assisted grading, and advanced analytics for the educator who means business.',
    features: [
      'classrooms', 'gradebook', 'assignments', 'ai-tutor', 'ai-grading',
      'analytics', 'curriculum', 'plagiarism', 'accessibility',
    ],
    limits: {
      classrooms: 'Unlimited',
      students: 'Unlimited',
      storage: '50 GB',
      aiTutorMessages: 'Unlimited',
    },
    highlights: [
      'Unlimited classrooms & students',
      'AI-assisted grading & feedback',
      'Analytics & at-risk alerts',
      'Plagiarism & AI-writing detection',
      'Priority email support',
    ],
  },
  {
    slug: 'school-pro',
    name: 'School',
    audience: 'K-12 schools & academies',
    badge: 'Per student / year',
    priceMonthly: null,
    priceAnnual: 6,
    priceUnit: 'per student / year',
    seats: 'Whole school · 50+ students',
    highlight: false,
    cta: 'Get a school quote',
    description: 'Centralised admin, SSO, roster sync, and standards-aligned curriculum for your entire school.',
    features: [
      'classrooms', 'gradebook', 'assignments', 'ai-tutor', 'ai-grading',
      'analytics', 'sso', 'curriculum', 'plagiarism', 'accessibility',
    ],
    limits: {
      classrooms: 'Unlimited',
      students: 'School-wide',
      storage: '1 TB',
      aiTutorMessages: 'Unlimited',
    },
    highlights: [
      'Google / Microsoft / Clever SSO',
      'District admin dashboard',
      'CSTA & NGSS-aligned units',
      'Dedicated onboarding specialist',
      'Parent & guardian portal',
    ],
  },
  {
    slug: 'university',
    name: 'University',
    audience: 'Higher-ed institutions',
    badge: 'Per student / year',
    priceMonthly: null,
    priceAnnual: 12,
    priceUnit: 'per student / year',
    seats: 'Campus-wide · 500+ students',
    highlight: false,
    cta: 'Talk to higher-ed team',
    description: 'LTI 1.3, proctored assessments, research-grade analytics, and white-label hosting for universities.',
    features: [
      'classrooms', 'gradebook', 'assignments', 'ai-tutor', 'ai-grading',
      'analytics', 'sso', 'lti', 'curriculum', 'plagiarism', 'proctoring', 'accessibility',
    ],
    limits: {
      classrooms: 'Unlimited',
      students: 'Unlimited',
      storage: 'Unlimited',
      aiTutorMessages: 'Unlimited',
    },
    highlights: [
      'LTI 1.3 (Canvas, Moodle, Blackboard)',
      'Proctored exams & lockdown browser',
      'SAML 2.0 & SCIM provisioning',
      'Research-grade learning analytics',
      'White-label branding & custom domain',
      '99.95% uptime SLA',
    ],
  },
  {
    slug: 'district-enterprise',
    name: 'District Enterprise',
    audience: 'School districts & ministries',
    badge: 'Custom pricing',
    priceMonthly: null,
    priceAnnual: null,
    priceUnit: 'Custom',
    seats: 'District-wide · 10,000+ students',
    highlight: false,
    cta: 'Request proposal',
    description: 'Multi-school rollout, custom contracts, data-residency options, and white-glove implementation.',
    features: [
      'classrooms', 'gradebook', 'assignments', 'ai-tutor', 'ai-grading',
      'analytics', 'sso', 'lti', 'curriculum', 'plagiarism', 'proctoring', 'accessibility',
    ],
    limits: {
      classrooms: 'Unlimited',
      students: 'Unlimited',
      storage: 'Unlimited',
      aiTutorMessages: 'Unlimited',
    },
    highlights: [
      'Multi-school / multi-tenant admin',
      'EU / US / UAE data residency',
      'On-prem or private-cloud deploy',
      'Custom SLAs & DPA',
      'Dedicated customer success manager',
      'Migration from existing LMS included',
    ],
  },
]

export const lmsAudiences = [
  {
    slug: 'teachers',
    title: 'For Teachers',
    tagline: 'Spend less time grading, more time teaching.',
    hero: 'Run your classroom on autopilot.',
    description: 'Pathways gives individual teachers and tutors a modern, AI-native classroom — gradebook, assignments, an on-device AI tutor, and rubric-based feedback that drafts itself.',
    benefits: [
      'Cut grading time by up to 60% with AI-assisted feedback you review before sending.',
      'Give every student a personal on-device AI tutor that can\'t leak their data.',
      'Pre-built, standards-aligned units you can remix in minutes.',
      'Parent-ready progress reports generated with one click.',
    ],
    recommendedPackages: ['teacher-starter', 'teacher-pro'],
  },
  {
    slug: 'schools',
    title: 'For Schools',
    tagline: 'One platform for every classroom.',
    hero: 'A modern LMS your whole school will actually use.',
    description: 'Roll Pathways out district-wide with Google / Microsoft / Clever SSO, a central admin console, and curriculum mapped to CSTA, NGSS, and Common Core.',
    benefits: [
      'Centralised admin with role-based permissions (teacher, coach, principal, district admin).',
      'Roster sync from Clever, ClassLink, or Google Classroom — no CSVs.',
      'At-risk alerts surface students who need help before grades slip.',
      'COPPA, FERPA, and GDPR compliant by design; student data never trains a third-party model.',
    ],
    recommendedPackages: ['school-pro', 'district-enterprise'],
  },
  {
    slug: 'universities',
    title: 'For Universities',
    tagline: 'Research-grade learning, production-grade platform.',
    hero: 'The LMS built for modern higher ed.',
    description: 'Deploy Pathways as a standalone LMS or embed it inside Canvas, Moodle, or Blackboard via LTI 1.3. Includes proctored assessments, research-grade analytics, and white-label branding.',
    benefits: [
      'LTI 1.3 Advantage — deep-linking, grade passback, and names-and-roles service.',
      'Proctored assessments with optional lockdown browser and AI integrity signals.',
      'Learning analytics APIs for institutional research teams.',
      'White-label branding, custom domain, 99.95% uptime SLA, and SAML 2.0 SSO.',
    ],
    recommendedPackages: ['university', 'district-enterprise'],
  },
]

export function getPackage(slug) {
  return packages.find(p => p.slug === slug)
}

export function getAudience(slug) {
  return lmsAudiences.find(a => a.slug === slug)
}

export function getFeature(id) {
  return lmsFeatures.find(f => f.id === id)
}
