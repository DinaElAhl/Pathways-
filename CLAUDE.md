# CLAUDE.md — Pathways ("Learn with purpose")

Marketing + learning site for Pathways. Repo: `DinaElAhl/Pathways-` (root: `D:\PATHWAYS`).

## Stack

- **Vite 5** + **React 18** + **react-router-dom v6** + **Tailwind CSS 3** (PostCSS + autoprefixer).
- Router uses `BrowserRouter` with `basename={import.meta.env.BASE_URL}` (`src/main.jsx`).
- Route-level code splitting via `React.lazy`. The single `<Suspense>` boundary wraps `<Outlet/>` in `src/components/Layout.jsx` (which also renders Navbar/Footer and scroll-to-top on route change).

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # serve the built dist/ locally
```

## Deploy

- Live at **https://www.pathwayslearn.com** — Vercel, **auto-deploys on push to `main`**.
- Apex `pathwayslearn.com` 308-redirects to `www`. Original `pathways-learn-gamma.vercel.app` still resolves.
- `vercel.json` adds SPA rewrites (everything → `/index.html`, excluding `builder.html`, `assets/`, `favicon.ico`, `robots.txt`, `_vercel/`) so deep links resolve.

### Build/deploy gotcha (important)

`vite.config.js` sets `base: process.env.VITE_BASE || '/Pathways-/'`. The `/Pathways-/` default is for **GitHub Pages**. Any root host (Vercel) MUST set env **`VITE_BASE=/`**, or every asset/link 404s.

## Project layout

- `src/pages/*` — one component per route (lazy-loaded in `src/App.jsx`).
- `src/components/*` — shared UI (`Layout.jsx`, `Navbar.jsx`, `Footer.jsx`, ...).
- `src/data/*` — **content as data** (pathways, lms, events, resources, audiences, partners, rootsOfKnowledge, accreditedExams, examData, quranicNames, ...).
- `src/services/*` — `authService.js`, `progressService.js`.
- `api/*` — Vercel serverless functions (`auth`, `pathways`, `progress`, `reviews`, `search`).
- `pathways-api/` — separate API package (has its own `package.json` / `README.md`).
- `public/*` — static assets incl. `sitemap.xml`, `robots.txt`, `favicon.ico`.

## Conventions

- **Content is data-driven.** To change listings or detail pages, edit the relevant file in `src/data/*` — do not hardcode content into page components.
- **Routes live in `src/App.jsx`.** To add a page:
  1. `const Foo = lazy(() => import('./pages/Foo.jsx'))`
  2. Add `<Route path="/foo" element={<Foo />} />` inside the `<Layout/>` route.
  Dynamic detail routes use a `:slug` param (e.g. `/pathways/:slug`, `/resources/:slug`).
- After adding content/pages, **regenerate `public/sitemap.xml`** keeping base URL `https://www.pathwayslearn.com`.
- Styling is Tailwind utility classes; reuse existing brand tokens (e.g. `brand-200`, `brand-600`, `container-page`).

## Git workflow

- Repo uses a **PR workflow** — see `CONTRIBUTING.md`.
- **`main` auto-deploys to production**, so confirm with the owner before pushing to `main` or merging — don't push on standing assumption.
- The local `.claude/` folder is session config and is **untracked** — leave it untracked.
