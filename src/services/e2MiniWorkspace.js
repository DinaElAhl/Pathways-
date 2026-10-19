// Device-only pilot. These files are editable teaching records, not authenticated
// identities, cloud submissions, payment entitlements or examination evidence.
export const MINI_KEY = 'roots_e2_mini_workspace_v1'
export const MINI_VERSION = 1
export const MAX_FILE_BYTES = 2 * 1024 * 1024
const uid = () => globalThis.crypto.randomUUID()
const now = () => new Date().toISOString()
const fail = message => { throw new Error(message) }
const list = (value, label, max = 500) => Array.isArray(value) && value.length <= max ? value : fail(`Invalid ${label} list.`)
const text = (value, label, max = 6000, optional = false) => typeof value === 'string' && value.length <= max && (optional || value.trim()) ? value : fail(`Check ${label}.`)
const identifier = value => typeof value === 'string' && /^[a-zA-Z0-9_-]{3,80}$/.test(value) && !['__proto__', 'constructor', 'prototype'].includes(value) ? value : fail('Invalid record identifier.')
const points = value => Number.isFinite(value) && value >= 1 && value <= 100 ? value : fail('Points must be between 1 and 100.')
const date = value => {
  if (value == null || value === '') return ''
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value)) || new Date(value + 'T00:00:00Z').toISOString().slice(0, 10) !== value) fail('Check the due date.')
  return value
}
const unique = (rows, label) => { if (new Set(rows.map(row => row.id)).size !== rows.length) fail(`Duplicate ${label} identifiers.`) }
const clone = value => JSON.parse(JSON.stringify(value))

export function resourceLink(value) {
  if (!value) return ''
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password) fail('Use an HTTPS resource link without login credentials.')
    return url.href
  } catch { fail('Use a complete HTTPS resource link, or leave it empty.') }
}
export function learnerCodes(value) {
  if (typeof value !== 'string' && !Array.isArray(value)) fail('Provide learner codes as text or a list.')
  const codes = Array.isArray(value) ? value : String(value).split(/[\s,;]+/)
  const result = [...new Set(codes.filter(Boolean).map(code => String(code).trim().toUpperCase()))]
  if (result.length > 100 || result.some(code => !/^[A-Z0-9][A-Z0-9_-]{1,15}$/.test(code))) fail('Use up to 100 learner codes: 2–16 letters, numbers, hyphens or underscores. No names or emails.')
  return result
}
function classRow(row) {
  if (!row || !['ES', 'MS', 'HS'].includes(row.group) || !['C', 'B', 'A', 'General'].includes(row.stage)) fail('Check the class group and stage.')
  return { id: identifier(row.id), title: text(row.title, 'class title', 80), subject: text(row.subject, 'subject', 60), group: row.group, stage: row.stage, codes: learnerCodes(row.codes) }
}
function lessonRow(row) {
  return { id: identifier(row.id), classId: identifier(row.classId), title: text(row.title, 'lesson title', 120), objective: text(row.objective, 'objective', 800), content: text(row.content, 'learner instructions', 6000), resourceUrl: resourceLink(row.resourceUrl), ready: row.ready === true, blueprint: Object.fromEntries(['hook', 'teach', 'practice', 'connect', 'reflect'].map(key => [key, text(row.blueprint?.[key] || '', 'planning note', 1200, true)])) }
}
function assignmentRow(row) {
  return { id: identifier(row.id), classId: identifier(row.classId), lessonId: identifier(row.lessonId), title: text(row.title, 'assignment title', 120), prompt: text(row.prompt, 'assignment instructions', 5000), dueDate: date(row.dueDate), maxPoints: points(row.maxPoints) }
}
function publicLesson(row) { return { title: row.title, objective: row.objective, content: row.content, resourceUrl: row.resourceUrl } }
function publicAssignment(row) { return { id: row.id, title: row.title, prompt: row.prompt, dueDate: row.dueDate, maxPoints: row.maxPoints } }

export function emptyWorkspace() {
  return { kind: 'roots-e2-workspace', schemaVersion: MINI_VERSION, id: uid(), updatedAt: now(), classes: [], lessons: [], assignments: [], issuedPacks: [], submissions: [] }
}
export function validateWorkspace(input) {
  if (!input || input.kind !== 'roots-e2-workspace' || input.schemaVersion !== MINI_VERSION) fail('This is not a supported E² workspace backup.')
  const result = { kind: input.kind, schemaVersion: MINI_VERSION, id: identifier(input.id), updatedAt: text(input.updatedAt, 'backup date', 60), classes: list(input.classes, 'classes', 30).map(classRow), lessons: list(input.lessons, 'lessons', 200).map(lessonRow), assignments: list(input.assignments, 'assignments', 300).map(assignmentRow), issuedPacks: [], submissions: [] }
  unique(result.classes, 'class'); unique(result.lessons, 'lesson'); unique(result.assignments, 'assignment')
  const classes = new Map(result.classes.map(row => [row.id, row]))
  const lessons = new Map(result.lessons.map(row => [row.id, row]))
  const assignments = new Map(result.assignments.map(row => [row.id, row]))
  for (const lesson of result.lessons) if (!classes.has(lesson.classId)) fail('A lesson refers to a missing class.')
  for (const assignment of result.assignments) if (!classes.has(assignment.classId) || lessons.get(assignment.lessonId)?.classId !== assignment.classId) fail('An assignment must use a lesson from its own class.')
  for (const row of list(input.issuedPacks, 'learning packs', 500)) {
    const pack = parseLearningPack(row)
    if (pack.workspaceId !== result.id || assignments.get(pack.assignment.id)?.classId !== pack.classId || !classes.get(pack.classId)?.codes.includes(pack.learnerCode)) fail('A learning pack does not match this workspace.')
    result.issuedPacks.push(pack)
  }
  unique(result.issuedPacks, 'learning pack')
  const packs = new Map(result.issuedPacks.map(row => [row.id, row]))
  for (const row of list(input.submissions, 'responses', 500)) {
    const pack = packs.get(row.packId)
    if (!pack || row.assignmentId !== pack.assignment.id || row.classId !== pack.classId || row.learnerCode !== pack.learnerCode) fail('A response does not match an issued learning pack.')
    const score = row.score == null ? null : Number.isFinite(row.score) && row.score >= 0 && row.score <= pack.assignment.maxPoints ? row.score : fail('A score is outside the assignment range.')
    result.submissions.push({ id: identifier(row.id), packId: pack.id, assignmentId: row.assignmentId, classId: row.classId, learnerCode: row.learnerCode, answer: text(row.answer, 'learner response', 10000), receivedAt: text(row.receivedAt, 'received date', 60), score, feedback: text(row.feedback || '', 'teacher feedback', 3000, true) })
  }
  unique(result.submissions, 'response')
  if (new Set(result.submissions.map(row => row.packId)).size !== result.submissions.length) fail('There is more than one response for the same learning pack.')
  return result
}
export function saveClass(workspace, values) {
  const next = clone(workspace)
  next.classes.push(classRow({ ...values, id: uid(), codes: learnerCodes(values.codes) }))
  return validateWorkspace({ ...next, updatedAt: now() })
}
export function addClassCodes(workspace, classId, values) {
  const next = clone(workspace); const classroom = next.classes.find(row => row.id === classId)
  if (!classroom) fail('Choose a class first.')
  classroom.codes = learnerCodes([...classroom.codes, ...learnerCodes(values)])
  return validateWorkspace({ ...next, updatedAt: now() })
}
export function saveLesson(workspace, values) {
  const next = clone(workspace); const row = lessonRow({ ...values, id: values.id || uid() })
  const previous = next.lessons.findIndex(item => item.id === row.id)
  if (previous < 0) next.lessons.push(row)
  else next.lessons[previous] = row
  return validateWorkspace({ ...next, updatedAt: now() })
}
export function saveAssignment(workspace, values) {
  const next = clone(workspace); const row = assignmentRow({ ...values, id: values.id || uid(), maxPoints: Number(values.maxPoints) })
  const previous = next.assignments.findIndex(item => item.id === row.id)
  if (previous < 0) next.assignments.push(row)
  else next.assignments[previous] = row
  return validateWorkspace({ ...next, updatedAt: now() })
}
export function issueLearningPack(workspace, assignmentId, code) {
  const assignment = workspace.assignments.find(row => row.id === assignmentId)
  const lesson = workspace.lessons.find(row => row.id === assignment?.lessonId)
  const classroom = workspace.classes.find(row => row.id === assignment?.classId)
  if (!assignment || !classroom || !lesson?.ready) fail('Choose an assignment with a lesson marked ready.')
  if (!classroom.codes.includes(code)) fail('Choose a learner code from this class.')
  const pack = { kind: 'roots-e2-learning-pack', schemaVersion: MINI_VERSION, id: uid(), workspaceId: workspace.id, classId: classroom.id, classTitle: classroom.title, learnerCode: code, group: classroom.group, stage: classroom.stage, lesson: publicLesson(lesson), assignment: publicAssignment(assignment) }
  const next = validateWorkspace({ ...clone(workspace), updatedAt: now(), issuedPacks: [...workspace.issuedPacks, pack] })
  return { workspace: next, pack }
}
export function parseLearningPack(row) {
  if (!row || row.kind !== 'roots-e2-learning-pack' || row.schemaVersion !== MINI_VERSION) fail('Choose an E² learner pack file, not a teacher backup or response.')
  const codes = learnerCodes([row.learnerCode])
  if (codes.length !== 1 || !['ES', 'MS', 'HS'].includes(row.group) || !['C', 'B', 'A', 'General'].includes(row.stage)) fail('The learner pack has invalid grouping.')
  return { kind: row.kind, schemaVersion: MINI_VERSION, id: identifier(row.id), workspaceId: identifier(row.workspaceId), classId: identifier(row.classId), classTitle: text(row.classTitle, 'class title', 80), learnerCode: codes[0], group: row.group, stage: row.stage, lesson: { title: text(row.lesson?.title, 'lesson title', 120), objective: text(row.lesson?.objective, 'objective', 800), content: text(row.lesson?.content, 'lesson instructions', 6000), resourceUrl: resourceLink(row.lesson?.resourceUrl) }, assignment: { id: identifier(row.assignment?.id), title: text(row.assignment?.title, 'assignment title', 120), prompt: text(row.assignment?.prompt, 'assignment prompt', 5000), dueDate: date(row.assignment?.dueDate), maxPoints: points(row.assignment?.maxPoints) } }
}
export function makeLearningResponse(packInput, answer) {
  const pack = parseLearningPack(packInput)
  return { kind: 'roots-e2-learner-response', schemaVersion: MINI_VERSION, id: uid(), packId: pack.id, workspaceId: pack.workspaceId, classId: pack.classId, assignmentId: pack.assignment.id, learnerCode: pack.learnerCode, answer: text(answer, 'your response', 10000) }
}
export function acceptLearnerResponse(workspace, input) {
  if (!input || input.kind !== 'roots-e2-learner-response' || input.schemaVersion !== MINI_VERSION) fail('Choose an E² learner response file.')
  const pack = workspace.issuedPacks.find(row => row.id === input.packId)
  if (!pack || input.workspaceId !== workspace.id || input.classId !== pack.classId || input.assignmentId !== pack.assignment.id || input.learnerCode !== pack.learnerCode) fail('This response does not match a learner pack issued by this workspace.')
  if (workspace.submissions.some(row => row.packId === pack.id)) fail('A response for this pack is already imported. Issue a new pack if you want a revision.')
  const response = { id: identifier(input.id), packId: pack.id, classId: pack.classId, assignmentId: pack.assignment.id, learnerCode: pack.learnerCode, answer: text(input.answer, 'learner response', 10000), receivedAt: now(), score: null, feedback: '' }
  // Ignore any score, feedback or date the learner tries to include.
  return validateWorkspace({ ...clone(workspace), updatedAt: now(), submissions: [...workspace.submissions, response] })
}
export function reviewSubmission(workspace, submissionId, score, feedback) {
  const next = clone(workspace); const response = next.submissions.find(row => row.id === submissionId)
  const pack = workspace.issuedPacks.find(row => row.id === response?.packId)
  if (!response || !pack || score === '' || !Number.isFinite(Number(score)) || Number(score) < 0 || Number(score) > pack.assignment.maxPoints) fail('Enter a score within the points range shown for this response.')
  response.score = Number(score); response.feedback = text(feedback, 'teacher feedback', 3000)
  return validateWorkspace({ ...next, updatedAt: now() })
}
export function feedbackFile(workspace, submissionId) {
  const response = workspace.submissions.find(row => row.id === submissionId)
  const pack = workspace.issuedPacks.find(row => row.id === response?.packId)
  if (!response || !pack || response.score == null) fail('Review this response before downloading feedback.')
  return { kind: 'roots-e2-teacher-feedback', schemaVersion: MINI_VERSION, packId: pack.id, learnerCode: pack.learnerCode, assignmentTitle: pack.assignment.title, score: response.score, maxPoints: pack.assignment.maxPoints, feedback: response.feedback }
}
export function parseFeedback(input, pack) {
  if (!pack || !input || input.kind !== 'roots-e2-teacher-feedback' || input.schemaVersion !== MINI_VERSION || input.packId !== pack.id || input.learnerCode !== pack.learnerCode) fail('This feedback is not for the learner pack currently open.')
  if (!Number.isFinite(input.score) || input.score < 0 || input.score > pack.assignment.maxPoints || input.maxPoints !== pack.assignment.maxPoints) fail('Invalid feedback score.')
  return { score: input.score, maxPoints: input.maxPoints, feedback: text(input.feedback, 'teacher feedback', 3000) }
}
export function workspaceProgress(workspace) {
  const latest = new Map()
  for (const response of workspace.submissions) latest.set(response.assignmentId + ':' + response.learnerCode, response)
  return { classes: workspace.classes.length, lessons: workspace.lessons.length, assignments: workspace.assignments.length, expected: workspace.assignments.reduce((sum, row) => sum + (workspace.classes.find(group => group.id === row.classId)?.codes.length || 0), 0), received: latest.size, reviewed: [...latest.values()].filter(row => row.score != null).length }
}
// One row per current learner and assignment; revisions use the latest response.
export function classGradebook(workspace, classId) {
  const classroom = workspace.classes.find(row => row.id === classId)
  if (!classroom) return []
  const latest = new Map()
  for (const response of workspace.submissions) if (response.classId === classId) latest.set(response.assignmentId + ':' + response.learnerCode, response)
  return workspace.assignments.filter(row => row.classId === classId).flatMap(assignment => classroom.codes.map(code => {
    const response = latest.get(assignment.id + ':' + code)
    const pack = response && workspace.issuedPacks.find(row => row.id === response.packId)
    return { classTitle: classroom.title, learnerCode: code, assignment: pack?.assignment.title || assignment.title, dueDate: pack?.assignment.dueDate || assignment.dueDate, status: !response ? 'Not received' : response.score == null ? 'Needs review' : 'Reviewed', score: response?.score ?? '', maxPoints: pack?.assignment.maxPoints ?? assignment.maxPoints, feedback: response?.feedback || '' }
  }))
}
export function gradebookCsv(rows) {
  // Quote every cell and neutralise spreadsheet formulas in user-entered text.
  const cell = value => '"' + String(typeof value === 'string' && /^[\s]*[=+@-]/.test(value) ? "'" + value : value).replaceAll('"', '""') + '"'
  const keys = ['classTitle', 'learnerCode', 'assignment', 'dueDate', 'status', 'score', 'maxPoints', 'feedback']
  return '\uFEFF' + [['Class', 'Learner code', 'Assignment', 'Due date', 'Status', 'Score', 'Maximum points', 'Feedback'], ...rows.map(row => keys.map(key => row[key]))].map(row => row.map(cell).join(',')).join('\r\n')
}
