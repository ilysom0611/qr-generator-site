# QR Code Generator

Free, private, browser-based QR code generator. 100% client-side. No upload, no signup.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
```

## Test

```bash
npm run typecheck
npm run test           # unit tests (Vitest)
npm run test:e2e       # E2E (Playwright; needs `npx playwright install`)
npm run lighthouse     # Lighthouse CI locally
```

## Build

```bash
npm run build          # -> dist/
npm run preview        # serve dist/
```

## Deploy

Cloudflare Pages auto-deploys from `main` branch. No CI/CD config needed beyond Cloudflare dashboard.

## Project structure

See `docs/superpowers/specs/2026-09-04-qr-generator-tool-site-design.md` and `docs/superpowers/plans/2026-09-04-qr-generator-tool-site.md`.