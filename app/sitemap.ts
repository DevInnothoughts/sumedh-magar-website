import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const SITE_URL = 'https://sportsurgeon.in';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/orthopedic-surgeon-pune`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.95 },
    { url: `${SITE_URL}/expertise`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/sports-medicine`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/research`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    // Treatments
    { url: `${SITE_URL}/treatments`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/treatments/acl-tear-treatment-pune`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/treatments/knee-arthroscopy-pune`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/treatments/shoulder-arthroscopy-pune`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/treatments/meniscus-tear-treatment-pune`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/treatments/knee-pain-treatment-pune`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/treatments/sports-rehabilitation-pune`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    // Sports Injuries
    { url: `${SITE_URL}/sports-injuries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/sports-injuries/cricket-injuries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/sports-injuries/football-knee-injuries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/sports-injuries/gym-shoulder-injuries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/sports-injuries/runner-knee-pain`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Conditions
    { url: `${SITE_URL}/conditions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/conditions/arthritis`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/conditions/ligament-injuries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/conditions/tendon-injuries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/conditions/cartilage-injuries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/conditions/shoulder-instability`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    // Locations
    { url: `${SITE_URL}/locations/orthopedic-doctor-balewadi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/locations/orthopedic-doctor-baner`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/locations/sports-injury-doctor-wakad`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/locations/orthopedic-surgeon-hinjewadi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Legal
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/cookie-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/medical-disclaimer`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  try {
    const { data: posts } = await supabase
      .from('posts')
      .select('id, updated_at')
      .eq('status', 'published');

    const blogRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
      url: `${SITE_URL}/blog/${post.id}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'weekly',
      priority: 0.75,
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}
