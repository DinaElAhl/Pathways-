/** Roots National only. Deploy separately; do not replace exam/certificate scripts. */
const NATIONAL_HEADERS = ['Created', 'Request ID', 'Receipt', 'Type', 'Name', 'Email', 'WhatsApp', 'Grade / Role', 'Parent', 'School', 'Concern', 'Days', 'Times', 'Plan', 'Source', 'City', 'Degree', 'Experience', 'Stages', 'Tools', 'Availability', 'Demo URL', 'CV URL', 'Notes', 'Status', 'Applicant time zone', 'Schedule notes (Cairo)', 'Demo topic'];
function setupNational() {
  const sheet = SpreadsheetApp.openById('10pnQV5StS_PEOjlBq77YTt4R8I-tLfLTC7a22OamJ1A');
  if (!sheet) throw new Error('Run from the new Roots National spreadsheet.');
  PropertiesService.getScriptProperties().setProperty('NATIONAL_SHEET_ID', sheet.getId());
  ['Students', 'Teachers'].forEach(name => {
    let tab = sheet.getSheetByName(name);
    if (!tab) tab = sheet.insertSheet(name);
    if (!tab.getLastRow()) tab.appendRow(NATIONAL_HEADERS);
    tab.setFrozenRows(1);
  });
  if (!ScriptApp.getProjectTriggers().some(t => t.getHandlerFunction() === 'purgeNational')) ScriptApp.newTrigger('purgeNational').timeBased().everyDays(1).create();
}
function nationalReply_(data) { return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON); }
function doGet(e) {
  const configured = !!PropertiesService.getScriptProperties().getProperty('NATIONAL_SHEET_ID');
  return nationalReply_({ ok: configured && e.parameter.action === 'status', service: 'roots-national-v1' });
}
function nationalText_(value, required, max) {
  if (typeof value !== 'string' || value.length > (max || 120) || (required && !value.trim())) throw new Error('Invalid field');
  return value.trim();
}
function nationalCell_(value) { return /^\s*[=+@-]/.test(String(value)) ? "'" + value : value; }
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    if (!e.postData || e.postData.contents.length > 18000) throw new Error('Invalid request');
    const d = JSON.parse(e.postData.contents);
    if (!['student', 'teacher'].includes(d.formType) || !/^[a-f0-9-]{36}$/i.test(d.requestId || '') || d.website || d.consent !== 'موافق') throw new Error('Invalid request');
    const teacher = d.formType === 'teacher';
    const name = nationalText_(teacher ? d.fullName : d.studentName, true);
    const email = nationalText_(d.email, true, 254);
    const phone = nationalText_(d.whatsapp, true, 20);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[0-9+ ]{10,16}$/.test(phone)) throw new Error('Invalid contact details');
    const group = nationalText_(teacher ? d.role : d.grade, true);
    if (!(teacher ? ['رابعة ابتدائي — عربي ودين ودراسات','ثالثة ثانوي — لغة عربية'] : ['رابعة ابتدائي','ثالثة ثانوي']).includes(group)) throw new Error('Invalid programme');
    const required = teacher ? ['degree','years','videoLink'] : ['parentName','schoolType','plan'];
    required.forEach(key => nationalText_(d[key], true, 500));
    if (!teacher && !['طلب تشخيص','اشتراك شهري'].includes(d.plan)) throw new Error('Invalid plan');
    const url = key => { const v = nationalText_(d[key] || '', key === 'videoLink' && teacher, 500); if (v && !/^https:\/\/[^\s]+$/i.test(v)) throw new Error('Invalid link'); return v; };
    const keys = ['parentName','schoolType','concern','days','time','plan','source','city','degree','years','stages','tools','availability'];
    const fields = keys.map(key => nationalText_(d[key] || '', false, 1000));
    const zone = nationalText_(d.timeZone || 'Africa/Cairo', true, 80);
    if (!/^[A-Za-z_+-]+\/[A-Za-z_+\/-]+$/.test(zone)) throw new Error('Invalid timezone');
    const scheduleNotes = nationalText_(d.scheduleNotes || '', false, 500);
    const demoTopic = nationalText_(d.demoTopic || '', teacher, 150);
    const notes = nationalText_(d.notes || '', false, 1000), demo = url('videoLink'), cv = url('cvLink');
    lock.waitLock(10000);
    const props = PropertiesService.getScriptProperties();
    const sheetId = props.getProperty('NATIONAL_SHEET_ID');
    if (!sheetId) throw new Error('Not configured');
    const book = SpreadsheetApp.openById(sheetId);
    // Check both tabs so retries cannot turn one request into two applications.
    for (const name of ['Students','Teachers']) {
      const tab = book.getSheetByName(name);
      if (!tab) throw new Error('Run setupNational first');
      if (tab.getLastRow() > 1) {
        const match = tab.getRange(2,2,tab.getLastRow()-1,1).createTextFinder(d.requestId).matchEntireCell(true).findNext();
        if (match) return nationalReply_({ ok:true, requestId:d.requestId, receipt:tab.getRange(match.getRow(),3).getValue() });
      }
    }
    const today = Utilities.formatDate(new Date(),'Africa/Cairo','yyyy-MM-dd');
    let quota = JSON.parse(props.getProperty('NATIONAL_DAILY') || '{}');
    if (quota.day !== today) quota = { day:today, count:0 };
    if (quota.count >= 100) throw new Error('Daily capacity reached');
    const receipt = 'RN-' + Utilities.getUuid();
    const row = [new Date(), d.requestId, receipt, d.formType, name,email,phone,group, ...fields.slice(0,7), ...fields.slice(7), demo,cv,notes,'New',zone,scheduleNotes,demoTopic];
    book.getSheetByName(teacher ? 'Teachers' : 'Students').appendRow(row.map(nationalCell_));
    SpreadsheetApp.flush();
    quota.count++; props.setProperty('NATIONAL_DAILY',JSON.stringify(quota));
    return nationalReply_({ ok:true, requestId:d.requestId, receipt });
  } catch (error) { return nationalReply_({ ok:false, error:'Unable to confirm application. Please retry later.' }); }
  finally { if (lock.hasLock()) lock.releaseLock(); }
}
function purgeNational() {
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const id = PropertiesService.getScriptProperties().getProperty('NATIONAL_SHEET_ID'); if (!id) return;
    const cutoff = Date.now() - 90*24*60*60*1000;
    const book = SpreadsheetApp.openById(id);
    ['Students','Teachers'].forEach(name => {
      const tab=book.getSheetByName(name); if (!tab || tab.getLastRow()<2) return;
      const rows=tab.getRange(2,1,tab.getLastRow()-1,1).getValues();
      for(let i=rows.length-1;i>=0;i--) if(rows[i][0] instanceof Date && rows[i][0].getTime()<cutoff) tab.deleteRow(i+2);
    });
  } finally { lock.releaseLock(); }
}

