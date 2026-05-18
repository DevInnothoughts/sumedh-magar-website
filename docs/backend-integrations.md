# Backend Integrations

## Overview

The project integrates with two backend services: **Supabase** (database, auth, storage, edge functions) and **Google Places API** (for fetching Google Reviews). All external API calls are proxied through Supabase Edge Functions to keep API keys server-side.

---

## Supabase

### Connection

Browser client singleton in `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

Server components (ISR pages, sitemap) instantiate an inline client:
```typescript
const supabase = createClient(url, key);
```

The anon key is public (exposed in NEXT_PUBLIC vars) — security is enforced entirely by RLS policies.

### Services Used

| Service | Purpose |
|---|---|
| PostgreSQL (via PostgREST) | All data reads and writes |
| Supabase Auth | Admin email/password login, session management |
| Supabase Storage | Image and video file uploads |
| Edge Functions | Google Places API proxy |

---

## Google Reviews Integration

### Architecture

```
Admin Panel
    │
    ▼
services/googleReviewsService.ts
    │
    ├── fetchGoogleReviews()
    │       │
    │       ▼
    │   Supabase Edge Function: fetch-google-reviews
    │       │
    │       ▼
    │   Google Places API (Place Details)
    │       │
    │       ▼
    │   Returns raw reviews array
    │
    ├── syncReviewsToDatabase(reviews)
    │       │
    │       ▼
    │   supabase.from('google_reviews').upsert(...)
    │
    └── getTopRatedReviews() / getReviewsFromDatabase()
            │
            ▼
        Direct Supabase query (no Edge Function needed)
```

### Edge Function — `fetch-google-reviews`

**File:** `supabase/functions/fetch-google-reviews/index.ts`

**Endpoint:** `${SUPABASE_URL}/functions/v1/fetch-google-reviews`

**Purpose:** Proxies the Google Places API call server-side so the `GOOGLE_PLACES_API_KEY` is never exposed in the browser.

**Configuration:**
- Google Place ID: `ChIJnRFz6t2_wjsRhGLNLFJfKBs` (I-SPORT Medical Centre)
- API key: stored as Supabase secret `GOOGLE_PLACES_API_KEY`
- Fields requested: `reviews` only (to minimize Places API billing)

**Request:**
```
GET https://maps.googleapis.com/maps/api/place/details/json
  ?place_id=ChIJnRFz6t2_wjsRhGLNLFJfKBs
  &fields=reviews
  &key={GOOGLE_PLACES_API_KEY}
```

**Response (success):**
```json
{
  "reviews": [...],
  "count": 5
}
```

**Error handling:** Returns descriptive error messages for billing not enabled, invalid API key, invalid Place ID, and zero results.

**Authentication:** The Edge Function requires a valid Supabase Bearer token (admin session). Called from `services/googleReviewsService.ts`:

```typescript
const response = await fetch(`${supabaseUrl}/functions/v1/fetch-google-reviews`, {
  headers: {
    Authorization: `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
  },
});
```

### Google Reviews Service — `services/googleReviewsService.ts`

All Google Reviews logic is centralized here. Import from this service — don't call the Edge Function or Supabase directly for reviews.

| Function | Purpose |
|---|---|
| `fetchGoogleReviews()` | Calls Edge Function to get live reviews from Google |
| `syncReviewsToDatabase(reviews)` | Upserts fetched reviews into `google_reviews` table |
| `getReviewsFromDatabase()` | Gets all active reviews from DB (no API call) |
| `getTopRatedReviews(limit)` | Gets featured or 4+ star reviews for homepage display |
| `toggleReviewFeatured(id, bool)` | Pins/unpins a review on the homepage |
| `toggleReviewActive(id, bool)` | Shows/hides a review |
| `deleteReview(id)` | Permanently removes a review from DB |
| `getFallbackReviews()` | Returns 4 hardcoded reviews when DB is empty or unavailable |

**Upsert deduplication key:** `google_review_id` is set as `${author_name}_${review.time}` since the Google Places API response does not include a stable review ID.

**Auto-feature logic:** Reviews with rating >= 5 are automatically set to `is_featured: true` when synced. Admins can override this manually.

**Fallback reviews:** If the database has no reviews (e.g., first deployment before sync), `getFallbackReviews()` returns 4 hardcoded patient testimonials to avoid an empty section.

### Setting Up Google Reviews

1. Enable the **Places API** in [Google Cloud Console](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)
2. Create an API key with **Places API** enabled
3. Add the key as a Supabase secret: `GOOGLE_PLACES_API_KEY`
4. In the admin panel: navigate to `/admin/google-reviews` → click "Sync Reviews"
5. Fetched reviews appear in the table; toggle `is_featured` for homepage display

---

## Supabase Storage

Used for image and video uploads in the admin panel.

### Buckets

| Bucket | Access | Used For |
|---|---|---|
| `gallery_images` | Public read, authenticated write | Gallery page photos |
| *(general media bucket)* | Public read, authenticated write | Blog post images and videos |

### Upload Pattern (via ImageUpload component)

```typescript
// Upload file
const { data, error } = await supabase.storage
  .from('gallery_images')
  .upload(`${Date.now()}-${file.name}`, file, {
    contentType: file.type,
    upsert: false,
  });

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('gallery_images')
  .getPublicUrl(data.path);
```

The public URL is then stored in the database (`gallery.image_url` or `posts.photo_url`).

### Image URL Domains

`next.config.ts` whitelists all remote image domains for `next/image` optimization:

```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.pexels.com' },
    { protocol: 'https', hostname: 'ahgiycinebsxuuhavqrs.supabase.co' },  // ← Supabase project
    { protocol: 'https', hostname: 'lh3.googleusercontent.com' },          // ← Google reviewer photos
    { protocol: 'https', hostname: 'maps.googleapis.com' },
  ],
},
```

If the Supabase project hostname changes (e.g., after migration), update `ahgiycinebsxuuhavqrs.supabase.co` here.

---

## Google Tag Manager / Analytics

Google Ads conversion tracking is loaded in `app/layout.tsx`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17761397613" />
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-17761397613');
</script>
```

Tracking ID: `AW-17761397613`. To change or add additional tags (GA4, etc.), modify the `app/layout.tsx` root layout `<head>` block.

---

## Deploying Edge Functions

To update or redeploy the `fetch-google-reviews` Edge Function:

1. Read the current function code from `supabase/functions/fetch-google-reviews/index.ts`
2. Use the `mcp__supabase__deploy_edge_function` tool
3. Do NOT use the Supabase CLI — it is not supported in this environment

To add a new secret (API key):
1. Go to Supabase Dashboard → Settings → Edge Functions → Secrets
2. Add the key name and value
3. Access it in the Edge Function via `Deno.env.get('SECRET_NAME')`
