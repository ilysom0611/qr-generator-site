import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://qrcodegen-9qi.pages.dev',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          cn: 'zh-CN',
          th: 'th-TH',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'cn', 'th'],
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'rewrite',
    },
    fallback: {
      cn: 'en',
      th: 'en',
    },
  },
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  }
});
