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

const instagramUrl = "https://www.instagram.com/efoil.maldives/";

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
        text: "Our team arrives by tender or support vessel with the fully charged eFoil, safety gear, and all accessories. We coordinate GPS location and arrival time in advance.",
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
    <Column maxWidth="l" gap="xl" paddingY="12" paddingX="16" horizontal="center">
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
      <Column fillWidth horizontal="center" gap="l">
        <Column maxWidth="m" horizontal="center" align="center">
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading as="h1" wrap="balance" variant="display-strong-xl" align="center">
              eFoil Delivery to Your Yacht
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              We arrange delivery of the Audi e-tron eFoil directly to your vessel—anywhere | Maldives. Professional instructor, safety gear, and seamless logistics included.
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" fillWidth>
            <Row gap="16" wrap horizontal="center" fillWidth s={{ direction: "column" }}>
              <Button
                data-border="rounded"
                href={instagramUrl}
                variant="primary"
                size="l"
                weight="strong"
                arrowIcon
              >
                Arrange Yacht Delivery
              </Button>
              <Button
                data-border="rounded"
                href="#packages"
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
        <Column fillWidth gap="xl" paddingY="xl">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              How Yacht Delivery Works
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              A turnkey experience designed around your schedule
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth>
            <Column padding="32" gap="20" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center">
                <Text variant="display-strong-m" onBackground="brand-strong">1</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Coordinate
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Share your yacht's location, preferred date and time. We coordinate logistics to meet you at your anchorage.
              </Text>
            </Column>

            <Column padding="32" gap="20" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center">
                <Text variant="display-strong-m" onBackground="brand-strong">2</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Board & Brief
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Our instructor arrives, sets up the eFoil, and runs a tailored safety briefing for your guests.
              </Text>
            </Column>

            <Column padding="32" gap="20" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center">
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
        <Column fillWidth gap="l" paddingY="l">
          <Row fillWidth paddingRight="64" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Built for Yacht Operations
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Designed to integrate with your crew's workflow, not disrupt it
            </Text>
          </Column>

          <Grid columns="2" gap="24" fillWidth>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Zero Storage Required
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                We bring the eFoil and take it when we leave. No need to allocate tender garage space or worry about onboard charging.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Crew-Friendly
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                The instructor manages the entire session. Your crew can focus on hospitality while we handle the water sport activity.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Multi-Day Charters
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Booking a longer charter? We offer multi-day packages where the eFoil stays aboard with flexible session scheduling throughout the trip.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
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
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Delivery Coverage
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Operating across Maldives atolls
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth>
            {["North Malé Atoll", "South Malé Atoll", "Baa Atoll", "Raa Atoll", "Ari Atoll", "Other Atolls"].map((atoll) => (
              <Column key={atoll} padding="24" gap="8" horizontal="center" background="neutral-alpha-weak" radius="l">
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

      {/* Yacht Packages */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column id="packages" fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Yacht Packages
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Flexible options tailored to your charter schedule
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth>
            <Column padding="32" gap="12" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-l" align="center">
                Half-Day Session
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Up to 4 hours with a dedicated instructor. Ideal for a morning or afternoon activity for your guests.
              </Text>
              <Column gap="8" paddingTop="8">
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Instructor on-site throughout</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">All safety gear included</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Delivery & pickup at anchor</Text>
              </Column>
            </Column>
            <Column padding="32" gap="12" horizontal="center" background="brand-alpha-weak" radius="l" border="brand-alpha-medium">
              <Heading as="h3" variant="heading-strong-l" align="center">
                Full-Day Charter Add-On
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                The eFoil and instructor stay with your yacht for the full day. Guests ride whenever they like between activities.
              </Text>
              <Column gap="8" paddingTop="8">
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Flexible scheduling throughout the day</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Multiple battery rotations</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Ideal for guest groups of 4+</Text>
              </Column>
            </Column>
            <Column padding="32" gap="12" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-l" align="center">
                Multi-Day Package
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                The eFoil stays aboard for the duration of your charter. Daily sessions at your convenience across atolls.
              </Text>
              <Column gap="8" paddingTop="8">
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Board remains onboard your yacht</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Custom itinerary support</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Best per-day rate</Text>
              </Column>
            </Column>
          </Grid>

          <Text variant="body-default-s" onBackground="neutral-weak" align="center">
            Pricing is based on delivery location and duration. Contact us for a custom quote.
          </Text>

          <Row fillWidth horizontal="center" paddingTop="m">
            <Button
              data-border="rounded"
              href={instagramUrl}
              variant="primary"
              size="l"
              weight="strong"
              arrowIcon
            >
              Get a Custom Quote
            </Button>
          </Row>
        </Column>
      </RevealFx>

      {/* FAQ */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Frequently Asked Questions
            </Heading>
          </Column>

          <Column fillWidth gap="20">
            {faqSchema.mainEntity.map((faq) => (
              <Column key={faq.name} padding="32" gap="12" background="neutral-alpha-weak" radius="l">
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

      {/* Cross-link */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column
          fillWidth
          padding="32"
          gap="16"
          horizontal="center"
          background="neutral-alpha-weak"
          radius="xl"
        >
          <Heading as="h3" variant="heading-strong-l" align="center">
            Not on a Yacht?
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center">
            We also offer private eFoil experiences delivered to resorts, private islands, and locations near Mal&eacute;.
          </Text>
          <Button href="/efoil-experiences-maldives" variant="secondary" size="m" arrowIcon>
            View Private Experiences
          </Button>
        </Column>
      </RevealFx>

      {/* Availability Form */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <RequestAvailabilityForm />
      </RevealFx>
    </Column>
  );
}
