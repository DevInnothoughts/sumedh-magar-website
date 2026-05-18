'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Activity, Heart, Zap, CheckCircle, Award, Calendar, Phone, Target, Stethoscope } from 'lucide-react';
import { Card } from '@/components/Card';

const surgeries = [
  { title: 'Knee Surgery', items: ['ACL (Anterior Cruciate Ligament) Reconstruction', 'PCL (Posterior Cruciate Ligament) Reconstruction', 'Meniscus Repair & Reconstruction', 'MCL (Medial Collateral Ligament) Repair', 'MPFL (Medial Patellofemoral Ligament) Reconstruction', 'Cartilage Reconstruction & Transplantation', 'High Tibial Osteotomy', 'Knee Arthroscopy'], description: 'Precise ligament reconstruction and cartilage preservation for optimal knee function', returnToSport: '6-9 months' },
  { title: 'Shoulder Surgery', items: ['SLAP (Superior Labral Anterior-Posterior) Repair', 'Bankart Repair for Shoulder Instability', 'Rotator Cuff Repair & Reconstruction', 'Acromioclavicular (AC) Separation Repair', 'Biceps Tenodesis', 'Shoulder Arthroscopy'], description: 'Restores shoulder stability and overhead function', returnToSport: '4-6 months' },
  { title: 'Elbow Surgery', items: ['Biceps Tenodesis', 'Lateral Epicondylitis Repair (Tennis Elbow)', 'Elbow Arthroscopy'], description: 'Restores elbow stability for throwing and racquet athletes', returnToSport: '3-4 months' },
  { title: 'Hand & Wrist Surgery', items: ['UCL (Ulnar Collateral Ligament) Reconstruction', 'TFCC (Triangular Fibrocartilage Complex) Repair', 'Wrist Arthroscopy'], description: 'Critical for racquet sports, climbing, and manual activities', returnToSport: '3-5 months' },
  { title: 'Foot & Ankle Surgery', items: ['Deltoid Ligament Reconstruction', 'Lateral Ankle Ligament Reconstruction', 'Achilles Tendon Repair & Tenodesis', 'Ankle Arthroscopy'], description: 'Enables return to cutting, jumping and pivoting sports', returnToSport: '4-6 months' },
  { title: 'Joint Replacement Surgery', items: ['Total Hip Replacement (Arthroplasty)', 'Total Knee Replacement (Arthroplasty)', 'Shoulder Replacement (Arthroplasty)', 'Revision Joint Replacement'], description: 'Advanced option when joint preservation is not possible', returnToSport: '6-12 months' },
];

const conditions = [
  'Plantar Fasciitis', 'Achilles Tendinitis', 'Peroneal Tendinitis', 'Ankle Sprain & Instability', 'TFCC Lesions', "De Quervain's Tenosynovitis", 'Osteoarthritis', "Patellar Tendinitis (Jumper's Knee)", 'Partial Ligament Tears (ACL, PCL, MCL)', 'Shoulder Tendinitis', 'Adhesive Capsulitis (Frozen Shoulder)', 'Rotator Cuff Injuries', 'Bicipital Tendinitis', 'Lateral Epicondylitis (Tennis Elbow)', "Medial Epicondylitis (Golfer's Elbow)", 'Hip Arthritis', 'Sacroiliac Joint Pain', 'Hamstring Strains', 'Trochanteric Bursitis',
];

const whyChoose = [
  'Fellowship-trained in Arthroscopy & Adult Joint Reconstruction (ISAKOS)',
  'Masters in Sports Medicine from University College London',
  'Over 1000+ advanced surgeries performed successfully',
  'Minimally invasive techniques for faster recovery',
  'Personalized rehabilitation protocols for optimal outcomes',
  'Lead Sports Medicine at Khelo India, Govt. of Maharashtra',
];

const bioOrthopedicsServices = [
  { title: 'PRP (Platelet-Rich Plasma) Therapy', description: "Stimulates natural healing in tendons, ligaments, and joints using your body's growth factors", icon: <Zap className="w-6 h-6" /> },
  { title: 'Stem Cell Therapy', description: 'Advanced regenerative treatment for cartilage damage and early arthritis in athletes', icon: <Activity className="w-6 h-6" /> },
  { title: 'Cartilage Restoration', description: 'Innovative techniques including microfracture, MACI, and osteochondral grafting', icon: <Target className="w-6 h-6" /> },
  { title: 'Viscosupplementation', description: 'Hyaluronic acid injections to improve joint lubrication and reduce pain', icon: <Heart className="w-6 h-6" /> },
];

export default function ExpertiseClient() {
  const [expandedSurgery, setExpandedSurgery] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">Clinical Expertise</h1>
            <p className="text-xl text-neutral-200 leading-relaxed">
              Comprehensive sports medicine and orthopedic surgery services backed by international training and extensive surgical experience.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-secondary mb-4">ORTHOPEDIC SURGERIES (ARTHROSCOPIC | JOINT REPLACEMENT | SPORTS)</h2>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto">Minimally invasive arthroscopy, advanced joint replacement and athlete-friendly recovery procedures</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {surgeries.map((section, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-heading font-bold text-secondary">{section.title}</h3>
                    <button onClick={() => setExpandedSurgery(expandedSurgery === idx ? null : idx)} className="text-primary hover:text-primary-600 transition-colors">
                      {expandedSurgery === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-neutral-600 text-sm mb-4">{section.description}</p>
                  {expandedSurgery === idx && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4">
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="text-sm text-neutral-700 flex items-start">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                  <div className="inline-block px-4 py-2 bg-primary rounded-full text-sm font-medium text-white">Likely Return to Sport: {section.returnToSport}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <Stethoscope className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-secondary mb-4">Advanced Arthroscopic Techniques</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { title: 'Joint Preservation', description: 'Advanced techniques to preserve natural joints and delay or avoid replacement surgery through cartilage repair, realignment procedures, and biologics.', features: ['Cartilage Repair', 'Osteotomy Procedures', 'Meniscus Preservation', 'Ligament Reconstruction'] },
              { title: 'Minimally Invasive Surgery', description: 'State-of-the-art arthroscopic techniques resulting in minimal scarring, reduced pain, and quicker return to activities and sports.', features: ['Faster Recovery', 'Less Post-op Pain', 'Smaller Incisions', 'Same-day Discharge'] },
              { title: 'Adult Joint Reconstruction', description: 'Fellowship-trained expertise in complex joint reconstruction including revision surgeries and advanced arthroplasty techniques.', features: ['Total Joint Replacement', 'Revision Surgery', 'Custom Implants', 'Rapid Recovery Protocols'] },
              { title: 'Sports-Specific Rehabilitation', description: 'Tailored recovery protocols designed for athletes to return to peak performance safely and efficiently after orthopedic procedures.', features: ['Return-to-Sport Testing', 'Performance Analysis', 'Biomechanical Assessment', 'Injury Prevention'] },
            ].map((service, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-xl font-heading font-semibold text-secondary mb-3">{service.title}</h3>
                  <p className="text-neutral-600 mb-4 leading-relaxed">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-accent/10 to-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-secondary mb-4">Bio-Orthopedics & Regenerative Medicine</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {bioOrthopedicsServices.map((service, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-2 border-primary/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white">{service.icon}</div>
                  <h3 className="text-lg font-heading font-semibold text-secondary mb-3">{service.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-custom max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-secondary mb-4">PHYSIOTHERAPY AND SPORTS REHAB</h2>
          </motion.div>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conditions.map((condition, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.02 }} className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-neutral-700">{condition}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-secondary to-primary-600 text-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <Award className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-accent mb-4">Why Choose Dr. Sumedh Magar for Orthopedic Care</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {whyChoose.map((reason, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <p className="text-neutral-200 leading-relaxed">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-primary to-primary-600 text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center">
            <h2 className="text-white mb-6">Ready to Start Your Recovery Journey?</h2>
            <p className="text-xl text-neutral-100 mb-8">Schedule a consultation with Dr. Sumedh Magar at I-SPORT MEDICAL CENTRE, Pune</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-6 py-3 rounded-2xl font-semibold bg-secondary text-white hover:bg-secondary-400 shadow-soft inline-flex items-center gap-2 text-lg transition-all">
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </button>
              </Link>
              <a href="tel:+919145517171">
                <button className="px-6 py-3 rounded-2xl font-semibold bg-secondary text-white hover:bg-secondary-400 shadow-soft inline-flex items-center gap-2 text-lg transition-all">
                  <Phone className="w-5 h-5" />
                  Call Now
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
