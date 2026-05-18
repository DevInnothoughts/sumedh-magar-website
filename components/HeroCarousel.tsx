'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

type Slide = {
  id: number;
  image: string;
  alt: string;
  heading: string;
  subheading?: string;
  description: string;
  ctaPrimary: { text: string; link: string };
  ctaSecondary?: { text: string; link: string };
  qualifications?: string[];
  tagline?: string;
};

const slides: Slide[] = [
  {
    id: 1,
    image: '/DrInAction.jpeg',
    alt: 'Dr. Sumedh Magar - Sports Medicine Specialist',
    heading: 'Dr. Sumedh Magar',
    qualifications: [
      'M.B.B.S., M.S. ORTHOPAEDICS',
      'Masters in Sports Medicine, Exercise & Health (UCL, London)',
      'Fellowship Adult Reconstruction Surgery (Arthroscopy and Arthroplasty)',
    ],
    tagline: ' Orthopedic Surgeon | Sports Medicine Specialist',
    description: 'Advanced Sports Medicine Guiding Your Strongest Comeback—from Pain to Peak Performance',
    ctaPrimary: { text: 'Book Appointment', link: '/contact' },
    ctaSecondary: { text: 'Contact Now', link: '/contact' },
  },
  {
    id: 2,
    image: '/aclsurgery.JPG',
    alt: 'Advanced Orthopedic Surgery',
    heading: 'Orthopedic Surgery',
    subheading: 'Fellowship-Trained Arthroscopy Specialist',
    description:
      'Expert in minimally invasive arthroscopic procedures, adult joint reconstruction, and advanced surgical techniques with ISAKOS fellowship training.',
    ctaPrimary: { text: 'Explore Treatments', link: '/expertise' },
  },
  {
    id: 3,
    image: '/JointPreservation.jpeg',
    alt: 'Joint Preservation & Rehabilitation',
    heading: 'Joint Preservation & Arthroscopy',
    subheading: 'Adult Joint Preservation Specialist',
    description:
      'Advanced joint preservation techniques, cartilage restoration, and comprehensive rehabilitation programs to help you achieve optimal recovery.',
    ctaPrimary: { text: 'Discover More', link: '/expertise' },
  },
  {
    id: 4,
    image: '/SportsMedicine.jpeg',
    alt: 'Sports Medicine Excellence',
    heading: 'Sports Medicine',
    subheading: 'Lead Sports Medicine - Khelo India, Govt. of Maharashtra',
    description:
      'Comprehensive sports injury management, performance optimization, and evidence-based rehabilitation protocols for athletes at all levels.',
    ctaPrimary: { text: 'Know More', link: '/sports-medicine' },
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/6740820/pexels-photo-6740820.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Sports Injury Management',
    heading: 'Sports Injury Management',
    subheading: 'Masters from University College London',
    description:
      'Specialized care for ACL/PCL reconstruction, meniscus repair, rotator cuff injuries, and ligament reconstruction with focus on return to play.',
    ctaPrimary: { text: 'Learn More', link: '/sports-medicine' },
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const duration = currentSlide === 0 ? 10000 : 6000;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            fill
            className="object-cover"
            priority={currentSlide === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center z-10">
        <div className="w-full max-w-[1350px] mx-auto px-6 md:px-12 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
              {currentSlide === 0 ? (
                <div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                    {slides[0].heading}
                  </h1>
                  <div className="space-y-2 mb-6">
                    {slides[0].qualifications?.map((qual, i) => (
                      <p key={i} className="text-lg sm:text-xl md:text-2xl text-neutral-100">
                        {qual}
                      </p>
                    ))}
                  </div>
                  {slides[0].tagline && (
                    <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-accent mb-6 leading-snug">
                      {slides[0].tagline}
                    </p>
                  )}
                  <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium mb-8 leading-relaxed">
                    {slides[0].description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={slides[0].ctaPrimary.link}>
                      <Button variant="primary" className="text-base sm:text-lg px-8 py-3 sm:py-4 w-full sm:w-auto font-semibold">
                        {slides[0].ctaPrimary.text}
                      </Button>
                    </Link>
                    {slides[0].ctaSecondary && (
                      <Link href={slides[0].ctaSecondary.link}>
                        <Button
                          variant="outline"
                          className="text-base sm:text-lg px-8 py-3 sm:py-4 border-2 border-white text-white hover:bg-white hover:text-secondary w-full sm:w-auto font-semibold transition-all"
                        >
                          {slides[0].ctaSecondary.text}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                    {slides[currentSlide].heading}
                  </h2>
                  {slides[currentSlide].subheading && (
                    <p className="text-xl sm:text-2xl md:text-3xl text-accent font-semibold mb-6 leading-snug">
                      {slides[currentSlide].subheading}
                    </p>
                  )}
                  <p className="text-lg sm:text-xl md:text-2xl text-neutral-100 mb-8 leading-relaxed max-w-2xl">
                    {slides[currentSlide].description}
                  </p>
                  <Link href={slides[currentSlide].ctaPrimary.link}>
                    <Button variant="primary" className="text-base sm:text-lg px-8 py-3 sm:py-4 w-full sm:w-auto font-semibold">
                      {slides[currentSlide].ctaPrimary.text}
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-primary w-8 md:w-12' : 'bg-white/50 hover:bg-white/70 w-2 md:w-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
