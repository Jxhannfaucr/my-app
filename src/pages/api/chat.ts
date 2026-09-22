import type { APIRoute } from 'astro';
import { graph } from '@lib/content/load';
import { buildSystemPrompt } from '@lib/chat/prompt';

// Único endpoint del sitio que corre en el servidor. La key NUNCA llega al navegador.
export const prerender = false;

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MAX_MESSAGE = 1000;
// Menos turnos de historial = menos tokens repetidos en cada request (el plan gratis de Groq
// tiene un límite bajo por minuto, y el prompt entero se reenvía en cada turno).
const MAX_HISTORY = 6;

// GROQ_API_KEY es el nombre nuevo; REACT_APP_GROQ_API_KEY se acepta para no obligar a crear otra key
// (era la variable del sitio anterior). Ambas son solo de servidor en Astro.
const apiKey = () =>
  process.env.GROQ_API_KEY ??
  process.env.REACT_APP_GROQ_API_KEY ??
  import.meta.env.GROQ_API_KEY ??
  import.meta.env.REACT_APP_GROQ_API_KEY;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

interface Turn {
  role: 'user' | 'assistant';
  content: string;
}

export const POST: APIRoute = async ({ request, site }) => {
  const key = apiKey();
  if (!key) return json({ error: 'not_configured' }, 503);

  let body: { message?: unknown; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message || message.length > MAX_MESSAGE) return json({ error: 'bad_message' }, 400);

  const history: Turn[] = (Array.isArray(body.history) ? body.history : [])
    .filter(
      (t): t is Turn =>
        !!t &&
        (t.role === 'user' || t.role === 'assistant') &&
        typeof t.content === 'string' &&
        t.content.length <= 2000,
    )
    .slice(-MAX_HISTORY);

  const siteUrl = (site ?? new URL('https://johan-portfolio-three.vercel.app')).origin;

  try {
    const model = graph.site.chat.model;
    const upstream = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        temperature: 0.6,
        max_tokens: graph.site.chat.maxTokens,
        // Los modelos "gpt-oss" de Groq son razonadores: bajar el esfuerzo deja más presupuesto
        // de tokens para la respuesta visible (si no, con historiales largos puede salir vacía).
        ...(model.startsWith('openai/gpt-oss') && { reasoning_effort: 'low' }),
        messages: [{ role: 'system', content: buildSystemPrompt(siteUrl) }, ...history, { role: 'user', content: message }],
      }),
    });
    if (!upstream.ok) {
      const detail = (await upstream.text()).slice(0, 300);
      console.error('[chat] Groq respondió', upstream.status, detail);
      // El plan gratis de Groq tiene un límite bajo de tokens/min: se distingue para mostrar
      // un mensaje honesto ("esperá un momento") en vez del genérico "algo falló".
      if (upstream.status === 429) return json({ error: 'rate_limited' }, 429);
      return json({ error: 'upstream' }, 502);
    }
    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (typeof reply !== 'string' || !reply) return json({ error: 'empty' }, 502);
    return json({ reply });
  } catch (err) {
    console.error('[chat] fallo de red', err instanceof Error ? err.message : err);
    return json({ error: 'upstream' }, 502);
  }
};

export const ALL: APIRoute = () => json({ error: 'method_not_allowed' }, 405);
