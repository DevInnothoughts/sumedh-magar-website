import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import ArticleDetailClient from './ArticleDetailClient';

const SITE_URL = 'https://sportsurgeon.in';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = getSupabase();

  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt, description, category, photo_url')
    .eq('id', id)
    .eq('status', 'published')
    .maybeSingle();

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'This article could not be found.',
    };
  }

  const description =
    post.excerpt ||
    post.description
      .replace(/<[^>]*>/g, '')
      .substring(0, 160)
      .trim();

  const canonical = `${SITE_URL}/articles/${id}`;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: canonical,
      type: 'article',
      images: post.photo_url
        ? [{ url: post.photo_url, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.photo_url ? [post.photo_url] : undefined,
    },
    alternates: {
      canonical,
    },
  };
}

export default function ArticleDetailPage() {
  return <ArticleDetailClient />;
}
