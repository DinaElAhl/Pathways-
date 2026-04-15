# Pathways

Structured learning journeys — a Vite + React + Tailwind site for curated, mentor-guided pathways across engineering, data, design, product, and AI.

## Stack

- [Vite](https://vitejs.dev/) — dev server and bundler
- [React 18](https://react.dev/) with `react-router-dom` for routing
- [Tailwind CSS](https://tailwindcss.com/) with a small custom design system

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the production build
```

## Project structure

```
src/
  App.jsx               # routes
  main.jsx              # entry point
  index.css             # Tailwind + component classes
  components/
    Layout.jsx          # shared shell (navbar + footer)
    Navbar.jsx
    Footer.jsx
    Icon.jsx            # inline SVG icon set
    PathwayCard.jsx
  pages/
    Home.jsx
    Pathways.jsx        # searchable, filterable list
    PathwayDetail.jsx   # /pathways/:slug
    About.jsx
    Contact.jsx
    NotFound.jsx
  data/
    pathways.js         # content source of truth
```

Add or edit pathways by editing `src/data/pathways.js` — every listing, detail
page, and featured section is driven from there.
