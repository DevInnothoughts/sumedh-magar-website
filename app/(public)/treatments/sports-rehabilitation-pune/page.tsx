import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Sports Rehabilitation Pune – Post-Surgery Rehab & Recovery',
  description:
    'Specialised sports rehabilitation in Pune at I-SPORT Medical Centre. Post-surgical rehab, strength recovery, and return-to-sport protocols by Dr. Sumedh Magar.',
  alternates: { canonical: `${SITE_URL}/treatments/sports-rehabilitation-pune` },
  keywords: ['sports rehabilitation Pune', 'sports physiotherapy Pune', 'post surgery rehab Pune', 'return to sport Pune'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/treatments/sports-rehabilitation-pune`,
    title: 'Sports Rehabilitation Pune | I-SPORT Medical Centre',
    description: 'Expert sports rehabilitation and return-to-sport protocols in Pune.',
    images: [{ url: `${SITE_URL}/SportsMedicine.jpeg`, width: 1200, height: 630, alt: 'Sports rehabilitation Pune' }],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Treatments', item: `${SITE_URL}/treatments` },
    { '@type': 'ListItem', position: 3, name: 'Sports Rehabilitation', item: `${SITE_URL}/treatments/sports-rehabilitation-pune` },
  ],
};

export default function SportsRehabPage() {
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
              <span className="text-white">Sports Rehabilitation</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Athlete Recovery</p>
                <h1 className="mb-4 text-4xl md:text-5xl font-bold">Sports Rehabilitation in Pune</h1>
                <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Evidence-based rehabilitation programmes designed to return athletes to peak
                  performance safely and efficiently.
                </p>
                <Link href="/contact" className="inline-flex items-center btn-primary">
                  Book Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image src="/SportsMedicine.jpeg" alt="Sports rehabilitation Pune" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-secondary mb-4">Athlete Rehabilitation Philosophy</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Rehabilitation at I-SPORT Medical Centre is directed by Dr. Sumedh Magar with
                    an athlete-centred approach. The goal is not merely recovery from injury but
                    return to optimal performance — or better than pre-injury levels where possible.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    Our protocols are based on current evidence from sports medicine research and
                    integrated with sport-specific requirements for each athlete.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Rehabilitation Phases</h2>
                  <div className="space-y-4">
                    {[
                      { phase: 'Phase 1 – Protection & Pain Control', desc: 'Reduce inflammation, control pain, prevent muscle atrophy while protecting the healing tissue.' },
                      { phase: 'Phase 2 – Range of Motion Restoration', desc: 'Progressive mobility work to restore full joint range without compromising healing.' },
                      { phase: 'Phase 3 – Strength & Neuromuscular Control', desc: 'Progressive loading, proprioception training, and muscle activation to rebuild functional strength.' },
                      { phase: 'Phase 4 – Sport-Specific Conditioning', desc: 'Running, jumping, cutting, and sport-specific drills to prepare for competitive demands.' },
                      { phase: 'Phase 5 – Return to Sport Clearance', desc: 'Objective criteria-based testing to confirm readiness for full competitive return.' },
                    ].map(({ phase, desc }) => (
                      <Card key={phase}>
                        <p className="font-semibold text-primary text-sm mb-1">{phase}</p>
                        <p className="text-neutral-700 text-sm">{desc}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Post-Surgery Rehabilitation</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Post-operative rehabilitation is prescribed by Dr. Magar immediately following
                    surgery. Each protocol is specific to the procedure performed and takes into
                    account the biology of tissue healing, individual patient factors, and the
                    athlete&apos;s performance goals.
                  </p>
                  <ul className="space-y-3">
                    {['ACL reconstruction rehab (9–12 months)', 'Meniscus repair rehab (4–6 months)', 'Rotator cuff repair rehab (4–6 months)', 'Knee arthroscopy rehab (4–8 weeks)'].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Return-to-Sport Criteria</h2>
                  <p className="text-neutral-700 leading-relaxed">
                    Return to competitive sport is not based solely on time. Objective criteria
                    including limb symmetry index (LSI), hop tests, strength ratios, and
                    psychological readiness are assessed before clearance is granted. This
                    evidence-based approach reduces re-injury risk.
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
                  <h3 className="font-heading font-semibold text-secondary mb-4">Related Treatments</h3>
                  <ul className="space-y-2">
                    {[
                      { href: '/treatments/acl-tear-treatment-pune', label: 'ACL Treatment' },
                      { href: '/treatments/knee-arthroscopy-pune', label: 'Knee Arthroscopy' },
                      { href: '/sports-medicine', label: 'Sports Medicine' },
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
