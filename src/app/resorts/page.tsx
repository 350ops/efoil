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
      title: "Resort eFoil Experience Maldives | Guest Activity Partner",
      description:
        "Add a premium eFoil experience to your Maldives resort's activity menu. We supply the Audi e-tron eFoil, certified instructor, and all equipment—delivered to your beach or jetty.",
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent("Resort eFoil Partner")}`,
      path: "/resorts",
    }),
    alternates: { canonical: "/resorts" },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the resort partnership work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide the eFoil equipment, a certified instructor, and all safety gear on a scheduled or on-demand basis. Your resort promotes the experience to guests, and we handle everything from delivery to the session itself. Revenue-share and fixed-rate models are available.",
      },
    },
    {
      "@type": "Question",
      name: "Does the resort need to store any equipment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Partners deliver the eFoil before each session and collect it afterwards. Long-term on-site storage arrangements can be discussed if preferred.",
      },
    },
    {
      "@type": "Question",
      name: "Is this suitable for guests with no water sport experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Audi e-tron eFoil is designed for progressive learning. Our instructor provides a personalized briefing and stays in the water throughout. Most first-time riders are standing and flying within 15–20 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Can we schedule regular weekly sessions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Many of our resort partners operate on a fixed weekly schedule—for example, three mornings per week. We coordinate with your water sports or recreation team to set a recurring calendar that fits your guest programming.",
      },
    },
    {
      "@type": "Question",
      name: "How do you handle guest safety and liability?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We carry full insurance for all eFoil sessions. Every guest completes a waiver before riding. Our instructor conducts a mandatory safety briefing, provides life vests and helmets, and supervises all activity on the water.",
      },
    },
    {
      "@type": "Question",
      name: "What is the guest pricing and how is revenue shared?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer two models: a fixed daily rate that the resort marks up at its own discretion, or a revenue-share arrangement on per-session guest charges. We will work with your management to find the structure that fits your operations.",
      },
    },
  ],
};

export default function ResortsPage() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" paddingX="16" horizontal="center" s={{ paddingY: "8", paddingX: "12", gap: "l" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/resorts"
        title="Resort eFoil Experience Maldives | Guest Activity Partner"
        description="Add a premium eFoil experience to your Maldives resort's activity menu."
        image={`/api/og/generate?title=${encodeURIComponent("Resort eFoil Partner")}`}
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
      <Column fillWidth horizontal="center" gap="l" s={{ gap: "m" }}>
        <Column maxWidth="m" horizontal="center" align="center">
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16" s={{ paddingBottom: "12" }}>
            <Heading as="h1" wrap="balance" variant="display-strong-xl" align="center">
              eFoil Experiences for Your Resort Guests
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32" s={{ paddingBottom: "20" }}>
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              Add a premium water sport to your activity menu. We arrange the equipment, the instructor, and the unforgettable experience—your resort gets the guest delight.
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" fillWidth s={{ paddingTop: "8" }}>
            <Row gap="16" wrap horizontal="center" fillWidth s={{ direction: "column", gap: "12" }}>
              <Button
                data-border="rounded"
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I'm interested in offering eFoil experiences at our resort.")}`}
                variant="primary"
                size="l"
                weight="strong"
                arrowIcon
              >
                Discuss a Partnership
              </Button>
              <Button
                data-border="rounded"
                href="mailto:hello@efoil.rent?subject=Resort Partner Network Inquiry"
                variant="secondary"
                size="l"
              >
                Send a Proposal Request
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* How It Works for Resorts */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="xl" paddingY="xl" s={{ gap: "l", paddingY: "l" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              How the Partnership Works
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Turnkey guest experience with no capital investment
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            <Column padding="32" gap="20" horizontal="center" background="neutral-alpha-weak" radius="l" s={{ padding: "24", gap: "16", radius: "m" }}>
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center" s={{ padding: "12" }}>
                <Text variant="display-strong-m" onBackground="brand-strong">1</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Agree Terms
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                We tailor a schedule and pricing model to your resort—revenue share or fixed rate. No upfront investment required.
              </Text>
            </Column>

            <Column padding="32" gap="20" horizontal="center" background="neutral-alpha-weak" radius="l" s={{ padding: "24", gap: "16", radius: "m" }}>
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center" s={{ padding: "12" }}>
                <Text variant="display-strong-m" onBackground="brand-strong">2</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                We Deliver
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                A certified partner instructor arrives at your beach or jetty with the eFoil and all safety equipment, ready to run sessions on schedule.
              </Text>
            </Column>

            <Column padding="32" gap="20" horizontal="center" background="neutral-alpha-weak" radius="l" s={{ padding: "24", gap: "16", radius: "m" }}>
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center" s={{ padding: "12" }}>
                <Text variant="display-strong-m" onBackground="brand-strong">3</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Guests Fly
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Your guests enjoy a world-class eFoil experience. Our partners handle all instruction, safety, and equipment management.
              </Text>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* Benefits for Resorts */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Row fillWidth paddingRight="64" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              Why Resorts Partner With Us
            </Heading>
          </Column>

          <Grid columns="2" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l" s={{ padding: "24", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-m">
                No Capital Outlay
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Our partners own and maintain the equipment. Your resort adds a premium activity to its menu without purchasing, storing, or servicing water sport gear.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l" s={{ padding: "24", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-m">
                Trained Staff On-Site
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Every session is led by a certified instructor. No need to train your water sports team on a new discipline—partners bring the expertise.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l" s={{ padding: "24", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-m">
                Guest Satisfaction
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                eFoiling is a memorable, shareable experience. Guests consistently rate it as a highlight of their stay, improving reviews and repeat bookings.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l" s={{ padding: "24", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-m">
                Flexible Scheduling
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Run sessions on a fixed weekly calendar, on-demand based on guest requests, or during special events. We adapt to your resort's rhythm.
              </Text>
            </Column>
          </Grid>

          <Row fillWidth paddingLeft="64" horizontal="end" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
        </Column>
      </RevealFx>

      {/* Safety & Operations */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              Safety & Operations
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Professional standards that protect your guests and your brand
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            <Column padding="24" gap="8" horizontal="center" background="neutral-alpha-weak" radius="l" s={{ padding: "20", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-s" align="center">
                Full Insurance
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Comprehensive coverage for all eFoil sessions, protecting both guests and your resort
              </Text>
            </Column>
            <Column padding="24" gap="8" horizontal="center" background="neutral-alpha-weak" radius="l" s={{ padding: "20", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-s" align="center">
                Guest Waivers
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Digital waiver system handled by the provider before every session
              </Text>
            </Column>
            <Column padding="24" gap="8" horizontal="center" background="neutral-alpha-weak" radius="l" s={{ padding: "20", radius: "m" }}>
              <Heading as="h3" variant="heading-strong-s" align="center">
                Equipment Maintenance
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                All gear is professionally maintained, cleaned, and inspected between every session
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

      {/* Availability Form */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <RequestAvailabilityForm />
      </RevealFx>
    </Column>
  );
}
