"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      onClick={async () => {
        setBusy(true);
        await createSupabaseBrowserClient().auth.signOut();
        router.replace('/tests');
        router.refresh();
      }}
      className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white border border-border text-text-secondary font-ui font-semibold text-[14px] hover:bg-surface-light"
    >
      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />} Sign out
    </button>
  );
}
