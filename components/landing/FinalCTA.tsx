import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="bg-brand-blue py-20 text-center px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-white font-display text-[36px] leading-[1.15] mb-4">
          Ready to start your counselling journey?
        </h2>
        <p className="text-white/75 font-ui text-[18px] mb-8">
          Apply in 5 minutes. Our team will reach out within 24 hours.
        </p>
        
        <Link 
          href="/apply" 
          className="inline-flex items-center justify-center bg-white text-brand-blue font-ui font-semibold text-[15px] px-8 py-4 rounded-lg hover:bg-white/95 active:scale-[0.98] transition-all shadow-sm mb-4"
        >
          Apply Now
        </Link>
        
        <p className="text-white/50 text-sm font-ui block">
          No fees upfront. No spam. Just guidance.
        </p>
      </div>
    </section>
  );
}
