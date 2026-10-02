import { RequestHandler } from "express";
import nodemailer, { type Transporter } from "nodemailer";
import type { ReservationRequest, ReservationResponse } from "@shared/api";

let transporter: Transporter | null = null;

/**
 * Lazily create the SMTP transport. Uses Amazon SES SMTP credentials.
 * Required env vars:
 *   SMTP_HOST   e.g. email-smtp.us-east-1.amazonaws.com
 *   SMTP_PORT   587 (STARTTLS) or 465 (TLS)
 *   SMTP_USER   SES SMTP username
 *   SMTP_PASS   SES SMTP password
 *   MAIL_FROM   a verified SES sender, e.g. "Taipo <reservations@taiporestaurants.com>"
 *   MAIL_TO     where reservations are received (defaults to MAIL_FROM)
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

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

export const handleReservation: RequestHandler = async (req, res) => {
  const body = (req.body ?? {}) as Partial<ReservationRequest>;

  const required = [
    "partySize",
    "date",
    "bookingTime",
    "name",
    "phone",
  ] as const;
  const missing = required.filter(
    (k) => !body[k] || String(body[k]).trim() === "",
  );
  if (missing.length) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missing.join(", ")}`,
    } satisfies ReservationResponse);
  }

  const phoneDigits = String(body.phone).replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid phone number.",
    } satisfies ReservationResponse);
  }

  // [label, value, optional link] - links make the phone/email tappable in
  // the email client (tel: / mailto:).
  const rows: [string, string, string?][] = [
    ["Name", body.name!],
    [
      "Phone",
      `+1 (${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6, 10)}`,
      `tel:+1${phoneDigits.slice(0, 10)}`,
    ],
    [
      "Email",
      body.email || "—",
      body.email ? `mailto:${body.email}` : undefined,
    ],
    ["Party size", `${body.partySize} guest(s)`],
    ["Date", body.date!],
    ["Time", body.bookingTime!],
    ["Special requests", body.specialRequests || "—"],
  ];

  const html = `
    <h2 style="font-family:sans-serif">New reservation request</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([k, v, href]) =>
            `<tr><td style="padding:6px 12px;font-weight:bold">${esc(
              k,
            )}</td><td style="padding:6px 12px">${
              href
                ? `<a href="${esc(href)}" style="color:#00a79f">${esc(String(v))}</a>`
                : esc(String(v))
            }</td></tr>`,
        )
        .join("")}
    </table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    const from = process.env.MAIL_FROM!;
    const to = process.env.MAIL_TO || from;

    await getTransporter().sendMail({
      from,
      to,
      replyTo: body.email || undefined,
      subject: "Taipo Reservation",
      html,
      text,
    });

    return res.status(200).json({
      success: true,
      message: "Your reservation request has been sent.",
    } satisfies ReservationResponse);
  } catch (err) {
    console.error("Reservation email failed:", err);
    return res.status(500).json({
      success: false,
      message: "Could not send your reservation. Please try again.",
    } satisfies ReservationResponse);
  }
};
