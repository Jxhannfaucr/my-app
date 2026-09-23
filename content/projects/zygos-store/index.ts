import { defineProject } from '@lib/content/define';

/**
 * Verificado contra el código real (Next.js App Router + Sanity) el 2026-09-23.
 * Corrección al texto original: el código usa Next.js 16.2.10, no 15 (el comentario del propio
 * código sobre "En Next.js 15, searchParams es una promesa" quedó desactualizado tras el upgrade).
 */
export default defineProject({
  title: 'Zygos Store',
  subtitle: 'E-commerce headless para mi propia marca de streetwear',
  summary:
    'E-commerce de mi marca de streetwear: catálogo headless en Sanity con GROQ, filtros por URL, datos siempre frescos y checkout por WhatsApp en vez de un carrito tradicional.',
  start: '2026-07',
  date: '2026-07',
  areas: ['web'],
  stack: ['nextjs', 'typescript', 'tailwind', 'sanity', 'groq', 'canvas', 'vercel'],
  origin: 'personal',
  status: 'shipped',
  links: [{ kind: 'demo', url: 'https://zygosstore.com', label: 'Ver sitio' }],
  cover: 'assets/hero.jpg',

  blocks: [
    {
      heading: 'Resumen',
      type: 'text',
      value:
        'E-commerce de mi propia marca de streetwear, con dos objetivos a la vez: automatizar parte real de la operación comercial y servir de muestra de arquitectura frontend moderna. Next.js 16 con App Router y TypeScript en modo estricto.',
    },
    {
      type: 'figure',
      src: 'assets/hero.jpg',
      alt: 'Portada de Zygos Store: título "Unión Streetwear" sobre una malla de vectores animada, con nombres de marcas apareciendo al azar alrededor',
      caption: 'Estética propia: streetwear con un aire futurista, la malla animada del hero de fondo.',
    },

    // ── Server Components por defecto ────────────────────────────────────
    {
      heading: 'Arquitectura y decisiones técnicas',
      subheading: 'Server Components por defecto',
      type: 'text',
      value:
        'Todo el catálogo (consulta a Sanity, filtrado, armado del grid) corre como Server Component: `page.tsx` es una función `async` sin `"use client"`. En todo el proyecto hay un único componente de cliente, el fondo animado del hero, aislado a propósito para no arrastrar ese JS al resto de la página.',
    },

    // ── Catálogo headless en Sanity ───────────────────────────────────────
    {
      subheading: 'Catálogo headless en Sanity',
      type: 'text',
      value:
        'El catálogo vive en Sanity CMS, con un schema de producto que diseñé yo mismo (nombre, drop, galería, precio, tallas, estado). El storefront lo consume con consultas GROQ, lo que separa la gestión de contenido de la presentación: puedo agregar o marcar agotado un producto sin tocar código.',
    },

    // ── Datos siempre frescos ─────────────────────────────────────────────
    {
      subheading: 'Datos siempre frescos',
      type: 'text',
      value:
        'La página fuerza `export const dynamic = "force-dynamic"` y el cliente de Sanity usa `useCdn: false`: el catálogo se trae directo de la API en cada visita, sin caché en ningún nivel. Es una decisión deliberada, no un descuido de performance — el estado "agotado" de un producto no puede quedar desactualizado ni un minuto.',
    },

    // ── Filtrado de inventario por URL ────────────────────────────────────
    {
      subheading: 'Filtrado por URL',
      type: 'text',
      value:
        'El filtro por talla (`?talla=S`) se resuelve con `searchParams` del lado del servidor, armando una consulta GROQ distinta según el filtro activo. El resultado es un estado del catálogo compartible y reproducible con solo la URL, sin depender de estado local en el cliente.',
    },

    // ── Stock y conversión ─────────────────────────────────────────────────
    {
      subheading: 'Stock y conversión',
      type: 'text',
      value:
        'Un producto agotado se ve distinto en toda la tarjeta: imagen en escala de grises, sello "Sold Out" superpuesto, precio y nombre tachados, botón de compra deshabilitado. El flujo de compra en sí no usa un carrito tradicional: cada producto disponible arma un link de WhatsApp con el mensaje pre-cargado (catálogo → intención de compra → contacto → venta), que es como realmente opera el negocio.',
    },
    {
      type: 'figure',
      src: 'assets/catalogo.jpg',
      alt: 'Catálogo de Zygos Store con filtro por talla y tres tarjetas de producto, dos marcadas "Sold Out" en escala de grises y una disponible con botón "Comprar vía WhatsApp"',
      caption: 'El catálogo filtrado por talla, con el tratamiento visual de "agotado" en acción.',
    },

    // ── Animación sin dependencias ─────────────────────────────────────────
    {
      subheading: 'Animación sin dependencias',
      type: 'text',
      value:
        'El fondo animado del hero es Canvas 2D puro (`getContext("2d")`), sin ninguna librería de animación. Respeta `prefers-reduced-motion` en dos capas: en JavaScript, con `matchMedia`, no arranca el loop de `requestAnimationFrame`; en CSS, con `@media`, como respaldo.',
    },
  ],
});
