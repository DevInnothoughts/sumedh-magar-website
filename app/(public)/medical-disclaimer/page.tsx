import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Disclaimer',
  description: "Medical disclaimer for Sportsurgeon.in - important information regarding the use of Dr. Sumedh Magar's sports medicine and orthopedic website.",
};

export default function MedicalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary mb-6">Medical Disclaimer</h1>

          <p className="text-neutral-600 mb-8">Last Updated: January 2024</p>

          <div className="prose prose-lg max-w-none space-y-6 text-neutral-700">
            <p>
              The information provided on Sportsurgeon.in is published by an Orthopedic Surgeon and
              Sports Medicine Specialist and is intended for general informational and educational
              purposes only. Please read this disclaimer carefully before using this website.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl my-6">
              <p className="font-semibold text-amber-800 mb-1">Important Notice</p>
              <p className="text-amber-700">
                If you are experiencing a medical emergency, severe pain, acute trauma, or any
                life-threatening condition, please call emergency services (112 in India) or go
                to the nearest emergency department immediately. Do not rely on this website for
                emergency medical guidance.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              1. Not a Substitute for Medical Advice
            </h2>
            <p>
              The content on this website, including articles, treatment descriptions, recovery
              timelines, surgical explanations, rehabilitation protocols, and all other health-related
              information, is not intended to replace professional medical advice, diagnosis, or
              treatment. Every patient&apos;s condition is unique and requires individualized evaluation
              by a qualified medical professional. Never disregard professional medical advice or delay
              seeking it because of information you have read on this website.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              2. No Automatic Doctor&ndash;Patient Relationship
            </h2>
            <p>
              Viewing this website, submitting an inquiry form, sending an email, or contacting the
              clinic does not automatically establish a doctor&ndash;patient relationship. A formal
              consultation and medical assessment, conducted in person or via an authorized tele-consultation
              platform, are required before any treatment decisions or medical recommendations are made.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              3. Individual Treatment Outcomes
            </h2>
            <p>
              Orthopedic and sports injury treatments, including surgical and non-surgical procedures,
              vary significantly depending on factors including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Age and general health status of the patient</li>
              <li>Prior medical history and co-existing conditions</li>
              <li>Severity, type, and duration of the injury</li>
              <li>Compliance with prescribed rehabilitation protocols</li>
              <li>Nutritional status and lifestyle factors</li>
              <li>Biological variability in healing response</li>
            </ul>
            <p>
              No guarantees are made regarding specific outcomes, recovery timelines, or return-to-sport
              timeframes. Results described on this website, including patient testimonials, represent
              individual experiences and may not be typical.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              4. Sports Medicine &amp; Surgical Information
            </h2>
            <p>
              Descriptions of orthopedic procedures, sports injury management, arthroscopic surgery,
              rehabilitation protocols, or recovery expectations are provided for awareness and education
              only. They should not be interpreted as personalized medical advice or used as a basis
              for self-diagnosis or self-treatment. Surgical outcomes depend on multiple individual
              patient factors that can only be assessed during a formal clinical evaluation.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              5. Orthobiologics and Regenerative Medicine
            </h2>
            <p>
              Information about platelet-rich plasma (PRP), stem cell therapies, and other regenerative
              treatments is provided for general awareness. These treatments are subject to regulatory
              oversight in India and their suitability must be individually assessed. Results and
              efficacy vary between patients. The information provided does not constitute an endorsement
              or recommendation for any specific treatment without prior clinical assessment.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              6. Emergency Medical Situations
            </h2>
            <p>
              If you are experiencing severe pain, acute trauma, fractures, dislocations, neurological
              symptoms (numbness, weakness, loss of coordination), vascular compromise, or any medical
              emergency, please seek immediate medical attention or contact local emergency services.
              Do not rely solely on website information in emergency situations.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              7. Professional Consultation Required
            </h2>
            <p>
              Patients are strongly advised to consult directly with a qualified orthopedic specialist
              or healthcare professional before:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Making any medical decisions based on information from this website</li>
              <li>Beginning or modifying any exercise or rehabilitation programme</li>
              <li>Discontinuing any prescribed medication or treatment</li>
              <li>Interpreting test results or imaging reports</li>
              <li>Deciding on surgical or non-surgical treatment options</li>
            </ul>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              8. Accuracy of Information
            </h2>
            <p>
              While we strive to provide accurate and up-to-date information, medical knowledge evolves
              continuously. The information on this website may not reflect the most current research
              or clinical guidelines. We do not warrant the completeness, accuracy, or reliability of
              any information on this website. Content is reviewed and updated periodically, but may
              not always reflect the very latest developments in medical science.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
              9. Limitation of Liability
            </h2>
            <p>
              Sportsurgeon.in, I-SPORT Medical Centre, and Dr. Sumedh Magar and its representatives
              shall not be held responsible for any loss, injury, illness, or damages&mdash;direct,
              indirect, incidental, or consequential&mdash;resulting from reliance on information
              contained on this website. Use of this website and reliance on any information provided
              is solely at your own risk.
            </p>

            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">10. Contact for Medical Enquiries</h2>
            <p>
              For medical enquiries or to book a consultation with Dr. Sumedh Magar, please contact
              I-SPORT Medical Centre directly:
            </p>
            <ul className="list-none pl-0 space-y-1">
              <li><strong>I-SPORT Medical Centre</strong></li>
              <li>Shp 9-13 Upper Ground Floor, Madhukosh Society, Balewadi, Pune 411045</li>
              <li>
                Phone:{' '}
                <a href="tel:+919145517171" className="text-primary hover:underline">
                  +91 9145517171
                </a>
              </li>
              <li>
                Email:{' '}
                <a href="mailto:sumedh@isportmedicalcentre.com" className="text-primary hover:underline">
                  sumedh@isportmedicalcentre.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
