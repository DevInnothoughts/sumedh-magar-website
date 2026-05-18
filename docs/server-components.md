# Server Components

## Overview

Next.js 15 App Router treats all components as React Server Components (RSC) by default. This project uses server components strategically for public pages to maximize SEO performance and minimize client-side JavaScript. Admin pages are force-dynamic but still use thin server component shells that render client components.

---

## Rendering Strategy Summary

| Route | Mode | Server Fetches | Notes |
|---|---|---|---|
| `/` | ISR 300s | posts, google_reviews | Homepage data |
| `/blog` | ISR 300s | published posts | Listing |
| `/blog/[id]` | ISR 300s | post + comments + related | Detail |
| `/about` | SSG | none | Static content |
| `/expertise` | SSG | none | Static content |
| `/sports-medicine` | SSG | none | Static content |
| `/treatments/*` | SSG | none | All 7 pages |
| `/sports-injuries/*` | SSG | none | All 5 pages |
| `/conditions/[slug]` | SSG | none | generateStaticParams |
| `/locations/[area]` | SSG | none | generateStaticParams |
| `/orthopedic-surgeon-pune` | SSG | none | Static SEO page |
| `/gallery` | SSG | none | Client-side load after hydration |
| `/contact` | SSG | none | Client-side form only |
| `/admin/*` | force-dynamic | none (client fetches) | Admin is CSR |
| `/sitemap.xml` | ISR 3600s | post ids | Dynamic sitemap |

---

## ISR Pattern

Pages with database-driven content use ISR with `export const revalidate`:

```typescript
// app/(public)/blog/page.tsx
export const revalidate = 300; // 5 minutes

export default async function BlogPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, excerpt, photo_url, category, subcategory, created_at, view_count')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  return <BlogClient posts={posts ?? []} />;
}
```

The server component fetches, serializes data, and passes it as a plain prop to the client component. No loading spinners — the page renders with data already present.

---

## SSG with generateStaticParams

Pages with a small, known set of dynamic segments use `generateStaticParams` for full build-time generation:

```typescript
// app/(public)/conditions/[slug]/page.tsx
export function generateStaticParams() {
  return Object.keys(CONDITIONS).map((slug) => ({ slug }));
}

// app/(public)/locations/[area]/page.tsx
export function generateStaticParams() {
  return Object.keys(AREAS).map((area) => ({ area }));
}
```

These pages have zero database dependency — all content is hardcoded in the page file in a typed object. `generateStaticParams` simply extracts the keys and pre-builds each one at build time.

---

## generateMetadata

Dynamic metadata for blog posts is generated server-side:

```typescript
// app/(public)/blog/[id]/page.tsx
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const supabase = createClient(url, key);
  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt, photo_url')
    .eq('id', params.id)
    .maybeSingle();

  return {
    title: post?.title ?? 'Article',
    description: post?.excerpt ?? '',
    openGraph: {
      images: post?.photo_url ? [{ url: post.photo_url }] : [],
    },
  };
}
```

This runs server-side and populates the `<head>` with correct per-post metadata before HTML is sent to the browser.

---

## Server Component Data Passing Pattern

The standard pattern across all ISR pages:

```
Server Component (page.tsx)
  ├── Fetches data from Supabase
  ├── Handles notFound() for missing records
  ├── Renders JSON-LD script tags
  ├── Renders metadata (via export const metadata or generateMetadata)
  └── Returns <ClientComponent data={serverData} />

Client Component (*Client.tsx)
  ├── Receives pre-fetched data as props
  ├── Adds interactivity (forms, filters, animations)
  └── May make additional client-side calls (view count, comment submit)
```

---

## notFound() Pattern

Blog detail pages call `notFound()` when the post doesn't exist or isn't published:

```typescript
const { data: post } = await supabase
  .from('posts')
  .select('*')
  .eq('id', params.id)
  .eq('status', 'published')
  .maybeSingle();

if (!post) notFound(); // renders app/not-found.tsx
```

`maybeSingle()` returns `data: null` without error when no rows match. `single()` would throw — never use `single()` when zero rows is a valid case.

---

## Supabase Client in Server Components

Server components instantiate a fresh Supabase client inline (not the `lib/supabase.ts` singleton which is browser-only):

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

This uses the public anon key, which is subject to RLS policies. Only publicly accessible data (published posts, approved comments, active reviews) is readable.

> **Note:** The project does not currently use `@supabase/ssr` for server-side auth token forwarding. Admin authentication is fully client-side. If server-side admin operations are added in future, migrate to `@supabase/ssr`.

---

## JSON-LD in Server Components

Structured data is rendered as `<script>` tags in the server component output, ensuring it appears in the initial HTML:

```typescript
export default function TreatmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Page content */}
    </>
  );
}
```

JSON-LD objects are defined as plain TypeScript objects at the top of each page file, not imported from a shared module.

---

## force-dynamic — Admin Layout

```typescript
// app/admin/layout.tsx
export const dynamic = 'force-dynamic';
```

This single export in the admin layout propagates to all child routes in `app/admin/`, preventing any caching of admin pages. Necessary because admin pages show live data and auth state that must never be stale.

---

## Sitemap Server Component

`app/sitemap.ts` is a special Next.js route handler that returns a `MetadataRoute.Sitemap` array. It runs server-side with ISR:

```typescript
export const revalidate = 3600; // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // static routes array
  // + dynamic blog routes from Supabase
  // fallback to static-only on DB error
}
```
