import { baseURL } from "@/resources";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * Renders a BreadcrumbList JSON-LD schema for SEO.
 * This helps Google understand the page hierarchy and can improve
 * how breadcrumbs and sitelinks appear in search results.
 *
 * Usage:
 *   <BreadcrumbSchema items={[{ name: "Experiences", path: "/efoil-experiences-maldives" }]} />
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseURL,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${baseURL}${item.path}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
