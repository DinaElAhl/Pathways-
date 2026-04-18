// Trusted partner picks — curated lesser-known-but-trusted resources.
//
// Some of these links are affiliate / referral links. If a learner signs up or
// buys through them, Pathways may earn a small commission at no extra cost to
// the learner. We only include resources that our team has personally vetted
// or that come highly recommended by the educator community.
//
// To add a new partner: duplicate an entry below, fill in the fields, and
// (optionally) put your affiliate id in the `ref` field. The outbound URL
// used by the site is `baseUrl` with `?ref=<ref>` appended when a `ref`
// is present. If a resource is fully free, set `commission` to `null`.

export const affiliateDisclosure = [
  'Some links on this page are referral links.',
  'If you sign up or buy through them, Pathways may earn a small commission — at no extra cost to you.',
  'We never recommend a resource just because it pays. Every pick here is vetted by our team or trusted educators.',
].join(' ')

export const partnerCategories = [
  'Languages',
  'Coding',
  'Design',
  'Data & AI',
  'Kids & Family',
  'Tools',
  'Books',
]

export const partners = [
  {
    slug: 'language-transfer',
    name: 'Language Transfer',
    category: 'Languages',
    subject: 'Arabic, Spanish, French, German, and more',
    tagline: 'Think in the language, not translate — completely free.',
    description:
      'Mihalis Eleftheriou\'s audio courses teach you to build sentences from the inside. Free, community-supported, and genuinely excellent — especially for Arabic and Spanish.',
    highlights: [
      'Audio-first — great for commutes',
      'No ads, no upsells, fully free',
      'Covers 10+ languages with a consistent method',
    ],
    baseUrl: 'https://www.languagetransfer.org/',
    ref: null,
    price: 'Free',
    commission: null,
    vetted: true,
  },
  {
    slug: 'italki',
    name: 'italki',
    category: 'Languages',
    subject: 'All languages — 1:1 tutors',
    tagline: 'Affordable 1:1 lessons with vetted language tutors worldwide.',
    description:
      'For Arabic, Turkish, Japanese, Mandarin, and nearly any other language — italki pairs you with community tutors and professional teachers from \$8/hr.',
    highlights: [
      '150+ languages available',
      'Try different tutors before committing',
      'Great fit after a Pathways language path',
    ],
    baseUrl: 'https://www.italki.com/',
    ref: 'pathways',
    price: 'From \$8 / hr',
    commission: 'Referral',
    vetted: true,
  },
  {
    slug: 'madinah-arabic',
    name: 'Madinah Arabic',
    category: 'Languages',
    subject: 'Classical & Modern Standard Arabic',
    tagline: 'Classic free textbooks used in Arabic programs worldwide.',
    description:
      'The Madinah Arabic books (free PDFs + paired lessons) are the gold standard for structured Arabic grammar. Ideal after finishing our Arabic pathway\'s alphabet stage.',
    highlights: [
      'Free PDF textbooks with audio',
      'Used by universities and madrasas globally',
      'Strong community support on YouTube',
    ],
    baseUrl: 'https://www.madinaharabic.com/',
    ref: null,
    price: 'Free',
    commission: null,
    vetted: true,
  },
  {
    slug: 'readlang',
    name: 'Readlang',
    category: 'Languages',
    subject: 'Reading practice in 50+ languages',
    tagline: 'Read anything — tap any word for an instant translation.',
    description:
      'A lesser-known but beloved tool for intermediate language learners. Import articles, books, or lyrics and build a personal spaced-repetition deck as you read.',
    highlights: [
      'Works in your browser',
      'Builds flashcards automatically',
      'Generous free tier',
    ],
    baseUrl: 'https://readlang.com/',
    ref: null,
    price: 'Freemium — from \$5 / mo',
    commission: 'Referral',
    vetted: true,
  },
  {
    slug: 'the-odin-project',
    name: 'The Odin Project',
    category: 'Coding',
    subject: 'Full-stack web development',
    tagline: 'A free, open-source full-stack curriculum with real projects.',
    description:
      'Genuinely one of the best paths from zero to hireable web developer — and it is fully free. Pairs perfectly with our Modern Web Development pathway.',
    highlights: [
      'Project-based — you build real apps',
      'Active Discord community',
      'Completely free, open-source curriculum',
    ],
    baseUrl: 'https://www.theodinproject.com/',
    ref: null,
    price: 'Free',
    commission: null,
    vetted: true,
  },
  {
    slug: 'exercism',
    name: 'Exercism',
    category: 'Coding',
    subject: '70+ programming languages',
    tagline: 'Free coding practice with human mentorship.',
    description:
      'Solve coding exercises in any of 70+ languages and get feedback from real human mentors — not just an auto-grader. Completely free, nonprofit.',
    highlights: [
      '70+ tracks from Python to Rust',
      'Free human code reviews',
      'Nonprofit — funded by donors',
    ],
    baseUrl: 'https://exercism.org/',
    ref: null,
    price: 'Free',
    commission: null,
    vetted: true,
  },
  {
    slug: 'frontendmasters',
    name: 'Frontend Masters',
    category: 'Coding',
    subject: 'Advanced JavaScript, React, systems',
    tagline: 'Deep-dive video courses from industry practitioners.',
    description:
      'Not the cheapest, but genuinely the best place to level up from junior to senior front-end. Courses by Kyle Simpson, Brian Holt, and other well-known engineers.',
    highlights: [
      'Live workshops + replays',
      'Deep, slow-paced learning',
      'Good fit after The Odin Project',
    ],
    baseUrl: 'https://frontendmasters.com/',
    ref: 'pathways',
    price: '\$39 / mo',
    commission: 'Affiliate',
    vetted: true,
  },
  {
    slug: 'figma-education',
    name: 'Figma for Education',
    category: 'Design',
    subject: 'UI/UX design',
    tagline: 'Figma — free for students and teachers.',
    description:
      'Figma\'s education plan is free for verified students and educators and unlocks the Professional tier. Useful for our UX & Product Design pathway.',
    highlights: [
      'Free Professional plan for verified educators',
      'Realtime collaboration',
      'Industry-standard design tool',
    ],
    baseUrl: 'https://www.figma.com/education/',
    ref: null,
    price: 'Free (education)',
    commission: null,
    vetted: true,
  },
  {
    slug: 'school-of-motion',
    name: 'School of Motion',
    category: 'Design',
    subject: 'Motion design & animation',
    tagline: 'The best-in-class motion design school — by practitioners.',
    description:
      'Pricey but genuinely career-changing for aspiring motion designers. Great community and well-known alumni in the industry.',
    highlights: [
      'Cohort-based — you finish what you start',
      'Portfolio-ready projects',
      'Strong alumni network',
    ],
    baseUrl: 'https://www.schoolofmotion.com/',
    ref: 'pathways',
    price: 'From \$599 / course',
    commission: 'Affiliate',
    vetted: true,
  },
  {
    slug: 'fast-ai',
    name: 'fast.ai',
    category: 'Data & AI',
    subject: 'Deep learning for coders',
    tagline: 'Top-down practical deep learning — completely free.',
    description:
      'Jeremy Howard\'s course is the best free way to go from "I know Python" to shipping real deep-learning projects. Pairs with our AI Fundamentals pathway.',
    highlights: [
      'Free course + free book',
      'Top-down teaching style',
      'Used by researchers and hobbyists alike',
    ],
    baseUrl: 'https://www.fast.ai/',
    ref: null,
    price: 'Free',
    commission: null,
    vetted: true,
  },
  {
    slug: 'kaggle-learn',
    name: 'Kaggle Learn',
    category: 'Data & AI',
    subject: 'Data science micro-courses',
    tagline: 'Short, hands-on data-science courses with real datasets.',
    description:
      'Kaggle\'s own free micro-courses are an underrated starting point: Pandas, Intro to ML, SQL, and more. Pairs with our Applied Data Science pathway.',
    highlights: [
      'Free, hands-on notebooks',
      'Strong community for competitions',
      'Tight focus — each course is 3–5 hours',
    ],
    baseUrl: 'https://www.kaggle.com/learn',
    ref: null,
    price: 'Free',
    commission: null,
    vetted: true,
  },
  {
    slug: 'anthropic-academy',
    name: 'Anthropic — Building with Claude',
    category: 'Data & AI',
    subject: 'LLM app development',
    tagline: 'Free cookbook and prompt engineering guides from Anthropic.',
    description:
      'If you are building with LLMs, Anthropic\'s cookbook and prompt engineering docs are some of the most practical, up-to-date material available anywhere.',
    highlights: [
      'Free cookbook with runnable notebooks',
      'Deep prompt engineering guide',
      'Updated regularly',
    ],
    baseUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering',
    ref: null,
    price: 'Free',
    commission: null,
    vetted: true,
  },
  {
    slug: 'beast-academy',
    name: 'Beast Academy',
    category: 'Kids & Family',
    subject: 'Elementary math (grades 2–5)',
    tagline: 'Hard math for curious kids — in comic-book form.',
    description:
      'From the Art of Problem Solving team. Lesser known than Khan Academy, but beloved by parents who want their kids to enjoy deeper math.',
    highlights: [
      'Comic-book style lessons',
      'Genuinely challenging problems',
      'Online + print options',
    ],
    baseUrl: 'https://beastacademy.com/',
    ref: 'pathways',
    price: 'From \$15 / mo',
    commission: 'Affiliate',
    vetted: true,
  },
  {
    slug: 'outschool',
    name: 'Outschool',
    category: 'Kids & Family',
    subject: 'Live online classes for K–12',
    tagline: 'Thousands of small-group classes for curious kids.',
    description:
      'Underrated by busy parents: live, small-group classes on everything from Latin to game design. Pairs well with homeschool schedules.',
    highlights: [
      'Small-group live classes',
      'Teachers vetted by Outschool',
      'Huge variety of subjects',
    ],
    baseUrl: 'https://outschool.com/',
    ref: 'pathways',
    price: 'From \$10 / class',
    commission: 'Referral',
    vetted: true,
  },
  {
    slug: 'zotero',
    name: 'Zotero',
    category: 'Tools',
    subject: 'Research & citation',
    tagline: 'Free, open-source citation manager used by researchers worldwide.',
    description:
      'If you are doing any academic writing, Zotero is the best free tool for managing sources and generating citations. Pairs with our Academic Writing pathway.',
    highlights: [
      'Free and open-source',
      'Works with Word, Google Docs, LibreOffice',
      '300MB free cloud sync',
    ],
    baseUrl: 'https://www.zotero.org/',
    ref: null,
    price: 'Free',
    commission: null,
    vetted: true,
  },
  {
    slug: 'obsidian',
    name: 'Obsidian',
    category: 'Tools',
    subject: 'Note-taking & study',
    tagline: 'Local-first knowledge graph — great for students.',
    description:
      'A powerful, privacy-respecting note-taking app that many students swear by for building lasting study notes. Free for personal use.',
    highlights: [
      'Your notes stay on your device',
      'Rich plugin ecosystem',
      'Free for personal use',
    ],
    baseUrl: 'https://obsidian.md/',
    ref: null,
    price: 'Free for personal use',
    commission: null,
    vetted: true,
  },
  {
    slug: 'project-gutenberg',
    name: 'Project Gutenberg',
    category: 'Books',
    subject: 'Public-domain books',
    tagline: 'Over 70,000 free classic books — legally.',
    description:
      'For literature, philosophy, or older academic texts, Project Gutenberg is an underrated goldmine. Perfect for Academic Writing and Humanities pathways.',
    highlights: [
      '70,000+ free, legal books',
      'Multiple formats (EPUB, PDF, plain text)',
      'Nonprofit — donor-funded',
    ],
    baseUrl: 'https://www.gutenberg.org/',
    ref: null,
    price: 'Free',
    commission: null,
    vetted: true,
  },
  {
    slug: 'openstax',
    name: 'OpenStax',
    category: 'Books',
    subject: 'Peer-reviewed college textbooks',
    tagline: 'Free, peer-reviewed college textbooks by Rice University.',
    description:
      'OpenStax publishes free, openly licensed textbooks for college-level math, science, social science, and business — used by real universities.',
    highlights: [
      'Free PDF + cheap print versions',
      'Peer-reviewed by faculty',
      'Used by 60%+ of US colleges',
    ],
    baseUrl: 'https://openstax.org/',
    ref: null,
    price: 'Free',
    commission: null,
    vetted: true,
  },
]

// Build the outbound URL for a partner — appending ?ref= only when a ref is set.
export function partnerUrl(partner) {
  if (!partner.ref) return partner.baseUrl
  const sep = partner.baseUrl.includes('?') ? '&' : '?'
  return `${partner.baseUrl}${sep}ref=${partner.ref}`
}

export function getPartner(slug) {
  return partners.find((p) => p.slug === slug)
}
