import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from './providers';

const montserrat = localFont({
  src: [
    {
      path: '../public/fonts/montserrat/Montserrat-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/montserrat/Montserrat-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/montserrat/Montserrat-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-montserrat',
  display: 'swap',
});

const openSans = localFont({
  src: [
    {
      path: '../public/fonts/open-sans/OpenSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/open-sans/OpenSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/open-sans/OpenSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-open-sans',
  display: 'swap',
});

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Dr. Sumedh Magar – Sports Orthopedic Surgeon | I-Sport Medical Centre Pune',
    template: '%s | Dr. Sumedh Magar',
  },
  description:
    'Dr. Sumedh Magar – MS Orthopaedics, Masters in Sports Medicine (UCL, UK), ISAKOS Fellowship. Founder & Director I-SPORT Medical Centre Pune. Lead Sports Medicine, Khelo India.',
  // keywords: [
  //   'sports orthopedic surgeon pune',
  //   'ACL reconstruction pune',
  //   'knee surgery pune',
  //   'sports medicine pune',
  //   'Dr Sumedh Magar',
  //   'I-SPORT Medical Centre',
  //   'arthroscopy surgeon pune',
  //   'joint replacement pune',
  //   'PRP therapy pune',
  // ],
  authors: [{ name: 'Dr. Sumedh Magar', url: SITE_URL }],
  creator: 'Dr. Sumedh Magar',
  publisher: 'I-SPORT Medical Centre',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Dr. Sumedh Magar – Sports Orthopedic Surgeon',
    title: 'Dr. Sumedh Magar – Sports Orthopedic Surgeon | Pune',
    description:
      'Founder & Director I-SPORT Medical Centre. MS Orthopaedics, Masters Sports Medicine UCL London, ISAKOS Fellowship. Expert in ACL reconstruction, arthroscopy & joint preservation.',
    images: [
      {
        url: '/SumedhMagar.jpeg',
        width: 1200,
        height: 630,
        alt: 'Dr. Sumedh Magar – Sports Orthopedic Surgeon Pune',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Sumedh Magar – Sports Orthopedic Surgeon | Pune',
    description:
      'MS Orthopaedics, Masters Sports Medicine UCL London. Expert in ACL reconstruction, arthroscopy, joint replacement & sports injury management.',
    images: ['/SumedhMagar.jpeg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'I-SPORT Medical Centre',
  url: SITE_URL,
  logo: `${SITE_URL}/SumedhMagar.jpeg`,
  telephone: '+91-9595-9595-XX',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'I-SPORT Medical Centre',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    postalCode: '411001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 18.5786803,
    longitude: 73.7682788,
  },
  sameAs: ['https://www.google.com/maps/place/I-SPORT+Hospital+:+Orthopedic+and+Sports+Medicine/@18.5786803,73.7682788,17z'],
  medicalSpecialty: ['OrthopedicSurgery', 'SportsMedicine'],
  employee: {
    '@type': 'Physician',
    name: 'Dr. Sumedh Magar',
    jobTitle: 'Sports Orthopedic Surgeon & Founder',
    url: SITE_URL,
    image: `${SITE_URL}/SumedhMagar.jpeg`,
    description: 'MS Orthopaedics, Masters in Sports Medicine (UCL, UK), ISAKOS Fellowship. Founder & Director I-SPORT Medical Centre Pune.',
    medicalSpecialty: 'OrthopedicSurgery',
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'University College London (UCL)' },
    ],
    memberOf: { '@type': 'MedicalOrganization', name: 'ISAKOS' },
    worksFor: { '@type': 'MedicalOrganization', name: 'I-SPORT Medical Centre, Pune' },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17761397613"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17761397613');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
