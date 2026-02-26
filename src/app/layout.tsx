import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";

import type { opacity, SpacingToken } from "@once-ui-system/core";
import {
  Background,
  Column,
  Flex,
  Meta,
  RevealFx,
} from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers, MobileWhatsAppButton } from "@/components";
import { baseURL, effects, fonts, style, dataStyle, home } from "@/resources";
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
    width: 2188,
    height: 1722,
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
        "Premium Audi e-tron eFoil experiences in the Maldives. Delivered to yachts, boats, and resorts.",
      url: baseURL,
      images: [
        {
          url: `${baseURL}/images/audi-efoil-maldives.jpg`,
          width: 2188,
          height: 1722,
          alt: "Audi e-tron eFoil experience in Maldives lagoon",
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "eFoil Experiences Maldives",
      description:
        "Premium Audi e-tron eFoil experiences in the Maldives. Delivered to yachts, boats, and resorts.",
      images: [`${baseURL}/images/audi-efoil-maldives.jpg`],
    },
    other: {
      "msapplication-TileColor": "#151515",
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
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const defaultTheme = 'system';
                  
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
                  
                  // Resolve theme
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  // Apply saved theme
                  const savedTheme = localStorage.getItem('data-theme');
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.setAttribute('data-theme', resolvedTheme);
                  
                  // Apply any saved style overrides
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
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
          <RevealFx fill position="absolute">
            <Background
              mask={{
                x: effects.mask.x,
                y: effects.mask.y,
                radius: effects.mask.radius,
                cursor: effects.mask.cursor,
              }}
              gradient={{
                display: effects.gradient.display,
                opacity: effects.gradient.opacity as opacity,
                x: effects.gradient.x,
                y: effects.gradient.y,
                width: effects.gradient.width,
                height: effects.gradient.height,
                tilt: effects.gradient.tilt,
                colorStart: effects.gradient.colorStart,
                colorEnd: effects.gradient.colorEnd,
              }}
              dots={{
                display: effects.dots.display,
                opacity: effects.dots.opacity as opacity,
                size: effects.dots.size as SpacingToken,
                color: effects.dots.color,
              }}
              grid={{
                display: effects.grid.display,
                opacity: effects.grid.opacity as opacity,
                color: effects.grid.color,
                width: effects.grid.width,
                height: effects.grid.height,
              }}
              lines={{
                display: effects.lines.display,
                opacity: effects.lines.opacity as opacity,
                size: effects.lines.size as SpacingToken,
                thickness: effects.lines.thickness,
                angle: effects.lines.angle,
                color: effects.lines.color,
              }}
            />
          </RevealFx>
          <Flex fillWidth minHeight="16" s={{ hide: true }} />
          <Header />
          <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <MobileWhatsAppButton />
          <Footer />
          <Analytics />
          <SpeedInsights />
        </Column>
      </Providers>
    </Flex>
  );
}
