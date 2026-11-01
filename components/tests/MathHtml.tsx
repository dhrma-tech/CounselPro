"use client";

import { useEffect, useRef } from 'react';
import renderMathInElement from 'katex/contrib/auto-render';
import 'katex/dist/katex.min.css';

const DELIMITERS = [
  { left: '\\[', right: '\\]', display: true },
  { left: '$$', right: '$$', display: true },
  { left: '\\(', right: '\\)', display: false },
];

/** Renders sanitised question HTML (sanitised on import) with KaTeX maths. */
export default function MathHtml({ html, className = '', as: Tag = 'div' }: { html: string; className?: string; as?: 'div' | 'span' }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = html;
    try {
      renderMathInElement(el, { delimiters: DELIMITERS, throwOnError: false });
    } catch {
      // Leave the raw text visible if KaTeX cannot parse it
    }
  }, [html]);

  return <Tag ref={ref as never} className={`math-html ${className}`} />;
}
