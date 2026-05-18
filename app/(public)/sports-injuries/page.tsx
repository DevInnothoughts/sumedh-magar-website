import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Sports Injuries Pune – Expert Diagnosis & Treatment',
  description:
    'Comprehensive sports injury care in Pune by Dr. Sumedh Magar. Cricket, football, gym, and running injuries treated with evidence-based sports medicine at I-SPORT Medical Centre.',
  alternates: { canonical: `${SITE_URL}/sports-injuries` },
  keywords: ['sports injuries Pune', 'sports injury doctor Pune', 'sports medicine specialist Pune', 'athlete injury treatment Pune'],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/sports-injuries`,
    title: 'Sports Injuries Pune | Dr. Sumedh Magar',
    description: 'Expert sports injury diagnosis and treatment for cricket, football, gym, and running injuries in Pune.',
    images: [{ url: `${SITE_URL}/SportsMedicine.jpeg`, width: 1200, height: 630, alt: 'Sports injuries Pune' }],
  },
};

const injuries = [
  {
    slug: 'cricket-injuries',
    title: 'Cricket Injuries',
    description: 'Shoulder injuries in bowlers, stress fractures, knee injuries, and overuse conditions common in cricket players.',
    image: '/SportsMedicine.jpeg',
  },
  {
    slug: 'football-knee-injuries',
    title: 'Football Knee Injuries',
    description: 'ACL tears, meniscus injuries, ankle instability, and contact injuries in football and futsal players.',
    image: '/KneeSurgery.jpeg',
  },
  {
    slug: 'gym-shoulder-injuries',
    title: 'Gym & Weight Training Injuries',
    description: 'Rotator cuff injuries, shoulder impingement, and overload injuries from weightlifting and resistance training.',
    image: '/ShoulderSurgery.jpeg',
  },
  {
    slug: 'runner-knee-pain',
    title: "Runner's Knee & Running Injuries",
    description: 'Patellofemoral pain, IT band syndrome, and lower limb overuse injuries in recreational and competitive runners.',
    image: '/JointPreservation.jpeg',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Sports Injuries', item: `${SITE_URL}/sports-injuries` },
  ],
};

export default function SportsInjuriesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen pt-20">
        <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Sport-Specific Care</p>
              <h1 className="mb-6">Sports Injuries</h1>
              <p className="text-xl text-neutral-200 leading-relaxed">
                Expert diagnosis and treatment for sports-related injuries across all disciplines,
                from elite athletes to recreational players.
              </p>
              <nav className="flex items-center justify-center gap-1.5 text-sm text-neutral-300 mt-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white">Sports Injuries</span>
              </nav>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-secondary mb-4">Sport-Specific Injury Guides</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Understanding the specific injury patterns and risk factors unique to your sport
                is essential for effective prevention and treatment.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {injuries.map((injury) => (
                <Card key={injury.slug}>
                  <div className="relative w-full h-52 mb-4">
                    <Image
                      src={injury.image}
                      alt={injury.title}
                      fill
                      className="object-cover rounded-xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-secondary mb-2">{injury.title}</h3>
                  <p className="text-neutral-600 text-sm mb-4 leading-relaxed">{injury.description}</p>
                  <Link href={`/sports-injuries/${injury.slug}`} className="text-primary font-semibold hover:text-primary-600 inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-neutral-50">
          <div className="container-custom max-w-3xl mx-auto text-center">
            <h2 className="text-secondary mb-4">Injured? Get Expert Help.</h2>
            <p className="text-neutral-600 mb-8">
              Dr. Sumedh Magar provides specialist assessment and personalised treatment plans
              for all sports injuries at I-SPORT Medical Centre, Balewadi, Pune.
            </p>
            <Link href="/contact" className="inline-flex items-center btn-primary">
              Book Appointment <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
