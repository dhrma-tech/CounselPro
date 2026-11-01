# Mock Tests & Quizzes: Phases 1 and 2

Free mock tests and chapter quizzes that lead students into the existing counselling
application (`/apply`). The counselling pipeline (`store/applicationStore.ts`, `lib/formConfigs.ts`,
`components/counselling/**`, `app/apply`, `app/counselling/**`, `app/actions/submission.ts`) is unchanged.

## Stack
- Next.js 16 App Router (same app). Server code lives in route handlers, server components and server actions.
- Supabase (project `CounselPro`, Mumbai) for the database and login (Google + email code).
- KaTeX for maths, sanitize-html for imported HTML, papaparse for CSV, vitest for unit tests. All free.

## How it fits together
```
/tests ──► /tests/[slug] (lobby) ──POST /api/attempts──► /tests/attempt/[id]
                                                           │  ExamTerminal (mocks) or QuizShell (quizzes)
                                                           │  PUT  /api/attempts/[id]/responses/[qid]  (every answer)
                                                           │  POST /api/attempts/[id]/heartbeat        (every 10 s)
                                                           ▼  POST /api/attempts/[id]/submit
                                                   /tests/results/[id] ──"Get counselling help"──► /apply
/practice ──POST /api/practice──► one-off quiz built from the question bank
/my-tests, /login, /auth/callback, /admin/*

Phase 2 (hooks that bring students back):
/tests/daily ──POST /api/daily/start──► today's 10-question quiz (same for everyone) ──► streak
/tests/revision ──POST /api/revision/start──► quiz from due or saved questions
/tests/[slug]/leaderboard          all students / my state; weekly mocks rank inside their window
/tests/results/[id] ──"Challenge a friend"──► /c/[token] ──► /tests/[slug]?challenge=… ──► head-to-head
                    ──"Share score"────────► /s/[id] (score card + WhatsApp preview image)
                    ──"Ask AI" / study plan─► /api/ai/ask, /api/attempts/[id]/plan (Gemini, only if a key is set)
```

- **Security**: the browser never talks to Supabase tables. All reads and writes go through our server with the
  service-role key, after an ownership check (signed-in user, or the `cp_guest` cookie for guests).
  RLS is on for every table, and the `anon` / `authenticated` roles have no table privileges (migration 0002).
  Correct answers and solutions are only sent after submission (or after each answer in quiz mode).
- **Timer**: the server sets `ends_at` and the client only displays it. Writes after `ends_at + 30 s` are rejected.
  Expired attempts are scored automatically the next time anything loads them ("lazy auto-submit"), so no
  paid job queue is needed.
- **MHT-CET section lock**: Physics and Chemistry are open for the first half and Mathematics/Biology for the second.
  This is enforced on the server too.
- **Offline**: answers are queued in `localStorage` and sent in order when the connection returns.
  The timer keeps running.
- **Shared pure logic** (`lib/tests/*.ts`, unit-tested): palette state machine, scoring (incl. JEE Advanced
  partial marks), seeded shuffling, sectional lock, rank estimate, mistake tags, streaks, revision ladder, IST dates.

## Phase 2 features
- **Mistake analysis** (`lib/tests/mistakes.ts`): every wrong, skipped or slow question gets one plain tag
  (concept gap, silly mistake, time pressure, guess, correct but slow, skipped but capable) using fixed, explainable
  thresholds. Also shows guesses that paid off or cost marks, "time sinks", and an attempt-more / be-selective verdict.
  Computed once at submission and stored on the attempt.
- **Daily quiz + streaks**: one 10-question, 10-minute quiz per exam per day (IST), created by the first visitor and
  avoiding the last 7 days' questions. Signed-in students keep a streak with one free "freeze" per week.
- **Revision**: wrong, skipped and marked questions (via "Revise mistakes") and starred questions go on a list.
  A right answer brings a question back after 1, 3, 7, 14, 30, 60 days; a wrong one brings it back tomorrow.
- **Weekly open mocks + leaderboards**: an admin sets an opening and closing time (India time). Only first attempts
  inside the window count; answers and solutions unlock when it closes. Leaderboards show all students or the
  student's home state. Names show as "Rahul S." unless the student hides them ("Student #1234").
- **Sharing**: friend challenges (`/c/[token]`) compare scores on the same test; share cards (`/s/[id]`) show a
  score card with a preview image for WhatsApp. Both credit the sharer if the visitor signs up within an hour (referrals).
- **AI (optional)**: "Ask AI" on each question and a 3-fix + 7-day study plan, in English, Hindi or Marathi, through
  the Gemini free tier. Hidden everywhere until `GEMINI_API_KEY` is set. Limits: 15 explanations and 5 plans per
  student per day; answers are cached so repeat questions cost nothing.
- **Dropped**: study groups (removed by the owner; migration 0004 drops their tables).

## Files
| Area | Where |
|---|---|
| Database schema | `supabase/migrations/0001_mock_tests.sql`, `0002_revoke_public_access.sql`, `0003_hooks.sql`, `0004_drop_groups.sql` |
| Pure logic + tests | `lib/tests/{palette,scoring,shuffle,sectionLock,rank,mistakes,streak,spacedRepetition,istDate}.ts`, `lib/tests/__tests__` |
| Server logic | `lib/tests/server/{attempts,content,practice,admin,profile,daily,revision,leaderboard,social,ai}.ts` |
| AI | `lib/ai/gemini.ts`, `components/tests/ai/*` |
| Phase 2 pages | `app/tests/{daily,revision}`, `app/tests/[slug]/leaderboard`, `app/c/[token]`, `app/s/[id]` |
| Import / publish (shared with seed script) | `lib/tests/importFormat.ts`, `lib/tests/publish.ts` |
| Student UI | `app/tests/**`, `app/practice`, `app/my-tests`, `components/tests/**` |
| Login | `app/login`, `app/auth/callback`, `components/auth/*`, `proxy.ts` |
| Admin | `app/admin/**`, `components/admin/*` |
| Sample content | `data/test-samples/*.mjs`, loaded by `node scripts/seed-tests.mjs` |

## Environment variables
| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project URL and publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret.** Server only. Never expose it or commit it. |
| `ADMIN_EMAILS` | Comma-separated emails allowed into `/admin` |
| `GUEST_DAILY_LIMIT` | Tests a guest can start per day (default 5) |
| `RANK_COHORT_THRESHOLD` | Attempts needed before our own students are used for percentile (default 30) |
| `ALLOW_SAMPLE_CONTENT` | `true` lets the original sample questions be published (turn off once your bank is imported) |
| `IP_HASH_SALT` | Random string used to hash IPs for guest rate limiting |
| `GEMINI_API_KEY` | **Secret.** Free key from Google AI Studio. Leave empty to keep all AI features hidden |
| `GEMINI_MODEL` | Optional. Gemini model name (default `gemini-3.5-flash-lite`) |
| `AI_DAILY_LIMIT` | "Ask AI" explanations per student per day (default 15) |

Add the same variables in Vercel → Project → Settings → Environment Variables.

## One-time setup still needed (by a person)
1. **Google sign-in**: create an OAuth client in Google Cloud Console (type "Web application"). Add the redirect URI
   `https://pbtfccaopbqmnunidwpf.supabase.co/auth/v1/callback`, then paste the client ID and secret into
   Supabase → Authentication → Sign In / Providers → Google.
2. **Auth URLs**: Supabase → Authentication → URL Configuration. Set the Site URL to `https://counselpro.in`, and add
   `https://counselpro.in/auth/callback` and `http://localhost:3000/auth/callback` to the Redirect URLs.
3. **Email code**: in Supabase → Authentication → Emails → "Magic Link", add `{{ .Token }}` to the template so the
   email shows the 6-digit code as well as the link. Supabase's built-in email sends only a few emails per hour;
   for real traffic, add free SMTP (for example Brevo or Resend) under Authentication → SMTP.
4. **Your question bank**: import it at `/admin/questions/import` (format: `IMPORT_FORMAT.md`), build tests at
   `/admin/tests/new`, then set `ALLOW_SAMPLE_CONTENT=false` and archive the sample tests.
5. **Verify presets**: at `/admin/presets`, check each exam pattern against the official notice, tick "verified",
   and upload real marks→percentile tables to replace the sample curves.
6. **Drop the group tables**: in Supabase → SQL Editor, run `supabase/migrations/0004_drop_groups.sql` once.
7. **Turn on AI (optional)**: create a free key at Google AI Studio (aistudio.google.com → Get API key) and add it as
   `GEMINI_API_KEY` in `.env.local` and in Vercel. Restart the app. "Ask AI" and the study plan then appear on results.
8. **First weekly mock**: at `/admin/tests/new`, build a full mock, tick "Weekly open mock", set the opening and
   closing times, save and publish. It then shows as a banner on `/tests`.
9. **Check while signed in** (not yet tested with a real login): the streak after a daily quiz, "Revise mistakes"
   and `/tests/revision`, the leaderboard settings form, a friend challenge link and a share card link.

Tip for Windows: start `npm run dev` from `E:\CODEBASE\CounselPro` (capital E). Started from `e:\…`, API routes
nested two levels deep (for example `/api/attempts/[id]/submit`) answer "page not found".

## Commands
- `npm run dev` runs the app locally.
- `npm test` runs the unit tests (vitest).
- `node scripts/seed-tests.mjs` loads or updates the presets, sample questions and sample tests. It is safe to re-run.

## Later phases (not built yet)
- **Phase 3, WhatsApp**: test reminders, round alerts and parent reports through the existing WhatsApp API.
- **Phase 4, services**: turn `/resources/calendar` into a round tracker with alerts, add uploads to
  `/resources/checklist`, a choice-filling builder, Plan B advisor, career quiz and "talk to a senior".
  College comparison (`/colleges/compare`) and the scholarship finder (`EligibilityChecker`) already exist and
  will be extended rather than rebuilt.
- Payments (Razorpay) are only needed if paid mock packs or paid sessions are introduced.
