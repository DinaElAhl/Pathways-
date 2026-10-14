// Recorded-course outline; availability is separate from school curriculum licenses.
export const recordedLevels = [
  { level: 'C', title: 'First sounds & first reading', arabic: 'الأصوات والقراءة الأولى', colour: 'bg-amber-100', description: 'For children starting with no Arabic. Listen and copy first, then discover letter shapes, dots and short vowels.', status: 'Two free videos available', goals: ['Hear and recognise Arabic sounds', 'Find letters by their shapes and dots', 'Begin joining sounds into simple reading'] },
  { level: 'B', title: 'Tajweed foundations', arabic: 'أساسيات التجويد', colour: 'bg-sky-100', description: 'Build on early reading with careful pronunciation and introductory Tajweed practice. Watch the free introduction; further lessons are planned.', status: 'Free introduction available', goals: ['Strengthen pronunciation', 'Explore foundational Tajweed rules', 'Practise guided Qur’anic reading'] },
  { level: 'A', title: 'Growing Qur’anic readers', arabic: 'نحو قراءة قرآنية متقنة', colour: 'bg-rose-100', description: 'The planned later series: develop more advanced Tajweed practice, reading confidence and the manners of learning Qur’an.', status: 'Recorded series planned', goals: ['Apply more advanced Tajweed', 'Practise with guided passages', 'Build thoughtful, consistent reading habits'] },
]

export const levelCLessons = [
  { title: 'Welcome to the letter families', example: 'Listen → notice → try', status: 'Free now', available: true },
  { title: 'Lesson 1 · The ب ت ث family', example: 'Same shape, different dots', status: 'Free now', available: true },
  { title: 'Lesson 2 · The ج ح خ family', example: 'Explore where each sound comes from', status: 'Draft · under review' },
  ...['د ذ', 'ر ز', 'س ش', 'ص ض', 'ط ظ', 'ع غ', 'ف ق'].map(letters => ({ title: `The ${letters} family`, example: 'Listen, copy and spot the difference', status: 'Planned' })),
  { title: 'Meet the remaining letters', example: 'ا ك ل م ن ه و ي · in small groups', status: 'Planned' },
  { title: 'Family games & review', example: 'Hear a sound, find its letter', status: 'Planned' },
  { title: 'Short vowels', example: 'Fatḥah, kasrah and ḍammah · say the sound', status: 'Planned' },
  { title: 'Our first reading steps', example: 'Right to left · letter connections · simple reading', status: 'Planned' },
]
