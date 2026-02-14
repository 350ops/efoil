import {
  Column,
  Heading,
  Text,
  Meta,
  Schema,
  RevealFx,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { PricingGrid } from "@/components/work/PricingGrid";
import { RequestAvailabilityForm } from "@/components/RequestAvailabilityForm";

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
          Whether you need delivery to your yacht, a local test drive, or an adaptive experience — we have you covered
        </Text>
      </Column>

      {/* Pricing Cards */}
      <PricingGrid />

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
