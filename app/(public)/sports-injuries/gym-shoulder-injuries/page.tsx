import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Gym & Weight Training Shoulder Injuries Pune – Rotator Cuff Specialist',
  description:
    'Expert treatment for gym and weight training shoulder injuries in Pune. Rotator cuff tears, shoulder impingement, and overload injuries treated by Dr. Sumedh Magar, I-SPORT.',
  alternates: { canonical: `${SITE_URL}/sports-injuries/gym-shoulder-injuries` },
  keywords: ['gym shoulder injury Pune', 'weightlifting shoulder injury', 'rotator cuff gym injury Pune'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/sports-injuries/gym-shoulder-injuries`,
    title: 'Gym Shoulder Injuries Pune | Dr. Sumedh Magar',
    description: 'Specialist treatment for gym and weight training shoulder injuries in Pune.',
    images: [{ url: `${SITE_URL}/ShoulderSurgery.jpeg`, width: 1200, height: 630, alt: 'Gym shoulder injuries Pune' }],
  },
};

const faqs = [
  {
    q: 'What gym exercises most commonly cause shoulder injuries?',
    a: 'Bench press, overhead press, pull-ups, and behind-the-neck exercises create the highest shoulder loads and are associated with rotator cuff injuries, AC joint problems, and labral tears.',
  },
  {
    q: 'Should I stop training with a shoulder injury?',
    a: 'Not necessarily. Many shoulder injuries can be managed while maintaining fitness through exercise modification. A specialist assessment helps identify which movements are safe and which should be avoided.',
  },
  {
    q: 'Can I prevent shoulder injuries in the gym?',
    a: 'Yes. Balanced programming (equal pushing and pulling volume), proper technique, progressive overload, shoulder mobility work, and rotator cuff conditioning significantly reduce injury risk.',
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
    { '@type': 'ListItem', position: 3, name: 'Gym Shoulder Injuries', item: `${SITE_URL}/sports-injuries/gym-shoulder-injuries` },
  ],
};

export default function GymShoulderInjuriesPage() {
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
              <span className="text-white">Gym Shoulder Injuries</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Gym & Strength Sports</p>
                <h1 className="mb-4 text-4xl md:text-5xl font-bold">Gym & Weight Training Shoulder Injuries</h1>
                <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Specialised care for weightlifting and resistance training shoulder injuries,
                  with treatment designed to keep athletes training.
                </p>
                <Link href="/contact" className="inline-flex items-center btn-primary">
                  Book Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image src="/ShoulderSurgery.jpeg" alt="Gym shoulder injury Pune" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-secondary mb-4">Common Gym Shoulder Injuries</h2>
                  <ul className="space-y-3">
                    {[
                      'Rotator cuff tendinopathy and tears',
                      'Shoulder impingement syndrome',
                      'Acromioclavicular (AC) joint injuries',
                      'Labral tears from heavy lifting',
                      'Biceps tendon pathology',
                      'Shoulder instability from muscle imbalances',
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Rotator Cuff Injuries</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    The rotator cuff is under significant load during bench press, overhead press,
                    and lat pulldown exercises. Repetitive overload without adequate recovery leads
                    to tendinopathy, and in severe cases, partial or complete tears. Pain is
                    typically felt at the top or outer aspect of the shoulder, worsened by
                    reaching overhead or behind the back.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Prevention</h2>
                  <ul className="space-y-3">
                    {[
                      'Balance pushing and pulling exercises in training programmes',
                      'Include rotator cuff-specific strengthening exercises',
                      'Avoid excessive internal rotation exercises without external rotation balance',
                      'Prioritise shoulder mobility work in warm-up',
                      'Progress loads gradually — avoid large weekly weight increases',
                      'Allow adequate recovery between heavy upper body sessions',
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
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
                      { href: '/treatments/shoulder-arthroscopy-pune', label: 'Shoulder Arthroscopy' },
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
