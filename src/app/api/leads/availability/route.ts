import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/utils/rateLimit";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

const NOTIFY_EMAIL = process.env.NOTIFICATION_EMAIL || "hello@efoil.rent";

// Basic email check — no heavy lib needed
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const rl = rateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } },
      );
    }

    const body = await request.json();
    const { name, email, phone, location, dates, guests, message, _hp } = body;

    // Honeypot — if filled, silently succeed (bot doesn't know it failed)
    if (_hp) {
      return NextResponse.json({ success: true });
    }

    // Validation
    const errors: string[] = [];
    if (!name || typeof name !== "string" || name.trim().length < 2) errors.push("Name is required.");
    if (!email || !isValidEmail(email)) errors.push("Valid email is required.");
    if (!location || typeof location !== "string" || location.trim().length < 2) errors.push("Location is required.");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
    }

    const resend = getResend();

    await resend.emails.send({
      from: "eFoil Maldives <leads@efoil.rent>",
      to: [NOTIFY_EMAIL],
      replyTo: email.trim(),
      subject: `🏄 New eFoil Availability Request — ${name.trim()}`,
      html: `
        <h2>New Availability Request</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${esc(name)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          ${phone ? `<tr><td style="padding:6px 12px;font-weight:bold;">Phone</td><td style="padding:6px 12px;">${esc(phone)}</td></tr>` : ""}
          <tr><td style="padding:6px 12px;font-weight:bold;">Location</td><td style="padding:6px 12px;">${esc(location)}</td></tr>
          ${dates ? `<tr><td style="padding:6px 12px;font-weight:bold;">Preferred Dates</td><td style="padding:6px 12px;">${esc(dates)}</td></tr>` : ""}
          ${guests ? `<tr><td style="padding:6px 12px;font-weight:bold;">Guests</td><td style="padding:6px 12px;">${esc(guests)}</td></tr>` : ""}
          ${message ? `<tr><td style="padding:6px 12px;font-weight:bold;">Message</td><td style="padding:6px 12px;">${esc(message)}</td></tr>` : ""}
        </table>
        <p style="margin-top:16px;color:#888;font-size:12px;">Submitted via efoil.rent</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead (availability) error:", error);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }
}

function esc(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
