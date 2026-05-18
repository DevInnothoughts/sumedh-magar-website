import type { Metadata } from 'next';
import ArticlesClient from './ArticlesClient';

export const metadata: Metadata = {
  title: 'Articles & Insights',
  description: 'Expert articles on sports medicine, orthopedic surgery, ACL reconstruction, and athlete recovery by Dr. Sumedh Magar.',
};

export default function ArticlesPage() {
  return <ArticlesClient />;
}
