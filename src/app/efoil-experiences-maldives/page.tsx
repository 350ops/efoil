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
  Media,
} from "@once-ui-system/core";
import { baseURL, person, about } from "@/resources";

const instagramUrl = "https://www.instagram.com/efoil.maldives/";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: "Private eFoil Experiences Maldives | Yacht & Boat Delivery",
      description:
        "Curated private eFoil experiences across the Maldives. Audi e-tron electric hydrofoil delivered to your yacht, resort, or private location with professional instruction included.",
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent("Private eFoil Experiences")}`,
      path: "/efoil-experiences-maldives",
    }),
    alternates: { canonical: "/efoil-experiences-maldives" },
  };
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private eFoil Experiences Maldives",
  description:
    "Curated private eFoil experiences delivered anywhere in the Maldives. Audi e-tron electric hydrofoil with professional instruction, safety gear, and all equipment included.",
  provider: {
    "@type": "Organization",
    name: "eFoil Maldives",
    url: baseURL,
  },
  areaServed: { "@type": "Country", name: "Maldives" },
  serviceType: "eFoil experience",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where can I have an eFoil experience in the Maldives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anywhere. We deliver the Audi e-tron eFoil directly to your yacht, resort, private island, or any accessible coastline across the atolls. There is no fixed location — we come to you.",
      },
    },
    {
      "@type": "Question",
      name: "What does a private eFoil experience include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every experience includes the Audi e-tron eFoil, a certified instructor, all safety equipment (impact vest, helmet), delivery and pickup at your location, and a tailored session based on your group's skill level.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need prior experience to fly an eFoil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No experience is needed. The Audi e-tron eFoil features a wireless speed controller for gradual progression. Your instructor adapts to each rider, and most guests are flying within 15–20 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "How far in advance should I book?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We recommend booking at least 48 hours in advance to secure your preferred date and delivery logistics. For peak season (December–April), earlier booking is advised.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book a multi-day experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Our multi-day packages keep the eFoil at your location for the duration. Ride whenever you like with flexible scheduling — ideal for yacht charters and extended resort stays.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if weather conditions are poor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safety is our priority. If conditions are unsuitable, we reschedule at no extra charge. We monitor weather daily and notify you in advance if adjustments are needed.",
      },
    },
  ],
};

export default function EfoilExperiencesPage() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" paddingX="16" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/efoil-experiences-maldives"
        title="Private eFoil Experiences Maldives | Yacht & Boat Delivery"
        description="Curated private eFoil experiences delivered anywhere in the Maldives."
        image={`/api/og/generate?title=${encodeURIComponent("Private eFoil Experiences")}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <Column fillWidth horizontal="center" gap="l">
        <Column maxWidth="m" horizontal="center" align="center">
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading as="h1" wrap="balance" variant="display-strong-xl" align="center">
              Private eFoil Experiences
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              Fly above the Maldives on the Audi e-tron eFoil. Delivered to your yacht, resort, or private location with a dedicated instructor. No experience required.
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
                Request Availability
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

      {/* Hero Images */}
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Grid columns="2" gap="24" fillWidth>
          <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
            <Media
              src="/images/gallery/efoiling.jpeg"
              alt="Rider flying on Audi e-tron eFoil above turquoise Maldives water"
              aspectRatio="16 / 10"
            />
          </Column>
          <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
            <Media
              src="/images/gallery/efoil-turquoise-water.jpg"
              alt="eFoil gliding over crystal-clear lagoon in the Maldives"
              aspectRatio="16 / 10"
            />
          </Column>
        </Grid>
      </RevealFx>

      {/* Delivered Anywhere */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Delivered Anywhere in the Maldives
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center" style={{ maxWidth: 680 }}>
              There is no fixed location. We bring the complete eFoil experience directly to you — whether you are on a superyacht at anchor, a private island resort, or a liveaboard crossing the atolls. Our team handles all logistics so you simply step onto the board and fly.
            </Text>
          </Column>
          <Grid columns="3" gap="24" fillWidth>
            <Column padding="24" gap="12" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m" align="center">
                Yachts & Liveaboards
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                We meet your vessel at anchor and set up alongside. The instructor manages the entire session while your crew focuses on hospitality.
              </Text>
            </Column>
            <Column padding="24" gap="12" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m" align="center">
                Resorts & Private Islands
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Delivered to your beach or jetty. We coordinate with resort management to integrate seamlessly into your guest activities.
              </Text>
            </Column>
            <Column padding="24" gap="12" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m" align="center">
                Near Mal&eacute; & Hulhumal&eacute;
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Sessions available in the sheltered lagoons near the capital — 10 minutes from the airport. Ideal for layovers or short stays.
              </Text>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* Experience Packages */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column id="packages" fillWidth gap="l" paddingY="l">
          <Row fillWidth paddingRight="64" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Experience Packages
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Choose the experience that fits your trip
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth>
            <Column padding="32" gap="16" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-l" align="center">
                Discovery
              </Heading>
              <Text variant="body-default-s" onBackground="brand-strong" align="center">Half-day session</Text>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                A half-day introduction to eFoiling. Your instructor guides you from first stand to confident riding. Ideal for individuals or couples looking for a unique Maldives activity.
              </Text>
              <Column gap="8" paddingTop="8">
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Up to 4 hours</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Professional instruction included</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">All equipment & safety gear</Text>
              </Column>
            </Column>

            <Column padding="32" gap="16" horizontal="center" background="brand-alpha-weak" radius="l" border="brand-alpha-medium">
              <Heading as="h3" variant="heading-strong-l" align="center">
                Sunset Session
              </Heading>
              <Text variant="body-default-s" onBackground="brand-strong" align="center">Golden hour experience</Text>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Ride into the golden hour. A curated afternoon-to-sunset experience with drone footage of your session. The signature Maldives eFoil moment — perfect for special occasions.
              </Text>
              <Column gap="8" paddingTop="8">
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Timed for golden hour</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Drone footage included</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Ideal for groups up to 4</Text>
              </Column>
            </Column>

            <Column padding="32" gap="16" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-l" align="center">
                Multi-Day
              </Heading>
              <Text variant="body-default-s" onBackground="brand-strong" align="center">Tailored to your stay</Text>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                The eFoil stays at your location for the duration of your charter or resort stay. Ride whenever you like with flexible daily sessions and priority scheduling.
              </Text>
              <Column gap="8" paddingTop="8">
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Board stays at your location</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Flexible daily scheduling</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Best per-day rate</Text>
              </Column>
            </Column>
          </Grid>

          <Text variant="body-default-s" onBackground="neutral-weak" align="center">
            All packages include delivery, professional instruction, the Audi e-tron eFoil, and full safety equipment. Pricing varies by location and group size.
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
              Request Availability
            </Button>
          </Row>

          <Row fillWidth paddingLeft="64" horizontal="end" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
        </Column>
      </RevealFx>

      {/* What's Included */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              What&apos;s Included
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              A complete, turnkey experience — we handle everything
            </Text>
          </Column>

          <Grid columns="2" gap="24" fillWidth>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Audi e-tron eFoil
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                The most advanced electric hydrofoil on the market. Silent propulsion, enclosed motor, wireless speed control, and a design born from Audi&apos;s engineering heritage.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Certified Instructor
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                A dedicated professional accompanies every session. They manage setup, safety briefings, and one-on-one coaching tailored to each rider&apos;s ability.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Full Safety Equipment
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Impact vest, helmet with communication gear, and all protective equipment. Insurance and liability waivers are handled by our team.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Delivery & Pickup
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                We bring the eFoil to your location and collect it when your session ends. No storage, no charging, no logistics on your side.
              </Text>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* Cross-links */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Grid columns="2" gap="24" fillWidth>
          <Column
            padding="32"
            gap="16"
            horizontal="center"
            background="neutral-alpha-weak"
            radius="l"
          >
            <Heading as="h3" variant="heading-strong-m" align="center">
              Yacht & Superyacht Delivery
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak" align="center">
              Dedicated yacht packages with crew-friendly logistics, multi-day options, and zero storage required.
            </Text>
            <Button href="/yachts" variant="secondary" size="m" arrowIcon>
              Yacht Delivery Details
            </Button>
          </Column>
          <Column
            padding="32"
            gap="16"
            horizontal="center"
            background="neutral-alpha-weak"
            radius="l"
          >
            <Heading as="h3" variant="heading-strong-m" align="center">
              eFoil Rental Information
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak" align="center">
              Looking for rental options, pricing details, and how eFoil hire works in the Maldives?
            </Text>
            <Button href="/efoil-rental-maldives" variant="secondary" size="m" arrowIcon>
              Rental Information
            </Button>
          </Column>
        </Grid>
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

      {/* CTA */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column
          fillWidth
          padding="48"
          gap="24"
          horizontal="center"
          background="brand-alpha-weak"
          radius="xl"
        >
          <Heading as="h2" variant="display-strong-m" align="center">
            Ready to Fly?
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            Tell us your dates and location — we handle everything else
          </Text>
          <Row gap="16" wrap horizontal="center" s={{ direction: "column" }}>
            <Button
              data-border="rounded"
              href={instagramUrl}
              variant="primary"
              size="l"
              weight="strong"
              arrowIcon
            >
              Book via Instagram
            </Button>
            <Button
              data-border="rounded"
              href={`mailto:hello@efoil.rent?subject=eFoil Experience Inquiry`}
              variant="secondary"
              size="l"
            >
              Email Us
            </Button>
          </Row>
        </Column>
      </RevealFx>
    </Column>
  );
}
