"use client";

import { IconButton, Row } from "@once-ui-system/core";
import { usePathname } from "next/navigation";
import { trackInstagram } from "@/lib/analytics";

const INSTAGRAM_HANDLE = "efoil.maldives";

export function MobileWhatsAppButton() {
  const pathname = usePathname();
  
  if (pathname === "/booking/success") {
    return null;
  }

  return (
    <Row
      hide
      s={{ hide: false }}
      position="fixed"
      bottom="24"
      right="16"
      zIndex={10}
    >
      <IconButton
        href={`https://ig.me/m/${INSTAGRAM_HANDLE}`}
        icon="instagram"
        variant="primary"
        size="l"
        tooltip="Message us on Instagram"
        onClick={() => trackInstagram("mobile_fab")}
        style={{
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
        }}
      />
    </Row>
  );
}
