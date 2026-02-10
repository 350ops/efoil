import { About, Blog, Crew, Events, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
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
  title: `eFoil Rental Maldives | Audi e-tron eFoil Delivery to Yachts & Resorts`,
  description: `Experience the thrill of flying above crystal-clear Maldives waters. Premium Audi e-tron eFoil rentals delivered directly to your yacht, boat, or resort. Book your unforgettable eFoil adventure today.`,
  headline: <>Maldives | eFoil Paradise</>,
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
  description: `Learn about the premier eFoil rental service in Maldives. We deliver Audi e-tron eFoils to yachts, boats, and resorts across the atolls.`,
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
        eFoil Maldives is the premier electric hydrofoil rental service in Maldives.
        We bring the revolutionary Audi e-tron eFoil experience directly to you—whether you're
        on a luxury yacht, liveaboard, or at an island resort. Our professional team handles
        everything from delivery to instruction, ensuring you have an unforgettable experience
        gliding above the pristine waters of the Indian Ocean.
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
          <>We deliver premium Audi e-tron eFoils directly to your yacht, liveaboard, or resort anywhere in Maldives.</>,
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
          <>Our team delivers the eFoil to your location—yacht, boat, or resort—anywhere in Maldives.</>
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
  title: "eFoil Tips & Maldives Watersports Adventures",
  description: `Discover eFoil riding tips, wingfoil and kitesurf stories, watersports events, and adventures across Maldives.`,
};

const work: Work = {
  path: "/work",
  label: "Experience",
  title: `eFoil Packages & Experiences | eFoil Maldives`,
  description: `Explore our eFoil rental packages, from hourly sessions to multi-day adventures in Maldives.`,
};

const events: Events = {
  path: "/events",
  label: "Events",
  title: "Maldives Watersports Events | Wingfoil, Kitesurf & Surf Competitions",
  description: `Explore the growing watersports scene in Maldives. Upcoming wingfoil competitions, kitesurf events, surf contests, and why Maldives is the next world-class watersports destination.`,
};

const crew: Crew = {
  path: "/crew",
  label: "Crew Trips",
  title: "Airline Crew Day Trip Maldives | Dolphins, Snorkeling, Sandbank & Sunset",
  description: `The ultimate Maldives layover experience for airline crew. Swim with dolphins, snorkel pristine reefs, visit a private sandbank, and cruise into the sunset. From $80/person, groups up to 6.`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `eFoil Gallery | Flying Above Maldives`,
  description: `See the Audi e-tron eFoil in action across stunning Maldives waters. Premium electric hydrofoil experiences.`,
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
