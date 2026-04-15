// Resources marketplace — things anyone in the education ecosystem can find here.
// Each resource has one primary type and one or more audiences it serves.

export const resourceTypes = [
  'Pathway',
  'Course',
  'Lesson plan',
  'Worksheet',
  'Guide',
  'Tool',
  'Workshop',
  'Mentor',
  'Community',
]

export const audienceSlugs = [
  'learners',
  'teachers',
  'schools',
  'parents',
  'educators',
]

export const resources = [
  {
    slug: 'k8-fractions-unit',
    title: 'Fractions: a K–8 unit that actually clicks',
    type: 'Lesson plan',
    audiences: ['teachers', 'parents', 'schools'],
    subjects: ['Math'],
    levels: ['Grades 3–5', 'Grades 6–8'],
    format: '4-week unit · slides + handouts',
    author: 'Ms. Aguilar',
    duration: '4 weeks',
    price: 'Free',
    summary:
      'A hands-on fractions unit built around pizza, music, and measuring cups. Includes editable slides, differentiated worksheets, and an exit-ticket bank.',
  },
  {
    slug: 'classroom-ai-starter',
    title: 'AI in the classroom — a starter kit',
    type: 'Guide',
    audiences: ['teachers', 'schools'],
    subjects: ['EdTech', 'Cross-curricular'],
    levels: ['All levels'],
    format: 'PDF guide + policy templates',
    author: 'Pathways research',
    duration: 'Self-paced',
    price: 'Free',
    summary:
      'How to introduce AI tools responsibly — sample policies, assignment redesigns, and rubrics that still value student thinking.',
  },
  {
    slug: 'reading-with-your-kid',
    title: 'Reading with your kid, ages 4–10',
    type: 'Guide',
    audiences: ['parents'],
    subjects: ['Literacy'],
    levels: ['Early years', 'Primary'],
    format: 'Guide + weekly activity cards',
    author: 'Literacy Lab',
    duration: '12 weeks',
    price: 'Free',
    summary:
      'A gentle weekly rhythm to build a lifelong reading habit — without turning storytime into homework.',
  },
  {
    slug: 'pd-data-literacy',
    title: 'Data literacy PD for teaching staff',
    type: 'Workshop',
    audiences: ['schools', 'teachers'],
    subjects: ['Professional development'],
    levels: ['All staff'],
    format: '3 × 90-min live workshops',
    author: 'Pathways for Institutions',
    duration: '3 weeks',
    price: 'Partner',
    summary:
      'Help every teacher ask better questions of their data — attendance, assessments, engagement — without turning into analysts.',
  },
  {
    slug: 'coaching-frameworks',
    title: 'Coaching frameworks playbook',
    type: 'Tool',
    audiences: ['educators'],
    subjects: ['Coaching'],
    levels: ['All levels'],
    format: 'Notion template + Figma board',
    author: 'Léa B.',
    duration: 'Self-paced',
    price: '$12',
    summary:
      'GROW, OSKAR, and reflective practice — templated for your 1:1s, group sessions, and async check-ins.',
  },
  {
    slug: 'mentor-match',
    title: 'Mentor match — 4 weeks',
    type: 'Mentor',
    audiences: ['learners', 'educators'],
    subjects: ['Career', 'Skills'],
    levels: ['All levels'],
    format: '4 × 45-min 1:1 calls',
    author: 'Vetted mentor network',
    duration: '4 weeks',
    price: '$180',
    summary:
      'Get matched with a mentor in your field. Four focused sessions, goals you set, and follow-up notes you keep.',
  },
  {
    slug: 'middle-school-science-labs',
    title: 'Middle school science — 20 quick labs',
    type: 'Lesson plan',
    audiences: ['teachers', 'parents'],
    subjects: ['Science'],
    levels: ['Grades 6–8'],
    format: 'Lab pack · PDF + printables',
    author: 'Ms. Park',
    duration: 'Drop-in',
    price: '$9',
    summary:
      '20 fast, safe, high-engagement labs using classroom-friendly materials. Clear setup, cleanup, and debrief notes.',
  },
  {
    slug: 'homeschool-weekly-planner',
    title: 'Homeschool weekly planner',
    type: 'Worksheet',
    audiences: ['parents'],
    subjects: ['Homeschool'],
    levels: ['All ages'],
    format: 'Printable PDF + Google Doc',
    author: 'Pathways families',
    duration: 'Reusable',
    price: 'Free',
    summary:
      'A gentle weekly planner that balances focused learning, play, and outdoor time — without overwhelming anyone.',
  },
  {
    slug: 'founders-cohort',
    title: 'Teacher–founder cohort',
    type: 'Community',
    audiences: ['teachers', 'educators'],
    subjects: ['Innovation'],
    levels: ['All educators'],
    format: 'Quarterly cohort + Slack',
    author: 'Pathways community',
    duration: '12 weeks',
    price: 'Free',
    summary:
      'For teachers and educators building new things inside or alongside the classroom. Small cohort, honest feedback, peer support.',
  },
  {
    slug: 'ai-for-builders-pathway',
    title: 'AI Fundamentals for Builders — full pathway',
    type: 'Pathway',
    audiences: ['learners', 'educators'],
    subjects: ['AI', 'Engineering'],
    levels: ['Beginner → Intermediate'],
    format: '9-week mentor-led pathway',
    author: 'Pathways faculty',
    duration: '9 weeks',
    price: '$349',
    summary:
      'Understand how modern AI works and ship a real RAG app — without a PhD. Mentor support and cohort community included.',
    link: '/pathways/ai-fundamentals',
  },
  {
    slug: 'rubric-builder',
    title: 'Rubric builder — smart, editable rubrics',
    type: 'Tool',
    audiences: ['teachers', 'educators'],
    subjects: ['Assessment'],
    levels: ['All levels'],
    format: 'Web tool',
    author: 'Pathways tools',
    duration: 'Instant',
    price: 'Free',
    summary:
      'Generate a first-draft rubric from your learning objectives. Edit, export, and share with students in two clicks.',
  },
  {
    slug: 'ux-for-teachers',
    title: 'UX for teachers — designing your classroom experience',
    type: 'Course',
    audiences: ['teachers', 'educators'],
    subjects: ['Design thinking'],
    levels: ['All levels'],
    format: '6-week online course',
    author: 'Design for Learning',
    duration: '6 weeks',
    price: '$120',
    summary:
      'Apply user-experience thinking to lessons, routines, and classroom spaces. Small tweaks, big shifts in engagement.',
  },
]

export function getResource(slug) {
  return resources.find((r) => r.slug === slug)
}
