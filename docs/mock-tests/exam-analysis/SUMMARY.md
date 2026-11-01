# Exam pattern check (November 2026)

The pasted master prompt's preset values were cross-checked against public reporting on the 2026 patterns.
**None of these were confirmed from an official brochure**, so every preset is stored with `verified = false`
until someone checks it at `/admin/presets`. Coaching and education sites were used only to cross-check,
as the prompt asked, and they disagree in places (noted below).

| Exam | What the reports agree on | Conflicts / to verify | Official source to check |
|---|---|---|---|
| **JEE Main (Paper 1)** | 75 questions, 300 marks, 3 h. Per subject: 20 MCQs (Section A) + 5 numerical (Section B), all compulsory, no "attempt any 5 of 10" since 2025. +4 for a correct answer | Whether Section B numerical answers carry −1 (we use −1, as in recent bulletins) | jeemain.nta.nic.in, Information Bulletin |
| **NEET (UG)** | 180 compulsory questions, 180 min, 720 marks. Physics 45, Chemistry 45, Botany 45, Zoology 45. +4 / −1. The optional Section B has been removed | none on structure | neet.nta.nic.in, Information Bulletin |
| **MHT-CET PCM** | 150 questions, 180 min, 200 marks. Physics and Chemistry 50 each at 1 mark (first 90 min), Mathematics 50 at 2 marks (second 90 min). No negative marking. Physics and Chemistry in English, Marathi and Urdu; Mathematics in English only | exam dates differ between sources | cetcell.mahacet.org |
| **MHT-CET PCB** | Physics 50 and Chemistry 50 (first 90 min), Biology 100 (second 90 min), 1 mark each, total 200 | none on structure | cetcell.mahacet.org |
| **JEE Advanced** | Two compulsory 3-hour CBT papers in Physics, Chemistry and Mathematics. Single-correct, multiple-correct (partial marks), numerical and match-the-list questions | Question counts per paper and marks per type change every year, and sources conflict. The preset uses the spec values (+3/−1 single; +4 / partial +1 per correct option / −2 multi; +3 numerical; +3/−1 match), which can be edited | jeeadv.ac.in, Information Brochure |

## What this changes in the product
- JEE Main and NEET presets have **no** "attempt N of M" limit (`attemptLimit` stays supported for future patterns).
- The MHT-CET section lock is set to the halfway point, and the language list follows the CET Cell pattern.
- Registered-candidate counts used for rank ranges are **rough sample numbers** (JEE Main 14 lakh, NEET 22 lakh,
  MHT-CET PCM 4.5 lakh / PCB 3 lakh, JEE Advanced 1.9 lakh). Update them yearly at `/admin/presets`.
- Topic weightage tables and a full syllabus taxonomy were **not** built. The owners' question bank will provide
  chapters, and auto-pick in the test builder spreads questions evenly across chapters.

## Sources consulted (secondary, unverified)
- Allen, Vedantu, Aakash, Careers360, Physics Wallah and Resonance pages on the JEE Main 2026 pattern
- ETV Bharat (NTA NEET UG 2026 re-exam pattern release), Physics Wallah, Careers360 and Motion on the NEET 2026 pattern
- Careers360, Physics Wallah and MTG on the MHT-CET 2026 pattern
- Matrix, Physics Wallah, Vedantu and CollegeDekho on the JEE Advanced 2026 pattern

No question papers were downloaded or copied. The 67 sample questions in `data/test-samples` are original,
written in each exam's style, flagged `ORIGINAL_SAMPLE`, and their answers were checked by hand.
