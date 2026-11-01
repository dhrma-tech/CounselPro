-- CounselPro mock tests & quizzes.
-- RLS is enabled on every table. Test content, keys and attempts are only read/written by the
-- Next.js server with the service-role key; the browser never queries these tables directly.

create extension if not exists pgcrypto;

create table public.exam_presets (
  id text primary key,
  name text not null,
  exam_family text not null check (exam_family in ('JEE', 'NEET', 'MHTCET')),
  duration_seconds integer not null check (duration_seconds > 0),
  total_marks numeric not null,
  sections jsonb not null,
  sectional_lock jsonb,
  marking jsonb not null,
  languages text[] not null default '{en}',
  registrations_count integer,
  instructions_html text,
  verified boolean not null default false,
  last_verified_at timestamptz,
  verified_sources text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  external_key text unique,
  exam text not null,
  subject text not null,
  chapter text not null,
  topic text,
  type text not null check (type in ('SINGLE_MCQ', 'MULTI_MCQ', 'NUMERICAL', 'PARAGRAPH', 'MATRIX_MATCH')),
  difficulty smallint not null default 3 check (difficulty between 1 and 5),
  group_id text,
  shuffle_options boolean not null default true,
  pyq_year integer,
  pyq_shift text,
  question_number integer,
  status text not null default 'DRAFT' check (status in ('DRAFT', 'APPROVED', 'RETIRED')),
  license_status text not null default 'UNKNOWN'
    check (license_status in ('OWNED_OR_LICENSED', 'ORIGINAL_SAMPLE', 'UNKNOWN')),
  source text not null default 'HUMAN' check (source in ('HUMAN', 'AI_DRAFTED_HUMAN_VERIFIED')),
  key_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index questions_exam_subject_chapter_idx on public.questions (exam, subject, chapter);
create index questions_status_idx on public.questions (status);

create table public.question_translations (
  question_id uuid not null references public.questions (id) on delete cascade,
  language text not null,
  passage_html text,
  stem_html text not null,
  options jsonb not null default '[]',
  solution_html text,
  primary key (question_id, language)
);

-- Never selected by student-facing queries
create table public.question_keys (
  question_id uuid primary key references public.questions (id) on delete cascade,
  correct_option_ids text[] not null default '{}',
  numerical_exact numeric,
  numerical_min numeric,
  numerical_max numeric
);

create table public.tests (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  kind text not null check (kind in ('FULL_MOCK', 'SECTIONAL', 'CHAPTER_TEST', 'QUIZ')),
  preset_id text not null references public.exam_presets (id),
  -- 0 = untimed (practice)
  duration_seconds integer not null check (duration_seconds >= 0),
  guest_allowed boolean not null default false,
  is_sample boolean not null default false,
  -- Tests generated on the fly by /practice; never listed publicly
  is_practice boolean not null default false,
  status text not null default 'DRAFT' check (status in ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  current_version_id uuid,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Immutable snapshot; edits after publishing create a new version
create table public.test_versions (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.tests (id) on delete cascade,
  version integer not null,
  sections jsonb not null,
  marking jsonb not null,
  sectional_lock jsonb,
  duration_seconds integer not null,
  total_marks numeric not null,
  published_at timestamptz not null default now(),
  unique (test_id, version)
);

alter table public.tests
  add constraint tests_current_version_fk
  foreign key (current_version_id) references public.test_versions (id) on delete set null;

create table public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  guest_token text,
  test_id uuid not null references public.tests (id) on delete cascade,
  test_version_id uuid not null references public.test_versions (id) on delete cascade,
  attempt_number integer not null default 1,
  mode text not null default 'EXAM' check (mode in ('EXAM', 'PRACTICE')),
  status text not null default 'IN_PROGRESS' check (status in ('IN_PROGRESS', 'SUBMITTED', 'AUTO_SUBMITTED')),
  language text not null default 'en',
  seed text not null,
  paper_order jsonb not null,
  started_at timestamptz not null default now(),
  ends_at timestamptz,
  submitted_at timestamptz,
  score_raw numeric,
  max_score numeric,
  score_breakdown jsonb,
  percentile_est numeric,
  rank_low integer,
  rank_high integer,
  rank_confidence text,
  rank_method text,
  rank_is_sample boolean,
  counts_as_rank boolean not null default false,
  integrity jsonb not null default '{}',
  ip_hash text,
  created_at timestamptz not null default now(),
  constraint attempts_owner_check check (user_id is not null or guest_token is not null)
);
create index attempts_user_idx on public.attempts (user_id, created_at desc);
create index attempts_guest_idx on public.attempts (guest_token);
create index attempts_test_rank_idx on public.attempts (test_id, counts_as_rank, status);
create index attempts_ip_day_idx on public.attempts (ip_hash, created_at);

create table public.attempt_responses (
  attempt_id uuid not null references public.attempts (id) on delete cascade,
  question_id uuid not null references public.questions (id),
  status text not null default 'NOT_VISITED'
    check (status in ('NOT_VISITED', 'NOT_ANSWERED', 'ANSWERED', 'MARKED_FOR_REVIEW', 'ANSWERED_AND_MARKED')),
  selected_option_ids text[] not null default '{}',
  numerical_input text,
  time_spent_ms integer not null default 0,
  visit_count integer not null default 0,
  answer_changes integer not null default 0,
  seq integer not null default 0,
  marks numeric,
  outcome text,
  updated_at timestamptz not null default now(),
  primary key (attempt_id, question_id)
);
create index attempt_responses_question_idx on public.attempt_responses (question_id);
create index attempts_version_idx on public.attempts (test_version_id);
create index test_versions_test_idx on public.test_versions (test_id);
create index tests_preset_idx on public.tests (preset_id);
create index tests_current_version_idx on public.tests (current_version_id);

create table public.rank_reference (
  id uuid primary key default gen_random_uuid(),
  preset_id text not null references public.exam_presets (id) on delete cascade,
  year integer not null,
  rows jsonb not null,
  source text not null,
  is_sample boolean not null default true,
  created_at timestamptz not null default now()
);
create index rank_reference_preset_idx on public.rank_reference (preset_id, created_at desc);

-- Progressive student profile; also keeps what a future college predictor will need
create table public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  target_exam text,
  category text,
  home_state text,
  gender text,
  student_stage text,
  preferred_language text,
  marketing_consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_audit_log (
  id bigint generated always as identity primary key,
  actor_email text not null,
  action text not null,
  target text,
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now()
);

alter table public.exam_presets enable row level security;
alter table public.questions enable row level security;
alter table public.question_translations enable row level security;
alter table public.question_keys enable row level security;
alter table public.tests enable row level security;
alter table public.test_versions enable row level security;
alter table public.attempts enable row level security;
alter table public.attempt_responses enable row level security;
alter table public.rank_reference enable row level security;
alter table public.profiles enable row level security;
alter table public.admin_audit_log enable row level security;

-- Students may read and edit only their own profile
create policy "profiles_select_own" on public.profiles
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "profiles_update_own" on public.profiles
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
