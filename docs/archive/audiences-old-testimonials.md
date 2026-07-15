---
original_file: src/data/audiences.js
removed_at: 2026-07-15
removed_in_commit: c865c46
reason: 'Five fabricated persona quotes attached to the audience entries. Rendered by AudiencePage.jsx on /for/:slug pages. Cut in the credibility pass; AudiencePage.jsx now guards the render on truthy audience.testimonial so the section hides silently until real quotes are collected.'
---

# audiences.js — removed testimonial fields

Each entry in the `audiences` array had a `testimonial: { quote, name, role }`
field. All five have been dropped. Below are the original values so that a
real quote can slot into the same shape once Dina has one on file with the
speaker's consent.

## learners

```js
testimonial: {
  quote: 'I finally finished something. The pathway gave me structure and the community kept me going.',
  name: 'Priya S.',
  role: 'Career-changer, Data Science pathway',
}
```

## teachers

```js
testimonial: {
  quote: 'I cut my planning time in half and still walked into class more prepared than ever.',
  name: 'Mr. Olawale',
  role: '8th grade Science teacher',
}
```

## schools

```js
testimonial: {
  quote: 'Pathways gave our district a shared language for PD across 14 schools. Engagement tripled.',
  name: 'Dr. Rivera',
  role: 'Director of Teaching & Learning',
}
```

## parents

```js
testimonial: {
  quote: 'The weekly family activities replaced screen time with the best conversations we’ve ever had.',
  name: 'Amina & Tariq',
  role: 'Parents of a curious 9-year-old',
}
```

## educators

```js
testimonial: {
  quote: 'I turned my Saturday coaching sessions into a pathway and reached learners in 12 countries.',
  name: 'Léa B.',
  role: 'Independent UX coach',
}
```

## AudiencePage.jsx render (still present, now guarded)

```jsx
{audience.testimonial && (
  <section className="container-page py-14">
    <figure className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12">
      <svg /* quote glyph */ />
      <blockquote className="mt-4 font-display text-2xl leading-snug text-slate-900">
        &ldquo;{audience.testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 text-sm text-slate-600">
        <strong className="font-semibold text-slate-900">{audience.testimonial.name}</strong>
        · {audience.testimonial.role}
      </figcaption>
    </figure>
  </section>
)}
```
