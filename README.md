# Portfolio — Johan Zúñiga

Sitio estático en [Astro](https://astro.build) con una sola isla de React (el chat). Todo el contenido vive en
[`content/`](content/README.md): agregar un proyecto, experiencia o certificación no requiere tocar la UI.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:4321` (muestra los `draft`) |
| `npm run build` | Valida todo el contenido y genera el sitio |
| `npm run check` | Chequeo de tipos (`astro check`) |

Requiere Node ≥ 22.19 (ver `.nvmrc`).

## Estructura

```
content/        ← lo único que editas (ver content/README.md)
src/lib/content ← esquemas (zod), carga/validación y datos derivados
src/lib/chat    ← constructor del prompt del asistente (usa el mismo contenido)
src/blocks/     ← un componente por tipo de bloque
src/components/ ← primitivas visuales   src/layouts/  src/pages/
src/islands/    ← Chat.tsx (React)      src/styles/   ← tokens y base
```

## Chat

`src/pages/api/chat.ts` es el único código de servidor. Llama a Groq con la key de la variable de entorno
`GROQ_API_KEY` (o `REACT_APP_GROQ_API_KEY`, el nombre que usaba el sitio anterior). La key nunca llega al
navegador. Ver `.env.example`.

## Despliegue

Vercel (`vercel.json` fija el framework en Astro). El sitemap y `robots.txt` apuntan a
`https://johan-portfolio-three.vercel.app`; si el dominio cambia, actualiza `site` en `astro.config.mjs`.
