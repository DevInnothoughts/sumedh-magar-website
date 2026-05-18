import type { Metadata } from 'next';
import SportsMedicineClient from './SportsMedicineClient';

export const metadata: Metadata = {
  title: 'Sports Medicine - Advanced Injury Care & Rehabilitation',
  description: 'Expert sports medicine care by Dr. Sumedh Magar at I-SPORT Medical Centre, Pune. ACL reconstruction, PRP therapy, return-to-sport rehabilitation for athletes.',
};

export default function SportsMedicinePage() {
  return <SportsMedicineClient />;
}
