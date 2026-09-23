// Bookable conversations — rendered by src/pages/Book.jsx (/book).
//
// TODO: replace with Cal.com URL — Dina will provide roots.cal.com or similar
// once account is created. Set CAL_BASE_URL to the account URL and give each
// event its `calSlug` (the event type's slug in Cal.com). Until then every
// "Book →" button falls back to an email request, so no button on the live
// site is a dead link.
export const CAL_BASE_URL = '' // e.g. 'https://cal.com/roots'

export const BOOKING_EMAIL = 'roots@pathwayslearn.com'

export const bookingEvents = [
  {
    key: 'discovery',
    title: 'Free discovery call',
    minutes: 15,
    price: 0,
    audience: 'Anyone',
    description: 'A short first conversation: tell us what you are looking for and we will point you to the right place in Roots.',
    calSlug: 'discovery', // TODO: confirm against the Cal.com event slug
  },
  {
    key: 'parent-consult',
    title: 'Parent consult call',
    minutes: 30,
    price: 100,
    audience: 'Parents',
    description: 'Plan your child’s Qur’an and Arabic learning at home: where to start, what to use, and how to keep it going.',
    calSlug: 'parent-consult', // TODO: confirm against the Cal.com event slug
  },
  {
    key: 'strategy',
    title: 'Roots strategy call',
    minutes: 45,
    price: 150,
    audience: 'Teachers & educators',
    description: 'For teachers, tutors and program leads: how to teach with Roots, pace a group, and use the exams well.',
    calSlug: 'strategy', // TODO: confirm against the Cal.com event slug
  },
  {
    key: 'curriculum-audit',
    title: 'Curriculum audit for schools',
    minutes: 60,
    price: 300,
    audience: 'Schools',
    description: 'We look at your current Arabic and Qur’an program alongside Roots and the CEFR, and talk through the gaps and the next steps.',
    calSlug: 'curriculum-audit', // TODO: confirm against the Cal.com event slug
  },
  {
    key: 'partnership',
    title: 'School partnership deep-dive',
    minutes: 90,
    price: 500,
    audience: 'Schools',
    description: 'For leadership teams ready to adopt Roots: scope, levels, pacing, teacher onboarding and a licensing plan shaped to your school.',
    calSlug: 'partnership', // TODO: confirm against the Cal.com event slug
  },
]

export function getBookingEvent(key) {
  return bookingEvents.find((e) => e.key === key)
}

export function formatPrice(price) {
  return price === 0 ? 'Free' : `$${price}`
}

// Where a "Book →" button goes. Cal.com once configured; an email request until then.
export function bookingHref(event) {
  if (CAL_BASE_URL && event.calSlug) return `${CAL_BASE_URL.replace(/\/+$/, '')}/${event.calSlug}`
  const subject = `Booking request: ${event.title} (${event.minutes} min)`
  const body =
    `Hello,\n\nI would like to book a ${event.title.toLowerCase()} (${event.minutes} min, ${formatPrice(event.price)}).\n\n` +
    `Name:\nTime zone:\nA few times that suit me:\nWhat I would like to talk about:\n\nThank you.`
  return `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const isCalConfigured = () => CAL_BASE_URL.length > 0
