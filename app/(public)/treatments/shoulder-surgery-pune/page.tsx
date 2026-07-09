import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';
import { relatedTreatments } from '@/data/relatedtreatments';

const SITE_URL = 'https://www.sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Best Shoulder Surgeon in Pune | Dr. Sumedh Magar ',
  description:
    'Get advanced shoulder surgery in Pune with Dr. Sumedh Magar. We specialize in shoulder arthroscopy, rotator cuff repair, instability surgery, and sports injury treatment. ',
  alternates: {
    canonical: `${SITE_URL}/treatments/shoulder-surgery-pune`,
  },
  keywords: ['shoulder arthroscopy Pune', 'rotator cuff treatment Pune', 'shoulder surgeon Pune', 'shoulder instability Pune'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/treatments/shoulder-surgery-pune`,
    title: 'Shoulder Arthroscopy Pune | Dr. Sumedh Magar',
    description: 'Arthroscopic shoulder surgery for rotator cuff tears and shoulder instability in Pune.',
    images: [{ url: `${SITE_URL}/ShoulderSurgery.jpeg`, width: 1200, height: 630, alt: 'Shoulder Arthroscopy Pune' }],
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
    q: 'Is arthroscopic shoulder surgery better than open surgery?',
    a: 'For many conditions, arthroscopic surgery offers the advantages of smaller incisions, less tissue damage, and quicker rehabilitation while achieving excellent clinical outcomes.',
  },
  {
    q: 'How long does recovery take after shoulder surgery?',
    a: 'Recovery varies depending on the procedure, but many patients begin physiotherapy soon after surgery and gradually return to normal activities over the following weeks and months.',
  },
  {
    q: 'When should I see a shoulder specialist?',
    a: 'You should consult a shoulder specialist if pain, weakness, instability, or restricted movement persists despite rest, medications, or physiotherapy, or if you experience repeated shoulder dislocations.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Treatments', item: `${SITE_URL}/treatments` },
    { '@type': 'ListItem', position: 3, name: 'Shoulder Arthroscopy', item: `${SITE_URL}/treatments/shoulder-surgery-pune` },
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://www.sportsurgeon.in/treatments/shoulder-surgery-pune#webpage",
      "url": "https://www.sportsurgeon.in/treatments/shoulder-surgery-pune",
      "name": "Shoulder Surgery in Pune",
      "description": "Comprehensive shoulder surgery in Pune by Dr. Sumedh Magar, including arthroscopic shoulder surgery, rotator cuff repair, shoulder instability treatment, and sports injury care.",
      "mainEntity": {
        "@id": "https://www.sportsurgeon.in/treatments/shoulder-surgery-pune#procedure"
      }
    },
    {
      "@type": "MedicalProcedure",
      "@id": "https://www.sportsurgeon.in/treatments/shoulder-surgery-pune#procedure",
      "name": "Shoulder Surgery",
      "procedureType": "Arthroscopic Shoulder Surgery",
      "bodyLocation": "Shoulder",
      "howPerformed": "Minimally invasive arthroscopic and reconstructive shoulder procedures for rotator cuff tears, shoulder instability, frozen shoulder, and related conditions.",
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

export default function ShoulderArthroscopyPage() {
  const currentPath = "/treatments/shoulder-surgery-pune";

  const filteredTreatments = relatedTreatments.filter(
    (item) => item.href !== currentPath
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="min-h-screen">
        
        {/* HERO SECTION */}
        <section
          className="relative text-white flex items-center mt-20"
          style={{
            backgroundImage: "url('/shoulder pain banner.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "75% center",
            minHeight: "calc(100vw * (480 / 1440))", 
            height: "auto",
            maxHeight: "560px",
          }}
        >
          <div className="relative mx-auto w-full max-w-[1350px] px-6 md:px-12 lg:px-16 py-20 md:py-28">
            
            <nav className="flex items-center flex-wrap gap-1.5 text-sm text-neutral-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/treatments" className="hover:text-white transition-colors">
                Treatments
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Shoulder Surgery</span>
            </nav>

            <div className="max-w-3xl">
              {/* <p className="text-teal-400 font-semibold text-xs md:text-sm uppercase tracking-widest mb-3">
                Shoulder Specialist
              </p> */}

              <h1 className="mt-6 font-[Fraunces] text-3xl font-semibold leading-tight md:text-5xl text-white">
                Shoulder Surgery in Pune – <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent">
                  Arthroscopic Shoulder Surgery by Dr. Sumedh Magar
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

        {/* Core Content Area */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Shoulder pain can make simple activities like lifting your arm, driving, exercising, or even sleeping uncomfortable. If non-surgical treatments such as medications, physiotherapy, or injections have not provided relief, shoulder surgery may be the most effective solution to restore movement and reduce pain.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    Dr. Sumedh Magar specializes in arthroscopic shoulder surgery in Pune, offering minimally invasive procedures for rotator cuff tears, SLAP lesions, shoulder dislocations, labral injuries, and sports-related shoulder conditions.
                  </p>
                </div>

                {/* REDUCED H2 FONT SIZE ACROSS ALL SECTIONS USING text-xl md:text-2xl */}
                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">What Is Shoulder Surgery?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Shoulder surgery is performed to diagnose and treat injuries affecting the tendons, ligaments, cartilage, muscles, and bones of the shoulder joint. Today, most procedures are carried out using arthroscopic (keyhole) surgery, where a tiny camera and specialized instruments are inserted through small incisions to repair damaged structures with greater precision.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    Compared with traditional open surgery, arthroscopic shoulder surgery often results in smaller scars, less tissue damage, reduced postoperative discomfort, and faster rehabilitation.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Who May Need Shoulder Surgery?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">You may benefit from shoulder surgery in Pune if you experience:</p>
                  <ul className="space-y-3 mb-4">
                    {[
                      'Persistent shoulder pain despite physiotherapy or medications',
                      'Rotator cuff tears causing weakness or difficulty lifting the arm',
                      'Recurrent shoulder dislocations or instability',
                      'SLAP (labral) tears from sports or trauma',
                      'Shoulder impingement syndrome',
                      'Clicking, locking, or catching sensations in the shoulder',
                      'Limited range of motion affecting daily activities',
                      'Sports injuries preventing return to activity'
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-neutral-700 leading-relaxed">A comprehensive orthopedic evaluation and imaging studies help determine whether surgery is the best treatment option.</p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Common Shoulder Conditions Treated</h2>
                  <ul className="space-y-4">
                    {[
                      {
                        title: "Rotator Cuff Tear",
                        description: "Rotator cuff injuries are among the most common causes of shoulder pain. Arthroscopic rotator cuff repair restores tendon function, improves strength, and reduces pain.",
                      },
                      {
                        title: "SLAP Tear (Labral Injury)",
                        description: "SLAP tears affect the cartilage ring surrounding the shoulder socket and are commonly seen in athletes involved in throwing sports or overhead activities. Arthroscopic SLAP repair helps restore stability and shoulder function.",
                      },
                      {
                        title: "Shoulder Instability and Recurrent Dislocation",
                        description: "Repeated shoulder dislocations may occur after ligament or labral injuries. Arthroscopic stabilization procedures repair damaged tissues and reduce the risk of future dislocations.",
                      },
                      {
                        title: "Shoulder Impingement Syndrome",
                        description: "Inflamed tissues or bone spurs can compress shoulder tendons, causing pain during overhead movement. Arthroscopic decompression may relieve symptoms and improve mobility.",
                      },
                      {
                        title: "Sports-Related Shoulder Injuries",
                        description: "Athletes participating in cricket, tennis, badminton, swimming, volleyball, and gym training frequently develop shoulder injuries that may require surgical treatment after failed conservative management."
                      }
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
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Arthroscopic Shoulder Surgery Procedures</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">Dr. Sumedh Magar performs advanced minimally invasive procedures including:</p>
                  <ul className="space-y-3 mb-4">
                    {[
                      'Arthroscopic rotator cuff repair',
                      'SLAP and labral repair',
                      'Shoulder stabilization surgery',
                      'Bankart repair for recurrent dislocation',
                      'Shoulder decompression surgery',
                      'Removal of loose bodies',
                      'Treatment of cartilage injuries',
                      'Diagnostic shoulder arthroscopy'
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-neutral-700 leading-relaxed">Each procedure is customized based on the patient's condition, activity level, and recovery goals.</p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Benefits of Arthroscopic Shoulder Surgery</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">Compared with conventional open techniques, arthroscopic surgery may offer:</p>
                  <ul className="space-y-3 mb-4">
                    {[
                      'Smaller incisions and minimal scarring',
                      'Reduced soft tissue damage',
                      'Less postoperative pain',
                      'Faster rehabilitation',
                      'Lower risk of stiffness',
                      'Earlier return to sports and daily activities',
                      'Improved visualization of joint structures',
                      'Better cosmetic outcomes'
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-neutral-700 leading-relaxed">Successful recovery depends on both surgical expertise and adherence to physiotherapy.</p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Recovery After Shoulder Surgery</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">Recovery timelines vary depending on the procedure performed and the severity of the injury.</p>
                  <p className="text-neutral-700 leading-relaxed mb-4">In the initial weeks, patients may use a sling while beginning supervised rehabilitation. Physiotherapy gradually progresses to restore mobility, strengthen muscles, and improve shoulder stability.</p>
                  <p className="text-neutral-700 leading-relaxed mb-4">Most patients resume daily activities within weeks, while return to heavy lifting or competitive sports typically requires several months based on healing and medical advice.</p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Why Choose Dr. Sumedh Magar for Shoulder Surgery in Pune?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">Patients seeking a shoulder specialist in Pune benefit from comprehensive diagnosis, evidence-based treatment planning, and advanced arthroscopic techniques.</p>
                  <p className="text-neutral-700 leading-relaxed mb-4">Dr. Sumedh Magar has expertise in treating sports injuries, rotator cuff tears, shoulder instability, and complex arthroscopic conditions using minimally invasive procedures designed to restore function while minimizing recovery time. Every treatment plan is personalized according to the patient's symptoms, imaging findings, lifestyle, and long-term goals.</p>
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

              {/* Sidebar Block */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <Card>
                    <h3 className="font-heading font-semibold text-secondary mb-4">Book a Consultation</h3>
                    {/* 1. Added inline style to guarantee single line display */}
                    <Link
                      href="/contact"
                      className="block w-full text-center bg-teal-400 text-slate-950 font-semibold py-3 rounded-md hover:bg-teal-300 transition-colors"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Book Appointment
                    </Link>
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