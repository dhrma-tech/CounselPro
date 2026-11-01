"use client";

import { useEffect } from 'react';

/** Remembers the referral code from a shared link so the sharer is credited if this visitor signs up. */
export default function RefTracker({ code }: { code: string | null | undefined }) {
  useEffect(() => {
    if (!code || !/^[A-Z0-9]{6}$/i.test(code)) return;
    fetch('/api/ref', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    }).catch(() => null);
  }, [code]);
  return null;
}
