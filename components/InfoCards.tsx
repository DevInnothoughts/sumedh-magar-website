'use client';

import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Target, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

const infoCards = [
  {
    id: 1,
    icon: Briefcase,
    title: '6 YEARS OF EXPERIENCE',
    description: 'Extensive expertise in orthopedic surgery and sports medicine',
    link: '/about',
  },
  {
    id: 2,
    icon: Users,
    title: 'Lead Sports Medicine',
    description: 'Khelo India, Balewadi Sports Complex, Govt. of Maharashtra',
    link: '/about',
  },
  {
    id: 3,
    icon: Trophy,
    title: 'Padmashree Award Winner',
    description: 'Vedsinha Marwah Research Award - MOACON 2017',
    link: '/about',
  },
  {
    id: 4,
    icon: GraduationCap,
    title: 'Masters from UCL London',
    description: 'Sports Medicine, Exercise & Health (University College London)',
    link: '/about',
  },
  {
    id: 5,
    icon: Target,
    title: 'Adult Joint Preservation',
    description: 'Fellowship in Arthroscopy and Arthroplasty',
    link: '/expertise',
  },
  {
    id: 6,
    icon: Award,
    title: 'International Training',
    description: 'Clinical Observer at Fortius Clinic, London',
    link: '/about',
  },
];

export const InfoCards = () => {
  return (
    <section className="py-16 bg-white relative z-20">
      <div className="container-custom px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={card.link}>
                <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full group">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <card.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-secondary mb-3">
                      {card.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                      {card.description}
                    </p>
                    <span className="text-primary font-semibold text-sm group-hover:text-secondary transition-colors inline-flex items-center">
                      Know More
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
