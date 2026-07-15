---
original_file: src/pages/ApplyPartner.jsx
removed_at: 2026-07-15
removed_in_commit: c865c46
reason: 'Testimonial card in the aside of the partner-application page attributed a fabricated result to a fabricated "Dr. Rivera". Removed in the credibility pass.'
---

# /apply/partner — removed testimonial aside

Below the "What partnerships include" card in the right-hand aside,
a brand-gradient testimonial card:

```jsx
<div className="rounded-2xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-6 text-white">
  <p className="font-display text-lg leading-snug">
    &ldquo;Pathways gave our district a shared language for PD across 14 schools. Engagement tripled.&rdquo;
  </p>
  <p className="mt-3 text-xs text-brand-100">
    <strong className="font-semibold text-white">Dr. Rivera</strong> · Director of Teaching & Learning
  </p>
</div>
```

Quote and attribution are the same as the fictional Dr. Rivera used on
the /for/schools audience page — see `audiences-old-testimonials.md`.

To restore: paste back the JSX and swap the quote + attribution for a
real partner quote with signed permission.
