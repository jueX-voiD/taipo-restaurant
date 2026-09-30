import { RequestHandler } from "express";
import nodemailer, { type Transporter } from "nodemailer";
import type { ReservationRequest, ReservationResponse } from "@shared/api";

let transporter: Transporter | null = null;

/**
 * Lazily create the SMTP transport. Uses Gmail SMTP.
 * Required env vars:
 *   SMTP_HOST   e.g. smtp.gmail.com
 *   SMTP_PORT   587 (STARTTLS) or 465 (TLS)
 *   SMTP_USER   Gmail address
 *   SMTP_PASS   Gmail App Password
 *   MAIL_FROM   a verified sender, e.g. "Taipo <shrestha.jenish2000@gmail.com>"
 *   MAIL_TO     where reservation requests are received (defaults to MAIL_FROM)
 */
function getTransporter(): Transporter {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP environment variables are not configured");
  }

  const port = Number(SMTP_PORT) || 587;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

const esc = (s: unknown) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

export const handleContact: RequestHandler = async (req, res) => {
  const { fullName, email, phone, message } = req.body ?? {};

  // Validate required fields
  if (!fullName || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Full name, email, and message are required",
    });
  }

  try {
    const from = process.env.MAIL_FROM!;
    const to = process.env.MAIL_TO || from;

    await getTransporter().sendMail({
      from,
      to,
      replyTo: email || undefined,
      subject: `New contact form submission from ${String(fullName).replace(/[\r\n]+/g, " ")}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${esc(fullName)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Phone:</strong> ${esc(phone || "Not provided")}</p>
        <p><strong>Message:</strong> ${esc(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent!",
    });
  } catch (err) {
    console.error("Contact email failed:", err);
    return res.status(500).json({
      success: false,
      message: "Could not send your message. Please try again.",
    });
  }
};
