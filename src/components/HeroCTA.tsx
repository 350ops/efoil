"use client";

import { Button, Column, Row } from "@once-ui-system/core";
import { trackBookNow, trackViewPackages } from "@/lib/analytics";

export function HeroCTA() {
  return (
    <Column gap="16" horizontal="center" fillWidth>
      <Row gap="16" wrap horizontal="center" fillWidth s={{ direction: "column" }}>
        <Button
          id="yacht-delivery"
          data-border="rounded"
          href="/yachts"
          variant="primary"
          size="l"
          weight="strong"
          arrowIcon
          onClick={() => trackBookNow("hero_yacht")}
        >
          Yacht Delivery
        </Button>
        <Button
          id="efoil-experiences"
          data-border="rounded"
          href="/efoil-experiences-maldives"
          variant="primary"
          size="l"
          weight="strong"
          arrowIcon
          onClick={() => trackBookNow("hero_experiences")}
        >
          Private eFoil Experiences
        </Button>
      </Row>
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
    <Row gap="16" wrap horizontal="center" fillWidth s={{ direction: "column" }}>
      <Button
        href="/yachts"
        variant="primary"
        size="l"
        weight="strong"
        arrowIcon
        onClick={() => trackViewPackages("bottom_cta_yacht")}
      >
        Yacht Delivery
      </Button>
      <Button
        href="/efoil-experiences-maldives"
        variant="secondary"
        size="l"
        weight="strong"
        arrowIcon
        onClick={() => trackViewPackages("bottom_cta_experiences")}
      >
        Private eFoil Experiences
      </Button>
    </Row>
  );
}
