/** Only allows same-site relative paths as post-login redirects. */
export function safeNext(next: string | null | undefined, fallback = '/my-tests'): string {
  if (!next || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) return fallback;
  return next;
}
