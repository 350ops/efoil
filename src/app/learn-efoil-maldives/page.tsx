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
  Line,
  Media,
} from "@once-ui-system/core";
import { baseURL, person, about } from "@/resources";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9606783344";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: "Learn to eFoil in the Maldives | Discovery, Progression & Advanced Coaching",
      description:
        "Private eFoil instruction in the Maldives. From your first ride to advanced carving and wave riding. Audi e-tron eFoil with expert guidance across North Malé Atoll.",
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent("Learn to eFoil")}`,
      path: "/learn-efoil-maldives",
    }),
    alternates: { canonical: "/learn-efoil-maldives" },
  };
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Learn to eFoil — Maldives",
  description:
    "Private eFoil instruction in the Maldives. Discovery sessions, progression coaching, and advanced riding guidance on the Audi e-tron eFoil.",
  provider: {
    "@type": "Organization",
    name: "eFoil Maldives",
    url: baseURL,
  },
  areaServed: { "@type": "Country", name: "Maldives" },
  serviceType: "eFoil instruction",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need any experience to learn eFoiling?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No prior experience is needed. Our Discovery Session is designed for complete beginners. The Audi e-tron eFoil has a wireless speed controller that allows gradual progression, and our instructors guide you every step of the way.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to learn to eFoil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most riders are standing and riding within 15–20 minutes. Flying above the water on the foil typically happens within the first session. Progression to confident, independent riding usually takes 2–3 sessions.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in an eFoil lesson?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every session includes the Audi e-tron eFoil, a dedicated instructor, all safety equipment (impact vest, helmet), and a tailored coaching plan based on your current level. We handle all equipment and logistics.",
      },
    },
    {
      "@type": "Question",
      name: "Where do eFoil lessons take place?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sessions are held in calm, sheltered lagoons around North Malé Atoll — ideal learning conditions. We can also deliver instruction to your yacht or resort location anywhere in the Maldives.",
      },
    },
    {
      "@type": "Question",
      name: "Is eFoiling safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Audi e-tron eFoil features a fully enclosed propulsion system with no exposed blades, an automatic motor cutoff when you release the controller, and a gradual speed ramp. Combined with professional instruction and full safety gear, it is one of the safest powered watersports available.",
      },
    },
    {
      "@type": "Question",
      name: "Can experienced riders book advanced coaching?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Our Advanced Coaching sessions focus on carving technique, wave riding, efficiency, and endurance. Whether you own an eFoil or have ridden before, we tailor the session to push your riding to the next level.",
      },
    },
  ],
};

export default function LearnEfoilPage() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" paddingX="16" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/learn-efoil-maldives"
        title="Learn to eFoil in the Maldives"
        description="Private eFoil instruction from discovery to advanced coaching."
        image={`/api/og/generate?title=${encodeURIComponent("Learn to eFoil")}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <Column fillWidth horizontal="center" gap="l">
        <Column maxWidth="m" horizontal="center" align="center">
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading as="h1" wrap="balance" variant="display-strong-xl" align="center">
              Learn to eFoil
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              From your first ride to advanced carving — private instruction on the Audi e-tron eFoil in the Maldives. No experience required.
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" fillWidth>
            <Row gap="16" wrap horizontal="center" fillWidth s={{ direction: "column" }}>
              <Button
                data-border="rounded"
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I'd like to book an eFoil lesson in the Maldives.")}`}
                variant="primary"
                size="l"
                weight="strong"
                arrowIcon
              >
                Book a Session
              </Button>
              <Button
                data-border="rounded"
                href="#levels"
                variant="secondary"
                size="l"
              >
                View Levels
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* Hero Image */}
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Column fillWidth radius="l" overflow="hidden" border="neutral-alpha-weak">
          <Media
            src="/images/gallery/efoil-turquoise-water.jpg"
            alt="Learning to eFoil in the crystal-clear waters of the Maldives"
            aspectRatio="16 / 9"
          />
        </Column>
      </RevealFx>

      {/* Why Learn With Us */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Why Learn With Us
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center" style={{ maxWidth: 680 }}>
              Private, one-on-one instruction in the world&apos;s most beautiful riding conditions. Our instructors are experienced eFoil riders who tailor every session to your ability — whether you&apos;ve never touched a board or you&apos;re looking to master advanced techniques.
            </Text>
          </Column>
          <Grid columns="3" gap="24" fillWidth>
            <Column padding="24" gap="12" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m" align="center">
                Private Sessions
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                One-on-one or small group. Never shared with strangers. Your session, your pace.
              </Text>
            </Column>
            <Column padding="24" gap="12" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m" align="center">
                Premium Equipment
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Learn on the Audi e-tron eFoil — the safest, most advanced electric hydrofoil available.
              </Text>
            </Column>
            <Column padding="24" gap="12" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m" align="center">
                Perfect Conditions
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Calm, warm lagoons with flat water year-round. Ideal for learning at every level.
              </Text>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* Learning Levels */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column id="levels" fillWidth gap="l" paddingY="l">
          <Row fillWidth paddingRight="64" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Your Progression Path
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Three levels designed to take you from first ride to confident, independent flying
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth>
            <Column padding="32" gap="16" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-l" align="center">
                Discovery
              </Heading>
              <Text variant="body-default-s" onBackground="brand-strong" align="center">First ride</Text>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Your introduction to eFoiling. Start on the board in the water, learn balance and throttle control, and progress to standing and riding. Most riders are up and gliding within minutes.
              </Text>
              <Column gap="8" paddingTop="8">
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">No experience needed</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Water safety briefing included</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">All equipment provided</Text>
              </Column>
            </Column>

            <Column padding="32" gap="16" horizontal="center" background="brand-alpha-weak" radius="l" border="brand-alpha-medium">
              <Heading as="h3" variant="heading-strong-l" align="center">
                Progression
              </Heading>
              <Text variant="body-default-s" onBackground="brand-strong" align="center">Build confidence</Text>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                For riders who can stand and ride. Focus on turning, speed control, body positioning, and efficiency. Learn to read water conditions and ride with confidence in open water.
              </Text>
              <Column gap="8" paddingTop="8">
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Turning and directional control</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Foil height management</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Energy-efficient riding</Text>
              </Column>
            </Column>

            <Column padding="32" gap="16" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-l" align="center">
                Advanced
              </Heading>
              <Text variant="body-default-s" onBackground="brand-strong" align="center">Master the flight</Text>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                For experienced riders looking to push their limits. Work on carving, wave riding, speed runs, and endurance. Technical coaching to refine your style and extend your range.
              </Text>
              <Column gap="8" paddingTop="8">
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Carving and dynamic turns</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Wave riding technique</Text>
                <Text variant="body-default-s" onBackground="neutral-medium" align="center">Endurance and efficiency</Text>
              </Column>
            </Column>
          </Grid>

          <Text variant="body-default-s" onBackground="neutral-weak" align="center">
            All sessions include the Audi e-tron eFoil, a dedicated instructor, and full safety equipment. Sessions available around North Mal&eacute; Atoll or delivered to your location.
          </Text>

          <Row fillWidth horizontal="center" paddingTop="m">
            <Button
              data-border="rounded"
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I'd like to book an eFoil lesson in the Maldives.")}`}
              variant="primary"
              size="l"
              weight="strong"
              arrowIcon
            >
              Book Your Session
            </Button>
          </Row>

          <Row fillWidth paddingLeft="64" horizontal="end" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
        </Column>
      </RevealFx>

      {/* What's Included */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              What&apos;s Included
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Everything you need for a safe, focused learning experience
            </Text>
          </Column>

          <Grid columns="2" gap="24" fillWidth>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Expert Instructor
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                A dedicated instructor guides your entire session. Coaching is tailored to your level — from first-time water safety to advanced riding technique.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Audi e-tron eFoil
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Learn on the best equipment available. The Audi e-tron features enclosed propulsion, automatic cutoff, and gradual speed control — ideal for safe learning.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Safety Equipment
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Impact vest, helmet, and all protective gear provided. The Aeroloop board&apos;s soft rails add an extra layer of safety during learning.
              </Text>
            </Column>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Heading as="h3" variant="heading-strong-m">
                Flexible Location
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Sessions based in the calm lagoons around North Mal&eacute; Atoll. We can also bring instruction to your yacht, resort, or private location.
              </Text>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* Cross-links */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Grid columns="2" gap="24" fillWidth>
          <Column
            padding="32"
            gap="16"
            horizontal="center"
            background="neutral-alpha-weak"
            radius="l"
          >
            <Heading as="h3" variant="heading-strong-m" align="center">
              Private eFoil Experiences
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak" align="center">
              Already comfortable on the board? Book a private session delivered to your yacht, resort, or boat.
            </Text>
            <Button href="/efoil-experiences-maldives" variant="secondary" size="m" arrowIcon>
              View Experiences
            </Button>
          </Column>
          <Column
            padding="32"
            gap="16"
            horizontal="center"
            background="neutral-alpha-weak"
            radius="l"
          >
            <Heading as="h3" variant="heading-strong-m" align="center">
              Own an Audi eFoil
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak" align="center">
              Ready to ride whenever you want? We facilitate access to Audi eFoils in the Maldives through our partner network.
            </Text>
            <Button href="/audi-foil-board" variant="secondary" size="m" arrowIcon>
              Explore Ownership
            </Button>
          </Column>
        </Grid>
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

      {/* CTA */}
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
            Ready for Your First Flight?
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            Tell us your level and preferred dates — we handle everything else
          </Text>
          <Row gap="16" wrap horizontal="center" s={{ direction: "column" }}>
            <Button
              data-border="rounded"
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I'd like to book an eFoil lesson in the Maldives.")}`}
              variant="primary"
              size="l"
              weight="strong"
              arrowIcon
            >
              Book via WhatsApp
            </Button>
            <Button
              data-border="rounded"
              href={`mailto:hello@efoil.rent?subject=eFoil Lesson Inquiry`}
              variant="secondary"
              size="l"
            >
              Email Us
            </Button>
          </Row>
        </Column>
      </RevealFx>
    </Column>
  );
}
