import { defineProject } from '@lib/content/define';

/**
 * Verificado contra el código real (backend FastAPI + frontend Next.js) el 2026-09-23.
 * Correcciones al texto original del cliente/brief, hechas porque el código dice otra cosa:
 *  - No hay una tarea de limpieza programada: el borrado de bloqueos vencidos es "lazy" (se hace
 *    dentro de las mismas rutas que leen/bloquean asientos, no un job aparte).
 *  - "Lucro cesante" SÍ existe (corrección sobre mi propia primera pasada, que solo había
 *    auditado el backend): es `kpis.lucroCesante` en frontend/app/admin/viajes/[id]/page.tsx,
 *    calculado como `asientos_libres * precio`, mostrado como "Costo de Oportunidad" por viaje.
 *    Es distinto del dashboard mensual agregado (ese sí vive en el backend, en stats_service.py).
 */
export default defineProject({
  title: 'SGT-QR',
  subtitle: 'Sistema de reservas y emisión de tiquetes para Grupo Turístico',
  summary:
    'Reservas y tiquetes con QR para una empresa de excursiones: bloqueo temporal de asientos por sesión, códigos de reserva por lote, PDFs generados en memoria y dos niveles de BI (mensual y por viaje).',
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
    {
      type: 'figure',
      src: 'assets/seleccion-asientos.png',
      alt: 'Pantalla pública de selección de asientos: asientos 9 y 10 en naranja como "Tu selección", 4 a 8 en rojo como "Ocupado", contador de 5 minutos en la esquina superior',
      caption: 'La vista del pasajero: los asientos 9 y 10 quedan bloqueados a su sesión mientras completa el pago, con el contador de 5 minutos visible.',
    },

    // ── Códigos de reserva por lote (tokens) ─────────────────────────────
    {
      subheading: 'Códigos de reserva por lote',
      type: 'text',
      value:
        'La reserva pública no es de acceso libre: requiere un código (token) que el administrador crea de antemano para un viaje específico, con una cantidad fija de asientos asignados. Ese código se lo comparte al cliente; al confirmar la reserva, la cantidad de asientos pedida se valida contra el cupo restante del token, y si se excede, la API rechaza la solicitud.',
    },
    {
      type: 'figure',
      src: 'assets/modulo-tokens.png',
      alt: 'Modal "Crear token" en el panel administrativo: viaje asociado, nombre de cliente opcional y cantidad de asientos que el token podrá generar como tickets',
      caption: 'Creación de un token: se define para qué viaje es, cuántos asientos cubre y, opcionalmente, a qué cliente pertenece.',
    },

    // ── Planes de abono ────────────────────────────────────────────────
    {
      subheading: 'Planes de abono (crédito)',
      type: 'text',
      value:
        'Como alternativa al pago único, un cliente puede reservar su cupo mediante un plan de abono: paga en cuotas mientras el sistema sigue el progreso (proyectado, abonado, saldo pendiente). Cuando el plan llega al 100%, su cupo pasa a contar como capacidad disponible de un token, sin necesidad de gestionar el inventario de asientos a mano mientras tanto.',
    },
    {
      type: 'figure',
      src: 'assets/modulo-abonos.jpg',
      alt: 'Listado de planes de abono con 2 planes activos, 10 completados, total abonado y total proyectado, y una tabla con cliente, asientos proyectados, precio total, total abonado, saldo pendiente y progreso',
      caption: 'Seguimiento de abonos por cliente: cuánto lleva pagado cada uno y cuánto falta.',
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
    {
      type: 'figure',
      src: 'assets/tiquete-pdf.jpg',
      alt: 'Pase de abordaje en PDF: origen y destino del viaje, nombre del pasajero, fecha y hora de salida, punto de abordaje, número de asiento y código QR para escanear',
      caption: 'El PDF que recibe el pasajero por correo, con su QR intransferible.',
    },

    // ── Validación en el abordaje ─────────────────────────────────────────
    {
      subheading: 'Validación en el abordaje',
      type: 'text',
      value:
        'El escaneo se hace desde el panel, con lectura de cámara vía `html5-qrcode`. Cada QR se valida contra un estado del ticket (válido, usado o cancelado): un ticket ya escaneado o cancelado no vuelve a pasar, y el sistema muestra el nombre del pasajero y su asiento al validar uno correcto. No tengo una captura de esta pantalla todavía.',
    },

    // ── Ciclo de vida de los datos ────────────────────────────────────────
    {
      subheading: 'Ciclo de vida de los datos',
      type: 'text',
      value:
        'Los tickets y viajes ya pasados se ocultan por defecto de las vistas operativas (listado de tickets, historial de escaneos) para que no interfieran con la operación del día, pero no se borran: siguen disponibles bajo demanda para consultas e historial. Un viaje cancelado tampoco desaparece — queda marcado como tal en el listado general.',
    },
    {
      type: 'figure',
      src: 'assets/modulo-viajes.jpg',
      alt: 'Listado de viajes con contadores de total, próximos y finalizados, filtros Todos/Próximos/Pasados, y una fila de un viaje cancelado tachado junto a viajes finalizados y próximos',
      caption: 'El viaje cancelado (ID #34) sigue visible y marcado como tal, no desaparece de la lista.',
    },

    // ── Panel de Business Intelligence ──────────────────────────────────
    {
      subheading: 'Panel de Business Intelligence',
      type: 'text',
      value:
        'Hay dos niveles de datos financieros, no uno solo. Un dashboard mensual agregado, con KPIs calculados a partir de todos los viajes activos, con dos detalles de cálculo pensados a propósito:',
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
      caption: 'Dashboard mensual agregado, con gráficos renderizados en Recharts.',
    },
    {
      type: 'text',
      value:
        'Y una vista de rentabilidad por viaje individual, calculada en el cliente a partir del mapa de asientos: ingreso bruto (asientos ocupados × precio), costo de oportunidad (asientos libres × precio — el "lucro cesante" de ese viaje puntual) y el porcentaje de ocupación del vehículo.',
    },
    {
      type: 'figure',
      src: 'assets/vista-financiera-viaje.jpg',
      alt: 'Vista de control de un viaje individual: ingreso bruto ₡144.000, costo de oportunidad ₡324.000 (capital perdido por asientos libres), rendimiento operativo 31%, y mapa de asientos ocupados/disponibles',
      caption: 'Rentabilidad de un viaje puntual: cuánto ya se confirmó y cuánto queda sobre la mesa si no se llena.',
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
