"use client";

import { useState } from 'react';
import { MessageCircle, Mail, MapPin, Loader2, Phone, Clock } from 'lucide-react';
import { LinkedInIcon } from '@/components/shared/SocialIcons';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { motion } from 'framer-motion';
import { submitContactForm } from '@/app/actions/submission';
import { CONTACT_CONFIG } from '@/config/contact';

export default function ContactPage() {
  const [data, setData] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setFieldErrors({});

    // Client-side validation
    const nameWords = data.name.trim().split(/\s+/).filter(Boolean).length;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newFieldErrors: Record<string, string> = {};

    if (nameWords < 3) {
      newFieldErrors.name = "Please provide your full legal name (minimum 3 words)";
    }

    if (!phoneRegex.test(data.phone)) {
      newFieldErrors.phone = "A valid 10-digit mobile number is required";
    }

    if (!emailRegex.test(data.email)) {
      newFieldErrors.email = "Please enter a valid email address for correspondence";
    }

    if (data.message.trim().length < 10) {
      newFieldErrors.message = "Please provide more details (minimum 10 characters)";
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      const submissionId = 'CP-CT-' + Date.now();
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      formData.append('submissionId', submissionId);
      const result = await submitContactForm(null, formData);
      
      if (result.success) {
        setSuccess(true);
        
        // Construct mailto link
        const subject = encodeURIComponent(`Service Inquiry from ${data.name}`);
        const body = encodeURIComponent(
          `Name: ${data.name}\n` +
          `Mobile: ${data.phone}\n` +
          `Email: ${data.email}\n\n` +
          `Message:\n${data.message}`
        );
        const mailtoUrl = `mailto:${CONTACT_CONFIG.email}?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoUrl;

        setData({ name: '', phone: '', email: '', message: '' });
      } else {
        if (result.errors) {
          // Flatten Zod errors if available
          const flattened: Record<string, string> = {};
          Object.entries(result.errors).forEach(([key, val]) => {
            if (Array.isArray(val)) flattened[key] = val[0];
          });
          setFieldErrors(flattened);
        }
        setError(result.message || 'Verification failed. Please check the highlighted fields.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again or reach out via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-surface-white min-h-screen">
      {/* HEADER SECTION */}
      <div className="pt-24 pb-16 bg-surface-light border-b border-border px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact', href: '/contact' }
            ]} 
          />
          <div className="mt-8">
            <motion.h1 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="heading-xl mb-4 font-display"
            >
              Let's Connect
            </motion.h1>
            <p className="body-lg max-w-2xl text-text-secondary leading-relaxed">
              Facing issues with JoSAA registration? Confused about MHT CET option forms? 
              Our team is ready to guide you through the maze.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Main Form */}
          <div className="w-full lg:w-[60%] order-2 lg:order-1">
            <div className="bg-white border text-left border-border rounded-[32px] p-8 md:p-12 shadow-sm relative overflow-hidden">

              
              <h2 className="heading-md mb-8">Service Inquiry Form</h2>
              
              {success ? (
                <div className="bg-green-50 border border-green-100 text-green-800 p-10 rounded-3xl text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="font-display text-2xl mb-2">Message Prepared!</h3>
                  <p className="text-text-secondary mb-6">Your message has been securely logged. Your email client is now opening to send the finalized transmission to our experts.</p>
                  <button onClick={() => setSuccess(false)} className="bg-brand-blue text-white font-ui font-bold px-8 py-3 rounded-xl transition-all hover:shadow-lg">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className={`text-[13px] font-bold uppercase tracking-wider transition-colors ${fieldErrors.name ? 'text-red-500' : 'text-text-muted'}`}>Full Name</label>
                      <input 
                        required 
                        type="text" 
                        name="name" 
                        value={data.name} 
                        onChange={handleChange} 
                        className={`w-full h-14 px-5 bg-surface-light border rounded-xl font-ui text-[16px] focus:outline-none focus:ring-2 transition-all ${fieldErrors.name ? 'border-red-400 focus:ring-red-400/10 focus:border-red-400' : 'border-border focus:ring-brand-blue/20 focus:border-brand-blue'}`} 
                        placeholder="Enter your name" 
                      />
                      {fieldErrors.name && <p className="text-[12px] text-red-500 font-medium ml-1">{fieldErrors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className={`text-[13px] font-bold uppercase tracking-wider transition-colors ${fieldErrors.phone ? 'text-red-500' : 'text-text-muted'}`}>Mobile Number</label>
                      <input 
                        required 
                        type="tel" 
                        name="phone" 
                        maxLength={10}
                        inputMode="numeric"
                        value={data.phone} 
                        onChange={handleChange} 
                        className={`w-full h-14 px-5 bg-surface-light border rounded-xl font-ui text-[16px] focus:outline-none focus:ring-2 transition-all ${fieldErrors.phone ? 'border-red-400 focus:ring-red-400/10 focus:border-red-400' : 'border-border focus:ring-brand-blue/20 focus:border-brand-blue'}`} 
                        placeholder="10-digit mobile number" 
                      />
                      {fieldErrors.phone && <p className="text-[12px] text-red-500 font-medium ml-1">{fieldErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-[13px] font-bold uppercase tracking-wider transition-colors ${fieldErrors.email ? 'text-red-500' : 'text-text-muted'}`}>Email Address</label>
                    <input 
                      required 
                      type="email" 
                      name="email" 
                      value={data.email} 
                      onChange={handleChange} 
                      className={`w-full h-14 px-5 bg-surface-light border rounded-xl font-ui text-[16px] focus:outline-none focus:ring-2 transition-all ${fieldErrors.email ? 'border-red-400 focus:ring-red-400/10 focus:border-red-400' : 'border-border focus:ring-brand-blue/20 focus:border-brand-blue'}`} 
                      placeholder="yourname@domain.com" 
                    />
                    {fieldErrors.email && <p className="text-[12px] text-red-500 font-medium ml-1">{fieldErrors.email}</p>}
                  </div>



                  <div className="space-y-2">
                    <label className={`text-[13px] font-bold uppercase tracking-wider transition-colors ${fieldErrors.message ? 'text-red-500' : 'text-text-muted'}`}>Your Message</label>
                    <textarea 
                      required 
                      name="message" 
                      value={data.message} 
                      onChange={handleChange} 
                      rows={5} 
                      className={`w-full p-5 bg-surface-light border rounded-xl font-ui text-[16px] focus:outline-none focus:ring-2 transition-all resize-none ${fieldErrors.message ? 'border-red-400 focus:ring-red-400/10 focus:border-red-400' : 'border-border focus:ring-brand-blue/20 focus:border-brand-blue'}`} 
                      placeholder="Describe your situation..."
                    ></textarea>
                    {fieldErrors.message && <p className="text-[12px] text-red-500 font-medium ml-1">{fieldErrors.message}</p>}
                  </div>

                  {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium">{error}</div>}

                  <button 
                    disabled={isSubmitting} 
                    type="submit" 
                    className="group w-full md:w-auto px-10 py-4 bg-brand-navy text-white rounded-2xl font-ui font-bold text-[16px] hover:bg-brand-blue hover:shadow-xl active:scale-[0.98] transition-all flex justify-center items-center gap-3"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />}
                    {isSubmitting ? 'Sending Transmission...' : 'Launch Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="w-full lg:w-[40%] order-1 lg:order-2 space-y-8">
            <div className="bg-white border border-border rounded-[32px] p-8 md:p-10 shadow-sm relative overflow-hidden group hover:border-brand-blue/40 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-full -z-0"></div>
              
              <h3 className="font-display text-2xl text-brand-navy mb-10 relative z-10">Direct Support</h3>
              
              <div className="grid grid-cols-1 gap-8 relative z-10">
                <a href={CONTACT_CONFIG.whatsappGroupLink} target="_blank" rel="noreferrer" className="flex items-center gap-5 group/item">
                  <div className="w-14 h-14 bg-[#25D366]/10 rounded-2xl flex items-center justify-center group-hover/item:bg-[#25D366] transition-all">
                    <MessageCircle className="w-8 h-8 text-[#25D366] group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="font-bold text-[17px] text-text-primary leading-tight">WhatsApp Community</div>
                    <div className="text-text-muted text-sm">Join for fast admission updates</div>
                  </div>
                </a>

                <div className="flex items-center gap-5 group/item">
                  <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center group-hover/item:bg-brand-blue transition-all">
                    <Phone className="w-7 h-7 text-brand-blue group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="font-bold text-[17px] text-text-primary leading-tight">Voice Support</div>
                    <div className="text-text-muted text-sm">{CONTACT_CONFIG.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-5 group/item">
                  <div className="w-14 h-14 bg-brand-violet/10 rounded-2xl flex items-center justify-center group-hover/item:bg-brand-violet transition-all">
                    <Mail className="w-7 h-7 text-brand-violet group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="font-bold text-[17px] text-text-primary leading-tight">Email Support</div>
                    <div className="text-text-muted text-sm">{CONTACT_CONFIG.email}</div>
                  </div>
                </div>

                <a href="https://linkedin.com/company/counselpro" target="_blank" rel="noreferrer" className="flex items-center gap-5 group/item">
                  <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center group-hover/item:bg-[#0077B5] transition-all">
                    <LinkedInIcon className="w-7 h-7 text-[#0077B5] group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="font-bold text-[17px] text-text-primary leading-tight">LinkedIn</div>
                    <div className="text-text-muted text-sm">Professional Updates</div>
                  </div>
                </a>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-surface-light rounded-2xl flex items-center justify-center border border-border/50">
                    <Clock className="w-7 h-7 text-text-muted" />
                  </div>
                  <div>
                    <div className="font-bold text-[17px] text-text-primary leading-tight">Operating Hours</div>
                    <div className="text-text-muted text-sm">Mon-Sat | 10 AM - 7 PM</div>
                  </div>
                </div>
              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
}
