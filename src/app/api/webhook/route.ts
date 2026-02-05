import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-01-28.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

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
