'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Clock } from 'lucide-react';
import type { Post } from '@/lib/supabase';
import { Card } from '@/components/Card';
import { format } from 'date-fns';

interface BlogClientProps {
  initialPosts: Post[];
}

function readingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(initialPosts.map((p) => p.category)))];

  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              Insights & Education
            </p>
            <h1 className="mb-6">Blog</h1>
            <p className="text-xl text-neutral-200 leading-relaxed">
              Expert knowledge on sports medicine, orthopedic surgery, and athlete recovery from
              Dr. Sumedh Magar
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
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card>
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
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      {post.subcategory && (
                        <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
                          {post.subcategory}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-secondary mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-neutral-600 mb-4 line-clamp-3 text-sm">
                      {post.excerpt || post.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-neutral-400">
                        <span>{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {readingTime(post.description)} min read
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-primary font-semibold hover:text-primary-600 inline-flex items-center text-sm"
                      >
                        Read More <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
