# Environment Variables

## Overview

The project uses two sets of environment variables:
1. **`.env` / `.env.local`** — Local development variables
2. **Vercel environment variables** — Production/preview deployment variables
3. **Supabase Edge Function secrets** — Server-side only, for Edge Functions

---

## Required Variables

### `NEXT_PUBLIC_SUPABASE_URL`

**Type:** URL string  
**Example:** `https://ahgiycinebsxuuhavqrs.supabase.co`  
**Exposed to browser:** Yes (`NEXT_PUBLIC_` prefix)  
**Used in:** `lib/supabase.ts`, `services/googleReviewsService.ts`, server component inline clients, `app/sitemap.ts`

The base URL for all Supabase API calls. Find this in Supabase Dashboard → Settings → API → Project URL.

---

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Type:** JWT string  
**Exposed to browser:** Yes (`NEXT_PUBLIC_` prefix)  
**Used in:** `lib/supabase.ts`, all Supabase client instantiations

The anonymous public key for Supabase. Safe to expose publicly — security is enforced by RLS policies. Find in Supabase Dashboard → Settings → API → Project API keys → `anon public`.

> **Important:** This key grants access only to what RLS policies allow for anonymous users. It does NOT grant admin access.

---

## Optional Variables (Edge Functions Only)

### `GOOGLE_PLACES_API_KEY`

**Type:** String  
**Exposed to browser:** No (Supabase secret only)  
**Used in:** `supabase/functions/fetch-google-reviews/index.ts` via `Deno.env.get('GOOGLE_PLACES_API_KEY')`

The Google Cloud API key with Places API enabled. Required for syncing Google Reviews. Set this as a Supabase Edge Function secret (not in `.env`).

**How to set:**
1. Supabase Dashboard → Settings → Edge Functions → Secrets
2. Add: `GOOGLE_PLACES_API_KEY` = your key value

---

## Legacy Variables (Unused)

### `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

Present in the `.env` file as a remnant of the original Vite project setup. These are not used by the Next.js application but are harmless. Do not use them in new code — use the `NEXT_PUBLIC_` variants.

---

## Local Development Setup

Create a `.env.local` file (git-ignored) for local development:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://ahgiycinebsxuuhavqrs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

`.env.local` takes precedence over `.env` in Next.js. The `.env` file in the repository has the actual values but should ideally be `.env.example` with placeholder values in a new project setup.

---

## Vercel Environment Variables Setup

In the Vercel project dashboard:
1. Settings → Environment Variables
2. Add both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Set them for all environments: Production, Preview, Development
4. Redeploy after adding variables

---

## Security Notes

| Variable | Public? | Risk if leaked |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | None — it's the project endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Low — RLS limits what anonymous users can do |
| `GOOGLE_PLACES_API_KEY` | No (Supabase secret) | High — Google billing charges if misused |

The `NEXT_PUBLIC_` prefix means these values are embedded in client-side JavaScript bundles. Anyone can read them with browser DevTools. This is intentional — Supabase is designed this way, with row-level security as the protection layer.

Never prefix sensitive credentials (service role keys, payment keys, API keys with write access) with `NEXT_PUBLIC_`.

---

## Supabase Service Role Key

**NOT currently used in this project.** The service role key bypasses RLS entirely and should only be used in fully server-side, non-browser environments (like migration scripts or background jobs). If added in future, store it only in Supabase Edge Function secrets or Vercel server-side env vars — never with the `NEXT_PUBLIC_` prefix.
