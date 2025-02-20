// LIBRARY
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// TYPES
import { ISendEmailProps } from '@/utility/email/types';

export async function sendEmail(options: ISendEmailProps) {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.APP_EMAIL_HOST,
    port: process.env.APP_EMAIL_PORT,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASSWORD,
    },
  } as SMTPTransport.Options);

  // 2) Define the email options
  const mailOptions = {
    from: `NEXT.JS BOILERPLATE PROJECT <${process.env.APP_EMAIL}>`,
    to: options.destinationEmail,
    subject: options.subject,
    text: options.text,
  };

  // 3) Send the email
  await transporter.sendMail(mailOptions);
}
