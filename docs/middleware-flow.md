# Middleware Flow

## Current Implementation

**File:** `middleware.ts` (project root)

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path+'],
};
```

The middleware **matches all `/admin/*` routes** but **performs no action** — it unconditionally calls `NextResponse.next()` which passes the request through to the page renderer unchanged.

---

## Why the Middleware Exists

The matcher configuration is intentional infrastructure: it ensures the middleware runs on admin routes without actually doing anything yet. This allows a future developer to add server-side auth checks in one place without touching any page files.

---

## What Happens at Each Step

```
Browser: GET /admin/dashboard
         │
1. Next.js Edge Runtime intercepts
   Matcher: '/admin/:path+' matches '/admin/dashboard' ✓
         │
2. middleware() executes
   → NextResponse.next()       (pass-through, no token check)
         │
3. Next.js routes to app/admin/layout.tsx
   export const dynamic = 'force-dynamic'
         │
4. app/admin/dashboard/page.tsx renders (server)
   → Returns shell HTML with <DashboardClient />
         │
5. Browser receives HTML, React hydrates
         │
6. DashboardClient.tsx useEffect fires
   → getSession() called
   → If no session: router.push('/admin')
   → If session: fetchDashboardData()
```

Authentication currently happens at **step 6** (client-side) rather than step 2 (server-side/middleware).

---

## Security Implications

| Aspect | Current State |
|---|---|
| Unauthenticated GET to `/admin/dashboard` | Returns HTML shell (no data) |
| Server renders admin HTML for unauthenticated users | Yes (SSR shell only) |
| Data visible to unauthenticated users | No — data is fetched client-side after auth check |
| Admin routes indexed by search engines | Effectively no — `robots.ts` disallows `/admin/` |
| Time-of-check vs time-of-use race condition | Minimal — session check is fast |

The practical risk is low because:
1. No sensitive data is embedded in the server-rendered HTML shell
2. All data fetching requires a valid Supabase session token
3. Supabase RLS enforces authentication at the database layer
4. The admin URL is not publicly listed

---

## Upgrading to Server-Side Auth (Recommended)

To add proper server-side route protection, replace the current pass-through with a session check using `@supabase/ssr`:

### Step 1: Install the package
```bash
npm install @supabase/ssr
```

### Step 2: Replace middleware.ts

```typescript
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (!session && !request.nextUrl.pathname.startsWith('/admin') === false) {
    // Allow /admin login page itself
    if (request.nextUrl.pathname !== '/admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path+'],
};
```

### Step 3: Update Supabase client setup

With `@supabase/ssr`, the server and client use different client factories:
- Server components / middleware: `createServerClient`
- Client components: `createBrowserClient`

This is a breaking change from the current `lib/supabase.ts` singleton — requires updating all server-side Supabase calls.

---

## Matcher Pattern Reference

The current matcher:
```typescript
matcher: ['/admin/:path+']
```

- `:path+` — matches one or more path segments after `/admin/`
- Does **not** match `/admin` itself (the login page) — login requires no auth check
- Matches: `/admin/dashboard`, `/admin/posts`, `/admin/posts/create`, `/admin/posts/edit/123`, etc.

To also protect `/admin` (the login page redirect), change to:
```typescript
matcher: ['/admin', '/admin/:path+']
```
