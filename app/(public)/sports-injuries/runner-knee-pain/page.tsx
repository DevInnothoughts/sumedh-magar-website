import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: "Runner's Knee Pain Treatment Pune – Patellofemoral & IT Band Specialist",
  description:
    "Expert treatment for runner's knee pain in Pune. Patellofemoral pain syndrome, IT band syndrome, and running injuries treated by Dr. Sumedh Magar, I-SPORT Medical Centre.",
  alternates: { canonical: `${SITE_URL}/sports-injuries/runner-knee-pain` },
  keywords: ["runner's knee Pune", 'patellofemoral pain Pune', 'IT band syndrome Pune', 'running knee pain Pune'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/sports-injuries/runner-knee-pain`,
    title: "Runner's Knee Pune | Dr. Sumedh Magar",
    description: "Expert treatment for runner's knee and running-related leg injuries in Pune.",
    images: [{ url: `${SITE_URL}/JointPreservation.jpeg`, width: 1200, height: 630, alt: "Runner's knee Pune" }],
  },
};

const faqs = [
  {
    q: "What is runner's knee?",
    a: "Runner's knee (patellofemoral pain syndrome) refers to pain around or behind the kneecap, worsened by running, stair descent, squatting, and prolonged sitting.",
  },
  {
    q: 'How do I treat IT band syndrome?',
    a: 'IT band syndrome responds well to activity modification, foam rolling, hip strengthening, running gait analysis, and progressive return to running. Surgery is rarely needed.',
  },
  {
    q: 'Should I stop running with knee pain?',
    a: "Not necessarily for all types of knee pain. Some conditions tolerate continued running with load modification. A specialist assessment helps determine what's safe and guides return-to-running progression.",
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
    { '@type': 'ListItem', position: 3, name: "Runner's Knee", item: `${SITE_URL}/sports-injuries/runner-knee-pain` },
  ],
};

export default function RunnerKneePainPage() {
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
              <span className="text-white">Runner&apos;s Knee</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Running Medicine</p>
                <h1 className="mb-4 text-4xl md:text-5xl font-bold">{"Runner's Knee Pain"}</h1>
                <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Expert diagnosis and treatment for patellofemoral pain, IT band syndrome, and
                  running-related lower limb injuries at I-SPORT Medical Centre, Pune.
                </p>
                <Link href="/contact" className="inline-flex items-center btn-primary">
                  Book Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image src="/JointPreservation.jpeg" alt="Runner's knee treatment Pune" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-secondary mb-4">Common Running Knee Injuries</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { condition: 'Patellofemoral Pain Syndrome', desc: 'Pain around the kneecap, especially on stairs and downhill' },
                      { condition: 'IT Band Syndrome', desc: 'Lateral knee pain from iliotibial band tightness' },
                      { condition: 'Patellar Tendinopathy', desc: 'Jumper\'s knee from repetitive loading' },
                      { condition: 'Medial Knee Pain', desc: 'Pes anserine bursitis or medial plica' },
                    ].map(({ condition, desc }) => (
                      <Card key={condition}>
                        <p className="font-semibold text-primary text-sm mb-1">{condition}</p>
                        <p className="text-neutral-700 text-sm">{desc}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Why Running Injuries Occur</h2>
                  <ul className="space-y-3">
                    {[
                      'Sudden increase in training volume or intensity',
                      'Poor running mechanics or technique',
                      'Hip and gluteal weakness causing knee valgus',
                      'Inadequate recovery between training sessions',
                      'Inappropriate footwear',
                      'Running on hard surfaces without adequate conditioning',
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Treatment Approach</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Most running knee injuries are managed non-surgically. Treatment focuses on
                    addressing the root cause — typically a combination of training load errors,
                    biomechanical factors, and strength deficits — rather than just treating symptoms.
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
                      { href: '/treatments/knee-pain-treatment-pune', label: 'Knee Pain Treatment' },
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
