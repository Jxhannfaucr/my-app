/**
 * Todo lo que se CALCULA a partir del contenido. Nada de esto se escribe a mano en ningún sitio:
 * listados, destacados, tecnologías en uso, estadísticas, línea de tiempo, relacionados, índice.
 */
import type { ImageMetadata } from 'astro';
import { asset, graph, sortKey, type Project } from './load';
import type { Block, CredentialData, ExperienceData } from './schema';

const { site, projects, experience, credentials, achievements, technologies, taxonomy } = graph;

// ── etiquetas y URLs ──────────────────────────────────────────────────────
export const projectHref = (p: Pick<Project, 'slug'>) => `/projects/${p.slug}/`;
export const entryLabel = (p: Pick<Project, 'entry'>) => `#${String(p.entry).padStart(3, '0')}`;
export const areaLabel = (id: string) => taxonomy.areas[id]?.label ?? id;
export const originLabel = (id: keyof typeof taxonomy.origins) => taxonomy.origins[id] ?? id;
export const statusLabel = (id: keyof typeof taxonomy.statuses) => taxonomy.statuses[id] ?? id;
export const techName = (id: string) => technologies[id]?.name ?? id;

/** Texto legible de una referencia `experience/<id>`, `credential/<id>` o `project/<slug>`. */
export function refLabel(ref: string): string | undefined {
  const [kind, id] = ref.split('/');
  if (kind === 'experience') {
    const e = experience.find((x) => x.id === id);
    return e && `${e.role} · ${e.org}`;
  }
  if (kind === 'credential') {
    const c = credentials.find((x) => x.id === id);
    return c && `${c.title} · ${c.issuer}`;
  }
  if (kind === 'project') return projects.find((p) => p.slug === id)?.title;
}

/** Imagen que representa al proyecto: `cover`, o la primera figura de sus bloques. */
export function coverOf(p: Project): ImageMetadata | undefined {
  const scope = `projects/${p.slug}`;
  if (p.cover) return asset(scope, p.cover);
  const fig = p.blocks.find((b) => b.type === 'figure');
  return fig && fig.type === 'figure' ? asset(scope, fig.src) : undefined;
}

const byRecent = (a: Project, b: Project) => b.date.localeCompare(a.date) || b.slug.localeCompare(a.slug);

// ── listados ──────────────────────────────────────────────────────────────
export const allProjects = () => [...projects].sort(byRecent);

/**
 * Composición de la home. Tiene presupuesto constante: crecer el catálogo no la alarga.
 *  1. `featured` explícitos (por `rank`, luego recencia).
 *  2. Si sobran huecos, se completan con los más recientes que tengan página propia (blocks).
 *  3. El resto, hasta `site.home.selected`, va como filas de "selección".
 *  4. `tier: 'archive'` los deja fuera de la home (siguen en /projects/).
 */
export function homeProjects() {
  const pool = allProjects().filter((p) => p.tier !== 'archive');
  const slots = site.home.featured;

  const pinned = pool
    .filter((p) => p.tier === 'featured')
    .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999) || byRecent(a, b));
  const featured = pinned.slice(0, slots);
  for (const p of pool) {
    if (featured.length >= slots) break;
    if (!featured.includes(p) && p.blocks.length > 0 && p.tier !== 'selected') featured.push(p);
  }
  featured.sort((a, b) => featured.indexOf(a) - featured.indexOf(b));

  const selected = pool.filter((p) => !featured.includes(p)).slice(0, site.home.selected);
  return { featured, selected, hiddenCount: projects.length - featured.length - selected.length };
}

export function projectsByYear() {
  const groups = new Map<string, Project[]>();
  for (const p of allProjects()) {
    const y = p.date.slice(0, 4);
    groups.set(y, [...(groups.get(y) ?? []), p]);
  }
  return [...groups.entries()].map(([year, items]) => ({ year, items }));
}

export function neighbors(p: Project) {
  const i = projects.findIndex((x) => x.slug === p.slug);
  return { prev: projects[i - 1], next: projects[i + 1] };
}

/** Proyectos que comparten tecnologías o áreas, ordenados por similitud. */
export function relatedTo(p: Project, n = 3) {
  const score = (o: Project) =>
    o.stack.filter((t) => p.stack.includes(t)).length * 2 + o.areas.filter((a) => p.areas.includes(a)).length;
  return projects
    .filter((o) => o.slug !== p.slug && o.stack.some((t) => p.stack.includes(t)))
    .sort((a, b) => score(b) - score(a) || byRecent(a, b))
    .slice(0, n);
}

// ── tecnologías: evidencia calculada, no autodeclarada ────────────────────
export function techEvidence(limit = 12) {
  const usage = new Map<string, { projects: number; roles: number }>();
  const touch = (id: string, key: 'projects' | 'roles') => {
    const u = usage.get(id) ?? { projects: 0, roles: 0 };
    u[key]++;
    usage.set(id, u);
  };
  projects.forEach((p) => p.stack.forEach((t) => touch(t, 'projects')));
  experience.forEach((e) => e.stack.forEach((t) => touch(t, 'roles')));

  const rows = [...usage.entries()]
    .map(([id, u]) => ({ id, name: techName(id), ...u, total: u.projects + u.roles }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
  const max = rows[0]?.total ?? 1;
  return {
    rows: rows.slice(0, limit).map((r) => ({ ...r, ratio: r.total / max })),
    inUse: rows.length,
  };
}

/** Tecnologías del catálogo que aún no aparecen en ningún proyecto ni rol. */
export function alsoKnown() {
  const used = new Set(techEvidence(Infinity).rows.map((r) => r.id));
  return Object.entries(technologies)
    .filter(([id]) => !used.has(id))
    .map(([, t]) => (t.note ? `${t.name} (${t.note})` : t.name));
}

export function areasInUse() {
  const counts = new Map<string, number>();
  projects.forEach((p) => p.areas.forEach((a) => counts.set(a, (counts.get(a) ?? 0) + 1)));
  return [...counts.entries()].map(([id, count]) => ({ id, label: areaLabel(id), count }));
}

// ── estado actual y estadísticas ──────────────────────────────────────────
export function now() {
  return {
    roles: experience.filter((e) => e.end === 'present'),
    studying: credentials.filter((c) => c.status === 'in-progress'),
    building: projects.filter((p) => p.status === 'in-progress'),
  };
}

export function stats() {
  return {
    projects: projects.length,
    technologies: techEvidence(Infinity).inUse,
    areas: areasInUse().length,
    compiled: graph.compiled,
  };
}

// ── bitácora: experiencia + credenciales + logros en una sola línea de tiempo ──
export interface TimelineEvent {
  kind: 'Trabajo' | 'Estudios' | 'Certificación' | 'Curso' | 'Logro';
  when: string;
  sort: string;
  title: string;
  org?: string;
  orgUrl?: string;
  summary?: string;
}

export const rangeLabel = (e: ExperienceData) =>
  e.start ? `${e.start} → ${e.end === 'present' ? 'presente' : (e.end ?? '')}`.trim() : (e.period ?? '');

const credentialKind = (c: CredentialData): TimelineEvent['kind'] =>
  c.kind === 'degree' ? 'Estudios' : c.kind === 'course' ? 'Curso' : 'Certificación';

export function timeline(limit = Infinity): TimelineEvent[] {
  const events: TimelineEvent[] = [
    ...experience.map<TimelineEvent>((e) => ({
      kind: 'Trabajo',
      when: rangeLabel(e),
      sort: e.end === 'present' ? '9999-12' : sortKey(e.end ?? e.start),
      title: e.role,
      org: e.org,
      orgUrl: e.orgUrl,
      summary: e.summary,
    })),
    ...credentials.map<TimelineEvent>((c) => ({
      kind: credentialKind(c),
      when: c.status === 'in-progress' ? 'en curso' : (c.date ?? ''),
      sort: c.status === 'in-progress' ? '9999-11' : sortKey(c.date),
      title: c.title,
      org: c.issuer,
    })),
    ...achievements.map<TimelineEvent>((a) => ({
      kind: 'Logro',
      when: a.date ?? '',
      sort: sortKey(a.date),
      title: a.title,
      summary: a.summary,
    })),
  ];
  return events.sort((a, b) => b.sort.localeCompare(a.sort)).slice(0, limit);
}

// ── índice de un proyecto: secciones numeradas a partir de los bloques ─────
export interface RenderedBlock {
  block: Block;
  /** Número de figura dentro del proyecto (Fig. 1, 2…), solo en bloques `figure`. */
  figure?: number;
}
export interface Section {
  id: string | null;
  number: number | null;
  heading: string | null;
  blocks: RenderedBlock[];
}

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export function sectionsOf(p: Project): Section[] {
  const sections: Section[] = [];
  const usedIds = new Set<string>();
  let figures = 0;
  let numbered = 0;

  for (const block of p.blocks) {
    if (block.heading || sections.length === 0) {
      let id: string | null = null;
      if (block.heading) {
        id = slugify(block.heading) || `seccion-${numbered + 1}`;
        while (usedIds.has(id)) id += '-2';
        usedIds.add(id);
        numbered++;
      }
      sections.push({ id, number: block.heading ? numbered : null, heading: block.heading ?? null, blocks: [] });
    }
    sections[sections.length - 1].blocks.push({
      block,
      figure: block.type === 'figure' ? ++figures : undefined,
    });
  }
  return sections;
}
