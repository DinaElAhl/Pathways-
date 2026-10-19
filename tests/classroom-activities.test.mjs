import test from 'node:test'
import assert from 'node:assert/strict'
import { classroomActivities as activities, filterActivities, checkActivity } from '../src/data/classroomActivities.js'
test('all activities have complete age-specific teacher guidance and valid interactive answers', () => {
 assert.equal(new Set(activities.map(a => a.id)).size, activities.length)
 for (const a of activities) {
  assert.ok(a.ages.length && a.materials && a.easier && a.harder && a.explanation && a.steps.length)
  if(a.type === 'quiz') { assert.ok(a.options[a.correct]); assert.equal(checkActivity(a, [a.correct]), true); assert.equal(checkActivity(a, [(a.correct + 1) % a.options.length]), false) }
  if(a.type === 'sort') { assert.equal(checkActivity(a, a.items.map(i => i.answer)), true); assert.equal(checkActivity(a, []), false) }
  if(a.type === 'order') { assert.deepEqual([...a.solution].sort(), a.items.map((_,i)=>i)); assert.equal(checkActivity(a,a.solution),true); assert.equal(checkActivity(a,[]),false) }
  if(a.prompts) assert.equal(checkActivity(a,[]),null)
 }
})
test('filters combine constraints and retain explicitly cross-subject activities', () => {
 const rows = filterActivities(activities, {age:'HS',subject:'Science',minutes:'5'})
 assert.ok(rows.length)
 assert.ok(rows.every(a=>a.ages.includes('HS')&&a.minutes<=5&&['Science','Any subject'].includes(a.subject)))
 assert.equal(filterActivities(activities, {query:'not-a-real-concept'}).length,0)
 assert.ok(filterActivities(activities, {query:' FRACTION '}).length>=2)
 assert.ok(filterActivities(activities, {purpose:'Brain break'}).every(a=>a.type==='break'))
})
