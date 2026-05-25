import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';
import type { Post, Comment } from '@/lib/supabase';

const SITE_URL = 'https://sportsurgeon.in';

export const revalidate = 300;

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function getPost(slug: string): Promise<Post | null> {
  // Support both slug and UUID fallback for backwards compatibility
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
  const { data } = await getSupabase()
    .from('posts')
    .select('*')
    .eq(isUUID ? 'id' : 'slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  return data ?? null;
}

async function getComments(postId: string): Promise<Comment[]> {
  const { data } = await getSupabase()
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false });
  return data ?? [];
}

async function getRelatedPosts(postId: string, category: string): Promise<Post[]> {
  const { data } = await getSupabase()
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .neq('id', postId)
    .limit(3);
  return data ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post)
    return {
      title: 'Article Not Found',
      description: 'This article could not be found.',
      robots: { index: false, follow: false },
    };

  const description =
    post.excerpt ||
    post.description
      .replace(/<[^>]*>/g, '')
      .substring(0, 160)
      .trim();
  const slugOrId = post.slug || post.id;
  const canonical = `${SITE_URL}/blog/${slugOrId}`;

  return {
    title: post.title,
    description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description,
      url: canonical,
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [`${SITE_URL}/about`],
      tags: [post.category, post.subcategory].filter(Boolean) as string[],
      images: post.photo_url
        ? [{ url: post.photo_url, width: 1200, height: 630, alt: post.title }]
        : [{ url: `${SITE_URL}/SumedhMagar.jpeg`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.photo_url ? [post.photo_url] : [`${SITE_URL}/SumedhMagar.jpeg`],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // id here is actually a slug (or legacy UUID) — getPost handles both
  const post = await getPost(id);

  if (!post) notFound();

  // Always use post.id (UUID) for database joins
  const [comments, relatedPosts] = await Promise.all([
    getComments(post.id),
    getRelatedPosts(post.id, post.category),
  ]);

  const slugOrId = post.slug || post.id;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description:
      post.excerpt ||
      post.description
        .replace(/<[^>]*>/g, '')
        .substring(0, 160)
        .trim(),
    image: post.photo_url ? [post.photo_url] : [`${SITE_URL}/SumedhMagar.jpeg`],
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Physician',
      name: 'Dr. Sumedh Magar',
      url: `${SITE_URL}/about`,
      jobTitle: 'Sports Orthopedic Surgeon',
    },
    publisher: {
      '@type': 'MedicalOrganization',
      name: 'I-SPORT Medical Centre',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/SumedhMagar.jpeg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slugOrId}` },
    articleSection: post.category,
    keywords: [post.category, post.subcategory].filter(Boolean).join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${slugOrId}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogDetailClient post={post} initialComments={comments} relatedPosts={relatedPosts} />
    </>
  );
}
