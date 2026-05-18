/*
  # Create Google Reviews Table

  1. New Tables
    - `google_reviews`
      - `id` (uuid, primary key)
      - `google_review_id` (text, unique) - The actual review ID from Google
      - `author_name` (text) - Name of the reviewer
      - `author_photo_url` (text, nullable) - Reviewer's profile photo URL
      - `rating` (integer) - Rating from 1-5 stars
      - `review_text` (text) - The review content
      - `review_date` (timestamptz) - When the review was posted
      - `relative_time_description` (text) - e.g., "2 months ago"
      - `google_review_url` (text) - Direct link to the review on Google Maps
      - `is_featured` (boolean) - Manually mark reviews for homepage display
      - `is_active` (boolean) - Enable/disable reviews
      - `created_at` (timestamptz) - When synced to database
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `google_reviews` table
    - Add policy for public read access (reviews are public)
    - Add policy for authenticated admins to manage reviews
*/

CREATE TABLE IF NOT EXISTS google_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  google_review_id text UNIQUE NOT NULL,
  author_name text NOT NULL,
  author_photo_url text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text NOT NULL,
  review_date timestamptz NOT NULL,
  relative_time_description text DEFAULT '',
  google_review_url text NOT NULL,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE google_reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active reviews
CREATE POLICY "Anyone can view active reviews"
  ON google_reviews FOR SELECT
  TO public
  USING (is_active = true);

-- Policy: Authenticated users can view all reviews
CREATE POLICY "Authenticated users can view all reviews"
  ON google_reviews FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert reviews
CREATE POLICY "Authenticated users can insert reviews"
  ON google_reviews FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update reviews
CREATE POLICY "Authenticated users can update reviews"
  ON google_reviews FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete reviews
CREATE POLICY "Authenticated users can delete reviews"
  ON google_reviews FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_google_reviews_rating ON google_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_google_reviews_featured ON google_reviews(is_featured);
CREATE INDEX IF NOT EXISTS idx_google_reviews_active ON google_reviews(is_active);
CREATE INDEX IF NOT EXISTS idx_google_reviews_date ON google_reviews(review_date DESC);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_google_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_google_reviews_updated_at
  BEFORE UPDATE ON google_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_google_reviews_updated_at();