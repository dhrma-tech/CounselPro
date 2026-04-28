import { branches } from '@/data/branches';
import { colleges } from '@/data/colleges';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';

export function generateStaticParams() {
  return branches.map((branch) => ({
    slug: branch.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const branch = branches.find(b => b.slug === slug);
  if (!branch) return { title: 'Branch Not Found' };
  
  return {
    title: `${branch.name} — Cutoffs, Colleges, Career | CounselPro`,
    description: `Learn about ${branch.name}, core subjects, career paths, and the top colleges offering it.`,
  };
}

export default async function BranchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const branch = branches.find(b => b.slug === slug);

  if (!branch) {
    return (
      <div className="py-40 text-center flex flex-col items-center justify-center">
        <h1 className="heading-xl text-brand-navy mb-4">Branch Not Found</h1>
        <p className="body-md text-text-muted mb-8">The academic discipline you are looking for does not exist in our directory.</p>
        <Link href="/branches" className="px-8 py-3 bg-brand-blue text-white rounded-xl font-bold">Back to Directory</Link>
      </div>
    );
  }

  // Find colleges offering this branch
  const collegesOffering = colleges.filter(c => 
    c.branches.some(cb => cb.branch.toLowerCase().includes(branch.name.toLowerCase()))
  );

  return (
    <div className="bg-surface-white min-h-screen">
      {/* HERO SECTION */}
      <section className="pt-24 pb-16 bg-surface-light border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Academic Branches', href: '/branches' },
              { label: branch.name, href: `/branches/${branch.slug}` }
            ]} 
          />

          <div className="mt-8">
            <Link 
              href="/branches" 
              className="inline-flex items-center gap-2 text-[13px] font-bold text-brand-blue hover:text-brand-navy mb-6 group transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back to all branches
            </Link>
            <br />
            <span className="inline-block px-3 py-1 rounded-full text-[12px] font-bold bg-brand-blue/10 text-brand-blue uppercase tracking-wider mb-4 border border-brand-blue/10">
              {branch.category} • {branch.domain}
            </span>
            <h1 className="heading-xl mb-4 font-display bg-gradient-to-r from-brand-navy to-brand-blue bg-clip-text text-transparent italic">
              {branch.name}
            </h1>
            <p className="body-lg max-w-3xl text-text-secondary leading-relaxed">
              {branch.description}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-[68%]">
            
            <div className="space-y-16">
              {/* DETAILED OVERVIEW */}
              <section className="bg-surface-light p-8 md:p-10 rounded-[32px] border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-brand-navy rounded-full"></div>
                  <h2 className="heading-md">Academic Overview</h2>
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="body-md text-text-secondary leading-relaxed text-[17px]">
                    {branch.longDescription || `${branch.name} is a cornerstone of academic excellence, integrating theoretical principles with practical application. It plays a pivotal role in the professional advancement of industries worldwide. Students pursuing this discipline depth-dive into fundamental concepts that govern their field, preparing them for a dynamic career in research, development, and professional practice.`}
                  </p>
                  <p className="body-md text-text-secondary leading-relaxed text-[17px] mt-4">
                    In the current academic landscape, this discipline is evolving rapidly with the integration of modern methodologies and global standards, making it one of the most sought-after fields for aspiring students.
                  </p>
                </div>
              </section>

              {/* CORE SUBJECTS */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-brand-blue rounded-full"></div>
                  <h2 className="heading-md">Common Core Subjects</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {branch.coreSubjects.map(sub => (
                    <div key={sub} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-border shadow-sm hover:border-brand-blue/30 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-surface-light flex items-center justify-center text-brand-blue">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                      </div>
                      <span className="font-ui font-semibold text-[15px] text-text-primary">{sub}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* SPECIALIZATION TRACKS */}
              {branch.specializationTracks && branch.specializationTracks.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-brand-violet rounded-full"></div>
                    <h2 className="heading-md">Specialization Tracks</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {branch.specializationTracks.map(track => (
                      <span key={track} className="px-4 py-2 bg-surface-light border border-border rounded-lg text-[14px] font-semibold text-text-primary hover:border-brand-violet/30 transition-all">
                        {track}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* CAREER PATHS */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-brand-teal rounded-full"></div>
                  <h2 className="heading-md">Career Evolution</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {branch.careerPaths.map(path => (
                    <div key={path} className="group bg-surface-light p-5 rounded-2xl border border-border hover:bg-white hover:border-brand-teal/40 hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-teal mb-3 shadow-sm group-hover:bg-brand-teal group-hover:text-white transition-all">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      </div>
                      <h4 className="font-ui font-bold text-[16px] text-text-primary">{path}</h4>
                    </div>
                  ))}
                </div>
              </section>

              {/* SKILLS */}
              {branch.skillRequirements && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-brand-navy rounded-full"></div>
                    <h2 className="heading-md">Skill Mastery</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-border">
                      <h4 className="text-[12px] font-bold uppercase tracking-widest text-text-muted mb-4">Technical Assets</h4>
                      <ul className="space-y-2">
                        {branch.skillRequirements.technical.map(skill => (
                          <li key={skill} className="flex items-start gap-2 text-[14px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-2 shrink-0"></span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-border">
                      <h4 className="text-[12px] font-bold uppercase tracking-widest text-text-muted mb-4">Professional Excellence</h4>
                      <ul className="space-y-2">
                        {branch.skillRequirements.soft.map(skill => (
                          <li key={skill} className="flex items-start gap-2 text-[14px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-2 shrink-0"></span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="w-full lg:w-[32%] sticky top-28">
            <div className="bg-brand-navy p-8 rounded-[32px] text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-0"></div>
              
              <h3 className="font-display text-2xl mb-4 relative z-10">Confused about Choice Filling?</h3>
              <p className="body-sm mb-8 text-white/80 leading-relaxed relative z-10">
                Seat allocation is based on a complex algorithm of preference and rank. 
                One wrong choice can cost you a better branch.
              </p>
              
              <div className="space-y-4 relative z-10">
                {[
                  'Personalized Choice List',
                  'Branch Scoping session',
                  'Round-wise analysis',
                  'Spot Round guidance'
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm font-medium">
                    <svg className="w-5 h-5 text-brand-teal" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              <Link 
                href="/apply" 
                className="w-full block text-center bg-brand-teal text-brand-navy font-ui font-bold text-[15px] px-6 py-4 rounded-2xl hover:bg-[#14b8a6] active:scale-[0.98] transition-all duration-200 mt-8 relative z-10 shadow-lg"
              >
                Get Expert Guidance
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
