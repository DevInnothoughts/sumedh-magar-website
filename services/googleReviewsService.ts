import { supabase, GoogleReview } from '@/lib/supabase';

const GOOGLE_MAPS_BASE_URL =
  'https://www.google.com/maps/place/I-SPORT+Hospital+:+Orthopedic+and+Sports+Medicine/@18.5786803,73.7682788,17z/data=!4m8!3m7!1s0x3bc2b93aab7d81e9:0xcd54499a130a2342!8m2!3d18.5786752!4d73.7708537!9m1!1b1!16s%2Fg%2F11vlwwf8bc?entry=ttu';

export interface GooglePlacesReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export const fetchGoogleReviews = async (): Promise<GooglePlacesReview[]> => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) throw new Error('Supabase credentials not configured');

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('User not authenticated');

  const response = await fetch(`${supabaseUrl}/functions/v1/fetch-google-reviews`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    const details = data.details || data.rawError || '';
    const msg = data.error || 'Failed to fetch reviews';
    throw new Error(details ? `${msg}\n${details}` : msg);
  }

  if (data.reviews && Array.isArray(data.reviews)) return data.reviews;
  throw new Error('Invalid response format from edge function');
};

export const syncReviewsToDatabase = async (reviews: GooglePlacesReview[]): Promise<boolean> => {
  const reviewsToInsert = reviews.map((review) => ({
    google_review_id: `${review.author_name}_${review.time}`,
    author_name: review.author_name,
    author_photo_url: review.profile_photo_url || null,
    rating: review.rating,
    review_text: review.text,
    review_date: new Date(review.time * 1000).toISOString(),
    relative_time_description: review.relative_time_description,
    google_review_url: review.author_url || GOOGLE_MAPS_BASE_URL,
    is_active: true,
    is_featured: review.rating >= 5,
  }));

  const { error } = await supabase
    .from('google_reviews')
    .upsert(reviewsToInsert, { onConflict: 'google_review_id', ignoreDuplicates: false });

  return !error;
};

export const getReviewsFromDatabase = async (): Promise<GoogleReview[]> => {
  const { data } = await supabase
    .from('google_reviews')
    .select('*')
    .eq('is_active', true)
    .order('review_date', { ascending: false });
  return data || [];
};

export const getTopRatedReviews = async (limit = 4): Promise<GoogleReview[]> => {
  const { data } = await supabase
    .from('google_reviews')
    .select('*')
    .eq('is_active', true)
    .or('is_featured.eq.true,rating.gte.4')
    .order('is_featured', { ascending: false })
    .order('rating', { ascending: false })
    .order('review_date', { ascending: false })
    .limit(limit);
  return data || [];
};

export const toggleReviewFeatured = async (reviewId: string, isFeatured: boolean): Promise<boolean> => {
  const { error } = await supabase
    .from('google_reviews')
    .update({ is_featured: isFeatured })
    .eq('id', reviewId);
  return !error;
};

export const toggleReviewActive = async (reviewId: string, isActive: boolean): Promise<boolean> => {
  const { error } = await supabase
    .from('google_reviews')
    .update({ is_active: isActive })
    .eq('id', reviewId);
  return !error;
};

export const deleteReview = async (reviewId: string): Promise<boolean> => {
  const { error } = await supabase.from('google_reviews').delete().eq('id', reviewId);
  return !error;
};

export const getFallbackReviews = (): GoogleReview[] => [
  {
    id: '1',
    google_review_id: 'fallback_1',
    author_name: 'Rajesh Patil',
    author_photo_url: null,
    rating: 5,
    review_text:
      'Dr. Sumedh Magar is an exceptional sports medicine specialist. After my ACL injury during a football match, I was devastated. Dr. Magar not only performed an excellent surgery but also guided me through every step of rehabilitation. Highly recommend!',
    review_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    relative_time_description: '2 months ago',
    google_review_url: GOOGLE_MAPS_BASE_URL,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    google_review_id: 'fallback_2',
    author_name: 'Priya Sharma',
    author_photo_url: null,
    rating: 5,
    review_text:
      'Outstanding experience at I-SPORT Hospital! Dr. Magar treated my knee meniscus tear with arthroscopic surgery. His approach is very patient-centric. I am now pain-free and back to my regular activities.',
    review_date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    relative_time_description: '3 months ago',
    google_review_url: GOOGLE_MAPS_BASE_URL,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    google_review_id: 'fallback_3',
    author_name: 'Amit Deshmukh',
    author_photo_url: null,
    rating: 5,
    review_text:
      'Best orthopedic surgeon in Pune! Dr. Sumedh Magar performed my shoulder surgery (rotator cuff repair) and the results have been amazing. Definitely the go-to place for sports injuries.',
    review_date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    relative_time_description: '4 months ago',
    google_review_url: GOOGLE_MAPS_BASE_URL,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    google_review_id: 'fallback_4',
    author_name: 'Sneha Kulkarni',
    author_photo_url: null,
    rating: 5,
    review_text:
      'I consulted Dr. Magar for my teenage son who had a sports injury. Dr. Magar truly understands athletes and their unique needs. My son recovered completely and is now back to playing basketball.',
    review_date: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    relative_time_description: '5 months ago',
    google_review_url: GOOGLE_MAPS_BASE_URL,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
