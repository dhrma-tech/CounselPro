import { branches } from '@/data/branches';
import { colleges } from '@/data/colleges';
import Link from 'next/link';

export function generateStaticParams() {
  return branches.map((branch) => ({
    slug: branch.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const branch = branches.find(b => b.slug === params.slug);
  if (!branch) return { title: 'Branch Not Found' };
  
  return {
    title: `${branch.name} — Cutoffs, Colleges, Career | CounselPro`,
    description: `Learn about ${branch.name}, core subjects, career paths, and the top colleges offering it.`,
  };
}

export default function BranchDetailPage({ params }: { params: { slug: string } }) {
  const branch = branches.find(b => b.slug === params.slug);

  if (!branch) {
    return <div className="py-40 text-center">Branch Not Found</div>;
  }

  // Find colleges offering this branch
  const collegesOffering = colleges.filter(c => 
    c.branches.some(cb => cb.branch.toLowerCase().includes(branch.name.toLowerCase()))
  );

  return (
    <div className="bg-surface-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8 font-ui">
          <Link href="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <span>/</span>
          <Link href="/branches" className="hover:text-brand-blue transition-colors">Branches</Link>
          <span>/</span>
          <span className="text-text-primary capitalize">{branch.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-[70%]">
            
            <div className="mb-10">
              <span className="inline-block px-3 py-1 rounded-full text-[13px] font-medium bg-surface-light border border-border text-text-secondary mb-4">
                {branch.domain}
              </span>
              <h1 className="heading-xl mb-6">{branch.name}</h1>
            </div>

            <section className="mb-12">
              <h2 className="heading-md mb-4 border-b border-border pb-2">What is this branch?</h2>
              <p className="body-md text-text-secondary leading-relaxed">
                {branch.description}
              </p>
            </section>

            <section className="mb-12">
              <h2 className="heading-md mb-4 border-b border-border pb-2">Core Subjects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {branch.coreSubjects.map(sub => (
                  <div key={sub} className="flex items-center gap-3 bg-surface-light p-3 rounded-lg border border-border">
                    <div className="w-2 h-2 rounded-full bg-brand-blue flex-shrink-0"></div>
                    <span className="font-medium text-sm text-text-primary">{sub}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="heading-md mb-4 border-b border-border pb-2">Career Paths</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {branch.careerPaths.map(path => (
                  <div key={path} className="bg-surface-white p-4 rounded-xl border border-border shadow-sm flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <span className="font-ui font-semibold text-[15px]">{path}</span>
                  </div>
                ))}
              </div>
            </section>

            {collegesOffering.length > 0 && (
              <section className="mb-12">
                <h2 className="heading-md mb-4 border-b border-border pb-2">Top Colleges Offering It</h2>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-surface-light text-text-muted font-medium uppercase tracking-wider text-[12px]">
                      <tr>
                        <th className="px-4 py-3 border-b border-border">College</th>
                        <th className="px-4 py-3 border-b border-border">Counselling</th>
                        <th className="px-4 py-3 border-b border-border">Avg Close Rank</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border font-ui">
                      {collegesOffering.map((c, i) => {
                        const bData = c.branches.find(cb => cb.branch.toLowerCase().includes(branch.name.toLowerCase()));
                        return (
                        <tr key={i} className="hover:bg-surface-light/30">
                          <td className="px-4 py-3 font-medium text-brand-blue hover:underline">
                            <Link href={`/colleges/${c.slug}`}>{c.name}</Link>
                          </td>
                          <td className="px-4 py-3 text-text-secondary">{bData?.counselling || '-'}</td>
                          <td className="px-4 py-3 text-brand-navy font-semibold">{bData?.closeRank || '-'}</td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>

          <div className="w-full lg:w-[30%]">
            <div className="sticky top-28 bg-surface-light border border-brand-teal/20 p-6 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-bl-full -z-10"></div>
              <h3 className="font-display text-2xl text-brand-navy mb-2">Aiming for {branch.name}?</h3>
              <p className="body-sm mb-6 text-text-secondary leading-relaxed">
                Branch cutoffs change drastically every round. Get expert counselling to secure a seat in this branch at top colleges.
              </p>
              <Link 
                href="/apply" 
                className="w-full block text-center bg-brand-blue text-white font-ui font-semibold text-[15px] px-6 py-3 rounded-lg hover:bg-[#1648c0] active:scale-[0.98] transition-all duration-150"
              >
                Apply for Counselling
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
