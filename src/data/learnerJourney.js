export const learnerJourneyTabs = [
  { id: 'practise', label: 'Practise', heading: 'One small practice step', body: 'Replay one sound. Point to its letter, then try the activity beneath the video. A grown-up can read the instructions aloud.' },
  { id: 'ask', label: 'Ask Roots', heading: 'Tell Roots what feels tricky', body: 'Choose a topic and open an email draft. You review and send it in your email app. This does not subscribe you to a mailing list.' },
  { id: 'continue', label: 'Continue', heading: 'Choose your next step', body: 'Keep practising with the free games, or explore the existing printable products. The PDF workbooks are separate from the recorded lesson series.' },
]

export const learnerQuestionTopics = [
  { id: 'learning', label: 'A learning question', subject: 'Roots learning question', prompt: 'Lesson or page link:\nThe part I would like help with:\n' },
  { id: 'purchase', label: 'A purchase or access question', subject: 'Roots purchase support', prompt: 'Product name:\nOrder reference, if available:\nWhat happened:\nPlease do not include card details or passwords.\n' },
  { id: 'school', label: 'A school or teaching question', subject: 'Roots school or teaching enquiry', prompt: 'School or teaching context:\nWhat support I am looking for:\n' },
]

export function learnerContactHref(topic) {
  return `mailto:roots@pathwayslearn.com?subject=${encodeURIComponent(topic.subject)}&body=${encodeURIComponent(`Hello Roots,\n\n${topic.prompt}\nThank you.`)}`
}
