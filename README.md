# Pathways — Learn with purpose

One hub for everyone who learns and teaches — learners, teachers, parents, schools, and
educators. Pathways brings together curated, mentor-guided learning journeys, lesson
plans, courses, tools, exams, and community across engineering, data, design, product,
AI, and Arabic & Quran studies.

🔗 **Live:** https://pathways-learn-gamma.vercel.app

## Stack

- [Vite](https://vitejs.dev/) — dev server and bundler
- [React 18](https://react.dev/) with `react-router-dom` for client-side routing
- [Tailwind CSS](https://tailwindcss.com/) with a small custom design system
- Route-level code splitting via `React.lazy` — each page ships as its own chunk

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the production build
```

## Features

- **Audience hubs** (`/for/:slug`) — tailored entry points for learners, teachers,
  parents, and schools.
- **Pathways** — searchable, filterable structured journeys with detail pages.
- **AI Match** (`/recommend`) — an on-device recommender (TF-IDF similarity) that
  matches your interests and goals to pathways. No data leaves the browser.
- **Exams** — Arabic & Quran proficiency exams, an accredited-exams directory, and a
  teacher-facing exam dashboard.
- **Roots of Knowledge**, **EduHub**, **Tools**, **AI Studio**, **Resources**,
  **Events**, **Partners**, **Pricing**, plus apply/contact/FAQ flows.

## Project structure

```
src/
  App.jsx               # routes (lazy-loaded)
  main.jsx              # entry point
  index.css             # Tailwind + component classes
  components/           # Layout, Navbar, Footer, Icon, cards, ApplyForm…
  pages/                # Home, Pathways, AIRecommender, PathwaysExam, Roots…
  data/                 # content source of truth (pathways, resources, events,
                        #   examData, rootsOfKnowledge, quranicNames…)
  services/             # auth + progress helpers
public/
  og-image.png          # social share card
  sitemap.xml           # generated from the route data
  robots.txt
vercel.json             # SPA rewrites for Vercel
api/                    # serverless API handlers (auth, pathways, progress…)
```

Add or edit content by editing the files in `src/data/` — every listing, detail
page, and featured section is driven from there.

## Deployment

Deployed on **Vercel** (`vercel.json` rewrites client-side routes to `index.html` so
deep links resolve on refresh). The repo also includes a GitHub Pages workflow and a
`netlify.toml` / `public/_redirects` as alternative deploy targets. The Vite `base` is
configurable via `VITE_BASE` — set it to `/` for root-domain hosts like Vercel.

## Contributing

We use a **branch + pull request** workflow for all changes. Please read
[CONTRIBUTING.md](./CONTRIBUTING.md) before submitting changes.

Key steps:

1. Create a branch from `main`.
2. Make your changes and commit.
3. Open a pull request targeting `main`.
4. Get a review, then merge.

Direct pushes to `main` are discouraged.
