import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import twilio from "twilio";

const SMS_RECIPIENTS = ["6152942922"];

function formatSmsBody(name: string, email: string, eventType?: string, date?: string, venue?: string, message?: string): string {
  const lines = [
    `New booking inquiry from ${name} <${email}>`,
    eventType ? `Event: ${eventType}` : null,
    date ? `Date: ${date}` : null,
    venue ? `Venue: ${venue}` : null,
    message ? `Message: ${message}` : null,
  ].filter(Boolean);
  return lines.join("\n");
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

    const emailPromise = transporter.sendMail({
      from: `"Gypsy Falling Band Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Booking Inquiry from ${name}${eventType ? ` — ${eventType}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #b8860b; border-bottom: 2px solid #b8860b; padding-bottom: 8px;">
            New Booking Inquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 120px;"><strong>Name</strong></td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Email</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${date ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Event Date</strong></td><td style="padding: 8px 0;">${date}</td></tr>` : ""}
            ${venue ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Venue</strong></td><td style="padding: 8px 0;">${venue}</td></tr>` : ""}
            ${eventType ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Event Type</strong></td><td style="padding: 8px 0;">${eventType}</td></tr>` : ""}
          </table>
          ${message ? `<div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px;"><strong>Message:</strong><br/><br/>${message.replace(/\n/g, "<br/>")}</div>` : ""}
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Sent from the Gypsy Falling Band website booking form
          </p>
        </div>
      `,
    });

    const twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const smsBody = formatSmsBody(name, email, eventType, date, venue, message);

    const smsPromises = SMS_RECIPIENTS.map((to) =>
      twilioClient.messages.create({
        body: smsBody,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+1${to}`,
      })
    );

    const [emailResult, ...smsResults] = await Promise.allSettled([
      emailPromise,
      ...smsPromises,
    ]);

    if (emailResult.status === "rejected") {
      console.error("Booking email error:", emailResult.reason);
    }

    smsResults.forEach((result, i) => {
      if (result.status === "rejected") {
        console.error(`SMS error for ${SMS_RECIPIENTS[i]}:`, result.reason);
      }
    });

    const emailOk = emailResult.status === "fulfilled";
    const anySmsOk = smsResults.some((r) => r.status === "fulfilled");

    if (!emailOk && !anySmsOk) {
      return NextResponse.json(
        { error: "Failed to send inquiry. Please try again." },
        { status: 500 }
      );
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
