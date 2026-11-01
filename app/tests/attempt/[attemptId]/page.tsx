import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getViewer } from '@/lib/auth';
import { AttemptError, getAttemptForTaking, serverNow } from '@/lib/tests/server/attempts';
import { displayNameFor, maskEmail } from '@/lib/tests/server/viewerInfo';
import ExamTerminal from '@/components/tests/terminal/ExamTerminal';
import QuizShell from '@/components/tests/quiz/QuizShell';

export const metadata: Metadata = {
  title: 'Test in progress | CounselPro',
  robots: { index: false },
};

export default async function AttemptPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  const viewer = await getViewer();

  let data: Awaited<ReturnType<typeof getAttemptForTaking>>;
  try {
    data = await getAttemptForTaking(attemptId, viewer);
  } catch (error) {
    if (error instanceof AttemptError && error.status === 404) notFound();
    throw error;
  }
  if (!data.paper) redirect(`/tests/results/${attemptId}`);

  const { attempt, bundle, paper } = data;
  const questionById = new Map(paper.questions.map((q) => [q.id, q]));
  const orderedQuestions = paper.sections.flatMap((s) => s.questionIds).map((id) => questionById.get(id)!).filter(Boolean);

  if (attempt.mode === 'PRACTICE') {
    return (
      <QuizShell
        attemptId={attempt.id}
        title={bundle.test.title}
        questions={orderedQuestions}
        initialResponses={paper.responses}
        serverNow={serverNow()}
        endsAt={attempt.ends_at}
        initialLanguage={attempt.language}
      />
    );
  }

  return (
    <ExamTerminal
      attemptId={attempt.id}
      testTitle={bundle.test.title}
      examName={bundle.preset.name}
      candidate={{
        name: await displayNameFor(viewer.user),
        shortId: attempt.id.slice(0, 8).toUpperCase(),
        contact: maskEmail(viewer.user?.email),
      }}
      sections={paper.sections}
      questions={orderedQuestions}
      initialResponses={paper.responses}
      serverNow={serverNow()}
      endsAt={attempt.ends_at!}
      sectionalLock={bundle.version.sectional_lock}
      initialLanguage={attempt.language}
      instructionsHtml={bundle.preset.instructionsHtml}
    />
  );
}
