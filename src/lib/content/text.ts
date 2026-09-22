/** Formato inline mínimo para el texto del contenido: `código`, **negrita** y [enlace](https://…). Escapa todo el HTML. */
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function inline(s: string): string {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

/** Párrafos separados por línea en blanco. */
export const paragraphs = (s: string) =>
  s
    .split(/\n{2,}/)
    .map((x) => x.trim())
    .filter(Boolean);
