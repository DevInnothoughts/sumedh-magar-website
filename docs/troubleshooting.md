# Troubleshooting

## Common Issues and Resolutions

---

## Build Failures

### JavaScript heap out of memory

**Symptom:**
```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

**Cause:** Next.js static generation of 40+ pages exhausts the default Node.js memory limit.

**Fix:**
```bash
NODE_OPTIONS="--max-old-space-size=6144" NEXT_DISABLE_BUILD_WORKER=1 npm run build
```

Also ensure `next.config.ts` has:
```typescript
process.env.NEXT_DISABLE_BUILD_WORKER = '1';
experimental: { workerThreads: false, cpus: 1 }
```

---

### EAGAIN: resource temporarily unavailable, readdir

**Symptom:**
```
Error: EAGAIN: resource temporarily unavailable, readdir '...'
```

**Cause:** Transient filesystem contention in the build environment.

**Fix:** Retry the build. No code changes needed. This is an environment issue, not a code bug.

---

### Unescaped entities ESLint error

**Symptom:**
```
Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.
react/no-unescaped-entities
```

**Cause:** Apostrophes in JSX text nodes are not valid HTML entities.

**Fix:** Replace `'` with `&apos;` in JSX text content (not in attribute values, only in text nodes):

```tsx
// Wrong
<p>patient's recovery</p>

// Correct
<p>patient&apos;s recovery</p>
```

This only applies to text inside JSX tags, not inside string attributes:
```tsx
<Image alt="Patient's photo" />   // Fine — this is an attribute
```

---

### `@next/next/next-script-for-ga` ESLint warning

**Symptom:**
```
Warning: Do not use <script> tag directly in _document.js. Use next/script component.
```

**Fix:** Add an eslint-disable comment above the `<script>` tag in `app/layout.tsx`:
```tsx
{/* eslint-disable-next-line @next/next/next-script-for-ga */}
<script async src="https://www.googletagmanager.com/gtag/js?id=..." />
```

This is already handled in the codebase — don't remove these suppression comments.

---

## Runtime Issues

### Admin redirect loop

**Symptom:** Admin pages redirect back to `/admin` login immediately after logging in.

**Possible causes:**
1. Session not persisting (localStorage cleared)
2. Supabase URL or anon key misconfigured

**Debug steps:**
1. Open browser DevTools → Application → Local Storage → check for `sb-*` keys
2. Check browser console for Supabase auth errors
3. Verify environment variables are set correctly in Vercel

---

### Blog post detail shows 404

**Symptom:** `/blog/[id]` returns a 404 page.

**Possible causes:**
1. Post exists but has `status = 'draft'`
2. UUID in URL is wrong
3. ISR cache has stale data (post was deleted but cache not cleared)

**Debug:**
1. Check Supabase → Table Editor → posts → verify `id` and `status = 'published'`
2. Force ISR revalidation by triggering a redeploy

---

### Gallery images not loading

**Symptom:** Gallery page shows broken image icons or empty grid.

**Possible causes:**
1. Supabase Storage bucket `gallery_images` not created
2. Supabase hostname not in `next.config.ts` remotePatterns
3. Images were uploaded to wrong bucket

**Fix:**
1. Create `gallery_images` bucket in Supabase Dashboard → Storage with public access
2. Verify hostname in `next.config.ts`:
   ```typescript
   { protocol: 'https', hostname: 'ahgiycinebsxuuhavqrs.supabase.co' }
   ```

---

### Google Reviews not showing

**Symptom:** Homepage reviews section is empty or shows fallback reviews only.

**Possible causes:**
1. No reviews in `google_reviews` table (sync never run)
2. All reviews have `is_active = false`
3. `GOOGLE_PLACES_API_KEY` not configured in Supabase secrets

**Fix:**
1. Navigate to `/admin/google-reviews` and click "Sync Reviews"
2. If sync fails with API error: configure `GOOGLE_PLACES_API_KEY` in Supabase secrets
3. Check that synced reviews have `is_active = true`

---

### React Quill SSR Error

**Symptom:**
```
Error: document is not defined
```
or
```
ReferenceError: window is not defined
```

**Cause:** React Quill is imported without SSR-disabling.

**Fix:** Ensure the import in `PostEditorClient.tsx` uses dynamic import:
```typescript
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
```

The CSS import must be in the same file:
```typescript
import 'react-quill/dist/quill.snow.css';
```

---

### `next/image` Error: Invalid src

**Symptom:**
```
Error: Invalid src prop (...) on `next/image`, hostname "..." is not configured under images
```

**Cause:** An image from a new domain is used without whitelisting it.

**Fix:** Add the hostname to `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'new-domain.com' },
    // ... existing entries
  ],
},
```

Then rebuild and redeploy.

---

### Contact form submissions not appearing in admin

**Symptom:** Form submission shows success toast but data not visible in `/admin/contacts`.

**Possible causes:**
1. RLS policy blocking the INSERT
2. Supabase connection issue

**Debug:**
1. Open browser DevTools → Network → check the Supabase API call response
2. Check Supabase Dashboard → Logs → API logs for error details
3. Verify RLS policy "Anyone can submit contact forms" exists on `contacts` table

---

## Database Issues

### Migration fails

**Symptom:** `mcp__supabase__apply_migration` returns an error.

**Common causes and fixes:**
1. **Table already exists:** Use `CREATE TABLE IF NOT EXISTS`
2. **Column already exists:** Wrap in `DO $$ BEGIN IF NOT EXISTS ... END $$`
3. **Policy name conflict:** Check for existing policy with same name via Supabase Dashboard → Authentication → Policies
4. **Syntax error:** Test the SQL in Supabase Dashboard → SQL Editor first

---

### RLS blocking legitimate access

**Symptom:** Admin users cannot see data / public users cannot submit forms.

**Debug:**
1. Supabase Dashboard → Authentication → Policies → check policies on affected table
2. Check `TO public` vs `TO authenticated` — the former allows anonymous access
3. Test with Supabase SQL Editor using `SET ROLE anon;` to simulate public access

---

## TypeScript Errors

### Type mismatch with Supabase query result

**Symptom:**
```
Type 'null' is not assignable to type 'Post'
```

**Fix:** Always use `maybeSingle()` instead of `single()` when a missing row is valid:
```typescript
const { data } = await supabase.from('posts').select('*').eq('id', id).maybeSingle();
if (!data) notFound();
```

Use `data ?? []` for list queries:
```typescript
const { data: posts } = await supabase.from('posts').select('*');
const list = posts ?? [];
```

---

## Performance Issues

### Slow admin page loads

**Cause:** Admin pages are `force-dynamic` — they render on every request.

**This is expected behavior.** Admin performance can be improved by:
1. Adding indexes to frequently queried columns (already done for key columns)
2. Using `maybeSingle()` / select only needed columns
3. Parallelizing independent fetches with `Promise.all`

---

### Homepage shows stale blog posts

**Cause:** ISR cache hasn't revalidated yet (up to 5 minutes after publishing).

**Fix:** Force revalidation by triggering a Vercel redeploy or waiting for the next cache cycle.
