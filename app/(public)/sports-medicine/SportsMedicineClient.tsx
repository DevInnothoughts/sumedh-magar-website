'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Award,
  Zap,
  Target,
  Heart,
  TrendingUp,
  Stethoscope,
  Phone,
  Calendar,
  Star,
  CheckCircle,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/Card';

interface Condition {
  name: string;
  description?: string;
}

interface BodyRegion {
  region: string;
  icon: string;
  conditions: Condition[];
}

export default function SportsMedicineClient() {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: 'Professional Athletes',
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Recreational Sports Players',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Runners and Cyclists',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Fitness Enthusiasts',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Gym-Goers',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Active Adults and Children',
    }
  ];

  const bodyRegions: BodyRegion[] = [
    {
      region: 'Knee Conditions',
      icon: '🦶',
      conditions: [
        { name: 'ACL Injuries', description: '' },
        { name: 'Meniscus Tears', description: '' },
        { name: 'Cartilage Injuries', description: '' },
        { name: 'Patellar Tendinitis', description: '' },
        { name: 'Runner\'s Knee', description: '' }
      ]
    },
    {
      region: 'Shoulder Conditions',
      icon: '🦵',
      conditions: [
        { name: 'Rotator Cuff Tears', description: '' },
        { name: 'Shoulder Instability', description: '' },
        { name: 'Shoulder Dislocations', description: '' },
        { name: 'Labral Injuries', description: '' }
      ]
    },
    {
      region: 'Foot & Ankle Conditions',
      icon: '💪',
      conditions: [
        { name: 'Ankle Sprains', description: '' },
        { name: 'Achilles Tendinitis', description: '' },
        { name: 'Plantar Fasciitis', description: '' },
        { name: 'Stress Fractures', description: '' }
      ]
    },
    {
      region: 'Muscle & Tendon Injuries',
      icon: '🤝',
      conditions: [
        { name: 'Hamstring Injuries', description: '' },
        { name: 'Muscle Strains', description: '' },
        { name: 'Tendon Tears', description: '' },
        { name: 'Overuse Injuries', description: '' }
      ]
    },
    {
      region: 'Elbow & Wrist Conditions',
      icon: '🏃',
      conditions: [
        { name: 'Tennis Elbow', description: '' },
        { name: 'Golfer\'s Elbow', description: '' },
        { name: 'TFCC Injuries', description: '' }
      ]
    },
    {
      region: 'Soft Tissue / Pediatric',
      icon: '👶',
      conditions: [
        { name: 'Tendinopathies', description: 'Chronic tendon overuse injuries' },
        { name: 'Bursitis', description: 'Inflammation of fluid-filled sacs near joints' },
        { name: 'Stress Injuries', description: 'Bone stress from repetitive impact' },
        { name: 'Growth Plate Issues', description: 'Youth athlete injuries requiring special care' }
      ]
    }
  ];

  const advancedServices = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Sports Injury Evaluation',
      description: 'Comprehensive assessment of acute and chronic sports injuries.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Sports Rehabilitation',
      description: 'Customized rehabilitation programs focused on restoring strength, mobility, and performance.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Injury Prevention Programs',
      description: 'Movement analysis and biomechanical assessment to reduce injury risk.'
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: 'Arthroscopic Sports Surgery',
      description: 'Minimally invasive procedures for ligament, cartilage, and joint injuries.'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'PRP & Regenerative Medicine',
      description: 'Advanced biological treatments that support tissue healing and recovery.'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Return-to-Sport Programs',
      description: 'Evidence-based protocols that help athletes safely return to training and competition.'
    }
  ];

  const whyChoose = [
    'Internationally Trained Sports Medicine Specialist',
    'FIFA Diploma in Football Medicine',
    'Fellowship-Trained Arthroscopy Surgeon',
    'Experience Treating Professional and Recreational Athletes',
    'Advanced Sports Rehabilitation Programs',
    'State-of-the-Art Sports Medicine Facility',
    'Personalized Return-to-Sport Protocols',
    'Focus on Long-Term Performance and Joint Health'
  ];

  const testimonials = [
    {
      name: 'Patient Review',
      text: 'Dr. Magar is highly recommended for sportsmen and athletes. He takes the time to listen carefully and explains the science behind his treatments.',
      rating: 5,
      source: 'Justdial'
    },
    {
      name: 'Recent Visitor',
      text: 'The clinic has a welcoming atmosphere and state-of-the-art facilities.',
      rating: 5,
      source: 'Justdial'
    },
    {
      name: 'Patient Feedback',
      text: 'Excellent service — the team helped my ligament repair and the rehab was structured for me as a runner.',
      rating: 5,
      source: 'Patient Review'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-neutral-50 overflow-x-hidden font-sans">
      {/* HERO SECTION - KEPT EXACTLY AS IT IS FOR BANNER IMAGE */}
      <section
  className="relative section-padding bg-gradient-to-br from-secondary via-primary-600 to-secondary text-white min-h-[500px] flex items-center"
  style={{
    backgroundImage: "url('/sport-medicine.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="container-custom max-w-5xl mx-auto">

    <nav className="flex items-center gap-1.5 text-sm text-neutral-300 mb-6">
      {/* <Link href="/" className="hover:text-white transition-colors">
        Home
      </Link>

      <ChevronRight className="w-3.5 h-3.5" />

      <Link href="/treatments" className="hover:text-white transition-colors">
        Treatments
      </Link> */}

      {/* <ChevronRight className="w-3.5 h-3.5" /> */}

      {/* <span className="text-white">
        Sports Medicine
      </span> */}
    </nav>


    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      <div>

        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
          Sports Medicine Specialist
        </p>


        <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold font-heading">
          Best Sports Medicine Doctor in Pune – Dr. Sumedh Magar
        </h1>


        <Link 
          href="/contact" 
          className="inline-flex items-center btn-primary"
        >
          Book Consultation
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>

      </div>

    </div>

  </div>
</section>

      {/* INTRODUCTION SECTION (STUNNING DOUBLE-GLOW & TWO-TONE TYPOGRAPHY) */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Subtle mesh background glows */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container-custom max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid md:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* LEFT – ASYMMETRIC VISUAL IMAGE BLOCK */}
            <div className="md:col-span-5 relative group mx-auto max-w-md w-full">
              {/* Backing rotated visual structures */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-25 rounded-[3rem] rotate-3 group-hover:rotate-6 transition-all duration-500 blur-[2px]"></div>
              <div className="absolute inset-0 bg-secondary opacity-15 rounded-[3rem] -rotate-3 group-hover:-rotate-6 transition-all duration-500 blur-[2px]"></div>

              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-soft-lg w-full border-[8px] border-white z-10 bg-white">
                <Image
                  src="/DrInAction1.JPG"
                  alt="Sports Medicine Doctor in Action"
                  fill
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-transparent"></div>
              </div>

              {/* Glowing float card */}
              <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-md border border-white/60 text-secondary rounded-2xl p-5 shadow-soft-lg z-20 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent text-white rounded-xl flex items-center justify-center shadow-md shadow-primary/20">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-primary tracking-wider">Accredited</p>
                    <p className="text-sm font-extrabold">Athlete Specific Care</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT – TWO-TONE HEADER & TEXT */}
            <div className="md:col-span-7 flex flex-col justify-center">
              {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-6 border border-primary/20 self-start shadow-sm">
                <Activity className="w-4 h-4 text-accent animate-pulse" />
                <span>SPORTS SURGEON</span> 
              </div> */}

              <h2 className="text-secondary font-extrabold text-3xl md:text-4xl mb-4">
                Introduction
              </h2>

              <div className="space-y-6 text-neutral-600 leading-relaxed text-base md:text-lg">
                <p className="text-secondary font-bold font-heading text-lg md:text-l border-l-4 border-primary pl-5 py-2 bg-gradient-to-r from-primary-50/30 via-primary-50/10 to-transparent rounded-r-xl mb-4">
                  If you are looking for the <strong>best sports medicine doctor in Pune</strong>, expert diagnosis and timely treatment can help you recover from injuries faster and return to peak performance.
                </p>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  The prevention, diagnosis, treatment, rehabilitation, and performance improvement of athletes and active people are the main goals of sports medicine.
                </p>
                <p className='text-neutral-700 leading-relaxed mb-4'>
                  <strong>Dr. Sumedh Magar </strong> is a leading Sports Medicine Doctor in Pune with advanced international training in Sports Medicine, Arthroscopy, and Athlete Rehabilitation. He provides comprehensive care for sports injuries, overuse conditions, joint problems, and performance-related concerns for professional athletes, fitness enthusiasts, and active individuals.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT IS SPORTS MEDICINE (HIGH-END GLOW MESH SPLIT) */}
      <section className="section-padding bg-gradient-to-b from-neutral-50 to-neutral-100 relative overflow-hidden">
        {/* Glow ambient bulb */}
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container-custom relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* LEFT – DEFINITION GRADIENT CARD */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5"
            >
              <div className="bg-gradient-to-br from-secondary via-secondary-700 to-primary-700 text-white rounded-[2.5rem] p-8 shadow-soft-lg border border-white/10 relative overflow-hidden group hover:scale-[1.01] transition-transform">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/25 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <span className="text-xs font-bold text-accent uppercase tracking-widest bg-white/10 px-3 py-1 rounded-md mb-6 inline-block">
                    Philosophy
                  </span>
                  <h2 className="text-white font-heading font-extrabold text-3xl mb-5 leading-tight">
                    What is <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">
                      Sports Medicine?
                    </span>
                  </h2>
                  <p className="text-neutral-200 text-base md:text-lg leading-relaxed font-light mb-6">
                    Sports Medicine is a specialized field of medicine focused on preventing, diagnosing, treating, and
                    rehabilitating injuries related to sports, exercise, and physical activity.
                  </p>
                  <p className="text-accent text-sm md:text-base font-semibold">
                    It also helps improve athletic performance and reduce the risk of future injuries.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT – COMPACT BADGES GRID */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-4 bg-white border border-neutral-200/50 rounded-2xl p-5 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/15 rounded-xl flex items-center justify-center text-primary group-hover:from-primary group-hover:to-primary-600 group-hover:text-white transition-all duration-300 flex-shrink-0 group-hover:scale-105">
                      {pillar.icon}
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <h3 className="text-base md:text-lg font-heading font-bold text-secondary tracking-tight group-hover:text-primary transition-colors">
                        {pillar.title}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-neutral-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* MEET DR. SUMEDH MAGAR & QUALIFICATIONS (MODERNIZED CARD GRID) */}
      <section className="section-padding bg-white relative">
        <div className="container-custom max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-secondary font-heading font-extrabold text-3xl md:text-4xl mb-4">
              Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-black">Dr. Sumedh Magar</span> – Sports Medicine Specialist in Pune
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed">
              One of Pune's most skilled sports medicine specialists,
              Dr. Sumedh Magar provides advanced treatment for orthopaedic conditions and sports injuries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-12">
            {[
              "MS Orthopaedics",
              "Masters in Sports Medicine, Exercise & Health (University College London, UK)",
              "FIFA Diploma in Football Medicine",
              "ISAKOS Fellowship in Arthroscopy & Adult Reconstructive Surgery",
              "Lead Sports Medicine Consultant, Khelo India (Government of Maharashtra)",
              "Founder Director, I-SPORT Medical Centre, Pune"
            ].map((qual, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 bg-neutral-50 rounded-2xl p-5 border-l-4 border-l-primary/40 border border-neutral-200/50 shadow-sm hover:border-l-primary hover:bg-white hover:shadow-soft transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5 shadow-sm">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-secondary font-heading font-extrabold text-sm md:text-base leading-relaxed">{qual}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-neutral-600 text-base md:text-lg leading-relaxed bg-gradient-to-r from-primary-50/50 to-accent-50/30 rounded-2xl p-6 border border-primary/10 max-w-4xl mx-auto shadow-sm"
          >
            <p className="font-semibold text-secondary">
              His special blend of personal athletic experience and sports medical knowledge allows him to offer athlete-focused
              treatment strategies that promote a quicker recovery and a safe return to sports.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONDITIONS TREATED BY TABS (PREMIUM LIGHT SYSTEM) */}
      <section className="section-padding bg-neutral-50/60 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-secondary font-heading font-extrabold text-3xl md:text-4xl mt-5 mb-4">Conditions Treated by a Sports Medicine Doctor</h2>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Sliding tab selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-10 p-2 rounded-2xl bg-white border border-neutral-200 shadow-soft max-w-4xl mx-auto">
              {bodyRegions.map((region, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className="relative px-5 py-3 rounded-xl font-heading font-bold text-sm transition-all duration-300 flex items-center gap-2 outline-none hover:scale-[1.02]"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {activeTab === idx && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-primary rounded-xl shadow-soft"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-2 ${activeTab === idx ? 'text-white' : 'text-neutral-500 hover:text-secondary'}`}>
                    <span className="text-lg">{region.icon}</span>
                    <span>{region.region}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Condition List Grid */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 lg:p-10 shadow-soft border border-neutral-200/50 min-h-[250px]"
            >
              <h3 className="text-2xl font-heading font-extrabold text-secondary mb-8 flex items-center gap-3 border-b border-neutral-100 pb-4">
                <span className="text-3xl">{bodyRegions[activeTab].icon}</span>
                {bodyRegions[activeTab].region}
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bodyRegions[activeTab].conditions.map((condition, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group"
                  >
                    {condition.description ? (
                      <div className="bg-neutral-50 rounded-2xl p-6 border-l-4 border-l-primary/30 border border-neutral-200/60 hover:border-l-primary hover:bg-white hover:shadow-soft transition-all duration-300 flex flex-col h-full justify-between">
                        <div>
                          <h4 className="font-heading font-bold text-secondary mb-2 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            {condition.name}
                          </h4>
                          <p className="text-sm text-neutral-500 leading-relaxed pl-7">{condition.description}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 bg-neutral-50 rounded-2xl p-5 border-l-4 border-l-primary/30 border border-neutral-200/60 hover:border-l-primary hover:bg-white hover:shadow-soft transition-all duration-300">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <h4 className="font-heading font-bold text-secondary">{condition.name}</h4>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ORTHO-BIOLOGICS (PREMIUM CARDS) */}
      <section className="section-padding bg-white relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >

            <h2 className="text-secondary font-heading font-extrabold text-3xl md:text-4xl mb-4">Ortho-Biologics & Regenerative Medicine</h2>
            <p className="text-neutral-500 text-lg leading-relaxed">
              Advanced regenerative treatments to accelerate healing and support tissue repair
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'PRP Injections',
                description: 'Platelet-Rich Plasma to stimulate tendon/ligament healing in overuse injuries'
              },
              {
                title: 'Stem-Cell Therapies',
                description: 'Orthobiologics for cartilage damage and early arthritis in athletes'
              },
              {
                title: 'Cartilage Regeneration',
                description: 'Advanced techniques to preserve joints and enhance recovery long-term'
              }
            ].map((treatment, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="h-full bg-neutral-50 rounded-[2rem] p-8 border border-neutral-200/50 hover:border-primary/30 hover:bg-white hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between shadow-soft">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-600 group-hover:text-white transition-all duration-300 shadow-md shadow-primary/20">
                      <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-secondary mb-4 group-hover:text-primary transition-colors">
                      {treatment.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                      {treatment.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPORTS MEDICINE SERVICES (HIGH-END ROW SYSTEM WITH GLOW HIGHLIGHT & BORDER UNDERLINES) */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 via-white to-neutral-100 relative overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container-custom relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-secondary font-heading font-extrabold text-3xl md:text-4xl mb-4">
              Sports Medicine <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-black">Services Offered</span>
            </h2>
          </motion.div>

          <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200 relative">
            {advancedServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group relative py-8 px-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white hover:shadow-soft-lg transition-all duration-500 rounded-2xl md:rounded-none border-x border-transparent hover:border-neutral-200/50"
              >
                {/* Horizontal row underline hover animation */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 hidden md:block"></div>

                <div className="flex items-center gap-6 md:w-5/12">
                  <span className="text-3xl font-heading font-extrabold text-primary/30 group-hover:text-primary transition-colors duration-300 flex-shrink-0">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>

                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-600 group-hover:text-white transition-all duration-500 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 shadow-sm shadow-primary/10">
                    <div className="w-6 h-6 flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-heading font-extrabold text-secondary group-hover:text-primary transition-colors duration-500">
                    {service.title}
                  </h3>
                </div>

                <div className="flex-1 md:max-w-xl text-neutral-500 text-sm md:text-base leading-relaxed pl-11 md:pl-0 font-light">
                  {service.description}
                </div>

                <div className="flex justify-end pl-11 md:pl-0">
                  <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-primary group-hover:translate-x-1.5 transition-all duration-300 flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE DR. MAGAR (HIGH-IMPACT DARK THEME REDESIGN) */}
      <section className="section-padding bg-gradient-to-br from-secondary via-secondary-900 to-primary-800 text-white relative overflow-hidden">
        {/* Dynamic graphics on dark theme */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl opacity-30"></div>

        <div className="container-custom relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <Award className="w-12 h-12 text-accent mx-auto mb-4 animate-bounce" />
            <h2 className="text-accent font-heading font-extrabold text-3xl md:text-4xl mb-4">Why Choose Dr. Sumedh Magar as Your Sports Medicine Doctor in Pune?</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {whyChoose.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -25 : 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-[1.5rem] p-6 border border-white/10 hover:border-accent/40 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <p className="text-neutral-200 leading-relaxed font-heading font-bold text-sm md:text-base">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (CLEAN WHITE BLOCK CARDS) */}
      <section className="section-padding bg-neutral-50 relative">
        <div className="container-custom max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-secondary font-heading font-extrabold text-3xl md:text-4xl mb-4">Patient Testimonials</h2>
            <p className="text-neutral-500 text-lg">
              Hear from athletes who&apos;ve experienced exceptional care and recovery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="h-full bg-white border border-neutral-200/50 p-8 testimonial-card transition-all duration-300 rounded-[1rem] flex flex-col justify-between">
                  <div>
                    {/* Quotation mark style icon */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-neutral-600 mb-6 leading-relaxed italic text-sm md:text-base">"{testimonial.text}"</p>
                  </div>
                  <div className="pt-4 border-t border-neutral-100 flex justify-between items-center">
                    <div>
                      <p className="font-heading font-extrabold text-secondary text-sm md:text-base">{testimonial.name}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{testimonial.source}</p>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK APPOINTMENT CTA */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center animate-pulse-slow"
          >
            <h2 className="text-white font-heading font-extrabold text-3xl md:text-5xl tracking-tight mb-6">Book an Appointment with the Best Sports Medicine Doctor in Pune</h2>
            <p className="text-lg md:text-xl text-neutral-100 mb-10 leading-relaxed font-light max-w-3xl">
              Whether you are suffering from a sports injury, recurring joint pain, ligament tear, muscle strain, or want to improve athletic performance,
              Dr. Sumedh Magar provides comprehensive sports medicine care tailored to your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="px-8 py-4 w-full sm:w-auto rounded-2xl font-extrabold transition-all duration-300 bg-secondary text-white hover:bg-secondary-600 shadow-soft hover:shadow-soft-lg inline-flex items-center justify-center gap-2 text-lg hover:scale-[1.02]">
                  <Calendar className="w-5 h-5 text-accent" />
                  Book Appointment
                </button>
              </Link>
              <a href="tel:+918237071111" className="w-full sm:w-auto">
                <button className="px-8 py-4 w-full sm:w-auto rounded-2xl font-extrabold transition-all duration-300 bg-secondary text-white hover:bg-secondary-600 shadow-soft hover:shadow-soft-lg inline-flex items-center justify-center gap-2 text-lg hover:scale-[1.02]">
                  <Phone className="w-5 h-5 text-accent" />
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
