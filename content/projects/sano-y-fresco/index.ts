import { defineProject } from '@lib/content/define';

/**
 * Migrado desde el portfolio anterior (src/pages/ProjectVentas.jsx).
 * Las cifras están tal cual estaban; ver los TODO pendientes de confirmar.
 */
export default defineProject({
  title: 'Sano y Fresco',
  subtitle: 'Estrategia integral de Data Science para revertir la caída de ventas en E-commerce',
  summary: 'Flujo completo de análisis de datos con SQL, Power BI y Python para entender y revertir la caída de ventas de un e-commerce.',
  date: '2025-11', // fecha del certificado de DS4B
  areas: ['data'],
  stack: ['sql', 'powerbi', 'python'],
  // TODO(johan): confirmar el origen. Se dejó 'course' porque el certificado es de un curso de DS4B;
  // si el análisis es tuyo, cambia a 'personal'.
  origin: 'course',
  madeAt: 'credential/ds4b-primera-experiencia',
  cover: 'assets/dashboard-ventas.png',
  aliases: ['ventas'], // conserva la URL antigua /project/ventas

  blocks: [
    // ── Introducción ──────────────────────────────────────────────────────
    {
      heading: 'Introducción',
      type: 'text',
      // TODO(johan): cuadrar la cifra. Aquí 6.6M€ → 1.1M€ (−83,3 %); el dashboard muestra $6,7 → $1,2 mill. (−82,1 %).
      value:
        "Proyecto integral que demuestra un flujo completo de análisis de datos para resolver una caída crítica del 82% en las ventas del e-commerce 'Sano y Fresco' (de 6.6M€ a 1.1M€ en 12 meses).",
    },
    {
      subheading: 'Metodología',
      type: 'list',
      items: [
        'Fase 1: Diagnóstico con SQL - Análisis de 39M€ en transacciones',
        'Fase 2: Dashboard en Power BI - Visualización ejecutiva',
        'Fase 3: Modelo Predictivo en Python - Forecasting y recomendaciones',
      ],
    },

    // ── Diagnóstico SQL ───────────────────────────────────────────────────
    {
      heading: 'Diagnóstico SQL',
      type: 'text',
      value: 'Análisis de base de datos para identificar patrones y causas de la caída en ventas.',
    },
    {
      subheading: 'Hallazgos clave',
      type: 'list',
      items: [
        'Caída de ingresos del 82%: De 6.6M€ (enero) a 1.1M€ (diciembre)',
        'Top producto en volumen: Banana (2.46M unidades)',
        'Top producto en ingresos: Fresas Orgánicas (3.43M€)',
        'AOV promedio: 19.34€',
      ],
    },
    {
      subheading: 'Consulta SQL — tendencia mensual',
      type: 'code',
      language: 'sql',
      value: `SELECT
  strftime('%Y-%m', fecha) AS mes,
  SUM(precio_total) AS ingreso_mensual
FROM tickets
GROUP BY mes
ORDER BY mes;`,
    },
    {
      type: 'text',
      value: 'Esta consulta reveló la tendencia descendente crítica que confirmó la crisis.',
    },

    // ── Dashboard Power BI ────────────────────────────────────────────────
    {
      heading: 'Dashboard Power BI',
      subheading: 'Componentes principales',
      type: 'list',
      items: [
        'KPIs de ventas, clientes y tickets promedio',
        'Gráfico de tendencia temporal de ingresos',
        'Treemap de productos por sección',
        'Filtros interactivos por mes y categoría',
      ],
    },
    {
      type: 'figure',
      src: 'assets/dashboard-ventas.png',
      alt: 'Dashboard de Power BI con ventas totales, clientes, ticket medio, evolución mensual y treemap de productos',
      caption: 'Dashboard interactivo de análisis de ventas',
    },
    {
      subheading: 'Impacto',
      type: 'text',
      value:
        'Permite identificar rápidamente productos y períodos críticos, optimizar inventario y ajustar estrategias de marketing en tiempo real.',
    },

    // ── Modelo predictivo Python ──────────────────────────────────────────
    {
      heading: 'Modelo predictivo en Python',
      type: 'text',
      value:
        "El diagnóstico SQL confirmó la caída de ventas y el dashboard permitió visualizarla, pero 'Sano y Fresco' necesitaba una solución proactiva urgente.",
    },
    {
      subheading: 'Objetivo',
      type: 'text',
      value:
        'Desarrollar un motor de recomendaciones basado en Market Basket Analysis para incrementar el ticket medio de compra, atacando directamente el problema de ingresos.',
    },
    {
      type: 'text',
      value:
        'Desarrollo de algoritmo de Market Basket Analysis para incrementar el ticket medio de compra mediante recomendaciones inteligentes de productos.',
    },
    {
      subheading: 'Proceso de desarrollo',
      type: 'list',
      items: [
        'Carga de datos transaccionales desde la base de datos',
        'Transformación: Matriz binaria one-hot de productos por pedido',
        'Cálculo de métricas de asociación entre productos',
      ],
    },
    {
      subheading: 'Código Python — transformación de datos',
      type: 'code',
      language: 'python',
      value: `# Agrupar productos por pedido
df_agrupado = df_cesta.groupby('id_pedido')['nombre_producto'].apply(
    lambda producto: ','.join(producto)
)

# Crear matriz one-hot
df_transacciones = df_agrupado.str.get_dummies(sep=',')`,
    },
    {
      subheading: 'Métricas del algoritmo',
      type: 'list',
      items: [
        'Soporte: Filtra productos por frecuencia de compra',
        'Confianza: Probabilidad de compra conjunta entre productos',
        'Lift: Fuerza real de la asociación (>1 indica relación significativa)',
      ],
    },
    {
      subheading: 'Implementación de confianza',
      type: 'code',
      language: 'python',
      // (el original perdió la indentación del cuerpo de la función; aquí está corregida)
      value: `def confianza(antecedente, consecuente):
    # Casos donde se compraron ambos productos
    conjunto_ac = df_transacciones[
        (df_transacciones[antecedente] == 1) &
        (df_transacciones[consecuente] == 1)
    ]
    # Confianza = compras conjuntas / compras de A
    return len(conjunto_ac) / df_transacciones[antecedente].sum()`,
    },
    {
      subheading: 'Deployment e impacto',
      type: 'text',
      value:
        "El algoritmo genera un archivo 'reglas.csv' con todas las asociaciones de productos, que se integra en dos sistemas:",
    },
    {
      type: 'list',
      items: [
        'E-commerce Web: Recomendaciones en tiempo real durante la compra',
        'Dashboard Power BI: Interfaz para marketing que permite crear packs, cupones personalizados y campañas dirigidas',
      ],
    },
    {
      type: 'callout',
      kind: 'quote',
      value:
        'Este motor de recomendaciones permite aumentar el valor promedio del pedido mediante sugerencias basadas en patrones reales de compra.',
    },

    // ── Deployment y explotación ──────────────────────────────────────────
    {
      heading: 'Deployment y explotación',
      subheading: 'Dashboard de explotación',
      type: 'text',
      value:
        'Integración del algoritmo en un dashboard de Power BI para que los equipos de Marketing y Producto puedan explotar las reglas de asociación sin conocimientos técnicos.\n\nEl archivo `reglas.csv` generado por Python se cargó en un segundo dashboard diseñado específicamente para identificar oportunidades de cross-selling.',
    },
    {
      type: 'figure',
      src: 'assets/dashboard-reglas.png',
      alt: 'Dashboard de explotación de reglas de asociación de productos',
      caption: 'Dashboard interactivo para análisis de asociaciones de productos',
    },
    {
      subheading: 'Componentes del dashboard',
      type: 'list',
      items: [
        'KPIs del modelo: 11 reglas generadas, Confianza Media 12%, Lift Medio 23.5',
        'Filtros por categoría de producto para análisis específicos',
        'Diagrama de red que visualiza relaciones entre productos',
        'Tabla de reglas ordenadas por Lift (fuerza de asociación)',
      ],
    },
    {
      subheading: 'Aplicaciones de negocio',
      type: 'list',
      items: [
        'Crear ofertas dirigidas y cupones personalizados basados en productos con alto Lift',
        'Diseñar packs de productos con alta correlación de compra',
        'Alimentar el sistema de recomendación web con las reglas más fuertes',
      ],
    },
    {
      type: 'callout',
      kind: 'quote',
      value:
        'Esta herramienta democratiza el acceso a insights de Machine Learning, permitiendo a equipos no técnicos tomar decisiones basadas en datos para aumentar las ventas.',
    },
    {
      type: 'figure',
      src: 'assets/certificado-ds4b.png',
      alt: 'Certificado de realización de DS4B a nombre de Johan Zúñiga',
      // El pie anterior decía "Certificado de reconocimiento por el proyecto", pero el documento es
      // un certificado de realización de un curso de 6 h. Ahora describe lo que se ve en la imagen.
      caption: 'Certificado de realización de DS4B: «Tu primera experiencia como analista de datos» (curso de 6 horas, 13-nov-2025)',
    },
  ],
});
