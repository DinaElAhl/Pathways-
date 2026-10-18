import test from 'node:test'
import assert from 'node:assert/strict'
import { score } from '../api/score-rqap.js'
import { WARMUP } from '../src/data/examData.js'
import { NON_NATIVE_BANK as QUESTIONS } from '../server/nonNativeBank.js'

const language = responses => score({ selectedTracks: { language: true }, responses })
test('blank and malformed MCQ choices cannot receive option-zero credit', () => {
  for (const value of [null, false, '', '0', {}, [], -1, 4]) {
    assert.equal(language({ 'L2-1A-001': { value } }).sectionScores['1A'].earned, 0)
  }
  assert.equal(language({ 'L2-1A-001': { value: 0 } }).sectionScores['1A'].earned, 1)
})
test('writing completion uses actual text, not caller word counts', () => {
  assert.equal(language({ 'L2-1D-001': { value: '', wordCount: 100000 } }).sectionScores['1D'].earned, 0)
  assert.equal(language({ 'L2-1D-001': { value: Array(60).fill('كلمة').join(' '), wordCount: 0 } }).sectionScores['1D'].earned, 4)
})
test('invalid and zero-length recording metadata receives no completion credit', () => {
  for (const durationSec of [0, -1, null, '', '20', Infinity, NaN]) {
    const result = score({ selectedTracks: { tajweed: true }, audio: { 'L2-2C-001': { durationSec } } })
    assert.equal(result.sectionScores['2C'].earned, 0)
    assert.equal(result.verdictTier, 'fail')
  }
})
test('all Arabic forms have ten scored items, separate warmups, and valid keys', () => {
  for (const [level, variants] of Object.entries(QUESTIONS)) {
    for (const [variant, items] of Object.entries(variants)) {
      assert.equal(items.length, 10)
      const prep = WARMUP[level][variant]
      assert.equal(prep.length, 5)
      for (const item of [...items, ...prep]) {
        assert.ok(Number.isInteger(item.answer) && item.answer >= 0 && item.answer < item.opts.length, item.id)
        assert.equal(new Set(item.opts).size, item.opts.length, item.id)
      }
      // Visuals are part of the stimulus: identical short stems alone are not leakage.
      const stimulus = item => JSON.stringify([item.q, item.visual || '', item.opts])
      const prepStimuli = new Set(prep.map(stimulus))
      for (const item of items) assert.ok(!prepStimuli.has(stimulus(item)), item.id)
    }
  }
})
