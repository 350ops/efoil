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
import { baseURL, person, about, crew } from "@/resources";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9606783344";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: crew.title,
      description: crew.description,
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent("Airline Crew Day Trip")}`,
      path: crew.path,
    }),
    alternates: { canonical: "/crew" },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does the day trip last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The full experience is approximately 5 hours. You'll swim with dolphins, snorkel two pristine reefs, relax on a private sandbank with a picnic lunch, and cruise back into the sunset. It's designed to fit perfectly into a 24–48 hour layover.",
      },
    },
    {
      "@type": "Question",
      name: "How much does the day trip cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pricing starts from $80 per person and decreases as more people join. The boat holds up to 6 guests. When you book, you can share a link with colleagues to fill remaining spots — the more people who join, the less everyone pays.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in the price?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Everything is included: dolphin swimming excursion, reef snorkeling at two locations (all gear provided), private sandbank visit with picnic lunch and drinks, and a sunset cruise back to Malé. Professional GoPro, drone, and underwater photography are available on request.",
      },
    },
    {
      "@type": "Question",
      name: "What is the eFoil add-on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For $150 per person, you can add an Audi e-tron eFoil session to your trip. This is an electric hydrofoil surfboard that lets you fly above the water — no experience needed. The session includes professional instruction, drone footage, and 360-camera content. It's offered by foiltribe, the first eFoil operators in Maldives.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The fastest way to book is via WhatsApp. Tap the booking button on this page, choose your date, and you're confirmed within minutes. You can also share the trip with colleagues so they can join and everyone gets a better price.",
      },
    },
    {
      "@type": "Question",
      name: "Is it suitable for non-swimmers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Basic swimming ability is recommended for snorkeling and dolphin swimming. Life jackets are provided for everyone and our guides are in the water with you at all times. The sandbank and sunset cruise portions don't require swimming.",
      },
    },
    {
      "@type": "Question",
      name: "Which airlines fly into Malé?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Malé (MLE) is served by major international carriers including Qatar Airways, Emirates, Etihad, Turkish Airlines, Singapore Airlines, Flydubai, British Airways, ITA Airways, Condor, Neos, Azerbaijan Airlines, and many more. Most crew have 24–48 hour layovers — plenty of time for this 5-hour adventure.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get professional photos and videos from the trip?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Professional media content is available upon request for the entire trip — GoPro, drone footage, underwater cameras, and 360-degree cameras. If you add the eFoil session, drone and 360-camera footage of your ride is included automatically.",
      },
    },
  ],
};

export default function CrewPage() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" paddingX="16" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={crew.path}
        title={crew.title}
        description={crew.description}
        image={`/api/og/generate?title=${encodeURIComponent("Airline Crew Day Trip")}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <Column fillWidth horizontal="center" gap="l">
        <Column maxWidth="m" horizontal="center" align="center">
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-xl" align="center">
              Your Maldives Adventure Starts Here
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              One trip. Five hours. Dolphins, reef snorkeling, a private sandbank, and a sunset cruise across the Indian Ocean. Designed for airline crew on layover in Malé — from $80/person.
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" fillWidth>
            <Row gap="16" wrap horizontal="center" fillWidth s={{ direction: "column" }}>
              <Button
                data-border="rounded"
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'm airline crew and interested in Maldives day trip.")}`}
                variant="primary"
                size="l"
                weight="strong"
                arrowIcon
              >
                Book via WhatsApp
              </Button>
              <Button
                data-border="rounded"
                href="#experience"
                variant="secondary"
                size="l"
              >
                See What's Included
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* Hero Images */}
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Grid columns="3" gap="24" fillWidth>
          <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
            <Media
              src="/images/gallery/dolphins-maldives.png"
              alt="Wild spinner dolphins in Maldives — swim with dolphins on the crew day trip"
              aspectRatio="4 / 3"
            />
          </Column>
          <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
            <Media
              src="/images/gallery/maldives-sandbank.png"
              alt="Private white sandbank in the Indian Ocean — crew day trip picnic destination"
              aspectRatio="4 / 3"
            />
          </Column>
          <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
            <Media
              src="/images/gallery/maldives-sunset-ocean.png"
              alt="Golden sunset over the Indian Ocean — sunset cruise on Maldives crew day trip"
              aspectRatio="4 / 3"
            />
          </Column>
        </Grid>
      </RevealFx>

      {/* The Experience */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column id="experience" fillWidth gap="xl" paddingY="xl">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              The Experience
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Five hours of the best Maldives has to offer — all in one trip
            </Text>
          </Column>

          <Grid columns="2" gap="24" fillWidth>
            <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l">
              <Text variant="display-strong-l" align="center">🐬</Text>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Dolphin Swimming
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Cruise to the dolphin channel and swim alongside wild spinner dolphins. Our crew knows exactly where to find them — 95% sighting rate. An experience you'll never forget.
              </Text>
            </Column>

            <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l">
              <Text variant="display-strong-l" align="center">🐢</Text>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Reef Snorkeling
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Two stops at pristine reefs teeming with tropical fish, sea turtles, reef sharks, and manta rays. All snorkeling gear is provided — just jump in.
              </Text>
            </Column>

            <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l">
              <Text variant="display-strong-l" align="center">🏝️</Text>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Private Sandbank
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                A white sand strip in the middle of the Indian Ocean — just for your group. Relax, swim, enjoy a picnic lunch with drinks, and take photos that will make everyone back home jealous.
              </Text>
            </Column>

            <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l">
              <Text variant="display-strong-l" align="center">🌅</Text>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Sunset Cruise
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                End the day with a golden-hour return across the Indian Ocean. Music, drinks, and the most spectacular sunset you've ever seen.
              </Text>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* eFoil Add-on */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column
          fillWidth
          padding="48"
          gap="24"
          horizontal="center"
          background="brand-alpha-weak"
          radius="xl"
        >
          <Text variant="label-strong-s" onBackground="brand-strong">OPTIONAL ADD-ON</Text>
          <Heading as="h2" variant="display-strong-m" align="center">
            Add an Audi e-tron eFoil Session — $150/person
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center" style={{ maxWidth: 640 }}>
            Fly above the turquoise Maldives water on an electric hydrofoil surfboard. No experience needed — professional instruction, drone footage, and 360-camera content are all included. Offered by foiltribe, the first eFoil pioneers in Maldives.
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center">
            Resorts charge $145–195 for just 30 minutes. With this trip, you get an eFoil session alongside dolphins, snorkeling, a sandbank, lunch, and a sunset cruise — starting at $80 + $150 for the eFoil.
          </Text>
          <Row fillWidth horizontal="center" paddingTop="8">
            <Column overflow="hidden" radius="l" style={{ maxWidth: 480 }}>
              <Media
                src="/images/gallery/girlefoil.jpg"
                alt="Woman flying on an eFoil at sunset in Maldives — the ultimate layover experience"
                aspectRatio="4 / 5"
              />
            </Column>
          </Row>
          <Grid columns="2" gap="24" fillWidth paddingTop="8">
            <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
              <Media
                src="/images/gallery/girlefoil.jpg"
                alt="Woman riding eFoil at sunset in Maldives — crew day trip eFoil add-on"
                aspectRatio="16 / 10"
              />
            </Column>
            <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
              <Media
                src="/images/gallery/efoil-drone.png"
                alt="Aerial drone shot of two eFoil riders above turquoise Maldives lagoon"
                aspectRatio="16 / 10"
              />
            </Column>
          </Grid>
          <Button href="/work" variant="secondary" size="m" arrowIcon>
            Learn More About eFoiling
          </Button>
        </Column>
      </RevealFx>

      {/* How It Works */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="xl" paddingY="xl">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              How It Works
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Three steps to the best day of your layover
            </Text>
          </Column>

          <Column fillWidth gap="0" horizontal="center">
            {[
              {
                num: "01",
                title: "Book",
                desc: "Tap the WhatsApp button, pick your date, and you're confirmed in minutes. No app download or sign-up needed.",
              },
              {
                num: "02",
                title: "Share With Your Crew",
                desc: "Share the trip link with your colleagues. The more people who join (up to 6), the lower the price for everyone.",
              },
              {
                num: "03",
                title: "Meet at the Dock",
                desc: "We pick you up near your hotel in Malé or Hulhumalé. Everything else — gear, food, drinks, guides — is taken care of.",
              },
            ].map((step, idx) => (
              <Row key={step.num} fillWidth gap="24">
                <Column horizontal="center" vertical="center" gap="0" style={{ minWidth: 48 }}>
                  <Flex
                    horizontal="center"
                    vertical="center"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      border: "2px solid var(--brand-solid-strong)",
                      flexShrink: 0,
                    }}
                  >
                    <Text variant="label-strong-m" onBackground="brand-strong">{step.num}</Text>
                  </Flex>
                  {idx < 2 && (
                    <Column
                      style={{
                        width: 2,
                        height: 48,
                        background: "var(--neutral-alpha-medium)",
                      }}
                    />
                  )}
                </Column>
                <Column gap="4" paddingBottom="24" style={{ paddingTop: 8 }}>
                  <Heading as="h3" variant="heading-strong-l">
                    {step.title}
                  </Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {step.desc}
                  </Text>
                </Column>
              </Row>
            ))}
          </Column>
        </Column>
      </RevealFx>

      {/* Marine Life Strip */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Grid columns="2" gap="24" fillWidth>
          <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
            <Media
              src="/images/gallery/turtle-maldives.png"
              alt="Sea turtle swimming over coral reef in Maldives — snorkeling on the crew day trip"
              aspectRatio="16 / 10"
            />
          </Column>
          <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
            <Media
              src="/images/gallery/sealion-maldives.png"
              alt="Marine wildlife in Maldives — reef encounters on the crew day trip"
              aspectRatio="16 / 10"
            />
          </Column>
        </Grid>
      </RevealFx>

      {/* Group Pricing */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Row fillWidth paddingRight="64" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Group Pricing
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              The boat holds up to 6 people — the more who join, the less everyone pays
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth>
            <Column padding="32" gap="12" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Text variant="display-strong-l" onBackground="brand-strong">$120</Text>
              <Text variant="label-strong-m">per person</Text>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                2–3 guests
              </Text>
            </Column>
            <Column padding="32" gap="12" horizontal="center" background="brand-alpha-weak" radius="l" border="brand-alpha-medium">
              <Text variant="display-strong-l" onBackground="brand-strong">$100</Text>
              <Text variant="label-strong-m">per person</Text>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                4–5 guests
              </Text>
            </Column>
            <Column padding="32" gap="12" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Text variant="display-strong-l" onBackground="brand-strong">$80</Text>
              <Text variant="label-strong-m">per person</Text>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                6 guests (full boat)
              </Text>
            </Column>
          </Grid>

          <Text variant="body-default-s" onBackground="neutral-weak" align="center">
            eFoil add-on: +$150/person. Includes professional instruction, drone footage, and 360-camera content.
          </Text>

          <Row fillWidth paddingLeft="64" horizontal="end" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
        </Column>
      </RevealFx>

      {/* Airlines */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Airlines Operating into Malé
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Crew from all these airlines have 24–48 hour layovers — plenty of time for a 5-hour adventure
            </Text>
          </Column>

          <Grid columns="4" gap="16" fillWidth>
            {[
              "Qatar Airways",
              "Emirates",
              "Etihad Airways",
              "Turkish Airlines",
              "Singapore Airlines",
              "Flydubai",
              "British Airways",
              "ITA Airways",
              "Condor",
              "Neos",
              "Azerbaijan Airlines",
              "& Many More",
            ].map((airline) => (
              <Column
                key={airline}
                padding="16"
                horizontal="center"
                vertical="center"
                background="neutral-alpha-weak"
                radius="m"
              >
                <Text variant="label-strong-s" align="center" onBackground="neutral-strong">
                  {airline}
                </Text>
              </Column>
            ))}
          </Grid>
        </Column>
      </RevealFx>

      {/* Professional Content */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Professional Content Included
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Go home with content that will make your Instagram unforgettable
            </Text>
          </Column>

          <Grid columns="4" gap="24" fillWidth>
            {[
              { icon: "📷", title: "GoPro" },
              { icon: "🛸", title: "Drone" },
              { icon: "🤿", title: "Underwater" },
              { icon: "🌐", title: "360 Camera" },
            ].map((item) => (
              <Column key={item.title} padding="24" gap="8" horizontal="center" background="neutral-alpha-weak" radius="l">
                <Text variant="display-strong-l">{item.icon}</Text>
                <Text variant="label-strong-s" align="center">{item.title}</Text>
              </Column>
            ))}
          </Grid>

          <Text variant="body-default-s" onBackground="neutral-weak" align="center">
            Available upon request for the entire trip. eFoil session drone and 360 footage included automatically.
          </Text>
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
            Ready for the Best Day of Your Layover?
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            Book now and share with your crew — the more who join, the less everyone pays
          </Text>
          <Row gap="16" wrap horizontal="center" s={{ direction: "column" }}>
            <Button
              data-border="rounded"
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'm airline crew and want to book Maldives day trip.")}`}
              variant="primary"
              size="l"
              weight="strong"
              arrowIcon
            >
              Book via WhatsApp
            </Button>
            <Button
              data-border="rounded"
              href={`mailto:hello@efoil.rent?subject=Crew Day Trip Inquiry`}
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
