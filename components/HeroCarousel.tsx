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
    image: '/home banner.jpeg',
    alt: 'Dr. Sumedh Magar - Sports Medicine Specialist',
    heading: 'Dr. Sumedh Magar',
    qualifications: [],
    tagline: 'Orthopedic Surgeon | Sports Medicine Specialist',
    description: "",
    ctaPrimary: { text: 'Book Appointment', link: '/contact' },
  },
  {
    id: 2,
    image: '/Sports Medicine_Home page.png',
    alt: 'Sports Medicine Excellence',
    heading: 'Sports Medicine',
    subheading: 'Masters from University College London',
    description: '',
    ctaPrimary: { text: 'Know More', link: '/sports-medicine' },
  },
  {
    id: 3,
    image: '/Dr. Magar_Regenerative Medicine_homepage.png',
    alt: 'Regenerative Medicine & Stem Cell Therapy',
    heading: 'Regenerative Medicine & Stem Cell Therapy',
    subheading: '',
    description: "",
    ctaPrimary: { text: 'Learn More', link: '/sports-medicine' },
  },
  {
    id: 4,
    image: '/JointPreservation.png',
    alt: 'Joint Preservation & Rehabilitation',
    heading: 'Joint Preservation & Arthroscopy',
    subheading: 'Adult Joint Preservation Specialist',
    description: '',
    ctaPrimary: { text: 'Discover More', link: '/expertise' },
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
    /* FIXED FULL-SCREEN GAP: 
       - h-[calc(100svh-5rem)] targets mobile viewports perfectly using `svh`,
         accounting for mobile address bars to eliminate any bottom gaps.
       - md:h-[calc(100vh-5rem)] takes over flawlessly on desktops.
    */
    <div className="relative w-full h-[calc(100svh-5rem)] md:h-[calc(100vh-5rem)] mt-20 overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            fill
            className="object-cover object-center"
            priority={currentSlide === 0}
            sizes="100vw"
          />
          {/* Blend of bottom gradient for mobile alignment, right-to-left gradient for desktop layouts */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20 md:bg-gradient-to-r md:from-black/90 md:via-black/50 md:to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Dynamic positioning: Content aligns safely at the bottom-center for mobile screens, side-centered for desktop */}
      <div className="absolute inset-0 flex flex-col justify-end md:justify-center z-10 pb-16 md:pb-0">
        <div className="w-full max-w-[1350px] mx-auto px-6 md:px-12 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              {currentSlide === 0 ? (
                <div>
                  <h1 className="!text-2xl sm:!text-4xl md:!text-5xl lg:!text-6xl font-bold text-white mb-3 leading-tight">
                    {slides[0].heading}
                  </h1>
                  <div className="space-y-1 md:space-y-2 mb-4">
                    {slides[0].qualifications?.map((qual, i) => (
                      <p key={i} className="text-base sm:text-xl md:text-2xl text-neutral-100">
                        {qual}
                      </p>
                    ))}
                  </div>
                  {slides[0].tagline && (
                    <p className="text-base sm:text-2xl md:text-3xl font-semibold text-accent mb-4 leading-snug">
                      {slides[0].tagline}
                    </p>
                  )}
                  {slides[0].description && (
                    <p className="text-sm sm:text-xl md:text-2xl text-neutral-100 font-normal mb-6 leading-relaxed max-w-2xl">
                      {slides[0].description}
                    </p>
                  )}
                  {/* Keep natural width buttons */}
                  <div className="flex flex-row gap-3">
                    <Link href={slides[0].ctaPrimary.link}>
                      <Button variant="primary" className="text-sm sm:text-lg px-6 py-2.5 font-semibold">
                        {slides[0].ctaPrimary.text}
                      </Button>
                    </Link>
                    {slides[0].ctaSecondary && (
                      <Link href={slides[0].ctaSecondary.link}>
                        <Button
                          variant="outline"
                          className="text-sm sm:text-lg px-6 py-2.5 border-2 border-white text-white hover:bg-white hover:text-secondary font-semibold transition-all"
                        >
                          {slides[0].ctaSecondary.text}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="!text-2xl sm:!text-4xl md:!text-5xl lg:!text-6xl font-bold text-white mb-3 leading-tight">
                    {slides[currentSlide].heading}
                  </h2>
                  {slides[currentSlide].subheading && (
                    <p className="text-base sm:text-2xl md:text-3xl text-accent font-semibold mb-4 leading-snug">
                      {slides[currentSlide].subheading}
                    </p>
                  )}
                  {slides[currentSlide].description && (
                    <p className="text-sm sm:text-xl md:text-2xl text-neutral-100 mb-6 leading-relaxed max-w-2xl">
                      {slides[currentSlide].description}
                    </p>
                  )}
                  <div className="flex flex-row gap-3">
                    <Link href={slides[currentSlide].ctaPrimary.link}>
                      <Button variant="primary" className="text-sm sm:text-lg px-6 py-2.5 font-semibold">
                        {slides[currentSlide].ctaPrimary.text}
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Control Chevrons (Hidden on mobile) */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dots navigation raised slightly to accommodate touch areas cleanly */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-primary w-6 md:w-12' : 'bg-white/50 hover:bg-white/70 w-1.5 md:w-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};