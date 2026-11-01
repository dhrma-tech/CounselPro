# How the rank estimate works

Shown only for **full mock** tests in exam mode. Always labelled "Estimate. Official ranks may differ."
Code: `lib/tests/rank.ts` (unit-tested), called from `finalizeAttempt()` in `lib/tests/server/attempts.ts`.

1. **Scale the score** to the real exam's total marks: `scaled = score × preset.totalMarks / test maxScore`.
   Sample mocks are shorter than the real paper, so this keeps scores comparable with the reference table.
2. **Cohort percentile**: the share of our own students whose scaled score is at or below yours.
   Only each student's **first attempt** at that test counts (`counts_as_rank`), so re-attempts can't inflate it.
   It is used only when at least `RANK_COHORT_THRESHOLD` (default 30) first attempts exist.
3. **Reference percentile**: linear interpolation over the newest marks→percentile table for that exam
   (`rank_reference`, uploaded at `/admin/presets`).
4. **Combine**:
   - both available: average of the two
   - one available: use that one
   - neither: no estimate is shown
5. **Rank range**: `base = (100 − percentile) / 100 × registered candidates` (from the preset). The range is
   ±5 % (High), ±12 % (Medium) or ±25 % (Low) around it, clamped to between 1 and the number of candidates.
6. **Confidence**:
   - **High**: real (non-sample) reference data and a cohort of at least 10× the threshold
   - **Medium**: real reference data, or a large cohort
   - **Low**: otherwise, including whenever the reference table is sample data

The seeded reference tables are **illustrative sample curves, not official data**. While they are in use,
the results page says so. Replace them with official or owned data at `/admin/presets`.
We do not claim to replicate NTA or CET Cell normalisation.
