"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Mail, ArrowLeft, ShieldCheck } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
  </svg>
);

export default function LoginForm({ next, initialError }: { next: string; initialError: string }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [loading, setLoading] = useState<'google' | 'email' | 'code' | null>(null);
  const [error, setError] = useState(initialError);

  const callbackUrl = () => `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

  const signInWithGoogle = async () => {
    setError('');
    setLoading('google');
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: callbackUrl() } });
    if (error) {
      setError('Google sign-in is not available right now. Please use your email instead.');
      setLoading(null);
    }
  };

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setLoading('email');
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: true, emailRedirectTo: callbackUrl() },
    });
    setLoading(null);
    if (error) {
      setError(error.status === 429 ? 'Too many attempts. Please wait a minute and try again.' : 'Could not send the email. Please try again.');
      return;
    }
    setStep('code');
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading('code');
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.verifyOtp({ email: email.trim(), token: code.trim(), type: 'email' });
    if (error) {
      setLoading(null);
      setError('That code is wrong or has expired. Check the latest email and try again.');
      return;
    }
    await fetch('/api/auth/claim', { method: 'POST' }).catch(() => null);
    router.replace(next);
    router.refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[440px] bg-white border border-border rounded-[32px] p-8 sm:p-10 shadow-sm"
    >
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl text-text-primary mb-2">Sign in to CounselPro</h1>
        <p className="body-sm text-text-secondary">Save your test results, see your full analysis and continue on any device.</p>
      </div>

      {step === 'email' ? (
        <div className="space-y-5">
          <button
            onClick={signInWithGoogle}
            disabled={loading !== null}
            className="w-full h-12 flex items-center justify-center gap-3 bg-white border border-border rounded-xl font-ui font-semibold text-[15px] text-text-primary hover:bg-surface-light transition-all disabled:opacity-60"
          >
            {loading === 'google' ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleIcon />}
            Continue with Google
          </button>

          <div className="flex items-center gap-3 text-[12px] text-text-muted font-ui uppercase tracking-wider">
            <div className="h-px bg-border flex-1" /> or <div className="h-px bg-border flex-1" />
          </div>

          <form onSubmit={sendCode} className="space-y-3">
            <label className="font-ui font-medium text-[13px] text-text-secondary" htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <button
              type="submit"
              disabled={loading !== null}
              className="w-full h-12 flex items-center justify-center gap-2 bg-brand-blue text-white rounded-xl font-ui font-bold text-[15px] hover:bg-[#1648c0] transition-all shadow-md shadow-brand-blue/20 disabled:opacity-60"
            >
              {loading === 'email' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
              Email me a sign-in code
            </button>
          </form>
        </div>
      ) : (
        <form onSubmit={verifyCode} className="space-y-4">
          <button
            type="button"
            onClick={() => { setStep('email'); setCode(''); setError(''); }}
            className="flex items-center gap-1.5 text-[13px] text-text-muted hover:text-brand-blue transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Use a different email
          </button>
          <p className="body-sm text-text-secondary">
            We sent an email to <b className="text-text-primary">{email}</b>. Click the link in it, or type the code from the email here.
          </p>
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="Code from email"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="input-field text-center tracking-[0.4em] font-semibold"
          />
          <button
            type="submit"
            disabled={loading !== null || code.length < 6}
            className="w-full h-12 flex items-center justify-center gap-2 bg-brand-blue text-white rounded-xl font-ui font-bold text-[15px] hover:bg-[#1648c0] transition-all shadow-md shadow-brand-blue/20 disabled:opacity-60"
          >
            {loading === 'code' ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            Verify and sign in
          </button>
        </form>
      )}

      {error && (
        <p className="mt-5 p-3 bg-red-50 border border-red-100 rounded-xl text-[13px] text-red-600 text-center">{error}</p>
      )}

      <p className="mt-8 text-[12px] text-text-muted text-center leading-relaxed">
        By continuing you agree to our <a href="/terms" className="underline hover:text-brand-blue">Terms</a> and{' '}
        <a href="/privacy-policy" className="underline hover:text-brand-blue">Privacy Policy</a>.
      </p>
    </motion.div>
  );
}
