import { NON_NATIVE_BANK } from '../server/nonNativeBank.js'

// Written-language pilot only. Client-supplied marks, pass flags and totals
// are never accepted. This endpoint is not a proctored attempt registry.
export function scoreArabic(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('Invalid attempt.')
  const { level, schoolType } = payload
  if (!/^L[1-4]$/.test(level) || !['primary', 'middle', 'highschool', 'adult'].includes(schoolType)) throw new Error('Unknown assessment form.')
  const items = NON_NATIVE_BANK[level][schoolType]
  if (!Array.isArray(payload.answers) || payload.answers.length > items.length) throw new Error('Invalid answer list.')
  const submitted = new Map()
  for (const answer of payload.answers) {
    if (!answer || typeof answer.q !== 'string' || submitted.has(answer.q)) throw new Error('Duplicate or invalid item.')
    const item = items.find(q => q.id === answer.q)
    if (!item || (answer.chosen !== null && !item.opts.includes(answer.chosen))) throw new Error('Invalid response option.')
    submitted.set(answer.q, answer.chosen)
  }
  const sections = {}
  const answers = items.map(item => {
    const chosen = submitted.get(item.id) ?? null
    const passed = chosen !== null && chosen === item.opts[item.answer]
    const section = sections[item.section] ||= { correct: 0, attempted: 0, total: 0 }
    section.total++
    if (chosen !== null) section.attempted++
    if (passed) section.correct++
    return { q: item.id, chosen, passed, section: item.section }
  })
  const score = answers.filter(answer => answer.passed).length
  return {
    version: 'written-pilot-2026-10', level, schoolType, score,
    total: items.length, attempted: answers.filter(answer => answer.chosen !== null).length,
    passed: score >= Math.ceil(items.length * 0.7), sections, answers,
    limitations: ['Small, uncalibrated written sample', 'Listening, speaking and extended writing not assessed', 'Age-form equivalence and CEFR linking not validated'],
  }
}

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })
  try {
    if (JSON.stringify(req.body ?? {}).length > 50000) throw new Error('Attempt is too large.')
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    return res.status(200).json({ ok: true, results: scoreArabic(payload) })
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message })
  }
}

