'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { supabase, Post } from '@/lib/supabase';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';

export default function ArticlesClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <Loading fullScreen />;

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-6">Articles & Insights</h1>
            <p className="text-xl text-neutral-200 leading-relaxed">
              Expert knowledge on sports medicine, surgical techniques, and athlete recovery
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-3 rounded-2xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg">No articles found. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id}>
                  {post.photo_url && (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={post.photo_url}
                        alt={post.title}
                        fill
                        className="object-cover rounded-xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
                    {post.category}
                  </div>
                  {post.subcategory && (
                    <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-3 ml-2">
                      {post.subcategory}
                    </div>
                  )}
                  <h3 className="text-xl font-heading font-semibold text-secondary mb-2">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 line-clamp-3">
                    {post.excerpt || post.description.substring(0, 150) + '...'}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary font-semibold hover:text-primary-600 inline-flex items-center"
                  >
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
