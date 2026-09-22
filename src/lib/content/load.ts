/**
 * Carga, valida y enlaza todo el contenido en un único grafo de solo lectura.
 * La UI y el chatbot leen SOLO de aquí (nunca de /content directamente).
 *
 * Si algo está mal, el build falla mostrando TODOS los problemas de una vez,
 * con la ruta del archivo y una sugerencia cuando hay un id casi correcto.
 */
import type { ImageMetadata } from 'astro';
import type { z } from 'astro/zod';
import profileRaw from '@content/profile';
import contactRaw from '@content/contact';
import siteRaw from '@content/site';
import taxonomyRaw from '@content/taxonomy';
import technologiesRaw from '@content/technologies';
import experienceRaw from '@content/experience';
import credentialsRaw from '@content/credentials';
import achievementsRaw from '@content/achievements';
import {
  achievementSchema,
  contactSchema,
  credentialSchema,
  experienceSchema,
  profileSchema,
  projectSchema,
  siteSchema,
  taxonomySchema,
  technologySchema,
  type AchievementData,
  type ContactData,
  type CredentialData,
  type ExperienceData,
  type ProfileData,
  type ProjectData,
  type SiteData,
  type TechnologyData,
} from './schema';

export type Taxonomy = z.infer<typeof taxonomySchema>;
export interface Project extends ProjectData {
  /** Nombre de la carpeta en content/projects. También es la URL. */
  slug: string;
  /** Número de entrada: orden cronológico (1 = el más antiguo). */
  entry: number;
}
export interface Graph {
  site: SiteData;
  profile: ProfileData;
  contact: ContactData;
  taxonomy: Taxonomy;
  technologies: Record<string, TechnologyData>;
  experience: ExperienceData[];
  credentials: CredentialData[];
  achievements: AchievementData[];
  /** Ordenados por número de entrada ascendente. Sin borradores en producción. */
  projects: Project[];
  /** Fecha del build (AAAA-MM-DD). */
  compiled: string;
}

// Vite resuelve estos patrones en build: añadir una carpeta de proyecto no requiere tocar código.
const projectModules = import.meta.glob<{ default: unknown }>('/content/projects/*/index.ts', { eager: true });
const assetModules = import.meta.glob<ImageMetadata>('/content/**/assets/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
});

/** Imagen de content/<scope>/<rel>. `rel` es lo que escribes en el contenido (ej. "assets/foto.png"). */
export function asset(scope: string, rel: string): ImageMetadata | undefined {
  const clean = rel.replace(/^\.\//, '');
  return assetModules[`/content/${scope ? `${scope}/` : ''}${clean}`];
}

// ── utilidades ────────────────────────────────────────────────────────────
function distance(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

function suggest(id: string, options: string[]): string {
  const best = options.map((o) => [o, distance(id.toLowerCase(), o.toLowerCase())] as const).sort((x, y) => x[1] - y[1])[0];
  return best && best[1] <= 2 ? ` ¿Quisiste decir "${best[0]}"?` : '';
}

const sortKey = (d?: string) => (d ? (d.length === 4 ? `${d}-12` : d) : '');

// ── carga ─────────────────────────────────────────────────────────────────
function load(): Graph {
  const errors: string[] = [];
  const fail = (where: string, msg: string) => errors.push(`  • ${where}\n      ${msg}`);

  function parse<S extends z.ZodType>(schema: S, data: unknown, where: string): z.output<S> | undefined {
    const r = schema.safeParse(data);
    if (r.success) return r.data;
    for (const issue of r.error.issues) {
      fail(where, `${issue.path.map(String).join('.') || '(raíz)'}: ${issue.message}`);
    }
    return undefined;
  }

  const site = parse(siteSchema, siteRaw, 'content/site.ts');
  const profile = parse(profileSchema, profileRaw, 'content/profile.ts');
  const contact = parse(contactSchema, contactRaw, 'content/contact.ts');
  const taxonomy = parse(taxonomySchema, taxonomyRaw, 'content/taxonomy.ts');

  const technologies: Record<string, TechnologyData> = {};
  for (const [id, raw] of Object.entries(technologiesRaw as Record<string, unknown>)) {
    const t = parse(technologySchema, raw, `content/technologies.ts → ${id}`);
    if (t) technologies[id] = t;
  }

  const experience = ((experienceRaw as unknown[]) ?? [])
    .map((raw, i) => parse(experienceSchema, raw, `content/experience.ts → #${i + 1}`))
    .filter((x): x is ExperienceData => !!x);
  const credentials = ((credentialsRaw as unknown[]) ?? [])
    .map((raw, i) => parse(credentialSchema, raw, `content/credentials.ts → #${i + 1}`))
    .filter((x): x is CredentialData => !!x);
  const achievements = ((achievementsRaw as unknown[]) ?? [])
    .map((raw, i) => parse(achievementSchema, raw, `content/achievements.ts → #${i + 1}`))
    .filter((x): x is AchievementData => !!x);

  // proyectos
  const includeDrafts = import.meta.env.DEV;
  const parsedProjects: Array<ProjectData & { slug: string }> = [];
  for (const [path, mod] of Object.entries(projectModules)) {
    const slug = path.split('/')[3];
    const data = parse(projectSchema, mod.default, `content/projects/${slug}/index.ts`);
    if (data && (includeDrafts || !data.draft)) parsedProjects.push({ ...data, slug });
  }
  parsedProjects.sort((a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug));
  const projects: Project[] = parsedProjects.map((p, i) => ({ ...p, entry: i + 1 }));

  // ── integridad referencial ───────────────────────────────────────────────
  const techIds = Object.keys(technologies);
  const areaIds = Object.keys(taxonomy?.areas ?? {});
  const groupIds = Object.keys(taxonomy?.techGroups ?? {});
  const checkTech = (ids: string[], where: string) => {
    for (const id of ids)
      if (!technologies[id]) fail(where, `tecnología desconocida "${id}".${suggest(id, techIds)} Agrégala en content/technologies.ts.`);
  };

  if (taxonomy) {
    for (const [id, t] of Object.entries(technologies))
      if (!groupIds.includes(t.group))
        fail(`content/technologies.ts → ${id}`, `grupo desconocido "${t.group}".${suggest(t.group, groupIds)}`);
  }
  for (const [list, name] of [
    [experience, 'experience'],
    [credentials, 'credentials'],
    [achievements, 'achievements'],
  ] as const) {
    const seen = new Set<string>();
    for (const item of list) {
      if (seen.has(item.id)) fail(`content/${name}.ts`, `id duplicado "${item.id}".`);
      seen.add(item.id);
    }
  }
  for (const e of experience) checkTech(e.stack, `content/experience.ts → ${e.id}`);
  for (const c of credentials) checkTech(c.teaches, `content/credentials.ts → ${c.id}`);

  const refs = new Set<string>([
    ...projects.map((p) => `project/${p.slug}`),
    ...experience.map((e) => `experience/${e.id}`),
    ...credentials.map((c) => `credential/${c.id}`),
  ]);
  const checkRef = (ref: string, where: string) => {
    if (!refs.has(ref)) fail(where, `referencia desconocida "${ref}".${suggest(ref, [...refs])}`);
  };
  for (const a of achievements) for (const ref of a.about) checkRef(ref, `content/achievements.ts → ${a.id}`);

  const aliasOwner = new Map<string, string>();
  for (const p of projects) {
    const where = `content/projects/${p.slug}/index.ts`;
    checkTech(p.stack, where);
    for (const area of p.areas)
      if (!areaIds.includes(area)) fail(where, `área desconocida "${area}".${suggest(area, areaIds)} Agrégala en content/taxonomy.ts.`);
    if (p.madeAt) checkRef(p.madeAt, where);
    for (const alias of p.aliases) {
      if (aliasOwner.has(alias)) fail(where, `el alias "${alias}" ya lo usa ${aliasOwner.get(alias)}.`);
      aliasOwner.set(alias, p.slug);
    }
    const scope = `projects/${p.slug}`;
    if (p.cover && !asset(scope, p.cover)) fail(where, `cover: no existe la imagen "${p.cover}" en la carpeta del proyecto.`);
    p.blocks.forEach((b, i) => {
      if (b.type === 'figure' && !asset(scope, b.src))
        fail(where, `blocks.${i}: no existe la imagen "${b.src}" (¿está en la carpeta assets/ del proyecto?).`);
    });
  }
  if (profile?.photo && !asset('', profile.photo)) fail('content/profile.ts', `photo: no existe la imagen "${profile.photo}" en content/.`);

  if (errors.length) {
    throw new Error(`\n\nContenido inválido (${errors.length} problema${errors.length === 1 ? '' : 's'}):\n\n${errors.join('\n')}\n`);
  }

  return {
    site: site!,
    profile: profile!,
    contact: contact!,
    taxonomy: taxonomy!,
    technologies,
    experience,
    credentials,
    achievements,
    projects,
    compiled: new Date().toISOString().slice(0, 10),
  };
}

export const graph: Graph = load();
export { sortKey };
