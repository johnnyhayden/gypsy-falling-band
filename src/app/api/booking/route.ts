import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { band } from "@/lib/data";

/*
 * The full recipient list, independent of whichever Gmail account happens to be
 * doing the sending — GMAIL_USER is the transport credential, not an address to
 * deliver to.
 */
const EMAIL_RECIPIENTS = [
  "johnnyhayden+golddustandwildflowers@gmail.com",
  "joefortemusic@gmail.com",
];

/*
 * Text-message alerts ride AT&T's email-to-SMS gateway rather than a messaging
 * provider — a Twilio sender would have meant toll-free carrier verification for
 * what is one notification to one phone.
 *
 * The tradeoff is that these gateways are unofficial, rate-limited, and being
 * quietly retired carrier by carrier, so this is strictly a best-effort nudge:
 * it gets its own short plain-text send, and its failure is logged rather than
 * surfaced. The inquiry itself lives or dies with the real email above.
 */
const SMS_GATEWAY_RECIPIENTS = ["6152942922@txt.att.net"];

/* Gateways truncate hard, so say who and what, and let the email carry the rest. */
function formatAlertBody(
  name: string,
  eventType?: string,
  date?: string
): string {
  const detail = [eventType, date].filter(Boolean).join(" ");
  const line = `New booking inquiry: ${name}${detail ? ` — ${detail}` : ""}. Details in email.`;
  return line.length > 155 ? `${line.slice(0, 152)}...` : line;
}

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const safeEmail = escapeHtml(email);

    await transporter.sendMail({
      from: `"${band.name} Website" <${process.env.GMAIL_USER}>`,
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

    /*
     * Deliberately after the await above: the inquiry is already safe by this
     * point, so a dead gateway costs the visitor nothing.
     */
    try {
      await transporter.sendMail({
        from: `"${band.name} Website" <${process.env.GMAIL_USER}>`,
        to: SMS_GATEWAY_RECIPIENTS.join(", "),
        subject: "",
        text: formatAlertBody(name, eventType, date),
      });
    } catch (alertError) {
      console.warn("SMS gateway alert failed:", alertError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again." },
      { status: 500 }
    );
  }
}
