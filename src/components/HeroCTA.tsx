"use client";

import { Button, Column } from "@once-ui-system/core";
import { trackBookNow, trackViewPackages } from "@/lib/analytics";

export function HeroCTA() {
  return (
    <Column gap="16" horizontal="center" fillWidth s={{ gap: "12" }}>
      <Button
        id="book-now"
        data-border="rounded"
        href="/work"
        variant="primary"
        size="l"
        weight="strong"
        arrowIcon
        fillWidth
        onClick={() => trackBookNow("hero")}
      >
        Book Your eFoil
      </Button>
      <Button
        id="learn-more"
        data-border="rounded"
        href="/about"
        variant="secondary"
        size="l"
        fillWidth
        onClick={() => trackViewPackages("hero_learn_more")}
      >
        Learn More
      </Button>
    </Column>
  );
}

export function BottomCTA() {
  return (
    <Button
      href="/work"
      variant="primary"
      size="l"
      weight="strong"
      arrowIcon
      fillWidth
      onClick={() => trackViewPackages("bottom_cta")}
    >
      View Packages & Book Now
    </Button>
  );
}
