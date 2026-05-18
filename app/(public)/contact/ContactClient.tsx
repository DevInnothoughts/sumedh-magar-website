'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
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

      toast.success('Message sent successfully! We will contact you soon.');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-6">Contact Us</h1>
            <p className="text-xl text-neutral-200 leading-relaxed">
              Get in touch with Dr. Sumedh Magar and the I-SPORT MEDICAL CENTRE team.
              We&apos;re here to help with your orthopedic and sports medicine needs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-secondary mb-8">I-SPORT MEDICAL CENTRE</h2>

              <div className="space-y-6">
                <Card>
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-semibold text-secondary mb-2">Address</h3>
                      <p className="text-neutral-600">
                        Shp 9-13 UPPER GROUND FLOOR<br />
                        Madhukosh Society<br />
                        Balewadi, Pune 411045
                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-semibold text-secondary mb-2">Phone</h3>
                      <a href="tel:+919145517171" className="text-neutral-600 hover:text-primary transition-colors">
                        +91 9145517171
                      </a>
                      <br />
                      <a href="tel:+912067813869" className="text-neutral-600 hover:text-primary transition-colors">
                        +91 02067813869
                      </a>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-semibold text-secondary mb-2">Email</h3>
                      <a
                        href="mailto:sumedh@isportmedicalcentre.com"
                        className="text-neutral-600 hover:text-primary transition-colors"
                      >
                        sumedh@isportmedicalcentre.com
                      </a>
                      <br />
                      <a
                        href="mailto:admin@isportmedicalcentre.com"
                        className="text-neutral-600 hover:text-primary transition-colors"
                      >
                        admin@isportmedicalcentre.com
                      </a>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-semibold text-secondary mb-2">Clinic Hours</h3>
                      <p className="text-neutral-600">
                        Monday - Saturday: 9:00 AM - 6:00 PM<br />
                        Sunday: By Appointment Only
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-8">
                <Card className="p-0 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.165823574954!2d73.76766131490026!3d18.566374087382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9c6e5f1c5e9%3A0x1234567890abcdef!2sBalewadi%2C%20Pune%2C%20Maharashtra%20411045!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Card>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <h2 className="text-secondary mb-6">Send Us a Message</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-neutral-700 font-medium mb-2">Name *</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-medium mb-2">Email *</label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-medium mb-2">Phone *</label>
                    <input
                      {...register('phone', { required: 'Phone is required' })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors"
                      placeholder="+91 1234567890"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-medium mb-2">Message *</label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      {...register('needsAppointment')}
                      type="checkbox"
                      className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-teal"
                    />
                    <label className="ml-2 text-neutral-700">I would like to request an appointment</label>
                  </div>

                  {needsAppointment && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-neutral-700 font-medium mb-2">Preferred Date</label>
                        <input
                          {...register('appointmentDate')}
                          type="date"
                          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-700 font-medium mb-2">Preferred Time</label>
                        <select
                          {...register('appointmentTime')}
                          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary transition-colors"
                        >
                          <option value="">Select time</option>
                          <option value="09:00 AM">09:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="02:00 PM">02:00 PM</option>
                          <option value="03:00 PM">03:00 PM</option>
                          <option value="04:00 PM">04:00 PM</option>
                          <option value="05:00 PM">05:00 PM</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
                    {submitting ? 'Sending...' : (
                      <>
                        <Send className="w-5 h-5 inline mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
