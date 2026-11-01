"use client";

import { useState } from 'react';
import { Check, Share2 } from 'lucide-react';

/** Opens the phone's share sheet, or copies the link on desktop. */
export default function ShareLinkButton({ path, title, text, label = 'Share link' }: { path: string; title: string; text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = `${window.location.origin}${path}`;
    if (navigator.share) {
      await navigator.share({ title, text, url }).catch(() => null);
      return;
    }
    await navigator.clipboard?.writeText(`${text} ${url}`).catch(() => null);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={share} className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-[#16A34A] text-white font-ui font-semibold text-[14px]">
      {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
      {copied ? 'Link copied' : label}
    </button>
  );
}
