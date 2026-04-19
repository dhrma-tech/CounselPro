import Link from 'next/link';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import { LinkedInIcon } from '@/components/shared/SocialIcons';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white/70 py-16 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Col 1 */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-[22px] text-white flex items-baseline mb-4">
              CounselPro<span className="text-brand-blue font-bold text-3xl leading-[0]">.</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Expert college admission counselling for JoSAA and MHT CET students across India.
            </p>
            <div className="flex flex-col gap-3">
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-green-400 transition-colors text-sm font-medium"
              >
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500">
                  <MessageCircle className="w-4 h-4" />
                </div>
                WhatsApp Us
              </a>
              <a 
                href="tel:+919876543210" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-brand-blue transition-colors text-sm font-medium"
              >
                <div className="w-8 h-8 bg-brand-blue/10 rounded-lg flex items-center justify-center text-brand-blue">
                  <Phone className="w-4 h-4" />
                </div>
                +91 98765 43210
              </a>
              <a 
                href="mailto:contact@counselpro.in" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-brand-blue transition-colors text-sm font-medium"
              >
                <div className="w-8 h-8 bg-brand-blue/10 rounded-lg flex items-center justify-center text-brand-blue">
                  <Mail className="w-4 h-4" />
                </div>
                contact@counselpro.in
              </a>
              <a 
                href="https://linkedin.com/company/counselpro" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-blue-400 transition-colors text-sm font-medium"
              >
                <div className="w-8 h-8 bg-blue-400/10 rounded-lg flex items-center justify-center text-blue-400">
                  <LinkedInIcon className="w-4 h-4" />
                </div>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Counselling</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link href="/counselling" className="hover:text-white transition-colors">Counselling Hub</Link></li>
              <li><Link href="/apply" className="hover:text-white transition-colors font-semibold text-brand-blue">Apply for Expert Help</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Research</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/resources" className="hover:text-white transition-colors">Resource Hub</Link></li>
              <li><Link href="/colleges" className="hover:text-white transition-colors">College Directory</Link></li>
              <li><Link href="/branches" className="hover:text-white transition-colors">Branch Explorer</Link></li>
              <li><Link href="/updates" className="hover:text-white transition-colors">Latest Updates</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col items-center gap-8">
          <div className="flex flex-row items-center gap-3 group cursor-pointer">
            <span className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap">Design & Developed</span>
            <a 
              href="https://www.linkedin.com/in/dharma-a-921432260/" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-brand-blue/50 transition-all duration-500"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-brand-blue" />
              <span className="font-display text-[14px] text-white tracking-wide group-hover:text-brand-blue transition-colors">@dhrma-tech</span>
            </a>
          </div>
          
          {/* Removed copyright/policy bar as requested */}
        </div>
      </div>
    </footer>
  );
}
