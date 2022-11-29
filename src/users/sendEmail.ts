/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index";

const userEmail = process.env.EMAIL as string;
const userPassword = process.env.PASSWORD as string;

const transporter = nodemailer.createTransport({
  host: "smpt.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: userEmail,
    pass: userPassword,
  },
});

interface EmailSender {
  to: string;
  from: string;
  subject: string;
  message: string;
}

interface MailOptions {
  to: string;
  from: string;
  subject: string;
  text: string;
}

export function sendEmail(
  emailSender: EmailSender
): Promise<SMTPTransport.SentMessageInfo> {
  const mailOptions: MailOptions = {
    to: emailSender.to,
    from: emailSender.from,
    subject: emailSender.subject,
    text: emailSender.message,
  };
  return transporter.sendMail(mailOptions);
}
