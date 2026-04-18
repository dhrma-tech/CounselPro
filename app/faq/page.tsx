import Link from 'next/link';
import Accordion from '@/components/shared/Accordion';
import { faqs } from '@/data/faqs';
import PageCTA from '@/components/shared/PageCTA';

export const metadata = {
  title: 'Frequently Asked Questions | CounselPro',
  description: 'Find answers to common questions regarding JoSAA, MHT CET, and the CounselPro application process.'
};

export default function FAQPage() {
  const groups = ['General', 'JoSAA', 'MHT CET', 'Application'];

  return (
    <>
      <div className="py-20 bg-surface-light border-b border-border text-center px-6">
        <h1 className="heading-xl mb-4">Frequently Asked Questions</h1>
        <p className="body-lg max-w-2xl mx-auto">
          Everything you need to know about our counseling process.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-16">
          {groups.map(group => {
            const groupFaqs = faqs.filter(f => f.group === group);
            if (groupFaqs.length === 0) return null;
            
            return (
              <section key={group}>
                <h3 className="heading-md text-brand-navy mb-6">{group} Questions</h3>
                <Accordion items={groupFaqs.map(f => ({ q: f.question, a: f.answer }))} />
              </section>
            );
          })}
        </div>
        
        <div className="mt-16 text-center border-t border-border pt-16">
          <h3 className="heading-sm mb-4">Still confused? Let us guide you</h3>
          <Link href="/apply" className="inline-flex bg-brand-blue text-white font-ui font-semibold px-6 py-3 rounded-lg hover:bg-[#1648c0] transition-colors">
            Apply Now &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
