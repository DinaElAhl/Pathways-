# RQAP Exam — Google Sheets Submission Setup

The exam app (`exam.html`) submits each candidate's results to a Google Sheet
via a Google Apps Script Web App. No backend, no Firebase, no auth provider
required — just one Google account.

## One-time setup

1. **Create the destination Sheet.** Open Google Sheets and create a new sheet
   called e.g. `RQAP Submissions`.

2. **Open the script editor.** In that Sheet: `Extensions → Apps Script`. Delete
   the default `Code.gs` content and paste in the contents of `Code.gs` from
   this folder. Save.

3. **(Optional) Set a shared secret.** In `Code.gs`, set `SHARED_SECRET = 'something-long-and-random'`.
   Then in `exam.html`, set `CONFIG.SHARED_SECRET` to the same string. This
   prevents random people on the internet from POSTing junk into your sheet.

4. **(Optional) Pre-create the headers.** In the Apps Script editor, select
   the function `setupSheets` and click Run. Approve the permissions prompt.
   This creates the `Submissions` and `Responses` tabs with proper headers.
   (Skipping this is fine — headers get written on the first submission.)

5. **Deploy as a Web App.**
   - Click `Deploy → New deployment`.
   - Gear icon → `Web app`.
   - Description: `RQAP exam ingestor`.
   - Execute as: **Me**.
   - Who has access: **Anyone**.
   - Click `Deploy`. Approve permissions.
   - Copy the **Web app URL** (looks like `https://script.google.com/macros/s/AKfyc.../exec`).

6. **Wire up the exam.** Open `exam.html`, find the `CONFIG` block near the top
   of the second `<script>` tag, and paste the URL into `SHEETS_WEBHOOK_URL`.

7. **Test.** Open `exam.html` in a browser, complete a short demo run, and
   confirm a row appears in the `Submissions` tab.

## Updating the script later

Apps Script web apps are versioned. After editing `Code.gs`, you must
`Deploy → Manage deployments → Edit (pencil) → New version → Deploy` for the
change to go live. The URL stays the same.

## Troubleshooting

- **Submission shows "Could not deliver results to the registrar"** → open the
  exam page's browser DevTools console. Most common causes: webhook URL is
  blank, URL has a typo, or the deployment access is set to "Only myself"
  instead of "Anyone".
- **Rows don't appear** → in Apps Script, `View → Executions` shows recent
  invocations and any errors thrown.
- **Quota** → Apps Script web apps allow ~20,000 calls/day per consumer
  account. Plenty of headroom for an exam.
