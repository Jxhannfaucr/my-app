import { defineProject } from '@lib/content/define';

/**
 * Escrito solo con lo que Johan describió. No se inventaron métricas, enlaces ni capturas.
 */
export default defineProject({
  title: 'Zygos Store',
  summary: 'E-commerce de mi tienda de streetwear: catálogo en Sanity, filtros por URL y checkout mediante WhatsApp.',
  // TODO(johan): confirmar fecha de cierre y estado; agregar la URL pública en `links`.
  date: '2026-09',
  areas: ['web'],
  stack: ['nextjs', 'typescript', 'tailwind', 'sanity', 'groq', 'canvas', 'vercel'],
  origin: 'personal',
  status: 'shipped',
  links: [],

  blocks: [
    {
      heading: 'Resumen',
      type: 'text',
      value: 'E-commerce de mi propia tienda de streetwear, construido con Next.js 15 y desplegado en Vercel.',
    },
    {
      heading: 'Capacidades',
      type: 'list',
      items: [
        'Next.js 15 con TypeScript y Server Components',
        'Catálogo gestionado en Sanity CMS y consultado con GROQ',
        'Filtros basados en URL',
        'Hero procedural dibujado con Canvas',
        'Checkout mediante WhatsApp',
        'Manejo visual de productos agotados',
        'Despliegue en Vercel',
      ],
    },
  ],
});
