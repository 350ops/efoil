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
  Media,
} from "@once-ui-system/core";
import { baseURL, person, about, events } from "@/resources";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: events.title,
      description: events.description,
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent("Maldives Watersports Events")}`,
      path: events.path,
    }),
    alternates: { canonical: "/events" },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When is the best wind season for wingfoiling and kitesurfing in Maldives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The southwest monsoon (Hulhangu), from May to October, brings consistent 15–20+ knot winds ideal for kitesurfing and wingfoiling. June is the most reliable wind month. The northeast monsoon (Iruvai), December to March, offers lighter 8–13 knot winds with calmer conditions better suited to eFoiling and beginners. Year-round water temperatures are 28–30°C.",
      },
    },
    {
      "@type": "Question",
      name: "What major surf competitions are held in Maldives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Key events include the Four Seasons Surfing Champions Trophy at Kuda Huraa (August) — an invitation-only contest for legends of the sport with single-fin, twin-fin, and thruster divisions. The Asian Surfing Championships are held at Thulusdhoo's famous Cokes break (July). The Soneva Surf Pro at Baa Atoll (October) is an exclusive eco-conscious invitational. The Visit Maldives Pro brings IBC World Tour bodyboarding to Malé City in July–August.",
      },
    },
    {
      "@type": "Question",
      name: "Are there kitesurf and wingfoil events in Maldives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Kuredu Kite Week in Lhaviyani Atoll (June) features workshops and races at one of the best wind locations in Maldives. The Raalhu Edhuru Kite Fest in Maafushi/Guraidhoo (September) is a community-driven celebration of wind sports and local talent. The wingfoil scene is growing rapidly, with emerging competitive events during the May–September wind season.",
      },
    },
    {
      "@type": "Question",
      name: "Can beginners try wingfoiling or kitesurfing in Maldives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Maldives offers some of the most beginner-friendly conditions in the world — shallow lagoons with flat water, warm 28–30°C temperatures, and sandy bottoms. Lhaviyani Atoll and Raa Atoll have consistent cross-shore winds and large lagoons ideal for learning. Several resorts and operators offer introductory lessons and gear rental.",
      },
    },
    {
      "@type": "Question",
      name: "Where are the best spots for kitesurfing in Maldives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lhaviyani Atoll is legendary for consistent cross-shore winds and vast shallow lagoons — Kuredu and Cocoon are key spots. North and South Malé Atoll offer easy access from the capital. Raa Atoll is an emerging destination with pristine lagoons and new luxury resorts. Uninhabited sandbanks across the atolls provide flat-water riding with no obstacles.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best month to visit Maldives for watersports?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the sport. August is the peak for surfing (biggest swells, competition season) but also the rainiest month. For wind sports with sunnier skies, aim for June or late September. January to March is ideal for eFoiling and calm-water activities. For the best all-round conditions combining wind, swell, and weather, June and September are the sweet spots.",
      },
    },
  ],
};

export default function EventsPage() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" paddingX="16" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={events.path}
        title={events.title}
        description={events.description}
        image={`/api/og/generate?title=${encodeURIComponent("Maldives Watersports Events")}`}
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
              Maldives Watersports Scene
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              Wingfoiling, kitesurfing, surfing, and eFoiling — Maldives is fast becoming one of the world's most exciting watersports destinations. Discover real events, find the best season, and locate the top spots.
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" fillWidth>
            <Row gap="16" wrap horizontal="center" fillWidth s={{ direction: "column" }}>
              <Button
                data-border="rounded"
                href="/blog"
                variant="primary"
                size="l"
                weight="strong"
                arrowIcon
              >
                Read the Latest Stories
              </Button>
              <Button
                data-border="rounded"
                href="/efoil-experiences-maldives"
                variant="secondary"
                size="l"
              >
                Try eFoiling
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* Hero Image */}
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Column fillWidth radius="l" overflow="hidden" border="neutral-alpha-weak">
          <Media
            src="/images/gallery/efoil-drone.jpg"
            alt="Two riders eFoiling over a turquoise Maldives lagoon — aerial drone shot"
            aspectRatio="16 / 7"
          />
        </Column>
      </RevealFx>

      {/* Hero Images */}
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Grid columns="3" gap="24" fillWidth>
          <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
            <Media
              src="/images/gallery/efoilguy.jpeg"
              alt="Rider flying on eFoil above crystal clear turquoise Maldives water — action shot"
              aspectRatio="3 / 4"
            />
          </Column>
          <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
            <Media
              src="/images/gallery/efoilgirl.jpg"
              alt="eFoil rider gliding above turquoise Maldives water — electric hydrofoil watersports"
              aspectRatio="3 / 4"
            />
          </Column>
          <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
            <Media
              src="/images/gallery/maldives-turquoise-lagoon.jpg"
              alt="Crystal clear turquoise lagoon in Maldives — perfect watersports conditions"
              aspectRatio="3 / 4"
            />
          </Column>
        </Grid>
      </RevealFx>

      {/* Choose Your Ride — Discipline Cards */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="xl" paddingY="xl">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Choose Your Ride
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center" style={{ maxWidth: 720 }}>
              Maldives supports almost every water discipline — from open ocean swells to glassy lagoons. Here's what's riding strong across the atolls.
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth>
            <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l">
              <Text variant="display-strong-l" onBackground="brand-strong" align="center">
                🪁
              </Text>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Wing Foil
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                The fastest-growing sport in Maldives. Flat lagoons and consistent trade winds make it ideal for cruising, freestyle, and downwind runs between islands. Requires less wind than kitesurfing. Local riders are competing internationally.
              </Text>
              <Column gap="4" paddingTop="8">
                <Text variant="label-default-s" onBackground="neutral-weak">Best season: May – October</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">Gear: 4m–6m wings common</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">Vibe: Chill, technical, cruising</Text>
              </Column>
            </Column>

            <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l">
              <Text variant="display-strong-l" onBackground="brand-strong" align="center">
                🏄
              </Text>
              <Heading as="h3" variant="heading-strong-l" align="center">
                Kitesurfing
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                Massive lagoons offer a flat-water freestyle paradise. Lhaviyani Atoll's cross-shore winds are legendary. The consistent 15–20 knot monsoon winds from June to September attract riders from around the globe for big air and racing.
              </Text>
              <Column gap="4" paddingTop="8">
                <Text variant="label-default-s" onBackground="neutral-weak">Best season: June – September</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">Gear: 9m–12m kites (15–20 knots)</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">Vibe: High energy, big air</Text>
              </Column>
            </Column>

            <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l">
              <Text variant="display-strong-l" onBackground="brand-strong" align="center">
                ⚡
              </Text>
              <Heading as="h3" variant="heading-strong-l" align="center">
                eFoiling
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                No wind? No problem. Electric hydrofoil surfing is perfect for the calm, glassy mornings of the dry season. Accessible to beginners, addictive for everyone. foiltribe pioneered eFoil rentals in Maldives from Hulhumalé.
              </Text>
              <Column gap="4" paddingTop="8">
                <Text variant="label-default-s" onBackground="neutral-weak">Best season: January – April (calm days)</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">Gear: Provided — Audi e-tron eFoil</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">Vibe: Futuristic, smooth, luxury</Text>
              </Column>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* Seasonal Guide */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Row fillWidth paddingRight="64" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Seasonal Guide
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center" style={{ maxWidth: 720 }}>
              Maldives has two distinct monsoon seasons. The <strong>Dry Season (Iruvai)</strong> from January to March brings calm waters and sunshine. The <strong>Wet Season (Hulhangu)</strong> from May to October delivers the winds and swells that power kite, wing, and surf seasons.
            </Text>
          </Column>

          <Grid columns="2" gap="24" fillWidth>
            <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l">
              <Text variant="label-strong-s" onBackground="brand-strong">DRY SEASON — IRUVAI</Text>
              <Heading as="h3" variant="heading-strong-m">
                January – March
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Crystal clear, calm water with light breezes (8–12 knots). Peak sun hours, minimal rain. Perfect conditions for eFoiling, paddleboarding, snorkeling, and diving. Glassy lagoons at their best.
              </Text>
              <Row gap="8" wrap>
                <Text variant="label-default-s" onBackground="brand-strong" style={{ background: "var(--brand-alpha-weak)", padding: "2px 8px", borderRadius: 6 }}>eFoil</Text>
                <Text variant="label-default-s" onBackground="brand-strong" style={{ background: "var(--brand-alpha-weak)", padding: "2px 8px", borderRadius: 6 }}>Paddleboard</Text>
                <Text variant="label-default-s" onBackground="brand-strong" style={{ background: "var(--brand-alpha-weak)", padding: "2px 8px", borderRadius: 6 }}>Snorkeling</Text>
              </Row>
            </Column>

            <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l">
              <Text variant="label-strong-s" onBackground="brand-strong">WET SEASON — HULHANGU</Text>
              <Heading as="h3" variant="heading-strong-m">
                May – October
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Strong southwest monsoon winds (15–20+ knots) and significant swells. The season that powers competitive surfing, kitesurfing, and wingfoiling. August has the biggest swells but also the most rain. For sunnier wind, aim for June or late September.
              </Text>
              <Row gap="8" wrap>
                <Text variant="label-default-s" onBackground="brand-strong" style={{ background: "var(--brand-alpha-weak)", padding: "2px 8px", borderRadius: 6 }}>Kitesurfing</Text>
                <Text variant="label-default-s" onBackground="brand-strong" style={{ background: "var(--brand-alpha-weak)", padding: "2px 8px", borderRadius: 6 }}>Wing Foil</Text>
                <Text variant="label-default-s" onBackground="brand-strong" style={{ background: "var(--brand-alpha-weak)", padding: "2px 8px", borderRadius: 6 }}>Surfing</Text>
              </Row>
            </Column>
          </Grid>

          <Column padding="24" gap="8" background="brand-alpha-weak" radius="l">
            <Text variant="label-strong-s" onBackground="brand-strong">KEY INSIGHT</Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              August is the peak intersection of reliable swell (surfing) and consistent wind (kiting) — but it's also the rainiest month. For the best all-round conditions with sunnier skies, target <strong>June</strong> or <strong>late September</strong>.
            </Text>
          </Column>

          <Row fillWidth paddingLeft="64" horizontal="end" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
        </Column>
      </RevealFx>

      {/* Aerial Shot Divider */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth radius="l" overflow="hidden" border="neutral-alpha-weak">
          <Media
            src="/images/gallery/maldives-aerial-island.jpg"
            alt="Aerial view of a Maldivian island surrounded by turquoise lagoon — watersports paradise"
            aspectRatio="21 / 9"
          />
        </Column>
      </RevealFx>

      {/* Competitions & Events */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Competitions & Events
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center" style={{ maxWidth: 720 }}>
              From the luxurious Surfing Champions Trophy to community-led kite festivals. Most major surf competitions run during peak swell season (July–August), while wind events target June–September.
            </Text>
          </Column>

          <Grid columns="2" gap="24" fillWidth>
            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Row gap="8" vertical="center">
                <Text variant="label-strong-s" onBackground="brand-strong">SURF</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">August</Text>
              </Row>
              <Heading as="h3" variant="heading-strong-m">
                Four Seasons Surfing Champions Trophy
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Kuda Huraa, North Male' Atoll
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                The world's most luxurious surfing contest. Invitation-only for legends of the sport, with distinctive single-fin, twin-fin, and thruster divisions. A recurring annual event that attracts the biggest names in surfing.
              </Text>
            </Column>

            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Row gap="8" vertical="center">
                <Text variant="label-strong-s" onBackground="brand-strong">SURF</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">July</Text>
              </Row>
              <Heading as="h3" variant="heading-strong-m">
                Asian Surfing Championships
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Thulusdhoo, Cokes Break
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Major regional qualifier for global events. High-performance surfing on one of Maldives' fastest hollow waves. Thulusdhoo is the capital of Maldivian surf culture.
              </Text>
            </Column>

            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Row gap="8" vertical="center">
                <Text variant="label-strong-s" onBackground="brand-strong">BODYBOARD</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">July – August</Text>
              </Row>
              <Heading as="h3" variant="heading-strong-m">
                Visit Maldives Pro
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Male' City (Varunulaa Raalhugan)
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Part of the IBC World Tour. The premier bodyboarding event attracting top international athletes to the capital's break. A confirmed annual fixture on the international circuit.
              </Text>
            </Column>

            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Row gap="8" vertical="center">
                <Text variant="label-strong-s" onBackground="brand-strong">SURF</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">October</Text>
              </Row>
              <Heading as="h3" variant="heading-strong-m">
                Soneva Surf Pro
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Baa Atoll
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Exclusive invitational event focusing on eco-conscious surfing and luxury hospitality. Combines world-class waves with Soneva's commitment to sustainability.
              </Text>
            </Column>

            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Row gap="8" vertical="center">
                <Text variant="label-strong-s" onBackground="brand-strong">KITE / WING</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">June</Text>
              </Row>
              <Heading as="h3" variant="heading-strong-m">
                Kuredu Kite Week
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Lhaviyani Atoll
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Workshops and fun races organized by the resort's watersports centre. Ideal for improving skills in one of Maldives' best wind locations — vast shallow lagoons with consistent cross-shore conditions.
              </Text>
            </Column>

            <Column padding="32" gap="12" background="neutral-alpha-weak" radius="l">
              <Row gap="8" vertical="center">
                <Text variant="label-strong-s" onBackground="brand-strong">KITE / WING</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">September</Text>
              </Row>
              <Heading as="h3" variant="heading-strong-m">
                Raalhu Edhuru Kite Fest
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                Maafushi / Guraidhoo
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                Community-driven celebration of wind sports. Great for experiencing local Maldivian talent and culture. Open to riders of all levels, from first-timers to pros.
              </Text>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* Top Spots & Hubs */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Top Spots & Hubs
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center" style={{ maxWidth: 720 }}>
              Specific atolls are better suited for specific sports. North Male' is the heart of surfing, while Lhaviyani and Raa Atolls are emerging as world-class wind destinations due to their orientation.
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth>
            {[
              {
                name: "Thulusdhoo Island",
                atoll: "North Male'",
                sports: "Surf",
                desc: "Home to the legendary 'Cokes' break — the capital of Maldivian surf culture. Budget-friendly guesthouses, local vibe, and one of the fastest hollow waves in the country.",
              },
              {
                name: "Lhaviyani Atoll",
                atoll: "Lhaviyani",
                sports: "Kite, Wing",
                desc: "Known for vast, shallow lagoons and consistent cross-shore winds. Kuredu and Cocoon are the key spots. The go-to destination for serious wind sport riders.",
              },
              {
                name: "Guraidhoo",
                atoll: "South Male'",
                sports: "Surf, Bodyboard",
                desc: "Access to 'Kandooma Right' and 'Riptides'. A perfect mix of local culture and world-class reef breaks. Hosts the Raalhu Edhuru Kite Fest.",
              },
              {
                name: "Raa Atoll",
                atoll: "Raa",
                sports: "Wing, eFoil",
                desc: "Emerging destination with new luxury resorts offering pristine lagoons perfect for foiling. Calm waters in the dry season make it ideal for eFoil sessions.",
              },
              {
                name: "Himmafushi",
                atoll: "North Male'",
                sports: "Surf",
                desc: "Famous for the 'Jailbreaks' wave — a classic Maldivian surf island with a laid-back vibe and easy access from Malé.",
              },
              {
                name: "South Ari Atoll",
                atoll: "Ari",
                sports: "eFoil, Diving",
                desc: "Deep lagoons and calm waters in season. Better for eFoiling and diving (including whale shark encounters) than wind sports.",
              },
            ].map((spot) => (
              <Column key={spot.name} padding="24" gap="8" background="neutral-alpha-weak" radius="l">
                <Row horizontal="between" vertical="center" fillWidth>
                  <Heading as="h3" variant="heading-strong-s">
                    {spot.name}
                  </Heading>
                  <Text variant="label-default-s" onBackground="neutral-weak">{spot.atoll}</Text>
                </Row>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {spot.desc}
                </Text>
                <Row gap="8" wrap paddingTop="4">
                  {spot.sports.split(", ").map((sport) => (
                    <Text key={sport} variant="label-default-s" onBackground="brand-strong" style={{ background: "var(--brand-alpha-weak)", padding: "2px 8px", borderRadius: 6 }}>
                      {sport}
                    </Text>
                  ))}
                </Row>
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
            Want to Try eFoiling?
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            No wind. No waves. Just you, flying above the Indian Ocean on an electric hydrofoil. Book an Audi e-tron eFoil session today.
          </Text>
          <Row gap="16" wrap horizontal="center" s={{ direction: "column" }}>
            <Button href="/efoil-experiences-maldives" variant="primary" size="l" weight="strong" arrowIcon>
              View eFoil Experiences
            </Button>
            <Button href="/blog" variant="secondary" size="l">
              Read Our Blog
            </Button>
          </Row>
        </Column>
      </RevealFx>
    </Column>
  );
}
