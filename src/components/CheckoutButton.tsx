"use client";

import { Button } from "@once-ui-system/core";
import { useState } from "react";

interface CheckoutButtonProps {
  packageId: string;
  packageName: string;
  popular?: boolean;
}

export function CheckoutButton({ packageId, packageName, popular }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageType: packageId,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned");
        alert("Unable to start checkout. Please try again or contact us via WhatsApp.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Unable to start checkout. Please try again or contact us via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      variant={popular ? "primary" : "secondary"}
      size="l"
      fillWidth
      disabled={loading}
    >
      {loading ? "Loading..." : `Book ${packageName}`}
    </Button>
  );
}
