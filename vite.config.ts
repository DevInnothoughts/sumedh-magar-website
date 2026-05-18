import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

const SITE_URL = 'https://sportsurgeon.in';

// Exclude '/' since vite-plugin-sitemap always adds it as the default entry
const staticRoutes = [
  '/about',
  '/sports-medicine',
  '/expertise',
  '/research',
  '/articles',
  '/gallery',
  '/contact',
  '/privacy-policy',
  '/terms-conditions',
  '/cookie-policy',
  '/medical-disclaimer',
];

async function getDynamicRoutes(): Promise<string[]> {
  try {
    const url = `https://ahgiycinebsxuuhavqrs.supabase.co/rest/v1/posts?select=id&status=eq.published`;
    const res = await fetch(url, {
      headers: {
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZ2l5Y2luZWJzeHV1aGF2cXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTgwMjUsImV4cCI6MjA3OTQ5NDAyNX0.20KCmwpk9RztXMxDrck1tiUXcISdcRghJIiaWZoCmwc',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZ2l5Y2luZWJzeHV1aGF2cXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTgwMjUsImV4cCI6MjA3OTQ5NDAyNX0.20KCmwpk9RztXMxDrck1tiUXcISdcRghJIiaWZoCmwc',
      },
    });
    if (!res.ok) return [];
    const posts: { id: string }[] = await res.json();
    return posts.map((p) => `/articles/${p.id}`);
  } catch {
    return [];
  }
}

export default defineConfig(async () => {
  const dynamicRoutes = await getDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  return {
    plugins: [
      react(),
      sitemap({
        hostname: SITE_URL,
        dynamicRoutes: allRoutes,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString().split('T')[0],
        readable: true,
        outDir: 'dist',
      }),
    ],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
