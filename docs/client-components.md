# Client Components

## Overview

Client components are marked with `'use client'` at the top of the file. They run in the browser and have access to React hooks, browser APIs, and event handlers. This project follows the pattern of keeping server components as thin data-fetching shells and pushing all interactivity into client components.

---

## When to Use Client Components

Use `'use client'` when a component needs:
- React state (`useState`, `useReducer`)
- Side effects (`useEffect`)
- Browser APIs (`window`, `navigator`, `localStorage`)
- Event handlers that run in response to user interaction
- Animation with Framer Motion (requires browser context)
- Third-party libraries that rely on browser globals (React Quill, React Toastify)

---

## All Client Components

### Public Pages

| File | Purpose | Key Hooks/APIs |
|---|---|---|
| `app/(public)/HomeClient.tsx` | Homepage hero, blog preview, testimonials, reviews | Framer Motion, Supabase reads |
| `app/(public)/blog/BlogClient.tsx` | Blog listing with search and category filter | useState (search, filter), Framer Motion |
| `app/(public)/blog/[id]/BlogDetailClient.tsx` | Post content, comments, related posts | useForm, supabase.rpc, navigator.share |
| `app/(public)/about/AboutClient.tsx` | About page with timeline/credentials | Framer Motion |
| `app/(public)/expertise/ExpertiseClient.tsx` | Expertise cards | Framer Motion |
| `app/(public)/gallery/GalleryClient.tsx` | Gallery grid with category filter | useState (category), Supabase reads |
| `app/(public)/contact/ContactClient.tsx` | Contact + appointment forms | useForm, Supabase insert |
| `app/(public)/sports-medicine/SportsMedicineClient.tsx` | Sports medicine content | Framer Motion |
| `app/(public)/research/ResearchClient.tsx` | Research publications listing | Framer Motion |

### Admin Pages

| File | Purpose | Key Hooks/APIs |
|---|---|---|
| `app/admin/LoginClient.tsx` | Admin login form | useForm, signIn, router.push |
| `app/admin/dashboard/DashboardClient.tsx` | Stats overview | getSession, Supabase reads |
| `app/admin/posts/PostsClient.tsx` | Post list, publish toggle, delete | getSession, Supabase CRUD |
| `app/admin/posts/PostEditorClient.tsx` | Create/edit post form with Quill | useForm, React Quill, ImageUpload |
| `app/admin/comments/CommentsClient.tsx` | Comment moderation | getSession, Supabase reads + update |
| `app/admin/contacts/ContactsClient.tsx` | Contact inquiry list | getSession, Supabase reads |
| `app/admin/gallery/GalleryClient.tsx` | Gallery image management | getSession, Supabase CRUD, ImageUpload |
| `app/admin/media/MediaClient.tsx` | Media library browser | getSession, Supabase CRUD |
| `app/admin/google-reviews/GoogleReviewsClient.tsx` | Google Reviews management | getSession, Supabase reads + update |

### Shared Components

| File | Purpose |
|---|---|
| `components/Header.tsx` | Navigation with dropdown menus and mobile accordion |
| `components/Footer.tsx` | Footer with links |
| `components/AdminLayout.tsx` | Admin sidebar navigation |
| `components/ImageUpload.tsx` | Image upload to Supabase Storage |
| `components/VideoUpload.tsx` | Video upload or YouTube URL input |
| `components/HeroCarousel.tsx` | Homepage hero image carousel |

---

## Key Component Details

### Header — `components/Header.tsx`

- Fixed position, transitions from semi-transparent to solid white on scroll (`scrolled` state)
- Desktop: horizontal nav with Framer Motion `AnimatePresence` dropdown menus
- Mobile: hamburger menu with accordion-style expansion for dropdown items
- `useRef` + click-outside listener to close dropdowns when clicking elsewhere
- `usePathname` for active state detection: exact match for leaf links, `startsWith` for parent dropdown items
- Dropdown state: `openDropdown` (desktop) and `expandedMobile` (mobile) are separate states
- Closes all menus on pathname change (route navigation)

### AdminLayout — `components/AdminLayout.tsx`

- Used inside every admin `*Client.tsx` component (not a Next.js layout)
- Contains: sidebar navigation, top bar, content area
- Sign-out button calls `signOut()` from `lib/auth.ts` then `router.push('/admin')`

### ImageUpload — `components/ImageUpload.tsx`

- Accepts image files via drag-and-drop or click-to-select
- Uploads to Supabase Storage via `supabase.storage.from('...').upload(...)`
- Returns a public URL via `supabase.storage.from('...').getPublicUrl(path)`
- Calls `onUploadComplete(url)` prop callback with the public URL
- Shows upload progress and preview of the uploaded image

### VideoUpload — `components/VideoUpload.tsx`

- Accepts YouTube URL input or direct video file upload
- For YouTube: validates URL and stores as-is
- For files: uploads to Supabase Storage, same pattern as ImageUpload

---

## Authentication Guard Pattern

Every admin client component uses this `useEffect` pattern at mount:

```typescript
useEffect(() => {
  getSession().then((session) => {
    if (!session) {
      router.push('/admin');
      return;
    }
    fetchData();
  }).catch(() => router.push('/admin'));
}, [router]);
```

- Uses `getSession` from `lib/auth.ts`
- Does not use `async` directly in `useEffect` callback — returns a `.then()` chain instead
- Redirects unconditionally on any session-check failure

---

## Form Pattern

All forms use React Hook Form:

```typescript
const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

const onSubmit = async (data: FormData) => {
  // call Supabase, show toast, reset form
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('fieldName', { required: 'Field is required' })} />
    {errors.fieldName && <p>{errors.fieldName.message}</p>}
  </form>
);
```

Toast notifications use `react-toastify`:
```typescript
toast.success('Action completed');
toast.error('Something went wrong');
```

The `ToastContainer` is rendered once in `app/providers.tsx` which wraps the entire app.

---

## Gallery Client — Client-Side Data Fetching Exception

The gallery page is the one public page that fetches data client-side (not server-side):

```typescript
// app/(public)/gallery/GalleryClient.tsx
useEffect(() => {
  const fetchGallery = async () => {
    const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    setImages(data ?? []);
  };
  fetchGallery();
}, []);
```

This is because gallery images are large in number and frequently updated, making SSG impractical without constant rebuilds. The page shell is static, images load after hydration.

---

## Framer Motion Usage

Framer Motion is used in client components for:

**Page entry animations:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
```

**Header dropdown:**
```typescript
<AnimatePresence>
  {openDropdown === link.label && (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15 }}
    >
```

**Mobile menu:**
```typescript
<motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: 'auto' }}
  exit={{ opacity: 0, height: 0 }}
>
```

---

## Dynamic Import — React Quill

React Quill must be dynamically imported with SSR disabled because it accesses `document` on load:

```typescript
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
```

Used only in `PostEditorClient.tsx`. The CSS import is at the top of the same file.
