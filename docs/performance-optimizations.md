# Performance Optimizations

## Overview

The site is optimized for Core Web Vitals, particularly LCP (Largest Contentful Paint) and CLS (Cumulative Layout Shift), which directly affect both SEO rankings and user experience. Performance is achieved through the rendering strategy, image optimization, font loading, and minimal client-side JavaScript.

---

## Rendering Strategy (Primary Optimization)

The most impactful performance decision is pre-rendering pages at build time or via ISR:

| Strategy | Routes | Effect |
|---|---|---|
| SSG | 25+ public pages | Sub-100ms response from CDN edge |
| ISR (revalidate 300s) | Homepage, /blog, /blog/[id] | Fresh content within 5 min |
| ISR (revalidate 3600s) | /sitemap.xml | Sitemap refreshes hourly |
| force-dynamic | Admin only | No caching of sensitive admin pages |

**Why this matters:** SSG/ISR pages are pre-rendered HTML served directly from Vercel's edge network. No server processing, no database calls on the request path — just instant HTML delivery.

---

## ISR Revalidation

```typescript
export const revalidate = 300; // in seconds
```

On the first request after a cache entry expires, Next.js:
1. Serves the stale cached page immediately (fast for the user)
2. Triggers a background re-render
3. Updates the cache with fresh data

This means content updates may take up to 5 minutes to appear publicly, but users always see a fast response.

---

## Image Optimization

Next.js `<Image>` provides:
- **WebP/AVIF conversion** — modern formats, typically 30–50% smaller
- **Responsive srcset** — browsers download only the size they need
- **Lazy loading** — off-screen images load on demand
- **Priority preloading** — `priority` prop for LCP images generates `<link rel="preload">`
- **Width/height aspect ratio** — prevents CLS

Critical practices implemented:
- All hero images use `priority` prop
- All `fill` images have accurate `sizes` prop
- Supabase Storage hostname is whitelisted in `next.config.ts`

---

## Font Loading

Fonts are loaded via `next/font/google` in `app/layout.tsx`:

```typescript
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',   // ← prevents invisible text
});
```

`display: 'swap'` means text renders immediately in a fallback font while the web font loads, eliminating FOIT (Flash of Invisible Text). `next/font` automatically self-hosts the fonts, avoiding Google Fonts DNS lookup overhead.

---

## JavaScript Bundle Reduction

**Server components by default:** Most page content is rendered server-side with zero client JavaScript. Only components explicitly marked `'use client'` ship JavaScript to the browser.

**Dynamic imports:** React Quill (a large editor library) is only needed in the admin panel and is dynamically imported:

```typescript
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
```

This code-splits Quill out of the main bundle entirely — public visitors never download it.

**Tree-shaking:** Lucide React icons are individually imported:
```typescript
import { ArrowRight, CheckCircle, Phone } from 'lucide-react';
```
Only the specific icons used are included in the bundle.

---

## Code Splitting

Next.js App Router automatically code-splits by:
- Route (each page has its own bundle)
- Dynamic imports (`next/dynamic`)
- Route groups (`(public)` vs `admin/` have separate code)

The admin panel's heavy dependencies (React Quill, admin-specific code) are completely isolated from the public pages.

---

## Data Fetching Efficiency

**Server components fetch once:** ISR pages fetch data on the server and serialize it as props. No duplicate client-side fetch on hydration.

**Parallel fetches:** The blog detail page fetches post + comments + related posts concurrently:

```typescript
const [postResult, commentsResult, relatedResult] = await Promise.all([
  supabase.from('posts').select('*').eq('id', id)...,
  supabase.from('comments').select('*').eq('post_id', id)...,
  supabase.from('posts').select('...').eq('category', post.category)...,
]);
```

**Minimal column selection:** Server-side queries only select needed columns:
```typescript
.select('id, title, excerpt, photo_url, category, subcategory, created_at, view_count')
```

---

## Database Indexes

Key indexes on the `posts` table ensure query performance:

```sql
CREATE INDEX idx_posts_status ON posts(status);           -- WHERE status = 'published'
CREATE INDEX idx_posts_category ON posts(category);       -- WHERE category = ?
CREATE INDEX idx_posts_created_at ON posts(created_at DESC); -- ORDER BY created_at DESC
CREATE INDEX idx_comments_post_id ON comments(post_id);   -- WHERE post_id = ?
```

---

## Caching Headers

Next.js + Vercel automatically sets appropriate cache headers:
- SSG pages: `Cache-Control: public, max-age=31536000, immutable` with content-hash URLs for static assets
- ISR pages: served from edge cache with background revalidation
- Admin pages (`force-dynamic`): `Cache-Control: no-store`

---

## Build Optimization

The project requires special build settings due to the constrained build environment:

```typescript
// next.config.ts
process.env.NEXT_DISABLE_BUILD_WORKER = '1';

experimental: {
  workerThreads: false,
  cpus: 1,
},
```

And the build command:
```bash
NODE_OPTIONS="--max-old-space-size=6144" NEXT_DISABLE_BUILD_WORKER=1 npm run build
```

These settings limit memory usage during static generation to prevent OOM failures. They do not affect runtime performance.

---

## Core Web Vitals Strategy

| Metric | Strategy |
|---|---|
| **LCP** | `priority` on hero images, SSG/ISR HTML delivery, self-hosted fonts |
| **CLS** | Explicit width/height on images, `display: swap` fonts, no layout shifts |
| **INP** | Minimal client JS, Framer Motion animations are GPU-accelerated transforms |
| **TTFB** | Edge CDN serving pre-rendered pages, ISR cache hits |
| **FCP** | Pre-rendered HTML, no client-side waterfall for initial content |

---

## What NOT to Do

- Never add `export const dynamic = 'force-dynamic'` to public pages
- Never add `export const revalidate = 0` to public pages
- Never fetch data client-side on public pages that could be server-fetched
- Never import large libraries (Quill, chart libraries, etc.) in public page bundles
- Never use `useEffect` to fetch data that should be in the server component
