import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { NON_NATIVE_BANK } from '../server/nonNativeBank.js'
import { QUESTIONS } from '../src/data/examQuestions.js'
import { scoreArabic } from '../api/score-arabic.js'
import { score } from '../api/score-rqap.js'

for (const [level, forms] of Object.entries(NON_NATIVE_BANK)) {
  for (const [schoolType, items] of Object.entries(forms)) {
    test(`${level}/${schoolType}: authoritative scoring and complete coverage`, () => {
      assert.equal(items.length, 10)
      assert.equal(new Set(items.map(q => q.id)).size, 10)
      items.forEach(q => { assert.equal(q.opts.length, 4); assert.equal(new Set(q.opts).size, 4); assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4) })
      const perfect = scoreArabic({ level, schoolType, answers: items.map(q => ({ q: q.id, chosen: q.opts[q.answer], passed: false })) })
      assert.equal(perfect.score, 10)
      assert.equal(perfect.passed, true)
      assert.equal(Object.values(perfect.sections).reduce((n, section) => n + section.total, 0), 10)
      const empty = scoreArabic({ level, schoolType, answers: [], score: 10, passed: true })
      assert.equal(empty.score, 0)
      assert.equal(empty.attempted, 0)
      assert.equal(empty.passed, false)
      const wrong = scoreArabic({ level, schoolType, answers: items.map(q => ({ q: q.id, chosen: q.opts[(q.answer + 1) % 4], passed: true })) })
      assert.equal(wrong.score, 0)
      assert.equal(empty.total, 10)
    })
  }
}

test('public scored forms have no keys, explanations or religious-knowledge section', () => {
  for (const forms of Object.values(QUESTIONS)) for (const items of Object.values(forms)) for (const item of items) {
    assert.equal(Object.hasOwn(item, 'answer'), false)
    assert.equal(Object.hasOwn(item, 'explain'), false)
    assert.notEqual(item.section, 'quran')
  }
})

test('duplicate, unknown and malformed non-native responses are rejected', () => {
  const base = { level: 'L1', schoolType: 'primary' }
  const item = NON_NATIVE_BANK.L1.primary[0]
  const answer = { q: item.id, chosen: item.opts[0] }
  assert.throws(() => scoreArabic({ ...base, answers: [answer, answer] }))
  assert.throws(() => scoreArabic({ ...base, answers: [{ q: 'forged-id', chosen: 'x' }] }))
  assert.throws(() => scoreArabic({ ...base, answers: [{ q: item.id, chosen: false }] }))
  assert.throws(() => scoreArabic({ ...base, answers: [{ q: item.id, chosen: 'not an option' }] }))
  assert.throws(() => scoreArabic({ ...base, answers: {}, total: 1 }))
  assert.throws(() => scoreArabic({ ...base, level: '__proto__', answers: [] }))
})

test('non-native pass boundary remains 7 of 10 and omissions cannot inflate score', () => {
  const items = NON_NATIVE_BANK.L1.primary
  for (const n of [6, 7]) {
    const result = scoreArabic({ level: 'L1', schoolType: 'primary', answers: items.slice(0, n).map(q => ({ q: q.id, chosen: q.opts[q.answer] })) })
    assert.equal(result.score, n)
    assert.equal(result.total, 10)
    assert.equal(result.passed, n === 7)
  }
})

test('native empty attempt has zero attempted counts and human-review flags', () => {
  const result = score({ selectedTracks: { language: true, tajweed: true } })
  assert.equal(result.verdictTier, 'fail')
  assert.equal(result.evidenceStatus, 'demonstration-only')
  assert.deepEqual(result.pendingHumanSections, ['1D', '2C'])
  for (const section of Object.values(result.sectionScores)) { assert.equal(section.attempted, 0); assert.equal(section.unanswered, section.items) }
})

test('native writing uses actual words, never caller word-count metadata', () => {
  const short = score({ selectedTracks: { language: true }, responses: { 'L2-1D-001': { value: 'one', wordCount: 999999 } } })
  const long = score({ selectedTracks: { language: true }, responses: { 'L2-1D-001': { value: Array(60).fill('كلمة').join(' ') } } })
  assert.ok(long.sectionScores['1D'].earned > short.sectionScores['1D'].earned)
  assert.equal(long.sectionScores['1D'].markingStatus, 'human-review-required')
  assert.equal(long.sectionScores['1D'].objectiveTotal, 0)
})

test('native malformed values do not become option zero or a recording attempt', () => {
  for (const value of [null, false, '', '0']) {
    const result = score({ selectedTracks: { language: true, tajweed: true }, responses: { 'L2-1A-001': { value } }, audio: { 'L2-2C-001': { durationSec: '60' } } })
    assert.equal(result.sectionScores['1A'].earned, 0)
    assert.equal(result.sectionScores['1A'].attempted, 0)
    assert.equal(result.sectionScores['2C'].attempted, 0)
  }
})

test('new private bank cannot be imported by client modules', () => {
  const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`])
  for (const path of walk('src').filter(path => /\.[jt]sx?$/.test(path))) assert.equal(fs.readFileSync(path, 'utf8').includes('nonNativeBank'), false, path)
})

