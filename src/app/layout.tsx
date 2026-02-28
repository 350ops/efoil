import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";

import {
  Column,
  Flex,
  Meta,
} from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers, MobileInstagramButton } from "@/components";
import { baseURL, fonts, style, dataStyle, home } from "@/resources";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${baseURL}/#organization`,
  name: "eFoil Maldives",
  url: baseURL,
  logo: {
    "@type": "ImageObject",
    url: `${baseURL}/favicon-512x512.png`,
    width: 512,
    height: 512,
  },
  image: {
    "@type": "ImageObject",
    url: `${baseURL}/images/audi-efoil-maldives.jpg`,
    width: 2400,
    height: 1260,
    caption: "Audi e-tron eFoil rental in Maldives lagoon",
  },
  email: "hello@efoil.rent",
  description:
    "Premium eFoil rental service in Maldives. Audi e-tron electric hydrofoil surfboard delivery to yachts, boats, and resorts.",
  sameAs: ["https://www.instagram.com/efoil.maldives/"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "reservations",
    availableLanguage: ["English", "Dhivehi"],
    email: "hello@efoil.rent",
  },
  areaServed: {
    "@type": "Country",
    name: "Maldives",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseURL}/#website`,
  name: "eFoil Maldives",
  url: baseURL,
  publisher: { "@id": `${baseURL}/#organization` },
  description:
    "Premium Audi e-tron eFoil rentals delivered to yachts, boats, and resorts across Maldives.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${baseURL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "@id": `${baseURL}/#navigation`,
  name: "Main Navigation",
  hasPart: [
    {
      "@type": "SiteNavigationElement",
      name: "eFoil Experiences",
      description: "Private eFoil sessions delivered to yachts, resorts, and boats across the Maldives.",
      url: `${baseURL}/efoil-experiences-maldives`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Learn to eFoil",
      description: "Private instruction from discovery to advanced coaching on the Audi e-tron eFoil.",
      url: `${baseURL}/learn-efoil-maldives`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Yacht Delivery",
      description: "Audi e-tron eFoil delivered directly to superyachts, charter yachts, and liveaboards.",
      url: `${baseURL}/yachts`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Resorts",
      description: "eFoil guest activity partnerships for luxury Maldives resorts.",
      url: `${baseURL}/resorts`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Audi e-tron eFoil",
      description: "Explore or acquire the Audi e-tron electric hydrofoil — the world's most advanced eFoil.",
      url: `${baseURL}/audi-foil-board`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Blog",
      description: "eFoil tips, watersports stories, and adventures across the Maldives.",
      url: `${baseURL}/blog`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Events",
      description: "Wingfoil competitions, kitesurf events, and surf contests | Maldives.",
      url: `${baseURL}/events`,
    },
  ],
};

export async function generateMetadata() {
  return {
    metadataBase: new URL(baseURL),
    alternates: {
      canonical: "/",
    },
    ...Meta.generate({
      title: home.title,
      description: home.description,
      baseURL: baseURL,
      path: home.path,
      image: home.image,
    }),
    applicationName: "eFoil Maldives",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
        { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon-256x256.png", sizes: "256x256", type: "image/png" },
        { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        {
          rel: "mask-icon",
          url: "/favicon.png",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      siteName: "eFoil Maldives",
      type: "website",
      title: "eFoil Experiences Maldives",
      description:
        "Premium Audi e-tron eFoil experiences  Maldives. Delivered to yachts, boats, and resorts.",
      url: baseURL,
      images: [
        {
          url: `${baseURL}/images/audi-efoil-maldives.jpg`,
          width: 2400,
          height: 1260,
          alt: "Audi e-tron eFoil experience in Maldives lagoon",
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "eFoil Experiences Maldives",
      description:
        "Premium Audi e-tron eFoil experiences Maldives. Delivered to yachts, boats, and resorts.",
      images: [`${baseURL}/images/audi-efoil-maldives.jpg`],
    },
    other: {
      "msapplication-TileColor": "#ffffff",
      "msapplication-TileImage": "/mstile-150x150.png",
      "msapplication-config": "/browserconfig.xml",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <meta name="facebook-domain-verification" content="jv9z5pm26izm62fh7i6m4jy6rh5f3h" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationSchema),
          }}
        />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;

                  // Set defaults from config
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    "solid-style": style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    "viz-style": dataStyle.variant,
                  })};

                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });

                  // Force light theme only — ignore localStorage and system preference
                  root.setAttribute('data-theme', 'light');
                  localStorage.removeItem('data-theme');
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <Providers>
        <Column
          as="body"
          background="page"
          fillWidth
          style={{ minHeight: "100vh" }}
          margin="0"
          padding="0"
          horizontal="center"
        >
          <Header />
          <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <MobileInstagramButton />
          <Footer />
          <Analytics />
          <SpeedInsights />
        </Column>
      </Providers>
    </Flex>
  );
}
