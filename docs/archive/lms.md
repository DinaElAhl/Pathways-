---
original_routes: ['/lms', '/lms/:slug']
original_files:
  - src/pages/LMS.jsx
  - src/pages/LMSAudience.jsx
  - src/data/lms.js
deleted_at: 2026-07-15
deleted_in_commit: c865c46
reason: 'Fictional SaaS LMS pitch that overstated capability (SSO, LTI 1.3, SCIM, "12k+ classrooms", "99.95% uptime SLA"). Biggest single credibility risk if a school did diligence. Cut in the credibility pass.'
---

# /lms — Pathways LMS landing + audience sub-pages

## Hero

- **Eyebrow:** Pathways LMS — now in public beta
- **H1:** The learning platform built for the AI-native classroom.
- **Subhead:** Pathways LMS gives teachers, schools, and universities a modern, privacy-first platform with AI tutoring, AI-assisted grading, analytics, SSO, and LTI — all in one place.
- **Primary CTA:** "See packages & pricing" → `/pricing`
- **Secondary CTA:** "For schools →" → `/lms/schools`

### Hero stats

| Value | Label |
|---|---|
| 12k+ | Active classrooms |
| 380k+ | Learners reached |
| 99.95% | Uptime SLA |
| COPPA · FERPA · GDPR | Compliant by design |

## Audience cards section

- **Section heading:** "Built for every kind of educator"
- **Subhead:** "Pick the experience that fits your institution."

The three audience cards were rendered from `lmsAudiences` (below).

## Feature grid section

- **Eyebrow:** Platform
- **Section heading:** "Everything an LMS should be — and more."
- **Subhead:** "A complete learning management system, with AI woven through every workflow."

The 12 feature cards were rendered from `lmsFeatures` (below).

## Packages preview section

- **Section heading:** "Packages that scale with you"
- **Subhead:** "From a single teacher to a whole district."
- **Bottom CTA:** "Compare all packages →" → `/pricing`

## Bottom CTA (gradient band)

- **H2:** "Ready to bring Pathways to your classroom?"
- **Body:** "Start free today, or talk to us about a school- or university-wide rollout."
- **Primary:** "Start free" → `/pricing`
- **Secondary:** "Book a demo" → `/contact`

---

# /lms/:slug — Per-audience LMS pages (teachers · schools · universities)

Dynamic route rendering per-audience content from `lmsAudiences` plus a
`audienceExtras` overlay hardcoded in `LMSAudience.jsx` with stats and
workflow steps.

## Per-audience hardcoded overlays

### /lms/teachers

- **Gradient:** `from-blue-600 to-cyan-600`
- **Stats:** 5k+ Teachers using Pathways · 60% Less time grading · 4.9★ Average rating
- **4-step workflow:**
  1. **Build your classroom** — Create a classroom in 30 seconds, share a join code with your students, and drop in any pathway from the Pathways library.
  2. **Assign with one click** — Pick a pathway, a stage, or a single lesson; set a due date; add a rubric; done. Students get notified instantly.
  3. **Grade 3× faster** — AI drafts rubric-based feedback on every submission. You review, tweak, and approve — nothing goes to students without your OK.
  4. **Spot struggling students early** — The dashboard highlights who is falling behind, what concept they're stuck on, and suggests a remediation pathway.

### /lms/schools

- **Gradient:** `from-emerald-600 to-teal-600`
- **Stats:** 320+ Schools deployed · 90% Teacher adoption in 60 days · FERPA / COPPA Compliant · Clever / ClassLink Rostered
- **4-step workflow:**
  1. **Single sign-on** — Roll out in a day with Google Workspace, Microsoft 365, Clever, or ClassLink. SAML 2.0 for enterprise directories.
  2. **Roster sync** — Nightly roster sync keeps classrooms, teachers, and students up to date automatically. No more CSV imports.
  3. **Standards-aligned curriculum** — Every pathway maps to CSTA, NGSS, Common Core, or your national curriculum. Drop units into any grade level.
  4. **Dashboards for every role** — Teachers see their classroom. Coaches see the department. Principals see the school. District admins see everything.

### /lms/universities

- **Gradient:** `from-fuchsia-600 to-rose-600`
- **Stats:** 48 University partners · LTI 1.3 Certified · 99.95% Uptime SLA · SAML 2.0 + SCIM
- **4-step workflow:**
  1. **Embed inside Canvas, Moodle, Blackboard** — LTI 1.3 Advantage with deep linking, grade passback, and names-and-roles service. Your students never leave your LMS.
  2. **Proctored assessments** — Lockdown browser, AI integrity signals, and optional webcam proctoring for high-stakes exams — all FERPA compliant.
  3. **Research-grade analytics** — Open learning analytics APIs, xAPI / Caliper export, and a data warehouse connector for institutional research teams.
  4. **White-label & self-host** — Custom domain, your branding, 99.95% uptime SLA. On-prem or private-cloud deployment on request.

## Per-audience layout (each sub-page)

1. **Hero band** (gradient) — audience title, hero copy, tagline, description, 4 stat cards
2. **Benefits section** — "Why {audience} pick Pathways" — 4 numbered benefit cards
3. **Workflow section** (grey band) — "How it works" — 4-step vertical list
4. **Recommended packages section** — 2 package cards (from `recommendedPackages` array)
5. **Bottom CTA band** (gradient) — "Let's build something great together." → Book a demo / See pricing

---

# src/data/lms.js — data model

## `lmsFeatures` (12 entries)

| id | title | description | icon |
|---|---|---|---|
| classrooms | Classrooms & Cohorts | Create classrooms, invite students with a join code, and run live cohorts with start/end dates. | 🏫 |
| gradebook | Gradebook & Rubrics | Automatic grading for quizzes, rubric-based assessment for projects, and weighted grade categories. | 📊 |
| assignments | Assignments & Submissions | Create assignments with due dates, accept file uploads, code submissions, and peer reviews. | 📝 |
| ai-tutor | AI Tutor for every student | An on-device AI tutor that answers questions about the current lesson without leaking student data. | 🤖 |
| ai-grading | AI-assisted grading | Draft feedback for essays and code; teacher reviews and approves before sending to students. | ✨ |
| analytics | Analytics & Insights | Per-student progress, at-risk alerts, cohort comparison, and learning-outcome heatmaps. | 📈 |
| sso | SSO & Roster sync | Google Workspace, Microsoft 365, Clever, ClassLink, and SAML 2.0 for enterprise rollouts. | 🔐 |
| lti | LTI 1.3 integration | Embed Pathways courses inside Canvas, Moodle, Blackboard, and Brightspace with deep linking. | 🔌 |
| curriculum | Standards-aligned curriculum | Pre-built units mapped to CSTA, NGSS, Common Core, IB, and national curricula. | 📚 |
| plagiarism | AI detection & academic integrity | Flag AI-generated text and plagiarism, with originality reports for every submission. | 🛡️ |
| proctoring | Proctored assessments | Lockdown browser mode and optional webcam proctoring for high-stakes exams. | 🎥 |
| accessibility | Accessibility first | WCAG 2.2 AA, screen-reader optimised, captions on every video, dyslexia-friendly fonts. | ♿ |

## `packages` (5 pricing tiers)

**Teacher Starter** — audience: "Individual teachers & tutors" · badge: Free forever · monthly: $0 · annual: $0 · seats: "1 teacher · up to 35 students" · highlight: false · CTA: "Start free"
- Description: "Everything you need to run a single classroom — no credit card required."
- Features: classrooms, gradebook, assignments, ai-tutor, curriculum, accessibility
- Limits: 3 classrooms · 35 students · 2 GB storage · 500 AI tutor msgs/month
- Highlights: Up to 3 classrooms, 35 students each · Full gradebook & assignment tools · AI tutor (on-device, 500 msgs/mo) · Community support

**Teacher Pro** — audience: "Serious educators & private tutors" · badge: Most popular · monthly: $12 · annual: $120 · seats: "1 teacher · unlimited students" · highlight: TRUE · CTA: "Try Pro free for 30 days"
- Description: "Unlimited students, AI-assisted grading, and advanced analytics for the educator who means business."
- Features: classrooms, gradebook, assignments, ai-tutor, ai-grading, analytics, curriculum, plagiarism, accessibility
- Limits: Unlimited classrooms · Unlimited students · 50 GB · Unlimited AI tutor
- Highlights: Unlimited classrooms & students · AI-assisted grading & feedback · Analytics & at-risk alerts · Plagiarism & AI-writing detection · Priority email support

**School** — audience: "K-12 schools & academies" · badge: "Per student / year" · annual: $6 · unit: "per student / year" · seats: "Whole school · 50+ students" · CTA: "Get a school quote"
- Description: "Centralised admin, SSO, roster sync, and standards-aligned curriculum for your entire school."
- Features: classrooms, gradebook, assignments, ai-tutor, ai-grading, analytics, sso, curriculum, plagiarism, accessibility
- Limits: Unlimited classrooms · School-wide students · 1 TB · Unlimited AI tutor
- Highlights: Google / Microsoft / Clever SSO · District admin dashboard · CSTA & NGSS-aligned units · Dedicated onboarding specialist · Parent & guardian portal

**University** — audience: "Higher-ed institutions" · badge: "Per student / year" · annual: $12 · unit: "per student / year" · seats: "Campus-wide · 500+ students" · CTA: "Talk to higher-ed team"
- Description: "LTI 1.3, proctored assessments, research-grade analytics, and white-label hosting for universities."
- Features: (all 12)
- Limits: everything unlimited
- Highlights: LTI 1.3 (Canvas, Moodle, Blackboard) · Proctored exams & lockdown browser · SAML 2.0 & SCIM provisioning · Research-grade learning analytics · White-label branding & custom domain · 99.95% uptime SLA

**District Enterprise** — audience: "School districts & ministries" · badge: "Custom pricing" · unit: Custom · seats: "District-wide · 10,000+ students" · CTA: "Request proposal"
- Description: "Multi-school rollout, custom contracts, data-residency options, and white-glove implementation."
- Features: (all 12)
- Limits: everything unlimited
- Highlights: Multi-school / multi-tenant admin · EU / US / UAE data residency · On-prem or private-cloud deploy · Custom SLAs & DPA · Dedicated customer success manager · Migration from existing LMS included

## `lmsAudiences` (3 entries)

**teachers** — "For Teachers" · tagline: "Spend less time grading, more time teaching." · hero: "Run your classroom on autopilot." · description: "Pathways gives individual teachers and tutors a modern, AI-native classroom — gradebook, assignments, an on-device AI tutor, and rubric-based feedback that drafts itself." · recommendedPackages: [teacher-starter, teacher-pro]
- Benefits:
  - Cut grading time by up to 60% with AI-assisted feedback you review before sending.
  - Give every student a personal on-device AI tutor that can't leak their data.
  - Pre-built, standards-aligned units you can remix in minutes.
  - Parent-ready progress reports generated with one click.

**schools** — "For Schools" · tagline: "One platform for every classroom." · hero: "A modern LMS your whole school will actually use." · description: "Roll Pathways out district-wide with Google / Microsoft / Clever SSO, a central admin console, and curriculum mapped to CSTA, NGSS, and Common Core." · recommendedPackages: [school-pro, district-enterprise]
- Benefits:
  - Centralised admin with role-based permissions (teacher, coach, principal, district admin).
  - Roster sync from Clever, ClassLink, or Google Classroom — no CSVs.
  - At-risk alerts surface students who need help before grades slip.
  - COPPA, FERPA, and GDPR compliant by design; student data never trains a third-party model.

**universities** — "For Universities" · tagline: "Research-grade learning, production-grade platform." · hero: "The LMS built for modern higher ed." · description: "Deploy Pathways as a standalone LMS or embed it inside Canvas, Moodle, or Blackboard via LTI 1.3. Includes proctored assessments, research-grade analytics, and white-label branding." · recommendedPackages: [university, district-enterprise]
- Benefits:
  - LTI 1.3 Advantage — deep-linking, grade passback, and names-and-roles service.
  - Proctored assessments with optional lockdown browser and AI integrity signals.
  - Learning analytics APIs for institutional research teams.
  - White-label branding, custom domain, 99.95% uptime SLA, and SAML 2.0 SSO.
