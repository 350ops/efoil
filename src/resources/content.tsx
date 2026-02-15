import type { About, Blog, Crew, Events, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "eFoil",
  lastName: "Maldives",
  name: "eFoil Maldives",
  role: "Premium eFoil Rental Service",
  avatar: "/images/logofoil.png",
  email: "hello@efoil.rent",
  location: "Indian/Maldives", // IANA time zone identifier
  languages: ["English", "Dhivehi"], // Languages supported
};

const newsletter: Newsletter = {
  display: true,
  title: <>Get Exclusive eFoil Offers</>,
  description: <>Subscribe for special rates, new destinations, and eFoil tips for Maldives</>,
};

const social: Social = [
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/efoil.rent/",
    essential: true,
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    link: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9606783344"}`,
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/audi-efoil-maldives.jpg",
  label: "Home",
  // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
  title: `eFoil Rental Maldives | Connect with Premium eFoil Providers`,
  // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
  description: `Find and book premium Audi e-tron eFoil experiences in the Maldives. We connect you with trusted partners for delivery to your yacht, boat, or resort.`,
  headline: <>eFoil Rental Maldives</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Audi e-tron</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Premium eFoil Experience
        </Text>
      </Row>
    ),
    href: "/work/audi-etron-efoil-experience",
  },
  subline: (
    <>
    Top-rated <Text as="span" size="xl" weight="strong">Audi e-tron eFoil</Text> providers in the Maldives. <br />Seamless delivery to your yacht, boat, or resort for the duration of your stay.
    </> 
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: "About eFoil Maldives | Connecting You to Premium eFoil Experiences",
  description: "We are your concierge for eFoil rentals in the Maldives, connecting you with trusted partners who deliver Audi e-tron eFoils to your location.",
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: false,
  },
  calendar: {
    display: true,
    link: "https://cal.com/efoil-maldives",
  },
  intro: {
    display: true,
    title: "Your Concierge for Flying on Water",
    description: (
      <>
        eFoil Maldives connects you with the best eFoil providers in the archipelago. 
        We work with reliable partners to bring the revolutionary Audi e-tron eFoil experience 
        directly to your luxury yacht, liveaboard, or island resort. Our partners handle everything 
        from delivery to instruction, ensuring a seamless and unforgettable experience.
      </>
    ),
  },
  work: {
    display: true,
    title: "Why Book With Us",
    experiences: [
      {
        company: "Trusted Partners",
        timeframe: "Vetted Providers",
        role: "Reliable Network",
        achievements: [
          "We connect you only with established, high-quality eFoil operators.",
          "Our partners are selected for their reliability, equipment quality, and safety standards.",
        ],
        images: [],
      },
      {
        company: "Seamless Logistics",
        timeframe: "Delivery & Pickup",
        role: "Hassle-Free Service",
        achievements: [
          "Our partners deliver the eFoil directly to your location and pick it up when you're done.",
          "Perfect for yacht charters and resort stays where you want the freedom to ride on your schedule.",
        ],
        images: [],
      },
      {
        company: "Complete Package",
        timeframe: "Instruction Included",
        role: "Safe & Fun",
        achievements: [
          "Initial lessons with professional instructors are arranged to get you flying safely.",
          "Partners provide all necessary safety gear and briefings.",
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false,
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: true,
    title: "How It Works",
    skills: [
      {
        title: "Request Your Dates",
        description: (
          <>Let us know when and where you'll be staying. We coordinate availability with our partners.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "We Arrange Delivery",
        description: (
          <>Our partners deliver the eFoil to your yacht or resort, complete with setup and initial instruction.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Ride & Return",
        description: (
          <>Keep the board for your booking duration. When you're finished, our partners come to collect it.</>
        ),
        tags: [],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "eFoil Tips & Maldives Watersports Adventures",
  description: "Discover eFoil riding tips, wingfoil and kitesurf stories, watersports events, and adventures across the Maldives.",
};

const work: Work = {
  path: "/work",
  label: "Experience",
  title: "eFoil Packages & Experiences | eFoil Maldives",
  description: "Explore our eFoil rental packages, from hourly sessions to multi-day adventures in the Maldives.",
};

const events: Events = {
  path: "/events",
  label: "Events",
  title: "Maldives Watersports Events | Wingfoil, Kitesurf & Surf Competitions",
  description: "Explore the growing watersports scene in the Maldives. Upcoming wingfoil competitions, kitesurf events, surf contests, and why the Maldives is the next world-class watersports destination.",
};

const crew: Crew = {
  path: "/crew",
  label: "Crew Trips",
  title: "Airline Crew Day Trip Maldives | Dolphins, Snorkeling, Sandbank & Sunset",
  description: "The ultimate Maldives layover experience for airline crew. Swim with dolphins, snorkel pristine reefs, visit a private sandbank, and cruise into the sunset. From $80/person, groups up to 6.",
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "eFoil Gallery | Flying Above the Maldives",
  description: "See the Audi e-tron eFoil in action across the stunning waters of the Maldives. Premium electric hydrofoil experiences.",
  images: [
    {
      src: "/images/gallery/girlefoil.jpg",
      alt: "Woman flying on an eFoil at sunset over the Indian Ocean - Maldives eFoil experience",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/aeroloop.jpg",
      alt: "Audi e-tron Aeroloop eFoil board and hydrofoil - Brand new premium electric surfboard",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/efoil-action-turquoise.png",
      alt: "Rider flying on Audi e-tron eFoil above crystal clear turquoise Maldives water - Action shot",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/efoil-drone.png",
      alt: "Two riders eFoiling over turquoise Maldives lagoon - Aerial drone shot",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/efoilbeach.jpeg",
      alt: "eFoil board with hydrofoil on the beach at golden hour - Maldives sunset session",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/aeroloop2.jpeg",
      alt: "Audi e-tron Aeroloop eFoil board top view - Premium inflatable electric hydrofoil",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/efoiling.jpeg",
      alt: "Man riding Audi e-tron eFoil above the water holding wireless remote controller",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/maldives-turquoise-lagoon.png",
      alt: "Crystal clear turquoise lagoon in Maldives - Perfect watersports and eFoil conditions",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/sailboat.jpg",
      alt: "Luxury yacht in crystal-clear Maldives waters - eFoil delivery destination",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/remote.jpg",
      alt: "Audi e-tron eFoil wireless smart controller with speed display and battery indicator",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/dolphins-maldives.png",
      alt: "Wild spinner dolphins in Maldives - Marine life encounters during watersports sessions",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/efoil-turquoise-water.png",
      alt: "eFoil rider gliding above turquoise Maldives water - Electric hydrofoil adventure",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/maldives-aerial-island.png",
      alt: "Aerial view of a Maldivian island surrounded by turquoise lagoon - Watersports paradise",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/turtle-maldives.png",
      alt: "Sea turtle swimming over coral reef in Maldives - Snorkeling encounters",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Performance_midnightblue_01 Background Removed.png",
      alt: "Audi e-tron eFoil board top view - Premium electric hydrofoil rental Maldives",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/engine-white-background.jpg",
      alt: "Audi e-tron eFoil hydrofoil propulsion unit with integrated motor - Side view",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/efoil-white-background.jpeg",
      alt: "Audi e-tron eFoil hydrofoil wing and motor unit - Close-up detail shot",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/maldives-sunset-ocean.png",
      alt: "Golden sunset over the Indian Ocean in Maldives - Perfect ending to a watersports day",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/maldives-sandbank.png",
      alt: "Private white sandbank in the middle of the Indian Ocean - Maldives day trip destination",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/performance_3 Background Removed.png",
      alt: "Audi e-tron eFoil complete setup with hydrofoil - Flying above water Maldives",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Mast80 Background Removed.png",
      alt: "Audi e-tron eFoil mast and motor unit - High-performance electric hydrofoil",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Wing_Set_1350x400_75e8167e-01ee-4f38-845e-b14cd24573c6 Background Removed.png",
      alt: "Audi e-tron eFoil wing set - Premium carbon fiber hydrofoil wings",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Batterie01 Background Removed.png",
      alt: "Audi e-tron eFoil battery pack - Long-lasting power for extended sessions",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Controller01 Background Removed.png",
      alt: "Audi e-tron eFoil wireless controller - Intuitive speed control",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery, events, crew };
