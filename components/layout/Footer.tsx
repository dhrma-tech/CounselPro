import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

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
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-green-400 transition-colors text-sm font-medium"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
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

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-white/40 text-[13px] gap-4">
          <p>© {new Date().getFullYear()} CounselPro. All rights reserved.</p>
          <p>Made for Indian students.</p>
        </div>
      </div>
    </footer>
  );
}
