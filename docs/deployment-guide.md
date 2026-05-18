# Deployment Guide

## Overview

The application is deployed on **Vercel** connected to a **Supabase** backend. The production domain is `https://sportsurgeon.in`. Deployments are triggered by pushing to the connected Git repository.

---

## Prerequisites

- Vercel account with the project connected to the Git repository
- Supabase project at `https://ahgiycinebsxuuhavqrs.supabase.co`
- Domain `sportsurgeon.in` configured in Vercel DNS settings

---

## Environment Variables

Set in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value Source | Environment |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API | All |

Apply to Production, Preview, and Development environments. See [environment-variables.md](./environment-variables.md) for details.

---

## Build Command

The standard build command in Vercel should be set to:

```bash
NEXT_DISABLE_BUILD_WORKER=1 npm run build
```

Or using the `package.json` script which already includes the flag:
```json
"build": "NEXT_DISABLE_BUILD_WORKER=1 next build"
```

For environments with memory constraints:
```bash
NODE_OPTIONS="--max-old-space-size=6144" NEXT_DISABLE_BUILD_WORKER=1 npm run build
```

The `NEXT_DISABLE_BUILD_WORKER=1` flag is also set programmatically in `next.config.ts`:
```typescript
process.env.NEXT_DISABLE_BUILD_WORKER = '1';
```

This prevents the parallel build worker from spawning, which can cause out-of-memory failures during static generation of 41+ pages.

---

## Build Output

A successful production build generates:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    ...
├ ○ /about                               ...
├ ○ /blog                                ...
├ ○ /blog/[id]                           ...
├ ○ /treatments                          ...
├ ○ /treatments/acl-tear-treatment-pune  ...
...
├ ○ /admin                               ...
...
Total: 41 routes
```

All public routes are pre-rendered (○ = static). Admin routes are server-rendered (λ = dynamic).

---

## Deployment Steps

### Standard Deployment (auto)

1. Push changes to the connected Git branch (typically `main`)
2. Vercel detects the push, triggers a build
3. Build runs `npm run build`
4. On success: deployed to production
5. On failure: previous version stays live, build log available in Vercel dashboard

### Manual Deployment

In Vercel Dashboard:
1. Deployments → "Redeploy" on the latest deployment
2. Or: trigger via Vercel CLI: `vercel --prod`

---

## Database Migrations

Database changes must be applied separately from code deployments:

1. Write the migration SQL with the required comments format (see [database-structure.md](./database-structure.md))
2. Use the `mcp__supabase__apply_migration` tool to apply it
3. Verify in Supabase Dashboard → Table Editor that the change took effect
4. Deploy the code that depends on the new schema

> **Order matters:** Apply schema migrations BEFORE deploying code that uses new columns/tables. Rollback order is the reverse.

---

## Edge Functions

Edge Functions are deployed separately from the Next.js application:

1. Read current function: `supabase/functions/[function-name]/index.ts`
2. Deploy using `mcp__supabase__deploy_edge_function` tool
3. Verify in Supabase Dashboard → Edge Functions

The `fetch-google-reviews` function is already deployed. To update it:
1. Modify `supabase/functions/fetch-google-reviews/index.ts`
2. Redeploy using the MCP tool

---

## Vercel Configuration

### Framework

- Framework: Next.js
- Node.js version: 20.x (or latest LTS)
- Build command: `NEXT_DISABLE_BUILD_WORKER=1 npm run build`
- Output directory: `.next` (auto-detected)
- Install command: `npm install`

### Domain Configuration

- Primary domain: `sportsurgeon.in`
- www redirect: `www.sportsurgeon.in` → `sportsurgeon.in` (301)
- SSL: Auto-managed by Vercel

### Redirects

Configured in `next.config.ts` (not Vercel config):
- `/articles` → `/blog` (301)
- `/articles/:id` → `/blog/:id` (301)

---

## Post-Deployment Checklist

After any significant deployment:

- [ ] Homepage loads and renders blog posts + reviews
- [ ] A blog post detail page renders correctly
- [ ] Contact form submits successfully (check Supabase → contacts table)
- [ ] Admin login works at `/admin`
- [ ] Admin can create/edit/publish a post
- [ ] Gallery page loads images
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] A treatment page renders with JSON-LD (check with browser DevTools → Sources)
- [ ] 301 redirects work: `/articles` should redirect to `/blog`

---

## ISR Cache Invalidation

After publishing a new blog post, the public `/blog` listing and homepage may show stale data for up to 5 minutes (ISR revalidate window). To force immediate cache invalidation in Vercel:

1. Vercel Dashboard → Project → Deployments
2. Click "..." on the latest deployment → "Invalidate Cache" (if available)
3. Or trigger a redeploy

Alternatively, the cache will update naturally within 5 minutes of the next visitor request.

---

## Rollback

If a deployment causes issues:
1. Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"

This instantly reverts the live site to the selected deployment.

---

## Monitoring

- **Build logs:** Vercel Dashboard → Deployments → click any deployment
- **Runtime errors:** Vercel Dashboard → Logs (real-time log streaming)
- **Database:** Supabase Dashboard → Table Editor, Auth, and Logs
- **Edge Functions:** Supabase Dashboard → Edge Functions → Logs
