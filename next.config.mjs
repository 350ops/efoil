import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },

  // ─── Permanent redirects ───────────────────────────────────────────
  // Prevents ranking drops from URL changes and catches common typos.
  // All use 308 (permanent, preserves method) so search engines update their index.
  //
  // To add a future rename (e.g. /work -> /packages):
  //   { source: "/work", destination: "/packages", permanent: true },
  //   { source: "/work/:path*", destination: "/packages/:path*", permanent: true },
  async redirects() {
    return [
      // Common alias → homepage
      { source: "/home", destination: "/", permanent: true },

      // Booking/packages aliases → /work
      { source: "/packages", destination: "/work", permanent: true },
      { source: "/pricing", destination: "/work", permanent: true },
      { source: "/book", destination: "/work", permanent: true },
      { source: "/booking", destination: "/work", permanent: true },
      { source: "/rent", destination: "/work", permanent: true },

      // B2B aliases
      { source: "/yacht", destination: "/yachts", permanent: true },
      { source: "/resort", destination: "/resorts", permanent: true },
      { source: "/partner", destination: "/partners", permanent: true },

      // About aliases
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact", destination: "/about", permanent: true },

      // Gallery aliases
      { source: "/photos", destination: "/gallery", permanent: true },
      { source: "/media", destination: "/gallery", permanent: true },

      // Informational page aliases
      { source: "/efoil", destination: "/what-is-efoiling", permanent: true },
      { source: "/efoiling", destination: "/what-is-efoiling", permanent: true },
      { source: "/what-is-efoil", destination: "/what-is-efoiling", permanent: true },
      { source: "/hydrofoil", destination: "/what-is-efoiling", permanent: true },

      // Blog aliases
      { source: "/articles", destination: "/blog", permanent: true },
      { source: "/guides", destination: "/blog", permanent: true },
    ];
  },
};

export default withMDX(nextConfig);
