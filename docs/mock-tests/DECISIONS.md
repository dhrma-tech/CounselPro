# Decisions: where Phase 1 differs from the master prompt

| Topic | Master prompt | What we did | Why |
|---|---|---|---|
| Stack | Express, Prisma, Redis/BullMQ, S3, Twilio, Razorpay | Next.js server code + Supabase | That is what CounselPro actually runs on; Supabase covers the database and login on a free plan |
| Look and feel | Plus Jakarta Sans, Inter, `#2563EB` | Existing DM Serif Display + Outfit, brand navy/blue/teal/violet | The existing UI wins; only the 5-state exam palette uses its own semantic colours |
| Scope | Everything at once | Phase 1 = tests, quizzes, results, rank estimate, admin | Agreed with the owner; hooks and services follow in later phases |
| Roles | Guest / Student / Super-Admin | Guest / Student / Admin (`ADMIN_EMAILS` allow-list) | No separate roles table is needed for a handful of staff accounts |
| Auto-submit | BullMQ delayed job | Lazy: scored the next time the attempt is loaded | No paid queue; results are always correct when viewed |
| Offline queue | IndexedDB | `localStorage` | Small payloads; simpler; same behaviour |
| Heartbeat | 2 s (spec) / 5–10 s | 10 s | Enough to detect drift and connection loss on mobile data |
| Submit button | Disabled until 00:00 in spec | Always enabled, with a confirmation dialog | Practice product; students should be able to finish early |
| Matrix match | Grid mapping UI | Single-correct options listing the mappings | Matches the current JEE Advanced "match the list" format (one option = one full mapping) |
| Paragraph questions | Passage pane + sub-questions | Each sub-question carries the passage; questions in a passage share a `group_id` and stay together when shuffled | Simpler, same exam behaviour |
| Unsaved buffer on a marked question | "becomes Not Answered" | A question already marked for review stays marked when you navigate away | Dropping a mark the student set on purpose felt wrong; the unsaved answer is still discarded |
| Language switcher | Fixed per preset | Shows only languages that the question actually has | Avoids showing empty translations |
| Sample content in production | Publish guard blocks samples | Blocked unless `ALLOW_SAMPLE_CONTENT=true` | Lets the site launch with demo tests before the owners' bank is imported |
| Sample mocks | Full length | 15–16 questions, 16–50 min | Enough to try the full flow quickly; real full-length mocks come from the owners' bank |
| Guest results | Limited analysis | Score, rank estimate and section table for guests; weak chapters, marks lost and solutions after sign-in | Signing in is the main conversion step |
| Answer-key challenges, AI drafting, weekly windows | In spec | Not in Phase 1 | Planned for later phases |
| PDF | Server-generated | Browser "Print / Save as PDF" with print styles | Free and works everywhere |
| College predictor | Excluded | Excluded. Rank estimate, category, home state and gender are stored on attempts and profiles for later | As specified |
