"use client";

import { useEffect, useState } from "react";
import { Column, Heading, Text, Button, Row } from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import { FaInstagram } from "react-icons/fa6"; 

export default function LoginPage() {
  const router = useRouter();
  const [pendingBooking, setPendingBooking] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("pendingBooking");
    if (data) {
      setPendingBooking(JSON.parse(data));
    }
  }, []);

  const handleInstagramBooking = () => {
    // Open Instagram DM
    const url = "https://ig.me/m/efoil.rent";
    window.open(url, "_blank");
  };

  return (
    <Column fillWidth fillHeight horizontal="center" vertical="center" paddingY="128">
      <Column maxWidth={28} gap="32" horizontal="center">
        <Column gap="12" horizontal="center">
          <Heading variant="display-strong-xs" align="center">
            Finalize your booking
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center">
            Contact us on Instagram to confirm availability and complete your reservation.
          </Text>
        </Column>

        {pendingBooking && (
          <Column fillWidth padding="m" radius="m" border="neutral-alpha-medium" gap="12">
            <Text variant="label-default-s" onBackground="neutral-medium" style={{ letterSpacing: "1px" }}>
              YOUR SELECTION
            </Text>
            <Column gap="4">
              <Text variant="body-default-m" onBackground="neutral-strong" style={{ fontWeight: 600 }}>
                {pendingBooking.place}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {pendingBooking.date || "Date not selected"} at {pendingBooking.time || "Time not selected"}
              </Text>
            </Column>
          </Column>
        )}

        <Column fillWidth gap="12">
          <Button
            fillWidth
            variant="primary"
            size="l"
            onClick={handleInstagramBooking}
            style={{ fontWeight: 600, background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", border: "none" }}
          >
            <Row gap="12" vertical="center">
              <FaInstagram size={20} />
              Message on Instagram
            </Row>
          </Button>
          
          <Button
            fillWidth
            variant="tertiary"
            size="m"
            onClick={() => router.back()}
          >
            Back to location
          </Button>
        </Column>

        <Text variant="body-default-xs" onBackground="neutral-weak" align="center" style={{ maxWidth: "240px" }}>
          By continuing, you agree to our{" "}
          <a href="/terms" style={{ textDecoration: "underline", color: "inherit" }}>
            terms of service
          </a>{" "}
          and{" "}
          <a href="/privacy" style={{ textDecoration: "underline", color: "inherit" }}>
            privacy policy
          </a>.
        </Text>
      </Column>
    </Column>
  );
}
