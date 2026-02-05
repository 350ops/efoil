import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-01-28.clover",
});

// eFoil rental packages
const PACKAGES = {
  hourly: {
    name: "eFoil Hourly Session (2hr minimum)",
    description: "2 hours minimum - Audi e-tron eFoil rental with instruction",
    price: 50000, // $500.00 in cents (2hr minimum @ $250/hr)
    currency: "usd",
  },
  halfday: {
    name: "eFoil Half-Day Adventure",
    description: "4 hours of unlimited riding - Audi e-tron eFoil rental with instruction",
    price: 80000, // $800.00 in cents
    currency: "usd",
  },
  fullday: {
    name: "eFoil Full-Day Experience",
    description: "8 hours with the eFoil - Audi e-tron eFoil rental with instruction",
    price: 140000, // $1,400.00 in cents
    currency: "usd",
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { packageType, quantity = 1, customerEmail, deliveryLocation, date } = body;

    // Validate package type
    if (!packageType || !PACKAGES[packageType as keyof typeof PACKAGES]) {
      return NextResponse.json(
        { error: "Invalid package type. Choose: hourly, halfday, or fullday" },
        { status: 400 }
      );
    }

    const selectedPackage = PACKAGES[packageType as keyof typeof PACKAGES];

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      ...(customerEmail && { customer_email: customerEmail }),
      line_items: [
        {
          price_data: {
            currency: selectedPackage.currency,
            product_data: {
              name: selectedPackage.name,
              description: selectedPackage.description,
              metadata: {
                deliveryLocation: deliveryLocation || "TBD",
                date: date || "TBD",
              },
            },
            unit_amount: selectedPackage.price,
          },
          quantity: quantity,
        },
      ],
      metadata: {
        packageType,
        deliveryLocation: deliveryLocation || "TBD",
        date: date || "TBD",
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://efoil.rent"}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://efoil.rent"}/work/audi-etron-efoil-experience`,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve available packages
export async function GET() {
  return NextResponse.json({
    packages: Object.entries(PACKAGES).map(([key, pkg]) => ({
      id: key,
      name: pkg.name,
      description: pkg.description,
      price: pkg.price / 100, // Convert cents to dollars
      currency: pkg.currency.toUpperCase(),
    })),
  });
}
