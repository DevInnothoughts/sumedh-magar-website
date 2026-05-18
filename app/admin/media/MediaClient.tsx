'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Upload, Trash2, Copy, Image as ImageIcon, Video as VideoIcon, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import { supabase, MediaFile } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { AdminLayout } from '@/components/AdminLayout';

type FilterType = 'all' | 'image' | 'video';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) { router.push('/admin'); return; }
      fetchMedia();
    }).catch(() => router.push('/admin'));
  }, [router]);

  useEffect(() => {
    let filtered = [...media];
    if (search) filtered = filtered.filter((item) => item.filename.toLowerCase().includes(search.toLowerCase()));
    if (filter !== 'all') filtered = filtered.filter((item) => item.file_type === filter);
    setFilteredMedia(filtered);
  }, [search, filter, media]);

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase.from('media_library').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (data) setMedia(data);
    } catch {
      toast.error('Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const handleDelete = async (id: string, fileUrl: string) => {
    try {
      const filePath = fileUrl.split('/').pop();
      if (filePath) {
        await supabase.storage.from('media').remove([filePath]);
      }
      const { error } = await supabase.from('media_library').delete().eq('id', id);
      if (error) throw error;
      setMedia((prev) => prev.filter((m) => m.id !== id));
      toast.success('Media deleted successfully');
      setDeleteConfirmId(null);
    } catch {
      toast.error('Failed to delete media');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const stats = {
    total: media.length,
    images: media.filter((m) => m.file_type === 'image').length,
    videos: media.filter((m) => m.file_type === 'video').length,
    totalSize: media.reduce((sum, m) => sum + m.file_size, 0),
  };

  if (loading) return <Loading fullScreen />;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-3xl font-heading font-bold text-secondary">Media Library</h2>
          <Button variant="primary" onClick={() => toast.info('Upload media through post editor')}>
            <Upload className="w-5 h-5 mr-2" />Upload Media
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[['Total Files', stats.total, 'text-secondary'], ['Images', stats.images, 'text-primary'], ['Videos', stats.videos, 'text-gold'], ['Total Size', formatFileSize(stats.totalSize), 'text-secondary']].map(([label, value, color]) => (
            <Card key={label as string}><div className="text-center"><p className="text-neutral-600 mb-2">{label}</p><p className={`text-4xl font-bold ${color}`}>{value}</p></div></Card>
          ))}
        </div>

        <Card>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input type="text" placeholder="Search media..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <Filter className="w-5 h-5 text-neutral-600" />
              <div className="flex gap-2">
                {([['all', `All (${stats.total})`, 'bg-secondary'], ['image', `Images (${stats.images})`, 'bg-primary'], ['video', `Videos (${stats.videos})`, 'bg-gold']] as const).map(([tab, label, activeBg]) => (
                  <button key={tab} onClick={() => setFilter(tab)} className={`px-4 py-2 rounded-xl font-medium transition-all ${filter === tab ? `${activeBg} text-white` : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}`}>{label}</button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {filteredMedia.length === 0 ? (
          <Card><p className="text-center text-neutral-600 py-8">No media files found</p></Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <div className="aspect-video bg-neutral-100 rounded-xl mb-4 overflow-hidden">
                    {item.file_type === 'image' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.file_url} alt={item.filename} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <VideoIcon className="w-16 h-16 text-neutral-400" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {item.file_type === 'image' ? <ImageIcon className="w-4 h-4 text-primary" /> : <VideoIcon className="w-4 h-4 text-gold" />}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.file_type === 'image' ? 'bg-primary/10 text-primary' : 'bg-gold/10 text-gold'}`}>{item.file_type}</span>
                    </div>
                    <h3 className="font-semibold text-secondary truncate" title={item.filename}>{item.filename}</h3>
                    <div className="flex items-center justify-between text-sm text-neutral-600">
                      <span>{formatFileSize(item.file_size)}</span>
                      <span>{new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => handleCopyUrl(item.file_url)} className="flex-1">
                        <Copy className="w-4 h-4 mr-2" />Copy URL
                      </Button>
                      {deleteConfirmId === item.id ? (
                        <div className="flex gap-2 flex-1">
                          <Button variant="primary" onClick={() => handleDelete(item.id, item.file_url)} className="bg-red-600 hover:bg-red-700 flex-1">Confirm</Button>
                          <Button variant="outline" onClick={() => setDeleteConfirmId(null)} className="flex-1">Cancel</Button>
                        </div>
                      ) : (
                        <Button variant="outline" onClick={() => setDeleteConfirmId(item.id)} className="border-red-600 text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
