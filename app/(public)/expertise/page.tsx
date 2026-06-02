import type { Metadata } from 'next';
import ExpertiseClient from './ExpertiseClient';

const SITE_URL = 'https://www.sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Clinical Expertise - Orthopedic Surgery & Sports Medicine',
  description: 'Comprehensive orthopedic surgery services including arthroscopy, joint replacement, ACL reconstruction, shoulder surgery, and bio-orthopedics at I-SPORT Medical Centre, Pune.',
  alternates: {
    canonical: `${SITE_URL}/expertise`,
  },
};

export default function ExpertisePage() {
  return <ExpertiseClient />;
}
