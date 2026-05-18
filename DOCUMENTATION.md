# Dr. Sumedh Magar - Sports Orthopedic Surgeon Website
## Complete Project Documentation

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [Public Pages](#public-pages)
6. [Admin Dashboard](#admin-dashboard)
7. [Core Services & Utilities](#core-services--utilities)
8. [Authentication](#authentication)
9. [Storage & Media](#storage--media)
10. [Edge Functions](#edge-functions)
11. [Routing Reference](#routing-reference)

---

## Project Overview

This is a production-grade medical practice website for **Dr. Sumedh Magar**, a Sports Orthopedic Surgeon and founder of **I-SPORT Medical Centre** in Pune, India. The website serves as both a public-facing informational portal and a content management platform.

**Key Capabilities:**
- Public informational website with doctor profile, expertise, research, and contact details
- Dynamic blog/articles system with comments moderation
- Patient testimonials with approval workflow
- Photo gallery management
- Google Reviews integration
- Contact form with appointment booking
- Full admin dashboard for content management

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend Framework | React | 18.3.1 |
| Language | TypeScript | 5.5.3 |
| Build Tool | Vite | 5.4.2 |
| Routing | React Router DOM | 7.9.5 |
| Styling | Tailwind CSS | 3.4.1 |
| Animations | Framer Motion | 12.23.24 |
| Icons | Lucide React | 0.344.0 |
| Forms | React Hook Form | 7.66.0 |
| Rich Text Editor | React Quill | 2.0.0 |
| Notifications | React Toastify | 11.0.5 |
| Date Utilities | date-fns | 4.1.0 |
| Backend / Database | Supabase (PostgreSQL) | 2.57.4 |

**Design System:**
- Primary color: Teal (`#1BA39C`)
- Secondary color: Navy (`#003366`)
- Fonts: Montserrat (headings), Open Sans (body)
- Spacing: 8px base unit
- CSS Framework: Tailwind with custom tokens

---

## Project Structure

```
/
├── public/                    # Static assets (doctor photos, procedure images)
├── scripts/                   # Utility scripts for admin creation
├── src/
│   ├── App.tsx                # Root component, route configuration
│   ├── main.tsx               # React entry point
│   ├── index.css              # Global styles
│   ├── vite-env.d.ts          # Vite type declarations
│   ├── components/            # Shared UI components
│   │   ├── AdminLayout.tsx    # Admin sidebar + header wrapper
│   │   ├── Button.tsx         # Reusable button component
│   │   ├── Card.tsx           # Reusable card component
│   │   ├── Footer.tsx         # Public footer
│   │   ├── Header.tsx         # Public navigation header
│   │   ├── HeroCarousel.tsx   # Homepage hero slider
│   │   ├── ImageUpload.tsx    # Image upload with preview
│   │   ├── InfoCards.tsx      # Info highlight cards
│   │   ├── Loading.tsx        # Loading spinner
│   │   ├── ScrollToTop.tsx    # Route change scroll handler
│   │   └── VideoUpload.tsx    # Video upload component
│   ├── lib/
│   │   ├── auth.ts            # Supabase auth helper functions
│   │   └── supabase.ts        # Supabase client + TypeScript types
│   ├── pages/                 # All page components
│   │   ├── (Public pages)
│   │   └── (Admin pages)
│   └── services/
│       └── googleReviewsService.ts  # Google Reviews API service
├── supabase/
│   ├── functions/
│   │   └── fetch-google-reviews/    # Supabase Edge Function
│   └── migrations/                  # Database migration files
└── .env                             # Environment variables
```

---

## Database Schema

### Table: `posts`
Stores all blog articles and educational content.

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| category | text | Main category (Medical Thesis, Surgery, Rehabilitation, Research) |
| subcategory | text | Specific subcategory |
| title | text | Article title |
| description | text | Full HTML content (rich text) |
| excerpt | text | Short summary for listing cards |
| photo_url | text | Featured image URL |
| video_url | text | Optional YouTube video URL |
| status | text | `draft` or `published` |
| view_count | integer | Incremented on each article visit |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last modified timestamp |

---

### Table: `contacts`
Stores contact form submissions and appointment requests.

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| name | text | Visitor name |
| email | text | Email address |
| phone | text | Phone number |
| message | text | Inquiry message |
| contact_type | text | `general` or `appointment` |
| appointment_date | text | Requested appointment date |
| appointment_time | text | Requested appointment time |
| is_contacted | boolean | Whether admin has followed up |
| created_at | timestamptz | Submission timestamp |

---

### Table: `testimonials`
Stores patient testimonials pending or approved for public display.

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| patient_name | text | Patient name |
| treatment_type | text | Type of treatment received |
| testimonial_text | text | Patient review content |
| rating | integer | Rating (1–5 stars) |
| photo_url | text | Optional patient photo |
| is_approved | boolean | Whether visible on public site |
| created_at | timestamptz | Submission timestamp |

---

### Table: `comments`
Stores reader comments on articles, subject to moderation.

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| post_id | uuid | Foreign key to `posts.id` |
| author_name | text | Commenter's name |
| author_email | text | Commenter's email |
| comment_text | text | Comment content |
| is_approved | boolean | Whether visible on public article |
| created_at | timestamptz | Submission timestamp |

---

### Table: `media_library`
Centralized store of all uploaded files.

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| filename | text | Original filename |
| file_url | text | Public storage URL |
| file_type | text | `image` or `video` |
| file_size | integer | Size in bytes |
| mime_type | text | MIME type string |
| uploaded_by | uuid | Auth user ID |
| created_at | timestamptz | Upload timestamp |

---

### Table: `gallery`
Stores categorized gallery images for the public gallery page.

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| image_url | text | Image URL |
| category | text | Facilities, Surgery, Research Work, Awards, Patients, Events |
| caption | text | Optional image caption |
| created_at | timestamptz | Upload timestamp |

---

### Table: `google_reviews`
Stores synced Google Maps reviews.

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| google_review_id | text | Unique Google review identifier |
| author_name | text | Reviewer name |
| author_photo_url | text | Reviewer profile photo |
| rating | integer | Star rating (1–5) |
| review_text | text | Review content |
| review_date | timestamptz | Date published on Google |
| relative_time_description | text | e.g., "3 months ago" |
| google_review_url | text | Direct link to review |
| is_featured | boolean | Highlighted on homepage |
| is_active | boolean | Visible on site |
| created_at | timestamptz | Record created timestamp |
| updated_at | timestamptz | Last modified timestamp |

---

## Public Pages

### Home (`/`)

The landing page. Sections include:

- **Hero Carousel** — Full-width rotating image slider (`HeroCarousel` component)
- **About Section** — 4 stat cards: 6+ Years Experience, 10,000+ Patients, 1,000+ Surgeries, 97% Satisfaction
- **Treatment Cards** — 6 procedure highlight cards with images linking to relevant pages
- **Latest Articles** — Fetches 3 most recent published articles from the `posts` table
- **Patient Reviews** — Fetches top-rated Google reviews from `google_reviews` table (falls back to hardcoded reviews if none found)
- **Appointment CTA** — Call-to-action section with phone and contact links

**Database reads:** `posts`, `google_reviews`

---

### About (`/about`)

Comprehensive biography page. Contains static content for:

- Professional biography
- Educational background (5 milestones from 2001–2021)
- Professional experience (6 roles including current director)
- Professional memberships (5 medical associations)
- Sports achievements (4 medals: swimming + basketball)
- Academic awards (Padmashree Vedsinha Marwah Research Award)
- Charitable activities (health camp participation)
- Special interests: Knee Preservation, Biomechanics, Bio Orthopaedics

No database interaction. Static content only.

---

### Clinical Expertise (`/expertise`)

Detailed surgical expertise showcase. Features:

- **6 surgery categories** — each with expandable detail cards showing:
  - Overview of procedure
  - Conditions treated
  - Technique description
  - Return-to-sport timeline
- **19 conditions treated** listed
- **Bio-Orthopedics section** — 4 regenerative treatments (PRP, stem cell, etc.)
- **Advanced Arthroscopic Techniques** — 4 specialized services
- **Why Choose Dr. Magar** — 6 key differentiators
- Interactive expand/collapse toggle on each surgery card
- Appointment and call CTA buttons

No database interaction. Static with interactive UI.

---

### Sports Medicine (`/sports-medicine`)

Dedicated sports medicine portal. Features:

- Doctor profile with credentials
- **4 pillars of sports medicine** (Assessment, Treatment, Optimization, Return-to-Play)
- **6 body region tabs** with expandable condition lists per region
- **Advanced Services at I-SPORT** — 5 specialized services
- **Ortho-biologics** — 3 treatment types
- Embedded patient testimonials (3 hardcoded local reviews)
- Interactive tab/toggle system
- Why athletes choose section with 6 reasons

No database interaction. Static with interactive UI.

---

### Research (`/research`)

Academic credentials page. Static sections:

- **Paper Presentations** — 3 papers with conference details and years
- **Research Activities** — 2 major ongoing research projects
- **Dissertations** — 2 academic dissertations
- **Conferences & Workshops** — Grid of 8 events attended

No database interaction. Static content only.

---

### Articles (`/articles`)

Dynamic article listing page. Features:

- **Search** — Searches across title, excerpt, category fields
- **Category Filters** — Dynamically populated from existing post categories
- **Article Cards** — Featured image, category tag, title, excerpt, view count
- Fetches all published posts from `posts` table

**Database reads:** `posts` (status = `published`)

---

### Article Detail (`/articles/:id`)

Individual article page. Features:

- Featured image header
- Article metadata (date, view count, category, subcategory)
- Full rich HTML content rendering
- **YouTube video embed** — auto-embeds video if `video_url` is provided
- **View counter** — Calls `increment_post_views` RPC on load
- **Comments section** — Shows all approved comments
- **Comment submission form** — Fields: name, email, comment text
  - New comments default to `is_approved = false` (require admin approval)

**Database reads:** `posts` (by ID), `comments` (is_approved = true)
**Database writes:** `comments`
**RPC calls:** `increment_post_views`

---

### Gallery (`/gallery`)

Image gallery with lightbox. Features:

- **Category filters** — All, Facilities, Surgery, Research Work, Awards, Patients, Events
- **Responsive grid** — Adaptive columns based on viewport
- **Lightbox modal** — Full-size image view with caption and category
- Hover effects showing overlay with category and caption

**Database reads:** `gallery` (ordered by `created_at` desc)

---

### Testimonials (`/testimonials`)

Patient review showcase and submission. Features:

- Grid display of all approved testimonials
- Star rating display per testimonial
- Treatment type label per card
- **Submission form** — Fields: name, treatment type, star rating (1–5), testimonial text
  - New submissions default to `is_approved = false` (require admin approval)
- Success feedback on submission

**Database reads:** `testimonials` (is_approved = true)
**Database writes:** `testimonials`

---

### Contact (`/contact`)

Contact and appointment request page. Features:

- **Contact form fields:** Name, email, phone, message
- **Appointment toggle** — Checkbox reveals date and time picker
- Contact type stored as `general` or `appointment`
- **Contact info cards** — Address, phone numbers, email, clinic hours
- **Google Maps embed** — Interactive map of clinic location

**Clinic Details:**
- Address: Shop No. 9-13, Madhukosh Society, Balewadi, Pune 411045
- Phone: +91 9145517171 / +91 02067813869
- Email: sumedh@isportmedicalcentre.com

**Database writes:** `contacts`

---

### Legal Pages (Static)

| Page | Route |
|---|---|
| Privacy Policy | `/privacy-policy` |
| Terms & Conditions | `/terms-conditions` |
| Medical Disclaimer | `/medical-disclaimer` |
| Cookie Policy | `/cookie-policy` |

All four pages are static informational content with no database interaction. They cover data handling practices, liability limitations, cookie usage, and medical information disclaimers.

---

## Admin Dashboard

All admin pages are wrapped in `AdminLayout`, which provides:
- Fixed top header with logout button
- Left sidebar navigation
- Active route highlighting
- Mobile-responsive collapsible sidebar

### Accessing the Admin Panel

The admin panel is accessible at `/admin`. Authentication is required. Unauthenticated users are redirected to the login page.

---

### Admin Login (`/admin`)

- Email and password login form
- Uses Supabase email/password authentication
- On success: redirects to `/admin/dashboard`
- On failure: displays toast error message

---

### Admin Signup (`/admin/signup`)

- Create a new admin account
- Fields: email, password, confirm password
- Password confirmation validation
- On success: redirects to login with success message
- Intended for initial setup only; route should be restricted in production

---

### Admin Dashboard (`/admin/dashboard`)

Main overview screen. Displays:

**Statistics Cards:**
| Metric | Source |
|---|---|
| Total Posts | `posts` table |
| Published Posts | `posts` where status = `published` |
| Draft Posts | `posts` where status = `draft` |
| Total Views | Sum of `view_count` from `posts` |
| Pending Comments | `comments` where is_approved = false |
| Approved Comments | `comments` where is_approved = true |
| Total Contacts | `contacts` table |
| Pending Contacts | `contacts` where is_contacted = false |

**Recent Activity Feed:** Last 5 items across posts, comments, contacts.

**Quick Actions:** Buttons to navigate directly to manage each content type.

---

### Manage Posts (`/admin/posts`)

Manage all blog articles.

**Features:**
- **Tab filters** — All, Published, Drafts
- **Stats cards** — Count and total views per tab
- **Post list** — Shows title, category, status badge, date, view count
- **Actions per post:**
  - Edit — navigates to `/admin/posts/edit/:id`
  - Publish / Unpublish — toggles status
  - Delete — with confirmation prompt

**Database:** Reads, updates, deletes from `posts`

---

### Post Editor (`/admin/posts/create` and `/admin/posts/edit/:id`)

Create or edit a blog article.

**Form Fields:**

| Field | Type | Notes |
|---|---|---|
| Title | Text | Required |
| Category | Dropdown | 4 main categories |
| Subcategory | Dropdown | Dynamic based on selected category |
| Excerpt | Textarea | Short summary, shown in listings |
| Content | Rich text (React Quill) | Full article body with formatting |
| Featured Image | Image upload | Uploaded to Supabase storage |
| Video URL | Text | Optional YouTube embed |
| Status | Toggle | `draft` or `published` |

**Category / Subcategory Options:**
- **Medical Thesis** — ACL Reconstruction, Patellofemoral Instability, Biomechanics, Rehabilitation Study
- **Surgery** — Knee, Shoulder, Hip, Elbow, Ankle, Hand & Wrist
- **Rehabilitation** — Return-to-Sport, Movement Analysis, Physiotherapy Protocols, Injury Prevention
- **Research** — Sports Medicine, Arthroscopy, Regenerative Medicine, Orthopedic Innovations

**Preview Mode:** Toggle between editor and rendered preview.

**Database:** Reads `posts` (edit), writes/updates `posts`, uploads to Supabase storage

---

### Manage Comments (`/admin/comments`)

Moderate reader comments on articles.

**Features:**
- **Search** — Filters by author name, email, comment text
- **Status filter** — All, Approved, Pending
- **Comment list** — Shows author, email, comment snippet, associated article, date
- **Actions per comment:**
  - Approve — sets `is_approved = true` (makes visible on public article)
  - Unapprove — sets `is_approved = false`
  - Delete — permanent removal

**Database:** Reads `comments` + `posts`, updates and deletes `comments`

---

### Manage Contacts (`/admin/contacts`)

View and manage contact form submissions.

**Features:**
- **Stats bar** — Total, Appointments, Contacted, Pending counts
- **Type filter** — All, General Inquiries, Appointment Requests
- **Contact list** — Shows name, email, phone, message, date
- **Appointment details** — Date and time shown for appointment-type contacts
- **Actions per contact:**
  - Mark as Contacted / Mark as Pending — toggles `is_contacted`
  - Delete — permanent removal

**Database:** Reads, updates, deletes from `contacts`

---

### Manage Gallery (`/admin/gallery`)

Upload and organize gallery images.

**Features:**
- **Category selector** — Facilities, Surgery, Research Work, Awards, Patients, Events
- **Optional caption** field
- **Upload preview** — Shows selected image before uploading
- **File validation** — Max 5MB, image types only
- **Image grid** — Displays all uploaded images
- **Stats** — Count per category
- **Delete** — Remove images with confirmation

**Storage:** Images uploaded to Supabase `media` storage bucket
**Database:** Reads, writes, deletes from `gallery`

---

### Media Library (`/admin/media`)

Centralized file management for all uploaded media.

**Features:**
- **Stats bar** — Total files, image count, video count, total storage size
- **Type filter** — All, Images, Videos
- **Search** — Filter by filename
- **Media grid** — Thumbnails for images, icons for videos
- **File metadata** — Name, size, upload date
- **Copy URL** — Copies public file URL to clipboard
- **Delete** — Removes file from storage and database

**Database:** Reads, deletes from `media_library`
**Storage:** Reads, deletes from Supabase storage

---

### Manage Google Reviews (`/admin/google-reviews`)

Sync and manage Google Maps reviews.

**Features:**
- **Stats bar** — Total reviews, average rating, featured count, active count
- **Sync button** — Calls the `fetch-google-reviews` edge function to pull latest reviews from Google Maps API
- **Review cards** — Author photo, name, star rating, review text, relative date
- **Google link** — Button to view original review on Google Maps
- **Actions per review:**
  - Feature / Unfeature — marks review as featured (shown on homepage)
  - Activate / Deactivate — toggles visibility on public site
  - Delete — permanent removal

**Database:** Reads, updates, deletes from `google_reviews`
**Edge Function:** Calls `fetch-google-reviews` to sync from Google Maps API

---

### Manage Testimonials (Component: `AdminTestimonials`)

Note: This page component exists in the codebase but is not listed in the current route table. It can be added to the admin router.

**Features:**
- **Status filter** — All, Approved, Pending
- **Stats** — Total, Approved, Pending counts
- **Testimonial cards** — Patient name, treatment, rating, text, date
- **Inline editing** — All fields editable inline
- **Actions per testimonial:**
  - Approve / Unapprove — toggles `is_approved`
  - Delete — permanent removal

**Database:** Reads, updates, deletes from `testimonials`

---

### Admin Navigation Sidebar

The `AdminLayout` sidebar contains these links:

| Label | Route |
|---|---|
| Dashboard | `/admin/dashboard` |
| Contacts | `/admin/contacts` |
| Posts | `/admin/posts` |
| Comments | `/admin/comments` |
| Google Reviews | `/admin/google-reviews` |
| Media Library | `/admin/media` |
| Gallery Manager | `/admin/gallery` |

---

## Core Services & Utilities

### `src/lib/supabase.ts`

Exports the Supabase client singleton and all TypeScript type definitions for database rows.

```ts
import { supabase } from './lib/supabase';
```

**Exported Types:** `Post`, `Contact`, `Testimonial`, `Comment`, `MediaFile`, `Gallery`, `GoogleReview`

The client reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from environment variables.

---

### `src/lib/auth.ts`

Wrapper functions for Supabase authentication:

| Function | Description |
|---|---|
| `signIn(email, password)` | Sign in with email + password |
| `signOut()` | Sign out current user |
| `getCurrentUser()` | Returns the current authenticated user object |
| `getSession()` | Returns the current session |

---

### `src/services/googleReviewsService.ts`

Manages Google Reviews integration.

| Function | Description |
|---|---|
| `fetchGoogleReviews()` | Calls the Supabase edge function to fetch reviews from Google Maps API |
| `syncReviewsToDatabase(reviews)` | Upserts fetched reviews into `google_reviews` table |
| `getReviewsFromDatabase(limit?)` | Fetches stored reviews, optionally limited |
| `getTopRatedReviews(limit?)` | Returns featured or 4+ star active reviews |
| `toggleReviewFeatured(id, status)` | Sets `is_featured` flag |
| `toggleReviewActive(id, status)` | Sets `is_active` flag |
| `deleteReview(id)` | Deletes review record |
| `getFallbackReviews()` | Returns 4 hardcoded reviews when no database data exists |

**Google Place ID:** `ChIJnRFz6t2_wjsRhGLNLFJfKBs`

---

## Authentication

Authentication uses **Supabase Auth** with email/password sign-in.

- Admin accounts are created via the `/admin/signup` route or the `scripts/create-admin-simple.ts` script
- The auth state is checked on each admin page load; unauthenticated users are redirected to `/admin`
- `onAuthStateChange` is used for session management where applicable
- Logout is available from the admin sidebar header

**Auth flow:**
1. User visits any `/admin/*` route
2. Page component calls `getCurrentUser()` or checks session
3. If no active session → redirect to `/admin`
4. If session valid → render admin page content

---

## Storage & Media

Supabase Storage is used for all file uploads. The primary bucket is `media`.

- **Images** are uploaded via `ImageUpload` component
- **Videos** are uploaded via `VideoUpload` component
- Uploaded files get a public URL stored in the `media_library` table and/or the specific table (e.g., `gallery.image_url`, `posts.photo_url`)
- File size limits: 5MB per image (enforced client-side in gallery upload)

---

## Edge Functions

### `fetch-google-reviews`

**Deployed at:** `${SUPABASE_URL}/functions/v1/fetch-google-reviews`

**Purpose:** Securely fetches reviews from the Google Maps Places API, keeping the API key server-side.

**Called by:** `AdminGoogleReviews` page (sync button) and `googleReviewsService.fetchGoogleReviews()`

**Authentication:** Requires a valid Supabase user auth token passed as `Authorization: Bearer <token>`

---

## Routing Reference

### Public Routes

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Homepage |
| `/about` | `About` | Doctor biography |
| `/sports-medicine` | `SportsMedicine` | Sports medicine portal |
| `/expertise` | `ClinicalExpertise` | Surgical expertise details |
| `/research` | `Research` | Academic and research work |
| `/articles` | `Articles` | Blog article listing |
| `/articles/:id` | `ArticleDetail` | Individual article page |
| `/gallery` | `Gallery` | Photo gallery |
| `/contact` | `Contact` | Contact + appointment form |
| `/privacy-policy` | `PrivacyPolicy` | Legal: privacy policy |
| `/terms-conditions` | `TermsConditions` | Legal: terms of use |
| `/cookie-policy` | `CookiePolicy` | Legal: cookie policy |
| `/medical-disclaimer` | `MedicalDisclaimer` | Medical disclaimer |

### Admin Routes

| Route | Component | Description |
|---|---|---|
| `/admin` | `AdminLogin` | Admin login |
| `/admin/signup` | `AdminSignup` | Create admin account |
| `/admin/dashboard` | `AdminDashboardNew` | Dashboard overview |
| `/admin/posts` | `AdminPosts` | Manage articles |
| `/admin/posts/create` | `AdminPostEditor` | Create new article |
| `/admin/posts/edit/:id` | `AdminPostEditor` | Edit existing article |
| `/admin/comments` | `AdminComments` | Moderate comments |
| `/admin/contacts` | `AdminContacts` | View contact submissions |
| `/admin/media` | `AdminMedia` | Media library |
| `/admin/gallery` | `AdminGallery` | Gallery management |
| `/admin/google-reviews` | `AdminGoogleReviews` | Google Reviews management |

---

## Environment Variables

The following environment variables are required in the `.env` file:

```env
VITE_SUPABASE_URL=         # Supabase project URL
VITE_SUPABASE_ANON_KEY=    # Supabase anonymous public key
```

The edge function additionally requires the Google Maps API key configured as a Supabase secret (not stored client-side).
