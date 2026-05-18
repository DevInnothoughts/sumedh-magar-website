# SEO Architecture

## Overview

The site is built for aggressive local SEO targeting patients searching for orthopedic and sports medicine care in Pune. The strategy layers technical SEO (structured data, sitemaps, canonical URLs) on top of topical authority content (treatments, conditions, sport-specific injury pages, local area pages).

---

## Metadata Strategy

### Root Metadata — `app/layout.tsx`

The root layout defines site-wide defaults via Next.js Metadata API:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://sportsurgeon.in'),
  title: {
    default: 'Dr. Sumedh Magar – Sports Orthopedic Surgeon | I-Sport Medical Centre Pune',
    template: '%s | Dr. Sumedh Magar',  // ← all pages append this suffix
  },
  description: 'Dr. Sumedh Magar – MS Orthopaedics, Masters in Sports Medicine (UCL, UK), ISAKOS Fellowship...',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: { type: 'website', locale: 'en_IN', ... },
  twitter: { card: 'summary_large_image', ... },
};
```

Every page-level `export const metadata` **overrides** the default title and **extends** the template. Missing `alternates.canonical` on a page falls back to the page URL.

### Per-Page Metadata Pattern

All public pages follow this consistent pattern:

```typescript
export const metadata: Metadata = {
  title: 'Page-Specific Title',          // rendered as "Page Title | Dr. Sumedh Magar"
  description: 'Page-specific description under 160 chars',
  alternates: { canonical: `${SITE_URL}/path` },
  keywords: ['keyword 1', 'keyword 2'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/path`,
    title: 'OG Title',
    description: 'OG description',
    images: [{ url: `${SITE_URL}/image.jpg`, width: 1200, height: 630, alt: '...' }],
  },
};
```

### Dynamic Metadata — Blog Posts

Blog post pages use `generateMetadata` (async server function) to build per-post metadata from the database:

```typescript
// app/(public)/blog/[id]/page.tsx
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data: post } = await supabase.from('posts').select('...').eq('id', params.id).maybeSingle();
  return {
    title: post?.title ?? 'Article',
    description: post?.excerpt ?? '',
    openGraph: { images: [{ url: post?.photo_url ?? '' }] },
  };
}
```

---

## Structured Data (JSON-LD)

### Root Schema — `app/layout.tsx`

The root layout injects a `MedicalOrganization` + nested `Physician` schema on every page:

```json
{
  "@type": "MedicalOrganization",
  "name": "I-SPORT Medical Centre",
  "medicalSpecialty": ["OrthopedicSurgery", "SportsMedicine"],
  "geo": { "latitude": 18.5786803, "longitude": 73.7682788 },
  "employee": {
    "@type": "Physician",
    "name": "Dr. Sumedh Magar",
    "alumniOf": "University College London (UCL)",
    "memberOf": "ISAKOS"
  }
}
```

### Page-Level Schemas

| Schema Type | Pages |
|---|---|
| `FAQPage` | All treatment pages, conditions, locations, blog posts |
| `BreadcrumbList` | All treatment, conditions, locations, sports-injury pages |
| `Physician` | `/orthopedic-surgeon-pune` |
| `LocalBusiness` + `MedicalClinic` | `/locations/[area]` pages |
| `Article` | `/blog/[id]` posts |

### FAQ Schema Pattern

Used on all SEO content pages. Defined inline in the page file:

```typescript
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};
// Injected via:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
```

### BreadcrumbList Schema Pattern

```typescript
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Treatments', item: `${SITE_URL}/treatments` },
    { '@type': 'ListItem', position: 3, name: 'ACL Treatment', item: `${SITE_URL}/treatments/acl-tear-treatment-pune` },
  ],
};
```

### LocalBusiness Schema (Location Pages)

Each `/locations/[area]` page injects a `LocalBusiness`/`MedicalClinic` schema specific to that suburb, with `areaServed` set to the neighborhood. This helps Google associate the practice with specific Pune localities.

---

## Canonical URL Strategy

- **Root**: `metadataBase` in root layout provides the base for all relative paths
- **Per-page**: Every public page sets `alternates: { canonical: '${SITE_URL}/path' }` explicitly
- **Blog posts**: `generateMetadata` sets canonical to `/blog/${post.id}`
- **Redirects**: `/articles` → `/blog` and `/articles/:id` → `/blog/:id` are permanent 301s in `next.config.ts`, which pass link equity to the new `/blog` paths

---

## Sitemap — `app/sitemap.ts`

The sitemap generates at `/sitemap.xml` with ISR revalidation every 3600 seconds (1 hour).

**Static routes included (30+):**
- Homepage, About, Expertise, Sports Medicine, Research
- `/orthopedic-surgeon-pune` (priority 0.95)
- 6 treatment sub-pages (priority 0.9)
- 4 sports-injury sub-pages (priority 0.8)
- 5 condition pages (priority 0.75)
- 4 location pages (priority 0.8)
- Gallery, Contact, Blog
- Legal pages (priority 0.3)

**Dynamic blog routes:**
```typescript
const { data: posts } = await supabase
  .from('posts')
  .select('id, updated_at')
  .eq('status', 'published');

const blogRoutes = posts.map(post => ({
  url: `${SITE_URL}/blog/${post.id}`,
  lastModified: new Date(post.updated_at),
  changeFrequency: 'weekly',
  priority: 0.75,
}));
```

On database error, the function gracefully falls back to static routes only.

---

## Robots.txt — `app/robots.ts`

The static `/robots.txt` is generated at build time. Admin routes are disallowed:

```
User-agent: *
Disallow: /admin/
Allow: /
Sitemap: https://sportsurgeon.in/sitemap.xml
```

---

## Local SEO Content Strategy

### Location Pages — `/locations/[area]`

Four suburb-specific pages targeting high-intent local queries:

| Slug | Target Keywords |
|---|---|
| `orthopedic-doctor-balewadi` | orthopedic doctor Balewadi, sports injury Balewadi |
| `orthopedic-doctor-baner` | orthopedic surgeon Baner Pune |
| `sports-injury-doctor-wakad` | knee specialist Wakad, sports injury Wakad |
| `orthopedic-surgeon-hinjewadi` | orthopedic doctor Hinjewadi |

Each page includes: LocalBusiness JSON-LD, area-specific H1, distance/travel context, services grid with links to treatment pages, and a CTA to the contact page.

### Treatment Pages — `/treatments/*`

Six procedure-specific pages targeting clinical queries:

| Path | Primary Keyword |
|---|---|
| `/treatments/acl-tear-treatment-pune` | ACL tear treatment Pune |
| `/treatments/knee-arthroscopy-pune` | knee arthroscopy Pune |
| `/treatments/shoulder-arthroscopy-pune` | shoulder arthroscopy Pune |
| `/treatments/meniscus-tear-treatment-pune` | meniscus tear treatment Pune |
| `/treatments/knee-pain-treatment-pune` | knee pain treatment Pune |
| `/treatments/sports-rehabilitation-pune` | sports rehabilitation Pune |

### Condition Pages — `/conditions/[slug]`

Five clinical condition pages targeting informational queries:
- `arthritis`, `ligament-injuries`, `tendon-injuries`, `cartilage-injuries`, `shoulder-instability`

### Major SEO Landing Page — `/orthopedic-surgeon-pune`

The highest-priority non-homepage page (sitemap priority 0.95). Targets the query "orthopedic surgeon Pune" with:
- Credentials banner (MS Ortho, UCL Masters, ISAKOS Fellowship, Khelo India)
- Physician JSON-LD with detailed qualifications
- FAQPage schema with 5 high-intent questions
- Full procedures grid linking to treatment pages
- Areas-served section linking to all 4 location pages

---

## Google Tag Manager

Google Ads conversion tracking (`AW-17761397613`) is loaded in `app/layout.tsx`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17761397613" />
```

This fires on every page as part of the root layout. The implementation uses direct gtag rather than GTM container.

---

## Redirect Strategy

Defined in `next.config.ts`:

```typescript
async redirects() {
  return [
    { source: '/articles', destination: '/blog', permanent: true },
    { source: '/articles/:id', destination: '/blog/:id', permanent: true },
  ];
}
```

These 301 redirects ensure any external backlinks or bookmarks pointing to old `/articles` URLs pass SEO equity to `/blog`.

---

## Key SEO Rules for Future Edits

1. **Never change the canonical URL** of an existing page — creates duplicate content
2. **Use `permanent: true`** for all redirects of content that moved permanently
3. **Every new public page** must have `alternates: { canonical: ... }` set explicitly
4. **Never use `USING (true)`** in RLS without understanding what data becomes public — google can index leaked data
5. **Blog post IDs are UUIDs** — not human-readable slugs. If slugs are added later, 301-redirect old UUIDs
6. **JSON-LD must be valid** — test at https://validator.schema.org before deploying schema changes
