import type { Metadata } from 'next';
import ContactClient from './ContactClient';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Contact Us - Book an Appointment with Dr. Sumedh Magar',
  description:
    'Book an appointment with Dr. Sumedh Magar at I-SPORT Medical Centre, Pune. Contact us for sports orthopedic consultations, ACL surgery, knee treatment and more.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    url: `${SITE_URL}/contact`,
    title: 'Contact Dr. Sumedh Magar – I-SPORT Medical Centre Pune',
    description: 'Book a consultation with Dr. Sumedh Magar. Specialising in sports orthopedics, ACL reconstruction, knee & shoulder surgery.',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'I-SPORT Medical Centre',
  url: SITE_URL,
  telephone: '+919145517171',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Balewadi',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    postalCode: '411045',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 18.5786803, longitude: 73.7682788 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '18:00' },
  ],
  sameAs: ['https://www.google.com/maps/place/I-SPORT+Hospital+:+Orthopedic+and+Sports+Medicine/@18.5786803,73.7682788,17z'],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ContactClient />
    </>
  );
}
