/*
  # Add Media Library Table

  ## Overview
  This migration creates the media library table for managing uploaded images and videos.

  ## New Tables

  ### media_library
  - `id` (uuid, primary key) - Unique identifier
  - `filename` (text) - Original filename
  - `file_url` (text) - URL to the file in Supabase Storage
  - `file_type` (text) - Type of file: 'image' or 'video'
  - `file_size` (integer) - File size in bytes
  - `mime_type` (text) - MIME type of the file
  - `uploaded_by` (uuid, nullable) - Reference to user who uploaded
  - `created_at` (timestamptz) - Upload timestamp

  ## Security
  - Enable RLS on media_library table
  - Public read access for all media files
  - Authenticated users can upload new media
  - Authenticated users can delete media
*/

-- Create media_library table
CREATE TABLE IF NOT EXISTS media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL CHECK (file_type IN ('image', 'video')),
  file_size integer DEFAULT 0,
  mime_type text NOT NULL,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_media_library_type ON media_library(file_type);
CREATE INDEX IF NOT EXISTS idx_media_library_created_at ON media_library(created_at DESC);

-- Enable Row Level Security
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

-- RLS Policies for media_library table
CREATE POLICY "Public can view all media"
  ON media_library FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can upload media"
  ON media_library FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete media"
  ON media_library FOR DELETE
  TO authenticated
  USING (true);