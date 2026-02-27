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

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
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
    const { name, email, phone, dates, locationType, riderLevel, groupSize, message, consent, _hp } = body;

    // Honeypot
    if (_hp) {
      return NextResponse.json({ success: true });
    }

    // Validation
    const errors: string[] = [];
    if (!name || typeof name !== "string" || name.trim().length < 2) errors.push("Name is required.");
    if (!email || !isValidEmail(email)) errors.push("Valid email is required.");
    if (!consent) errors.push("You must acknowledge the membership terms.");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
    }

    const resend = getResend();

    await resend.emails.send({
      from: "Maldives eFoil Club <leads@efoil.rent>",
      to: [NOTIFY_EMAIL],
      replyTo: email.trim(),
      subject: `🏄 New Club Membership Application — ${name.trim()}`,
      html: `
        <h2>New Club Membership Application</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${esc(name)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          ${phone ? `<tr><td style="padding:6px 12px;font-weight:bold;">Phone</td><td style="padding:6px 12px;">${esc(phone)}</td></tr>` : ""}
          ${dates ? `<tr><td style="padding:6px 12px;font-weight:bold;">Travel Dates</td><td style="padding:6px 12px;">${esc(dates)}</td></tr>` : ""}
          ${locationType ? `<tr><td style="padding:6px 12px;font-weight:bold;">Location Type</td><td style="padding:6px 12px;">${esc(locationType)}</td></tr>` : ""}
          ${riderLevel ? `<tr><td style="padding:6px 12px;font-weight:bold;">Rider Level</td><td style="padding:6px 12px;">${esc(riderLevel)}</td></tr>` : ""}
          ${groupSize ? `<tr><td style="padding:6px 12px;font-weight:bold;">Group Size</td><td style="padding:6px 12px;">${esc(groupSize)}</td></tr>` : ""}
          ${message ? `<tr><td style="padding:6px 12px;font-weight:bold;">Message</td><td style="padding:6px 12px;">${esc(message)}</td></tr>` : ""}
        </table>
        <p style="margin-top:16px;color:#888;font-size:12px;">Submitted via efoil.rent/club</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead (membership) error:", error);
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
