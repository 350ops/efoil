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
import { Posts } from "@/components/blog/Posts";

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
    openGraph: {
      type: "website",
      title: "eFoil Rentals Maldives",
      description:
        "Premium Audi e-tron eFoil rentals in Maldives. Delivered to yachts, boats, and resorts.",
      url: baseURL,
      siteName: "eFoil Maldives",
      images: [
        {
          url: `${baseURL}/images/audi-efoil-maldives.jpg`,
          width: 2188,
          height: 1722,
          alt: "Audi e-tron eFoil rental in Maldives lagoon",
        },
      ],
    },
  };
}

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9606783344";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "eFoil Rental Maldives",
  description:
    "Premium Audi e-tron eFoil rental service with delivery to yachts, boats, and resorts across Maldives. Includes professional instruction and all safety equipment.",
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
  image: `${baseURL}/images/audi-efoil-maldives.jpg`,
  serviceType: "eFoil rental",
  areaServed: {
    "@type": "Country",
    name: "Maldives",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "eFoil Rental Packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Hourly Session (2hr minimum)",
        price: "500.00",
        priceCurrency: "USD",
        description:
          "2-hour minimum eFoil rental with professional instruction and all safety gear.",
        url: `${baseURL}/work`,
      },
      {
        "@type": "Offer",
        name: "Half-Day Adventure",
        price: "800.00",
        priceCurrency: "USD",
        description:
          "4 hours of eFoil riding with extended instruction, multiple sessions, and photo opportunities.",
        url: `${baseURL}/work`,
      },
      {
        "@type": "Offer",
        name: "Full-Day Experience",
        price: "1400.00",
        priceCurrency: "USD",
        description:
          "8 hours with the eFoil. Ideal for groups or exploring multiple spots around your location.",
        url: `${baseURL}/work`,
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an eFoil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An eFoil — short for electric hydrofoil surfboard — is a cutting-edge watersport device. It merges traditional hydrofoil surfing with advanced electric propulsion, allowing riders to glide silently above the water. An eFoil consists of a board with a rechargeable battery, an electric motor, and a hydrofoil (mast with underwater wing). Speed is controlled via a wireless handheld remote, while altitude is managed by shifting body weight.",
      },
    },
    {
      "@type": "Question",
      name: "How does eFoil delivery to yachts and resorts work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our team brings the Audi e-tron eFoil directly to your yacht, liveaboard, or resort anywhere in Maldives. We handle all transport, setup, and equipment. Just tell us your location and preferred time when you book.",
      },
    },
    {
      "@type": "Question",
      name: "Is eFoiling suitable for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every rental includes a professional instruction session and safety briefing tailored to your experience level. Most beginners are up and riding within 15–20 minutes. The Audi e-tron eFoil has intuitive speed control via a wireless handheld remote, making it accessible for first-timers.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum rental duration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The minimum booking is a 2-hour session at $250 per hour ($500 total). We also offer half-day (4 hours, $800) and full-day (8 hours, $1,400) packages for a more immersive experience.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if the weather is bad on my booking day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safety is our priority. If conditions are unsuitable for riding, we will work with you to reschedule at no extra cost. Our team monitors weather and sea conditions and will contact you in advance if adjustments are needed.",
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
      name: "How do I book an eFoil rental?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book directly on our website using secure Stripe checkout, or contact us via WhatsApp or email. Choose your preferred package, select a date, and we handle the rest—from delivery to instruction.",
      },
    },
    {
      "@type": "Question",
      name: "What eFoil equipment do you use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use the Audi e-tron eFoil, a premium electric hydrofoil board engineered for performance and safety. It features a carbon fiber construction, silent electric motor, and a wireless hand controller for precise speed management. All equipment is professionally maintained between sessions.",
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
        image="/images/audi-efoil-maldives.jpg"
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

      {/* Featured Hero Image — optimised for Google image search */}
      <RevealFx translateY="12" delay={0.5} fillWidth>
        <Column as="figure" fillWidth gap="8" horizontal="center" style={{ margin: 0 }}>
          <Column fillWidth radius="l" overflow="hidden" border="neutral-alpha-weak" s={{ radius: "m" }}>
            <Media
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              src="/images/audi-efoil-maldives.jpg"
              alt="Audi e-tron eFoil rental in Maldives lagoon"
              aspectRatio="16 / 9"
            />
          </Column>
          <Text
            as="figcaption"
            variant="body-default-xs"
            onBackground="neutral-weak"
            align="center"
          >
            Riding the Audi e-tron eFoil above crystal-clear Maldives waters
          </Text>
        </Column>
      </RevealFx>

      {/* Video Section */}
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Column fillWidth radius="l" overflow="hidden" border="neutral-alpha-weak" s={{ radius: "m" }}>
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
            }}
          >
            <source src="/images/gallery/gliding.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Column>
      </RevealFx>

      {/* What is an eFoil? */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              What is an eFoil?
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center" style={{ maxWidth: 720 }}>
              An eFoil — short for electric hydrofoil surfboard — is a cutting-edge watersport device that's rapidly gaining popularity worldwide.
            </Text>
          </Column>
          <Column gap="m" style={{ maxWidth: 720, margin: "0 auto" }} s={{ gap: "12" }}>
            <Text variant="body-default-m" onBackground="neutral-weak">
              It merges the principles of traditional hydrofoil surfing, where a board is fitted with a submerged hydrodynamic wing (foil), with advanced electric propulsion. The result: a completely unique sensation of gliding silently above the water's surface.
            </Text>
            <Heading as="h3" variant="heading-strong-m">
              How an eFoil Works
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              An eFoil consists of three main components: the board, an electric motor, and the hydrofoil (a mast with an underwater wing and propulsion unit). The board is built slightly larger and more stable than a standard surfboard to house the rechargeable battery and electronics. The battery is swappable, allowing for extended sessions on the water. The motor drives either a propeller or a modern jet unit mounted on the foil beneath the board.
            </Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Speed is controlled through a wireless handheld remote. Altitude — how high you fly above the water — is managed by shifting your body weight forward or back.
            </Text>
          </Column>
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
              Three steps to flying above Maldives waters
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
                title: "Book",
                desc: "Pay securely online. We confirm and handle all delivery logistics.",
                icon: "✓",
              },
              {
                num: "03",
                title: "Fly",
                desc: "Our instructor arrives with everything. After a quick briefing, you're airborne.",
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
              Ride the revolutionary Audi e-tron eFoil—engineered for performance and safety
            </Text>
          </Column>
          
          <Grid columns="2" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak" s={{ radius: "m" }}>
              <Media
                src="/images/gallery/aeroloop.jpg"
                alt="Audi e-tron Aeroloop eFoil — brand new premium electric hydrofoil board"
                aspectRatio="16 / 10"
              />
            </Column>
            <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak" s={{ radius: "m" }}>
              <Media
                src="/images/gallery/efoiling.jpeg"
                alt="Rider flying above the water on Audi e-tron eFoil in Maldives"
                aspectRatio="16 / 10"
              />
            </Column>
          </Grid>
          
          <Grid columns="3" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            <Column overflow="hidden" radius="l" style={{ background: "#fff" }} s={{ radius: "m" }}>
              <Media
                src="/images/gallery/efoil-white-background.jpeg"
                alt="Audi e-tron eFoil hydrofoil wing and motor detail"
                aspectRatio="4 / 3"
              />
            </Column>
            <Column overflow="hidden" radius="l" style={{ background: "#fff" }} s={{ radius: "m" }}>
              <Media
                src="/images/gallery/engine-white-background.jpg"
                alt="Audi e-tron eFoil integrated propulsion unit — fully enclosed propeller"
                aspectRatio="4 / 3"
              />
            </Column>
            <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak" s={{ radius: "m" }}>
              <Media
                src="/images/gallery/remote.jpg"
                alt="Audi e-tron eFoil smart wireless controller with speed and battery display"
                aspectRatio="4 / 3"
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
              We Come to You
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Direct delivery anywhere in Maldives
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
                We deliver to yachts and superyachts throughout the atolls
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
                Safari boats and private charters—we'll meet you on the water
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
                From luxury resorts to private islands across Maldives
              </Text>
            </Column>
          </Grid>
        </Column>
      </RevealFx>

      {/* From Our Blog */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              From Our Blog
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Stories, tips, and adventures from Maldives waters
            </Text>
          </Column>
          <Posts range={[1, 3]} columns="3" thumbnail direction="column" />
          <Row fillWidth horizontal="center" paddingTop="m" s={{ paddingTop: "12" }}>
            <Button href="/blog" variant="secondary" size="m" arrowIcon>
              Read All Posts
            </Button>
          </Row>
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
            Book your eFoil experience today and create unforgettable memories in Maldives
          </Text>
          <BottomCTA />
        </Column>
      </RevealFx>

      {/* Airline Crew Banner */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column
          fillWidth
          padding="32"
          gap="12"
          horizontal="center"
          background="neutral-alpha-weak"
          radius="xl"
          s={{ padding: "24", gap: "8", radius: "l" }}
        >
          <Text variant="heading-default-l" align="center" onBackground="neutral-strong">
            Are you airline crew?
          </Text>
          <Button href="/crew" variant="tertiary" size="m" arrowIcon>
            Tap here
          </Button>
        </Column>
      </RevealFx>

      {/* Newsletter */}
      <Mailchimp />
    </Column>
  );
}
