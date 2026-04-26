undefined// Suggestion phrases for the E² Teaching Framework slots.
// Click a phrase to copy it; paste into the matching slot in the embedded tool.

export const e2ToolMeta = {
  slug: 'e2-teaching',
  title: 'E² Teaching Framework',
  tagline: 'Every Student Has the Right to Understand — your complete teaching companion.',
  intro:
    "A lesson-planning, blueprint, and reflection tool built around the belief that struggle is a signal, not a verdict. Each slot below has ready-made phrases you can copy, edit, and paste — starter language for teachers who don't want to face a blank box.",
  toolUrl: 'https://dinaelahl.github.io/desktop-tutorial/e2-complete-app.html',
};

export const e2Sections = [
  {
    name: 'Lesson Information',
    slots: [
      { label: 'Subject', phrases: ['Mathematics', 'Arabic', 'Qurʿān & Tajwīd', 'Science (Roots Method)', 'History', 'English language arts', 'Art & beauty (re-rooted)'] },
      { label: 'Grade Level', phrases: ['Grade 3', 'Grade 5', 'Grade 7', 'Grade 9', 'Mixed-age halaqah', 'Adult learners'] },
      { label: 'Topic / Unit', phrases: [
        'Fractions — unit 2',
        'Surah al-Fatihah — meaning & recitation',
        'The water cycle as āyah',
        'Ibn al-Haytham’s method of seeing',
        'Justice in trade — ribah and barakah',
      ] },
      { label: 'Duration', phrases: ['30 min', '45 min', '60 min', 'Two 30-min blocks'] },
      { label: 'Learning Objectives', phrases: [
        'SWBAT explain the concept in their own words and give one real-life example.',
        'SWBAT solve 5 problems independently and check their reasoning.',
        'SWBAT recite the passage with correct tajwīd and name one adab from it.',
        'SWBAT design a small experiment and predict its outcome.',
        'SWBAT name where this knowledge points back to its Source.',
      ] },
    ],
  },
  {
    name: '5-Part Blueprint (Pillar 1)',
    slots: [
      { label: 'Hook — grab attention in the first 2 minutes', phrases: [
        'Open with a real puzzle: "Here’s something that shouldn’t work — but does. Why?"',
        'Show one image and ask: "What do you notice? What do you wonder?"',
        'Start with a story from the sīrah or a scholar’s life that opens the topic.',
        'Pose a question they cannot yet answer — and promise we’ll answer it together.',
        'Bring an object. Pass it around. Don’t explain it yet.',
      ] },
      { label: 'Teach — deliver the core content', phrases: [
        'I model first, thinking aloud step by step. Then we do one together. Then they try.',
        'Chunk into three parts; check understanding after each chunk before moving on.',
        'Anchor the new idea to a known idea: "This is like… except…"',
        'Read one short passage, paraphrase it, and ask three students to paraphrase back.',
        'Use a visible map (board / chart / handout) so students can see the whole shape.',
      ] },
      { label: 'Practice — what students do', phrases: [
        'Guided practice (3 problems together) → partner practice (3) → independent (3).',
        'Pair-share: each student explains the idea in their own words to a partner.',
        'Worked example with one mistake — students find and correct it.',
        'Mini-lab in groups of 3 with a single clear question to answer.',
        'Write your own example of this concept — swap with a neighbor and check.',
      ] },
      { label: 'Connect — link to real life', phrases: [
        'Where do you see this at home, in the masjid, in the market?',
        'Which of Allah’s Names does this knowledge point to?',
        'How would a person without this skill be at a disadvantage today?',
        'Tell a story of a scholar who used this knowledge for good.',
        'Ask a parent tonight where this comes up in their work.',
      ] },
      { label: 'Reflect — how students show understanding', phrases: [
        'Exit ticket: one sentence — "Today I learned… and I’m still wondering…"',
        '3-2-1: 3 things I learned, 2 questions I have, 1 thing I’ll try.',
        'One-minute paper: explain the concept to a sibling at home.',
        'Self-rate 1–5 on the objective and write what you’d need to reach 5.',
        'Close with duʿā of seeking beneficial knowledge.',
      ] },
    ],
  },
  {
    name: 'Differentiation (Pillar 2)',
    slots: [
      { label: 'Auditory Strategies', phrases: [
        'Read instructions aloud and have students repeat the key step.',
        'Use call-and-response for definitions or rules.',
        'Provide an audio recording of the reading for re-listening at home.',
        'Pair talk: students explain steps to each other before writing.',
      ] },
      { label: 'Visual Strategies', phrases: [
        'Anchor chart on the board with the day’s key terms and one example.',
        'Color-code steps: green = given, yellow = working, red = answer.',
        'Provide a one-page graphic organizer for note-taking.',
        'Show a short labeled diagram before any verbal explanation.',
      ] },
      { label: 'Kinesthetic Strategies', phrases: [
        'Stand-up sort: students physically arrange cards on the wall.',
        'Hand signals for agree / disagree / not sure during discussion.',
        'Build a model with manipulatives before using symbols.',
        'Walk-around gallery: each station has one problem; rotate every 4 minutes.',
      ] },
      { label: 'Support for Struggling Learners', phrases: [
        'Provide a worked example next to the practice problems.',
        'Reduce the number of items but keep the cognitive level the same.',
        'Sentence stems for written responses: "This works because…"',
        'Pair with a thoughtful peer who explains, not just tells the answer.',
        'Confer 1:1 for two minutes during independent practice.',
      ] },
      { label: 'Extension for Advanced Learners', phrases: [
        'A challenge problem that requires applying the idea in a new domain.',
        '"Teach back" task: write a 4-step explanation a younger student could follow.',
        'Open-ended investigation with multiple valid answers.',
        'Connect today’s topic to a historical Muslim scholar who worked on it.',
      ] },
      { label: 'Cultural Connections', phrases: [
        'Use names, places, and examples from the students’ own communities.',
        'Surface the contribution of a Muslim scholar tied to today’s topic.',
        'Invite students to bring an example from their family’s tradition.',
        'Read one verse or hadith that relates to the lesson’s theme.',
      ] },
    ],
  },
  {
    name: 'Engagement — 6 Levers (Pillar 3)',
    slots: [
      { label: 'Curiosity', phrases: [
        'Open with a question they can’t Google fast.',
        'Show two outcomes and ask: "Which one is right — and why?"',
        'Begin with a one-line mystery and reveal it at the end of the lesson.',
        'Bring an unexpected object that connects to the topic.',
      ] },
      { label: 'Active Participation', phrases: [
        'Every student writes/answers something in the first 5 minutes.',
        'Cold-call with care: name first, question second, wait time third.',
        'Whiteboards or mini-slates so every answer is visible.',
        'Think-pair-share — 90 seconds each — before any whole-class answer.',
      ] },
      { label: 'Purpose', phrases: [
        'State explicitly: "By the end of class, you will be able to…"',
        'Tie the lesson to one of Allah’s Names or to an āyah.',
        'Show how today’s skill is used in a real job or service.',
        'Ask: "Who will benefit from you knowing this well?"',
      ] },
      { label: 'Feedback', phrases: [
        'Two stars and a wish: two things working, one to improve.',
        'Live feedback during practice with a single focus point.',
        'Peer feedback using a clear rubric — not just "good job."',
        'End with a 30-second specific praise to one student’s effort.',
      ] },
      { label: 'Gamification', phrases: [
        'Team points for thoughtful questions, not just right answers.',
        'A "mistake of the day" the class hunts for in worked examples.',
        'Levels: bronze (recall), silver (apply), gold (create).',
        'Beat-the-clock challenge with a fair, achievable target.',
      ] },
      { label: 'Routine & Novelty', phrases: [
        'Same opener structure every day; different content inside it.',
        'One "surprise element" a week (object, guest, location change).',
        'Predictable closer (duʿā, exit ticket, reflection sentence).',
        'Rotate roles weekly so students experience variety within structure.',
      ] },
    ],
  },
  {
    name: 'Classroom Culture (Pillar 4)',
    slots: [
      { label: 'Relationship Moment', phrases: [
        'Greet every student by name at the door.',
        'A 2x10: 2 minutes of personal conversation for 10 days with one student.',
        'Note one strength you saw and tell the student privately.',
        'Ask: "Is everything okay at home?" to one student you’re worried about.',
      ] },
      { label: 'Norms Reinforcement', phrases: [
        'Re-read class norms aloud once a week and ask which we lived best.',
        'Catch-them-being-good: name the norm a student just modeled.',
        'Use "we" language: "we listen when one speaks."',
        'Repair quickly and quietly when a norm is broken.',
      ] },
      { label: 'Restorative Approach', phrases: [
        'After conflict: ask each student what happened, what they felt, what they need.',
        'Repair conversation, not punishment-first.',
        'Co-create a small commitment for next time.',
        'End with "I still believe in you, and I’ll help you live up to it."',
      ] },
    ],
  },
  {
    name: 'Assessment',
    slots: [
      { label: 'Formative Assessment Method', phrases: [
        'Exit ticket with one objective-aligned question.',
        'Cold-call sample of 5 students at varied levels mid-lesson.',
        'Quick whiteboard check after the model and after guided practice.',
        'One-minute write to a focused prompt.',
        'Student self-rating against the objective.',
      ] },
      { label: 'Success Criteria', phrases: [
        'I can explain the concept in my own words with one example.',
        'I can solve 4 of 5 problems correctly without help.',
        'I can recite/read with no major errors and explain one meaning.',
        'I can teach this idea to a younger student in 3 sentences.',
        'I can name one of Allah’s Names that this points to.',
      ] },
    ],
  },
  {
    name: 'Materials & Tech',
    slots: [
      { label: 'Materials Needed', phrases: [
        'Whiteboards & markers for every student',
        'Printed handout (one per pair) with the worked example',
        'Manipulatives (cubes / counters / fraction strips)',
        'Mushaf / printed āyah handout',
        'Anchor chart paper',
      ] },
      { label: 'Technology Tools', phrases: [
        'Short video clip (≤3 min) for the hook',
        'Document camera to model student work',
        'Quizlet / Kahoot for retrieval practice',
        'Padlet for collecting questions and reflections',
        'Audio recording of the recitation for home practice',
      ] },
      { label: 'Links & Resources', phrases: [
        'Pathways — Roots of Knowledge: /roots',
        '5dthinking.org — reference reading',
        'Muṣḥaf resource: ',
        'Worksheet PDF link:',
        'Classical text reference:',
      ] },
    ],
  },
  {
    name: 'Practice Self-Check (Checklist)',
    slots: [
      { label: 'Daily teaching habits to affirm', phrases: [
        'I start lessons with an engaging hook.',
        'I chunk content into digestible parts.',
        'I include guided AND independent practice.',
        'I connect lessons to real life.',
        'I end with reflection or exit tickets.',
        'I scaffold complex tasks.',
        'I address auditory, visual, and kinesthetic learners.',
        'I provide tiered support and challenge.',
        'I honor cultural diversity.',
        'I tie at least one lesson per week to tawḥīd.',
      ] },
    ],
  },
];
