import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    include: ['tests/unit/**/*.spec.ts'],
    exclude: ['node_modules', 'dist', '.astro', 'tests/e2e/**'],
  },
});
