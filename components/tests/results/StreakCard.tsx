"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Snowflake } from 'lucide-react';

export default function StreakCard({ current, longest, freezesLeft, signedIn, loginHref }: {
  current: number;
  longest: number;
  freezesLeft: number;
  signedIn: boolean;
  loginHref: string;
}) {
  if (!signedIn) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-orange-50 border border-orange-100 rounded-[24px] p-6">
        <Flame className="w-10 h-10 text-orange-500 shrink-0" />
        <p className="flex-1 text-[14px] text-text-secondary">Daily quiz done! <b className="text-text-primary">Sign in</b> to start a streak and keep it going every day.</p>
        <Link href={loginHref} className="h-11 px-5 rounded-xl bg-orange-500 text-white font-ui font-semibold text-[14px] flex items-center justify-center">Start my streak</Link>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className="relative overflow-hidden flex flex-col sm:flex-row sm:items-center gap-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-[24px] p-6"
    >
      <motion.div
        initial={{ rotate: -20, scale: 0.6 }}
        animate={{ rotate: 0, scale: [0.6, 1.25, 1] }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0"
      >
        <Flame className="w-9 h-9" />
      </motion.div>
      <div className="flex-1">
        <p className="font-display text-[30px] leading-none mb-1">{current}-day streak!</p>
        <p className="text-[14px] text-white/85">
          {current === 1 ? 'Great start. Come back tomorrow to make it 2.' : `Longest: ${longest} days. Come back tomorrow to keep it going.`}
        </p>
      </div>
      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold bg-white/15 rounded-full px-3 py-1">
        <Snowflake className="w-3.5 h-3.5" /> {freezesLeft} streak freeze{freezesLeft === 1 ? '' : 's'} left this week
      </span>
    </motion.div>
  );
}
