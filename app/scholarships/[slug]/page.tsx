import { scholarships } from '@/data/scholarships';
import Link from 'next/link';
import { ExternalLink, CheckCircle } from 'lucide-react';

export function generateStaticParams() {
  return scholarships.map((scholarship) => ({
    slug: scholarship.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const scholarship = scholarships.find(s => s.slug === params.slug);
  if (!scholarship) return { title: 'Scholarship Not Found' };
  
  return {
    title: `${scholarship.name} | Scholarships | CounselPro`,
    description: `Eligibility, documents, and application process for ${scholarship.name}.`,
  };
}

export default function ScholarshipDetailPage({ params }: { params: { slug: string } }) {
  const scholarship = scholarships.find(s => s.slug === params.slug);

  if (!scholarship) {
    return <div className="py-40 text-center">Scholarship Not Found</div>;
  }

  return (
    <div className="bg-surface-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8 font-ui">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <span>/</span>
          <Link href="/scholarships" className="hover:text-brand-blue transition-colors">Scholarships</Link>
          <span>/</span>
          <span className="text-text-primary capitalize">{scholarship.name}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="heading-xl mb-2">{scholarship.name}</h1>
          <p className="text-lg text-text-secondary">{scholarship.provider}</p>
        </div>

        {/* Quick Stats Bar */}
        <div className="bg-surface-light border border-border rounded-xl p-6 mb-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div>
            <div className="text-[12px] text-text-muted uppercase font-semibold mb-1">Amount</div>
            <div className="text-brand-amber font-display text-[22px]">{scholarship.amount}</div>
          </div>
          <div className="hidden md:block w-px bg-border h-full mx-auto"></div>
          <div>
            <div className="text-[12px] text-text-muted uppercase font-semibold mb-1">Deadline</div>
            <div className="text-text-primary font-ui font-semibold text-[16px] mt-2">{scholarship.deadline || 'Varies'}</div>
          </div>
          <div className="hidden md:block w-px bg-border h-full mx-auto"></div>
          <div>
            <div className="text-[12px] text-text-muted uppercase font-semibold mb-1">Renewable?</div>
            <div className="text-text-primary font-ui font-semibold text-[16px] mt-2">{scholarship.renewable ? 'Yes' : 'No'}</div>
          </div>
        </div>

        <div className="space-y-12">
          
          {/* Eligibility */}
          <section>
            <h2 className="heading-md mb-4 pb-2 border-b border-border">Eligibility Criteria</h2>
            <ul className="space-y-3">
              {scholarship.eligibility.map((crit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <span className="text-text-secondary leading-relaxed">{crit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Documents Required */}
          {scholarship.documents && (
            <section>
              <h2 className="heading-md mb-4 pb-2 border-b border-border">Documents Required</h2>
              <ul className="list-disc list-inside space-y-2 text-text-secondary leading-relaxed ml-2">
                {scholarship.documents.map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            </section>
          )}

          {/* How to Apply */}
          <section>
            <h2 className="heading-md mb-4 pb-2 border-b border-border">How to Apply</h2>
            <ol className="list-decimal list-outside space-y-3 text-text-secondary leading-relaxed ml-5">
              <li>Check your eligibility criteria before applying.</li>
              <li>Gather all required documents in digital format.</li>
              <li>Visit the official portal using the link below.</li>
              <li>Register as a new user and fill in your details accurately.</li>
              <li>Upload documents and submit the final application before the deadline.</li>
            </ol>
            
            {scholarship.applyLink && (
              <div className="mt-8">
                <a 
                  href={scholarship.applyLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-navy text-white font-ui font-semibold text-[15px] px-8 py-3.5 rounded-lg hover:bg-[#1a3b72] active:scale-[0.98] transition-all"
                >
                  Visit Official Portal <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </section>

          <div className="mt-16 bg-surface-light border border-border p-8 rounded-2xl text-center">
            <h3 className="heading-sm mb-2">Need help navigating admissions and scholarships?</h3>
            <p className="body-sm text-text-secondary mb-6">Our counsellors can help you find the best colleges and identify financial aid options.</p>
            <Link href="/apply" className="inline-block bg-brand-blue text-white py-2.5 px-6 rounded-lg font-medium text-sm hover:bg-[#1648c0] transition-colors">
              Apply for Counselling
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
