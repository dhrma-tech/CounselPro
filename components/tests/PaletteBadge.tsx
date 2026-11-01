import type { PaletteStatus } from '@/lib/tests/types';

// Semantic exam colours (shape + colour, so states stay distinguishable without colour)
export const PALETTE_STYLES: Record<PaletteStatus, { fill: string; stroke: string; text: string; label: string }> = {
  NOT_VISITED: { fill: '#F1F5F9', stroke: '#94A3B8', text: '#334155', label: 'Not Visited' },
  NOT_ANSWERED: { fill: '#EF4444', stroke: '#B91C1C', text: '#FFFFFF', label: 'Not Answered' },
  ANSWERED: { fill: '#22C55E', stroke: '#15803D', text: '#FFFFFF', label: 'Answered' },
  MARKED_FOR_REVIEW: { fill: '#7E22CE', stroke: '#581C87', text: '#FFFFFF', label: 'Marked for Review' },
  ANSWERED_AND_MARKED: { fill: '#7E22CE', stroke: '#581C87', text: '#FFFFFF', label: 'Answered & Marked for Review' },
};

export const PALETTE_ORDER: PaletteStatus[] = ['NOT_VISITED', 'NOT_ANSWERED', 'ANSWERED', 'MARKED_FOR_REVIEW', 'ANSWERED_AND_MARKED'];

function Shape({ status }: { status: PaletteStatus }) {
  const s = PALETTE_STYLES[status];
  switch (status) {
    case 'NOT_VISITED':
      return <rect x="3" y="5" width="34" height="30" rx="5" fill={s.fill} stroke={s.stroke} strokeWidth="1.5" />;
    case 'NOT_ANSWERED':
      // inverted pentagon / shield
      return <path d="M3 5 H37 V22 L20 37 L3 22 Z" fill={s.fill} stroke={s.stroke} strokeWidth="1.5" strokeLinejoin="round" />;
    case 'ANSWERED':
      return <path d="M20 3 L37 18 V35 H3 V18 Z" fill={s.fill} stroke={s.stroke} strokeWidth="1.5" strokeLinejoin="round" />;
    default:
      return <circle cx="20" cy="20" r="16.5" fill={s.fill} stroke={s.stroke} strokeWidth="1.5" />;
  }
}

export default function PaletteBadge({
  status,
  label,
  size = 40,
  active = false,
}: {
  status: PaletteStatus;
  label?: string | number;
  size?: number;
  active?: boolean;
}) {
  const s = PALETTE_STYLES[status];
  const textY = status === 'NOT_ANSWERED' ? 19 : status === 'ANSWERED' ? 25 : 21;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="img"
      aria-label={label !== undefined ? `Question ${label}: ${s.label}` : s.label}
      className={active ? 'rounded-lg outline outline-2 outline-offset-1 outline-[#0F172A]' : ''}
    >
      <Shape status={status} />
      {status === 'ANSWERED_AND_MARKED' && (
        <g>
          <circle cx="32" cy="32" r="7" fill="#22C55E" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M28.8 32.2 L31 34.3 L35.2 29.8" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {label !== undefined && (
        <text x="20" y={textY} textAnchor="middle" dominantBaseline="middle" fontSize="13" fontWeight="700" fill={s.text} fontFamily="var(--font-ui), system-ui, sans-serif">
          {label}
        </text>
      )}
    </svg>
  );
}

export function PaletteLegend({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={`grid ${compact ? 'grid-cols-2 gap-2' : 'grid-cols-1 sm:grid-cols-2 gap-3'}`}>
      {PALETTE_ORDER.map((status) => (
        <li key={status} className="flex items-center gap-2.5">
          <PaletteBadge status={status} size={compact ? 26 : 32} />
          <span className={`${compact ? 'text-[11px]' : 'text-[13px]'} text-text-secondary font-ui`}>{PALETTE_STYLES[status].label}</span>
        </li>
      ))}
    </ul>
  );
}
