import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

type ConditionData = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  faqs: { q: string; a: string }[];
};

const CONDITIONS: Record<string, ConditionData> = {
  arthritis: {
    title: 'Arthritis',
    metaTitle: 'Arthritis Treatment Pune – Knee & Joint Arthritis Specialist',
    metaDescription: 'Expert arthritis diagnosis and treatment in Pune. Osteoarthritis of the knee, hip, and shoulder managed by Dr. Sumedh Magar at I-SPORT Medical Centre.',
    intro: 'Arthritis refers to inflammation and degeneration of joint surfaces. Osteoarthritis (OA) is the most common form, resulting from progressive breakdown of articular cartilage — the smooth lining that allows painless joint movement.',
    symptoms: ['Deep joint pain, especially after activity', 'Morning stiffness lasting less than 30 minutes', 'Swelling around the joint', 'Grinding or crepitus sensation', 'Reduced range of motion', 'Bone spurs visible on X-ray'],
    causes: ['Age-related cartilage wear', 'Previous joint injuries', 'Repeated sports and occupational loading', 'Genetic predisposition', 'Obesity increasing joint load'],
    treatments: ['Activity modification and weight management', 'Physiotherapy and strengthening exercises', 'Anti-inflammatory medications', 'Corticosteroid or hyaluronic acid injections', 'PRP therapy for early arthritis', 'Arthroscopic debridement for mechanical symptoms', 'Joint replacement for severe disease'],
    faqs: [
      { q: 'Is arthritis curable?', a: 'Arthritis cannot be reversed, but symptoms can be effectively managed. The goal is to reduce pain, maintain function, and slow progression.' },
      { q: 'Does exercise make arthritis worse?', a: 'Appropriate exercise is beneficial for arthritis. Low-impact activities like swimming, cycling, and walking maintain joint health without excessive load.' },
    ],
  },
  'ligament-injuries': {
    title: 'Ligament Injuries',
    metaTitle: 'Ligament Injury Treatment Pune – ACL, MCL & Joint Ligament Specialist',
    metaDescription: 'Expert ligament injury diagnosis and treatment in Pune. ACL, MCL, PCL tears managed by Dr. Sumedh Magar at I-SPORT Medical Centre.',
    intro: 'Ligaments are fibrous connective tissue bands that join bones and provide joint stability. Ligament injuries range from mild sprains (partial stretch) to complete tears that compromise joint function.',
    symptoms: ['Pain at the time of injury', 'Swelling within hours', 'Bruising around the joint', 'Feeling of instability', 'Difficulty bearing weight', 'Reduced range of motion'],
    causes: ['Contact injuries in sport', 'Sudden direction changes', 'Falls and twisting movements', 'Hyperextension injuries', 'Repeated low-grade stress'],
    treatments: ['Conservative management for mild sprains', 'Physiotherapy and muscle strengthening', 'Bracing for stability', 'Surgical reconstruction for complete tears in athletes', 'Arthroscopic repair where appropriate'],
    faqs: [
      { q: 'Do all ligament tears need surgery?', a: 'No. Minor sprains and partial tears often heal with conservative management. Complete tears in active athletes typically benefit from surgical reconstruction.' },
      { q: 'How long does ligament healing take?', a: 'Grade 1 sprains: 2–4 weeks. Grade 2 partial tears: 6–12 weeks. Grade 3 complete tears requiring surgery: 6–12 months.' },
    ],
  },
  'tendon-injuries': {
    title: 'Tendon Injuries',
    metaTitle: 'Tendon Injury Treatment Pune – Tendinopathy & Rotator Cuff Specialist',
    metaDescription: 'Expert tendon injury treatment in Pune. Patellar tendinopathy, rotator cuff tears, and Achilles tendinopathy treated by Dr. Sumedh Magar, I-SPORT Medical Centre.',
    intro: 'Tendons connect muscles to bones and transmit the forces required for movement. Tendon injuries are extremely common in athletes, ranging from tendinopathy (overuse) to complete ruptures.',
    symptoms: ['Pain with activity', 'Localised tenderness over the tendon', 'Morning stiffness', 'Gradual onset (overuse) or sudden onset (acute tear)', 'Weakness with specific movements'],
    causes: ['Repetitive overload exceeding tendon capacity', 'Sudden increase in training intensity', 'Poor recovery between sessions', 'Direct trauma', 'Age-related tendon degeneration'],
    treatments: ['Load management and activity modification', 'Progressive tendon loading (eccentric exercises)', 'Physiotherapy', 'Shockwave therapy', 'PRP injections', 'Surgical repair for complete tears'],
    faqs: [
      { q: 'What is the difference between tendinitis and tendinopathy?', a: 'Tendinitis implies acute inflammation. Tendinopathy is a broader term for chronic tendon pain with degenerative changes — more common in athletes.' },
    ],
  },
  'cartilage-injuries': {
    title: 'Cartilage Injuries',
    metaTitle: 'Cartilage Injury Treatment Pune – Chondral Lesion Specialist',
    metaDescription: 'Expert cartilage injury treatment in Pune. Articular cartilage damage, chondral lesions, and meniscal injuries managed by Dr. Sumedh Magar, I-SPORT Medical Centre.',
    intro: "Articular cartilage is the smooth white tissue covering the ends of bones in joints. It enables frictionless movement but has very limited healing capacity. Cartilage injuries are particularly challenging due to the body's inability to spontaneously repair significant defects.",
    symptoms: ['Joint pain with activity', 'Swelling', 'Clicking or catching sensation', 'Reduced range of motion', 'Muscle weakness around the joint'],
    causes: ['Acute trauma (impact or twisting)', 'Repetitive loading', 'Osteochondral defects', 'Associated ligament instability', 'Progressive wear'],
    treatments: ['Activity modification and physiotherapy', 'Microfracture for small defects', 'Cartilage debridement (arthroscopic)', 'PRP therapy', 'Osteochondral grafting for larger lesions', 'Biological treatments and cartilage restoration'],
    faqs: [
      { q: 'Can cartilage repair itself?', a: 'Articular cartilage has very limited intrinsic healing capacity. Surgical techniques aim to stimulate repair tissue or transplant healthy cartilage into defects.' },
    ],
  },
  'shoulder-instability': {
    title: 'Shoulder Instability',
    metaTitle: 'Shoulder Instability Treatment Pune – Dislocation & Bankart Repair Specialist',
    metaDescription: 'Expert shoulder instability treatment in Pune. Recurrent dislocation, Bankart repair, and labral tear management by Dr. Sumedh Magar, I-SPORT Medical Centre.',
    intro: 'Shoulder instability occurs when the ball-and-socket joint of the shoulder moves excessively, leading to a feeling of looseness, subluxation, or complete dislocation. It is particularly common in overhead and contact sport athletes.',
    symptoms: ['Feeling that the shoulder may "pop out"', 'Recurrent shoulder dislocations', 'Pain with overhead activities', 'Apprehension with arm in certain positions', 'Weakness and reduced function'],
    causes: ['Traumatic dislocation damaging the labrum (Bankart lesion)', 'Repetitive overhead activities', 'Genetic ligamentous laxity', 'Muscle imbalances around the shoulder'],
    treatments: ['Physiotherapy and rotator cuff strengthening for mild instability', 'Activity modification', 'Arthroscopic Bankart repair for traumatic instability', 'Latarjet procedure for significant bone loss', 'Structured rehabilitation programme'],
    faqs: [
      { q: 'Will my shoulder dislocate again after one dislocation?', a: 'Re-dislocation rates are high, especially in young athletes. Those under 25 years have up to 80% recurrence risk without surgical stabilisation.' },
      { q: 'Is surgery always required for shoulder instability?', a: 'Not always. Physiotherapy can successfully manage mild instability. Recurrent traumatic dislocations in athletes generally benefit from surgical stabilisation.' },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const condition = CONDITIONS[slug];
  if (!condition) return { title: 'Condition Not Found', robots: { index: false, follow: false } };
  return {
    title: condition.metaTitle,
    description: condition.metaDescription,
    alternates: { canonical: `${SITE_URL}/conditions/${slug}` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/conditions/${slug}`,
      title: condition.metaTitle,
      description: condition.metaDescription,
      images: [{ url: `${SITE_URL}/SumedhMagar.jpeg`, width: 1200, height: 630, alt: condition.title }],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(CONDITIONS).map((slug) => ({ slug }));
}

export default async function ConditionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const condition = CONDITIONS[slug];
  if (!condition) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Conditions', item: `${SITE_URL}/conditions` },
      { '@type': 'ListItem', position: 3, name: condition.title, item: `${SITE_URL}/conditions/${slug}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: condition.faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

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
              <Link href="/conditions" className="hover:text-white transition-colors">Conditions</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">{condition.title}</span>
            </nav>
            <div className="max-w-3xl">
              <h1 className="mb-4 text-4xl md:text-5xl font-bold">{condition.title}</h1>
              <p className="text-neutral-200 text-lg leading-relaxed mb-6">{condition.intro}</p>
              <Link href="/contact" className="inline-flex items-center btn-primary">
                Book Consultation <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-secondary mb-4">Symptoms</h2>
                  <ul className="space-y-3">
                    {condition.symptoms.map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Causes & Risk Factors</h2>
                  <ul className="space-y-2">
                    {condition.causes.map((c) => (
                      <li key={c} className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-neutral-700 text-sm">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Diagnosis</h2>
                  <p className="text-neutral-700 leading-relaxed">
                    Dr. Magar conducts a thorough clinical history and physical examination,
                    supported by appropriate imaging (X-ray, MRI, ultrasound) to accurately
                    diagnose and stage the condition before recommending treatment.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Treatment Options</h2>
                  <ul className="space-y-3">
                    {condition.treatments.map((t) => (
                      <li key={t} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-secondary mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {condition.faqs.map(({ q, a }) => (
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
                  <h3 className="font-heading font-semibold text-secondary mb-4">All Conditions</h3>
                  <ul className="space-y-2">
                    {Object.entries(CONDITIONS).map(([s, c]) => (
                      <li key={s}>
                        <Link href={`/conditions/${s}`} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary transition-colors">
                          <ChevronRight className="w-4 h-4 text-primary" /> {c.title}
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
