export default function PageCTA({ title, ctaText }: { title: string, ctaText: string }) {
  return (
    <div className="bg-brand-blue py-16 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-white font-display text-[28px] md:text-[32px] mb-6 leading-tight">{title}</h2>
        <a href="/apply" className="inline-block bg-white text-brand-blue font-semibold px-8 py-3.5 rounded-lg active:scale-95 transition-transform">
          {ctaText}
        </a>
      </div>
    </div>
  );
}
