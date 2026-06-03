import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

const SITE_URL = 'https://www.sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Gallery & Media',
  description: 'Photo gallery of I-SPORT Medical Centre facilities, surgical procedures, events, and patient success stories.',
  alternates: {
    canonical: `${SITE_URL}/gallery`,
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
