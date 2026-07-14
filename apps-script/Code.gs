/**
 * RQAP Exam — Google Sheets ingestor
 * ----------------------------------
 * Receives a JSON POST from exam.html and appends one row per submission
 * to the active Google Sheet. Optionally: a second tab with per-question
 * responses, one row per item.
 *
 * SETUP
 * 1. Open the Google Sheet you want results to land in.
 * 2. Extensions → Apps Script. Replace Code.gs with this file.
 * 3. (Optional) Set SHARED_SECRET below and the same value in exam.html CONFIG.
 * 4. Deploy → New deployment → Type: Web app
 *      • Execute as: Me
 *      • Who has access: Anyone
 *    Copy the Web App URL it gives you.
 * 5. In exam.html set CONFIG.SHEETS_WEBHOOK_URL to that URL.
 * 6. (Optional) From the Apps Script editor, run the function `setupSheets`
 *    once to create the headers cleanly. (Otherwise headers are written on
 *    the first submission.)
 */

const SHARED_SECRET = '';   // optional; if set, exam.html must send the same value
const SUBMISSIONS_SHEET = 'Submissions';
const RESPONSES_SHEET = 'Responses';

const SUBMISSION_HEADERS = [
  'Submitted At', 'Cert ID', 'Level',
  'Name', 'Email', 'Country', 'Age', 'Background',
  'Track 1 (Language)', 'Track 2 (Tajweed)',
  'Language Score', 'Tajweed Score',
  'Verdict', 'Verdict (Arabic)', 'Verdict Tier',
  'Section 1A %', 'Section 1B %', 'Section 1C %', 'Section 1D %',
  'Section 2A %', 'Section 2B %', 'Section 2C %',
  'Duration (sec)', 'User Agent'
];

const RESPONSE_HEADERS = [
  'Submitted At', 'Cert ID', 'Name', 'Email',
  'Section', 'Item ID', 'Value', 'Correct', 'Word Count'
];

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheet_(ss, SUBMISSIONS_SHEET, SUBMISSION_HEADERS);
  ensureSheet_(ss, RESPONSES_SHEET, RESPONSE_HEADERS);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOut_({ ok: false, error: 'No body' });
    }
    const data = JSON.parse(e.postData.contents);

    if (SHARED_SECRET && data.secret !== SHARED_SECRET) {
      return jsonOut_({ ok: false, error: 'Unauthorized' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const subs = ensureSheet_(ss, SUBMISSIONS_SHEET, SUBMISSION_HEADERS);
    const resp = ensureSheet_(ss, RESPONSES_SHEET, RESPONSE_HEADERS);

    const c = data.candidate || {};
    const t = data.trackScores || {};
    const sectionPct = {};
    (data.sections || []).forEach(s => { sectionPct[s.section] = s.pct; });

    subs.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.certId || '',
      data.level || '',
      c.name || '',
      c.email || '',
      c.country || '',
      c.age || '',
      c.background || '',
      data.tracks && data.tracks.language ? 'Yes' : 'No',
      data.tracks && data.tracks.tajweed ? 'Yes' : 'No',
      t.language == null ? '' : t.language,
      t.tajweed == null ? '' : t.tajweed,
      data.verdict || '',
      data.verdictArabic || '',
      data.verdictTier || '',
      sectionPct['1A'] == null ? '' : sectionPct['1A'],
      sectionPct['1B'] == null ? '' : sectionPct['1B'],
      sectionPct['1C'] == null ? '' : sectionPct['1C'],
      sectionPct['1D'] == null ? '' : sectionPct['1D'],
      sectionPct['2A'] == null ? '' : sectionPct['2A'],
      sectionPct['2B'] == null ? '' : sectionPct['2B'],
      sectionPct['2C'] == null ? '' : sectionPct['2C'],
      data.durationSec == null ? '' : data.durationSec,
      data.userAgent || ''
    ]);

    const responses = data.responses || {};
    Object.keys(responses).forEach(itemId => {
      const r = responses[itemId];
      const section = (itemId.match(/^[12][A-D]/) || [''])[0];
      resp.appendRow([
        data.submittedAt || new Date().toISOString(),
        data.certId || '',
        c.name || '',
        c.email || '',
        section,
        itemId,
        typeof r.value === 'object' ? JSON.stringify(r.value) : (r.value == null ? '' : r.value),
        r.correct == null ? '' : r.correct,
        r.wordCount == null ? '' : r.wordCount
      ]);
    });

    return jsonOut_({ ok: true, certId: data.certId });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonOut_({ ok: true, service: 'RQAP ingestor', deployedAt: new Date().toISOString() });
}

function ensureSheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
