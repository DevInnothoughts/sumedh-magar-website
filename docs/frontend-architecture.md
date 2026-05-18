# Frontend Architecture

## Overview

The frontend is built with Next.js 15 App Router, TypeScript, Tailwind CSS, and Framer Motion. The design uses a medical/professional aesthetic with a navy (`secondary`) and teal (`primary`) color palette. All components follow a consistent visual language defined in `tailwind.config.js`.

---

## Design System

### Color Palette

Defined in `tailwind.config.js`:

| Token | Value | Usage |
|---|---|---|
| `primary` | `#1BA39C` (teal) | CTAs, active states, icons, accent color |
| `primary-600` | `#158F89` | Hover states on primary elements |
| `secondary` | `#003366` (navy) | Headings, hero backgrounds, footer |
| `secondary-400` | `#335F97` | Hero gradient endpoint |
| `accent` | `#26D0C7` | Highlights, decorative elements |
| `gold` | `#F59E0B` | Draft/warning status badges |
| `neutral-*` | Gray scale | Body text, borders, backgrounds |
| `success` | `#10B981` | Success states |
| `error` | `#EF4444` | Error states |

Usage rules:
- Primary teal: interactive elements, links, checkmarks, icons in content
- Secondary navy: page headings (`text-secondary`), hero sections, footer background
- Gold: used sparingly for "draft" status only
- Never use purple or indigo

### Typography

Two fonts loaded via `next/font/google` in `app/layout.tsx`:

| Font | CSS Variable | Class | Usage |
|---|---|---|---|
| Montserrat | `--font-montserrat` | `font-heading` | All headings (h1–h4), brand name, section titles |
| Open Sans | `--font-open-sans` | `font-sans` (default) | Body text, paragraphs, labels |

Font weights: Montserrat 600/700/800. Open Sans 400/500/600. Both use `display: swap`.

### Spacing System

Based on Tailwind's 8px base unit. Custom tokens in `tailwind.config.js`:
- `spacing-18`: 4.5rem
- `spacing-88`: 22rem
- `spacing-112`: 28rem
- `spacing-128`: 32rem

### Box Shadows

```
shadow-soft:    0 2px 15px rgba(0,0,0,0.08)   — cards, elevated elements
shadow-soft-lg: 0 10px 40px rgba(0,0,0,0.1)   — dropdown menus, modals
```

---

## CSS Utility Classes

Defined in `app/globals.css`:

```css
.container-custom  — max-width container with horizontal padding
.section-padding   — consistent vertical padding for page sections
.btn-primary       — teal filled button with hover state
.btn-outline       — outline variant button
```

These are shared across all public pages and should be used instead of inline Tailwind for these repeated patterns.

---

## Component Hierarchy

```
app/layout.tsx                    ← Root: fonts, metadata, JSON-LD, Google Tag
  │
  ├── app/(public)/layout.tsx     ← Public group: <Header /> + {children} + <Footer />
  │   └── Page content
  │       └── *Client.tsx         ← Interactive client components
  │
  └── app/admin/layout.tsx        ← Admin group: force-dynamic only (no layout UI)
      └── *Client.tsx             ← Admin pages use <AdminLayout> component directly
```

### Shared Components

| Component | File | Server/Client |
|---|---|---|
| Header | `components/Header.tsx` | Client |
| Footer | `components/Footer.tsx` | Server |
| AdminLayout | `components/AdminLayout.tsx` | Client |
| Button | `components/Button.tsx` | Server |
| Card | `components/Card.tsx` | Server |
| Loading | `components/Loading.tsx` | Server |
| ImageUpload | `components/ImageUpload.tsx` | Client |
| VideoUpload | `components/VideoUpload.tsx` | Client |
| HeroCarousel | `components/HeroCarousel.tsx` | Client |
| InfoCards | `components/InfoCards.tsx` | Server |

### Button Component — `components/Button.tsx`

Supports `variant` prop: `'primary' | 'outline' | 'ghost'`. Renders a `<button>` element with appropriate Tailwind classes. Used everywhere — do not write inline button styles.

### Card Component — `components/Card.tsx`

A white rounded container with `shadow-soft` and consistent padding. Used for content cards, FAQ items, sidebar panels, form containers.

---

## Navigation Structure

**Header** (`components/Header.tsx`) has two behaviors:

**Desktop (lg+):**
- Horizontal nav bar
- Dropdown menus for "Treatments" (7 items) and "Sports Injuries" (5 items)
- Framer Motion `AnimatePresence` for dropdown open/close animation
- Click-outside detection via `useRef`

**Mobile (< lg):**
- Hamburger button toggles full-width overlay
- Accordion expansion for dropdown items
- Framer Motion height animation for smooth open/close

**Navigation items:**
```
Home | About | Treatments ▾ | Sports Injuries ▾ | Expertise | Sports Medicine | Blog | Gallery | Contact
```

**Footer** (`components/Footer.tsx`) has 5 columns:
1. Brand/credentials blurb
2. Quick Links
3. Treatments (with SEO-targeted links)
4. Contact Info + legal links
5. Social / clinic hours

---

## Page Layout Patterns

### Public Content Pages

All public pages share this layout structure:

```tsx
<div className="min-h-screen pt-20">  {/* pt-20 clears the fixed header */}

  {/* Hero section */}
  <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
    <div className="container-custom max-w-5xl mx-auto">
      {/* breadcrumb + h1 + CTA */}
    </div>
  </section>

  {/* Content */}
  <section className="section-padding bg-white">
    <div className="container-custom max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">{/* main content */}</div>
        <aside>{/* sidebar with Book CTA + related links */}</aside>
      </div>
    </div>
  </section>

</div>
```

The `pt-20` is necessary on every public page to account for the fixed-position header height.

### Hero Gradient

Standard hero background for all treatment/content pages:
```
bg-gradient-to-br from-secondary to-secondary-400
```
(Navy to lighter navy, bottom-right direction)

### Sidebar Pattern

Right-side sidebar cards are present on all treatment and condition pages:
1. "Book a Consultation" card (CTA + phone number)
2. "Related Treatments" card (3–4 links)
3. Optional third card (sports injuries, conditions, etc.)

---

## Animation Patterns

### Page Entry (cards/sections)

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
```

Stagger delay of `0.1s * index` creates a wave effect for lists of cards.

### Header Scroll Effect

```typescript
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 20);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

At 20px scroll, header transitions from semi-transparent to solid white with `shadow-soft`.

---

## Responsive Breakpoints

Standard Tailwind breakpoints used throughout:
- `sm`: 640px — two-column grids, form layouts
- `md`: 768px — three-column grids, admin stats
- `lg`: 1024px — desktop nav, main/sidebar split
- `xl`: 1280px — wider container content

All grids default to single column on mobile and expand at appropriate breakpoints.
