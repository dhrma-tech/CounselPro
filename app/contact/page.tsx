"use client";

import { useState } from 'react';
import { MessageCircle, Mail, MapPin, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [data, setData] = useState({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const url = process.env.NEXT_PUBLIC_SHEET_URL;
      if (!url) throw new Error('Not configured');

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ ...data, formType: 'contact', submittedAt: new Date().toISOString() }),
      });
      
      if (!res.ok) throw new Error('Failed');
      setSuccess(true);
      setData({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="py-20 bg-surface-light border-b border-border text-center px-6">
        <h1 className="heading-xl mb-4">Contact Us</h1>
        <p className="body-lg max-w-2xl mx-auto">
          Have a question about counselling? We're here to help.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Form */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white border text-left border-border rounded-2xl p-8 md:p-10 shadow-sm">
              <h2 className="heading-md mb-8">Send us a message</h2>
              
              {success ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl text-center">
                  <h3 className="font-semibold text-lg mb-2">Message sent successfully!</h3>
                  <p className="text-sm">We'll get back to you to the provided email or phone number within 24 hours.</p>
                  <button onClick={() => setSuccess(false)} className="mt-4 text-brand-blue font-medium text-sm">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block label mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input required type="text" name="name" value={data.name} onChange={handleChange} className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                    </div>
                    <div>
                      <label className="block label mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                      <input required type="tel" name="phone" value={data.phone} onChange={handleChange} className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                    </div>
                  </div>

                  <div>
                    <label className="block label mb-1.5">Email Address <span className="text-red-500">*</span></label>
                    <input required type="email" name="email" value={data.email} onChange={handleChange} className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                  </div>

                  <div>
                    <label className="block label mb-1.5">Query Regarding</label>
                    <select name="subject" value={data.subject} onChange={handleChange} className="w-full h-12 px-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue">
                      <option>General Inquiry</option>
                      <option>JoSAA Counselling</option>
                      <option>MHT CET Counselling</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block label mb-1.5">Your Message <span className="text-red-500">*</span></label>
                    <textarea required name="message" value={data.message} onChange={handleChange} rows={5} className="w-full p-4 border border-border rounded-lg font-ui text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"></textarea>
                  </div>

                  {error && <div className="text-red-600 text-sm">{error}</div>}

                  <button disabled={isSubmitting} type="submit" className="w-full md:w-auto px-8 py-3 bg-brand-blue text-white rounded-lg font-ui font-semibold text-[15px] hover:bg-[#1648c0] active:scale-[0.98] transition-all flex justify-center items-center gap-2">
                    {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full lg:w-2/5 space-y-8">
            <div className="bg-brand-navy rounded-2xl p-8 text-white">
              <h3 className="font-display text-2xl mb-6">Connect with us instantly</h3>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-[#25D366] text-white p-4 rounded-xl hover:bg-[#20b858] transition-colors mb-6 group">
                <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-semibold text-lg">Chat on WhatsApp</div>
                  <div className="text-white/80 text-sm">Fastest way to reach out</div>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-brand-blue shrink-0 mt-1" />
                <div>
                  <div className="font-medium">Email Us</div>
                  <a href="mailto:support@counselpro.in" className="text-white/80 text-sm hover:underline">support@counselpro.in</a>
                </div>
              </div>
            </div>

            <div className="bg-surface-light p-8 rounded-2xl border border-border">
              <h3 className="heading-sm mb-6">Our Office</h3>
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-6 h-6 text-brand-blue shrink-0 mt-1" />
                <div className="text-text-secondary text-sm leading-relaxed">
                  CounselPro Head Office<br/>
                  123 Education Hub, Sector 4<br/>
                  Pune, Maharashtra 411001
                </div>
              </div>
              <div className="text-sm text-text-muted">
                <strong className="text-text-primary block mb-1">Response Time</strong>
                We typically respond within 4–6 hours on working days.
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
