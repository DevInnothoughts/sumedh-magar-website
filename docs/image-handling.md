# Image Handling

## Overview

The project uses three categories of images:
1. **Static public images** — doctor photos, procedure images in `/public/`
2. **Supabase Storage uploads** — gallery images, blog post images uploaded via admin panel
3. **External images** — Google reviewer profile photos, Pexels stock photos

All images displayed via `<Image>` (Next.js) go through Next.js image optimization. A few exceptions use `<img>` where optimization is not applicable.

---

## Static Images — `/public/`

Images stored directly in the `public/` directory:

| File | Usage |
|---|---|
| `SumedhMagar.jpeg` | Doctor portrait — About page, OG image, Schema |
| `aclsurgery.JPG` | ACL treatment hero |
| `KneeSurgery.jpeg` | Knee arthroscopy hero |
| `ShoulderSurgery.jpeg` | Shoulder treatment hero |
| `HipSurgery.jpeg` | Hip surgery |
| `Arthroscopy.jpeg` | Arthroscopy hero |
| `SportsMedicine.jpeg` | Sports medicine page |
| `JointReplacement.jpeg` | Joint replacement content |
| `JointPreservation.jpeg` | Joint preservation content |
| `BioOrthopaedics.jpeg` | Bio-orthopaedics content |
| `PRP.JPEG` | PRP therapy content |
| `DrInAction.jpeg` | Doctor in operation |
| `DrInAction1.JPG` | Doctor in operation (2) |

Referenced with absolute paths: `/SumedhMagar.jpeg`. Next.js serves these from the CDN edge.

---

## next/image Usage

### Standard Usage (fill + sizes)

Most images use the `fill` prop for responsive containers:

```tsx
<div className="relative h-72 rounded-2xl overflow-hidden">
  <Image
    src="/KneeSurgery.jpeg"
    alt="Knee arthroscopy Pune"
    fill
    className="object-cover"
    priority
    sizes="(max-width: 1024px) 100vw, 50vw"
  />
</div>
```

The parent div must have:
- `position: relative` (use `relative` class)
- Explicit height
- `overflow-hidden` to clip corners

### `priority` prop

Add `priority` to images that are in the viewport on initial page load (hero images, above-the-fold content). This hints the browser to preload the image. Omit it for below-the-fold images.

### `sizes` prop

Always provide `sizes` for `fill` images to enable correct responsive srcset:

```
(max-width: 1024px) 100vw, 50vw
```
Means: "full viewport width on mobile, half on desktop". Adjust based on actual layout.

For the blog detail featured image (full-width, max 4xl):
```
(max-width: 768px) 100vw, 896px
```

For thumbnail images in 3-column grids:
```
(max-width: 768px) 100vw, 33vw
```

### Fixed-size images

When dimensions are known, use `width` and `height` instead of `fill`:

```tsx
<Image
  src="/SumedhMagar.jpeg"
  alt="Dr. Sumedh Magar"
  width={400}
  height={400}
  className="rounded-full object-cover"
/>
```

---

## Remote Images — next.config.ts

All external image hostnames must be whitelisted in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.pexels.com' },
    { protocol: 'https', hostname: 'ahgiycinebsxuuhavqrs.supabase.co' },
    { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    { protocol: 'https', hostname: 'maps.googleapis.com' },
  ],
},
```

| Hostname | Source |
|---|---|
| `images.pexels.com` | Stock photos (if any Pexels URLs are added) |
| `ahgiycinebsxuuhavqrs.supabase.co` | Supabase Storage (gallery + blog images) |
| `lh3.googleusercontent.com` | Google reviewer profile photos |
| `maps.googleapis.com` | Google Maps API images |

**Adding a new domain:** Add a new entry to `remotePatterns` in `next.config.ts`. Without this, Next.js will throw an error at build time or runtime when encountering an unlisted hostname.

**If the Supabase project changes:** Update `ahgiycinebsxuuhavqrs.supabase.co` to the new project hostname.

---

## Image Upload via Admin Panel

Images uploaded through the admin panel use the `ImageUpload` component (`components/ImageUpload.tsx`).

### Upload Flow

```
1. Admin selects file
2. ImageUpload component:
   - Validates file type (image/*)
   - Validates file size
   - Uploads to Supabase Storage
3. Supabase Storage returns path
4. Component calls getPublicUrl(path) → returns CDN URL
5. onUploadComplete(url) callback called with public URL
6. Parent component stores URL in state / form field
7. URL saved to database on form submit
```

### Storage URL Format

```
https://ahgiycinebsxuuhavqrs.supabase.co/storage/v1/object/public/gallery_images/1234567890-photo.jpg
```

These URLs are served via Supabase's CDN and are permanent (until the file is deleted).

---

## Google Reviewer Profile Photos

Profile photos are served from `lh3.googleusercontent.com`. They are rendered with `next/image` using explicit width/height since the URL contains sizing parameters. If a reviewer has no photo, render initials as a fallback avatar.

---

## OG Images

Open Graph images use static public paths in `app/layout.tsx` and per-page metadata:

```typescript
openGraph: {
  images: [{ url: '/SumedhMagar.jpeg', width: 1200, height: 630, alt: '...' }],
},
```

These are `metadataBase`-relative paths — Next.js resolves them against `https://sportsurgeon.in`. For blog posts, the `photo_url` from the post is used as the OG image.

---

## img vs Image

The admin post editor preview uses a plain `<img>` tag (not `next/image`) because the source URL is a dynamic upload being previewed before save:

```typescript
{/* eslint-disable-next-line @next/next/next-script-for-ga */}
{photoUrl && <img src={photoUrl} alt="Preview" className="w-full h-64 object-cover rounded-xl mb-4" />}
```

This is intentional and the eslint suppression comment is correct. Do not replace this with `<Image>` — the preview needs to render arbitrary URLs without requiring them to be in `remotePatterns`.

---

## Performance Considerations

- All above-the-fold images have `priority` — preloaded in `<head>`
- Blog listing thumbnails do NOT have `priority` — below fold, lazy-loaded
- `object-cover` ensures images fill their containers without distortion
- `display: swap` on fonts prevents layout shift
- Static images in `/public/` are served at the edge by Vercel CDN
- Supabase Storage images are also CDN-served
