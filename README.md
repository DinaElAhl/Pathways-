# Pathways-

> Built with Claude (Anthropic AI) — April 15, 2026
>
> A full-featured **learning pathways education hub** built entirely with Claude Code. React + Vite web app serving learners, teachers, schools, parents, and educators.
>
> Claude Code Session: https://claude.ai/code/session_013ty3UBpKbsZvsePnPv2nfB
>
> ---
>
> ## Tech Stack
>
> - **Vite + React 18** — fast build and dev server
> - - **React Router DOM** — client-side routing
>   - - **Tailwind CSS** — custom brand palette and component classes
>     - - **localStorage** — client-side state persistence
>      
>       - ---
>
> ## Routes
>
> | Route | Description |
> |-------|-------------|
> | `/` | Home — hero, stats, audience grid, featured resources |
> | `/pathways` | All learning pathways with category filters |
> | `/pathways/:slug` | Individual pathway detail |
> | `/for/:slug` | Audience hub (learners, teachers, schools, parents, educators) |
> | `/resources` | Searchable/filterable resource marketplace |
> | `/resources/:slug` | Resource detail with pricing sidebar |
> | `/events` | Upcoming events list |
> | `/events/:slug` | Event detail with RSVP |
> | `/apply/educator` | Educator onboarding application |
> | `/apply/partner` | Institutional partnership application |
> | `/faq` | Searchable FAQ accordion (6 topic groups) |
> | `/about` | Mission, values, team, timeline |
> | `/contact` | Contact form |
>
> ---
>
> ## Claude AI Work Log
>
> ### Claude Code Session — April 15, 2026
>
> **PR:** [#1 — claude/continue-website-build-DsTi8](https://github.com/DinaElAhl/Pathways-/pull/1) *(Draft — 4 commits, +6,539 lines)*
>
> **Commit `ad8f5b1`** — Scaffold Vite + React + Tailwind site
> - Vite + React 18 + react-router-dom configuration
> - - Tailwind with custom brand palette
>   - - App shell with all routes
>     - - Pathway data module (6 learning paths)
>       - - Inline SVG icon component
>        
>         - **Commit `e52a23e`** — Build full Pathways site: layout, pages, content
>         - - Responsive Navbar (sticky, mobile menu) + Footer
>           - - Home: hero with gradient, stats, featured pathways, how-it-works, CTA
>             - - Pathways index with category filter chips + search
>               - - PathwayDetail: outcomes, curriculum, "what's included" sidebar
>                 - - About, Contact (validated form + success state), 404 page
>                   - - *Production build: 46 modules, ~209 KB JS / ~65 KB gzipped*
>                    
>                     - **Commit `1f190f3`** — Expand into full education hub
>                     - - audiences.js: 5 audience groups (learners, teachers, schools, parents, educators)
>                       - - resources.js: 12-item marketplace
>                         - - `/for/:slug` audience hub pages
>                           - - `/resources` with URL-synced `?audience=` param deep links
>                             - - ResourceCard with type-tinted badges
>                               - - Navbar: "For you" accessible dropdown + Resources link
>                                 - - *Production build: 52 modules, ~237 KB JS / ~71 KB gzipped*
>                                  
>                                   - **Commit `e0be528`** — Add events, application flows, and FAQ
>                                   - - events.js: 6 upcoming events with date helpers
>                                     - - `/events` + `/events/:slug` with RSVP form + email validation
>                                       - - Reusable ApplyForm with per-field validation and success state
>                                         - - `/apply/educator`: onboarding form with benefits sidebar
>                                           - - `/apply/partner`: institutional form with testimonial sidebar
>                                             - - `/faq`: 6 topic groups, searchable accordion, auto-expand on filter
>                                               - - Navbar: Events link added; Contact moved to Footer
>                                                 - - *Production build: 60 modules, ~268 KB JS / ~78 KB gzipped*
>                                                  
>                                                   - ---
>
> ## Getting Started
>
>     npm install
>     npm run dev
>
> Build for production: `npm run build`
>
> ---
>
> *Built with Claude AI (Anthropic) — Educational use.*
