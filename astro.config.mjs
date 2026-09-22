// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// El sitio es estático; solo /api/chat corre en el servidor (prerender = false).
export default defineConfig({
  site: 'https://johan-portfolio-three.vercel.app',
  adapter: vercel(),
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/api/') })],
  build: { format: 'directory' },
  trailingSlash: 'always',
});
