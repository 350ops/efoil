import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "eFoil",
  lastName: "Maldives",
  name: `eFoil Maldives`,
  role: "Premium eFoil Rental Service",
  avatar: "/images/logofoil.png",
  email: "hello@efoil.rent",
  location: "Indian/Maldives", // IANA time zone identifier
  languages: ["English", "Dhivehi"], // Languages supported
};

// Founder / team identity for E-E-A-T signals
const founder = {
  name: "eFoil Maldives Team",
  role: "Certified eFoil Instructors & Water Sport Professionals",
  bio: "Our team of certified water sport professionals has been operating in the Maldives for over a decade. We combine deep local knowledge of the atolls with hands-on eFoil expertise to deliver the safest, most memorable experiences on the water.",
  credentials: [
    "Certified eFoil instructors",
    "Water safety and first aid trained",
    "10+ years of Maldives water sport operations",
    "Insurance-backed commercial operators",
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
  title: `eFoil Rental Maldives | Audi e-tron eFoil Delivery to Yachts & Resorts`,
  description: `Experience the thrill of flying above the crystal-clear waters of the Maldives. Premium Audi e-tron eFoil rentals delivered directly to your yacht, boat, or resort. Book your unforgettable eFoil adventure today.`,
  headline: <>Fly Above the Maldives</>,
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
      Premium <Text as="span" size="xl" weight="strong">Audi e-tron eFoil</Text> rentals delivered directly to your yacht, boat, or resort. <br />Experience the ultimate water adventure in paradise.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About eFoil Maldives | Premium Electric Hydrofoil Rentals`,
  description: `Learn about the premier eFoil rental service in the Maldives. We deliver Audi e-tron eFoils to yachts, boats, and resorts across the atolls.`,
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
          eFoil Maldives is the premier electric hydrofoil rental service in the Maldives.
          We bring the revolutionary Audi e-tron eFoil experience directly to you — whether
          you&apos;re on a luxury yacht, liveaboard, or at an island resort.
        </Text>
        <Text variant="body-default-l">
          Our team has spent over a decade working across the Maldivian atolls — we know the
          currents, the lagoons, the wind patterns, and the best spots to ride in every season.
          That local expertise, combined with professional eFoil instruction and certified
          safety protocols, means every session is safe, personalised, and unforgettable.
        </Text>
        <Text variant="body-default-l">
          We handle everything from delivery to instruction. You just show up and fly.
        </Text>
      </>
    ),
  },
  work: {
    display: true,
    title: "Why Choose Us",
    experiences: [
      {
        company: "Direct Delivery",
        timeframe: "To Your Location",
        role: "Yacht, Boat & Resort Service",
        achievements: [
          <>We deliver premium Audi e-tron eFoils directly to your yacht, liveaboard, or resort anywhere in the Maldives.</>,
          <>Professional setup and safety briefing included with every rental.</>,
        ],
        images: [],
      },
      {
        company: "Premium Equipment",
        timeframe: "Audi e-tron eFoil",
        role: "World-Class Technology",
        achievements: [
          <>Experience the cutting-edge Audi e-tron eFoil—engineered for performance, safety, and an unmatched riding experience.</>,
          <>All equipment is meticulously maintained and sanitized between each use.</>,
        ],
        images: [],
      },
      {
        company: "Expert Instruction",
        timeframe: "Beginners Welcome",
        role: "Professional Guidance",
        achievements: [
          <>Our certified instructors will have you flying in no time, regardless of your experience level.</>,
          <>Personalized sessions tailored to your skill level and goals.</>,
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
        title: "Choose Your Package",
        description: (
          <>Select from hourly rentals, half-day adventures, or full-day experiences. Group packages available.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "We Come to You",
        description: (
          <>Our team delivers the eFoil to your location—yacht, boat, or resort—anywhere in the Maldives.</>
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
  title: `eFoil Packages & Experiences | eFoil Maldives`,
  description: `Explore our eFoil rental packages, from hourly sessions to multi-day adventures in the Maldives.`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `eFoil Gallery | Flying Above the Maldives`,
  description: `See the Audi e-tron eFoil in action across the stunning waters of the Maldives. Premium electric hydrofoil experiences.`,
  images: [
    {
      src: "/images/gallery/sailboat.jpg",
      alt: "Luxury yacht in the crystal-clear waters of the Maldives - eFoil delivery destination",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Performance_midnightblue_01 Background Removed.png",
      alt: "Audi e-tron eFoil board top view - Premium electric hydrofoil rental Maldives",
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
