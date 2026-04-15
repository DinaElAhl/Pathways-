// Events — webinars, workshops, and community meetups.
// Dates are ISO strings so they're easy to sort and format.
export const eventTypes = ['Webinar', 'Workshop', 'Meetup', 'Office hours']

export const events = [
  {
    slug: 'ai-in-the-classroom-panel',
    title: 'AI in the classroom — a practical panel',
    type: 'Webinar',
    audiences: ['teachers', 'schools', 'educators'],
    start: '2026-05-06T17:00:00Z',
    durationMin: 60,
    location: 'Online · Zoom',
    host: 'Pathways research + 3 guest teachers',
    capacity: 500,
    seatsTaken: 312,
    price: 'Free',
    summary:
      'Three working teachers share what\u2019s actually helping them — and what didn\u2019t. Q&A with the audience.',
    agenda: [
      'What changed in our classrooms this term',
      'Three assignments redesigned for the AI era',
      'Policy, parents, and staying human',
      'Live Q&A',
    ],
  },
  {
    slug: 'lesson-planning-clinic',
    title: 'Lesson planning clinic — bring a unit',
    type: 'Workshop',
    audiences: ['teachers'],
    subjects: ['Lesson planning'],
    start: '2026-05-14T15:00:00Z',
    durationMin: 90,
    location: 'Online · Zoom',
    host: 'Ms. Aguilar · Curriculum Lead',
    capacity: 40,
    seatsTaken: 29,
    price: 'Free',
    summary:
      'A working session: bring a unit you\u2019re stuck on, leave with a plan. Small-group feedback and templates included.',
    agenda: [
      'Warm-up: one sticky problem per teacher',
      'Template walk-through',
      'Small-group critique and rework',
      'Share-out and next steps',
    ],
  },
  {
    slug: 'family-reading-night',
    title: 'Family reading night (online)',
    type: 'Meetup',
    audiences: ['parents'],
    start: '2026-04-28T19:00:00Z',
    durationMin: 45,
    location: 'Online · cozy Zoom room',
    host: 'Literacy Lab',
    capacity: 150,
    seatsTaken: 82,
    price: 'Free',
    summary:
      'A warm, low-key reading hour for families. Tips, book picks, and a read-along — kids welcome in pajamas.',
    agenda: [
      'Three book picks for different ages',
      'Read-along moment',
      'Q&A with educators',
    ],
  },
  {
    slug: 'district-partnership-office-hours',
    title: 'District partnership office hours',
    type: 'Office hours',
    audiences: ['schools'],
    start: '2026-05-02T14:00:00Z',
    durationMin: 45,
    location: 'Online · drop-in',
    host: 'Pathways for Institutions',
    capacity: 20,
    seatsTaken: 6,
    price: 'Free',
    summary:
      'Drop-in session for district leaders thinking about piloting Pathways. Come with your questions.',
    agenda: [
      'How partnerships work',
      'Rollout playbooks',
      'Live Q&A',
    ],
  },
  {
    slug: 'mentor-storytime',
    title: 'Mentor storytime — how to ask for help',
    type: 'Webinar',
    audiences: ['learners', 'educators'],
    start: '2026-05-21T18:00:00Z',
    durationMin: 50,
    location: 'Online · Zoom',
    host: 'Pathways mentor network',
    capacity: 300,
    seatsTaken: 124,
    price: 'Free',
    summary:
      'Three mentors and three mentees share the real stories behind their growth. Plus: how to ask great questions.',
    agenda: [
      'Three pairs, three stories',
      'What great mentees do',
      'Live Q&A',
    ],
  },
  {
    slug: 'teacher-founders-meetup',
    title: 'Teacher–founders meetup (in-person, Lisbon)',
    type: 'Meetup',
    audiences: ['teachers', 'educators'],
    start: '2026-06-07T17:30:00Z',
    durationMin: 120,
    location: 'Lisbon, PT · Pathways studio',
    host: 'Pathways community',
    capacity: 30,
    seatsTaken: 18,
    price: 'Free',
    summary:
      'A small, honest evening with teachers building new things alongside their classrooms.',
    agenda: [
      'Welcome + intros',
      'Lightning talks from three teacher-founders',
      'Open conversation + snacks',
    ],
  },
]

export function getEvent(slug) {
  return events.find((e) => e.slug === slug)
}

export function formatEventDate(iso) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}

export function formatEventDateShort(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
