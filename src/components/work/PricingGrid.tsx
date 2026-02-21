"use client";

import {
  Column,
  Heading,
  Text,
  Button,
  Grid,
  RevealFx,
  Flex,
} from "@once-ui-system/core";
import { useRouter } from "next/navigation";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9606783344";

interface ServiceCardProps {
  title: string;
  subtitle?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaAction: () => void;
}

function ServiceCard({
  title,
  subtitle,
  description,
  features,
  ctaLabel,
  ctaAction,
}: ServiceCardProps) {
  return (
    <Flex
      fillWidth
      direction="column"
      padding="32"
      gap="24"
      background="neutral-alpha-weak"
      border="neutral-alpha-weak"
      radius="l"
      
    >
      {/* Title & Subtitle Group - Fixed height for alignment if needed, but flex-grow spacer handles bottom alignment */}
      <Column gap="8" horizontal="start">
        <Heading as="h3" variant="heading-strong-l">
          {title}
        </Heading>
        {subtitle && (
          <Text variant="label-default-s" onBackground="neutral-weak">
            {subtitle}
          </Text>
        )}
      </Column>

      {/* Description */}
      <Text
        variant="body-default-m"
        onBackground="neutral-weak"
        style={{ minHeight: '4.5em' }} // Min-height for roughly 3 lines of text alignment
      >
        {description}
      </Text>

      {/* Feature List */}
      <Column gap="12" paddingY="8" >
        {features.map((feature) => (
          <Flex key={feature} gap="12" vertical="center">
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "var(--brand-solid-strong)",
                flexShrink: 0,
              }}
            />
            <Text variant="body-default-s" onBackground="neutral-medium">
              {feature}
            </Text>
          </Flex>
        ))}
      </Column>

      {/* Spacer to push button to bottom */}
      <div style={{ flexGrow: 1 }} />

      {/* CTA Button */}
      <Button
        variant="secondary"
        size="l"
        fillWidth
        onClick={ctaAction}
      >
        {ctaLabel}
      </Button>
    </Flex>
  );
}

export function PricingGrid() {
  const router = useRouter();

  return (
    <Column horizontal="center" gap="32" fillWidth>
      <RevealFx translateY="16" fillWidth>
        <Grid columns="3" gap="24" fillWidth >
          {/* 1. Point to Point Delivery */}
          <ServiceCard
            title="Point to Point Delivery"
            subtitle="Price calculated at checkout"
            description="We bring the full Audi e-tron eFoil experience directly to your yacht, resort, or private villa location."
            features={[
              "Extend to multi-day stays for resorts, villas, and yachts",
              "Resort / marina delivery & pickup included (Maldives)",
              "Beginner instruction & on-water setup session included",
              "Full safety kit included (impact vest + helmet + essential protective gear)",
              "Optional add-ons available (extra battery, GoPro, premium accessories)"
]}
            ctaLabel="Delivery"
            ctaAction={() => router.push("/book/location")}
          />

          {/* 2. Test Drive */}
          <ServiceCard
            title="Test Drive"
            subtitle="Partner: Foiltribe"
            description="Collaborating with Foiltribe in Hulhumalé to provide accessible rentals and lessons for all ages."
            features={[
                "Single session rentals",
              "Professional lessons",
              "Open to all skill levels",
              "Located in Hulhumalé",
              "Certified instructors",
            ]}
            ctaLabel="Contact on Instagram"
            ctaAction={() =>
              window.open(
                "https://ig.me/m/efoil.rent",
                "_blank"
              )
            }
          />

          {/* 3. Determination */}
          <ServiceCard
            title="Determination Program"
            subtitle="Accessibility Initiative"
            description="Adaptive eFoil experiences. We cover the cost of the first 3 sessions for people with disabilities."
            features={[
              "First 3 sessions complimentary",
              "Personalized instruction",
              "Priority scheduling",
              "Specialized safety protocols",
              "Located in Hulhumalé",
            ]}
            ctaLabel="Inquire on Instagram"
            ctaAction={() =>
              window.open(
                "https://ig.me/m/efoil.rent",
                "_blank"
              )
            }
          />
        </Grid>
      </RevealFx>
    </Column>
  );
}
