import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import BlogClient from './BlogClient';
import type { Post } from '@/lib/supabase';

const SITE_URL = 'https://sportsurgeon.in';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog – Sports Medicine & Orthopedic Insights',
  description:
    'Expert blog on sports injuries, ACL reconstruction, knee arthroscopy, shoulder surgery, and athlete recovery by Dr. Sumedh Magar – Sports Orthopedic Surgeon, Pune.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/blog`,
    title: 'Blog | Dr. Sumedh Magar – Sports Orthopedic Surgeon',
    description:
      'Expert insights on sports injuries, orthopedic surgery, ACL reconstruction, and athlete recovery.',
    images: [{ url: `${SITE_URL}/SumedhMagar.jpeg`, width: 1200, height: 630, alt: 'Blog by Dr. Sumedh Magar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Dr. Sumedh Magar',
    description: 'Expert articles on sports medicine, orthopedic surgery, and athlete recovery.',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
  ],
};

async function getPosts(): Promise<Post[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BlogClient initialPosts={posts} />
    </>
  );
}
