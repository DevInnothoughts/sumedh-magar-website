'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Trash2, Eye, EyeOff, Award, RefreshCw, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { GoogleReview } from '@/lib/supabase';
import {
  getReviewsFromDatabase,
  toggleReviewFeatured,
  toggleReviewActive,
  deleteReview,
  fetchGoogleReviews,
  syncReviewsToDatabase,
} from '@/services/googleReviewsService';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { AdminLayout } from '@/components/AdminLayout';

export default function AdminGoogleReviewsPage() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) { router.push('/admin'); return; }
      loadReviews();
    }).catch(() => router.push('/admin'));
  }, [router]);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await getReviewsFromDatabase();
      setReviews(data);
    } catch {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncFromGoogle = async () => {
    setSyncing(true);
    try {
      toast.info('Syncing reviews from Google...');
      const googleReviews = await fetchGoogleReviews();

      if (googleReviews.length === 0) {
        toast.warning('No reviews fetched. Check API configuration or Google may not have returned reviews.');
        setSyncing(false);
        return;
      }

      const success = await syncReviewsToDatabase(googleReviews);
      if (success) {
        toast.success(`Successfully synced ${googleReviews.length} reviews from Google!`);
        await loadReviews();
      } else {
        toast.error('Failed to sync reviews to database');
      }
    } catch (error: unknown) {
      toast.error((error as Error)?.message || 'Failed to sync reviews from Google', { autoClose: 8000 });
    } finally {
      setSyncing(false);
    }
  };

  const handleToggleFeatured = async (reviewId: string, currentStatus: boolean) => {
    const success = await toggleReviewFeatured(reviewId, !currentStatus);
    if (success) {
      setReviews((prev) => prev.map((r) => r.id === reviewId ? { ...r, is_featured: !currentStatus } : r));
      toast.success(!currentStatus ? 'Review marked as featured' : 'Review unmarked as featured');
    } else {
      toast.error('Failed to update review');
    }
  };

  const handleToggleActive = async (reviewId: string, currentStatus: boolean) => {
    const success = await toggleReviewActive(reviewId, !currentStatus);
    if (success) {
      setReviews((prev) => prev.map((r) => r.id === reviewId ? { ...r, is_active: !currentStatus } : r));
      toast.success(!currentStatus ? 'Review activated' : 'Review deactivated');
    } else {
      toast.error('Failed to update review');
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    const success = await deleteReview(reviewId);
    if (success) {
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      toast.success('Review deleted successfully');
    } else {
      toast.error('Failed to delete review');
    }
  };

  const averageRating = reviews.length === 0 ? 0 : (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  const featuredCount = reviews.filter((r) => r.is_featured).length;
  const activeCount = reviews.filter((r) => r.is_active).length;

  if (loading) return <Loading fullScreen />;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-heading font-bold text-secondary">Google Reviews</h2>
            <p className="text-neutral-600 mt-1">Manage reviews from Google Maps</p>
          </div>
          <Button variant="primary" onClick={handleSyncFromGoogle} disabled={syncing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync from Google'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card><div className="flex items-center justify-between"><div><p className="text-sm text-neutral-600">Total Reviews</p><p className="text-3xl font-bold text-secondary mt-1">{reviews.length}</p></div><div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Star className="w-6 h-6 text-blue-600" /></div></div></Card>
          <Card><div className="flex items-center justify-between"><div><p className="text-sm text-neutral-600">Average Rating</p><p className="text-3xl font-bold text-secondary mt-1">{averageRating}</p></div><div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center"><Star className="w-6 h-6 text-yellow-600 fill-yellow-600" /></div></div></Card>
          <Card><div className="flex items-center justify-between"><div><p className="text-sm text-neutral-600">Featured</p><p className="text-3xl font-bold text-secondary mt-1">{featuredCount}</p></div><div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"><Award className="w-6 h-6 text-primary" /></div></div></Card>
          <Card><div className="flex items-center justify-between"><div><p className="text-sm text-neutral-600">Active</p><p className="text-3xl font-bold text-secondary mt-1">{activeCount}</p></div><div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><Eye className="w-6 h-6 text-green-600" /></div></div></Card>
        </div>

        {reviews.length === 0 ? (
          <Card>
            <div className="py-12 text-center">
              <Star className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary mb-2">No reviews yet</h3>
              <p className="text-neutral-600">Click &quot;Sync from Google&quot; to fetch reviews from Google Maps</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Card className={!review.is_active ? 'opacity-60' : ''}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {review.author_photo_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={review.author_photo_url} alt={review.author_name} className="w-10 h-10 rounded-full" />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                            {review.author_name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-secondary">{review.author_name}</p>
                            {review.is_featured && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                <Award className="w-3 h-3" />Featured
                              </span>
                            )}
                            {!review.is_active && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600">Inactive</span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-500">{review.relative_time_description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'}`} />
                        ))}
                      </div>

                      <p className="text-neutral-700 text-sm leading-relaxed mb-3">{review.review_text}</p>

                      <a href={review.google_review_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:text-secondary transition-colors">
                        View on Google<ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => handleToggleFeatured(review.id, review.is_featured)} className={`p-2 rounded-lg transition-colors ${review.is_featured ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`} title={review.is_featured ? 'Remove from featured' : 'Mark as featured'}>
                        <Award className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleToggleActive(review.id, review.is_active)} className={`p-2 rounded-lg transition-colors ${review.is_active ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`} title={review.is_active ? 'Deactivate' : 'Activate'}>
                        {review.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                      <button onClick={() => handleDelete(review.id)} className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors" title="Delete review">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
