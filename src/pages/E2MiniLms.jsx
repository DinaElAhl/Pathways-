import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { miniTabs, miniSubjects, miniGroups, miniStages, miniBlueprint, miniLessonStarters } from '../data/e2Mini.js'
import { MINI_KEY, MAX_FILE_BYTES, emptyWorkspace, validateWorkspace, saveClass, addClassCodes, saveLesson, saveAssignment, issueLearningPack, parseLearningPack, makeLearningResponse, acceptLearnerResponse, reviewSubmission, feedbackFile, parseFeedback, workspaceProgress, classGradebook, gradebookCsv } from '../services/e2MiniWorkspace.js'
import './e2MiniLms.css'

const blankLesson = () => ({ id: '', title: '', objective: '', content: '', resourceUrl: '', ready: false, blueprint: Object.fromEntries(miniBlueprint.map(step => [step.key, ''])) })
const blankAssignment = () => ({ id: '', lessonId: '', title: '', prompt: '', dueDate: '', maxPoints: '10' })
function loadWorkspace() {
  try { const raw = localStorage.getItem(MINI_KEY); return { workspace: raw ? validateWorkspace(JSON.parse(raw)) : emptyWorkspace(), error: '' } }
  catch { return { workspace: emptyWorkspace(), error: 'Saved workspace could not be read. Download the saved data before restoring a valid backup. Existing saved data has not been overwritten.' } }
}
function download(data, filename, csv = false) {
  const url = URL.createObjectURL(new Blob([csv ? data : JSON.stringify(data, null, 2)], { type: csv ? 'text/csv;charset=utf-8' : 'application/json;charset=utf-8' }))
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = filename; anchor.hidden = true
  document.body.appendChild(anchor); anchor.click(); anchor.remove()
  setTimeout(() => URL.revokeObjectURL(url), 60000)
}
async function readFile(event) {
  const file = event.target.files?.[0]; event.target.value = ''
  if (!file) return null
  if (file.size > MAX_FILE_BYTES) throw new Error('Choose a JSON file smaller than 2 MB.')
  try { return JSON.parse(await file.text()) } catch { throw new Error('This file is not readable JSON. Choose the original E² file.') }
}
const formatDate = value => value ? new Date(value).toLocaleString() : ''

function ReviewCard({ response, pack, onReview, onDownload }) {
  const [score, setScore] = useState(response.score ?? '')
  const [feedback, setFeedback] = useState(response.feedback)
  return <article className="mini-card mini-review" data-response-id={response.id}>
    <div className="mini-row"><span className="mini-tag">{response.learnerCode}</span><span>{response.score == null ? 'Needs review' : `${response.score}/${pack.assignment.maxPoints} · reviewed`}</span></div>
    <h3>{pack.assignment.title}</h3><p className="mini-muted">Received on this device: {formatDate(response.receivedAt)}</p>
    <details><summary>Original assignment sent to this learner</summary><p className="mini-text">{pack.assignment.prompt}</p></details>
    <h4>Learner’s response</h4><p className="mini-text mini-response" dir="auto">{response.answer}</p>
    <form onSubmit={event => { event.preventDefault(); onReview(response.id, score, feedback) }}>
      <label>Score out of {pack.assignment.maxPoints}<input type="number" min="0" max={pack.assignment.maxPoints} step="0.5" required value={score} onChange={event => setScore(event.target.value)} /></label>
      <label>Helpful feedback<textarea required maxLength="3000" value={feedback} onChange={event => setFeedback(event.target.value)} placeholder="Name one strength and one clear next step." /></label>
      <div className="mini-actions"><button className="mini-button">Save review</button><button type="button" className="mini-button secondary" disabled={response.score == null} onClick={() => onDownload(response.id)}>Download learner feedback</button></div>
    </form>
  </article>
}

export default function E2MiniLms() {
  const [initial] = useState(loadWorkspace)
  const [workspace, setWorkspace] = useState(initial.workspace)
  const [storageError, setStorageError] = useState(initial.error)
  const [tab, setTab] = useState('overview')
  const [message, setMessage] = useState('')
  const [selectedClass, setSelectedClass] = useState(initial.workspace.classes[0]?.id || '')
  const [classForm, setClassForm] = useState({ title: '', subject: 'Arabic', group: 'ES', stage: 'C', codes: '' })
  const [newCodes, setNewCodes] = useState('')
  const [lessonForm, setLessonForm] = useState(blankLesson)
  const [assignmentForm, setAssignmentForm] = useState(blankAssignment)
  const [exportCode, setExportCode] = useState('')
  const [learnerPack, setLearnerPack] = useState(null)
  const [learnerAnswer, setLearnerAnswer] = useState('')
  const [learnerFeedback, setLearnerFeedback] = useState(null)
  const restoreInput = useRef(null)
  const learnerInput = useRef(null)
  const responseInput = useRef(null)
  const feedbackInput = useRef(null)
  const classroom = workspace.classes.find(row => row.id === selectedClass) || workspace.classes[0]
  const classLessons = workspace.lessons.filter(row => row.classId === classroom?.id)
  const classAssignments = workspace.assignments.filter(row => row.classId === classroom?.id)
  const classResponses = workspace.submissions.filter(row => row.classId === classroom?.id)
  const stats = workspaceProgress(workspace)
  const gradebook = classGradebook(workspace, selectedClass)

  function notify(error) {
    if (error?.name === 'QuotaExceededError') setMessage('Browser storage is full. Download a backup before continuing. Your last saved records were preserved.')
    else if (error?.name === 'SecurityError') setMessage('This browser is blocking local storage. Allow storage for this site or try a different browser; your teaching records were not saved.')
    else setMessage(error instanceof Error ? error.message : String(error))
  }
  function commit(next, success = 'Saved on this browser.') {
    try {
      if (storageError) throw new Error('Restore a valid backup before changing the unreadable saved workspace.')
      const safe = validateWorkspace(next); const serialized = JSON.stringify(safe, null, 2)
      if (new TextEncoder().encode(serialized).length > MAX_FILE_BYTES) throw new Error('This pilot workspace has reached its size limit. Download a backup; no saved records were replaced.')
      localStorage.setItem(MINI_KEY, serialized); setWorkspace(safe); setMessage(success); return true
    } catch (error) { notify(error); return false }
  }
  function chooseClass(id) { setSelectedClass(id); setLessonForm(blankLesson()); setAssignmentForm(blankAssignment()); setExportCode(''); setNewCodes('') }
  function act(operation, success) { try { return commit(operation(), success) } catch (error) { notify(error); return false } }
  function createClass(event) {
    event.preventDefault()
    try { const next = saveClass(workspace, classForm); if (commit(next, 'Class created on this browser.')) { chooseClass(next.classes.at(-1).id); setClassForm({ ...classForm, title: '', codes: '' }) } } catch (error) { notify(error) }
  }
  function createLesson(event) {
    event.preventDefault()
    if (act(() => saveLesson(workspace, { ...lessonForm, classId: classroom?.id }), 'Lesson saved. Marked-ready lessons can be included in learner packs.')) setLessonForm(blankLesson())
  }
  function createAssignment(event) {
    event.preventDefault()
    if (act(() => saveAssignment(workspace, { ...assignmentForm, classId: classroom?.id, lessonId: assignmentForm.lessonId || classLessons[0]?.id }), 'Assignment saved. Choose a learner code to download its learning pack.')) setAssignmentForm(blankAssignment())
  }
  function exportPack(assignment) {
    try {
      const code = classroom.codes.includes(exportCode) ? exportCode : classroom.codes[0]
      const result = issueLearningPack(workspace, assignment.id, code)
      if (commit(result.workspace, 'Learner pack prepared. Save the download, then share it using your usual class channel. It is not an invitation or a protected course link.')) download(result.pack, `Roots-E2-Learner-${code}-${result.pack.id.slice(0, 8)}.json`)
    } catch (error) { notify(error) }
  }
  async function restore(event) {
    try {
      const input = await readFile(event); if (!input) return
      const safe = validateWorkspace(input)
      if (!window.confirm('Replace the workspace saved on this browser with this backup? Download your current backup first if you want to keep both.')) return
      const serialized = JSON.stringify(safe, null, 2)
      if (new TextEncoder().encode(serialized).length > MAX_FILE_BYTES) throw new Error('This backup is too large for the pilot workspace.')
      localStorage.setItem(MINI_KEY, serialized); setWorkspace(safe); setStorageError(''); chooseClass(safe.classes[0]?.id || ''); setMessage('Backup restored on this browser.'); setTab('overview')
    } catch (error) { notify(error) }
  }
  async function importResponse(event) {
    try { const input = await readFile(event); if (input && act(() => acceptLearnerResponse(workspace, input), 'Response imported for teacher review. File identity and authorship are not authenticated.')) setSelectedClass(input.classId) } catch (error) { notify(error) }
  }
  async function openLearner(event) {
    try {
      const input = await readFile(event); if (!input) return
      const pack = parseLearningPack(input)
      if (learnerAnswer && !window.confirm('Open this pack and replace the current unsaved learner answer?')) return
      setLearnerPack(pack); setLearnerAnswer(''); setLearnerFeedback(null); setMessage('Learner pack opened. Download your response before leaving; learner answers are not autosaved.')
    } catch (error) { notify(error) }
  }
  async function openFeedback(event) {
    try { const input = await readFile(event); if (input) { setLearnerFeedback(parseFeedback(input, learnerPack)); setMessage('Teacher feedback file opened for this pack. This is a file exchange, not verified online marking.') } } catch (error) { notify(error) }
  }
  function sample() {
    if (workspace.classes.some(row => row.title === 'Sample class - ES-C')) { setMessage('The sample class is already in this workspace.'); return }
    try {
      let next = saveClass(workspace, { title: 'Sample class - ES-C', subject: 'Arabic', group: 'ES', stage: 'C', codes: 'DEMO01, DEMO02' })
      const classId = next.classes.at(-1).id; const starter = miniLessonStarters.find(item => item.id === 'letters')
      next = saveLesson(next, { ...starter, id: undefined, classId, ready: true, blueprint: Object.fromEntries(miniBlueprint.map(step => [step.key, step.suggestion])) })
      next = saveAssignment(next, { classId, lessonId: next.lessons.at(-1).id, title: 'Dot detective', prompt: 'Which letter has three dots above: ب ت ث? Explain the clue you used. You may write in English or Arabic.', dueDate: '', maxPoints: 10 })
      if (commit(next, 'Sample class added with two fictional learner codes. No learner responses or scores have been invented.')) { chooseClass(classId); setTab('classes') }
    } catch (error) { notify(error) }
  }

  return <div className="container-page mini-page">
    <header className="mini-hero"><div><p className="mini-eyebrow">ROOTS · EVERY STUDENT HAS THE RIGHT TO UNDERSTAND</p><h1>E² Mini LMS</h1><p>One place to plan a lesson, set a task and give a helpful next step.</p></div><img src={import.meta.env.BASE_URL + 'brand/roots-sprout.svg'} width="110" height="110" alt="Roots sprout" /></header>
    <aside className="mini-pilot"><strong>Working pilot · saved on this browser</strong><p>Create real teaching records here, then exchange learner files manually. There are no accounts, online invitations, cloud sync or protected paid courses yet. Use learner codes rather than names. Anyone using this browser can access its workspace.</p><details><summary>How the teacher–learner handoff works</summary><ol><li>Teacher: create a class, a ready lesson and an assignment.</li><li>Download one learning pack for each learner code and share it through your usual class channel.</li><li>Learner: open this page on their own device, choose Learner file view, import the pack and download their response.</li><li>Teacher: import the returned response, review it and download feedback for that learner.</li></ol><p>The files are editable and do not verify who completed the work. Use this pilot for low-stakes teaching practice.</p></details></aside>
    <div className="mini-toolbar"><button className="mini-button secondary" onClick={() => download(workspace, 'Roots-E2-Workspace-Backup.json')} disabled={!!storageError}>Download workspace backup</button><button className="mini-text-link" onClick={() => restoreInput.current?.click()}>Restore a backup</button><span>Teaching records are saved when you submit a form.</span><input ref={restoreInput} type="file" accept=".json,application/json" hidden onChange={restore} /></div>
    {storageError && <div role="alert" className="mini-error"><p>{storageError}</p><button className="mini-button secondary" onClick={() => { const raw = localStorage.getItem(MINI_KEY); download({ rawSavedData: raw }, 'Roots-E2-Saved-Data-Recovery.json') }}>Download saved data for recovery</button></div>}
    {message && <p className="mini-message" role="status">{message}</p>}
    <nav className="mini-tabs" aria-label="E² workspace sections">{miniTabs.map(item => <button key={item.id} aria-current={tab === item.id ? 'page' : undefined} onClick={() => { setTab(item.id); setMessage('') }}>{item.label}</button>)}</nav>
    {tab !== 'overview' && tab !== 'learner' && workspace.classes.length > 0 && <label className="mini-class-picker">Working in<select value={classroom?.id || ''} onChange={event => chooseClass(event.target.value)}>{workspace.classes.map(row => <option value={row.id} key={row.id}>{row.title}</option>)}</select></label>}

    {tab === 'overview' && <section aria-labelledby="mini-overview"><div className="mini-section-head"><div><p className="mini-eyebrow">YOUR TEACHING SPACE</p><h2 id="mini-overview">A clear next step.</h2></div><button className="mini-button" onClick={() => setTab('classes')}>Create a class →</button></div><div className="mini-stats">{[['Classes', stats.classes], ['Lessons', stats.lessons], ['Assignments', stats.assignments], ['Reviewed tasks', stats.reviewed]].map(([title, number]) => <article key={title}><strong>{number}</strong><span>{title}</span></article>)}</div>
      <div className="mini-grid"><article className="mini-card"><h3>From lesson to feedback</h3><ol className="mini-flow"><li><button onClick={() => setTab('classes')}>1 · Create a class and learner codes</button></li><li><button onClick={() => setTab('lessons')}>2 · Add a lesson with the E² blueprint</button></li><li><button onClick={() => setTab('assignments')}>3 · Set a task and download learning packs</button></li><li><button onClick={() => setTab('feedback')}>4 · Import responses and give feedback</button></li></ol><button className="mini-text-link" onClick={sample}>Try a clearly labelled sample class →</button></article><article className="mini-card mini-mint"><h3>Progress from your records</h3><p>{stats.received} distinct learner tasks received · {stats.reviewed} reviewed · {stats.expected} expected across current class rosters.</p><progress aria-label="Reviewed learner tasks" max={Math.max(stats.expected, 1)} value={Math.min(stats.reviewed, stats.expected)} /><p className="mini-muted">A new issued pack can be used for a revision. For repeated learner tasks, the most recently imported response determines the progress count. No automatic proficiency or attendance claim is made.</p><Link to="/spelling-bee" className="mini-text-link">Open the spelling bee →</Link><a className="mini-text-link" href={import.meta.env.BASE_URL + 'teacher-studio/e2-rubrics-assessment.html'}>Open E² rubrics and reflection →</a></article></div></section>}

    {tab === 'classes' && <section aria-labelledby="mini-classes"><h2 id="mini-classes">Your classes</h2><div className="mini-grid"><form className="mini-card" onSubmit={createClass}><h3>Create a class</h3><label>Class title<input required maxLength="80" value={classForm.title} placeholder="Saturday Arabic · ES-C" onChange={event => setClassForm({ ...classForm, title: event.target.value })} /></label><div className="mini-form-grid"><label>Subject<select value={classForm.subject} onChange={event => setClassForm({ ...classForm, subject: event.target.value })}>{miniSubjects.map(value => <option key={value}>{value}</option>)}</select></label><label>Age group<select value={classForm.group} onChange={event => setClassForm({ ...classForm, group: event.target.value })}>{miniGroups.map(value => <option key={value}>{value}</option>)}</select></label><label>Roots stage<select value={classForm.stage} onChange={event => setClassForm({ ...classForm, stage: event.target.value })}>{miniStages.map(value => <option key={value}>{value}</option>)}</select></label></div><p className="mini-muted">ES: elementary · MS: middle · HS: high school. Choose General for subjects without a Roots Arabic stage. C/B/A are not CEFR ratings.</p><label>Learner codes · separated by commas or new lines<textarea value={classForm.codes} onChange={event => setClassForm({ ...classForm, codes: event.target.value })} placeholder="LEARNER01, LEARNER02" maxLength="1800" /></label><p className="mini-muted">Use codes, not learner names, email addresses or contact details. Codes do not create accounts.</p><button className="mini-button" disabled={!!storageError}>Save class</button></form><div className="mini-stack">{workspace.classes.length ? workspace.classes.map(row => <article className={`mini-card mini-stage-${row.stage.toLowerCase()}`} key={row.id}><span className="mini-tag">{row.group}{row.stage === 'General' ? '' : '-' + row.stage}</span><h3>{row.title}</h3><p>{row.subject} · {row.codes.length} learner codes · {workspace.lessons.filter(lesson => lesson.classId === row.id).length} lessons</p><p className="mini-code-list">{row.codes.join(' · ') || 'No learner codes added yet.'}</p><button className="mini-text-link" onClick={() => { chooseClass(row.id); setTab('lessons') }}>Work with this class →</button></article>) : <div className="mini-empty">Your first class starts here. Nothing has been added automatically.</div>}{classroom && <form className="mini-card" onSubmit={event => { event.preventDefault(); if (act(() => addClassCodes(workspace, classroom.id, newCodes), 'Learner codes added. Existing codes and records were preserved.')) setNewCodes('') }}><h3>Add codes to {classroom.title}</h3><label>New learner codes<input required maxLength="1800" value={newCodes} onChange={event => setNewCodes(event.target.value)} placeholder="LEARNER03, LEARNER04" /></label><button className="mini-button secondary" disabled={!!storageError}>Add learner codes</button></form>}</div></div></section>}

    {tab === 'lessons' && <section aria-labelledby="mini-lessons"><h2 id="mini-lessons">Plan a lesson that leads somewhere.</h2>{!classroom ? <EmptyClass onCreate={() => setTab('classes')} /> : <div className="mini-grid"><form className="mini-card" onSubmit={createLesson}><h3>{lessonForm.id ? 'Edit lesson' : 'New lesson'}</h3><label>Fill this draft with a starter<select defaultValue="blank" onChange={event => { const starter = miniLessonStarters.find(item => item.id === event.target.value); setLessonForm({ ...lessonForm, title: starter.id === 'blank' ? '' : starter.title, objective: starter.objective, content: starter.content, resourceUrl: starter.resourceUrl }) }}>{miniLessonStarters.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label><label>Lesson title<input required maxLength="120" value={lessonForm.title} onChange={event => setLessonForm({ ...lessonForm, title: event.target.value })} /></label><label>Learning objective<textarea required maxLength="800" value={lessonForm.objective} onChange={event => setLessonForm({ ...lessonForm, objective: event.target.value })} /></label><label>Learner instructions · included in their pack<textarea required rows="6" maxLength="6000" dir="auto" value={lessonForm.content} onChange={event => setLessonForm({ ...lessonForm, content: event.target.value })} /></label><label>Video or PDF resource link · optional<input type="url" placeholder="https://…" value={lessonForm.resourceUrl} onChange={event => setLessonForm({ ...lessonForm, resourceUrl: event.target.value })} /></label><details className="mini-blueprint"><summary>E² teacher-only blueprint · not sent to learners</summary>{miniBlueprint.map(step => <label key={step.key}>{step.label}<select value="" aria-label={`${step.label} suggestion`} onChange={event => setLessonForm({ ...lessonForm, blueprint: { ...lessonForm.blueprint, [step.key]: event.target.value } })}><option value="">Use a suggestion…</option><option value={step.suggestion}>{step.suggestion}</option></select><textarea maxLength="1200" value={lessonForm.blueprint[step.key]} onChange={event => setLessonForm({ ...lessonForm, blueprint: { ...lessonForm.blueprint, [step.key]: event.target.value } })} /></label>)}</details><label className="mini-checkbox"><input type="checkbox" checked={lessonForm.ready} onChange={event => setLessonForm({ ...lessonForm, ready: event.target.checked })} />Ready to include in learner packs</label><div className="mini-actions"><button className="mini-button" disabled={!!storageError}>Save lesson</button>{lessonForm.id && <button type="button" className="mini-text-link" onClick={() => setLessonForm(blankLesson())}>Cancel edit</button>}</div></form><div className="mini-stack">{classLessons.length ? classLessons.map(row => <article key={row.id} className="mini-card"><span className="mini-tag">{row.ready ? 'Ready for learner packs' : 'Draft · teacher only'}</span><h3>{row.title}</h3><p>{row.objective}</p><p className="mini-text" dir="auto">{row.content}</p>{row.resourceUrl && <a className="mini-text-link" href={row.resourceUrl} target="_blank" rel="noopener noreferrer">Open linked resource ↗</a>}<button className="mini-text-link" onClick={() => setLessonForm({ ...row })}>Edit lesson</button></article>) : <div className="mini-empty">Add a lesson or choose a starter. Your blueprint stays in the teacher workspace.</div>}</div></div>}</section>}

    {tab === 'assignments' && <section aria-labelledby="mini-assignments"><h2 id="mini-assignments">One clear task. A useful response.</h2>{!classroom ? <EmptyClass onCreate={() => setTab('classes')} /> : !classLessons.length ? <div className="mini-empty">Create a lesson before setting an assignment.<button className="mini-text-link" onClick={() => setTab('lessons')}>Add a lesson →</button></div> : <div className="mini-grid"><form className="mini-card" onSubmit={createAssignment}><h3>{assignmentForm.id ? 'Edit assignment' : 'New assignment'}</h3><label>Lesson<select value={assignmentForm.lessonId || classLessons[0]?.id || ''} onChange={event => setAssignmentForm({ ...assignmentForm, lessonId: event.target.value })}>{classLessons.map(row => <option key={row.id} value={row.id}>{row.title}{row.ready ? '' : ' · draft'}</option>)}</select></label><label>Assignment title<input required maxLength="120" value={assignmentForm.title} onChange={event => setAssignmentForm({ ...assignmentForm, title: event.target.value })} /></label><label>What should the learner do?<textarea required rows="5" maxLength="5000" dir="auto" value={assignmentForm.prompt} onChange={event => setAssignmentForm({ ...assignmentForm, prompt: event.target.value })} /></label><div className="mini-form-grid"><label>Due date · optional<input type="date" value={assignmentForm.dueDate} onChange={event => setAssignmentForm({ ...assignmentForm, dueDate: event.target.value })} /></label><label>Points available<input type="number" min="1" max="100" step="1" required value={assignmentForm.maxPoints} onChange={event => setAssignmentForm({ ...assignmentForm, maxPoints: event.target.value })} /></label></div><div className="mini-actions"><button className="mini-button" disabled={!!storageError}>Save assignment</button>{assignmentForm.id && <button type="button" className="mini-text-link" onClick={() => setAssignmentForm(blankAssignment())}>Cancel edit</button>}</div><p className="mini-muted">Marking is done by the teacher. A linked game does not automatically send its score here.</p></form><div className="mini-stack"><div className="mini-card mini-mint"><h3>Download a learning pack</h3><label>Learner code<select value={classroom.codes.includes(exportCode) ? exportCode : classroom.codes[0] || ''} onChange={event => setExportCode(event.target.value)}>{classroom.codes.length ? classroom.codes.map(code => <option key={code}>{code}</option>) : <option value="">Add learner codes first</option>}</select></label><p className="mini-muted">Each pack contains only this code, the learner lesson and the task. It excludes the roster and private E² planning notes. Share the downloaded JSON file manually; no email is sent by Roots.</p></div>{classAssignments.map(row => <article key={row.id} className="mini-card"><h3>{row.title}</h3><p className="mini-text" dir="auto">{row.prompt}</p><p className="mini-muted">{row.maxPoints} points{row.dueDate ? ' · due ' + row.dueDate : ' · no due date'}</p><div className="mini-actions"><button className="mini-button" disabled={!!storageError || !classroom.codes.length || !classLessons.find(lesson => lesson.id === row.lessonId)?.ready} onClick={() => exportPack(row)}>Download learner pack</button><button className="mini-text-link" onClick={() => setAssignmentForm({ ...row })}>Edit task</button></div>{!classLessons.find(lesson => lesson.id === row.lessonId)?.ready && <p className="mini-muted">Mark the lesson ready before downloading a learner pack.</p>}</article>)}{!classAssignments.length && <div className="mini-empty">Your saved tasks will appear here.</div>}</div></div>}</section>}

    {tab === 'feedback' && <section aria-labelledby="mini-feedback"><div className="mini-section-head"><div><h2 id="mini-feedback">Notice effort. Give a next step.</h2><p>Import a returned learner response, then review it yourself.</p></div><button className="mini-button" disabled={!!storageError} onClick={() => responseInput.current?.click()}>Import learner response</button><input ref={responseInput} type="file" accept=".json,application/json" hidden onChange={importResponse} /></div><p className="mini-muted">Only responses matching packs issued by this workspace are accepted. This checks the file match, not the learner’s identity. Any score included by a learner is ignored.</p><div className="mini-grid">{classResponses.map(response => <ReviewCard key={response.id} response={response} pack={workspace.issuedPacks.find(row => row.id === response.packId)} onReview={(id, score, feedback) => act(() => reviewSubmission(workspace, id, score, feedback), 'Teacher review saved. Download its feedback file to return it to the learner.')} onDownload={id => { try { download(feedbackFile(workspace, id), `Roots-E2-Feedback-${response.learnerCode}.json`) } catch (error) { notify(error) } }} />)}</div>{!classResponses.length && <div className="mini-empty">No responses have been imported for this class yet. Share a learner pack, then ask for the returned response file.</div>}</section>}

    {tab === 'learner' && <section aria-labelledby="mini-learner"><div className="mini-section-head"><div><p className="mini-eyebrow">LEARNER FILE VIEW</p><h2 id="mini-learner">Open. Try. Share your thinking.</h2></div><button className="mini-button" onClick={() => learnerInput.current?.click()}>Open my learner pack</button><input ref={learnerInput} type="file" accept=".json,application/json" hidden onChange={openLearner} /></div><p className="mini-muted">Ask your teacher for an E² learning pack JSON file. This is a file viewer, not a signed-in learner account. Your answer is not autosaved; download it before leaving.</p>{learnerPack ? <div className="mini-grid"><article className="mini-card mini-mint"><span className="mini-tag">{learnerPack.learnerCode} · {learnerPack.classTitle}</span><h3>{learnerPack.lesson.title}</h3><h4>Your learning goal</h4><p>{learnerPack.lesson.objective}</p><h4>Start here</h4><p className="mini-text" dir="auto">{learnerPack.lesson.content}</p>{learnerPack.lesson.resourceUrl && <a className="mini-button secondary" href={learnerPack.lesson.resourceUrl} target="_blank" rel="noopener noreferrer">Open lesson resource ↗</a>}</article><article className="mini-card"><h3>{learnerPack.assignment.title}</h3><p className="mini-text" dir="auto">{learnerPack.assignment.prompt}</p><p className="mini-muted">{learnerPack.assignment.maxPoints} points{learnerPack.assignment.dueDate ? ' · due ' + learnerPack.assignment.dueDate : ''}</p><form onSubmit={event => { event.preventDefault(); try { download(makeLearningResponse(learnerPack, learnerAnswer), `Roots-E2-Response-${learnerPack.learnerCode}-${learnerPack.id.slice(0, 8)}.json`); setMessage('Your response file was downloaded. Send it to your teacher through your usual class channel; it has not been submitted online.') } catch (error) { notify(error) } }}><label>Your thinking<textarea required rows="8" maxLength="10000" dir="auto" value={learnerAnswer} onChange={event => setLearnerAnswer(event.target.value)} placeholder="Write your response in Arabic or English…" /></label><button className="mini-button">Download my response</button></form><hr /><h4>Got feedback from your teacher?</h4><button className="mini-button secondary" onClick={() => feedbackInput.current?.click()}>Open teacher feedback</button><input ref={feedbackInput} type="file" accept=".json,application/json" hidden onChange={openFeedback} />{learnerFeedback && <div className="mini-feedback-note"><strong>{learnerFeedback.score}/{learnerFeedback.maxPoints}</strong><p className="mini-text" dir="auto">{learnerFeedback.feedback}</p><p className="mini-muted">Teacher-provided file; not authenticated online marking.</p></div>}</article></div> : <div className="mini-empty">Choose the pack your teacher gave you. No teacher records or other learners’ responses are included.</div>}</section>}
    {tab === 'overview' && <section className="mini-gradebook" aria-labelledby="mini-gradebook-title"><div className="mini-section-head"><div><p className="mini-eyebrow">CLASS RECORDS</p><h2 id="mini-gradebook-title">Your class gradebook</h2><p>Latest response per learner and task. Blank scores mean no reviewed mark; they are not zero.</p></div><div className="mini-actions"><button className="mini-button secondary" disabled={!gradebook.length} onClick={() => download(gradebookCsv(gradebook), 'Roots-E2-Class-Gradebook.csv', true)}>Download gradebook CSV</button><button className="mini-button secondary" disabled={!gradebook.length} onClick={() => window.print()}>Print class report</button></div></div>{gradebook.length ? <div className="mini-gradebook-scroll"><table><caption>{workspace.classes.find(row => row.id === selectedClass)?.title} · Teacher-maintained records</caption><thead><tr><th>Learner</th><th>Task</th><th>Status</th><th>Score</th><th>Feedback</th></tr></thead><tbody>{gradebook.map((row, index) => <tr key={index}><td>{row.learnerCode}</td><td dir="auto">{row.assignment}</td><td>{row.status}</td><td>{row.score === '' ? '—' : `${row.score}/${row.maxPoints}`}</td><td dir="auto">{row.feedback || '—'}</td></tr>)}</tbody></table></div> : <p className="mini-empty">Add a class, learner codes and an assignment to build its gradebook. Imported responses and teacher reviews will appear here.</p>}</section>}
    <footer className="mini-footer"><Link to="/edu-hub">← EduHub</Link><a href={import.meta.env.BASE_URL + 'teacher-studio/index.html'}>E² Teacher Studio</a><Link to="/membership">Monthly membership proposal</Link><p>Linked resources need an internet connection. This pilot stores teaching records in this browser, not a server. Download backups regularly; a browser copy is not an account or an independent backup.</p></footer>
  </div>
}

function EmptyClass({ onCreate }) { return <div className="mini-empty">Create a class to organise its lessons and assignments.<button className="mini-text-link" onClick={onCreate}>Create your first class →</button></div> }

