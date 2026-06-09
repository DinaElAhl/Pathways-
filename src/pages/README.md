# `src/pages` — route components

Each file in this folder is a top-level **route component**. Routes are wired up
in [`src/App.jsx`](../App.jsx), which is the authoritative source for path →
component mappings.

`Home` is imported eagerly (it's the landing page). **Every other page is
lazy-loaded** via `React.lazy(() => import('./pages/X.jsx'))` so visitors only
download the chunk for the page they open. The `<Suspense>` boundary that shows
the loading fallback wraps `<Outlet />` in
[`src/components/Layout.jsx`](../components/Layout.jsx).

## Routes

### Core

| Path | Component | Description |
| --- | --- | --- |
| `/` | `Home.jsx` | Landing page (eagerly loaded). |
| `/pathways` | `Pathways.jsx` | Browse all learning pathways. |
| `/pathways/:slug` | `PathwayDetail.jsx` | Single pathway detail page. |
| `/resources` | `Resources.jsx` | Resource library listing. |
| `/resources/:slug` | `ResourceDetail.jsx` | Single resource detail page. |
| `/events` | `Events.jsx` | Events listing. |
| `/events/:slug` | `EventDetail.jsx` | Single event detail page. |
| `/about` | `About.jsx` | About the organization. |
| `/contact` | `Contact.jsx` | Contact form / details. |
| `/faq` | `FAQ.jsx` | Frequently asked questions. |
| `/pricing` | `Pricing.jsx` | Plans and pricing. |
| `/join` | `Join.jsx` | Sign-up / join flow. |
| `/dashboard` | `Dashboard.jsx` | User dashboard. |
| `*` | `NotFound.jsx` | Catch-all 404 page. |

### Audiences & Schools

| Path | Component | Description |
| --- | --- | --- |
| `/for/:slug` | `AudiencePage.jsx` | Audience-specific landing page. |
| `/lms` | `LMS.jsx` | LMS overview. |
| `/lms/:slug` | `LMSAudience.jsx` | LMS page for a specific audience. |

### AI features

| Path | Component | Description |
| --- | --- | --- |
| `/recommend` | `AIRecommender.jsx` | AI-powered pathway recommender. |
| `/ai-studio` | `AIStudio.jsx` | Draft lessons, quizzes, and rubrics with AI. |

### Roots of Knowledge

| Path | Component | Description |
| --- | --- | --- |
| `/roots` | `RootsOfKnowledge.jsx` | Roots of Knowledge overview. |
| `/roots/names` | `RootsNames.jsx` | Names index for the disciplines. |
| `/roots/:slug` | `RootDiscipline.jsx` | Single discipline detail page. |

### Tools & EduHub

| Path | Component | Description |
| --- | --- | --- |
| `/tools` | `Tools.jsx` | Teaching tools index. |
| `/tools/e2-teaching` | `E2TeachingTool.jsx` | E2 teaching tool. |
| `/edu-hub` | `EduHub.jsx` | EduHub & Tools hub page. |

### Exams

| Path | Component | Description |
| --- | --- | --- |
| `/accredited-exams` | `AccreditedExams.jsx` | Accredited exams overview. |
| `/quran-exams` | `QuranExams.jsx` | Qur'an exams. |
| `/pathways-exam` | `PathwaysExam.jsx` | Pathways exam. |
| `/exam-dashboard` | `ExamDashboard.jsx` | Exam results / dashboard. |

### Partners

| Path | Component | Description |
| --- | --- | --- |
| `/partners` | `PartnerPicks.jsx` | Partner picks / directory. |

### Apply

| Path | Component | Description |
| --- | --- | --- |
| `/apply/educator` | `ApplyEducator.jsx` | Educator application form. |
| `/apply/partner` | `ApplyPartner.jsx` | Partner application form. |

> `LearningPath.jsx` lives in this folder but is **not currently routed** in
> `src/App.jsx`.

## Adding a page

1. Create the component file here, e.g. `src/pages/MyPage.jsx`.
2. In `src/App.jsx`, add a lazy import:
   `const MyPage = lazy(() => import('./pages/MyPage.jsx'))`.
3. Add a `<Route path="/my-page" element={<MyPage />} />` inside the
   `<Layout />` route.

Page content (copy, lists, slugs) usually comes from `src/data` rather than
being hard-coded in the component.
