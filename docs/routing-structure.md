# Routing Structure

## Complete Route Tree

```
/ (app router root)
│
├── (public)/                           ← Route group: Header + Footer injected
│   ├── page.tsx                        → /                    [SSG+ISR 5min]
│   ├── about/page.tsx                  → /about               [SSG]
│   ├── expertise/page.tsx              → /expertise           [SSG]
│   ├── sports-medicine/page.tsx        → /sports-medicine     [SSG]
│   ├── research/page.tsx               → /research            [SSG]
│   ├── gallery/page.tsx                → /gallery             [SSG]
│   ├── contact/page.tsx                → /contact             [SSG]
│   │
│   ├── blog/
│   │   ├── page.tsx                    → /blog                [ISR 5min]
│   │   └── [id]/page.tsx               → /blog/[id]           [ISR 5min, dynamic]
│   │
│   ├── treatments/
│   │   ├── page.tsx                    → /treatments          [SSG]
│   │   ├── acl-tear-treatment-pune/    → /treatments/acl-...  [SSG]
│   │   ├── knee-arthroscopy-pune/      → /treatments/knee-... [SSG]
│   │   ├── shoulder-arthroscopy-pune/  → /treatments/shou-... [SSG]
│   │   ├── meniscus-tear-treatment-pune/ → /treatments/men-.. [SSG]
│   │   ├── knee-pain-treatment-pune/   → /treatments/knee-p.. [SSG]
│   │   └── sports-rehabilitation-pune/ → /treatments/sports.. [SSG]
│   │
│   ├── sports-injuries/
│   │   ├── page.tsx                    → /sports-injuries     [SSG]
│   │   ├── cricket-injuries/           → /sports-injuries/cr. [SSG]
│   │   ├── football-knee-injuries/     → /sports-injuries/fo. [SSG]
│   │   ├── gym-shoulder-injuries/      → /sports-injuries/gy. [SSG]
│   │   └── runner-knee-pain/           → /sports-injuries/ru. [SSG]
│   │
│   ├── conditions/
│   │   ├── page.tsx                    → /conditions          [SSG]
│   │   └── [slug]/page.tsx             → /conditions/[slug]   [SSG via generateStaticParams]
│   │       ├── arthritis
│   │       ├── ligament-injuries
│   │       ├── tendon-injuries
│   │       ├── cartilage-injuries
│   │       └── shoulder-instability
│   │
│   ├── locations/
│   │   └── [area]/page.tsx             → /locations/[area]    [SSG via generateStaticParams]
│   │       ├── orthopedic-doctor-balewadi
│   │       ├── orthopedic-doctor-baner
│   │       ├── sports-injury-doctor-wakad
│   │       └── orthopedic-surgeon-hinjewadi
│   │
│   ├── orthopedic-surgeon-pune/page.tsx → /orthopedic-surgeon-pune [SSG]
│   │
│   ├── articles/page.tsx               → /articles            [REDIRECT → /blog]
│   ├── articles/[id]/page.tsx          → /articles/[id]       [REDIRECT → /blog/[id]]
│   │
│   ├── privacy-policy/page.tsx         → /privacy-policy      [SSG]
│   ├── terms-conditions/page.tsx       → /terms-conditions    [SSG]
│   ├── cookie-policy/page.tsx          → /cookie-policy       [SSG]
│   └── medical-disclaimer/page.tsx     → /medical-disclaimer  [SSG]
│
├── admin/                              ← Admin route group (force-dynamic)
│   ├── layout.tsx                      ← export dynamic = 'force-dynamic'
│   ├── page.tsx                        → /admin               [Login page]
│   ├── dashboard/page.tsx              → /admin/dashboard
│   ├── posts/
│   │   ├── page.tsx                    → /admin/posts
│   │   ├── create/page.tsx             → /admin/posts/create
│   │   └── edit/[id]/page.tsx          → /admin/posts/edit/[id]
│   ├── comments/page.tsx               → /admin/comments
│   ├── contacts/page.tsx               → /admin/contacts
│   ├── gallery/page.tsx                → /admin/gallery
│   ├── media/page.tsx                  → /admin/media
│   └── google-reviews/page.tsx         → /admin/google-reviews
│
├── layout.tsx                          ← Root layout: fonts, global metadata, JSON-LD
├── globals.css                         ← Global Tailwind base styles
├── providers.tsx                       ← ToastContainer provider
├── sitemap.ts                          → /sitemap.xml          [ISR 1 hour]
├── robots.ts                           → /robots.txt           [static]
└── not-found.tsx                       → 404 page
```

---

## Rendering Mode Reference

| Route Pattern | Mode | Revalidate | Notes |
|---|---|---|---|
| `/` | ISR | 300s | Fetches posts + reviews |
| `/blog` | ISR | 300s | Fetches all published posts |
| `/blog/[id]` | ISR | 300s | Fetches post + comments |
| `/about` | SSG | — | Static content |
| `/expertise` | SSG | — | Static content |
| `/sports-medicine` | SSG | — | Static content |
| `/treatments` | SSG | — | Static content |
| `/treatments/*` | SSG | — | All 6 sub-pages |
| `/sports-injuries` | SSG | — | Static content |
| `/sports-injuries/*` | SSG | — | All 4 sub-pages |
| `/conditions` | SSG | — | Static content |
| `/conditions/[slug]` | SSG | — | `generateStaticParams` pre-builds 5 slugs |
| `/locations/[area]` | SSG | — | `generateStaticParams` pre-builds 4 areas |
| `/orthopedic-surgeon-pune` | SSG | — | Static SEO landing page |
| `/gallery` | SSG | — | Data loaded client-side after hydration |
| `/admin/*` | Dynamic | — | `force-dynamic`, no caching |
| `/sitemap.xml` | ISR | 3600s | Fetches live post IDs |
| `/robots.txt` | Static | — | |

---

## Dynamic Routes

### `/blog/[id]`

- **Parameter:** `id` is the Supabase UUID of the post (not a human-readable slug)
- **Data sources:** `posts` table (published only) + `comments` table (approved only)
- **Fallback:** Calls `notFound()` if post doesn't exist or isn't published
- **File:** `app/(public)/blog/[id]/page.tsx`

### `/conditions/[slug]`

- **Parameter:** `slug` is a static string key in the `CONDITIONS` object within the page file
- **`generateStaticParams`:** Pre-builds all 5 slugs at build time
- **No DB dependency:** Content is hardcoded in the page file
- **File:** `app/(public)/conditions/[slug]/page.tsx`

### `/locations/[area]`

- **Parameter:** `area` is a static string key in the `AREAS` object within the page file
- **`generateStaticParams`:** Pre-builds all 4 location slugs at build time
- **No DB dependency:** Content is hardcoded in the page file
- **File:** `app/(public)/locations/[area]/page.tsx`

---

## Redirects

Configured in `next.config.ts`:

```typescript
async redirects() {
  return [
    { source: '/articles', destination: '/blog', permanent: true },      // 301
    { source: '/articles/:id', destination: '/blog/:id', permanent: true }, // 301
  ];
}
```

These preserve SEO equity from any existing external links pointing to `/articles`.

---

## Middleware Route Matching

```typescript
// middleware.ts
export const config = {
  matcher: ['/admin/:path+'],
};
```

The middleware currently runs on all `/admin/*` requests but passes through unconditionally. Authentication is handled client-side in each admin component. See [auth-architecture.md](./auth-architecture.md).

---

## Navigation Structure

The `<Header />` component (`components/Header.tsx`) renders the following navigation:

| Label | Path | Type |
|---|---|---|
| Home | `/` | Direct link |
| About | `/about` | Direct link |
| Treatments | (dropdown) | Parent with 7 children |
| Sports Injuries | (dropdown) | Parent with 5 children |
| Expertise | `/expertise` | Direct link |
| Sports Medicine | `/sports-medicine` | Direct link |
| Blog | `/blog` | Direct link |
| Gallery | `/gallery` | Direct link |
| Contact | `/contact` | Direct link |

Dropdowns use Framer Motion `AnimatePresence` for smooth open/close animation. Mobile uses accordion-style expansion.
