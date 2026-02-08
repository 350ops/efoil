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
} from "@once-ui-system/core";
import { baseURL, person, about } from "@/resources";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: "eFoil Locations in the Maldives | Atoll-by-Atoll Guide",
      description:
        "Discover the best eFoil riding locations across the Maldives atolls. From North Malé to Ari Atoll — eFoil experiences delivered to yachts and resorts through certified local partners.",
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent("eFoil Locations — Maldives Atolls")}`,
      path: "/maldives-atolls",
    }),
    alternates: { canonical: "/maldives-atolls" },
  };
}

const atolls = [
  {
    name: "North Malé Atoll",
    also: "Kaafu Atoll",
    description:
      "Home to the capital Malé and some of the most popular resorts. Short transfer times from the airport make this the most accessible atoll. Excellent flat-water lagoons for eFoiling, especially around the resort islands.",
    highlights: [
      "Closest atoll to Velana International Airport",
      "Dozens of luxury resorts and yacht anchorages",
      "Calm lagoons ideal for beginner eFoil sessions",
      "Year-round delivery availability",
    ],
  },
  {
    name: "South Malé Atoll",
    also: "Kaafu Atoll (South)",
    description:
      "Less crowded than its northern neighbour, South Malé offers some of the best diving and water sport conditions in the region. The wide channels between islands create interesting riding conditions for experienced eFoilers.",
    highlights: [
      "Quieter, more exclusive resort islands",
      "Wide channels with clear, deep water",
      "Great for multi-day yacht charter eFoil delivery",
      "Consistent conditions year-round",
    ],
  },
  {
    name: "Baa Atoll",
    also: "UNESCO Biosphere Reserve",
    description:
      "A UNESCO Biosphere Reserve known for Hanifaru Bay's manta ray feeding. The protected lagoons and pristine water quality make Baa Atoll exceptional for eFoiling — glide above coral gardens in crystal-clear visibility.",
    highlights: [
      "UNESCO Biosphere Reserve status",
      "Some of the clearest water in the Maldives",
      "Premium resort cluster (Soneva, Amilla, Dusit Thani)",
      "Manta ray season adds to the experience (June–November)",
    ],
  },
  {
    name: "Raa Atoll",
    also: "Northern Maalhosmadulu",
    description:
      "Raa Atoll is gaining popularity with luxury resort openings and safari boat routes. The vast, shallow lagoons are perfect for eFoiling — warm, flat water with minimal boat traffic.",
    highlights: [
      "Emerging luxury destination",
      "Large, shallow lagoons ideal for eFoiling",
      "Less crowded waters than central atolls",
      "Growing yacht charter route",
    ],
  },
  {
    name: "Ari Atoll",
    also: "Alifu Atoll",
    description:
      "One of the largest atolls in the Maldives, Ari is famous for whale shark sightings at South Ari and spectacular reef diving. The extensive lagoon system offers hours of eFoil riding with diverse underwater scenery.",
    highlights: [
      "Whale shark encounters (South Ari)",
      "Extensive reef systems visible while riding",
      "Major safari and liveaboard destination",
      "Both resort and yacht delivery available",
    ],
  },
  {
    name: "Other Atolls",
    also: "Lhaviyani, Noonu, Dhaalu, Meemu & beyond",
    description:
      "eFoil experiences are available across the Maldives, including remote atolls not yet on the typical tourist circuit. If you're anchored or staying somewhere off the beaten path, contact us to arrange delivery through our local partners.",
    highlights: [
      "Delivery to any atoll with advance booking",
      "Remote and pristine riding locations",
      "Custom itineraries for yacht charters",
      "Contact us for availability and logistics",
    ],
  },
];

export default function MaldivesAtollsPage() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" paddingX="16" horizontal="center" s={{ paddingY: "8", paddingX: "12", gap: "l" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/maldives-atolls"
        title="eFoil Locations in the Maldives | Atoll-by-Atoll Guide"
        description="Discover the best eFoil riding locations across the Maldives atolls."
        image={`/api/og/generate?title=${encodeURIComponent("eFoil Locations — Maldives Atolls")}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Breadcrumbs items={[{ name: "Maldives Atolls", href: "/maldives-atolls" }]} />

      {/* Hero */}
      <Column fillWidth horizontal="center" gap="l" s={{ gap: "m" }}>
        <Column maxWidth="m" horizontal="center" align="center">
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16" s={{ paddingBottom: "12" }}>
            <Heading wrap="balance" variant="display-strong-xl" align="center">
              eFoil Locations Across the Maldives
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32" s={{ paddingBottom: "20" }}>
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              eFoil experiences delivered to yachts, liveaboards, and resorts across every major atoll through our certified local partners. Here is where you can ride.
            </Text>
          </RevealFx>
        </Column>
      </Column>

      {/* Atoll Cards */}
      <RevealFx translateY="16" delay={0.4} fillWidth>
        <Column fillWidth gap="24" s={{ gap: "16" }}>
          {atolls.map((atoll) => (
            <Column
              key={atoll.name}
              fillWidth
              padding="32"
              gap="16"
              background="neutral-alpha-weak"
              radius="l"
              s={{ padding: "24", gap: "12", radius: "m" }}
            >
              <Row fillWidth horizontal="between" vertical="end" s={{ direction: "column", gap: "4" }}>
                <Heading as="h2" variant="heading-strong-l">
                  {atoll.name}
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {atoll.also}
                </Text>
              </Row>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {atoll.description}
              </Text>
              <Grid columns="2" gap="8" fillWidth s={{ columns: 1 }}>
                {atoll.highlights.map((highlight) => (
                  <Row key={highlight} gap="8" vertical="center">
                    <Text onBackground="brand-strong">✓</Text>
                    <Text variant="body-default-s">{highlight}</Text>
                  </Row>
                ))}
              </Grid>
            </Column>
          ))}
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
            Book Your Atoll Experience
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            Tell us where you are and our certified local partners handle the rest — delivery, instruction, and equipment.
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
              View Packages
            </Button>
            <Button
              data-border="rounded"
              href="/yachts"
              variant="secondary"
              size="l"
            >
              Yacht Delivery
            </Button>
          </Row>
        </Column>
      </RevealFx>
    </Column>
  );
}
