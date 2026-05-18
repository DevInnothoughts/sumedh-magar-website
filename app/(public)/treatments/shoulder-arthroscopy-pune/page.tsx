import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Shoulder Arthroscopy Pune – Rotator Cuff Treatment Specialist',
  description:
    'Shoulder arthroscopy specialist in Pune. Expert treatment for rotator cuff tears, shoulder instability, and sports shoulder injuries by Dr. Sumedh Magar, I-SPORT Medical Centre.',
  alternates: { canonical: `${SITE_URL}/treatments/shoulder-arthroscopy-pune` },
  keywords: ['shoulder arthroscopy Pune', 'rotator cuff treatment Pune', 'shoulder surgeon Pune', 'shoulder instability Pune'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/treatments/shoulder-arthroscopy-pune`,
    title: 'Shoulder Arthroscopy Pune | Dr. Sumedh Magar',
    description: 'Arthroscopic shoulder surgery for rotator cuff tears and shoulder instability in Pune.',
    images: [{ url: `${SITE_URL}/ShoulderSurgery.jpeg`, width: 1200, height: 630, alt: 'Shoulder Arthroscopy Pune' }],
  },
};

const faqs = [
  {
    q: 'What is shoulder arthroscopy used for?',
    a: 'Shoulder arthroscopy treats rotator cuff tears, shoulder impingement, labral tears, shoulder instability (Bankart lesions), and frozen shoulder.',
  },
  {
    q: 'How long does recovery take after shoulder arthroscopy?',
    a: 'Recovery depends on the procedure. Impingement decompression may take 4–6 weeks. Rotator cuff repair typically requires 4–6 months for full recovery.',
  },
  {
    q: 'Can I avoid shoulder surgery?',
    a: 'Many shoulder conditions can be managed non-surgically with physiotherapy, activity modification, and injections. Surgery is recommended when conservative treatment fails or for complete tears.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Treatments', item: `${SITE_URL}/treatments` },
    { '@type': 'ListItem', position: 3, name: 'Shoulder Arthroscopy', item: `${SITE_URL}/treatments/shoulder-arthroscopy-pune` },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function ShoulderArthroscopyPage() {
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
              <span className="text-white">Shoulder Arthroscopy</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Shoulder Specialist</p>
                <h1 className="mb-4 text-4xl md:text-5xl font-bold">Shoulder Arthroscopy in Pune</h1>
                <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Arthroscopic treatment for rotator cuff injuries, shoulder instability, and sports shoulder conditions.
                </p>
                <Link href="/contact" className="inline-flex items-center btn-primary">
                  Book Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image src="/ShoulderSurgery.jpeg" alt="Shoulder arthroscopy Pune" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-secondary mb-4">Rotator Cuff Injuries</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    The rotator cuff is a group of four muscles and tendons surrounding the
                    shoulder joint, providing stability and enabling movement. Rotator cuff tears
                    are a common sports injury, particularly in throwing athletes, cricketers, and
                    those who perform overhead activities.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    Symptoms include shoulder pain, weakness when lifting the arm, and difficulty
                    sleeping on the affected side. Partial tears are often managed conservatively,
                    while complete tears in active patients benefit from arthroscopic repair.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Shoulder Instability</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Shoulder instability — the feeling that the shoulder may dislocate — is
                    common in contact sport athletes. Recurrent dislocations cause progressive
                    damage to the labrum (Bankart lesion) and may ultimately require arthroscopic
                    stabilisation (Bankart repair) to restore shoulder security.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Conditions Treated</h2>
                  <ul className="space-y-3">
                    {[
                      'Rotator cuff partial and full thickness tears',
                      'Shoulder impingement syndrome',
                      'Bankart lesions and shoulder instability',
                      'SLAP tears (superior labrum)',
                      'Biceps tendon pathology',
                      'Acromioclavicular joint injuries',
                      'Frozen shoulder (adhesive capsulitis)',
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Recovery & Rehabilitation</h2>
                  <p className="text-neutral-700 leading-relaxed">
                    Post-operative rehabilitation is structured into phases — pain control and
                    range of motion in early weeks, followed by progressive strengthening and
                    sport-specific conditioning. Throwing athletes typically require 4–6 months
                    before returning to competitive play.
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
                      { href: '/sports-injuries/gym-shoulder-injuries', label: 'Gym Shoulder Injuries' },
                      { href: '/sports-injuries/cricket-injuries', label: 'Cricket Shoulder' },
                      { href: '/treatments/sports-rehabilitation-pune', label: 'Sports Rehab' },
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
