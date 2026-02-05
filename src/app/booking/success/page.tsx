import {
  Column,
  Heading,
  Text,
  Button,
  Card,
  Meta,
  Row,
} from "@once-ui-system/core";
import { baseURL } from "@/resources";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9606783344";

export async function generateMetadata() {
  return Meta.generate({
    title: "Booking Confirmed | eFoil Maldives",
    description: "Your eFoil experience has been booked. We'll be in touch soon with confirmation details.",
    baseURL: baseURL,
    path: "/booking/success",
  });
}

export default function BookingSuccess() {
  return (
    <Column maxWidth="s" gap="xl" paddingY="xl" paddingX="16" horizontal="center" s={{ gap: "l", paddingY: "l", paddingX: "12" }}>
      <Card
        fillWidth
        padding="48"
        gap="24"
        direction="column"
        horizontal="center"
        background="brand-alpha-weak"
        radius="xl"
        s={{ padding: "32", gap: "20", radius: "l" }}
      >
        <Row
          background="brand-alpha-strong"
          radius="full"
          padding="20"
          horizontal="center"
          vertical="center"
          s={{ padding: "16" }}
        >
          <Text variant="display-strong-l">✓</Text>
        </Row>
        
        <Heading as="h1" variant="display-strong-l" align="center">
          Booking Confirmed!
        </Heading>
        
        <Text variant="body-default-l" onBackground="neutral-weak" align="center">
          Thank you for booking your eFoil experience. We've sent a confirmation email with all the details.
        </Text>

        <Column gap="m" fillWidth horizontal="center" paddingTop="l" s={{ gap: "12", paddingTop: "m" }}>
          <Text variant="heading-default-m" align="center">
            What happens next?
          </Text>
          <Column gap="s" horizontal="center" s={{ gap: "8" }}>
            <Text variant="body-default-m" onBackground="neutral-weak" align="center">
              1. You'll receive a confirmation email within minutes
            </Text>
            <Text variant="body-default-m" onBackground="neutral-weak" align="center">
              2. Our team will contact you to confirm delivery details
            </Text>
            <Text variant="body-default-m" onBackground="neutral-weak" align="center">
              3. We'll arrive at your location with everything you need
            </Text>
          </Column>
        </Column>

        <Row gap="16" paddingTop="l" wrap horizontal="center" fillWidth s={{ direction: "column", gap: "12", paddingTop: "m" }}>
          <Button
            href="/"
            variant="primary"
            size="l"
            s={{ fillWidth: true }}
          >
            Back to Home
          </Button>
          <Button
            href={`https://wa.me/${whatsappNumber}`}
            variant="secondary"
            size="l"
            s={{ fillWidth: true }}
          >
            Contact Us on WhatsApp
          </Button>
        </Row>
      </Card>

      <Text variant="body-default-s" onBackground="neutral-weak" align="center">
        Questions? Email us at hello@efoil.rent
      </Text>
    </Column>
  );
}
