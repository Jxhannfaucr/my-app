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
    // (gpt-oss-20b/120b quedaron descartados: en el plan gratis a veces intentan invocar una
    // herramienta interna inexistente y Groq responde 400 "Tool choice is none, but model called a tool").
    model: 'qwen/qwen3.8-27b',
    // Tope generoso para no cortar a mitad de frase una respuesta que el visitante pidió extensa;
    // el prompt (ver prompt.ts) ya empuja al modelo a ser breve por defecto.
    maxTokens: 400,
  },
});
