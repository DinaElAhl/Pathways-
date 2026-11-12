import * as F from './fb.js';
import { categories, catFrench, itemFrench, words, statusVals, priorities, visVals } from './constants.js';

/* ---------- configuration ---------- */
const CFG = window.ROOTS_CONFIG || {};
const configured = CFG.firebase && CFG.firebase.apiKey && !String(CFG.firebase.apiKey).startsWith('PASTE');
const DEFAULT_GRADES = ['KG1', 'KG2', ...Array.from({ length: 12 }, (_, i) => 'Grade ' + (i + 1))];
const DEFAULT_CLASSES = ['A', 'B', 'C', 'D'];
const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/* ---------- wording (EN / AR / FR) ---------- */
const more = {
  en: {
    signIn: 'Sign in', signUp: 'Create account', password: 'Password', forgot: 'Forgot password?',
    haveAccount: 'Already have an account? Sign in', needAccount: 'New here? Create an account',
    joinSchool: 'Join my school', newSchool: 'Register a new school', schoolCode: 'School code', findSchool: 'Find school',
    codeHint: 'Ask your school or class representative for the 6-letter school code.', codeNotFound: 'No school found with this code. Check it and try again.',
    schoolName: 'School name', newSchoolHint: 'You will be the school administrator. You can invite representatives and parents with your school code.',
    childClass: "Your child's grade and class", childHint: 'If you have children in several classes, choose one. The school admin can change it later.',
    verifyTitle: 'Confirm your email', verifyText: 'We sent a confirmation link to', resend: 'Send the link again', iVerified: "I've confirmed — continue",
    notVerifiedYet: 'Not confirmed yet. Open the link in the email, then try again.',
    pendingTitle: 'Waiting for approval', pendingText: 'Your account was created. Your class representative or the school admin must approve it before you can see class information.',
    signOut: 'Sign out', members: 'Members', account: 'My account', approve: 'Approve', unapprove: 'Remove approval',
    approved: 'Approved', waiting: 'Waiting', role: 'Role', edit: 'Edit', del: 'Delete', close: 'Close', confirm: 'Confirm',
    resetSent: 'A password-reset link has been sent to your email.', verifySent: 'Confirmation link sent.',
    titleReq: 'A title is required.', nameReq: 'Please enter a name.', saved: 'Saved.',
    updates: 'New updates are available — tap to refresh', loading: 'Loading…',
    notConfigured: 'This app is not connected to its database yet (config.js).',
    loadErr: 'Some information could not be loaded. Check your connection, or ask the admin to check your access.',
    writeErr: 'Could not save. You may not have permission, or you are offline.',
    delConcern: 'Delete this concern permanently?', yourClass: 'Your class', newMembers: 'Waiting for approval',
    repDirectory: 'Class representatives — contact your rep about class matters', assignHint: 'To make someone a representative, open Members and change their role.',
    reportsHint: 'Generate a printable summary and download records', exportAll: 'Download full JSON backup',
    fullName: 'Full name', changeName: 'Update name', sendReset: 'Email me a password-reset link', language: 'Language',
    parentRole: 'Parent', repRole: 'Representative', adminRole: 'School admin', allClasses: 'All', noMembers: 'No members yet',
    visParentHint: 'Private: only your class representative sees it. Representative and school: the school administration sees it too.',
    schoolSettings: 'School settings', inviteTitle: 'Invite people', inviteText: 'Share this code or link with representatives and parents. They choose their class when they sign up, then you or the class rep approve them.',
    joinLink: 'Join link', copy: 'Copy', copied: 'Copied ✓', gradesLabel: 'Grades (one per line)', classesLabel: 'Class sections (comma-separated)',
    gradesHint: 'Changing names here does not move existing records.', schools: 'Schools', schoolsHint: 'Every school registered on Roots Parent Voice',
    created: 'Created', tagline: 'Learning & Parent Voice · التعلّم وصوت الأهل'
  },
  ar: {
    signIn: 'تسجيل الدخول', signUp: 'إنشاء حساب', password: 'كلمة المرور', forgot: 'نسيتِ كلمة المرور؟',
    haveAccount: 'لديكِ حساب؟ سجّلي الدخول', needAccount: 'جديدة هنا؟ أنشئي حساباً',
    joinSchool: 'الانضمام إلى مدرستي', newSchool: 'تسجيل مدرسة جديدة', schoolCode: 'كود المدرسة', findSchool: 'ابحثي عن المدرسة',
    codeHint: 'اطلبي كود المدرسة المكوّن من ٦ أحرف من المدرسة أو ممثل الفصل.', codeNotFound: 'لا توجد مدرسة بهذا الكود. تحققي منه وحاولي مجدداً.',
    schoolName: 'اسم المدرسة', newSchoolHint: 'ستكونين مسؤولة المدرسة، ويمكنك دعوة الممثلين وأولياء الأمور بكود المدرسة.',
    childClass: 'صف وفصل طفلك', childHint: 'إذا كان لديكِ أبناء في أكثر من فصل، اختاري فصلاً واحداً، ويمكن للإدارة تعديله لاحقاً.',
    verifyTitle: 'تأكيد البريد الإلكتروني', verifyText: 'أرسلنا رابط التأكيد إلى', resend: 'إعادة إرسال الرابط', iVerified: 'أكدتُ البريد — متابعة',
    notVerifiedYet: 'لم يتم التأكيد بعد. افتحي الرابط في البريد ثم حاولي مرة أخرى.',
    pendingTitle: 'بانتظار الموافقة', pendingText: 'تم إنشاء حسابك. يجب أن يوافق ممثل الفصل أو إدارة المدرسة عليه قبل عرض بيانات الفصل.',
    signOut: 'تسجيل الخروج', members: 'الأعضاء', account: 'حسابي', approve: 'موافقة', unapprove: 'إلغاء الموافقة',
    approved: 'مُعتمد', waiting: 'بانتظار الموافقة', role: 'الدور', edit: 'تعديل', del: 'حذف', close: 'إغلاق', confirm: 'تأكيد',
    resetSent: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك.', verifySent: 'تم إرسال رابط التأكيد.',
    titleReq: 'العنوان مطلوب.', nameReq: 'يرجى كتابة الاسم.', saved: 'تم الحفظ.',
    updates: 'توجد تحديثات جديدة — اضغطي للتحديث', loading: 'جارٍ التحميل…',
    notConfigured: 'التطبيق غير متصل بقاعدة البيانات بعد.',
    loadErr: 'تعذّر تحميل بعض البيانات. تحققي من الاتصال أو اطلبي من الإدارة مراجعة صلاحياتك.',
    writeErr: 'تعذّر الحفظ. ربما لا توجد صلاحية أو أنتِ غير متصلة.',
    delConcern: 'حذف هذه الملاحظة نهائياً؟', yourClass: 'فصلك', newMembers: 'بانتظار الموافقة',
    repDirectory: 'ممثلو الفصول — تواصلي مع ممثل فصلك في شؤون الفصل', assignHint: 'لتعيين ممثل فصل، افتحي صفحة الأعضاء وغيّري الدور.',
    reportsHint: 'عرض ملخص قابل للطباعة وتنزيل البيانات', exportAll: 'تنزيل نسخة JSON كاملة',
    fullName: 'الاسم الكامل', changeName: 'تحديث الاسم', sendReset: 'أرسلي لي رابط إعادة تعيين كلمة المرور', language: 'اللغة',
    parentRole: 'ولي أمر', repRole: 'ممثل الفصل', adminRole: 'إدارة المدرسة', allClasses: 'الكل', noMembers: 'لا يوجد أعضاء بعد',
    visParentHint: 'خاصة: يراها ممثل الفصل فقط. ممثل الفصل والإدارة: تراها إدارة المدرسة أيضاً.',
    schoolSettings: 'إعدادات المدرسة', inviteTitle: 'دعوة الأعضاء', inviteText: 'شاركي هذا الكود أو الرابط مع الممثلين وأولياء الأمور. يختارون فصلهم عند التسجيل، ثم توافقين أنتِ أو ممثل الفصل عليهم.',
    joinLink: 'رابط الانضمام', copy: 'نسخ', copied: 'تم النسخ ✓', gradesLabel: 'الصفوف (صف في كل سطر)', classesLabel: 'الفصول (مفصولة بفواصل)',
    gradesHint: 'تغيير الأسماء هنا لا ينقل السجلات الحالية.', schools: 'المدارس', schoolsHint: 'كل المدارس المسجلة في صوت أولياء الأمور من جذور',
    created: 'تاريخ التسجيل', tagline: 'منصة التعلّم وصوت أولياء الأمور'
  },
  fr: {
    signIn: 'Se connecter', signUp: 'Créer un compte', password: 'Mot de passe', forgot: 'Mot de passe oublié ?',
    haveAccount: 'Déjà un compte ? Se connecter', needAccount: 'Nouveau ? Créer un compte',
    joinSchool: 'Rejoindre mon école', newSchool: 'Inscrire une nouvelle école', schoolCode: "Code de l'école", findSchool: "Trouver l'école",
    codeHint: "Demandez le code à 6 caractères à l'école ou au parent délégué.", codeNotFound: 'Aucune école avec ce code. Vérifiez et réessayez.',
    schoolName: "Nom de l'école", newSchoolHint: "Vous serez administrateur de l'école et pourrez inviter délégués et parents avec le code.",
    childClass: 'Niveau et classe de votre enfant', childHint: 'Si vous avez plusieurs enfants, choisissez une classe. La direction pourra la modifier.',
    verifyTitle: 'Confirmez votre e-mail', verifyText: 'Un lien de confirmation a été envoyé à', resend: 'Renvoyer le lien', iVerified: "J'ai confirmé — continuer",
    notVerifiedYet: "Pas encore confirmé. Ouvrez le lien dans l'e-mail, puis réessayez.",
    pendingTitle: "En attente d'approbation", pendingText: 'Votre compte est créé. Le parent délégué ou la direction doit l’approuver avant l’accès aux informations de la classe.',
    signOut: 'Se déconnecter', members: 'Membres', account: 'Mon compte', approve: 'Approuver', unapprove: "Retirer l'approbation",
    approved: 'Approuvé', waiting: 'En attente', role: 'Rôle', edit: 'Modifier', del: 'Supprimer', close: 'Fermer', confirm: 'Confirmer',
    resetSent: 'Un lien de réinitialisation a été envoyé.', verifySent: 'Lien de confirmation envoyé.',
    titleReq: 'Le titre est obligatoire.', nameReq: 'Veuillez saisir un nom.', saved: 'Enregistré.',
    updates: 'Nouvelles mises à jour — touchez pour actualiser', loading: 'Chargement…',
    notConfigured: "L'application n'est pas encore reliée à sa base de données.",
    loadErr: "Certaines informations n'ont pas pu être chargées. Vérifiez la connexion ou vos droits d'accès.",
    writeErr: "Enregistrement impossible : droits insuffisants ou hors connexion.",
    delConcern: 'Supprimer définitivement ce point ?', yourClass: 'Votre classe', newMembers: "En attente d'approbation",
    repDirectory: 'Parents délégués — contactez votre délégué pour les questions de classe', assignHint: 'Pour nommer un délégué, ouvrez Membres et changez son rôle.',
    reportsHint: 'Imprimer le récapitulatif et exporter les données', exportAll: 'Télécharger la sauvegarde JSON complète',
    fullName: 'Nom complet', changeName: 'Mettre à jour le nom', sendReset: 'Recevoir un lien de réinitialisation', language: 'Langue',
    parentRole: 'Parent', repRole: 'Parent délégué', adminRole: 'Direction', allClasses: 'Toutes', noMembers: 'Aucun membre',
    visParentHint: 'Privé : seul le délégué le voit. Délégué et direction : la direction le voit aussi.',
    schoolSettings: "Paramètres de l'école", inviteTitle: 'Inviter', inviteText: "Partagez ce code ou ce lien avec les délégués et les parents. Ils choisissent leur classe à l'inscription, puis vous ou le délégué les approuvez.",
    joinLink: "Lien d'inscription", copy: 'Copier', copied: 'Copié ✓', gradesLabel: 'Niveaux (un par ligne)', classesLabel: 'Classes (séparées par des virgules)',
    gradesHint: 'Renommer ici ne déplace pas les fiches existantes.', schools: 'Écoles', schoolsHint: 'Toutes les écoles inscrites sur Roots Parent Voice',
    created: 'Créée le', tagline: 'Apprentissage & voix des parents'
  }
};
['en', 'ar', 'fr'].forEach(l => Object.assign(words[l], more[l]));
words.en.overview = 'School improvement overview';

/* ---------- state ---------- */
let lang = 'en';
try { lang = localStorage.getItem('roots-lang') || (navigator.language || '').slice(0, 2); if (!words[lang]) lang = 'en'; } catch (e) {}
const params = new URLSearchParams(location.search);
let joinCode = (params.get('join') || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
let page = '', grade = 'All', cls = 'All', tab = 0, editing = null, search = '', checkDirty = false, pendingRender = false;
let authMode = joinCode ? 'signup' : 'signin', signupKind = 'join', foundSchool = null, signupRole = 'parent';
let openCourse = null, courseTab = 'lessons', openLesson = null, openAssign = null, gbCourse = '', attCourse = '', attDate = '', lessonUnsubs = [], viewUnsubs = [], S_lessons = [], S_att = [], S_key = null;
let authState = configured ? 'loading' : 'config', authUser = null, me = null, school = null, flash = '', isOwner = false, allSchools = [];
const ISO = 'AF AX AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BV BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF TF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HM VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW'.split(' ');
function countryName(c) { try { return new Intl.DisplayNames([lang], { type: 'region' }).of(c) || c; } catch (e) { return c; } }
function countryOptions() { return ['', ...ISO.slice().sort((a, b) => countryName(a).localeCompare(countryName(b), lang))]; }
let joinCountry = '', dirSchools = null, dirPick = '', showCodeBox = false, allDirectory = {}, mySchoolDir = undefined;
let fb = null, unsubs = [], profileUnsub = null, schoolUnsub = null, subKey = '', loadError = false;
const S = { users: [], reps: [], issueSets: {}, meetings: [], checks: {}, courses: [], assignments: [], subs: [], attendance: [], news: [], students: [], kids: {}, kidSubs: {}, kidAtt: {}, kidAssign: {}, kidCourses: {} };

const t = k => (words[lang] && words[lang][k]) || words.en[k] || k;
const L = (en, ar, fr) => lang === 'ar' ? ar : lang === 'fr' ? fr : en;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = () => new Date().toISOString().slice(0, 10);
const uid = () => authUser && authUser.uid;
const sid = () => me && me.schoolId;
const GR = () => (school && Array.isArray(school.grades) && school.grades.length ? school.grades : DEFAULT_GRADES);
const CL = () => (school && Array.isArray(school.classes) && school.classes.length ? school.classes : DEFAULT_CLASSES);
const isAdmin = () => me && me.role === 'admin';
const isRep = () => me && me.role === 'rep';
const isStaff = () => isAdmin() || isRep();
const isTeacher = () => me && me.role === 'teacher';
const isStudent = () => me && me.role === 'student';
const isParent = () => me && me.role === 'parent';
const canTeach = () => isAdmin() || isTeacher();
const roleLabel = r => r === 'teacher' ? L('Teacher', 'معلم/ة', 'Enseignant') : r === 'student' ? L('Student', 'طالب/ة', 'Élève') : t(r === 'admin' ? 'adminRole' : r === 'rep' ? 'repRole' : 'parentRole');
const catLabel = c => { const i = categories.findIndex(a => a[0] === c); return i < 0 ? c : lang === 'fr' ? catFrench[i] : lang === 'ar' ? categories[i][1] : categories[i][0]; };
const checkKey = (g, c) => (g + '_' + c).replace(/[^A-Za-z0-9_]/g, '-');
const allIssues = () => { const m = new Map(); Object.values(S.issueSets).forEach(set => set.forEach(i => m.set(i.id, i))); return [...m.values()]; };
const filtered = items => items.filter(x => (grade === 'All' || x.grade === grade) && (cls === 'All' || x.class === cls));
const viewIssues = () => filtered(allIssues()).sort((a, b) => String(b.created || '').localeCompare(String(a.created || '')) || String(b.id).localeCompare(String(a.id)));
const activeCount = arr => arr.filter(x => !['closed', 'rejected', 'duplicate'].includes(x.status)).length;
const tag = s => `<span class="pill ${s === 'High' || s === 'Urgent' ? 'red' : ['reported', 'verified', 'presented'].includes(s) ? 'gold' : ''}">${esc(t(s))}</span>`;
const val = id => { const el = document.getElementById(id); return el ? el.value : ''; };
const scol = name => F.collection(fb.fs, 'schools', sid(), name);
const sdoc = (name, id) => F.doc(fb.fs, 'schools', sid(), name, id);
const joinUrl = code => location.origin + location.pathname + '?join=' + code;
function pagesFor() {
  let p;
  if (isAdmin()) p = ['dashboard', 'courses', 'gradebook', 'attendance', 'news', 'concerns', 'checklist', 'meetings', 'representatives', 'members', 'reports', 'schoolSettings'];
  else if (isTeacher()) p = ['courses', 'gradebook', 'attendance', 'news', 'members'];
  else if (isStudent()) p = ['courses', 'progress', 'news'];
  else if (isRep()) p = ['dashboard', 'news', 'concerns', 'checklist', 'meetings', 'representatives', 'members', 'reports'];
  else p = ['children', 'news', 'dashboard', 'concerns', 'meetings', 'representatives'];
  p.push('account');
  if (isOwner) p.push('schools');
  return p;
}
const ICONS = { courses: '📘', course: '📘', gradebook: '▦', attendance: '✓', news: '📣', progress: '📈', children: '👪', dashboard: '◫', checklist: '☑', concerns: '◉', meetings: '▣', representatives: '♙', members: '☺', reports: '▤', schoolSettings: '✎', account: '⚙', schools: '❀' };

/* ---------- dialogs ---------- */
function modal(html) { const m = document.getElementById('cvModal'); m.innerHTML = '<div class="cvbox">' + html + '</div>'; m.style.display = 'flex'; }
function closeModal() { const m = document.getElementById('cvModal'); m.style.display = 'none'; m.innerHTML = ''; }
function notify(msg) { modal(`<p>${esc(msg)}</p><div class="row"><button onclick="closeModal()">OK</button></div>`); }
let askFn = null;
function ask(msg, fn) { askFn = fn; modal(`<p>${esc(msg)}</p><div class="row"><button class="warn" onclick="runAsk()">${t('confirm')}</button><button class="secondary" onclick="closeModal()">${t('cancel')}</button></div>`); }
function runAsk() { const f = askFn; askFn = null; closeModal(); f && f(); }
async function copyText(text, btn) { try { await navigator.clipboard.writeText(text); if (btn) btn.textContent = t('copied'); } catch (e) { notify(text); } }

/* ---------- rendering helpers ---------- */
function drawSelect(id, values, value, labels, extra = '') { return `<select id="${id}" ${extra}>${values.map(v => `<option value="${esc(v)}" ${v === value ? 'selected' : ''}>${esc(labels ? labels(v) : v)}</option>`).join('')}</select>`; }
function formInput(label, id, value = '', type = 'text', extra = '') { return `<div class="field"><label for="${id}">${esc(label)}</label><input id="${id}" type="${type}" value="${esc(value)}" ${extra}></div>`; }
function formArea(label, id, value = '') { return `<div class="field"><label for="${id}">${esc(label)}</label><textarea id="${id}">${esc(value)}</textarea></div>`; }
function formSelect(label, id, vals, value, fn, extra) { return `<div class="field"><label for="${id}">${esc(label)}</label>${drawSelect(id, vals, value, fn, extra)}</div>`; }
function viewTitle(title, desc = '', extra = '') { return `<div class="topline"><div><h1>${title}</h1><div class="sub">${desc}</div></div>${extra}</div>`; }
const brandHtml = () => `<div class="brand"><img src="icons/roots-sprout.svg" width="42" height="42" alt="" class="sprout"><span><span class="brandline">Roots <span class="ar">| جذور</span></span><span class="tagline">${esc(t('tagline'))}</span></span></div>`;

function shouldDefer() {
  if (authState !== 'ready') return false;
  if (editing !== null || checkDirty) return true;
  const a = document.activeElement;
  return !!(a && a.closest && a.closest('main') && /INPUT|TEXTAREA|SELECT/.test(a.tagName));
}
function softRender() {
  if (shouldDefer()) { pendingRender = true; const b = document.getElementById('cvUpdates'); if (b) b.style.display = 'block'; return; }
  render();
}

function render() {
  pendingRender = false;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  const root = document.getElementById('root');
  const nextLang = lang === 'en' ? 'Français' : lang === 'fr' ? 'العربية' : 'English';
  if (authState !== 'ready') {
    root.innerHTML = `<div class="authwrap"><div class="authcard"><div class="row space">${brandHtml()}<button class="secondary" onclick="cycleLang()">${nextLang}</button></div>${authScreen()}</div><p class="authfoot">Roots | جذور · Learning & Parent Voice</p></div>`;
    return;
  }
  if (page !== 'course' && !pagesFor().includes(page)) page = pagesFor()[0];
  const locked = !(isAdmin() || isTeacher());
  if (locked) { grade = me.grade || 'All'; cls = me.class || 'All'; }
  if (page === 'course' && !openCourse) page = pagesFor()[0];
  const gradeSel = drawSelect('gradeSelect', ['All', ...GR()], grade, v => v === 'All' ? t('all') : v, `aria-label="${t('grade')}" onchange="setGrade(this.value)" ${locked ? 'disabled' : ''}`);
  const classSel = drawSelect('classSelect', ['All', ...CL()], cls, v => v === 'All' ? t('allClasses') : v, `aria-label="${t('class')}" onchange="setClass(this.value)" ${locked ? 'disabled' : ''}`);
  const views = { courses: coursesPage, course: coursePage, gradebook: gradebookPage, attendance: attendancePage, news: newsPage, progress: progressPage, children: childrenPage, dashboard, checklist, concerns, meetings, representatives, members, reports, schoolSettings, account, schools: schoolsPage };
  root.innerHTML = `<header>${brandHtml()}<div class="headercontrols">${gradeSel}${classSel}<button class="secondary" onclick="cycleLang()">${nextLang}</button><span class="userchip">${esc(me.name || authUser.email)} · ${esc(roleLabel(me.role))}</span></div></header>
  <div class="shell"><aside><div class="small">${esc(school ? school.name : '')}</div><nav>${pagesFor().map(p => `<button class="${p === page || (p === 'courses' && page === 'course') ? 'active' : ''}" onclick="go('${p}')">${ICONS[p]} &nbsp; ${navLabel(p)}</button>`).join('')}</nav></aside>
  <div><main id="app">${loadError ? `<div class="notice">${t('loadErr')}</div>` : ''}${views[page]()}</main><footer>Roots | جذور · Learning & Parent Voice · ${esc(school ? school.name : '')}</footer></div></div>
  <div id="cvUpdates" class="updates" onclick="refreshNow()">${t('updates')}</div>`;
}

/* ---------- auth screens ---------- */
function classPicker() {
  const g = foundSchool && foundSchool.grades && foundSchool.grades.length ? foundSchool.grades : DEFAULT_GRADES;
  const c = foundSchool && foundSchool.classes && foundSchool.classes.length ? foundSchool.classes : DEFAULT_CLASSES;
  const lbl = signupRole === 'student' ? L('Your grade and class', 'صفك وفصلك', 'Votre niveau et classe') : t('childClass');
  return `<div class="field"><label>${lbl}</label><div class="formgrid">${drawSelect('aGrade', g, g[0])}${drawSelect('aClass', c, c[0])}</div>${signupRole === 'parent' ? `<span class="hint">${t('childHint')}</span>` : ''}</div>`;
}
function schoolChoice(withAccount) {
  const tabs = `<div class="tabs"><button class="${signupKind === 'join' ? 'active' : ''}" onclick="setKind('join')">${t('joinSchool')}</button><button class="${signupKind === 'new' ? 'active' : ''}" onclick="setKind('new')">${t('newSchool')}</button></div>`;
  const acct = withAccount ? `${formInput(t('email'), 'aEmail', '', 'email', 'autocomplete="email"')}${formInput(t('password'), 'aPass', '', 'password', 'autocomplete="new-password" minlength="6"')}` : '';
  if (signupKind === 'new') return tabs + formInput(t('fullName'), 'aName', '', 'text', 'autocomplete="name"') + acct
    + `<div class="field"><label for="aCountry">${L('Country', 'الدولة', 'Pays')}</label>${drawSelect('aCountry', countryOptions(), joinCountry, c => c ? countryName(c) : L('Choose your country…', 'اختاري دولتك…', 'Choisissez votre pays…'), 'onchange="setRegCountry(this.value)"')}</div>`
    + `<div class="field"><label for="aCity">${L('City', 'المدينة', 'Ville')}</label><input id="aCity" maxlength="80" autocomplete="off" value="${esc(preCity)}" placeholder="${L('Type or pick your city', 'اكتبي أو اختاري مدينتك', 'Tapez ou choisissez votre ville')}" oninput="citySearchInput(this.value)" onfocus="citySearchInput(this.value)"><div id="cityResults" class="sresults"></div></div>`
    + `<div class="field"><label for="aSchool">${t('schoolName')}</label><input id="aSchool" maxlength="120" autocomplete="off" value="${esc(preName)}" placeholder="${L('Type the first letters — we search for your school', 'اكتبي أول الحروف — سنبحث عن مدرستك', 'Tapez les premières lettres — nous cherchons votre école')}" oninput="schoolSearchInput(this.value)"><div id="schoolResults" class="sresults"></div></div>`
    + `<p class="hint">${t('newSchoolHint')} ${L('Roots reviews new schools before they appear in the public school list.', 'تراجع جذور المدارس الجديدة قبل ظهورها في قائمة المدارس.', 'Roots vérifie les nouvelles écoles avant de les afficher.')}</p>`
    + `<button style="width:100%" onclick="${withAccount ? 'doSignUp()' : 'completeProfile()'}">${withAccount ? t('signUp') : t('save')}</button>`;
  if (!foundSchool) {
    const codeBox = `<div class="field"><label for="aCode">${t('schoolCode')}</label><input id="aCode" value="${esc(joinCode)}" maxlength="8" style="text-transform:uppercase;letter-spacing:3px;font-weight:700" autocomplete="off"><span class="hint">${t('codeHint')}</span></div>
    <button style="width:100%" onclick="findSchool()">${t('findSchool')}</button>`;
    if (joinCode || showCodeBox) return tabs + codeBox + `<p><a href="#" onclick="setCodeBox(false);return false">← ${L('Find my school by country', 'ابحثي عن مدرستي حسب الدولة', 'Trouver mon école par pays')}</a></p>`;
    const list = !joinCountry ? '' : `<div class="field"><label for="aCity">${L('City', 'المدينة', 'Ville')}</label><input id="aCity" maxlength="80" autocomplete="off" value="${esc(preCity)}" placeholder="${L('Type or pick your city', 'اكتبي أو اختاري مدينتك', 'Tapez ou choisissez votre ville')}" oninput="citySearchInput(this.value)" onfocus="citySearchInput(this.value)"><div id="cityResults" class="sresults"></div></div>` + `<div class="field"><label for="schoolSearch">${L('Your school', 'مدرستك', 'Votre école')}</label><input id="schoolSearch" autocomplete="off" placeholder="${L('Type the first letters of your school…', 'اكتبي أول حروف اسم مدرستك…', 'Tapez les premières lettres de votre école…')}" oninput="schoolSearchInput(this.value)"><div id="schoolResults" class="sresults">${dirSchools === null ? `<p class="hint">${t('loading')}</p>` : renderSchoolResults('', [])}</div></div>`;
    return tabs + `<div class="field"><label for="aCountry">${L('Country', 'الدولة', 'Pays')}</label>${drawSelect('aCountry', countryOptions(), joinCountry, c => c ? countryName(c) : L('Choose your country…', 'اختاري دولتك…', 'Choisissez votre pays…'), 'onchange="setJoinCountry(this.value)"')}</div>`
      + list + (joinCountry ? `<button type="button" class="secondary" style="width:100%" onclick="registerFromJoin(-1)">＋ ${L('My school isn’t listed — register it on Roots', 'مدرستي غير موجودة — سجّليها في جذور', 'Mon école n’est pas listée — l’inscrire')}</button>` : '') + `<p><a href="#" onclick="setCodeBox(true);return false">${L('Have a school code instead?', 'لديكِ كود المدرسة؟', "Vous avez un code d'école ?")}</a></p>`;
  }
  const roleSel = `<div class="field"><label>${L('I am a…', 'أنا…', 'Je suis…')}</label>${drawSelect('aRole', ['parent', 'student', 'teacher'], signupRole, roleLabel, 'onchange="setSignupRole(this.value)"')}</div>`;
  return tabs + `<div class="schoolfound">✓ ${esc(foundSchool.name)} <a href="#" onclick="clearSchool();return false">${t('edit')}</a></div>`
    + roleSel + formInput(t('fullName'), 'aName', '', 'text', 'autocomplete="name"') + acct + (signupRole === 'teacher' ? `<p class="hint">${L('The school admin will approve your teacher account.', 'ستوافق إدارة المدرسة على حساب المعلم.', 'La direction approuvera votre compte enseignant.')}</p>` : classPicker())
    + `<button style="width:100%" onclick="${withAccount ? 'doSignUp()' : 'completeProfile()'}">${withAccount ? t('signUp') : t('save')}</button>`;
}
function authScreen() {
  if (authState === 'config') return `<div class="notice">${t('notConfigured')}</div>`;
  if (authState === 'loading') return `<p class="muted">${t('loading')}</p>`;
  const msg = flash ? `<div class="notice">${esc(flash)}</div>` : '';
  if (authState === 'signedOut') {
    if (authMode === 'signup') return `<h2>${t('signUp')}</h2>${msg}${schoolChoice(true)}<p><a href="#" onclick="setAuthMode('signin');return false">${t('haveAccount')}</a></p>`;
    return `<h2>${t('signIn')}</h2>${msg}
      ${formInput(t('email'), 'aEmail', '', 'email', 'autocomplete="email"')}
      ${formInput(t('password'), 'aPass', '', 'password', 'autocomplete="current-password" onkeydown="if(event.key===\'Enter\')doSignIn()"')}
      <button style="width:100%" onclick="doSignIn()">${t('signIn')}</button>
      <p class="row space"><a href="#" onclick="doReset();return false">${t('forgot')}</a><a href="#" onclick="setAuthMode('signup');return false">${t('needAccount')}</a></p>`;
  }
  if (authState === 'unverified') return `<h2>${t('verifyTitle')}</h2>${msg}<p>${t('verifyText')} <b>${esc(authUser.email)}</b>.</p>
      <div class="row"><button onclick="checkVerified()">${t('iVerified')}</button><button class="secondary" onclick="resendVerify()">${t('resend')}</button></div>
      <p><a href="#" onclick="doSignOut();return false">${t('signOut')}</a></p>`;
  if (authState === 'noProfile') return `<h2>${t('signUp')}</h2>${msg}${schoolChoice(false)}<p><a href="#" onclick="doSignOut();return false">${t('signOut')}</a></p>`;
  if (authState === 'pending') return `<h2>${t('pendingTitle')}</h2><p>${t('pendingText')}</p><p class="hint">${esc(school ? school.name : '')} · ${esc(me && me.grade)} · ${esc(me && me.class)}</p><button class="secondary" onclick="doSignOut()">${t('signOut')}</button>`;
  return '';
}
function setKind(k) { if (k !== 'new') { preName = ''; } signupKind = k; flash = ''; extResults = []; render(); }
function setCodeBox(v) { showCodeBox = v; if (!v) joinCode = ''; flash = ''; render(); }
async function setJoinCountry(c) {
  joinCountry = c; dirPick = ''; dirSchools = null; preCity = ''; cityLL = null; render(); if (!c) return; countryBox(c);
  try { const s = await F.getDocs(F.query(F.collection(fb.fs, 'directory'), F.where('country', '==', c))); dirSchools = s.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => String(a.name).localeCompare(String(b.name))); }
  catch (e) { dirSchools = []; }
  render();
}
function pickDir(id) { const s = (dirSchools || []).find(x => x.id === id); if (!s) return; dirPick = id; foundSchool = { schoolId: s.id, name: s.name, grades: s.grades, classes: s.classes }; flash = ''; render(); }
/* ---------- live school search (OpenStreetMap via Photon + Wikidata) ---------- */
let bboxCache = {}, searchTimer = null, searchSeq = 0, extResults = [], preName = '', preCity = '', cityLL = null, cityTimer = null, citySeq = 0, cityRes = [];
const MAIN_CITIES = { EG: ['Cairo', 'Giza', 'Alexandria', 'New Cairo', 'Maadi', 'Nasr City', 'Heliopolis', 'Zamalek', 'Mohandessin', 'Dokki', '6th of October', 'Sheikh Zayed', 'El Rehab', 'Madinaty', 'El Shorouk', 'Obour', 'Mansoura', 'Tanta', 'Zagazig', 'Ismailia', 'Port Said', 'Suez', 'Assiut', 'Minya', 'Sohag', 'Luxor', 'Aswan', 'Hurghada', 'Damietta', 'Fayoum', 'Beni Suef'],
  SA: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Dhahran', 'Taif', 'Tabuk', 'Abha'], AE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain', 'Ras Al Khaimah', 'Fujairah'],
  KW: ['Kuwait City', 'Hawalli', 'Salmiya', 'Farwaniya', 'Jahra', 'Ahmadi'], QA: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Lusail'], BH: ['Manama', 'Muharraq', 'Riffa', 'Isa Town'], OM: ['Muscat', 'Salalah', 'Sohar', 'Nizwa'],
  JO: ['Amman', 'Zarqa', 'Irbid', 'Aqaba'], GB: ['London', 'Birmingham', 'Manchester', 'Leeds', 'Glasgow', 'Bradford', 'Leicester', 'Luton'], US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Dallas', 'Detroit', 'Dearborn', 'Atlanta', 'Washington'],
  CA: ['Toronto', 'Mississauga', 'Montreal', 'Ottawa', 'Calgary', 'Edmonton', 'Vancouver'], MY: ['Kuala Lumpur', 'Selangor', 'Penang', 'Johor Bahru'], TR: ['Istanbul', 'Ankara', 'Izmir', 'Bursa'] };
function citySearchInput(v) {
  const box = document.getElementById('cityResults'); if (!box) return;
  if (!joinCountry) { box.innerHTML = `<p class="hint">${L('Choose your country first.', 'اختاري الدولة أولاً.', "Choisissez d'abord le pays.")}</p>`; return; }
  cityLL = null;
  const q = v.trim().toLowerCase();
  const main = (MAIN_CITIES[joinCountry] || []).filter(c => !q || c.toLowerCase().includes(q)).slice(0, 14);
  const draw = list => { cityRes = list; box.innerHTML = list.length ? `<div class="chips">${list.map((c, i) => `<button type="button" class="chip" onclick="pickCity(${i})">${esc(c.n)}</button>`).join('')}</div>` : (q.length >= 2 ? `<p class="hint">${L('Keep typing — or just leave the city as typed.', 'أكملي الكتابة — أو اتركي المدينة كما كتبتِها.', 'Continuez ou laissez tel quel.')}</p>` : ''); };
  draw(main.map(n => ({ n })));
  clearTimeout(cityTimer); if (q.length < 2) return;
  const seq = ++citySeq, c = joinCountry;
  cityTimer = setTimeout(async () => {
    try {
      const box2 = await countryBox(c);
      const j = await (await fetch('https://photon.komoot.io/api/?q=' + encodeURIComponent(v.trim()) + '&limit=40' + (box2 ? '&bbox=' + box2 : '') + '&osm_tag=place:city&osm_tag=place:town&osm_tag=place:suburb&osm_tag=place:village&osm_tag=place:quarter&osm_tag=place:neighbourhood')).json();
      if (seq !== citySeq) return;
      const seen = new Set(main.map(x => x.toLowerCase())), out = main.map(n => ({ n }));
      (j.features || []).filter(f => f.properties.countrycode === c && f.properties.name).forEach(f => { const n = f.properties.name, k = n.toLowerCase(); if (seen.has(k)) return; seen.add(k); out.push({ n, ll: f.geometry && f.geometry.coordinates }); });
      draw(out.slice(0, 14));
    } catch (e) {}
  }, 350);
}
function pickCity(i) { const x = cityRes[i]; if (!x) return; const el = document.getElementById('aCity'); if (el) el.value = x.n; preCity = x.n; cityLL = x.ll || null; const box = document.getElementById('cityResults'); if (box) box.innerHTML = ''; const s = document.getElementById('aSchool') || document.getElementById('schoolSearch'); if (s) { s.focus(); if (s.value.trim().length >= 3) schoolSearchInput(s.value); } }
function registerFromJoin(i) { const x = i >= 0 ? extResults[i] : null; preName = x ? x.n : (val('schoolSearch') || ''); preCity = (x && x.c) || val('aCity') || preCity; signupKind = 'new'; flash = ''; extResults = []; render(); }
function setRegCountry(c) { joinCountry = c; extResults = []; preCity = ''; cityLL = null; const ci = document.getElementById('aCity'); if (ci) ci.value = ''; const cr = document.getElementById('cityResults'); if (cr) cr.innerHTML = ''; const box = document.getElementById('schoolResults'); if (box) box.innerHTML = ''; if (c) countryBox(c); const v = val('aSchool'); if (c && v.trim().length >= 3) schoolSearchInput(v); }
async function countryBox(c) {
  if (bboxCache[c] !== undefined) return bboxCache[c];
  try { const s = localStorage.getItem('roots-bbox-' + c); if (s) return (bboxCache[c] = s); } catch (e) {}
  try {
    const j = await (await fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&featureType=country&countrycodes=' + c.toLowerCase() + '&q=' + encodeURIComponent(countryName(c)))).json();
    const b = j && j[0] ? j[0].boundingbox.map(Number) : null;
    bboxCache[c] = b ? [b[2], b[0], b[3], b[1]].join(',') : '';
    try { localStorage.setItem('roots-bbox-' + c, bboxCache[c]); } catch (e) {}
  } catch (e) { bboxCache[c] = ''; }
  return bboxCache[c];
}
async function searchOutside(q, c) {
  const box = await countryBox(c), out = [], seen = new Set();
  const enName = (() => { try { return new Intl.DisplayNames(['en'], { type: 'region' }).of(c) || ''; } catch (e) { return ''; } })().toLowerCase();
  const add = (n, city, src) => { n = String(n || '').trim(); const k = n.toLowerCase(); if (!n || seen.has(k)) return; seen.add(k); out.push({ n: n.slice(0, 120), c: String(city || '').slice(0, 80), src }); };
  const [ph, wd] = await Promise.allSettled([
    fetch('https://photon.komoot.io/api/?q=' + encodeURIComponent(q) + '&limit=20' + (box ? '&bbox=' + box : '') + (cityLL ? '&lat=' + cityLL[1] + '&lon=' + cityLL[0] : '') + '&osm_tag=amenity:school&osm_tag=amenity:kindergarten&osm_tag=amenity:college').then(r => r.json()),
    fetch('https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&origin=*&type=item&limit=15&language=' + (lang === 'ar' ? 'ar' : lang === 'fr' ? 'fr' : 'en') + '&uselang=en&search=' + encodeURIComponent(q)).then(r => r.json())
  ]);
  if (ph.status === 'fulfilled' && ph.value && ph.value.features) ph.value.features.filter(f => f.properties.countrycode === c && f.properties.name).forEach(f => add(f.properties.name, f.properties.city || f.properties.county || f.properties.state, 'OpenStreetMap'));
  if (wd.status === 'fulfilled' && wd.value && wd.value.search) wd.value.search.filter(x => { const d = String(x.description || '').toLowerCase(); return /school|academy|college|lycée|lycee|école|madrasa|مدرسة/.test(d) && enName && d.includes(enName); }).forEach(x => { const m = String(x.description || '').match(/ in ([^,]+),/); add(x.label, m ? m[1].trim() : '', 'Wikidata'); });
  const cty = (val('aCity') || '').trim().toLowerCase();
  if (cty) out.sort((a, b) => (String(b.c).toLowerCase().includes(cty) ? 1 : 0) - (String(a.c).toLowerCase().includes(cty) ? 1 : 0));
  return out.slice(0, 12);
}
function renderSchoolResults(q, ext) {
  const ql = q.trim().toLowerCase();
  const joining = signupKind === 'join';
  const mine = joining ? (dirSchools || []).filter(s => !ql || String(s.name).toLowerCase().includes(ql) || String(s.city || '').toLowerCase().includes(ql)).slice(0, 20) : [];
  let html = mine.map(s => `<button type="button" class="sitem" onclick="pickDir('${esc(s.id)}')"><b>✓ ${esc(s.name)}</b>${s.city ? ` <span class="muted">— ${esc(s.city)}</span>` : ''}<span class="stag">${L('Roots-accredited', 'معتمدة من جذور', 'Accréditée Roots')}</span></button>`).join('');
  const rootsNames = new Set((dirSchools || []).map(s => String(s.name).toLowerCase()));
  const others = ext.filter(x => !rootsNames.has(x.n.toLowerCase()));
  if (joining) {
    html += others.map(x => `<button type="button" class="sitem" onclick="registerFromJoin(${ext.indexOf(x)})">${esc(x.n)}${x.c ? ` <span class="muted">— ${esc(x.c)}</span>` : ''}<span class="stag grey">${L('not on Roots yet — tap to register it', 'غير مسجلة — اضغطي لتسجيلها', 'pas sur Roots — touchez pour l’inscrire')}</span></button>`).join('');
    if (!mine.length && !others.length) html += `<p class="hint">${ql.length < 3 && !(dirSchools || []).length ? L('No Roots-accredited schools in this country yet. Type your school name to search.', 'لا توجد مدارس معتمدة من جذور في هذه الدولة بعد. اكتبي اسم مدرستك للبحث.', 'Aucune école accréditée ici. Tapez le nom pour chercher.') : ql.length < 3 ? '' : L('No match yet — keep typing, or use a school code.', 'لا نتائج بعد — أكملي الكتابة أو استخدمي كود المدرسة.', 'Aucun résultat — continuez ou utilisez un code.')}</p>`;
    if (others.length) html += `<p class="hint">${L('A school “not on Roots yet” is registered by its admin. If that’s you, tap it. Parents and students: ask the school for its Roots code.', 'المدرسة غير المسجلة تسجّلها إدارتها — إن كنتِ المسؤولة اضغطي عليها. أولياء الأمور والطلاب: اطلبوا كود جذور من المدرسة.', 'Une école « pas sur Roots » est inscrite par sa direction.')}</p>`;
  } else {
    html += others.map((x, i) => `<button type="button" class="sitem" onclick="pickExternal(${ext.indexOf(x)})"><b>${esc(x.n)}</b>${x.c ? ` <span class="muted">— ${esc(x.c)}</span>` : ''}</button>`).join('');
    if (ql.length >= 3 && !others.length) html += `<p class="hint">${L('Not found in the map data — that’s fine, just type your school’s full name.', 'غير موجودة في بيانات الخرائط — لا بأس، اكتبي الاسم كاملاً.', 'Introuvable — tapez simplement le nom complet.')}</p>`;
  }
  if (ext.length) html += `<p class="attrib">${L('Search data', 'بيانات البحث', 'Données')}: © OpenStreetMap contributors · Wikidata</p>`;
  return html;
}
function schoolSearchInput(v) {
  const box = document.getElementById('schoolResults'); if (!box) return;
  if (!joinCountry) { box.innerHTML = `<p class="hint">${L('Choose your country first.', 'اختاري الدولة أولاً.', "Choisissez d'abord le pays.")}</p>`; return; }
  extResults = [];
  box.innerHTML = renderSchoolResults(v, []);
  clearTimeout(searchTimer);
  if (v.trim().length < 3) return;
  const seq = ++searchSeq, c = joinCountry;
  searchTimer = setTimeout(async () => {
    box.insertAdjacentHTML('beforeend', `<p class="hint" id="searching">${L('Searching…', 'جارٍ البحث…', 'Recherche…')}</p>`);
    let ext = [];
    try { ext = await searchOutside(v.trim(), c); } catch (e) {}
    if (seq !== searchSeq) return;
    extResults = ext;
    const b2 = document.getElementById('schoolResults'); if (b2) b2.innerHTML = renderSchoolResults(v, ext);
  }, 400);
}
function pickExternal(i) {
  const x = extResults[i]; if (!x) return;
  const n = document.getElementById('aSchool'), c = document.getElementById('aCity');
  if (n) n.value = x.n; if (c && x.c) c.value = x.c;
  const box = document.getElementById('schoolResults'); if (box) box.innerHTML = `<p class="hint">✓ ${esc(x.n)}</p>`;
}
function clearSchool() { foundSchool = null; dirPick = ''; render(); }
async function findSchool() {
  const code = val('aCode').toUpperCase().replace(/[^A-Z0-9]/g, '');
  joinCode = code;
  if (code.length < 4) { flash = t('codeNotFound'); return render(); }
  try {
    const s = await F.getDoc(F.doc(fb.fs, 'schoolCodes', code));
    if (!s.exists()) { flash = t('codeNotFound'); foundSchool = null; }
    else { foundSchool = { code, ...s.data() }; flash = ''; }
  } catch (e) { flash = t('codeNotFound'); }
  render();
}

function authError(e) {
  const c = (e && e.code) || '';
  if (c.includes('invalid-credential') || c.includes('wrong-password') || c.includes('user-not-found')) return L('Email or password is incorrect.', 'البريد أو كلمة المرور غير صحيحة.', 'E-mail ou mot de passe incorrect.');
  if (c.includes('email-already-in-use')) return L('An account with this email already exists. Sign in instead.', 'يوجد حساب بهذا البريد. سجّلي الدخول.', 'Un compte existe déjà avec cet e-mail.');
  if (c.includes('weak-password')) return L('Password must be at least 6 characters.', 'كلمة المرور 6 أحرف على الأقل.', 'Le mot de passe doit contenir au moins 6 caractères.');
  if (c.includes('invalid-email') || c.includes('missing-email')) return L('Please enter a valid email.', 'يرجى إدخال بريد صحيح.', 'Veuillez saisir un e-mail valide.');
  if (c.includes('too-many-requests')) return L('Too many attempts. Wait a few minutes and try again.', 'محاولات كثيرة. انتظري قليلاً ثم حاولي.', 'Trop de tentatives. Réessayez dans quelques minutes.');
  if (c.includes('network')) return L('No connection. Check your internet.', 'لا يوجد اتصال بالإنترنت.', 'Pas de connexion internet.');
  return (e && e.message) || String(e);
}

async function doSignIn() {
  try { await F.signInWithEmailAndPassword(fb.auth, val('aEmail').trim(), val('aPass')); flash = ''; }
  catch (e) { flash = authError(e); render(); }
}
function readProfileForm() {
  const name = val('aName').trim();
  if (!name) { flash = t('nameReq'); render(); return null; }
  if (signupKind === 'new') { const sn = val('aSchool').trim(); if (!sn) { flash = t('nameReq'); render(); return null; } return { name, kind: 'new', schoolName: sn, country: val('aCountry'), city: val('aCity').trim().slice(0, 80) }; }
  if (!foundSchool) { flash = t('codeNotFound'); render(); return null; }
  const role = ['parent', 'student', 'teacher'].includes(signupRole) ? signupRole : 'parent';
  return { name, kind: 'join', role, schoolId: foundSchool.schoolId, grade: role === 'teacher' ? '' : val('aGrade'), cls: role === 'teacher' ? '' : val('aClass') };
}
async function doSignUp() {
  const p = readProfileForm(); if (!p) return;
  const email = val('aEmail').trim(), pass = val('aPass');
  let cred;
  try { cred = await F.createUserWithEmailAndPassword(fb.auth, email, pass); }
  catch (e) { flash = authError(e); return render(); }
  authUser = cred.user;
  try { await createProfile(p); } catch (e) { console.warn(e); }
  try { await F.sendEmailVerification(cred.user); } catch (e) {}
  flash = '';
}
async function completeProfile() {
  const p = readProfileForm(); if (!p) return;
  try { await createProfile(p); } catch (e) { console.warn(e); flash = t('writeErr'); render(); }
}
function newCode() { let s = ''; const a = new Uint32Array(6); crypto.getRandomValues(a); a.forEach(n => { s += CODE_CHARS[n % CODE_CHARS.length]; }); return s; }
async function createProfile(p) {
  const ref = F.doc(fb.fs, 'users', authUser.uid), email = String(authUser.email || '');
  if (p.kind === 'join') {
    await F.setDoc(ref, { name: p.name.slice(0, 100), email, schoolId: p.schoolId, role: p.role, grade: p.grade, class: p.cls, approved: false, createdAt: F.serverTimestamp() });
    if (p.role === 'student') await ensureStudentCode(p.schoolId, p.name, p.grade, p.cls);
    return;
  }
  let code = newCode();
  for (let i = 0; i < 5; i++) { const ex = await F.getDoc(F.doc(fb.fs, 'schoolCodes', code)); if (!ex.exists()) break; code = newCode(); }
  const sref = F.doc(F.collection(fb.fs, 'schools'));
  const sname = p.schoolName.slice(0, 120);
  await F.setDoc(sref, { name: sname, code, grades: DEFAULT_GRADES, classes: DEFAULT_CLASSES, country: p.country || '', city: p.city || '', createdBy: authUser.uid, createdAt: F.serverTimestamp() });
  await F.setDoc(F.doc(fb.fs, 'schoolCodes', code), { schoolId: sref.id, name: sname, grades: DEFAULT_GRADES, classes: DEFAULT_CLASSES });
  await F.setDoc(ref, { name: p.name.slice(0, 100), email, schoolId: sref.id, role: 'admin', grade: '', class: '', approved: true, createdAt: F.serverTimestamp() });
}
async function doReset() {
  const email = val('aEmail').trim();
  if (!email) { flash = L('Type your email above first.', 'اكتبي بريدك أولاً.', "Saisissez d'abord votre e-mail."); return render(); }
  try { await F.sendPasswordResetEmail(fb.auth, email); flash = t('resetSent'); } catch (e) { flash = authError(e); }
  render();
}
async function resendVerify() { try { await F.sendEmailVerification(authUser); flash = t('verifySent'); } catch (e) { flash = authError(e); } render(); }
async function checkVerified() {
  try { await authUser.reload(); if (authUser.emailVerified) { await authUser.getIdToken(true); flash = ''; startProfile(); return; } } catch (e) {}
  flash = t('notVerifiedYet'); render();
}
async function doSignOut() { stopAll(); signupRole = 'parent'; openCourse = null; joinCountry = ''; dirSchools = null; dirPick = ''; showCodeBox = false; grade = 'All'; cls = 'All'; page = ''; authMode = 'signin'; signupKind = 'join'; flash = ''; foundSchool = null; try { await F.signOut(fb.auth); } catch (e) {} }

/* ---------- live data ---------- */
function stopData() { unsubs.forEach(u => { try { u(); } catch (e) {} }); unsubs = []; subKey = ''; S.users = []; S.reps = []; S.issueSets = {}; S.meetings = []; S.checks = {}; S.courses = []; S.assignments = []; S.subs = []; S.attendance = []; S.news = []; S.students = []; S.kids = {}; S.kidSubs = {}; S.kidAtt = {}; S.kidAssign = {}; S.kidCourses = {}; stopView(); loadError = false; }
function stopAll() {
  stopData();
  [profileUnsub, schoolUnsub].forEach(u => { if (u) { try { u(); } catch (e) {} } });
  profileUnsub = schoolUnsub = null; me = null; school = null; isOwner = false; allSchools = [];
}
const onErr = e => { console.warn('Roots load error', e); loadError = true; softRender(); };
const list = snap => snap.docs.map(d => ({ id: d.id, ...d.data() }));

function startProfile() {
  if (profileUnsub) { try { profileUnsub(); } catch (e) {} }
  authState = 'loading'; render();
  profileUnsub = F.onSnapshot(F.doc(fb.fs, 'users', authUser.uid), snap => {
    if (!snap.exists()) { me = null; stopData(); authState = 'noProfile'; return render(); }
    const prevSid = me && me.schoolId;
    me = { id: snap.id, ...snap.data() };
    if (me.schoolId !== prevSid) watchSchool();
    if (!me.approved) { stopData(); authState = 'pending'; return render(); }
    const wasReady = authState === 'ready';
    authState = 'ready';
    startData();
    wasReady ? softRender() : render();
  }, onErr);
  // Roots owner: the security rules only let the owner list every school.
  try {
    const u = F.onSnapshot(F.collection(fb.fs, 'schools'), s => {
      isOwner = true; allSchools = list(s);
      if (!unsubsOwner.dir) { unsubsOwner.dir = true; unsubsOwner.push(F.onSnapshot(F.collection(fb.fs, 'directory'), d => { allDirectory = {}; d.docs.forEach(x => { allDirectory[x.id] = x.data(); }); softRender(); }, () => {})); }
      softRender();
    }, () => { isOwner = false; });
    unsubsOwner.push(u);
  } catch (e) {}
}
const unsubsOwner = [];
function watchSchool() {
  if (schoolUnsub) { try { schoolUnsub(); } catch (e) {} schoolUnsub = null; }
  if (!sid()) return;
  schoolUnsub = F.onSnapshot(F.doc(fb.fs, 'schools', sid()), s => { school = s.exists() ? { id: s.id, ...s.data() } : null; softRender(); }, onErr);
}

function startData() {
  const key = [me.schoolId, me.role, me.grade, me.class, (me.children || []).join(',')].join('|');
  if (key === subKey) return;
  stopData(); subKey = key;
  const inSchool = F.where('schoolId', '==', sid());
  const mine = [F.where('grade', '==', me.grade), F.where('class', '==', me.class)];
  const sub = (q, fn) => unsubs.push(F.onSnapshot(q, s => { fn(s); softRender(); }, onErr));
  const issueSet = (name, q) => sub(q, s => { S.issueSets[name] = list(s); });
  const users = F.collection(fb.fs, 'users');
  sub(F.query(users, inSchool, F.where('role', '==', 'rep')), s => { S.reps = list(s); });
  sub(scol('news'), s => { S.news = list(s); });
  if (canTeach()) {
    sub(scol('courses'), s => { S.courses = list(s); });
    sub(scol('assignments'), s => { S.assignments = list(s); });
    sub(scol('submissions'), s => { S.subs = list(s); });
    if (isTeacher()) sub(F.query(users, inSchool, F.where('role', '==', 'student')), s => { S.students = list(s); S.users = S.students; });
  }
  if (isStudent()) {
    const pub = [...mine, F.where('published', '==', true)];
    sub(F.query(scol('courses'), ...pub), s => { S.courses = list(s); });
    sub(F.query(scol('assignments'), ...pub), s => { S.assignments = list(s); });
    sub(F.query(scol('submissions'), F.where('studentId', '==', uid())), s => { S.subs = list(s); });
    sub(F.query(scol('attendance'), F.where('studentId', '==', uid())), s => { S.attendance = list(s); });
  }
  if (isParent()) (me.children || []).slice(0, 6).forEach(cid => {
    sub(F.doc(fb.fs, 'users', cid), d => {
      if (!d.exists()) return;
      const k = { id: d.id, ...d.data() }, prev = S.kids[cid];
      S.kids[cid] = k;
      if (!prev || prev.grade !== k.grade || prev.class !== k.class) {
        const pub = [F.where('grade', '==', k.grade), F.where('class', '==', k.class), F.where('published', '==', true)];
        sub(F.query(scol('courses'), ...pub), s => { S.kidCourses[cid] = list(s); });
        sub(F.query(scol('assignments'), ...pub), s => { S.kidAssign[cid] = list(s); });
      }
    });
    sub(F.query(scol('submissions'), F.where('studentId', '==', cid)), s => { S.kidSubs[cid] = list(s); });
    sub(F.query(scol('attendance'), F.where('studentId', '==', cid)), s => { S.kidAtt[cid] = list(s); });
  });
  if (isAdmin()) {
    sub(F.query(users, inSchool), s => { S.users = list(s); S.students = S.users.filter(u => u.role === 'student'); });
    issueSet('school', F.query(scol('issues'), F.where('visibility', '==', 'schoolOnly')));
    issueSet('summary', F.query(scol('issues'), F.where('visibility', '==', 'classSummary')));
    sub(scol('meetings'), s => { S.meetings = list(s); });
    sub(scol('checks'), s => { S.checks = {}; s.docs.forEach(d => { S.checks[d.id] = d.data(); }); });
  } else if (isRep()) {
    sub(F.query(users, inSchool, ...mine), s => { S.users = list(s); });
    issueSet('class', F.query(scol('issues'), ...mine));
    sub(F.query(scol('meetings'), ...mine), s => { S.meetings = list(s); });
    sub(F.query(scol('checks'), ...mine), s => { S.checks = {}; s.docs.forEach(d => { S.checks[d.id] = d.data(); }); });
  } else {
    issueSet('own', F.query(scol('issues'), F.where('createdBy', '==', uid())));
    issueSet('summary', F.query(scol('issues'), ...mine, F.where('visibility', '==', 'classSummary')));
    sub(F.query(scol('meetings'), ...mine), s => { S.meetings = list(s); });
  }
}

/* ---------- navigation ---------- */
function go(p) { if (page !== p) { stopView(); attKey = ''; } page = p; openLesson = null; openAssign = null; editing = null; checkDirty = false; render(); window.scrollTo(0, 0); }
function setGrade(v) { grade = v; editing = null; checkDirty = false; render(); }
function setClass(v) { cls = v; editing = null; checkDirty = false; render(); }
function cycleLang() { lang = lang === 'en' ? 'fr' : lang === 'fr' ? 'ar' : 'en'; try { localStorage.setItem('roots-lang', lang); } catch (e) {} render(); }
function refreshNow() { render(); }
function cancelEdit() { editing = null; render(); }
async function guard(fn) { try { await fn(); return true; } catch (e) { console.warn(e); notify(t('writeErr')); return false; } }

/* ---------- dashboard ---------- */
function dashboard() {
  const issues = viewIssues(), open = activeCount(issues), resolved = issues.filter(i => i.status === 'closed').length;
  const overdue = issues.filter(i => i.due && new Date(i.due) < new Date(today()) && !['closed', 'rejected', 'duplicate'].includes(i.status)).length;
  const pendingMembers = (isStaff() || isTeacher()) ? S.users.filter(u => !u.approved).length : 0;
  return viewTitle(t('overview'), esc(school ? school.name : '') + (isAdmin() ? '' : ` · ${t('yourClass')}: ${esc(me.grade)} · ${esc(me.class)}`))
    + (pendingMembers ? `<div class="notice" style="cursor:pointer" onclick="go('members')">${t('newMembers')}: <b>${pendingMembers}</b> →</div>` : '')
    + (isAdmin() && S.users.length <= 1 && school ? `<div class="notice">${t('inviteTitle')}: <b class="code">${esc(school.code)}</b> — <a href="#" onclick="go('schoolSettings');return false">${t('schoolSettings')} →</a></div>` : '')
    + `<div class="cards">${[[issues.length, t('total')], [open, t('open')], [resolved, t('resolved')], [overdue, t('Overdue')]].map(([n, l]) => `<div class="card"><div class="metric">${n}</div><div class="muted">${l}</div></div>`).join('')}</div>
  <div class="two"><div class="panel"><h2>${L('Concerns by category', 'الملاحظات حسب التصنيف', 'Points par catégorie')}</h2>${categories.map(c => { const count = issues.filter(i => i.category === c[0]).length; return `<div class="bar"><span class="barlabel">${catLabel(c[0])}</span><div class="barline"><span style="width:${issues.length ? count / issues.length * 100 : 0}%"></span></div><strong>${count}</strong></div>`; }).join('')}</div>
  <div class="panel"><h2>${L('Latest actions', 'آخر الملاحظات', 'Derniers points suivis')}</h2>${issues.slice(0, 5).map(i => `<div class="item"><div class="row space"><strong>${esc(i.title)}</strong>${tag(i.status)}</div><p class="hint">${esc(i.grade)} · ${esc(i.class)} · ${catLabel(i.category)}</p></div>`).join('') || `<div class="empty">${L('No concerns yet', 'لا توجد ملاحظات بعد', 'Aucun point pour le moment')}</div>`}</div></div>
  <div class="notice">${L('Important: any urgent safeguarding, abuse, or immediate safety concern must use the school’s official safeguarding or emergency channels — not this app.', 'مهم: يجب الإبلاغ عن مخاوف حماية الطفل أو أي خطر عاجل عبر القنوات الرسمية للمدرسة، وليس عبر هذا التطبيق.', 'Important : tout danger immédiat ou problème de protection de l’enfance doit être signalé par les canaux officiels de l’école.')}</div>`;
}

/* ---------- checklist ---------- */
function checklist() {
  if (grade === 'All' || cls === 'All') return viewTitle(t('checklist'), t('choose')) + `<div class="panel">${t('choose')}<p class="hint">${L('Use the grade and class selectors at the top.', 'استخدمي خيارات الصف والفصل بالأعلى.', 'Sélectionnez le niveau et la classe en haut.')}</p></div>`;
  const c = categories[tab], items = c[2], values = (S.checks[checkKey(grade, cls)] || {}).values || {};
  const total = categories.reduce((s, c) => s + c[2].length, 0), done = Object.values(values).filter(v => v && v !== 'notReviewed').length;
  return viewTitle(t('checklist'), `${esc(grade)} · ${esc(cls)} · ${done}/${total} ${L('reviewed', 'تمت مراجعتها', 'points examinés')}`)
    + `<div class="panel"><div class="progress"><div style="width:${Math.round(done / total * 100)}%"></div></div><p class="hint">${Math.round(done / total * 100)}% ${L('completed', 'مكتمل', 'terminé')}</p>
  <div class="tabs">${categories.map((x, i) => `<button class="${i === tab ? 'active' : ''}" onclick="setTab(${i})">${catLabel(x[0])}</button>`).join('')}</div><h2>${catLabel(c[0])}</h2>
  ${items.map((x, i) => { const id = c[0] + '.' + i; return `<div class="checkrow"><div><strong>${lang === 'fr' ? itemFrench[tab][i] : lang === 'ar' ? x[1] : x[0]}</strong><div class="hint">${L('Check for this class', 'راجعي هذا البند للفصل', 'Évaluez ce point pour la classe')}</div></div>${drawSelect('ck_' + i, ['notReviewed', 'fine', 'attention', 'ask', 'idea'], values[id] || 'notReviewed', t, 'onchange="markDirty()"')}</div>`; }).join('')}
  <div class="row space" style="margin-top:20px"><button class="secondary" onclick="setTab(${Math.max(0, tab - 1)})">${L('Previous', 'السابق', 'Précédent')}</button><button onclick="saveChecks()">${t('save')}</button><button class="secondary" onclick="setTab(${Math.min(categories.length - 1, tab + 1)})">${L('Next category', 'التصنيف التالي', 'Catégorie suivante')}</button></div>
  ${checkDirty ? `<p class="hint">${L('Unsaved changes on this tab.', 'توجد تغييرات غير محفوظة.', 'Modifications non enregistrées.')}</p>` : ''}</div>`;
}
function setTab(i) {
  if (checkDirty) return ask(L('Discard unsaved changes on this tab?', 'تجاهل التغييرات غير المحفوظة؟', 'Abandonner les modifications ?'), () => { checkDirty = false; tab = i; render(); });
  tab = i; render();
}
async function saveChecks() {
  const key = checkKey(grade, cls), cur = { ...((S.checks[key] || {}).values || {}) };
  categories[tab][2].forEach((x, i) => { cur[categories[tab][0] + '.' + i] = val('ck_' + i); });
  const ok = await guard(() => F.setDoc(sdoc('checks', key), { grade, class: cls, values: cur, updatedBy: uid(), updatedAt: F.serverTimestamp() }));
  if (ok) { checkDirty = false; render(); }
}

/* ---------- concerns ---------- */
function issueForm(i) {
  i = i || {};
  const parent = !isStaff();
  const gSel = isAdmin() ? formSelect(t('grade'), 'iGrade', GR(), i.grade || (grade === 'All' ? GR()[0] : grade)) : '';
  const cSel = isAdmin() ? formSelect(t('class'), 'iClass', CL(), i.class || (cls === 'All' ? CL()[0] : cls)) : '';
  const vis = parent ? ['private', 'schoolOnly'] : visVals;
  return `<div class="panel" style="margin:0 0 20px"><h2>${editing !== 'new' ? L('Edit concern', 'تعديل الملاحظة', 'Modifier le point') : t('addConcern')}</h2>
  <div class="formgrid">${formInput(t('title'), 'iTitle', i.title, 'text', 'maxlength="200"')}${formSelect(t('category'), 'iCat', categories.map(x => x[0]), i.category || 'Academics', catLabel)}${gSel}${cSel}
  ${formSelect(t('priority'), 'iPriority', priorities, i.priority || 'Medium', t)}${formSelect(t('visibility'), 'iVis', vis, i.visibility || 'private', t)}
  ${parent ? '' : formSelect(t('status'), 'iStatus', statusVals, i.status || 'reported', t)}${parent ? '' : formInput(t('owner'), 'iOwner', i.owner || '', 'text', 'maxlength="200"')}${parent ? '' : formInput(t('due'), 'iDue', i.due || '', 'date')}</div>
  ${formArea(t('description'), 'iDescription', i.description)}${parent ? `<p class="hint">${t('visParentHint')}</p>` : formArea(t('schoolResponse'), 'iResponse', i.schoolResponse)}
  <div class="row"><button onclick="saveIssue()">${t('save')}</button><button class="secondary" onclick="cancelEdit()">${t('cancel')}</button>${isAdmin() && editing !== 'new' ? `<button class="warn" onclick="deleteIssue()">${t('del')}</button>` : ''}</div>
  <p class="hint">${L('Do not include student names or medical details.', 'لا تُضيفي أسماء الطلاب أو بياناتهم الطبية.', 'Ne saisissez ni noms d’élèves ni données médicales.')}</p></div>`;
}
function concerns() {
  const arr = viewIssues().filter(i => (i.title + ' ' + i.description + ' ' + i.category).toLowerCase().includes(search.toLowerCase()));
  const current = typeof editing === 'string' && editing !== 'new' ? allIssues().find(i => i.id === editing) : null;
  return viewTitle(t('concerns'), isAdmin() ? esc(school ? school.name : '') : `${t('yourClass')}: ${esc(me.grade)} · ${esc(me.class)}`, `<button onclick="startEdit('new')">+ ${t('addConcern')}</button>`)
    + (editing ? issueForm(current) : '')
    + `<div class="panel"><div class="field"><input aria-label="Search" placeholder="${t('filter')}" value="${esc(search)}" oninput="setSearch(this.value)"></div><div id="issuesTable">${issueTable(arr)}</div></div>`;
}
function issueTable(arr) {
  if (!arr.length) return `<div class="empty">${L('No matching concerns', 'لا توجد ملاحظات', 'Aucun point correspondant')}</div>`;
  return `<div class="scroll"><table><thead><tr><th>${t('title')}</th><th>${t('grade')} / ${t('class')}</th><th>${t('category')}</th><th>${t('priority')}</th><th>${t('status')}</th><th>${t('due')}</th><th class="no-print"></th></tr></thead><tbody>${arr.map(i => `<tr><td><strong>${esc(i.title)}</strong><div class="hint">${esc(String(i.description || '').slice(0, 140))}</div>${i.schoolResponse ? `<div class="hint"><b>${t('feedback')}:</b> ${esc(i.schoolResponse)}</div>` : ''}${!isStaff() && i.createdBy === uid() ? `<div class="hint">${tag(i.visibility)}</div>` : ''}</td><td>${esc(i.grade)} / ${esc(i.class)}</td><td>${catLabel(i.category)}</td><td>${tag(i.priority)}</td><td>${tag(i.status)}</td><td>${esc(i.due)}</td><td class="no-print">${isStaff() ? `<button class="tablebtn secondary" onclick="startEdit('${esc(i.id)}')">${t('edit')}</button>` : ''}</td></tr>`).join('')}</tbody></table></div>`;
}
function startEdit(id) { editing = id; render(); const f = document.getElementById('iTitle') || document.getElementById('mTitle'); if (f) f.scrollIntoView({ block: 'center' }); }
function setSearch(v) { search = v; const el = document.getElementById('issuesTable'); if (el) el.innerHTML = issueTable(viewIssues().filter(i => (i.title + ' ' + i.description + ' ' + i.category).toLowerCase().includes(search.toLowerCase()))); }
async function saveIssue() {
  const title = val('iTitle').trim();
  if (!title) return notify(t('titleReq'));
  const isNew = editing === 'new';
  const o = { title: title.slice(0, 200), description: val('iDescription').slice(0, 4000), category: val('iCat'), priority: val('iPriority'), updatedBy: uid(), updatedAt: F.serverTimestamp() };
  if (!isStaff()) Object.assign(o, { grade: me.grade, class: me.class, status: 'reported', visibility: val('iVis') === 'schoolOnly' ? 'schoolOnly' : 'private', owner: '', due: '', schoolResponse: '' });
  else Object.assign(o, {
    grade: isAdmin() ? val('iGrade') : me.grade, class: isAdmin() ? val('iClass') : me.class,
    status: val('iStatus'), visibility: val('iVis'), owner: val('iOwner').slice(0, 200), due: val('iDue'), schoolResponse: val('iResponse').slice(0, 4000)
  });
  const ok = await guard(async () => {
    if (isNew) { Object.assign(o, { created: today(), createdBy: uid(), createdAt: F.serverTimestamp() }); await F.addDoc(scol('issues'), o); }
    else await F.updateDoc(sdoc('issues', editing), o);
  });
  if (ok) { editing = null; render(); }
}
function deleteIssue() { const id = editing; ask(t('delConcern'), async () => { if (await guard(() => F.deleteDoc(sdoc('issues', id)))) { editing = null; render(); } }); }

/* ---------- meetings ---------- */
function meetingForm(m) {
  m = m || {};
  return `<div class="panel" style="margin-bottom:15px"><h2>${editing === 'new' ? t('addMeeting') : L('Edit meeting', 'تعديل الاجتماع', 'Modifier la réunion')}</h2><div class="formgrid">${formInput(t('meetingTitle'), 'mTitle', m.title, 'text', 'maxlength="200"')}${formInput(t('date'), 'mDate', m.date || today(), 'date')}
  ${isAdmin() ? formSelect(t('grade'), 'mGrade', GR(), m.grade || (grade === 'All' ? GR()[0] : grade)) + formSelect(t('class'), 'mClass', CL(), m.class || (cls === 'All' ? CL()[0] : cls)) : ''}</div>
  ${formArea(t('agenda'), 'mAgenda', m.agenda)}${formArea(t('minutes'), 'mMinutes', m.minutes)}${formArea(t('actions'), 'mActions', m.actions)}
  <div class="row"><button onclick="saveMeeting()">${t('save')}</button><button class="secondary" onclick="cancelEdit()">${t('cancel')}</button>${editing !== 'new' ? `<button class="warn" onclick="deleteMeeting()">${t('del')}</button>` : ''}</div></div>`;
}
function meetings() {
  const items = filtered(S.meetings).sort((a, b) => String(b.date).localeCompare(String(a.date)));
  return viewTitle(t('meetings'), isAdmin() ? esc(school ? school.name : '') : `${t('yourClass')}: ${esc(me.grade)} · ${esc(me.class)}`, isStaff() ? `<button onclick="startEdit('new')">+ ${t('addMeeting')}</button>` : '')
    + (editing && isStaff() ? meetingForm(editing === 'new' ? null : S.meetings.find(x => x.id === editing)) : '')
    + `<div class="three">${items.map(m => `<div class="panel"><div class="row space"><h3>${esc(m.title)}</h3><span class="pill">${esc(m.date)}</span></div><div class="hint">${esc(m.grade)} · ${esc(m.class)}</div>
    <p><strong>${t('agenda')}</strong><br>${esc(m.agenda || '—').replace(/\n/g, '<br>')}</p><p><strong>${t('minutes')}</strong><br>${esc(m.minutes || '—').replace(/\n/g, '<br>')}</p><p><strong>${t('actions')}</strong><br>${esc(m.actions || '—').replace(/\n/g, '<br>')}</p>
    ${isStaff() ? `<button class="secondary" onclick="startEdit('${esc(m.id)}')">${t('edit')}</button>` : ''}</div>`).join('') || `<div class="panel empty">${L('No meetings yet', 'لا توجد اجتماعات بعد', 'Aucune réunion')}</div>`}</div>`;
}
async function saveMeeting() {
  if (!val('mTitle').trim()) return notify(t('titleReq'));
  const isNew = editing === 'new';
  const x = { title: val('mTitle').trim().slice(0, 200), date: val('mDate'), grade: isAdmin() ? val('mGrade') : me.grade, class: isAdmin() ? val('mClass') : me.class,
    agenda: val('mAgenda').slice(0, 4000), minutes: val('mMinutes').slice(0, 8000), actions: val('mActions').slice(0, 4000), updatedBy: uid(), updatedAt: F.serverTimestamp() };
  const ok = await guard(async () => { if (isNew) { x.createdBy = uid(); await F.addDoc(scol('meetings'), x); } else await F.updateDoc(sdoc('meetings', editing), x); });
  if (ok) { editing = null; render(); }
}
function deleteMeeting() { const id = editing; ask(L('Delete this meeting?', 'حذف هذا الاجتماع؟', 'Supprimer cette réunion ?'), async () => { if (await guard(() => F.deleteDoc(sdoc('meetings', id)))) { editing = null; render(); } }); }

/* ---------- representatives ---------- */
function representatives() {
  const reps = filtered(S.reps).sort((a, b) => (GR().indexOf(a.grade) - GR().indexOf(b.grade)) || String(a.class).localeCompare(String(b.class)));
  return viewTitle(t('representatives'), t('repDirectory'))
    + (isAdmin() ? `<div class="notice">${t('assignHint')} <a href="#" onclick="go('members');return false">${t('members')} →</a></div>` : '')
    + `<div class="panel scroll"><table><thead><tr><th>${t('name')}</th><th>${t('email')}</th><th>${t('grade')}</th><th>${t('class')}</th></tr></thead><tbody>${reps.map(r => `<tr><td>${esc(r.name)}</td><td>${esc(r.email)}</td><td>${esc(r.grade)}</td><td>${esc(r.class)}</td></tr>`).join('') || `<tr><td colspan="4" class="empty">${t('noMembers')}</td></tr>`}</tbody></table></div>`;
}

/* ---------- members ---------- */
function members() {
  const users = (isAdmin() ? filtered(S.users) : S.users).slice().sort((a, b) => (a.approved === b.approved ? 0 : a.approved ? 1 : -1) || String(a.name).localeCompare(String(b.name)));
  return viewTitle(t('members'), isAdmin() ? esc(school ? school.name : '') : `${t('yourClass')}: ${esc(me.grade)} · ${esc(me.class)}`)
    + `<div class="panel scroll"><table><thead><tr><th>${t('name')}</th><th>${t('email')}</th><th>${t('grade')} / ${t('class')}</th><th>${t('role')}</th><th>${t('status')}</th><th></th></tr></thead><tbody>
  ${users.map(u => `<tr><td>${esc(u.name)}</td><td>${esc(u.email)}</td><td>${esc(u.grade || '—')} / ${esc(u.class || '—')}</td><td>${esc(roleLabel(u.role))}</td><td>${u.approved ? `<span class="pill">${t('approved')}</span>` : `<span class="pill gold">${t('waiting')}</span>`}</td>
  <td>${u.id === uid() ? '' : isTeacher() ? (u.role === 'student' ? `<button class="tablebtn ${u.approved ? 'secondary' : ''}" onclick="setApproved('${esc(u.id)}',${!u.approved})">${u.approved ? t('unapprove') : t('approve')}</button>` : '') : isAdmin() ? `<button class="tablebtn secondary" onclick="editMember('${esc(u.id)}')">${t('edit')}</button>` : (u.role === 'parent' ? `<button class="tablebtn ${u.approved ? 'secondary' : ''}" onclick="setApproved('${esc(u.id)}',${!u.approved})">${u.approved ? t('unapprove') : t('approve')}</button>` : '')}</td></tr>`).join('') || `<tr><td colspan="6" class="empty">${t('noMembers')}</td></tr>`}
  </tbody></table></div><p class="hint">${L('Approve only people you can confirm are parents of this class.', 'وافقي فقط على من تتأكدين أنهم أولياء أمور في هذا الفصل.', 'N’approuvez que les parents confirmés de cette classe.')}</p>`;
}
async function setApproved(id, v) { await guard(() => F.updateDoc(F.doc(fb.fs, 'users', id), { approved: v })); }
function editMember(id) {
  const u = S.users.find(x => x.id === id); if (!u) return;
  modal(`<h2>${esc(u.name)}</h2><p class="hint">${esc(u.email)}</p>
  ${formSelect(t('role'), 'uRole', ['parent', 'student', 'teacher', 'rep', 'admin'], u.role, roleLabel)}
  <div class="formgrid">${formSelect(t('grade'), 'uGrade', ['', ...GR()], u.grade || '', v => v || '—')}${formSelect(t('class'), 'uClass', ['', ...CL()], u.class || '', v => v || '—')}</div>
  ${formSelect(t('status'), 'uApproved', ['yes', 'no'], u.approved ? 'yes' : 'no', v => v === 'yes' ? t('approved') : t('waiting'))}
  <div class="row"><button onclick="saveMember('${esc(id)}')">${t('save')}</button><button class="secondary" onclick="closeModal()">${t('cancel')}</button></div>`);
}
async function saveMember(id) {
  const role = val('uRole');
  let g = val('uGrade'), c = val('uClass');
  if (role === 'admin' || role === 'teacher') { g = ''; c = ''; }
  else if (!g || !c) return notify(L('Parents and representatives need a grade and class.', 'يحتاج أولياء الأمور والممثلون إلى صف وفصل.', 'Un niveau et une classe sont requis.'));
  const data = { role, grade: g, class: c, approved: val('uApproved') === 'yes' };
  closeModal();
  await guard(() => F.updateDoc(F.doc(fb.fs, 'users', id), data));
}

/* ---------- school settings (admin) ---------- */
function schoolSettings() {
  if (!school) return viewTitle(t('schoolSettings'), t('loading'));
  const link = joinUrl(school.code);
  return viewTitle(t('schoolSettings'), esc(school.name))
    + `<div class="panel invite"><h2>${t('inviteTitle')}</h2><p>${t('inviteText')}</p>
    <div class="row"><span class="bigcode">${esc(school.code)}</span><button class="secondary" onclick="copyText('${esc(school.code)}',this)">${t('copy')}</button></div>
    <div class="field" style="margin-top:12px"><label>${t('joinLink')}</label><div class="row"><input readonly value="${esc(link)}" style="flex:1;min-width:0"><button class="secondary" onclick="copyText('${esc(link)}',this)">${t('copy')}</button></div></div></div>
    <div style="height:15px"></div>
    <div class="panel"><h2>${t('schoolSettings')}</h2>${accreditBadge()}${formInput(t('schoolName'), 'ssName', school.name, 'text', 'maxlength="120"')}
    <div class="formgrid">${formSelect(L('Country', 'الدولة', 'Pays'), 'ssCountry', countryOptions(), school.country || '', c => c ? countryName(c) : '—')}${formInput(L('City', 'المدينة', 'Ville'), 'ssCity', school.city || '', 'text', 'maxlength="80"')}</div>
    <div class="formgrid"><div class="field"><label for="ssGrades">${t('gradesLabel')}</label><textarea id="ssGrades" style="min-height:220px">${esc(GR().join('\n'))}</textarea></div>
    <div class="field"><label for="ssClasses">${t('classesLabel')}</label><input id="ssClasses" value="${esc(CL().join(', '))}"><span class="hint">${t('gradesHint')}</span></div></div>
    <button onclick="saveSchool()">${t('save')}</button></div>`;
}
function accreditBadge() {
  if (mySchoolDir === undefined) { mySchoolDir = null; F.getDoc(F.doc(fb.fs, 'directory', sid())).then(d => { mySchoolDir = d.exists() ? d.data() : false; softRender(); }).catch(() => { mySchoolDir = false; }); }
  return mySchoolDir ? `<div class="schoolfound">✓ ${L('Roots-accredited — parents, students and teachers can find your school by country when they sign up.', 'معتمدة من جذور — يمكن للأهل والطلاب والمعلمين إيجاد مدرستك حسب الدولة عند التسجيل.', 'Accréditée Roots — votre école apparaît dans la liste par pays.')}</div>`
    : mySchoolDir === false ? `<div class="notice">${L('Awaiting Roots accreditation. Until then, people join with your school code or link.', 'بانتظار اعتماد جذور. حتى ذلك الحين ينضم الأعضاء بكود المدرسة أو الرابط.', 'Accréditation Roots en attente. En attendant, on rejoint avec le code ou le lien.')}</div>` : '';
}
async function saveSchool() {
  const name = val('ssName').trim().slice(0, 120);
  const country = val('ssCountry'), city = val('ssCity').trim().slice(0, 80);
  const grades = [...new Set(val('ssGrades').split('\n').map(s => s.trim().replace(/\//g, '-').slice(0, 30)).filter(Boolean))].slice(0, 30);
  const classes = [...new Set(val('ssClasses').split(',').map(s => s.trim().replace(/\//g, '-').slice(0, 15)).filter(Boolean))].slice(0, 20);
  if (!name || !grades.length || !classes.length) return notify(t('nameReq'));
  const ok = await guard(async () => {
    await F.updateDoc(F.doc(fb.fs, 'schools', sid()), { name, grades, classes, country, city });
    await F.updateDoc(F.doc(fb.fs, 'schoolCodes', school.code), { name, grades, classes });
    if (mySchoolDir) await F.updateDoc(F.doc(fb.fs, 'directory', sid()), { name, grades, classes, city });
  });
  if (ok) notify(t('saved'));
}

/* ---------- Roots owner: all schools ---------- */
function schoolsPage() {
  const rows = allSchools.slice().sort((a, b) => String(a.name).localeCompare(String(b.name)));
  const date = v => v && v.toDate ? v.toDate().toISOString().slice(0, 10) : (typeof v === 'string' ? v.slice(0, 10) : '');
  return viewTitle(t('schools'), `${t('schoolsHint')} · ${rows.length}`)
    + `<div class="panel scroll"><table><thead><tr><th>${t('schoolName')}</th><th>${L('Country', 'الدولة', 'Pays')}</th><th>${L('City', 'المدينة', 'Ville')}</th><th>${t('schoolCode')}</th><th>${t('created')}</th><th>${L('Roots-accredited', 'معتمدة من جذور', 'Accréditée Roots')}</th></tr></thead><tbody>${rows.map(s => `<tr><td>${esc(s.name)}</td><td>${s.country ? esc(countryName(s.country)) : '—'}</td><td>${esc(s.city || '—')}</td><td><b class="code">${esc(s.code)}</b></td><td>${esc(date(s.createdAt))}</td>
      <td>${allDirectory[s.id] ? `<button class="tablebtn" onclick="toggleAccredit('${esc(s.id)}')">✓ ${L('Accredited', 'معتمدة', 'Accréditée')}</button>` : `<button class="tablebtn secondary" onclick="toggleAccredit('${esc(s.id)}')">${L('Accredit', 'اعتماد', 'Accréditer')}</button>`}</td></tr>`).join('') || `<tr><td colspan="6" class="empty">—</td></tr>`}</tbody></table>
      <p class="hint">${L('Accredited schools appear in the country list when people sign up. Schools without a country cannot be listed until their admin sets it in School settings.', 'تظهر المدارس المعتمدة في قائمة الدولة عند التسجيل. يجب أن تحدد إدارة المدرسة الدولة في الإعدادات أولاً.', 'Les écoles accréditées apparaissent dans la liste par pays. Le pays doit être renseigné.')}</p></div>`;
}
function toggleAccredit(id) {
  const s = allSchools.find(x => x.id === id); if (!s) return;
  if (allDirectory[id]) return ask(L(`Remove Roots accreditation from ${s.name}? It will disappear from the public school list (members keep their accounts).`, `إلغاء اعتماد ${s.name}؟ ستختفي من القائمة العامة (يحتفظ الأعضاء بحساباتهم).`, `Retirer l'accréditation de ${s.name} ?`), () => guard(() => F.deleteDoc(F.doc(fb.fs, 'directory', id))));
  if (!s.country) return notify(L('This school has no country yet. Ask its admin to set it in School settings.', 'لم تحدد هذه المدرسة دولتها بعد.', "Cette école n'a pas encore de pays."));
  ask(L(`Accredit ${s.name} (${countryName(s.country)})? It will be listed publicly for people joining from that country.`, `اعتماد ${s.name} (${countryName(s.country)})؟ ستظهر في القائمة العامة لهذه الدولة.`, `Accréditer ${s.name} ?`),
    () => guard(() => F.setDoc(F.doc(fb.fs, 'directory', id), { schoolId: id, name: s.name, country: s.country, city: s.city || '', grades: s.grades || DEFAULT_GRADES, classes: s.classes || DEFAULT_CLASSES, accredited: true, accreditedAt: F.serverTimestamp() })));
}

/* ---------- reports ---------- */
function reports() {
  const items = viewIssues(), complete = items.filter(x => x.status === 'closed').length;
  return viewTitle(t('reports'), t('reportsHint'), `<button class="secondary no-print" onclick="window.print()">${t('print')}</button>`)
    + `<div class="cards"><div class="card"><div class="metric">${items.length}</div>${t('total')}</div><div class="card"><div class="metric">${activeCount(items)}</div>${t('open')}</div><div class="card"><div class="metric">${complete}</div>${t('resolved')}</div><div class="card"><div class="metric">${items.length ? Math.round(complete / items.length * 100) : 0}%</div>${L('Resolution rate', 'نسبة الحل', 'Taux de résolution')}</div></div>
  <div class="panel"><h2>${L('Issue register', 'سجل الملاحظات', 'Registre des points')}</h2>${issueTable(items)}
  <div class="row no-print" style="margin-top:18px"><button onclick="exportIssues()">${t('export')}</button>${isAdmin() ? `<button class="secondary" onclick="exportAll()">${t('exportAll')}</button>` : ''}</div>
  <p class="hint">${L('Export only with permission, and avoid exposing private concerns.', 'صدّري البيانات بعد التأكد من الصلاحيات وعدم كشف الملاحظات الخاصة.', 'N’exportez qu’avec autorisation et sans divulguer les données privées.')}</p></div>`;
}
function csv(v) { return '"' + String(v ?? '').replace(/"/g, '""') + '"'; }
function download(name, content, type) { const blob = new Blob(['﻿', content], { type }), url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
function exportIssues() {
  const cols = ['id', 'title', 'description', 'category', 'grade', 'class', 'priority', 'status', 'visibility', 'owner', 'due', 'schoolResponse', 'created'];
  download('roots-parent-voice-concerns-' + today() + '.csv', [cols.join(','), ...viewIssues().map(i => cols.map(k => csv(i[k])).join(','))].join('\r\n'), 'text/csv');
}
function plain(o) { return JSON.parse(JSON.stringify(o, (k, v) => v && typeof v === 'object' && typeof v.toDate === 'function' ? v.toDate().toISOString() : v)); }
function exportAll() { download('roots-parent-voice-backup-' + today() + '.json', JSON.stringify(plain({ exported: new Date().toISOString(), school, issues: allIssues(), meetings: S.meetings, checks: S.checks, users: S.users }), null, 2), 'application/json'); }

/* ---------- account ---------- */
function account() {
  return viewTitle(t('account'), esc(authUser.email))
    + `<div class="two"><div class="panel"><h2>${t('fullName')}</h2>${formInput(t('fullName'), 'acName', me.name, 'text', 'maxlength="100"')}<button onclick="saveName()">${t('changeName')}</button>
    <p class="hint">${esc(school ? school.name : '')} · ${t('role')}: ${esc(roleLabel(me.role))}${me.grade ? ' · ' + esc(me.grade) + ' · ' + esc(me.class) : ''}</p></div>
    <div class="panel"><h2>${t('password')}</h2><button class="secondary" onclick="accountReset()">${t('sendReset')}</button><div style="height:14px"></div><button class="warn" onclick="doSignOut()">${t('signOut')}</button></div></div>
    <div class="notice">${L('Do not enter student names, medical details, or safeguarding cases in this app. Use the school’s official channels for those.', 'لا تُدخلي أسماء الطلاب أو بيانات طبية أو حالات حماية الطفل في هذا التطبيق، واستخدمي القنوات الرسمية للمدرسة.', 'N’inscrivez ni noms d’élèves, ni données médicales, ni cas de protection de l’enfance ; utilisez les canaux officiels de l’école.')}</div>`;
}
async function saveName() { const n = val('acName').trim(); if (!n) return notify(t('nameReq')); if (await guard(() => F.updateDoc(F.doc(fb.fs, 'users', uid()), { name: n.slice(0, 100) }))) notify(t('saved')); }
async function accountReset() { try { await F.sendPasswordResetEmail(fb.auth, authUser.email); notify(t('resetSent')); } catch (e) { notify(authError(e)); } }

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
  for (let i = 0; i < 5; i++) { let taken = false; try { taken = (await F.getDoc(F.doc(fb.fs, 'schools', schoolId, 'studentCodes', code))).exists(); } catch (e) {} if (!taken) break; code = newCode(); }
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
  const c = S.courses.find(x => x.id === openCourse); if (!c) return `<p class="muted">${t('loading')}</p>`;
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
  ${l.objective ? `<div class="objective">🎯 <b>${L('Goal', 'الهدف', 'Objectif')}:</b> ${esc(l.objective)}</div>` : ''}
  ${E2_STEPS().filter(s => l.e2 && l.e2[s.k]).map((s, i) => `<div class="e2step e2-${s.k}"><span class="e2num">${i + 1}</span><div><b>${s.n}</b><div>${esc(l.e2[s.k]).replace(/\n/g, '<br>')}</div></div></div>`).join('')}
  ${l.body ? `<div class="lessonbody">${esc(l.body).replace(/\n/g, '<br>')}</div>` : ''}
  ${links ? `<h3>${L('Resources', 'المصادر', 'Ressources')}</h3><ul>${links}</ul>` : ''}
  <p><button class="secondary" onclick="setCourseTab('lessons')">← ${L('All lessons', 'كل الدروس', 'Toutes les leçons')}</button></p></div>`;
}
const E2_STEPS = () => [
  { k: 'hook', n: L('Hook', 'التمهيد', 'Accroche'), tip: L('Show one example. Ask: what do you notice?', 'اعرضي مثالاً واحداً واسألي: ماذا تلاحظون؟', 'Montrez un exemple. Demandez : que remarquez-vous ?') },
  { k: 'teach', n: L('Teach', 'الشرح', 'Enseigner'), tip: L('Model one small step and explain your thinking.', 'نمذجي خطوة صغيرة واشرحي طريقة تفكيرك.', 'Modélisez une petite étape et expliquez votre raisonnement.') },
  { k: 'practice', n: L('Practice', 'التطبيق', 'Pratiquer'), tip: L('Try together, then invite an independent attempt.', 'جرّبوا معاً ثم ادعي الطلاب لمحاولة مستقلة.', 'Essayez ensemble, puis une tentative autonome.') },
  { k: 'connect', n: L('Connect', 'الربط', 'Relier'), tip: L('Find one use for this learning outside the lesson.', 'اربطي التعلّم باستخدام واحد خارج الدرس.', 'Trouvez un usage hors de la leçon.') },
  { k: 'reflect', n: L('Reflect', 'التأمل', 'Réfléchir'), tip: L('Ask what is clearer now and what still needs practice.', 'اسألي: ما الذي اتضح الآن؟ وما الذي يحتاج تدريباً؟', 'Qu’est-ce qui est plus clair ? Que faut-il encore pratiquer ?') }
];
const E2_STARTERS = [
  { id: 'letters', t: 'Arabic: notice the dots', o: 'Distinguish ب ت ث by their dot patterns.', hook: 'Look at ب ت ث. What stays the same? What changes?', teach: 'Point to each letter and name its dots: one below, two above, three above.', practice: 'Find the letter with one dot below, then the letter with two dots above. Draw your own examples.', connect: 'Find these letters in your name or in a word around you.', reflect: 'Which letter is easiest to remember? Which still confuses you?' },
  { id: 'science', t: 'Science: observe a plant', o: 'Separate an observation from a question about a plant.', hook: 'Look carefully at a plant or a picture of one.', teach: 'An observation is something you can see; a question is something you want to find out.', practice: 'Describe two things you can actually see. Then write one question you would like to investigate.', connect: 'Which plants do you see at home or on the way to school?', reflect: 'Did you treat any guess as an observation?' },
  { id: 'maths', t: 'Mathematics: explain your strategy', o: 'Explain one way to solve a simple addition problem.', hook: 'How many ways can you solve 8 + 7?', teach: 'Model one strategy: make 10 first (8 + 2), then add the rest (10 + 5).', practice: 'Choose a way to solve 8 + 7. Draw, use objects or write. Explain your steps.', connect: 'Where do you add numbers in everyday life?', reflect: 'Can you check your answer in another way?' }
];
function applyStarter(id) {
  const s = E2_STARTERS.find(x => x.id === id); if (!s) return;
  const set = (i, v) => { const el = document.getElementById(i); if (el && !el.value) el.value = v; };
  set('lTitle', s.t); set('lObj', s.o); ['hook', 'teach', 'practice', 'connect', 'reflect'].forEach(k => set('e2_' + k, s[k]));
}
function editLesson(id) {
  const l = id === 'new' ? {} : (S_lessons.find(x => x.id === id) || {});
  modal(`<h2>${id === 'new' ? L('Add lesson', 'إضافة درس', 'Ajouter une leçon') : t('edit')}</h2>
  ${formInput(t('title'), 'lTitle', l.title, 'text', 'maxlength="160"')}
  ${id === 'new' ? formSelect(L('Start from an E² example (optional)', 'ابدئي من نموذج E² (اختياري)', 'Partir d’un exemple E² (facultatif)'), 'lStarter', ['', ...E2_STARTERS.map(s => s.id)], '', v => v ? E2_STARTERS.find(s => s.id === v).t : '—', 'onchange="applyStarter(this.value)"') : ''}
  ${formInput(L('Learning objective', 'هدف التعلّم', 'Objectif d’apprentissage'), 'lObj', l.objective || '', 'text', 'maxlength="300"')}
  ${formInput(L('Video link (YouTube or any link)', 'رابط الفيديو (يوتيوب أو أي رابط)', 'Lien vidéo (YouTube ou autre)'), 'lVideo', l.video || '', 'url')}
  <div class="e2edit"><div class="e2title">E² · ${L('Engaging & Effective lesson flow', 'تسلسل الدرس الجاذب والفعّال', 'Déroulé de leçon engageant et efficace')}</div>
  ${E2_STEPS().map(s => `<div class="field"><label for="e2_${s.k}">${s.n}</label><textarea id="e2_${s.k}" placeholder="${esc(s.tip)}">${esc((l.e2 || {})[s.k] || '')}</textarea></div>`).join('')}</div>
  ${formArea(L('Extra notes for students (optional)', 'ملاحظات إضافية للطلاب (اختياري)', 'Notes supplémentaires (facultatif)'), 'lBody', l.body)}
  <div class="field"><label for="lLinks">${L('Resources — one per line: Name | https://link (slides, PDF, Drive…)', 'المصادر — سطر لكل مصدر: الاسم | https://الرابط', 'Ressources — une par ligne : Nom | https://lien')}</label><textarea id="lLinks">${esc(l.links || '')}</textarea></div>
  <div class="formgrid">${formInput(L('Order', 'الترتيب', 'Ordre'), 'lOrder', l.order ?? S_lessons.length + 1, 'number')}${formSelect(L('Visible to students?', 'ظاهر للطلاب؟', 'Visible aux élèves ?'), 'lPub', ['yes', 'no'], l.published === false ? 'no' : 'yes', v => v === 'yes' ? L('Published', 'منشور', 'Publié') : L('Draft', 'مسودة', 'Brouillon'))}</div>
  <div class="row"><button onclick="saveLesson('${esc(id)}')">${t('save')}</button><button class="secondary" onclick="closeModal()">${t('cancel')}</button></div>`);
}
async function saveLesson(id) {
  const c = S.courses.find(x => x.id === openCourse);
  const title = val('lTitle').trim(); if (!title) return notify(t('titleReq'));
  const e2 = {}; E2_STEPS().forEach(s => { e2[s.k] = val('e2_' + s.k).slice(0, 4000); });
  const d = { courseId: c.id, grade: c.grade, class: c.class, title: title.slice(0, 160), objective: val('lObj').slice(0, 300), e2, video: val('lVideo').trim().slice(0, 500), body: val('lBody').slice(0, 20000), links: val('lLinks').slice(0, 4000), order: Number(val('lOrder')) || 0, published: val('lPub') === 'yes', updatedBy: uid(), updatedAt: F.serverTimestamp() };
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
  return `<div class="cards"><div class="card"><div class="metric">${poss ? pct(got, poss) + "%" : "—"}</div><div class="muted">${L('Average mark', 'متوسط الدرجات', 'Moyenne')}</div></div>
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

/* ---------- start ---------- */
Object.assign(window, {
  closeModal, runAsk, go, setGrade, setClass, cycleLang, refreshNow, cancelEdit, setTab, saveChecks, startEdit, setSearch, saveIssue, deleteIssue,
  saveMeeting, deleteMeeting, setApproved, editMember, saveMember, exportIssues, exportAll, saveName, accountReset, saveSchool, copyText,
  doSignIn, doSignUp, doReset, resendVerify, checkVerified, doSignOut, completeProfile, findSchool, setKind, clearSchool, render,
  markDirty: () => { checkDirty = true; },
  setSignupRole, applyStarter, setCodeBox, setJoinCountry, pickDir, setRegCountry, schoolSearchInput, pickExternal, citySearchInput, pickCity, registerFromJoin, toggleAccredit, editCourse, saveCourse, openCourseView, setCourseTab, showLesson, editLesson, saveLesson, deleteLesson, showAssign, editAssign, saveAssign, deleteAssign,
  submitWork, markOne, markAllQuiz, setGb, exportGradebook, setAtt, saveAttendance, editNews, saveNews, deleteNews, linkChild, setAuthMode: m => { authMode = m; flash = ''; render(); }
});

render();
if (configured) {
  fb = F.init(CFG.firebase);
  F.onAuthStateChanged(fb.auth, user => {
    unsubsOwner.splice(0).forEach(u => { try { u(); } catch (e) {} }); unsubsOwner.dir = false; mySchoolDir = undefined;
    authUser = user;
    if (!user) { stopAll(); authState = 'signedOut'; return render(); }
    if (!user.emailVerified) { stopAll(); authState = 'unverified'; return render(); }
    startProfile();
  });
  if (joinCode) setTimeout(() => { if (authState === 'signedOut' && document.getElementById('aCode')) findSchool(); }, 600);
}
