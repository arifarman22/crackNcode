import nodemailer from "nodemailer";
import { env } from "../config/env";

const hasValidSmtp = env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS
  && !env.SMTP_USER.includes("your-") && !env.SMTP_PASS.includes("your-");

const transporter = hasValidSmtp
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: false,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    })
  : null;

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!transporter) {
    console.log(`[Email Mock] To: ${to} | Subject: ${subject}`);
    return;
  }
  try {
    await transporter.sendMail({ from: env.EMAIL_FROM, to, subject, html });
    console.log(`[Email Sent] To: ${to} | Subject: ${subject}`);
  } catch (err) {
    console.error(`[Email Failed] To: ${to} |`, (err as Error).message);
  }
};

export const sendOrderConfirmation = (email: string, orderId: string, total: number) =>
  sendEmail(
    email,
    "Order Confirmed - CrackNCode",
    `<h1>Thank you for your order!</h1><p>Order ID: <strong>${orderId}</strong></p><p>Total: <strong>$${total.toFixed(2)}</strong></p><p>We'll notify you when your order is ready.</p>`
  );

export const sendWelcomeEmail = (email: string, name: string) =>
  sendEmail(
    email,
    "Welcome to CrackNCode!",
    `<h1>Welcome, ${name}!</h1><p>Your account has been created successfully. Start exploring our services and products.</p>`
  );
