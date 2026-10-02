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

/** Reduce input to a 10-digit US number (drops a leading 1), or null. */
const usDigits = (phone: unknown) => {
  let digits = String(phone ?? "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  return digits.length === 10 ? digits : null;
};

export const handleContact: RequestHandler = async (req, res) => {
  const { fullName, email, phone, message } = req.body ?? {};

  // Validate required fields
  if (!fullName || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Full name, email, and message are required",
    });
  }

  // Phone is optional; if given it must be a valid US number.
  const phoneDigits = usDigits(phone);
  if (String(phone ?? "").trim() !== "" && !phoneDigits) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid US phone number.",
    });
  }

  try {
    const from = process.env.MAIL_FROM!;
    const to = process.env.MAIL_TO || from;
    const phoneText = phoneDigits
      ? `+1 (${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`
      : null;

    await getTransporter().sendMail({
      from,
      to,
      replyTo: email || undefined,
      subject: "Contact Us",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${esc(fullName)}</p>
        <p><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
        <p><strong>Phone:</strong> ${
          phoneText
            ? `<a href="tel:+1${phoneDigits}">${esc(phoneText)}</a>`
            : "Not provided"
        }</p>
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
