import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Knee Pain Treatment Pune – Sports Knee Specialist',
  description:
    'Specialist knee pain treatment in Pune by Dr. Sumedh Magar. Expert diagnosis and treatment for sports injuries, arthritis, and ligament injuries at I-SPORT Medical Centre.',
  alternates: { canonical: `${SITE_URL}/treatments/knee-pain-treatment-pune` },
  keywords: ['knee pain treatment Pune', 'knee specialist Pune', 'knee doctor Pune', 'sports knee pain Pune'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/treatments/knee-pain-treatment-pune`,
    title: 'Knee Pain Treatment Pune | Dr. Sumedh Magar',
    description: 'Expert knee pain diagnosis and treatment in Pune for athletes and active patients.',
    images: [{ url: `${SITE_URL}/KneeSurgery.jpeg`, width: 1200, height: 630, alt: 'Knee pain treatment Pune' }],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Treatments', item: `${SITE_URL}/treatments` },
    { '@type': 'ListItem', position: 3, name: 'Knee Pain Treatment', item: `${SITE_URL}/treatments/knee-pain-treatment-pune` },
  ],
};

export default function KneePainPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen pt-20">
        <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
          <div className="container-custom max-w-5xl mx-auto">
            <nav className="flex items-center gap-1.5 text-sm text-neutral-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/treatments" className="hover:text-white transition-colors">Treatments</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Knee Pain Treatment</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Sports Knee Specialist</p>
                <h1 className="mb-4 text-4xl md:text-5xl font-bold">Knee Pain Treatment in Pune</h1>
                <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Comprehensive evaluation and treatment for knee pain in athletes and active individuals.
                </p>
                <Link href="/contact" className="inline-flex items-center btn-primary">
                  Book Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image src="/KneeSurgery.jpeg" alt="Knee pain treatment Pune" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-secondary mb-4">Common Causes of Knee Pain</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { cause: 'ACL / PCL Injuries', desc: 'Ligament tears causing instability and pain' },
                      { cause: 'Meniscus Tears', desc: 'Cartilage damage from twisting injuries' },
                      { cause: 'Patellofemoral Pain', desc: 'Knee cap pain common in runners and cyclists' },
                      { cause: 'IT Band Syndrome', desc: 'Lateral knee pain in endurance athletes' },
                      { cause: 'Osteoarthritis', desc: 'Wear and tear affecting joint cartilage' },
                      { cause: 'Patellar Tendinopathy', desc: 'Jumper\'s knee from overload' },
                    ].map(({ cause, desc }) => (
                      <Card key={cause}>
                        <p className="font-semibold text-primary text-sm mb-1">{cause}</p>
                        <p className="text-neutral-700 text-sm">{desc}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">When to See a Specialist</h2>
                  <ul className="space-y-3">
                    {[
                      'Knee pain that persists beyond 2 weeks',
                      'Swelling that does not resolve',
                      'Feeling of instability or the knee "giving way"',
                      'Locking or catching sensation in the knee',
                      'Pain that prevents sport or daily activities',
                      'Night pain or pain at rest',
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Treatment Options</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Treatment is always personalised. Dr. Magar performs a comprehensive
                    assessment before recommending the most appropriate management strategy:
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Physiotherapy and rehabilitation',
                      'Activity modification and load management',
                      'PRP (Platelet-Rich Plasma) therapy',
                      'Hyaluronic acid injections for arthritis',
                      'Arthroscopic surgery where indicated',
                      'Cartilage restoration procedures',
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary/5 rounded-2xl p-6">
                  <h3 className="font-heading font-semibold text-secondary mb-3">Sports Injuries vs Arthritis</h3>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    Athletes can experience both sports-related knee injuries and early-onset
                    arthritis. An accurate diagnosis is essential — treating a ligament injury
                    as arthritis (or vice versa) leads to suboptimal outcomes. Dr. Magar uses
                    clinical examination, imaging, and functional assessment to distinguish
                    between these conditions accurately.
                  </p>
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
                      { href: '/treatments/acl-tear-treatment-pune', label: 'ACL Treatment' },
                      { href: '/treatments/knee-arthroscopy-pune', label: 'Knee Arthroscopy' },
                      { href: '/treatments/meniscus-tear-treatment-pune', label: 'Meniscus Tear' },
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
