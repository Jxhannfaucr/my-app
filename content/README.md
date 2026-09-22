# content/

**Lo único que editas para mantener el portfolio.** La UI, el chatbot, el sitemap y las estadísticas se
calculan a partir de esta carpeta. Si algo está mal, el build falla con un mensaje que dice dónde y por qué.

```
content/
  profile.ts  contact.ts  site.ts  taxonomy.ts  technologies.ts
  experience.ts  credentials.ts  achievements.ts
  assets/                          ← imágenes del perfil (foto)
  projects/<slug>/index.ts         ← un proyecto = una carpeta
  projects/<slug>/assets/          ← sus imágenes
```

## Agregar un proyecto (3 min el registro; el detalle es tiempo de redacción)

1. Copia una carpeta de `projects/` (o crea `projects/<slug>/index.ts` con `defineProject({...})`).
   El nombre de la carpeta es la URL: `/projects/<slug>/`.
2. Obligatorios: `title`, `summary` (una línea), `date` (`AAAA-MM`), `areas`, `stack`, `origin`.
   VS Code autocompleta los ids de `areas` y `stack` y marca en rojo los que no existen.
3. Opcional: imágenes en `assets/` (se referencian como `'assets/foto.png'`) y `blocks: [...]` con el detalle.
   Sin `blocks` el proyecto igual aparece en el archivo y en la home; solo tiene una página breve.
4. Listo. Aparece solo en: home (si le toca), `/projects/`, la evidencia del Stack, el sitemap y el chatbot.

**Qué decide la home (no tienes que tocar nada):** los proyectos con `tier: 'featured'` se muestran primero
(orden por `rank`); si sobran huecos se completan con los más recientes que tengan `blocks`; el resto va como
filas de selección; `tier: 'archive'` los deja solo en `/projects/`. Los topes están en `site.ts`.

### Bloques (`blocks`)

Cada bloque puede llevar `heading` (abre una sección numerada del índice) y/o `subheading` (subtítulo).

| `type` | Campos | Notas |
|---|---|---|
| `text` | `value` | Párrafos separados por línea en blanco. Admite `` `código` ``, `**negrita**` y `[enlace](https://…)` |
| `list` | `items`, `ordered?` | |
| `code` | `language`, `value`, `filename?`, `caption?` | Resaltado y botón "copiar" automáticos |
| `figure` | `src`, `alt`, `caption?` | Numeración "Fig. N" automática; clic abre la imagen completa |
| `table` | `columns`, `rows`, `caption?` | |
| `callout` | `value`, `kind` (`note`, `quote`, `lesson`, `warning`) | |

**Un tipo de bloque nuevo** (un gráfico, un diagrama…) se agrega una sola vez: esquema en
`src/lib/content/schema.ts`, componente en `src/blocks/`, una línea en `src/blocks/Block.astro`.
Los proyectos existentes no cambian.

## Otros cambios

| Quiero agregar… | Dónde | Efecto automático |
|---|---|---|
| Una experiencia | objeto en `experience.ts` | Trayectoria, "Ahora" (si `end: 'present'`), evidencia del Stack, chatbot |
| Una certificación, estudio o curso | objeto en `credentials.ts` (`kind`: `degree`, `certification`, `course`) | Trayectoria y chatbot |
| Una tecnología | una línea en `technologies.ts` (`name` + `group`) | Aparece en el Stack en cuanto un proyecto o rol la use |
| Un área o grupo | una línea en `taxonomy.ts` | Las áreas sin proyectos no se muestran |
| Un logro | objeto en `achievements.ts` (con `about` opcional) | Trayectoria |
| Un canal de contacto | objeto en `contact.ts` | `showOnSite: false` = solo lo comparte el chatbot |

## Reglas

- **Nada de duplicar.** Edades, duraciones, conteos, "reciente" y el número de entrada (`#003`) se calculan.
- **Referencias por id.** `stack: ['python']`, `madeAt: 'credential/ds4b-primera-experiencia'`. Un id inexistente
  rompe el build con una sugerencia ("¿Quisiste decir…?").
- **Sin inventar.** Lo que no se sabe se deja con un `// TODO(johan)` en el archivo, no se rellena.
- `draft: true` oculta un proyecto en producción (se ve en `npm run dev`).
- Renombraste un proyecto: pon la URL vieja en `aliases: ['nombre-viejo']` y redirige sola.
