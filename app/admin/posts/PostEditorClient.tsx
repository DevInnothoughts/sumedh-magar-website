'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { supabase } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { AdminLayout } from '@/components/AdminLayout';
import { ImageUpload } from '@/components/ImageUpload';
import { VideoUpload } from '@/components/VideoUpload';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

type PostFormData = { title: string; category: string; subcategory: string; excerpt: string; status: 'draft' | 'published' };

const categories = [
  { value: 'Medical Thesis', subcategories: ['ACL Reconstruction', 'Patellofemoral Instability', 'Biomechanics', 'Rehabilitation Study'] },
  { value: 'Surgery', subcategories: ['Knee', 'Shoulder', 'Hip', 'Elbow', 'Ankle', 'Hand & Wrist'] },
  { value: 'Rehabilitation', subcategories: ['Return-to-Sport', 'Movement Analysis', 'Physiotherapy Protocols', 'Injury Prevention'] },
  { value: 'Research', subcategories: ['Sports Medicine', 'Arthroscopy', 'Regenerative Medicine', 'Orthopedic Innovations'] },
];

const modules = {
  toolbar: [[{ header: [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike'], [{ list: 'ordered' }, { list: 'bullet' }], [{ indent: '-1' }, { indent: '+1' }], ['link'], [{ align: [] }], ['clean']],
};

export default function PostEditorClient() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PostFormData>({ defaultValues: { status: 'draft' } });
  const category = watch('category');

  const fetchPost = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
      if (error) throw error;
      if (data) {
        setValue('title', data.title);
        setValue('category', data.category);
        setValue('subcategory', data.subcategory || '');
        setValue('excerpt', data.excerpt || '');
        setValue('status', data.status);
        setDescription(data.description);
        setPhotoUrl(data.photo_url || '');
        setVideoUrl(data.video_url || '');
      }
    } catch {
      toast.error('Failed to load post');
      router.push('/admin/posts');
    } finally {
      setLoading(false);
    }
  }, [id, router, setValue]);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) { router.push('/admin'); return; }
      if (id) fetchPost();
    }).catch(() => router.push('/admin'));
  }, [id, router, fetchPost]);

  const onSubmit = async (data: PostFormData) => {
    if (!description.trim()) { toast.error('Description is required'); return; }
    setSaving(true);
    try {
      const postData = { title: data.title, category: data.category, subcategory: data.subcategory || null, description, excerpt: data.excerpt || null, photo_url: photoUrl || null, video_url: videoUrl || null, status: data.status };
      if (id) {
        const { error } = await supabase.from('posts').update(postData).eq('id', id);
        if (error) throw error;
        toast.success('Post updated successfully');
      } else {
        const { error } = await supabase.from('posts').insert([postData]);
        if (error) throw error;
        toast.success('Post created successfully');
      }
      router.push('/admin/posts');
    } catch (error: unknown) {
      toast.error((error as Error).message || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading fullScreen />;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push('/admin/posts')}><ArrowLeft className="w-5 h-5 mr-2" />Back</Button>
            <h2 className="text-3xl font-heading font-bold text-secondary">{id ? 'Edit Post' : 'Create New Post'}</h2>
          </div>
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="w-5 h-5 mr-2" />{showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
        </div>

        {showPreview && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <h3 className="text-2xl font-heading font-bold text-secondary mb-4">Preview</h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {photoUrl && <img src={photoUrl} alt="Preview" className="w-full h-64 object-cover rounded-xl mb-4" />}
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: description }} />
            </Card>
          </motion.div>
        )}

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-neutral-700 font-medium mb-2">Title *</label>
              <input {...register('title', { required: 'Title is required' })} className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors" placeholder="Enter post title" />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-neutral-700 font-medium mb-2">Category *</label>
                <select {...register('category', { required: 'Category is required' })} onChange={(e) => { setValue('category', e.target.value); setValue('subcategory', ''); }} className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors">
                  <option value="">Select category</option>
                  {categories.map((cat) => <option key={cat.value} value={cat.value}>{cat.value}</option>)}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
              </div>
              <div>
                <label className="block text-neutral-700 font-medium mb-2">Subcategory</label>
                <select {...register('subcategory')} className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors" disabled={!category}>
                  <option value="">Select subcategory</option>
                  {categories.find((cat) => cat.value === category)?.subcategories.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-neutral-700 font-medium mb-2">Excerpt</label>
              <textarea {...register('excerpt')} rows={3} className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Short description for post preview" />
            </div>

            <div>
              <label className="block text-neutral-700 font-medium mb-2">Description *</label>
              <ReactQuill theme="snow" value={description} onChange={setDescription} modules={modules} className="bg-white rounded-xl" />
            </div>

            <ImageUpload onUploadComplete={setPhotoUrl} currentImage={photoUrl} label="Featured Image" />
            <VideoUpload onUploadComplete={setVideoUrl} currentVideo={videoUrl} label="Video (Optional)" />

            <div>
              <label className="block text-neutral-700 font-medium mb-2">Status *</label>
              <select {...register('status')} className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="flex gap-4">
              <Button type="submit" variant="primary" disabled={saving} className="flex-1">
                <Save className="w-5 h-5 mr-2" />{saving ? 'Saving...' : id ? 'Update Post' : 'Create Post'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push('/admin/posts')} disabled={saving}>Cancel</Button>
            </div>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}
