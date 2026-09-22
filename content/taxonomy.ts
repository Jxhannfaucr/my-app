import { defineTaxonomy } from '@lib/content/define';

/**
 * Vocabularios editables. Agregar un área o un grupo = una línea aquí.
 * Las áreas sin proyectos no aparecen en ningún lado.
 */
export default defineTaxonomy({
  areas: {
    data: { label: 'Datos y BI' },
    backend: { label: 'Backend' },
    web: { label: 'Web' },
    cloud: { label: 'Cloud' },
    ai: { label: 'IA' },
    sistemas: { label: 'Sistemas' },
  },
  techGroups: {
    lenguajes: { label: 'Lenguajes' },
    datos: { label: 'Datos y BI' },
    frontend: { label: 'Frontend' },
    backend: { label: 'Backend' },
    'bases-de-datos': { label: 'Bases de datos' },
    cloud: { label: 'Cloud y DevOps' },
  },
  origins: {
    work: 'Trabajo',
    client: 'Cliente',
    course: 'Curso',
    academic: 'Académico',
    personal: 'Personal',
    'open-source': 'Open source',
  },
  statuses: {
    shipped: 'Terminado',
    'in-progress': 'En curso',
    prototype: 'Prototipo',
    archived: 'Archivado',
  },
});
