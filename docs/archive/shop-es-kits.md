---
original_route: /shop
original_files:
  - src/pages/Shop.jsx (section id="kits")
  - src/data/shopProducts.js (shopKits export)
removed_at: 2026-07-15
removed_in_commit: '(this commit)'
reason: 'Kit prices ($79–$249) undercut the $10k/level school-license pricing on /for-schools. A school prospect seeing "Buy ES-C for $79" would balk at the $10,000/year license for the same track. Removed to protect the B2B price point. The Tajweed Reading Series bundle ($15) + 5 individual lessons ($4 each) stay on /shop as an intentional entry-level lead magnet toward the licensing tier.'
---

# /shop — removed "Roots Elementary Kits" section

## Section header

- **Eyebrow:** Curriculum in a box
- **H2:** Roots Elementary Kits
- **Subhead:** For homeschoolers and microschools who want everything for a track (or across all three). Each kit is a curated bundle of the Roots resource packs.

## The four kit cards

### 1. Roots — Full Beginner Kit
- **Track:** ES-C
- **Tagline:** Everything a beginner (ES-C) student needs
- **Description:** Every beginner resource pack in one bundle: phonics cards, word-shape toolkit, multi-letter sets, short-vowel guides, and target-surah manuals for the beginner track.
- **Price:** $79 (one-time)
- **Buy button:** `mailto:dinabudu@gmail.com?subject=Roots%20%E2%80%94%20Full%20Beginner%20Kit%20%E2%80%94%20purchase%20enquiry`
- **Caption:** "Launching soon on Payhip & Gumroad"

### 2. Roots — Full Intermediate Kit
- **Track:** ES-B
- **Tagline:** Everything for the intermediate (ES-B) track
- **Description:** All intermediate resource packs plus the tajweed foundations kit — ready to run a full year of the ES-B curriculum from home.
- **Price:** $99 (one-time)
- **Buy button:** mailto with same pattern
- **Caption:** "Launching soon on Payhip & Gumroad"

### 3. Roots — Full Advanced Kit
- **Track:** ES-A
- **Tagline:** Everything for the advanced (ES-A) track
- **Description:** All advanced resource packs plus adaab, capstone portfolios, and evaluation portfolio templates for graduating students.
- **Price:** $129 (one-time)
- **Buy button:** mailto with same pattern
- **Caption:** "Launching soon on Payhip & Gumroad"

### 4. Roots — Everything Elementary
- **Track:** All 3 tracks
- **Tagline:** All three kits together
- **Description:** The full elementary bundle: Beginner + Intermediate + Advanced kits. Everything a homeschool or microschool needs to run the entire Roots elementary curriculum.
- **Price:** $249 (one-time)
- **Badge:** "Save $58"
- **Style:** Bundle card had a brand gradient background instead of a white ring (rendered via `isBundle = !!kit.badge`)
- **Buy button:** mailto with same pattern
- **Caption:** "Launching soon on Payhip & Gumroad"

## Source

The section lived in `src/pages/Shop.jsx` between the "Individual lessons"
grid and the "About the author" block. The data lived in
`src/data/shopProducts.js` as the exported `shopKits` array. The Shop.jsx
import was:

```js
import { shopBundle, shopLessons, shopKits, shopAuthor } from '../data/shopProducts.js';
```

## Original data (verbatim)

```js
export const shopKits = [
  {
    id: 'kit-beginner',
    track: 'ES-C',
    name: 'Roots — Full Beginner Kit',
    tagline: 'Everything a beginner (ES-C) student needs',
    description:
      'Every beginner resource pack in one bundle: phonics cards, word-shape toolkit, multi-letter sets, short-vowel guides, and target-surah manuals for the beginner track.',
    price: 79,
    buyEmail: 'dinabudu@gmail.com',
  },
  {
    id: 'kit-intermediate',
    track: 'ES-B',
    name: 'Roots — Full Intermediate Kit',
    tagline: 'Everything for the intermediate (ES-B) track',
    description:
      'All intermediate resource packs plus the tajweed foundations kit — ready to run a full year of the ES-B curriculum from home.',
    price: 99,
    buyEmail: 'dinabudu@gmail.com',
  },
  {
    id: 'kit-advanced',
    track: 'ES-A',
    name: 'Roots — Full Advanced Kit',
    tagline: 'Everything for the advanced (ES-A) track',
    description:
      'All advanced resource packs plus adaab, capstone portfolios, and evaluation portfolio templates for graduating students.',
    price: 129,
    buyEmail: 'dinabudu@gmail.com',
  },
  {
    id: 'kit-everything-elementary',
    track: 'All 3 tracks',
    name: 'Roots — Everything Elementary',
    tagline: 'All three kits together',
    description:
      'The full elementary bundle: Beginner + Intermediate + Advanced kits. Everything a homeschool or microschool needs to run the entire Roots elementary curriculum.',
    price: 249,
    badge: 'Save $58',
    buyEmail: 'dinabudu@gmail.com',
  },
]
```

## To restore

Only restore this section if the B2B pricing on `/for-schools` also
changes to a level that no longer conflicts with a $79–$249 retail
tier. Otherwise, the price mismatch will undermine every school pitch.

If restoring:
1. Paste the `shopKits` export back into `src/data/shopProducts.js`.
2. Re-add `shopKits` to the import in `src/pages/Shop.jsx` line 1.
3. Paste the `<section id="kits">` block back into `Shop.jsx` between
   the "Individual lessons" section and the "About the author"
   section. Reference the JSX chrome in git — commit
   `docs: archive removed pages for historical reference` and
   earlier `c865c46^` contain the full markup.
