import { defineSite } from '@lib/content/define';

export default defineSite({
  title: 'Johan Zúñiga — Ingeniero en Sistemas',
  description:
    'Portfolio de Johan Zúñiga, ingeniero en sistemas de Costa Rica: backend, datos y web. Proyectos, experiencia y stack.',
  home: {
    featured: 3, // láminas grandes en la home
    selected: 6, // filas de "selección" además de las láminas
    timeline: 6, // eventos en la bitácora de la home
  },
  chat: {
    model: 'llama-3.1-8b-instant',
    maxTokens: 300,
  },
});
