export const videoActivities = {
  introduction: {
    title: 'Ready to grow?',
    description: 'A parent or teacher can read these aloud. This checks the learning routine, not Arabic pronunciation.',
    questions: [
      { prompt: 'What do we do when we hear a new sound?', choices: ['Listen, then have a turn', 'Rush past it', 'Only read the English'], answer: 0, explanation: 'Listen carefully, pause the video, and try the Arabic sound.' },
      { prompt: 'Do you need to know Arabic before Level C?', choices: ['Yes, every letter', 'No — we start together'], answer: 1, explanation: 'Level C begins with sounds and letters. You can start with no Arabic.' },
      { prompt: 'A sound feels tricky. What can we do?', choices: ['Never try again', 'Replay and practise slowly'], answer: 1, explanation: 'Replay the example and take a small turn. Ask a teacher for help when needed.' },
    ],
    practice: 'Choose one sound from the introduction. Replay it, listen, and copy it together.',
  },
  'lesson-1': {
    title: 'Dot detectives!',
    description: 'Look closely, then tap a letter. A grown-up can read the questions aloud.',
    questions: [
      { prompt: 'Find the letter with ONE dot BELOW.', choices: ['ت', 'ب', 'ث'], answer: 1, explanation: 'ب has one dot below. That is bāʾ, the B sound.' },
      { prompt: 'Find the letter with TWO dots ABOVE.', choices: ['ث', 'ب', 'ت'], answer: 2, explanation: 'ت has two dots above. That is tāʾ, the T sound.' },
      { prompt: 'Find the letter with THREE dots ABOVE.', choices: ['ث', 'ت', 'ب'], answer: 0, explanation: 'ث has three dots above. That is thāʾ, the TH sound as in “think”.' },
      { prompt: 'Which letter matches the B sound in “ball”?', choices: ['ب', 'ث', 'ت'], answer: 0, explanation: 'ب matches the B sound. Replay the lesson to hear the Arabic example.' },
      { prompt: 'Which letter matches TH in “think”?', choices: ['ت', 'ث', 'ب'], answer: 1, explanation: 'ث matches TH in “think”. English words are memory helpers; copy the Arabic model in the video.' },
    ],
    practice: 'Point to ب ت ث and copy each sound from the lesson. This activity checks recognition; a teacher should help check pronunciation.',
  },
}
