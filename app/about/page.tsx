import Link from 'next/link';
import { Users, FileText, CheckCircle, Target } from 'lucide-react';
import PageCTA from '@/components/shared/PageCTA';

export const metadata = {
  title: 'About Us | CounselPro',
  description: 'Learn about CounselPro, our mission, and our expert counselling team.'
};

export default function AboutPage() {
  return (
    <>
      <div className="py-20 bg-surface-light border-b border-border text-center px-6">
        <h1 className="font-display text-[48px] md:text-[56px] text-brand-navy mb-6">About CounselPro</h1>
        <p className="body-lg max-w-2xl mx-auto">
          We started because counselling was too confusing, and promising students were making expensive mistakes due to lack of guidance.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="heading-lg">Our Story</h2>
            <div className="body-md space-y-4 text-text-secondary">
              <p>
                Every year, over 20 lakh students appear for engineering entrance exams across India. While caching centers focus relentlessly on teaching Physics, Chemistry, and Math, very few institutions prepare students for what comes after the results: The Counselling Process.
              </p>
              <p>
                We noticed students with excellent percentiles ending up in mediocre colleges because they filled their option forms incorrectly, didn't understand the floating/sliding rules, or were unaware of special quotas.
              </p>
              <p>
                CounselPro was born to bridge this gap. We are a team of data-driven admission experts who understand the JoSAA and CAP algorithms inside out.
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-brand-navy rounded-2xl p-8 text-white grid grid-cols-2 gap-8">
              <div>
                <div className="font-display text-4xl mb-2 text-brand-blue">2018</div>
                <div className="text-sm text-white/70">Year Founded</div>
              </div>
              <div>
                <div className="font-display text-4xl mb-2 text-brand-blue">2,000+</div>
                <div className="text-sm text-white/70">Students Helped</div>
              </div>
              <div>
                <div className="font-display text-4xl mb-2 text-brand-blue">8</div>
                <div className="text-sm text-white/70">States Covered</div>
              </div>
              <div>
                <div className="font-display text-4xl mb-2 text-brand-blue">98%</div>
                <div className="text-sm text-white/70">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-navy text-white rounded-2xl p-10 md:p-16 text-center mb-24">
          <h2 className="font-ui font-medium text-brand-blue mb-4 uppercase tracking-widest text-sm">Our Mission</h2>
          <p className="font-display text-[28px] md:text-[36px] leading-[1.3] max-w-4xl mx-auto">
            "To make every student's counselling journey simple, strategic, and stress-free, ensuring they achieve the best possible institution for their merit."
          </p>
        </div>

        <div>
          <h2 className="heading-lg mb-10 text-center">What we know best</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-border rounded-xl bg-surface-white">
              <Target className="w-8 h-8 text-brand-blue mb-4" />
              <h4 className="heading-sm mb-2">JoSAA Round Strategy</h4>
              <p className="body-sm">Knowing exactly when to Freeze, Float or Slide over 6 grueling rounds.</p>
            </div>
            <div className="p-6 border border-border rounded-xl bg-surface-white">
              <FileText className="w-8 h-8 text-brand-blue mb-4" />
              <h4 className="heading-sm mb-2">MHT CET Rules</h4>
              <p className="body-sm">Navigating Home University vs State quotas to maximize CAP allotment.</p>
            </div>
            <div className="p-6 border border-border rounded-xl bg-surface-white">
              <Users className="w-8 h-8 text-brand-blue mb-4" />
              <h4 className="heading-sm mb-2">Category Navigation</h4>
              <p className="body-sm">Document requirements for EWS, OBC-NCL, TFWS, SC/ST, and PwD.</p>
            </div>
            <div className="p-6 border border-border rounded-xl bg-surface-white">
              <CheckCircle className="w-8 h-8 text-brand-blue mb-4" />
              <h4 className="heading-sm mb-2">Rank Shortlisting</h4>
              <p className="body-sm">Building a realistic list of 'Ambitious', 'Target', and 'Safe' colleges.</p>
            </div>
          </div>
        </div>
      </div>
      
      <PageCTA title="Ready to start your journey?" ctaText="Apply Now" />
    </>
  );
}
