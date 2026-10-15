// Recorded-course outline; availability is separate from school curriculum licenses.
export const recordedLevels = [
  { level: 'C', title: 'First sounds & first reading', arabic: 'الأصوات والقراءة الأولى', colour: 'bg-amber-100', description: 'For children starting with no Arabic. Listen and copy first, then discover letter shapes, dots and short vowels.', status: 'Two free videos available', goals: ['Hear and recognise Arabic sounds', 'Find letters by their shapes and dots', 'Begin joining sounds into simple reading'] },
  { level: 'B', title: 'Building Arabic reading', arabic: 'بناء مهارات القراءة العربية', colour: 'bg-sky-100', description: 'The planned Arabic series builds on early reading with long vowels, word building and careful pronunciation. The existing Level B video is a Tajweed-focused preview.', status: 'Free introduction available', goals: ['Strengthen pronunciation', 'Read long vowels and joined words', 'Build everyday vocabulary'] },
  { level: 'A', title: 'Confident Arabic readers', arabic: 'القراءة العربية بثقة', colour: 'bg-rose-100', description: 'The planned later Arabic series: read short passages, understand everyday meanings and build confidence with words and sentences.', status: 'Recorded series planned', goals: ['Read short Arabic passages', 'Understand useful words and sentences', 'Build thoughtful, consistent reading habits'] },
]

export const levelCLessons = [
  { title: 'Lesson 0 · Welcome to the letter families', example: 'Listen → notice → try', status: 'Free now', available: true },
  { title: 'Level C · Lesson 1 · The ب ت ث family', example: 'Same shape, different dots', status: 'Free now', available: true },
  { title: 'Level C · Lesson 2 · The ج ح خ family', example: 'Explore where each sound comes from', status: 'Draft · under review' },
  ...['د ذ', 'ر ز', 'س ش', 'ص ض', 'ط ظ', 'ع غ', 'ف ق'].map(letters => ({ title: `The ${letters} family`, example: 'Listen, copy and spot the difference', status: 'Planned' })),
  { title: 'Meet the remaining letters', example: 'ا ك ل م ن ه و ي · in small groups', status: 'Planned' },
  { title: 'Family games & review', example: 'Hear a sound, find its letter', status: 'Planned' },
  { title: 'Short vowels', example: 'Fatḥah, kasrah and ḍammah · say the sound', status: 'Planned' },
  { title: 'Our first reading steps', example: 'Right to left · letter connections · simple reading', status: 'Planned' },
]
