# Database Structure

## Overview

The project uses Supabase (managed PostgreSQL) as its database. All schema changes are managed through migration files in `supabase/migrations/`. The database has 6 tables plus the Supabase-managed `auth.users` table.

---

## Tables

### `posts`

Blog posts and articles managed through the admin CMS.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | uuid | PK, default gen_random_uuid() | Unique identifier |
| `category` | text | NOT NULL | e.g., "Medical Thesis", "Surgery", "Rehab" |
| `subcategory` | text | nullable | e.g., "Knee", "Shoulder", "ACL" |
| `title` | text | NOT NULL | Post heading |
| `description` | text | NOT NULL | Full rich-text HTML content from React Quill |
| `excerpt` | text | nullable | Short plain-text preview (100–200 chars) |
| `photo_url` | text | nullable | Featured image URL (Supabase Storage or external) |
| `video_url` | text | nullable | YouTube embed URL or Supabase Storage video URL |
| `status` | text | CHECK IN ('draft', 'published'), DEFAULT 'draft' | Publication state |
| `view_count` | integer | DEFAULT 0 | Incremented via `increment_post_views()` RPC |
| `created_at` | timestamptz | DEFAULT now() | Creation time |
| `updated_at` | timestamptz | DEFAULT now() | Updated by trigger on row change |

**Indexes:** `status`, `category`, `created_at DESC`

**Trigger:** `update_posts_updated_at` — fires BEFORE UPDATE to stamp `updated_at = now()`

**RPC:** `increment_post_views(post_id uuid)` — SECURITY DEFINER function, callable by anonymous users to increment view counts without write permission on the table.

---

### `contacts`

Contact form and appointment request submissions from the public site.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | uuid | PK | Unique identifier |
| `name` | text | NOT NULL | Submitter's name |
| `email` | text | NOT NULL | Submitter's email |
| `phone` | text | NOT NULL | Submitter's phone |
| `message` | text | NOT NULL | Message body |
| `contact_type` | text | CHECK IN ('general', 'appointment'), DEFAULT 'general' | Form type |
| `appointment_date` | date | nullable | Requested date (appointment type only) |
| `appointment_time` | text | nullable | Requested time slot |
| `is_contacted` | boolean | DEFAULT false | Admin follow-up flag |
| `created_at` | timestamptz | DEFAULT now() | Submission time |

**Indexes:** `contact_type`

---

### `testimonials`

Patient testimonials with moderation workflow.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | uuid | PK | Unique identifier |
| `patient_name` | text | NOT NULL | Patient display name |
| `treatment_type` | text | NOT NULL | Treatment received |
| `testimonial_text` | text | NOT NULL | Testimonial content |
| `rating` | integer | CHECK rating >= 1 AND rating <= 5 | Star rating |
| `photo_url` | text | nullable | Optional patient photo |
| `is_approved` | boolean | DEFAULT false | Must be approved to show publicly |
| `created_at` | timestamptz | DEFAULT now() | Submission time |

**Indexes:** `is_approved`

---

### `comments`

Reader comments on blog posts with moderation workflow.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | uuid | PK | Unique identifier |
| `post_id` | uuid | FK → posts(id) ON DELETE CASCADE | Parent post |
| `author_name` | text | NOT NULL | Commenter's display name |
| `author_email` | text | NOT NULL | Commenter's email (not displayed publicly) |
| `comment_text` | text | NOT NULL | Comment content |
| `is_approved` | boolean | DEFAULT false | Must be approved before public display |
| `created_at` | timestamptz | DEFAULT now() | Comment time |

**Indexes:** `post_id`, `is_approved`

> **Note:** Deleting a post cascades and deletes all its comments automatically.

---

### `media_library`

Files uploaded through the admin media manager. Stores metadata; actual files are in Supabase Storage.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | uuid | PK | Unique identifier |
| `filename` | text | NOT NULL | Original filename |
| `file_url` | text | NOT NULL | Public URL from Supabase Storage |
| `file_type` | text | CHECK IN ('image', 'video') | File category |
| `file_size` | integer | DEFAULT 0 | Size in bytes |
| `mime_type` | text | NOT NULL | e.g., "image/jpeg", "video/mp4" |
| `uploaded_by` | uuid | FK → auth.users(id) ON DELETE SET NULL | Uploader (nullable after user deletion) |
| `created_at` | timestamptz | DEFAULT now() | Upload time |

**Indexes:** `file_type`, `created_at DESC`

---

### `gallery`

Curated gallery images shown on the public `/gallery` page.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | uuid | PK | Unique identifier |
| `image_url` | text | NOT NULL | Public URL |
| `category` | text | CHECK IN ('Facilities', 'Surgery', 'Research Work', 'Awards', 'Patients', 'Events') | Display category |
| `caption` | text | nullable | Optional caption text |
| `created_at` | timestamptz | DEFAULT now() | Upload time |

**Indexes:** `category`, `created_at DESC`

---

### `google_reviews`

Google Maps reviews synced via Edge Function. Cached in the database for performance.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | uuid | PK | Internal identifier |
| `google_review_id` | text | UNIQUE, NOT NULL | Google's review ID (prevents duplicates) |
| `author_name` | text | NOT NULL | Reviewer's name |
| `author_photo_url` | text | nullable | Google profile photo URL |
| `rating` | integer | CHECK rating 1–5 | Star rating |
| `review_text` | text | NOT NULL | Review content |
| `review_date` | timestamptz | NOT NULL | When posted on Google |
| `relative_time_description` | text | DEFAULT '' | e.g., "3 months ago" |
| `google_review_url` | text | NOT NULL | Link to Google Maps review |
| `is_featured` | boolean | DEFAULT false | Pin to homepage |
| `is_active` | boolean | DEFAULT true | Show/hide toggle |
| `created_at` | timestamptz | DEFAULT now() | Sync time |
| `updated_at` | timestamptz | DEFAULT now() | Updated by trigger |

**Indexes:** `rating`, `is_featured`, `is_active`, `review_date DESC`

**Trigger:** `update_google_reviews_updated_at` — stamps `updated_at` on every row update

---

## Row Level Security (RLS) Summary

RLS is enabled on all 6 tables. The pattern is:

| Access Pattern | Policy |
|---|---|
| Public reads published/approved content | `status = 'published'` / `is_approved = true` / `is_active = true` |
| Public inserts contact forms, comments, testimonials | `WITH CHECK (true)` for INSERT TO public |
| Admin reads ALL rows | `USING (true)` for SELECT TO authenticated |
| Admin writes/updates/deletes | `USING (true) WITH CHECK (true)` TO authenticated |

> **Security context:** "authenticated" in RLS policies means any Supabase-authenticated user. Since the admin is the only registered user, these policies effectively mean admin-only. If user registration is ever enabled, these policies must be tightened to check specific user IDs or roles.

---

## TypeScript Types

All database types are defined as TypeScript interfaces in `lib/supabase.ts`:

```typescript
export type Post = { id: string; category: string; subcategory: string | null; ... };
export type Contact = { ... };
export type Testimonial = { ... };
export type Comment = { ... };
export type MediaFile = { ... };
export type Gallery = { ... };
export type GoogleReview = { ... };
```

Import these types from `@/lib/supabase` rather than redefining them.

---

## Supabase Storage

In addition to the database, Supabase Storage is used for file uploads:

| Bucket | Purpose | Access |
|---|---|---|
| `gallery_images` | Gallery page photos | Public read, authenticated write |
| (media uploads) | Blog post images, videos | Public read, authenticated write |

Storage bucket URLs follow the pattern:
```
https://[project-id].supabase.co/storage/v1/object/public/[bucket]/[path]
```

These URLs are stored in `media_library.file_url` and `gallery.image_url`.

---

## Migrations

All migrations live in `supabase/migrations/` with timestamp prefixes:

| File | Description |
|---|---|
| `20251109072806_create_initial_schema.sql` | All core tables: posts, contacts, testimonials, comments, indexes, RLS, triggers, RPCs |
| `20251109083216_add_sample_testimonials.sql` | Seed data: sample approved testimonials |
| `20251109085859_add_media_library_table.sql` | media_library table, RLS |
| `20251110124349_create_gallery_table.sql` | gallery table, RLS |
| `20251120081704_create_google_reviews_table.sql` | google_reviews table, RLS, trigger |

**To add a new migration:** Use the `mcp__supabase__apply_migration` tool with a descriptive filename. Never use raw `DROP` or destructive DDL.

---

## Useful Queries

### Get published posts with comment count
```sql
SELECT p.*, COUNT(c.id) AS comment_count
FROM posts p
LEFT JOIN comments c ON c.post_id = p.id AND c.is_approved = true
WHERE p.status = 'published'
GROUP BY p.id
ORDER BY p.created_at DESC;
```

### Get featured Google reviews
```sql
SELECT * FROM google_reviews
WHERE is_active = true AND is_featured = true
ORDER BY review_date DESC;
```

### Increment post views (via RPC)
```typescript
await supabase.rpc('increment_post_views', { post_id: id });
```
