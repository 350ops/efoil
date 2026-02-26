import {
  Column,
  Heading,
  Text,
  Meta,
  Schema,
  RevealFx,
  Grid,
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
    alternates: { canonical: "/efoil-experiences-maldives" },
  };
}

export default function Work() {
  return (
    <Column maxWidth="l" paddingY="xl" paddingX="16" gap="xl">
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
      <Column horizontal="center" gap="m">
        <Heading as="h1" variant="display-strong-l" align="center">
          Choose Your eFoil Experience
        </Heading>
        <Column maxWidth="m" gap="24" horizontal="center">
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            Whether you need delivery to your yacht, a local test drive, or an adaptive experience — we have you covered.
          </Text>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center">
            Our eFoil rental packages are designed for flexibility and convenience. We bring the Audi e-tron eFoil to you, anywhere in the Maldives. From hourly sessions for beginners to full-day rentals for experienced riders, we have the perfect package for your island adventure.
          </Text>
        </Column>
      </Column>

      {/* Pricing Cards */}
      <PricingGrid />

      {/* Equipment Section */}
      <RevealFx translateY="16">
        <Column gap="l" paddingY="xl">
          <Column horizontal="center" gap="m">
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

      {/* Booking FAQ */}
      <RevealFx translateY="16">
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Booking Questions
            </Heading>
          </Column>
          <Grid columns="2" gap="24" fillWidth>
             <Column padding="24" gap="12" background="neutral-alpha-weak" radius="l">
                <Heading as="h3" variant="heading-strong-s">Do I need to pay in advance?</Heading>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  For yacht and resort deliveries, we typically require a deposit to secure your booking slot and logistics. The balance can be settled upon delivery or as arranged with our partner.
                </Text>
             </Column>
             <Column padding="24" gap="12" background="neutral-alpha-weak" radius="l">
                <Heading as="h3" variant="heading-strong-s">What is the cancellation policy?</Heading>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  We understand plans change. Cancellations made more than 24 hours in advance are generally fully refundable. Weather-related cancellations decided by the instructor are always fully refundable or rescheduled.
                </Text>
             </Column>
             <Column padding="24" gap="12" background="neutral-alpha-weak" radius="l">
                <Heading as="h3" variant="heading-strong-s">Can I extend my session?</Heading>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  Yes, if the equipment is not booked for another client immediately after. You can arrange extensions directly with the instructor on-site.
                </Text>
             </Column>
             <Column padding="24" gap="12" background="neutral-alpha-weak" radius="l">
                <Heading as="h3" variant="heading-strong-s">Are life jackets provided?</Heading>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  Absolutely. All rentals include a high-quality impact vest and a helmet with communication gear so you can talk to your instructor while riding.
                </Text>
             </Column>
          </Grid>
        </Column>
      </RevealFx>
    </Column>
  );
}
