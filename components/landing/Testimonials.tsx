import { testimonials } from '@/data/testimonials';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24" style={{ background: 'rgba(173, 216, 230, 0.30)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="font-display text-[36px] leading-[1.15] tracking-[-0.015em] text-brand-navy">What our students say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, i) => (
            <div key={i} className="bg-white/70 border border-[#add8e6]/40 rounded-xl p-6 flex flex-col h-full hover:-translate-y-1 transition-transform duration-200 backdrop-blur-sm shadow-sm">
              <Quote className="w-8 h-8 text-brand-blue mb-4 opacity-80" />
              <p className="text-text-secondary font-ui text-[16px] leading-relaxed italic flex-1 mb-6">
                "{test.quote}"
              </p>
              <div>
                <h4 className="text-brand-navy font-semibold text-[15px]">{test.name}</h4>
                <p className="text-text-muted text-[13px] mt-1 line-clamp-1">
                  {test.exam} {test.percentile}%ile &rarr; {test.collegePlaced}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

