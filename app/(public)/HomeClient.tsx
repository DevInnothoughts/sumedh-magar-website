'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Briefcase, TrendingUp, Star, ExternalLink } from 'lucide-react';
import { supabase, Post, GoogleReview } from '@/lib/supabase';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { HeroCarousel } from '@/components/HeroCarousel';
import { InfoCards } from '@/components/InfoCards';
import { getTopRatedReviews, getFallbackReviews } from '@/services/googleReviewsService';

const treatments = [
  { id: '1', title: 'Shoulder Surgery', description: 'Rotator cuff repair, SLAP repair, and shoulder instability treatment', imageUrl: '/ShoulderSurgery.jpeg' },
  { id: '2', title: 'Knee Surgery', description: 'ACL/PCL reconstruction, meniscus repair, and advanced arthroscopic procedures', imageUrl: '/KneeSurgery.jpeg' },
  { id: '3', title: 'Joint Replacement', description: 'Total hip and knee replacement with minimally invasive techniques', imageUrl: '/JointReplacement.jpeg' },
  { id: '4', title: 'Hip Surgery', description: 'Hip replacement, labral repair, and minimally invasive arthroscopy for hip pain and mobility restoration.', imageUrl: '/HipSurgery.jpeg' },
  { id: '5', title: 'BioOrthopaedics', description: 'Regenerative treatments like PRP, stem cells, and cartilage restoration to naturally heal and preserve joints.', imageUrl: '/BioOrthopaedics.jpeg' },
  { id: '6', title: 'Sports Medicine', description: 'Injury prevention, performance optimization, and athlete rehabilitation', imageUrl: '/SportsMedicine.jpeg' },
];

export default function HomeClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setPosts(data);
        setLoading(false);
      });

    getTopRatedReviews(4)
      .then((data) => setReviews(data?.length ? data : getFallbackReviews()))
      .catch(() => setReviews(getFallbackReviews()))
      .finally(() => setReviewsLoading(false));
  }, []);

  if (loading) return <Loading fullScreen />;

  return (
    <div className="min-h-screen">
      <HeroCarousel />
      <InfoCards />

      <section className="section-padding bg-gradient-to-br from-secondary via-secondary to-primary-600 text-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-accent mb-4">About Dr. Sumedh Magar.</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] max-w-md mx-auto">
                <Image src="/SumedhMagar.jpeg" alt="Dr. Sumedh Magar" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
              <p className="text-neutral-200 text-lg leading-relaxed">
                Founder & Director of I-SPORT MEDICAL CENTRE, Pune, and Lead Sports Medicine at Khelo India. Specializing in sports orthopedic surgery, adult reconstruction, and bio-orthopedics with a commitment to excellence in athlete care and recovery.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Award, label: 'Years Experience', value: '6+' },
                  { icon: Users, label: 'Patients Treated', value: '10,000+' },
                  { icon: Briefcase, label: 'Advanced Surgeries', value: '1000+' },
                  { icon: TrendingUp, label: 'Patient Satisfaction', value: '97%' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-1">{value}</p>
                    <p className="text-sm text-neutral-300">{label}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link href="/about">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Read Full Biography <ArrowRight className="ml-2 w-5 h-5 inline" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-secondary mb-4">Treatments We Provide</h2>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
              Comprehensive orthopedic and sports medicine treatments using advanced surgical techniques and personalized care
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {treatments.map((treatment, index) => (
              <motion.div key={treatment.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} className="group">
                <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={treatment.imageUrl} alt={treatment.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-heading font-semibold text-secondary mb-3">{treatment.title}</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">{treatment.description}</p>
                    <Link href={treatment.id === '1' ? '/sports-medicine' : '/expertise'}>
                      <button className="text-primary font-semibold text-sm hover:text-primary-600 transition-colors inline-flex items-center group">
                        Know More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-secondary mb-4">Latest Articles</h2>
              <p className="text-neutral-600 text-lg">Insights on sports medicine, surgical techniques, and athlete recovery</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id}>
                  {post.photo_url && (
                    <div className="relative w-full h-48 mb-4">
                      <Image src={post.photo_url} alt={post.title} fill className="object-cover rounded-xl" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                  )}
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">{post.category}</div>
                  <h3 className="text-xl font-heading font-semibold text-secondary mb-2">{post.title}</h3>
                  <p className="text-neutral-600 mb-4 line-clamp-3">{post.excerpt || post.description.substring(0, 150) + '...'}</p>
                  <Link href={`/articles/${post.id}`} className="text-primary font-semibold hover:text-primary-600 inline-flex items-center">
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/articles"><Button variant="secondary">View All Articles</Button></Link>
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-secondary mb-4">Patient Testimonials</h2>
            <p className="text-neutral-600 text-lg mb-6">Hear from patients who&apos;ve experienced exceptional care and recovery</p>
            <div className="inline-flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-lg font-semibold text-neutral-800">Google Reviews</span>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-5xl mx-auto">
            {reviewsLoading ? (
              <div className="col-span-2"><Loading /></div>
            ) : (
              reviews.map((review, index) => (
                <motion.a
                  key={review.id}
                  href={review.google_review_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-100 hover:border-primary cursor-pointer block"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {review.author_photo_url ? (
                        <Image src={review.author_photo_url} alt={review.author_name} width={40} height={40} className="rounded-full" />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                          {review.author_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-neutral-900">{review.author_name}</p>
                        <p className="text-xs text-neutral-500">{review.relative_time_description}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'}`} />
                    ))}
                  </div>
                  <p className="text-neutral-700 text-sm leading-relaxed">{review.review_text}</p>
                  <div className="mt-3 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">View on Google Maps →</div>
                </motion.a>
              ))
            )}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <a href="https://www.google.com/maps/place/I-SPORT+Hospital+:+Orthopedic+and+Sports+Medicine/@18.5786803,73.7682788,17z" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="inline-flex items-center gap-2">
                Read More Reviews on Google <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-6">Ready to Start Your Recovery Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Schedule a consultation with Dr. Sumedh Magar to discuss your orthopedic needs and explore personalized treatment options.
            </p>
            <Link href="/contact"><Button variant="secondary" className="text-lg px-8 py-4">Contact Us Today</Button></Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
