import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BarChart3, Sparkles, Star } from 'lucide-react';
import { getShareCard } from '@/lib/tests/server/social';
import RefTracker from '@/components/tests/RefTracker';

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const card = await getShareCard(id);
  if (!card) return { title: 'Score card | CounselPro', robots: { index: false } };
  const who = card.name ?? 'A student';
  const title = `${who} scored ${fmt(card.score)}/${fmt(card.maxScore)} on ${card.testTitle}`;
  const description = 'Take the same mock test free at CounselPro and see where you stand.';
  return { title: `${title} | CounselPro`, description, robots: { index: false }, openGraph: { title, description } };
}

export default async function ShareCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = await getShareCard(id);
  if (!card) notFound();

  return (
    <div className="min-h-screen bg-surface-light px-4 sm:px-6 py-12 sm:py-20">
      <RefTracker code={card.refCode} />
      <div className="max-w-xl mx-auto">
        <div className="rounded-[28px] bg-gradient-to-br from-brand-navy to-brand-blue text-white p-8 sm:p-10 shadow-lg">
          <p className="text-[12px] font-bold uppercase tracking-wider text-white/70 mb-1">{card.examName}</p>
          <p className="font-ui font-semibold text-[16px] text-white/90 mb-6">{card.testTitle}</p>
          <p className="text-[15px] text-white/80 mb-1">{card.name ? `${card.name} scored` : 'Score'}</p>
          <p className="font-display text-[64px] leading-none mb-6">
            {fmt(card.score)}<span className="text-[24px] text-white/70 font-ui"> / {fmt(card.maxScore)}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {card.percentile != null && (
              <span className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-[13px] font-semibold">
                <BarChart3 className="w-3.5 h-3.5" /> About {card.percentile.toFixed(1)} percentile (estimate)
              </span>
            )}
            {card.strongestSubject && (
              <span className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-[13px] font-semibold">
                <Star className="w-3.5 h-3.5" /> Strongest: {card.strongestSubject}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white border border-border rounded-[24px] p-6 text-center">
          <p className="heading-sm mb-2 flex items-center justify-center gap-2"><Sparkles className="w-5 h-5 text-brand-teal" /> Can you do better?</p>
          <p className="body-sm text-text-secondary mb-5">Take {card.testSlug ? 'the same test' : 'a free mock test'} in a real exam-style interface and get your score with a rank estimate.</p>
          <Link
            href={card.testSlug ? `/tests/${card.testSlug}` : '/tests'}
            className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-brand-blue text-white font-ui font-bold text-[15px] hover:bg-[#1648c0] shadow-md shadow-brand-blue/20"
          >
            {card.testSlug ? 'Take this test free' : 'See free mock tests'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
