// Shared config for calls to the Roots Apps Script webhook.
//
// Dina: after you Deploy the Apps Script Web App, paste the /exec URL
// into APPS_SCRIPT_URL below and commit. Everything on the site that
// needs to reach the webhook (verify page, future submission code)
// reads from here. One source of truth.
//
// Deploy: Apps Script editor → Deploy → New deployment
//   Type: Web app · Execute as: Me · Who has access: Anyone
//   → copy the URL that ends in `/exec`
export const APPS_SCRIPT_URL = ''

// Cert ID prefixes used by the two exams. Kept in sync with the
// prefixes in D:\website\apps-script\Code.gs.
export const CERT_PREFIXES = {
  RAQP: 'RAQP',       // /pathways-exam (CEFR A1–B2 exam)
  RQAP: 'RQAP-L2A',   // /rqap.html (Level 2 Asasi exam)
}

// True if the URL has been filled in — used to render a graceful
// "verification not yet available" fallback on /verify.
export const isAppsScriptConfigured = () => APPS_SCRIPT_URL.length > 0
