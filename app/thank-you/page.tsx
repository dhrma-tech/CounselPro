import Link from 'next/link';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { CONTACT_CONFIG } from '@/config/contact';

export const metadata = {
  title: 'Thank You | CounselPro',
  description: 'Your application has been received.',
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-light px-6 py-20 text-center">
      <div className="bg-white rounded-3xl p-10 max-w-2xl w-full shadow-sm border border-border">
        <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500">
          <CheckCircle className="text-brand-blue w-10 h-10" />
        </div>
        
        <h1 className="heading-lg mb-4">Application received!</h1>
        <p className="body-lg text-text-secondary mb-12">
          Thank you for applying. Our counselling team will reach out within 24 hours.
        </p>

        <div className="bg-surface-light rounded-2xl p-8 mb-12 text-left">
          <h3 className="heading-sm mb-6 text-center">What happens next</h3>
          <div className="space-y-6 md:space-y-0 md:flex items-start justify-between relative">
            <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] border-t-2 border-dashed border-border z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center md:flex-1">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm border border-border flex items-center justify-center font-display text-[20px] text-brand-navy mb-4">
                1
              </div>
              <h4 className="font-ui font-semibold text-[15px] mb-1">We review details</h4>
              <p className="text-[13px] text-text-muted text-center">within 24 hours</p>
            </div>

            <div className="relative z-10 flex flex-col items-center md:flex-1">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm border border-border flex items-center justify-center font-display text-[20px] text-brand-navy mb-4">
                2
              </div>
              <h4 className="font-ui font-semibold text-[15px] mb-1">We call you</h4>
              <p className="text-[13px] text-text-muted text-center">initial guidance call</p>
            </div>

            <div className="relative z-10 flex flex-col items-center md:flex-1">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm border border-border flex items-center justify-center font-display text-[20px] text-brand-navy mb-4">
                3
              </div>
              <h4 className="font-ui font-semibold text-[15px] mb-1">Build shortlist</h4>
              <p className="text-[13px] text-text-muted text-center">personalized list</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href={CONTACT_CONFIG.whatsappGroupLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-ui font-semibold text-[15px] px-6 py-3 rounded-lg hover:bg-[#20b858] active:scale-[0.98] transition-all">
            <MessageCircle className="w-5 h-5" />
            Join WhatsApp Community &rarr;
          </a>
          <Link href="/" className="text-text-secondary font-ui font-medium text-[15px] hover:text-brand-blue py-3 px-6 hover:bg-surface-light rounded-lg transition-all">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
