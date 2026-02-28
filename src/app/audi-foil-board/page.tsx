"use client";

import {
  Heading,
  Text,
  Button,
  RevealFx,
  Column,
  Row,
  Media,
  Grid,
  Flex,
  Line,
  Icon,
} from "@once-ui-system/core";
import { baseURL, person } from "@/resources";
import { useRouter } from "next/navigation";

const instagramUrl = "https://www.instagram.com/efoil.maldives/";

export default function AudiFoilBoard() {
  const router = useRouter();

  return (
    <Column fillWidth horizontal="center" gap="xl" paddingY="64">
      {/* Hero Section */}
      <Column fillWidth maxWidth="l" horizontal="center" paddingX="16" gap="32">
        <Column horizontal="center" gap="16">
          <RevealFx translateY="4">
            <Text variant="label-strong-m" onBackground="brand-weak" style={{ letterSpacing: '2px' }}>
              THE FUTURE OF WATERSPORTS
            </Text>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2}>
            <Heading as="h1" variant="display-strong-xl" align="center">
              Audi e-tron eFoil
            </Heading>
          </RevealFx>
          <RevealFx translateY="12" delay={0.4}>
            <Text variant="heading-default-l" onBackground="neutral-weak" align="center" style={{ maxWidth: '800px' }}>
              Experience the ultimate sensation of flying above the water. Engineered by Audi's technical excellence for performance, safety, and silence.
            </Text>
          </RevealFx>
        </Column>

        <RevealFx translateY="16" delay={0.6} fillWidth>
          <Column radius="xl" overflow="hidden" border="neutral-alpha-weak">
            <Media
              src="/images/gallery/aeroloop.jpg"
              alt="Audi e-tron Aeroloop eFoil board"
              aspectRatio="21 / 9"
            />
          </Column>
        </RevealFx>
      </Column>

      {/* The Board: Aeroloop Technology */}
      <Column fillWidth maxWidth="l" paddingX="16" paddingY="l" gap="l">
        <Grid columns="2" gap="48" style={{ alignItems: 'center' }} >
          <Column gap="24">
            <Heading as="h2" variant="display-strong-m">
              Aeroloop Technology
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak">
              The Audi eFoil features the revolutionary Aeroloop board—an inflatable high-performance structure that combines the rigidity of a hardboard with the safety and portability of an inflatable.
            </Text>
            <Column gap="12">
              <Point title="Maximum Safety" desc="The soft outer rail protects riders and the environment during falls." />
              <Point title="High Rigidity" desc="Advanced drop-stitch technology ensures a rock-solid platform for precise foil control." />
              <Point title="Lightweight" desc="Easy to handle on the yacht and in the water." />
            </Column>
          </Column>
          <Media
            src="/images/gallery/aeroloop2.jpeg"
            alt="Audi e-tron Aeroloop detail"
            radius="l"
            aspectRatio="1 / 1"
          />
        </Grid>
      </Column>

      {/* The Propulsion: Silent Power */}
      <Column fillWidth background="neutral-alpha-weak" paddingY="xl">
        <Column fillWidth maxWidth="l" paddingX="16" gap="l">
          <Grid columns="2" gap="48" style={{ alignItems: 'center' }} >
             <Media
              src="/images/gallery/engine-white-background.jpg"
              alt="Audi e-tron eFoil Motor"
              radius="l"
              aspectRatio="4 / 3"
            />
            <Column gap="24">
              <Heading as="h2" variant="display-strong-m">
                Silent Jet Propulsion
              </Heading>
              <Text variant="body-default-l" onBackground="neutral-weak">
                The fully enclosed propulsion unit is a masterpiece of engineering. Unlike traditional propellers, the hydrodynamically optimized jet system is safer and incredibly quiet.
              </Text>
              <Column gap="12">
                <Point title="Fully Shrouded" desc="No exposed rotating blades, ensuring safe operation for all skill levels." />
                <Point title="Zero Emission" desc="Clean electric power that respects the pristine Maldivian ecosystem." />
                <Point title="Efficient" desc="Optimized for maximum battery life and thrust." />
              </Column>
            </Column>
          </Grid>
        </Column>
      </Column>

      {/* The Control: Intuitive Interface */}
      <Column fillWidth maxWidth="l" paddingX="16" paddingY="l" gap="l">
        <Grid columns="2" gap="48" style={{ alignItems: 'center' }} >
          <Column gap="24">
            <Heading as="h2" variant="display-strong-m">
              Total Control
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak">
              Master the flight with the smart wireless controller. Designed for an intuitive grip and featuring a high-contrast display for real-time telemetry.
            </Text>
            <Column gap="12">
              <Point title="Smart Display" desc="Monitor speed, battery percentage, and GPS data at a glance." />
              <Point title="Precise Trigger" desc="Experience smooth acceleration from zero to flying." />
              <Point title="Safety Interlock" desc="The motor shuts off automatically if you fall." />
            </Column>
          </Column>
          <Media
            src="/images/gallery/remote.jpg"
            alt="Audi e-tron eFoil Remote"
            radius="l"
            aspectRatio="1 / 1"
          />
        </Grid>
      </Column>

      {/* Specifications Grid */}
      <Column fillWidth maxWidth="l" paddingX="16" paddingY="xl" gap="l">
        <Column horizontal="center" gap="16">
          <Heading as="h2" variant="display-strong-m">Technical Specifications</Heading>
          <Line maxWidth={40} background="brand-alpha-strong" />
        </Column>
        <Grid columns="4" gap="24"  >
          <Spec title="Top Speed" value="50 km/h" icon="bolt" />
          <Spec title="Ride Time" value="Up to 120 min" icon="timer" />
          <Spec title="Weight" value="32 kg" icon="scale" />
          <Spec title="Max Load" value="110 kg" icon="person" />
        </Grid>
      </Column>

      {/* Action Gallery */}
      <Column fillWidth background="neutral-alpha-weak" paddingY="xl">
        <Column fillWidth maxWidth="l" paddingX="16" gap="l">
          <Heading as="h2" variant="display-strong-m" align="center">Pure Emotion</Heading>
          <Grid columns="3" gap="16" >
            <Media src="/images/gallery/efoiling.jpeg" alt="eFoiling action" radius="m" aspectRatio="4 / 5" />
            <Media src="/images/gallery/girlefoil.jpg" alt="Woman efoiling" radius="m" aspectRatio="4 / 5" />
            <Media src="/images/gallery/efoilbeach.jpeg" alt="eFoil on beach" radius="m" aspectRatio="4 / 5" />
          </Grid>
        </Column>
      </Column>

      {/* Own an eFoil */}
      <Column fillWidth maxWidth="l" paddingX="16" paddingY="l" gap="l">
        <Column horizontal="center" gap="16">
          <Heading as="h2" variant="display-strong-m" align="center">Own an eFoil | Maldives</Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center" style={{ maxWidth: '720px' }}>
            We facilitate access to Audi e-tron eFoils | Maldives through our trusted partner network. From acquisition to delivery, local support, and maintenance — we are with you every step of the way.
          </Text>
        </Column>
        <Grid columns="3" gap="24">
          <Column padding="24" gap="12" horizontal="center" background="neutral-alpha-weak" radius="l">
            <Text variant="heading-strong-m" align="center">Ride on Your Schedule</Text>
            <Text variant="body-default-s" onBackground="neutral-weak" align="center">
              No bookings, no availability constraints. Your board, your lagoon, whenever you want.
            </Text>
          </Column>
          <Column padding="24" gap="12" horizontal="center" background="neutral-alpha-weak" radius="l">
            <Text variant="heading-strong-m" align="center">Local Support</Text>
            <Text variant="body-default-s" onBackground="neutral-weak" align="center">
              Spare parts, maintenance, and technical support available locally | Maldives.
            </Text>
          </Column>
          <Column padding="24" gap="12" horizontal="center" background="neutral-alpha-weak" radius="l">
            <Text variant="heading-strong-m" align="center">Delivery & Setup</Text>
            <Text variant="body-default-s" onBackground="neutral-weak" align="center">
              We handle delivery to your resort or yacht, initial setup, and a personal orientation session.
            </Text>
          </Column>
        </Grid>
        <Row fillWidth horizontal="center" paddingTop="m">
          <Button
            size="l"
            variant="primary"
            onClick={() => window.open(instagramUrl, '_blank')}
          >
            Enquire About Ownership
          </Button>
        </Row>
      </Column>

      {/* CTA Section */}
      <Column fillWidth maxWidth="l" horizontal="center" paddingX="16" paddingY="xl" gap="32">
        <Column horizontal="center" gap="16">
          <Heading as="h2" variant="display-strong-l" align="center">Experience, Learn, or Own</Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            Three ways to get on the water with the Audi e-tron eFoil
          </Text>
        </Column>
        <Row gap="16" wrap horizontal="center">
          <Button size="l" variant="primary" onClick={() => router.push('/efoil-experiences-maldives')}>
            Rent
          </Button>
          <Button size="l" variant="secondary" onClick={() => router.push('/learn-efoil-maldives')}>
            Learn
          </Button>
          <Button size="l" variant="tertiary" onClick={() => router.push('/gallery')}>
            Gallery
          </Button>
        </Row>
      </Column>
    </Column>
  );
}

function Point({ title, desc }: { title: string; desc: string }) {
  return (
    <Column gap="4">
      <Text variant="body-strong-m" onBackground="neutral-strong">{title}</Text>
      <Text variant="body-default-m" onBackground="neutral-weak">{desc}</Text>
    </Column>
  );
}

function Spec({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <Column padding="24" background="neutral-alpha-weak" radius="l" border="neutral-alpha-weak" horizontal="center" gap="16">
      <Icon name={icon} size="m" onBackground="brand-weak" />
      <Column horizontal="center" gap="8">
        <Text variant="label-default-s" onBackground="neutral-weak" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
          {title}
        </Text>
        <Text variant="heading-strong-l" onBackground="brand-strong">
          {value}
        </Text>
      </Column>
    </Column>
  );
}
