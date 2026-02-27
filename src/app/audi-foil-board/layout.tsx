import type { Metadata } from "next";
import { baseURL } from "@/resources";

export const metadata: Metadata = {
  title: "Audi e-tron eFoil | The Future of Electric Hydrofoil Surfing",
  description:
    "Explore or acquire the Audi e-tron eFoil in the Maldives. Premium electric hydrofoil with silent propulsion, smart app control, and up to 55 km/h top speed. We facilitate access through our trusted partner network.",
  alternates: { canonical: "/audi-foil-board" },
  openGraph: {
    type: "website",
    title: "Audi e-tron eFoil | The Future of Electric Hydrofoil Surfing",
    description:
      "Premium electric hydrofoil with silent propulsion, smart app control, and up to 55 km/h top speed. Explore or acquire yours in the Maldives.",
    url: `${baseURL}/audi-foil-board`,
    siteName: "eFoil Maldives",
    images: [
      {
        url: `${baseURL}/images/gallery/aeroloop.jpg`,
        width: 1200,
        height: 675,
        alt: "Audi e-tron Aeroloop eFoil — premium electric hydrofoil board",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Audi e-tron eFoil | Electric Hydrofoil Surfing",
    description:
      "Premium electric hydrofoil with silent propulsion, smart app control, and up to 55 km/h. Explore or acquire in the Maldives.",
    images: [`${baseURL}/images/gallery/aeroloop.jpg`],
  },
};

export default function AudiFoilBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
