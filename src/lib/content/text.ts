/** Formato inline mínimo para el texto del contenido: `código`, **negrita** y [enlace](https://…). Escapa todo el HTML. */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function inline(s: string): string {
  const withMarkup = esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // Respaldo: si queda una URL suelta (p. ej. el chatbot no siguió el formato [texto](url)),
  // igual queda clickeable. El primer grupo protege los <a> ya armados para no envolverlos dos veces.
  return withMarkup.replace(
    /(<a\b[^>]*>.*?<\/a>)|(https?:\/\/[^\s<>"]+)/g,
    (_m, anchor, bare) => anchor ?? `<a href="${bare}" target="_blank" rel="noopener noreferrer">${bare}</a>`,
  );
}

/** Párrafos separados por línea en blanco. */
export const paragraphs = (s: string) =>
  s
    .split(/\n{2,}/)
    .map((x) => x.trim())
    .filter(Boolean);
