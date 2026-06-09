# Components

Shared, reusable React components for the Pathways app. All are styled with
Tailwind utility classes plus the custom component classes (`card`, `chip`,
`btn-primary`, `btn-secondary`, `container-page`, etc.) defined in `src/index.css`.

## Overview

| File | Renders / role | Key props |
| --- | --- | --- |
| `Layout.jsx` | Shared app shell used as the parent route element: `<Navbar />` + `<main>` + `<Footer />`. Wraps the route `<Outlet/>` in a React `<Suspense>` boundary with a spinner fallback (`PageFallback`) for lazy-loaded routes, and scrolls to top on every route change (via `useLocation` + `useEffect`). | none |
| `Navbar.jsx` | Fixed top navigation bar. Logo, primary `NavLink`s, a "More" dropdown, a "For you" dropdown built from the `audiences` data (`/data/audiences.js`), right-side action buttons, and a collapsible mobile menu. Closes menus on route change and on outside click; adds a blur/shadow once scrolled. | none |
| `Footer.jsx` | Site footer with link columns (Explore, For — generated from `audiences`, plus CTAs) and a newsletter signup form that shows an inline thank-you on submit. Renders the current year. | none |
| `Icon.jsx` | Inline SVG icon set (no icon-library dependency). Icons are looked up by `name` from an internal `paths` map (e.g. `arrowRight`, `check`, `compass`, `book`); returns `null` for unknown names. | `name`, `className` (default `w-5 h-5`), `strokeWidth` (default `1.75`) |
| `PathwayCard.jsx` | Presentational card linking to a pathway detail page (`/pathways/:slug`). Shows gradient icon, category chip, title, tagline, level/duration, and hours. | `pathway` |
| `ResourceCard.jsx` | Presentational card linking to a resource (`resource.link` or `/resources/:slug`). Type icon + tinted badge, title, summary, subject/level chips, format, and price. | `resource` |
| `EventCard.jsx` | Presentational card linking to an event (`/events/:slug`). Date block (month/day), type badge, "Nearly full" badge when few seats remain, title, formatted date (`formatEventDate`), and location. | `event` |
| `ApplyForm.jsx` | Generic, self-contained multi-field application form shared by the apply pages. Renders fields (text/email/url/textarea/select/number), validates required fields on submit, and shows a success state. | `fields` (array of `{ id, label, type, required?, placeholder?, options?, rows?, autoComplete? }`), `submitLabel` (default `"Submit application"`), `disclaimer` |

## Notes

- The three card components (`PathwayCard`, `ResourceCard`, `EventCard`) are
  pure/presentational and each take a single data object prop.
- `Icon` is consumed throughout (cards, form, footer) — reference icons by their
  `name` key from the `paths` map in `Icon.jsx`.
- `Layout` is intended to be the wrapping route element in the router config;
  child routes render through its `<Suspense>`-wrapped `<Outlet/>`.
