-- Phase 2 hooks: mistake analysis, AI study plan, Ask AI, revision, daily quiz + streaks,
-- weekly open mocks + leaderboards + groups, share cards and friend challenges.
-- Same access model as 0001/0002: RLS on, no table privileges for anon/authenticated.

alter table public.attempts
  add column analysis jsonb,
  add column ai_plan jsonb,
  add column ai_plan_at timestamptz,
  add column challenge_token text;

alter table public.attempt_responses
  add column mistake_tag text;

alter table public.tests
  add column window_start_at timestamptz,
  add column window_end_at timestamptz,
  add column is_weekly boolean not null default false,
  add column is_daily boolean not null default false,
  add column daily_date date,
  add constraint tests_window_check check (window_end_at is null or window_start_at is null or window_end_at > window_start_at);
create unique index tests_daily_unique on public.tests (preset_id, daily_date) where is_daily;
create index tests_weekly_idx on public.tests (is_weekly, window_end_at) where is_weekly;

alter table public.profiles
  add column leaderboard_name text not null default 'INITIAL' check (leaderboard_name in ('INITIAL', 'HIDDEN')),
  add column ref_code text unique,
  add column referred_by text;

create table public.streaks (
  user_id uuid primary key references auth.users (id) on delete cascade,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_date date,
  freezes_left integer not null default 1,
  freeze_week date,
  history date[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table public.revision_items (
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id uuid not null references public.questions (id) on delete cascade,
  due_on date not null,
  interval_days integer not null default 0,
  reps integer not null default 0,
  lapses integer not null default 0,
  last_result text,
  source text not null default 'ATTEMPT' check (source in ('ATTEMPT', 'BOOKMARK')),
  bookmarked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, question_id)
);
create index revision_items_due_idx on public.revision_items (user_id, due_on);
create index revision_items_question_idx on public.revision_items (question_id);

create table public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 40),
  invite_code text not null unique,
  owner_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
create index groups_owner_idx on public.groups (owner_id);

create table public.group_members (
  group_id uuid not null references public.groups (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);
create index group_members_user_idx on public.group_members (user_id);

create table public.share_cards (
  id text primary key,
  attempt_id uuid not null references public.attempts (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  hide_name boolean not null default false,
  hide_rank boolean not null default false,
  created_at timestamptz not null default now()
);
create index share_cards_attempt_idx on public.share_cards (attempt_id);
create index share_cards_user_idx on public.share_cards (user_id);

create table public.challenges (
  token text primary key,
  attempt_id uuid not null references public.attempts (id) on delete cascade,
  test_id uuid not null references public.tests (id) on delete cascade,
  created_by uuid references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
create index challenges_attempt_idx on public.challenges (attempt_id);
create index challenges_test_idx on public.challenges (test_id);
create index challenges_creator_idx on public.challenges (created_by);
alter table public.attempts
  add constraint attempts_challenge_fk foreign key (challenge_token) references public.challenges (token) on delete set null;
create index attempts_challenge_idx on public.attempts (challenge_token);

create table public.ai_messages (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  attempt_id uuid references public.attempts (id) on delete set null,
  question_id uuid references public.questions (id) on delete set null,
  kind text not null check (kind in ('ASK', 'PLAN')),
  mode text,
  language text not null default 'en',
  response text,
  cached boolean not null default false,
  feedback smallint check (feedback in (-1, 1)),
  reported boolean not null default false,
  report_note text,
  created_at timestamptz not null default now()
);
create index ai_messages_user_day_idx on public.ai_messages (user_id, created_at);
create index ai_messages_reported_idx on public.ai_messages (reported) where reported;
create index ai_messages_attempt_idx on public.ai_messages (attempt_id);
create index ai_messages_question_idx on public.ai_messages (question_id);

create table public.ai_cache (
  key text primary key,
  response text not null,
  created_at timestamptz not null default now()
);

alter table public.streaks enable row level security;
alter table public.revision_items enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.share_cards enable row level security;
alter table public.challenges enable row level security;
alter table public.ai_messages enable row level security;
alter table public.ai_cache enable row level security;

revoke all on table
  public.streaks, public.revision_items, public.groups, public.group_members,
  public.share_cards, public.challenges, public.ai_messages, public.ai_cache
from anon, authenticated;
