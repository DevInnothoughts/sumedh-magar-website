'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2, Calendar, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  needsAppointment: boolean;
  appointmentDate?: string;
  appointmentTime?: string;
};

export default function ContactClient() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>();

  const needsAppointment = watch('needsAppointment');

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from('contacts').insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          contact_type: data.needsAppointment ? 'appointment' : 'general',
          appointment_date: data.appointmentDate || null,
          appointment_time: data.appointmentTime || null,
        },
      ]);

      if (error) throw error;

      // Trigger email notification asynchronously
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
            contact_type: data.needsAppointment ? 'appointment' : 'general',
            appointment_date: data.appointmentDate || null,
            appointment_time: data.appointmentTime || null,
          }),
        });
      } catch (emailError) {
        console.error('Failed to trigger email notification:', emailError);
      }

      toast.success('Message sent successfully!');
      reset();
      router.push('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      
      {/* 1. Hero Section Banner (Kept intact with aspect scale proportions) */}
      <section 
  className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white flex flex-col justify-center w-full" 
  style={{
    /* Matches the structural height scale configuration of your previous banner */
    height: "calc(100vw * (480 / 1440))", 
    minHeight: "500px", // Keeps it roomy enough for text on smaller laptops/tablets
    maxHeight: "520px"  // Stops it from growing too giant on massive screens
  }}
>
  
  <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.35),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(56,189,248,0.25),transparent_45%)]" />
  
  <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
  
  {/* REMOVED py-24 md:py-32 -> ADDED components for vertical alignment preservation */}
  <div className="relative mx-auto max-w-6xl px-6 w-full py-12 md:py-0">

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .6 }}
      className="max-w-3xl"
    >

      <h1 className="mt-6 font-[Fraunces] text-4xl font-semibold leading-tight md:text-6xl">
        Contact{" "}
        <span className="bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent">
          Us
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
        Get in touch with Dr. Sumedh Magar and the I-SPORT MEDICAL CENTRE team. We're here to help with your orthopedic and sports medicine needs.
      </p>

    </motion.div>

  </div>

</section>


      {/* <section 
        className="relative text-white flex items-center w-full overflow-hidden"
        style={{
          backgroundImage: "url('/knee surgery banner.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          height: "calc(100vw * (480 / 1440))",
          minHeight: "420px",
          maxHeight: "580px"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent z-0" />
        
        <div className="container-custom max-w-5xl mx-auto px-5 w-full z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full inline-block mb-3">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tight leading-tight">
              Contact Us
            </h1>
            <p className="text-base md:text-lg text-neutral-200 font-light leading-relaxed max-w-xl">
              Get in touch with Dr. Sumedh Magar and the I-SPORT MEDICAL CENTRE team. We're here to help with your orthopedic and sports medicine needs.
            </p>
          </motion.div>
        </div>
      </section> */}

      {/* 2. Info Cards & Form Section */}
      <section className="py-16 px-5">
        <div className="container-custom max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Direct Clinic Cards */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl font-bold text-secondary font-heading mb-6">I-SPORT MEDICAL CENTRE</h2>
              
              {[
                { icon: MapPin, title: 'Address', desc: <>Shp 9-13 UPPER GROUND FLOOR<br />Madhukosh Society<br />Balewadi, Pune 411045</> },
                { icon: Phone, title: 'Phone', desc: <><a href="tel:+919145517171" className="hover:text-primary transition-colors">+91 9145517171</a><br /><a href="tel:+912067813869" className="hover:text-primary transition-colors">+91 02067813869</a></> },
                { icon: Mail, title: 'Email', desc: <><a href="mailto:sumedh@isportmedicalcentre.com" className="hover:text-primary transition-colors block truncate">sumedh@isportmedicalcentre.com</a><a href="mailto:admin@isportmedicalcentre.com" className="hover:text-primary transition-colors block truncate">admin@isportmedicalcentre.com</a></> },
                { icon: Clock, title: 'Clinic Hours', desc: <>Monday - Saturday: 9:00 AM - 6:00 PM<br />Sunday: By Appointment Only</> },
              ].map((item, index) => (
                <Card key={index} className="p-5 border border-neutral-100 shadow-sm hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-semibold text-secondary text-sm uppercase tracking-wide mb-1.5">{item.title}</h3>
                      <div className="text-neutral-600 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Right Column: Modern Dynamic Form Block */}
            <div className="lg:col-span-7">
              <Card className="p-6 md:p-8 border border-neutral-100 shadow-xl bg-white rounded-2xl">
                <h2 className="text-xl font-bold text-secondary font-heading mb-6">Send Us a Message</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Name *</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary bg-neutral-50/50 text-sm"
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Email *</label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid address' }
                        })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary bg-neutral-50/50 text-sm"
                        placeholder="name@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Phone *</label>
                      <input
                        {...register('phone', { required: 'Phone is required' })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary bg-neutral-50/50 text-sm"
                        placeholder="+91 1234567890"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Message *</label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary bg-neutral-50/50 text-sm resize-none"
                      placeholder="How can we help you?"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <div className="flex items-center p-3 bg-neutral-50 rounded-xl border border-neutral-200/60">
                    <input
                      {...register('needsAppointment')}
                      type="checkbox"
                      id="needsAppointment"
                      className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-0"
                    />
                    <label htmlFor="needsAppointment" className="ml-2 text-sm text-neutral-700 cursor-pointer select-none">
                      I would like to request an appointment slot
                    </label>
                  </div>

                  <AnimatePresence>
                    {needsAppointment && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 overflow-hidden"
                      >
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Preferred Date</label>
                          <input
                            {...register('appointmentDate')}
                            type="date"
                            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">Preferred Time</label>
                          <select
                            {...register('appointmentTime')}
                            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary bg-white"
                          >
                            <option value="">Select time</option>
                            {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'].map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button type="submit" variant="primary" className="w-full py-3.5 mt-2 flex items-center justify-center gap-2 group" disabled={submitting}>
                    {submitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Immersive Full-Width Edge-to-Edge Map Container */}
      <section className="w-full border-t border-neutral-200/80 leading-[0] block p-0 m-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.165823574954!2d73.76766131490026!3d18.566374087382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9c6e5f1c5e9%3A0x1234567890abcdef!2sBalewadi%2C%20Pune%2C%20Maharashtra%20411045!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full filter contrast-[95%] saturate-[95%]"
        />
      </section>

    </div>
  );
}