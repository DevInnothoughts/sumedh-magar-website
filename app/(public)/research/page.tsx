import type { Metadata } from 'next';
import ResearchClient from './ResearchClient';

const SITE_URL = 'https://sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Research & Publications',
  description: "Dr. Sumedh Magar's research publications, paper presentations, dissertations, and conference contributions in sports medicine and orthopedics.",
  alternates: {
    canonical: `${SITE_URL}/research`,
  },
};

export default function ResearchPage() {
  return <ResearchClient />;
}
