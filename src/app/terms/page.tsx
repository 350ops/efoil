"use client";

import { Column, Heading, Text, Row, Button } from "@once-ui-system/core";
import { useRouter } from "next/navigation";

export default function TermsOfService() {
  const router = useRouter();

  return (
    <Column fillWidth horizontal="center" paddingY="128" paddingX="m">
      <Column maxWidth="m" gap="32">
        <Button
          variant="tertiary"
          size="s"
          prefixIcon="home"
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>

        <Column gap="12">
          <Heading variant="display-strong-xs">Terms of Service</Heading>
          <Text onBackground="neutral-weak">Last Updated: February 12, 2026</Text>
        </Column>

        <Column gap="24">
          <Section title="1. Service Description">
            eFoil Maldives acts as a concierge service connecting customers with independent, vetted eFoil rental providers in the Maldives. We facilitate the communication and logistics for delivery to yachts, boats, and resorts.
          </Section>

          <Section title="2. Booking and Payments">
            All bookings are subject to availability. Prices and delivery fees may vary based on your location (distance from Malé). Final payment and rental agreements are typically finalized directly with the service provider.
          </Section>

          <Section title="3. Safety and Liability">
            eFoiling is an extreme sport. Users must follow all safety instructions provided by the equipment operators. eFoil Maldives is not liable for any injuries, accidents, or damages occurring during the use of equipment provided by our partners.
          </Section>

          <Section title="4. Cancellations and Refunds">
            Cancellation policies are determined by the individual providers. We recommend confirming the specific cancellation terms at the time of booking. Weather-related cancellations are at the discretion of the operator for safety reasons.
          </Section>

          <Section title="5. User Conduct">
            Users must treat the equipment with care and respect local Maldivian maritime and environmental regulations. Damage to equipment may result in additional charges from the provider.
          </Section>

          <Section title="6. Governing Law">
            These terms are governed by and construed in accordance with the laws of the Maldives.
          </Section>
        </Column>

        <Row paddingTop="32" borderTop="neutral-alpha-medium">
          <Text variant="body-default-xs" onBackground="neutral-weak">
            © 2026 eFoil Maldives. All rights reserved.
          </Text>
        </Row>
      </Column>
    </Column>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Column gap="8">
      <Heading as="h2" variant="heading-strong-s">
        {title}
      </Heading>
      <Text variant="body-default-m" onBackground="neutral-weak">
        {children}
      </Text>
    </Column>
  );
}
