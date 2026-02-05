import {
  Heading,
  Text,
  Button,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
  Media,
  Grid,
  Flex,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes, gallery } from "@/resources";
import { Mailchimp } from "@/components";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      {/* Hero Section */}
      <Column fillWidth horizontal="center" gap="l">
        <Column maxWidth="m" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="24"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="16"
                paddingY="8"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row gap="12" vertical="center" paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-xl" align="center">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center">
            <Row gap="16" wrap>
              <Button
                id="book-now"
                data-border="rounded"
                href="/work"
                variant="primary"
                size="l"
                weight="strong"
                arrowIcon
              >
                Book Your eFoil
              </Button>
              <Button
                id="learn-more"
                data-border="rounded"
                href="/about"
                variant="secondary"
                size="l"
              >
                Learn More
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* Video Section */}
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Column fillWidth radius="l" overflow="hidden" border="neutral-alpha-weak">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
              maxHeight: "600px",
            }}
          >
            <source src="/images/gallery/gliding.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Column>
      </RevealFx>

      {/* How It Works Section */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="xl" paddingY="xl">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              How It Works
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Experience the thrill of flying above the Maldives in three simple steps
            </Text>
          </Column>
          
          <Grid columns="3" gap="24" fillWidth s={{ columns: 1 }}>
            {/* Step 1: Choose */}
            <Column
              padding="32"
              gap="20"
              horizontal="center"
              background="neutral-alpha-weak"
              radius="l"
            >
              <Flex
                background="brand-alpha-medium"
                radius="full"
                padding="16"
                horizontal="center"
                vertical="center"
              >
                <Text variant="display-strong-m" onBackground="brand-strong">1</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Choose
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Select your package—hourly, half-day, or full-day experiences. Tell us your yacht, boat, or resort location.
              </Text>
            </Column>

            {/* Step 2: Book */}
            <Column
              padding="32"
              gap="20"
              horizontal="center"
              background="neutral-alpha-weak"
              radius="l"
            >
              <Flex
                background="brand-alpha-medium"
                radius="full"
                padding="16"
                horizontal="center"
                vertical="center"
              >
                <Text variant="display-strong-m" onBackground="brand-strong">2</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Book
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Secure your session with easy online payment. We'll confirm your booking and coordinate delivery.
              </Text>
            </Column>

            {/* Step 3: Fly */}
            <Column
              padding="32"
              gap="20"
              horizontal="center"
              background="neutral-alpha-weak"
              radius="l"
            >
              <Flex
                background="brand-alpha-medium"
                radius="full"
                padding="16"
                horizontal="center"
                vertical="center"
              >
                <Text variant="display-strong-m" onBackground="brand-strong">3</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Fly
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Our team arrives with everything you need. After a quick briefing, you'll be flying above crystal-clear waters.
              </Text>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* Equipment Showcase */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Premium Equipment
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Ride the revolutionary Audi e-tron eFoil—engineered for performance and safety
            </Text>
          </Column>
          
          <Grid columns="2" gap="24" fillWidth s={{ columns: 1 }}>
            <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
              <Media
                src="/images/gallery/performance_3 Background Removed.png"
                alt="Audi e-tron eFoil complete setup"
                aspectRatio="16 / 10"
              />
            </Column>
            <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
              <Media
                src="/images/gallery/Performance_midnightblue_01 Background Removed.png"
                alt="Audi e-tron eFoil board top view"
                aspectRatio="16 / 10"
              />
            </Column>
          </Grid>
          
          <Row fillWidth horizontal="center" paddingTop="l">
            <Button
              href="/gallery"
              variant="secondary"
              size="m"
              arrowIcon
            >
              View Full Gallery
            </Button>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      </RevealFx>

      {/* Delivery Locations */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              We Come to You
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Direct delivery anywhere in the Maldives
            </Text>
          </Column>
          
          <Grid columns="3" gap="24" fillWidth s={{ columns: 1 }}>
            <Column
              padding="24"
              gap="12"
              horizontal="center"
              background="neutral-alpha-weak"
              radius="l"
            >
              <Heading as="h3" variant="heading-strong-m" align="center">
                Luxury Yachts
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                We deliver to yachts and superyachts throughout the atolls
              </Text>
            </Column>
            <Column
              padding="24"
              gap="12"
              horizontal="center"
              background="neutral-alpha-weak"
              radius="l"
            >
              <Heading as="h3" variant="heading-strong-m" align="center">
                Liveaboards & Boats
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Safari boats and private charters—we'll meet you on the water
              </Text>
            </Column>
            <Column
              padding="24"
              gap="12"
              horizontal="center"
              background="neutral-alpha-weak"
              radius="l"
            >
              <Heading as="h3" variant="heading-strong-m" align="center">
                Island Resorts
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                From luxury resorts to private islands across the Maldives
              </Text>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* CTA Section */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column
          fillWidth
          padding="48"
          gap="24"
          horizontal="center"
          background="brand-alpha-weak"
          radius="xl"
        >
          <Heading as="h2" variant="display-strong-m" align="center">
            Ready to Fly?
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            Book your eFoil experience today and create unforgettable memories in the Maldives
          </Text>
          <Button
            href="/work"
            variant="primary"
            size="l"
            weight="strong"
            arrowIcon
          >
            View Packages & Book Now
          </Button>
        </Column>
      </RevealFx>

      {/* Newsletter */}
      <Mailchimp />
    </Column>
  );
}
