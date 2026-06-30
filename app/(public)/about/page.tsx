import type { Metadata } from 'next';
import AboutClient from './AboutClient';

const SITE_URL = 'https://www.sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Meet Dr. Sumedh Magar | Best Orthopedic & Sports Medicine Doctor in Pune',
  description:
    "Looking for expert orthopedic care in Pune? Dr. Sumedh Magar offers sports medicine, robotic knee replacement, arthroscopy, shoulder surgery, hip surgery, and personalized treatment for athletes and active individuals.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    type: 'profile',
    url: `${SITE_URL}/about`,
    title: 'About Dr. Sumedh Magar – Sports Orthopedic Surgeon',
    description:
      "MS Orthopaedics, Masters Sports Medicine UCL London, ISAKOS Fellowship. Founder & Director I-SPORT Medical Centre Pune.",
    images: [{ url: `${SITE_URL}/SumedhMagar.jpeg`, width: 1200, height: 630, alt: 'Dr. Sumedh Magar' }],
  },
  robots: {
    index: true,
    follow: true,
    // maxImagePreview: 'large',
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    // maxSnippet: -1,
    // maxVideoPreview: -1,
  },
};

const schema =
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Physician",
      "@id": "https://www.sportsurgeon.in/#physician",
      "name": "Dr. Sumedh Magar",
      "url": "https://www.sportsurgeon.in/",
      "image": "https://www.sportsurgeon.in/_next/image?url=%2Faclsurgery.JPG&w=1080&q=75",
      "jobTitle": "Sports Orthopedic Surgeon",
      "medicalSpecialty": [
        "Orthopedic",
        "Sports Medicine"
      ],
      "description": "Dr. Sumedh Magar is a Sports Orthopedic Surgeon in Pune specializing in sports medicine, robotic knee replacement, arthroscopy, shoulder surgery, hip surgery, and joint replacement.",
      "telephone": "+91-9145517171",
      "email": "sumedh@isportmedicalcentre.com",
      "worksFor": {
        "@type": "MedicalClinic",
        "name": "I-SPORT Medical Centre"
      }
    },
    {
      "@type": "MedicalClinic",
      "@id": "https://www.sportsurgeon.in/#clinic",
      "name": "I-SPORT Medical Centre",
      "url": "https://www.sportsurgeon.in/",
      "telephone": "+91-9145517171",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop 9-13, Upper Ground Floor, Madhukosh Society, Balewadi",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411045",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.sportsurgeon.in/#website",
      "url": "https://www.sportsurgeon.in/",
      "name": "Dr. Sumedh Magar",
      "publisher": {
        "@id": "https://www.sportsurgeon.in/#clinic"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.sportsurgeon.in/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}


// const physicianSchema = {
//   '@context': 'https://schema.org',
//   '@type': 'Physician',
//   name: 'Dr. Sumedh Magar',
//   url: SITE_URL,
//   image: `${SITE_URL}/SumedhMagar.jpeg`,
//   jobTitle: 'Sports Orthopedic Surgeon & Founder, I-SPORT Medical Centre',
//   description:
//     'MS Orthopaedics, Masters in Sports Medicine (UCL, UK), ISAKOS Fellowship. Founder & Director I-SPORT Medical Centre Pune. Lead Sports Medicine, Khelo India.',
//   medicalSpecialty: 'OrthopedicSurgery',
//   alumniOf: [
//     { '@type': 'CollegeOrUniversity', name: 'University College London (UCL)', sameAs: 'https://www.ucl.ac.uk' },
//   ],
//   memberOf: { '@type': 'MedicalOrganization', name: 'ISAKOS' },
//   worksFor: {
//     '@type': 'MedicalOrganization',
//     name: 'I-SPORT Medical Centre',
//     address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressRegion: 'Maharashtra', addressCountry: 'IN' },
//   },
//   knowsAbout: ['ACL Reconstruction', 'Knee Arthroscopy', 'Shoulder Surgery', 'Hip Surgery', 'Joint Replacement', 'PRP Therapy', 'Sports Medicine'],
// };

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AboutClient />
    </>
  );
}
