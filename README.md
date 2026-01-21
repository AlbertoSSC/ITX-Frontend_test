# ITX Frontend Test
SPA
React + TypeScript + Vite

## Quickstart
- Install: `npm install`
- Dev server: `npm start`
- Build: `npm run build`
- Preview build: `npm run preview`

## Path aliases & barrels
- Use `@/` for absolute imports.
- Main barrel in `src/index.ts` plus per-folder barrels (`components`, `pages`, `types`).

## Notes
- Local cache for products in `src/services/api.ts` (TTL 1h) and cart count in `localStorage`.
