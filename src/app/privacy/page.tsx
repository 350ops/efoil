"use client";

import { Column, Heading, Text, Row, Button } from "@once-ui-system/core";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
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
          <Heading variant="display-strong-xs">Privacy Policy</Heading>
          <Text onBackground="neutral-weak">Last Updated: February 12, 2026</Text>
        </Column>

        <Column gap="24">
          <Section title="1. Information We Collect">
            We collect information you provide directly to us when you request a booking, subscribe to our newsletter, or contact us. This includes your name, email address, phone number, and location details (resort or yacht coordinates).
          </Section>

          <Section title="2. How We Use Your Information">
            We use the information we collect to arrange your eFoil experiences | Maldives, facilitate your bookings, and communicate with you about our services. We do not sell your personal data to third parties.
          </Section>

          <Section title="3. Data Protection">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or alteration. However, no method of transmission over the Internet is 100% secure.
          </Section>

          <Section title="4. Sharing Information with Partners">
            By requesting a booking, you authorize us to share your relevant logistics data (location, date, time) with our trusted local eFoil providers so they can complete your delivery and instruction.
          </Section>

          <Section title="5. Your Rights">
            You have the right to access, update, or delete your personal information. If you wish to exercise these rights, please contact us at hello@efoil.rent.
          </Section>

          <Section title="6. Cookies">
            We use cookies and similar tracking technologies to analyze site traffic and enhance your browsing experience. You can control cookie settings through your browser.
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
