# Apps Script — one-time setup (Dina)

This is the reference doc for wiring up the certificate-issuing + email + verification pipeline
that lives in `D:\website\apps-script\Code.gs`. Do this once. After that, every exam submission
auto-emails the student a PDF certificate, CC's you, and becomes verifiable at
`pathwayslearn.com/verify/[cert-id]`.

**Time:** ~15 minutes for the full setup. Nothing here is code you need to write — everything is
copy-paste, click, or fill-in-a-blank.

---

## 1. Prepare the destination Google Sheet

You already have a sheet called "RQAP Submissions" (Sheet ID
`15u1haK4MjfFMy1XPsCdSJLZopXt5rMzfYQe5Pyem0jI`). You can reuse it for both exams — the script
tags every row with an "Exam Type" column so RAQP and RQAP submissions coexist cleanly.

Open that sheet in the browser. Keep the tab open — you'll use it as the base for the Apps Script
editor.

---

## 2. Paste the script

1. In the sheet, click `Extensions → Apps Script`. A new editor tab opens.
2. Delete anything already in `Code.gs`.
3. Open `D:\website\apps-script\Code.gs` in a text editor. Select all → copy.
4. Paste into the Apps Script `Code.gs`. Save (Ctrl-S).

---

## 3. Create the two certificate template docs

You need two Google Docs — one per exam. Each is a normal Google Doc you design however you like.
The script copies the template on every new submission, replaces the placeholders below with the
holder's values, inserts a QR code image where `{{QR_PLACEHOLDER}}` sits, and exports the result
as a PDF that gets attached to the student's email.

**Placeholders the script recognises (just paste these as literal text where you want them):**

| Placeholder | What the script replaces it with |
|---|---|
| `{{NAME}}` | Holder's full name |
| `{{CERT_ID}}` | e.g. `RAQP-2026-000042` |
| `{{LEVEL}}` | e.g. `A2 — Foundational` or `Level 2 (Asasi) — Pass` |
| `{{DATE}}` | e.g. `15 July 2026` |
| `{{VERIFY_URL}}` | e.g. `https://www.pathwayslearn.com/verify/RAQP-2026-000042` |
| `{{QR_PLACEHOLDER}}` | The QR image (auto-inserted, sized to 120pt) |
| `{{TRACK_SCORES}}` | RQAP only — e.g. `Language: 82 · Tajweed: 78` |

**What to create:**

1. **"RAQP Certificate Template"** — for the CEFR exam. Should visually convey a language
   proficiency certificate. Suggested content: your Roots wordmark at top, "Certificate of
   Proficiency" as the title, holder name in large type, "achieved" language, `{{LEVEL}}`
   prominently displayed, date + cert ID at the bottom, and a "Verify authenticity at
   pathwayslearn.com/verify/{{CERT_ID}}" line next to `{{QR_PLACEHOLDER}}`.

2. **"RQAP L2A Certificate Template"** — for the Roots Level 2 Asasi exam. More formal, since
   this one carries Tajweed + Language claims. Include `{{TRACK_SCORES}}` to show per-track
   results.

**After you save each doc:** copy the doc ID from the URL. It's the long random string between
`/d/` and `/edit`. Keep both IDs handy for the next step.

---

## 4. Set Script Properties

In the Apps Script editor: click the ⚙️ gear icon (Project Settings), then scroll to
**Script properties**. Click "Add script property" three times and fill in:

| Property | Value |
|---|---|
| `RAQP_TEMPLATE_ID` | (the doc ID from step 3, item 1) |
| `RQAP_TEMPLATE_ID` | (the doc ID from step 3, item 2) |
| `CC_EMAIL` | `hello@pathwayslearn.com` (optional — defaults to this if unset) |
| `SHARED_SECRET` | optional random string (leave blank for now) |

Save.

---

## 5. Deploy as a Web App

1. In the Apps Script editor: `Deploy → New deployment`.
2. Click the ⚙️ gear next to "Select type" → **Web app**.
3. Fill in:
   - **Description:** `Roots exam pipeline v1`
   - **Execute as:** `Me (hello@pathwayslearn.com)`
   - **Who has access:** `Anyone`
4. Click **Deploy**. Google will prompt you to authorise. Grant permission (you'll see a
   scary-looking screen — click "Advanced" → "Go to project (unsafe)" → Allow). This is normal
   for a personal script.
5. Copy the **Web app URL** it shows you. It ends in `/exec` and looks like
   `https://script.google.com/macros/s/AKfyc.../exec`.

---

## 6. Paste the Web App URL into the site (three places)

1. **`D:\PATHWAYS\src\config\apps-script.js`** — set `APPS_SCRIPT_URL` to the `/exec` URL.
   This powers the public `/verify/[cert-id]` page.
2. **`D:\PATHWAYS\public\rqap.html`** at ~line 2110 — set `CONFIG.SHEETS_WEBHOOK_URL`.
   This powers the RQAP exam's submission POST.
3. **`D:\PATHWAYS\src\data\examData.js`** at ~line 378 — set `SHEETS_URL`.
   This powers the RAQP exam's submission POST.

Commit and push. Vercel auto-deploys.

---

## 7. Optional but recommended — pre-create the sheet tabs

In the Apps Script editor, from the function dropdown at the top, select **`setupSheets`** →
click Run. This creates two tabs (`Submissions` and `Responses`) with proper headers.

If you skip this, the tabs get created automatically on the first submission — either way works.

---

## Updating the script later

Apps Script Web Apps are versioned. If you edit `Code.gs`, the change is NOT live until you
publish a new version:

`Deploy → Manage deployments` → click the pencil (edit) next to your deployment →
"Version: New version" → **Deploy**.

The **/exec URL stays the same** across versions — you don't need to update the site.

---

## What happens on each exam submission (once configured)

1. Student submits their exam.
2. The exam POSTs a JSON payload to the `/exec` URL.
3. Script does, in order:
   - Computes the next cert ID (`RAQP-2026-XXXXXX` or `RQAP-L2A-2026-XXXXXX`)
   - Appends a row to the `Submissions` sheet
   - Copies your template Doc, replaces placeholders, fetches a QR image from `api.qrserver.com`,
     inserts it at `{{QR_PLACEHOLDER}}`
   - Exports as PDF
   - Emails the student (CC you) with the PDF attached
   - Trashes the temp Doc
4. Anyone can visit `pathwayslearn.com/verify/{that-cert-id}` and see the certificate confirmed
   (holder initials, level, date, exam version, track scores).

If any step after the sheet append fails, the student still has a row recorded — the failure is
just an unsent email, which you'll see in Apps Script's `View → Executions` log.

---

## Troubleshooting

- **"Verification not yet available" showing on `/verify/…`** → the `APPS_SCRIPT_URL` in
  `src/config/apps-script.js` is still empty. Paste your `/exec` URL and redeploy the site.
- **Submissions land in the sheet but no email arrives** → template ID is wrong or missing.
  Check `RAQP_TEMPLATE_ID` / `RQAP_TEMPLATE_ID` Script Properties. If a template ID is missing,
  the script falls back to a plain-text confirmation email (still useful, but no PDF).
- **QR code missing from PDF** → the placeholder text `{{QR_PLACEHOLDER}}` isn't in the template
  doc, or the QR fetch failed. If fetch fails the script falls back to pasting the URL as text.
- **Sheet has rows but Executions log shows errors** → open `View → Executions`, click the failed
  run, read the stack trace. Most common cause: template doc was moved/deleted, so the doc ID no
  longer resolves. Fix the template or update the Script Property.

---

## What Dina still owns after this is running

- Every new deployment version = go into Apps Script and publish (Manage deployments → New version).
- Refunds / manual reissues = you handle in the sheet + a manual email.
- Certificate design changes = edit the Google Doc templates. Takes effect on the next submission.
