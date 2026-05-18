import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Treatments – Orthopedic & Sports Surgery Pune',
  description:
    'Comprehensive orthopedic and sports surgery treatments by Dr. Sumedh Magar at I-SPORT Medical Centre, Pune. ACL reconstruction, knee arthroscopy, shoulder surgery, and more.',
  alternates: { canonical: `${SITE_URL}/treatments` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/treatments`,
    title: 'Treatments | Dr. Sumedh Magar – Sports Orthopedic Surgeon Pune',
    description:
      'Expert orthopedic treatments including ACL reconstruction, knee arthroscopy, shoulder surgery, and sports rehabilitation in Pune.',
    images: [{ url: `${SITE_URL}/SumedhMagar.jpeg`, width: 1200, height: 630, alt: 'Treatments by Dr. Sumedh Magar' }],
  },
};

const treatments = [
  {
    slug: 'acl-tear-treatment-pune',
    title: 'ACL Tear Treatment',
    description:
      'Expert ACL reconstruction using arthroscopic techniques. Comprehensive care from diagnosis through return to sport for athletes and active individuals.',
    image: '/aclsurgery.JPG',
    tags: ['ACL Reconstruction', 'Arthroscopy', 'Sports Knee'],
  },
  {
    slug: 'knee-arthroscopy-pune',
    title: 'Knee Arthroscopy',
    description:
      'Minimally invasive knee arthroscopy for meniscus tears, cartilage damage, and sports-related knee injuries with faster recovery times.',
    image: '/KneeSurgery.jpeg',
    tags: ['Knee Surgery', 'Meniscus', 'Cartilage'],
  },
  {
    slug: 'shoulder-arthroscopy-pune',
    title: 'Shoulder Arthroscopy',
    description:
      'Arthroscopic shoulder surgery for rotator cuff tears, shoulder instability, and sports shoulder injuries with minimal downtime.',
    image: '/ShoulderSurgery.jpeg',
    tags: ['Rotator Cuff', 'Shoulder Instability', 'Arthroscopy'],
  },
  {
    slug: 'meniscus-tear-treatment-pune',
    title: 'Meniscus Tear Treatment',
    description:
      'Conservative and surgical management of meniscus tears, including arthroscopic repair and partial meniscectomy for optimal knee function.',
    image: '/Arthroscopy.jpeg',
    tags: ['Meniscus Repair', 'Knee Pain', 'Arthroscopy'],
  },
  {
    slug: 'knee-pain-treatment-pune',
    title: 'Knee Pain Treatment',
    description:
      'Diagnosis and treatment of all forms of knee pain — sports injuries, arthritis, ligament injuries — with evidence-based, personalised care.',
    image: '/JointPreservation.jpeg',
    tags: ['Knee Pain', 'Arthritis', 'Sports Injury'],
  },
  {
    slug: 'sports-rehabilitation-pune',
    title: 'Sports Rehabilitation',
    description:
      'Structured post-surgical and sports injury rehabilitation programs designed to maximise performance and ensure safe return to sport.',
    image: '/SportsMedicine.jpeg',
    tags: ['Rehabilitation', 'Return to Sport', 'Recovery'],
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Treatments', item: `${SITE_URL}/treatments` },
  ],
};

export default function TreatmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen pt-20">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                Evidence-Based Care
              </p>
              <h1 className="mb-6">Treatments & Procedures</h1>
              <p className="text-xl text-neutral-200 leading-relaxed">
                Specialised orthopedic and sports surgery treatments delivered with precision,
                expertise, and athlete-focused care at I-SPORT Medical Centre, Pune.
              </p>
              <nav className="flex items-center justify-center gap-1.5 text-sm text-neutral-300 mt-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white">Treatments</span>
              </nav>
            </div>
          </div>
        </section>

        {/* Treatment Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-secondary mb-4">Our Specialised Treatments</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Each treatment is tailored to the patient&apos;s specific condition, activity level, and
                recovery goals using the latest evidence-based techniques.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {treatments.map((t) => (
                <Card key={t.slug}>
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={t.image}
                      alt={t.title}
                      fill
                      className="object-cover rounded-xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-secondary mb-2">{t.title}</h3>
                  <p className="text-neutral-600 text-sm mb-4 leading-relaxed">{t.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="text-primary font-semibold hover:text-primary-600 inline-flex items-center text-sm"
                  >
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom max-w-3xl mx-auto text-center">
            <h2 className="text-secondary mb-4">Ready to Get Expert Care?</h2>
            <p className="text-neutral-600 mb-8">
              Book a consultation with Dr. Sumedh Magar at I-SPORT Medical Centre, Balewadi, Pune.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center btn-primary"
            >
              Book Appointment <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
