import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://qrcodegen-9qi.pages.dev',
  integrations: [react(), sitemap()],
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  }
});