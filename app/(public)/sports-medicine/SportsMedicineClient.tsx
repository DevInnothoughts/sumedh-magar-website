'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/Card';

interface Condition {
  name: string;
  description: string;
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
      icon: <Stethoscope className="w-8 h-8" />,
      title: 'Injury Assessment',
      description: 'Comprehensive biomechanics & movement analysis'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Treatment Management',
      description: 'Conservative and surgical management of sports injuries'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Performance Optimization',
      description: 'Enhancement and prevention of re-injury'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Return-to-Play',
      description: 'Structured protocols tailored to each athlete'
    }
  ];

  const bodyRegions: BodyRegion[] = [
    {
      region: 'Foot & Ankle',
      icon: '🦶',
      conditions: [
        { name: 'Plantar Fasciitis', description: 'Inflammation of the sole plate common in runners/athletes' },
        { name: 'Achilles Tendinitis', description: 'Overuse or sudden loading of the Achilles tendon' },
        { name: 'Peroneal Tendinitis', description: 'Lateral ankle tendon irritation in cutting sports' },
        { name: 'Ankle Sprain', description: 'Ligament injury from twisting or unstable landings' }
      ]
    },
    {
      region: 'Knee',
      icon: '🦵',
      conditions: [
        { name: 'Patellar Tendinitis', description: "Jumper's knee - strain of patella tendon from jumping sports" },
        { name: 'Partial Ligament Tears', description: 'ACL, PCL, MCL tears common in pivoting sports' },
        { name: 'Meniscus Injuries', description: 'Torn cartilage during twisting or direct trauma' }
      ]
    },
    {
      region: 'Shoulder',
      icon: '💪',
      conditions: [
        { name: 'Rotator Cuff Injuries', description: 'Tears or strain in overhead sports (swimming, tennis)' },
        { name: 'Adhesive Capsulitis', description: 'Frozen shoulder from inactivity or injury' },
        { name: 'Bicipital Tendinitis', description: 'Inflammation of biceps tendon in shoulder region' },
        { name: 'SLAP/Bankart Lesions', description: 'Labral tears in throwing athletes' }
      ]
    },
    {
      region: 'Elbow & Wrist',
      icon: '🤝',
      conditions: [
        { name: 'Lateral Epicondylitis', description: 'Tennis elbow - overuse of forearm extensors' },
        { name: 'Medial Epicondylitis', description: "Golfer's elbow - forearm flexor overuse" },
        { name: 'TFCC Tears', description: 'Wrist injuries in racquet sports' },
        { name: "De Quervain's Tenosynovitis", description: 'Thumb side wrist pain from repetitive gripping' }
      ]
    },
    {
      region: 'Hip & Spine',
      icon: '🏃',
      conditions: [
        { name: 'Hip Arthritis', description: 'Early onset in athletes with deformities or overuse' },
        { name: 'Sacroiliac Joint Pain', description: 'Low-back/pelvic pain common in runners and cyclists' },
        { name: 'Hamstring Strains', description: 'Common in sprint sports or football' },
        { name: 'Trochanteric Bursitis', description: 'Hip-side pain in running or change-of-direction sport' }
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
      icon: <Activity className="w-8 h-8" />,
      title: 'Movement Analysis Lab',
      description: 'High-end video-biomechanical testing for gait, jump, and change-of-direction assessment'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Performance Analysis',
      description: 'Strength, power and functional testing for athlete optimization'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Return-to-Sports Rehabilitation',
      description: 'Structured programmes for safe transition back to sport-specific training'
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: 'Sports Screening',
      description: 'Pre-season screening and injury-risk profiling'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Injury Risk Profiling',
      description: 'Tailored programmes to minimize recurrent injury risk'
    }
  ];

  const whyChoose = [
    'UK-trained in Sports Medicine & Exercise Science; FIFA Diploma in Football Medicine',
    'Fellowship-trained arthroscopy surgeon specializing in ACL reconstruction and joint preservation',
    'Experience treating professional athletes, footballers, swimmers, runners and weekend sportspersons',
    'Evidence-based rehabilitation protocols for early and safe return to sport',
    'Multidisciplinary facility (I-SPORT) integrating surgery, rehab, performance testing under one roof',
    'Focus on long-term joint health and performance optimization'
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
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-gradient-to-br from-secondary via-primary-600 to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <Activity className="w-20 h-20 text-accent mx-auto" />
            </motion.div>

            <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold">
              Advanced Sports Medicine & Injury Care
            </h1>

            <p className="text-2xl md:text-3xl font-light mb-8 text-accent">
              Precision • Performance • Return to Sport
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-neutral-200 leading-relaxed max-w-4xl mx-auto"
            >
              Welcome to the Sports Medicine portal of Dr. Sumedh Magar, M.S. Orthopaedics, a fellowship-trained
              specialist in sports orthopaedic surgery, rehabilitation and high-performance athlete care. With
              world-class credentials and a deep commitment to athlete-specific recovery, Dr. Magar combines
              surgical excellence and advanced rehabilitation to get you back in the game stronger than ever.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">

              {/* LEFT – IMAGE BLOCK */}
              <div className="relative h-full">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl w-full relative">
                  <Image
                    src="/DrInAction1.JPG"
                    alt="Sports Medicine"
                    fill
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Subtle glow */}
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
              </div>

              {/* RIGHT – TEXT BLOCK */}
              <div className="flex flex-col justify-center h-full">
                <h2 className="text-secondary mb-6 leading-snug">
                  About Dr. Sumedh Magar – Your Sports Medicine Specialist
                </h2>

                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>
                    Dr. Magar holds a <strong>Masters in Sports Medicine, Exercise & Health</strong>{' '}
                    from the University College London (UK), a{' '}
                    <strong>Diploma in Football Medicine from FIFA</strong>, and completed an{' '}
                    <strong>ISAKOS Fellowship in Arthroscopy & Adult Reconstructive Surgery</strong>.
                  </p>

                  <p>
                    He serves as <strong>Lead – Sports Medicine</strong> for the Khelo India programme
                    at Balewadi Sports Complex, Government of Maharashtra, and is the{' '}
                    <strong>Founder Director of I-SPORT Medical Centre, Pune</strong>.
                  </p>

                  <p>
                    An accomplished former national-level swimmer and basketball player, he merges his athletic
                    experience with orthopaedic expertise. At I-SPORT, he brings advanced arthroscopy,
                    joint preservation, regenerative orthobiologics and sport-specific rehabilitation
                    under one roof.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-silver-light to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-secondary mb-4">What is Sports Medicine?</h2>
            <p className="text-neutral-600 text-lg max-w-4xl mx-auto">
              Sports Medicine is a specialized branch of orthopaedics focused on prevention, diagnosis,
              treatment and return-to-sport planning of musculoskeletal injuries and movement dysfunctions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-2 border-transparent hover:border-primary">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-secondary mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {pillar.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <Activity className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-secondary mb-4">Sports Medicine and Performance</h2>
          </motion.div>

          <Card className="mb-4">
            <h3 className="text-xl font-heading font-semibold text-secondary mb-4">
              Sports Medicine & Rehabilitation
            </h3>
            <ul className="space-y-2 pl-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-neutral-700">Sports Injury Prevention Programs</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-neutral-700">Performance Analysis & Optimization</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-neutral-700">Movement Analysis Testing Laboratory</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-neutral-700">Return-to-Sports Rehabilitation Protocols</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-neutral-700">Athlete Health Management</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-neutral-700">Performance Enhancement Strategies</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-secondary mb-4">Conditions Treated</h2>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
              Comprehensive care for a wide range of sports-related injuries and conditions
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {bodyRegions.map((region, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setActiveTab(idx)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === idx
                      ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-lg scale-105'
                      : 'bg-white text-neutral-700 border-2 border-neutral-200 hover:border-primary'
                  }`}
                >
                  <span className="mr-2">{region.icon}</span>
                  {region.region}
                </motion.button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-white to-silver-light rounded-2xl p-8 shadow-lg border border-neutral-200"
            >
              <h3 className="text-2xl font-heading font-bold text-secondary mb-6 flex items-center">
                <span className="text-4xl mr-3">{bodyRegions[activeTab].icon}</span>
                {bodyRegions[activeTab].region}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {bodyRegions[activeTab].conditions.map((condition, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-secondary mb-2">{condition.name}</h4>
                    <p className="text-sm text-neutral-600">{condition.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-accent/10 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-secondary mb-4">Ortho-Biologics & Regenerative Medicine</h2>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
              Advanced regenerative treatments to accelerate healing and support tissue repair
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                transition={{ delay: idx * 0.15 }}
              >
                <Card className="text-center h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-2 border-primary/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-secondary mb-3">
                    {treatment.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {treatment.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-secondary mb-4">Advanced Services at I-SPORT</h2>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
              Complete athlete-care ecosystem under one roof
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {advancedServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-secondary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-secondary to-primary-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Award className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-accent mb-4">Why Athletes Choose Dr. Sumedh Magar</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {whyChoose.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
              >
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <p className="text-neutral-200 leading-relaxed">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-secondary mb-4">Patient Testimonials</h2>
            <p className="text-neutral-600 text-lg">
              Hear from athletes who&apos;ve experienced exceptional care and recovery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-neutral-700 mb-4 leading-relaxed">{testimonial.text}</p>
                  <div className="pt-4 border-t border-neutral-200">
                    <p className="font-semibold text-secondary">{testimonial.name}</p>
                    <p className="text-sm text-neutral-500">{testimonial.source}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-primary to-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-white mb-6">Ready to Get Back to Sport Stronger?</h2>
            <p className="text-xl text-neutral-100 mb-8 leading-relaxed">
              Book an appointment with Dr. Sumedh Magar today at I-SPORT MEDICAL CENTRE, Pune
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white/20 hover:bg-white/15 transition-all"
            >
              <p className="text-white mb-2 text-lg font-medium">I-SPORT MEDICAL CENTRE</p>
              <p className="text-neutral-200">
                Shop No. 9-13, 37/1 & 37/2 Kakkad Madhukosh, Madhuban Society Road,
                Balewadi-Baner, Pune 411045
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-6 py-3 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-secondary text-white hover:bg-secondary-400 shadow-soft hover:shadow-soft-lg inline-flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </button>
              </Link>
              <button className="px-6 py-3 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-secondary text-white hover:bg-secondary-400 shadow-soft hover:shadow-soft-lg inline-flex items-center gap-2 text-lg">
                <Phone className="w-5 h-5" />
                Call Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
