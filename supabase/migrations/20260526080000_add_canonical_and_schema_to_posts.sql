-- Add custom_canonical_url and custom_schema columns to posts table
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS custom_canonical_url TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS custom_schema TEXT DEFAULT NULL;
