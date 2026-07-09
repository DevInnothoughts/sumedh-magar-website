import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';
import { relatedTreatments } from '@/data/relatedtreatments';

const SITE_URL = 'https://www.sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Hip Replacement Surgery in Pune | Dr. Sumedh Magar ',
  description:
    'Dr. Sumedh Magar provides skilled hip surgery in Pune. Our areas of expertise include hip arthroscopy, hip replacement surgery, hip impingement, labral tear therapy, and customised rehabilitation. ',
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

const schema =
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://www.sportsurgeon.in/treatments/hip-surgery-pune#webpage",
      "url": "https://www.sportsurgeon.in/treatments/hip-surgery-pune",
      "name": "Hip Surgery in Pune",
      "description": "Advanced hip surgery in Pune by Dr. Sumedh Magar for hip arthritis, hip labral tears, hip impingement, hip replacement, and sports-related hip conditions.",
      "mainEntity": {
        "@id": "https://www.sportsurgeon.in/treatments/hip-surgery-pune#procedure"
      }
    },
    {
      "@type": "MedicalProcedure",
      "@id": "https://www.sportsurgeon.in/treatments/hip-surgery-pune#procedure",
      "name": "Hip Surgery",
      "procedureType": [
        "Hip Arthroscopy",
        "Hip Replacement Surgery"
      ],
      "bodyLocation": "Hip",
      "howPerformed": "Hip surgery is performed using minimally invasive arthroscopy or joint replacement techniques to treat hip arthritis, labral tears, femoroacetabular impingement (FAI), sports injuries, and other hip disorders.",
      "performedBy": {
        "@type": "Physician",
        "name": "Dr. Sumedh Magar",
        "medicalSpecialty": [
          "Orthopedic",
          "Sports Medicine"
        ]
      }
    },
    {
      "@type": "Physician",
      "@id": "https://www.sportsurgeon.in/#physician",
      "name": "Dr. Sumedh Magar",
      "jobTitle": "Sports Orthopedic Surgeon",
      "url": "https://www.sportsurgeon.in/",
      "medicalSpecialty": [
        "Orthopedic",
        "Sports Medicine"
      ]
    }
  ]
}


// const faqSchema = {
//   '@context': 'https://schema.org',
//   '@type': 'FAQPage',
//   mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
// };

export default function MeniscusTearPage() {
  const currentPath = "/treatments/hip-surgery-pune";

  const filteredTreatments = relatedTreatments.filter(
    (item) => item.href !== currentPath
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="min-h-screen">

        <section
          className="relative text-white flex items-center mt-20"
          style={{
            backgroundImage: "url('/banner/Hip Replacement.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "75% center",
            minHeight: "calc(100vw * (480 / 1440))",
            height: "auto",
            maxHeight: "560px",
          }}
        >
          <div className="relative mx-auto w-full max-w-[1350px] px-6 md:px-12 lg:px-16 py-20 md:py-28">

            {/* Breadcrumbs */}
            <nav className="flex items-center flex-wrap gap-1.5 text-sm text-neutral-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/treatments" className="hover:text-white transition-colors">Treatments</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Hip Surgery</span>
            </nav>

            {/* Single Column Wrapper - Gives your 3-line headline room to breathe */}
            <div className="max-w-4xl">
              <h1 className="font-[Fraunces] text-3xl font-semibold leading-tight md:text-5xl text-white">
                Hip Surgery in Pune – <br className="hidden md:inline" />
                Hip Arthroscopy, Labral Repair, <br className="hidden md:inline" />
                <span className="bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent inline-block">
                  and Hip Replacement
                </span>
              </h1>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-teal-300 shadow-lg hover:shadow-teal-400/20">
                  Book Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">What Is Hip Surgery?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Hip surgery refers to minimally invasive and reconstructive surgical techniques performed to address labral tears, femoroacetabular impingement, arthritis, cartilage injuries, and long-term hip pain. Hip surgery aims at providing pain relief, maintaining joint functionality, and restoring movement.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Who May Need Hip Surgery?</h2>
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
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Procedures Offered</h2>
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
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Benefits</h2>
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
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Recovery</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Recovery involves guided physiotherapy and gradual progression of weight-bearing and strengthening exercises based on surgical findings and healing.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Why Choose Dr. Sumedh Magar for Hip Surgery in Pune?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Patients receive individualized evaluation and advanced treatment using evidence-based techniques for hip arthroscopy, labral preservation, and hip replacement surgery, with an emphasis on long-term mobility and function. </p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Frequently Asked Questions</h2>
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

              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <Card>
                    <h3 className="font-heading font-semibold text-secondary mb-4">Book a Consultation</h3>
                    <Link href="/contact" className="block w-full text-center btn-primary">Book Appointment</Link>
                    <a href="tel:+919145517171" className="flex items-center justify-center gap-2 mt-3 text-sm text-neutral-600 hover:text-primary transition-colors">
                      <Phone className="w-4 h-4" /> 9145517171
                    </a>
                  </Card>

                  <Card>
                    <h3 className="font-heading font-semibold text-secondary mb-4">
                      Related Treatments
                    </h3>

                    <ul className="space-y-2">
                      {filteredTreatments.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary transition-colors"
                          >
                            <ChevronRight className="w-4 h-4 text-primary" />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Card>

                </div>
              </aside>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
