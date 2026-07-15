# docs/archive/ — Removed content, kept for restoration

This directory preserves the copy and structured data of pages, sections, and
placeholder content that were removed from pathwayslearn.com during a
credibility-pass cleanup (approved by Dina, commit
[`c865c46`](https://github.com/DinaElAhl/Pathways-/commit/c865c46)). Nothing in
this directory is served to the public — every file is an archive of what was
there, so it can be restored later if Dina changes her mind.

The archive itself was added in the follow-up commit
[`docs: archive removed pages for historical reference`](.).

## Why this exists

Dina's original request was "delete non-useful sections to focus on benefiting
as many people as we can." The audit at `D:\portfolio\site_audit.md` proposed
the cuts; this archive captures what was on the chopping block so nothing is
truly lost.

## Table of contents

### Full pages that were deleted

| File | Original route(s) | What it was |
|---|---|---|
| [`lms.md`](./lms.md) | `/lms`, `/lms/:slug` | Fictional Pathways LMS SaaS — landing page, three audience sub-pages (teachers / schools / universities), feature table, packages |
| [`pricing.md`](./pricing.md) | `/pricing` | SaaS pricing table for the fictional LMS — five tiers, feature comparison, FAQ |
| [`dashboard.md`](./dashboard.md) | `/dashboard` | Fake teacher dashboard — hardcoded classrooms, students, assignments, bar chart |
| [`ai-studio.md`](./ai-studio.md) | `/ai-studio` | Non-functional "AI Studio" — lesson-plan / quiz / rubric generators that ran on templates and keyword expansion, not AI |
| [`join.md`](./join.md) | `/join` | Fake classroom-join flow with a keyword-based `if/else` "AI tutor" |
| [`events.md`](./events.md) | `/events`, `/events/:slug` | Events listing + detail pages, six fabricated events (all with past dates), RSVP form was a UI stub |

### Sections / fields fixed in place

| File | Where it lived | What was removed |
|---|---|---|
| [`about-old-v1.md`](./about-old-v1.md) | `src/pages/About.jsx` | Fictional 4-person team (Noor A. / Jamal R. / Sara M. / Dev P.) and 2022–2025 milestone timeline including "12,000+ learners" |
| [`home-stats-and-testimonial.md`](./home-stats-and-testimonial.md) | `src/pages/Home.jsx` | "50+ / 500+ / 12k / 4.9★" stats block and Ms. Chen testimonial |
| [`contact-old-channels.md`](./contact-old-channels.md) | `src/pages/Contact.jsx` | `hello@pathways.test`, +1 (555) 010-0134 phone, "HQ in Lisbon, PT" |
| [`audiences-old-testimonials.md`](./audiences-old-testimonials.md) | `src/data/audiences.js` | Five fabricated persona quotes (Priya S. / Mr. Olawale / Dr. Rivera / Amina & Tariq / Léa B.) |
| [`apply-partner-old-testimonial.md`](./apply-partner-old-testimonial.md) | `src/pages/ApplyPartner.jsx` | Dr. Rivera "14 schools / engagement tripled" quote card |
| [`resources-old-author-names.md`](./resources-old-author-names.md) | `src/data/resources.js` | Fake author attributions (Ms. Aguilar, Léa B., Ms. Park) |
| [`partners-old-affiliate-config.md`](./partners-old-affiliate-config.md) | `src/data/partners.js` + `src/pages/PartnerPicks.jsx` | 5 `?ref=pathways` outbound params, 6 `commission: 'Referral'/'Affiliate'` fields, amber "may earn commission" disclosure, commission badges on partner cards |
| [`pathways-exam-old-certificate-wording.md`](./pathways-exam-old-certificate-wording.md) | `src/pages/PathwaysExam.jsx` | Printed certificate footer said "Authorised Examiner"; step-card said "certified CEFR proficiency level" |
| [`edu-hub-ai-studio-tile.md`](./edu-hub-ai-studio-tile.md) | `src/pages/EduHub.jsx` | The "AI Studio" tile that linked to the deleted `/ai-studio` route |
| [`shop-es-kits.md`](./shop-es-kits.md) | `src/pages/Shop.jsx` (`#kits`) + `src/data/shopProducts.js` (`shopKits`) | Four Roots Elementary Kit retail bundles ($79 / $99 / $129 / $249) — removed because their prices undercut the $10k/level school license on `/for-schools` |

## How to restore any of this

1. Open the archive `.md` file for the piece you want back.
2. The frontmatter names the original file path.
3. The body reproduces the copy and any hardcoded data structures verbatim.
4. Wrap that content in JSX matching the surrounding page style, put the file
   back at its original path, and — for full pages — re-register the lazy
   import + `<Route>` in `src/App.jsx` and the nav entry in
   `src/components/Navbar.jsx`.

If the goal is a true reversion, `git revert c865c46` will bring back the JSX
chrome as well.
