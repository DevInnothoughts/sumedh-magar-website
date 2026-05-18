# Auth Architecture

## Overview

Authentication uses Supabase Auth with email/password. There is a single admin user — no public registration. The admin panel is client-side-gated: each admin page component checks for a valid session on mount and redirects to `/admin` (login page) if none exists.

---

## Auth Flow

```
1. Admin navigates to /admin/dashboard
         │
2. middleware.ts matches /admin/:path+
   → NextResponse.next() (pass-through, no server check)
         │
3. Next.js renders the page (force-dynamic)
         │
4. DashboardClient.tsx mounts in browser
         │
5. useEffect fires:
   const session = await getSession();
   if (!session) router.push('/admin');
         │
6a. No session → redirected to /admin login page
         │
6b. Session valid → fetch dashboard data, render UI
```

---

## Key Files

| File | Purpose |
|---|---|
| `lib/supabase.ts` | Singleton Supabase browser client + TypeScript types |
| `lib/auth.ts` | Auth helper functions: signIn, signOut, getCurrentUser, getSession |
| `middleware.ts` | Route matcher for /admin paths — currently pass-through |
| `app/admin/page.tsx` | Login page (SSR shell) |
| `app/admin/LoginClient.tsx` | Login form (client component) |
| `app/admin/layout.tsx` | Sets `export const dynamic = 'force-dynamic'` |

---

## Supabase Client Setup

The browser client is a singleton in `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Import `supabase` from this module everywhere — never instantiate a second client.

---

## Auth Helper Functions — `lib/auth.ts`

```typescript
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};
```

All helpers throw on error — callers should wrap in try/catch and display toast notifications.

---

## Session Check Pattern

Every admin client component uses this identical guard at mount:

```typescript
// In each admin *Client.tsx component
useEffect(() => {
  const checkAuth = async () => {
    const session = await getSession();
    if (!session) {
      router.push('/admin');
      return;
    }
    // Authenticated — fetch data
    await fetchData();
  };
  checkAuth();
}, []);
```

The `router` is from `next/navigation` (`useRouter`). The redirect is client-side, not a server redirect.

---

## Login Page

**`app/admin/page.tsx`** — Server component shell that renders `LoginClient`.

**`app/admin/LoginClient.tsx`** — Client component:
- Uses `react-hook-form` for validation
- Calls `signIn(email, password)` from `lib/auth.ts`
- On success: `router.push('/admin/dashboard')`
- On failure: displays error toast via `react-toastify`

---

## Middleware — `middleware.ts`

The current middleware is a pass-through:

```typescript
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path+'],
};
```

The middleware **does not** validate sessions. All access control is enforced client-side. This means:

- Direct navigation to `/admin/dashboard` will briefly render a loading state before redirecting if unauthenticated
- Server-side rendering of admin pages occurs for unauthenticated users (they receive the HTML shell, not data)
- The admin UI is not SEO-indexed because all admin routes are `force-dynamic` and return no meaningful content to unauthenticated clients

> **Security Note:** This is acceptable for a low-traffic internal admin panel where the data is not highly sensitive. For stronger security, upgrade to a server-side session check in middleware using `@supabase/ssr`. See [future-recommendations.md](./future-recommendations.md) for the upgrade path.

---

## Creating the Admin User

There is no self-registration form. The admin user must be created via:

1. **Supabase Dashboard** → Authentication → Users → Invite or Add user
2. Or via the helper script: `scripts/create-admin.ts` / `scripts/create-admin-simple.ts`

Only one admin account is needed. Additional admins can be added the same way.

---

## Session Persistence

Supabase JS SDK stores the session in `localStorage` (browser). The session persists across page refreshes until:
- The user explicitly signs out via the admin sidebar
- The JWT expires (Supabase default: 1 hour access token, 7-day refresh token)
- The user clears browser storage

The SDK handles automatic token refresh using the refresh token.

---

## RLS Integration

Admin authentication unlocks additional database access via RLS policies:

- `TO authenticated` policies give read/write access to all rows (not just published/approved ones)
- The Supabase client automatically includes the JWT in all requests when a session exists
- Public routes use the anon key + anon role, which is subject to public-facing RLS policies only

---

## Signing Out

The admin sidebar includes a sign-out button that calls:

```typescript
await signOut();
router.push('/admin');
```

After sign-out, the Supabase client clears the session from localStorage and the next admin page navigation will redirect back to login.

---

## Security Considerations

| Risk | Current State | Recommendation |
|---|---|---|
| Unauthenticated access to admin HTML | Yes — client-rendered shell returned | Add server-side middleware check |
| Brute-force login | Mitigated by Supabase Auth rate limiting | Enable Supabase Auth protection settings |
| Session fixation | Not applicable — Supabase issues new session on sign-in | — |
| JWT exposure | Stored in localStorage, accessible to JS | Acceptable for SPA admin; upgrade to httpOnly cookies for higher security |
| Admin user enumeration | Not possible — no public sign-up | — |
