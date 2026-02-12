"use client";

import { useState } from "react";
import {
  Column,
  Heading,
  Text,
  Button,
  Row,
  Grid,
  RevealFx,
  SegmentedControl,
} from "@once-ui-system/core";
import { CheckoutButton } from "@/components/CheckoutButton";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9606783344";

const packages = [
  {
    id: "short-session",
    name: {
      base: "1 Hour Session",
      delivery: "Half Day Rental",
    },
    price: {
      base: "$100",
      delivery: "$600",
    },
    unit: {
      base: "1 hour",
      delivery: "8 hours",
    },
    description: {
      base: "Quick session or discovery lesson at our location.",
      delivery: "Perfect for a morning or afternoon session.",
    },
    features: {
      base: ["1-hour session", "Professional instruction", "Safety gear included"],
      delivery: ["8-hour rental", "Delivery included", "Full instruction", "Safety gear"],
    },
    popular: false,
  },
  {
    id: "long-session",
    name: {
      base: "2 Hour Session",
      delivery: "Daily Rental",
    },
    price: {
      base: "$180",
      delivery: "$999",
    },
    unit: {
      base: "2 hours",
      delivery: "Full 24 hours",
    },
    description: {
      base: "Double the flight time. Great for mastering the eFoil.",
      delivery: "Maximize your flight time with a full day rental.",
    },
    features: {
      base: ["2-hour session", "Extended flight time", "Safety gear included"],
      delivery: ["Full 24-hour rental", "Delivery and pickup included", "Full instruction", "Safety gear"],
    },
    popular: true,
  },
];

export function PricingGrid() {
  const [deliveryOption, setDeliveryOption] = useState("with");

  return (
    <Column horizontal="center" gap="32" fillWidth>
      <SegmentedControl
        buttons={[
          { value: "without", label: "Male/Hulhumale Pick Up or Lesson" },
          { value: "with", label: "Resorts and Yachts Service" },
        ]}
        selected={deliveryOption}
        onToggle={(value) => setDeliveryOption(value)}
      />
      <RevealFx translateY="16" fillWidth>
        <Grid columns="2" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
          {packages.map((pkg) => {
            const isDelivery = deliveryOption === "with";
            const currentName = isDelivery ? pkg.name.delivery : pkg.name.base;
            const currentPrice = isDelivery ? pkg.price.delivery : pkg.price.base;
            const currentUnit = isDelivery ? pkg.unit.delivery : pkg.unit.base;
            const currentDesc = isDelivery ? pkg.description.delivery : pkg.description.base;
            const currentFeatures = isDelivery ? pkg.features.delivery : pkg.features.base;

            return (
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
                    {currentName}
                  </Heading>
                  <Row gap="4" vertical="end" horizontal="center" s={{ direction: "column", gap: "0", vertical: "center" }}>
                    <Text variant="display-strong-l">
                      {currentPrice}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {currentUnit}
                    </Text>
                  </Row>
                </Column>

                <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                  {currentDesc}
                </Text>

                <Column gap="8" paddingY="m" s={{ paddingY: "12", gap: "6" }}>
                  {currentFeatures.map((feature) => (
                    <Row key={feature} gap="8" vertical="center">
                      <Text onBackground="brand-strong">✓</Text>
                      <Text variant="body-default-s">{feature}</Text>
                    </Row>
                  ))}
                </Column>

                <Column gap="12" fillWidth>
                  <CheckoutButton
                    packageId={pkg.id}
                    packageName={currentName}
                    popular={pkg.popular}
                  />
                  <Button
                    href={`https://wa.me/${whatsappNumber}?text=Hi! I have questions about the ${currentName} eFoil package.`}
                    variant="tertiary"
                    size="s"
                    fillWidth
                  >
                    Questions? WhatsApp Us
                  </Button>
                </Column>
              </Column>
            );
          })}
        </Grid>
      </RevealFx>
    </Column>
  );
}
