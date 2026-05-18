import type { Metadata } from 'next';
import ResearchClient from './ResearchClient';

export const metadata: Metadata = {
  title: 'Research & Publications',
  description: "Dr. Sumedh Magar's research publications, paper presentations, dissertations, and conference contributions in sports medicine and orthopedics.",
};

export default function ResearchPage() {
  return <ResearchClient />;
}
