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
    // Groq retira modelos con cierta frecuencia; lista vigente: https://console.groq.com/docs/models
    model: 'openai/gpt-oss-20b',
    // Los modelos "razonadores" (gpt-oss) gastan una parte del presupuesto pensando antes de
    // responder (ver `reasoning_effort` en chat.ts): dejamos margen para que no truncar la respuesta.
    maxTokens: 500,
  },
});
