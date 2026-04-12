# Kenai Auto Sales

Kenai Auto Sales is a dark-mode-first Vite + React + TypeScript marketplace for trucks, SUVs, work rigs, boats, ATVs, snowmobiles, and dealer inventory across the Kenai Peninsula.

## Stack
- Vite + React + TypeScript
- Tailwind CSS with custom shadcn-style components
- React Router, Framer Motion, Recharts, Leaflet, Embla Carousel
- Supabase client wiring and production-ready schema

## Local development
```bash
npm install
npm run dev
npm run build
```

## Deployment
GitHub Pages deploys automatically from `.github/workflows/deploy.yml` and serves the custom domain `kenaiautosales.com` using `public/CNAME`.
