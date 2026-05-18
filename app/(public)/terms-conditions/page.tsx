import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: "Terms and conditions for using Sportsurgeon.in - Dr. Sumedh Magar's sports medicine and orthopedic practice website.",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary mb-6">Terms &amp; Conditions</h1>

          <p className="text-neutral-600 mb-8">Effective Date: January 2024</p>

          <div className="prose prose-lg max-w-none space-y-6 text-neutral-700">
            <p>
              By accessing and using Sportsurgeon.in, you agree to be bound by these Terms &amp; Conditions.
              Please read them carefully before using this website. If you do not agree to these terms,
              please do not use this website.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">1. Medical Information Disclaimer</h2>
            <p>
              The content on this website, including articles, treatment descriptions, recovery timelines,
              surgical explanations, and all other health-related information, is for informational and
              educational purposes only and does not constitute medical advice, diagnosis, or treatment.
              Always seek the advice of a qualified healthcare professional with any questions you may have
              regarding a medical condition.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">2. No Doctor-Patient Relationship</h2>
            <p>
              Using this website, submitting enquiry forms, or sending emails does not establish a
              doctor-patient relationship. A formal consultation and in-person or tele-consultation
              with Dr. Sumedh Magar or any member of the I-SPORT Medical Centre team is required before
              any medical assessment or treatment decisions are made.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">3. Accuracy of Information Provided by Users</h2>
            <p>
              Users agree to provide accurate, current, and complete information when submitting forms,
              appointment requests, or contact inquiries. Providing false or misleading information may
              result in denial of service or delayed/incorrect medical guidance.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">4. Appointment Bookings</h2>
            <p>
              Submitting an appointment request through this website does not guarantee a confirmed
              appointment. Appointments are subject to availability and will be confirmed by the clinic
              team via phone or email. We request at least 24 hours&apos; notice for cancellations or
              rescheduling.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">5. Intellectual Property</h2>
            <p>
              All website content, including text, images, graphics, logos, article content, videos,
              and other materials, is the intellectual property of Sportsurgeon.in and I-SPORT Medical
              Centre unless otherwise stated. Reproduction, redistribution, or use of any content without
              prior written permission is strictly prohibited.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">6. User Conduct</h2>
            <p>Users agree not to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Use the website for any unlawful purpose or in violation of any regulations</li>
              <li>Submit spam, unsolicited communications, or offensive content through contact forms</li>
              <li>
                Attempt to gain unauthorized access to any part of the website or its underlying systems
              </li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person</li>
              <li>
                Scrape, harvest, or collect data from this website using automated means without prior
                written consent
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">7. Limitation of Liability</h2>
            <p>
              Sportsurgeon.in, I-SPORT Medical Centre, and Dr. Sumedh Magar shall not be liable for any
              direct, indirect, incidental, consequential, or special damages arising from the use of or
              inability to use this website or its content. This includes, without limitation, damages
              resulting from reliance on information obtained through the website.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">8. Third-Party Links</h2>
            <p>
              The website may contain links to third-party websites or services. These links are provided
              for convenience only. We are not responsible for the content, accuracy, or privacy practices
              of any third-party websites. Visiting linked websites is at your own risk.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">9. Testimonials and Reviews</h2>
            <p>
              Patient testimonials and reviews published on this website represent individual experiences
              and are not a guarantee of similar outcomes. Individual results may vary based on patient
              history, injury type, compliance with treatment, and other medical factors.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">10. Governing Law</h2>
            <p>
              These Terms &amp; Conditions are governed by the laws of India. Any disputes arising out of
              or in connection with these terms shall be subject to the exclusive jurisdiction of the
              courts in Pune, Maharashtra, India.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">11. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time without prior notice. Changes will
              be posted on this page with a revised effective date. Your continued use of the website
              after any modifications constitutes your acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">12. Contact</h2>
            <p>For questions regarding these Terms &amp; Conditions, please contact:</p>
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
