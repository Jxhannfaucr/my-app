import { defineProject } from '@lib/content/define';

/**
 * Escrito solo con lo que Johan describió. No se inventaron métricas, enlaces ni capturas.
 * Para profundizar: agregar imágenes en ./assets y bloques `figure`, `code`, `table`, etc.
 */
export default defineProject({
  title: 'Grupo Turístico',
  summary: 'Sistema completo de reservas y emisión de tiquetes para una empresa de excursiones.',
  // TODO(johan): confirmar fecha de cierre, origen (cliente/trabajo) y estado.
  date: '2026-09',
  areas: ['backend', 'web'],
  stack: ['nextjs', 'react', 'tailwind', 'shadcn-ui', 'fastapi', 'python', 'postgresql', 'supabase', 'sqlalchemy'],
  origin: 'client',
  status: 'shipped',
  links: [], // TODO(johan): demo / repo si son públicos
  cover: 'assets/dashboard-admin.jpg',

  blocks: [
    {
      heading: 'Resumen',
      type: 'text',
      value:
        'Sistema completo de reservas y emisión de tiquetes para una empresa de excursiones, con panel administrativo y métricas financieras.',
    },
    {
      heading: 'Capacidades',
      type: 'list',
      items: [
        'Reservas y emisión de tiquetes',
        'Generación de PDFs y códigos QR',
        'Bloqueo concurrente de asientos',
        'Pagos parciales',
        'Panel administrativo',
        'Métricas financieras',
        'Tareas en segundo plano (background tasks)',
        'Lógica de ciclo de vida',
      ],
    },
    {
      heading: 'Panel administrativo',
      type: 'figure',
      src: 'assets/dashboard-admin.jpg',
      alt: 'Panel administrativo SGT-QR: ingresos del mes, saldo pendiente, ocupación global, tickets emitidos y próximo viaje',
      caption: 'Dashboard financiero y operativo: ingresos, ocupación, tickets del mes y viajes activos en tiempo real.',
    },
  ],
});
