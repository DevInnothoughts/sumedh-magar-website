"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trophy,
  GraduationCap,
  Stethoscope,
  Building2,
  HeartPulse,
  Activity,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
   Award,
} from "lucide-react";


const expertise = [
  "Sports Medicine",
  "Sports Injury Management",
  "ACL Reconstruction",
  "Meniscus Repair & Preservation",
  "Shoulder Arthroscopy",
  "Knee Arthroscopy",
  "Joint Preservation Surgery",
  "Hip & Knee Replacement Surgery",
  "Orthobiologics & Regenerative Medicine",
  "Sports Rehabilitation & Return-to-Sport",
];


const journey = [
  {
    tag: "I-SPORT MEDICAL CENTRE, Pune (2023 - Present)",
    title: "Founder & Director",
    description:
      "Tertiary center for Sports Medicine and Sports Surgery",
  },
  {
    tag: "Khelo India, Balewadi Sports Complex (2023 - Present)",
    title: "LEAD SPORTS MEDICINE KHELO INDIA",
    description:
      "Government of Maharashtra initiative for athlete health and performance.",
  },
  {
    tag: "Fellowship",
    title: "Adult Reconstruction Surgery (ISAKOS)",
    description:
      "Advanced fellowship in Arthroscopy and Arthroplasty with a focus on joint preservation.",
  },
  {
    tag: "Fortius Clinic, London (UK) (2020-2021)",
    title: "International Clinical Observer",
    description:
      "Advanced training in sports orthopedics, arthroscopy, and sports trauma management.",
  },
  {
    tag: "Dr. D.Y. Patil Medical College, Pune (2019)",
    title: "Senior Registrar — Sports Medicine",
    description:
      "Orthopedic surgery and trauma management with a focus on sports injuries and rehabilitation.",
  },
  {
    tag: "Consultant",
    title: "Sushrut Hospital & MIS Center, Phaltan",
    description:
      "Trauma and Arthroscopy services for athletes and active individuals in rural Maharashtra.",
  },
];

const education = [
  {
    year:"2020-2021",
    title:"Masters in Sports Medicine, Exercise & Health",
    place:"University College London (UK)",
  },
  {
    year:"2016-2019",
    title:"M.S. Orthopaedics",
    place:"Dr. D.Y. Patil Medical College, Pune",
  },
  {
    year:"2009-2015",
    title:"M.B.B.S.",
    place:"R.C.S.M. Government Medical College, Kolhapur",
  },
  {
    year:"2007-2008",
    title:"Higher Secondary",
    place:"Modern College, Pune",
  },
  {
    year:"2001-2006",
    title:"Secondary Education",
    place:"Sainik School, Satara",
  },
];


const credentials = [
  {
    icon: GraduationCap,
    title: "MSc Sports Medicine, Exercise & Health",
    detail: "University College London (UK)",
  },
  {
    icon: Trophy,
    title: "FIFA Diploma in Football Medicine",
    detail: "International certification",
  },
  {
    icon: Stethoscope,
    title: "Fellowship — Arthroscopy & Reconstruction",
    detail: "Adult joint reconstructive surgery",
  },
  {
    icon: ShieldCheck,
    title: "Lead Consultant — Khelo India",
    detail: "Maharashtra State Centre",
  },
];


const philosophyPillars = [
  {
    icon: HeartPulse,
    title: "Accurate Diagnosis",
    body: "Clinical precision backed by imaging and biomechanical assessment so treatment targets the real cause.",
  },
  {
    icon: Sparkles,
    title: "Personalized Plans",
    body: "Every athlete and active patient gets a recovery roadmap tuned to their sport, goals, and lifestyle.",
  },
  {
    icon: Activity,
    title: "Minimally Invasive",
    body: "Arthroscopic and joint-preserving techniques to reduce downtime and protect long-term function.",
  },
  {
    icon: ShieldCheck,
    title: "Structured Rehab",
    body: "Return-to-sport protocols that restore strength, confidence and performance — not just mobility.",
  },
];


export default function AboutPage() {

return (
<div className="min-h-screen bg-white text-slate-900">


{/* HERO */}

<section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white">

<div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.35),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(56,189,248,0.25),transparent_45%)]" />

  <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />


  <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">

    <motion.div
    initial={{opacity:0,y:24}}
    animate={{opacity:1,y:0}}
    transition={{duration:.6}}
    className="max-w-3xl"
    >

    {/* <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-teal-200">
    <Trophy className="h-3.5 w-3.5"/>
    Leadership in Sports Medicine
    </span> */}

    <h1 className="mt-6 font-[Fraunces] text-4xl font-semibold leading-tight md:text-6xl">
      About Dr. Sumedh Magar{" "} <br />
      <span className="bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent">
      Helping athletes return stronger than before.
      </span>
    </h1>

    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
     A distinguished sports orthopedic surgeon combining international training, extensive surgical experience, and personal athletic achievement to deliver exceptional care to athletes and patients.
    </p>

    <div className="mt-8 flex flex-wrap gap-3">

      <Link href="/sports-medicine" className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300">Explore Sports Medicine<ArrowRight className="h-4 w-4"/>
      </Link>

      <a href="#expertise" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
        Clinical Expertise
      </a>

    </div>

    </motion.div>

  </div>

</section>

<section id="about" className="relative py-24 md:py-32">
  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-8">

    {/* LEFT CONTENT */}
    <div className="lg:sticky lg:top-28 lg:self-start">
      <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-800">
            <Building2 className="h-3.5 w-3.5" /> About the Surgeon
          </span>

{/* <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.05] text-foreground sm:text-4xl md:text-5xl"></h2> */}
          <h2 className="mt-4 text-4xl lg:text-4xl font-bold text-secondary leading-tight">
          Professional {" "}
          <span className="text-navy italic">athletes</span>
          {" "}Experience
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          Dr. Sumedh Magar combines international training in sports medicine
          with a meticulous, athlete-focused approach to orthopedic surgery
          and rehabilitation.
          </p>
      </div>
        {/* <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Arthroscopy",
              "Joint Preservation",
              "Sports Injuries",
              "Orthobiologics"
              ].map((item)=>(
              <span
              key={item}
              className="rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-medium text-foreground/80"
              >
              {item}
              </span>
            ))}
        </div> */}
    </div>

    {/* RIGHT TIMELINE */}
    <ol className="relative space-y-6 border-l border-dashed border-border pl-8">
      {journey.map((item,index)=>(
        <motion.li
        key={item.title}
        initial={{
        opacity:0,
        x:20
        }}
        whileInView={{
        opacity:1,
        x:0
        }}
        viewport={{
        once:true
        }}
        transition={{
        duration:.4,
        delay:index*.1
        }}
        className="relative"
        >
          
        <span className="absolute -left-[42px] top-2 grid h-8 w-8 place-items-center rounded-full border border-border bg-background text-xs font-semibold text-navy shadow-sm">
        {index + 1}
        </span>

        <div className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-navy/30">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            {item.tag}
            </span>
            <Award className="h-4 w-4 text-muted-foreground"/>
          </div>
          <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </div>

      </motion.li>
      ))}
    </ol>

  </div>
</section>

{/* I-SPORT MEDICAL CENTRE */}
<section className="relative overflow-hidden py-20 md:py-28">
  <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-800">
        <Building2 className="h-3.5 w-3.5" /> Founder & Director
      </span>
      <h2 className="mt-4 text-4xl lg:text-4xl font-bold text-secondary leading-tight">
        I-SPORT Medical Centre, Pune
      </h2>
      <p className="mt-5 text-slate-600 leading-relaxed">
        A dedicated facility integrating Sports Medicine, Orthopedics, Rehabilitation,
        Biomechanical Assessment and Performance Analysis — all under one roof. Built
        for athletes and active individuals who need a complete pathway from injury to
        peak performance.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4">
        {[
          "Orthopedic Care",
          "Rehabilitation",
          "Biomechanics Lab",
          "Performance Analysis",
        ].map((p) => (
          <div
            key={p}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
          >
            {p}
          </div>
        ))}
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-teal-200/60 via-sky-200/40 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-teal-900 p-10 text-white shadow-2xl">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="font-[Fraunces] text-4xl font-semibold text-teal-300">10k+</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-slate-300">Patients Treated</div>
          </div>
          <div>
            <div className="font-[Fraunces] text-4xl font-semibold text-teal-300">5k+</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-slate-300">Athletes Cared For</div>
          </div>
          <div>
            <div className="font-[Fraunces] text-4xl font-semibold text-teal-300">97%</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-slate-300">Satisfaction</div>
          </div>
          <div>
            <div className="font-[Fraunces] text-4xl font-semibold text-teal-300">6+</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-slate-300">Years Specialised</div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-300">
          Comprehensive treatment from diagnosis through return-to-sport — delivered by a
          single, integrated team.
        </div>
      </div>
    </motion.div>
  </div>
</section>

{/* Education */}
<section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-slate-50">

  <div className="mx-auto max-w-6xl px-6">

    {/* Heading */}
    <div className="text-center mb-16">
      <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-800">
        <GraduationCap className="h-4 w-4"/>
        Academic Journey
      </span>

      <h2 className="mt-5 text-4xl lg:text-4xl font-bold text-secondary leading-tight">
      Educational Background
      </h2>

      <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
        A foundation built through advanced medical education, orthopedic training,
        and international sports medicine expertise.
      </p>

    </div>

    {/* Timeline */}
    <div className="relative max-w-4xl mx-auto">

    {/* center line */}
    <div className="absolute left-1/2 top-0 bottom-0 hidden md:block w-px bg-gradient-to-b from-teal-400 via-slate-300 to-teal-400"/>
      <div className="space-y-4">
        {education.map((item,index)=>(
        <div key={item.title} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>

        {/* year badge */}
        <div className="absolute hidden md:flex left-1/2 -translate-x-1/2 h-12  w-12  items-center  justify-center rounded-full bg-gradient-to-br from-[rgb(45,212,191)] via-teal-400 to-cyan-500 text-white text-xs font-bold shadow-xl shadow-teal-400/40 border-4  border-white">
          {index + 1}
        </div>

        {/* Card */}
        <div className="w-full md:w-5/12">
          <motion.div
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{
          duration:.5,
          delay:index*.1
          }}

          className="
          group
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-7
          shadow-sm
          transition-all
          hover:-translate-y-2
          hover:shadow-2xl
          hover:border-teal-300
          "
          >


          <div className="flex justify-between items-start">


          <div>


          <p className="text-sm font-bold text-teal-600">

          {item.year}

          </p>


          <h3 className="mt-3 text-xl font-semibold text-slate-900">

          {item.title}

          </h3>


          <p className="mt-2 text-sm text-slate-500">

          {item.place}

          </p>


          </div>



          <div className="
          h-12 w-12
          rounded-2xl
          bg-teal-50
          flex items-center justify-center
          text-teal-700
          group-hover:bg-teal-600
          group-hover:text-white
          transition
          ">

          <GraduationCap className="h-5 w-5"/>

          </div>


          </div>



          </motion.div>
        </div>

      </div>

    ))}

    </div>

    </div>

  </div>
</section>

{/* INTERNATIONAL TRAINING */}
<section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
  <div className="grid gap-12 md:grid-cols-5 md:gap-16">
    <div className="md:col-span-2">
      {/* <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
        International Training
      </p> */}
      <h2 className="mt-3 text-4xl lg:text-4xl font-bold text-secondary leading-tight">
        International Training & Advanced Expertise
      </h2>
      <p className="mt-5 text-slate-600 leading-relaxed">
        Combining advanced surgical technique, evidence-based rehabilitation and
        athlete-focused recovery built on training from the UK, FIFA, and leading
        arthroscopy fellowships.
      </p>
    </div>
    <div className="grid gap-4 md:col-span-3 sm:grid-cols-2">
      {credentials.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-100/50"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition group-hover:bg-teal-600 group-hover:text-white">
            <c.icon className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-900">{c.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{c.detail}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* PHILOSOPHY */}
<section className="bg-gradient-to-b from-white to-slate-50 py-20 md:py-28">
  <div className="mx-auto max-w-6xl px-6">
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
        Philosophy of Care
      </p>
      <h2 className="mt-3 text-4xl lg:text-4xl font-bold text-secondary leading-tight">
        Treat the injury. Restore the athlete.
      </h2>
      <p className="mt-4 text-slate-600">
        The goal isn't only recovery it's regaining confidence, restoring function, and
        returning to an active lifestyle safely.
      </p>
    </div>

    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {philosophyPillars.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="relative rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
        >
          <div className="absolute -top-4 left-7 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-sky-600 text-white shadow-lg shadow-teal-500/30">
            <p.icon className="h-4.5 w-4.5" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">{p.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* CTA */}
<section className="bg-slate-950 py-20 text-white">
  <div className="mx-auto max-w-4xl px-6 text-center">
    <h2 className="font-[Fraunces] text-3xl font-semibold md:text-5xl">
      Ready to take the next step in your recovery?
    </h2>
    <p className="mt-5 text-slate-300">
      Book a consultation at I-SPORT Medical Centre and start a plan built around your
      sport, your goals and your timeline.
    </p>
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <a
        href="https://www.sportsurgeon.in/contact"
        className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
      >
        Book a Consultation <ArrowRight className="h-4 w-4" />
      </a>
      <Link
href="/sports-medicine"
className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
>
View Sports Medicine
</Link>
    </div>
  </div>
</section>

{/* EXPERTISE */}
<section id="expertise" className="bg-slate-50 py-20 md:py-28">
  <div className="mx-auto max-w-6xl px-6">
    <div className="mx-auto max-w-2xl text-center">
      {/* <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
        Areas of Clinical Expertise
      </p> */}
      <h2 className="mt-3 text-4xl lg:text-4xl font-bold text-secondary leading-tight">
        Areas of Clinical Expertise
      </h2>
      <p className="mt-4 text-slate-600">
        His expertise extends from treating recreational athletes  to managing complex orthopedic conditions requiring advanced surgical intervention.
      </p>
    </div>
    <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {expertise.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-800 transition hover:border-teal-400 hover:bg-teal-50/40"
        >
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-teal-600" />
          {item}
        </motion.div>
      ))}
    </div>
  </div>
</section>


</div>
)

}