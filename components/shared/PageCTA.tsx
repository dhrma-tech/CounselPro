export default function PageCTA({ title, ctaText }: { title: string, ctaText: string }) {
  return (
    <div className="py-16 px-6 text-center" style={{ background: 'rgba(173, 216, 230, 0.30)' }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-brand-navy font-display text-[28px] md:text-[32px] mb-6 leading-tight">{title}</h2>
        <a href="/apply" className="inline-block bg-brand-blue text-white font-semibold px-8 py-3.5 rounded-lg active:scale-95 transition-transform hover:bg-[#1648c0]">
          {ctaText}
        </a>
      </div>
    </div>
  );
}
