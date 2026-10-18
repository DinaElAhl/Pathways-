import test from 'node:test'
import assert from 'node:assert/strict'
import { emptyWorkspace, validateWorkspace, saveClass, addClassCodes, saveLesson, saveAssignment, issueLearningPack, parseLearningPack, makeLearningResponse, acceptLearnerResponse, reviewSubmission, feedbackFile, parseFeedback, workspaceProgress, learnerCodes, resourceLink } from '../src/services/e2MiniWorkspace.js'

function fixture(ready = true) {
  let workspace = saveClass(emptyWorkspace(), { title: 'Pilot ES-C', subject: 'Arabic', group: 'ES', stage: 'C', codes: 'CODE01, CODE02' })
  const classId = workspace.classes[0].id
  workspace = saveLesson(workspace, { classId, title: 'Dots', objective: 'Notice the dots.', content: 'Compare ب ت ث.', resourceUrl: 'https://www.pathwayslearn.com/free-sample#watch', ready, blueprint: { hook: 'PRIVATE TEACHER PLANNING NOTE' } })
  workspace = saveAssignment(workspace, { classId, lessonId: workspace.lessons[0].id, title: 'One clue', prompt: 'Which letter has two dots above?', dueDate: '2026-11-01', maxPoints: 10 })
  return workspace
}

test('the full teacher / learner / feedback round trip retains only teacher grading', () => {
  let workspace = fixture()
  const issued = issueLearningPack(workspace, workspace.assignments[0].id, 'CODE01')
  workspace = issued.workspace
  const learner = parseLearningPack(JSON.parse(JSON.stringify(issued.pack)))
  const response = makeLearningResponse(learner, 'ت has two dots above.')
  workspace = acceptLearnerResponse(workspace, { ...response, score: 100, feedback: 'Self-awarded perfect score' })
  assert.equal(workspace.submissions[0].score, null)
  assert.equal(workspace.submissions[0].feedback, '')
  workspace = reviewSubmission(workspace, workspace.submissions[0].id, '8', 'Good evidence. Now compare ث.')
  const feedback = parseFeedback(feedbackFile(workspace, workspace.submissions[0].id), learner)
  assert.equal(feedback.score, 8)
  assert.equal(feedback.feedback, 'Good evidence. Now compare ث.')
  assert.deepEqual(workspaceProgress(workspace), { classes: 1, lessons: 1, assignments: 1, expected: 2, received: 1, reviewed: 1 })
  assert.deepEqual(validateWorkspace(JSON.parse(JSON.stringify(workspace))), workspace)
})
test('learner exports omit the roster, private blueprint and other responses', () => {
  const workspace = fixture()
  const { pack } = issueLearningPack(workspace, workspace.assignments[0].id, 'CODE01')
  const serialized = JSON.stringify(pack)
  assert.ok(!serialized.includes('CODE02'))
  assert.ok(!serialized.includes('PRIVATE TEACHER'))
  assert.ok(!serialized.includes('blueprint'))
  assert.ok(!serialized.includes('submissions'))
  assert.equal(pack.learnerCode, 'CODE01')
})
test('draft lessons and codes outside the class cannot be issued', () => {
  const draft = fixture(false)
  assert.throws(() => issueLearningPack(draft, draft.assignments[0].id, 'CODE01'), /marked ready/)
  const ready = fixture()
  assert.throws(() => issueLearningPack(ready, ready.assignments[0].id, 'STRANGER'), /learner code/)
})
test('responses must match this workspace and their exact issued pack', () => {
  const workspace = fixture()
  const issued = issueLearningPack(workspace, workspace.assignments[0].id, 'CODE01')
  const response = makeLearningResponse(issued.pack, 'My answer')
  assert.throws(() => acceptLearnerResponse(emptyWorkspace(), response), /does not match/)
  for (const patch of [{ learnerCode: 'CODE02' }, { classId: 'other-class' }, { assignmentId: 'other-task' }, { workspaceId: 'other-workspace' }]) {
    assert.throws(() => acceptLearnerResponse(issued.workspace, { ...response, ...patch }), /does not match/)
  }
  const received = acceptLearnerResponse(issued.workspace, response)
  assert.throws(() => acceptLearnerResponse(received, response), /already imported/)
})
test('a new revision is counted once and requires a new review', () => {
  let workspace = fixture()
  let issued = issueLearningPack(workspace, workspace.assignments[0].id, 'CODE01')
  workspace = acceptLearnerResponse(issued.workspace, makeLearningResponse(issued.pack, 'First answer'))
  workspace = reviewSubmission(workspace, workspace.submissions[0].id, 5, 'Try again with evidence.')
  issued = issueLearningPack(workspace, workspace.assignments[0].id, 'CODE01')
  workspace = acceptLearnerResponse(issued.workspace, makeLearningResponse(issued.pack, 'Revised answer'))
  assert.equal(workspace.submissions.length, 2)
  assert.equal(workspaceProgress(workspace).received, 1)
  assert.equal(workspaceProgress(workspace).reviewed, 0)
})
test('later edits do not change the prompt or points already sent to a learner', () => {
  let workspace = fixture()
  const issued = issueLearningPack(workspace, workspace.assignments[0].id, 'CODE01')
  workspace = saveAssignment(issued.workspace, { ...workspace.assignments[0], prompt: 'A different question', maxPoints: 3 })
  workspace = acceptLearnerResponse(workspace, makeLearningResponse(issued.pack, 'Original answer'))
  workspace = reviewSubmission(workspace, workspace.submissions[0].id, 9, 'Reviewed against the original task.')
  const result = feedbackFile(workspace, workspace.submissions[0].id)
  assert.equal(result.maxPoints, 10)
  assert.equal(workspace.issuedPacks[0].assignment.prompt, 'Which letter has two dots above?')
})
test('cross-class assignments, duplicate records and unsupported backups are rejected', () => {
  let workspace = fixture()
  workspace = saveClass(workspace, { title: 'Another class', subject: 'Science', group: 'MS', stage: 'General', codes: 'SC01' })
  assert.throws(() => saveAssignment(workspace, { ...workspace.assignments[0], classId: workspace.classes[1].id }), /own class/)
  assert.throws(() => validateWorkspace({ ...workspace, classes: [...workspace.classes, workspace.classes[0]] }), /Duplicate/)
  assert.throws(() => validateWorkspace({ ...workspace, schemaVersion: 999 }), /supported/)
  assert.throws(() => validateWorkspace({ ...workspace, classes: [{ ...workspace.classes[0], id: '__proto__' }] }), /identifier/)
})
test('scores and feedback cannot exceed their issued task boundaries', () => {
  const workspace = fixture()
  const issued = issueLearningPack(workspace, workspace.assignments[0].id, 'CODE01')
  const received = acceptLearnerResponse(issued.workspace, makeLearningResponse(issued.pack, 'Answer'))
  for (const score of ['', -1, 11, NaN]) assert.throws(() => reviewSubmission(received, received.submissions[0].id, score, 'A next step'), /score/)
  assert.throws(() => feedbackFile(received, received.submissions[0].id), /Review/)
  assert.throws(() => parseFeedback({ kind: 'roots-e2-teacher-feedback', schemaVersion: 1, packId: 'wrong-pack' }, issued.pack), /not for/)
})
test('learner code normalisation and links avoid collecting email addresses or executing URLs', () => {
  assert.deepEqual(learnerCodes('code01, CODE01\ncode02'), ['CODE01', 'CODE02'])
  assert.throws(() => learnerCodes('child@example.com'), /learner codes/)
  assert.throws(() => learnerCodes(undefined), /learner codes/)
  assert.throws(() => resourceLink('javascript:alert(1)'), /HTTPS/)
  assert.throws(() => resourceLink('https://name:password@example.com/file'), /HTTPS/)
  assert.equal(resourceLink(''), '')
  assert.equal(resourceLink('https://www.pathwayslearn.com/spelling-bee'), 'https://www.pathwayslearn.com/spelling-bee')
})
test('adding codes preserves previous records and rejects impossible due dates', () => {
  const workspace = fixture()
  const updated = addClassCodes(workspace, workspace.classes[0].id, 'CODE03')
  assert.deepEqual(updated.classes[0].codes, ['CODE01', 'CODE02', 'CODE03'])
  assert.equal(workspace.classes[0].codes.length, 2)
  assert.throws(() => saveAssignment(workspace, { ...workspace.assignments[0], dueDate: '2026-02-31' }), /due date/)
  assert.throws(() => saveAssignment(workspace, { ...workspace.assignments[0], dueDate: 0 }), /due date/)
})
