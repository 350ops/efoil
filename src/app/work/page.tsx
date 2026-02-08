import {
  Column,
  Heading,
  Text,
  Meta,
  Schema,
  Button,
  Row,
  Grid,
  RevealFx,
  Flex,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { RequestAvailabilityForm } from "@/components/RequestAvailabilityForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9606783344";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: "eFoil Experiences & Packages | eFoil Maldives",
      description: "Explore eFoil experience options in the Maldives. Audi e-tron, Fliteboard, and Lift eFoils delivered to your yacht, boat, or resort. Enquire for personalised rates.",
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent("eFoil Experiences Maldives")}`,
      path: work.path,
    }),
    alternates: { canonical: "/work" },
  };
}

const experiences = [
  {
    id: "hourly",
    name: "Hourly Session",
    highlight: "Try eFoiling",
    description: "Perfect for a first experience. Get a professional introduction to eFoiling with full instruction and safety briefing.",
    features: ["Professional instruction", "All safety gear provided", "Delivered to your location", "Beginners welcome"],
    popular: false,
  },
  {
    id: "halfday",
    name: "Half-Day Adventure",
    highlight: "Most popular",
    description: "Ideal for learning and truly enjoying the experience. Plenty of time to progress from beginner to confident rider.",
    features: ["Extended instruction time", "Multiple riding sessions", "Photo opportunities", "Perfect for small groups"],
    popular: true,
  },
  {
    id: "fullday",
    name: "Full-Day Experience",
    highlight: "Groups & charters",
    description: "A full day with the eFoil — perfect for groups, yacht charters, or anyone who wants the ultimate experience.",
    features: ["Full day of riding", "Group sessions available", "Explore multiple spots", "Ideal for yacht charters"],
    popular: false,
  },
];

export default function Work() {
  return (
    <Column maxWidth="l" paddingY="xl" paddingX="16" gap="xl" s={{ paddingY: "l", paddingX: "12", gap: "l" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title="eFoil Experiences & Packages | eFoil Maldives"
        description="Explore eFoil experience options in the Maldives. Audi e-tron, Fliteboard, and Lift eFoils delivered to your yacht, boat, or resort."
        image={`/api/og/generate?title=${encodeURIComponent("eFoil Experiences Maldives")}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Breadcrumbs items={[{ name: "eFoil Experiences", href: "/work" }]} />

      {/* Hero Section */}
      <Column horizontal="center" gap="m" s={{ gap: "12" }}>
        <Heading variant="display-strong-l" align="center">
          Choose Your eFoil Experience
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" align="center">
          Audi e-tron, Fliteboard & Lift eFoils — delivered to your yacht, boat, or resort anywhere in the Maldives by our certified local partners
        </Text>
      </Column>

      {/* Experience Cards */}
      <RevealFx translateY="16">
        <Grid columns="3" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
          {experiences.map((exp) => (
            <Column
              key={exp.id}
              padding="32"
              gap="20"
              background={exp.popular ? "brand-alpha-weak" : "neutral-alpha-weak"}
              border={exp.popular ? "brand-alpha-medium" : "neutral-alpha-weak"}
              radius="l"
              s={{ padding: "24", gap: "16", radius: "m" }}
            >
              {exp.popular && (
                <Row horizontal="center">
                  <Text
                    variant="label-default-s"
                    onBackground="brand-strong"
                    style={{
                      background: "var(--brand-alpha-medium)",
                      padding: "4px 12px",
                      borderRadius: "100px",
                    }}
                  >
                    Most Popular
                  </Text>
                </Row>
              )}

              <Column gap="4" horizontal="center">
                <Heading as="h3" variant="heading-strong-l" align="center">
                  {exp.name}
                </Heading>
                <Text variant="label-default-s" onBackground="brand-medium" align="center">
                  {exp.highlight}
                </Text>
              </Column>

              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                {exp.description}
              </Text>

              <Column gap="8" paddingY="m" s={{ paddingY: "12", gap: "6" }}>
                {exp.features.map((feature) => (
                  <Row key={feature} gap="8" vertical="center">
                    <Text onBackground="brand-strong">✓</Text>
                    <Text variant="body-default-s">{feature}</Text>
                  </Row>
                ))}
              </Column>

              <Column gap="12" fillWidth>
                <Button
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I'm interested in the ${exp.name} eFoil experience in the Maldives. Could you share availability and rates?`)}`}
                  variant={exp.popular ? "primary" : "secondary"}
                  size="l"
                  fillWidth
                >
                  Enquire via WhatsApp
                </Button>
                <Button
                  href={`mailto:hello@efoil.rent?subject=${encodeURIComponent(`${exp.name} Enquiry`)}`}
                  variant="tertiary"
                  size="s"
                  fillWidth
                >
                  Or Email Us
                </Button>
              </Column>
            </Column>
          ))}
        </Grid>
      </RevealFx>

      {/* Personalised Rates Note */}
      <RevealFx translateY="16">
        <Column
          fillWidth
          padding="32"
          gap="12"
          horizontal="center"
          background="brand-alpha-weak"
          radius="l"
          s={{ padding: "24", radius: "m" }}
        >
          <Heading as="h2" variant="heading-strong-m" align="center">
            Personalised Rates
          </Heading>
          <Column maxWidth={40} horizontal="center">
            <Text variant="body-default-m" onBackground="neutral-weak" align="center">
              Rates depend on your location, group size, and requirements. Contact us for a tailored quote — we respond within hours.
            </Text>
          </Column>
          <Row gap="16" wrap horizontal="center" paddingTop="12" s={{ direction: "column", gap: "12" }}>
            <Button
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'd like a personalised quote for an eFoil experience in the Maldives.")}`}
              variant="primary"
              size="m"
              arrowIcon
            >
              Get a Quote
            </Button>
          </Row>
        </Column>
      </RevealFx>

      {/* Equipment Section */}
      <RevealFx translateY="16">
        <Column gap="l" paddingY="xl" s={{ gap: "m", paddingY: "l" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              Premium Equipment
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Audi e-tron, Fliteboard & Lift — three world-class electric hydrofoils
            </Text>
          </Column>
          <Projects />
        </Column>
      </RevealFx>

      {/* Availability Form */}
      <RevealFx translateY="16">
        <RequestAvailabilityForm />
      </RevealFx>
    </Column>
  );
}
