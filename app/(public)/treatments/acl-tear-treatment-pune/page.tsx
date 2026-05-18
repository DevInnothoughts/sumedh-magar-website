import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'ACL Tear Treatment in Pune – ACL Reconstruction Surgery',
  description:
    'Expert ACL tear treatment and ACL reconstruction surgery in Pune by Dr. Sumedh Magar. Arthroscopic ACL surgery, sports knee specialist at I-SPORT Medical Centre, Balewadi.',
  alternates: { canonical: `${SITE_URL}/treatments/acl-tear-treatment-pune` },
  keywords: [
    'ACL tear treatment Pune',
    'ACL reconstruction Pune',
    'ACL surgeon Pune',
    'sports knee injury Pune',
    'ACL surgery Balewadi',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/treatments/acl-tear-treatment-pune`,
    title: 'ACL Tear Treatment Pune | Dr. Sumedh Magar',
    description: 'Arthroscopic ACL reconstruction by sports knee specialist Dr. Sumedh Magar at I-SPORT Medical Centre, Pune.',
    images: [{ url: `${SITE_URL}/aclsurgery.JPG`, width: 1200, height: 630, alt: 'ACL Surgery Pune' }],
  },
};

const faqs = [
  {
    q: 'How long does ACL reconstruction surgery take?',
    a: 'ACL reconstruction is typically a 60–90 minute procedure performed under anaesthesia. Most patients are discharged the same day or within 24 hours.',
  },
  {
    q: 'When can I return to sports after ACL surgery?',
    a: 'Return to sport typically occurs 9–12 months post-surgery, depending on rehabilitation progress and sport-specific criteria being met.',
  },
  {
    q: 'Is ACL surgery always necessary?',
    a: 'Not always. Non-surgical management may be appropriate for less active individuals. However, athletes and young active patients generally benefit from surgical reconstruction.',
  },
  {
    q: 'What graft is used in ACL reconstruction?',
    a: "Dr. Magar uses autograft tissue — typically the patient's own hamstring tendons or patellar tendon — tailored to the individual's anatomy and activity demands.",
  },
  {
    q: 'Can I walk after ACL surgery?',
    a: 'Most patients are walking with crutches within 1–2 days. Full weight-bearing without crutches is usually achieved within 2–4 weeks.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Treatments', item: `${SITE_URL}/treatments` },
    { '@type': 'ListItem', position: 3, name: 'ACL Tear Treatment', item: `${SITE_URL}/treatments/acl-tear-treatment-pune` },
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

export default function ACLTreatmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen pt-20">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
          <div className="container-custom max-w-5xl mx-auto">
            <nav className="flex items-center gap-1.5 text-sm text-neutral-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/treatments" className="hover:text-white transition-colors">Treatments</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">ACL Tear Treatment</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                  Knee Surgery Specialist
                </p>
                <h1 className="mb-4 text-4xl md:text-5xl font-bold">
                  ACL Tear Treatment in Pune
                </h1>
                <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Expert anterior cruciate ligament reconstruction using arthroscopic techniques.
                  Trusted by athletes across Maharashtra.
                </p>
                <Link href="/contact" className="inline-flex items-center btn-primary">
                  Book Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image
                  src="/aclsurgery.JPG"
                  alt="ACL reconstruction surgery Pune"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                {/* What is ACL */}
                <div>
                  <h2 className="text-secondary mb-4">What is an ACL Injury?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    The anterior cruciate ligament (ACL) is one of the four key ligaments stabilising
                    the knee joint. It connects the femur (thigh bone) to the tibia (shin bone) and
                    is critical for rotational stability and directional changes during sport.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    ACL tears are among the most common serious sports injuries, particularly in
                    football, cricket, basketball, and skiing. The ligament can sustain a partial or
                    complete tear, often accompanied by a characteristic &ldquo;pop&rdquo; sensation
                    at the time of injury.
                  </p>
                </div>

                {/* Symptoms */}
                <div>
                  <h2 className="text-secondary mb-4">Common Symptoms of ACL Tear</h2>
                  <ul className="space-y-3">
                    {[
                      'Sudden severe knee pain at time of injury',
                      'Audible "pop" in the knee',
                      'Rapid swelling within 2–6 hours',
                      'Feeling of instability or the knee "giving way"',
                      'Reduced range of motion',
                      'Difficulty weight-bearing',
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Diagnosis */}
                <div>
                  <h2 className="text-secondary mb-4">Diagnosis</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Accurate diagnosis is essential for optimal treatment planning. Dr. Magar performs
                    a thorough clinical examination including the Lachman test and pivot shift test,
                    supplemented by:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'MRI scan — gold standard for ACL assessment',
                      'X-rays to rule out associated bone fractures',
                      'KT-1000 arthrometer testing for laxity measurement',
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-neutral-700">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Surgery */}
                <div>
                  <h2 className="text-secondary mb-4">ACL Reconstruction Surgery</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Arthroscopic ACL reconstruction is the standard of care for active patients
                    seeking to return to sport. The procedure involves replacing the torn ligament
                    with a graft — typically the patient&apos;s own hamstring or patellar tendon tissue
                    (autograft) — positioned through bone tunnels to replicate the native ACL.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    Dr. Magar performs this using keyhole arthroscopic techniques, resulting in
                    minimal soft tissue disruption, reduced post-operative pain, and faster recovery
                    compared to open surgery.
                  </p>
                </div>

                {/* Recovery */}
                <div>
                  <h2 className="text-secondary mb-4">Recovery Timeline</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { phase: 'Week 1–2', milestone: 'Walking with crutches, pain management, swelling control' },
                      { phase: 'Week 3–6', milestone: 'Full weight-bearing, range of motion restoration' },
                      { phase: 'Month 2–4', milestone: 'Strength training, proprioception exercises' },
                      { phase: 'Month 4–6', milestone: 'Running, agility, sport-specific drills' },
                      { phase: 'Month 6–9', milestone: 'Advanced training, return-to-sport testing' },
                      { phase: 'Month 9–12', milestone: 'Full competitive return with clearance' },
                    ].map(({ phase, milestone }) => (
                      <Card key={phase}>
                        <p className="font-semibold text-primary text-sm mb-1">{phase}</p>
                        <p className="text-neutral-700 text-sm">{milestone}</p>
                      </Card>
                    ))}
                  </div>
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

              {/* Sidebar */}
              <aside className="space-y-6">
                <Card>
                  <h3 className="font-heading font-semibold text-secondary mb-4">
                    Book a Consultation
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    Get a specialist opinion from Dr. Sumedh Magar at I-SPORT Medical Centre,
                    Balewadi, Pune.
                  </p>
                  <Link href="/contact" className="block w-full text-center btn-primary">
                    Book Appointment
                  </Link>
                  <a
                    href="tel:+919145517171"
                    className="flex items-center justify-center gap-2 mt-3 text-sm text-neutral-600 hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" /> 9145517171
                  </a>
                </Card>

                <Card>
                  <h3 className="font-heading font-semibold text-secondary mb-4">
                    Related Treatments
                  </h3>
                  <ul className="space-y-2">
                    {[
                      { href: '/treatments/knee-arthroscopy-pune', label: 'Knee Arthroscopy' },
                      { href: '/treatments/meniscus-tear-treatment-pune', label: 'Meniscus Tear' },
                      { href: '/treatments/sports-rehabilitation-pune', label: 'Sports Rehab' },
                    ].map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-primary" /> {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card>
                  <h3 className="font-heading font-semibold text-secondary mb-3">Sports Injuries</h3>
                  <ul className="space-y-2">
                    {[
                      { href: '/sports-injuries/football-knee-injuries', label: 'Football ACL Injuries' },
                      { href: '/sports-injuries/cricket-injuries', label: 'Cricket Injuries' },
                    ].map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary transition-colors"
                        >
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
