# Instagram Photos Integration Guide

## Overview

The website is designed to showcase authentic photos from I-Sport Medical Centre's Instagram account (@isport_pune). This guide explains how to add these photos to the website.

---

## Instagram Account

**Account**: [@isport_pune](https://www.instagram.com/isport_pune/)

---

## Where Photos Are Needed

### 1. Home Page Hero Section
- **Type**: Clinic exterior, surgery room, or Dr. Magar with patients
- **Dimensions**: 1920x1080px (landscape)
- **Location**: Background image for hero section
- **How to add**: Upload to Supabase Storage and update CSS background-image

### 2. About Page
- **Type**: Professional photo of Dr. Magar
- **Dimensions**: 800x800px (square or portrait)
- **Location**: Hero section or biography section
- **How to add**: Upload to public folder or Supabase Storage

### 3. Clinical Expertise Page
- **Type**: Medical equipment, surgery scenes (if allowed), clinic facilities
- **Dimensions**: 1200x600px (landscape)
- **Location**: Hero section background
- **How to add**: Upload to Supabase Storage

### 4. Sports & Achievements Page
- **Type**:
  - Swimming medals and certificates
  - Basketball team photos
  - Conference attendance photos
  - Award ceremonies
- **Dimensions**: Various (800x600px recommended)
- **Location**: Photo gallery grid
- **How to add**: Create gallery component with images from Supabase Storage

### 5. Facility Photos Throughout Site
- **Type**:
  - Clinic waiting area
  - Consultation rooms
  - Rehabilitation equipment
  - Movement analysis lab
  - Team photos
- **Dimensions**: Various
- **Location**: Various sections as needed

---

## How to Download Instagram Photos

### Method 1: Manual Download (Recommended)
1. Visit https://www.instagram.com/isport_pune/
2. Open each photo post
3. Take screenshots or use browser tools to save images
4. Use image editing software to crop and resize as needed

### Method 2: Using Instagram Download Tools
1. Use online tools like:
   - SaveInsta.app
   - DownloadGram.com
   - InstaDownloader.com
2. Paste Instagram post URL
3. Download full-resolution image

### Method 3: Official Instagram Export
1. Login to Instagram account
2. Go to Settings → Privacy → Download Your Information
3. Request download
4. Receive link via email with all photos

---

## Photo Upload Process

### Step 1: Prepare Photos
- Resize to recommended dimensions
- Optimize for web (use tools like TinyPNG, ImageOptim)
- Target file size: < 500KB per image
- Format: JPG for photos, PNG for graphics

### Step 2: Upload to Supabase Storage

**Option A: Via Supabase Dashboard**
1. Go to Supabase Dashboard
2. Navigate to Storage
3. Select appropriate bucket:
   - `post-images` for article featured images
   - Create new bucket `site-assets` for general website photos
4. Upload files
5. Copy public URL

**Option B: Via Admin Panel (Once Built)**
1. Login to admin panel
2. Navigate to Media Library
3. Upload photos
4. Use in articles or pages

### Step 3: Add Photos to Website

**For Static Pages (Hero Backgrounds)**
1. Upload photo to `public` folder or Supabase Storage
2. Get public URL
3. Update component with image URL

Example for Home page hero:
```tsx
<section
  className="hero-section"
  style={{ backgroundImage: `url('YOUR_IMAGE_URL')` }}
>
```

**For Dynamic Content (Articles)**
1. Login to admin panel
2. Create/edit post
3. Upload featured image
4. Publish post

---

## Recommended Photo Categories

### Category 1: Clinic & Facilities
- Exterior building shot
- Reception/waiting area
- Consultation rooms
- Rehabilitation equipment
- Movement analysis lab
- Modern medical equipment

### Category 2: Professional Photos
- Dr. Magar in white coat
- Dr. Magar with patients (with consent)
- Dr. Magar at conferences
- Dr. Magar giving presentations

### Category 3: Sports Achievements
- Swimming medals (close-up)
- Basketball team photo
- Award certificates
- Conference badges/certificates

### Category 4: Patient Care (With Consent)
- Rehabilitation sessions (faces blurred if needed)
- Treatment demonstrations
- Success stories (before/after, with permission)

### Category 5: Events & Activities
- Health camps
- Conference attendance
- Team activities
- Educational workshops

---

## Photo Guidelines

### DO's
✅ Use high-quality, professional photos
✅ Ensure proper lighting and composition
✅ Get patient consent for any photos including patients
✅ Optimize images for web (compress file size)
✅ Use consistent photo style and quality
✅ Include alt text for accessibility
✅ Maintain professional medical aesthetic

### DON'Ts
❌ Use low-resolution or pixelated images
❌ Include patient faces without consent
❌ Use copyrighted images without permission
❌ Upload extremely large file sizes (>2MB)
❌ Use irrelevant or stock photos
❌ Include sensitive medical information

---

## Image Specifications

### Hero Sections (Full-width backgrounds)
- Dimensions: 1920x1080px
- Format: JPG
- File size: < 800KB
- Aspect ratio: 16:9

### Featured Images (Article thumbnails)
- Dimensions: 800x600px
- Format: JPG
- File size: < 300KB
- Aspect ratio: 4:3

### Gallery Images
- Dimensions: 600x600px
- Format: JPG
- File size: < 200KB
- Aspect ratio: 1:1 (square)

### Team/Professional Photos
- Dimensions: 400x500px
- Format: JPG
- File size: < 150KB
- Aspect ratio: 4:5 (portrait)

---

## SEO Best Practices

### Image Alt Text
Every image should have descriptive alt text:
- Bad: "image1.jpg"
- Good: "Dr. Sumedh Magar performing ACL reconstruction surgery"
- Great: "Dr. Sumedh Magar, sports orthopedic surgeon, performing arthroscopic ACL reconstruction at I-Sport Medical Centre, Pune"

### File Naming
Use descriptive file names:
- Bad: IMG_1234.jpg
- Good: dr-sumedh-magar-clinic.jpg
- Great: isport-medical-centre-balewadi-pune-exterior.jpg

---

## Priority Image List

### High Priority (Add These First)
1. Dr. Magar professional headshot
2. Clinic exterior photo
3. Consultation room
4. 3-5 photos for Articles (if you have sample articles)
5. 2-3 patient testimonial photos (optional, with consent)

### Medium Priority
1. Rehabilitation equipment
2. Sports achievements photos
3. Conference photos
4. Team photos
5. Health camp photos

### Low Priority
1. Additional facility photos
2. Equipment close-ups
3. Event photos
4. Miscellaneous clinical photos

---

## Example Instagram Posts to Use

Based on @isport_pune Instagram, look for:
1. Posts showing the clinic facilities
2. Posts about sports medicine treatments
3. Posts from conferences and events
4. Educational posts (can be featured in Articles section)
5. Patient success stories (with permission)
6. Team photos and events

---

## Next Steps

1. ✅ Review Instagram account @isport_pune
2. ✅ Download 10-15 key photos
3. ✅ Optimize images for web
4. ✅ Create Supabase Storage bucket `site-assets` if needed
5. ✅ Upload photos to Supabase or public folder
6. ✅ Add photos to appropriate pages
7. ✅ Test on mobile and desktop
8. ✅ Verify loading speeds

---

## Support

For help with photo integration or any technical questions, refer to the main README.md or contact the development team.

---

*This guide will help you populate the website with authentic, professional photos that represent the I-Sport Medical Centre brand*
