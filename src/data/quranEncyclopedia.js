// Limited excerpt from the supplied EPUB. Full book stays outside public assets.
export const encyclopedia = { title: 'The Quran Encyclopedia', arabicTitle: 'موسوعة القرآن', chapters: 114, checkoutUrl: null, price: null, format: 'EPUB', reflection: 'After reading the surah, which single verse stayed with you the most — and why that one?' };
// Roots editorial learning prompts are distinct from the book excerpt and sourced reports.
export const fatihaStudy = {
  facts: [
    { title: 'The opening', arabic: 'الفاتحة', text: 'Al-Fatiha opens the Qur’an: surah 1, in Juz 1, with seven verses in the numbering used in this sample.' },
    { title: 'A surah of praise and prayer', arabic: 'الحمد والدعاء', text: 'Its verses praise Allah, affirm worship and reliance on Him, and ask for guidance to the straight path.', source: 'Al-Fatiha 1:2–7', url: 'https://quran.com/1' },
    { title: 'Seven often-repeated verses', arabic: 'السبع المثاني', text: 'The Prophet ﷺ identified Al-Fatiha as the seven repeatedly recited verses and taught its special importance.', source: 'Sahih al-Bukhari 5006', url: 'https://sunnah.com/bukhari:5006' },
  ],
  reflections: [
    { title: 'Manifestation', arabic: 'آثار الاسم في الخلق', text: 'When you read “Lord of the worlds” and the Names of mercy (1:2–3), which specific blessing helps you recognise Allah’s care? Look beyond the object: consider the people, provision and circumstances that brought it to you.' },
    { title: 'Tafakkur', arabic: 'التفكّر', text: 'You ask for guidance in 1:6. Which decision in your life needs that guidance now? What would change if pleasing Allah mattered more than convenience or approval?' },
    { title: 'Akhlāq', arabic: 'الأخلاق', text: 'How could gratitude and mercy reshape one interaction today? Name the person, the action and the time you will act, rather than stopping at a general intention.' },
  ],
  applications: [
    { title: 'Notice → thank → care', text: 'After reading 1:2, name one blessing you usually overlook. Thank Allah, then thank a person involved and care for that blessing—for example, avoid wasting the meal someone prepared.' },
    { title: 'Ask for help, then take a step', text: 'Reflect on 1:5–6 before a difficult task. Ask Allah for help and guidance, then take one responsible step: study, apologise, seek sound advice or correct a mistake.' },
    { title: 'Bring meaning to your prayer', text: 'Before your next prayer, review one verse’s meaning. As you recite, remember what you are saying. Afterwards, choose one action consistent with your request for guidance.' },
  ],
  story: {
    title: 'A lesson before leaving the mosque',
    arabic: 'درس قبل الخروج من المسجد',
    text: 'Abu Sa‘id ibn al-Mu‘alla reported that the Prophet ﷺ promised to teach him the greatest surah before he left the mosque. As they were about to leave, Abu Sa‘id reminded him. The Prophet ﷺ identified Al-Fatiha and explained its connection to the seven repeatedly recited verses.',
    source: 'Sahih al-Bukhari 5006', url: 'https://sunnah.com/bukhari:5006',
    takeaway: 'Roots application: when teaching Al-Fatiha to a child or class, explain why it matters, then explore one verse’s meaning together. This is an educational takeaway from the report, not an additional narration.',
  },
}
export const previewVerses = [
  {
    "transliteration": "Bismillaahir Rahmaanir Raheem",
    "number": 1,
    "arabic": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    "translation": "In the name of Allah, Most Gracious, Most Merciful."
  },
  {
    "transliteration": "Alhamdu lillaahi Rabbil 'aalameen",
    "number": 2,
    "arabic": "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
    "translation": "Praise be to Allah, the Cherisher and Sustainer of the worlds;"
  },
  {
    "transliteration": "Ar-Rahmaanir-Raheem",
    "number": 3,
    "arabic": "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    "translation": "Most Gracious, Most Merciful;"
  },
  {
    "transliteration": "Maaliki Yawmid-Deen",
    "number": 4,
    "arabic": "مَٰلِكِ يَوْمِ ٱلدِّينِ",
    "translation": "Master of the Day of Judgment."
  },
  {
    "transliteration": "Iyyaaka na'budu wa lyyaaka nasta'een",
    "number": 5,
    "arabic": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    "translation": "Thee do we worship, and Thine aid we seek."
  },
  {
    "transliteration": "Ihdinas-Siraatal-Mustaqeem",
    "number": 6,
    "arabic": "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
    "translation": "Show us the straight way,"
  },
  {
    "transliteration": "Siraatal-lazeena an'amta 'alaihim ghayril-maghdoobi 'alaihim wa lad-daaalleen",
    "number": 7,
    "arabic": "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
    "translation": "The way of those on whom Thou hast bestowed Thy Grace, those whose (portion) is not wrath, and who go not astray."
  }
];

