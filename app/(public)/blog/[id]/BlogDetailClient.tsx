'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Eye, Send, Clock, Share2, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { supabase, type Post, type Comment } from '@/lib/supabase';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { format } from 'date-fns';

type CommentFormData = {
  author_name: string;
  author_email: string;
  comment_text: string;
};

interface BlogDetailClientProps {
  post: Post;
  initialComments: Comment[];
  relatedPosts: Post[];
}

function readingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

export default function BlogDetailClient({ post, initialComments, relatedPosts }: BlogDetailClientProps) {
  const [submitting, setSubmitting] = useState(false);
  const comments = initialComments;
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CommentFormData>();

  useEffect(() => {
    void supabase.rpc('increment_post_views', { post_id: post.id });
  }, [post.id]);

  const onSubmit = async (data: CommentFormData) => {
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert([{ post_id: post.id, ...data, is_approved: false }]);
      if (error) throw error;
      toast.success('Comment submitted! It will appear after approval.');
      reset();
    } catch {
      toast.error('Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: post.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container-custom max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-neutral-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-700 truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary hover:text-primary-600 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>

          <Card>
            {post.photo_url && (
              <div className="relative w-full h-96 mb-6">
                <Image
                  src={post.photo_url}
                  alt={post.title}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
            )}

            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {post.category}
              </span>
              {post.subcategory && (
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                  {post.subcategory}
                </span>
              )}
            </div>

            <h1 className="text-secondary mb-4">{post.title}</h1>

            <div className="flex items-center justify-between flex-wrap gap-4 text-neutral-600 text-sm mb-8 pb-8 border-b border-neutral-200">
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {format(new Date(post.created_at), 'MMMM d, yyyy')}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  {post.view_count} views
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {readingTime(post.description)} min read
                </div>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            <div
              className="prose prose-lg max-w-none mb-8 prose-headings:font-heading prose-headings:text-secondary prose-a:text-primary"
              style={{
                hyphens: 'none',
                wordBreak: 'normal',
                overflowWrap: 'break-word',
                whiteSpace: 'normal',
              }}
              dangerouslySetInnerHTML={{ __html: post.description }}
            />

            {post.video_url && (
              <div className="my-8">
                {post.video_url.includes('youtube.com') || post.video_url.includes('youtu.be') ? (
                  <div className="aspect-video">
                    <iframe
                      src={post.video_url.replace('watch?v=', 'embed/')}
                      className="w-full h-full rounded-2xl"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <video controls className="w-full rounded-2xl">
                    <source src={post.video_url} />
                  </video>
                )}
              </div>
            )}
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-heading font-bold text-secondary mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Card key={related.id}>
                    {related.photo_url && (
                      <div className="relative w-full h-32 mb-3">
                        <Image
                          src={related.photo_url}
                          alt={related.title}
                          fill
                          className="object-cover rounded-xl"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <h4 className="font-heading font-semibold text-secondary text-sm mb-2 line-clamp-2">
                      {related.title}
                    </h4>
                    <Link
                      href={`/blog/${related.slug || related.id}`}
                      className="text-primary text-sm font-medium hover:text-primary-600 inline-flex items-center"
                    >
                      Read <ArrowLeft className="w-3 h-3 ml-1 rotate-180" />
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div className="mt-12">
            <h2 className="text-2xl font-heading font-bold text-secondary mb-6">
              Comments ({comments.length})
            </h2>

            {comments.length > 0 && (
              <div className="space-y-4 mb-8">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <p className="font-semibold text-secondary mb-1">{comment.author_name}</p>
                    <p className="text-sm text-neutral-500 mb-3">
                      {format(new Date(comment.created_at), 'MMMM d, yyyy')}
                    </p>
                    <p className="text-neutral-700">{comment.comment_text}</p>
                  </Card>
                ))}
              </div>
            )}

            <Card>
              <h3 className="text-xl font-heading font-semibold text-secondary mb-4">
                Leave a Comment
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-neutral-700 font-medium mb-2">Name *</label>
                  <input
                    {...register('author_name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                  {errors.author_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.author_name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-2">Email *</label>
                  <input
                    {...register('author_email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors"
                    placeholder="your.email@example.com"
                  />
                  {errors.author_email && (
                    <p className="text-red-500 text-sm mt-1">{errors.author_email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-neutral-700 font-medium mb-2">Comment *</label>
                  <textarea
                    {...register('comment_text', { required: 'Comment is required' })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Share your thoughts..."
                  />
                  {errors.comment_text && (
                    <p className="text-red-500 text-sm mt-1">{errors.comment_text.message}</p>
                  )}
                </div>
                <Button type="submit" variant="primary" disabled={submitting}>
                  {submitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 inline mr-2" />
                      Submit Comment
                    </>
                  )}
                </Button>
                <p className="text-sm text-neutral-500">
                  Your comment will be reviewed before being published
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
