---
original_file: src/data/resources.js
changed_at: 2026-07-15
changed_in_commit: c865c46
reason: 'Three resource entries carried fabricated author attributions. Replaced with "Pathways" so the ResourceCard component keeps rendering an author line without misattributing work.'
---

# resources.js — replaced author fields

Three of the twelve resource entries had persona-style author names. The
new value is `'Pathways'` for all three. Original names below.

| Resource slug (position) | Original `author` field | Replacement |
|---|---|---|
| Row 3 (Math unit, was `Ms. Aguilar`) | `Ms. Aguilar` | `Pathways` |
| Row 6 (Notion coaching template, was `Léa B.`) | `Léa B.` | `Pathways` |
| Row 9 (was `Ms. Park`) | `Ms. Park` | `Pathways` |

The remaining nine entries used generic team-style attributions
(`Pathways`, `Pathways research`, `Pathways families`, `Pathways
community`, `Pathways faculty`, `Pathways tools`, `Pathways for
Institutions`, `Literacy Lab`, `Vetted mentor network`, `Design for
Learning`) which were left in place.

To restore any of the removed names: put the string back in the
`author:` field of the corresponding entry in `src/data/resources.js`.
Prefer real names of contributors whose permission is on file.
