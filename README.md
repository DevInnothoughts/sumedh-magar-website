# Dr. Sumedh Magar – Sports Orthopedic Surgeon

**Production URL:** https://sportsurgeon.in  
**Stack:** Next.js 15 App Router · TypeScript · Supabase · Tailwind CSS  
**Admin URL:** https://sportsurgeon.in/admin

A production medical website for Dr. Sumedh Magar, MS Orthopaedics, Masters in Sports Medicine (UCL, UK), ISAKOS Fellowship — Founder & Director of I-SPORT Medical Centre, Balewadi, Pune. The site combines a high-performance, SEO-optimised patient-facing site with a full-featured admin CMS.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password) |
| Storage | Supabase Storage |
| Animations | Framer Motion |
| Rich Text | React Quill (admin only) |
| Forms | React Hook Form |
| Notifications | React Toastify |
| Icons | Lucide React |
| Fonts | Montserrat + Open Sans (locally hosted woff2) |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env .env.local
# Add your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Run development server
npm run dev

# 4. Build for production
NODE_OPTIONS="--max-old-space-size=6144" NEXT_DISABLE_BUILD_WORKER=1 npm run build
```

> The extra memory flags are required during static generation of 41+ pages in memory-constrained environments.

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (from Supabase Dashboard → Settings → API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key (safe to expose, protected by RLS) |

For Edge Functions (set in Supabase Dashboard → Settings → Edge Functions → Secrets):

| Secret | Description |
|---|---|
| `GOOGLE_PLACES_API_KEY` | Google Cloud API key with Places API enabled (for syncing Google Reviews) |

---

## Architecture Overview

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

### Rendering Strategy

| Route Pattern | Mode | Revalidate |
|---|---|---|
| `/` | ISR | 300s (5 min) |
| `/blog`, `/blog/[id]` | ISR | 300s |
| `/about`, `/expertise`, `/treatments/*` | SSG | Build time |
| `/sports-injuries/*`, `/conditions/[slug]` | SSG | Build time |
| `/locations/[area]`, `/orthopedic-surgeon-pune` | SSG | Build time |
| `/admin/*` | Dynamic | Never cached |
| `/sitemap.xml` | ISR | 3600s (1 hr) |

---

## Project Structure

```
app/
├── (public)/           ← Public route group (Header + Footer injected)
│   ├── page.tsx        → / (homepage)
│   ├── about/
│   ├── blog/           → /blog (listing) + /blog/[id] (detail)
│   ├── treatments/     → hub + 6 procedure sub-pages
│   ├── sports-injuries/→ hub + 4 sport-specific pages
│   ├── conditions/     → hub + [slug] (5 conditions)
│   ├── locations/      → [area] (4 Pune suburb pages)
│   ├── orthopedic-surgeon-pune/
│   ├── expertise/
│   ├── sports-medicine/
│   ├── gallery/
│   ├── contact/
│   └── research/
├── admin/              ← Admin CMS (force-dynamic, client-side auth)
│   ├── page.tsx        → Login
│   ├── dashboard/
│   ├── posts/          → List + create + edit/[id]
│   ├── comments/
│   ├── contacts/
│   ├── gallery/
│   ├── media/
│   └── google-reviews/
├── layout.tsx          ← Root: fonts, global metadata, JSON-LD, GTM
├── sitemap.ts
└── robots.ts

components/             ← Shared UI components
lib/                    ← Supabase client + TypeScript types + auth helpers
services/               ← Google Reviews service
supabase/
├── functions/          ← Edge Functions (fetch-google-reviews)
└── migrations/         ← Database migration files
public/
└── fonts/              ← Locally hosted woff2 files (Montserrat + Open Sans)
docs/                   ← Complete technical documentation (18 files)
```

---

## Database

Six tables in Supabase PostgreSQL, all with Row Level Security enabled:

| Table | Purpose |
|---|---|
| `posts` | Blog posts (draft/published, rich HTML, view count) |
| `comments` | Reader comments on posts (moderated) |
| `contacts` | Contact form and appointment request submissions |
| `testimonials` | Patient testimonials (moderated) |
| `gallery` | Gallery images with categories |
| `media_library` | All uploaded files (images + videos) |
| `google_reviews` | Cached Google Maps reviews |

Migrations are in `supabase/migrations/`. Apply new migrations via the Supabase MCP tool — never use raw `DROP` statements.

---

## Admin Panel

Access at `/admin` with email/password credentials.

| Section | URL | Purpose |
|---|---|---|
| Dashboard | `/admin/dashboard` | Stats overview |
| Posts | `/admin/posts` | Create, edit, publish/unpublish, delete blog posts |
| Comments | `/admin/comments` | Approve or delete reader comments |
| Contacts | `/admin/contacts` | View inquiries, mark as contacted |
| Gallery | `/admin/gallery` | Upload and manage gallery images |
| Media | `/admin/media` | Browse all uploaded files |
| Google Reviews | `/admin/google-reviews` | Sync and manage Google Maps reviews |

To create an admin user: Supabase Dashboard → Authentication → Users → Add user.

---

## SEO

- JSON-LD structured data on every page: `MedicalOrganization`, `Physician`, `FAQPage`, `BreadcrumbList`, `LocalBusiness`, `Article`
- Dynamic XML sitemap at `/sitemap.xml` (30+ static routes + all published blog posts)
- Per-page `generateMetadata` for blog posts
- Canonical URLs on all public pages
- 301 redirects: `/articles` → `/blog`, `/articles/:id` → `/blog/:id`
- Google Ads conversion tracking: `AW-17761397613`

---

## Fonts

Fonts are hosted locally (no Google Fonts network dependency at build or runtime):

```
public/fonts/montserrat/
  Montserrat-SemiBold.woff2    (weight 600)
  Montserrat-Bold.woff2        (weight 700)
  Montserrat-ExtraBold.woff2   (weight 800)

public/fonts/open-sans/
  OpenSans-Regular.woff2       (weight 400)
  OpenSans-Medium.woff2        (weight 500)
  OpenSans-SemiBold.woff2      (weight 600)
```

Loaded via `next/font/local` in `app/layout.tsx`. CSS variables: `--font-montserrat`, `--font-open-sans`.

---

## Deployment

### Vercel (Production)

1. Connect the Git repository to Vercel
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel → Settings → Environment Variables
3. Set build command: `NEXT_DISABLE_BUILD_WORKER=1 npm run build`
4. Deploy — all 41 routes pre-rendered at build time

### Post-Deploy Checklist

- Homepage loads blog posts and Google Reviews
- Contact form submits (check Supabase → contacts table)
- Admin login works at `/admin`
- Sitemap accessible at `/sitemap.xml`
- Treatment pages render with JSON-LD structured data

---

## Key Files

| Purpose | File |
|---|---|
| Root layout + metadata + fonts | `app/layout.tsx` |
| Public layout (header + footer) | `app/(public)/layout.tsx` |
| Admin force-dynamic guard | `app/admin/layout.tsx` |
| Middleware (route matching) | `middleware.ts` |
| Supabase client + types | `lib/supabase.ts` |
| Auth helpers | `lib/auth.ts` |
| Design tokens | `tailwind.config.js` |
| Image domains + redirects | `next.config.ts` |
| Google Reviews Edge Function | `supabase/functions/fetch-google-reviews/index.ts` |
| Google Reviews service | `services/googleReviewsService.ts` |

---

## Documentation

Full technical documentation is in `/docs/`:

| Document | Description |
|---|---|
| [architecture-overview.md](./docs/architecture-overview.md) | System design, rendering strategy, request lifecycle |
| [routing-structure.md](./docs/routing-structure.md) | Complete route tree, rendering modes, dynamic params |
| [frontend-architecture.md](./docs/frontend-architecture.md) | Design system, component hierarchy, layout patterns |
| [server-components.md](./docs/server-components.md) | ISR/SSG patterns, data fetching, generateMetadata |
| [client-components.md](./docs/client-components.md) | All client components, auth guards, animation patterns |
| [seo-architecture.md](./docs/seo-architecture.md) | JSON-LD schemas, sitemap, canonical, local SEO strategy |
| [auth-architecture.md](./docs/auth-architecture.md) | Auth flow, session management, security notes |
| [database-structure.md](./docs/database-structure.md) | All tables, columns, RLS policies, migrations |
| [backend-integrations.md](./docs/backend-integrations.md) | Supabase, Google Reviews API, Storage, GTM |
| [blog-system.md](./docs/blog-system.md) | CMS workflow, post editor, comments, view counts |
| [image-handling.md](./docs/image-handling.md) | next/image usage, remote patterns, upload flow |
| [admin-panel.md](./docs/admin-panel.md) | Every admin section documented with features |
| [middleware-flow.md](./docs/middleware-flow.md) | Current pass-through, security analysis, upgrade path |
| [performance-optimizations.md](./docs/performance-optimizations.md) | Core Web Vitals, ISR, code splitting, indexes |
| [environment-variables.md](./docs/environment-variables.md) | Every env var with purpose and security classification |
| [deployment-guide.md](./docs/deployment-guide.md) | Build command, Vercel config, rollback, monitoring |
| [troubleshooting.md](./docs/troubleshooting.md) | 15+ common errors with causes and resolutions |
| [future-recommendations.md](./docs/future-recommendations.md) | Prioritised improvements and technical debt |

---

## Contact

**I-SPORT Medical Centre**  
Shp 9-13, Upper Ground Floor, Madhukosh Society  
Balewadi, Pune 411045, Maharashtra  
Phone: 9145517171 / 02067813869  
Email: sumedh@isportmedicalcentre.com  
Instagram: [@isport_pune](https://www.instagram.com/isport_pune/)

---

Copyright &copy; 2026 Dr. Sumedh Magar. All rights reserved.
