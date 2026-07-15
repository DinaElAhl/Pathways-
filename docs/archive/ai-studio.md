---
original_route: /ai-studio
original_file: src/pages/AIStudio.jsx
deleted_at: 2026-07-15
deleted_in_commit: c865c46
reason: 'Non-functional "AI Studio". No API calls; outputs came from string templates + keyword expansion. Marketed as AI, was actually mad-libs. Removed in the credibility pass.'
---

# /ai-studio — Fake AI Studio for teachers

## Page header

- **Eyebrow:** AI Studio for Teachers
- **H1:** Draft lessons, quizzes, and rubrics in seconds.
- **Subhead:** Everything runs on your device. Student names and topics stay private — we never send your drafts to a third-party model.
- **Back link:** "← Back to dashboard" → `/dashboard`

## Three tabs

- 📘 Lesson plan
- ❓ Quiz generator
- 📋 Rubric builder

## Tab 1 — Lesson plan generator

### Form fields
- **Topic** (required, free text) — placeholder: "e.g. photosynthesis, the water cycle, for-loops"
- **Grade / Level** — dropdown: K · Grade 1–12 · University / Intro · Adult learners (default Grade 8)
- **Duration (minutes)** — number, 15–120 (default 45)
- **Learning objective** (optional textarea) — placeholder: "Leave blank to auto-generate from topic"
- **Submit:** "✨ Generate lesson plan"

### Output structure (rendered from `generateLessonPlan()` template)

The template split the total duration into 15% warm-up, 55% direct
instruction, 20% guided practice, remainder for closure.

- **Title:** `{Topic} — {grade}`
- **Learning objective** — if empty, auto: "By the end of the lesson, students will be able to explain {topic} and apply it to a new example."
- **Standards** (fixed list):
  - Next Generation Science Standards — depending on discipline
  - Common Core — Reading & Writing: CCSS.ELA-LITERACY.RST.6-8
  - CSTA K-12 CS Standards — 2-AP-10 (if CS)
- **Materials** (list of 4):
  - Student devices or printed worksheet
  - Projector / whiteboard
  - Exit ticket (one per student)
  - Vocabulary reference card for "{topic}"
- **Lesson structure** (4 phase cards):
  1. **Warm-up / Hook** — Show a short image or 60-second video related to {topic}. Ask students to write one thing they notice and one question they have. Collect 2-3 verbal responses.
  2. **Direct instruction** — Introduce {topic} using the Frayer model (definition, characteristics, example, non-example). Walk through 2 worked examples. Check for understanding with cold-call questions at {1/3 mark} and {2/3 mark} minutes.
  3. **Guided practice** — Students work in pairs on 3 scaffolded problems about {topic}. Circulate and use the "3 before me" rule — students consult each other before asking the teacher.
  4. **Closure & exit ticket** — Students write a 1-2 sentence summary of {topic} and one lingering question on their exit ticket. Teacher uses these to plan the next lesson.
- **Differentiation** (3 cards: Support · Extension · Language learners) — templates parameterized on `{topic}`
- **Assessment** — Formative: "Cold-call questions, exit ticket, teacher observation of pair work." · Summative: "Quiz at the end of the unit covering {topic} at Remember, Understand, and Apply levels."
- **Homework** — "15-20 minutes — find one real-world example of {topic} and write 3 sentences: what it is, where you saw it, and why it matters."

### Output actions
- **Print / PDF** button (uses `window.print()`)
- **Copy JSON** button (uses `navigator.clipboard.writeText`)

## Tab 2 — Quiz generator

### Form fields
- **Topic** (required) — placeholder: "e.g. cell division, the French Revolution, supply and demand"
- **Number of questions** — 3–20 (default 5)
- **Target Bloom level** — dropdown: Remember · Understand · Apply · Analyze · Evaluate · Create (default Understand)
- **Submit:** "✨ Generate quiz"

### Output
- Rendered as an ordered list with per-question Bloom tag badges (violet).
- Options shuffled with `Math.random()` in the correct-answer position.
- Toggle button: "Show / Hide answer key" — when shown, correct option highlighted in green + "✓ Correct answer: {answer}" note.
- Print button.

### Question templates (8, cycled with modulo)

All templates parameterized on `{topic}`:

1. Q: "What is {topic}?" · correct: "A concept that describes {topic} in its simplest form" · distractors: [An unrelated idea, The opposite of {topic}, A type of measurement tool]
2. Q: "Which of the following is the BEST example of {topic}?" · correct: "A real-world case where {topic} directly applies" · distractors: [A case involving a different concept, A historical event unrelated to {topic}, A mathematical operation]
3. Q: "Which statement about {topic} is TRUE?" · correct: "{Topic} can be observed and described" · distractors: [{Topic} never changes over time, Only scientists can study {topic}, {Topic} was only discovered recently]
4. Q: "Why is {topic} important to understand?" · correct: "It helps us make sense of related phenomena" · distractors: [It is only important in one country, It has no practical application, It is required for a driver's license]
5. Q: "A classmate claims {topic} is the same as a common misconception. How should you respond?" · correct: "Explain the difference using a clear example" · distractors: [Agree to avoid an argument, Ignore the claim, Ask the teacher to punish them]
6. Q: "Which tool or method would help you study {topic}?" · correct: "Observation and note-taking with a clear protocol" · distractors: [Guessing, Random surveys, Unsupported opinion]
7. Q: "How does {topic} relate to everyday life?" · correct: "It appears in situations we encounter regularly" · distractors: [It only appears in textbooks, It is not relevant outside the classroom, It is purely theoretical]
8. Q: "What is a common misconception about {topic}?" · correct: "That it is always simple and never involves exceptions" · distractors: [That it is measurable, That it can be taught, That it has a definition]

## Tab 3 — Rubric builder

### Form fields
- **Assignment name** (required) — placeholder: "e.g. Persuasive essay on climate change"
- **Criteria** (comma-separated, optional) — placeholder: "e.g. Thesis, Evidence, Organization, Conventions"
  - If empty, defaults to: `['Content', 'Organization', 'Evidence', 'Mechanics']`
- **Submit:** "✨ Generate rubric"

### Output — 4-level rubric table

Columns: Criterion | Exemplary (4) | Proficient (3) | Developing (2) | Beginning (1)

Cell templates (parameterized on `c` = criterion, lowercased):
- **Exemplary (4):** "Demonstrates sophisticated understanding of {c}. Goes beyond expectations with original insight."
- **Proficient (3):** "Meets expectations for {c} with minor errors that do not affect overall quality."
- **Developing (2):** "Partial understanding of {c}. Some evidence present but inconsistent."
- **Beginning (1):** "Limited evidence of {c}. Requires significant revision."

## Bloom's taxonomy list (module constant)

`const BLOOMS = ['Remember','Understand','Apply','Analyze','Evaluate','Create']`
