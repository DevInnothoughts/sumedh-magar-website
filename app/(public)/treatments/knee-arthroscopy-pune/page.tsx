import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Knee Arthroscopy in Pune – Knee Specialist Dr. Sumedh Magar',
  description:
    'Knee arthroscopy specialist in Pune. Minimally invasive knee surgery for meniscus tears, cartilage damage, and sports injuries by Dr. Sumedh Magar, I-SPORT Medical Centre.',
  alternates: { canonical: `${SITE_URL}/treatments/knee-arthroscopy-pune` },
  keywords: ['knee arthroscopy Pune', 'knee specialist Pune', 'meniscus surgery Pune', 'knee surgery Balewadi'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/treatments/knee-arthroscopy-pune`,
    title: 'Knee Arthroscopy Pune | Dr. Sumedh Magar',
    description: 'Expert knee arthroscopy for meniscus tears, cartilage damage, and sports injuries in Pune.',
    images: [{ url: `${SITE_URL}/KneeSurgery.jpeg`, width: 1200, height: 630, alt: 'Knee Arthroscopy Pune' }],
  },
};

const faqs = [
  {
    q: 'What conditions are treated with knee arthroscopy?',
    a: 'Knee arthroscopy treats meniscus tears, cartilage injuries (chondral lesions), loose bodies, anterior cruciate ligament (ACL) injuries, and various sports-related knee conditions.',
  },
  {
    q: 'Is knee arthroscopy painful?',
    a: 'The procedure is performed under anaesthesia so you feel no pain during surgery. Post-operative discomfort is generally mild and well-controlled with medication.',
  },
  {
    q: 'How long is the recovery after knee arthroscopy?',
    a: 'Recovery depends on the procedure. Simple diagnostic arthroscopy allows return to normal activities in 1–2 weeks. More complex procedures like meniscus repair require 4–6 weeks.',
  },
  {
    q: 'How many incisions are made in knee arthroscopy?',
    a: 'Typically 2–3 small incisions (portals), each less than 1 cm in length, are used to access the knee joint.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Treatments', item: `${SITE_URL}/treatments` },
    { '@type': 'ListItem', position: 3, name: 'Knee Arthroscopy', item: `${SITE_URL}/treatments/knee-arthroscopy-pune` },
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

export default function KneeArthroscopyPage() {
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
              <span className="text-white">Knee Arthroscopy</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Minimally Invasive</p>
                <h1 className="mb-4 text-4xl md:text-5xl font-bold">Knee Arthroscopy in Pune</h1>
                <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Keyhole knee surgery for meniscus tears, cartilage damage, and sports knee injuries
                  with minimal recovery time.
                </p>
                <Link href="/contact" className="inline-flex items-center btn-primary">
                  Book Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image src="/KneeSurgery.jpeg" alt="Knee arthroscopy Pune" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-secondary mb-4">What is Knee Arthroscopy?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Knee arthroscopy is a minimally invasive surgical procedure that uses a small
                    camera (arthroscope) inserted through tiny incisions to diagnose and treat
                    conditions inside the knee joint. It offers significant advantages over open
                    surgery including less pain, faster recovery, and reduced risk of complications.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    Dr. Sumedh Magar is an ISAKOS-fellowship-trained arthroscopy specialist with
                    extensive experience performing knee arthroscopic procedures for athletes and
                    active patients across Pune.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Conditions Treated</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Meniscus tears (medial & lateral)',
                      'ACL and PCL injuries',
                      'Cartilage damage (chondral lesions)',
                      'Loose bodies in the joint',
                      'Patellofemoral problems',
                      'Synovitis and joint inflammation',
                      'Plica syndrome',
                      'Post-traumatic arthrofibrosis',
                    ].map((c) => (
                      <div key={c} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Meniscus Injuries</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    The menisci are two C-shaped cartilage discs that act as shock absorbers in the
                    knee. Tears are common in athletes and can cause pain, swelling, locking, and
                    reduced function. Arthroscopic meniscus repair preserves the meniscus tissue
                    wherever possible, while partial meniscectomy removes damaged tissue when repair
                    is not feasible.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Cartilage Damage</h2>
                  <p className="text-neutral-700 leading-relaxed">
                    Articular cartilage injuries in athletes present unique challenges due to
                    cartilage&apos;s limited healing capacity. Arthroscopic techniques including
                    microfracture, cartilage shaving, and debridement can relieve symptoms and
                    slow progression of damage, while biological treatments like PRP may support
                    healing.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">The Procedure</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    The procedure is performed under spinal or general anaesthesia as a day-case.
                    Two to three small portals are created around the knee. A camera and instruments
                    are introduced to visualise the joint and perform the necessary repair or
                    debridement. The procedure typically takes 30–90 minutes.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Rehabilitation & Return to Sport</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    A structured physiotherapy programme begins immediately after surgery.
                    Goals include pain control, swelling reduction, strength restoration, and
                    sport-specific conditioning. Return to competitive sport depends on the
                    procedure performed and ranges from 4 weeks (meniscectomy) to 4–6 months
                    (meniscus repair).
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
                  <p className="text-neutral-600 text-sm mb-4">Speak with Dr. Sumedh Magar about your knee condition.</p>
                  <Link href="/contact" className="block w-full text-center btn-primary">Book Appointment</Link>
                  <a href="tel:+919145517171" className="flex items-center justify-center gap-2 mt-3 text-sm text-neutral-600 hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" /> 9145517171
                  </a>
                </Card>
                <Card>
                  <h3 className="font-heading font-semibold text-secondary mb-4">Related Treatments</h3>
                  <ul className="space-y-2">
                    {[
                      { href: '/treatments/acl-tear-treatment-pune', label: 'ACL Tear Treatment' },
                      { href: '/treatments/meniscus-tear-treatment-pune', label: 'Meniscus Tear' },
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
