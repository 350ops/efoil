import type { About, Blog, Crew, EfoilExperiences, EfoilRental, Events, Gallery, Home, Learn, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "eFoil",
  lastName: "Maldives",
  name: "eFoil Maldives",
  role: "Premium eFoil Experiences",
  avatar: "/favicon.png",
  email: "hello@efoil.rent",
  location: "Indian/Maldives", // IANA time zone identifier
  languages: ["English", "Dhivehi"], // Languages supported
};

const newsletter: Newsletter = {
  display: true,
  title: <>Get first in line</>,
  description: <>Become part of the club, with exclusive tips and sneak peaks of our incoming products</>,
};

const social: Social = [
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/efoil.maldives/",
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
  title: `eFoil Maldives | Experience, Learn & Own`,
  // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
  description: `Premium Audi e-tron eFoil experiences in the Maldives. Private sessions, personal instruction, and equipment access — delivered to your yacht, resort, or private location.`,
  headline: <>eFoil Experiences in the Maldives</>,
  featured: {
    display: false,
    title: <>AUDI e-TRON eFOIL</>,
    href: "/audi-foil-board",
  },
  subline: (
    <>
      <Text as="span" onBackground="neutral-strong" weight="strong">The Pinnacle of Electric Hydrofoiling.</Text>
      <br />
      <Text as="span" variant="body-default-m" onBackground="neutral-weak">A collaboration between Audi and Aerofoils.</Text>
      <br />
      <Text as="span" variant="body-default-m" onBackground="neutral-medium">Delivered to your yacht, resort, or private location — anywhere in the Maldives.{" "}</Text>
      <Text as="span" weight="strong" style={{ color: "#dc2626" }}>And fast.</Text>
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: "About eFoil Maldives | Experience, Learn & Own",
  description: "Premium eFoil experiences, personal instruction, and Audi e-tron equipment access across the Maldives.",
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
    title: "The eFoil Experience in the Maldives",
    description: (
      <>
        eFoil Maldives delivers premium Audi e-tron eFoil experiences across the archipelago.
        We bring the board, the instruction, and the logistics directly to your yacht, liveaboard,
        or island resort. Whether you want to ride, learn, or own — we handle everything
        for a seamless and unforgettable experience on the water.
      </>
    ),
  },
  work: {
    display: true,
    title: "Why Book With Us",
    experiences: [
      {
        company: "Premium Equipment",
        timeframe: "Audi e-tron eFoil",
        role: "The Best on the Water",
        achievements: [
          "We exclusively use the Audi e-tron eFoil — the most advanced electric hydrofoil available.",
          "Silent propulsion, enclosed motor, wireless control, and the safest design in the industry.",
        ],
        images: [],
      },
      {
        company: "Seamless Logistics",
        timeframe: "Delivery & Pickup",
        role: "Hassle-Free Service",
        achievements: [
          "We deliver the eFoil directly to your location and collect it when you're done.",
          "Perfect for yacht charters and resort stays where you want the freedom to ride on your schedule.",
        ],
        images: [],
      },
      {
        company: "Expert Instruction",
        timeframe: "Every Session",
        role: "Learn at Any Level",
        achievements: [
          "Professional instruction included with every experience — from first ride to advanced coaching.",
          "All safety gear, briefings, and equipment setup handled by our team.",
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
          <>Let us know when and where you'll be staying. We check availability and confirm your session.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "We Deliver to You",
        description: (
          <>We bring the eFoil to your yacht, resort, or private location — complete with setup and instruction.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Ride & Return",
        description: (
          <>Keep the board for your booking duration. When you're finished, we come to collect it.</>
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
  path: "/efoil-experiences-maldives",
  label: "Experiences",
  title: "Private eFoil Experiences Maldives | Yacht & Boat Delivery",
  description: "Private eFoil experiences delivered to yachts, boats, and resorts across the Maldives.",
};

const events: Events = {
  path: "/events",
  label: "Events",
  title: "Maldives Watersports Events | Wingfoil, Kitesurf & Surf Competitions",
  description: "Explore the growing watersports scene in the Maldives. Upcoming wingfoil competitions, kitesurf events, surf contests, and why the Maldives is the next world-class watersports destination.",
};

const efoilExperiences: EfoilExperiences = {
  path: "/efoil-experiences-maldives",
  label: "Experiences",
  title: "Private eFoil Experiences Maldives | Yacht & Boat Delivery",
  description: "Curated private eFoil experiences across the Maldives. Audi e-tron electric hydrofoil delivered to your yacht, resort, or private location with professional instruction included.",
};

const efoilRental: EfoilRental = {
  path: "/efoil-rental-maldives",
  label: "Rental",
  title: "eFoil Rental Maldives | Private Sessions & Yacht Delivery",
  description: "Rent an Audi e-tron eFoil in the Maldives. Electric hydrofoil board rental with professional instruction, delivered to yachts, resorts, and private locations across the atolls.",
};

const crew: Crew = {
  path: "/crew",
  label: "Crew Trips",
  title: "Airline Crew Day Trip Maldives | Dolphins, Snorkeling, Sandbank & Sunset",
  description: "The ultimate Maldives layover experience for airline crew. Swim with dolphins, snorkel pristine reefs, visit a private sandbank, and cruise into the sunset. Groups up to 6.",
};

const learn: Learn = {
  path: "/learn-efoil-maldives",
  label: "Learn",
  title: "Learn to eFoil in the Maldives | Discovery, Progression & Advanced Coaching",
  description: "Learn to ride an electric hydrofoil in the Maldives. Private eFoil instruction from discovery sessions to advanced coaching. Audi e-tron eFoil with expert guidance.",
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
      src: "/images/gallery/efoil-action-turquoise.jpg",
      alt: "Rider flying on Audi e-tron eFoil above crystal clear turquoise Maldives water - Action shot",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/efoil-drone.jpg",
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
      src: "/images/gallery/maldives-turquoise-lagoon.jpg",
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
      src: "/images/gallery/dolphins-maldives.jpg",
      alt: "Wild spinner dolphins in Maldives - Marine life encounters during watersports sessions",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/efoil-turquoise-water.jpg",
      alt: "eFoil rider gliding above turquoise Maldives water - Electric hydrofoil adventure",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/maldives-aerial-island.jpg",
      alt: "Aerial view of a Maldivian island surrounded by turquoise lagoon - Watersports paradise",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/turtle-maldives.jpg",
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
      src: "/images/gallery/maldives-sunset-ocean.jpg",
      alt: "Golden sunset over the Indian Ocean in Maldives - Perfect ending to a watersports day",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/maldives-sandbank.jpg",
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

export { person, social, newsletter, home, about, blog, work, gallery, events, efoilExperiences, efoilRental, crew, learn };
