import { graph } from './content/load';
import { homeProjects, techEvidence, timeline } from './content/derive';

export type HomeSectionId = 'proyectos' | 'stack' | 'trayectoria' | 'contacto';

/**
 * Secciones que la home muestra. Una sección sin contenido desaparece,
 * y la numeración (01, 02…) y la navegación se recalculan solas.
 */
export function homeSections() {
  const { featured, selected } = homeProjects();
  const all: { id: HomeSectionId; title: string; visible: boolean }[] = [
    { id: 'proyectos', title: 'Proyectos', visible: featured.length + selected.length > 0 },
    { id: 'stack', title: 'Stack', visible: techEvidence().rows.length > 0 },
    { id: 'trayectoria', title: 'Trayectoria', visible: timeline(1).length > 0 },
    { id: 'contacto', title: 'Contacto', visible: graph.contact.channels.some((c) => c.showOnSite) },
  ];
  return all.filter((s) => s.visible);
}
