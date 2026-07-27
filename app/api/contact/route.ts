import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, contact_type, appointment_date, appointment_time } = body;

    // Validate body
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // SMTP settings from env
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const secure = process.env.SMTP_SECURE === 'true';
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    const fromEmail = process.env.SMTP_FROM_EMAIL || user;
    const toEmail = process.env.SMTP_TO_EMAIL || 'vijayalaxmi.shejale@innothoughts.in';

    const typeLabel = contact_type === 'appointment' ? 'Appointment Request' : 'General Inquiry';
    const dateSection = appointment_date ? `<p><strong>Requested Date:</strong> ${appointment_date}</p>` : '';
    const timeSection = appointment_time ? `<p><strong>Requested Time:</strong> ${appointment_time}</p>` : '';

    const htmlContent = `
      <h2>New Contact Submission</h2>
      <p>A new inquiry has been submitted on the Dr. Sumedh Magar Professional Portfolio website.</p>
      <hr />
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Type:</strong> ${typeLabel}</p>
      ${dateSection}
      ${timeSection}
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc; white-space: pre-wrap;">
        ${message}
      </blockquote>
      <hr />
      <p>This email was automatically generated. Please do not reply directly to this notification email unless SMTP settings are fully configured for custom replies.</p>
    `;

    const textContent = `
New Contact Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Type: ${typeLabel}
${appointment_date ? `Requested Date: ${appointment_date}` : ''}
${appointment_time ? `Requested Time: ${appointment_time}` : ''}

Message:
${message}
    `;

    console.log('Sending email notification to:', toEmail);

    if (!host || !user || !pass) {
      console.warn('SMTP settings are missing. Printing email contents to console for logging/debugging:');
      console.log('----- EMAIL PREVIEW -----');
      console.log('To:', toEmail);
      console.log('From:', fromEmail || 'sender@example.com');
      console.log('Subject:', `New Inquiry: ${name} (${typeLabel})`);
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
      from: `"I-SPORT Medical Centre" ${fromEmail}`,
      to: toEmail,
      replyTo: email,
      // subject: `New Inquiry: ${name} `,
      subject: `New Enquiry - I-SPORT Medical Centre`,
      text: textContent,
      html: htmlContent,
    });

    console.log('Email sent successfully to:', toEmail);
    console.log('SMTP Message ID:', info.messageId);
    console.log('SMTP Response:', info.response);
    return NextResponse.json({ success: true, message: 'Email sent successfully.' });
  } catch (error: any) {
    console.error('Error sending email notification:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
