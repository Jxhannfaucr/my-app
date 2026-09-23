import { defineTechnologies } from '@lib/content/define';

/**
 * Catálogo de tecnologías. Solo `name` y `group` son obligatorios.
 * Una tecnología aparece en el sitio con su evidencia (proyectos y roles que la usan)
 * en cuanto alguien la referencia; las que aún no se usan salen en "También conozco".
 */
export default defineTechnologies({
  // lenguajes
  python: { name: 'Python', group: 'lenguajes' },
  sql: { name: 'SQL', group: 'lenguajes' },
  javascript: { name: 'JavaScript', group: 'lenguajes' },
  typescript: { name: 'TypeScript', group: 'lenguajes' },
  r: { name: 'R', group: 'lenguajes' },
  csharp: { name: 'C#', group: 'lenguajes', note: 'nivel académico' },
  html: { name: 'HTML', group: 'lenguajes' },
  css: { name: 'CSS', group: 'lenguajes' },
  groq: { name: 'GROQ', group: 'lenguajes', aliases: ['Sanity GROQ'] },

  // datos y BI
  powerbi: { name: 'Power BI', group: 'datos' },
  tableau: { name: 'Tableau', group: 'datos' },
  excel: { name: 'Excel', group: 'datos' },

  // frontend
  react: { name: 'React', group: 'frontend' },
  nextjs: { name: 'Next.js', group: 'frontend' },
  tailwind: { name: 'Tailwind CSS', group: 'frontend' },
  'shadcn-ui': { name: 'shadcn/ui', group: 'frontend' },
  bootstrap: { name: 'Bootstrap', group: 'frontend' },
  canvas: { name: 'Canvas API', group: 'frontend' },
  recharts: { name: 'Recharts', group: 'frontend' },
  'html5-qrcode': { name: 'html5-qrcode', group: 'frontend', note: 'escaneo de QR por cámara' },

  // backend
  fastapi: { name: 'FastAPI', group: 'backend' },
  nodejs: { name: 'Node.js', group: 'backend' },
  sqlalchemy: { name: 'SQLAlchemy', group: 'backend' },
  dotnet: { name: '.NET', group: 'backend', note: 'nivel académico' },
  sanity: { name: 'Sanity CMS', group: 'backend' },
  xhtml2pdf: { name: 'xhtml2pdf', group: 'backend', note: 'PDFs en memoria desde HTML' },
  resend: { name: 'Resend', group: 'backend', note: 'envío de correo transaccional' },

  // bases de datos
  postgresql: { name: 'PostgreSQL', group: 'bases-de-datos' },
  supabase: { name: 'Supabase', group: 'bases-de-datos' },
  mongodb: { name: 'MongoDB', group: 'bases-de-datos' },
  mysql: { name: 'MySQL', group: 'bases-de-datos' },

  // cloud y devops
  gcp: { name: 'Google Cloud', group: 'cloud', aliases: ['GCP'] },
  docker: { name: 'Docker', group: 'cloud' },
  kubernetes: { name: 'Kubernetes', group: 'cloud' },
  vercel: { name: 'Vercel', group: 'cloud' },
  linux: { name: 'Linux', group: 'cloud' },
});
