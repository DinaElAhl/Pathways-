// Bookable sessions — rendered by src/pages/Book.jsx (/book).
//
// The booking account itself lives in src/config/booking.js. An event with a
// `calendly` key that resolves there is live and books through Calendly; every
// other event shows as "coming soon" with an email request as its placeholder
// link, so no button on the live site is dead. To make one live: create the
// event type in Calendly, add its slug to EVENT_TYPES, and set `calendly` here.
import { calendlyUrl } from '../config/booking.js'

export const BOOKING_EMAIL = 'roots@pathwayslearn.com'

export const bookingEvents = [
  {
    key: 'class',
    title: 'Arabic & Qur’an class — Levels C, B, A',
    audience: 'Learners',
    description: 'A live Arabic and Qur’an class taught through the Roots tracks: Level C, Level B and Level A. Pick your level and a time that suits you.',
    calendly: 'class_cba',
  },
  {
    key: 'discovery',
    title: 'Free discovery call',
    minutes: 15,
    price: 0,
    audience: 'Anyone',
    description: 'A short first conversation: tell us what you are looking for and we will point you to the right place in Roots.',
  },
  {
    key: 'parent-consult',
    title: 'Parent consult call',
    minutes: 30,
    price: 100,
    audience: 'Parents',
    description: 'Plan your child’s Qur’an and Arabic learning at home: where to start, what to use, and how to keep it going.',
  },
  {
    key: 'strategy',
    title: 'Roots strategy call',
    minutes: 45,
    price: 150,
    audience: 'Teachers & educators',
    description: 'For teachers, tutors and program leads: how to teach with Roots, pace a group, and use the exams well.',
  },
  {
    key: 'curriculum-audit',
    title: 'Curriculum audit for schools',
    minutes: 60,
    price: 300,
    audience: 'Schools',
    description: 'We look at your current Arabic and Qur’an program alongside Roots and the CEFR, and talk through the gaps and the next steps.',
  },
  {
    key: 'partnership',
    title: 'School partnership deep-dive',
    minutes: 90,
    price: 500,
    audience: 'Schools',
    description: 'For leadership teams ready to adopt Roots: scope, levels, pacing, teacher onboarding and a licensing plan shaped to your school.',
  },
]

export function getBookingEvent(key) {
  return bookingEvents.find((e) => e.key === key)
}

export function formatPrice(price) {
  return price === 0 ? 'Free' : `$${price}`
}

// The Calendly URL for a live event, or null while it is coming soon.
export function liveUrl(event) {
  return event.calendly ? calendlyUrl(event.calendly) : null
}

export const isLive = (event) => !!liveUrl(event)

// Placeholder link for a coming-soon event: an email asking to be told when it opens.
export function requestHref(event) {
  const subject = `When it opens: ${event.title}`
  const body =
    `Hello,\n\nPlease let me know when the ${event.title.toLowerCase()} opens for booking.\n\n` +
    `Name:\nTime zone:\nWhat I would like to talk about:\n\nThank you.`
  return `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
