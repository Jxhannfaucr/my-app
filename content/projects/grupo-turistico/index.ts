import { defineProject } from '@lib/content/define';

/**
 * Verificado contra el código real (backend FastAPI + frontend Next.js) el 2026-09-23.
 * Dos correcciones al texto original del cliente/brief, hechas porque el código dice otra cosa:
 *  - No hay una tarea de limpieza programada: el borrado de bloqueos vencidos es "lazy" (se hace
 *    dentro de las mismas rutas que leen/bloquean asientos, no un job aparte).
 *  - "Lucro cesante" no existe en stats_service.py; se reemplazó por los KPIs reales que sí calcula.
 */
export default defineProject({
  title: 'SGT-QR',
  subtitle: 'Sistema de reservas y emisión de tiquetes para Grupo Turístico',
  summary:
    'Reservas y tiquetes con QR para una empresa de excursiones: bloqueo temporal de asientos por sesión, PDFs generados en memoria y un panel de BI con ingresos, ocupación y abonos en tiempo real.',
  start: '2026-05', // primer commit del monorepo
  date: '2026-09', // commit más reciente
  areas: ['backend', 'web', 'data'],
  stack: [
    'nextjs',
    'react',
    'tailwind',
    'shadcn-ui',
    'fastapi',
    'python',
    'postgresql',
    'supabase',
    'sqlalchemy',
    'xhtml2pdf',
    'resend',
    'recharts',
    'html5-qrcode',
    'docker',
  ],
  origin: 'client',
  status: 'shipped',
  links: [], // TODO(johan): demo / repo si son públicos
  cover: 'assets/dashboard-admin.jpg',

  blocks: [
    // ── El problema ─────────────────────────────────────────────────────
    {
      heading: 'El problema',
      type: 'text',
      value:
        'Mi rol: Full-Stack Developer & Data Analyst. Grupo Turístico gestionaba sus reservas de forma manual, lo que generaba varios problemas operativos concretos:',
    },
    {
      type: 'list',
      items: [
        'Riesgo de sobreventa (overbooking) al vender el mismo asiento dos veces',
        'Procesos lentos durante el abordaje, con validación manual de pasajeros',
        'Falta de visibilidad financiera en tiempo real',
        'Inventario y pasajeros gestionados sin un sistema centralizado',
      ],
    },

    // ── Bloqueo temporal de asientos ─────────────────────────────────────
    {
      heading: 'Arquitectura y decisiones técnicas',
      subheading: 'Bloqueo temporal de asientos',
      type: 'text',
      value:
        'Cada asiento seleccionado queda bloqueado por 5 minutos, asociado al `session_id` de quien lo apartó, mientras completa el pago. Si otra persona intenta tomar ese mismo asiento mientras el bloqueo sigue vigente, la API responde 409. Al confirmar la reserva, se valida que todos los bloqueos pedidos sigan vigentes y pertenezcan a esa sesión antes de crear los tickets; la creación de tickets y el consumo del cupo quedan dentro de una única transacción, con rollback si algo falla.',
    },
    {
      type: 'callout',
      kind: 'note',
      value:
        'La limpieza de bloqueos vencidos no corre como una tarea programada aparte: las mismas rutas que leen o bloquean asientos borran primero los que ya expiraron antes de continuar. Menos piezas en movimiento, mismo resultado.',
    },

    // ── Generación de documentos en memoria ─────────────────────────────
    {
      subheading: 'Generación de documentos en memoria',
      type: 'text',
      value:
        'Tiquetes en PDF, manifiestos de pasajeros y códigos QR se generan dinámicamente: el QR con `qrcode`, el PDF renderizando una plantilla HTML/Jinja2 con `xhtml2pdf`, todo sobre `BytesIO` en memoria, sin escribir archivos a disco. El envío del correo con el PDF adjunto se delega a `BackgroundTasks` de FastAPI, para no bloquear la respuesta de la reserva mientras Resend entrega el correo.',
    },
    {
      type: 'callout',
      kind: 'note',
      value:
        'Al terminar la tarea en segundo plano se liberan explícitamente los bytes del PDF (`del` + `gc.collect()`) como mitigación de picos de memoria en el hosting, en vez de confiar solo en el garbage collector.',
    },

    // ── Ciclo de vida de los datos ────────────────────────────────────────
    {
      subheading: 'Ciclo de vida de los datos',
      type: 'text',
      value:
        'Los tickets y viajes ya pasados se ocultan por defecto de las vistas operativas (listado de tickets, historial de escaneos) para que no interfieran con la operación del día, pero no se borran: siguen disponibles bajo demanda para consultas e historial.',
    },

    // ── Panel de Business Intelligence ──────────────────────────────────
    {
      subheading: 'Panel de Business Intelligence',
      type: 'text',
      value:
        'Un panel gerencial calcula KPIs reales a partir de los datos operativos, con dos detalles de cálculo pensados a propósito:',
    },
    {
      type: 'list',
      items: [
        'Ingresos del mes: suma tickets pagados de contado + abonos recibidos, sin duplicar montos entre ambos',
        'Ocupación global: incluye asientos vendidos y los comprometidos por planes de abono, para que el porcentaje no baje cuando un abono se completa',
        'Saldo pendiente de abonos activos',
        'Capacidad total vs. asientos vendidos por viaje',
      ],
    },
    {
      type: 'figure',
      src: 'assets/dashboard-admin.jpg',
      alt: 'Panel administrativo SGT-QR: ingresos del mes, saldo pendiente, ocupación global, tickets emitidos y próximo viaje',
      caption: 'Dashboard financiero y operativo, con gráficos renderizados en Recharts.',
    },

    // ── Impacto ──────────────────────────────────────────────────────────
    {
      heading: 'Impacto',
      type: 'list',
      items: [
        'En producción entre julio y septiembre de 2026',
        'Más de 190 usuarios reales procesados',
        'Validación de abordaje 100% mediante escaneo QR, contra la base de datos central',
        '0% de sobreventa reportada en producción',
      ],
    },
  ],
});
