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
import { HeroCTA, BottomCTA } from "@/components/HeroCTA";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: home.title,
      description: home.description,
      baseURL: baseURL,
      path: home.path,
      image: home.image,
    }),
    alternates: { canonical: "/" },
  };
}

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9606783344";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "eFoil Experiences Maldives",
  description:
    "Premium eFoil experiences arranged through certified local partners in the Maldives. Audi e-tron, Fliteboard & Lift electric hydrofoils delivered to yachts, boats, and resorts with professional instruction.",
  provider: {
    "@type": "Organization",
    name: "eFoil Maldives",
    url: baseURL,
    logo: `${baseURL}/images/logofoil.png`,
    email: "hello@efoil.rent",
    telephone: `+${whatsappNumber}`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+${whatsappNumber}`,
        contactType: "reservations",
        availableLanguage: ["English", "Dhivehi"],
      },
      {
        "@type": "ContactPoint",
        email: "hello@efoil.rent",
        contactType: "customer service",
      },
    ],
  },
  serviceType: "eFoil experience",
  areaServed: {
    "@type": "Country",
    name: "Maldives",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "eFoil Experience Packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Hourly Session",
        description:
          "eFoil session with professional instruction and all safety gear. Enquire for rates.",
        url: `${baseURL}/work`,
      },
      {
        "@type": "Offer",
        name: "Half-Day Adventure",
        description:
          "Extended eFoil experience with multiple sessions and photo opportunities. Enquire for rates.",
        url: `${baseURL}/work`,
      },
      {
        "@type": "Offer",
        name: "Full-Day Experience",
        description:
          "Full-day eFoil experience ideal for groups or exploring multiple spots. Enquire for rates.",
        url: `${baseURL}/work`,
      },
    ],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "eFoil Experience Maldives",
  description:
    "Premium electric hydrofoil experience in the Maldives. Audi e-tron, Fliteboard & Lift eFoils — silent, zero-emission water sport delivered to your yacht, boat, or resort through certified local partners.",
  brand: {
    "@type": "Brand",
    name: "eFoil Maldives",
  },
  category: "Water Sports Experiences",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    ratingCount: "47",
    reviewCount: "47",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does eFoil delivery to yachts and resorts work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our certified local partners deliver the eFoil directly to your yacht, liveaboard, or resort anywhere in the Maldives. They handle all transport, setup, and equipment. Just tell us your location and preferred time when you enquire.",
      },
    },
    {
      "@type": "Question",
      name: "Is eFoiling suitable for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every session includes professional instruction and a safety briefing tailored to your experience level. Most beginners are up and riding within 15–20 minutes. Premium eFoils feature intuitive speed control via a wireless handheld remote, making them accessible for first-timers.",
      },
    },
    {
      "@type": "Question",
      name: "What experience packages are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer hourly sessions, half-day adventures, and full-day experiences. Rates are personalised based on your location, group size, and requirements. Contact us via WhatsApp or email for a tailored quote.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if the weather is bad on my session day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safety is the priority. If conditions are unsuitable for riding, we will work with you to reschedule at no extra cost. Weather and sea conditions are monitored and you will be contacted in advance if adjustments are needed.",
      },
    },
    {
      "@type": "Question",
      name: "Is a safety briefing included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every session begins with a safety briefing covering board handling, speed control, water safety, and riding technique. All necessary safety gear—including a life vest and helmet—is provided at no additional charge.",
      },
    },
    {
      "@type": "Question",
      name: "How do I arrange an eFoil experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Contact us via WhatsApp or email with your preferred dates, location, and group size. We will recommend the best package and arrange everything through our certified local partners—from delivery to instruction.",
      },
    },
    {
      "@type": "Question",
      name: "What eFoil equipment is available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our partners operate a fleet of premium electric hydrofoils including the Audi e-tron, Fliteboard, and Lift eFoils. Each features carbon fibre construction, a silent electric motor, and a wireless hand controller for precise speed management. All equipment is professionally maintained between sessions.",
      },
    },
  ],
};

export default function Home() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" paddingX="16" horizontal="center" s={{ paddingY: "8", paddingX: "12", gap: "l" }}>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Hero Section */}
      <Column fillWidth horizontal="center" gap="l" s={{ gap: "m" }}>
        <Column maxWidth="m" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="24"
              s={{ paddingTop: "8", paddingBottom: "16" }}
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
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16" s={{ paddingBottom: "12" }}>
            <Heading wrap="balance" variant="display-strong-xl" align="center">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32" s={{ paddingBottom: "20" }}>
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" fillWidth s={{ paddingTop: "8" }}>
            <HeroCTA />
          </RevealFx>
        </Column>
      </Column>

      {/* Video Section */}
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Column fillWidth radius="l" overflow="hidden" border="neutral-alpha-weak" s={{ radius: "m" }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
            }}
          >
            <source src="/images/gallery/gliding.mp4" type="video/mp4" />
          </video>
        </Column>
      </RevealFx>

      {/* How It Works Section */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="xl" paddingY="xl" s={{ gap: "l", paddingY: "l" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              How It Works
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Three steps to flying above the Maldives
            </Text>
          </Column>
          
          {/* Steps — connected vertical layout */}
          <Column fillWidth gap="0" horizontal="center">
            {[
              {
                num: "01",
                title: "Choose",
                desc: "Pick your package and tell us your location—yacht, resort, or island.",
                icon: "📍",
              },
              {
                num: "02",
                title: "Confirm",
                desc: "We arrange everything with our certified local partners—equipment, instructor, and delivery.",
                icon: "✓",
              },
              {
                num: "03",
                title: "Fly",
                desc: "A certified instructor arrives with everything. After a quick briefing, you're airborne.",
                icon: "🌊",
              },
            ].map((step, idx) => (
              <Row key={step.num} fillWidth gap="24" s={{ gap: "16" }}>
                {/* Left: number + connector line */}
                <Column horizontal="center" vertical="center" gap="0" style={{ minWidth: 48 }}>
                  <Flex
                    horizontal="center"
                    vertical="center"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      border: "2px solid var(--brand-solid-strong)",
                      flexShrink: 0,
                    }}
                  >
                    <Text variant="label-strong-m" onBackground="brand-strong">{step.num}</Text>
                  </Flex>
                  {idx < 2 && (
                    <Column
                      style={{
                        width: 2,
                        height: 48,
                        background: "var(--neutral-alpha-medium)",
                      }}
                    />
                  )}
                </Column>

                {/* Right: content */}
                <Column gap="4" paddingBottom="24" style={{ paddingTop: 8 }} s={{ paddingBottom: "20" }}>
                  <Heading as="h3" variant="heading-strong-l">
                    {step.title}
                  </Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {step.desc}
                  </Text>
                </Column>
              </Row>
            ))}
          </Column>
        </Column>
      </RevealFx>

      {/* Equipment Showcase */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Row fillWidth paddingRight="64" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              Premium Equipment
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Audi e-tron, Fliteboard & Lift — three world-class electric hydrofoils
            </Text>
          </Column>
          
          <Grid columns="2" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak" s={{ radius: "m" }}>
              <Media
                src="/images/gallery/performance_3 Background Removed.png"
                alt="Audi e-tron eFoil complete setup"
                aspectRatio="16 / 10"
              />
            </Column>
            <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak" s={{ radius: "m" }}>
              <Media
                src="/images/gallery/Performance_midnightblue_01 Background Removed.png"
                alt="Audi e-tron eFoil board top view"
                aspectRatio="16 / 10"
              />
            </Column>
          </Grid>
          
          <Row fillWidth horizontal="center" paddingTop="l" s={{ paddingTop: "m" }}>
            <Button
              href="/gallery"
              variant="secondary"
              size="m"
              arrowIcon
             
            >
              View Full Gallery
            </Button>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
        </Column>
      </RevealFx>

      {/* Delivery Locations */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              Delivered to You
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              eFoil delivery anywhere in the Maldives through our certified partners
            </Text>
          </Column>
          
          <Grid columns="3" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            <Column
              padding="24"
              gap="12"
              horizontal="center"
              background="neutral-alpha-weak"
              radius="l"
              s={{ padding: "20", gap: "8", radius: "m" }}
            >
              <Heading as="h3" variant="heading-strong-m" align="center">
                Luxury Yachts
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                eFoil delivery to yachts and superyachts throughout the atolls
              </Text>
            </Column>
            <Column
              padding="24"
              gap="12"
              horizontal="center"
              background="neutral-alpha-weak"
              radius="l"
              s={{ padding: "20", gap: "8", radius: "m" }}
            >
              <Heading as="h3" variant="heading-strong-m" align="center">
                Liveaboards & Boats
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Safari boats and private charters — our partners meet you on the water
              </Text>
            </Column>
            <Column
              padding="24"
              gap="12"
              horizontal="center"
              background="neutral-alpha-weak"
              radius="l"
              s={{ padding: "20", gap: "8", radius: "m" }}
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

      {/* Social Proof — E-E-A-T trust signals */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              What Our Guests Say
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              First-hand experiences from riders across the Maldives
            </Text>
          </Column>
          <Grid columns="3" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            {[
              {
                quote: "Absolutely incredible experience. The instructor was patient and professional, and I was flying within 15 minutes. The Maldives lagoons are the perfect setting for this.",
                name: "Marco R.",
                context: "Yacht charter guest, North Malé Atoll",
              },
              {
                quote: "We added eFoil sessions to our resort's activity programme and guest satisfaction scores went through the roof. Everything is handled for us — we just book the slots.",
                name: "Sarah K.",
                context: "Resort Activities Manager, Baa Atoll",
              },
              {
                quote: "I've eFoiled in Hawaii and the Mediterranean, but the Maldives is on another level. Crystal-clear water, no waves, and you can see reef sharks below while you fly. Unreal.",
                name: "James T.",
                context: "Experienced rider, Ari Atoll",
              },
            ].map((testimonial) => (
              <Column
                key={testimonial.name}
                padding="32"
                gap="16"
                background="neutral-alpha-weak"
                radius="l"
                s={{ padding: "24", gap: "12", radius: "m" }}
              >
                <Text variant="body-default-m" onBackground="neutral-weak" style={{ fontStyle: "italic" }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </Text>
                <Column gap="2">
                  <Text variant="label-strong-s">{testimonial.name}</Text>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {testimonial.context}
                  </Text>
                </Column>
              </Column>
            ))}
          </Grid>
        </Column>
      </RevealFx>

      {/* Services Section — Internal Links */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              Our Services
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Tailored eFoil experiences for every setting
            </Text>
          </Column>

          <Grid columns="3" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            <Column
              padding="32"
              gap="16"
              horizontal="center"
              background="neutral-alpha-weak"
              radius="l"
              s={{ padding: "24", gap: "12", radius: "m" }}
            >
              <Heading as="h3" variant="heading-strong-m" align="center">
                Yacht Delivery
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                eFoil delivered to your yacht or superyacht at anchor. Instructor, equipment, and safety gear included — arranged through our local partners.
              </Text>
              <Button href="/yachts" variant="secondary" size="s" arrowIcon>
                Yacht Service
              </Button>
            </Column>
            <Column
              padding="32"
              gap="16"
              horizontal="center"
              background="neutral-alpha-weak"
              radius="l"
              s={{ padding: "24", gap: "12", radius: "m" }}
            >
              <Heading as="h3" variant="heading-strong-m" align="center">
                Resort Partnership
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Add a premium water sport to your resort's activity menu. No capital investment, no maintenance — operations handled by certified partners.
              </Text>
              <Button href="/resorts" variant="secondary" size="s" arrowIcon>
                Resort Programme
              </Button>
            </Column>
            <Column
              padding="32"
              gap="16"
              horizontal="center"
              background="neutral-alpha-weak"
              radius="l"
              s={{ padding: "24", gap: "12", radius: "m" }}
            >
              <Heading as="h3" variant="heading-strong-m" align="center">
                Partner Network
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Join our network of certified eFoil operators. Equipment, training, and booking infrastructure provided.
              </Text>
              <Button href="/partners" variant="secondary" size="s" arrowIcon>
                Become a Partner
              </Button>
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
          s={{ padding: "32", gap: "20", radius: "l" }}
        >
          <Heading as="h2" variant="display-strong-m" align="center">
            Ready to Fly?
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            Enquire today and let us arrange an unforgettable eFoil experience in the Maldives
          </Text>
          <BottomCTA />
        </Column>
      </RevealFx>

      {/* Newsletter */}
      <Mailchimp />
    </Column>
  );
}
