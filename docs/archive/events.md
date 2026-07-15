---
original_routes: ['/events', '/events/:slug']
original_files:
  - src/pages/Events.jsx
  - src/pages/EventDetail.jsx
  - src/components/EventCard.jsx
  - src/data/events.js
deleted_at: 2026-07-15
deleted_in_commit: c865c46
reason: 'All six events were fabricated with past dates (April–June 2026, deleted 2026-07-15). RSVP form was a UI stub — nothing saved server-side, just toggled a local state flag.'
---

# /events — Events listing + detail

## Listing page (`/events`)

- **Eyebrow:** Events
- **H1:** Learn together. In real time.
- **Subhead:** Live webinars, working-session workshops, and community meetups — for everyone in the Pathways ecosystem. All free unless noted.

### Spotlight card ("Happening next")

Gradient card (brand-700 → brand-950) showing the next upcoming event (first item after time-filter sort). Info grid: When / Format / Where. CTA "Reserve a spot" → `/events/{slug}`.

### Filters

- **Type chips:** All · Webinar · Workshop · Meetup · Office hours
- **Audience chips:** Everyone · Learners · Teachers · Schools & Institutions · Parents · Educators

### Grid

Empty state (when filters return nothing): "No events match those filters." / "Try a different type or audience."

Cards rendered via `<EventCard>`.

## Detail page (`/events/:slug`)

- Breadcrumb: "← All events"
- Chip row: event type, formatted date, duration
- H1 = event title
- Body = event summary
- **Left column:** Agenda list (numbered pills) · "Hosted by" card
- **Right sidebar card:**
  - Price
  - When / Where / seats-left rows
  - **RSVP form:** single email input + "Reserve a spot" button. Success state showed emerald card: "You're in — we'll email your join link." Note: nothing was actually emailed — the RSVP handler just called `setRsvped(true)` and cleared local state.
  - Past-event state: grey card "This event has ended. Browse upcoming events below."
- **Bottom:** "Other upcoming events" — 3 related event cards

## Event card component

Shows a date block (month + day) in a brand gradient, event type badge, "Nearly full" badge when seats remaining is under 15%, event title, formatted date, location, and a "View details →" hover link.

Type tint map:
- Webinar → brand-50 / brand-700
- Workshop → emerald-50 / emerald-700
- Meetup → accent-500/10 / accent-600
- Office hours → purple-50 / purple-700

---

# `src/data/events.js` — the 6 fabricated events

## Event types

`['Webinar', 'Workshop', 'Meetup', 'Office hours']`

## Events

### 1. AI in the classroom — a practical panel
- **Slug:** `ai-in-the-classroom-panel`
- **Type:** Webinar · **Audiences:** teachers, schools, educators
- **Start:** 2026-05-06T17:00:00Z · **Duration:** 60 min · **Price:** Free
- **Location:** Online · Zoom
- **Host:** Pathways research + 3 guest teachers
- **Capacity:** 500 · **Seats taken:** 312
- **Summary:** "Three working teachers share what's actually helping them — and what didn't. Q&A with the audience."
- **Agenda:**
  - What changed in our classrooms this term
  - Three assignments redesigned for the AI era
  - Policy, parents, and staying human
  - Live Q&A

### 2. Lesson planning clinic — bring a unit
- **Slug:** `lesson-planning-clinic`
- **Type:** Workshop · **Audiences:** teachers
- **Start:** 2026-05-14T15:00:00Z · **Duration:** 90 min · **Price:** Free
- **Location:** Online · Zoom
- **Host:** Ms. Aguilar · Curriculum Lead *(fabricated persona)*
- **Capacity:** 40 · **Seats taken:** 29
- **Summary:** "A working session: bring a unit you're stuck on, leave with a plan. Small-group feedback and templates included."
- **Agenda:**
  - Warm-up: one sticky problem per teacher
  - Template walk-through
  - Small-group critique and rework
  - Share-out and next steps

### 3. Family reading night (online)
- **Slug:** `family-reading-night`
- **Type:** Meetup · **Audiences:** parents
- **Start:** 2026-04-28T19:00:00Z · **Duration:** 45 min · **Price:** Free
- **Location:** Online · cozy Zoom room
- **Host:** Literacy Lab
- **Capacity:** 150 · **Seats taken:** 82
- **Summary:** "A warm, low-key reading hour for families. Tips, book picks, and a read-along — kids welcome in pajamas."
- **Agenda:**
  - Three book picks for different ages
  - Read-along moment
  - Q&A with educators

### 4. District partnership office hours
- **Slug:** `district-partnership-office-hours`
- **Type:** Office hours · **Audiences:** schools
- **Start:** 2026-05-02T14:00:00Z · **Duration:** 45 min · **Price:** Free
- **Location:** Online · drop-in
- **Host:** Pathways for Institutions
- **Capacity:** 20 · **Seats taken:** 6
- **Summary:** "Drop-in session for district leaders thinking about piloting Pathways. Come with your questions."
- **Agenda:**
  - How partnerships work
  - Rollout playbooks
  - Live Q&A

### 5. Mentor storytime — how to ask for help
- **Slug:** `mentor-storytime`
- **Type:** Webinar · **Audiences:** learners, educators
- **Start:** 2026-05-21T18:00:00Z · **Duration:** 50 min · **Price:** Free
- **Location:** Online · Zoom
- **Host:** Pathways mentor network
- **Capacity:** 300 · **Seats taken:** 124
- **Summary:** "Three mentors and three mentees share the real stories behind their growth. Plus: how to ask great questions."
- **Agenda:**
  - Three pairs, three stories
  - What great mentees do
  - Live Q&A

### 6. Teacher–founders meetup (in-person, Lisbon)
- **Slug:** `teacher-founders-meetup`
- **Type:** Meetup · **Audiences:** teachers, educators
- **Start:** 2026-06-07T17:30:00Z · **Duration:** 120 min · **Price:** Free
- **Location:** Lisbon, PT · Pathways studio *(fabricated address)*
- **Host:** Pathways community
- **Capacity:** 30 · **Seats taken:** 18
- **Summary:** "A small, honest evening with teachers building new things alongside their classrooms."
- **Agenda:**
  - Welcome + intros
  - Lightning talks from three teacher-founders
  - Open conversation + snacks

## Helper functions (exported from events.js)

- `getEvent(slug)` — find by slug
- `formatEventDate(iso)` — "Wed, May 6, 5:00 PM UTC" style
- `formatEventDateShort(iso)` — "May 6, 2026" style
