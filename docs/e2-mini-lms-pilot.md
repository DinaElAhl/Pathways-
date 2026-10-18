# E² Mini LMS working pilot

Route: `/e2-mini`. Accessible from EduHub, the More menu, Teacher Studio and the
monthly membership proposal.

This is a device-only teaching workspace with a functioning manual file
handoff. It is not an authenticated, multi-user online LMS. It adds no backend,
payment collection, learner email, cloud storage or automatic invitation.

## Teacher workflow

1. Create a class. Choose the subject, ES/MS/HS group and Roots stage, or General
   for another subject. Add learner codes rather than names/contact details.
2. Create a lesson with an objective, learner instructions and an optional HTTPS
   video/PDF link. E² Hook / Teach / Practice / Connect / Reflect notes are kept
   in the teacher workspace and excluded from learner exports.
3. Mark the lesson ready. Set an assignment, optional due date and points range.
4. Choose a learner code and download a learning pack. Each export gets its own
   identifier and contains only that learner's code, public lesson and task.
5. Share the JSON file through an existing class channel. The learner opens
   `/e2-mini` on their device, chooses Learner file view, imports it, writes an
   answer and downloads a response file to return manually.
6. Import the returned response under Feedback, mark it yourself and save a
   constructive next step. Download its feedback file for the learner to open.

Learner answers are not autosaved. The teacher workspace saves on successful
form submission. No file is emailed or uploaded by this flow. Downloaded
backups include the teacher's records and should not be shared as learner packs.

## Record handling

- Browser storage key: `roots_e2_mini_workspace_v1`; schema version 1.
- Workspace backup, learner pack, response and feedback files have distinct
  formats. Import validates format, bounds, references and matching issued pack.
- A learner's submitted score/feedback fields are discarded. Teacher marking is
  the only source of scores inside this workflow. This is not authentication:
  files are editable and should not be used for high-stakes competition results.
- Issued packs snapshot their question and point range. Later teacher edits do
  not silently change a task already sent to a learner.
- A duplicate response cannot overwrite a review. For a revision, issue a new
  pack. Progress uses the latest imported response per assignment/learner pair,
  so revisions do not inflate completion counts.
- Workspace restore validates first, then asks before replacing local records.
  Invalid imports and storage failures leave the previous saved record intact.
- A malformed saved workspace is not silently reset or overwritten. A recovery
  download is available; a valid backup can then be restored.
- Limits: 30 classes, 100 codes/class, 200 lessons, 300 assignments, 500 issued
  packs, 500 responses and 2 MB per saved workspace/import file. Browser quota
  limits can be lower. Download backups regularly.
- Existing Teacher Studio storage is separate and unchanged. A linked game
  does not automatically submit its score into the Mini LMS.

## Before a shared LMS or paid subscription

Add and verify real teacher/learner accounts, tenant/role permissions, private
server storage, secure resource delivery, account recovery and consent flows
appropriate to the audience. Then implement online assignments, submissions,
feedback and notifications. Subscription billing needs verified entitlements,
renewal/cancellation handling and tested access expiry. No browser flag or
client-only route can protect paid access.

## Validation

`node --test tests/e2-mini.test.mjs` covers the complete file round trip, teacher
grading, privacy of exports, record references, revisions, snapshots and backup
validation. `npm run build` must pass before deployment.

The isolated browser check `.work/check-e2-mini.mjs` exercises the real forms,
downloads, file imports, marking, feedback return, reload persistence, duplicate
rejection, confirmed backup restore, quota failure and 390px mobile layout.
Test records never use the visitor's existing browser workspace.
