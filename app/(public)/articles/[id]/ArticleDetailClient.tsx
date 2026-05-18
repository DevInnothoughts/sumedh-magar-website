'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Eye, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { supabase, Post, Comment } from '@/lib/supabase';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { format } from 'date-fns';

type CommentFormData = {
  author_name: string;
  author_email: string;
  comment_text: string;
};

export default function ArticleDetailClient() {
  const params = useParams();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CommentFormData>();

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchComments();
      incrementViewCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      if (data) setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const incrementViewCount = async () => {
    try {
      await supabase.rpc('increment_post_views', { post_id: id });
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  const onSubmit = async (data: CommentFormData) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from('comments').insert([
        {
          post_id: id,
          ...data,
          is_approved: false,
        },
      ]);

      if (error) throw error;

      toast.success('Comment submitted! It will appear after approval.');
      reset();
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading fullScreen />;
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-secondary mb-4">Article not found</h2>
          <Link href="/articles">
            <Button variant="primary">Back to Articles</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      <section className="section-padding">
        <div className="container-custom max-w-4xl mx-auto">
          <Link href="/articles" className="inline-flex items-center text-primary hover:text-primary-600 mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Articles
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

            <div className="flex items-center gap-2 mb-4">
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

            <div className="flex items-center gap-6 text-neutral-600 text-sm mb-8 pb-8 border-b border-neutral-200">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {format(new Date(post.created_at), 'MMMM d, yyyy')}
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                {post.view_count} views
              </div>
            </div>

            <div
              className="prose prose-lg max-w-none mb-8"
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
              <h3 className="text-xl font-heading font-semibold text-secondary mb-4">Leave a Comment</h3>
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
                  {submitting ? 'Submitting...' : (
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
