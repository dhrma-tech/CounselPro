import { ImageResponse } from 'next/og';
import { getShareCard } from '@/lib/tests/server/social';

export const alt = 'Mock test score card';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

// Preview image shown when a share link is posted on WhatsApp and other apps
export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = await getShareCard(id);
  const chips = card
    ? [
      card.percentile != null ? `About ${card.percentile.toFixed(1)} percentile (estimate)` : null,
      card.strongestSubject ? `Strongest: ${card.strongestSubject}` : null,
    ].filter(Boolean) as string[]
    : [];

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: 'linear-gradient(135deg, #0F2D5E 0%, #1A56DB 100%)', color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 28, opacity: 0.75, textTransform: 'uppercase', letterSpacing: 2 }}>{card?.examName ?? 'CounselPro'}</div>
          <div style={{ fontSize: 40, fontWeight: 700, marginTop: 8 }}>{card?.testTitle ?? 'Free mock tests'}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 36, opacity: 0.85 }}>{card?.name ? `${card.name} scored` : 'Score'}</div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 150, fontWeight: 800, lineHeight: 1 }}>{card ? fmt(card.score) : '–'}</span>
            <span style={{ fontSize: 56, opacity: 0.7, marginLeft: 16, marginBottom: 14 }}>/ {card ? fmt(card.maxScore) : '–'}</span>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
            {chips.map((c) => (
              <div key={c} style={{ display: 'flex', fontSize: 26, background: 'rgba(255,255,255,0.15)', borderRadius: 999, padding: '10px 24px' }}>{c}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28 }}>
          <span style={{ fontWeight: 700 }}>CounselPro</span>
          <span style={{ opacity: 0.85 }}>Can you beat this? Take the same test free</span>
        </div>
      </div>
    ),
    size,
  );
}
