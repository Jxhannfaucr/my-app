import { defineExperience } from '@lib/content/define';

/** Más reciente primero no importa: el sistema ordena por fecha. Agregar un rol = agregar un objeto. */
export default defineExperience([
  {
    id: 'agro-logos',
    role: 'Líder de Datos e Infraestructura',
    org: 'Almacén Agro Logos S.A.',
    orgUrl: 'https://agrologos.co.cr/',
    start: '2025-11',
    end: 'present',
    summary: 'Datos e infraestructura de TI: SQL, gestión de TI y normalización de datos.',
    stack: ['sql'],
  },
  {
    id: 'elva',
    role: 'Desarrollador Backend',
    org: 'ELVA',
    orgUrl: 'https://www.linkedin.com/company/elva-sa/',
    // TODO(johan): fechas exactas (start/end AAAA-MM). Mientras tanto se muestra el periodo.
    period: '1 año',
    summary: 'Microservicios y APIs REST con Python y FastAPI, bases de datos y despliegues en Google Cloud.',
    highlights: [
      'Diseño y administración de bases de datos MongoDB, MySQL y SQL.',
      'Soluciones en Google Cloud Platform con Docker y Kubernetes; operaciones básicas de Linux en despliegues.',
      'Interfaces con JavaScript y React con diseño responsivo (Bootstrap, Tailwind).',
      'Coordinación de despliegues y documentación técnica.',
    ],
    stack: ['python', 'fastapi', 'mongodb', 'mysql', 'sql', 'gcp', 'docker', 'kubernetes', 'linux', 'javascript', 'react', 'bootstrap', 'tailwind'],
  },
]);
