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
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes, gallery } from "@/resources";
import { Mailchimp } from "@/components";
import { HeroCTA, BottomCTA } from "@/components/HeroCTA";
import RentalDatePicker from "@/components/RentalDatePicker";
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
    " Connecting you with the official Audi e-tron eFoil distributor in the Maldives. Delivery to yachts, boats, and resorts with or without professional instruction.",
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
        contactType: "concierge",
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
    name: "eFoil Experience Packages",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Point to Point Delivery",
        description:
          "24-hour eFoil rental with delivery to your yacht, resort, or any location in the Maldives. Includes initial instruction and safety gear.",
        url: `${baseURL}/work`,
      },
      {
        "@type": "Offer",
        name: "Test Drive",
        description:
          "eFoil rentals and lessons available through our partner Foiltribe in Hulhumalé. Open to all ages.",
        url: `${baseURL}/work`,
      },
      {
        "@type": "Offer",
        name: "Determination Program",
        price: "0.00",
        priceCurrency: "USD",
        description:
          "First 3 eFoil experiences fully covered for people with any disability. Located in Hulhumalé.",
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
        text: "We connect you with trusted partners who bring the Audi e-tron eFoil directly to your yacht, liveaboard, or resort. They handle all transport, setup, and equipment handover.",
      },
    },
    {
      "@type": "Question",
      name: "Is eFoiling suitable for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All our partners provide professional instruction and safety briefings. The Audi e-tron eFoil is beginner-friendly, and most riders are up and flying within a short session.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum rental duration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our partners offer flexible packages starting from 2-hour sessions. You can also arrange to keep the eFoil for the duration of your stay (multiple days) for maximum freedom.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if the weather is bad on my booking day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safety is paramount. Our partners monitor weather conditions and will work with you to reschedule if conditions are unsafe for riding.",
      },
    },
    {
      "@type": "Question",
      name: "Is a safety briefing included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every rental includes a safety briefing and equipment overview from the provider. Life vests and helmets are standard safety gear provided.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book an eFoil rental?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply contact us via WhatsApp or email with your dates and location. We will coordinate with our partners to find the best package for you and handle the booking arrangements.",
      },
    },
    {
      "@type": "Question",
      name: "What eFoil equipment is used?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our partners exclusively use the Audi e-tron eFoil, known for its safety features, performance, and silence. We ensure you ride the best equipment available in the Maldives.",
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
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
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
            <Heading as="h1" wrap="balance" variant="display-strong-xl" align="center">
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

      {/* Rental Date Picker */}
      <RevealFx translateY="12" delay={0.5} fillWidth horizontal="center">
        <RentalDatePicker />
      </RevealFx>

      {/* SEO Content Section */}
      <Column fillWidth horizontal="center" gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
        <Column maxWidth="m" gap="m">
            <Text variant="body-default-l" onBackground="neutral-weak">
              Welcome to the premier eFoil rental service in the Maldives. We specialize in delivering the world's most advanced electric hydrofoil surfboards directly to your location — whether you're staying at a luxury resort, cruising on a liveaboard, or anchored in a private yacht.
            </Text>
            <Text variant="body-default-l" onBackground="neutral-weak">
              Our partner network spans the entire archipelago, ensuring that you can experience the thrill of flying over the Indian Ocean's crystal-clear waters no matter where you are. With professional instruction included in every session, you'll be gliding silently above the waves in no time.
            </Text>
        </Column>
      </Column>

      {/* SEO-Optimized Image Section */}
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Column fillWidth radius="l" overflow="hidden" border="neutral-alpha-weak" s={{ radius: "m" }}>
          <Media
            src="/images/gallery/resort_efoil_rental_maldives.jpeg"
            alt="Person riding an Audi e-tron eFoil above the turquoise waters of the Maldives"
            aspectRatio="16 / 9"
          />
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
            {/* Image Above Title */}
            <Column fillWidth radius="l" overflow="hidden" border="neutral-alpha-weak" s={{ radius: "m" }}>
              <Media
                src="/images/gallery/efoil-turquoise-water.png"
                alt="Person eFoiling above turquoise water"
                aspectRatio="16 / 9"
              />
            </Column>
            
            <Heading as="h3" variant="heading-strong-m" paddingTop="24" s={{ paddingTop: "16" }}>
              How an eFoil Works
            </Heading>
            
            {/* Image Below Title */}
             <Column fillWidth radius="l" overflow="hidden" s={{ radius: "m" }} paddingBottom="16" s={{ paddingBottom: "12" }}>
              <Media
                src="/images/gallery/performance_3 Background Removed.png"
                alt="Audi e-tron eFoil board breakdown"
                aspectRatio="16 / 9"
                style={{ objectFit: 'contain' }}
              />
            </Column>
            <Text variant="body-default-m" onBackground="neutral-weak">
              An eFoil consists of three main components: the board, an electric motor, and the hydrofoil (a mast with an underwater wing and propulsion unit). The board is built slightly larger and more stable than a standard surfboard to house the rechargeable battery and electronics. The battery is swappable, allowing for extended sessions on the water. The motor drives either a propeller or a modern jet unit mounted on the foil beneath the board.
            </Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Speed is controlled through a wireless handheld remote. Altitude — how high you fly above the water — is managed by shifting your body weight forward or back.
            </Text>
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
              Our Partners Come to You
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Network of providers delivering anywhere in the Maldives
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
                Our partners deliver to yachts and superyachts throughout the atolls
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
                Safari boats and private charters—delivered to your vessel
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
                Service available at luxury resorts and private islands
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

      {/* Partner Promo */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column
          fillWidth
          padding="32"
          gap="12"
          horizontal="center"
          background="brand-alpha-weak"
          radius="xl"
          s={{ padding: "24", gap: "8", radius: "l" }}
        >
          <Heading as="h2" variant="heading-strong-xl" align="center">
            Explore More of the Maldives
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            Looking for full-day excursions, snorkeling trips, and private charters?
          </Text>
          <Button href="https://maldivesdaytrips.com" variant="secondary" size="m" arrowIcon>
            Visit Maldives Day Trips
          </Button>
        </Column>
      </RevealFx>

      {/* Visible FAQ Section */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l" s={{ gap: "m", paddingY: "m" }}>
          <Column horizontal="center" gap="m" s={{ gap: "12" }}>
            <Heading as="h2" variant="display-strong-m" align="center">
              Frequently Asked Questions
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Common questions about eFoil rentals in Maldives
            </Text>
          </Column>
          
          <Grid columns="2" gap="24" fillWidth s={{ columns: 1, gap: "16" }}>
            {faqSchema.mainEntity.map((faq, index) => (
              <Column 
                key={index} 
                padding="24" 
                gap="12" 
                background="neutral-alpha-weak" 
                radius="l" 
                s={{ padding: "20", gap: "8", radius: "m" }}
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

      {/* Newsletter */}
      <Mailchimp />
    </Column>
  );
}
