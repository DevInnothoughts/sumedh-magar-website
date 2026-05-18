import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery & Media',
  description: 'Photo gallery of I-SPORT Medical Centre facilities, surgical procedures, events, and patient success stories.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
