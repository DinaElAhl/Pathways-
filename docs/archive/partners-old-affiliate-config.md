---
original_files:
  - src/data/partners.js
  - src/pages/PartnerPicks.jsx
changed_at: 2026-07-15
changed_in_commit: c865c46
reason: 'The site claimed an affiliate program that did not exist — six commission badges on the /partners cards, plus five outbound URLs appending ?ref=pathways to programs Pathways was not registered with. Amber "we may earn a small commission" disclosure was untrue. All refs zeroed out; disclosure rewritten; commission badges removed from the render.'
---

# /partners — removed affiliate config

## The false claim

The `affiliateDisclosure` string, rendered at the top of `/partners`
in an amber banner:

```
Some links on this page are referral links.
If you sign up or buy through them, Pathways may earn a small commission — at no extra cost to you.
We never recommend a resource just because it pays. Every pick here is vetted by our team or trusted educators.
```

The top-of-file comment in `src/data/partners.js` also described the
affiliate mechanism ("The outbound URL used by the site is `baseUrl`
with `?ref=<ref>` appended when a `ref` is present. If a resource is
fully free, set `commission` to `null`.").

## Partner entries with a non-null `ref`

Five entries had `ref: 'pathways'` — the site was appending
`?ref=pathways` to outbound clicks on partner programs Pathways was
not actually registered with.

| Line | Partner slug | Program |
|---|---|---|
| 63 | italki | italki tutor marketplace |
| 158 | (partner slug at that position) | (see git blame) |
| 196 | | |
| 272 | | |
| 291 | | |

All five now have `ref: null`.

## Partner entries with non-null `commission`

Six entries had `commission: 'Referral'` or `commission: 'Affiliate'`:

- Line 65 → `Referral`
- Line 160 → `Affiliate`
- Line 198 → `Affiliate`
- Line 274 → `Affiliate`
- Line 293 → `Referral`
- (plus any others matched by the replace pass)

All six now have `commission: null`.

## PartnerPicks.jsx — removed commission badges

The card render used to show one of two badges in the card header:

```jsx
{p.commission ? (
  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">
    {p.commission} link
  </span>
) : (
  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
    Free · no commission
  </span>
)}
```

Now replaced with a comment marking where to restore the conditional
if a real affiliate program is later signed.

## Disclosure banner — rewritten

Old (amber "affiliate" framing):

```jsx
<div className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-inset ring-amber-200">
  <strong>Affiliate disclosure · </strong>
  {affiliateDisclosure}
</div>
```

New (emerald "no affiliate program" framing):

```jsx
<div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900 ring-1 ring-inset ring-emerald-200">
  <strong>No affiliate program · </strong>
  {affiliateDisclosure}
</div>
```

New `affiliateDisclosure` string in `partners.js`:

```
These are honest recommendations — no affiliate program, no commissions, no tracked signups. Every link goes straight to the resource.
```

## `partnerUrl(partner)` helper

The helper still works — it only appends `?ref=` if `partner.ref` is
truthy. With every ref now `null`, it returns `partner.baseUrl`
unchanged.

To restore: pick specific partners where a real affiliate program has
been signed, set their `ref` and `commission` fields back, and re-add
the commission-badge conditional in `PartnerPicks.jsx` (the comment
in the render marks the spot). Update `affiliateDisclosure` copy to
match reality at the same time.
