---
original_file: src/pages/EduHub.jsx
removed_at: 2026-07-15
removed_in_commit: c865c46
reason: 'Tile in the EduHub artifact grid linked to /ai-studio, which was deleted in the same commit. Removed to keep the tile grid consistent with the surviving routes.'
---

# /edu-hub — removed AI Studio tile

The `ARTIFACTS` array in `EduHub.jsx` contained six tiles; the fifth
one linked to the deleted /ai-studio route. Removed.

## Removed entry

```js
{
  title: 'AI Studio',
  tagline: 'Curated AI tools for learners and teachers',
  description: 'A workspace of AI helpers for lesson design, summarization and study — used with a tawḥīd-centred lens.',
  href: '/ai-studio',
  cta: 'Open AI Studio',
  color: 'rose',
  rootsNote: 'AI is a means; the Bestower of knowledge is Allāh. Use AI to free time for tafakkur, not to replace it.'
}
```

The five remaining tiles: E² EduHub · Pathways Hub · Visual Learning
Path Builder · E² Teaching Framework · Roots of Knowledge.

To restore: paste the tile back into the `ARTIFACTS` array in
`EduHub.jsx`, and re-add a live target for the `href`. If /ai-studio
itself is restored (see `ai-studio.md` archive), also re-add the
lazy import + Route in `App.jsx` and the More-menu entry in
`Navbar.jsx`.
