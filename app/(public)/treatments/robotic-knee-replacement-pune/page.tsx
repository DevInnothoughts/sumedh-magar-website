import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';
import { relatedTreatments } from '@/data/relatedtreatments';

const SITE_URL = 'https://www.sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Best Robotic Knee Replacement Hospital in Pune | Dr. Sumedh Magar ',
  description:
    'Consult Dr. Sumedh Magar for robotic knee replacement surgery in Pune. Experience advanced robotic technology, accurate implant positioning, reduced pain, and quicker recovery.',
  alternates: {
    canonical: `${SITE_URL}/treatments/robotic-knee-replacement-pune`,
  },
  keywords: [
    'ACL tear treatment Pune',
    'ACL reconstruction Pune',
    'ACL surgeon Pune',
    'sports knee injury Pune',
    'ACL surgery Balewadi',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/treatments/robotic-knee-replacement-pune`,
    title: 'Robotic Knee Replacement Surgery in Pune | Dr. Sumedh Magar',
    description: 'Arthroscopic ACL reconstruction by sports knee specialist Dr. Sumedh Magar at I-SPORT Medical Centre, Pune.',
    images: [{ url: `${SITE_URL}/aclsurgery.JPG`, width: 1200, height: 630, alt: 'ACL Surgery Pune' }],
  },
  "robots": {
    "index": true,
    "follow": true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const faqs = [
  {
    q: 'How long does robotic knee replacement surgery take?',
    a: 'The procedure typically lasts between one and two hours, depending on the complexity of the case and whether one or both knees are being treated.',
  },
  {
    q: 'How soon can I walk after surgery?',
    a: 'Many patients begin standing and walking with assistance shortly after surgery under the supervision of their healthcare team and physiotherapists.',
  },
  {
    q: 'Can I return to normal activities?',
    a: 'Most patients can resume everyday activities after rehabilitation, although high-impact sports and strenuous activities should only be undertaken based on medical advice.',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Treatments', item: `${SITE_URL}/treatments` },
    { '@type': 'ListItem', position: 3, name: 'Knee Replacement Surgery', item: `${SITE_URL}/treatments/knee-replacement-surgery-pune` },
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": "https://www.sportsurgeon.in/treatments/robotic-knee-replacement-pune#webpage",
      "url": "https://www.sportsurgeon.in/treatments/robotic-knee-replacement-pune",
      "name": "Robotic Knee Replacement in Pune",
      "description": "Learn about robotic knee replacement surgery in Pune performed by Dr. Sumedh Magar using advanced robotic-assisted technology for improved precision and recovery.",
      "mainEntity": {
        "@id": "https://www.sportsurgeon.in/treatments/robotic-knee-replacement-pune#service"
      }
    },
    {
      "@type": "MedicalProcedure",
      "@id": "https://www.sportsurgeon.in/treatments/robotic-knee-replacement-pune#service",
      "name": "Robotic Knee Replacement",
      "procedureType": "Robot-Assisted Knee Replacement Surgery",
      "bodyLocation": "Knee",
      "howPerformed": "Robot-assisted knee replacement surgery using advanced surgical planning and precision-guided implant placement.",
      "performedBy": {
        "@type": "Physician",
        "name": "Dr. Sumedh Magar",
        "medicalSpecialty": [
          "Orthopedic",
          "Sports Medicine"
        ]
      }
    },
    {
      "@type": "Physician",
      "@id": "https://www.sportsurgeon.in/#physician",
      "name": "Dr. Sumedh Magar",
      "jobTitle": "Sports Orthopedic Surgeon",
      "url": "https://www.sportsurgeon.in/",
      "medicalSpecialty": [
        "Orthopedic",
        "Sports Medicine"
      ]
    }
  ]
};

export default function ACLTreatmentPage() {
  const currentPath = "/treatments/robotic-knee-replacement-pune";

  const filteredTreatments = relatedTreatments.filter(
    (item) => item.href !== currentPath
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="min-h-screen">

        {/* HERO SECTION CONFIGURATION */}
        <section
          className="relative text-white flex items-center mt-20"
          style={{
            backgroundImage: "url('/robotic Knee Surgery.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "75% center",
            minHeight: "calc(100vw * (480 / 1440))",
            height: "auto",
            maxHeight: "560px",
          }}
        >
          <div className="relative mx-auto w-full max-w-[1350px] px-6 md:px-12 lg:px-16 py-20 md:py-28">

            <nav className="flex items-center flex-wrap gap-1.5 text-sm text-neutral-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/treatments" className="hover:text-white transition-colors">Treatments</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Robotic Knee Replacement</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="mt-6 font-[Fraunces] text-3xl font-semibold leading-tight md:text-5xl text-white">
                Robotic Knee Replacement in Pune – <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent">
                  Advanced Precision for Better Mobility
                </span>
              </h1>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-teal-300">
                  Book Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Core Layout Content Block */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">What is Robotic Knee Replacement?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Robotic knee replacement is a state-of-the-art joint replacement surgery that couples the skill of an orthopedic surgeon with robotic-assisted technology to enhance the accuracy of the procedure. The robotic system allows for a personalized surgical plan based on the patient's anatomy and guides precise implant placement while preserving healthy bone and soft tissue whenever possible.
                  </p>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Contrary to popular opinion, the robot doesn’t do the operation on its own. “The surgeon is in complete control during the entire procedure, utilizing the robotic platform as a very precise guide to obtain the best alignment and balance.
                  </p>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Robotic knee replacement can give dependable pain relief and enhanced mobility for patients with advanced knee arthritis, chronic pain or substantial loss of function when conservative measures are no longer effective. The content and style are based on the reference website’s structure and method of teaching.
                  </p>

                  <ul className="space-y-3 mb-4">
                    {[
                      'Who is a candidate for robotic knee replacement surgery?',
                      'A robotic-assisted knee replacement may be an option for patients who continue to have knee pain that limits their ability to walk, climb stairs or perform daily activities despite medications, physical therapy, injections or lifestyle changes.',
                      'Common conditions where robotic knee replacement might be necessary include:',
                      'Severe osteoarthritis of the knee',
                      'Rheumatoid arthritis of the knee joint',
                      'Post-traumatic arthritis from prior injuries',
                      'Severe loss of cartilage with bone touching bone',
                      'Arthritic deformities of the knee',
                      'Failure of nonsurgical treatment for chronic knee pain'
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-neutral-700 leading-relaxed">Robotic knee replacement is the best treatment option based on a complete clinical evaluation and imaging studies.</p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Advantages of Robotic Knee Replacement</h2>
                  <p className='text-neutral-700 leading-relaxed mb-4'>Robotic-assisted technology offers better planning and surgical accuracy than traditional techniques. The objective is to improve the performance and the longevity of the knee, through accurate implant positioning and soft tissue balancing.
                  </p>
                  <p className='text-neutral-700 leading-relaxed mb-4'>
                    Benefits include less post-operative pain, better joint alignment, increased implant accuracy, preservation of healthy tissues, faster functional recovery and higher patient satisfaction But how well each person does depends on their overall health, rehabilitation and how well they follow the instructions after surgery.
                  </p>
                  <p className='text-secondary mb-3'><strong>How the Process Works</strong></p>
                  <p className='text-neutral-700 leading-relaxed mb-2'>Before surgery, advanced imaging is used to create a 3-D model of the patient’s knee. This allows the surgeon to create a personalized surgical plan that is specific to the individual's anatomy.
                  </p>
                  <p className='text-neutral-700 leading-relaxed mb-2'>
                    During the operation the robotic system gives real-time feedback and assists in precise bone preparation according to planned implant positioning. The surgeon supervises and directs each step making sure that it is correct and appropriate for the patient’s specific needs.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    The artificial parts substitute for the damaged cartilage and bone surfaces.
                  </p>
                </div>

                <div>
                  <ul className="space-y-4">
                    {[
                      {
                        title: "Arthritis Osteoarthritis",
                        description: "Osteoarthritis, the most common reason for knee replacement, slowly wears away the cartilage in the joint causing pain, stiffness, swelling and limited mobility.",
                      },
                      {
                        title: "Rheumatoid Arthritis ",
                        description: "Inflammatory joint disease may severely damage knee structures over time, making replacement surgery necessary when conservative management fails.",
                      },
                      {
                        title: "Deformity, Knee",
                        description: "Robotic assisted surgery allows for precise correction of deformity in patients with arthritis and bow-legged or knock-kneed deformities.",
                      },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-medium text-secondary">{item.title}</h4>
                          <p className="text-neutral-700 mt-1">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Recovery After Robotic Knee Replacement</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Supervised mobilization and physiotherapy, soon after surgery, initiates the recovery process. Many patients are encouraged to get up and move about, with assistance, very soon after the procedure.
                  </p>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Early rehabilitation focuses on controlling pain, improving the range of motion, strengthening muscles and restoring the ability to walk. Over the following weeks and months, patients slowly return to their normal activities under tailored rehabilitation programs.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    While many people notice marked improvements within weeks, full recovery and adjustment to the new joint can take several months.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-4">Advantages Over Conventional Knee Replacement</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">Robotic-assisted surgery is an advanced technology that helps improve surgical planning and execution. It may deliver, compared to traditional approaches:</p>
                  <ul className="space-y-3 mb-4">
                    {[
                      'Individual pre-operative planning',
                      'More precise implant placement',
                      'Improved soft tissue orientation',
                      'Less variation during surgery',
                      'Possibility of better knee function',
                      'Improved consistency in implant placement'
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-neutral-700 leading-relaxed">The skill of the orthopedic surgeon remains the most important factor for successful outcomes.</p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-6">Is Robotic Knee Replacement Safe?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">Robotic knee replacement has become an established technique in modern orthopedic surgery in the hands of trained specialists using approved systems. It uses advanced imaging, computer-assisted planning and surgeon-controlled execution for improved accuracy.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    There are always risks with any surgery such as infection, blood clots, problems with the implant or stiffness but good patient selection and post-operative care will help minimize these risks.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-6">Why Choose Dr. Sumedh Magar for Robotic Knee Replacement in Pune?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">The patients who opt for robotic knee replacement in Pune get the advantage of a thorough examination of their condition, proper treatment plan, and effective rehabilitation process. The orthopedist Dr. Sumedh Magar has combined his skills in the field of sports orthopedics, arthroscopy, joint reconstruction with advanced procedures aimed at making them mobile and providing high-quality life.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    Treatment plans are customized depending on patients' needs and future perspectives.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary font-bold text-xl md:text-2xl mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map(({ q, a }) => (
                      <Card key={q}>
                        <h3 className="font-semibold text-secondary mb-2 text-base">{q}</h3>
                        <p className="text-neutral-700 text-sm leading-relaxed">{a}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <Card>
                    <h3 className="font-heading font-semibold text-secondary mb-4">Book a Consultation</h3>
                    {/* Explicit layout overrides using flex centering, text tracking, and custom padding to ensure safe single line placement */}
                    <Link
                      href="/contact"
                      className="flex items-center justify-center w-full text-center bg-teal-400 text-slate-950 font-semibold py-3 px-1 rounded-md hover:bg-teal-300 transition-colors tracking-tight text-sm md:text-base"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Book Appointment
                    </Link>
                    <a href="tel:+919145517171" className="flex items-center justify-center gap-2 mt-3 text-sm text-neutral-600 hover:text-primary transition-colors">
                      <Phone className="w-4 h-4" /> 9145517171
                    </a>
                  </Card>

                  <Card>
                    <h3 className="font-heading font-semibold text-secondary mb-4">Related Treatments</h3>
                    <ul className="space-y-2">
                      {filteredTreatments.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary transition-colors">
                            <ChevronRight className="w-4 h-4 text-primary" />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </aside>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}