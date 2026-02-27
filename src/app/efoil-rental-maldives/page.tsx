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
      title: "eFoil Rental Maldives | Private Sessions & Yacht Delivery",
      description:
        "Rent an Audi e-tron eFoil in the Maldives. Electric hydrofoil board rental with professional instruction, delivered to yachts, resorts, and private locations across the atolls.",
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent("eFoil Rental Maldives")}`,
      path: "/efoil-rental-maldives",
    }),
    alternates: { canonical: "/efoil-rental-maldives" },
  };
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "eFoil Rental Maldives",
  description:
    "Rent an Audi e-tron eFoil across the Maldives. Electric hydrofoil surfboard rental with delivery to yachts, resorts, and private locations. Professional instruction and all safety equipment included.",
  provider: {
    "@type": "Organization",
    name: "eFoil Maldives",
    url: baseURL,
    logo: `${baseURL}/favicon.png`,
    email: "hello@efoil.rent",
  },
  areaServed: { "@type": "Country", name: "Maldives" },
  serviceType: "eFoil rental",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "eFoil Rental Options",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Private eFoil Experiences",
        description:
          "Curated private eFoil experiences delivered anywhere in the Maldives. Half-day, sunset, and multi-day packages available.",
        url: `${baseURL}/efoil-experiences-maldives`,
      },
      {
        "@type": "Offer",
        name: "Yacht eFoil Delivery",
        description:
          "eFoil delivered directly to superyachts, charter yachts, and liveaboards. Instructor, safety gear, and all logistics included.",
        url: `${baseURL}/yachts`,
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does it cost to rent an eFoil in the Maldives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "eFoil rental rates in the Maldives vary depending on location, duration, and delivery logistics. Yacht and resort delivery packages are custom-quoted based on distance and number of days. Contact us for a personalised quote.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I rent an eFoil in the Maldives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We deliver eFoils across the entire Maldives archipelago. Popular areas include North Malé Atoll, South Malé Atoll, Baa Atoll, Ari Atoll, and Raa Atoll. We also serve locations near Malé and Hulhumalé for visitors on shorter stays or layovers.",
      },
    },
    {
      "@type": "Question",
      name: "What eFoil brand do you rent in the Maldives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We exclusively offer the Audi e-tron eFoil — a collaboration between Audi and Aerofoils GmbH. It is the most advanced consumer electric hydrofoil available, featuring an enclosed jet propulsion system, wireless smart controller, and a design engineered for both safety and performance.",
      },
    },
    {
      "@type": "Question",
      name: "Is an instructor included with the eFoil rental?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every rental includes a certified instructor who handles equipment setup, delivers a safety briefing, and provides one-on-one coaching throughout the session. The instructor stays with you for the entire duration.",
      },
    },
    {
      "@type": "Question",
      name: "Can beginners rent an eFoil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. No prior experience is needed. The Audi e-tron eFoil has a progressive speed controller that lets beginners start slow and build confidence. Most first-time riders are standing and flying within 15–20 minutes with instructor guidance.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book an eFoil rental in the Maldives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The fastest way is via Instagram. Send us your dates, location, and group size, and we will confirm availability within minutes. You can also email us at hello@efoil.rent. We recommend booking at least 48 hours in advance.",
      },
    },
    {
      "@type": "Question",
      name: "What safety equipment is provided?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every rental includes a high-quality impact vest, helmet with built-in communication for instructor guidance, and all protective gear. The Audi e-tron eFoil itself has an enclosed motor with no exposed propeller, making it one of the safest eFoils on the market.",
      },
    },
    {
      "@type": "Question",
      name: "Can I rent an eFoil for multiple days?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Multi-day rentals are available and offer the best per-day rate. The eFoil stays at your location — yacht, resort, or villa — and you ride on your own schedule with flexible daily sessions.",
      },
    },
  ],
};

export default function EfoilRentalPage() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" paddingX="16" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/efoil-rental-maldives"
        title="eFoil Rental Maldives | Private Sessions & Yacht Delivery"
        description="Rent an Audi e-tron eFoil in the Maldives. Delivered to yachts, resorts, and private locations."
        image={`/api/og/generate?title=${encodeURIComponent("eFoil Rental Maldives")}`}
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
              eFoil Rental Maldives
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              Rent the Audi e-tron eFoil — the world&apos;s most advanced electric hydrofoil surfboard — and ride above the crystal-clear waters of the Maldives. Professional instruction, safety gear, and delivery included with every rental.
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
                Book via Instagram
              </Button>
              <Button
                data-border="rounded"
                href="#options"
                variant="secondary"
                size="l"
              >
                See Rental Options
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* Hero Image */}
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Column fillWidth radius="l" overflow="hidden" border="neutral-alpha-weak">
          <Media
            src="/images/gallery/resort_efoil_rental_maldives.jpeg"
            alt="Person riding an Audi e-tron eFoil above the turquoise waters of the Maldives"
            aspectRatio="16 / 9"
          />
        </Column>
      </RevealFx>

      {/* What is an eFoil */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              What is an eFoil?
            </Heading>
          </Column>
          <Column gap="m" style={{ maxWidth: 720, margin: "0 auto" }}>
            <Text variant="body-default-m" onBackground="neutral-weak">
              An eFoil — short for electric hydrofoil — is a surfboard powered by a silent electric motor mounted beneath a hydrofoil wing. As you accelerate using a wireless handheld remote, the wing generates lift and the board rises above the water surface. The result is a sensation unlike any other watersport: smooth, silent flight above the ocean with complete speed control at your fingertips.
            </Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              The Audi e-tron eFoil represents the pinnacle of this technology. Developed in collaboration between Audi and Aerofoils GmbH, it features a fully enclosed jet propulsion system (no exposed propeller), a swappable battery that provides up to two hours of riding, and a smart wireless controller with real-time speed and battery display. Weighing just 32 kg, it is designed for both beginners and experienced riders.
            </Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              In the Maldives, the combination of warm water, calm lagoons, and stunning visibility creates ideal conditions for eFoiling year-round. Whether you are staying on a yacht, at a resort, or visiting for just a few days, renting an eFoil is one of the most memorable ways to experience the islands from above the water.
            </Text>
          </Column>
        </Column>
      </RevealFx>

      {/* Where You Can Ride */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Row fillWidth paddingRight="64" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Where You Can Ride
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              eFoil rental is available across the Maldives archipelago
            </Text>
          </Column>
          <Grid columns="3" gap="24" fillWidth>
            {[
              {
                name: "Near Mal\u00e9 & Hulhumal\u00e9",
                desc: "The most accessible option — just minutes from Velana International Airport. Sheltered lagoons provide flat, calm water ideal for first-time riders and short stays.",
              },
              {
                name: "North & South Mal\u00e9 Atoll",
                desc: "Home to many of the Maldives\u2019 top resorts and yacht anchorages. We deliver throughout both atolls with regular availability and short transfer times.",
              },
              {
                name: "Baa, Raa & Ari Atolls",
                desc: "Popular charter and safari boat routes. We coordinate delivery to yachts and resorts across these atolls — contact us for logistics and timing.",
              },
            ].map((loc) => (
              <Column key={loc.name} padding="24" gap="12" background="neutral-alpha-weak" radius="l">
                <Heading as="h3" variant="heading-strong-s" align="center">
                  {loc.name}
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                  {loc.desc}
                </Text>
              </Column>
            ))}
          </Grid>
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
              What&apos;s Included With Every Rental
            </Heading>
          </Column>
          <Grid columns="2" gap="24" fillWidth>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Audi e-tron eFoil Board & Foil
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                The complete Audi e-tron eFoil system including board, mast, hydrofoil wing, enclosed propulsion unit, charged battery, and wireless controller. Spare batteries are available for extended sessions.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Professional Instructor
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                A certified instructor accompanies every rental session. They handle assembly, conduct a safety briefing tailored to your group, and provide one-on-one coaching throughout. They stay with you for the full duration of your booking.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Safety Equipment
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Every rider receives a high-quality impact vest and helmet with built-in communication so your instructor can guide you in real time. All sessions are covered by our insurance, and liability waivers are handled upfront.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Delivery & Collection
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                We bring the eFoil to your yacht, resort, or any accessible location in the Maldives and collect it when your session is complete. You do not need to store, charge, or transport anything.
              </Text>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* Rental Options (internal links hub) */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column id="options" fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Choose Your eFoil Rental Option
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Select the option that matches how you want to ride
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth>
            <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l" horizontal="center">
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center">
                <Text variant="display-strong-m" onBackground="brand-strong">1</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Private Experiences
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Curated eFoil experiences delivered anywhere in the Maldives. Half-day, sunset, and multi-day packages with premium service.
              </Text>
              <Button href="/efoil-experiences-maldives" variant="secondary" size="m" arrowIcon>
                View Experiences
              </Button>
            </Column>

            <Column padding="32" gap="16" background="brand-alpha-weak" radius="l" border="brand-alpha-medium" horizontal="center">
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center">
                <Text variant="display-strong-m" onBackground="brand-strong">2</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Yacht Delivery
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                eFoil delivered directly to your superyacht, charter yacht, or liveaboard. Designed for yacht operations — zero storage, full instruction, crew-friendly.
              </Text>
              <Button href="/yachts" variant="secondary" size="m" arrowIcon>
                Yacht Delivery Details
              </Button>
            </Column>

            <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l" horizontal="center">
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center">
                <Text variant="display-strong-m" onBackground="brand-strong">3</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Crew Day Trip
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Airline crew on layover? Combine an eFoil session with dolphins, snorkeling, a private sandbank, and a sunset cruise.
              </Text>
              <Button href="/crew" variant="secondary" size="m" arrowIcon>
                Crew Day Trip
              </Button>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* FAQ */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              eFoil Rental FAQ
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Common questions about renting an eFoil in the Maldives
            </Text>
          </Column>

          <Grid columns="2" gap="24" fillWidth>
            {faqSchema.mainEntity.map((faq) => (
              <Column key={faq.name} padding="24" gap="12" background="neutral-alpha-weak" radius="l">
                <Heading as="h3" variant="heading-strong-s">
                  {faq.name}
                </Heading>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {faq.acceptedAnswer.text}
                </Text>
              </Column>
            ))}
          </Grid>
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
            Ready to Rent an eFoil?
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            Send us your dates and location — we handle the rest
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
              href={`mailto:hello@efoil.rent?subject=eFoil Rental Inquiry`}
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
