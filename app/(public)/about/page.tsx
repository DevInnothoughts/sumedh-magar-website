import type { Metadata } from 'next';
import AboutClient from './AboutClient';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'About Dr. Sumedh Magar – Sports Orthopedic Surgeon Pune',
  description:
    "Learn about Dr. Sumedh Magar's education, professional experience, and achievements as a sports orthopedic surgeon with international training from UCL London.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: 'profile',
    url: `${SITE_URL}/about`,
    title: 'About Dr. Sumedh Magar – Sports Orthopedic Surgeon',
    description:
      "MS Orthopaedics, Masters Sports Medicine UCL London, ISAKOS Fellowship. Founder & Director I-SPORT Medical Centre Pune.",
    images: [{ url: `${SITE_URL}/SumedhMagar.jpeg`, width: 1200, height: 630, alt: 'Dr. Sumedh Magar' }],
  },
};

const physicianSchema = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: 'Dr. Sumedh Magar',
  url: SITE_URL,
  image: `${SITE_URL}/SumedhMagar.jpeg`,
  jobTitle: 'Sports Orthopedic Surgeon & Founder, I-SPORT Medical Centre',
  description:
    'MS Orthopaedics, Masters in Sports Medicine (UCL, UK), ISAKOS Fellowship. Founder & Director I-SPORT Medical Centre Pune. Lead Sports Medicine, Khelo India.',
  medicalSpecialty: 'OrthopedicSurgery',
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University College London (UCL)', sameAs: 'https://www.ucl.ac.uk' },
  ],
  memberOf: { '@type': 'MedicalOrganization', name: 'ISAKOS' },
  worksFor: {
    '@type': 'MedicalOrganization',
    name: 'I-SPORT Medical Centre',
    address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressRegion: 'Maharashtra', addressCountry: 'IN' },
  },
  knowsAbout: ['ACL Reconstruction', 'Knee Arthroscopy', 'Shoulder Surgery', 'Hip Surgery', 'Joint Replacement', 'PRP Therapy', 'Sports Medicine'],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
      />
      <AboutClient />
    </>
  );
}
