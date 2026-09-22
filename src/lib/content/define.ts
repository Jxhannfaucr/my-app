/**
 * Ayudas tipadas para escribir contenido. No hacen nada en runtime: existen para que
 * VS Code autocomplete y marque en rojo ids inexistentes (tecnologías, áreas) al escribir.
 * La validación real (con mensajes claros) ocurre en load.ts durante el build.
 */
import type { z } from 'astro/zod';
import type technologies from '@content/technologies';
import type taxonomy from '@content/taxonomy';
import type {
  achievementSchema,
  contactSchema,
  credentialSchema,
  experienceSchema,
  Origin,
  profileSchema,
  projectSchema,
  siteSchema,
  Status,
} from './schema';

export type TechId = keyof typeof technologies;
export type AreaId = keyof (typeof taxonomy)['areas'];
export type GroupId = keyof (typeof taxonomy)['techGroups'];

type Labels<K extends string> = Record<K, { label: string }>;

export const defineTaxonomy = <A extends Labels<string>, G extends Labels<string>>(t: {
  areas: A;
  techGroups: G;
  origins: Record<Origin, string>;
  statuses: Record<Status, string>;
}) => t;

export const defineTechnologies = <
  T extends Record<string, { name: string; group: GroupId; aliases?: string[]; note?: string }>,
>(
  t: T,
) => t;

export const defineProject = (
  p: Omit<z.input<typeof projectSchema>, 'areas' | 'stack'> & { areas: AreaId[]; stack: TechId[] },
) => p;

export const defineExperience = (list: Array<Omit<z.input<typeof experienceSchema>, 'stack'> & { stack?: TechId[] }>) =>
  list;
export const defineCredentials = (
  list: Array<Omit<z.input<typeof credentialSchema>, 'teaches'> & { teaches?: TechId[] }>,
) => list;
export const defineAchievements = (list: Array<z.input<typeof achievementSchema>>) => list;
export const defineProfile = (p: z.input<typeof profileSchema>) => p;
export const defineContact = (c: z.input<typeof contactSchema>) => c;
export const defineSite = (s: z.input<typeof siteSchema>) => s;
