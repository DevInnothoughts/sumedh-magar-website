# Blog System

## Overview

The blog system is a full CMS built on top of the `posts` table in Supabase. Admins write and manage posts through the admin panel. Readers access posts through the public `/blog` listing and `/blog/[id]` detail pages. The system supports rich text, featured images, videos, categories, reading time, view counts, and a moderated comment system.

---

## Data Model

Posts are stored in the `posts` table. See [database-structure.md](./database-structure.md) for the full schema.

Key fields relevant to the blog:

| Field | Purpose |
|---|---|
| `title` | Article heading |
| `description` | Full HTML content from React Quill WYSIWYG editor |
| `excerpt` | Plain-text preview shown on listing cards |
| `photo_url` | Featured image shown in hero area and card thumbnails |
| `video_url` | Optional YouTube embed or Supabase-hosted video |
| `category` | One of: Medical Thesis, Surgery, Rehabilitation, Research |
| `subcategory` | Detailed sub-classification (e.g., "ACL Reconstruction") |
| `status` | `'draft'` or `'published'` — only published posts are publicly visible |
| `view_count` | Incremented on each post detail page load via RPC |

---

## Admin Workflow

### Post List — `/admin/posts`

**File:** `app/admin/posts/PostsClient.tsx`

- Shows all posts (draft + published) in reverse chronological order
- Stats banner: total posts, published, drafts, total views
- Three filter tabs: All / Published / Drafts
- Actions per post: Edit, Publish/Unpublish toggle, Delete (with confirm step)

### Creating a Post — `/admin/posts/create`

**File:** `app/admin/posts/create/page.tsx` → renders `PostEditorClient`

### Editing a Post — `/admin/posts/edit/[id]`

**File:** `app/admin/posts/edit/[id]/page.tsx` → renders `PostEditorClient` with `id` param

### Post Editor — `PostEditorClient.tsx`

**File:** `app/admin/posts/PostEditorClient.tsx`

The same component handles both create and edit modes (detected by presence of `id` param from `useParams()`).

**Fields:**
- `title` — text input, required
- `category` — select dropdown, required
- `subcategory` — dynamically populated based on selected category
- `excerpt` — textarea, plain text preview
- `description` — **React Quill** WYSIWYG editor (rich HTML output)
- `photo_url` — `ImageUpload` component (uploads to Supabase Storage)
- `video_url` — `VideoUpload` component (accepts YouTube URL or file upload)
- `status` — select: draft or published

**React Quill setup:**
```typescript
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
```
Dynamically imported with SSR disabled because Quill requires `document`. The Quill Snow CSS is imported at the top of the file: `import 'react-quill/dist/quill.snow.css'`.

**Toolbar configuration:**
- Headers (H1, H2, H3)
- Bold, italic, underline, strikethrough
- Ordered and bullet lists
- Indent/outdent
- Links
- Text alignment
- Clear formatting

**Save behavior:**
- Create: `supabase.from('posts').insert([postData])`
- Update: `supabase.from('posts').update(postData).eq('id', id)`
- On success: `toast.success(...)` + redirect to `/admin/posts`
- On error: `toast.error(error.message)`

**Preview:** Toggle button shows a live preview panel above the form with the current image and rendered HTML content.

---

## Available Categories and Subcategories

```typescript
const categories = [
  {
    value: 'Medical Thesis',
    subcategories: ['ACL Reconstruction', 'Patellofemoral Instability', 'Biomechanics', 'Rehabilitation Study'],
  },
  {
    value: 'Surgery',
    subcategories: ['Knee', 'Shoulder', 'Hip', 'Elbow', 'Ankle', 'Hand & Wrist'],
  },
  {
    value: 'Rehabilitation',
    subcategories: ['Return-to-Sport', 'Movement Analysis', 'Physiotherapy Protocols', 'Injury Prevention'],
  },
  {
    value: 'Research',
    subcategories: ['Sports Medicine', 'Arthroscopy', 'Regenerative Medicine', 'Orthopedic Innovations'],
  },
];
```

To add a new category, edit this array in `PostEditorClient.tsx`.

---

## Public Blog Pages

### Blog Listing — `/blog`

**Files:**
- `app/(public)/blog/page.tsx` — Server component, `revalidate = 300`
- `app/(public)/blog/BlogClient.tsx` — Client component

**Server component fetches:**
```typescript
const { data: posts } = await supabase
  .from('posts')
  .select('id, title, excerpt, photo_url, category, subcategory, created_at, view_count')
  .eq('status', 'published')
  .order('created_at', { ascending: false });
```

Passes `posts` as prop to `BlogClient`. No client-side data fetching on this page.

**Client component features:**
- Search bar filtering by title and excerpt
- Category filter tabs (All + distinct categories from posts)
- Reading time per card: strips HTML tags, counts words, divides by 200 WPM
- Staggered Framer Motion `motion.div` animations on cards
- Fallback "No articles found" state when search yields no results

### Blog Detail — `/blog/[id]`

**Files:**
- `app/(public)/blog/[id]/page.tsx` — Server component, `revalidate = 300`
- `app/(public)/blog/[id]/BlogDetailClient.tsx` — Client component

**Server component fetches:**
```typescript
// 1. Post data
const { data: post } = await supabase.from('posts').select('*').eq('id', id).eq('status', 'published').maybeSingle();
if (!post) notFound();

// 2. Approved comments
const { data: comments } = await supabase.from('comments').select('*').eq('post_id', id).eq('is_approved', true).order('created_at');

// 3. Related posts (same category, different id, max 3)
const { data: relatedPosts } = await supabase.from('posts').select('id, title, photo_url, excerpt').eq('status', 'published').eq('category', post.category).neq('id', id).limit(3);
```

All three are passed as props to `BlogDetailClient`.

**Client component features:**
- View count increment via `supabase.rpc('increment_post_views', { post_id: post.id })` — fire-and-forget using `void` operator
- Share button: uses `navigator.share` (Web Share API) with clipboard fallback
- Video rendering: detects YouTube vs direct video URL, renders `<iframe>` or `<video>` respectively
- Comment list: displays approved comments with author name, date, and text
- Comment form: React Hook Form with email validation, inserts with `is_approved: false`
- Related articles grid: 3-column cards linking to same-category posts

---

## Comment Moderation

Comments submitted publicly are created with `is_approved = false`. They are invisible to readers until approved.

**Admin workflow:**
1. Navigate to `/admin/comments`
2. View all pending and approved comments
3. Approve or delete individual comments

Comments are approved via:
```typescript
supabase.from('comments').update({ is_approved: true }).eq('id', commentId)
```

Once approved, comments appear on the next ISR revalidation cycle (within 5 minutes).

---

## View Count Tracking

View counts are stored in `posts.view_count` and incremented via a PostgreSQL stored function:

```sql
CREATE FUNCTION increment_post_views(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE posts SET view_count = view_count + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

`SECURITY DEFINER` means the function runs with the privileges of its creator (admin), allowing anonymous users to call it without having direct UPDATE permission on the posts table.

Called from the client:
```typescript
useEffect(() => {
  void supabase.rpc('increment_post_views', { post_id: post.id });
}, [post.id]);
```

The `void` operator discards the Promise intentionally — view count failures are silent and non-blocking.

---

## Reading Time Calculation

Implemented as a local helper function in both `BlogClient.tsx` and `BlogDetailClient.tsx`:

```typescript
function readingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');       // strip HTML tags
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200)); // 200 WPM, minimum 1 min
}
```

---

## Articles → Blog Redirect

The old `/articles` URL pattern is permanently redirected to `/blog`:

```typescript
// next.config.ts
async redirects() {
  return [
    { source: '/articles', destination: '/blog', permanent: true },
    { source: '/articles/:id', destination: '/blog/:id', permanent: true },
  ];
}
```

The `app/(public)/articles/` directory still exists and returns redirects too (belt-and-suspenders).

---

## SEO on Blog Pages

- **`/blog`**: BreadcrumbList JSON-LD, full OG/Twitter metadata
- **`/blog/[id]`**: Article JSON-LD (with `datePublished`, `author`, `image`), BreadcrumbList, `generateMetadata` using post data
- Post UUIDs are used as URL parameters — not human-readable slugs. If slug support is added in future, 301-redirect old UUID paths.
