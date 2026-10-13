import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory rate limiter to prevent spam attacks
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  // Allow unrestricted testing in local development
  if (process.env.NODE_ENV !== 'production' || ip === 'anonymous' || ip === '127.0.0.1' || ip === '::1') {
    return false;
  }

  const now = Date.now();
  const limitWindow = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 10; // Max 10 inquiries per 15 min per IP

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + limitWindow });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  return false;
}

// HTML Escaping helper to prevent email injection & broken markup
function escapeHtml(str?: string | null): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting Defense
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'anonymous';
    if (isRateLimited(ip)) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      name,
      email,
      phone,
      message,
      contact_type,
      appointment_date,
      appointment_time,
      procedure,
      problem,
      category,
      purpose,
      urgency,
      preferred_contact,
      location,
      website
    } = body;

    // 2. Anti-Spam Honeypot Verification (If filled by a bot, silently return success without sending email)
    if (website && typeof website === 'string' && website.trim() !== '') {
      console.warn('Spam submission detected via Honeypot field in API. Suppressing email dispatch.');
      return NextResponse.json({ success: true, message: 'Inquiry processed.' });
    }

    // 3. Strict Server-Side Validation
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedPhone = typeof phone === 'string' ? phone.trim() : '';

    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json({ error: 'Please enter a valid full name.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const phoneRegex = /^[0-9+()\s-]{8,20}$/;
    if (!trimmedPhone || !phoneRegex.test(trimmedPhone)) {
      return NextResponse.json({ error: 'Please enter a valid contact phone number.' }, { status: 400 });
    }

    // SMTP settings from env
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const secure = process.env.SMTP_SECURE === 'true';
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    const fromEmail = process.env.SMTP_FROM_EMAIL || user;
    // Target recipient email (uses env or defaults to test recipient)
    const toEmail = process.env.SMTP_TO_EMAIL || 'vijayashejale1999@gmail.com';
    // Production recipient: 'frontdesk@isportmedicalcentre.com'

    const typeLabel = contact_type === 'appointment' ? 'Appointment Request' : 'General Inquiry';
    const problemLabel = problem || procedure || 'Not Specified';
    const categoryLabel = category || 'General Orthopedics';
    const purposeLabel = purpose || 'Specialist Inquiry';
    const urgencyLabel = urgency || 'Standard';
    const preferredContactLabel = preferred_contact || 'Phone Call';

    // HTML-Escaped values for safety in email body
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safePhone = escapeHtml(trimmedPhone);
    const safeTypeLabel = escapeHtml(typeLabel);
    const safeCategoryLabel = escapeHtml(categoryLabel);
    const safeProblemLabel = escapeHtml(problemLabel);
    const safePurposeLabel = escapeHtml(purposeLabel);
    const safeUrgencyLabel = escapeHtml(urgencyLabel);
    const safePreferredContactLabel = escapeHtml(preferredContactLabel);
    const safeAppointmentDate = escapeHtml(appointment_date);
    const safeAppointmentTime = escapeHtml(appointment_time);
    const safeLocation = escapeHtml(location);
    const safeMessage = escapeHtml(message);

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0d9488 100%); padding: 28px 24px; text-align: left; color: #ffffff;">
          <span style="background-color: rgba(20, 184, 166, 0.2); border: 1px solid rgba(45, 212, 191, 0.4); color: #2dd4bf; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 10px; border-radius: 20px; display: inline-block; margin-bottom: 10px;">
            I-SPORT MEDICAL CENTRE INQUIRY
          </span>
          <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.3;">
            New Patient Contact Inquiry
          </h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">
            Submitted via Website Contact Form
          </p>
        </div>

        <div style="padding: 24px; color: #334155;">

          <!-- PATIENT CONTACT INFORMATION CARD -->
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 14px 0; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #0d9488; border-bottom: 1px dashed #cbd5e1; padding-bottom: 8px;">
              👤 Patient Contact Information
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
              <tr>
                <td style="padding: 6px 0; font-weight: 600; color: #64748b; width: 150px;">Patient Name:</td>
                <td style="padding: 6px 0; font-weight: 700; color: #0f172a; font-size: 15px;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Phone / WhatsApp:</td>
                <td style="padding: 6px 0;">
                  <a href="tel:${safePhone}" style="color: #0d9488; font-weight: 700; text-decoration: none;">${safePhone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Email Address:</td>
                <td style="padding: 6px 0;">
                  <a href="mailto:${safeEmail}" style="color: #2563eb; font-weight: 600; text-decoration: none;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Submission Type:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${safeTypeLabel}</td>
              </tr>
            </table>
          </div>

          <!-- CLINICAL DETAILS & PROBLEM CARD -->
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px 20px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 14px 0; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #15803d; border-bottom: 1px dashed #a7f3d0; padding-bottom: 8px;">
              🩺 Clinical Details & Problem Description
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #166534; width: 170px; vertical-align: top;">Specialty / Treatment:</td>
                <td style="padding: 8px 0; font-weight: 700; color: #0f172a;">${safeCategoryLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #166534; vertical-align: top;">Problem / Condition:</td>
                <td style="padding: 8px 0; font-weight: 700; color: #047857; font-size: 15px;">
                  <div style="background: #ffffff; padding: 10px 14px; border-radius: 8px; border: 1px solid #dcfce7; display: inline-block; width: 95%;">
                    ${safeProblemLabel}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #166534; vertical-align: top;">Consultation Purpose:</td>
                <td style="padding: 8px 0; color: #1e293b;">${safePurposeLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #166534; vertical-align: top;">Target Timeline:</td>
                <td style="padding: 8px 0; color: #b45309; font-weight: 700;">${safeUrgencyLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #166534; vertical-align: top;">Preferred Contact:</td>
                <td style="padding: 8px 0; color: #0f172a;">${safePreferredContactLabel}</td>
              </tr>
            </table>
          </div>

          <!-- REQUESTED APPOINTMENT SLOT (IF APPLICABLE) -->
          ${(safeAppointmentDate || safeAppointmentTime || safeLocation) ? `
            <div style="background-color: #fffbebfb; border: 1px solid #fde68a; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px;">
              <h4 style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #b45309; text-transform: uppercase;">
                📅 Requested Appointment Details
              </h4>
              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #78350f;">
                ${safeLocation ? `Clinic Location: <strong>${safeLocation}</strong><br />` : ''}
                ${safeAppointmentDate ? `Requested Date: <strong>${safeAppointmentDate}</strong>` : ''} 
                ${safeAppointmentTime ? ` &nbsp;|&nbsp; Time Slot: <strong>${safeAppointmentTime}</strong>` : ''}
              </p>
            </div>
          ` : ''}

          <!-- ADDITIONAL NOTES -->
          ${safeMessage ? `
            <div style="margin-bottom: 20px;">
              <h3 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; text-transform: uppercase; color: #475569;">
                📝 Additional Patient Notes / Symptoms:
              </h3>
              <div style="background: #f1f5f9; padding: 14px 16px; border-left: 4px solid #0d9488; font-size: 14px; color: #334155; border-radius: 4px 8px 8px 4px; white-space: pre-wrap; line-height: 1.5;">
                ${safeMessage}
              </div>
            </div>
          ` : ''}

        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">
            Sent automatically from Dr. Sumedh Magar Professional Portfolio Website &bull; I-SPORT Medical Centre
          </p>
        </div>

      </div>
    `;

    const textContent = `
NEW PATIENT CONTACT INQUIRY - I-SPORT MEDICAL CENTRE
==================================================

PATIENT CONTACT INFORMATION:
----------------------------
Name: ${trimmedName}
Phone: ${trimmedPhone}
Email: ${trimmedEmail}
Submission Type: ${typeLabel}

CLINICAL DETAILS & PROBLEM:
---------------------------
Specialty / Treatment Area: ${categoryLabel}
Describe Your Problem / Condition: ${problemLabel}
Consultation Purpose: ${purposeLabel}
Target Timeline: ${urgencyLabel}
Preferred Contact Method: ${preferredContactLabel}

${location ? `PREFERRED CLINIC LOCATION: ${location}` : ''}
${appointment_date ? `REQUESTED APPOINTMENT DATE: ${appointment_date}` : ''}
${appointment_time ? `REQUESTED TIME SLOT: ${appointment_time}` : ''}

PATIENT NOTES / ADDITIONAL SYMPTOMS:
------------------------------------
${message || 'No additional notes provided'}
==================================================
    `.trim();

    console.log('Sending email notification for problem:', problemLabel, 'to:', toEmail);

    if (!host || !user || !pass) {
      console.warn('SMTP settings are missing. Printing email contents to console for logging/debugging:');
      console.log('----- EMAIL PREVIEW -----');
      console.log('To:', toEmail);
      console.log('From:', fromEmail || 'sender@example.com');
      console.log('Subject:', `[NEW INQUIRY] ${problemLabel} - ${trimmedName}`);
      console.log('Content:', textContent);
      console.log('-------------------------');
      return NextResponse.json({
        success: true,
        message: 'SMTP credentials missing, email logged in server logs.',
      });
    }

    const transporter = host === 'smtp.gmail.com'
      ? nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user,
          pass,
        },
      })
      : nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
      });

    const info = await transporter.sendMail({
      from: `"I-SPORT Medical Centre" <${fromEmail}>`,
      to: toEmail,
      replyTo: trimmedEmail,
      subject: `[INQUIRY: ${trimmedName}] ${problemLabel} - I-SPORT Medical Centre`,
      text: textContent,
      html: htmlContent,
    });

    console.log('Email sent successfully to:', toEmail);
    console.log('SMTP Message ID:', info.messageId);
    return NextResponse.json({ success: true, message: 'Email sent successfully.' });
  } catch (error: any) {
    console.error('Error sending email notification:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}


