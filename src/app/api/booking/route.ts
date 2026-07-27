import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { band } from "@/lib/data";

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
      to: process.env.GMAIL_USER,
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
    console.error("Booking email error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again." },
      { status: 500 }
    );
  }
}
