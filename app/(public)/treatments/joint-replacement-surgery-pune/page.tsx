import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';
import { relatedTreatments } from '@/data/relatedtreatments';
const SITE_URL = 'https://www.sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Best Joint Replacement Surgeon in Pune | Dr. Sumedh Magar ',
  description:
    'Expert joint replacement surgeon in Pune offering knee replacement, hip replacement, minimally invasive techniques, personalized rehabilitation, and improved mobility. ',
  alternates: {
    canonical: `${SITE_URL}/treatments/joint-replacement-surgery-pune`,
  },
  keywords: ['knee pain treatment Pune', 'knee specialist Pune', 'knee doctor Pune', 'sports knee pain Pune'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/treatments/joint-replacement-surgery-pune`,
    title: 'Knee Pain Treatment Pune | Dr. Sumedh Magar',
    description: 'Expert knee pain diagnosis and treatment in Pune for athletes and active patients.',
    images: [{ url: `${SITE_URL}/KneeSurgery.jpeg`, width: 1200, height: 630, alt: 'Knee pain treatment Pune' }],
  },
  "robots": {
    "index": true,
    "follow": true,
    // maxImagePreview: 'large',
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    // maxSnippet: -1,
    // maxVideoPreview: -1,
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

const schema =
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://www.sportsurgeon.in/treatments/joint-replacement-surgery-pune#webpage",
      "url": "https://www.sportsurgeon.in/treatments/joint-replacement-surgery-pune",
      "name": "Joint Replacement Surgery in Pune",
      "description": "Joint replacement surgery in Pune by Dr. Sumedh Magar for knee, hip, and shoulder arthritis and joint damage.",
      "mainEntity": {
        "@id": "https://www.sportsurgeon.in/treatments/joint-replacement-surgery-pune#procedure"
      }
    },
    {
      "@type": "MedicalProcedure",
      "@id": "https://www.sportsurgeon.in/treatments/joint-replacement-surgery-pune#procedure",
      "name": "Joint Replacement Surgery",
      "procedureType": "Arthroplasty",
      "bodyLocation": [
        "Knee",
        "Hip",
        "Shoulder"
      ],
      "howPerformed": "Damaged joint surfaces are replaced with artificial implants to relieve pain, improve function, and restore mobility.",
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
      "url": "https://www.sportsurgeon.in/"
    }
  ]
}


const faqs = [
  {
    q: 'Who is a good candidate for joint replacement surgery?',
    a: 'People with severe arthritis or chronic joint pain that limits daily activities and does not improve with conservative treatment may benefit from joint replacement.',
  },
  {
    q: 'How long do joint replacement implants last?',
    a: 'Modern hip and knee implants can often last 15–20 years or longer, depending on factors such as activity level and overall health.',
  },
  {
    q: 'Can I return to normal activities after joint replacement?',
    a: 'Most patients can return to everyday activities after rehabilitation, although high-impact activities should only be resumed based on medical advice.',
  },

];

export default function KneePainPage() {
  const currentPath = "/treatments/joint-replacement-surgery-pune";

  const filteredTreatments = relatedTreatments.filter(
    (item) => item.href !== currentPath
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen pt-20">
        <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
          <div className="container-custom max-w-5xl mx-auto">
            <nav className="flex items-center gap-1.5 text-sm text-neutral-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/treatments" className="hover:text-white transition-colors">Treatments</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Joint Replacement </span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Joint Replacement Specialist</p>
                <h1 className="mb-4 text-4xl md:text-4xl font-bold">Joint Replacement in Pune – Total Knee and Hip Replacement Surgery</h1>
                {/* <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Comprehensive evaluation and treatment for knee pain in athletes and active individuals.
                </p> */}
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

                <div className="">
                  <h2 className="font-heading font-semibold text-secondary mb-3">What Is Joint Replacement Surgery?</h2>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    Joint replacement entails the replacement of worn-out joints with artificial implants in order to reduce the pain and increase mobility in people with severe arthritis or joint degeneration. The most up-to-date technique of minimizing tissue injury during joint replacement surgery includes the use of minimally invasive surgical procedures.</p>
                </div>


                <div>
                  <h2 className="font-heading font-semibold text-secondary mb-4">Who May Need Joint Replacement?</h2>
                  <p>
                    Patients with advanced joint disease who experience:
                  </p>
                  <ul className="space-y-3">
                    {[
                      'People with severely degenerated joints such as:',
                      'Advanced cases of osteoarthritis',
                      'Severe rheumatoid arthritis',
                      'Post-traumatic arthritis',
                      'Pain limiting movement',
                      'Joint deformity',
                      'Failed medication',
                      'Failed joint injections',

                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-heading font-semibold text-secondary mb-4">Types of Joint Replacement</h2>
                  <ul className="space-y-4">
                    {[
                      {
                        title: "Total Knee Replacement",
                        description:
                          "This type of joint replacement entails replacing damaged knee joints with implants aimed at improving mobility and reducing pain.",
                      },
                      {
                        title: "Total Hip Replacement",
                        description:
                          "It entails replacing worn out joints to help restore the functionality of the hip joint for individuals with advanced cases of arthritis.",
                      },
                      {
                        title: "Minimally Invasive Joint Replacement",
                        description:
                          "It entails special surgical procedures designed to minimize the damage to muscles among certain patients.",
                      },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium text-secondary">
                            {item.title}
                          </h4>
                          <p className="text-neutral-700 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="">
                  <h2 className="font-heading font-semibold text-secondary mb-3">Benefits</h2>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    Potential benefits include:</p>
                  <ul className="space-y-3">
                    {[
                      'Reduced pain',
                      'Ability to walk better',
                      'Improvement in the quality of life',
                      'Improved joint function',
                      'Durability',
                      'Early mobilization using rehabilitation',

                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                <div className="">
                  <h2 className="font-heading font-semibold text-secondary mb-3">Recovery</h2>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    Patients usually start their mobilization shortly after undergoing surgery, and thereafter, undertake physiotherapy sessions.

                  </p>
                </div>

                <div className="">
                  <h2 className="font-heading font-semibold text-secondary mb-3">Why Choose Dr. Sumedh Magar?</h2>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    Combining expertise in modern orthopedic surgery with personalized rehabilitation protocols, Dr. Sumedh Magar offers comprehensive care for patients seeking advanced hip and knee replacement surgery in Pune.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading font-semibold text-secondary mb-6">Frequently Asked Questions</h2>
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
