"use client";

import { Button, Column, Row } from "@once-ui-system/core";
import { trackBookNow, trackViewPackages } from "@/lib/analytics";

export function HeroCTA() {
  return (
    <Column gap="16" horizontal="center" fillWidth>
      <Row gap="16" wrap horizontal="center" fillWidth s={{ direction: "column" }}>
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
          eFoil Experiences
        </Button>
        <Button
          id="learn-efoil"
          data-border="rounded"
          href="/learn-efoil-maldives"
          variant="primary"
          size="l"
          weight="strong"
          arrowIcon
          onClick={() => trackBookNow("hero_learn")}
        >
          Learn to eFoil
        </Button>
      </Row>
      <Button
        id="own-efoil"
        data-border="rounded"
        href="/audi-foil-board"
        variant="secondary"
        size="l"
        fillWidth
        onClick={() => trackViewPackages("hero_own")}
      >
        Own an eFoil
      </Button>
    </Column>
  );
}

export function BottomCTA() {
  return (
    <Row gap="16" wrap horizontal="center" fillWidth s={{ direction: "column" }}>
      <Button
        href="/efoil-experiences-maldives"
        variant="primary"
        size="l"
        weight="strong"
        arrowIcon
        onClick={() => trackViewPackages("bottom_cta_experiences")}
      >
        eFoil Experiences
      </Button>
      <Button
        href="/learn-efoil-maldives"
        variant="secondary"
        size="l"
        weight="strong"
        arrowIcon
        onClick={() => trackViewPackages("bottom_cta_learn")}
      >
        Learn to eFoil
      </Button>
    </Row>
  );
}
