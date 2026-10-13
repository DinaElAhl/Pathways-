// Calendly — the one place the booking account lives.
//
// This is the current personal Calendly account. When the Roots-branded
// Calendly (under roots@pathwayslearn.com) is ready, change CALENDLY_BASE and
// every booking link and the /book embed follow. If the event slugs differ in
// the new account, update EVENT_TYPES too.
export const CALENDLY_BASE = 'https://calendly.com/dinabudu'

// Calendly event-type slugs, keyed by the id src/data/booking.js uses.
// Only the class is live today; the other calls in booking.js are
// "coming soon" and get a slug here once they exist in Calendly.
export const EVENT_TYPES = {
  class_cba: 'arabic-qur-an-class-levels-c-b-a',
}

export function calendlyUrl(eventType) {
  const slug = EVENT_TYPES[eventType]
  return slug ? `${CALENDLY_BASE}/${slug}` : null
}
