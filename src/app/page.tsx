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
      title: "eFoil Maldives | Experience, Learn & Own",
      description:
        "Premium Audi e-tron eFoil experiences in the Maldives. Private sessions, personal instruction, and equipment access — delivered to your yacht, resort, or private location.",
      url: baseURL,
      siteName: "eFoil Maldives",
      images: [
        {
          url: `${baseURL}/images/audi-efoil-maldives.jpg`,
          width: 2400,
          height: 1260,
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
  name: "eFoil Experiences Maldives",
  description:
    "Premium Audi e-tron eFoil experiences in the Maldives. Private sessions, personal instruction, and equipment access — delivered to your yacht, resort, or private location.",
  provider: {
    "@type": "Organization",
    name: "eFoil Maldives",
    url: baseURL,
    logo: `${baseURL}/favicon.png`,
    email: "hello@efoil.rent",
    telephone: `+${whatsappNumber}`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+${whatsappNumber}`,
        contactType: "customer service",
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
        name: "Point to Point Delivery",
        description:
          "24-hour eFoil rental with delivery to your yacht, resort, or any location in the Maldives. Includes initial instruction and safety gear.",
        url: `${baseURL}/yachts`,
      },
      {
        "@type": "Offer",
        name: "Private eFoil Experiences",
        description:
          "Curated private eFoil experiences delivered anywhere in the Maldives. Half-day, sunset, and multi-day packages available.",
        url: `${baseURL}/efoil-experiences-maldives`,
      },
      {
        "@type": "Offer",
        name: "Learn to eFoil",
        description:
          "Private eFoil instruction in the Maldives. Discovery sessions, progression coaching, and advanced riding guidance on the Audi e-tron eFoil.",
        url: `${baseURL}/learn-efoil-maldives`,
      },
      {
        "@type": "Offer",
        name: "Own an Audi eFoil",
        description:
          "Acquire your own Audi e-tron eFoil in the Maldives. We facilitate access through our trusted partner network with local support and delivery.",
        url: `${baseURL}/audi-foil-board`,
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
      name: "How does eFoil delivery to yachts and private islands work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We bring the eFoil directly to your yacht, liveaboard, or private island. We handle all transport, setup, and equipment handover.",
      },
    },
    {
      "@type": "Question",
      name: "Is eFoiling suitable for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We provide professional instruction and safety briefings with every session. The Audi e-tron eFoil is beginner-friendly, and most riders are up and flying within a short session.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum rental duration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer flexible packages starting from half-day sessions. You can also arrange to keep the eFoil for the duration of your stay (multiple days) for maximum freedom.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if the weather is bad on my booking day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safety is paramount. We monitor weather conditions daily and will work with you to reschedule if conditions are unsafe for riding.",
      },
    },
    {
      "@type": "Question",
      name: "Is a safety briefing included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every session includes a safety briefing and equipment overview. Impact vests and helmets are standard safety gear provided with all experiences.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book an eFoil rental?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply contact us via WhatsApp or email with your dates and location. We will arrange the best package for you and handle all logistics.",
      },
    },
    {
      "@type": "Question",
      name: "What eFoil equipment is used?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We exclusively use the Audi e-tron eFoil, known for its safety features, performance, and silence — the best equipment available in the Maldives.",
      },
    },
  ],
};

export default function Home() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" paddingX="16" horizontal="center">
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
            <Heading as="h1" wrap="balance" variant="display-strong-xl" align="center">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.1} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l" align="center">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.2} horizontal="center" fillWidth>
            <HeroCTA />
          </RevealFx>
        </Column>

      </Column>

      {/* SEO Content Section */}
      <Column fillWidth horizontal="center" gap="l" paddingY="l">
        <Column maxWidth="m" gap="m">
            <Text variant="body-default-m" onBackground="neutral-weak">
              Premium eFoil experiences in the Maldives. Ride the Audi e-tron electric hydrofoil — the world&apos;s most advanced eFoil — delivered to your yacht, resort, or private location. Professional instruction included so you can glide effortlessly over crystal-clear waters.
            </Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Experience, learn, or own. From private sessions and personal instruction to acquiring your own Audi eFoil — we cover every aspect of eFoiling across Maldivian waters.
            </Text>
        </Column>
      </Column>

      {/* SEO-Optimized Image Section */}
      <RevealFx translateY="16" delay={0.4} fillWidth>
        <Column fillWidth radius="l" overflow="hidden" border="neutral-alpha-weak">
          <Media
            src="/images/gallery/resort_efoil_rental_maldives.jpeg"
            alt="Person riding an Audi e-tron eFoil above the turquoise waters of the Maldives"
            aspectRatio="16 / 9"
          />
        </Column>
      </RevealFx>

      {/* What is an eFoil? */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              What is an eFoil?
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center" style={{ maxWidth: 720 }}>
              An eFoil — short for electric hydrofoil surfboard — is a cutting-edge watersport device that's rapidly gaining popularity worldwide.
            </Text>
          </Column>
          <Column gap="m" style={{ maxWidth: 720, margin: "0 auto" }}>
            {/* Image Above Title */}
            <Column fillWidth radius="l" overflow="hidden" border="neutral-alpha-weak">
              <Media
                src="/images/gallery/efoil-turquoise-water.jpg"
                alt="Person eFoiling above turquoise water"
                aspectRatio="16 / 9"
              />
            </Column>
            
            <Heading as="h3" variant="heading-strong-m" paddingTop="24">
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



      {/* Equipment Showcase */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Row fillWidth paddingRight="64" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Top of the Line Equipment
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Ride the revolutionary Audi e-tron eFoil—engineered for performance and safety
            </Text>
          </Column>
          
          <Grid columns="2" gap="24" fillWidth>
            <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
              <Media
                src="/images/gallery/aeroloop.jpg"
                alt="Audi e-tron Aeroloop eFoil — brand new premium electric hydrofoil board"
                aspectRatio="16 / 10"
              />
            </Column>
            <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
              <Media
                src="/images/gallery/efoiling.jpeg"
                alt="Rider flying above the water on Audi e-tron eFoil in Maldives"
                aspectRatio="16 / 10"
              />
            </Column>
          </Grid>
          
          <Grid columns="3" gap="24" fillWidth>
            <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
              <Media
                src="/images/gallery/efoil-white-background.jpeg"
                alt="Audi e-tron eFoil hydrofoil wing and motor detail"
                aspectRatio="4 / 3"
              />
            </Column>
            <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
              <Media
                src="/images/gallery/engine-white-background.jpg"
                alt="Audi e-tron eFoil integrated propulsion unit — fully enclosed propeller"
                aspectRatio="4 / 3"
              />
            </Column>
            <Column overflow="hidden" radius="l" border="neutral-alpha-weak" background="neutral-alpha-weak">
              <Media
                src="/images/gallery/remote.jpg"
                alt="Audi e-tron eFoil smart wireless controller with speed and battery display"
                aspectRatio="4 / 3"
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
          <Row fillWidth paddingLeft="64" horizontal="end" s={{ hide: true }}>
            <Line maxWidth={48} />
          </Row>
        </Column>
      </RevealFx>

      {/* Delivery Locations */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Delivered Where You Are
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              We bring the eFoil to your yacht, resort, or private location
            </Text>
          </Column>
          
          <Grid columns="3" gap="24" fillWidth>
            <Column
              padding="24"
              gap="12"
              horizontal="center"
              background="neutral-alpha-weak"
              radius="l"
            >
              <Heading as="h3" variant="heading-strong-m" align="center">
                Superyachts
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
                Safari boats and private charters — delivered to your vessel
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
                Private Islands
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
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              From Our Blog
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Stories, tips, and adventures from Maldives waters
            </Text>
          </Column>
          <Posts range={[1, 3]} columns="3" thumbnail direction="column" />
          <Row fillWidth horizontal="center" paddingTop="m">
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
        >
          <Heading as="h2" variant="display-strong-m" align="center">
            Ready to Fly?
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" align="center">
            Experience, learn, or own — tell us what you&apos;re looking for
          </Text>
          <BottomCTA />
        </Column>
      </RevealFx>

      {/* Product Specs */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Grid columns="4" gap="24" fillWidth>
          {[
            {
              icon: (
                <svg height="40" viewBox="0 0 64 64" width="40" xmlns="http://www.w3.org/2000/svg" style={{ stroke: "var(--brand-on-background-strong)", strokeWidth: 2 }}>
                  <g style={{ fill: "none", strokeMiterlimit: 10, strokeLinejoin: "round", strokeLinecap: "round" }}>
                    <path d="m17 15h26c2.3 0 2.1 1.6 1.7 3.1s-3.7 14.9-3.7 14.9h10.1l4-2 3.9 2v8c0 1.3-.5 2-2 2h-8m-40 0h6.6m9.4 0h14.6" />
                    <path d="m43.6 23h5.4l6.1 8m-24.1-8h-22m18 8h-22" />
                    <path d="m24.8 44a6.9 6.9 0 0 1 -6.2 5c-2.7 0-4.2-2.2-3.4-5a6.9 6.9 0 0 1 6.2-5c2.6 0 4.2 2.2 3.4 5zm24 0a6.9 6.9 0 0 1 -6.2 5c-2.7 0-4.2-2.2-3.4-5a6.9 6.9 0 0 1 6.2-5c2.6 0 4.2 2.2 3.4 5z" />
                  </g>
                </svg>
              ),
              stat: "Up to 55 km/h",
              label: "Speed",
            },
            {
              icon: (
                <svg height="40" viewBox="0 0 64 64" width="40" xmlns="http://www.w3.org/2000/svg" style={{ stroke: "var(--brand-on-background-strong)", strokeWidth: 2 }}>
                  <g style={{ fill: "none", strokeLinecap: "round", strokeMiterlimit: 10, strokeLinejoin: "round" }}>
                    <path d="m54 6v10h-10m-12 43a27 27 0 1 1 21.751-43m-8.766 39.678a26.819 26.819 0 0 1 -6.985 2.653m15.751-10.331a27.159 27.159 0 0 1 -4.711 4.945m8.751-12.932a26.821 26.821 0 0 1 -1.58 3.952" />
                    <circle cx="32" cy="32" r="3" />
                    <path d="m33.961 34.261 10.039 7.739m-12-30v17" />
                  </g>
                </svg>
              ),
              stat: "Up to 2h Battery",
              label: "Range",
            },
            {
              icon: (
                <svg height="40" viewBox="0 0 64 64" width="40" xmlns="http://www.w3.org/2000/svg" style={{ stroke: "var(--brand-on-background-strong)", strokeWidth: 2 }}>
                  <g style={{ fill: "none", strokeMiterlimit: 10, strokeLinejoin: "round", strokeLinecap: "round" }}>
                    <path d="m6 2h52v22.064a41.973 41.973 0 0 1 -26.006 37.936 41.97 41.97 0 0 1 -25.994-37.936z" />
                    <path d="m22 27 9 9 15-16" />
                  </g>
                </svg>
              ),
              stat: "Smart Functions",
              label: "foil app",
            },
            {
              icon: (
                <svg height="40" viewBox="0 0 64 64" width="40" xmlns="http://www.w3.org/2000/svg" style={{ stroke: "var(--brand-on-background-strong)", strokeWidth: 2 }}>
                  <g style={{ strokeMiterlimit: 10, fill: "none", strokeLinejoin: "round", strokeLinecap: "round" }}>
                    <path d="m10 36.125v14.037l22 11.58 22-11.58v-14.037" />
                    <path d="m54 23.246 7-8.549-21.742-11.42-7.324 8.42z" />
                    <path d="m32 61.742v-27" />
                    <path d="m31.934 11.704-7.258-8.42-21.676 11.485 7 8.742z" />
                    <path d="m32 34.742-8.584 8.929-20.449-11.676 7.033-8.484zm22-11.496 7 8.742-20.324 11.743-8.676-8.989z" />
                  </g>
                </svg>
              ),
              stat: "Lightweight 32 kg",
              label: "Weight",
            },
          ].map((spec) => (
            <Column
              key={spec.label}
              fillWidth
              padding="24"
              gap="16"
              horizontal="center"
              background="neutral-alpha-weak"
              radius="l"
            >
              {spec.icon}
              <Column gap="4" horizontal="center">
                <Text variant="heading-strong-m" align="center" onBackground="neutral-strong">
                  {spec.stat}
                </Text>
                <Text variant="label-default-s" align="center" onBackground="neutral-weak">
                  {spec.label}
                </Text>
              </Column>
            </Column>
          ))}
        </Grid>
      </RevealFx>

      {/* 3 Ways to Experience eFoiling */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              3 Ways to Experience eFoiling
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Experience, learn, or own — choose what fits your journey
            </Text>
          </Column>
          <Grid columns="3" gap="24" fillWidth>
            <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l" horizontal="center">
              <Heading as="h3" variant="heading-strong-m" align="center">
                eFoil Experiences
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Private sessions delivered to your yacht, resort, or boat. Half-day, sunset, and multi-day packages with everything included.
              </Text>
              <Button href="/efoil-experiences-maldives" variant="secondary" size="m" arrowIcon>
                View Experiences
              </Button>
            </Column>
            <Column padding="32" gap="16" background="brand-alpha-weak" radius="l" border="brand-alpha-medium" horizontal="center">
              <Heading as="h3" variant="heading-strong-m" align="center">
                Learn to eFoil
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                From your first ride to advanced carving. Private instruction with expert guidance on the Audi e-tron eFoil.
              </Text>
              <Button href="/learn-efoil-maldives" variant="secondary" size="m" arrowIcon>
                Start Learning
              </Button>
            </Column>
            <Column padding="32" gap="16" background="neutral-alpha-weak" radius="l" horizontal="center">
              <Heading as="h3" variant="heading-strong-m" align="center">
                Own an eFoil
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Acquire your own Audi e-tron eFoil in the Maldives. We facilitate access through our trusted partner network.
              </Text>
              <Button href="/audi-foil-board" variant="secondary" size="m" arrowIcon>
                Explore Ownership
              </Button>
            </Column>
          </Grid>

          {/* Secondary links */}
          <Grid columns="2" gap="16" fillWidth>
            <Row padding="20" gap="12" vertical="center" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Text variant="body-default-s" onBackground="neutral-weak">
                Airline crew layover?
              </Text>
              <Button href="/crew" variant="tertiary" size="s" arrowIcon>
                Crew Day Trip
              </Button>
            </Row>
            <Row padding="20" gap="12" vertical="center" horizontal="center" background="neutral-alpha-weak" radius="l">
              <Text variant="body-default-s" onBackground="neutral-weak">
                Looking for rental details?
              </Text>
              <Button href="/efoil-rental-maldives" variant="tertiary" size="s" arrowIcon>
                Rental Information
              </Button>
            </Row>
          </Grid>
        </Column>
      </RevealFx>

      {/* Visible FAQ Section */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Column fillWidth gap="l" paddingY="l">
          <Column horizontal="center" gap="m">
            <Heading as="h2" variant="display-strong-m" align="center">
              Frequently Asked Questions
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Common questions about eFoiling in the Maldives
            </Text>
          </Column>
          
          <Grid columns="2" gap="24" fillWidth>
            {faqSchema.mainEntity.map((faq, index) => (
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

      {/* Newsletter */}
      <Mailchimp />
    </Column>
  );
}
