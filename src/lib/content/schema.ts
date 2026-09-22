/**
 * Esquemas del contenido. Son la única definición de "qué puede haber" en el portfolio.
 * Todos son estrictos: un campo con typo (ej. `captoin`) falla el build en vez de ignorarse.
 */
import { z } from 'astro/zod';

// ── Fechas ────────────────────────────────────────────────────────────────
export const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'usa AAAA-MM (ej. 2025-11)');
export const partialDate = z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'usa AAAA o AAAA-MM');

// ── Vocabularios cerrados (la lógica depende de ellos) ────────────────────
export const ORIGINS = ['work', 'client', 'course', 'academic', 'personal', 'open-source'] as const;
export const STATUSES = ['shipped', 'in-progress', 'prototype', 'archived'] as const;
export const TIERS = ['featured', 'selected', 'archive'] as const;
export type Origin = (typeof ORIGINS)[number];
export type Status = (typeof STATUSES)[number];

// ── Bloques: el contenido de cada case study ──────────────────────────────
// Añadir un tipo nuevo = 1 esquema aquí + 1 componente en src/blocks + 1 línea en Block.astro.
const common = {
  /** Abre una sección numerada (aparece en el índice). */
  heading: z.string().optional(),
  /** Subtítulo dentro de una sección (sin número). */
  subheading: z.string().optional(),
};

export const blockSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('text'), value: z.string(), ...common }).strict(),
  z
    .object({ type: z.literal('list'), items: z.array(z.string()).min(1), ordered: z.boolean().optional(), ...common })
    .strict(),
  z
    .object({
      type: z.literal('code'),
      language: z.string(),
      value: z.string(),
      filename: z.string().optional(),
      caption: z.string().optional(),
      ...common,
    })
    .strict(),
  z
    .object({ type: z.literal('figure'), src: z.string(), alt: z.string(), caption: z.string().optional(), ...common })
    .strict(),
  z
    .object({
      type: z.literal('table'),
      columns: z.array(z.string()).min(1),
      rows: z.array(z.array(z.string())),
      caption: z.string().optional(),
      ...common,
    })
    .strict(),
  z
    .object({
      type: z.literal('callout'),
      kind: z.enum(['note', 'quote', 'lesson', 'warning']).default('note'),
      value: z.string(),
      ...common,
    })
    .strict(),
]);
export type Block = z.infer<typeof blockSchema>;

// ── Entidades ─────────────────────────────────────────────────────────────
export const projectSchema = z
  .object({
    title: z.string().min(2),
    subtitle: z.string().optional(),
    /** Una línea: sirve para la card, la fila del archivo, la vista previa y el chatbot. */
    summary: z.string().min(10).max(220),
    /** Mes de cierre (o del último hito). Define "reciente" y el número de entrada. */
    date: yearMonth,
    start: yearMonth.optional(),
    areas: z.array(z.string()).min(1).max(3),
    stack: z.array(z.string()).min(1),
    origin: z.enum(ORIGINS),
    status: z.enum(STATUSES).default('shipped'),
    /** Opcional. Si no se define, el sistema decide según recencia y profundidad. */
    tier: z.enum(TIERS).optional(),
    rank: z.number().int().optional(),
    cover: z.string().optional(),
    links: z
      .array(
        z
          .object({
            kind: z.enum(['demo', 'repo', 'docs', 'video', 'dashboard', 'other']),
            url: z.url(),
            label: z.string().optional(),
          })
          .strict(),
      )
      .default([]),
    /** Dónde se hizo: `experience/<id>` o `credential/<id>`. */
    madeAt: z.string().optional(),
    /** URLs antiguas (/project/<alias>) que redirigen a este proyecto. */
    aliases: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Datos extra que el chatbot puede usar y la página no muestra. */
    botNotes: z.string().optional(),
    blocks: z.array(blockSchema).default([]),
  })
  .strict();

export const experienceSchema = z
  .object({
    id: z.string(),
    role: z.string(),
    org: z.string(),
    orgUrl: z.url().optional(),
    kind: z.enum(['employment', 'freelance', 'internship', 'volunteer']).default('employment'),
    start: yearMonth.optional(),
    end: z.union([yearMonth, z.literal('present')]).optional(),
    /** Texto libre cuando no hay fechas exactas (ej. "1 año"). */
    period: z.string().optional(),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
  })
  .strict()
  .refine((e) => e.start || e.period, { message: 'define `start` o `period`' });

export const credentialSchema = z
  .object({
    id: z.string(),
    kind: z.enum(['degree', 'certification', 'course']),
    title: z.string(),
    issuer: z.string(),
    date: partialDate.optional(),
    status: z.enum(['completed', 'in-progress']).default('completed'),
    url: z.url().optional(),
    teaches: z.array(z.string()).default([]),
  })
  .strict();

export const achievementSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    date: partialDate.optional(),
    summary: z.string(),
    /** Referencias `project/<slug>`, `experience/<id>` o `credential/<id>`. */
    about: z.array(z.string()).default([]),
  })
  .strict();

export const technologySchema = z
  .object({
    name: z.string(),
    group: z.string(),
    aliases: z.array(z.string()).default([]),
    /** Aclaración corta, ej. "nivel académico". */
    note: z.string().optional(),
  })
  .strict();

export const profileSchema = z
  .object({
    name: z.string(),
    headline: z.string(),
    location: z.string(),
    photo: z.string().optional(),
    languages: z.array(z.object({ name: z.string(), level: z.string() }).strict()),
    openTo: z.array(z.string()).default([]),
    interests: z.array(z.string()).default([]),
    /** Solo para el chatbot. */
    personality: z.string().optional(),
    objective: z.string().optional(),
    botFacts: z.array(z.string()).default([]),
  })
  .strict();

export const contactSchema = z
  .object({
    channels: z.array(
      z
        .object({
          kind: z.enum(['linkedin', 'github', 'instagram', 'email', 'whatsapp', 'cv', 'web']),
          label: z.string(),
          value: z.string(),
          /** Se muestra en el sitio (false = solo lo comparte el chatbot si se lo piden). */
          showOnSite: z.boolean().default(true),
          botMayShare: z.boolean().default(true),
        })
        .strict(),
    ),
  })
  .strict();

const labelMap = z.record(z.string(), z.object({ label: z.string() }).strict());
export const taxonomySchema = z
  .object({
    areas: labelMap,
    techGroups: labelMap,
    origins: z.record(z.enum(ORIGINS), z.string()),
    statuses: z.record(z.enum(STATUSES), z.string()),
  })
  .strict();

export const siteSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    home: z
      .object({
        /** Cuántas láminas grandes muestra la home. */
        featured: z.number().int().min(0),
        /** Cuántas filas de "selección" además de las láminas. */
        selected: z.number().int().min(0),
        timeline: z.number().int().min(1),
      })
      .strict(),
    chat: z.object({ model: z.string(), maxTokens: z.number().int() }).strict(),
  })
  .strict();

export type ProjectData = z.infer<typeof projectSchema>;
export type ExperienceData = z.infer<typeof experienceSchema>;
export type CredentialData = z.infer<typeof credentialSchema>;
export type AchievementData = z.infer<typeof achievementSchema>;
export type TechnologyData = z.infer<typeof technologySchema>;
export type ProfileData = z.infer<typeof profileSchema>;
export type ContactData = z.infer<typeof contactSchema>;
export type SiteData = z.infer<typeof siteSchema>;
