import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { inline } from '@lib/content/text';
import './chat.css';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}
interface Props {
  greeting: string;
  suggestions: string[];
}

const ERRORS: Record<string, string> = {
  not_configured: 'El chat todavía no está configurado :/ Escribile a Johan directamente.',
  rate_limited: 'Estoy respondiendo muchas preguntas ahora mismo :/ Esperá unos segundos e intentá de nuevo.',
  default: 'Uy, algo falló de mi lado :/ Intentá de nuevo en un momento.',
};

/**
 * Único componente de React del sitio: la mascota y el panel de chat.
 * El botón se renderiza en el servidor (visible antes de hidratar); el panel se abre al hidratar.
 */
export default function Chat({ greeting, suggestions }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: 'assistant', content: greeting }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const logEnd = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);

  // Cualquier elemento del sitio con [data-open-chat] abre el panel (sin acoplar componentes).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-open-chat]')) setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    field.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        launcher.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    logEnd.current?.scrollIntoView({ block: 'end' });
  }, [messages, busy]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || busy) return;
    const history = messages.slice(1).slice(-6); // sin el saludo inicial
    setMessages((m) => [...m, { role: 'user', content: message }]);
    setInput('');
    setBusy(true);
    try {
      const res = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || typeof data.reply !== 'string') throw new Error(data.error ?? 'default');
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      const code = err instanceof Error ? err.message : 'default';
      setMessages((m) => [...m, { role: 'assistant', content: ERRORS[code] ?? ERRORS.default }]);
    } finally {
      setBusy(false);
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className="chat-root">
      {open && (
        <section className="chat" role="dialog" aria-label="Chat con el asistente de Johan">
          <header className="chat__head">
            <span className="label">Asistente</span>
            <button
              type="button"
              className="chat__close"
              aria-label="Cerrar el chat"
              onClick={() => {
                setOpen(false);
                launcher.current?.focus();
              }}
            >
              ×
            </button>
          </header>

          <div className="chat__log" role="log" aria-live="polite">
            {messages.map((m, i) => (
              <p key={i} className={`msg msg--${m.role}`}>
                {m.role === 'assistant' && <span className="label msg__who">Asistente</span>}
                {m.role === 'assistant' ? (
                  // inline() escapa el HTML del modelo y solo habilita **negrita**, `code` y [enlaces](url):
                  // el resto del texto (incluida cualquier otra sintaxis Markdown) queda como texto plano.
                  <span dangerouslySetInnerHTML={{ __html: inline(m.content) }} />
                ) : (
                  m.content
                )}
              </p>
            ))}
            {busy && (
              <p className="msg msg--assistant" aria-label="El asistente está escribiendo">
                <span className="dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </p>
            )}
            <div ref={logEnd} />
          </div>

          {messages.length === 1 && (
            <ul className="chat__suggest">
              {suggestions.map((s) => (
                <li key={s}>
                  <button type="button" onClick={() => send(s)}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <form
            className="chat__form"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <label className="visually-hidden" htmlFor="chat-input">
              Tu mensaje
            </label>
            <textarea
              id="chat-input"
              ref={field}
              rows={2}
              maxLength={1000}
              placeholder="Escribí tu pregunta…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button type="submit" className="label" disabled={busy || !input.trim()}>
              Enviar
            </button>
          </form>
        </section>
      )}

      {/* Fuera del botón a propósito: el `clip-path` de .mascot recortaría cualquier hijo suyo
          que sobresalga por encima, así que el tag flota como hermano en el mismo flex column. */}
      {!open && <span className="mascot__tag voice">Hablemos!!</span>}
      <button
        ref={launcher}
        type="button"
        className="mascot"
        data-state={busy ? 'thinking' : open ? 'open' : 'idle'}
        aria-label={open ? 'Cerrar el chat' : 'Abrir el chat con el asistente'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="mascot__signal" aria-hidden="true">
          <i className="dot" />
          <i className="dot" />
        </span>
      </button>
    </div>
  );
}
