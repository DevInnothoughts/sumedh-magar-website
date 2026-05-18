import type { NextConfig } from 'next';

process.env.NEXT_DISABLE_BUILD_WORKER = '1';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/articles', destination: '/blog', permanent: true },
      { source: '/articles/:id', destination: '/blog/:id', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'ahgiycinebsxuuhavqrs.supabase.co' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'maps.googleapis.com' },
    ],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
