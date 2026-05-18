import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Cricket Injuries Treatment Pune – Shoulder, Knee & Stress Injuries',
  description:
    'Expert treatment for cricket injuries in Pune. Shoulder injuries in bowlers, knee injuries, stress fractures, and overuse conditions managed by Dr. Sumedh Magar, I-SPORT Medical Centre.',
  alternates: { canonical: `${SITE_URL}/sports-injuries/cricket-injuries` },
  keywords: ['cricket injuries Pune', 'cricket shoulder injury', 'bowler shoulder Pune', 'cricket knee injury Pune'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/sports-injuries/cricket-injuries`,
    title: 'Cricket Injuries Pune | Dr. Sumedh Magar',
    description: 'Specialist cricket injury treatment for bowlers, batters, and fielders in Pune.',
    images: [{ url: `${SITE_URL}/SportsMedicine.jpeg`, width: 1200, height: 630, alt: 'Cricket injuries Pune' }],
  },
};

const faqs = [
  {
    q: 'What are the most common injuries in cricket bowlers?',
    a: 'Bowlers are prone to lower back stress fractures (spondylolysis), side strain, shoulder injuries (rotator cuff impingement, labral tears), and knee injuries from the bowling action.',
  },
  {
    q: 'How long does a cricket shoulder injury take to recover?',
    a: 'Recovery depends on severity. Mild rotator cuff impingement may resolve in 6–8 weeks with physiotherapy. Surgical repair for significant tears requires 4–6 months before return to bowling.',
  },
  {
    q: 'Can I prevent cricket injuries?',
    a: 'Yes. Proper bowling technique, workload management, structured strength conditioning, and adequate rest between matches significantly reduce injury risk.',
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
    { '@type': 'ListItem', position: 3, name: 'Cricket Injuries', item: `${SITE_URL}/sports-injuries/cricket-injuries` },
  ],
};

export default function CricketInjuriesPage() {
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
              <span className="text-white">Cricket Injuries</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Cricket Medicine Specialist</p>
                <h1 className="mb-4 text-4xl md:text-5xl font-bold">Cricket Injuries</h1>
                <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Specialist management of cricket-specific injuries for players at all levels,
                  from club cricketers to elite performers.
                </p>
                <Link href="/contact" className="inline-flex items-center btn-primary">
                  Book Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image src="/SportsMedicine.jpeg" alt="Cricket injury treatment Pune" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-secondary mb-4">Shoulder Injuries in Bowlers</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Fast bowlers are among the most injury-prone athletes in any sport. The
                    repetitive overhead action creates enormous stress on the shoulder, leading
                    to rotator cuff impingement, labral tears, and acromioclavicular joint injuries.
                    These conditions require accurate diagnosis and sport-specific rehabilitation
                    to achieve full return to bowling.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Common Cricket Injuries</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { injury: 'Rotator Cuff Impingement', role: 'Bowlers, fielders' },
                      { injury: 'Stress Fractures (lower back)', role: 'Fast bowlers' },
                      { injury: 'Side Strain', role: 'Fast bowlers, batters' },
                      { injury: 'Knee Ligament Injuries', role: 'All positions' },
                      { injury: 'Hamstring Strains', role: 'Batters, fielders' },
                      { injury: 'Finger Injuries', role: 'Wicketkeepers, fielders' },
                    ].map(({ injury, role }) => (
                      <div key={injury} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-neutral-800 text-sm">{injury}</p>
                          <p className="text-neutral-500 text-xs">{role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Stress Injuries</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Lower back stress fractures (spondylolysis and spondylolisthesis) are
                    particularly common in young fast bowlers. Early recognition is critical —
                    delayed diagnosis can lead to chronic pain and prolonged absence from the game.
                    MRI and SPECT-CT scanning are essential for accurate diagnosis.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Prevention</h2>
                  <ul className="space-y-3">
                    {[
                      'Structured bowling load management (overs per session/week)',
                      'Sport-specific shoulder and core strengthening programmes',
                      'Biomechanical analysis of bowling action',
                      'Pre-season screening and fitness assessment',
                      'Adequate rest and recovery between matches',
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
                      { href: '/sports-injuries', label: 'All Sports Injuries' },
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
