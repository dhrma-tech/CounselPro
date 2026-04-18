import Breadcrumb from '@/components/shared/Breadcrumb';

export const metadata = {
  title: 'Privacy Policy | CounselPro',
  description: 'How we collect, use, and protect your data.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-surface-white min-h-screen">
      {/* HEADER */}
      <div className="pt-24 pb-12 bg-surface-light border-b border-border px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-start">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Privacy Policy', href: '/privacy-policy' }
            ]} 
          />
          <h1 className="font-display text-[40px] md:text-[48px] text-brand-navy mt-10">Data Privacy & Security</h1>
          <p className="text-text-muted font-ui font-semibold uppercase tracking-widest text-[12px] mt-2">Latest Revision: October 2024</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-16 px-6">
        <div className="bg-white border border-border p-8 md:p-12 rounded-[32px] shadow-sm prose prose-slate max-w-none">
          <p className="body-md leading-relaxed text-text-secondary text-[17px]">
            At CounselPro, we understand that your academic and personal data is sensitive. This Privacy Policy explains our commitment to transparency and our rigorous standards for safeguarding your information.
          </p>

          <h2 className="heading-md mt-12 mb-6 text-brand-navy">1. Information Collection</h2>
          <p className="body-md text-text-secondary">
            When you register for our counselling services, we collect data essential for building your admission strategy:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-text-secondary mt-4">
            <li><strong>Identity:</strong> Full Name, Mobile Number, and Email.</li>
            <li><strong>Academic Profile:</strong> JEE/CET Application numbers, Scorecards, and Percentiles.</li>
            <li><strong>Socio-Economic Data:</strong> Category (OBC/SC/ST), Family Income (for TFW/EBC eligibility).</li>
            <li><strong>Preferences:</strong> Choice of colleges and engineering disciplines.</li>
          </ul>

          <h2 className="heading-md mt-12 mb-6 text-brand-navy">2. Strategy Utilization</h2>
          <p className="body-md text-text-secondary">
            Your data is exclusively used to:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-text-secondary mt-4">
            <li>Evaluate your relative rank and seat probability.</li>
            <li>Create optimized "Ambitious-Target-Safe" college lists.</li>
            <li>Send critical round-wise alerts for JoSAA/CET CAP rounds via WhatsApp.</li>
            <li>Verify document eligibility for various reservation quotas.</li>
          </ul>

          <div className="bg-brand-blue/5 border-l-4 border-brand-blue p-6 my-10 rounded-r-xl italic shadow-sm">
            <strong>The CounselPro Promise:</strong> We will NEVER sell, rent, or lease your personal data to private colleges for enrollment leads, marketing agencies, or any third-party entity. Your data stays within our professional counselling team.
          </div>

          <h2 className="heading-md mt-12 mb-6 text-brand-navy">3. Security Protocal</h2>
          <p className="body-md text-text-secondary mb-6 leading-relaxed">
            All data submitted via our official forms is encrypted and stored in secure cloud environments with restricted access control. Only senior admission consultants assigned to your profile have permission to view your rank cards.
          </p>

          <h2 className="heading-md mt-12 mb-6 text-brand-navy">4. Right to Erasure</h2>
          <p className="body-md text-text-secondary mb-8 leading-relaxed">
            Students have the absolute right to request the deletion of their data once the admission cycle is complete. To request manual erasure of your records, please email <strong>privacy@counselpro.in</strong> with your registered mobile number.
          </p>
          
          <div className="pt-8 border-t border-border flex items-center justify-between">
            <p className="text-sm text-text-muted italic">By continuing to use our platform, you agree to these privacy terms.</p>
            <div className="w-12 h-12 bg-surface-light rounded-full flex items-center justify-center text-brand-blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
