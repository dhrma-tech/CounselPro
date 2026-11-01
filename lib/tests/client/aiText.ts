// AI replies are plain text with LaTeX; turn them into safe HTML for MathHtml.
export function aiTextToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .split(/\n{2,}/)
    .map((para) => `<p>${para.replace(/^\s*[-*]\s+/gm, '• ').replace(/\n/g, '<br>')}</p>`)
    .join('');
}
