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
import { CheckoutButton } from "@/components/CheckoutButton";
import { RequestAvailabilityForm } from "@/components/RequestAvailabilityForm";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9606783344";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: "eFoil Rental Packages | Book Your Maldives Experience",
      description: "Choose your eFoil adventure package. Hourly sessions, half-day, or full-day experiences. Premium Audi e-tron eFoil delivered to your yacht, boat, or resort.",
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent("eFoil Rental Packages")}`,
      path: work.path,
    }),
    alternates: { canonical: "/work" },
  };
}

const packages = [
  {
    id: "hourly",
    name: "Hourly Session",
    price: "$250",
    unit: "per hour",
    description: "Perfect for trying eFoiling. Minimum 2 hours. Includes instruction and safety briefing.",
    features: ["2 hour minimum", "Professional instruction", "All safety gear", "Delivery included"],
    popular: false,
  },
  {
    id: "halfday",
    name: "Half-Day Adventure",
    price: "$800",
    unit: "4 hours",
    description: "Ideal for learning and enjoying the experience. Plenty of time to master flying.",
    features: ["4 hours of riding", "Extended instruction", "Multiple sessions", "Photo opportunities"],
    popular: true,
  },
  {
    id: "fullday",
    name: "Full-Day Experience",
    price: "$1,400",
    unit: "8 hours",
    description: "Perfect for groups or extended exploration. Make the most of your day on the water.",
    features: ["8 hours of riding", "Group sessions available", "Explore multiple spots", "Best value"],
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
        title="eFoil Rental Packages | Book Your Maldives Experience"
        description="Choose your eFoil adventure package. Premium Audi e-tron eFoil delivered to your yacht, boat, or resort in Maldives."
        image={`/api/og/generate?title=${encodeURIComponent("eFoil Rental Packages")}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero Section */}
      <Column horizontal="center" gap="m" s={{ gap: "12" }}>
        <Heading variant="display-strong-l" align="center">
          Choose Your eFoil Experience
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" align="center">
          Premium Audi e-tron eFoil delivered to your yacht, boat, or resort anywhere in Maldives
        </Text>
      </Column>

      {/* Pricing Cards */}
      <RevealFx translateY="16">
        <Grid columns="3" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
          {packages.map((pkg) => (
            <Column
              key={pkg.id}
              padding="32"
              gap="20"
              background={pkg.popular ? "brand-alpha-weak" : "neutral-alpha-weak"}
              border={pkg.popular ? "brand-alpha-medium" : "neutral-alpha-weak"}
              radius="l"
              s={{ padding: "24", gap: "16", radius: "m" }}
            >
              {pkg.popular && (
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
                  {pkg.name}
                </Heading>
                <Row gap="4" vertical="end" horizontal="center" s={{ direction: "column", gap: "0", vertical: "center" }}>
                  <Text variant="display-strong-l">{pkg.price}</Text>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {pkg.unit}
                  </Text>
                </Row>
              </Column>

              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                {pkg.description}
              </Text>

              <Column gap="8" paddingY="m" s={{ paddingY: "12", gap: "6" }}>
                {pkg.features.map((feature) => (
                  <Row key={feature} gap="8" vertical="center">
                    <Text onBackground="brand-strong">✓</Text>
                    <Text variant="body-default-s">{feature}</Text>
                  </Row>
                ))}
              </Column>

              <Column gap="12" fillWidth>
                <CheckoutButton
                  packageId={pkg.id}
                  packageName={pkg.name}
                  popular={pkg.popular}
                />
                <Button
                  href={`https://wa.me/${whatsappNumber}?text=Hi! I have questions about the ${pkg.name} eFoil package.`}
                  variant="tertiary"
                  size="s"
                  fillWidth
                >
                  Questions? WhatsApp Us
                </Button>
              </Column>
            </Column>
          ))}
        </Grid>
      </RevealFx>

      {/* Equipment Section */}
      <RevealFx translateY="16">
        <Column gap="l" paddingY="xl" s={{ gap: "m", paddingY: "l" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              Premium Equipment Details
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Learn more about the Audi e-tron eFoil experience
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
