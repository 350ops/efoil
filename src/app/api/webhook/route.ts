import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Lazy initialization of Stripe to avoid build-time errors
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(secretKey, {
    apiVersion: "2026-01-28.clover",
  });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Extract booking details from metadata
      const { packageType, deliveryLocation, date } = session.metadata || {};
      const customerEmail = session.customer_email;
      const amountTotal = session.amount_total ? session.amount_total / 100 : 0;

      console.log("=== New Booking Received ===");
      console.log(`Package: ${packageType}`);
      console.log(`Customer: ${customerEmail}`);
      console.log(`Amount: $${amountTotal}`);
      console.log(`Delivery Location: ${deliveryLocation}`);
      console.log(`Date: ${date}`);
      console.log(`Session ID: ${session.id}`);
      console.log("============================");

      // TODO: Add your notification logic here
      // Options:
      // 1. Send email notification (using Resend, SendGrid, etc.)
      // 2. Send WhatsApp notification (using Twilio)
      // 3. Save to database
      // 4. Send to Slack/Discord

      break;
    }

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`Payment succeeded: ${paymentIntent.id}`);
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`Payment failed: ${paymentIntent.id}`);
      // TODO: Handle failed payment (notify customer, etc.)
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
