import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { QuestionRow, TestRow } from './rows';

export async function logAdmin(actorEmail: string, action: string, target: string | null, before: unknown, after: unknown) {
  const { error } = await supabaseAdmin().from('admin_audit_log').insert({ actor_email: actorEmail, action, target, before, after });
  if (error) console.error('Audit log failed:', error.message);
}

export async function adminStats() {
  const db = supabaseAdmin();
  const weekAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
  const head = { count: 'exact' as const, head: true };
  const results = await Promise.all([
    db.from('questions').select('id', head),
    db.from('questions').select('id', head).eq('status', 'APPROVED'),
    db.from('tests').select('id', head).eq('is_practice', false).eq('status', 'PUBLISHED'),
    db.from('attempts').select('id', head).gte('created_at', weekAgo),
    db.from('attempts').select('id', head).gte('created_at', weekAgo).is('user_id', null),
    db.from('profiles').select('user_id', head),
  ]);
  const [questions, approved, tests, attemptsWeek, guestAttemptsWeek, students] = results.map((r) => r.count ?? 0);
  return { questions, approved, tests, attemptsWeek, guestAttemptsWeek, students };
}

export interface QuestionFilters {
  exam?: string;
  subject?: string;
  status?: string;
  search?: string;
  page?: number;
}

export async function listQuestionsForAdmin(filters: QuestionFilters) {
  const pageSize = 50;
  const page = Math.max(1, filters.page ?? 1);
  let q = supabaseAdmin()
    .from('questions')
    .select('id, external_key, exam, subject, chapter, type, difficulty, status, license_status, key_verified, updated_at', { count: 'exact' })
    .order('updated_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);
  if (filters.exam) q = q.eq('exam', filters.exam);
  if (filters.subject) q = q.eq('subject', filters.subject);
  if (filters.status) q = q.eq('status', filters.status);
  if (filters.search) q = q.or(`external_key.ilike.%${filters.search.replace(/[%,()]/g, '')}%,chapter.ilike.%${filters.search.replace(/[%,()]/g, '')}%`);
  const { data, count, error } = await q;
  if (error) throw error;
  return { rows: (data ?? []) as Pick<QuestionRow, 'id' | 'external_key' | 'exam' | 'subject' | 'chapter' | 'type' | 'difficulty' | 'status' | 'license_status' | 'key_verified'>[], total: count ?? 0, page, pageSize };
}

export async function listTestsForAdmin() {
  const { data, error } = await supabaseAdmin()
    .from('tests')
    .select('*')
    .eq('is_practice', false)
    .eq('is_daily', false)
    .order('sort_order')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as TestRow[];
}

export async function questionPoolForExam(exam: string) {
  const { data, error } = await supabaseAdmin()
    .from('questions')
    .select('id, external_key, subject, chapter, type, difficulty, license_status, key_verified')
    .eq('exam', exam)
    .eq('status', 'APPROVED')
    .order('subject')
    .order('chapter')
    .limit(5000);
  if (error) throw error;
  return (data ?? []) as Pick<QuestionRow, 'id' | 'external_key' | 'subject' | 'chapter' | 'type' | 'difficulty' | 'license_status' | 'key_verified'>[];
}

async function emailsByUserId(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  const { data } = await supabaseAdmin().auth.admin.listUsers({ page: 1, perPage: 1000 });
  for (const u of data?.users ?? []) if (u.email) map.set(u.id, u.email);
  return map;
}

export async function recentAttempts(limit = 100) {
  const db = supabaseAdmin();
  const [{ data, error }, emails] = await Promise.all([
    db.from('attempts')
      .select('id, user_id, test_id, status, mode, attempt_number, score_raw, max_score, percentile_est, integrity, created_at')
      .order('created_at', { ascending: false })
      .limit(limit),
    emailsByUserId(),
  ]);
  if (error) throw error;
  const testIds = Array.from(new Set((data ?? []).map((a) => a.test_id as string)));
  const { data: tests } = testIds.length
    ? await db.from('tests').select('id, title').in('id', testIds)
    : { data: [] as { id: string; title: string }[] };
  const titleById = new Map((tests ?? []).map((t) => [t.id as string, t.title as string]));
  return (data ?? []).map((a) => ({
    ...a,
    email: a.user_id ? emails.get(a.user_id as string) ?? '(unknown)' : 'Guest',
    testTitle: titleById.get(a.test_id as string) ?? '',
  }));
}

export async function leads() {
  const db = supabaseAdmin();
  const [{ data: profiles, error }, { data: attempts }, emails] = await Promise.all([
    db.from('profiles').select('*').order('created_at', { ascending: false }).limit(1000),
    db.from('attempts').select('user_id, score_raw, max_score, percentile_est, created_at, status').not('user_id', 'is', null)
      .in('status', ['SUBMITTED', 'AUTO_SUBMITTED']).order('created_at', { ascending: false }).limit(5000),
    emailsByUserId(),
  ]);
  if (error) throw error;
  const stats = new Map<string, { tests: number; last: string; bestPercentile: number | null }>();
  for (const a of attempts ?? []) {
    const s = stats.get(a.user_id as string) ?? { tests: 0, last: a.created_at as string, bestPercentile: null };
    s.tests++;
    if (a.percentile_est != null) s.bestPercentile = Math.max(s.bestPercentile ?? 0, Number(a.percentile_est));
    stats.set(a.user_id as string, s);
  }
  return (profiles ?? []).map((p) => ({
    userId: p.user_id as string,
    email: emails.get(p.user_id as string) ?? '',
    name: (p.full_name as string | null) ?? '',
    phone: (p.phone as string | null) ?? '',
    targetExam: (p.target_exam as string | null) ?? '',
    joined: p.created_at as string,
    tests: stats.get(p.user_id as string)?.tests ?? 0,
    lastTest: stats.get(p.user_id as string)?.last ?? null,
    bestPercentile: stats.get(p.user_id as string)?.bestPercentile ?? null,
    marketingConsent: !!p.marketing_consent,
  }));
}
