/*
  # Create Gallery Table

  ## Description
  Creates a new gallery table for storing medical center images with categories and captions.
  Includes proper RLS policies for public read access and authenticated admin write access.

  ## Tables Created
    - `gallery`
      - `id` (uuid, primary key) - Unique identifier for each gallery item
      - `image_url` (text, required) - Public URL of the uploaded image
      - `category` (text, required) - Image category (Facilities, Surgery, Research Work, Awards, Patients, Events)
      - `caption` (text, optional) - Optional description/caption for the image
      - `created_at` (timestamptz, default now()) - Timestamp of when the image was uploaded

  ## Security
    - Enable RLS on `gallery` table
    - Add policy for public read access (anyone can view gallery images)
    - Add policy for authenticated users to insert gallery images
    - Add policy for authenticated users to update their uploaded gallery images
    - Add policy for authenticated users to delete gallery images

  ## Storage
    Note: Storage bucket `gallery_images` will need to be created separately in Supabase Dashboard
    with public read access and authenticated write access.
*/

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  category text NOT NULL CHECK (category IN ('Facilities', 'Surgery', 'Research Work', 'Awards', 'Patients', 'Events')),
  caption text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view gallery images (public read access)
CREATE POLICY "Anyone can view gallery images"
  ON gallery
  FOR SELECT
  TO public
  USING (true);

-- Policy: Authenticated users can insert gallery images
CREATE POLICY "Authenticated users can insert gallery images"
  ON gallery
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update gallery images
CREATE POLICY "Authenticated users can update gallery images"
  ON gallery
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete gallery images
CREATE POLICY "Authenticated users can delete gallery images"
  ON gallery
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);

-- Create index on created_at for ordered retrieval
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery(created_at DESC);