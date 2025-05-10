// LIB
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// TYPES
interface ISendEmailProps {
  destinationEmail: string;
  subject: string;
  text: string;
}

export async function sendEmail(options: ISendEmailProps) {
  const transporter = nodemailer.createTransport({
    host: process.env.APP_EMAIL_HOST,
    port: process.env.APP_EMAIL_PORT,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASSWORD,
    },
  } as SMTPTransport.Options);

  const mailOptions = {
    from: `NEXT.JS BOILERPLATE PROJECT <${process.env.APP_EMAIL}>`,
    to: options.destinationEmail,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
}
