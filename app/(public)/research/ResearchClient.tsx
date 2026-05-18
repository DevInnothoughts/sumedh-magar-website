'use client';

import { motion } from 'framer-motion';
import { BookOpen, FileText, Users, Award } from 'lucide-react';
import { Card } from '@/components/Card';

export default function ResearchClient() {
  const papers = [
    {
      title: "Pigmented Villo Nodular Synovitis of Hoffa's Fat Pad",
      subtitle: 'Treatment with 70 degree arthroscope and superolateral portal',
      conference: 'Indian Arthroscopy Society Annual Conference (IASCON 2018)',
      year: '2018',
    },
    {
      title: 'Single Stage Bilateral Total Hip and Knee Arthroplasty in Young Adult with Ankylosing Spondylitis',
      conference: 'Indian Orthopedic Association Annual Conference (IOACON 2018)',
      year: '2018',
    },
    {
      title: 'Return to Sports after ACL Reconstruction with Hamstring Graft',
      subtitle: 'Systematic review of hamstring strength recovery, psychological readiness and proprioception changes',
      conference: 'Indian Orthopedic Association Annual Conference (IOACON 2021)',
      year: '2021',
    },
  ];

  const research = [
    {
      title: 'Cancer Markers Study',
      description: 'Worked with Prof. Dr. Gopal Kundu (NCCS, Pune) on "Development of potential early prognostic and diagnostic markers for breast and other cancers"',
      year: '2012',
    },
    {
      title: 'Morphometric Analysis of Tibial Footprint of ACL',
      description: 'Worked at Ganga Hospital, Coimbatore as Dr. Prof. S. Rajasekaran Research Understudy. MRI-based study of anthropometric measurements in Indian population.',
      year: '2015',
    },
  ];

  const dissertations = [
    {
      title: 'Outcome of Chondral & Osteochondral Lesions of Patello-Femoral Instability',
      description: 'Dissertation for Masters degree in Orthopaedics at Dr. D.Y. Patil Medical College, Pune',
      year: '2016-2019',
    },
    {
      title: 'Return to Sports after ACL Reconstruction with Hamstring Graft',
      description: 'Systematic review of hamstring strength recovery, psychological readiness and proprioception changes. Dissertation for Masters in Sports Medicine at University College London.',
      year: '2020-2021',
    },
  ];

  const conferences = [
    { name: 'ISAKOS Congress 2017', location: 'Shanghai, China', year: '2017' },
    { name: 'Basic Workshop on Cadaveric Knee Arthroscopy', location: 'Pune', year: '2017' },
    { name: 'Pune Knee Course', location: 'Pune', year: '2017, 2018, 2019' },
    { name: 'Basic Shoulder Arthroscopy Course', location: 'India', year: '2018' },
    { name: 'ISAKOS Knee Course', location: 'India', year: '2018, 2019' },
    { name: 'Bombay Orthopaedic Society Annual Conference (WIROC)', location: 'Mumbai', year: '2019' },
    { name: 'Asia Pacific Spine Society Conference', location: 'India', year: '2020' },
    { name: '1st Lower Limb Deformity Course', location: 'Pune', year: '2019' },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-6">Research & Publications</h1>
            <p className="text-xl text-neutral-200 leading-relaxed">
              Contributing to the advancement of sports medicine and orthopedic surgery through
              research, publications, and continuous learning.
            </p>
          </motion.div>
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
            <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-secondary mb-4">Paper Presentations</h2>
          </motion.div>

          <div className="space-y-6">
            {papers.map((paper, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-heading font-semibold text-secondary flex-1">
                      {paper.title}
                    </h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium ml-4">
                      {paper.year}
                    </span>
                  </div>
                  {paper.subtitle && (
                    <p className="text-neutral-600 mb-2 italic">{paper.subtitle}</p>
                  )}
                  <p className="text-primary font-medium">{paper.conference}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-custom max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-secondary mb-4">Research Activities</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {research.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-heading font-semibold text-secondary flex-1">
                      {item.title}
                    </h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium ml-4">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-neutral-600">{item.description}</p>
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
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-secondary mb-4">Dissertations</h2>
          </motion.div>

          <div className="space-y-6">
            {dissertations.map((diss, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-heading font-semibold text-secondary flex-1">
                      {diss.title}
                    </h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium ml-4">
                      {diss.year}
                    </span>
                  </div>
                  <p className="text-neutral-600">{diss.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary text-white">
        <div className="container-custom max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="mb-4">Conferences & Workshops Attended</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conferences.map((conf, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <h3 className="font-heading font-semibold text-lg mb-2 text-accent">
                  {conf.name}
                </h3>
                <p className="text-neutral-300 text-sm mb-1">{conf.location}</p>
                <p className="text-neutral-400 text-sm">{conf.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
