import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { band } from "@/lib/data";

/*
 * The full recipient list, independent of the account doing the sending —
 * SMTP_USER is the transport credential, not an address to deliver to.
 *
 * band.email is the address the site publishes (the Migadu booking@ box) and has
 * to stay on this list — it is the inbox the band actually works out of. The
 * personal addresses sit alongside it so nobody stops seeing inquiries.
 *
 * Email only: no carrier email-to-SMS gateways here. Everyone who needs to know
 * about an inquiry gets it in an inbox.
 */
const EMAIL_RECIPIENTS = [
  band.email,
  "johnnyhayden+chainreaction@gmail.com",
  "joefortemusic@gmail.com",
];

/*
 * Everything below goes into an HTML email built by string concatenation, so every
 * submitted value has to be escaped on the way in — otherwise a visitor can inject
 * markup (or a link) straight into the band's inbox.
 */
function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding: 8px 0; color: #666; width: 120px;"><strong>${label}</strong></td>
    <td style="padding: 8px 0;">${value}</td>
  </tr>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, date, venue, eventType, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    /*
     * Migadu SMTP, not Gmail: the site now sends *as* the address it publishes,
     * so inquiry mail is aligned with the domain's SPF and DKIM records instead
     * of arriving from an unrelated personal Gmail account.
     *
     * Port 465 (implicit TLS, hence secure: true) rather than 587 + STARTTLS —
     * RFC 8314 prefers it and Migadu supports both.
     */
    const transporter = nodemailer.createTransport({
      host: "smtp.migadu.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const safeEmail = escapeHtml(email);

    await transporter.sendMail({
      from: `"${band.name} Website" <${band.email}>`,
      to: EMAIL_RECIPIENTS.join(", "),
      replyTo: email,
      subject: `Booking Inquiry from ${name}${eventType ? ` — ${eventType}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #b8860b; border-bottom: 2px solid #b8860b; padding-bottom: 8px;">
            New Booking Inquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${row("Name", escapeHtml(name))}
            ${row("Email", `<a href="mailto:${encodeURI(String(email))}">${safeEmail}</a>`)}
            ${date ? row("Event Date", escapeHtml(date)) : ""}
            ${venue ? row("Venue", escapeHtml(venue)) : ""}
            ${eventType ? row("Event Type", escapeHtml(eventType)) : ""}
          </table>
          ${
            message
              ? `<div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px;"><strong>Message:</strong><br/><br/>${escapeHtml(
                  message
                ).replace(/\n/g, "<br/>")}</div>`
              : ""
          }
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Sent from the ${band.name} website booking form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again." },
      { status: 500 }
    );
  }
}
