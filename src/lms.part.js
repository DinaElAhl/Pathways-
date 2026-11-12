/* =====================================================================
   Roots LMS — courses, lessons, assignments & quizzes, gradebook,
   attendance, announcements, student progress, parent view
   ===================================================================== */
function navLabel(p) {
  const n = {
    courses: L('Courses', 'المقررات', 'Cours'), gradebook: L('Gradebook', 'سجل الدرجات', 'Carnet de notes'),
    attendance: L('Attendance', 'الحضور', 'Présences'), news: L('Announcements', 'الإعلانات', 'Annonces'),
    progress: L('My progress', 'تقدّمي', 'Mes progrès'), children: L('My children', 'أبنائي', 'Mes enfants')
  };
  return n[p] || t(p);
}
function setSignupRole(r) { signupRole = r; flash = ''; render(); }
function stopView() { viewUnsubs.forEach(u => { try { u(); } catch (e) {} }); viewUnsubs = []; S_lessons = []; S_att = []; S_key = null; }
const viewSub = (q, fn) => viewUnsubs.push(F.onSnapshot(q, s => { fn(s); softRender(); }, onErr));
async function ensureStudentCode(schoolId, name, g, c) {
  let code = newCode();
  for (let i = 0; i < 5; i++) { const ex = await F.getDoc(F.doc(fb.fs, 'schools', schoolId, 'studentCodes', code)); if (!ex.exists()) break; code = newCode(); }
  await F.setDoc(F.doc(fb.fs, 'schools', schoolId, 'studentCodes', code), { uid: authUser.uid, name: name.slice(0, 100), grade: g, class: c });
  await F.updateDoc(F.doc(fb.fs, 'users', authUser.uid), { studentCode: code });
}
const fmtDate = d => d ? String(d).slice(0, 10) : '—';
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
const courseName = id => (S.courses.find(c => c.id === id) || Object.values(S.kidCourses).flat().find(c => c.id === id) || {}).title || '—';
const myCourses = () => (isTeacher() ? S.courses.filter(c => c.teacherId === uid()) : S.courses);
const rosterFor = (g, c) => S.students.filter(u => u.grade === g && u.class === c && u.approved).sort((a, b) => String(a.name).localeCompare(String(b.name)));
const subFor = (aid, sidu) => S.subs.find(x => x.assignmentId === aid && x.studentId === sidu);
const isLate = (a, sub) => a.due && (sub ? String(sub.submittedOn || '') > a.due : today() > a.due);

/* ---------- courses list ---------- */
function coursesPage() {
  const list = filtered(myCourses()).sort((a, b) => String(a.title).localeCompare(String(b.title)));
  const others = isTeacher() ? filtered(S.courses.filter(c => c.teacherId !== uid())) : [];
  const card = c => `<div class="panel coursecard" onclick="openCourseView('${esc(c.id)}')"><div class="row space"><h3>${esc(c.title)}</h3>${c.published ? '' : `<span class="pill gold">${L('Draft', 'مسودة', 'Brouillon')}</span>`}</div>
    <div class="hint">${esc(c.grade)} · ${esc(c.class)}${c.teacherName ? ' · ' + esc(c.teacherName) : ''}</div><p class="muted">${esc(String(c.description || '').slice(0, 140))}</p>
    <div class="hint">${S.assignments.filter(a => a.courseId === c.id).length} ${L('assignments', 'تكليفات', 'devoirs')}</div></div>`;
  return viewTitle(navLabel('courses'), esc(school ? school.name : ''), canTeach() ? `<button onclick="editCourse('new')">+ ${L('New course', 'مقرر جديد', 'Nouveau cours')}</button>` : '')
    + `<div class="three">${list.map(card).join('') || `<div class="panel empty">${L('No courses yet', 'لا توجد مقررات بعد', 'Aucun cours pour le moment')}</div>`}</div>`
    + (others.length ? `<h2 style="margin-top:22px">${L('Other courses in the school', 'مقررات أخرى في المدرسة', "Autres cours de l'école")}</h2><div class="three">${others.map(card).join('')}</div>` : '');
}
function editCourse(id) {
  const c = id === 'new' ? {} : (S.courses.find(x => x.id === id) || {});
  modal(`<h2>${id === 'new' ? L('New course', 'مقرر جديد', 'Nouveau cours') : L('Edit course', 'تعديل المقرر', 'Modifier le cours')}</h2>
  ${formInput(L('Course title', 'عنوان المقرر', 'Titre du cours'), 'cTitle', c.title, 'text', 'maxlength="120"')}
  ${formArea(t('description'), 'cDesc', c.description)}
  <div class="formgrid">${formSelect(t('grade'), 'cGrade', GR(), c.grade || (grade === 'All' ? GR()[0] : grade))}${formSelect(t('class'), 'cClass', CL(), c.class || (cls === 'All' ? CL()[0] : cls))}</div>
  ${formSelect(L('Visible to students?', 'ظاهر للطلاب؟', 'Visible aux élèves ?'), 'cPub', ['yes', 'no'], c.published === false ? 'no' : 'yes', v => v === 'yes' ? L('Published', 'منشور', 'Publié') : L('Draft', 'مسودة', 'Brouillon'))}
  <div class="row"><button onclick="saveCourse('${esc(id)}')">${t('save')}</button><button class="secondary" onclick="closeModal()">${t('cancel')}</button></div>`);
}
async function saveCourse(id) {
  const title = val('cTitle').trim(); if (!title) return notify(t('titleReq'));
  const d = { title: title.slice(0, 120), description: val('cDesc').slice(0, 2000), grade: val('cGrade'), class: val('cClass'), published: val('cPub') === 'yes', updatedBy: uid(), updatedAt: F.serverTimestamp() };
  closeModal();
  await guard(async () => {
    if (id === 'new') { const ref = await F.addDoc(scol('courses'), { ...d, teacherId: uid(), teacherName: me.name || '', createdAt: F.serverTimestamp() }); openCourseView(ref.id); }
    else await F.updateDoc(sdoc('courses', id), d);
  });
}
function openCourseView(id) {
  stopView(); openCourse = id; openLesson = null; openAssign = null; courseTab = 'lessons'; page = 'course';
  const q = [F.where('courseId', '==', id)];
  if (!canTeach()) q.push(F.where('published', '==', true));
  viewSub(F.query(scol('lessons'), ...q), s => { S_lessons = list(s).sort((a, b) => (a.order || 0) - (b.order || 0)); });
  render(); window.scrollTo(0, 0);
}
function canEditCourse(c) { return c && (isAdmin() || (isTeacher() && c.teacherId === uid())); }

/* ---------- one course ---------- */
function coursePage() {
  const c = S.courses.find(x => x.id === openCourse); if (!c) return '';
  const editable = canEditCourse(c);
  const tabs = ['lessons', 'assignments'];
  const tabName = k => k === 'lessons' ? L('Lessons', 'الدروس', 'Leçons') : L('Assignments & quizzes', 'التكليفات والاختبارات', 'Devoirs et quiz');
  let body = '';
  if (openLesson) body = lessonView(c, editable);
  else if (openAssign) body = assignView(c, editable);
  else if (courseTab === 'lessons') body = lessonsList(c, editable);
  else body = assignList(c, editable);
  return `<p><a href="#" onclick="go('courses');return false">← ${navLabel('courses')}</a></p>`
    + viewTitle(esc(c.title), `${esc(c.grade)} · ${esc(c.class)}${c.teacherName ? ' · ' + esc(c.teacherName) : ''}`, editable ? `<button class="secondary" onclick="editCourse('${esc(c.id)}')">${t('edit')}</button>` : '')
    + (c.description ? `<p class="muted">${esc(c.description)}</p>` : '')
    + `<div class="tabs">${tabs.map(k => `<button class="${courseTab === k && !openLesson && !openAssign ? 'active' : ''}" onclick="setCourseTab('${k}')">${tabName(k)}</button>`).join('')}</div>` + body;
}
function setCourseTab(k) { courseTab = k; openLesson = null; openAssign = null; editing = null; S_key = null; render(); }
function lessonsList(c, editable) {
  return `<div class="panel">${editable ? `<div class="row space"><h2>${L('Lessons', 'الدروس', 'Leçons')}</h2><button onclick="editLesson('new')">+ ${L('Add lesson', 'إضافة درس', 'Ajouter une leçon')}</button></div>` : ''}
  ${S_lessons.map((l, i) => `<div class="item lessonrow" onclick="showLesson('${esc(l.id)}')"><div class="row space"><strong>${i + 1}. ${esc(l.title)}</strong>${l.published ? '' : `<span class="pill gold">${L('Draft', 'مسودة', 'Brouillon')}</span>`}</div></div>`).join('') || `<div class="empty">${L('No lessons yet', 'لا توجد دروس بعد', 'Aucune leçon')}</div>`}</div>`;
}
function showLesson(id) { openLesson = id; render(); window.scrollTo(0, 0); }
function youtubeId(url) { const m = String(url || '').match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/); return m ? m[1] : ''; }
function safeUrl(u) { u = String(u || '').trim(); return /^https?:\/\//i.test(u) ? u : ''; }
function lessonView(c, editable) {
  const l = S_lessons.find(x => x.id === openLesson); if (!l) return '';
  const yt = youtubeId(l.video);
  const links = String(l.links || '').split('\n').map(s => s.trim()).filter(Boolean).map(s => { const parts = s.split('|'); const url = safeUrl(parts.length > 1 ? parts[1] : parts[0]); return url ? `<li><a href="${esc(url)}" target="_blank" rel="noopener">${esc(parts.length > 1 ? parts[0] : url)}</a></li>` : ''; }).join('');
  return `<div class="panel lesson"><div class="row space"><h2>${esc(l.title)}</h2>${editable ? `<div class="row"><button class="secondary" onclick="editLesson('${esc(l.id)}')">${t('edit')}</button><button class="warn" onclick="deleteLesson('${esc(l.id)}')">${t('del')}</button></div>` : ''}</div>
  ${yt ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${yt}" title="video" allowfullscreen loading="lazy"></iframe></div>` : (safeUrl(l.video) ? `<p><a href="${esc(safeUrl(l.video))}" target="_blank" rel="noopener">▶ ${L('Watch video', 'مشاهدة الفيديو', 'Voir la vidéo')}</a></p>` : '')}
  <div class="lessonbody">${esc(l.body || '').replace(/\n/g, '<br>')}</div>
  ${links ? `<h3>${L('Resources', 'المصادر', 'Ressources')}</h3><ul>${links}</ul>` : ''}
  <p><button class="secondary" onclick="setCourseTab('lessons')">← ${L('All lessons', 'كل الدروس', 'Toutes les leçons')}</button></p></div>`;
}
function editLesson(id) {
  const l = id === 'new' ? {} : (S_lessons.find(x => x.id === id) || {});
  modal(`<h2>${id === 'new' ? L('Add lesson', 'إضافة درس', 'Ajouter une leçon') : t('edit')}</h2>
  ${formInput(t('title'), 'lTitle', l.title, 'text', 'maxlength="160"')}
  ${formInput(L('Video link (YouTube or any link)', 'رابط الفيديو (يوتيوب أو أي رابط)', 'Lien vidéo (YouTube ou autre)'), 'lVideo', l.video || '', 'url')}
  ${formArea(L('Lesson content', 'محتوى الدرس', 'Contenu de la leçon'), 'lBody', l.body)}
  <div class="field"><label for="lLinks">${L('Resources — one per line: Name | https://link (slides, PDF, Drive…)', 'المصادر — سطر لكل مصدر: الاسم | https://الرابط', 'Ressources — une par ligne : Nom | https://lien')}</label><textarea id="lLinks">${esc(l.links || '')}</textarea></div>
  <div class="formgrid">${formInput(L('Order', 'الترتيب', 'Ordre'), 'lOrder', l.order ?? S_lessons.length + 1, 'number')}${formSelect(L('Visible to students?', 'ظاهر للطلاب؟', 'Visible aux élèves ?'), 'lPub', ['yes', 'no'], l.published === false ? 'no' : 'yes', v => v === 'yes' ? L('Published', 'منشور', 'Publié') : L('Draft', 'مسودة', 'Brouillon'))}</div>
  <div class="row"><button onclick="saveLesson('${esc(id)}')">${t('save')}</button><button class="secondary" onclick="closeModal()">${t('cancel')}</button></div>`);
}
async function saveLesson(id) {
  const c = S.courses.find(x => x.id === openCourse);
  const title = val('lTitle').trim(); if (!title) return notify(t('titleReq'));
  const d = { courseId: c.id, grade: c.grade, class: c.class, title: title.slice(0, 160), video: val('lVideo').trim().slice(0, 500), body: val('lBody').slice(0, 20000), links: val('lLinks').slice(0, 4000), order: Number(val('lOrder')) || 0, published: val('lPub') === 'yes', updatedBy: uid(), updatedAt: F.serverTimestamp() };
  closeModal();
  await guard(() => id === 'new' ? F.addDoc(scol('lessons'), d) : F.updateDoc(sdoc('lessons', id), d));
}
function deleteLesson(id) { ask(L('Delete this lesson?', 'حذف هذا الدرس؟', 'Supprimer cette leçon ?'), async () => { if (await guard(() => F.deleteDoc(sdoc('lessons', id)))) { openLesson = null; render(); } }); }

/* ---------- assignments ---------- */
function assignList(c, editable) {
  const items = S.assignments.filter(a => a.courseId === c.id).sort((a, b) => String(a.due || '9').localeCompare(String(b.due || '9')));
  return `<div class="panel">${editable ? `<div class="row space"><h2>${L('Assignments & quizzes', 'التكليفات والاختبارات', 'Devoirs et quiz')}</h2><div class="row"><button onclick="editAssign('new','task')">+ ${L('Assignment', 'تكليف', 'Devoir')}</button><button onclick="editAssign('new','quiz')">+ ${L('Quiz', 'اختبار', 'Quiz')}</button></div></div>` : ''}
  ${items.map(a => { const sub = isStudent() ? subFor(a.id, uid()) : null; const n = S.subs.filter(x => x.assignmentId === a.id).length;
    return `<div class="item lessonrow" onclick="showAssign('${esc(a.id)}')"><div class="row space"><strong>${a.type === 'quiz' ? '📝' : '📄'} ${esc(a.title)}</strong>${a.published ? '' : `<span class="pill gold">${L('Draft', 'مسودة', 'Brouillon')}</span>`}</div>
    <div class="hint">${L('Due', 'التسليم', 'Pour le')} ${fmtDate(a.due)} · ${a.points || 0} ${L('pts', 'درجة', 'pts')}${isStudent() ? ' · ' + subStatus(a, sub) : canTeach() ? ` · ${n} ${L('submitted', 'تم التسليم', 'rendus')}` : ''}</div></div>`; }).join('') || `<div class="empty">${L('Nothing here yet', 'لا شيء بعد', 'Rien pour le moment')}</div>`}</div>`;
}
function subStatus(a, sub) {
  if (!sub) return isLate(a) ? `<span class="pill red">${L('Missing', 'لم يُسلَّم', 'Manquant')}</span>` : `<span class="pill gold">${L('To do', 'مطلوب', 'À faire')}</span>`;
  if (sub.status === 'marked') return `<span class="pill">${sub.score}/${a.points || 0}</span>`;
  return `<span class="pill">${L('Submitted', 'تم التسليم', 'Rendu')}</span>`;
}
function showAssign(id) {
  openAssign = id; S_key = null;
  if (canTeach()) viewSub(F.doc(fb.fs, 'schools', sid(), 'answerKeys', id), d => { S_key = d.exists() ? d.data() : null; });
  render(); window.scrollTo(0, 0);
}
/* Quiz format (teacher writes in a text box):
   Q: question text
   - wrong option
   * correct option
   A: expected short answer  (instead of options)                            */
function parseQuiz(text) {
  const qs = [], key = [];
  let cur = null;
  String(text || '').split('\n').forEach(raw => {
    const line = raw.trim(); if (!line) return;
    if (/^q[:.]/i.test(line)) { cur = { q: line.slice(2).trim(), options: [] }; qs.push(cur); key.push(null); return; }
    if (!cur) return;
    if (/^[-*]\s*/.test(line)) { if (line.startsWith('*')) key[qs.length - 1] = cur.options.length; cur.options.push(line.replace(/^[-*]\s*/, '')); return; }
    if (/^a[:.]/i.test(line)) { key[qs.length - 1] = line.slice(2).trim(); return; }
    cur.q += ' ' + line;
  });
  return { questions: qs.map(q => ({ q: q.q.slice(0, 500), options: q.options.slice(0, 8).map(o => o.slice(0, 200)) })), key };
}
function quizToText(questions, key) {
  return (questions || []).map((q, i) => 'Q: ' + q.q + '\n' + (q.options && q.options.length ? q.options.map((o, j) => (key && key[i] === j ? '* ' : '- ') + o).join('\n') : 'A: ' + ((key && key[i]) || ''))).join('\n\n');
}
function editAssign(id, type) {
  const a = id === 'new' ? { type } : (S.assignments.find(x => x.id === id) || {});
  const quiz = a.type === 'quiz';
  modal(`<h2>${quiz ? L('Quiz', 'اختبار', 'Quiz') : L('Assignment', 'تكليف', 'Devoir')}</h2>
  ${formInput(t('title'), 'aTitle', a.title, 'text', 'maxlength="160"')}
  ${formArea(L('Instructions', 'التعليمات', 'Consignes'), 'aInstr', a.instructions)}
  <div class="formgrid">${formInput(t('due'), 'aDue', a.due || '', 'date')}${formInput(L('Points', 'الدرجة', 'Points'), 'aPts', a.points ?? 10, 'number', 'min="0" max="1000"')}</div>
  ${quiz ? `<div class="field"><label for="aQuiz">${L('Questions', 'الأسئلة', 'Questions')}</label><textarea id="aQuiz" style="min-height:200px;font-family:ui-monospace,monospace" placeholder="Q: 2 + 2 = ?\n- 3\n* 4\n- 5\n\nQ: Capital of Egypt?\nA: Cairo">${esc(quizToText(a.questions, S_key && S_key.answers))}</textarea>
  <span class="hint">${L('Start each question with “Q:”. Options start with “-”; mark the right one with “*”. For a written answer use “A: answer”. Marking is automatic.', 'ابدئي كل سؤال بـ «Q:». الخيارات تبدأ بـ «-» وضعي «*» قبل الإجابة الصحيحة. للإجابة القصيرة اكتبي «A: الإجابة». التصحيح تلقائي.', 'Commencez chaque question par « Q: ». Options avec « - », la bonne avec « * ». Réponse courte : « A: réponse ». Correction automatique.')}</span></div>` : ''}
  ${formSelect(L('Visible to students?', 'ظاهر للطلاب؟', 'Visible aux élèves ?'), 'aPub', ['yes', 'no'], a.published === false ? 'no' : 'yes', v => v === 'yes' ? L('Published', 'منشور', 'Publié') : L('Draft', 'مسودة', 'Brouillon'))}
  <div class="row"><button onclick="saveAssign('${esc(id)}','${quiz ? 'quiz' : 'task'}')">${t('save')}</button><button class="secondary" onclick="closeModal()">${t('cancel')}</button>${id !== 'new' ? `<button class="warn" onclick="deleteAssign('${esc(id)}')">${t('del')}</button>` : ''}</div>`);
}
async function saveAssign(id, type) {
  const c = S.courses.find(x => x.id === openCourse);
  const title = val('aTitle').trim(); if (!title) return notify(t('titleReq'));
  const d = { courseId: c.id, grade: c.grade, class: c.class, type, title: title.slice(0, 160), instructions: val('aInstr').slice(0, 8000), due: val('aDue'), points: Math.max(0, Math.min(1000, Number(val('aPts')) || 0)), published: val('aPub') === 'yes', updatedBy: uid(), updatedAt: F.serverTimestamp() };
  let key = null;
  if (type === 'quiz') {
    const pq = parseQuiz(val('aQuiz'));
    if (!pq.questions.length) return notify(L('Add at least one question starting with “Q:”.', 'أضيفي سؤالاً واحداً على الأقل يبدأ بـ «Q:».', 'Ajoutez au moins une question « Q: ».'));
    if (pq.key.some(k => k === null || k === undefined || k === '')) return notify(L('Every question needs a correct answer (* or A:).', 'كل سؤال يحتاج إجابة صحيحة (* أو A:).', 'Chaque question doit avoir une bonne réponse (* ou A:).'));
    d.questions = pq.questions; key = pq.key;
  } else d.questions = [];
  closeModal();
  await guard(async () => {
    let aid = id;
    if (id === 'new') { const ref = await F.addDoc(scol('assignments'), { ...d, createdBy: uid(), createdAt: F.serverTimestamp() }); aid = ref.id; }
    else await F.updateDoc(sdoc('assignments', id), d);
    if (key) await F.setDoc(F.doc(fb.fs, 'schools', sid(), 'answerKeys', aid), { courseId: c.id, answers: key.map(k => typeof k === 'number' ? k : String(k).slice(0, 200)), updatedBy: uid(), updatedAt: F.serverTimestamp() });
  });
}
function deleteAssign(id) { closeModal(); ask(L('Delete this assignment? Submissions stay in the gradebook export.', 'حذف هذا التكليف؟', 'Supprimer ce devoir ?'), async () => { if (await guard(() => F.deleteDoc(sdoc('assignments', id)))) { openAssign = null; render(); } }); }
function assignView(c, editable) {
  const a = S.assignments.find(x => x.id === openAssign); if (!a) return '';
  const head = `<div class="panel"><div class="row space"><h2>${a.type === 'quiz' ? '📝' : '📄'} ${esc(a.title)}</h2>${editable ? `<button class="secondary" onclick="editAssign('${esc(a.id)}','${a.type}')">${t('edit')}</button>` : ''}</div>
    <div class="hint">${L('Due', 'التسليم', 'Pour le')} ${fmtDate(a.due)} · ${a.points || 0} ${L('pts', 'درجة', 'pts')}</div>
    ${a.instructions ? `<p>${esc(a.instructions).replace(/\n/g, '<br>')}</p>` : ''}</div><div style="height:14px"></div>`;
  if (isStudent()) return head + studentAnswer(a);
  if (canTeach()) return head + markingView(c, a, editable);
  return head;
}
function studentAnswer(a) {
  const sub = subFor(a.id, uid());
  const locked = sub && sub.status === 'marked';
  const ans = (sub && sub.answers) || {};
  let form = '';
  if (a.type === 'quiz') form = (a.questions || []).map((q, i) => `<div class="qbox"><strong>${i + 1}. ${esc(q.q)}</strong>${q.options && q.options.length
    ? q.options.map((o, j) => `<label class="opt"><input type="radio" name="q${i}" value="${j}" ${String(ans[i]) === String(j) ? 'checked' : ''} ${locked ? 'disabled' : ''}> ${esc(o)}</label>`).join('')
    : `<input id="q${i}" value="${esc(ans[i] || '')}" ${locked ? 'disabled' : ''}>`}</div>`).join('');
  else form = formArea(L('Your answer', 'إجابتك', 'Votre réponse'), 'sText', sub ? sub.text : '') + formInput(L('Link to your work (Drive, Docs, video…)', 'رابط عملك (درايف، مستند، فيديو…)', 'Lien vers votre travail'), 'sLink', sub ? sub.link : '', 'url');
  return `<div class="panel">${sub ? `<div class="notice">${sub.status === 'marked' ? `${L('Mark', 'الدرجة', 'Note')}: <b>${sub.score}/${a.points || 0}</b>${sub.feedback ? ' — ' + esc(sub.feedback) : ''}` : L('Submitted. You can still change it until your teacher marks it.', 'تم التسليم. يمكنك التعديل حتى يصحّح المعلم.', 'Rendu. Modifiable jusqu’à la correction.')}</div>` : ''}
  ${form}${locked ? '' : `<button onclick="submitWork('${esc(a.id)}')">${sub ? L('Update submission', 'تحديث التسليم', 'Mettre à jour') : L('Submit', 'تسليم', 'Rendre')}</button>`}</div>`;
}
async function submitWork(aid) {
  const a = S.assignments.find(x => x.id === aid);
  const id = aid + '_' + uid(), existing = subFor(aid, uid());
  const d = { text: '', link: '', answers: {}, submittedOn: today(), submittedAt: F.serverTimestamp() };
  if (a.type === 'quiz') (a.questions || []).forEach((q, i) => {
    if (q.options && q.options.length) { const r = document.querySelector(`input[name="q${i}"]:checked`); d.answers[i] = r ? Number(r.value) : -1; }
    else d.answers[i] = val('q' + i).slice(0, 200);
  });
  else { d.text = val('sText').slice(0, 8000); const l = val('sLink').trim(); d.link = safeUrl(l) ? l.slice(0, 500) : ''; }
  const ok = await guard(() => existing ? F.updateDoc(sdoc('submissions', id), d)
    : F.setDoc(sdoc('submissions', id), { ...d, assignmentId: aid, courseId: a.courseId, studentId: uid(), studentName: me.name || '', grade: me.grade, class: me.class, status: 'submitted', score: null, feedback: '' }));
  if (ok) notify(L('Submitted ✓', 'تم التسليم ✓', 'Rendu ✓'));
}
function autoScore(a, sub, key) {
  if (!key || !key.answers) return null;
  let right = 0; const n = (a.questions || []).length || 1;
  (a.questions || []).forEach((q, i) => {
    const k = key.answers[i], g = sub.answers ? sub.answers[i] : undefined;
    if (q.options && q.options.length ? Number(g) === Number(k) : String(g || '').trim().toLowerCase() === String(k || '').trim().toLowerCase()) right++;
  });
  return Math.round(right / n * (a.points || 0) * 10) / 10;
}
function markingView(c, a, editable) {
  const roster = rosterFor(c.grade, c.class);
  const rows = roster.map(s => {
    const sub = subFor(a.id, s.id);
    const suggested = a.type === 'quiz' && sub ? autoScore(a, sub, S_key) : null;
    return `<tr><td><strong>${esc(s.name)}</strong></td><td>${sub ? `${fmtDate(sub.submittedOn)}${isLate(a, sub) ? ` <span class="pill red">${L('late', 'متأخر', 'retard')}</span>` : ''}` : `<span class="pill gold">${L('not yet', 'لم يسلّم', 'pas encore')}</span>`}</td>
    <td>${sub ? (a.type === 'quiz' ? `${L('Auto', 'تلقائي', 'Auto')}: <b>${suggested ?? '—'}</b>` : `${esc(String(sub.text || '').slice(0, 200))}${sub.link ? `<br><a href="${esc(safeUrl(sub.link))}" target="_blank" rel="noopener">${L('Open link', 'فتح الرابط', 'Ouvrir')}</a>` : ''}`) : ''}</td>
    <td>${sub && editable ? `<input id="sc_${esc(s.id)}" type="number" min="0" max="${a.points || 0}" style="width:80px" value="${sub.score ?? (suggested ?? '')}">` : sub && sub.score != null ? sub.score : '—'}</td>
    <td>${sub && editable ? `<input id="fb_${esc(s.id)}" value="${esc(sub.feedback || '')}" placeholder="${L('Feedback', 'ملاحظات', 'Commentaire')}">` : ''}</td>
    <td>${sub && editable ? `<button class="tablebtn" onclick="markOne('${esc(a.id)}','${esc(s.id)}')">${sub.status === 'marked' ? '✓ ' : ''}${t('save')}</button>` : ''}</td></tr>`;
  }).join('');
  return `<div class="panel"><div class="row space"><h2>${L('Submissions', 'التسليمات', 'Rendus')} (${S.subs.filter(x => x.assignmentId === a.id).length}/${roster.length})</h2>
  ${editable && a.type === 'quiz' ? `<button onclick="markAllQuiz('${esc(a.id)}')">${L('Auto-mark all', 'تصحيح الكل تلقائياً', 'Tout corriger')}</button>` : ''}</div>
  <div class="scroll"><table><thead><tr><th>${t('name')}</th><th>${L('Submitted', 'التسليم', 'Rendu')}</th><th>${L('Work', 'العمل', 'Travail')}</th><th>${L('Mark', 'الدرجة', 'Note')}</th><th>${L('Feedback', 'ملاحظات', 'Commentaire')}</th><th></th></tr></thead><tbody>${rows || `<tr><td colspan="6" class="empty">${L('No approved students in this class yet', 'لا يوجد طلاب معتمدون في هذا الفصل بعد', 'Aucun élève approuvé dans cette classe')}</td></tr>`}</tbody></table></div></div>`;
}
async function markOne(aid, studentId) {
  const a = S.assignments.find(x => x.id === aid);
  const score = Math.max(0, Math.min(a.points || 0, Number(val('sc_' + studentId)) || 0));
  await guard(() => F.updateDoc(sdoc('submissions', aid + '_' + studentId), { score, feedback: val('fb_' + studentId).slice(0, 1000), status: 'marked', markedBy: uid(), markedAt: F.serverTimestamp() }));
}
async function markAllQuiz(aid) {
  const a = S.assignments.find(x => x.id === aid);
  if (!S_key) return notify(L('Answer key not loaded yet — try again in a moment.', 'لم يتم تحميل مفتاح الإجابة بعد.', 'Corrigé pas encore chargé.'));
  const subs = S.subs.filter(x => x.assignmentId === aid && x.status !== 'marked');
  for (const sub of subs) await guard(() => F.updateDoc(sdoc('submissions', sub.id), { score: autoScore(a, sub, S_key), feedback: sub.feedback || '', status: 'marked', markedBy: uid(), markedAt: F.serverTimestamp() }));
  notify(`${subs.length} ${L('marked', 'تم تصحيحها', 'corrigés')}`);
}

/* ---------- gradebook ---------- */
function gradebookPage() {
  const courses = myCourses();
  if (!gbCourse || !courses.find(c => c.id === gbCourse)) gbCourse = courses[0] ? courses[0].id : '';
  const c = courses.find(x => x.id === gbCourse);
  const pick = formSelect(navLabel('courses'), 'gbPick', courses.map(x => x.id), gbCourse, id => { const x = courses.find(y => y.id === id); return x ? `${x.title} — ${x.grade} ${x.class}` : id; }, 'onchange="setGb(this.value)"');
  if (!c) return viewTitle(navLabel('gradebook'), '') + `<div class="panel empty">${L('Create a course first.', 'أنشئي مقرراً أولاً.', 'Créez d’abord un cours.')}</div>`;
  const as = S.assignments.filter(a => a.courseId === c.id).sort((a, b) => String(a.due || '9').localeCompare(String(b.due || '9')));
  const roster = rosterFor(c.grade, c.class);
  const total = as.reduce((s, a) => s + (a.points || 0), 0);
  const rows = roster.map(s => {
    let got = 0;
    const cells = as.map(a => { const sub = subFor(a.id, s.id); if (sub && sub.status === 'marked') got += Number(sub.score) || 0; return `<td>${sub ? (sub.status === 'marked' ? sub.score : '✎') : (isLate(a) ? '<span class="miss">✗</span>' : '·')}</td>`; }).join('');
    return `<tr><td><strong>${esc(s.name)}</strong></td>${cells}<td><b>${pct(got, total)}%</b></td></tr>`;
  }).join('');
  return viewTitle(navLabel('gradebook'), `${esc(c.title)} · ${esc(c.grade)} ${esc(c.class)}`, `<button class="secondary no-print" onclick="exportGradebook()">${t('export')}</button>`)
    + `<div class="panel no-print">${pick}</div><div style="height:12px"></div>
  <div class="panel scroll"><table class="grid"><thead><tr><th>${t('name')}</th>${as.map(a => `<th title="${esc(a.title)}">${esc(a.title.slice(0, 18))}<br><span class="hint">/${a.points || 0}</span></th>`).join('')}<th>%</th></tr></thead><tbody>${rows || `<tr><td colspan="${as.length + 2}" class="empty">${L('No approved students in this class yet', 'لا يوجد طلاب معتمدون بعد', 'Aucun élève approuvé')}</td></tr>`}</tbody></table>
  <p class="hint">✎ ${L('submitted, not marked', 'مُسلَّم ولم يُصحَّح', 'rendu, non corrigé')} · ✗ ${L('missing (past due)', 'لم يُسلَّم (فات الموعد)', 'manquant')} · · ${L('not due yet', 'لم يحن الموعد', 'pas encore dû')}</p></div>`;
}
function setGb(v) { gbCourse = v; render(); }
function exportGradebook() {
  const c = S.courses.find(x => x.id === gbCourse); if (!c) return;
  const as = S.assignments.filter(a => a.courseId === c.id);
  const lines = [['Student', ...as.map(a => `${a.title} (/${a.points || 0})`)].map(csv).join(',')];
  rosterFor(c.grade, c.class).forEach(s => lines.push([s.name, ...as.map(a => { const sub = subFor(a.id, s.id); return sub && sub.status === 'marked' ? sub.score : ''; })].map(csv).join(',')));
  download(`gradebook-${c.title}-${today()}.csv`, lines.join('\r\n'), 'text/csv');
}

/* ---------- attendance ---------- */
function attendancePage() {
  const courses = myCourses();
  if (!attCourse || !courses.find(c => c.id === attCourse)) attCourse = courses[0] ? courses[0].id : '';
  if (!attDate) attDate = today();
  const c = courses.find(x => x.id === attCourse);
  if (!c) return viewTitle(navLabel('attendance'), '') + `<div class="panel empty">${L('Create a course first.', 'أنشئي مقرراً أولاً.', 'Créez d’abord un cours.')}</div>`;
  ensureAttSub();
  const roster = rosterFor(c.grade, c.class);
  const statusOf = s => (S_att.find(x => x.studentId === s.id) || {}).status || 'present';
  const lbl = v => ({ present: L('Present', 'حاضر', 'Présent'), absent: L('Absent', 'غائب', 'Absent'), late: L('Late', 'متأخر', 'En retard'), excused: L('Excused', 'بعذر', 'Excusé') }[v]);
  return viewTitle(navLabel('attendance'), `${esc(c.title)} · ${esc(c.grade)} ${esc(c.class)}`)
    + `<div class="panel"><div class="formgrid">${formSelect(navLabel('courses'), 'atPick', courses.map(x => x.id), attCourse, id => { const x = courses.find(y => y.id === id); return x ? `${x.title} — ${x.grade} ${x.class}` : id; }, 'onchange="setAtt(this.value, null)"')}
    ${formInput(t('date'), 'atDate', attDate, 'date', 'onchange="setAtt(null, this.value)"')}</div>
    ${S_att.length ? `<p class="hint">✓ ${L('Saved for this date', 'محفوظ لهذا اليوم', 'Enregistré pour cette date')}</p>` : ''}
    <div class="scroll"><table><tbody>${roster.map(s => `<tr><td><strong>${esc(s.name)}</strong></td><td>${drawSelect('at_' + s.id, ['present', 'absent', 'late', 'excused'], statusOf(s), lbl)}</td></tr>`).join('') || `<tr><td class="empty">${L('No approved students in this class yet', 'لا يوجد طلاب معتمدون بعد', 'Aucun élève approuvé')}</td></tr>`}</tbody></table></div>
    ${roster.length ? `<button onclick="saveAttendance()">${t('save')}</button>` : ''}</div>`;
}
let attKey = '';
function ensureAttSub() {
  const k = attCourse + '|' + attDate; if (k === attKey) return;
  attKey = k; stopView();
  viewSub(F.query(scol('attendance'), F.where('courseId', '==', attCourse), F.where('date', '==', attDate)), s => { S_att = list(s); });
}
function setAtt(c, d) { if (c) attCourse = c; if (d) attDate = d; render(); }
async function saveAttendance() {
  const c = S.courses.find(x => x.id === attCourse);
  const ok = await guard(async () => {
    for (const s of rosterFor(c.grade, c.class)) {
      await F.setDoc(sdoc('attendance', `${c.id}_${attDate}_${s.id}`), { courseId: c.id, date: attDate, studentId: s.id, studentName: s.name || '', grade: c.grade, class: c.class, status: val('at_' + s.id) || 'present', markedBy: uid(), updatedAt: F.serverTimestamp() });
    }
  });
  if (ok) notify(t('saved'));
}

/* ---------- announcements ---------- */
function newsPage() {
  const canPost = isAdmin() || isTeacher() || isRep();
  const myClasses = isParent() ? [[me.grade, me.class], ...Object.values(S.kids).map(k => [k.grade, k.class])] : [[me.grade, me.class]];
  const relevant = n => n.audience === 'school' || canTeach() || myClasses.some(([g, c]) => n.grade === g && n.class === c);
  const items = S.news.filter(relevant).sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')) || String(b.id).localeCompare(String(a.id)));
  return viewTitle(navLabel('news'), esc(school ? school.name : ''), canPost ? `<button onclick="editNews()">+ ${L('New announcement', 'إعلان جديد', 'Nouvelle annonce')}</button>` : '')
    + items.map(n => `<div class="panel" style="margin-bottom:12px"><div class="row space"><h3>${esc(n.title)}</h3><span class="pill">${n.audience === 'school' ? L('Whole school', 'المدرسة كلها', "Toute l'école") : esc(n.grade + ' · ' + n.class)}</span></div>
      <div class="hint">${esc(n.date)} · ${esc(n.authorName || '')}</div><p>${esc(n.body || '').replace(/\n/g, '<br>')}</p>
      ${(isAdmin() || n.authorId === uid()) ? `<button class="tablebtn warn" onclick="deleteNews('${esc(n.id)}')">${t('del')}</button>` : ''}</div>`).join('')
    + (items.length ? '' : `<div class="panel empty">${L('No announcements yet', 'لا توجد إعلانات بعد', 'Aucune annonce')}</div>`);
}
function editNews() {
  const schoolWide = isAdmin();
  const opts = schoolWide ? ['school', 'class'] : ['class'];
  modal(`<h2>${L('New announcement', 'إعلان جديد', 'Nouvelle annonce')}</h2>${formInput(t('title'), 'nTitle', '', 'text', 'maxlength="160"')}${formArea(L('Message', 'الرسالة', 'Message'), 'nBody', '')}
  ${formSelect(L('Who sees it', 'لمن', 'Destinataires'), 'nAud', opts, opts[0], v => v === 'school' ? L('Whole school', 'المدرسة كلها', "Toute l'école") : L('One class', 'فصل واحد', 'Une classe'))}
  ${isRep() ? '' : `<div class="formgrid">${formSelect(t('grade'), 'nGrade', GR(), grade === 'All' ? GR()[0] : grade)}${formSelect(t('class'), 'nClass', CL(), cls === 'All' ? CL()[0] : cls)}</div>`}
  <div class="row"><button onclick="saveNews()">${L('Post', 'نشر', 'Publier')}</button><button class="secondary" onclick="closeModal()">${t('cancel')}</button></div>`);
}
async function saveNews() {
  const title = val('nTitle').trim(); if (!title) return notify(t('titleReq'));
  const aud = val('nAud') || 'class';
  const d = { title: title.slice(0, 160), body: val('nBody').slice(0, 4000), audience: aud, grade: isRep() ? me.grade : (aud === 'school' ? '' : val('nGrade')), class: isRep() ? me.class : (aud === 'school' ? '' : val('nClass')), date: today(), authorId: uid(), authorName: me.name || '', createdAt: F.serverTimestamp() };
  closeModal();
  await guard(() => F.addDoc(scol('news'), d));
}
function deleteNews(id) { ask(L('Delete this announcement?', 'حذف هذا الإعلان؟', 'Supprimer cette annonce ?'), () => guard(() => F.deleteDoc(sdoc('news', id)))); }

/* ---------- progress (student) and children (parent) ---------- */
function progressTable(assigns, subs, courses) {
  const rows = assigns.slice().sort((a, b) => String(b.due || '').localeCompare(String(a.due || ''))).map(a => {
    const sub = subs.find(x => x.assignmentId === a.id), c = courses.find(x => x.id === a.courseId) || {};
    return `<tr><td>${esc(c.title || '—')}</td><td>${esc(a.title)}</td><td>${fmtDate(a.due)}</td><td>${subStatus(a, sub)}</td><td>${sub && sub.feedback ? esc(sub.feedback) : ''}</td></tr>`;
  }).join('');
  return `<div class="scroll"><table><thead><tr><th>${navLabel('courses')}</th><th>${t('title')}</th><th>${t('due')}</th><th>${t('status')}</th><th>${L('Feedback', 'ملاحظات', 'Commentaire')}</th></tr></thead><tbody>${rows || `<tr><td colspan="5" class="empty">—</td></tr>`}</tbody></table></div>`;
}
function summaryCards(assigns, subs, att) {
  const marked = subs.filter(s => s.status === 'marked');
  const got = marked.reduce((s, x) => s + (Number(x.score) || 0), 0);
  const poss = marked.reduce((s, x) => s + ((assigns.find(a => a.id === x.assignmentId) || {}).points || 0), 0);
  const missing = assigns.filter(a => !subs.find(s => s.assignmentId === a.id) && isLate(a)).length;
  const present = att.filter(a => a.status === 'present' || a.status === 'late').length;
  return `<div class="cards"><div class="card"><div class="metric">${pct(got, poss)}%</div><div class="muted">${L('Average mark', 'متوسط الدرجات', 'Moyenne')}</div></div>
  <div class="card"><div class="metric">${subs.length}/${assigns.length}</div><div class="muted">${L('Work submitted', 'أعمال مُسلَّمة', 'Travaux rendus')}</div></div>
  <div class="card"><div class="metric">${missing}</div><div class="muted">${L('Missing', 'لم يُسلَّم', 'Manquants')}</div></div>
  <div class="card"><div class="metric">${att.length ? pct(present, att.length) + '%' : '—'}</div><div class="muted">${navLabel('attendance')}</div></div></div>`;
}
function progressPage() {
  return viewTitle(navLabel('progress'), `${esc(me.grade)} · ${esc(me.class)}`)
    + summaryCards(S.assignments, S.subs, S.attendance) + `<div class="panel">${progressTable(S.assignments, S.subs, S.courses)}</div>`
    + (me.studentCode ? `<div class="notice">${L('Your parent can follow your progress with this code', 'يمكن لولي أمرك متابعة تقدّمك بهذا الكود', 'Votre parent peut suivre vos progrès avec ce code')}: <b class="code">${esc(me.studentCode)}</b></div>` : '');
}
function childrenPage() {
  const kids = (me.children || []).map(id => S.kids[id]).filter(Boolean);
  const linkBox = `<div class="panel"><h2>${L('Link my child', 'ربط حساب طفلي', 'Lier mon enfant')}</h2><p class="hint">${L('Your child finds their code under “My progress” in their own account.', 'يجد طفلك الكود في صفحة «تقدّمي» في حسابه.', 'Votre enfant trouve son code dans « Mes progrès ».')}</p>
  <div class="row"><input id="kidCode" placeholder="${L('Student code', 'كود الطالب', "Code de l'élève")}" maxlength="8" style="max-width:200px;text-transform:uppercase;letter-spacing:3px"><button onclick="linkChild()">${L('Link', 'ربط', 'Lier')}</button></div></div>`;
  return viewTitle(navLabel('children'), esc(school ? school.name : ''))
    + kids.map(k => {
      const as = S.kidAssign[k.id] || [], subs = S.kidSubs[k.id] || [], att = S.kidAtt[k.id] || [], cs = S.kidCourses[k.id] || [];
      return `<div class="panel" style="margin-bottom:16px"><h2>${esc(k.name)} <span class="hint">${esc(k.grade)} · ${esc(k.class)}</span></h2>${summaryCards(as, subs, att)}${progressTable(as, subs, cs)}</div>`;
    }).join('') + linkBox;
}
async function linkChild() {
  const code = val('kidCode').toUpperCase().replace(/[^A-Z0-9]/g, '');
  try {
    const s = await F.getDoc(F.doc(fb.fs, 'schools', sid(), 'studentCodes', code));
    if (!s.exists()) return notify(L('No student found with this code.', 'لا يوجد طالب بهذا الكود.', 'Aucun élève avec ce code.'));
    const kids = [...new Set([...(me.children || []), s.data().uid])].slice(0, 6);
    await F.updateDoc(F.doc(fb.fs, 'users', uid()), { children: kids });
    notify(L('Linked ✓', 'تم الربط ✓', 'Lié ✓') + ' — ' + s.data().name);
  } catch (e) { notify(t('writeErr')); }
}
