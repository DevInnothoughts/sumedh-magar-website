import type { Metadata } from 'next';
import HomeClient from './HomeClient';

const SITE_URL = 'https://www.sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Orthopedic & Sports Medicine Doctor in Pune | Dr. Sumedh Magar ',
  description:
    'Consult Dr. Sumedh Magar, a leading Sports Orthopedic Surgeon in Pune, specializing in sports medicine, robotic knee replacement, arthroscopy, shoulder surgery, joint replacement, and advanced orthopedic care for faster recovery.',
  alternates: {
    canonical: `${SITE_URL}`,
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}`,
    title: 'Dr. Sumedh Magar – Sports Orthopedic Surgeon | Pune',
    description:
      ' ISAKOS Fellowship. Expert in ACL reconstruction, arthroscopy & joint preservation.',
    images: [
      {
        url: `${SITE_URL}/SumedhMagar.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Dr. Sumedh Magar – Sports Orthopedic Surgeon Pune',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    // maxImagePreview: 'large',
    // maxSnippet: -1,
    // maxVideoPreview: -1,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};


const schema = {
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
};

// const faqSchema = {
//   '@context': 'https://schema.org',
//   '@type': 'FAQPage',
//   mainEntity: [
//     {
//       '@type': 'Question',
//       name: 'What is Dr. Sumedh Magar specialised in?',
//       acceptedAnswer: {
//         '@type': 'Answer',
//         text: 'Dr. Sumedh Magar is a sports orthopedic surgeon specialising in ACL reconstruction, knee arthroscopy, shoulder surgery, hip surgery, joint replacement, and bio-orthopedics (PRP, stem cell therapy) at I-SPORT Medical Centre, Pune.',
//       },
//     },
//     {
//       '@type': 'Question',
//       name: 'Where is I-SPORT Medical Centre located?',
//       acceptedAnswer: {
//         '@type': 'Answer',
//         text: 'I-SPORT Medical Centre is located in Pune, Maharashtra, India. Dr. Sumedh Magar is the Founder & Director.',
//       },
//     },
//     {
//       '@type': 'Question',
//       name: 'What qualifications does Dr. Sumedh Magar hold?',
//       acceptedAnswer: {
//         '@type': 'Answer',
//         text: 'Dr. Sumedh Magar holds MS Orthopaedics, a Masters in Sports Medicine from University College London (UCL), UK, and an ISAKOS Fellowship. He is also the Lead Sports Medicine doctor for Khelo India.',
//       },
//     },
//     {
//       '@type': 'Question',
//       name: 'How can I book an appointment with Dr. Sumedh Magar?',
//       acceptedAnswer: {
//         '@type': 'Answer',
//         text: 'You can book an appointment via the Contact page on this website, or visit I-SPORT Medical Centre, Pune directly.',
//       },
//     },
//   ],
// };

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HomeClient />
    </>
  );
}
