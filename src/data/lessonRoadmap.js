import { videoPreviews } from './videoPreviews.js'

// Recorded-course outline; availability is separate from school curriculum licenses.
export const recordedLevels = [
  { level: 'C', title: 'First sounds & first reading', arabic: 'الأصوات والقراءة الأولى', colour: 'bg-amber-100', description: 'For children starting with no Arabic. Listen and copy first, then discover letter shapes, dots and short vowels.', status: 'Free ES-C series', goals: ['Hear and recognise Arabic sounds', 'Find letters by their shapes and dots', 'Begin joining sounds into simple reading'] },
  { level: 'B', title: 'Building Arabic reading', arabic: 'بناء مهارات القراءة العربية', colour: 'bg-sky-100', description: 'The planned Arabic series builds on early reading with long vowels, word building and careful pronunciation. The existing Level B video is a Tajweed-focused preview.', status: 'Free introduction available', goals: ['Strengthen pronunciation', 'Read long vowels and joined words', 'Build everyday vocabulary'] },
  { level: 'A', title: 'Confident Arabic readers', arabic: 'القراءة العربية بثقة', colour: 'bg-rose-100', description: 'The planned later Arabic series: read short passages, understand everyday meanings and build confidence with words and sentences.', status: 'Free introduction available', goals: ['Read short Arabic passages', 'Understand useful words and sentences', 'Build thoughtful, consistent reading habits'] },
]

export const levelCLessons = [
  { title: 'Lesson 0 · Welcome to the letter families', example: 'Listen → notice → try', status: 'Free now', available: true, thumbnail: videoPreviews.find(video => video.id === 'introduction').poster },
  { title: 'Level C · Lesson 1 · The ب ت ث family', example: 'Same shape, different dots', status: 'Free now', available: true, thumbnail: videoPreviews.find(video => video.id === 'lesson-1').poster },
  { title: 'Level C · Lesson 2 · The ج ح خ family', example: 'Explore where each sound comes from', video: 'video-previews/es-c-02.mp4?v=es-c-sunny', thumbnail: 'assets/lesson-thumbnails/es-c-02.webp?v=es-c-sunny' },
  { title: 'The د ذ family', example: 'Listen, copy and spot the difference', video: 'video-previews/es-c-03.mp4?v=es-c-sunny', thumbnail: 'assets/lesson-thumbnails/es-c-03.webp?v=es-c-sunny' },
  ...['The ر ز family', 'The س ش family', 'The ص ض family', 'The ط ظ family', 'The ع غ family', 'The ف ق pair', 'Alif and hamzah', 'Meet ك and ل'].map((title, index) => ({
    title,
    example: 'Listen, copy and spot the difference',
    video: `video-previews/es-c-${String(index + 4).padStart(2, '0')}.mp4`,
    thumbnail: `assets/lesson-thumbnails/es-c-${String(index + 4).padStart(2, '0')}.webp`,
  })),
  { title: 'Meet م and ن', example: 'Listen for mīm and nūn', video: 'video-previews/es-c-12.mp4', thumbnail: 'assets/lesson-thumbnails/es-c-12.webp' },
  { title: 'Meet ه و ي', example: 'Three more letter shapes and sounds', video: 'video-previews/es-c-13.mp4', thumbnail: 'assets/lesson-thumbnails/es-c-13.webp' },
  { title: 'Family games & review', example: 'Hear a sound, find its letter', status: 'Planned' },
  { title: 'Short vowels', example: 'Fatḥah, kasrah and ḍammah · say the sound', status: 'Planned' },
  { title: 'Our first reading steps', example: 'Right to left · letter connections · simple reading', status: 'Planned' },
]
