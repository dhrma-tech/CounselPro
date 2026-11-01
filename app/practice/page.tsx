import type { Metadata } from 'next';
import { listPresets } from '@/lib/tests/server/content';
import { listPracticeChapters, type ChapterGroup } from '@/lib/tests/server/practice';
import Breadcrumb from '@/components/shared/Breadcrumb';
import PracticeBuilder from '@/components/tests/PracticeBuilder';

export const metadata: Metadata = {
  title: 'Chapter-wise Practice | CounselPro',
  description: 'Build a quick practice quiz by exam, subject and chapter. See the answer and solution after every question.',
};

export default async function PracticePage({ searchParams }: { searchParams: Promise<{ preset?: string; section?: string; chapter?: string }> }) {
  const query = await searchParams;
  const presets = await listPresets();
  const chaptersByPreset: Record<string, ChapterGroup[]> = {};
  await Promise.all(presets.map(async (p) => { chaptersByPreset[p.id] = await listPracticeChapters(p.id); }));
  const available = presets.filter((p) => (chaptersByPreset[p.id] ?? []).length > 0);

  return (
    <div className="min-h-screen bg-surface-white">
      <div className="pt-10 sm:pt-14 pb-8 bg-surface-light border-b border-border px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: 'Mock Tests', href: '/tests' }, { label: 'Practice' }]} />
          <h1 className="heading-lg mb-2">Practise by chapter</h1>
          <p className="body-md max-w-2xl">Pick your exam, subjects and chapters. You&apos;ll see the correct answer and the solution right after each question.</p>
        </div>
      </div>
      <PracticeBuilder
        presets={available.map((p) => ({ id: p.id, name: p.name }))}
        chaptersByPreset={chaptersByPreset}
        initial={{ presetId: query.preset, sectionId: query.section, chapter: query.chapter }}
      />
    </div>
  );
}
