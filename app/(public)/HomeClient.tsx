'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Briefcase, TrendingUp, Star, ExternalLink, CheckCircle } from 'lucide-react';
import { supabase, Post, GoogleReview } from '@/lib/supabase';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Loading } from '@/components/Loading';
import { HeroCarousel } from '@/components/HeroCarousel';
import { InfoCards } from '@/components/InfoCards';
import { getTopRatedReviews, getFallbackReviews } from '@/services/googleReviewsService';

// import {
//   Award,
//   Users,
//   Briefcase,
//   TrendingUp
// } from "lucide-react";

import {
  Activity,
  Bone,
  HeartPulse
} from "lucide-react";

// const treatments = [
//   { id: '1', title: 'Robotic Knee Replacement', description: 'Robotic knee replacement is a state-of-the-art joint replacement surgery that ...', imageUrl: '/ShoulderSurgery.jpeg' },
//   { id: '2', title: 'Shoulder Surgery', description: 'Shoulder pain can make simple activities like lifting your arm, driving, ...', imageUrl: '/KneeSurgery.jpeg' },
//   { id: '3', title: 'Knee Surgery', description: 'There are knee operations that use advanced arthroscopic surgery techniques ...', imageUrl: '/JointReplacement.jpeg' },
//   { id: '4', title: 'Joint Replacement', description: 'Joint replacement entails the replacement of worn-out joints with artificial implants ...', imageUrl: '/HipSurgery.jpeg' },
//   { id: '5', title: 'Hip  Surgery', description: 'Hip surgery refers to minimally invasive and reconstructive surgical techniques ...', imageUrl: '/BioOrthopaedics.jpeg' },
//   { id: '6', title: 'Regenerative Medicine', description: 'Regenerative Medicine represents an innovative approach to orthopedic care ... ', imageUrl: '/SportsMedicine.jpeg' },
// ];

const treatments = [
  {
    id: '1',
    title: 'Robotic Knee Replacement',
    description: 'Robotic knee replacement is a state-of-the-art joint replacement surgery that ...',
    imageUrl: '/KneeSurgery.jpeg',
    link: '/treatments/robotic-knee-replacement-pune'
  },
  {
    id: '2',
    title: 'Shoulder Surgery',
    description: 'Shoulder pain can make simple activities like lifting your arm, driving, ...',
    imageUrl: '/ShoulderSurgery.jpeg',
    link: '/treatments/shoulder-surgery-pune'
  },
  {
    id: '3',
    title: 'Knee Surgery',
    description: 'There are knee operations that use advanced arthroscopic surgery techniques ...',
    imageUrl: '/JointReplacement.jpeg',
    link: '/treatments/knee-surgery-pune'
  },
  {
    id: '4',
    title: 'Joint Replacement',
    description: 'Joint replacement entails the replacement of worn-out joints with artificial implants ...',
    imageUrl: '/HipSurgery.jpeg',
    link: '/treatments/joint-replacement-surgery-pune'
  },
  {
    id: '5',
    title: 'Hip Surgery',
    description: 'Hip surgery refers to minimally invasive and reconstructive surgical techniques ...',
    imageUrl: '/BioOrthopaedics.jpeg',
    link: '/treatments/hip-surgery-pune'
  },
  {
    id: '6',
    title: 'Regenerative Medicine',
    description: 'Regenerative Medicine represents an innovative approach to orthopedic care ...',
    imageUrl: '/SportsMedicine.jpeg',
    link: '/treatments/regenerative-medicine'
  },
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
      {/* <InfoCards /> */}


      <section className="section-padding bg-neutral-50">

        <div className="container-custom">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl lg:text-4xl font-bold text-secondary leading-tight">
                Comprehensive Sports Medicine
                <br />
                & Orthopedic Care
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed">
                Dr. Sumedh Magar provides specialized care
                for sports injuries, joint disorders, and
                orthopedic conditions. With international
                training in Sports Medicine and extensive
                experience treating athletes, he offers
                advanced surgical and non-surgical treatment
                solutions designed to restore mobility,
                performance, and quality of life.
              </p>
              <p className="mt-5 text-slate-600 leading-relaxed">
                Whether you are a professional athlete,
                fitness enthusiast, or someone struggling
                with joint pain, personalized treatment plans
                are created to help you achieve long-term
                recovery and optimal function.
              </p>
            </motion.div>

            {/* RIGHT CARDS */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >

              <div className="bg-secondary rounded-3xl p-10 text-white shadow-xl">
                <h3 className="text-4xl font-bold mb-4">
                  Sports Medicine
                </h3>
                <p className="text-neutral-200 text-lg leading-relaxed">
                  Helping athletes and patients restore
                  movement, strength and confidence
                  through advanced orthopedic care.
                </p>

                <div className="mt-8 flex items-center gap-6">

                  <div>
                    <p className="text-4xl font-bold text-accent">
                      10,000+
                    </p>

                    <p className="text-sm">
                      Patients Treated
                    </p>

                  </div>

                  <div>
                    <p className="text-4xl font-bold text-accent">
                      97%
                    </p>
                    <p className="text-sm">
                      Satisfaction
                    </p>
                  </div>

                </div>

                <Link href="/sports-medicine">
                  <Button className="mt-4 px-8 py-3 rounded-full">
                    Explore Sports Medicine
                  </Button>
                </Link>

              </div>


            </motion.div>

          </div>

        </div>

      </section>


      <section className="section-padding bg-gradient-to-br from-secondary via-secondary to-primary-600 text-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-accent mb-4 text-4xl lg:text-4xl font-bold leading-tight">About Dr. Sumedh Magar</h2>
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
            <h2 className="text-secondary text-4xl lg:text-4xl font-bold text-secondary leading-tight mb-4">Areas of Expertise</h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
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
                    <Link href={treatment.link}>
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

      <section className="section-padding bg-white">
        <div className="container-custom">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* LEFT */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >

              <h2 className="text-4xl lg:text-4xl font-bold text-secondary mt-4 leading-tight">
                Why Athletes &
                <br />
                Patients Choose Us
              </h2>

              <p className="mt-5 text-slate-600 leading-relaxed">
                Advanced sports medicine and orthopedic care
                focused on faster recovery, better performance,
                and long-term joint health.
              </p>

              <div className="mt-8 bg-primary/10 rounded-2xl p-6">
                <p className="text-3xl font-bold text-primary">
                  10,000+
                </p>
                <p className="text-neutral-700">
                  Patients successfully treated
                </p>
              </div>

            </motion.div>

            {/* RIGHT */}

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >

              <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-primary/20">
              </div>

              <div className="space-y-8">
                {[
                  {
                    title: "Sports Medicine Expertise",
                    text: "Specialized knowledge in treating sports injuries and performance-related conditions.",
                    icon: "🏃"
                  },

                  {
                    title: "Advanced Arthroscopic Techniques",
                    text: "Minimally invasive surgical procedures that support faster recovery and reduced downtime.",
                    icon: "🩺"
                  },

                  {
                    title: "Athlete-Centric Care",
                    text: "Treatment plans tailored to the unique demands of athletes and active individuals.",
                    icon: "❤️"
                  },

                  {
                    title: "Personalized Rehabilitation Programs",
                    text: "Structured recovery plans focused on restoring strength, mobility, and confidence.",
                    icon: "🔄"
                  },

                  {
                    title: "Joint Preservation Approach",
                    text: "Emphasis on maintaining natural joint health whenever possible.",
                    icon: "🦴"
                  },

                  {
                    title: "Comprehensive Orthopedic Solutions",
                    text: "From sports injuries to joint replacement surgery, complete orthopedic care under one roof.",
                    icon: "✨"
                  }

                ].map((item, index) => (


                  <motion.div

                    key={item.title}

                    initial={{ opacity: 0, y: 20 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    viewport={{ once: true }}

                    transition={{
                      delay: index * 0.1
                    }}

                    whileHover={{
                      x: 10
                    }}

                    className="
relative
flex
gap-5
items-start
pl-12
"


                  >


                    <div className="
absolute
left-0
w-12
h-12
rounded-full
bg-white
shadow-lg
border
border-primary/20
flex
items-center
justify-center
text-xl
">

                      {item.icon}

                    </div>



                    <div>

                      <h3 className="
text-xl
font-bold
text-secondary
">

                        {item.title}

                      </h3>


                      <p className="
text-neutral-600
mt-2
leading-relaxed
">

                        {item.text}

                      </p>


                    </div>



                  </motion.div>


                ))}


              </div>

            </motion.div>
          </div>

        </div>
      </section>

      {posts.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-secondary text-4xl lg:text-4xl font-bold text-secondary leading-tight mb-4">Latest Blogs</h2>
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
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4">{post.excerpt || post.description.substring(0, 150) + '...'}</p>
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

      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <h2 className="text-4xl lg:text-4xl font-bold text-secondary">
              Our Approach to Recovery
            </h2>
            <p className="text-neutral-600 text-lg mt-5">
              A structured approach combining accurate diagnosis,
              advanced treatment, and guided rehabilitation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              {
                number: "01",
                icon: "🔍",
                title: "Accurate Diagnosis",
                text: "Advanced clinical assessment and imaging evaluation to identify the root cause of pain and injury."
              },

              {
                number: "02",
                icon: "🎯",
                title: "Personalized Treatment",
                text: "Customized treatment plans based on patient goals, activity levels, and recovery requirements."
              },

              {
                number: "03",
                icon: "🏥",
                title: "Advanced Procedures",
                text: "Utilizing modern arthroscopic and orthopedic techniques for optimal outcomes."
              },

              {
                number: "04",
                icon: "🔄",
                title: "Rehabilitation & Return to Activity",
                text: "Guided rehabilitation programs helping patients safely return to sports, fitness, and daily life."
              }

            ].map((item, index) => (

              <motion.div

                key={item.number}

                initial={{
                  opacity: 0,
                  y: 30
                }}

                whileInView={{
                  opacity: 1,
                  y: 0
                }}

                viewport={{ once: true }}

                transition={{
                  delay: index * 0.15
                }}

                className="relative bg-white rounded-3xl p-7 shadow-lg hover:-translate-y-3 transition-all duration-300"
              >

                <div className="flex justify-between items-center mb-6">
                  <span className="text-5xl font-bold text-primary/20">
                    {item.number}
                  </span>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-secondary mb-3">
                  {item.title}
                </h3>

                <p className="text-neutral-600 leading-relaxed text-sm">
                  {item.text}
                </p>

              </motion.div>

            ))}


          </div>

        </div>

      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-secondary text-4xl lg:text-4xl font-bold text-secondary leading-tight mb-4">Patient Testimonials</h2>
            <p className="text-neutral-600 text-lg mb-6">Hear from patients who&apos;ve experienced exceptional care and recovery</p>
            <div className="inline-flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
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


      <section className="relative min-h-[650px] py-16 md:py-24 lg:py-0 flex items-center overflow-hidden">

        {/* Background */}
        <Image
          src="/slider-bg-1.jpg"
          alt="Sports Medicine"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0"
          style={{
            backgroundColor: "#36383abf"
          }}
        />

        <div className="container-custom relative z-10 px-4 md:px-8">
          {/* Adjusted gap spacing for stacked layouts on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">

            {/* LEFT COLUMN */}
            <motion.div
              initial={{
                opacity: 0,
                x: -40
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="text-white"
            >

              {/* Scaled down text size and adjustments for phone screens */}
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full mb-6 text-sm sm:text-base">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Book Your Consultation
              </div>

              {/* Made heading fluid and responsive using tailwind text classes */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Move Better.
                <br />
                Recover Faster.
                <br />
                <span className="text-accent">
                  Perform Stronger.
                </span>
              </h2>

              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
                Looking for the Best Sports Medicine Doctor in Pune?
                Consult Dr. Sumedh Magar for expert Sports Medicine,
                Sports Injury Treatment, Arthroscopic Surgery,
                Joint Preservation, and Orthopedic Care.
              </p>

              {/* Mobile full-width responsive action button setup */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{
                      scale: 1.02
                    }}
                    className="bg-accent text-secondary px-8 py-4 font-bold rounded-full shadow-xl w-full text-center"
                  >
                    Schedule Appointment
                  </motion.button>
                </Link>
              </div>

            </motion.div>

            {/* RIGHT CARD COLUMN */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              /* Added extra bottom margin on mobile to account for the absolute badge layout */
              className="relative mb-8 lg:mb-0"
            >

              {/* Stats Content Card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-bold">
                  Your Recovery Starts Here
                </h3>

                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/80">
                  Schedule your appointment today and take
                  the first step toward pain-free movement
                  and peak performance.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6 sm:mt-8">
                  <div className="bg-white/10 rounded-xl p-4 sm:p-5">
                    <h4 className="text-2xl sm:text-3xl font-bold text-accent">
                      10,000+
                    </h4>
                    <p className="text-xs sm:text-sm text-white/90 mt-1">
                      Patients Treated
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 sm:p-5">
                    <h4 className="text-2xl sm:text-3xl font-bold text-accent">
                      97%
                    </h4>
                    <p className="text-xs sm:text-sm text-white/90 mt-1">
                      Success Rate
                    </p>
                  </div>
                </div>
              </div>

              {/* FIXED FLOATING BADGE FOR MOBILE OVERFLOW */}
              {/* Swapped -left-8 to left-4 on mobile devices so it stays cleanly within the viewport boundary */}
              <motion.div
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
                className="absolute -bottom-8 left-4 lg:-left-8 bg-white text-secondary rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 shadow-xl border border-neutral-100"
              >
                <p className="font-bold text-sm sm:text-base text-neutral-900">
                  Sports Medicine
                </p>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Advanced Orthopedic Care
                </p>
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
