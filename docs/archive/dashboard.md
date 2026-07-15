---
original_route: /dashboard
original_file: src/pages/Dashboard.jsx
deleted_at: 2026-07-15
deleted_in_commit: c865c46
reason: 'Fake teacher dashboard. Hardcoded students, hardcoded "Ms. Rivera" greeting, static bar chart values. Nothing was persisted server-side — used localStorage as demo state.'
---

# /dashboard — Fake teacher dashboard

## Page header

- **Eyebrow:** Teacher dashboard
- **H1:** Good afternoon, Ms. Rivera 👋
- **Subhead:** Here's what's happening across your classrooms.
- **Header buttons:** "✨ AI Studio" → `/ai-studio`  ·  "+ New classroom" (opens a `prompt()` for the name)

## Top stat cards (4)

- **Classrooms** — trend: "+1 this week"
- **Students** — trend: "92% active today"
- **Average grade** (indigo)
- **Students at risk** (red) — trend: "Review now →"

Values computed from the hardcoded `seedClassrooms` array.

## Hardcoded classrooms (`seedClassrooms`)

### c1 · Period 2 — CS Discoveries · code CSD-2P · 💻
- Grade 8 · 26 students · pathway `k12-computer-science`
- Average grade 87% · Attendance 94%
- Students (6):
  - Aiden K. — grade 92, progress 78, risk low
  - Bisan H. — grade 71, progress 45, risk high (Missed 3 assignments)
  - Carla M. — grade 88, progress 82, risk low
  - Diego R. — grade 65, progress 38, risk high (Struggling with loops)
  - Ella T. — grade 95, progress 91, risk low
  - Fawaz S. — grade 78, progress 62, risk medium

### c2 · Period 4 — Data Literacy · code DL-4P · 📊
- Grade 9 · 22 students · pathway `data-literacy`
- Average grade 82% · Attendance 89%
- Students (4):
  - George L. — grade 88, progress 70, risk low
  - Hana J. — grade 74, progress 55, risk medium
  - Ismail O. — grade 68, progress 42, risk high (Low quiz scores)
  - Jana B. — grade 91, progress 85, risk low

### c3 · After-school — AI Club · code AI-CLUB · 🤖
- Mixed grade · 14 students · pathway `ai-fundamentals`
- Average grade 91% · Attendance 97%
- Students (3):
  - Kareem P. — grade 94, progress 88, risk low
  - Lina W. — grade 89, progress 80, risk low
  - Mahmoud N. — grade 96, progress 95, risk low

## Hardcoded assignments (`seedAssignments`)

| classroom | title | due | submitted / total | graded |
|---|---|---|---|---|
| c1 | Week 4 — Loops quiz | 2026-04-22 | 19/26 | 12 |
| c1 | Project: Build a calculator | 2026-04-28 | 8/26 | 0 |
| c2 | Reading charts worksheet | 2026-04-20 | 22/22 | 22 |
| c3 | Train an image classifier | 2026-04-30 | 6/14 | 0 |

## Weekly engagement bar chart

Static values: Mon 78 · Tue 92 · Wed 84 · Thu 96 · Fri 71.

## Layout

- Left sidebar: classroom list (clickable buttons switch `activeId`)
- Main panel: active classroom name/code/average · engagement bar chart · assignments list · student roster table with grade / progress bar / risk badge

## Risk badge colors

- high: red
- medium: amber
- low: green

## State persistence

Classrooms + assignments were persisted to `localStorage` under keys
`pw-classrooms` and `pw-assignments`. The "+ New classroom" button used
a `prompt()` and generated a random join code with `Math.random().toString(36)`.
