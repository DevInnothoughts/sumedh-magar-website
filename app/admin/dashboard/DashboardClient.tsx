'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Users, Eye, Clock, TrendingUp } from 'lucide-react';
import { toast } from 'react-toastify';
import { supabase, Post, Comment, Contact } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/Button';

type DashboardStats = {
  totalPosts: number; publishedPosts: number; draftPosts: number; totalViews: number;
  pendingComments: number; approvedComments: number; totalContacts: number; pendingContacts: number;
};

type ActivityItem = { type: string; data: Comment | Contact; time: string };

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({ totalPosts: 0, publishedPosts: 0, draftPosts: 0, totalViews: 0, pendingComments: 0, approvedComments: 0, totalContacts: 0, pendingContacts: 0 });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) { router.push('/admin'); return; }
      fetchDashboardData();
    }).catch(() => router.push('/admin'));
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const [postsResult, commentsResult, contactsResult] = await Promise.all([
        supabase.from('posts').select('*'),
        supabase.from('comments').select('*'),
        supabase.from('contacts').select('*'),
      ]);

      const posts = (postsResult.data || []).map((p: Post) => ({ ...p, status: (p.status?.toLowerCase() || 'draft') as 'draft' | 'published' }));
      const comments = commentsResult.data || [];
      const contacts = contactsResult.data || [];

      setStats({
        totalPosts: posts.length,
        publishedPosts: posts.filter((p: Post) => p.status === 'published').length,
        draftPosts: posts.filter((p: Post) => p.status === 'draft').length,
        totalViews: posts.reduce((sum: number, p: Post) => sum + p.view_count, 0),
        pendingComments: comments.filter((c: Comment) => !c.is_approved).length,
        approvedComments: comments.filter((c: Comment) => c.is_approved).length,
        totalContacts: contacts.length,
        pendingContacts: contacts.filter((c: Contact) => !c.is_contacted).length,
      });

      setRecentActivity([
        ...comments.slice(0, 3).map((c: Comment) => ({ type: 'comment', data: c, time: c.created_at })),
        ...contacts.slice(0, 3).map((c: Contact) => ({ type: 'contact', data: c, time: c.created_at })),
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5));
    } catch {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading fullScreen />;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-heading font-bold text-secondary mb-2">Dashboard Overview</h2>
          <p className="text-neutral-600">Welcome to your admin dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-secondary to-secondary-400 text-white">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 opacity-80" />
                <span className="text-3xl font-bold">{stats.totalPosts}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">Total Posts</h3>
              <p className="text-sm opacity-80">{stats.publishedPosts} published, {stats.draftPosts} drafts</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-primary to-primary-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <Eye className="w-8 h-8 opacity-80" />
                <span className="text-3xl font-bold">{stats.totalViews}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">Total Views</h3>
              <p className="text-sm opacity-80">Across all published posts</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-gold to-yellow-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <MessageSquare className="w-8 h-8 opacity-80" />
                <span className="text-3xl font-bold">{stats.pendingComments}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">Pending Comments</h3>
              <p className="text-sm opacity-80">{stats.approvedComments} already approved</p>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-xl font-heading font-bold text-secondary mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Quick Stats
            </h3>
            <div className="space-y-4">
              {[
                { icon: FileText, label: 'Published Posts', sublabel: 'Live on website', value: stats.publishedPosts, color: 'secondary' },
                { icon: Clock, label: 'Draft Posts', sublabel: 'Work in progress', value: stats.draftPosts, color: 'gold' },
                { icon: Users, label: 'Pending Contacts', sublabel: 'Awaiting response', value: stats.pendingContacts, color: 'primary' },
              ].map(({ icon: Icon, label, sublabel, value, color }) => (
                <div key={label} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-${color}/10 rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 text-${color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-secondary">{label}</p>
                      <p className="text-sm text-neutral-600">{sublabel}</p>
                    </div>
                  </div>
                  <span className={`text-2xl font-bold text-${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-heading font-bold text-secondary mb-4">Recent Activity</h3>
            {recentActivity.length === 0 ? (
              <p className="text-neutral-600 text-center py-8">No recent activity</p>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.type === 'comment' ? 'bg-gold/10' : 'bg-primary/10'}`}>
                      {activity.type === 'comment' ? <MessageSquare className="w-5 h-5 text-gold" /> : <Users className="w-5 h-5 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-secondary truncate">
                        {activity.type === 'comment' ? `New comment from ${(activity.data as Comment).author_name}` : `New contact from ${(activity.data as Contact).name}`}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {new Date(activity.time).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <Card>
          <h3 className="text-xl font-heading font-bold text-secondary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" onClick={() => router.push('/admin/contacts')} className="h-auto py-4">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="font-semibold">Review Contacts</p>
                {stats.pendingContacts > 0 && <span className="inline-block px-2 py-1 bg-secondary text-white text-xs rounded-full mt-1">{stats.pendingContacts} pending</span>}
              </div>
            </Button>
            <Button variant="outline" onClick={() => router.push('/admin/posts/create')} className="h-auto py-4">
              <div className="text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="font-semibold">Create New Post</p>
              </div>
            </Button>
            <Button variant="outline" onClick={() => router.push('/admin/comments')} className="h-auto py-4">
              <div className="text-center">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="font-semibold">Moderate Comments</p>
                {stats.pendingComments > 0 && <span className="inline-block px-2 py-1 bg-primary text-white text-xs rounded-full mt-1">{stats.pendingComments} pending</span>}
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
