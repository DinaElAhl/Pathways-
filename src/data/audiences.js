// Audience groups — who Pathways serves and how.
export const audiences = [
  {
    slug: 'learners',
    name: 'Learners',
    headline: 'Find your next skill — and the path to actually learn it.',
    sub: 'Students, career-changers, and lifelong learners.',
    icon: 'target',
    color: 'from-brand-500 to-brand-700',
    highlights: [
      'Curated learning pathways with real projects',
      'Mentor office hours and peer review',
      'Portfolio-ready work on every pathway',
      'Flexible pace, clear weekly goals',
    ],
    resourceTypes: ['Pathway', 'Course', 'Community'],
    ctas: [
      { label: 'Browse pathways', to: '/pathways', primary: true },
      { label: 'See learner resources', to: '/resources?audience=learners' },
    ],
    testimonial: {
      quote:
        'I finally finished something. The pathway gave me structure and the community kept me going.',
      name: 'Priya S.',
      role: 'Career-changer, Data Science pathway',
    },
  },
  {
    slug: 'teachers',
    name: 'Teachers',
    headline: 'Ready-to-use lessons, units, and tools — for the classroom you actually teach.',
    sub: 'K–12 and higher-ed classroom teachers.',
    icon: 'sparkles',
    color: 'from-emerald-500 to-emerald-700',
    highlights: [
      'Standards-aligned lesson plans and units',
      'Editable slides, handouts, and rubrics',
      'Differentiation tips built into every plan',
      'A community of teachers sharing what works',
    ],
    resourceTypes: ['Lesson plan', 'Worksheet', 'Tool', 'Community'],
    ctas: [
      { label: 'Browse teacher resources', to: '/resources?audience=teachers', primary: true },
      { label: 'Join the teacher community', to: '/contact' },
    ],
    testimonial: {
      quote:
        'I cut my planning time in half and still walked into class more prepared than ever.',
      name: 'Mr. Olawale',
      role: '8th grade Science teacher',
    },
  },
  {
    slug: 'schools',
    name: 'Schools & Institutions',
    headline: 'Curriculum, PD, and analytics — for whole schools and districts.',
    sub: 'Schools, districts, nonprofits, and companies.',
    icon: 'server',
    color: 'from-sky-500 to-sky-700',
    highlights: [
      'Whole-school licenses with admin controls',
      'Professional development pathways for staff',
      'Usage and impact analytics by cohort',
      'Dedicated partner success manager',
    ],
    resourceTypes: ['Pathway', 'Course', 'Workshop'],
    ctas: [
      { label: 'Talk to partnerships', to: '/apply/partner', primary: true },
      { label: 'See institution resources', to: '/resources?audience=schools' },
    ],
    testimonial: {
      quote:
        'Pathways gave our district a shared language for PD across 14 schools. Engagement tripled.',
      name: 'Dr. Rivera',
      role: 'Director of Teaching & Learning',
    },
  },
  {
    slug: 'parents',
    name: 'Parents',
    headline: 'Support your kid\u2019s curiosity — with guides, activities, and trusted resources.',
    sub: 'Parents, guardians, and homeschoolers.',
    icon: 'heart',
    color: 'from-rose-500 to-rose-700',
    highlights: [
      'Age-appropriate activities and reading lists',
      'Screen-smart learning — not just more screens',
      'Homeschool-friendly unit plans',
      'Honest guidance from real educators',
    ],
    resourceTypes: ['Guide', 'Worksheet', 'Community'],
    ctas: [
      { label: 'Browse family resources', to: '/resources?audience=parents', primary: true },
      { label: 'Ask an educator', to: '/contact' },
    ],
    testimonial: {
      quote:
        'The weekly family activities replaced screen time with the best conversations we\u2019ve ever had.',
      name: 'Amina & Tariq',
      role: 'Parents of a curious 9-year-old',
    },
  },
  {
    slug: 'educators',
    name: 'Educators',
    headline: 'Tools and community for tutors, coaches, trainers, and curriculum designers.',
    sub: 'Tutors, coaches, trainers, curriculum designers.',
    icon: 'bolt',
    color: 'from-accent-500 to-accent-600',
    highlights: [
      'Build and publish your own pathway',
      'Coaching frameworks and session templates',
      'Mentor matching and community of practice',
      'Earn revenue when learners enroll',
    ],
    resourceTypes: ['Tool', 'Workshop', 'Mentor', 'Community'],
    ctas: [
      { label: 'Become a Pathways educator', to: '/apply/educator', primary: true },
      { label: 'Browse educator resources', to: '/resources?audience=educators' },
    ],
    testimonial: {
      quote:
        'I turned my Saturday coaching sessions into a pathway and reached learners in 12 countries.',
      name: 'Léa B.',
      role: 'Independent UX coach',
    },
  },
]

export function getAudience(slug) {
  return audiences.find((a) => a.slug === slug)
}
