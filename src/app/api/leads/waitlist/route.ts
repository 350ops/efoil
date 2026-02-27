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
    const { email, name, dates, locationType, _hp } = body;

    // Honeypot
    if (_hp) {
      return NextResponse.json({ success: true });
    }

    // Validation
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    const resend = getResend();

    await resend.emails.send({
      from: "Maldives eFoil Club <leads@efoil.rent>",
      to: [NOTIFY_EMAIL],
      replyTo: email.trim(),
      subject: `📋 New Waitlist Signup — ${name ? name.trim() : email.trim()}`,
      html: `
        <h2>New Club Waitlist Signup</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
          ${name ? `<tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${esc(name)}</td></tr>` : ""}
          ${dates ? `<tr><td style="padding:6px 12px;font-weight:bold;">Travel Dates</td><td style="padding:6px 12px;">${esc(dates)}</td></tr>` : ""}
          ${locationType ? `<tr><td style="padding:6px 12px;font-weight:bold;">Location Type</td><td style="padding:6px 12px;">${esc(locationType)}</td></tr>` : ""}
        </table>
        <p style="margin-top:16px;color:#888;font-size:12px;">Submitted via efoil.rent/club waitlist</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead (waitlist) error:", error);
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
