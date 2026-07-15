// Roots Tajweed Reading Series — a 5-lesson curriculum by Dina Mohamed Sayed El-Ahl
// Sold on both Payhip and Gumroad; buyers pick whichever platform they prefer.

export const shopBundle = {
  id: 'roots-tajweed-bundle',
  title: 'Roots Tajweed Reading Series — the full bundle',
  arabicTitle: 'جذور',
  eyebrow: 'Bundle · Best value',
  price: 15,
  currency: 'USD',
  savings: 5, // $20 individual vs $15 bundle
  lessonCount: 5,
  summary:
    'A complete beginner-to-reader progression that walks learners from the Arabic alphabet to reading with short vowels and tanwin. Print-ready worksheets, guided practice, and formative checks in every lesson.',
  bullets: [
    'Print-ready PDF workbooks',
    'Quran-anchored throughout Juz ‘Amma',
    'Designed for tutors, homeschoolers, and weekend-madrasah teachers',
  ],
  payhipUrl: 'https://payhip.com/b/CeFMp',
  gumroadUrl: 'https://bududiva.gumroad.com/l/dlxop',
};

export const shopLessons = [
  {
    id: 'lesson-1',
    number: 1,
    title: 'The Letters',
    subtitle: 'An Arabic Alphabet Reader',
    description:
      'Recognize, name, and form every letter of the Arabic alphabet with guided practice.',
    price: 4,
    payhipUrl: 'https://payhip.com/b/CeFMp',
    gumroadUrl: 'https://bududiva.gumroad.com/l/jrfsb',
  },
  {
    id: 'lesson-2',
    number: 2,
    title: 'New Sounds & the Hamza',
    subtitle: 'Points of Articulation',
    description:
      'Where each letter is actually made in the mouth, with a careful walk-through of the hamza.',
    price: 4,
    payhipUrl: 'https://payhip.com/b/CeFMp',
    gumroadUrl: 'https://bududiva.gumroad.com/l/ytutgq',
  },
  {
    id: 'lesson-3',
    number: 3,
    title: 'Letter Families',
    subtitle: 'Shared sounds and shapes',
    description:
      'The natural groupings of letters that share sounds, shapes, and articulation points — the groundwork for tajweed later on.',
    price: 4,
    payhipUrl: 'https://payhip.com/b/CeFMp',
    gumroadUrl: 'https://bududiva.gumroad.com/l/kgekji',
  },
  {
    id: 'lesson-4',
    number: 4,
    title: 'Letter Shapes in a Word',
    subtitle: 'Initial, medial, final forms',
    description:
      'How each letter takes an initial, medial, and final form when it joins others — the moment Arabic starts to feel readable.',
    price: 4,
    payhipUrl: 'https://payhip.com/b/CeFMp',
    gumroadUrl: 'https://bududiva.gumroad.com/l/wtwpoe',
  },
  {
    id: 'lesson-5',
    number: 5,
    title: 'Short Vowels & Tanwin',
    subtitle: 'From letters to fluent reading',
    description:
      'Fatha, kasra, damma, and the tanwin endings — the last step from letter-recognition to genuine reading of Quranic Arabic.',
    price: 4,
    payhipUrl: 'https://payhip.com/b/CeFMp',
    gumroadUrl: 'https://bududiva.gumroad.com/l/htpzwd',
  },
];

// shopKits export removed 2026-07-15 — the four Elementary Kit retail
// bundles ($79–$249) were undercutting the $10k/level school license on
// /for-schools. Full original data preserved in docs/archive/shop-es-kits.md
// for restoration if the licensing tier changes.

export const shopAuthor = {
  name: 'Dina Mohamed Sayed El-Ahl',
  bio: 'An Arabic and Quranic Studies educator who taught online at a US-based Islamic school, with a master’s degree in Arabic natural language processing, and a career built on making the Quran readable for anyone who wants to learn.',
  payhipStore: 'https://payhip.com/b/CeFMp',
  gumroadStore: 'https://bududiva.gumroad.com/',
};
