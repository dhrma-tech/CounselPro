import Link from 'next/link';
import { Users, FileText, CheckCircle, Target, Award, Rocket, ShieldCheck, Heart } from 'lucide-react';
import PageCTA from '@/components/shared/PageCTA';
import Breadcrumb from '@/components/shared/Breadcrumb';

export const metadata = {
  title: 'About Us | CounselPro',
  description: 'Learn about CounselPro, our mission, and our expert counselling team.'
};

export default function AboutPage() {
  return (
    <div className="bg-surface-white">
      {/* HEADER SECTION */}
      <div className="pt-24 pb-16 bg-surface-light border-b border-border px-6 text-center">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'About Us', href: '/about' }
            ]} 
          />
          <div className="mt-8">
            <h1 className="font-display text-[48px] md:text-[64px] text-brand-navy leading-tight italic">
              Empowering Students <br/> Through <span className="text-brand-blue not-italic">Data & Strategy.</span>
            </h1>
            <p className="body-lg max-w-2xl mx-auto text-text-secondary mt-6">
              We started CounselPro with a simple mission: to ensure no deserving student loses their dream college due to complex counselling rules.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* OUR STORY */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="w-12 h-1 bg-brand-blue rounded-full"></div>
            <h2 className="heading-lg">The "CounselPro" Story</h2>
            <div className="body-md space-y-6 text-text-secondary leading-relaxed text-[17px]">
              <p>
                Every year, over 20 lakh students appear for engineering entrance exams across India. While coaching centers focus relentlessly on curricula, very few prepare students for what comes after the results: <strong>The Admission Maze.</strong>
              </p>
              <p>
                We noticed students with excellent percentiles ending up in mediocre colleges because they filled their option forms incorrectly, didn't understand the floating/sliding rules, or were unaware of strategic state quotas.
              </p>
              <p>
                CounselPro was born to bridge this gap. We are a team of data-driven specialists who understand the JoSAA and CAP algorithms as deeply as the students understand their subjects.
              </p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="bg-brand-navy rounded-[40px] p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="grid grid-cols-2 gap-y-12 gap-x-8 relative z-10">
                <div>
                  <div className="font-display text-5xl mb-2 text-brand-blue">2018</div>
                  <div className="text-[13px] uppercase tracking-widest font-bold text-white/50">Founded</div>
                </div>
                <div>
                  <div className="font-display text-5xl mb-2 text-brand-blue">2k+</div>
                  <div className="text-[13px] uppercase tracking-widest font-bold text-white/50">Students</div>
                </div>
                <div>
                  <div className="font-display text-5xl mb-2 text-brand-blue">98%</div>
                  <div className="text-[13px] uppercase tracking-widest font-bold text-white/50">Success</div>
                </div>
                <div>
                  <div className="font-display text-5xl mb-2 text-brand-blue">15+</div>
                  <div className="text-[13px] uppercase tracking-widest font-bold text-white/50">Experts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MISSION STRIP */}
        <div className="bg-gradient-to-br from-brand-navy to-[#0a1a3d] text-white rounded-[40px] p-12 md:p-20 text-center mb-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          <Rocket className="w-12 h-12 text-brand-teal mx-auto mb-8 animate-bounce" />
          <h2 className="font-ui font-bold text-brand-blue mb-6 uppercase tracking-widest text-[13px]">Our Mission Statement</h2>
          <p className="font-display text-[28px] md:text-[40px] leading-[1.2] max-w-4xl mx-auto italic">
            "To make every student's admission journey strategic, stress-free, and successful, ensuring they unlock the highest potential of their merit."
          </p>
        </div>

        {/* CORE VALUES */}
        <div>
          <h2 className="heading-lg mb-4 text-center">Our Core Pillars</h2>
          <p className="body-md text-text-muted text-center mb-16 max-w-xl mx-auto">These values drive every consultation and strategy we build for our students.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 border border-border rounded-3xl bg-surface-white hover:shadow-xl transition-all hover:border-brand-blue/20 group">
              <div className="w-14 h-14 bg-surface-light rounded-2xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="font-display text-xl mb-3 text-brand-navy">Unbiased Advice</h4>
              <p className="body-sm leading-relaxed">We represent the student, not the institutions. Our guidance is 100% objective and performance-based.</p>
            </div>

            <div className="p-8 border border-border rounded-3xl bg-surface-white hover:shadow-xl transition-all hover:border-brand-teal/20 group">
              <div className="w-14 h-14 bg-surface-light rounded-2xl flex items-center justify-center text-brand-teal mb-6 group-hover:bg-brand-teal group-hover:text-white transition-all">
                <Target className="w-7 h-7" />
              </div>
              <h4 className="font-display text-xl mb-3 text-brand-navy">Algorithmic Strategy</h4>
              <p className="body-sm leading-relaxed">We use historical cutoff data and predictive modeling to build lists that maximize seat probability.</p>
            </div>

            <div className="p-8 border border-border rounded-3xl bg-surface-white hover:shadow-xl transition-all hover:border-brand-violet/20 group">
              <div className="w-14 h-14 bg-surface-light rounded-2xl flex items-center justify-center text-brand-violet mb-6 group-hover:bg-brand-violet group-hover:text-white transition-all">
                <Award className="w-7 h-7" />
              </div>
              <h4 className="font-display text-xl mb-3 text-brand-navy">Merit Advocacy</h4>
              <p className="body-sm leading-relaxed">Every mark counts. We help you navigate complex reservation rules and quotas to protect your merit.</p>
            </div>

            <div className="p-8 border border-border rounded-3xl bg-surface-white hover:shadow-xl transition-all hover:border-red-200 group">
              <div className="w-14 h-14 bg-surface-light rounded-2xl flex items-center justify-center text-red-500 mb-6 group-hover:bg-red-500 group-hover:text-white transition-all">
                <Heart className="w-7 h-7" />
              </div>
              <h4 className="font-display text-xl mb-3 text-brand-navy">Student Empathy</h4>
              <p className="body-sm leading-relaxed">The 3-month counselling period is stressful. We act as a calm, professional anchor for the whole family.</p>
            </div>
          </div>
        </div>
      </div>
      
      <PageCTA title="Maximize your admission chances today" ctaText="Talk to an Expert" />
    </div>
  );
}
