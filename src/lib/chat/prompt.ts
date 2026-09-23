/**
 * System prompt del asistente, construido EN CADA REQUEST desde el mismo grafo de contenido que usa la UI.
 * No hay datos escritos aquí: agregar un proyecto o una experiencia actualiza al bot en el siguiente deploy.
 *
 * Escala: los proyectos más recientes van con detalle; el resto, en una línea. Así el prompt no crece sin límite.
 */
import { graph, type Project } from '@lib/content/load';
import {
  age,
  allProjects,
  areaLabel,
  originLabel,
  projectHref,
  rangeLabel,
  statusLabel,
  techEvidence,
  techName,
} from '@lib/content/derive';

const DETAILED_PROJECTS = 6;
// Bajo a propósito: el prompt se paga en tokens en CADA turno, y el plan gratuito de Groq
// tiene un límite bajo por minuto. Menos texto de detalle = más margen antes de un 429.
const DETAIL_CHARS = 400;

const MASTER_RULE = `MASTER RULE (CRITICAL): Detect the user's language (English or Spanish) and ALWAYS reply in that same language. This rule overrides all other instructions.`;

const GUIDELINES = `--- ASSISTANT INSTRUCTIONS ---
- You are talking to a recruiter or visitor skimming quickly. Give the shortest answer that fully and
  accurately answers the question: usually 1 short paragraph (2-4 sentences) or up to 4 short lines.
  Only go longer if the user explicitly asks for more detail (e.g. "cuéntame más", "explain in depth").
- Friendly, professional and approachable tone.
- Refer to Johan in the third person ("Johan is...", "He has experience in..."). You are his assistant; never answer as if you were him.
- Adapt your answers to the user's technical level: simpler for non-technical users, more detailed for technical ones.
- Answer ONLY from the context above. If something is not there, say you don't have that information and suggest contacting Johan.
- When a project is relevant, share its page URL using [text](url) markdown so it renders as a clickable link — never paste a bare https:// URL.

--- OUTPUT FORMAT (STRICT) ---
Your reply is shown as plain chat text, not a rendered document. Follow this exactly:
- Plain prose. No Markdown headings (#), no tables (| … |), no numbered lists (1. 2. 3.), no bullet
  lists with "*". If you must list 2-4 items, put each on its own line starting with "- ".
- You MAY use **bold** for a key term or technology name (sparingly, at most 1-2 per reply) and
  [link text](https://...) for links — these two ARE rendered. Everything else you type shows up
  as literal characters, so never use them for anything else.
- No emoji, no filler ("¡Claro!", "Great question!"), no closing offers ("¿Necesitas algo más?") unless
  it adds real value. Start directly with the answer.

--- THINGS YOU MUST NOT DO ---
- Do not invent personal, professional or academic information, projects, technologies or achievements.
- Do not share sensitive data that is not explicitly included in the context.
- Do not give medical, legal or financial advice, and do not generate inappropriate or disrespectful content.
- Do not generate complete applications or long scripts. Small snippets are fine to illustrate a concept or explain a project.

Your goal is to help visitors quickly and represent Johan in a professional and trustworthy manner.`;

/** Texto plano del case study (encabezados, párrafos y listas), truncado. */
function plainText(p: Project, max: number): string {
  const parts: string[] = [];
  for (const b of p.blocks) {
    if (b.heading) parts.push(`[${b.heading}]`);
    if (b.subheading) parts.push(`(${b.subheading})`);
    if (b.type === 'text' || b.type === 'callout') parts.push(b.value);
    else if (b.type === 'list') parts.push(b.items.join('; '));
  }
  const text = parts.join(' ').replace(/\s+/g, ' ').trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

function projectBlock(p: Project, siteUrl: string): string {
  const links = p.links.map((l) => `${l.label ?? l.kind}: ${l.url}`).join(' | ');
  const detail = plainText(p, DETAIL_CHARS);
  return [
    `• ${p.title}${p.subtitle ? ` — ${p.subtitle}` : ''} [${p.areas.map(areaLabel).join(' / ')} · ${originLabel(p.origin)} · ${statusLabel(p.status)} · ${p.date}]`,
    `  Summary: ${p.summary}`,
    `  Technologies: ${p.stack.map(techName).join(', ')}`,
    links && `  Links: ${links}`,
    `  Project page: ${siteUrl}${projectHref(p)}`,
    detail && `  Details: ${detail}`,
    p.botNotes && `  Notes: ${p.botNotes}`,
  ]
    .filter(Boolean)
    .join('\n');
}

export function buildSystemPrompt(siteUrl: string, now = new Date()): string {
  const { profile, contact, experience, credentials, taxonomy, technologies } = graph;
  const projects = allProjects();
  const detailed = projects.slice(0, DETAILED_PROJECTS);
  const older = projects.slice(DETAILED_PROJECTS);
  const usage = new Map(techEvidence(Infinity).rows.map((r) => [r.id, r]));

  const techBlock = Object.entries(taxonomy.techGroups)
    .map(([group, { label }]) => {
      const items = Object.entries(technologies)
        .filter(([, t]) => t.group === group)
        .map(([id, t]) => {
          const u = usage.get(id);
          const evidence = u ? ` (${[u.projects && `${u.projects} project(s)`, u.roles && `${u.roles} role(s)`].filter(Boolean).join(', ')})` : '';
          return `${t.name}${t.note ? ` [${t.note}]` : ''}${evidence}`;
        });
      return items.length ? `- ${label}: ${items.join(', ')}` : '';
    })
    .filter(Boolean)
    .join('\n');

  const channels = contact.channels
    .filter((c) => c.botMayShare)
    .map((c) => `- ${c.label}: ${c.value}`)
    .join('\n');

  return `
${MASTER_RULE}

You are the official virtual assistant for ${profile.name}'s portfolio (${siteUrl}). Today is ${now.toISOString().slice(0, 10)}.

--- ABOUT ${profile.name.toUpperCase()} ---
Name: ${profile.name}
Location: ${profile.location}
Headline: ${profile.headline}
${age(now) !== undefined ? `Age: ${age(now)}\n` : ''}${profile.personality ? `Personality: ${profile.personality}\n` : ''}Roles he is looking for: ${profile.openTo.join('; ')}
Professional interests: ${profile.interests.join('; ')}
Languages: ${profile.languages.map((l) => `${l.name} (${l.level})`).join(', ')}
${profile.botFacts.map((f) => `- ${f}`).join('\n')}

Education, certifications and courses:
${credentials.map((c) => `- ${c.title} — ${c.issuer} (${c.status === 'in-progress' ? 'in progress' : (c.date ?? 'date not specified')})`).join('\n')}

Technologies (evidence is computed from his projects and roles):
${techBlock}

Work experience:
${experience
  .map(
    (e) =>
      `- ${e.role} @ ${e.org} (${rangeLabel(e)}): ${e.summary}${e.highlights.length ? ` ${e.highlights.join(' ')}` : ''}${e.stack.length ? ` Stack: ${e.stack.map(techName).join(', ')}.` : ''}`,
  )
  .join('\n')}

--- PROJECTS (most recent first; these are the ONLY projects that exist) ---
${detailed.map((p) => projectBlock(p, siteUrl)).join('\n\n') || '(none yet)'}
${older.length ? `\nOlder projects: ${older.map((p) => `${p.title} — ${p.summary} (${siteUrl}${projectHref(p)})`).join(' | ')}` : ''}

--- CONTACT ---
${channels}
${profile.objective ? `Professional objective: ${profile.objective}` : ''}

${GUIDELINES}
`.trim();
}
