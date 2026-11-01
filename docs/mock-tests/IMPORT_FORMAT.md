# Question import format

Upload at **/admin/questions/import** as CSV or JSON. Always press **Check file** first. It reports every row
with a problem, and nothing is saved until you press **Import**.

- Questions are matched by `external_key`. Re-importing the same key **updates** that question (text,
  translations, answer) instead of creating a duplicate. A good key is `EXAM-YEAR-SHIFT-QNO`, for example
  `JEE_MAIN-2025-S1-Q17`.
- Imported questions are **Draft** unless you tick "Mark as Approved". Only Approved questions with a checked
  answer key (`key_verified`) can be put into a test.
- HTML is cleaned on import. Allowed: paragraphs, bold/italic, sub/sup, lists, tables, `<img src="https://…">`.
- Maths: write LaTeX between `\(` and `\)` (inline) or `\[` and `\]` (display), for example `\(x^2 + 1\)`.

## Fields
| Field | Required | Values |
|---|---|---|
| `external_key` | yes | unique text |
| `exam` | yes | `MHT_CET`, `JEE_MAIN`, `JEE_ADV`, `NEET_UG` |
| `subject` | yes | must match a preset section subject: `Physics`, `Chemistry`, `Mathematics`, `Biology` (MHT-CET PCB), `Botany`, `Zoology` (NEET) |
| `chapter`, `topic` | chapter yes | free text (used for weak-chapter analysis and practice) |
| `type` | yes | `SINGLE_MCQ`, `MULTI_MCQ`, `NUMERICAL`, `PARAGRAPH`, `MATRIX_MATCH` |
| `difficulty` | no | 1–5 (default 3) |
| `group_id` | no | same value for questions that share one passage (kept together) |
| `shuffle_options` | no | `false` for options like "All of the above" (default true) |
| `pyq_year`, `pyq_shift`, `question_number` | no | for previous-year questions |
| `license_status` | no | `OWNED_OR_LICENSED`, `ORIGINAL_SAMPLE`, `UNKNOWN` (default; cannot be published) |
| `key_verified` | no | `true` once the answer is checked against the final official key |
| `language` | CSV only | `en` (required for every question), `hi`, `mr`, `ur`, `gu` |
| `passage`, `stem`, `solution` | stem yes | HTML / text |
| `option_a` … `option_e` | MCQ types | option text; option ids are the letters |
| `correct` | MCQ types | option letter(s), for example `b`, or `a,c` for multi-correct |
| `numerical_exact` or `numerical_min` + `numerical_max` | numerical | the number, or an inclusive range |

## CSV
One row per question per language. Rows with the same `external_key` are merged. The question details and answer
are taken from the first row, so put the `en` row first.

```csv
external_key,exam,subject,chapter,type,language,stem,option_a,option_b,option_c,option_d,correct,numerical_exact,solution,license_status,key_verified
JEE_MAIN-2025-S1-Q01,JEE_MAIN,Physics,Kinematics,SINGLE_MCQ,en,"A ball is thrown up at \(20\,\text{m/s}\). Maximum height?",20 m,40 m,10 m,30 m,a,,"\(h = u^2/2g = 20\,\text{m}\)",OWNED_OR_LICENSED,true
JEE_MAIN-2025-S1-Q01,JEE_MAIN,Physics,Kinematics,SINGLE_MCQ,hi,"एक गेंद को \(20\,\text{m/s}\) से ऊपर फेंका जाता है। अधिकतम ऊँचाई?",20 m,40 m,10 m,30 m,a,,,OWNED_OR_LICENSED,true
JEE_MAIN-2025-S1-Q21,JEE_MAIN,Physics,Laws of Motion,NUMERICAL,en,"A 2 kg block is pushed by 10 N for 3 s from rest. Final speed in m/s?",,,,,,15,"\(v = at = 15\)",OWNED_OR_LICENSED,true
```

## JSON
An array (or `{ "questions": [...] }`). Same fields in camelCase; translations and the answer are nested:

```json
[
  {
    "externalKey": "JEE_ADV-2025-P1-Q05",
    "exam": "JEE_ADV",
    "subject": "Chemistry",
    "chapter": "Aromaticity",
    "type": "MULTI_MCQ",
    "difficulty": 3,
    "licenseStatus": "OWNED_OR_LICENSED",
    "keyVerified": true,
    "translations": {
      "en": {
        "stem": "Which of the following are aromatic?",
        "options": { "a": "Benzene", "b": "Cyclopentadienyl anion", "c": "Cyclooctatetraene", "d": "Pyridine" },
        "solution": "6 π electrons, planar and cyclic: A, B and D."
      }
    },
    "answer": { "correct": ["a", "b", "d"] }
  }
]
```

The sample questions in `data/test-samples/questions.mjs` use the same JSON shape.
