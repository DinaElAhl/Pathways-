import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { spellingWords, spellingStages, normalizeSpelling, spellingMatches, letterTiles, seededShuffle, roundSummary } from '../src/data/spellingBee.js'
import { toolsMembership } from '../src/data/toolsMembership.js'

test('optional vowel marks do not obscure real spelling errors', () => {
  assert.ok(spellingMatches(' كِتَاب ', 'كتاب'))
  assert.ok(spellingMatches('شكرًا', 'شُكْرًا'))
  assert.ok(spellingMatches('أين  البيت؟', 'أَيْنَ الْبَيْت'))
  assert.ok(!spellingMatches('اين البيت', 'أَيْنَ الْبَيْت'))
  assert.ok(!spellingMatches('ما', 'مَاء'))
  assert.ok(!spellingMatches('مدرسه', 'مَدْرَسَة'))
  assert.ok(!spellingMatches('علي', 'عَلَى'))
  assert.ok(!spellingMatches('', 'بَاب'))
  assert.ok(!spellingMatches('هَذَاكِتَاب', 'هَذَا كِتَاب'))
  assert.equal(normalizeSpelling('\u200fبَـاب\u2069'), 'باب')
})
test('tiles retain short vowels and repeated letters without changing the target', () => {
  assert.deepEqual(letterTiles('بَاب'), ['بَ', 'ا', 'ب'])
  for (const words of Object.values(spellingWords)) for (const word of words) {
    assert.ok(spellingMatches(letterTiles(word.text).join(''), word.text))
    assert.match(word.text, /[\u064B-\u0652]/)
  }
})
test('every starter prompt has a real local audio file and a correction clue', () => {
  for (const [stage, words] of Object.entries(spellingWords)) {
    assert.ok(spellingStages[stage].seconds > 0)
    assert.equal(new Set(words.map(word => word.id)).size, words.length)
    for (const word of words) {
      assert.ok(word.clue.length > 20)
      assert.ok(word.audio)
      assert.ok(fs.statSync(new URL('../public/' + word.audio, import.meta.url)).size > 1000)
    }
  }
})
test('a classroom link produces a reproducible round and keeps every tile', () => {
  assert.deepEqual(seededShuffle(spellingWords.B, 'MS-B-starter-1'), seededShuffle(spellingWords.B, 'MS-B-starter-1'))
  assert.deepEqual(seededShuffle([0, 1, 2, 3], 'tiles').slice().sort(), [0, 1, 2, 3])
})
test('helped answers and omitted prompts do not inflate first-try points', () => {
  assert.deepEqual(roundSummary({ one: { firstTry: true, corrected: false }, two: { firstTry: false, corrected: true } }, 3), { firstTry: 1, corrected: 1, unanswered: 1 })
})
test('a planned membership cannot offer a checkout or imply protected access is live', () => {
  assert.equal(toolsMembership.status, 'planning')
  assert.equal(toolsMembership.checkoutUrl, null)
  assert.ok(toolsMembership.freeTools.some(tool => tool.href === '/spelling-bee'))
})

test('membership tiers separate individual, team and school scope without enabling billing', () => {
  assert.deepEqual(toolsMembership.plans.map(plan => plan.id), ['teacher', 'team', 'school'])
  for (const plan of toolsMembership.plans) {
    assert.equal(plan.monthlyPrice, null)
    assert.ok(plan.benefits.length >= 3)
    assert.ok(plan.scope && plan.boundary)
  }
  assert.equal(toolsMembership.plans.find(plan => plan.id === 'school').pricing, 'quote')
  assert.equal(toolsMembership.checkoutUrl, null)
})
