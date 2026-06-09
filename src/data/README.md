# `src/data` — Content Source of Truth

This folder is the **content source of truth** for the site. Pages in `src/pages`
import the exports below and render the listing + detail pages from them. **To change
site content, edit these files — no component/code changes are needed.**

Most files export a plain array of objects plus small `getX(slug)` helper functions
used by the detail pages to look up a single item.

## Files

| File | Main export(s) | Drives (pages / routes) |
|------|----------------|--------------------------|
| `pathways.js` | `pathways[]`, `getPathway(slug)`, `getRelatedPathways(slug)` | `/pathways` listing, `/pathways/:slug` detail, Home, `/recommend` |
| `resources.js` | `resources[]`, `resourceTypes[]`, `audienceSlugs[]`, `getResource(slug)` | `/resources` listing, `/resources/:slug` detail, audience/Home sections |
| `events.js` | `events[]`, `eventTypes[]`, `getEvent(slug)`, `formatEventDate`, `formatEventDateShort` | `/events` listing, `/events/:slug` detail, `EventCard` |
| `rootsOfKnowledge.js` | `rootsHero`, `rootDisciplines[]` | `/roots` landing, `/roots/:slug` discipline detail |
| `quranicNames.js` | `quranicNames[]`, `namesIntro`, `disciplineNames` | `/roots/names`, `/roots`, `/roots/:slug` |
| `audiences.js` | `audiences[]`, `getAudience(slug)` | `/for/:slug` audience pages, Navbar, Footer, Home |
| `partners.js` | `partners[]`, `partnerCategories[]`, `affiliateDisclosure`, `partnerUrl(partner)`, `getPartner(slug)` | `/partners` (Partner Picks) |
| `lms.js` | `lmsFeatures[]`, `packages[]`, `lmsAudiences[]`, `getPackage`, `getAudience`, `getFeature` | `/lms`, `/lms/:slug`, `/pricing` |
| `examData.js` | `SCHOOL_TYPES[]`, `LEVELS[]`, `WARMUP`, `QUESTIONS`, `calcScore`, `saveToSheets` | `/pathways-exam`, `/exam-dashboard` |
| `accreditedExams.js` | `accreditedExams[]` | `/accredited-exams`, `/quran-exams` |
| `e2TeachingHelpers.js` | `e2ToolMeta`, `e2Sections[]` | `/tools/e2-teaching` (E² Teaching Framework tool) |

## Slugs map to detail routes

Items that carry a `slug` field map directly to a detail route via React Router:

- `pathways` → `/pathways/:slug`
- `resources` → `/resources/:slug`
- `events` → `/events/:slug`
- `rootDisciplines` (rootsOfKnowledge) → `/roots/:slug`
- `audiences` → `/for/:slug`
- `partners` / `lms packages` → looked up by `getPartner` / `getPackage`

## Typical item shape

Listing/detail items share a common skeleton, e.g. a pathway:

```js
{
  slug: 'web-development',      // unique — becomes the URL
  title: 'Modern Web Development',
  summary: '…',                // short blurb for cards
  // type/category, level, duration, audiences[], outcomes[], stages[]…
}
```

Resources/events add `type`, `audiences[]`, `subjects[]`, `price`; events also use
ISO `start` dates and `durationMin`. Roots disciplines add `framing` and `units[]`.

## How to add an item

1. Open the relevant file and **append a new object** to its exported array.
2. Give it a **unique `slug`** (for files that use slugs). The listing page picks it
   up automatically, and the detail page resolves it via the file's `getX(slug)` helper.
3. Fill in the same fields as a neighbouring entry so cards/detail pages render fully.
4. **Regenerate `public/sitemap.xml`** afterward — the sitemap is derived from these
   slugs, so a new item only appears there once the sitemap is rebuilt.
