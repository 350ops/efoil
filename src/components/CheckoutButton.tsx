"use client";

import { Button } from "@once-ui-system/core";
import { useState } from "react";
import { trackCheckout } from "@/lib/analytics";

interface CheckoutButtonProps {
  packageId: string;
  packageName: string;
  popular?: boolean;
}

export function CheckoutButton({ packageId, packageName, popular }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    trackCheckout(packageId);
    window.location.href = "/efoil-experiences-maldives";
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
