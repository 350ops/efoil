"use client";

import { IconButton, Row } from "@once-ui-system/core";
import { trackInstagram } from "@/lib/analytics";

const INSTAGRAM_URL = "https://www.instagram.com/efoil.maldives/";

export function ClubFloatingCTA() {
  return (
    <Row
      position="fixed"
      bottom="24"
      right="16"
      zIndex={10}
    >
      <IconButton
        href={INSTAGRAM_URL}
        icon="instagram"
        variant="primary"
        size="l"
        tooltip="Instagram Concierge"
        onClick={() => trackInstagram("club_floating_cta")}
        style={{
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
        }}
      />
    </Row>
  );
}
