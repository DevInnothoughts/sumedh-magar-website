'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, Trash2, Filter, ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';
import { supabase, Comment, Post } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { AdminLayout } from '@/components/AdminLayout';

type CommentWithPost = Comment & { post?: Post };
type FilterType = 'all' | 'approved' | 'pending';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<CommentWithPost[]>([]);
  const [filteredComments, setFilteredComments] = useState<CommentWithPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) { router.push('/admin'); return; }
      fetchComments();
    }).catch(() => router.push('/admin'));
  }, [router]);

  useEffect(() => {
    let filtered = [...comments];
    if (search) filtered = filtered.filter((c) => c.author_name.toLowerCase().includes(search.toLowerCase()) || c.comment_text.toLowerCase().includes(search.toLowerCase()) || c.post?.title.toLowerCase().includes(search.toLowerCase()));
    if (filter === 'approved') filtered = filtered.filter((c) => c.is_approved);
    else if (filter === 'pending') filtered = filtered.filter((c) => !c.is_approved);
    setFilteredComments(filtered);
  }, [search, filter, comments]);

  const fetchComments = async () => {
    try {
      const { data: commentsData, error } = await supabase.from('comments').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (commentsData) {
        const { data: postsData } = await supabase.from('posts').select('id, title').in('id', commentsData.map((c) => c.post_id));
        setComments(commentsData.map((comment) => ({ ...comment, post: postsData?.find((p) => p.id === comment.post_id) })));
      }
    } catch {
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from('comments').update({ is_approved: !currentStatus }).eq('id', id);
      if (error) throw error;
      setComments((prev) => prev.map((c) => c.id === id ? { ...c, is_approved: !currentStatus } : c));
      toast.success(`Comment ${!currentStatus ? 'approved' : 'unapproved'} successfully`);
    } catch {
      toast.error('Failed to update comment');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('comments').delete().eq('id', id);
      if (error) throw error;
      setComments((prev) => prev.filter((c) => c.id !== id));
      toast.success('Comment deleted successfully');
      setDeleteConfirmId(null);
    } catch {
      toast.error('Failed to delete comment');
    }
  };

  const stats = { total: comments.length, approved: comments.filter((c) => c.is_approved).length, pending: comments.filter((c) => !c.is_approved).length };

  if (loading) return <Loading fullScreen />;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-heading font-bold text-secondary">Comments Moderation</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[['Total Comments', stats.total, 'secondary'], ['Approved', stats.approved, 'primary'], ['Pending', stats.pending, 'gold']].map(([label, value, color]) => (
            <Card key={label as string}><div className="text-center"><p className="text-neutral-600 mb-2">{label}</p><p className={`text-4xl font-bold text-${color}`}>{value}</p></div></Card>
          ))}
        </div>

        <Card>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input type="text" placeholder="Search comments..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <Filter className="w-5 h-5 text-neutral-600" />
              <div className="flex gap-2">
                {[['all', `All (${stats.total})`, 'secondary'], ['approved', `Approved (${stats.approved})`, 'primary'], ['pending', `Pending (${stats.pending})`, 'gold']].map(([tab, label, color]) => (
                  <button key={tab} onClick={() => setFilter(tab as FilterType)} className={`px-4 py-2 rounded-xl font-medium transition-all ${filter === tab ? `bg-${color} text-white` : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}`}>{label}</button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {filteredComments.length === 0 ? (
          <Card><p className="text-center text-neutral-600 py-8">No comments found</p></Card>
        ) : (
          <div className="space-y-4">
            {filteredComments.map((comment) => (
              <motion.div key={comment.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block mb-3 ${comment.is_approved ? 'bg-primary/10 text-primary' : 'bg-gold/10 text-gold'}`}>
                        {comment.is_approved ? 'Approved' : 'Pending'}
                      </span>
                      <h3 className="text-lg font-semibold text-secondary mb-1">{comment.author_name}</h3>
                      <p className="text-sm text-neutral-600 mb-2">{comment.author_email}</p>
                      {comment.post && (
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-neutral-600">On post:</span>
                          <a href={`/articles/${comment.post_id}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary-600 font-medium inline-flex items-center">
                            {comment.post.title}<ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      )}
                      <p className="text-neutral-700 italic">&quot;{comment.comment_text}&quot;</p>
                      <p className="text-sm text-neutral-500 mt-3">
                        Submitted: {new Date(comment.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="flex lg:flex-col gap-2">
                      <Button variant={comment.is_approved ? 'outline' : 'primary'} onClick={() => handleApprove(comment.id, comment.is_approved)} className="flex-1 lg:flex-none">
                        {comment.is_approved ? <><XCircle className="w-4 h-4 mr-2" />Unapprove</> : <><CheckCircle className="w-4 h-4 mr-2" />Approve</>}
                      </Button>
                      {deleteConfirmId === comment.id ? (
                        <div className="flex flex-col gap-2">
                          <Button variant="primary" onClick={() => handleDelete(comment.id)} className="bg-red-600 hover:bg-red-700">Confirm Delete</Button>
                          <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
                        </div>
                      ) : (
                        <Button variant="outline" onClick={() => setDeleteConfirmId(comment.id)} className="flex-1 lg:flex-none border-red-600 text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4 mr-2" />Delete</Button>
                      )}
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
