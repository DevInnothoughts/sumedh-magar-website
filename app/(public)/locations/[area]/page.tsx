import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowRight, MapPin, Phone, Clock } from 'lucide-react';
import { Card } from '@/components/Card';

const SITE_URL = 'https://sportsurgeon.in';

type AreaData = {
  name: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  distanceNote: string;
  nearbyAreas: string[];
};

const AREAS: Record<string, AreaData> = {
  'orthopedic-doctor-balewadi': {
    name: 'Balewadi',
    metaTitle: 'Orthopedic Doctor in Balewadi Pune – I-SPORT Medical Centre',
    metaDescription: 'Leading orthopedic doctor in Balewadi, Pune. Dr. Sumedh Magar at I-SPORT Medical Centre offers expert ACL reconstruction, knee arthroscopy, and sports injury treatment.',
    heading: 'Orthopedic Doctor in Balewadi, Pune',
    intro: 'I-SPORT Medical Centre is conveniently located in Balewadi, Pune, providing world-class sports orthopedic care to residents of Balewadi and surrounding areas. Dr. Sumedh Magar, our Founder & Director, is a fellowship-trained sports orthopedic surgeon offering the full spectrum of arthroscopic and joint preservation procedures.',
    distanceNote: 'Located at Shp 9-13 Upper Ground Floor, Madhukosh Society, Balewadi, Pune 411045 — easily accessible from Balewadi High Street, Baner, and Hinjewadi.',
    nearbyAreas: ['Baner', 'Wakad', 'Hinjewadi', 'Aundh', 'Pimple Saudagar'],
  },
  'orthopedic-doctor-baner': {
    name: 'Baner',
    metaTitle: 'Orthopedic Doctor in Baner Pune – Sports Knee & Shoulder Specialist',
    metaDescription: 'Orthopedic doctor serving Baner, Pune. Dr. Sumedh Magar at I-SPORT Medical Centre, Balewadi provides expert ACL, knee, and shoulder surgery for Baner residents.',
    heading: 'Orthopedic Doctor Serving Baner, Pune',
    intro: 'Residents of Baner, Pune have convenient access to expert sports orthopedic care at I-SPORT Medical Centre, located just minutes away in Balewadi. Dr. Sumedh Magar specialises in ACL reconstruction, knee arthroscopy, shoulder surgery, and sports medicine.',
    distanceNote: 'I-SPORT Medical Centre is located in Balewadi, approximately 2–5 minutes from Baner. Accessible via Baner-Balewadi Road.',
    nearbyAreas: ['Balewadi', 'Pashan', 'Aundh', 'Sus', 'Mahalunge'],
  },
  'sports-injury-doctor-wakad': {
    name: 'Wakad',
    metaTitle: 'Sports Injury Doctor in Wakad Pune – I-SPORT Medical Centre',
    metaDescription: 'Sports injury doctor serving Wakad, Pune. Expert ACL, knee, and shoulder injury treatment by Dr. Sumedh Magar at I-SPORT Medical Centre, Balewadi, Pune.',
    heading: 'Sports Injury Doctor Serving Wakad, Pune',
    intro: 'Athletes and active residents of Wakad, Pune trust I-SPORT Medical Centre for specialist sports injury care. Dr. Sumedh Magar brings ISAKOS fellowship-level expertise in ACL reconstruction, arthroscopy, and sports rehabilitation to the Wakad-Pimpri Chinchwad corridor.',
    distanceNote: 'I-SPORT Medical Centre in Balewadi is easily accessible from Wakad via the Wakad-Balewadi road, approximately 10 minutes away.',
    nearbyAreas: ['Hinjewadi', 'Pimple Saudagar', 'Chinchwad', 'Thergaon', 'Kalewadi'],
  },
  'orthopedic-surgeon-hinjewadi': {
    name: 'Hinjewadi',
    metaTitle: 'Orthopedic Surgeon in Hinjewadi Pune – Sports Medicine Specialist',
    metaDescription: 'Orthopedic surgeon serving Hinjewadi IT Park, Pune. Dr. Sumedh Magar at I-SPORT Medical Centre provides expert sports orthopedic care for Hinjewadi residents.',
    heading: 'Orthopedic Surgeon Serving Hinjewadi, Pune',
    intro: "Hinjewadi's growing professional and athletic population has access to top-tier sports orthopedic care at I-SPORT Medical Centre, Balewadi. Dr. Sumedh Magar offers evening and weekend appointments to accommodate working professionals and serious athletes.",
    distanceNote: 'I-SPORT Medical Centre in Balewadi is approximately 10–15 minutes from Hinjewadi IT Park via NH48.',
    nearbyAreas: ['Wakad', 'Marunji', 'Maan', 'Kasarsai', 'Mann'],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area } = await params;
  const areaData = AREAS[area];
  if (!areaData) return { title: 'Page Not Found', robots: { index: false, follow: false } };
  return {
    title: areaData.metaTitle,
    description: areaData.metaDescription,
    alternates: { canonical: `${SITE_URL}/locations/${area}` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/locations/${area}`,
      title: areaData.metaTitle,
      description: areaData.metaDescription,
      images: [{ url: `${SITE_URL}/SumedhMagar.jpeg`, width: 1200, height: 630, alt: `Orthopedic doctor ${areaData.name} Pune` }],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(AREAS).map((area) => ({ area }));
}

export default async function LocationPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const areaData = AREAS[area];
  if (!areaData) notFound();

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness'],
    name: 'I-SPORT Medical Centre',
    url: SITE_URL,
    image: `${SITE_URL}/SumedhMagar.jpeg`,
    telephone: '+91-9145517171',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shp 9-13 UPPER GROUND FLOOR, Madhukosh Society',
      addressLocality: 'Balewadi',
      addressRegion: 'Pune, Maharashtra',
      postalCode: '411045',
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 18.5786803, longitude: 73.7682788 },
    openingHours: ['Mo-Sa 09:00-18:00'],
    medicalSpecialty: 'OrthopedicSurgery',
    areaServed: { '@type': 'City', name: 'Pune' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: areaData.heading, item: `${SITE_URL}/locations/${area}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen pt-20">
        <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
          <div className="container-custom max-w-5xl mx-auto">
            <nav className="flex items-center gap-1.5 text-sm text-neutral-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">{areaData.name}</span>
            </nav>
            <div className="max-w-3xl">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                I-SPORT Medical Centre
              </p>
              <h1 className="mb-4 text-4xl md:text-5xl font-bold">{areaData.heading}</h1>
              <p className="text-neutral-200 text-lg leading-relaxed mb-6">{areaData.intro}</p>
              <Link href="/contact" className="inline-flex items-center btn-primary">
                Book Appointment <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-secondary mb-4">Getting Here from {areaData.name}</h2>
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-2xl">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-neutral-700 text-sm leading-relaxed">{areaData.distanceNote}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Services Available</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { service: 'ACL Reconstruction', link: '/treatments/acl-tear-treatment-pune' },
                      { service: 'Knee Arthroscopy', link: '/treatments/knee-arthroscopy-pune' },
                      { service: 'Shoulder Arthroscopy', link: '/treatments/shoulder-arthroscopy-pune' },
                      { service: 'Meniscus Repair', link: '/treatments/meniscus-tear-treatment-pune' },
                      { service: 'Sports Rehabilitation', link: '/treatments/sports-rehabilitation-pune' },
                      { service: 'PRP Therapy', link: '/expertise' },
                    ].map(({ service, link }) => (
                      <Link key={service} href={link} className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-neutral-700 text-sm font-medium">{service}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">Also Serving Nearby Areas</h2>
                  <div className="flex flex-wrap gap-2">
                    {areaData.nearbyAreas.map((a) => (
                      <span key={a} className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-xl text-sm">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-secondary mb-4">About Dr. Sumedh Magar</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Dr. Sumedh Magar is a fellowship-trained sports orthopedic surgeon with an
                    MS in Orthopaedics and a Masters in Sports Medicine from University College
                    London (UCL). He is the Founder and Director of I-SPORT Medical Centre and
                    serves as Lead Sports Medicine Doctor for Khelo India.
                  </p>
                  <Link href="/about" className="text-primary font-semibold hover:text-primary-600 inline-flex items-center text-sm">
                    Read Full Profile <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>

              <aside className="space-y-6">
                <Card>
                  <h3 className="font-heading font-semibold text-secondary mb-4">Clinic Details</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-600 text-sm">Shp 9-13, Madhukosh Society, Balewadi, Pune 411045</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <a href="tel:+919145517171" className="text-neutral-600 text-sm hover:text-primary transition-colors">9145517171</a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-600 text-sm">Mon–Sat: 9am–6pm<br />Sunday: By appointment</span>
                    </li>
                  </ul>
                  <Link href="/contact" className="block w-full text-center btn-primary mt-4">Book Appointment</Link>
                </Card>
                <Card>
                  <h3 className="font-heading font-semibold text-secondary mb-4">Treatments</h3>
                  <ul className="space-y-2">
                    {[
                      { href: '/treatments', label: 'All Treatments' },
                      { href: '/orthopedic-surgeon-pune', label: 'Orthopedic Surgeon Pune' },
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
