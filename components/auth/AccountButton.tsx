"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BookOpenCheck, History, Loader2, LogOut, UserRound } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

/** Header control: "Sign In" when signed out, an account menu with the student's initial when signed in. */
export default function AccountButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (pathname?.startsWith('/login') || pathname?.startsWith('/auth')) return null;
  // Keep the space while the session loads so the header does not jump
  if (!ready) return <span className="w-10 h-10 sm:w-[92px] sm:h-11" aria-hidden />;

  if (!user) {
    return (
      <Link
        href={`/login?next=${encodeURIComponent(pathname || '/my-tests')}`}
        className="flex h-10 w-10 sm:h-11 sm:w-auto items-center justify-center gap-2 sm:px-5 rounded-xl bg-white border border-border text-text-primary font-ui font-semibold text-sm hover:border-brand-blue/40 hover:text-brand-blue active:scale-[0.98] transition-all"
        aria-label="Sign in"
      >
        <UserRound className="w-5 h-5 sm:hidden" />
        <span className="hidden sm:inline">Sign In</span>
      </Link>
    );
  }

  const name = (user.user_metadata?.full_name || user.user_metadata?.name || user.email || '') as string;
  const initial = name.trim().charAt(0).toUpperCase() || 'U';

  const signOut = async () => {
    setSigningOut(true);
    await createSupabaseBrowserClient().auth.signOut();
    setSigningOut(false);
    setOpen(false);
    router.refresh();
  };

  const item = 'flex items-center gap-2.5 px-3 py-2 text-sm text-text-secondary hover:text-brand-blue hover:bg-surface-light rounded-lg transition-colors';

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#DBEAFE] text-brand-blue font-ui font-bold text-[15px] flex items-center justify-center border-2 border-white shadow-sm hover:shadow-md transition-all"
        aria-label="Account menu"
        aria-expanded={open}
      >
        {initial}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-border rounded-xl shadow-xl p-2 z-50">
          <div className="px-3 py-2 mb-1 border-b border-border">
            <p className="text-[13px] font-semibold text-text-primary truncate">{name}</p>
            {user.email && name !== user.email && <p className="text-[12px] text-text-muted truncate">{user.email}</p>}
          </div>
          <Link href="/my-tests" onClick={() => setOpen(false)} className={item}><History className="w-4 h-4" /> My tests &amp; results</Link>
          <Link href="/tests/revision" onClick={() => setOpen(false)} className={item}><BookOpenCheck className="w-4 h-4" /> My revision</Link>
          <button onClick={signOut} disabled={signingOut} className={`${item} w-full`}>
            {signingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />} Sign out
          </button>
        </div>
      )}
    </div>
  );
}
