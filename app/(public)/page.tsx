import type { Metadata } from 'next';
import HomeClient from './HomeClient';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Dr. Sumedh Magar – Sports Orthopedic Surgeon | I-Sport Medical Centre Pune',
  description:
    'Dr. Sumedh Magar – MS Orthopaedics, Masters in Sports Medicine (UCL, UK), ISAKOS Fellowship. Founder & Director I-SPORT Medical Centre Pune. Expert in ACL reconstruction, knee surgery, arthroscopy & joint preservation.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Dr. Sumedh Magar – Sports Orthopedic Surgeon | Pune',
    description:
      'Founder & Director I-SPORT Medical Centre. MS Orthopaedics, Masters Sports Medicine UCL London, ISAKOS Fellowship. Expert in ACL reconstruction, arthroscopy & joint preservation.',
    images: [
      {
        url: `${SITE_URL}/SumedhMagar.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Dr. Sumedh Magar – Sports Orthopedic Surgeon Pune',
      },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Dr. Sumedh Magar specialised in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dr. Sumedh Magar is a sports orthopedic surgeon specialising in ACL reconstruction, knee arthroscopy, shoulder surgery, hip surgery, joint replacement, and bio-orthopedics (PRP, stem cell therapy) at I-SPORT Medical Centre, Pune.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is I-SPORT Medical Centre located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I-SPORT Medical Centre is located in Pune, Maharashtra, India. Dr. Sumedh Magar is the Founder & Director.',
      },
    },
    {
      '@type': 'Question',
      name: 'What qualifications does Dr. Sumedh Magar hold?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dr. Sumedh Magar holds MS Orthopaedics, a Masters in Sports Medicine from University College London (UCL), UK, and an ISAKOS Fellowship. He is also the Lead Sports Medicine doctor for Khelo India.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I book an appointment with Dr. Sumedh Magar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can book an appointment via the Contact page on this website, or visit I-SPORT Medical Centre, Pune directly.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient />
    </>
  );
}
