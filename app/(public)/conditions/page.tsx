import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Orthopedic Conditions Pune – Diagnosis & Treatment Information',
  description:
    'Comprehensive information on orthopedic conditions including arthritis, ligament injuries, cartilage damage, and shoulder instability. Expert care by Dr. Sumedh Magar, Pune.',
  alternates: { canonical: `${SITE_URL}/conditions` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/conditions`,
    title: 'Orthopedic Conditions | Dr. Sumedh Magar Pune',
    description: 'Expert information and treatment for orthopedic conditions at I-SPORT Medical Centre, Pune.',
    images: [{ url: `${SITE_URL}/SumedhMagar.jpeg`, width: 1200, height: 630, alt: 'Orthopedic conditions Pune' }],
  },
};

const conditions = [
  {
    slug: 'arthritis',
    title: 'Arthritis',
    description: 'Osteoarthritis and inflammatory arthritis affecting the knee, hip, and shoulder joints.',
    tags: ['Osteoarthritis', 'Joint Pain', 'Cartilage Wear'],
  },
  {
    slug: 'ligament-injuries',
    title: 'Ligament Injuries',
    description: 'ACL, MCL, PCL, and other joint ligament tears causing instability and pain.',
    tags: ['ACL', 'MCL', 'Joint Instability'],
  },
  {
    slug: 'tendon-injuries',
    title: 'Tendon Injuries',
    description: 'Tendinopathy, tendinitis, and tendon tears affecting the patellar, Achilles, and rotator cuff tendons.',
    tags: ['Tendinopathy', 'Rotator Cuff', 'Patellar Tendon'],
  },
  {
    slug: 'cartilage-injuries',
    title: 'Cartilage Injuries',
    description: 'Articular cartilage damage and meniscal injuries causing knee pain and reduced function.',
    tags: ['Chondral Lesions', 'Meniscus', 'Cartilage Repair'],
  },
  {
    slug: 'shoulder-instability',
    title: 'Shoulder Instability',
    description: 'Recurrent shoulder dislocation, Bankart lesions, and multidirectional instability in athletes.',
    tags: ['Dislocation', 'Bankart Lesion', 'Labral Tear'],
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Conditions', item: `${SITE_URL}/conditions` },
  ],
};

export default function ConditionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen pt-20">
        <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Patient Education</p>
              <h1 className="mb-6">Orthopedic Conditions</h1>
              <p className="text-xl text-neutral-200 leading-relaxed">
                Comprehensive information on conditions treated at I-SPORT Medical Centre,
                helping patients understand their diagnosis and treatment options.
              </p>
              <nav className="flex items-center justify-center gap-1.5 text-sm text-neutral-300 mt-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white">Conditions</span>
              </nav>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {conditions.map((c) => (
                <Card key={c.slug}>
                  <h3 className="text-xl font-heading font-semibold text-secondary mb-2">{c.title}</h3>
                  <p className="text-neutral-600 text-sm mb-4 leading-relaxed">{c.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {c.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/conditions/${c.slug}`} className="text-primary font-semibold hover:text-primary-600 inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
