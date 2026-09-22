import { defineCredentials } from '@lib/content/define';

/** Estudios, certificaciones y cursos: una sola lista, distinguida por `kind`. */
export default defineCredentials([
  {
    id: 'uaca-ingenieria-sistemas',
    kind: 'degree',
    title: 'Bachillerato en Ingeniería en Sistemas',
    issuer: 'Universidad Autónoma de Centro América (UACA)',
    date: '2025',
  },
  {
    id: 'tec-analista-datos',
    kind: 'degree',
    title: 'Técnico en Analista de Datos',
    issuer: 'Tecnológico de Costa Rica (TEC) · Fundatec',
    status: 'in-progress',
  },
  {
    id: 'google-data-analytics',
    kind: 'certification',
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google',
    // TODO(johan): fecha (AAAA o AAAA-MM) y enlace de verificación (url).
  },
  {
    id: 'ds4b-primera-experiencia',
    kind: 'course',
    title: 'Tu primera experiencia como analista de datos (curso de 6 h)',
    issuer: 'DS4B',
    date: '2025-11',
  },
]);
