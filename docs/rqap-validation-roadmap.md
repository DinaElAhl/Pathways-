# RQAP assessment development and validation

## Implemented in this change
- Non-native scored forms use general Arabic, not Quran memorisation/religious recall. Forty-eight replacement reading items form sixteen short reading testlets across the four target bands and four age-context variants. Form length remains ten questions; the provisional 7/10 cutoff is unchanged.
- Private keys live in server/nonNativeBank.js. Public stems/options live in src/data/examQuestions.js. Only the separate warm-up retains immediate feedback and client-side practice keys.
- Blind scored forms support previous/next, skipping, marking for review and a final unanswered summary. Responses are marked by /api/score-arabic, not client pass flags. Failed requests retain the pending form in the current page for retry; reloading does not restore it.
- Reports show vocabulary/grammar/reading counts, not claims about untested oral or writing proficiency.
- Native RQAP reports distinguish actual attempted items, objective knowledge, and completion-only sections requiring human review. The word-count split is corrected. Historical demonstration weights, verdict logic, certificate flow and registry submission are otherwise unchanged.

## Scope of the evidence
New Arabic items and age variants remain uncalibrated pilot content requiring expert review. Four intended A1–B2 mappings are not validated CEFR claims. Reading questions sharing one passage are a testlet, not independent evidence of three unrelated abilities. Ten-question forms remain too limited for high-confidence international placement. No new audio models, human marking service, external accreditation or secure proctoring has been created.

## Remaining critical native-assessment issue
Writing and recitation demonstration scores still reflect length/reported duration, not expert quality judgement. We have labelled that clearly and exposed human-review requirements; we have not replaced them with a fabricated automatic proficiency score or changed certificate issuance. Formal proficiency use should wait for real qualified marking and an approved policy that excludes completion proxies from certification.

## Stage 1: specification and content review
1. Define separate uses: informal placement, diagnostic guidance, or consequential credentialing. Do not reuse a pilot result for a purpose it cannot support.
2. Define native literacy vs additional-language proficiency; age/context is a separate axis. Specify Modern Standard Arabic expectations and how dialectal variants are handled. Tajweed specialists specify the recitation tradition, sources and acceptable variants.
3. Build skill specifications: listening, reading, spoken production/interaction, extended writing, and separate recitation performance. Do not combine religious background knowledge with general Arabic placement.
4. Add expert-authored items and real reviewed audio. Give every item an ID/version, construct, demand, source, age-context tag, key rationale and distractor rationale. Review each for ambiguity, cultural assumptions and accessibility.

## Stage 2: human assessment and differentiated profiles
Writing: task fulfilment, coherence, lexical/grammatical control, spelling/script.
Speaking: task/interaction, comprehensibility, fluency/repair, lexical/grammatical control.
Recitation: letter/vowel accuracy, agreed rule application, continuation/pausing, consistency/self-correction.

These are proposed dimensions, not validated scales. Develop observable rating descriptors and benchmark performances with specialists; train raters, double-mark a planned sample, reconcile disagreements and evaluate agreement. Retain separate skill profiles; do not average away a serious weakness or report missing skills as assessed.

## Stage 3: pilot and standard setting
- Recruit consented learners across first languages, age groups, instruction histories and access needs. Minors participate through appropriate adult consent and data handling.
- A measurement specialist should plan adequate pilot sampling; no fixed sample size here guarantees validation.
- Examine difficulty, discrimination, distractor functioning, testlet dependence, timing and omissions. Examine group differences and potential differential item functioning where sample support permits it.
- Establish defensible cuts with expert standard setting and learner evidence. Analyse classification uncertainty, reliability, alternate-form equivalence and retest effects before changing awards.
- Review access arrangements and document their effects. One global timer is not proof of fairness.

## Stage 4: secure, accountable operation
Authenticated or signed attempts, server-held form assignment, attempt limits and item exposure controls, protected learner recordings, real rater workflow, verified issuance registry and data retention/deletion. A public stateless scoring endpoint hides the answer key from the bundle but is not secure high-stakes testing: repeated answer probing, unproctored help and repeated attempts remain possible. Do not claim otherwise.

## Stage 5: external review
Publish a technical report describing coverage, data, standard setting, reliability, fairness, limitations, review process and appeals. Seek appropriate independent review/accreditation. Keep all public wording at pilot status until approval is actually established.

Primary guidance:
- Council of Europe tests and examinations: https://www.coe.int/en/web/common-european-framework-reference-languages/tests-and-examinations
- CEFR test development: https://www.coe.int/en/web/common-european-framework-reference-languages/developing-tests-examining
- ALTE materials: https://www.alte.org/Materials
