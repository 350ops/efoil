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
  Media,
} from "@once-ui-system/core";
import { baseURL, person, about } from "@/resources";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: "What Is eFoiling? Electric Hydrofoil Explained | eFoil Maldives",
      description:
        "Learn what an eFoil is, how electric hydrofoils work, who can ride one, and why the Maldives is the best place to try it. A complete guide for beginners.",
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent("What Is eFoiling?")}`,
      path: "/what-is-efoiling",
    }),
    alternates: { canonical: "/what-is-efoiling" },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an eFoil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An eFoil (electric hydrofoil) is a surfboard with a battery-powered motor and a hydrofoil wing underneath. As the board accelerates, the wing generates lift, raising the rider above the water surface for a smooth, silent glide. No waves are needed.",
      },
    },
    {
      "@type": "Question",
      name: "How hard is it to learn eFoiling?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most beginners are standing and riding within 15-20 minutes of professional instruction. The wireless hand controller allows gradual speed progression, making it accessible to people of all fitness levels and ages. No surfing or boarding experience is required.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can an eFoil go?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most eFoils have a top speed of 40-50 km/h (25-30 mph). However, beginners typically ride at 15-25 km/h, which is where the foil lifts out of the water. Speed is fully controlled by the rider via a wireless handheld remote.",
      },
    },
    {
      "@type": "Question",
      name: "How long does an eFoil battery last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical eFoil battery lasts 60-90 minutes per charge, depending on rider weight, speed, and conditions. Charging takes approximately 2-3 hours. Rental operators carry spare batteries for extended sessions.",
      },
    },
    {
      "@type": "Question",
      name: "Is eFoiling safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, when proper safety protocols are followed. Modern eFoils feature an enclosed propeller, wireless kill switch (releasing the controller stops the motor), and progressive speed control. All riders should wear a life vest and helmet, and beginners should always ride with professional instruction.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need waves to eFoil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Unlike surfing, eFoiling does not require waves. The electric motor provides all the propulsion needed. Flat, calm water is actually ideal for eFoiling, which is why the Maldives with its sheltered lagoons is one of the best eFoil destinations in the world.",
      },
    },
  ],
};

export default function WhatIsEfoilingPage() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" paddingX="16" horizontal="center" s={{ paddingY: "8", paddingX: "12", gap: "l" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/what-is-efoiling"
        title="What Is eFoiling? Electric Hydrofoil Explained"
        description="Learn what an eFoil is, how electric hydrofoils work, who can ride one, and why the Maldives is the best place to try it."
        image={`/api/og/generate?title=${encodeURIComponent("What Is eFoiling?")}`}
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
      <Breadcrumbs items={[{ name: "What Is eFoiling?", href: "/what-is-efoiling" }]} />

      {/* Hero */}
      <Column fillWidth horizontal="center" gap="l" s={{ gap: "m" }}>
        <Column maxWidth="m" horizontal="center" align="center">
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16" s={{ paddingBottom: "12" }}>
            <Heading wrap="balance" variant="display-strong-xl" align="center">
              What Is eFoiling?
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32" s={{ paddingBottom: "20" }}>
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              The complete guide to electric hydrofoils — how they work, who can ride, and where to try one
            </Text>
          </RevealFx>
        </Column>
      </Column>

      {/* Video Section */}
      <RevealFx translateY="16" delay={0.4} fillWidth>
        <Column fillWidth radius="l" overflow="hidden" border="neutral-alpha-weak" s={{ radius: "m" }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
            }}
          >
            <source src="/images/gallery/gliding.mp4" type="video/mp4" />
          </video>
        </Column>
      </RevealFx>

      {/* What Is an eFoil */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              An Electric Surfboard That Flies
            </Heading>
          </Column>
          <Column maxWidth="m" horizontal="center" gap="m" s={{ gap: "12" }}>
            <Text variant="body-default-l" onBackground="neutral-weak">
              An eFoil (short for electric hydrofoil) is a surfboard equipped with a battery-powered motor and a hydrofoil wing mounted underneath. As the board accelerates through the water, the wing generates lift — raising the board and rider above the surface.
            </Text>
            <Text variant="body-default-l" onBackground="neutral-weak">
              The result is a smooth, silent glide that feels like flying. No waves are needed, no engine noise, and the speed is fully controlled by a wireless hand-held remote. Most people describe it as a combination of surfing, snowboarding, and flying — unlike any other water sport.
            </Text>
          </Column>
        </Column>
      </RevealFx>

      {/* How It Works */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="xl" paddingY="xl" s={{ gap: "l", paddingY: "l" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              How an eFoil Works
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Four components working together to make you fly
            </Text>
          </Column>

          <Grid columns="2" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l" s={{ padding: "24", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-m">Board</Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                A buoyant deck made from carbon fibre or fibreglass. You stand on it like a surfboard. Sizes range from compact performance boards to larger, more stable beginner boards.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l" s={{ padding: "24", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-m">Mast</Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                A vertical strut connecting the board to the wing below the surface. Mast length (typically 60–90 cm) determines how high you ride above the water.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l" s={{ padding: "24", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-m">Hydrofoil Wing</Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                A submerged wing that generates lift as water flows over it — the same principle that makes aircraft fly. Larger wings provide more stability for beginners.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l" s={{ padding: "24", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-m">Electric Motor & Battery</Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                A brushless electric motor drives the propeller. A lithium battery inside the board provides 60–90 minutes of ride time. Speed is controlled wirelessly via a handheld remote.
              </Text>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* Equipment Showcase */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Grid columns="2" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
          <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak" s={{ radius: "m" }}>
            <Media
              src="/images/gallery/performance_3 Background Removed.png"
              alt="eFoil complete setup showing board, mast, and hydrofoil wing"
              aspectRatio="16 / 10"
            />
          </Column>
          <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak" s={{ radius: "m" }}>
            <Media
              src="/images/gallery/Performance_midnightblue_01 Background Removed.png"
              alt="eFoil board top view — electric hydrofoil surfboard"
              aspectRatio="16 / 10"
            />
          </Column>
        </Grid>
      </RevealFx>

      {/* Who Can Ride */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              Who Can Ride an eFoil?
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Short answer: almost anyone
            </Text>
          </Column>
          <Column maxWidth="m" horizontal="center" gap="m" s={{ gap: "12" }}>
            <Text variant="body-default-l" onBackground="neutral-weak">
              You do not need surfing experience, athletic ability, or special training. If you can stand on a paddleboard, you can learn to eFoil. The wireless controller allows gradual speed progression — you decide exactly how fast you go.
            </Text>
            <Text variant="body-default-l" onBackground="neutral-weak">
              Most beginners are standing and riding within 15–20 minutes of instruction. Children as young as 12 can ride with appropriate supervision. The sport attracts everyone from teenagers to retirees, families, and professional athletes.
            </Text>
            <Text variant="body-default-l" onBackground="neutral-weak">
              The one thing that dramatically shortens the learning curve is professional instruction. A qualified instructor teaches you board handling, body positioning, and throttle control before you enter the water — turning a potentially frustrating first attempt into a smooth progression.
            </Text>
          </Column>
        </Column>
      </RevealFx>

      {/* Why Maldives */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              Why the Maldives Is Perfect for eFoiling
            </Heading>
          </Column>
          <Grid columns="3" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            <Column padding="24" gap="8" horizontal="center" background="neutral-alpha-weak" radius="l" s={{ padding: "20", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-s" align="center">Flat Lagoons</Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Sheltered lagoons with minimal waves — ideal conditions for eFoiling year-round
              </Text>
            </Column>
            <Column padding="24" gap="8" horizontal="center" background="neutral-alpha-weak" radius="l" s={{ padding: "20", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-s" align="center">Warm Water</Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                27–30°C water temperature means no wetsuit required. Ride comfortably any time of year.
              </Text>
            </Column>
            <Column padding="24" gap="8" horizontal="center" background="neutral-alpha-weak" radius="l" s={{ padding: "20", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-s" align="center">Crystal Clarity</Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Visibility exceeding 30 metres. Fly above coral reefs and marine life in water so clear it looks like glass.
              </Text>
            </Column>
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

      {/* CTA */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column
          fillWidth
          padding="48"
          gap="24"
          horizontal="center"
          background="brand-alpha-weak"
          radius="xl"
          s={{ padding: "32", gap: "20", radius: "l" }}
        >
          <Heading as="h2" variant="display-strong-m" align="center">
            Try eFoiling in the Maldives
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            Premium eFoils delivered to your yacht, boat, or resort through our certified local partners — with professional instruction and all safety gear included.
          </Text>
          <Row gap="16" wrap horizontal="center" fillWidth s={{ direction: "column", gap: "12" }}>
            <Button
              data-border="rounded"
              href="/work"
              variant="primary"
              size="l"
              weight="strong"
              arrowIcon
            >
              View Experiences
            </Button>
            <Button
              data-border="rounded"
              href="/blog/what-is-an-efoil"
              variant="secondary"
              size="l"
            >
              Read the Full Guide
            </Button>
          </Row>
        </Column>
      </RevealFx>
    </Column>
  );
}
