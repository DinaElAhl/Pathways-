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

// Full Elementary Kits — bundle-of-bundles for homeschoolers and single teachers
// who want everything for a track (or everything across all three).
// NOTE: These four kits are not yet listed on Payhip or Gumroad. Until Dina
// creates the products there, the "Buy" button opens a purchase-enquiry email.
// Swap `buyEmail` for `payhipUrl` / `gumroadUrl` in each entry once the products
// go live on the marketplaces.
export const shopKits = [
  {
    id: 'kit-beginner',
    track: 'ES-C',
    name: 'Roots — Full Beginner Kit',
    tagline: 'Everything a beginner (ES-C) student needs',
    description:
      'Every beginner resource pack in one bundle: phonics cards, word-shape toolkit, multi-letter sets, short-vowel guides, and target-surah manuals for the beginner track.',
    price: 79,
    buyEmail: 'dinabudu@gmail.com',
  },
  {
    id: 'kit-intermediate',
    track: 'ES-B',
    name: 'Roots — Full Intermediate Kit',
    tagline: 'Everything for the intermediate (ES-B) track',
    description:
      'All intermediate resource packs plus the tajweed foundations kit — ready to run a full year of the ES-B curriculum from home.',
    price: 99,
    buyEmail: 'dinabudu@gmail.com',
  },
  {
    id: 'kit-advanced',
    track: 'ES-A',
    name: 'Roots — Full Advanced Kit',
    tagline: 'Everything for the advanced (ES-A) track',
    description:
      'All advanced resource packs plus adaab, capstone portfolios, and evaluation portfolio templates for graduating students.',
    price: 129,
    buyEmail: 'dinabudu@gmail.com',
  },
  {
    id: 'kit-everything-elementary',
    track: 'All 3 tracks',
    name: 'Roots — Everything Elementary',
    tagline: 'All three kits together',
    description:
      'The full elementary bundle: Beginner + Intermediate + Advanced kits. Everything a homeschool or microschool needs to run the entire Roots elementary curriculum.',
    price: 249,
    badge: 'Save $58',
    buyEmail: 'dinabudu@gmail.com',
  },
];

// Original Arabic writing by Dina — a separate product from the Tajweed series.
export const shopBooks = [
  {
    id: 'min-dilin-wahid',
    arabicTitle: 'من ضلعٍ واحدٍ لا أربعة',
    romanization: 'Min Dilʿin Wāḥidin Lā Arbaʿa',
    englishTitle: 'From One Rib, Not Four',
    eyebrow: 'Arabic essay · Original writing',
    priceLabel: '$10+',
    minPrice: 10,
    description:
      'A short Arabic-language book, pay-what-you-want above $10. An intimate literary essay from Dina — for readers who enjoy Arabic prose and want to support her writing directly.',
    // Gumroad only — this title is not on Payhip.
    gumroadUrl: 'https://bududiva.gumroad.com/l/rhcjno',
  },
];

export const shopAuthor = {
  name: 'Dina Mohamed Sayed El-Ahl',
  bio: 'An Arabic and Quranic Studies educator with 7+ years teaching online in a US-based Islamic school, a master’s degree in Arabic natural language processing, and a career built on making the Quran readable for anyone who wants to learn.',
  payhipStore: 'https://payhip.com/b/CeFMp',
  gumroadStore: 'https://bududiva.gumroad.com/',
};
