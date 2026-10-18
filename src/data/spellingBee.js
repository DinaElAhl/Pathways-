import { arabicAudio } from './arabicAudio.js'

export const spellingAgeBands = [
  { id: 'ES', label: 'Elementary' },
  { id: 'MS', label: 'Middle school' },
  { id: 'HS', label: 'High school' },
]

export const spellingStages = {
  C: { title: 'First words', arabic: 'كَلِمَاتِي الْأُولَى', seconds: 180, description: 'Build familiar short words, one letter at a time.' },
  B: { title: 'Word builders', arabic: 'نَبْنِي الْكَلِمَاتِ', seconds: 180, description: 'Notice long vowels, joining letters and hamzah.' },
  A: { title: 'Words in a phrase', arabic: 'كَلِمَاتٌ وَعِبَارَاتٌ', seconds: 240, description: 'Spell familiar phrases and keep the spaces between words.' },
}

const word = (id, text, meaning, clue, audioKey = text) => ({ id, text, meaning, clue, audio: arabicAudio[audioKey] })
const door = word('door', 'بَاب', 'door', 'بَ + ا + ب. The alif lengthens the vowel after the first ب.')
const house = word('house', 'بَيْت', 'house', 'بَ + يْ + ت. Keep the middle ي and the final ت.')
const pen = word('pen', 'قَلَم', 'pen', 'قَ + لَ + م. Start with ق, not ك.')
const book = word('book', 'كِتَاب', 'book', 'كِ + تَ + ا + ب. Keep the alif between ت and ب.')
const water = word('water', 'مَاء', 'water', 'مَ + ا + ء. This word ends with hamzah ء, not an extra alif.')

// Starter bank uses existing practice recordings only. It is not a broad
// competition bank or a pronunciation / CEFR assessment.
export const spellingWords = {
  C: [door, house, pen],
  B: [book, water, door, house, pen],
  A: [
    word('this-book', 'هَذَا كِتَاب', 'This is a book.', 'Keep a space after هَذَا. كِتَاب includes alif after ت.'),
    word('this-pen', 'هَذَا قَلَم', 'This is a pen.', 'Keep a space after هَذَا. The second word begins with ق.'),
    word('where-house', 'أَيْنَ الْبَيْت', 'Where is the house?', 'أَيْنَ begins with hamzah on alif أ. Keep the space before الْبَيْت.'),
    word('thanks', 'شُكْرًا', 'Thank you.', 'The spelling includes the final alif: ش ك ر ا. Vowel marks are optional for this spelling check.'),
    word('morning', 'صَبَاحُ الْخَيْر', 'Good morning.', 'Two words: صَبَاحُ and الْخَيْر. Keep the alif in صَبَاحُ and the space.'),
  ],
}

// Ignore optional vowel marks, display controls and punctuation, but preserve
// spelling contrasts: أ/ا, ء, ة/ه and ى/ي must not collapse into one another.
export function normalizeSpelling(value) {
  return String(value ?? '').normalize('NFKC')
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '')
    .replace(/[؟،؛,.!?]/g, '').replace(/\s+/g, ' ').trim()
}

export function spellingMatches(answer, target) {
  return normalizeSpelling(answer) !== '' && normalizeSpelling(answer) === normalizeSpelling(target)
}

export function letterTiles(text) {
  const tiles = []
  for (const char of text.normalize('NFC')) {
    if (/\p{Mark}/u.test(char) && tiles.length) tiles[tiles.length - 1] += char
    else tiles.push(char)
  }
  return tiles
}

export function seededShuffle(items, seed) {
  let hash = 2166136261
  for (const char of String(seed)) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    hash = (Math.imul(hash, 1664525) + 1013904223) >>> 0
    const j = hash % (i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function roundSummary(entries, total) {
  const values = Object.values(entries)
  return {
    firstTry: values.filter(entry => entry.firstTry).length,
    corrected: values.filter(entry => entry.corrected).length,
    unanswered: Math.max(0, total - values.length),
  }
}
