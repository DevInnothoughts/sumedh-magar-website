import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://www.sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Hip Surgery in Pune | Dr. Sumedh Magar',
  description:
    'Expert hip surgery in Pune by Dr. Sumedh Magar. Arthroscopic meniscus repair and meniscectomy for sports-related knee injuries at I-SPORT Medical Centre.',
  alternates: {
    canonical: `${SITE_URL}/treatments/hip-surgery-pune`,
  },
  keywords: ['hip surgery Pune', 'hip replacement surgery Pune', 'knee meniscus surgery Pune'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/treatments/hip-surgery-pune`,
    title: 'Hip Surgery in Pune | Dr. Sumedh Magar',
    description: 'Arthroscopic meniscus repair and treatment for knee injuries in Pune.',
    images: [{ url: `${SITE_URL}/Arthroscopy.jpeg`, width: 1200, height: 630, alt: 'Meniscus treatment Pune' }],
  },
};

const faqs = [
  {
    q: 'What is hip arthroscopy?',
    a: 'Hip arthroscopy is a minimally invasive procedure used to diagnose and treat conditions such as labral tears, impingement, and cartilage injuries.',
  },
  {
    q: 'When is hip replacement recommended?',
    a: 'Hip replacement may be recommended for patients with severe arthritis or chronic hip pain that significantly affects mobility and quality of life.',
  },
  {
    q: 'How long does it take to recover from hip surgery?',
    a: 'Recovery depends on the type of surgery performed, but most patients gradually improve with physiotherapy and guided rehabilitation over several weeks to months.',
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
              <span className="text-white">Hip Surgery</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Hip Specialist</p>
                <h1 className="mb-4 text-4xl md:text-5xl font-bold">Hip Surgery in Pune – Hip Arthroscopy, Labral Repair, and Hip Replacement</h1>
                {/* <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Precision arthroscopic meniscus repair and treatment for sports-related knee injuries.
                </p> */}
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
                  <h2 className="text-secondary mb-4">What Is Hip Surgery?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Hip surgery refers to minimally invasive and reconstructive surgical techniques performed to address labral tears, femoroacetabular impingement, arthritis, cartilage injuries, and long-term hip pain. Hip surgery aims at providing pain relief, maintaining joint functionality, and restoring movement.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Who May Need Hip Surgery?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    A patient may be required to undergo hip surgery if he/she experiences:
                  </p>
                  <ul className="space-y-3">
                    {[

                      'Pain in the groin area',
                      'Stiffness in the hips',
                      'Clicking or popping sensations in the hip',
                      'Hip Pain when sitting or squatting',
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Procedures Offered</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { type: 'Hip Arthroscopy', desc: 'Minimally-invasive surgery for treating impingement, cartilage injury, and hip disorders.' },
                      { type: 'Labral Repair', desc: 'Surgery done to maintain the integrity of the hip labrum.' },
                      { type: 'Hip Replacement Surgery', desc: 'Removal and replacement of the damaged hip joint structures by an artificial hip joint.' },

                    ].map(({ type, desc }) => (
                      <Card key={type}>
                        <p className="font-semibold text-primary text-sm mb-1">{type}</p>
                        <p className="text-neutral-700 text-sm">{desc}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Benefits</h2>
                  <ul className="space-y-3">
                    {[

                      'Increased movement',
                      'Pain relief',
                      'Reduced recovery time',
                      'Small incision size',
                      'Minimized tissue damage',
                      'Quick return to daily activities.',

                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Recovery</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Recovery involves guided physiotherapy and gradual progression of weight-bearing and strengthening exercises based on surgical findings and healing.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Why Choose Dr. Sumedh Magar for Hip Surgery in Pune?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Patients receive individualized evaluation and advanced treatment using evidence-based techniques for hip arthroscopy, labral preservation, and hip replacement surgery, with an emphasis on long-term mobility and function. </p>
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
