import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "eFoil Maldives",
    short_name: "eFoil Maldives",
    description:
      "Premium Audi e-tron eFoil rentals delivered to yachts, boats, and resorts across Maldives.",
    start_url: "/",
    display: "standalone",
    background_color: "#151515",
    theme_color: "#151515",
    icons: [
      {
        src: "/images/logofoil.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/logofoil.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
