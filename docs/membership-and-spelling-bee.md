# Monthly tools membership and Roots Spelling Bee

## Available in this change

- `/spelling-bee`: free starter rounds for Roots C/B/A, with ES/MS/HS age
  grouping, Arabic audio, vowelled tiles, optional typed input, correction,
  retry and an actual whole-round deadline in timed mode.
- The current bank has 3 C prompts, 5 B prompts and 5 A prompts; some words
  recur between stages. All age bands use the same bank at their stage.
- First-try unassisted answers earn one point. Seeing a model or retrying
  cannot turn that answer into a first-try point. Empty and omitted answers
  earn no point. Optional vowel marks do not hide spelling contrasts such as
  hamzah, ta marbutah or alif maqsura.
- A shared class link selects the same deterministic starter round. Teachers
  compare device results manually. There is no shared event service or public
  leaderboard. Scores are local to the open tab and are not trustworthy
  submissions for ranked, prize-bearing or high-stakes events.
- Audio reuses existing synthetic practice recordings. It is not a human
  pronunciation assessment. No microphone, email or learner name is collected.
- `/membership`: the monthly teacher tools proposal, with free tool links and
  a user-initiated email enquiry. Price and checkout are unset. Existing tools
  are not removed or paywalled by this change.

## Required before charging for tools

Confirm the monthly price, exact premium tool scope, billing provider and
renewal/cancellation terms. Deliver the premium features before selling access.

The existing API auth files do not provide the verified sessions and membership
entitlements required here. A client-side flag or hidden route is not payment
protection. Implement and test:

1. Real sign-in and validated server sessions.
2. A billing provider's authenticated subscription events and a persisted
   membership entitlement, including cancellation, failed renewal and expiry.
3. Server checks on every premium data/resource operation; private resources
   must not be bundled into public static assets.
4. Billing/account management, clear renewal terms and receipt delivery.
5. A test subscription through purchase, access, cancellation and expiry.

No existing Apps Script, certificate, Payhip/Gumroad integration, credential or
environment variable is changed by this preparation.

## Required before a shared online competition

Confirm the event rules, participant grouping and adult-managed participation
process. Expand the bank and have the language/audio checked. Then add persisted
events, server-issued attempts, server deadlines, scoring and submission limits.
Do not accept client totals as authoritative. Use safe participant identifiers,
result moderation and defined retention; do not publish children's real names.

Saved, shared rankings need this server-backed service. The classroom starter
version intentionally makes no claim to have it already.

## Validation

`node --test tests/spelling-bee.test.mjs`

`npm run build`

Browser checks cover a wrong answer without automatic advancement, vowelled
correction, retry scoring, repeated-letter tiles, Arabic audio, real timer
expiry, omitted answers and a 390px mobile layout.

## Differentiated membership proposal

The public membership page separates individual teachers, small teaching businesses and schools. All tiers remain proposals: teacher and team monthly prices are unconfirmed; schools are quoted individually. The page provides voluntary email enquiries, not checkout or automatic mailing-list enrolment.

Individual access proposes personal planning and saved progress. Team access proposes shared resources and an owner view. School access proposes agreed staff seats, reporting and onboarding. Seat counts, learner limits and support commitments must be agreed before launch. Existing free tools remain free; paid books, worksheet packs and curriculum licences are separate unless explicitly included in a final offer.

Do not enable checkout until secure accounts, server-verified entitlements, recurring billing and cancellation/expiry handling are tested. The current E² pilot remains browser-local with manual file exchange.
