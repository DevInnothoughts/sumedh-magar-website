/*
  # Add Sample Testimonials
  
  1. Purpose
    - Insert 5 sample approved testimonials into the testimonials table
    - Provide immediate visual content for the testimonials page and homepage
    - Showcase diverse treatment types and patient experiences
  
  2. Sample Data
    - All testimonials are pre-approved (is_approved = true)
    - Include various treatment types: ACL reconstruction, knee replacement, shoulder surgery, sports injury rehab
    - Ratings range from 4-5 stars to reflect positive patient experiences
    - Testimonial text is realistic and professionally written
  
  3. Important Notes
    - These testimonials are sample data for demonstration purposes
    - Each testimonial has a realistic patient name and treatment type
    - All timestamps are set to recent dates for freshness
*/

-- Insert sample testimonials
INSERT INTO testimonials (patient_name, treatment_type, testimonial_text, rating, is_approved, created_at)
VALUES 
  (
    'Rajesh Sharma',
    'ACL Reconstruction',
    'Dr. Magar performed my ACL reconstruction surgery and the results have been outstanding. His expertise and attention to detail gave me confidence throughout the process. I am back to playing cricket within 8 months, which exceeded my expectations. Highly recommend his care!',
    5,
    true,
    now() - interval '15 days'
  ),
  (
    'Priya Deshmukh',
    'Knee Replacement',
    'After years of knee pain, Dr. Magar recommended a knee replacement. The surgery went smoothly and his post-operative care plan was comprehensive. I can now walk pain-free and enjoy daily activities again. Thank you Dr. Magar for giving me my life back!',
    5,
    true,
    now() - interval '8 days'
  ),
  (
    'Amit Patil',
    'Shoulder Arthroscopy',
    'I had a rotator cuff tear that was affecting my tennis game. Dr. Magar performed arthroscopic surgery and the recovery was faster than I anticipated. His knowledge of sports medicine is exceptional. I am back on the court and playing better than ever!',
    5,
    true,
    now() - interval '22 days'
  ),
  (
    'Sneha Kulkarni',
    'Sports Injury Rehabilitation',
    'Dr. Magar treated my ankle injury with a personalized rehabilitation program. His approach combines medical expertise with understanding of an athlete''s mindset. The care I received was professional and compassionate. I fully recovered and returned to competitive badminton.',
    4,
    true,
    now() - interval '30 days'
  ),
  (
    'Vikram Joshi',
    'Meniscus Repair',
    'I underwent meniscus repair surgery under Dr. Magar''s care. His surgical skills are excellent and he took time to explain every step of the treatment. The recovery process was well-managed and I am now running marathons again. Grateful for his expertise and dedication!',
    5,
    true,
    now() - interval '45 days'
  )
ON CONFLICT DO NOTHING;