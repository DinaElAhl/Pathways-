---
original_route: /
original_file: src/pages/Home.jsx
removed_at: 2026-07-15
removed_in_commit: c865c46
reason: 'Stats block reported "50+ pathways / 500+ resources / 12k active members / 4.9★ average rating". Real numbers in the data files are ~30 pathways / ~12 resources / 0 members / no rating. Kept the honest silence rather than showing zeros. Testimonial was attributed to a fabricated "Ms. Chen".'
---

# Home — removed stats block

Rendered from `const stats` at the top of the file, laid out as a
4-column `<dl>` grid below the hero CTAs.

| Value | Label |
|---|---|
| 50+ | Guided pathways |
| 500+ | Resources |
| 12k | Active members |
| 4.9★ | Average rating |

Wrapper markup was:

```jsx
<dl className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
  {stats.map((s) => (
    <div key={s.label} className="rounded-2xl bg-white/60 p-4 ring-1 ring-slate-200 backdrop-blur">
      <dt className="text-xs uppercase tracking-wide text-slate-500">{s.label}</dt>
      <dd className="mt-1 font-display text-2xl font-semibold text-slate-900">{s.value}</dd>
    </div>
  ))}
</dl>
```

To restore: reinstate the `const stats = [...]` array at the top of
`Home.jsx` and paste the `<dl>` back below the hero button row. Update
the numbers to something honest first.

# Home — removed testimonial section

Was a full-width figure in a brand-gradient card between the "How it
works" and "Build Your Own Pathway" sections.

- **Quote:** "Pathways is the first place that doesn't make me pick a lane. I plan lessons, swap tools with other teachers, and grow my own practice — all under one roof."
- **Attribution (fabricated):** Ms. Chen · 6th grade ELA teacher

Markup:

```jsx
<section className="container-page py-16">
  <figure className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 px-6 py-12 text-white sm:px-12 sm:py-16 shadow-soft">
    <svg /* quote glyph */ />
    <blockquote className="mt-4 font-display text-2xl leading-snug sm:text-3xl">
      "…quote…"
    </blockquote>
    <figcaption className="mt-6 text-sm text-brand-100">
      <strong className="font-semibold text-white">Ms. Chen</strong> · 6th grade ELA teacher
    </figcaption>
  </figure>
</section>
```

To restore: paste back with a real testimonial (attribution to a real
teacher/parent whose consent you have on file).
