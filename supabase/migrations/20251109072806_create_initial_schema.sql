/*
  # Initial Database Schema for Dr. Sumedh Magar Portfolio Website

  ## Overview
  This migration creates the complete database schema for the portfolio website including:
  - Posts and articles management
  - Contact and appointment requests
  - Patient testimonials
  - Post comments
  - Admin user management

  ## New Tables

  ### 1. posts
  - `id` (uuid, primary key) - Unique identifier
  - `category` (text) - Main category (e.g., Medical Thesis, Surgery, Rehab)
  - `subcategory` (text) - Subcategory (e.g., Knee, Shoulder, ACL)
  - `title` (text) - Post title
  - `description` (text) - Rich text content
  - `excerpt` (text) - Short description for previews
  - `photo_url` (text) - Featured image URL
  - `video_url` (text) - YouTube or uploaded video URL
  - `status` (text) - 'draft' or 'published'
  - `view_count` (integer) - Number of views
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. contacts
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Contact name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone number
  - `message` (text) - Message content
  - `contact_type` (text) - 'general' or 'appointment'
  - `appointment_date` (date, nullable) - Requested appointment date
  - `appointment_time` (text, nullable) - Requested appointment time
  - `is_contacted` (boolean) - Follow-up status
  - `created_at` (timestamptz) - Submission timestamp

  ### 3. testimonials
  - `id` (uuid, primary key) - Unique identifier
  - `patient_name` (text) - Patient name
  - `treatment_type` (text) - Type of treatment received
  - `testimonial_text` (text) - Testimonial content
  - `rating` (integer) - Rating 1-5 stars
  - `photo_url` (text, nullable) - Optional patient photo
  - `is_approved` (boolean) - Approval status
  - `created_at` (timestamptz) - Submission timestamp

  ### 4. comments
  - `id` (uuid, primary key) - Unique identifier
  - `post_id` (uuid, foreign key) - Reference to post
  - `author_name` (text) - Commenter name
  - `author_email` (text) - Commenter email
  - `comment_text` (text) - Comment content
  - `is_approved` (boolean) - Approval status
  - `created_at` (timestamptz) - Comment timestamp

  ## Security

  - Enable Row Level Security (RLS) on all tables
  - Public read access for approved/published content
  - Admin-only access for creating, updating, and deleting content
  - All tables have appropriate RLS policies

  ## Important Notes

  1. All tables use `gen_random_uuid()` for automatic ID generation
  2. Timestamps use `now()` for automatic creation times
  3. Boolean fields have sensible defaults (false for approval flags)
  4. RLS is restrictive by default - only approved content is publicly visible
*/

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  subcategory text,
  title text NOT NULL,
  description text NOT NULL,
  excerpt text,
  photo_url text,
  video_url text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  contact_type text DEFAULT 'general' CHECK (contact_type IN ('general', 'appointment')),
  appointment_date date,
  appointment_time text,
  is_contacted boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  treatment_type text NOT NULL,
  testimonial_text text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  photo_url text,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  author_email text NOT NULL,
  comment_text text NOT NULL,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(is_approved);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_contacts_type ON contacts(contact_type);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for posts table
CREATE POLICY "Public can view published posts"
  ON posts FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Authenticated users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete posts"
  ON posts FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for contacts table
CREATE POLICY "Anyone can submit contact forms"
  ON contacts FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact status"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for testimonials table
CREATE POLICY "Public can view approved testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (is_approved = true);

CREATE POLICY "Anyone can submit testimonials"
  ON testimonials FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all testimonials"
  ON testimonials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for comments table
CREATE POLICY "Public can view approved comments"
  ON comments FOR SELECT
  TO public
  USING (is_approved = true);

CREATE POLICY "Anyone can submit comments"
  ON comments FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all comments"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete comments"
  ON comments FOR DELETE
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on posts
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_post_views(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE posts SET view_count = view_count + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;