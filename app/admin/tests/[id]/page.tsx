import { notFound } from 'next/navigation';
import { getTestBundleById, listPresets } from '@/lib/tests/server/content';
import { questionPoolForExam } from '@/lib/tests/server/admin';
import { PRESET_QUESTION_EXAM } from '@/lib/tests/presetExams';
import { istLocalInput } from '@/lib/tests/istDate';
import TestBuilder from '@/components/admin/TestBuilder';

export default async function EditTestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [bundle, presets] = await Promise.all([getTestBundleById(id), listPresets()]);
  if (!bundle || bundle.test.is_practice) notFound();
  const exams = Array.from(new Set(Object.values(PRESET_QUESTION_EXAM)));
  const pools = Object.fromEntries(await Promise.all(exams.map(async (e) => [e, await questionPoolForExam(e)] as const)));
  const { test, version } = bundle;
  return (
    <TestBuilder
      presets={presets}
      pools={pools}
      initial={{
        id: test.id,
        slug: test.slug,
        title: test.title,
        description: test.description ?? '',
        kind: test.kind,
        presetId: test.preset_id,
        durationMinutes: test.duration_seconds / 60,
        guestAllowed: test.guest_allowed,
        sortOrder: test.sort_order,
        questionsBySection: Object.fromEntries(version.sections.map((s) => [s.id, s.questionIds])),
        isWeekly: test.is_weekly,
        windowStart: test.window_start_at ? istLocalInput(test.window_start_at) : '',
        windowEnd: test.window_end_at ? istLocalInput(test.window_end_at) : '',
      }}
    />
  );
}
