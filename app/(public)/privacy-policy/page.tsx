import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: "Privacy policy for Sportsurgeon.in - Dr. Sumedh Magar's practice.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary mb-6">Privacy Policy</h1>

          <p className="text-neutral-600 mb-8">Effective Date: January 2024</p>

          <div className="prose prose-lg max-w-none space-y-6 text-neutral-700">
            <p>
              Sportsurgeon.in (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy and
              confidentiality of our patients and website visitors. This Privacy Policy explains how we
              collect, use, store, and protect personal information when you use our website and services.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                Personal details such as name, phone number, email address, age, and medical concern
                submitted through forms or appointment requests.
              </li>
              <li>
                Patient-related information voluntarily provided for consultation, diagnosis, or treatment
                coordination.
              </li>
              <li>
                Basic technical data such as IP address, browser type, and cookies for website functionality
                and analytics.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">2. Purpose of Data Collection</h2>
            <p className="mb-4">The information collected is used only for:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                Contacting patients regarding appointments, consultations, or medical services.
              </li>
              <li>
                Maintaining patient records required for service delivery and follow-up communication.
              </li>
              <li>Improving website functionality and user experience.</li>
            </ul>
            <p>We do not sell, rent, or trade patient personal data to third parties.</p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">3. Data Sharing</h2>
            <p className="mb-4">Patient information may be shared only when necessary:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                With authorized medical staff or service personnel for treatment or consultation purposes.
              </li>
              <li>When required by law, regulation, or legal process.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">4. Data Storage and Security</h2>
            <p>
              We implement reasonable administrative and technical safeguards to protect personal and
              medical information from unauthorized access, disclosure, or misuse. However, no internet
              transmission is completely secure. We use industry-standard encryption (SSL/TLS) for data
              transmitted through our website. Patient data is stored on secure servers with restricted
              access controls.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">5. Cookies and Tracking</h2>
            <p>
              Our website may use cookies or similar technologies for website functionality and basic
              analytics. These do not collect sensitive medical details. You may configure your browser
              to decline cookies, though this may affect certain website features. We use analytics
              tools such as Google Analytics to understand website usage patterns in an anonymized manner.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">6. Data Retention</h2>
            <p>
              We retain patient information only for as long as necessary to provide services and comply
              with legal requirements under applicable Indian law, including the Indian Medical Council
              regulations that require patient records to be maintained for a minimum period. Non-medical
              contact data is retained for up to 3 years unless you request earlier deletion.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">7. Right to Access or Delete Data</h2>
            <p>
              Patients may request access, correction, or deletion of their personal data by contacting
              the service desk using the contact details provided on Sportsurgeon.in. We will respond to
              such requests within 30 days. Certain information may be retained as required by applicable
              law or for legitimate medical record-keeping purposes.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">8. Third-Party Services</h2>
            <p>
              If analytics or advertising tools are used, they may collect limited technical data under
              their own privacy policies. We use Supabase for secure data storage. Our website may embed
              content from third parties (e.g., Google Maps, YouTube) which may set their own cookies
              according to their respective privacy policies.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">9. Children&apos;s Privacy</h2>
            <p>
              Information related to minors is collected only with guardian involvement. Parents or legal
              guardians must provide consent before any personal data of minors under 18 years is collected
              or processed. Treatment records for minor patients will be shared with the responsible
              guardian upon request.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">10. Cross-Border Data Transfers</h2>
            <p>
              Your data is primarily stored and processed within India. In the event that any data
              processing occurs outside India, we ensure appropriate safeguards are in place in compliance
              with applicable data protection laws.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">11. Updates to This Policy</h2>
            <p>
              Changes will be posted with a revised effective date. We encourage you to review this policy
              periodically. Continued use of the website after any changes indicates your acceptance of
              the updated policy.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">12. Contact Us</h2>
            <p>
              For privacy-related concerns or data requests, please contact us at:
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
