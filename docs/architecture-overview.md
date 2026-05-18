# Architecture Overview

## Project Purpose

A production medical website for Dr. Sumedh Magar, Sports Orthopedic Surgeon at I-SPORT Medical Centre, Balewadi, Pune. The site combines:
- High-performance, SEO-optimised public pages for patient acquisition
- A full-featured admin CMS for content management
- Local SEO targeting Pune suburbs
- Topical authority building through a blog system and condition/treatment pages

---

## High-Level Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                         Vercel / SSR Host                      │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  Next.js 15 App Router                  │   │
│  │                                                         │   │
│  │  ┌──────────────┐        ┌──────────────────────────┐  │   │
│  │  │ Public Pages │        │      Admin Panel          │  │   │
│  │  │ (SSG / ISR)  │        │    (force-dynamic SSR)   │  │   │
│  │  │              │        │                          │  │   │
│  │  │ /            │        │ /admin                   │  │   │
│  │  │ /about       │        │ /admin/dashboard         │  │   │
│  │  │ /blog        │        │ /admin/posts             │  │   │
│  │  │ /treatments  │        │ /admin/gallery           │  │   │
│  │  │ /conditions  │        │ /admin/contacts          │  │   │
│  │  │ /locations   │        │ /admin/comments          │  │   │
│  │  │ etc.         │        │ /admin/media             │  │   │
│  │  └──────┬───────┘        └───────────┬──────────────┘  │   │
│  │         │                            │                  │   │
│  │         ▼                            ▼                  │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │              Supabase Backend                    │  │   │
│  │  │  Auth · PostgreSQL DB · Storage · Edge Functions │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR, ISR, metadata API, route groups, server components |
| Language | TypeScript | Type safety across DB types and component props |
| Styling | Tailwind CSS 3 | Utility-first, consistent design tokens in `tailwind.config.js` |
| Database | Supabase (PostgreSQL) | Managed Postgres with auth, storage, and real-time built in |
| Auth | Supabase Auth | Email/password, session management via JS SDK |
| Animations | Framer Motion | Scroll animations, page transitions, mobile menu |
| Rich Text | React Quill | WYSIWYG editor for blog post creation (admin only) |
| Forms | React Hook Form | Client-side form validation for contact and comment forms |
| Notifications | React Toastify | Toast notifications across admin and public forms |
| Icons | Lucide React | Consistent icon set, tree-shakable |
| Date Formatting | date-fns | Lightweight date utilities for blog timestamps |
| Fonts | next/font/google | Montserrat (headings) + Open Sans (body), zero layout shift |

---

## Rendering Architecture

The project uses **three rendering modes** based on route type:

### 1. Static Generation (SSG) — Most Public Pages
Pages with no dynamic runtime dependencies are pre-rendered at build time.
- `/about`, `/expertise`, `/sports-medicine`, `/conditions/[slug]`, `/locations/[area]`
- `/treatments/*` — All treatment sub-pages
- `/sports-injuries/*` — All sport-specific pages

### 2. Incremental Static Regeneration (ISR) — Content Pages
Pages that fetch from Supabase at build time AND revalidate in background.
- `/` — Homepage (revalidate: 300s / 5 min)
- `/blog` — Blog listing (revalidate: 300s)
- `/blog/[id]` — Individual posts (revalidate: 300s)
- `/sitemap.xml` (revalidate: 3600s / 1 hour)

```typescript
// Pattern used in all ISR pages
export const revalidate = 300; // seconds
```

### 3. Dynamic Server Rendering — Admin Panel
All `/admin/*` routes use `force-dynamic` to prevent caching of sensitive admin UI.

```typescript
// app/admin/layout.tsx
export const dynamic = 'force-dynamic';
```

---

## Request Lifecycle — Public Page

```
1. User visits /blog/[id]
         │
2. CDN / Vercel edge checks ISR cache
         │
   ┌─────┴──────┐
   │ Cache hit  │ Cache miss/stale
   │            │
   │            ▼
   │    3. Next.js server renders page:
   │       - Fetches post from Supabase
   │       - Fetches approved comments
   │       - Generates Article JSON-LD
   │       - Generates BreadcrumbList JSON-LD
   │       - Applies generateMetadata()
   │
   ▼            ▼
4. Serve HTML with embedded JSON-LD
         │
5. React hydrates interactive parts:
   - Comment form (useForm)
   - Share button (navigator.share)
   - View count increment (supabase.rpc)
         │
6. Page is interactive, SEO content already in HTML
```

---

## Request Lifecycle — Admin Panel

```
1. User visits /admin/dashboard
         │
2. middleware.ts matches /admin/:path+
   (currently pass-through — no server redirect)
         │
3. Next.js renders page as force-dynamic
         │
4. DashboardClient.tsx mounts:
   - useEffect calls getSession()
   - If no session → router.push('/admin')
   - If session → fetchDashboardData()
         │
5. Dashboard data fetched via Supabase JS SDK
   using authenticated session
```

> **Security Note:** The middleware currently passes through all admin requests. Client-side session checking in each admin component provides the authentication gate. See [auth-architecture.md](./auth-architecture.md) for details and upgrade recommendations.

---

## Route Group Architecture

Next.js 15 route groups are used to separate concerns without affecting URLs:

```
app/
├── (public)/          ← Public route group — includes Header + Footer
│   ├── layout.tsx     ← Wraps all public pages with Header/Footer
│   └── [pages]/
├── admin/             ← Admin route group — no shared layout wrapping
│   ├── layout.tsx     ← force-dynamic only
│   └── [pages]/       ← Each page includes AdminLayout component
```

The `(public)` group injects `<Header />` and `<Footer />` automatically. Admin pages manually include `<AdminLayout />` inside their client components for sidebar navigation.

---

## Data Flow Summary

```
Supabase DB
    │
    ├── Server Components (public pages)
    │   └── data passed as props to Client Components
    │
    └── Supabase JS SDK (admin + gallery + contact forms)
        └── directly in useEffect / event handlers
```

Public pages avoid client-side data fetching for SEO and performance. The server fetches, and the client component receives pre-loaded data as props, hydrating immediately without loading spinners.
