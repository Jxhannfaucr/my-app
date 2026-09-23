import { defineProfile } from '@lib/content/define';

export default defineProfile({
  name: 'Johan Zúñiga',
  headline: 'Ingeniero en Sistemas — backend, datos y web :D',
  location: 'Costa Rica',
  photo: 'assets/profile.jpg',
  birthYear: 2004,
  languages: [
    { name: 'Español', level: 'nativo' },
    { name: 'Inglés', level: 'intermedio (B1–B2)' },
  ],
  openTo: ['Junior Data Analyst', 'Junior Web Developer'],
  interests: [
    'Desarrollo web frontend y backend',
    'Análisis de datos',
    'Integración de APIs, automatización y soluciones con IA',
  ],

  // Solo para el chatbot (no se muestran en el sitio):
  personality: 'amigable, tranquilo, tímido, respetuoso y muy orientado al aprendizaje continuo',
  objective:
    'Crear soluciones eficientes, claras, modernas y bien documentadas, combinando programación y análisis de datos para aportar valor real a empresas o proyectos.',
  botFacts: [
    'Es costarricense, de Upala, Alajuela.',
    // La edad ya no se escribe a mano: se calcula sola desde `birthYear` (ver buildSystemPrompt).
    'Su tesis de graduación trató sobre SQL, tema en el que tiene conocimiento sólido.',
    'Actualmente estudia un técnico en Analista de Datos en el TEC (Fundatec).',
  ],
});
