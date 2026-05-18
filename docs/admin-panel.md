# Admin Panel

## Overview

The admin panel is a full CMS accessible at `/admin`. It is protected by client-side session checking (no server-side auth middleware). All admin routes are `force-dynamic` to prevent any caching.

---

## Access

- **URL:** `/admin`
- **Login:** Email/password (Supabase Auth)
- **User management:** Supabase Dashboard → Authentication → Users
- **Default redirect after login:** `/admin/dashboard`

---

## Admin Routes

| Route | Page | Purpose |
|---|---|---|
| `/admin` | Login page | Email/password sign-in form |
| `/admin/dashboard` | Dashboard | Stats overview: posts, contacts, comments, reviews |
| `/admin/posts` | Posts list | View, publish/unpublish, delete posts |
| `/admin/posts/create` | Post editor | Create new post |
| `/admin/posts/edit/[id]` | Post editor | Edit existing post |
| `/admin/comments` | Comments list | Approve or delete reader comments |
| `/admin/contacts` | Contacts list | View contact form submissions, mark as contacted |
| `/admin/gallery` | Gallery manager | Upload, categorize, delete gallery images |
| `/admin/media` | Media library | Browse and delete uploaded files |
| `/admin/google-reviews` | Google Reviews | Manage synced reviews, feature/hide them |

---

## Architecture

All admin pages follow this pattern:

```
app/admin/[section]/
  page.tsx          ← Server component shell (SSR, force-dynamic)
  *Client.tsx       ← Client component with all logic and UI
```

The `page.tsx` is minimal:
```typescript
import SectionClient from './SectionClient';
export default function SectionPage() {
  return <SectionClient />;
}
```

The `*Client.tsx` file contains:
1. Auth guard (`getSession` check in `useEffect`)
2. Data fetching (Supabase JS SDK)
3. UI rendering with `AdminLayout` wrapper
4. CRUD operations with toast feedback

---

## AdminLayout Component

**File:** `components/AdminLayout.tsx`

The `AdminLayout` is a React component (not a Next.js layout file) that wraps the main content area of every admin page. It provides:
- Sidebar navigation with links to all admin sections
- Active link highlighting based on current path
- Sign-out button
- Top header bar with page title

Usage in every admin client component:
```typescript
return (
  <AdminLayout>
    {/* Page content */}
  </AdminLayout>
);
```

---

## Dashboard — `/admin/dashboard`

**File:** `app/admin/dashboard/DashboardClient.tsx`

Shows aggregate statistics:
- Total posts / published / drafts / total views
- Recent contact submissions (last 5)
- Pending comments awaiting approval count
- Recent Google review sync status

Data is fetched in parallel using `Promise.all` after session check.

---

## Posts Management — `/admin/posts`

**File:** `app/admin/posts/PostsClient.tsx`

**Features:**
- Stats cards: total, published, drafts, total views
- Filter tabs: All / Published / Drafts
- Per-post actions: Edit → navigates to `/admin/posts/edit/[id]`
- Publish/Unpublish toggle: immediate DB update + optimistic UI
- Delete: two-step confirmation (click Delete → confirm → execute)
- Create button: navigates to `/admin/posts/create`

---

## Post Editor — `/admin/posts/create` and `/admin/posts/edit/[id]`

**File:** `app/admin/posts/PostEditorClient.tsx`

**Mode detection:** Presence of `id` param via `useParams()` determines create vs. edit mode.

**Fields:**
| Field | Type | Required |
|---|---|---|
| Title | Text input | Yes |
| Category | Select (4 options) | Yes |
| Subcategory | Select (dynamic per category) | No |
| Excerpt | Textarea | No |
| Description | React Quill WYSIWYG | Yes |
| Featured Image | ImageUpload component | No |
| Video | VideoUpload component | No |
| Status | Select (draft/published) | Yes |

**Preview:** Toggle button renders a live preview of the image and HTML content.

---

## Comments — `/admin/comments`

**File:** `app/admin/comments/CommentsClient.tsx`

Shows all comments across all posts. Each comment displays:
- Post title and link
- Commenter name, email, date
- Comment text
- Approval status badge
- Approve / Delete actions

Comments arrive with `is_approved = false`. Approved comments immediately become visible on the public blog post (after ISR revalidation, within 5 minutes).

---

## Contacts — `/admin/contacts`

**File:** `app/admin/contacts/ContactsClient.tsx`

Shows all contact form and appointment request submissions. Each record shows:
- Name, email, phone
- Message
- Contact type (general / appointment)
- Appointment date/time if applicable
- "Mark as Contacted" toggle (`is_contacted` boolean)
- Submission date

The `is_contacted` toggle updates `contacts.is_contacted` and provides a visual management workflow for following up with patients.

---

## Gallery — `/admin/gallery`

**File:** `app/admin/gallery/GalleryClient.tsx`

Manages images shown on the public `/gallery` page.

**Features:**
- Upload new images via `ImageUpload` component (stores to Supabase Storage + inserts row in `gallery` table)
- Select category: Facilities, Surgery, Research Work, Awards, Patients, Events
- Optional caption text
- View all uploaded images in a grid
- Delete images (removes from both `gallery` table and Supabase Storage)

**Storage bucket:** `gallery_images` — must be created in Supabase Dashboard with public read access.

---

## Media Library — `/admin/media`

**File:** `app/admin/media/MediaClient.tsx`

A general-purpose file browser for all uploaded media (images and videos used in blog posts).

**Features:**
- Browse all uploaded files with thumbnails
- Filter by type: image / video
- Copy public URL to clipboard for use in post content
- Delete files (removes from Storage + `media_library` table)

---

## Google Reviews — `/admin/google-reviews`

**File:** `app/admin/google-reviews/GoogleReviewsClient.tsx`

Manages the Google Reviews that appear on the homepage.

**Features:**
- View all synced reviews
- Toggle `is_featured` (shows on homepage)
- Toggle `is_active` (shows/hides from public)
- Trigger manual sync via the `fetch-google-reviews` Edge Function

**Sync mechanism:** The Edge Function calls the Google Places API and upserts results into the `google_reviews` table using `google_review_id` as the unique key.

---

## Toast Notifications

All admin operations use `react-toastify` for feedback:

```typescript
toast.success('Post published successfully');
toast.error('Failed to load posts');
```

The `ToastContainer` is rendered in `app/providers.tsx` at the app root, so toasts work from any admin client component without additional setup.

---

## Loading States

Admin pages show a full-screen loading spinner while the session check and initial data fetch complete:

```typescript
if (loading) return <Loading fullScreen />;
```

**File:** `components/Loading.tsx` — renders a centered animated spinner.

---

## Creating an Admin User

No self-registration UI exists. To add an admin user:

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add user" or "Invite user"
3. Enter email and password
4. The user can immediately log in at `/admin`

Alternatively, use the scripts in `scripts/`:
- `scripts/create-admin.ts` — full script with Supabase admin client
- `scripts/create-admin-simple.ts` — simplified version
