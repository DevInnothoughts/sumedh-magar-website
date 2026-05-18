# Dr. Sumedh Magar - Sports Orthopedic Surgeon Portfolio Website

A professional portfolio and educational website for Dr. Sumedh Magar, Founder & Director of I-Sport Medical Centre, Pune, India.

## Features

### Public Pages
- **Home**: Hero section, key statistics, latest articles, and patient testimonials
- **About**: Complete biography, education timeline, professional experience, memberships
- **Clinical Expertise**: Detailed surgical procedures and conditions treated
- **Research & Publications**: Paper presentations, dissertations, and conference attendance
- **Sports & Achievements**: Athletic accomplishments and medals
- **Articles**: Dynamic blog with search, filtering, and comment functionality
- **Testimonials**: Patient reviews with submission form
- **Contact**: Contact form with appointment booking integration

### Admin Panel
- Secure authentication system
- Post/Article management (create, edit, delete, publish/draft)
- Comments moderation (approve/delete)
- Testimonials moderation (approve/delete)
- Contact form submissions and appointment requests management
- Media library for images and videos

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v7
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Backend**: Supabase (PostgreSQL + Authentication + Storage)
- **Notifications**: React Toastify
- **Fonts**: Montserrat (headings) + Open Sans (body)

## Design System

### Colors
- **Navy Blue**: `#003366` (Primary brand color)
- **Teal**: `#1BA39C` (Accent color)
- **White**: `#FFFFFF`
- **Silver Gray**: `#E6E6E6`

### Typography
- **Headings**: Montserrat (600, 700, 800)
- **Body**: Open Sans (400, 500, 600)

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Schema

### Tables
- `posts` - Articles and blog posts
- `contacts` - Contact form submissions and appointment requests
- `testimonials` - Patient testimonials
- `comments` - Comments on articles

### Storage Buckets
- `post-images` - Featured images for articles
- `post-videos` - Video content
- `testimonial-photos` - Patient photos (optional)

## Admin Access

See `ADMIN_SETUP.md` for admin user creation and login instructions.

**Admin URL**: `/admin`

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## Key Features

### For Patients
- Learn about Dr. Magar's expertise and experience
- Read articles on sports medicine and recovery
- Submit testimonials and comments
- Book appointments through contact form
- View patient success stories

### For Dr. Magar (Admin)
- Publish articles and educational content
- Moderate comments and testimonials
- Manage patient inquiries and appointment requests
- Upload photos and videos from clinic and events
- Track article views and engagement

## Content Management

### Publishing Articles
1. Login to admin panel
2. Create new post with rich text editor
3. Add category and subcategory
4. Upload featured image
5. Add video URL (YouTube or upload)
6. Save as draft or publish immediately

### Managing Comments
- All comments require approval before appearing publicly
- Review and approve/delete from admin panel
- Email notifications for new comments (coming soon)

### Managing Testimonials
- Patients submit testimonials via public form
- Admin reviews and approves before publishing
- Include rating (1-5 stars) and treatment type

## Security

- Row Level Security (RLS) enabled on all tables
- Public read access only for approved/published content
- Admin authentication required for all write operations
- HTTPS enforced in production
- Secure password hashing via Supabase Auth

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lighthouse Score: 90+ (target)
- Lazy loading for images
- Code splitting for routes
- Optimized bundle size
- CDN delivery for static assets

## Future Enhancements

- Advanced admin dashboard with analytics
- Email notifications for appointments
- Multi-language support (Marathi, Hindi)
- Patient portal for medical records
- Online payment integration
- Video consultation booking
- Mobile app (React Native)

## License

Copyright © 2024 Dr. Sumedh Magar. All rights reserved.

## Contact

**I-Sport Medical Centre**
A-13, UG Floor, Madhukosh Society
Balewadi, Pune 411045
Phone: +91 9226607171
Email: sumedh@isportmedicalcentre.com
Website: www.isportmedicalcentre.com

---

*Built with precision and care for exceptional sports medicine*
