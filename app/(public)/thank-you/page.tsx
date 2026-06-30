import type { Metadata } from 'next';
import ThankYouClient from './ThankYouClient';

const SITE_URL = 'https://www.sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Thank You | Dr. Sumedh Magar',
  description: 'Thank you for contacting Dr. Sumedh Magar at I-SPORT Medical Centre. We will get back to you shortly.',
  alternates: {
    canonical: `${SITE_URL}/thank-you`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return <ThankYouClient />;
}
