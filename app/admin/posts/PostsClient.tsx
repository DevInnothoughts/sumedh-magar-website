'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, CreditCard as Edit, Trash2, Eye, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import { supabase, Post } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { AdminLayout } from '@/components/AdminLayout';

type FilterStatus = 'all' | 'published' | 'draft';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterStatus>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) { router.push('/admin'); return; }
      fetchPosts();
    }).catch(() => router.push('/admin'));
  }, [router]);

  useEffect(() => {
    const filtered = activeTab === 'all' ? posts : posts.filter((p) => (p.status?.toLowerCase() || '') === activeTab);
    setFilteredPosts(filtered);
  }, [activeTab, posts]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (data) setPosts(data.map((p) => ({ ...p, status: p.status?.toLowerCase() || 'draft' })));
    } catch {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Post deleted successfully');
      setDeleteConfirmId(null);
    } catch {
      toast.error('Failed to delete post');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus.toLowerCase() === 'published' ? 'draft' : 'published';
    try {
      const { error } = await supabase.from('posts').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
      setPosts((prev) => prev.map((p) => p.id === id ? { ...p, status: newStatus } : p));
      toast.success(`Post ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`);
    } catch {
      toast.error('Failed to update post status');
    }
  };

  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.status === 'published').length,
    drafts: posts.filter((p) => p.status === 'draft').length,
    totalViews: posts.reduce((sum, p) => sum + p.view_count, 0),
  };

  if (loading) return <Loading fullScreen />;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-3xl font-heading font-bold text-secondary">Posts Management</h2>
          <Button variant="primary" onClick={() => router.push('/admin/posts/create')}>
            <Plus className="w-5 h-5 mr-2" />
            Create New Post
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Posts', value: stats.total, color: 'secondary' },
            { label: 'Published', value: stats.published, color: 'primary' },
            { label: 'Drafts', value: stats.drafts, color: 'gold' },
            { label: 'Total Views', value: stats.totalViews, color: 'secondary' },
          ].map(({ label, value, color }) => (
            <Card key={label}><div className="text-center"><p className="text-neutral-600 mb-2">{label}</p><p className={`text-4xl font-bold text-${color}`}>{value}</p></div></Card>
          ))}
        </div>

        <Card>
          <div className="flex gap-2 border-b border-neutral-200">
            {([['all', `All Posts (${stats.total})`, 'secondary'], ['published', `Published (${stats.published})`, 'primary'], ['draft', `Drafts (${stats.drafts})`, 'gold']] as const).map(([tab, label, color]) => (
              <button key={tab} onClick={() => setActiveTab(tab as FilterStatus)} className={`px-6 py-3 font-semibold transition-all border-b-2 ${activeTab === tab ? `border-${color} text-${color}` : 'border-transparent text-neutral-600 hover:text-secondary hover:border-neutral-300'}`}>
                {label}
              </button>
            ))}
          </div>
        </Card>

        {filteredPosts.length === 0 ? (
          <Card><p className="text-center text-neutral-600 py-8">No posts found</p></Card>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${post.status === 'published' ? 'bg-primary/10 text-primary' : 'bg-gold/10 text-gold'}`}>
                          {post.status === 'published' ? <><CheckCircle className="w-3 h-3 inline mr-1" />Published</> : <><Clock className="w-3 h-3 inline mr-1" />Draft</>}
                        </span>
                        <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">{post.category}</span>
                        <span className="text-sm text-neutral-500 flex items-center gap-1"><Eye className="w-4 h-4" />{post.view_count} views</span>
                      </div>
                      <h3 className="text-xl font-semibold text-secondary mb-2">{post.title}</h3>
                      <p className="text-neutral-600 text-sm mb-2 line-clamp-2">{post.excerpt || post.description.substring(0, 150)}</p>
                      <p className="text-xs text-neutral-500">Created: {new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="flex lg:flex-col gap-2">
                      <Button variant="outline" onClick={() => router.push(`/admin/posts/edit/${post.id}`)} className="flex-1 lg:flex-none"><Edit className="w-4 h-4 mr-2" />Edit</Button>
                      <Button variant={post.status === 'published' ? 'outline' : 'primary'} onClick={() => handleToggleStatus(post.id, post.status)} className="flex-1 lg:flex-none">
                        {post.status === 'published' ? 'Unpublish' : 'Publish'}
                      </Button>
                      {deleteConfirmId === post.id ? (
                        <div className="flex flex-col gap-2">
                          <Button variant="primary" onClick={() => handleDelete(post.id)} className="bg-red-600 hover:bg-red-700">Confirm</Button>
                          <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
                        </div>
                      ) : (
                        <Button variant="outline" onClick={() => setDeleteConfirmId(post.id)} className="flex-1 lg:flex-none border-red-600 text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4 mr-2" />Delete</Button>
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
