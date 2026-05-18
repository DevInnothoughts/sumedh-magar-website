# Dr. Sumedh Magar – I-SPORT Medical Centre
## Technical Documentation Index

**Production URL:** https://sportsurgeon.in  
**Stack:** Next.js 15 App Router · TypeScript · Supabase · Tailwind CSS  
**Last Updated:** May 2026

---

## Documentation Map

| Document | Description |
|---|---|
| [architecture-overview.md](./architecture-overview.md) | High-level system design, request lifecycle, rendering strategy |
| [frontend-architecture.md](./frontend-architecture.md) | Component hierarchy, state management, UI system |
| [routing-structure.md](./routing-structure.md) | Complete route tree, rendering modes, dynamic params |
| [server-components.md](./server-components.md) | SSR strategy, ISR, data fetching patterns |
| [client-components.md](./client-components.md) | All "use client" components and their rationale |
| [seo-architecture.md](./seo-architecture.md) | Metadata, schema, sitemap, robots, canonical strategy |
| [auth-architecture.md](./auth-architecture.md) | Supabase auth, middleware, session flow |
| [database-structure.md](./database-structure.md) | All tables, RLS policies, migrations |
| [backend-integrations.md](./backend-integrations.md) | Supabase, Google Reviews, Edge Functions |
| [blog-system.md](./blog-system.md) | Post creation, CMS flow, rendering, comments |
| [image-handling.md](./image-handling.md) | next/image, remote patterns, storage |
| [admin-panel.md](./admin-panel.md) | Admin CMS interface, auth flow, modules |
| [middleware-flow.md](./middleware-flow.md) | Middleware execution, protected routes |
| [performance-optimizations.md](./performance-optimizations.md) | Caching, ISR, Core Web Vitals strategy |
| [environment-variables.md](./environment-variables.md) | All env vars, purposes, security |
| [deployment-guide.md](./deployment-guide.md) | Build process, hosting, Vercel setup |
| [troubleshooting.md](./troubleshooting.md) | Common errors and resolutions |
| [future-recommendations.md](./future-recommendations.md) | Technical debt, scaling, improvements |

---

## Quick Start for New Developers

```bash
# 1. Clone and install
npm install

# 2. Copy environment variables
cp .env.example .env.local
# Fill in your Supabase credentials

# 3. Run locally
npm run dev

# 4. Build for production (requires extra memory in constrained environments)
NODE_OPTIONS="--max-old-space-size=6144" NEXT_DISABLE_BUILD_WORKER=1 npm run build
```

## Critical Files at a Glance

| Purpose | File |
|---|---|
| Root layout + global metadata | `app/layout.tsx` |
| Public layout (header + footer) | `app/(public)/layout.tsx` |
| Admin layout guard | `app/admin/layout.tsx` |
| Middleware (route protection) | `middleware.ts` |
| Supabase client (browser) | `lib/supabase.ts` |
| Auth helpers | `lib/auth.ts` |
| Tailwind config + design tokens | `tailwind.config.js` |
| Next.js config + image domains | `next.config.ts` |
| Sitemap | `app/sitemap.ts` |
| Robots.txt | `app/robots.ts` |

---

## Architecture in One Diagram

```
Browser Request
      │
      ▼
┌─────────────────────────────────────────────────────┐
│                    middleware.ts                     │
│   Matches /admin/:path+ — currently pass-through    │
│   (auth is checked client-side in each admin page)  │
└─────────────────────────┬───────────────────────────┘
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
   /admin/* routes               Public routes
   (force-dynamic)           (mostly static / ISR)
          │                               │
          ▼                               ▼
   Client-side session           Server Component
   check via getSession()         fetches data
          │                               │
          ▼                               ▼
   AdminLayout + React             Props → Client
   client components               Component
          │                               │
          ▼                               ▼
   Supabase JS SDK           JSON-LD + Metadata API
   (browser client)          + next/image + Tailwind
```

---

## Domain Overview

This is a **production medical website** for Dr. Sumedh Magar, Sports Orthopedic Surgeon, Founder of I-SPORT Medical Centre, Pune. The site serves dual purposes:

1. **Patient-facing marketing site** — SEO-optimised, static/ISR rendered, structured data for medical specialties, local SEO for Pune suburbs
2. **Content Management System** — Admin panel for blog posts, gallery, contacts, testimonials, and Google Reviews management
