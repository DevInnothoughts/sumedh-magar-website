import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Football Knee Injuries Pune – ACL, Meniscus & Ankle Treatment',
  description:
    'Expert treatment for football knee injuries in Pune. ACL tears, meniscus injuries, and ankle instability in football players treated by Dr. Sumedh Magar, I-SPORT Medical Centre.',
  alternates: { canonical: `${SITE_URL}/sports-injuries/football-knee-injuries` },
  keywords: ['football knee injury Pune', 'ACL football injury Pune', 'football injuries Pune', 'footballer knee specialist Pune'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/sports-injuries/football-knee-injuries`,
    title: 'Football Knee Injuries Pune | Dr. Sumedh Magar',
    description: 'Specialist treatment for ACL tears, meniscus injuries, and ankle instability in football players.',
    images: [{ url: `${SITE_URL}/KneeSurgery.jpeg`, width: 1200, height: 630, alt: 'Football knee injuries Pune' }],
  },
};

const faqs = [
  {
    q: 'Why are ACL injuries so common in football?',
    a: 'Football involves rapid direction changes, sudden deceleration, jumping and landing, and physical contact — all mechanisms that stress the ACL. Wet or uneven surfaces and fatigue increase risk.',
  },
  {
    q: 'Can a footballer return to professional level after ACL reconstruction?',
    a: 'Yes. With proper surgical technique and structured rehabilitation, the majority of footballers return to competitive play. However, return to sport criteria must be met, not just a time-based protocol.',
  },
  {
    q: 'How do I know if my ankle is just sprained or ligament damage?',
    a: 'A severe sprain and ligament tear can feel similar. Persistent instability, recurrent sprains, or inability to return to sport after 6 weeks warrant specialist assessment and MRI evaluation.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Sports Injuries', item: `${SITE_URL}/sports-injuries` },
    { '@type': 'ListItem', position: 3, name: 'Football Knee Injuries', item: `${SITE_URL}/sports-injuries/football-knee-injuries` },
  ],
};

export default function FootballKneeInjuriesPage() {
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
              <Link href="/sports-injuries" className="hover:text-white transition-colors">Sports Injuries</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Football Knee Injuries</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Football Medicine</p>
                <h1 className="mb-4 text-4xl md:text-5xl font-bold">Football Knee Injuries</h1>
                <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Specialist care for ACL tears, meniscus injuries, and ankle instability in
                  football and futsal players.
                </p>
                <Link href="/contact" className="inline-flex items-center btn-primary">
                  Book Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image src="/KneeSurgery.jpeg" alt="Football knee injury Pune" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-secondary mb-4">ACL Injuries in Football</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    ACL tears are one of the most feared injuries for footballers. They typically
                    occur during non-contact mechanisms — a sudden change of direction, landing from
                    a jump, or sharp deceleration — and can cause significant time away from the game.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    Dr. Magar specialises in arthroscopic ACL reconstruction and has helped numerous
                    footballers at club and professional level return to competition.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Common Football Knee Injuries</h2>
                  <ul className="space-y-3">
                    {[
                      'ACL tears (anterior cruciate ligament)',
                      'MCL sprains and tears (medial collateral ligament)',
                      'Meniscus tears from twisting and contact',
                      'Patellar tendinopathy (jumper\'s knee)',
                      'Osgood-Schlatter disease in adolescent players',
                      'Posterior cruciate ligament (PCL) injuries',
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Ankle Instability</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Ankle sprains are the most common acute injury in football. While most resolve
                    with conservative management, recurrent ankle sprains indicate chronic
                    ligamentous instability that may require arthroscopic stabilisation or
                    lateral ligament reconstruction.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Return to Sport</h2>
                  <p className="text-neutral-700 leading-relaxed">
                    Return to competitive football requires meeting objective criteria including
                    strength symmetry, functional performance, and psychological readiness. Dr. Magar
                    applies evidence-based return-to-sport protocols to minimise re-injury risk.
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
                      { href: '/treatments/acl-tear-treatment-pune', label: 'ACL Treatment' },
                      { href: '/treatments/meniscus-tear-treatment-pune', label: 'Meniscus Tear' },
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
