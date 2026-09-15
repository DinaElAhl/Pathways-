// RQAP Level 2 (Asasi) scoring — server side.
//
// The answer key lives here, not in public/rqap.html. The browser is sent
// question stems and options only; it posts back which option was chosen and
// this function decides what is correct. Reading the page source no longer
// tells a candidate any answers.
//
// The marking is a faithful port of what rqap.html used to do in the browser,
// so a given set of responses earns exactly the marks it earned before.
//
// Deployed by Vercel at /api/score-rqap. No database, no environment
// variables — pure computation.

const ANSWER_KEY = {
  'L2-1A-001': 0,
  'L2-1A-002': 2,
  'L2-1A-003': 0,
  'L2-1A-004': 2,
  'L2-1A-005': 0,
  'L2-1B-001': 1,
  'L2-1B-002': 1,
  'L2-1B-003': 1,
  'L2-1B-004': 2,
  'L2-1C-001': 2,
  'L2-1C-002': 2,
  'L2-2A-001': 1,
  'L2-2A-002': 2,
  'L2-2A-003': 3,
  'L2-2A-004': 1,
  'L2-2A-005': 1,
  'L2-2B-001': 1,
  'L2-2B-002': 0,
}

// Item membership and type per section. The server keeps its own copy rather
// than trusting the client's, so a caller cannot shrink a section to inflate a
// percentage.
const SECTIONS = {
  '1A': [
    { id: 'L2-1A-001', type: 'mcq' },
    { id: 'L2-1A-002', type: 'mcq' },
    { id: 'L2-1A-003', type: 'mcq' },
    { id: 'L2-1A-004', type: 'mcq' },
    { id: 'L2-1A-005', type: 'mcq' },
  ],
  '1B': [
    { id: 'L2-1B-001', type: 'mcq' },
    { id: 'L2-1B-002', type: 'mcq' },
    { id: 'L2-1B-003', type: 'mcq' },
    { id: 'L2-1B-004', type: 'mcq' },
  ],
  '1C': [
    { id: 'L2-1C-001', type: 'mcq' },
    { id: 'L2-1C-002', type: 'mcq' },
  ],
  '1D': [
    { id: 'L2-1D-001', type: 'essay', minWords: 60 },
    { id: 'L2-1D-002', type: 'essay', minWords: 150 },
  ],
  '2A': [
    { id: 'L2-2A-001', type: 'mcq' },
    { id: 'L2-2A-002', type: 'mcq' },
    { id: 'L2-2A-003', type: 'mcq' },
    { id: 'L2-2A-004', type: 'mcq' },
    { id: 'L2-2A-005', type: 'mcq' },
  ],
  '2B': [
    { id: 'L2-2B-001', type: 'mcq' },
    { id: 'L2-2B-002', type: 'mcq' },
  ],
  '2C': [
    { id: 'L2-2C-001', type: 'audio' },
  ],
}

const TRACK_SECTIONS = {
  language: ['1A', '1B', '1C', '1D'],
  tajweed: ['2A', '2B', '2C'],
}

const TRACK_WEIGHTS = {
  language: { '1A': 0.20, '1B': 0.20, '1C': 0.30, '1D': 0.30 },
  tajweed: { '2A': 0.40, '2B': 0.25, '2C': 0.35 },
}

const CUTOFFS = {
  language: { pass: 65, distinction: 80 },
  tajweed: { pass: 70, distinction: 85 },
}

const round1 = (n) => Math.round(n * 10) / 10

function scoreSection(sectionKey, responses, audio, itemResults) {
  const items = SECTIONS[sectionKey] || []
  let earned = 0
  let max = 0

  for (const item of items) {
    const r = responses[item.id]

    if (item.type === 'mcq') {
      max += 1
      const right = !!r && Number(r.value) === ANSWER_KEY[item.id]
      // Reported back so the registrar submission keeps its existing shape.
      // It says whether the choice was right, never which choice was right.
      itemResults[item.id] = r ? (right ? 1 : 0) : null
      if (right) earned += 1
    } else if (item.type === 'essay') {
      // Heuristic stand-in for a human rater; capped at 4 of 5.
      max += 5
      const wc = r ? Number(r.wordCount) : 0
      if (wc > 0) earned += round1(Math.min(1, wc / item.minWords) * 4)
    } else if (item.type === 'audio') {
      max += 5
      const rec = audio[item.id]
      // Gate on the recording existing, not on its length. That is what the
      // browser did, so a zero-length recording still earns the floor of 2 —
      // generous, but changing it would silently re-mark candidates. Worth
      // revisiting as a scoring-policy decision, not as part of this move.
      if (rec) {
        const dur = Number(rec.durationSec) || 0
        if (dur >= 20 && dur <= 90) earned += 4
        else if (dur >= 10) earned += 3
        else earned += 2
      }
    }
  }

  return {
    earned: round1(earned),
    max,
    pct: max > 0 ? round1((earned / max) * 100) : 0,
    items: items.length,
  }
}

function scoreTrack(track, sectionScores) {
  const weights = TRACK_WEIGHTS[track]
  let weighted = 0
  let weightSum = 0
  for (const k of TRACK_SECTIONS[track]) {
    if (sectionScores[k]) {
      weighted += sectionScores[k].pct * weights[k]
      weightSum += weights[k]
    }
  }
  return weightSum > 0 ? round1(weighted / weightSum) : 0
}

function decideVerdict(tracks, trackScores) {
  const lang = trackScores.language
  const taj = trackScores.tajweed
  const langPass = lang !== null && lang >= CUTOFFS.language.pass
  const langDist = lang !== null && lang >= CUTOFFS.language.distinction
  const tajPass = taj !== null && taj >= CUTOFFS.tajweed.pass
  const tajDist = taj !== null && taj >= CUTOFFS.tajweed.distinction

  if (tracks.language && tracks.tajweed) {
    if (langDist && tajDist) return { verdict: 'Level 2 with Distinction', verdictArabic: 'أساسي مع الامتياز', verdictTier: 'distinction' }
    if (langPass && tajPass) return { verdict: 'Level 2 (Asasi) — Pass', verdictArabic: 'أساسي — ناجح', verdictTier: 'pass' }
    if (langPass || tajPass) return { verdict: 'Single-Track Pass', verdictArabic: 'نجاح في مسار واحد', verdictTier: 'pass-partial' }
    return { verdict: 'Below Threshold', verdictArabic: 'دون الحدّ المطلوب', verdictTier: 'fail' }
  }

  if (tracks.language) {
    if (langDist) return { verdict: 'Language Track — Distinction', verdictArabic: 'مسار اللغة — امتياز', verdictTier: 'distinction' }
    if (langPass) return { verdict: 'Language Track — Pass', verdictArabic: 'مسار اللغة — ناجح', verdictTier: 'pass' }
    return { verdict: 'Language Track — Below Threshold', verdictArabic: 'مسار اللغة — دون الحدّ', verdictTier: 'fail' }
  }

  if (tajDist) return { verdict: 'Tajweed Track — Distinction', verdictArabic: 'مسار التجويد — امتياز', verdictTier: 'distinction' }
  if (tajPass) return { verdict: 'Tajweed Track — Pass', verdictArabic: 'مسار التجويد — ناجح', verdictTier: 'pass' }
  return { verdict: 'Tajweed Track — Below Threshold', verdictArabic: 'مسار التجويد — دون الحدّ', verdictTier: 'fail' }
}

export function score(payload) {
  const tracks = {
    language: !!(payload.selectedTracks && payload.selectedTracks.language),
    tajweed: !!(payload.selectedTracks && payload.selectedTracks.tajweed),
  }
  if (!tracks.language && !tracks.tajweed) {
    throw new Error('No track selected.')
  }

  const responses = payload.responses && typeof payload.responses === 'object' ? payload.responses : {}
  const audio = payload.audio && typeof payload.audio === 'object' ? payload.audio : {}

  // The section list comes from the tracks, never from the client.
  const sectionOrder = []
  if (tracks.language) sectionOrder.push(...TRACK_SECTIONS.language)
  if (tracks.tajweed) sectionOrder.push(...TRACK_SECTIONS.tajweed)

  const sectionScores = {}
  const itemResults = {}
  for (const k of sectionOrder) sectionScores[k] = scoreSection(k, responses, audio, itemResults)

  const trackScores = {
    language: tracks.language ? scoreTrack('language', sectionScores) : null,
    tajweed: tracks.tajweed ? scoreTrack('tajweed', sectionScores) : null,
  }

  return { sectionScores, trackScores, sectionOrder, itemResults, ...decideVerdict(tracks, trackScores) }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Cache-Control', 'no-store')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
    return res.status(200).json({ ok: true, results: score(body) })
  } catch (err) {
    return res.status(400).json({ ok: false, error: String(err && err.message ? err.message : err) })
  }
}
