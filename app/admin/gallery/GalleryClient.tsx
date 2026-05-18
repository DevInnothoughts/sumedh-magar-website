'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Upload, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { supabase, Gallery } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { AdminLayout } from '@/components/AdminLayout';

const categories = ['Facilities', 'Surgery', 'Research Work', 'Awards', 'Patients', 'Events'];

export default function AdminGalleryPage() {
  const [galleryItems, setGalleryItems] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Facilities');
  const [caption, setCaption] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) { router.push('/admin'); return; }
      fetchGalleryItems();
    }).catch(() => router.push('/admin'));
  }, [router]);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (data) setGalleryItems(data);
    } catch {
      toast.error('Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please select an image file'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('File size must be less than 5MB'); return; }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) { toast.error('Please select an image'); return; }
    setUploading(true);
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('media').upload(filePath, selectedFile);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);

      const { error: insertError } = await supabase.from('gallery').insert([{ image_url: publicUrl, category: selectedCategory, caption: caption || null }]);
      if (insertError) throw insertError;

      toast.success('Image uploaded successfully');
      setSelectedFile(null);
      setPreviewUrl(null);
      setCaption('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      await fetchGalleryItems();
    } catch (error: unknown) {
      toast.error((error as Error).message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw error;
      setGalleryItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('Gallery item deleted successfully');
      setDeleteConfirmId(null);
    } catch {
      toast.error('Failed to delete gallery item');
    }
  };

  const stats = {
    total: galleryItems.length,
    facilities: galleryItems.filter((i) => i.category === 'Facilities').length,
    surgery: galleryItems.filter((i) => i.category === 'Surgery').length,
    researchWork: galleryItems.filter((i) => i.category === 'Research Work').length,
    awards: galleryItems.filter((i) => i.category === 'Awards').length,
    patients: galleryItems.filter((i) => i.category === 'Patients').length,
    events: galleryItems.filter((i) => i.category === 'Events').length,
  };

  if (loading) return <Loading fullScreen />;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-heading font-bold text-secondary">Gallery Manager</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[['Total', stats.total, 'text-secondary'], ['Facilities', stats.facilities, 'text-primary'], ['Surgery', stats.surgery, 'text-blue-600'], ['Research', stats.researchWork, 'text-teal-600'], ['Awards', stats.awards, 'text-gold'], ['Patients', stats.patients, 'text-green-600'], ['Events', stats.events, 'text-orange-600']].map(([label, value, color]) => (
            <Card key={label as string}><div className="text-center"><p className="text-neutral-600 text-sm mb-1">{label}</p><p className={`text-2xl font-bold ${color}`}>{value}</p></div></Card>
          ))}
        </div>

        <Card>
          <h3 className="text-xl font-heading font-bold text-secondary mb-4">Upload New Image</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-700 font-medium mb-2">Category *</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors">
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-neutral-700 font-medium mb-2">Caption (Optional)</label>
                <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Enter image caption" className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>

            {previewUrl ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover rounded-xl" />
                <button onClick={() => { setPreviewUrl(null); setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" disabled={uploading} />
                <ImageIcon className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600 mb-4">Click to select an image for the gallery</p>
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                  <Upload className="w-5 h-5 mr-2" />Select Image
                </Button>
                <p className="text-sm text-neutral-500 mt-4">Maximum file size: 5MB. Supported formats: JPG, PNG, GIF, WebP</p>
              </div>
            )}

            {selectedFile && (
              <Button variant="primary" onClick={handleUpload} disabled={uploading} className="w-full">
                <Upload className="w-5 h-5 mr-2" />{uploading ? 'Uploading...' : 'Upload to Gallery'}
              </Button>
            )}
          </div>
        </Card>

        <div>
          <h3 className="text-xl font-heading font-bold text-secondary mb-4">Gallery Images</h3>
          {galleryItems.length === 0 ? (
            <Card><p className="text-center text-neutral-600 py-8">No gallery images yet</p></Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryItems.map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <Card>
                    <div className="space-y-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image_url} alt={item.caption || item.category} className="w-full h-48 object-cover rounded-xl" />
                      <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">{item.category}</span>
                      {item.caption && <p className="text-sm text-neutral-600 line-clamp-2">{item.caption}</p>}
                      <p className="text-xs text-neutral-500">{new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      {deleteConfirmId === item.id ? (
                        <div className="flex gap-2">
                          <Button variant="primary" onClick={() => handleDelete(item.id)} className="flex-1 bg-red-600 hover:bg-red-700">Confirm</Button>
                          <Button variant="outline" onClick={() => setDeleteConfirmId(null)} className="flex-1">Cancel</Button>
                        </div>
                      ) : (
                        <Button variant="outline" onClick={() => setDeleteConfirmId(item.id)} className="w-full border-red-600 text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-2" />Delete
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
