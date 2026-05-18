import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Meniscus Tear Treatment Pune – Arthroscopic Meniscus Repair',
  description:
    'Expert meniscus tear treatment in Pune by Dr. Sumedh Magar. Arthroscopic meniscus repair and meniscectomy for sports-related knee injuries at I-SPORT Medical Centre.',
  alternates: { canonical: `${SITE_URL}/treatments/meniscus-tear-treatment-pune` },
  keywords: ['meniscus tear treatment Pune', 'meniscus repair Pune', 'knee meniscus surgery Pune'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/treatments/meniscus-tear-treatment-pune`,
    title: 'Meniscus Tear Treatment Pune | Dr. Sumedh Magar',
    description: 'Arthroscopic meniscus repair and treatment for knee injuries in Pune.',
    images: [{ url: `${SITE_URL}/Arthroscopy.jpeg`, width: 1200, height: 630, alt: 'Meniscus treatment Pune' }],
  },
};

const faqs = [
  {
    q: 'Can a meniscus tear heal on its own?',
    a: 'Small tears in the outer (vascular) zone of the meniscus may heal with conservative management. However, most significant tears in athletes require surgical intervention.',
  },
  {
    q: 'What is the difference between meniscus repair and meniscectomy?',
    a: 'Meniscus repair sutures the torn tissue back together, preserving the meniscus. Partial meniscectomy removes the damaged portion. Dr. Magar prioritises repair whenever technically feasible.',
  },
  {
    q: 'How long after meniscus surgery can I return to sport?',
    a: 'After partial meniscectomy, return to sport is typically 4–6 weeks. Meniscus repair requires a longer protected recovery of 4–6 months.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Treatments', item: `${SITE_URL}/treatments` },
    { '@type': 'ListItem', position: 3, name: 'Meniscus Tear Treatment', item: `${SITE_URL}/treatments/meniscus-tear-treatment-pune` },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

export default function MeniscusTearPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen pt-20">
        <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
          <div className="container-custom max-w-5xl mx-auto">
            <nav className="flex items-center gap-1.5 text-sm text-neutral-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/treatments" className="hover:text-white transition-colors">Treatments</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Meniscus Tear Treatment</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Knee Specialist</p>
                <h1 className="mb-4 text-4xl md:text-5xl font-bold">Meniscus Tear Treatment in Pune</h1>
                <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Precision arthroscopic meniscus repair and treatment for sports-related knee injuries.
                </p>
                <Link href="/contact" className="inline-flex items-center btn-primary">
                  Book Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image src="/Arthroscopy.jpeg" alt="Meniscus tear treatment Pune" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-secondary mb-4">Understanding Meniscus Tears</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    The two menisci (medial and lateral) are C-shaped cartilage structures that
                    cushion and stabilise the knee. Meniscus tears are extremely common in athletes,
                    typically occurring during twisting movements with the foot planted.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Symptoms</h2>
                  <ul className="space-y-3">
                    {['Pain along the joint line', 'Swelling within 24–48 hours', 'Knee locking or catching', 'Restricted range of motion', 'Pain when twisting or squatting'].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Types of Meniscus Tears</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { type: 'Radial Tear', desc: 'Extends from inner to outer edge, typically requires partial removal' },
                      { type: 'Horizontal Tear', desc: 'Splits meniscus into upper and lower layers' },
                      { type: 'Bucket Handle Tear', desc: 'Large longitudinal tear that can displace and lock the knee' },
                      { type: 'Flap Tear', desc: 'A portion detaches and can catch in the joint' },
                    ].map(({ type, desc }) => (
                      <Card key={type}>
                        <p className="font-semibold text-primary text-sm mb-1">{type}</p>
                        <p className="text-neutral-700 text-sm">{desc}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Treatment Options</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Treatment is determined by tear type, location, patient age, activity level,
                    and associated injuries. Dr. Magar always aims to preserve meniscal tissue
                    through repair when possible, as this protects long-term knee health.
                  </p>
                </div>

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

              <aside className="space-y-6">
                <Card>
                  <h3 className="font-heading font-semibold text-secondary mb-4">Book a Consultation</h3>
                  <Link href="/contact" className="block w-full text-center btn-primary">Book Appointment</Link>
                  <a href="tel:+919145517171" className="flex items-center justify-center gap-2 mt-3 text-sm text-neutral-600 hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" /> 9145517171
                  </a>
                </Card>
                <Card>
                  <h3 className="font-heading font-semibold text-secondary mb-4">Related</h3>
                  <ul className="space-y-2">
                    {[
                      { href: '/treatments/knee-arthroscopy-pune', label: 'Knee Arthroscopy' },
                      { href: '/treatments/acl-tear-treatment-pune', label: 'ACL Treatment' },
                      { href: '/treatments/knee-pain-treatment-pune', label: 'Knee Pain' },
                    ].map(({ href, label }) => (
                      <li key={href}>
                        <Link href={href} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary transition-colors">
                          <ChevronRight className="w-4 h-4 text-primary" /> {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
