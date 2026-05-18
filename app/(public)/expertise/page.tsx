import type { Metadata } from 'next';
import ExpertiseClient from './ExpertiseClient';

export const metadata: Metadata = {
  title: 'Clinical Expertise - Orthopedic Surgery & Sports Medicine',
  description: 'Comprehensive orthopedic surgery services including arthroscopy, joint replacement, ACL reconstruction, shoulder surgery, and bio-orthopedics at I-SPORT Medical Centre, Pune.',
};

export default function ExpertisePage() {
  return <ExpertiseClient />;
}
