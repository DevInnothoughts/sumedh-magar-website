'use client';

import { useState, useRef } from 'react';
import { Upload, X, Video as VideoIcon, Youtube } from 'lucide-react';
import { toast } from 'react-toastify';
import { supabase } from '@/lib/supabase';
import { Button } from './Button';

type VideoUploadProps = {
  onUploadComplete: (url: string) => void;
  currentVideo?: string | null;
  label?: string;
};

export const VideoUpload = ({ onUploadComplete, currentVideo, label = 'Upload Video' }: VideoUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>(currentVideo || '');
  const [uploadType, setUploadType] = useState<'youtube' | 'file'>('youtube');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file');
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      toast.error('File size must be less than 100MB');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);

      await supabase.from('media_library').insert([{
        filename: file.name,
        file_url: publicUrl,
        file_type: 'video',
        file_size: file.size,
        mime_type: file.type,
      }]);

      setVideoUrl(publicUrl);
      onUploadComplete(publicUrl);
      toast.success('Video uploaded successfully');
    } catch (error: unknown) {
      toast.error((error as Error).message || 'Failed to upload video');
    } finally {
      setUploading(false);
    }
  };

  const handleYoutubeUrl = () => {
    if (!videoUrl.trim()) {
      toast.error('Please enter a YouTube URL');
      return;
    }
    if (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be')) {
      toast.error('Please enter a valid YouTube URL');
      return;
    }
    onUploadComplete(videoUrl);
    toast.success('YouTube URL added successfully');
  };

  const handleRemove = () => {
    setVideoUrl('');
    onUploadComplete('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getYoutubeEmbedUrl = (url: string) => {
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="space-y-4">
      <label className="block text-neutral-700 font-medium">{label}</label>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setUploadType('youtube')}
          className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
            uploadType === 'youtube' ? 'bg-secondary text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
          }`}
        >
          <Youtube className="w-5 h-5 inline mr-2" />
          YouTube URL
        </button>
        <button
          type="button"
          onClick={() => setUploadType('file')}
          className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all ${
            uploadType === 'file' ? 'bg-secondary text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
          }`}
        >
          <Upload className="w-5 h-5 inline mr-2" />
          Upload File
        </button>
      </div>

      {videoUrl && (
        <div className="relative">
          {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
            <iframe src={getYoutubeEmbedUrl(videoUrl)} className="w-full h-64 rounded-xl" allowFullScreen />
          ) : (
            <video src={videoUrl} controls className="w-full h-64 rounded-xl" />
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {!videoUrl && (
        <>
          {uploadType === 'youtube' ? (
            <div className="space-y-4">
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors"
              />
              <Button type="button" variant="primary" onClick={handleYoutubeUrl}>
                <Youtube className="w-5 h-5 mr-2" />
                Add YouTube Video
              </Button>
            </div>
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive ? 'border-primary bg-primary/5' : 'border-neutral-300 hover:border-primary'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
              <VideoIcon className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600 mb-4">
                {uploading ? 'Uploading...' : 'Drag and drop a video here, or click to select'}
              </p>
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                <Upload className="w-5 h-5 mr-2" />
                {uploading ? 'Uploading...' : 'Select Video'}
              </Button>
              <p className="text-sm text-neutral-500 mt-4">
                Maximum file size: 100MB. Supported formats: MP4, WebM, MOV
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
