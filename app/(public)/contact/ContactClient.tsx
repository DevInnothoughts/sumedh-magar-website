'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Send,
  CheckCircle2,
  Calendar,
  Stethoscope,
  Activity,
  Check,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export interface ProcedureCategory {
  id: string;
  name: string;
  icon: string;
  description?: string;
  procedures: string[];
}

export const PROCEDURE_CATEGORIES: ProcedureCategory[] = [
  {
    id: 'knee',
    name: 'Knee Surgery & Preservation',
    icon: '🦴',
    description: 'ACL reconstruction, meniscus, cartilage & alignment',
    procedures: [
      'Robotic Total Knee Replacement (TKR)',
      'Partial / Unicompartmental Knee Replacement',
      'ACL (Anterior Cruciate Ligament) Reconstruction',
      'Multi-Ligament Reconstruction (PCL / MCL / LCL)',
      'Meniscus Repair or Meniscectomy',
      'Knee Arthroscopy (Keyhole Surgery)',
      'Patellar Instability / MPFL Reconstruction',
      'Cartilage Restoration & OATS Procedure',
      'High Tibial Osteotomy (Knee Realignment)',
      'Knee Pain & Degeneration Evaluation',
      'Other Specific Knee Condition',
    ]
  },
  {
    id: 'robotic_joint',
    name: 'Robotic & Joint Replacement',
    icon: '🦾',
    description: 'Robotic-assisted joint replacement for knee & hip',
    procedures: [
      'Robotic-Assisted Knee Replacement',
      'Primary Total Knee Replacement',
      'Revision Knee Replacement Surgery',
      'Total Hip Replacement (Direct Anterior / Posterior)',
      'Robotic Hip Replacement',
      'Revision Hip Replacement',
      'Shoulder Joint Replacement (Total / Reverse)',
      'Joint Preservation Consultation',
      'Other Joint Replacement Procedure',
    ]
  },
  {
    id: 'shoulder',
    name: 'Shoulder & Upper Limb',
    icon: '💪',
    description: 'Rotator cuff, shoulder arthroscopy & instability',
    procedures: [
      'Rotator Cuff Repair (Arthroscopic)',
      'Shoulder Arthroscopy & Impingement Release',
      'Bankart Repair / Shoulder Instability Surgery',
      'Frozen Shoulder Hydrodilation / Surgical Release',
      'Shoulder Dislocation & Labral Repair',
      'AC Joint Reconstruction',
      'Biceps Tenodesis / Tenotomy',
      'Other Shoulder Procedure',
    ]
  },
  {
    id: 'sports',
    name: 'Sports Injury & Arthroscopy',
    icon: '🏋️',
    description: 'Athletic injury repair, ligament & tendon restoration',
    procedures: [
      'Athletic ACL / Knee Ligament Repair',
      'Ankle Arthroscopy & Ligament Repair',
      'Hamstring / Quadriceps Tear Repair',
      'Achilles Tendon Repair',
      'Tennis Elbow / Golfer\'s Elbow Treatment',
      'Overuse & Athletic Performance Consultation',
      'Other Sports Medicine Injury',
    ]
  },
  {
    id: 'hip',
    name: 'Hip Surgery & Arthroscopy',
    icon: '🦵',
    description: 'Hip replacement, impingement & AVN decompression',
    procedures: [
      'Total Hip Replacement (THR)',
      'Hip Arthroscopy (FAI / Labral Repair)',
      'Avascular Necrosis (AVN) Core Decompression',
      'Hip Impingement Surgery',
      'Other Hip Procedure',
    ]
  },
  {
    id: 'regenerative',
    name: 'Regenerative Medicine & Biologics',
    icon: '🧬',
    procedures: [
      'PRP (Platelet-Rich Plasma) Therapy',
      'BMAC (Bone Marrow Concentrate) Stem Cell Therapy',
      'Hyaluronic Acid Viscosupplementation Injections',
      'Non-Surgical Cartilage Regeneration',
      'Biological Joint Injections',
      'Other Regenerative Treatment',
    ]
  },
  {
    id: 'general',
    name: 'General Orthopedics & Consultation',
    icon: '🩺',
    description: 'Second opinion, trauma & comprehensive consultation',
    procedures: [
      'Second Opinion on Recommended Surgery',
      'Surgical Evaluation & Readiness',
      'Fracture Care & Trauma Evaluation',
      'Chronic Joint Pain Assessment',
      'Post-Operative Rehabilitation Review',
      'Other Specific Orthopedic Surgery',
    ]
  },
  {
    id: 'others',
    name: 'Others',
    icon: '❓',
    description: 'Other orthopedic conditions, consultations or general inquiries',
    procedures: []
  }
];

export const CONSULTATION_PURPOSES = [
  'Seeking First-Time Specialist Consultation',
  'Seeking Second Opinion / Alternative to Surgery',
  'Ready to Schedule Surgery',
  'Post-Surgical Follow-up / Rehabilitation Care',
  'Treatment Cost Estimate & Coverage Inquiry',
];

export const URGENCY_TIMELINES = [
  'Immediate / Urgent (Next 24-48 Hours)',
  'Soon (Within 1 to 2 Weeks)',
  'Planning (Within 1 Month)',
  'Gathering Information',
];

export const CONTACT_METHODS = [
  'Phone Call Preferred',
  'WhatsApp Message Preferred',
  'Email Response Preferred',
];

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  problem: string;
  message?: string;
  needsAppointment: boolean;
  appointmentDate?: string;
  appointmentTime?: string;
  consultationLocation?: string;
  website?: string; // Honeypot anti-spam field
};

function ContactFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [submitting, setSubmitting] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [consultationPurpose, setConsultationPurpose] = useState<string>('');
  const [urgencyTimeline, setUrgencyTimeline] = useState<string>(URGENCY_TIMELINES[1]);
  const [preferredContactMethod, setPreferredContactMethod] = useState<string>(CONTACT_METHODS[0]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm<FormData>();
  const needsAppointment = watch('needsAppointment');

  // Pre-fill from URL query params (e.g. /contact?procedure=Robotic+Knee+Replacement&category=knee)
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const procedureParam = searchParams.get('procedure');

    if (categoryParam) {
      const matchCat = PROCEDURE_CATEGORIES.find(
        c => c.id.toLowerCase() === categoryParam.toLowerCase() || c.name.toLowerCase().includes(categoryParam.toLowerCase())
      );
      if (matchCat) {
        setSelectedCategoryId(matchCat.id);
      }
    }

    if (procedureParam) {
      setValue('problem', procedureParam);
    }
  }, [searchParams, setValue]);

  const activeCategory = PROCEDURE_CATEGORIES.find(c => c.id === selectedCategoryId);
  const categoryName = activeCategory ? activeCategory.name : 'General Orthopedics';

  const handleCategorySelect = (catId: string) => {
    setSelectedCategoryId(catId);
  };

  const onSubmit = async (data: FormData) => {
    // Anti-spam Honeypot Check (If filled, silently discard bot submission)
    if (data.website && data.website.trim() !== '') {
      console.warn('Spam bot submission blocked via Honeypot field.');
      reset();
      router.push('/thank-you');
      return;
    }

    if (!selectedCategoryId) {
      setValidationError('Please select a specialty or treatment area.');
      toast.error('Please select a specialty or treatment area.');
      return;
    }

    if (!consultationPurpose) {
      setValidationError('Please select the purpose of consultation.');
      toast.error('Please select the purpose of consultation.');
      return;
    }

    setValidationError(null);
    setSubmitting(true);

    const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`;
    const problemText = data.problem.trim();

    // Build structured message format for reliable Supabase & admin viewing
    const locationNote = data.needsAppointment && data.consultationLocation ? `Preferred Location: ${data.consultationLocation}\n` : '';
    const structuredMessage = `
--- CLINICAL INQUIRY METADATA ---
Procedure / Surgery: ${problemText}
Specialty Category: ${categoryName}
Consultation Purpose: ${consultationPurpose}
Target Timeline: ${urgencyTimeline}
Preferred Contact Method: ${preferredContactMethod}
${locationNote}---------------------------------

Patient Clinical Notes / Additional Message:
${data.message || 'No additional notes provided.'}
`.trim();

    try {
      const { error } = await supabase.from('contacts').insert([
        {
          name: fullName,
          email: data.email,
          phone: data.phone,
          message: structuredMessage,
          contact_type: data.needsAppointment ? 'appointment' : 'general',
          appointment_date: data.appointmentDate || null,
          appointment_time: data.appointmentTime || null,
        },
      ]);

      if (error) throw error;

      // Trigger email notification with rich procedure details
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: fullName,
            email: data.email,
            phone: data.phone,
            message: data.message || '',
            category: categoryName,
            procedure: problemText,
            problem: problemText,
            purpose: consultationPurpose,
            urgency: urgencyTimeline,
            preferred_contact: preferredContactMethod,
            contact_type: data.needsAppointment ? 'appointment' : 'general',
            appointment_date: data.appointmentDate || null,
            appointment_time: data.appointmentTime || null,
            location: data.consultationLocation || (data.needsAppointment ? 'I-SPORT Medical Centre' : undefined),
            website: data.website || '',
          }),
        });
      } catch (emailError) {
        console.error('Failed to trigger email notification:', emailError);
      }

      toast.success('Inquiry submitted successfully!');
      reset();
      router.push('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="p-6 md:p-8 border border-neutral-200/80 shadow-2xl bg-white rounded-3xl relative overflow-hidden">

      {/* Top Banner Tag */}
      <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-neutral-100">
        <div>
          <h2 className="text-2xl font-bold text-secondary font-heading">Send Us a Message</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Anti-Spam Honeypot Field (Hidden from human users) */}
        <div className="opacity-0 absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true" tabIndex={-1}>
          <label htmlFor="website">Do not fill this field</label>
          <input
            {...register('website')}
            type="text"
            id="website"
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        {/* 1. Patient Contact Details (First Name, Last Name, Phone, Email) */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('firstName', { required: 'First name is required' })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary bg-neutral-50/50 text-sm font-medium text-slate-800"
                placeholder="e.g. Rahul"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('lastName', { required: 'Last name is required' })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary bg-neutral-50/50 text-sm font-medium text-slate-800"
                placeholder="e.g. Sharma"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1">
                Phone Number (WhatsApp Preferred) <span className="text-red-500">*</span>
              </label>
              <input
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: { value: /^[0-9+()\s-]{8,15}$/, message: 'Enter a valid phone number' }
                })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary bg-neutral-50/50 text-sm font-medium text-slate-800"
                placeholder="+91 9876543210"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                {...register('email', {
                  required: 'Email address is required',
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Enter a valid email address' }
                })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary bg-neutral-50/50 text-sm font-medium text-slate-800"
                placeholder="rahul@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>
        </div>

        {/* 2. Specialty / Treatment Area Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1 flex items-center justify-between">
            <span>Specialty / Treatment Area <span className="text-red-500">*</span></span>
          </label>
          <div className="relative">
            <select
              value={selectedCategoryId}
              onChange={(e) => {
                handleCategorySelect(e.target.value);
                setValidationError(null);
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:border-primary appearance-none cursor-pointer ${selectedCategoryId ? 'bg-neutral-50/50 text-neutral-800' : 'bg-neutral-50/50 text-neutral-400'
                } border-neutral-200`}
            >
              <option value="" disabled className="text-neutral-400">
                Select Specialty...
              </option>
              {PROCEDURE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id} className="text-neutral-800">
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 3. Problem / Condition Description Textbox */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1">
            Describe Your Problem / Condition <span className="text-red-500">*</span>
          </label>
          <input
            {...register('problem', { required: 'Please describe your problem or condition' })}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary bg-neutral-50/50 text-sm font-medium text-slate-800 placeholder:text-neutral-400"
            placeholder="e.g. Severe knee pain while walking, ACL tear injury, shoulder stiffness, etc."
          />
          {errors.problem && <p className="text-red-500 text-xs mt-1">{errors.problem.message}</p>}
        </div>

        {/* 4. Purpose of Consultation */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1">
            Purpose of Consultation <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={consultationPurpose}
              onChange={(e) => {
                setConsultationPurpose(e.target.value);
                setValidationError(null);
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:border-primary appearance-none cursor-pointer ${consultationPurpose ? 'bg-neutral-50/50 text-neutral-800' : 'bg-neutral-50/50 text-neutral-400'
                } border-neutral-200`}
            >
              <option value="" disabled className="text-neutral-400">
                Select Purpose...
              </option>
              {CONSULTATION_PURPOSES.map((purpose) => (
                <option key={purpose} value={purpose} className="text-neutral-800">
                  {purpose}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Validation Warning Alert */}
        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700 font-semibold"
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{validationError}</span>
          </motion.div>
        )}

        {/* 5. Additional Message / Clinical Details */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-1">
            Additional Symptoms or Report Details (Optional)
          </label>
          <textarea
            {...register('message')}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary bg-neutral-50/50 text-sm resize-none"
            placeholder="Mention any symptoms, duration, prior surgeries, or if you have MRI / X-ray reports ready..."
          />
        </div>

        {/* Appointment Slot Request Checkbox */}
        <div className="flex items-center p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80">
          <input
            {...register('needsAppointment')}
            type="checkbox"
            id="needsAppointment"
            className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-0 cursor-pointer"
          />
          <label htmlFor="needsAppointment" className="ml-2.5 text-sm text-neutral-700 font-medium cursor-pointer select-none">
            I would like to request a specific clinic appointment slot
          </label>
        </div>

        <AnimatePresence>
          {needsAppointment && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pt-1 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Preferred Location</label>
                  <select
                    {...register('consultationLocation')}
                    defaultValue="I-SPORT Medical Centre (Balewadi)"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary bg-white"
                  >
                    <option value="I-SPORT Medical Centre (Balewadi)">I-SPORT Medical Centre, Balewadi</option>
                    <option value="Ruby Hall Clinic (Pune)">Ruby Hall Clinic (Tue &amp; Fri only)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Preferred Date</label>
                  <input
                    {...register('appointmentDate')}
                    type="date"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1">Preferred Time Slot</label>
                <select
                  {...register('appointmentTime')}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-primary bg-white"
                >
                  <option value="">Select time slot</option>
                  <optgroup label="Morning (Sat–Sun at I-SPORT / Tue &amp; Fri at Ruby Hall)">
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                  </optgroup>
                  <optgroup label="Evening (Mon–Fri at I-SPORT)">
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                  </optgroup>
                </select>
                <p className="text-xs text-neutral-500 mt-1">
                  Hours: I-SPORT Mon–Fri 2:00–8:00 PM, Sat–Sun 10:00 AM–1:00 PM | Ruby Hall Tue &amp; Fri 10:00 AM–1:00 PM
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full py-4 text-base font-bold rounded-2xl shadow-lg hover:shadow-teal-500/25 flex items-center justify-center gap-2 group transition-all"
          disabled={submitting}
        >
          {submitting ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              Submit Procedure Inquiry
            </>
          )}
        </Button>

        <p className="text-[11px] text-center text-neutral-500 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          Your medical details are confidential and reviewed directly by Dr. Sumedh Magar's consultation team.
        </p>
      </form>
    </Card>
  );
}

export default function ContactClient() {
  return (
    <div className="min-h-screen bg-neutral-50">

      {/* Hero Section Banner */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white flex flex-col justify-center w-full"
        style={{
          height: "calc(100vw * (480 / 1440))",
          minHeight: "500px",
          maxHeight: "520px"
        }}
      >
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.35),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(56,189,248,0.25),transparent_45%)]" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative mx-auto max-w-6xl px-6 w-full py-12 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
            className="max-w-3xl"
          >
            {/* <span className="text-teal-300 font-bold text-xs uppercase tracking-widest bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full inline-block mb-3">
              Specialist Consultation & Surgery Inquiry
            </span> */}
            <h1 className="font-[Fraunces] text-4xl font-semibold leading-tight md:text-6xl">
              Contact{" "}
              <span className="bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent">
                Us
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              Get in touch with Dr. Sumedh Magar and the I-SPORT MEDICAL CENTRE team. Specify your procedure details below for an accurate clinical response.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Cards & Form Section */}
      <section className="py-16 px-5">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Column: Clinic Contact Info */}
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-2xl font-bold text-secondary font-heading mb-6">I-SPORT MEDICAL CENTRE</h2>

              {[
                { icon: MapPin, title: 'Clinic Address', desc: <>Shp 9-13 UPPER GROUND FLOOR<br />Madhukosh Society<br />Balewadi, Pune 411045</> },
                { icon: Phone, title: 'Phone / Whatsapp', desc: <><a href="tel:+919145517171" className="hover:text-primary font-medium transition-colors">+91 9145517171</a><br /><a href="tel:+912067813869" className="hover:text-primary transition-colors">+91 02067813869</a></> },
                { icon: Mail, title: 'Email', desc: <><a href="mailto:sumedh@isportmedicalcentre.com" className="hover:text-primary transition-colors block truncate">sumedh@isportmedicalcentre.com</a></> },
                { icon: Clock, title: 'Clinic Hours', desc: <>Monday – Friday: 2:00 PM – 8:00 PM<br />Saturday – Sunday: 10:00 AM – 1:00 PM</> },
              ].map((item, index) => (
                <Card key={index} className="p-5 border border-neutral-200/80 shadow-sm hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-semibold text-secondary text-sm uppercase tracking-wide mb-1.5">{item.title}</h3>
                      <div className="text-neutral-600 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Visiting Consultation: Ruby Hall Clinic */}
              <div className="pt-2">
                <Card className="p-5 border border-neutral-200/80 shadow-sm hover:border-primary/20 transition-all duration-300 bg-neutral-50/60">
                  <div className="flex items-start space-x-4">
                    <Building2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-bold text-secondary text-base mb-0.5">Ruby Hall Clinic</h3>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Hospital OPD Consultation</p>
                      <div className="text-neutral-600 text-sm leading-relaxed space-y-1">
                        <div className="flex items-center gap-1.5 font-medium text-slate-800">
                          <Clock className="w-4 h-4 text-primary shrink-0" />
                          <span>Tuesday &amp; Friday: 10:00 AM – 1:00 PM</span>
                        </div>
                        <p className="text-xs text-neutral-500 pt-0.5">Pune, Maharashtra</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Column: Redesigned Procedure Form */}
            <div className="lg:col-span-8">
              <Suspense fallback={
                <Card className="p-8 text-center text-slate-500">
                  <span className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin inline-block mb-2" />
                  <p>Loading inquiry form...</p>
                </Card>
              }>
                <ContactFormInner />
              </Suspense>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full border-t border-neutral-200/80 leading-[0] block p-0 m-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.165823574954!2d73.76766131490026!3d18.566374087382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9c6e5f1c5e9%3A0x1234567890abcdef!2sBalewadi%2C%20Pune%2C%20Maharashtra%20411045!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full filter contrast-[95%] saturate-[95%]"
        />
      </section>

    </div>
  );
}
