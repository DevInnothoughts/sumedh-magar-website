import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Post = {
  id: string;
  category: string;
  subcategory: string | null;
  title: string;
  description: string;
  excerpt: string | null;
  photo_url: string | null;
  video_url: string | null;
  status: 'draft' | 'published';
  view_count: number;
  created_at: string;
  updated_at: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  contact_type: 'general' | 'appointment';
  appointment_date: string | null;
  appointment_time: string | null;
  is_contacted: boolean;
  created_at: string;
};

export type Testimonial = {
  id: string;
  patient_name: string;
  treatment_type: string;
  testimonial_text: string;
  rating: number;
  photo_url: string | null;
  is_approved: boolean;
  created_at: string;
};

export type Comment = {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  comment_text: string;
  is_approved: boolean;
  created_at: string;
};

export type MediaFile = {
  id: string;
  filename: string;
  file_url: string;
  file_type: 'image' | 'video';
  file_size: number;
  mime_type: string;
  uploaded_by: string | null;
  created_at: string;
};

export type Gallery = {
  id: string;
  image_url: string;
  category: string;
  caption: string | null;
  created_at: string;
};

export type GoogleReview = {
  id: string;
  google_review_id: string;
  author_name: string;
  author_photo_url: string | null;
  rating: number;
  review_text: string;
  review_date: string;
  relative_time_description: string;
  google_review_url: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
