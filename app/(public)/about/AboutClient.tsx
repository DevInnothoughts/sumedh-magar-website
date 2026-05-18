'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, Heart, Trophy, Users } from 'lucide-react';
import { Card } from '@/components/Card';

const education = [
  { year: '2020-2021', institution: 'University College London (UK)', degree: 'Masters in Sports Medicine, Exercise & Health' },
  { year: '2016-2019', institution: 'Dr. D.Y. Patil Medical College, Pune', degree: 'M.S. Orthopaedics' },
  { year: '2009-2015', institution: 'R.C.S.M. Government Medical College, Kolhapur', degree: 'M.B.B.S.' },
  { year: '2007-2008', institution: 'Modern College, Pune', degree: 'Higher Secondary' },
  { year: '2001-2006', institution: 'Sainik School, Satara', degree: 'Secondary Education' },
];

const experience = [
  { title: 'Founder & Director', organization: 'I-SPORT MEDICAL CENTRE, Pune', period: '2023 - Present', description: 'Tertiary center for Sports Medicine and Sports Surgery' },
  { title: 'LEAD SPORTS MEDICINE KHELO INDIA', organization: 'Khelo India, Balewadi Sports Complex', period: '2023 - Present', description: 'Government of Maharashtra initiative for athlete health' },
  { title: 'Fellowship', organization: 'Adult Reconstruction Surgery (ISAKOS)', period: 'Completed', description: 'Arthroscopy and Arthroplasty specialization' },
  { title: 'Clinical Observer', organization: 'Fortius Clinic, London (UK)', period: '2020-2021', description: 'Advanced training in sports orthopedics' },
  { title: 'Senior Registrar', organization: 'Dr. D.Y. Patil Medical College, Pune', period: '2019', description: 'Orthopedic surgery and trauma management' },
  { title: 'Consultant', organization: 'Sushrut Hospital & MIS Center, Phaltan', period: 'Previous', description: 'Trauma and Arthroscopy services' },
];

const memberships = [
  'Indian Orthopedics Association',
  'Indian Arthroscopy Society',
  'Indian Cartilage Society',
  'Maharashtra Orthopedics Association',
  'Bombay Orthopedics Society',
];

const sportsAchievements = [
  { achievement: 'Gold & Silver Medal - Swimming', event: 'All India Inter-Medical Sports AIIMS, New Delhi' },
  { achievement: 'Gold Medal - Freestyle Swimming', event: 'Inter Collegiate Competition, Dr. D.Y. Patil University 2018' },
  { achievement: "Gold Medal - Men's Basketball", event: 'Inter-collegiate Competition, Dr. D.Y. Patil University 2018' },
  { achievement: "Gold Medal - Men's Relay Swimming", event: 'Inter-collegiate Competition, Dr. D.Y. Patil University 2018' },
];

export default function AboutClient() {
  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">About Dr. Sumedh Magar</h1>
            <p className="text-xl text-neutral-200 leading-relaxed">
              A distinguished sports orthopedic surgeon combining international training, extensive surgical experience, and personal athletic achievement to deliver exceptional care to athletes and patients.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-secondary text-center mb-12">
              <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
              Educational Background
            </h2>
          </motion.div>
          <div className="max-w-4xl mx-auto space-y-6">
            {education.map((edu, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-24 text-primary font-semibold">{edu.year}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-heading font-semibold text-secondary mb-1">{edu.degree}</h3>
                    <p className="text-neutral-600">{edu.institution}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-secondary text-center mb-12">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              Professional Experience
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {experience.map((exp, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="h-full">
                  <div className="mb-3">
                    <h3 className="text-xl font-heading font-semibold text-secondary mb-1">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.organization}</p>
                    <p className="text-sm text-neutral-500">{exp.period}</p>
                  </div>
                  <p className="text-neutral-600">{exp.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-secondary mb-8">
                <Users className="w-10 h-10 text-primary mb-4" />
                Professional Memberships
              </h2>
              <Card>
                <ul className="space-y-3">
                  {memberships.map((membership, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-neutral-700">{membership}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-secondary mb-8">
                <Trophy className="w-10 h-10 text-primary mb-4" />
                Sports Excellence
              </h2>
              <Card>
                <ul className="space-y-4">
                  {sportsAchievements.map((sport, index) => (
                    <li key={index}>
                      <p className="font-semibold text-secondary">{sport.achievement}</p>
                      <p className="text-sm text-neutral-600">{sport.event}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary text-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              Academic Excellence & Awards
            </h2>
            <Card className="bg-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-heading font-semibold mb-4 text-accent">Padmashree Vedsinha Marwah Research Award</h3>
              <p className="text-neutral-200 text-lg">Maharashtra Orthopaedic Association, Annual Conference (MOACON) 2017</p>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center mt-12">
            <h2 className="mb-6">Charitable Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm">
                <h3 className="text-lg font-heading font-semibold mb-2 text-accent">Mahatma Phule Jeevandayee Aarogya Yojana</h3>
                <p className="text-neutral-200">Free health check-up camps in Satara district, Government of Maharashtra</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm">
                <h3 className="text-lg font-heading font-semibold mb-2 text-accent">Late Subhash Anna Kul Health Camp</h3>
                <p className="text-neutral-200">Free health check-up camp in Daund, District Pune</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-4">SPECIAL INTEREST</h2>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              {['KNEE PRESERVATION SURGERIES', 'BIOMECHANICS', 'BIO ORTHOPAEDICS'].map((item) => (
                <span key={item} className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl">{item}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
