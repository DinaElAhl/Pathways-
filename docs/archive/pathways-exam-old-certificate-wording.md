---
original_file: src/pages/PathwaysExam.jsx
changed_at: 2026-07-15
changed_in_commit: c865c46
reason: 'Printed certificate claimed "Authorised Examiner" status and a step card promised a "certified CEFR proficiency level" while formal accreditation is not in place. Softened to "Accreditation in progress" wording.'
---

# /pathways-exam — old certificate wording

## Printed certificate footer (line 481)

**Was:**

```html
<div class="footer">
  <div class="sig">Pathways Education<br/>Authorised Examiner</div>
  <div class="center" style="font-size:11px;color:#aaa">Issued: ${date}</div>
  <div class="sig">RAQP Certification<br/>Official Record</div>
</div>
```

**Now:**

```html
<div class="footer">
  <div class="sig">Pathways Education<br/>Accreditation in progress</div>
  <div class="center" style="font-size:11px;color:#aaa">Issued: ${date}</div>
  <div class="sig">RAQP Certificate of Completion</div>
</div>
```

## Step-card description (line 533)

**Was:**

```js
{ icon:'🏆', color:'#58cc02', title:'Certificate', desc:'Print your certified CEFR proficiency level' }
```

**Now:**

```js
{ icon:'🏆', color:'#58cc02', title:'Certificate', desc:'Print your CEFR proficiency level (accreditation in progress)' }
```

## Full title of the printed HTML (unchanged, for reference)

Line 469 kept the printed window title:

```js
w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>RAQP Certificate</title>
```

Line 474 kept the printed h1:

```html
<div class="title-en">Pathways Arabic &amp; Quran Proficiency Certificate — RAQP</div>
```

To restore the "Authorised Examiner" wording: only do so once an
actual accrediting body has authorised Dina as an examiner and there
is documentation to point at.
