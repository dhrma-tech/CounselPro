"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ConditionalSection = ({ isVisible, children, label }: any) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-4 mt-2 border-l-2 border-brand-blue pl-4 mb-4">
            {label && (
              <p className="text-[11px] uppercase tracking-wider font-bold text-brand-blue mb-3">
                {label}
              </p>
            )}
            <div className="space-y-4">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
