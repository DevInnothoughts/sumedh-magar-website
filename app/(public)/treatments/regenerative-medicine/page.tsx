import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';
import { relatedTreatments } from '@/data/relatedtreatments';
// import { usePathname } from "next/navigation";

const SITE_URL = 'https://www.sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Sports Rehabilitation Pune – Post-Surgery Rehab & Recovery',
  description:
    'Specialised sports rehabilitation in Pune at I-SPORT Medical Centre. Post-surgical rehab, strength recovery, and return-to-sport protocols by Dr. Sumedh Magar.',
  alternates: {
    canonical: `${SITE_URL}/treatments/regenerative-medicine`,
  },
  keywords: ['sports rehabilitation Pune', 'sports physiotherapy Pune', 'post surgery rehab Pune', 'return to sport Pune'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/treatments/regenerative-medicine`,
    title: 'Regenerative Medicine Pune | I-SPORT Medical Centre',
    description: 'Expert regenerative medicine in Pune at I-SPORT Medical Centre. Post-surgical rehab, strength recovery, and return-to-sport protocols by Dr. Sumedh Magar.',
    images: [{ url: `${SITE_URL}/SportsMedicine.jpeg`, width: 1200, height: 630, alt: 'Regenerative Medicine Pune' }],
  },
};

const faqs = [
  {
    q: 'What is PRP therapy?',
    a: 'PRP therapy uses concentrated platelets from your own blood to deliver growth factors that may support healing in injured tissues.',
  },
  {
    q: 'Can regenerative medicine replace surgery?',
    a: 'In some early-stage conditions, regenerative treatments may help manage symptoms and support healing, but they are not a replacement for surgery when structural damage is severe.',
  },
  {
    q: 'How long does it take to recover after PRP or regenerative treatment?',
    a: 'Many patients resume light daily activities within a few days, although full improvement may take several weeks or months depending on the condition and rehabilitation plan.',
  },

];

// const relatedTreatments = [
//   {
//     href: "/treatments/knee-replacement-surgery-pune",
//     label: "Robotic Knee Replacement",
//   },
//   {
//     href: "/treatments/shoulder-surgery-pune",
//     label: "Shoulder Surgery",
//   },
//   {
//     href: "/treatments/knee-surgery-pune",
//     label: "Knee Surgery",
//   },
//   {
//     href: "/treatments/knee-pain-treatment-pune",
//     label: "Joint Replacement",
//   },
//   {
//     href: "/treatments/hip-surgery-pune",
//     label: "Hip Surgery",
//   },
//   {
//     href: "/treatments/regenerative-medicine",
//     label: "Regenerative Medicine",
//   },
// ];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Treatments', item: `${SITE_URL}/treatments` },
    { '@type': 'ListItem', position: 3, name: 'Regenerative Medicine', item: `${SITE_URL}/treatments/regenerative-medicine` },
  ],
};

export default function RegenerativeMedicinePage() {

  const currentPath = "/treatments/regenerative-medicine";

  const filteredTreatments = relatedTreatments.filter(
    (item) => item.href !== currentPath
  );

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
              <span className="text-white">Regenerative Medicine</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Athlete Recovery</p>
                <h1 className="mb-4 text-4xl md:text-5xl font-bold">Regenerative Medicine in Pune – PRP Therapy, Stem Cell Treatments & Cartilage Restoration</h1>
                {/* <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Evidence-based rehabilitation programmes designed to return athletes to peak
                  performance safely and efficiently.
                </p> */}
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
                  <h2 className="text-secondary mb-4">What Is Regenerative Medicine?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Regenerative Medicine represents an innovative approach to orthopedic care that aims at helping the body heal itself by repairing damaged tissues and reducing pain while preserving joint mobility. Regenerative medicine does not involve replacement but uses biological approaches like Platelet Rich Plasma (PRP), certain stem cell therapy, and cartilage restoration to facilitate healing.</p>
                  <p className="text-neutral-700 leading-relaxed">
                    Regenerative medicine can be used on individuals suffering from joint degeneration, sports injury, tendonitis, and certain cartilage problems.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Who May Benefit from Regenerative Medicine?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    If you suffer from joint pain or soft tissue injury that fails to improve through adequate rest, medication, or physiotherapy, then there is a chance you may qualify for regenerative orthopedics treatment
                  </p>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Such conditions can include:
                  </p>
                  <ul className="space-y-3 mb-4">
                    {[

                      'Early osteoarthritis in the knee or hip joint',
                      'Injuries and tendinopathy involving tendons',
                      'Partial tears or sprain of ligaments',
                      'Sports injury',
                      'Degradation of cartilage',
                      'Tennis elbow and golfer\'s elbow',
                      'Plantar fasciitis',
                      'Joint degeneration',
                      'Overuse injuries',

                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <p className='text-neutral-700 leading-relaxed mb-4'>
                    An orthopedic examination and imaging will assist in determining the suitability of regenerative medicine in your case.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Regenerative Treatments We Offer</h2>

                  <ul className="space-y-4">
                    {[
                      {
                        title: "Platelet-Rich Plasma (PRP) Therapy",
                        description:
                          "Platelet-rich plasma therapy entails harvesting a small amount of blood from the patient, isolating the platelets in it, and then injecting the platelet-enriched solution back into the site where the injury occurred. The platelets contain growth factors that help with tissue healing, as well as reduce pain and inflammation. PRP can be utilized in treating injuries in tendons and ligaments, early arthritis, and specific sports medicine disorders. ",
                      },
                      {
                        title: "Stem Cell–Based Treatments",
                        description:
                          "Stem cell-based treatments constitute a type of regenerative medicine used to promote tissue repair in certain cases. Such therapies can be prescribed by physicians when treating particular orthopedic diseases depending on clinical indications and regulatory approval. Given the continuous advancements being made in this field, therapy choices are made on an individual basis according to existing knowledge.",
                      },
                      {
                        title: "Cartilage Restoration Procedures",
                        description:
                          "Cartilage restoration procedures include any surgical intervention aimed at repairing or regenerating damaged cartilage in the case of localized disorders.",
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

                <div>
                  <h2 className="text-secondary mb-4">Benefits of Regenerative Medicine</h2>

                  <p className="text-neutral-700 leading-relaxed mb-4">
                    The potential benefits of using regenerative orthopedics are:
                  </p>
                  <ul className="space-y-3 mb-4">
                    {[

                      'Minimally invasive approach',
                      'Using biologics to help body heal itself',
                      'Shorter recovery period than traditional surgery',
                      'Individualized care plan',
                      'Joint protection techniques',
                      'Improvement in pain management and functioning',
                      'Can postpone the necessity of joint replacement in certain individuals',
                      'Depends on the nature of injury and level of tissue damage',

                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                <div>
                  <h2 className="text-secondary mb-4">Regenerative Treatments We Offer</h2>

                  <ul className="space-y-4">
                    {[
                      {
                        title: "Early-stage Osteoarthritis",
                        description:
                          "Individuals suffering from mild to moderate degeneration of their joints may find relief through regeneration treatment that focuses on joint restoration and symptom alleviation. ",
                      },
                      {
                        title: "Sports-related Injuries",
                        description:
                          "Sportsmen who have suffered tendon, ligament, or muscle injuries may qualify for biologic treatments as a component of a comprehensive rehabilitation program.",
                      },
                      {
                        title: "Cartilage Lesions",
                        description:
                          "Localized problems with cartilage lesions may be treatable using restorative methods that focus on joint health preservation.",
                      },
                      {
                        title: "Chronic Tendinopathies",
                        description:
                          "Conditions such as tennis elbow, patellar tendinopathy, or Achilles tendinopathy may require specific types of regenerative treatment after conventional treatment has failed.",
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

                <div>
                  <h2 className="text-secondary mb-4">Recovery After Regenerative Therapy</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Regenerative therapies are normally done in an outpatient setting without extended downtime. The patient is expected to be discharged on the same day and can slowly get back into their routine as advised by the doctor.</p>
                  <p>A physical therapy and exercise regimen tailored to suit the patient’s needs is also suggested. </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Why Choose Dr. Sumedh Magar for Regenerative Medicine in Pune?</h2>
                  <p>
                    Dr. Sumedh Magar offers evidence-based regenerative orthopedic treatments tailored to each patient's condition and goals. By combining expertise in sports medicine, arthroscopy, and joint preservation with modern biologic therapies, treatment plans are designed to maximize function while minimizing unnecessary surgery whenever appropriate.
                  </p>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Every patient undergoes a comprehensive evaluation to determine whether PRP therapy, cartilage restoration, or other regenerative options are suitable as part of their overall care.</p>
                </div>

                {/* FAQs */}
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

              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <Card>
                    <h3 className="font-heading font-semibold text-secondary mb-4">Book a Consultation</h3>
                    <Link href="/contact" className="block w-full text-center btn-primary">Book Appointment</Link>
                    <a href="tel:+919145517171" className="flex items-center justify-center gap-2 mt-3 text-sm text-neutral-600 hover:text-primary transition-colors">
                      <Phone className="w-4 h-4" /> 9145517171
                    </a>
                  </Card>
                  {/* <Card>
                    <h3 className="font-heading font-semibold text-secondary mb-4">Related Treatments</h3>
                    <ul className="space-y-2">
                      {[
                        { href: '/treatments/acl-tear-treatment-pune', label: 'Robotic Knee Replacement' },
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
                  </Card> */}

                  {/* <Card>
                    <h3 className="font-heading font-semibold text-secondary mb-4">
                      Related Treatments
                    </h3>

                    <ul className="space-y-2">
                      {relatedTreatments.map((item) => (
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
                  </Card> */}

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
