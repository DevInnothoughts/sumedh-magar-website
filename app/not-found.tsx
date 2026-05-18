import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-heading font-bold text-secondary mb-6">Page Not Found</h2>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-8 py-4 bg-primary text-white rounded-2xl font-semibold hover:bg-primary-600 transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
