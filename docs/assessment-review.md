# Roots assessments — implementation review, 13 October 2026

This is a code and documentation review, not a scholarly validation, accreditation decision, or claim of world-leading quality. No candidate recordings or pilot datasets were available. Source review: `src/pages/PathwaysExam.jsx`, `src/data/examData.js`, `public/rqap.html`, `api/score-rqap.js`, methodology and alignment pages.

## Implemented corrections

- Arabic warm-up timer resets for every question and pauses during feedback. Both React exam timers use elapsed wall-clock time and fire expiry once; a confirmed answer survives expiry during feedback.
- RQAP numeric MCQ choices are validated without coercion; null/blank/false no longer earn option-zero credit. Writing completion counts actual text. Invalid/zero-duration audio no longer earns completion credit.
- Public methodology and alignment copy now matches implemented cutoffs and describes completion proxies and unvalidated CEFR mappings. Removed the download link to the outdated alignment PDF; the static legacy PDF itself is unchanged.
- Certificate implementation, registrar/webhook configuration, email address, payment integrations, and environment variables were not changed.

## Current evidence

RAQP contains 160 scored and 80 warm-up items: four intended A1–B2 levels, four school-type variants, ten scored and five warm-up items per form. It uses a sequential 70% threshold. Written MCQs do not establish listening, spontaneous speaking, or writing proficiency. Automatic bank checks confirm counts, valid keys, unique options, and no identical warm-up/scored stimulus; they do not establish linguistic validity.

RQAP Level 2 has 18 MCQs, two writing tasks, and one recording task across both tracks. Language weights 20/20/30/30, thresholds 65 pass/80 distinction. Tajweed weights 40/25/35, thresholds 70 pass/85 distinction. No Merit or section-minimum policy exists. Writing and audio marks remain completion proxies. A correct duration is not evidence of a correct recitation; arbitrary repeated text can still earn writing completion points.

## Release blockers for accredited or high-stakes use

1. **Authentic performance marking:** replace writing/recording proxies with qualified raters, anchored rubrics, second marking, disagreement adjudication, and retained evidence. Do not release duration or text-length marks as certified proficiency.
2. **Certificate accuracy and authenticity:** RQAP partial passes can label both selected tracks on the printed certificate. Issuance is browser-generated; registrar configuration is empty in the reviewed source. Two-year validity requires an explicit justified policy. Fix scope, authoritative issuance, verification, and revocation before credential use. These protected flows were reviewed but not modified.
3. **Security:** Arabic scored keys and immediate answer feedback remain client-side. RQAP correctness responses plus unlimited API attempts can expose keys by probing. Require server-authoritative sessions, finite attempts, rate limits, separate practice banks, and delayed item feedback. CORS is not authentication.
4. **Construct definition:** separate general Arabic proficiency, Qur’anic language comprehension, tajweed theory, and practical recitation. Document the recitation tradition and scholarly sources with qualified specialists. Religious familiarity and grammatical terminology are not substitutes for communicative ability.
5. **Validated levels:** CEFR targets and age variants need descriptor mapping and empirical equating. Ten items per level and a two-item comprehension section provide limited evidence; establish adequate coverage and classification accuracy through trials before expanding claims.
6. **Accessibility and fairness:** trial with heritage and non-heritage learners, children and adults, dyslexia and assistive technologies; document reasonable adjustments, alternative recording routes, microphone failures, consent, and data handling. Do not infer poor proficiency from device failure.
7. **Governance:** identify independent Arabic assessment and tajweed reviewers; define reviewer credentials, complaints, retakes, privacy/retention, versioned scoring policy, and accreditation scope. No external recognition was verified by this review.

## Development sequence and acceptance evidence

First contain credential claims and repair protected issuance/scoring flows. Then approve a construct blueprint and review every item for one defensible key, plausible distractors, correct Arabic, clear task demands, source fidelity, and level appropriateness. Develop listening and productive tasks for Arabic; require genuine recitation evidence for tajweed. Train and calibrate raters using benchmark performances. Pilot representative cohorts, analyse difficulty/discrimination, reliability, rater agreement, subgroup fairness, and decision errors; set cutoffs through expert standard-setting and empirical checks rather than marketing targets. Publish the technical manual and submit to an appropriate independent reviewer/accreditation partner. Sample sizes and acceptance thresholds must be set by the assessment specialist based on intended stakes; none are fabricated here.

## Primary references

- Council of Europe examination documentation: https://rm.coe.int/1680667a25 — scope, marking, pretesting, validity, reliability, and CEFR evidence.
- Council of Europe / ALTE test-development manual: https://rm.coe.int/1680667a2b
- EALTA good-practice guidelines: https://ealta.eu/ealta-guidelines-for-good-practice-in-language-testing-and-assessment/

These sources inform the proposed development process; they do not endorse or accredit Roots.
