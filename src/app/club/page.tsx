import {
  Heading,
  Text,
  Button,
  RevealFx,
  Column,
  Row,
  Grid,
  Schema,
  Meta,
  Media,
} from "@once-ui-system/core";
import { baseURL, person, about } from "@/resources";
import { ClubHeader } from "@/components/ClubHeader";
import { ClubFloatingCTA } from "@/components/ClubFloatingCTA";
import { MembershipApplicationForm } from "@/components/MembershipApplicationForm";
import { ClubHeroSection } from "./ClubHeroSection";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: "Maldives eFoil Club | Private Membership",
      description:
        "Private, application-only eFoil membership | Maldives. Priority equipment reservation, managed logistics, and member-first scheduling — delivered to your resort, yacht, or island.",
      baseURL: baseURL,
      path: "/club",
      image: "/images/audi-efoil-maldives.jpg",
    }),
    alternates: { canonical: "/club" },
    openGraph: {
      type: "website",
      title: "Maldives eFoil Club | Private Membership",
      description:
        "Private, application-only eFoil membership | Maldives. Priority equipment reservation, managed logistics, and member-first scheduling.",
      url: `${baseURL}/club`,
      siteName: "Maldives eFoil Club",
      images: [
        {
          url: `${baseURL}/images/audi-efoil-maldives.jpg`,
          width: 2400,
          height: 1260,
          alt: "Maldives eFoil Club — private membership",
        },
      ],
    },
  };
}

const INSTAGRAM_URL = "https://www.instagram.com/efoil.maldives/";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this open to everyone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — Maldives eFoil Club is invitation-only / application-only with limited capacity.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after I apply?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We review your details and respond with next steps, availability, and scheduling options.",
      },
    },
    {
      "@type": "Question",
      name: "Can you deliver to a yacht or resort?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — delivery can be arranged to yacht, resort, island, or boat depending on location and timing.",
      },
    },
    {
      "@type": "Question",
      name: "Do members get priority equipment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — members receive priority booking and equipment allocation once dates are confirmed.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer one-off sessions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — select Private eFoil Experiences are available for non-members (availability is limited).",
      },
    },
  ],
};

const faqs = faqSchema.mainEntity;

export default function ClubPage() {
  return (
    <>
      <ClubHeader />
      <Column maxWidth="l" gap="xl" paddingY="12" paddingX="16" horizontal="center">
        <Schema
          as="webPage"
          baseURL={baseURL}
          path="/club"
          title="Maldives eFoil Club | Private Membership"
          description="Private, application-only eFoil membership | Maldives."
          image="/images/audi-efoil-maldives.jpg"
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* ─── 1. HERO ─── */}
        <Column fillWidth horizontal="center" gap="l">
          <Column maxWidth="m" horizontal="center" align="center">
            <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
              <Heading as="h1" wrap="balance" variant="display-strong-xl" align="center">
                The Maldives, on eFoil — without the hassle.
              </Heading>
            </RevealFx>
            <RevealFx translateY="8" delay={0.1} fillWidth horizontal="center" paddingBottom="32">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
                Maldives eFoil Club is a{" "}
                <Text as="span" onBackground="neutral-strong" weight="strong">
                  private, application-only membership
                </Text>{" "}
                built for effortless access:{" "}
                <Text as="span" onBackground="neutral-strong" weight="strong">
                  priority equipment reservation, managed logistics, and member-first scheduling
                </Text>
                 — delivered to your resort, yacht, or island.
              </Text>
            </RevealFx>
            <RevealFx paddingTop="12" delay={0.2} horizontal="center" fillWidth>
              <ClubHeroSection />
            </RevealFx>
            <RevealFx delay={0.3} fillWidth horizontal="center" paddingTop="24">
              <Text variant="body-default-s" onBackground="neutral-medium" align="center">
                Invitation-only. Applications are reviewed. Members receive priority access and concierge support.
              </Text>
            </RevealFx>
            <RevealFx delay={0.35} fillWidth horizontal="center" paddingTop="16">
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                In collaboration with <Text as="span" weight="strong">Audi eFoil</Text> and select Maldives partners to ensure premium equipment quality and reliability.
              </Text>
            </RevealFx>
          </Column>
        </Column>

        {/* ─── Hero image ─── */}
        <RevealFx translateY="16" delay={0.4} fillWidth>
          <Column fillWidth radius="l" overflow="hidden" border="neutral-alpha-weak" style={{ maxWidth: 720, margin: "0 auto" }}>
            <Media
              src="/images/gallery/resort_efoil_rental_maldives.jpeg"
              alt="eFoil riding in crystal-clear Maldives lagoon — private club experience"
              aspectRatio="16 / 9"
            />
          </Column>
        </RevealFx>

        {/* ─── 2. SOCIAL PROOF STRIP ─── */}
        <RevealFx translateY="16" delay={0.2} fillWidth>
          <Grid columns="4" gap="16" fillWidth>
            {[
              { title: "Member-first scheduling" },
              { title: "Priority equipment allocation" },
              { title: "Delivery to resort / yacht / island" },
              { title: "Dedicated concierge support" },
            ].map((item) => (
              <Column
                key={item.title}
                padding="20"
                gap="8"
                horizontal="center"
                background="brand-alpha-weak"
                radius="l"
              >
                <Text variant="label-default-s" align="center" onBackground="brand-strong" weight="strong">
                  {item.title}
                </Text>
              </Column>
            ))}
          </Grid>
        </RevealFx>

        {/* ─── 3. PAIN REMOVAL — "More Than a Membership" ─── */}
        <RevealFx translateY="16" delay={0.2} fillWidth>
          <Column fillWidth gap="l" paddingY="l">
            <Column horizontal="center" gap="m">
              <Heading as="h2" variant="display-strong-m" align="center">
                More Than a Membership
              </Heading>
              <Text variant="heading-default-m" onBackground="neutral-weak" align="center">
                &ldquo;You arrive. We handle everything else.&rdquo;
              </Text>
            </Column>
            <Column maxWidth="m" gap="m" style={{ margin: "0 auto" }}>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Most Maldives eFoil plans break down due to scheduling friction, equipment uncertainty, and logistics. The club exists to remove those issues entirely:
              </Text>
              <Column gap="12" paddingLeft="16">
                {[
                  "No last-minute availability stress",
                  "No coordinating transfers and timing",
                  "No guessing which equipment will show up",
                  "No fragmented support",
                ].map((point) => (
                  <Row key={point} gap="8" vertical="center">
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      — {point}
                    </Text>
                  </Row>
                ))}
              </Column>
              <Text variant="body-default-m" onBackground="neutral-strong" weight="strong">
                Member promise: seamless access, consistently premium equipment, and a single point of contact.
              </Text>
            </Column>
            <Row gap="16" horizontal="center" paddingTop="m">
              <Button
                href="#membership-application"
                variant="primary"
                size="l"
                weight="strong"
              >
                Apply for Membership
              </Button>
              <Button
                href={INSTAGRAM_URL}
                variant="secondary"
                size="l"
              >
                Instagram Concierge
              </Button>
            </Row>
          </Column>
        </RevealFx>

        {/* ─── 4. WHAT MEMBERSHIP UNLOCKS ─── */}
        <RevealFx translateY="16" delay={0.2} fillWidth>
          <Column fillWidth gap="l" paddingY="l">
            <Column horizontal="center" gap="m">
              <Heading as="h2" variant="display-strong-m" align="center">
                What Membership Unlocks
              </Heading>
            </Column>
            <Grid columns="3" gap="24" fillWidth>
              <Column padding="32" gap="16" background="brand-alpha-weak" radius="l" border="brand-alpha-medium">
                <Heading as="h3" variant="heading-strong-m">
                  Priority Access
                </Heading>
                <Column gap="8">
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Guaranteed equipment allocation (subject to confirmed dates)
                  </Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Priority booking over non-members
                  </Text>
                </Column>
              </Column>
              <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l">
                <Heading as="h3" variant="heading-strong-m">
                  Flexible Delivery
                </Heading>
                <Column gap="8">
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Delivered to yacht, resort, private island, boat, or agreed location
                  </Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Coordinated handoff + retrieval managed by the club
                  </Text>
                </Column>
              </Column>
              <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l">
                <Heading as="h3" variant="heading-strong-m">
                  Private Experiences
                </Heading>
                <Column gap="8">
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Exclusive scheduling windows
                  </Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Curated sessions for your group, timing, and location
                  </Text>
                </Column>
              </Column>
            </Grid>
            <Grid columns="2" gap="24" fillWidth>
              <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l">
                <Heading as="h3" variant="heading-strong-m">
                  Learn &amp; Progress
                </Heading>
                <Column gap="8">
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Personal guidance to accelerate confidence and control
                  </Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Progression focus: starts, turns, carving, downwind feel
                  </Text>
                </Column>
              </Column>
              <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l">
                <Heading as="h3" variant="heading-strong-m">
                  Direct Support
                </Heading>
                <Column gap="8">
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Dedicated member contact
                  </Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Club-managed planning: timing, delivery, session coordination, updates
                  </Text>
                </Column>
              </Column>
            </Grid>
          </Column>
        </RevealFx>

        {/* ─── 5. WHO THIS IS FOR ─── */}
        <RevealFx translateY="16" delay={0.2} fillWidth>
          <Column fillWidth gap="l" paddingY="l">
            <Column horizontal="center" gap="m">
              <Heading as="h2" variant="display-strong-m" align="center">
                Who This Is For
              </Heading>
            </Column>
            <Grid columns="2" gap="16" fillWidth>
              {[
                {
                  title: "Yacht guests & yacht teams",
                  desc: "Who want reliable, priority equipment access",
                },
                {
                  title: "Repeat Maldives visitors",
                  desc: "Who don't want to re-plan every trip",
                },
                {
                  title: "Short-stay travelers",
                  desc: "Who need everything handled fast and correctly",
                },
                {
                  title: "Guided progression riders",
                  desc: "Who want discreet, private scheduling with personal coaching",
                },
                {
                  title: "Effortless access seekers",
                  desc: "Anyone who values seamless access over deals and discounts",
                },
              ].map((item) => (
                <Row
                  key={item.title}
                  padding="20"
                  gap="12"
                  vertical="center"
                  background="neutral-alpha-weak"
                  radius="l"
                >
                  <Column gap="4">
                    <Text variant="heading-strong-s" onBackground="neutral-strong">
                      {item.title}
                    </Text>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {item.desc}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Grid>
          </Column>
        </RevealFx>

        {/* ─── 6. MEMBERSHIP SECTION ─── */}
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
              Private Membership. Limited Availability.
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak" align="center" style={{ maxWidth: 600 }}>
              Membership is application-only to protect scheduling, equipment quality, and the private-club atmosphere.
            </Text>
            <Column gap="12" style={{ maxWidth: 480 }}>
              {[
                "Member priority access + reservation protection",
                "Concierge logistics management",
                "Member-only scheduling windows",
                "Member credits & benefits",
              ].map((b) => (
                <Row key={b} gap="8" vertical="center">
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    — {b}
                  </Text>
                </Row>
              ))}
            </Column>
            <Row gap="16" horizontal="center" paddingTop="m">
              <Button
                href="#membership-application"
                variant="primary"
                size="l"
                weight="strong"
              >
                Apply for Membership
              </Button>
            </Row>
          </Column>
        </RevealFx>

        {/* ─── 7. HOW IT WORKS ─── */}
        <RevealFx translateY="16" delay={0.2} fillWidth>
          <Column fillWidth gap="l" paddingY="l">
            <Column horizontal="center" gap="m">
              <Heading as="h2" variant="display-strong-m" align="center">
                How It Works
              </Heading>
            </Column>
            <Grid columns="4" gap="16" fillWidth>
              {[
                { step: "1", title: "Apply for membership", desc: "Submit your application through the form below." },
                { step: "2", title: "Confirm your dates", desc: "We respond quickly with availability and options." },
                { step: "3", title: "We manage everything", desc: "Equipment, delivery, coordination, and retrieval." },
                { step: "4", title: "Sessions scheduled", desc: "Private timing, member-first support." },
              ].map((item) => (
                <Column
                  key={item.step}
                  padding="24"
                  gap="12"
                  horizontal="center"
                  background="neutral-alpha-weak"
                  radius="l"
                >
                  <Text variant="display-strong-m" onBackground="brand-strong">
                    {item.step}
                  </Text>
                  <Text variant="heading-strong-s" align="center">
                    {item.title}
                  </Text>
                  <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                    {item.desc}
                  </Text>
                </Column>
              ))}
            </Grid>
            <Row horizontal="center" paddingTop="m">
              <Text variant="body-default-s" onBackground="neutral-weak">
                Prefer Instagram?{" "}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--brand-on-background-strong)", fontWeight: 600 }}
                >
                  Message us directly
                </a>
              </Text>
            </Row>
          </Column>
        </RevealFx>

        {/* ─── APPLICATION FORM ─── */}
        <RevealFx translateY="16" delay={0.2} fillWidth>
          <MembershipApplicationForm />
        </RevealFx>

        {/* ─── 8. NON-MEMBER OPTION ─── */}
        <RevealFx translateY="16" delay={0.2} fillWidth>
          <Column
            fillWidth
            padding="48"
            gap="24"
            horizontal="center"
            background="neutral-alpha-weak"
            radius="xl"
          >
            <Heading as="h2" variant="heading-strong-l" align="center">
              Not ready to apply?
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak" align="center" style={{ maxWidth: 520 }}>
              You can still book one-off private sessions (limited availability). Premium equipment standards and concierge-style communication included.
            </Text>
            <Button
              href="/efoil-experiences-maldives"
              variant="secondary"
              size="l"
              arrowIcon
            >
              Explore Private eFoil Experiences
            </Button>
          </Column>
        </RevealFx>

        {/* ─── 9. FAQ ─── */}
        <RevealFx translateY="16" delay={0.2} fillWidth>
          <Column fillWidth gap="l" paddingY="l">
            <Column horizontal="center" gap="m">
              <Heading as="h2" variant="display-strong-m" align="center">
                Frequently Asked Questions
              </Heading>
            </Column>
            <Grid columns="2" gap="24" fillWidth>
              {faqs.map((faq, index) => (
                <Column
                  key={index}
                  padding="24"
                  gap="12"
                  background="neutral-alpha-weak"
                  radius="l"
                >
                  <Heading as="h3" variant="heading-strong-s">
                    {faq.name}
                  </Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {faq.acceptedAnswer.text}
                  </Text>
                </Column>
              ))}
            </Grid>
          </Column>
        </RevealFx>
      </Column>
      <ClubFloatingCTA />
    </>
  );
}
