---
original_route: /join
original_file: src/pages/Join.jsx
deleted_at: 2026-07-15
deleted_in_commit: c865c46
reason: 'Fake classroom-join demo. Three hardcoded demo classes with fictional teachers. The "AI tutor" was a keyword-based if/else chain returning canned strings. Removed in the credibility pass.'
---

# /join — Fake classroom-join flow

## Landing form

- **Icon:** 🎒
- **H1:** Join your classroom
- **Subhead:** Enter the join code your teacher gave you.
- Input: uppercase-tracked join code field
- Submit: "Join classroom →"
- Below the form: "Demo codes:" three clickable code buttons — CSD-2P · DL-4P · AI-CLUB
- Back link: "← Back to Pathways"

### Error message (on invalid code)

"That join code does not match any classroom. Try CSD-2P, DL-4P, or AI-CLUB to see a demo."

## Hardcoded demo classes (`demoClasses`)

### CSD-2P · 💻 · Period 2 — CS Discoveries
- **Teacher:** Ms. Rivera
- **Pathway:** K-12 Computer Science
- **Announcement:** "Reminder: bring headphones for Wednesday's coding lab."
- **Assignments:**
  - Week 4 — Loops quiz · Due Apr 22 · open
  - Project: Build a calculator · Due Apr 28 · open
  - Week 3 — Variables worksheet · Due Apr 15 · submitted

### DL-4P · 📊 · Period 4 — Data Literacy
- **Teacher:** Mr. Chen
- **Pathway:** Data Literacy
- **Announcement:** "We start hypothesis testing next week — review chapter 5."
- **Assignments:**
  - Reading charts worksheet · Due Apr 20 · submitted
  - Mini-project: Survey your class · Due Apr 26 · open

### AI-CLUB · 🤖 · After-school — AI Club
- **Teacher:** Ms. Rivera
- **Pathway:** AI Fundamentals
- **Announcement:** "Field trip to the university AI lab on May 10 — sign up by Monday!"
- **Assignments:**
  - Train an image classifier · Due Apr 30 · open
  - Read: "What is a neural network?" · Due Apr 19 · submitted

## Post-join classroom view

Layout:
- Gradient banner (indigo → violet): emoji, class name, "Taught by {teacher} · {pathway}", announcement in a translucent card
- Left card: "Your assignments" — list of assignments with green/amber status pills
- Right card: `<AITutor pathway={pathway} />`
- Top-left: "← Leave classroom" button

## The fake AI tutor

`<AITutor>` component — chat UI presenting itself as an "on-device AI tutor" with the reassurance "Your messages stay on this device. They never train any model."

Its `reply(userMsg)` function was a plain keyword-lookup:

- Contains "loop" or "iteration" → "A loop repeats code. The most common is a for-loop: 'for i in range(5): print(i)'. Try changing the 5 to 10 and see what happens!"
- Contains "variable" → "A variable is a named container for a value. Like a labelled box — you can put something in, take it out, or replace what's inside."
- Contains "neural" or "network" → "A neural network is a stack of simple math functions ('neurons'). Each one learns a tiny rule; together they learn the overall pattern."
- Contains "chart" or "graph" → "When you look at a chart, always check: 1) what the axes measure, 2) the scale, and 3) whether the source is trustworthy."
- Contains "help" → "Sure! Tell me what topic you're stuck on — a specific word or example from the lesson works best."
- Otherwise: "Great question about '{userMsg}'. Try explaining it back in your own words — that usually helps you see if you really understand it. What part is confusing?"

Initial welcome message: "Hi! I'm your {pathway} tutor. Ask me anything about today's lesson."

## Nav impact

The "Get started" primary CTA in `Navbar.jsx` header buttons + mobile menu
previously routed to `/join`. Now routed to `/for-schools` and relabeled
"For schools".
