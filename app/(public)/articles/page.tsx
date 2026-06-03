import type { Metadata } from 'next';
import ArticlesClient from './ArticlesClient';

const SITE_URL = 'https://www.sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Articles & Insights',
  description: 'Expert articles on sports medicine, orthopedic surgery, ACL reconstruction, and athlete recovery by Dr. Sumedh Magar.',
  alternates: {
    canonical: `${SITE_URL}/articles`,
  },
};

export default function ArticlesPage() {
  return <ArticlesClient />;
}
