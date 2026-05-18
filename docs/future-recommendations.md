# Future Recommendations

## Overview

This document describes known technical debt, security improvements, and feature extensions worth considering. Items are grouped by priority and effort.

---

## High Priority

### 1. Server-Side Admin Authentication (Middleware Upgrade)

**Current state:** Middleware is a pass-through. Admin auth is client-side only.

**Problem:** Unauthenticated requests receive an HTML shell before being redirected. Sophisticated bots could probe admin structure.

**Solution:** Upgrade `middleware.ts` to validate sessions server-side using `@supabase/ssr`:

```bash
npm install @supabase/ssr
```

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookies) => { /* set on response */ },
    },
  });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session && request.nextUrl.pathname !== '/admin') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  return response;
}
```

**Effort:** 1–2 days. Requires updating all server-component Supabase clients to use `createServerClient` from `@supabase/ssr`.

---

### 2. Blog Post Slugs (SEO Improvement)

**Current state:** Blog post URLs are UUIDs: `/blog/a3f7b2c1-...`

**Problem:** UUID URLs are not descriptive, not memorable, and do not contribute keyword signals to URLs.

**Solution:**
1. Add `slug` column to `posts` table: `slug text UNIQUE`
2. Auto-generate slug from title on creation (slugify library or manual)
3. Add `generateStaticParams` to `/blog/[slug]/page.tsx` for SSG
4. 301-redirect old UUID URLs to slug URLs
5. Update sitemap to use slugs

**Effort:** 2–3 days. The redirect step is critical for SEO equity preservation.

---

### 3. Contact Form Notifications

**Current state:** Contact submissions are only visible in the admin panel.

**Problem:** High-value appointment requests may be missed if admin doesn't check daily.

**Solution:** Create a Supabase Edge Function triggered by a database webhook on `contacts` INSERT, sending an email notification via Resend or Sendgrid.

```typescript
// supabase/functions/notify-contact/index.ts
// Called via Supabase webhook on contacts table INSERT
```

**Effort:** 1 day.

---

## Medium Priority

### 4. On-Demand ISR Revalidation

**Current state:** Blog listings update within 5 minutes (ISR 300s window).

**Problem:** Publishing a post doesn't immediately show it to visitors.

**Solution:** Use Next.js on-demand revalidation via `revalidatePath` or `revalidateTag` in an API route, called from the admin panel after publishing:

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
export async function POST(req: Request) {
  // verify admin session
  revalidatePath('/blog');
  revalidatePath('/');
  return Response.json({ revalidated: true });
}
```

**Effort:** Half a day.

---

### 5. Human-Readable Article Schema

**Current state:** Blog posts use UUID as `articleId` in the Article JSON-LD schema.

**Solution:** Once slugs are implemented (recommendation #2), update the Article schema to use the slug URL as the `@id` and canonical URL.

---

### 6. Image Alt Text Audit

**Current state:** Some images use generic alt text.

**Solution:** Audit all `alt` props for descriptive, keyword-rich text. Alt text is an SEO and accessibility signal. Especially important for `/public/` static images used in treatment pages.

---

### 7. Comments Email Notification

**Current state:** Comments require manual admin approval checking.

**Solution:** Same as contact notifications — Edge Function triggered on new comment INSERT to notify admin.

---

## Lower Priority / Nice-to-Have

### 8. Testimonials CMS Integration

**Current state:** The `testimonials` table exists with approved/unapproved states, but testimonials shown on the homepage are not managed through this table — they may be hardcoded.

**Solution:** Wire the homepage testimonials section to read from the `testimonials` table (approved only), giving the admin full control through the CMS.

---

### 9. Blog Post Tags

**Current state:** Posts have category + subcategory but no free-form tags.

**Solution:** Add a `tags text[]` column to `posts`. Display tags on post detail pages. Create tag-based filtering on the blog listing.

---

### 10. Search Functionality

**Current state:** Blog listing has client-side search filtering (works only on the current page's loaded data).

**Solution:** For a large volume of posts, implement full-text search using Supabase's built-in PostgreSQL full-text search:

```sql
ALTER TABLE posts ADD COLUMN search_vector tsvector;
CREATE INDEX idx_posts_search ON posts USING gin(search_vector);
```

---

### 11. Analytics Integration

**Current state:** Google Ads tracking (`AW-17761397613`) is loaded. No analytics dashboard exists.

**Solution:** Add Google Analytics 4 (GA4) alongside the existing Ads tag, or switch to a privacy-respecting alternative (Plausible, Fathom). Track: page views, contact form conversions, appointment request conversions.

---

### 12. Appointment Booking System

**Current state:** "Book Appointment" CTAs link to the contact form.

**Solution:** Integrate a calendar booking tool (Calendly, Cal.com) embedded on the contact page for real-time slot selection. Cal.com has a self-hosted option.

---

### 13. Multi-Language Support

**Current state:** English only.

**Solution:** If Marathi or Hindi patient audience becomes important, use Next.js internationalized routing (`i18n` config) with separate `app/[locale]/` route group.

---

## Technical Debt

### 14. VITE_ Environment Variables

**Issue:** `.env` contains unused `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables from the original Vite setup.

**Fix:** Remove them from `.env` and `.env.local`. Harmless but confusing to new developers.

---

### 15. Admin Auth Duplication

**Issue:** Every admin `*Client.tsx` repeats the same `getSession()` check in `useEffect`.

**Fix:** Create a custom `useAdminAuth` hook that handles the check and redirect, then use it in each admin component:

```typescript
// hooks/useAdminAuth.ts
export function useAdminAuth() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    getSession().then(session => {
      if (!session) router.push('/admin');
      else setReady(true);
    });
  }, [router]);
  return ready;
}
```

---

### 16. Error Boundary

**Issue:** No React error boundaries are configured. An error in a client component will crash the entire page.

**Fix:** Add an `error.tsx` file in `app/(public)/` and `app/admin/` to catch rendering errors gracefully.

---

### 17. TypeScript Strict Mode

**Issue:** Some Supabase query results use non-strict type handling (e.g., `as Post`).

**Fix:** Generate types directly from the Supabase schema using:
```bash
npx supabase gen types typescript --project-id ahgiycinebsxuuhavqrs
```

Replace the manual types in `lib/supabase.ts` with the generated types for full type safety.
