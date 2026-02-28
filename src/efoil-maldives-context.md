# eFoil Maldives — Repository Context

## What it does
A marketing + booking website for **eFoil Maldives**, a premium electric hydrofoil rental/experience business operating | Maldives. The site handles:
- Service showcase (experiences, lessons, equipment ownership)
- Lead capture forms (availability requests, partnerships, waitlist, club membership)
- Stripe-powered checkout/booking flows
- A blog with MDX content
- Maps for resort locations

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (v16 / App Router) + React 19 |
| Language | TypeScript 5.8 |
| UI Library | `@once-ui-system/core` + SCSS modules |
| Icons | Lucide React, React Icons |
| Content | MDX via `@next/mdx` + `gray-matter` |
| Payments | Stripe |
| Email | Resend |
| Maps | Mapbox GL |
| Analytics | Vercel Analytics + Speed Insights |
| Linting | Biome + ESLint |

## Main Entry Points

### Pages
- `src/app/page.tsx` — Home page (hero, services, FAQ, gallery)
- `src/app/efoil-experiences-maldives/` — Experience packages
- `src/app/learn-efoil-maldives/` — Lessons/instruction
- `src/app/booking/` + `src/app/book/` — Checkout flows
- `src/app/club/` — eFoil Club membership
- `src/app/blog/` — MDX blog

### Configuration
- `src/resources/content.tsx` — All site copy, metadata, nav
- `src/resources/once-ui.config.ts` — Theme/UI config
- `next.config.mjs` — MDX setup + URL redirects

### Key API Routes (`src/app/api/`)
- `/api/checkout` — Stripe checkout session
- `/api/webhook` — Stripe webhook handler
- `/api/leads/availability`, `/partner`, `/waitlist`, `/membership` — Lead forms via Resend email
- `/api/authenticate` — Password-protected pages

## Project Structure

```
src/
├── app/          # Next.js App Router pages + API routes
├── components/   # Reusable UI components
├── resources/    # Content & UI configuration
├── lib/          # Utilities (analytics, resorts data)
└── types/        # TypeScript type definitions
public/           # Static images and assets
```
