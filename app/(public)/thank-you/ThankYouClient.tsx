'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, Phone, Mail, MapPin, ArrowRight, BookOpen, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export default function ThankYouClient() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-28 pb-16 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Gradient Orbs for Premium Aesthetic */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Main Card */}
        <Card hover={false} className="bg-white/80 backdrop-blur-md border border-neutral-100 shadow-soft-lg text-center p-8 md:p-12 rounded-3xl">
          
          {/* Animated Check Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full text-primary mb-6"
          >
            <CheckCircle2 className="w-10 h-10" />
          </motion.div>
          
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-4"
          >
            Thank You!
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-neutral-600 text-lg leading-relaxed max-w-xl mx-auto mb-8"
          >
            Your inquiry or appointment request has been successfully submitted. Our medical team at{' '}
            <span className="font-semibold text-secondary">I-SPORT Medical Centre</span> will review your request and get in touch with you shortly.
          </motion.p>
          
          {/* Emergency Notice Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4 text-left max-w-2xl mx-auto mb-8 flex items-start gap-3"
          >
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-0.5">Emergency Medical Notice</p>
              <p className="text-sm text-amber-700">
                If this is an acute orthopedic emergency or sports injury requiring urgent attention, please contact us directly by phone or visit the nearest hospital emergency room.
              </p>
            </div>
          </motion.div>
          
          {/* Quick Contact Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-neutral-100 pt-8 mb-8 text-left"
          >
            <div className="flex gap-3 items-center p-3 rounded-2xl bg-neutral-50/50">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-soft">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium">Call Directly</p>
                <a href="tel:+919145517171" className="text-sm font-semibold text-secondary hover:text-primary transition-colors">
                  +91 9145517171
                </a>
              </div>
            </div>
            
            <div className="flex gap-3 items-center p-3 rounded-2xl bg-neutral-50/50">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-soft">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium">Email Us</p>
                <a href="mailto:sumedh@isportmedicalcentre.com" className="text-sm font-semibold text-secondary hover:text-primary transition-colors truncate block max-w-[160px] md:max-w-none">
                  sumedh@isportmed...
                </a>
              </div>
            </div>
            
            <div className="flex gap-3 items-center p-3 rounded-2xl bg-neutral-50/50">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-soft">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium">Our Location</p>
                <span className="text-sm font-semibold text-secondary block truncate max-w-[160px] md:max-w-none">
                  Balewadi, Pune
                </span>
              </div>
            </div>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/" passHref legacyBehavior>
              <Button variant="primary" className="inline-flex items-center justify-center gap-2">
                Back to Home <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            
            <Link href="/blog" passHref legacyBehavior>
              <Button variant="outline" className="inline-flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4" /> Read Health Blog
              </Button>
            </Link>
          </motion.div>
          
        </Card>
        
      </div>
    </div>
  );
}
