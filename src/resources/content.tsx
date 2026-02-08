import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "eFoil",
  lastName: "Maldives",
  name: `eFoil Maldives`,
  role: "eFoil Experiences — Arranged by Certified Local Partners",
  avatar: "/images/logofoil.png",
  email: "hello@efoil.rent",
  location: "Indian/Maldives", // IANA time zone identifier
  languages: ["English", "Dhivehi"], // Languages supported
};

// Team identity for E-E-A-T signals
const founder = {
  name: "eFoil Maldives",
  role: "Water Sport Marketing & Operations — International Agency",
  bio: "We are an international agency specialising in water sport experiences. Our certified local partners in the Maldives operate a fleet of premium eFoils and handle all on-water logistics, instruction, and safety. We take care of the rest — from marketing and booking coordination to ensuring every session exceeds expectations.",
  credentials: [
    "International water sport marketing agency",
    "Certified local partners with licensed operations",
    "Fleet includes Audi e-tron, Fliteboard & Lift eFoils",
    "Insurance-backed commercial operations",
  ],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Get Exclusive eFoil Offers</>,
  description: <>Subscribe for special rates, new destinations, and eFoil tips for the Maldives</>,
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
  image: "/images/og/home.jpg",
  label: "Home",
  title: `eFoil Rental Maldives | Premium eFoil Experiences Delivered to Yachts & Resorts`,
  description: `Experience the thrill of flying above the crystal-clear waters of the Maldives. Premium eFoil experiences — Audi e-tron, Fliteboard & Lift — arranged through certified local partners and delivered to your yacht, boat, or resort.`,
  headline: <>Fly Above the Maldives</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Audi · Flite · Lift</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Premium eFoil Fleet
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      Premium <Text as="span" size="xl" weight="strong">eFoil experiences</Text> — Audi e-tron, Fliteboard & Lift — delivered to your yacht, boat, or resort by our certified local partners. <br />Enquire for availability and personalised rates.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About eFoil Maldives | Premium Electric Hydrofoil Experiences`,
  description: `eFoil Maldives connects you with certified local operators for premium electric hydrofoil experiences across the atolls. Audi e-tron, Fliteboard, and Lift eFoils delivered to yachts, boats, and resorts.`,
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
    title: "Your Gateway to Flying on Water",
    description: (
      <>
        <Text variant="body-default-l">
          eFoil Maldives is your gateway to premium electric hydrofoil experiences in the Maldives.
          We work with certified local partners who operate a fleet of Audi e-tron, Fliteboard, and
          Lift eFoils — delivered directly to your yacht, liveaboard, or island resort.
        </Text>
        <Text variant="body-default-l">
          As an international water sport agency, we handle marketing, booking coordination, and
          client communication. Our partners on the ground bring deep local knowledge of the atolls,
          professional instruction, and all the on-water logistics. Together, we ensure every session
          is safe, personalised, and unforgettable.
        </Text>
        <Text variant="body-default-l">
          You tell us what you need. We arrange everything. You just show up and fly.
        </Text>
      </>
    ),
  },
  work: {
    display: true,
    title: "Why Choose Us",
    experiences: [
      {
        company: "Delivered to You",
        timeframe: "Anywhere in the Maldives",
        role: "Yacht, Boat & Resort Service",
        achievements: [
          <>Our certified local partners deliver premium eFoils directly to your yacht, liveaboard, or resort anywhere in the Maldives.</>,
          <>Professional setup, safety briefing, and instruction included with every session.</>,
        ],
        images: [],
      },
      {
        company: "Premium Fleet",
        timeframe: "Audi · Fliteboard · Lift",
        role: "World-Class Equipment",
        achievements: [
          <>Ride the Audi e-tron, Fliteboard, or Lift eFoil — three of the world's finest electric hydrofoils, each engineered for performance and safety.</>,
          <>All equipment is professionally maintained and inspected between sessions.</>,
        ],
        images: [],
      },
      {
        company: "Expert Instruction",
        timeframe: "Beginners Welcome",
        role: "Certified Local Instructors",
        achievements: [
          <>Certified instructors will have you flying in no time, regardless of your experience level.</>,
          <>Personalised sessions tailored to your skill level and goals.</>,
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
    title: "The Experience",
    skills: [
      {
        title: "Tell Us What You Need",
        description: (
          <>Share your location, dates, group size, and any preferences. We will recommend the best option for you.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "We Arrange Everything",
        description: (
          <>Our local partners handle delivery, equipment, and instruction — arriving at your yacht, boat, or resort on schedule.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Fly Above Paradise",
        description: (
          <>Experience the thrill of gliding above crystal-clear waters with stunning reef and marine life below.</>
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
  title: "eFoil Blog | Tips, Guides & Maldives Water Sport Adventures",
  description: `Expert eFoil guides, safety tips, rental advice, and the best water sport experiences in the Maldives. Everything you need to know about electric hydrofoil riding.`,
};

const work: Work = {
  path: "/work",
  label: "Experience",
  title: `eFoil Experiences & Packages | eFoil Maldives`,
  description: `Explore eFoil experience options in the Maldives. Audi e-tron, Fliteboard, and Lift eFoils delivered to your yacht, boat, or resort. Enquire for personalised rates.`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `eFoil Gallery | Flying Above the Maldives`,
  description: `See premium eFoils in action across the stunning waters of the Maldives. Audi e-tron, Fliteboard & Lift electric hydrofoil experiences.`,
  images: [
    {
      src: "/images/gallery/sailboat.jpg",
      alt: "Luxury yacht in the crystal-clear waters of the Maldives - eFoil delivery destination",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Performance_midnightblue_01 Background Removed.png",
      alt: "Audi e-tron eFoil board top view - Premium electric hydrofoil Maldives",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/performance_3 Background Removed.png",
      alt: "Audi e-tron eFoil complete setup with hydrofoil - Flying above water Maldives",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/performance_2 Background Removed.png",
      alt: "Audi e-tron eFoil side view showing hydrofoil wings - Electric surfboard Maldives",
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

export { person, founder, social, newsletter, home, about, blog, work, gallery };
