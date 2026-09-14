// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://krwood.ee',

  // Estonian is the default locale and is served from the root (no /et/ prefix).
  // English -> /en/, Polish -> /pl/
  i18n: {
    defaultLocale: 'et',
    locales: ['et', 'en', 'pl'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  // Emits /en/index.html style output, which Apache on Radicenter serves
  // directly from the document root without any rewrite rules.
  build: {
    format: 'directory',
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'et',
        locales: {
          et: 'et-EE',
          en: 'en-US',
          pl: 'pl-PL',
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
