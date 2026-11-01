-- Defence in depth on top of RLS: the browser never talks to the test tables directly,
-- so the public (anon) and signed-in (authenticated) API roles get no table privileges at all.
-- Only the server's service-role key can read questions, keys and attempts.
revoke all on table
  public.exam_presets, public.questions, public.question_translations, public.question_keys,
  public.tests, public.test_versions, public.attempts, public.attempt_responses,
  public.rank_reference, public.admin_audit_log
from anon, authenticated;
revoke all on table public.profiles from anon;
revoke insert, delete, truncate, references, trigger on table public.profiles from authenticated;
