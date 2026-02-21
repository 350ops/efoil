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
import { PartnerApplicationForm } from "@/components/PartnerApplicationForm";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9606783344";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: "Become an eFoil Partner Operator | eFoil Maldives Network",
      description:
        "Join our operator network in Maldives. We provide Audi e-tron eFoil equipment, training, and booking infrastructure to qualified water sport operators, dive centres, and excursion providers.",
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent("Partner Operator Network")}`,
      path: "/partners",
    }),
    alternates: { canonical: "/partners" },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who can become an eFoil partner operator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work with licensed water sport operators, dive centres, excursion companies, and yacht charter agencies operating in Maldives. Applicants should have marine safety experience and the ability to serve clients on the water.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to purchase the eFoil equipment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. We offer both lease-to-operate and revenue-share models where we supply the Audi e-tron eFoil. Operators who prefer to own equipment outright can also discuss purchase arrangements.",
      },
    },
    {
      "@type": "Question",
      name: "What training is provided?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All partner operators complete our certification programme covering eFoil operation, guest instruction techniques, safety protocols, equipment maintenance, and emergency procedures. Training is conducted in-person in Maldives.",
      },
    },
    {
      "@type": "Question",
      name: "How does the booking system work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Partners receive bookings through our website (efoil.rent) and are dispatched based on location and availability. Partners can also generate their own bookings and use our system for payment processing, or operate independently with their own client base.",
      },
    },
    {
      "@type": "Question",
      name: "What areas can I operate in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We assign operating zones by atoll to avoid overlap between partners. Priority is given to areas with high yacht traffic and resort density. Exclusive zones are available for committed partners.",
      },
    },
    {
      "@type": "Question",
      name: "What are the revenue expectations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Earnings depend on session volume and location. Our current pricing starts at $250 per hour with a 2-hour minimum. Partners operating in high-traffic atolls during peak season typically run multiple sessions per day.",
      },
    },
  ],
};

export default function PartnersPage() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" paddingX="16" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/partners"
        title="Become an eFoil Partner Operator | eFoil Maldives Network"
        description="Join our operator network in Maldives. We provide Audi e-tron eFoil equipment, training, and booking infrastructure."
        image={`/api/og/generate?title=${encodeURIComponent("Partner Operator Network")}`}
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
      <Column fillWidth horizontal="center" gap="l">
        <Column maxWidth="m" horizontal="center" align="center">
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-xl" align="center">
              Become an eFoil Partner Operator
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              Join our network of certified operators across Maldives. We provide the equipment, training, and bookings—you deliver the experience.
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" fillWidth>
            <Row gap="16" wrap horizontal="center" fillWidth s={{ direction: "column" }}>
              <Button
                data-border="rounded"
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I'm interested in becoming an eFoil partner operator in Maldives.")}`}
                variant="primary"
                size="l"
                weight="strong"
                arrowIcon
              >
                Apply to Join
              </Button>
              <Button
                data-border="rounded"
                href="mailto:hello@efoil.rent?subject=Partner Operator Application"
                variant="secondary"
                size="l"
              >
                Email Us
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* How It Works */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="xl" paddingY="xl">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              How the Partner Programme Works
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              From application to your first session in weeks, not months
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth>
            <Column padding="32" gap="20" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center">
                <Text variant="display-strong-m" onBackground="brand-strong">1</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Apply
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Tell us about your operation—location, experience, and the clients you serve. We review applications within a week.
              </Text>
            </Column>

            <Column padding="32" gap="20" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center">
                <Text variant="display-strong-m" onBackground="brand-strong">2</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Train
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Complete our in-person certification covering eFoil operation, guest instruction, safety protocols, and equipment care.
              </Text>
            </Column>

            <Column padding="32" gap="20" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Flex background="brand-alpha-medium" radius="full" padding="16" horizontal="center" vertical="center">
                <Text variant="display-strong-m" onBackground="brand-strong">3</Text>
              </Flex>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Operate
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Receive your equipment and start taking bookings—through our platform, your own channels, or both.
              </Text>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* What We Provide */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Row fillWidth paddingRight="64" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              What We Provide
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Everything you need to run a professional eFoil operation
            </Text>
          </Column>

          <Grid columns="2" gap="24" fillWidth>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Premium Equipment
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Audi e-tron eFoil boards, spare batteries, chargers, safety gear, and maintenance tools. Lease or revenue-share models available—no large upfront purchase required.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Certification Training
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Hands-on programme covering riding technique, teaching methodology, water safety, and equipment maintenance. Delivered in-person in Maldives.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Booking Infrastructure
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Access to our online booking and Stripe payment system. Guests book on efoil.rent and are routed to the nearest available operator.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Marketing Support
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Listing on our website, SEO-optimised content for your area, branded materials, and social media exposure through our channels.
              </Text>
            </Column>
          </Grid>

          <Row fillWidth paddingLeft="64" horizontal="end" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
        </Column>
      </RevealFx>

      {/* Ideal Partners */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Who We're Looking For
            </Heading>
          </Column>

          <Grid columns="3" gap="24" fillWidth>
            {[
              { title: "Water Sport Operators", desc: "Existing jet ski, parasailing, or diving operators looking to add a premium offering" },
              { title: "Dive Centres", desc: "Dive shops and water activity centres with existing client relationships and marine experience" },
              { title: "Excursion Providers", desc: "Companies running yacht or island-hopping excursions that want to differentiate their packages" },
              { title: "Charter Agencies", desc: "Yacht and boat charter businesses seeking to enhance their on-water activity lineup" },
              { title: "Hotel & Resort Staff", desc: "Water sports teams at resorts interested in operating eFoil sessions for their property" },
              { title: "Entrepreneurs", desc: "Driven individuals with marine safety experience who want to build a premium water sport business" },
            ].map((item) => (
              <Column key={item.title} padding="24" gap="8" horizontal="center" background="neutral-alpha-weak" radius="l">
                <Heading as="h3" variant="heading-strong-s" align="center">
                  {item.title}
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                  {item.desc}
                </Text>
              </Column>
            ))}
          </Grid>
        </Column>
      </RevealFx>

      {/* FAQ */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Frequently Asked Questions
            </Heading>
          </Column>

          <Column fillWidth gap="20">
            {faqSchema.mainEntity.map((faq) => (
              <Column key={faq.name} padding="32" gap="12" background="neutral-alpha-weak" radius="l">
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

      {/* Partner Application Form */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <PartnerApplicationForm />
      </RevealFx>
    </Column>
  );
}
