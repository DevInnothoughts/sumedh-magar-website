import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone, Star, Award } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Best Orthopedic Surgeon in Pune – Dr. Sumedh Magar | I-SPORT Medical Centre',
  description:
    'Dr. Sumedh Magar – leading orthopedic surgeon in Pune. MS Orthopaedics, Masters in Sports Medicine (UCL London), ISAKOS Fellowship. Expert in ACL reconstruction, arthroscopy & joint preservation at I-SPORT Medical Centre, Balewadi.',
  alternates: { canonical: `${SITE_URL}/orthopedic-surgeon-pune` },
  keywords: [
    'orthopedic surgeon Pune',
    'best orthopedic doctor Pune',
    'sports orthopedic Pune',
    'ACL surgeon Pune',
    'knee surgeon Pune',
    'arthroscopy surgeon Pune',
    'orthopedic Balewadi',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/orthopedic-surgeon-pune`,
    title: 'Best Orthopedic Surgeon in Pune | Dr. Sumedh Magar',
    description: 'Fellowship-trained sports orthopedic surgeon in Pune. ACL reconstruction, knee & shoulder arthroscopy, joint preservation.',
    images: [{ url: `${SITE_URL}/SumedhMagar.jpeg`, width: 1200, height: 630, alt: 'Dr. Sumedh Magar orthopedic surgeon Pune' }],
  },
};

const faqs = [
  {
    q: 'What makes Dr. Sumedh Magar a specialist orthopedic surgeon?',
    a: 'Dr. Magar holds MS Orthopaedics, a Masters in Sports Medicine from University College London (UCL), and an ISAKOS Fellowship in arthroscopy and reconstructive surgery — a combination that represents the highest level of sports orthopedic training internationally.',
  },
  {
    q: 'What conditions does Dr. Magar treat?',
    a: 'Dr. Magar specialises in sports knee injuries (ACL, meniscus), shoulder conditions (rotator cuff, instability), arthroscopic surgery, joint preservation, and bio-orthopedics (PRP, stem cell).',
  },
  {
    q: 'Where is I-SPORT Medical Centre located?',
    a: 'I-SPORT Medical Centre is located at Shp 9-13, Madhukosh Society, Balewadi, Pune 411045 — serving patients from Baner, Wakad, Hinjewadi, Aundh, and across Pune.',
  },
  {
    q: 'How do I book an appointment?',
    a: 'Call 9145517171, email sumedh@isportmedicalcentre.com, or use the online appointment form on our Contact page.',
  },
  {
    q: 'Does Dr. Magar perform arthroscopic surgery?',
    a: 'Yes. Dr. Magar is an ISAKOS fellowship-trained arthroscopy specialist performing knee, shoulder, and hip arthroscopy using the latest minimally invasive techniques.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Orthopedic Surgeon Pune', item: `${SITE_URL}/orthopedic-surgeon-pune` },
  ],
};

const physicianSchema = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: 'Dr. Sumedh Magar',
  jobTitle: 'Sports Orthopedic Surgeon',
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/SumedhMagar.jpeg`,
  description: 'MS Orthopaedics, Masters in Sports Medicine (UCL, UK), ISAKOS Fellowship. Founder & Director I-SPORT Medical Centre Pune.',
  medicalSpecialty: 'OrthopedicSurgery',
  workLocation: {
    '@type': 'MedicalClinic',
    name: 'I-SPORT Medical Centre',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shp 9-13, Madhukosh Society',
      addressLocality: 'Balewadi, Pune',
      postalCode: '411045',
      addressCountry: 'IN',
    },
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function OrthopedicSurgeonPunePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen pt-20">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
          <div className="container-custom max-w-6xl mx-auto">
            <nav className="flex items-center gap-1.5 text-sm text-neutral-300 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Orthopedic Surgeon Pune</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                  I-SPORT Medical Centre, Balewadi
                </p>
                <h1 className="mb-4 text-4xl md:text-5xl font-bold leading-tight">
                  Sports Orthopedic Surgeon in Pune
                </h1>
                <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Dr. Sumedh Magar — MS Orthopaedics, Masters in Sports Medicine (UCL London),
                  ISAKOS Fellowship. Expert in ACL reconstruction, arthroscopy, and joint preservation.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="inline-flex items-center btn-primary">
                    Book Appointment <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <a href="tel:+919145517171" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/40 text-white hover:bg-white/10 transition-all font-semibold">
                    <Phone className="w-5 h-5" /> 9145517171
                  </a>
                </div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/SumedhMagar.jpeg"
                  alt="Dr. Sumedh Magar – Orthopedic Surgeon Pune"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Credentials Banner */}
        <section className="bg-primary/10 py-8">
          <div className="container-custom max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { stat: 'MS Orthopaedics', label: 'Qualification' },
                { stat: 'UCL London', label: 'Masters in Sports Medicine' },
                { stat: 'ISAKOS', label: 'Arthroscopy Fellowship' },
                { stat: 'Khelo India', label: 'Lead Sports Medicine Doctor' },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <p className="font-heading font-bold text-secondary text-lg">{stat}</p>
                  <p className="text-neutral-600 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                {/* About */}
                <div>
                  <h2 className="text-secondary mb-4">Sports Orthopedic Specialisation</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Dr. Sumedh Magar is the Founder and Director of I-SPORT Medical Centre in
                    Balewadi, Pune — a tertiary centre dedicated to sports medicine and sports
                    surgery. His training at UCL London and ISAKOS fellowship positions him among
                    a select group of surgeons in India with internationally recognised sports
                    orthopedic expertise.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    His practice focuses exclusively on sports-related orthopedic conditions —
                    from acute injuries in weekend athletes to complex reconstructions in
                    professional sportspersons.
                  </p>
                </div>

                {/* Procedures */}
                <div>
                  <h2 className="text-secondary mb-6">Procedures Performed</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { proc: 'ACL Reconstruction', link: '/treatments/acl-tear-treatment-pune' },
                      { proc: 'Knee Arthroscopy', link: '/treatments/knee-arthroscopy-pune' },
                      { proc: 'Shoulder Arthroscopy', link: '/treatments/shoulder-arthroscopy-pune' },
                      { proc: 'Meniscus Repair', link: '/treatments/meniscus-tear-treatment-pune' },
                      { proc: 'Rotator Cuff Repair', link: '/treatments/shoulder-arthroscopy-pune' },
                      { proc: 'Joint Preservation', link: '/expertise' },
                      { proc: 'PRP & Bio-Orthopedics', link: '/expertise' },
                      { proc: 'Sports Rehabilitation', link: '/treatments/sports-rehabilitation-pune' },
                    ].map(({ proc, link }) => (
                      <Link key={proc} href={link} className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-neutral-700 text-sm font-medium">{proc}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Why Specialist */}
                <div>
                  <h2 className="text-secondary mb-4">Why Choose a Sports Orthopedic Specialist?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    General orthopedic surgeons manage the full breadth of bone and joint
                    conditions. A sports orthopedic specialist focuses exclusively on
                    sports-related injuries — bringing deeper expertise in the specific biomechanics,
                    tissue responses, and return-to-sport considerations that matter most for athletes.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Sport-specific rehabilitation protocols',
                      'Athlete-centred decision making on surgery timing',
                      'Advanced arthroscopic techniques for minimal recovery time',
                      'Evidence-based return-to-sport criteria',
                      'Understanding of athletic performance demands',
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FAQs */}
                <div>
                  <h2 className="text-secondary mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map(({ q, a }) => (
                      <Card key={q}>
                        <h3 className="font-semibold text-secondary mb-2 text-base">{q}</h3>
                        <p className="text-neutral-700 text-sm leading-relaxed">{a}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                <Card>
                  <h3 className="font-heading font-semibold text-secondary mb-4">Book a Consultation</h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    Get specialist assessment from Dr. Sumedh Magar at I-SPORT Medical Centre.
                  </p>
                  <Link href="/contact" className="block w-full text-center btn-primary">Book Appointment</Link>
                  <a href="tel:+919145517171" className="flex items-center justify-center gap-2 mt-3 text-sm text-neutral-600 hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" /> 9145517171 / 02067813869
                  </a>
                </Card>

                <Card>
                  <h3 className="font-heading font-semibold text-secondary mb-4">Key Treatments</h3>
                  <ul className="space-y-2">
                    {[
                      { href: '/treatments/acl-tear-treatment-pune', label: 'ACL Reconstruction' },
                      { href: '/treatments/knee-arthroscopy-pune', label: 'Knee Arthroscopy' },
                      { href: '/treatments/shoulder-arthroscopy-pune', label: 'Shoulder Arthroscopy' },
                      { href: '/treatments', label: 'All Treatments' },
                    ].map(({ href, label }) => (
                      <li key={href}>
                        <Link href={href} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary transition-colors">
                          <ChevronRight className="w-4 h-4 text-primary" /> {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card>
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-neutral-600 text-sm italic mb-2">
                    &ldquo;Dr. Magar performed my ACL reconstruction. His attention to detail and
                    focus on my return to cricket was outstanding.&rdquo;
                  </p>
                  <p className="text-xs text-neutral-500">— Verified Patient</p>
                </Card>

                <Card>
                  <h3 className="font-heading font-semibold text-secondary mb-4">Nearby Areas Served</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { href: '/locations/orthopedic-doctor-balewadi', label: 'Balewadi' },
                      { href: '/locations/orthopedic-doctor-baner', label: 'Baner' },
                      { href: '/locations/sports-injury-doctor-wakad', label: 'Wakad' },
                      { href: '/locations/orthopedic-surgeon-hinjewadi', label: 'Hinjewadi' },
                    ].map(({ href, label }) => (
                      <Link key={href} href={href} className="px-3 py-1 bg-primary/10 text-primary rounded-xl text-xs font-medium hover:bg-primary/20 transition-colors">
                        {label}
                      </Link>
                    ))}
                  </div>
                </Card>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
