import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: "Cookie policy for Sportsurgeon.in - how we use cookies on Dr. Sumedh Magar's sports medicine website.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary mb-6">Cookie Policy</h1>

          <p className="text-neutral-600 mb-8">Effective Date: January 2024</p>

          <div className="prose prose-lg max-w-none space-y-6 text-neutral-700">
            <p>
              Sportsurgeon.in uses cookies and similar tracking technologies to improve user experience
              and ensure proper website functionality. This Cookie Policy explains what cookies are,
              which cookies we use, and how you can manage them.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device (computer, tablet, or mobile
              phone) when you visit a website. They allow the website to recognize your device and
              remember certain information about your visit, such as your preferences or the contents
              of your shopping cart. Cookies cannot access any other data on your device or spread
              viruses.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">2. Types of Cookies We Use</h2>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">a) Strictly Necessary Cookies</h3>
            <p>
              These cookies are essential for the website to function correctly. They enable core
              functionality such as page navigation, form submissions, and security features. The
              website cannot function properly without these cookies, and they cannot be disabled.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">b) Performance and Analytics Cookies</h3>
            <p>
              These cookies collect information about how visitors use our website, such as which pages
              are visited most often, how long visitors stay, and any error messages encountered. We
              use Google Analytics to collect this data in an anonymized form to help us improve our
              website. No personally identifiable information is collected through these cookies.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">c) Functional Cookies</h3>
            <p>
              These cookies allow the website to remember choices you make (such as your preferred
              language or region) to provide a more personalized experience. They may also be used
              to remember changes you have made to text size, fonts, or other customizable parts of
              the website.
            </p>

            <h3 className="text-xl font-semibold text-secondary mt-6 mb-3">d) Third-Party Cookies</h3>
            <p>
              Some pages on our website may include embedded content from third-party services such
              as Google Maps and YouTube. These services may set their own cookies in accordance with
              their respective privacy and cookie policies. We do not control these third-party cookies.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">3. How We Use Cookies</h2>
            <p>We use cookies to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Enable essential website functionality and security</li>
              <li>Remember your preferences and settings across visits</li>
              <li>Analyze website traffic and usage patterns to improve performance</li>
              <li>Understand how users interact with our content</li>
              <li>Provide embedded maps and multimedia content</li>
              <li>Prevent fraudulent form submissions and spam</li>
            </ul>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">4. Cookie Retention Periods</h2>
            <p>
              Cookies are stored for varying periods depending on their purpose:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Session cookies</strong>: These are temporary and are deleted when you close
                your browser
              </li>
              <li>
                <strong>Persistent cookies</strong>: These remain on your device for a set period
                (typically 1–2 years) or until you manually delete them
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">5. Managing and Disabling Cookies</h2>
            <p>
              You can control and manage cookies through your browser settings. Most browsers allow
              you to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>View cookies stored on your device</li>
              <li>Delete all or specific cookies</li>
              <li>Block cookies from specific websites</li>
              <li>Block all cookies (not recommended, as this may break website functionality)</li>
              <li>Accept or reject cookies on a case-by-case basis</li>
            </ul>
            <p>
              Please note that disabling certain cookies may affect the functionality of our website.
              For example, if you disable strictly necessary cookies, some parts of the website may
              not work correctly.
            </p>
            <p>
              For more information on how to manage cookies in your specific browser, please refer to
              the browser&apos;s help documentation:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Google Chrome: Settings &rarr; Privacy and Security &rarr; Cookies and other site data</li>
              <li>Mozilla Firefox: Options &rarr; Privacy &amp; Security &rarr; Cookies and Site Data</li>
              <li>Safari: Preferences &rarr; Privacy &rarr; Manage Website Data</li>
              <li>Microsoft Edge: Settings &rarr; Privacy, Search, and Services &rarr; Cookies</li>
            </ul>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">6. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology or
              applicable law. Updates will be posted with a revised effective date. We encourage you
              to check this page periodically.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">7. Contact Us</h2>
            <p>
              If you have questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <ul className="list-none pl-0 space-y-1">
              <li><strong>I-SPORT Medical Centre</strong></li>
              <li>Shp 9-13 Upper Ground Floor, Madhukosh Society, Balewadi, Pune 411045</li>
              <li>
                Email:{' '}
                <a href="mailto:admin@isportmedicalcentre.com" className="text-primary hover:underline">
                  admin@isportmedicalcentre.com
                </a>
              </li>
              <li>
                Phone:{' '}
                <a href="tel:+919145517171" className="text-primary hover:underline">
                  +91 9145517171
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
