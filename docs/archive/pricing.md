---
original_route: /pricing
original_file: src/pages/Pricing.jsx
deleted_at: 2026-07-15
deleted_in_commit: c865c46
reason: 'Pricing table for the fictional /lms SaaS. Removed together with the LMS pitch in the credibility pass.'
depends_on: 'src/data/lms.js — see lms.md archive for the packages data model'
---

# /pricing — SaaS pricing table for the fictional Pathways LMS

## Page header

- **Eyebrow:** Pricing
- **H1:** One platform. Packages for every educator.
- **Subhead:** Start free as a single teacher, scale to a school, deploy across a district or university. All tiers include the AI tutor and are COPPA / FERPA / GDPR compliant by design.

## Billing toggle

Two pill buttons: **Monthly** · **Annual** (with a "Save 17%" green badge on Annual).

## Package cards

Five cards rendered from `packages` (see [`lms.md`](./lms.md)). The card
grid used `grid md:grid-cols-2 lg:grid-cols-5`. Highlighted card
(`Teacher Pro`) got a "★ Most popular" ribbon above the audience label
and an indigo border with `ring-2 ring-indigo-100`.

Each card showed: audience label, name, price label, seats, description,
6-line highlights list with indigo ✓ marks, and a CTA button routed to
`/contact`.

The `priceLabel(p, billing)` helper computed the displayed price:

```js
if (p.priceAnnual === 0) return 'Free'
if (p.priceAnnual === null) return 'Custom'
if (p.priceUnit) return `$${p.priceAnnual} ${p.priceUnit}`
return billing === 'annual'
  ? `$${Math.round(p.priceAnnual / 12)} / mo`
  : `$${p.priceMonthly} / mo`
```

## Feature comparison matrix

- **H2:** "Compare every feature"
- **Subhead:** "Everything included in each package."

Table columns: Feature | Teacher Starter | Teacher Pro | School | University | District Enterprise.

Each row shows the feature title + description in the first column, then
either a green ✓ or a grey em-dash per package (from `p.features.includes(f.id)`).

Below the feature rows, four "limits" rows in a grey band:
- Classrooms
- Students
- Storage
- AI Tutor messages

## Pricing FAQ

Four `<details>` accordions:

1. **Q:** Can I start free?
   **A:** Yes — Teacher Starter is free forever, no credit card required. You can upgrade to Pro or invite your school at any time.
2. **Q:** Do you offer non-profit & public-school discounts?
   **A:** Yes. Qualified K-12 public schools receive a 25% discount, and registered non-profits receive 40% off annual plans.
3. **Q:** Is my data safe?
   **A:** Student data is never used to train third-party AI models. Pathways is COPPA, FERPA, and GDPR compliant, with optional EU / US / UAE data residency on Enterprise plans.
4. **Q:** What payment methods do you accept?
   **A:** Credit card, ACH, SEPA, wire transfer, and purchase orders. Annual invoicing is available for school and university plans.
