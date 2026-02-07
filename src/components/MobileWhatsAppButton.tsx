"use client";

import { IconButton, Row } from "@once-ui-system/core";
import { usePathname } from "next/navigation";
import { trackWhatsApp } from "@/lib/analytics";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9606783344";

export function MobileWhatsAppButton() {
  const pathname = usePathname();
  
  if (pathname === "/booking/success") {
    return null;
  }

  const whatsappMessage = pathname === "/work" 
    ? "Hi! I'd like to book an eFoil experience."
    : "Hi! I'm interested in the eFoil rentals.";

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
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        icon="whatsapp"
        variant="primary"
        size="l"
        tooltip="Book via WhatsApp"
        onClick={() => trackWhatsApp("mobile_fab")}
        style={{
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
        }}
      />
    </Row>
  );
}
