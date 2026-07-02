import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';
import { relatedTreatments } from '@/data/relatedtreatments';

const SITE_URL = 'https://www.sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Best knee replacement surgeon in pune | Dr. Sumedh Magar ',
  description:
    'Expert knee surgery in Pune by Dr. Sumedh Magar. We provide arthroscopic knee surgery, ACL reconstruction, meniscus repair, ligament reconstruction, and personalized rehabilitation. ',
  alternates: {
    canonical: `${SITE_URL}/treatments/knee-surgery-pune`,
  },
  keywords: ['knee arthroscopy Pune', 'knee specialist Pune', 'meniscus surgery Pune', 'knee surgery Balewadi'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/treatments/knee-surgery-pune`,
    title: 'Knee Surgery in Pune | Dr. Sumedh Magar',
    description: 'Expert knee surgery for meniscus tears, cartilage damage, and sports injuries in Pune.',
    images: [{ url: `${SITE_URL}/KneeSurgery.jpeg`, width: 1200, height: 630, alt: 'Knee Surgery Pune' }],
  },
  "robots": {
    "index": true,
    "follow": true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const faqs = [
  {
    q: 'What conditions can knee arthroscopy treat?',
    a: 'Knee arthroscopy is commonly used to treat ACL tears, meniscus injuries, cartilage damage, and other sports-related knee conditions.',
  },
  {
    q: 'How soon can I walk after knee surgery?',
    a: 'Many patients begin walking with support shortly after surgery, depending on the type of procedure and their surgeon’s advice.',
  },
  {
    q: 'Will I need physiotherapy after knee surgery?',
    a: 'Yes. Physiotherapy is an important part of recovery and helps restore strength, flexibility, and knee function.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Treatments', item: `${SITE_URL}/treatments` },
    { '@type': 'ListItem', position: 3, name: 'Knee Surgery', item: `${SITE_URL}/treatments/knee-surgery-pune` },
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://www.sportsurgeon.in/treatments/knee-surgery-pune#webpage",
      "url": "https://www.sportsurgeon.in/treatments/knee-surgery-pune",
      "name": "Knee Surgery in Pune",
      "description": "Advanced knee surgery in Pune by Dr. Sumedh Magar for ACL injuries, meniscus tears, ligament reconstruction, cartilage injuries, and sports-related knee conditions.",
      "mainEntity": {
        "@id": "https://www.sportsurgeon.in/treatments/knee-surgery-pune#procedure"
      }
    },
    {
      "@type": "MedicalProcedure",
      "@id": "https://www.sportsurgeon.in/treatments/knee-surgery-pune#procedure",
      "name": "Knee Surgery",
      "procedureType": "Arthroscopic Knee Surgery",
      "bodyLocation": "Knee",
      "howPerformed": "Minimally invasive arthroscopic surgery for ACL reconstruction, meniscus repair, ligament reconstruction, cartilage restoration, and other knee conditions.",
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
};

export default function KneeArthroscopyPage() {
  const currentPath = "/treatments/knee-surgery-pune";

  const filteredTreatments = relatedTreatments.filter(
    (item) => item.href !== currentPath
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="min-h-screen">
        
        {/* STRUCTURAL HERO CONTAINER MARKUP */}
        <section
          className="relative text-white flex items-center mt-20"
          style={{
            backgroundImage: "url('/knee surgery banner.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "75% center",
            minHeight: "calc(100vw * (480 / 1440))", 
            height: "auto",
            maxHeight: "560px",
          }}
        >
          {/* CORE BRAND ALIGNMENT WRAPPER ELEMENT */}
          <div className="relative mx-auto w-full max-w-[1350px] px-6 md:px-12 lg:px-16 py-20 md:py-28">
            
            <nav className="flex items-center flex-wrap gap-1.5 text-sm text-neutral-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/treatments" className="hover:text-white transition-colors">Treatments</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Knee Surgery</span>
            </nav>

            <div className="max-w-3xl">
              {/* <p className="text-teal-400 font-semibold text-xs md:text-sm uppercase tracking-widest mb-3">Minimally Invasive</p> */}
              
              {/* BRAND UNIFORM H1 MARKUP AND GRADIENT */}
              <h1 className="mt-6 font-[Fraunces] text-3xl font-semibold leading-tight md:text-5xl text-white">
                Knee Surgery in Pune – <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent">
                  Expert ACL Reconstruction and Knee Arthroscopy
                </span>
              </h1>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-teal-300">
                  Book Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Content Section Area */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                
                {/* OPTIMIZED HEADINGS FOR REDUCED SIZE IN CONTENT FLOW (text-xl md:text-2xl) */}
                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">What Is Knee Surgery?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    There are knee operations that use advanced arthroscopic surgery techniques used to diagnose and fix ligament problems, cartilage problems, meniscus tears, and sports injuries. Through minimally invasive surgery methods, knee joints can be stabilized and maintained.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Who May Need Knee Surgery?</h2>
                  <p className='mb-4 text-neutral-700 leading-relaxed'>
                    If a patient suffers from constant knee pain, instability, or mechanical problems despite physiotherapy, he or she can opt for surgery.
                  </p>
                  <p className='mb-4 text-neutral-700 leading-relaxed'>
                    Surgical interventions include:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'ACL tear',
                      'PCL tear',
                      'Torn meniscus',
                      'Degraded cartilage',
                      'Sport injuries',
                      'Knee instability',
                      'Painful locking sensation',
                      'Knee joint swelling',
                    ].map((c) => (
                      <div key={c} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Procedures Offered</h2>
                  <ul className="space-y-4">
                    {[
                      {
                        title: "Anterior Cruciate Ligament Reconstruction",
                        description: "Ligament reconstructive surgery done to restore stability in the knee following an injury from sports activities.",
                      },
                      {
                        title: "Posterior Cruciate Ligament Reconstruction",
                        description: "Surgical procedure performed on the posterior cruciate ligament following ligament injuries.",
                      },
                      {
                        title: "Meniscus Repair",
                        description: "Techniques used in repairing the joint while preserving shock absorption to prevent arthritis.",
                      },
                      {
                        title: "Knee Arthroscopy",
                        description: "Surgeries that can treat a variety of injuries within the joint including cartilage damage and synovitis.",
                      },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium text-secondary">{item.title}</h4>
                          <p className="text-neutral-700 mt-1">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Benefits of Arthroscopic Knee Surgery</h2>
                  <ul className="space-y-3 mb-4">
                    {[
                      'Small incisions',
                      'Faster rehabilitation',
                      'Less postoperative discomfort',
                      'Preservation of healthy tissues',
                      'Improved joint stability',
                      'Earlier return to sports and daily activities',
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
                    Rehabilitation includes structured physiotherapy focused on restoring range of motion, strength, balance, and confidence. Recovery timelines vary depending on the procedure and patient goals.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Why Choose Dr. Sumedh Magar for Knee Surgery in Pune?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Dr. Sumedh Magar specializes in sports medicine, ACL reconstruction, meniscus repair, and advanced knee arthroscopy, delivering evidence-based care tailored to athletes and active individuals.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-6">Frequently Asked Questions</h2>
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

              {/* Sidebar Component Grid Block */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <Card>
                    <h3 className="font-heading font-semibold text-secondary mb-4">Book a Consultation</h3>
                    <Link href="/contact" className="block w-full text-center bg-teal-400 text-slate-950 font-semibold py-3 rounded-md hover:bg-teal-300 transition-colors">Book Appointment</Link>
                    <a href="tel:+919145517171" className="flex items-center justify-center gap-2 mt-3 text-sm text-neutral-600 hover:text-primary transition-colors">
                      <Phone className="w-4 h-4" /> 9145517171
                    </a>
                  </Card>

                  <Card>
                    <h3 className="font-heading font-semibold text-secondary mb-4">Related Treatments</h3>
                    <ul className="space-y-2">
                      {filteredTreatments.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary transition-colors">
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