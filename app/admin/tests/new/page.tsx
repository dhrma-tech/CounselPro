import { listPresets } from '@/lib/tests/server/content';
import { questionPoolForExam } from '@/lib/tests/server/admin';
import { PRESET_QUESTION_EXAM } from '@/lib/tests/presetExams';
import TestBuilder from '@/components/admin/TestBuilder';

export default async function NewTestPage() {
  const presets = await listPresets();
  const exams = Array.from(new Set(Object.values(PRESET_QUESTION_EXAM)));
  const pools = Object.fromEntries(await Promise.all(exams.map(async (e) => [e, await questionPoolForExam(e)] as const)));
  return <TestBuilder presets={presets} pools={pools} />;
}
