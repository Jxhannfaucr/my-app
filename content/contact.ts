import { defineContact } from '@lib/content/define';

/**
 * `showOnSite: false` = no aparece en la página; solo lo comparte el chatbot si se lo piden
 * (mismo comportamiento que el portfolio anterior).
 */
export default defineContact({
  channels: [
    { kind: 'linkedin', label: 'LinkedIn', value: 'https://www.linkedin.com/in/johannfaucr/' },
    { kind: 'github', label: 'GitHub', value: 'https://github.com/Jxhannfaucr' },
    { kind: 'instagram', label: 'Instagram', value: 'https://www.instagram.com/jxhann_faucr/' },
    // TODO(johan): el sitio anterior tenía DOS enlaces distintos al CV. Confirmar cuál es el vigente.
    // (el otro era https://drive.google.com/uc?export=download&id=1a96fEQen6ABQ-YpcKBUE300K7xHqL13z)
    {
      kind: 'cv',
      label: 'CV',
      value: 'https://drive.google.com/uc?export=download&id=1MoVzU6CeuBQhtRVjXAQEoQ6vUWYhxpn_',
    },
    { kind: 'email', label: 'Correo', value: 'Johanfau14@gmail.com', showOnSite: false },
    { kind: 'whatsapp', label: 'WhatsApp', value: '+506 8510 4415', showOnSite: false },
  ],
});
