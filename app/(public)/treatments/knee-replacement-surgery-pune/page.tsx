import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Card } from '@/components/Card';
import { relatedTreatments } from '@/data/relatedtreatments';

const SITE_URL = 'https://www.sportsurgeon.in';

export const metadata: Metadata = {
  title: 'Knee Replacement Surgery in Pune | Dr. Sumedh Magar',
  description:
    'Expert ACL tear treatment and ACL reconstruction surgery in Pune by Dr. Sumedh Magar. Arthroscopic ACL surgery, sports knee specialist at I-SPORT Medical Centre, Balewadi.',
  alternates: {
    canonical: `${SITE_URL}/treatments/knee-replacement-surgery-pune`,
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
    url: `${SITE_URL}/treatments/knee-replacement-surgery-pune`,
    title: 'Knee Replacement Surgery in Pune | Dr. Sumedh Magar',
    description: 'Arthroscopic ACL reconstruction by sports knee specialist Dr. Sumedh Magar at I-SPORT Medical Centre, Pune.',
    images: [{ url: `${SITE_URL}/aclsurgery.JPG`, width: 1200, height: 630, alt: 'ACL Surgery Pune' }],
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function ACLTreatmentPage() {
  const currentPath = "/treatments/knee-replacement-surgery-pune";

  const filteredTreatments = relatedTreatments.filter(
    (item) => item.href !== currentPath
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen pt-20">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-br from-secondary to-secondary-400 text-white">
          <div className="container-custom max-w-5xl mx-auto">
            <nav className="flex items-center gap-1.5 text-sm text-neutral-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/treatments" className="hover:text-white transition-colors">Treatments</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Robotic Knee Replacement</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                  Knee Surgery Specialist
                </p>
                <h1 className="mb-4 text-4xl md:text-5xl font-bold">
                  Robotic Knee Replacement in Pune – Advanced Precision for Better Mobility
                </h1>
                {/* <p className="text-neutral-200 text-lg leading-relaxed mb-6">
                  Expert anterior cruciate ligament reconstruction using arthroscopic techniques.
                  Trusted by athletes across Maharashtra.
                </p> */}
                <Link href="/contact" className="inline-flex items-center btn-primary">
                  Book Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image
                  src="/aclsurgery.JPG"
                  alt="ACL reconstruction surgery Pune"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                {/* What is ACL */}
                <div>
                  <h2 className="text-secondary mb-4">What is Robotic Knee Replacement?</h2>
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
                        <span className="text-neutral-700">{s}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-neutral-700 leading-relaxed ">Robotic knee replacement is the best treatment option based on a complete clinical evaluation and imaging studies.</p>
                </div>

                {/* Symptoms */}
                <div>
                  <h2 className="text-secondary mb-4">Advantages of Robotic Knee Replacement</h2>
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
                  <p>
                    The artificial parts substitute for the damaged cartilage and bone surfaces.
                  </p>
                </div>

                {/* Diagnosis */}
                <ul className="space-y-4">
                  {[
                    {
                      title: "Arthritis Osteoarthritis",
                      description:
                        "Osteoarthritis, the most common reason for knee replacement, slowly wears away the cartilage in the joint causing pain, stiffness, swelling and limited mobility.",
                    },
                    {
                      title: "Rheumatoid Arthritis ",
                      description:
                        "Inflammatory joint disease may severely damage knee structures over time, making replacement surgery necessary when conservative management fails.",
                    },
                    {
                      title: "Deformity, Knee",
                      description:
                        "Robotic assisted surgery allows for precise correction of deformity in patients with arthritis and bow-legged or knock-kneed deformities.",
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium text-secondary">
                          {item.title}
                        </h4>
                        <p className="text-neutral-700 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Surgery */}
                <div>
                  <h2 className="text-secondary mb-4">Recovery After Robotic Knee Replacement</h2>
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

                {/* Recovery */}
                <div>
                  <h2 className="text-secondary mb-4">Advantages Over Conventional Knee Replacement</h2>
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
                        <span className="text-neutral-700">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-neutral-700 leading-relaxed">The skill of the orthopedic surgeon remains the most important factor for successful outcomes.</p>
                  {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { phase: 'Week 1–2', milestone: 'Walking with crutches, pain management, swelling control' },
                      { phase: 'Week 3–6', milestone: 'Full weight-bearing, range of motion restoration' },
                      { phase: 'Month 2–4', milestone: 'Strength training, proprioception exercises' },
                      { phase: 'Month 4–6', milestone: 'Running, agility, sport-specific drills' },
                      { phase: 'Month 6–9', milestone: 'Advanced training, return-to-sport testing' },
                      { phase: 'Month 9–12', milestone: 'Full competitive return with clearance' },
                    ].map(({ phase, milestone }) => (
                      <Card key={phase}>
                        <p className="font-semibold text-primary text-sm mb-1">{phase}</p>
                        <p className="text-neutral-700 text-sm">{milestone}</p>
                      </Card>
                    ))}
                  </div> */}
                </div>

                <div>
                  <h2 className="text-secondary mb-6">Is Robotic Knee Replacement Safe?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">Robotic knee replacement has become an established technique in modern orthopedic surgery in the hands of trained specialists using approved systems. It uses advanced imaging, computer-assisted planning and surgeon-controlled execution for improved accuracy.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    There are always risks with any surgery such as infection, blood clots, problems with the implant or stiffness but good patient selection and post-operative care will help minimize these risks.
                  </p>
                </div>

                <div>
                  <h2 className="text-secondary mb-6">Why Choose Dr. Sumedh Magar for Robotic Knee Replacement in Pune?</h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">The patients who opt for robotic knee replacement in Pune get the advantage of a thorough examination of their condition, proper treatment plan, and effective rehabilitation process. The orthopedist Dr. Sumedh Magar has combined his skills in the field of sports orthopedics, arthroscopy, joint reconstruction with advanced procedures aimed at making them mobile and providing high-quality life.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    Treatment plans are customized depending on patients' needs and future perspectives.
                  </p>
                </div>

                {/* FAQs */}
                <div>
                  <h2 className="text-secondary mb-6">Frequently Asked Questions</h2>
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

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <Card>
                    <h3 className="font-heading font-semibold text-secondary mb-4">Book a Consultation</h3>
                    <Link href="/contact" className="block w-full text-center btn-primary">Book Appointment</Link>
                    <a href="tel:+919145517171" className="flex items-center justify-center gap-2 mt-3 text-sm text-neutral-600 hover:text-primary transition-colors">
                      <Phone className="w-4 h-4" /> 9145517171
                    </a>
                  </Card>

                  <Card>
                    <h3 className="font-heading font-semibold text-secondary mb-4">
                      Related Treatments
                    </h3>

                    <ul className="space-y-2">
                      {filteredTreatments.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary transition-colors"
                          >
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
