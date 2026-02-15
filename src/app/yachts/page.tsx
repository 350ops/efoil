import {
  Heading,
  Text,
  Button,
  RevealFx,
  Column,
  Row,
  Schema,
  Meta,
  Grid,
  Flex,
  Line,
} from "@once-ui-system/core";
import { baseURL, person, about } from "@/resources";
import { RequestAvailabilityForm } from "@/components/RequestAvailabilityForm";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9606783344";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: "Yacht eFoil Rental Maldives | Delivered to Your Vessel",
      description:
        "Premium Audi e-tron eFoil rentals delivered directly to superyachts, charter yachts, and liveaboards across Maldives. Professional setup, instruction, and all safety gear included.",
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent("Yacht eFoil Rental")}`,
      path: "/yachts",
    }),
    alternates: { canonical: "/yachts" },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you deliver an eFoil to my yacht?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our partner team arrives by tender or support vessel with the fully charged eFoil, safety gear, and all accessories. We coordinate GPS location and arrival time in advance.",
      },
    },
    {
      "@type": "Question",
      name: "Can you deliver to a yacht at anchor anywhere in Maldives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We operate across all major atolls in Maldives. Whether you are anchored in North Malé, Baa, Raa, or further south, we can arrange delivery. Logistics depend on location and are confirmed when you book.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide an instructor on board?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A certified instructor accompanies every delivery. They handle setup, run a safety briefing tailored to your group, and stay on-site throughout the session to coach riders and manage the equipment.",
      },
    },
    {
      "@type": "Question",
      name: "What if my guests have never tried eFoiling?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No experience is needed. The Audi e-tron eFoil has a wireless speed controller that allows gradual progression. Our instructor adapts to each rider's comfort level, and most guests are riding confidently within 15–20 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book for a multi-day yacht charter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We offer flexible multi-day packages where the eFoil stays aboard for the duration of your charter. Contact us for custom pricing based on the number of days and your itinerary.",
      },
    },
    {
      "@type": "Question",
      name: "Is the eFoil safe to use near a yacht?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The eFoil is electrically powered with no exposed propeller—the motor is enclosed within the hydrofoil mast. Our instructor establishes a safe operating area away from the hull, tenders, and swim platform before each session.",
      },
    },
  ],
};

export default function YachtsPage() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" paddingX="16" horizontal="center" s={{ paddingY: "8", paddingX: "12", gap: "l" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/yachts"
        title="Yacht eFoil Rental Maldives | Delivered to Your Vessel"
        description="Premium Audi e-tron eFoil rentals delivered directly to superyachts, charter yachts, and liveaboards across Maldives."
        image={`/api/og/generate?title=${encodeURIComponent("Yacht eFoil Rental")}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <Column fillWidth horizontal="center" gap="l" s={{ gap: "m" }}>
        <Column maxWidth="m" horizontal="center" align="center">
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16" s={{ paddingBottom: "12" }}>
            <Heading as="h1" wrap="balance" variant="display-strong-xl" align="center">
              eFoil Delivery to Your Yacht
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32" s={{ paddingBottom: "20" }}>
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              We arrange delivery of the Audi e-tron eFoil directly to your vessel—anywhere in the Maldives. Professional instructor, safety gear, and seamless logistics included.
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" fillWidth s={{ paddingTop: "8" }}>
            <Row gap="16" wrap horizontal="center" fillWidth s={{ direction: "column", gap: "12" }}>
              <Button
                data-border="rounded"
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I'd like to arrange eFoil delivery to our yacht in Maldives.")}`}
                variant="primary"
                size="l"
                weight="strong"
                arrowIcon
              >
                Arrange Yacht Delivery
              </Button>
              <Button
                data-border="rounded"
                href="/work"
                variant="secondary"
                size="l"
              >
                View Packages
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* How Yacht Delivery Works */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="xl" paddingY="xl" s={{ gap: "l", paddingY: "l" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              How Yacht Delivery Works
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              A turnkey experience designed around your schedule
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            <Column padding="32" gap="20" horizontal="center" background="neutral-alpha-weak" radius="l" s={{ padding: "24", gap: "16", radius: "m" }}>
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center" s={{ padding: "12" }}>
                <Text variant="display-strong-m" onBackground="brand-strong">1</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Coordinate
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Share your yacht's location, preferred date and time. We coordinate logistics with our partners to meet you at your anchorage.
              </Text>
            </Column>

            <Column padding="32" gap="20" horizontal="center" background="neutral-alpha-weak" radius="l" s={{ padding: "24", gap: "16", radius: "m" }}>
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center" s={{ padding: "12" }}>
                <Text variant="display-strong-m" onBackground="brand-strong">2</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Board & Brief
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Use the tender to meet the partner instructor, who sets up the eFoil and runs a tailored safety briefing for your guests.
              </Text>
            </Column>

            <Column padding="32" gap="20" horizontal="center" background="neutral-alpha-weak" radius="l" s={{ padding: "24", gap: "16", radius: "m" }}>
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center" s={{ padding: "12" }}>
                <Text variant="display-strong-m" onBackground="brand-strong">3</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Ride & Enjoy
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Guests take turns flying above the water with one-on-one coaching. We handle everything and leave no trace.
              </Text>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* Why Yachts Choose Us */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Row fillWidth paddingRight="64" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              Built for Yacht Operations
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Designed to integrate with your crew's workflow, not disrupt it
            </Text>
          </Column>

          <Grid columns="2" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l" s={{ padding: "24", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-m">
                Zero Storage Required
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Partners bring the eFoil and take it when they leave. No need to allocate tender garage space or worry about onboard charging.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l" s={{ padding: "24", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-m">
                Crew-Friendly
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                The instructor manages the entire session. Your crew can focus on hospitality while our partners handle the water sport activity.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l" s={{ padding: "24", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-m">
                Multi-Day Charters
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Booking a longer charter? We offer multi-day packages where the eFoil stays aboard with flexible session scheduling throughout the trip.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l" s={{ padding: "24", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-m">
                Insurance & Liability
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                All sessions are covered by our insurance. We provide waivers and handle safety protocols so your charter operation stays protected.
              </Text>
            </Column>
          </Grid>

          <Row fillWidth paddingLeft="64" horizontal="end" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
        </Column>
      </RevealFx>

      {/* Coverage */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              Delivery Coverage
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Operating across Maldives atolls
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            {["North Malé Atoll", "South Malé Atoll", "Baa Atoll", "Raa Atoll", "Ari Atoll", "Other Atolls"].map((atoll) => (
              <Column key={atoll} padding="24" gap="8" horizontal="center" background="neutral-alpha-weak" radius="l" s={{ padding: "20", radius: "m" }}>
                <Heading as="h3" variant="heading-strong-s" align="center">
                  {atoll}
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                  {atoll === "Other Atolls" ? "Contact us to discuss delivery to remote locations" : "Regular delivery coverage with confirmed availability"}
                </Text>
              </Column>
            ))}
          </Grid>
        </Column>
      </RevealFx>

      {/* FAQ */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              Frequently Asked Questions
            </Heading>
          </Column>

          <Column fillWidth gap="20" s={{ gap: "16" }}>
            {faqSchema.mainEntity.map((faq) => (
              <Column key={faq.name} padding="32" gap="12" background="neutral-alpha-weak" radius="l" s={{ padding: "24", radius: "m" }}>
                <Heading as="h3" variant="heading-strong-m">
                  {faq.name}
                </Heading>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {faq.acceptedAnswer.text}
                </Text>
              </Column>
            ))}
          </Column>
        </Column>
      </RevealFx>

      {/* Availability Form */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <RequestAvailabilityForm />
      </RevealFx>
    </Column>
  );
}
